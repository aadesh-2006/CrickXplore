import type { NormalizedPlayer } from '../types/player';
import type {
  GameConfig,
  GameHistoryEntry,
  GameState,
} from './types';
import { getCategoryByKey } from './categories';
import { generateGameDeck } from './deck';
import { dealCardsToPlayers } from './deal';
import { compareGameCards } from './comparison';
import { checkGameOver, getNextActivePlayerIndex, updateEliminations } from './rules';
import { createSeededRandom } from './shuffle';

let historyCounter = 1;

function createHistoryEntry(
  turn: number,
  type: GameHistoryEntry['type'],
  actorName: string,
  description: string
): GameHistoryEntry {
  return {
    id: `hist-${Date.now().toString(36)}-${(historyCounter++).toString(36)}`,
    turn,
    timestamp: Date.now(),
    type,
    actorName,
    description,
  };
}

export function createInitialState(
  config: GameConfig,
  playersPool: NormalizedPlayer[],
  seed?: number
): { state: GameState; error?: string } {
  const randomFn = seed !== undefined ? createSeededRandom(seed) : Math.random;
  const { deck, error } = generateGameDeck(playersPool, config, randomFn);

  if (error || deck.length === 0) {
    return {
      state: {
        phase: 'SETUP',
        config,
        players: [],
        activePlayerIndex: 0,
        controllerPlayerId: '',
        currentControllerCard: null,
        currentChallengerCard: null,
        currentCategory: null,
        activeChain: [],
        lastComparison: null,
        history: [],
        turnNumber: 1,
        winner: null,
        passDeviceTargetPlayerId: null,
      },
      error: error || 'Failed to generate game deck',
    };
  }

  const players = dealCardsToPlayers(deck, config.playerNames, config.cardsPerPlayer);
  const initialController = players[0];

  const initialHistory = [
    createHistoryEntry(
      1,
      'CARD_PLAYED',
      'Engine',
      `Game started with ${players.length} players. ${initialController.name} begins as Category Controller.`
    ),
  ];

  const state: GameState = {
    phase: 'PASS_DEVICE',
    config,
    players,
    activePlayerIndex: 0,
    controllerPlayerId: initialController.id,
    currentControllerCard: null,
    currentChallengerCard: null,
    currentCategory: null,
    activeChain: [],
    lastComparison: null,
    history: initialHistory,
    turnNumber: 1,
    winner: null,
    passDeviceTargetPlayerId: initialController.id,
  };

  return { state };
}

export function dismissPassDevicePrompt(state: GameState): GameState {
  if (state.phase !== 'PASS_DEVICE') return state;

  const activePlayer = state.players[state.activePlayerIndex];
  if (!activePlayer) return state;

  // Determine what the active player needs to do
  if (activePlayer.id === state.controllerPlayerId) {
    if (!state.currentControllerCard) {
      return { ...state, phase: 'CONTROLLER_SELECT_CARD', passDeviceTargetPlayerId: null };
    }
    if (!state.currentCategory) {
      return { ...state, phase: 'CONTROLLER_SELECT_CATEGORY', passDeviceTargetPlayerId: null };
    }
  }

  // Otherwise, player is a challenger
  return { ...state, phase: 'CHALLENGER_SELECT_CARD', passDeviceTargetPlayerId: null };
}

export function controllerPlayCard(state: GameState, cardInstanceId: string): GameState {
  if (state.phase !== 'CONTROLLER_SELECT_CARD') return state;

  const controller = state.players.find((p) => p.id === state.controllerPlayerId);
  if (!controller) return state;

  const cardIndex = controller.hand.findIndex((c) => c.instanceId === cardInstanceId);
  if (cardIndex === -1) return state;

  const card = controller.hand[cardIndex];
  const newHand = controller.hand.filter((c) => c.instanceId !== cardInstanceId);

  const updatedPlayers = state.players.map((p) =>
    p.id === controller.id ? { ...p, hand: newHand } : p
  );

  const history = [
    ...state.history,
    createHistoryEntry(
      state.turnNumber,
      'CARD_PLAYED',
      controller.name,
      `${controller.name} played ${card.playerName} (${card.country}).`
    ),
  ];

  // If category already exists (from a retained category), proceed directly to challenger turn
  if (state.currentCategory) {
    const nextChallengerIndex = getNextActivePlayerIndex(updatedPlayers, state.activePlayerIndex);
    const nextChallenger = updatedPlayers[nextChallengerIndex];

    return {
      ...state,
      players: updatedPlayers,
      currentControllerCard: card,
      activePlayerIndex: nextChallengerIndex,
      phase: 'PASS_DEVICE',
      passDeviceTargetPlayerId: nextChallenger.id,
      history,
    };
  }

  // Otherwise, controller must select a category
  return {
    ...state,
    players: updatedPlayers,
    currentControllerCard: card,
    phase: 'CONTROLLER_SELECT_CATEGORY',
    history,
  };
}

export function controllerSelectCategory(state: GameState, categoryKey: string): GameState {
  if (state.phase !== 'CONTROLLER_SELECT_CATEGORY') return state;

  const category = getCategoryByKey(categoryKey);
  if (!category || !state.currentControllerCard) return state;

  const controller = state.players.find((p) => p.id === state.controllerPlayerId);
  const controllerName = controller ? controller.name : 'Controller';

  const history = [
    ...state.history,
    createHistoryEntry(
      state.turnNumber,
      'CATEGORY_CHOSEN',
      controllerName,
      `${controllerName} set Category to ${category.label} (${category.direction === 'HIGHER_IS_BETTER' ? 'Higher' : 'Lower'} is better).`
    ),
  ];

  // Move to next active player (the challenger)
  const nextChallengerIndex = getNextActivePlayerIndex(state.players, state.activePlayerIndex);
  const nextChallenger = state.players[nextChallengerIndex];

  return {
    ...state,
    currentCategory: category,
    activePlayerIndex: nextChallengerIndex,
    phase: 'PASS_DEVICE',
    passDeviceTargetPlayerId: nextChallenger.id,
    history,
  };
}

export function challengerPlayCard(state: GameState, cardInstanceId: string): GameState {
  if (state.phase !== 'CHALLENGER_SELECT_CARD') return state;

  const challenger = state.players[state.activePlayerIndex];
  if (!challenger || !state.currentControllerCard || !state.currentCategory) return state;

  const cardIndex = challenger.hand.findIndex((c) => c.instanceId === cardInstanceId);
  if (cardIndex === -1) return state;

  const card = challenger.hand[cardIndex];
  const newHand = challenger.hand.filter((c) => c.instanceId !== cardInstanceId);

  const updatedPlayers = state.players.map((p) =>
    p.id === challenger.id ? { ...p, hand: newHand } : p
  );

  const history = [
    ...state.history,
    createHistoryEntry(
      state.turnNumber,
      'CARD_PLAYED',
      challenger.name,
      `${challenger.name} challenged with ${card.playerName} (${card.country}).`
    ),
  ];

  // Perform comparison
  const comparison = compareGameCards(
    state.controllerPlayerId,
    state.currentControllerCard,
    challenger.id,
    card,
    state.currentCategory,
    state.activeChain
  );

  return {
    ...state,
    players: updatedPlayers,
    currentChallengerCard: card,
    lastComparison: comparison,
    phase: 'COMPARISON_REVEAL',
    history,
  };
}

export function resolveComparison(state: GameState): GameState {
  if (state.phase !== 'COMPARISON_REVEAL' || !state.lastComparison) return state;

  const comparison = state.lastComparison;
  const controller = state.players.find((p) => p.id === comparison.controllerPlayerId);
  const challenger = state.players.find((p) => p.id === comparison.challengerPlayerId);

  if (!controller || !challenger) return state;

  let updatedPlayers = [...state.players];
  let updatedChain = [...state.activeChain];
  let nextControllerId = state.controllerPlayerId;
  let nextActiveIndex = state.activePlayerIndex;
  const history = [...state.history];

  // 0. Invalid Statistic Comparison (missing/null stat on either side)
  if (comparison.isInvalid) {
    // Both cards enter the active chain pot
    updatedChain = [...updatedChain, comparison.controllerCard, comparison.challengerCard];

    const reasonText =
      comparison.invalidReason === 'MISSING_CHALLENGER_STAT'
        ? `${challenger.name}'s card (${comparison.challengerCard.playerName}) does not have a valid ${comparison.categoryLabel} statistic`
        : comparison.invalidReason === 'MISSING_CONTROLLER_STAT'
        ? `${controller.name}'s card (${comparison.controllerCard.playerName}) does not have a valid ${comparison.categoryLabel} statistic`
        : `Neither card has a valid ${comparison.categoryLabel} statistic`;

    history.push(
      createHistoryEntry(
        state.turnNumber,
        'INVALID_CHALLENGE',
        'Engine',
        `⚠️ Invalid challenge: ${reasonText}. Comparison skipped! Control remains with ${controller.name}. Chain pot: ${updatedChain.length} cards.`
      )
    );

    // Check eliminations
    const { updatedPlayers: postElimPlayers, newlyEliminated } = updateEliminations(updatedPlayers);
    newlyEliminated.forEach((el) => {
      history.push(
        createHistoryEntry(
          state.turnNumber,
          'PLAYER_ELIMINATED',
          el.name,
          `${el.name} has run out of cards and has been eliminated!`
        )
      );
    });

    const gameOverCheck = checkGameOver(postElimPlayers);
    if (gameOverCheck.isOver) {
      history.push(
        createHistoryEntry(
          state.turnNumber,
          'GAME_WON',
          gameOverCheck.winner?.name || 'Winner',
          `🏆 ${gameOverCheck.winner?.name} has won the CrickXplore Card Game championship!`
        )
      );
      return {
        ...state,
        players: postElimPlayers,
        activeChain: updatedChain,
        phase: 'GAME_OVER',
        winner: gameOverCheck.winner,
        history,
      };
    }

    // Pass device back to controller to lead next duel
    return {
      ...state,
      players: postElimPlayers,
      activeChain: updatedChain,
      currentChallengerCard: null,
      currentControllerCard: null,
      activePlayerIndex: postElimPlayers.findIndex((p) => p.id === state.controllerPlayerId),
      phase: 'PASS_DEVICE',
      passDeviceTargetPlayerId: state.controllerPlayerId,
      turnNumber: state.turnNumber + 1,
      history,
    };
  }

  // 1. Challenger Wins
  if (comparison.winnerPlayerId === challenger.id) {
    const cardsInPot = [...updatedChain, comparison.controllerCard, comparison.challengerCard];
    
    // Challenger collects all cards from the pot/chain into their hand
    updatedPlayers = updatedPlayers.map((p) =>
      p.id === challenger.id
        ? {
            ...p,
            hand: [...p.hand, ...cardsInPot],
            cardsWonCount: p.cardsWonCount + cardsInPot.length,
          }
        : p
    );

    // Chain resets
    updatedChain = [];
    nextControllerId = challenger.id;
    nextActiveIndex = state.players.findIndex((p) => p.id === challenger.id);

    history.push(
      createHistoryEntry(
        state.turnNumber,
        'CHAIN_COLLECTED',
        challenger.name,
        `${challenger.name} defeated ${controller.name} on ${comparison.categoryLabel}! Gained Category Control and collected ${cardsInPot.length} cards from the chain pot.`
      )
    );

    // Check eliminations
    const { updatedPlayers: postElimPlayers, newlyEliminated } = updateEliminations(updatedPlayers);
    newlyEliminated.forEach((el) => {
      history.push(
        createHistoryEntry(
          state.turnNumber,
          'PLAYER_ELIMINATED',
          el.name,
          `${el.name} has run out of cards and has been eliminated!`
        )
      );
    });

    const gameOverCheck = checkGameOver(postElimPlayers);
    if (gameOverCheck.isOver) {
      history.push(
        createHistoryEntry(
          state.turnNumber,
          'GAME_WON',
          gameOverCheck.winner?.name || 'Winner',
          `🏆 ${gameOverCheck.winner?.name} has won the CrickXplore Card Game championship!`
        )
      );
      return {
        ...state,
        players: postElimPlayers,
        phase: 'GAME_OVER',
        winner: gameOverCheck.winner,
        history,
      };
    }

    // New controller now gets to KEEP or CHANGE category
    return {
      ...state,
      players: postElimPlayers,
      controllerPlayerId: nextControllerId,
      activePlayerIndex: nextActiveIndex,
      activeChain: [],
      currentControllerCard: null,
      currentChallengerCard: null,
      phase: 'CATEGORY_CHANGE_DECISION',
      history,
    };
  }

  // 2. Controller Wins
  if (comparison.winnerPlayerId === controller.id) {
    // Both cards enter the active chain pot
    updatedChain = [...updatedChain, comparison.controllerCard, comparison.challengerCard];

    history.push(
      createHistoryEntry(
        state.turnNumber,
        'CHALLENGE_WON',
        controller.name,
        `${controller.name} defended on ${comparison.categoryLabel} against ${challenger.name}. Active chain pot increased to ${updatedChain.length} cards.`
      )
    );

    // Check eliminations
    const { updatedPlayers: postElimPlayers, newlyEliminated } = updateEliminations(updatedPlayers);
    newlyEliminated.forEach((el) => {
      history.push(
        createHistoryEntry(
          state.turnNumber,
          'PLAYER_ELIMINATED',
          el.name,
          `${el.name} has run out of cards and has been eliminated!`
        )
      );
    });

    const gameOverCheck = checkGameOver(postElimPlayers);
    if (gameOverCheck.isOver) {
      history.push(
        createHistoryEntry(
          state.turnNumber,
          'GAME_WON',
          gameOverCheck.winner?.name || 'Winner',
          `🏆 ${gameOverCheck.winner?.name} has won the CrickXplore Card Game championship!`
        )
      );
      return {
        ...state,
        players: postElimPlayers,
        phase: 'GAME_OVER',
        winner: gameOverCheck.winner,
        history,
      };
    }

    // Controller plays again to start the next duel or next challenger challenges
    // The controller remains in control; next active player takes a turn to challenge
    const nextChallengerIndex = getNextActivePlayerIndex(postElimPlayers, state.activePlayerIndex);
    const nextChallenger = postElimPlayers[nextChallengerIndex];

    // If next challenger is the controller themselves (all other players had a turn), controller must play a new card
    if (nextChallenger.id === state.controllerPlayerId) {
      return {
        ...state,
        players: postElimPlayers,
        activeChain: updatedChain,
        currentControllerCard: null,
        currentChallengerCard: null,
        activePlayerIndex: nextChallengerIndex,
        phase: 'PASS_DEVICE',
        passDeviceTargetPlayerId: nextChallenger.id,
        turnNumber: state.turnNumber + 1,
        history,
      };
    }

    // Otherwise, controller plays their new card or next challenger faces them
    return {
      ...state,
      players: postElimPlayers,
      activeChain: updatedChain,
      currentChallengerCard: null,
      currentControllerCard: null, // Controller plays a fresh card for each duel
      activePlayerIndex: postElimPlayers.findIndex((p) => p.id === state.controllerPlayerId),
      phase: 'PASS_DEVICE',
      passDeviceTargetPlayerId: state.controllerPlayerId,
      turnNumber: state.turnNumber + 1,
      history,
    };
  }

  // 3. Exact Tie
  updatedChain = [...updatedChain, comparison.controllerCard, comparison.challengerCard];
  history.push(
    createHistoryEntry(
      state.turnNumber,
      'TIE',
      'Tie',
      `Exact tie on ${comparison.categoryLabel} (${comparison.controllerValue})! Control remains with ${controller.name}. Chain pot: ${updatedChain.length} cards.`
    )
  );

  const { updatedPlayers: postElimPlayers, newlyEliminated } = updateEliminations(updatedPlayers);
  newlyEliminated.forEach((el) => {
    history.push(
      createHistoryEntry(
        state.turnNumber,
        'PLAYER_ELIMINATED',
        el.name,
        `${el.name} has run out of cards and has been eliminated!`
      )
    );
  });

  const gameOverCheck = checkGameOver(postElimPlayers);
  if (gameOverCheck.isOver) {
    return {
      ...state,
      players: postElimPlayers,
      phase: 'GAME_OVER',
      winner: gameOverCheck.winner,
      history,
    };
  }

  return {
    ...state,
    players: postElimPlayers,
    activeChain: updatedChain,
    currentChallengerCard: null,
    currentControllerCard: null,
    activePlayerIndex: postElimPlayers.findIndex((p) => p.id === state.controllerPlayerId),
    phase: 'PASS_DEVICE',
    passDeviceTargetPlayerId: state.controllerPlayerId,
    turnNumber: state.turnNumber + 1,
    history,
  };
}

export function handleCategoryDecision(
  state: GameState,
  action: 'KEEP' | 'CHANGE',
  newCategoryKey?: string
): GameState {
  if (state.phase !== 'CATEGORY_CHANGE_DECISION') return state;

  const controller = state.players.find((p) => p.id === state.controllerPlayerId);
  const controllerName = controller ? controller.name : 'Controller';
  const history = [...state.history];

  let nextCategory = state.currentCategory;

  if (action === 'CHANGE' && newCategoryKey) {
    const cat = getCategoryByKey(newCategoryKey);
    if (cat) {
      nextCategory = cat;
      history.push(
        createHistoryEntry(
          state.turnNumber,
          'CATEGORY_CHANGED',
          controllerName,
          `${controllerName} changed Category to ${cat.label} (${cat.direction === 'HIGHER_IS_BETTER' ? 'Higher' : 'Lower'} is better).`
        )
      );
    }
  } else {
    history.push(
      createHistoryEntry(
        state.turnNumber,
        'CATEGORY_CHOSEN',
        controllerName,
        `${controllerName} kept Category as ${state.currentCategory?.label}.`
      )
    );
  }

  // Pass device to controller to play their starting card for the new duel
  const controllerIndex = state.players.findIndex((p) => p.id === state.controllerPlayerId);

  return {
    ...state,
    currentCategory: nextCategory,
    activePlayerIndex: controllerIndex,
    currentControllerCard: null,
    currentChallengerCard: null,
    phase: 'PASS_DEVICE',
    passDeviceTargetPlayerId: state.controllerPlayerId,
    turnNumber: state.turnNumber + 1,
    history,
  };
}

export function resetGame(
  state: GameState,
  playersPool: NormalizedPlayer[],
  seed?: number
): GameState {
  const { state: newState } = createInitialState(state.config, playersPool, seed);
  return newState;
}
