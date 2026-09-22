import type { GameCard, GamePlayer } from './types';

export function dealCardsToPlayers(
  deck: readonly GameCard[],
  playerNames: string[],
  cardsPerPlayer: number = 5
): GamePlayer[] {
  const playersCount = playerNames.length;
  if (playersCount === 0) return [];

  // Initialize empty players
  const players: GamePlayer[] = playerNames.map((name, index) => ({
    id: `player-${index + 1}`,
    name: name.trim() || `Player ${index + 1}`,
    hand: [],
    isEliminated: false,
    isHost: index === 0,
    cardsWonCount: 0,
  }));

  // Distribute cards round-robin up to available cards or cardsPerPlayer
  const maxCardsPerPlayer = Math.min(
    cardsPerPlayer,
    Math.floor(deck.length / playersCount)
  );

  let cardIndex = 0;
  for (let round = 0; round < maxCardsPerPlayer; round++) {
    for (let p = 0; p < playersCount; p++) {
      if (cardIndex < deck.length) {
        players[p].hand.push(deck[cardIndex]);
        cardIndex++;
      }
    }
  }

  return players;
}
