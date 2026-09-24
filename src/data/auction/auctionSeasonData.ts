import { FALLBACK_PLAYERS } from '../players/index.ts';
import type { NormalizedPlayer } from '../../types/player.ts';
import type { IPLSeasonAvailability } from '../../types/auction.ts';

/**
 * IPL Season Data Loader & Verification Utility
 * 
 * STRICT DATA INTEGRITY RULE:
 * - IPL 2026 is fully mapped with 162 verified franchise players.
 * - Historical seasons (2008–2025) are explicitly reported as pending structured roster archival
 *   to avoid hallucinating fake historical player participation.
 */

// Memoized IPL 2026 verified player pool (162 players across 10 franchises)
const IPL_2026_PLAYERS: NormalizedPlayer[] = FALLBACK_PLAYERS.filter(
  (p) => Boolean(p.ipl2026Team) || Boolean(p.ipl2026?.team)
);

// All players in dataset who have recorded career IPL statistics or 2026 franchise mappings
const ALL_IPL_CAREER_PLAYERS: NormalizedPlayer[] = FALLBACK_PLAYERS.filter((p) => {
  if (p.ipl2026Team || p.ipl2026?.team) return true;
  const iplBattingMatches = p.stats?.ipl?.batting?.matches || 0;
  const iplBowlingMatches = p.stats?.ipl?.bowling?.matches || 0;
  return iplBattingMatches > 0 || iplBowlingMatches > 0;
});

/**
 * Returns available seasons and their data integrity status
 */
export function getIplSeasonAvailabilityList(): IPLSeasonAvailability[] {
  const seasons: IPLSeasonAvailability[] = [];

  // IPL 2026: Fully verified
  seasons.push({
    year: 2026,
    label: 'IPL 2026 (Verified Roster)',
    isAvailable: true,
    playerCount: IPL_2026_PLAYERS.length,
    description: `Complete verified pool of ${IPL_2026_PLAYERS.length} players across all 10 IPL franchises.`,
    mappedPlayers: IPL_2026_PLAYERS,
  });

  // Historical Seasons: 2008 to 2025
  for (let year = 2025; year >= 2008; year--) {
    seasons.push({
      year,
      label: `IPL ${year}`,
      isAvailable: false,
      playerCount: 0,
      description: `Detailed historical squad rosters for IPL ${year} are pending official archive ingestion. Data is not fabricated.`,
    });
  }

  return seasons;
}

/**
 * Retrieves player pool for a given IPL season year
 */
export function getPlayersForIplYear(year: number): {
  isAvailable: boolean;
  players: NormalizedPlayer[];
  message: string;
} {
  if (year === 2026) {
    return {
      isAvailable: true,
      players: IPL_2026_PLAYERS,
      message: `Loaded ${IPL_2026_PLAYERS.length} verified players mapped to IPL 2026 franchises.`,
    };
  }

  return {
    isAvailable: false,
    players: [],
    message: `Historical roster for IPL ${year} is pending official archival ingestion. CrickXplore does not fabricate historical participation data.`,
  };
}

/**
 * Retrieves all players in the 457 database who have recorded IPL history
 */
export function getAllIplCareerPlayers(): NormalizedPlayer[] {
  return ALL_IPL_CAREER_PLAYERS;
}

/**
 * Helper to fetch a player by ID from the global 457 player dataset
 */
export function getPlayerByIdFromDatabase(playerId: string): NormalizedPlayer | undefined {
  return FALLBACK_PLAYERS.find((p) => p.id === playerId);
}

/**
 * Helper to get multiple players by IDs
 */
export function getPlayersByIdsFromDatabase(playerIds: string[]): NormalizedPlayer[] {
  const idSet = new Set(playerIds);
  return FALLBACK_PLAYERS.filter((p) => idSet.has(p.id));
}
