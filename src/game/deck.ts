import type { NormalizedPlayer } from '../types/player';
import type { GameCard, GameConfig } from './types';
import { shuffleArray } from './shuffle';

let instanceCounter = 1;

export function generateTemporaryInstanceId(playerId: string): string {
  const timestamp = Date.now().toString(36);
  const count = (instanceCounter++).toString(36);
  const rand = Math.random().toString(36).substring(2, 6);
  return `gc-${playerId}-${timestamp}-${count}-${rand}`;
}

export function playerToGameCard(player: NormalizedPlayer): GameCard {
  return {
    instanceId: generateTemporaryInstanceId(player.id),
    playerId: player.id,
    playerName: player.name,
    country: player.country,
    countryCode: player.countryCode || player.country.substring(0, 3).toUpperCase(),
    role: player.role,
    imageUrl: player.imageUrl || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    stats: JSON.parse(JSON.stringify(player.stats)), // Deep clone stats
    badges: player.badges ? [...player.badges] : undefined,
  };
}

export function filterEligiblePlayers(
  playersPool: NormalizedPlayer[],
  config: GameConfig
): NormalizedPlayer[] {
  return playersPool.filter((player) => {
    // Format check: player must have at least one valid stat in that format
    if (config.format !== 'ALL') {
      const formatStats = player.stats[config.format];
      if (!formatStats) return false;
      const hasBatting = formatStats.batting && (formatStats.batting.matches || 0) > 0;
      const hasBowling = formatStats.bowling && (formatStats.bowling.matches || 0) > 0;
      if (!hasBatting && !hasBowling) return false;
    }
    return true;
  });
}

export function generateGameDeck(
  playersPool: NormalizedPlayer[],
  config: GameConfig,
  randomFn: () => number = Math.random
): { deck: GameCard[]; error?: string } {
  const eligiblePlayers = filterEligiblePlayers(playersPool, config);
  const totalCardsNeeded = config.playersCount * config.cardsPerPlayer;

  if (eligiblePlayers.length === 0) {
    return {
      deck: [],
      error: `No eligible players found for format "${config.format}" in era "${config.era}".`,
    };
  }

  // Shuffle eligible players first
  const shuffledPlayers = shuffleArray(eligiblePlayers, randomFn);

  // If pool is larger than needed, take the required amount
  // If pool is smaller than needed, we cap each player with 1 card without duplicating cards
  const selectedPlayers = shuffledPlayers.slice(0, Math.min(totalCardsNeeded, shuffledPlayers.length));

  if (selectedPlayers.length < config.playersCount) {
    return {
      deck: [],
      error: `Player pool size (${selectedPlayers.length}) is too small for ${config.playersCount} players.`,
    };
  }

  // Convert each unique player to a temporary GameCard
  const deck = selectedPlayers.map((p) => playerToGameCard(p));

  // Final shuffle of the temporary deck
  const randomizedDeck = shuffleArray(deck, randomFn);

  return { deck: randomizedDeck };
}
