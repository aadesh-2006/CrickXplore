import type { GamePlayer } from './types';

export function getNextActivePlayerIndex(
  players: readonly GamePlayer[],
  currentIndex: number
): number {
  const count = players.length;
  if (count === 0) return 0;

  for (let step = 1; step <= count; step++) {
    const nextIndex = (currentIndex + step) % count;
    if (!players[nextIndex].isEliminated && players[nextIndex].hand.length > 0) {
      return nextIndex;
    }
  }

  return currentIndex;
}

export function updateEliminations(players: readonly GamePlayer[]): {
  updatedPlayers: GamePlayer[];
  newlyEliminated: GamePlayer[];
} {
  const newlyEliminated: GamePlayer[] = [];
  const updatedPlayers = players.map((player) => {
    if (!player.isEliminated && player.hand.length === 0) {
      newlyEliminated.push(player);
      return { ...player, isEliminated: true };
    }
    return player;
  });

  return { updatedPlayers, newlyEliminated };
}

export function getActivePlayers(players: readonly GamePlayer[]): GamePlayer[] {
  return players.filter((p) => !p.isEliminated && p.hand.length > 0);
}

export function checkGameOver(players: readonly GamePlayer[]): {
  isOver: boolean;
  winner: GamePlayer | null;
} {
  const active = getActivePlayers(players);
  if (active.length === 1) {
    return { isOver: true, winner: active[0] };
  }
  if (active.length === 0) {
    // Edge fallback: highest cardsWonCount
    const sorted = [...players].sort((a, b) => b.cardsWonCount - a.cardsWonCount);
    return { isOver: true, winner: sorted[0] || null };
  }
  return { isOver: false, winner: null };
}
