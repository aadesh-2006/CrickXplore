import { FALLBACK_PLAYERS } from '../src/data/fallbackPlayers';
import {
  createInitialState,
  controllerPlayCard,
  controllerSelectCategory,
  challengerPlayCard,
  resolveComparison,
  handleCategoryDecision,
  dismissPassDevicePrompt,
} from '../src/game/engine';
import { compareGameCards } from '../src/game/comparison';
import { getCategoryByKey, getAvailableCategoriesForCard } from '../src/game/categories';
import { dealCardsToPlayers } from '../src/game/deal';
import { generateGameDeck, playerToGameCard } from '../src/game/deck';
import type { GameCard, GameConfig } from '../src/game/types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('=====================================================');
console.log('--- CRICKXPLORE CARD GAME ENGINE COMPREHENSIVE SUITE ---');
console.log('=====================================================\n');

// 1. Deck Generation & Dealing Test
const config: GameConfig = {
  playersCount: 3,
  playerNames: ['Alice', 'Bob', 'Charlie'],
  cardsPerPlayer: 3,
  format: 'ALL',
  era: 'ALL',
};

const { deck, error } = generateGameDeck(FALLBACK_PLAYERS, config);
assert(!error && deck.length === 9, `Generated deck has exactly 9 cards for 3 players x 3 cards (got ${deck.length})`);

const players = dealCardsToPlayers(deck, config.playerNames, config.cardsPerPlayer);
assert(players.length === 3, `Dealt to exactly 3 players`);
assert(players[0].hand.length === 3 && players[1].hand.length === 3 && players[2].hand.length === 3, `Each player has exactly 3 cards`);

// Prepare Cards for Explicit Testing
const starcPlayer: any = {
  id: 'mitchell-starc',
  name: 'Mitchell Starc',
  country: 'Australia',
  countryCode: 'AUS',
  role: 'bowler',
  battingStyle: 'Left-hand bat',
  bowlingStyle: 'Left-arm fast',
  imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
  stats: {
    test: {
      bowling: { matches: 89, innings: 172, wickets: 358, economy: 3.40, average: 27.7, strikeRate: 48.8 },
      batting: { matches: 89, innings: 125, runs: 2096, average: 20.75, strikeRate: 67.5 },
    },
    odi: {
      bowling: { matches: 121, innings: 121, wickets: 236, economy: 5.20, average: 22.9, strikeRate: 26.4 },
      batting: { matches: 121, innings: 65, runs: 560, average: 13.0, strikeRate: 88.0 },
    },
    t20i: {
      bowling: { matches: 65, innings: 65, wickets: 79, economy: 7.63, average: 23.82, strikeRate: 18.7 },
      batting: { matches: 65, innings: 15, runs: 94, average: 9.4, strikeRate: 110.5 },
    },
  },
};

const bumrahPlayer = FALLBACK_PLAYERS.find((p) => p.name.includes('Bumrah'))!;
const cumminsPlayer = FALLBACK_PLAYERS.find((p) => p.name.includes('Cummins'))!;
const kohliPlayer = FALLBACK_PLAYERS.find((p) => p.name.includes('Kohli'))!;

const starcCard = playerToGameCard(starcPlayer);
const bumrahCard = playerToGameCard(bumrahPlayer);
const cumminsCard = playerToGameCard(cumminsPlayer);
const kohliCard = playerToGameCard(kohliPlayer);

// =========================================================================
// SECTION A: EXPLICIT EDGE-CASE TESTS
// =========================================================================
console.log('\n--- SECTION A: EXPLICIT EDGE-CASE VALIDATION ---');

// 1. Controller missing statistic -> Category cannot be chosen / not available
const bumrahAvailableCategories = getAvailableCategoriesForCard(bumrahCard);
const bumrahHasBatting = bumrahAvailableCategories.some((c) => c.statType === 'batting');
assert(
  !bumrahHasBatting,
  'Controller missing batting stats: Category selector excludes all batting categories for pure bowler card'
);

// 2. Challenger missing statistic -> Invalid comparison, no winner, control retained
const odiRunsCat = getCategoryByKey('odi_batting_runs')!;
assert(odiRunsCat !== undefined, 'odi_batting_runs category exists');
// Kohli (has ODI runs) vs Bumrah (lacks ODI batting stats)
const missingChallengerComp = compareGameCards('p1', kohliCard, 'p2', bumrahCard, odiRunsCat);
assert(missingChallengerComp.isInvalid === true, 'Comparison is flagged as isInvalid when challenger stat is missing');
assert(
  missingChallengerComp.invalidReason === 'MISSING_CHALLENGER_STAT',
  'invalidReason is MISSING_CHALLENGER_STAT'
);
assert(missingChallengerComp.winnerPlayerId === null, 'winnerPlayerId is null on invalid comparison');
assert(missingChallengerComp.controllerValue === 13906, 'controllerValue is preserved');
assert(missingChallengerComp.challengerValue === null, 'challengerValue is null and NOT fabricated into 0/infinity');

// 3. Controller missing statistic when evaluated against challenger
const missingControllerComp = compareGameCards('p1', bumrahCard, 'p2', kohliCard, odiRunsCat);
assert(missingControllerComp.isInvalid === true, 'Comparison is flagged as isInvalid when controller stat is missing');
assert(
  missingControllerComp.invalidReason === 'MISSING_CONTROLLER_STAT',
  'invalidReason is MISSING_CONTROLLER_STAT'
);
assert(missingControllerComp.winnerPlayerId === null, 'winnerPlayerId is null when controller stat is missing');

// 4. Both missing statistic
const testCenturiesCat = getCategoryByKey('test_batting_centuries')!;
// Bumrah (no batting stats) vs Starc (if missing or stripped)
const pureBowlerA = { ...bumrahCard, stats: { ...bumrahCard.stats, test: { bowling: bumrahCard.stats.test?.bowling } } };
const pureBowlerB = { ...bumrahCard, instanceId: 'temp-b' };
const bothMissingComp = compareGameCards('p1', pureBowlerA, 'p2', pureBowlerB, testCenturiesCat);
assert(bothMissingComp.isInvalid === true, 'Comparison is flagged isInvalid when both lack stat');
assert(bothMissingComp.invalidReason === 'MISSING_BOTH_STATS', 'invalidReason is MISSING_BOTH_STATS');
assert(bothMissingComp.winnerPlayerId === null, 'winnerPlayerId is null when both stats missing');

// 5. Valid Higher-is-Better comparison
const testWicketsCat = getCategoryByKey('test_bowling_wickets')!;
assert(testWicketsCat.direction === 'HIGHER_IS_BETTER', 'test_bowling_wickets is HIGHER_IS_BETTER');
// Starc (358) vs Bumrah (159) -> Starc wins
const validHigherComp = compareGameCards('p1', starcCard, 'p2', bumrahCard, testWicketsCat);
assert(validHigherComp.isInvalid === false, 'Valid higher-is-better comparison is not invalid');
assert(validHigherComp.controllerValue === 358 && validHigherComp.challengerValue === 159, 'Both values are valid numbers');
assert(validHigherComp.winnerPlayerId === 'p1', 'Higher value (358 > 159) wins controller victory');

// 6. Valid Lower-is-Better comparison
const t20EconCat = getCategoryByKey('t20i_bowling_economy')!;
assert(t20EconCat.direction === 'LOWER_IS_BETTER', 't20i_bowling_economy is LOWER_IS_BETTER');
// Starc (7.63) vs Bumrah (6.27) -> Bumrah (challenger) wins
const validLowerComp = compareGameCards('p1', starcCard, 'p2', bumrahCard, t20EconCat);
assert(validLowerComp.isInvalid === false, 'Valid lower-is-better comparison is not invalid');
assert(validLowerComp.controllerValue === 7.63 && validLowerComp.challengerValue === 6.27, 'Both economy rates are valid numbers');
assert(validLowerComp.winnerPlayerId === 'p2', 'Lower value (6.27 < 7.63) wins challenger victory');

// 7. Exact Tie
const starcCardClone = { ...starcCard, instanceId: 'starc-clone' };
const tieComp = compareGameCards('p1', starcCard, 'p2', starcCardClone, testWicketsCat);
assert(tieComp.isTie === true && tieComp.isInvalid === false, 'Exact tie recognized without error');
assert(tieComp.winnerPlayerId === null, 'Winner is null on exact tie');

// =========================================================================
// SECTION B: EXACT REQUIRED GAMEPLAY SCENARIO
// Scenario: Starc vs Bumrah -> Bumrah wins control -> category change to Test Wickets
//           -> Player C (Cummins) compared on Test Wickets against Bumrah.
// =========================================================================
console.log('\n--- SECTION B: EXACT REQUIRED GAMEPLAY SCENARIO (ALL VALID STATS) ---');

// Setup 3 players: P1 (Starc), P2 (Bumrah), P3 (Cummins)
let gameState = createInitialState(config, FALLBACK_PLAYERS, 42).state;
gameState.players[0].hand = [starcCard];
gameState.players[1].hand = [bumrahCard];
gameState.players[2].hand = [cumminsCard];
gameState.players[0].name = 'Player A (Starc)';
gameState.players[1].name = 'Player B (Bumrah)';
gameState.players[2].name = 'Player C (Cummins)';
gameState.controllerPlayerId = gameState.players[0].id;
gameState.activePlayerIndex = 0;
gameState.phase = 'CONTROLLER_SELECT_CARD';

// Step 1: Controller (Player A) plays Starc
gameState = controllerPlayCard(gameState, starcCard.instanceId);
assert(gameState.phase === 'CONTROLLER_SELECT_CATEGORY', 'Controller prompted to choose category');

// Step 2: Controller sets category to T20I Bowling Economy (Lower is better: Bumrah 6.27 vs Starc 7.63)
gameState = controllerSelectCategory(gameState, 't20i_bowling_economy');
assert(gameState.phase === 'PASS_DEVICE', 'Device handed to Player B');

gameState = dismissPassDevicePrompt(gameState);
assert(gameState.phase === 'CHALLENGER_SELECT_CARD', 'Player B is now CHALLENGER_SELECT_CARD');

// Step 3: Player B plays Bumrah
gameState = challengerPlayCard(gameState, bumrahCard.instanceId);
assert(gameState.phase === 'COMPARISON_REVEAL', 'Cards revealed for duel');

// Verify both values are strictly non-null before comparing
const duel1 = gameState.lastComparison!;
assert(duel1.controllerValue !== null, `Controller value is valid: ${duel1.controllerValue}`);
assert(duel1.challengerValue !== null, `Challenger value is valid: ${duel1.challengerValue}`);
assert(duel1.isInvalid === false, 'Duel 1 is a valid numeric comparison');
assert(duel1.winnerPlayerId === gameState.players[1].id, 'Bumrah (Player B) wins on T20I Bowling Economy');

// Step 4: Resolve Duel 1 -> Player B collects pot & gets Category Decision
gameState = resolveComparison(gameState);
assert(gameState.phase === 'CATEGORY_CHANGE_DECISION', 'Player B prompted for Category Decision');
assert(gameState.controllerPlayerId === gameState.players[1].id, 'Player B is now the Category Controller');
assert(gameState.players[1].hand.length === 2, 'Player B collected both cards from pot');

// Step 5: Category Change Isolation Test
// Player B discards previous category and chooses Test Wickets (where Bumrah: 159, Cummins: 269)
gameState = handleCategoryDecision(gameState, 'CHANGE', 'test_bowling_wickets');
assert(gameState.currentCategory?.key === 'test_bowling_wickets', 'Category changed cleanly to Test Wickets');
assert(gameState.phase === 'PASS_DEVICE', 'Device passed to new controller (Player B)');

gameState = dismissPassDevicePrompt(gameState);
assert(gameState.phase === 'CONTROLLER_SELECT_CARD', 'Player B must select leading card under new category');

// Step 6: Player B plays Bumrah card under Test Wickets
const bumrahCardInHand = gameState.players[1].hand.find((c) => c.playerName.includes('Bumrah'))!;
gameState = controllerPlayCard(gameState, bumrahCardInHand.instanceId);
assert(gameState.phase === 'PASS_DEVICE', 'Device passed to next challenger (Player C)');

gameState = dismissPassDevicePrompt(gameState);
assert(gameState.phase === 'CHALLENGER_SELECT_CARD', 'Player C selects card to challenge Bumrah');

// Step 7: Player C (Cummins) challenges with Pat Cummins card
gameState = challengerPlayCard(gameState, cumminsCard.instanceId);
assert(gameState.phase === 'COMPARISON_REVEAL', 'Duel 2 revealed between Bumrah and Cummins on Test Wickets');

const duel2 = gameState.lastComparison!;
// Explicitly assert non-null numeric values
assert(duel2.controllerValue !== null, `Controller value is valid number: ${duel2.controllerValue}`);
assert(duel2.challengerValue !== null, `Challenger value is valid number: ${duel2.challengerValue}`);
assert(duel2.isInvalid === false, 'Duel 2 is a valid numeric comparison');
assert(duel2.categoryKey === 'test_bowling_wickets', 'Duel 2 evaluated strictly on Test Wickets');
console.log(`Duel 2: Bumrah Wickets (${duel2.controllerValue}) vs Cummins Wickets (${duel2.challengerValue}) -> Winner: ${duel2.winnerPlayerId}`);
assert(duel2.winnerPlayerId === gameState.players[2].id, 'Cummins (Player C: 269 wickets) defeats Bumrah (159 wickets)');

// Step 8: Resolve Duel 2 -> Player C takes Category Control and sweeps the pot
gameState = resolveComparison(gameState);
assert(gameState.controllerPlayerId === gameState.players[2].id, 'Player C takes over Category Control');
assert(gameState.players[2].hand.length === 2, 'Player C collected pot');

// =========================================================================
// SECTION C: INVALID CHALLENGER IN-ENGINE RESOLUTION TEST
// =========================================================================
console.log('\n--- SECTION C: INVALID CHALLENGER STAT GRACEFUL RECOVERY TEST ---');

// If Controller plays Kohli (Batting: 8848 runs) and sets category to test_batting_runs,
// and Challenger plays Bumrah (who lacks test batting runs), the engine must gracefully
// mark comparison as isInvalid, skip comparison, keep control with controller, and add cards to chain.
let invalidMatchState = createInitialState(config, FALLBACK_PLAYERS, 100).state;
invalidMatchState.players[0].hand = [kohliCard, starcCard];
invalidMatchState.players[1].hand = [bumrahCard, cumminsCard];
invalidMatchState.controllerPlayerId = invalidMatchState.players[0].id;
invalidMatchState.phase = 'CONTROLLER_SELECT_CARD';

invalidMatchState = controllerPlayCard(invalidMatchState, kohliCard.instanceId);
invalidMatchState = controllerSelectCategory(invalidMatchState, 'test_batting_runs');
invalidMatchState = dismissPassDevicePrompt(invalidMatchState);
invalidMatchState = challengerPlayCard(invalidMatchState, bumrahCard.instanceId);

assert(invalidMatchState.lastComparison?.isInvalid === true, 'Challenger lacking stat results in isInvalid comparison');
assert(invalidMatchState.lastComparison?.winnerPlayerId === null, 'No winner awarded on invalid challenge');

invalidMatchState = resolveComparison(invalidMatchState);
assert(invalidMatchState.controllerPlayerId === invalidMatchState.players[0].id, 'Controller retains category control');
assert(invalidMatchState.activeChain.length === 2, 'Both cards safely enter active chain pot without error');
const lastHistoryEntry = invalidMatchState.history[invalidMatchState.history.length - 1];
assert(lastHistoryEntry.type === 'INVALID_CHALLENGE', 'History records INVALID_CHALLENGE event');

// =========================================================================
// SECTION D: ELIMINATION & GAME OVER
// =========================================================================
console.log('\n--- SECTION D: ELIMINATION & GAME OVER ---');
let elimState = createInitialState(config, FALLBACK_PLAYERS, 99).state;
elimState.players[0].hand = [];
elimState.players[1].hand = [];
elimState.players[2].hand = [cumminsCard];
elimState.phase = 'COMPARISON_REVEAL';
elimState.lastComparison = {
  categoryKey: 'test_bowling_wickets',
  categoryLabel: 'Test Wickets',
  direction: 'HIGHER_IS_BETTER',
  format: 'test',
  controllerPlayerId: elimState.players[1].id,
  controllerCard: bumrahCard,
  controllerValue: 159,
  challengerPlayerId: elimState.players[2].id,
  challengerCard: cumminsCard,
  challengerValue: 269,
  winnerPlayerId: elimState.players[2].id,
  winnerCard: cumminsCard,
  isTie: false,
  isInvalid: false,
  chainCardsInvolved: [bumrahCard, cumminsCard],
};

elimState = resolveComparison(elimState);
assert(elimState.phase === 'GAME_OVER', 'Game transitions to GAME_OVER when other players are eliminated');
assert(elimState.winner?.id === elimState.players[2].id, 'Sole remaining player is declared winner');

console.log('\n=====================================================');
console.log('--- ALL 26 ENGINE & EDGE-CASE ASSERTIONS PASSED! ---');
console.log('=====================================================');
