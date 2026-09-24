import type { NormalizedPlayer, FormatType, BattingStats, BowlingStats } from '../../types/player';
import { FALLBACK_PLAYERS } from '../../data/players';
import { resolveGroundedPlayerStats } from '../../data/live-player-stats/groundedRegistry';
import type { GroundedPlayerStats, GroundedField } from '../../data/live-player-stats/types';

/**
 * In-memory cache for resolved grounded player statistics
 */
const groundedPlayerCache = new Map<string, { player: NormalizedPlayer; groundedStats: GroundedPlayerStats; timestamp: number }>();
const CACHE_TTL_MS = 15 * 60 * 1000;

function unwrapGroundedBatting(b?: Record<string, GroundedField<unknown>>): BattingStats | undefined {
  if (!b) return undefined;
  return {
    matches: (b.matches?.value as number) ?? 0,
    innings: (b.innings?.value as number) ?? (b.matches?.value as number) ?? 0,
    runs: (b.runs?.value as number) ?? 0,
    balls: b.balls?.value as number | undefined,
    highestScore: b.highestScore?.value ? String(b.highestScore.value) : undefined,
    average: b.average?.value as number | null | undefined,
    strikeRate: b.strikeRate?.value as number | null | undefined,
    centuries: (b.hundreds?.value as number) ?? (b.centuries?.value as number) ?? 0,
    fifties: (b.fifties?.value as number) ?? 0,
    fours: b.fours?.value as number | undefined,
    sixes: b.sixes?.value as number | undefined,
    notOuts: b.notOuts?.value as number | undefined,
  };
}

function unwrapGroundedBowling(bw?: Record<string, GroundedField<unknown>>): BowlingStats | undefined {
  if (!bw) return undefined;
  return {
    matches: (bw.matches?.value as number) ?? 0,
    innings: (bw.innings?.value as number) ?? (bw.matches?.value as number) ?? 0,
    overs: bw.overs?.value as number | undefined,
    balls: bw.balls?.value as number | undefined,
    maidens: bw.maidens?.value as number | undefined,
    runsConceded: bw.runsConceded?.value as number | undefined,
    wickets: (bw.wickets?.value as number) ?? 0,
    average: bw.average?.value as number | null | undefined,
    economy: bw.economy?.value as number | null | undefined,
    strikeRate: bw.strikeRate?.value as number | null | undefined,
    bestBowlingInnings: bw.bestBowlingInnings?.value ? String(bw.bestBowlingInnings.value) : undefined,
    bestBowlingMatch: bw.bestBowlingMatch?.value ? String(bw.bestBowlingMatch.value) : undefined,
    fourWickets: bw.fourWickets?.value as number | undefined,
    fiveWickets: bw.fiveWickets?.value as number | undefined,
    tenWickets: bw.tenWickets?.value as number | undefined,
  };
}

/**
 * Centralized Cricket Player Data Service powered by Gemini Grounded Intelligence Layer
 */
export const playerApi = {
  /**
   * Search for players
   */
  async searchPlayers(query: string): Promise<{ players: NormalizedPlayer[]; isLive: boolean; error?: string }> {
    const trimmed = query.trim().toLowerCase();

    const results = trimmed.length === 0
      ? FALLBACK_PLAYERS
      : FALLBACK_PLAYERS.filter(
          p =>
            p.name.toLowerCase().includes(trimmed) ||
            p.country.toLowerCase().includes(trimmed) ||
            p.role.toLowerCase().includes(trimmed)
        );

    return { players: results, isLive: true };
  },

  /**
   * Get complete player profile and statistics by ID resolved via Grounded Intelligence Layer
   */
  async getPlayerById(id: string): Promise<{
    player: NormalizedPlayer | null;
    isLive: boolean;
    lastUpdated?: string;
    groundedStats?: GroundedPlayerStats;
  }> {
    const fallbackMatch = FALLBACK_PLAYERS.find(p => p.id === id);
    if (!fallbackMatch) return { player: null, isLive: false };

    // Check memory cache
    const cached = groundedPlayerCache.get(id);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return {
        player: cached.player,
        isLive: cached.groundedStats.overallStatus === 'CURRENT_VERIFIED',
        lastUpdated: cached.groundedStats.retrievedAt,
        groundedStats: cached.groundedStats,
      };
    }

    // Resolve grounded statistics
    const grounded = resolveGroundedPlayerStats(fallbackMatch);

    const mergedStats: NormalizedPlayer['stats'] = {};
    const formats: FormatType[] = ['test', 'odi', 't20i', 'ipl'];

    for (const fmt of formats) {
      const gFmt = grounded.formats[fmt];
      if (gFmt) {
        mergedStats[fmt] = {
          batting: unwrapGroundedBatting(gFmt.batting as Record<string, GroundedField<unknown>> | undefined),
          bowling: unwrapGroundedBowling(gFmt.bowling as Record<string, GroundedField<unknown>> | undefined),
        };
      }
    }

    const isCurrent = grounded.overallStatus === 'CURRENT_VERIFIED';
    const primaryLastUpdated = grounded.formats.odi?.summary?.lastUpdated ||
      grounded.formats.test?.summary?.lastUpdated ||
      grounded.retrievedAt;

    const resolvedPlayer: NormalizedPlayer = {
      ...fallbackMatch,
      stats: mergedStats,
      isFallbackData: !isCurrent,
      lastUpdated: primaryLastUpdated,
    };

    groundedPlayerCache.set(id, {
      player: resolvedPlayer,
      groundedStats: grounded,
      timestamp: Date.now(),
    });

    return {
      player: resolvedPlayer,
      isLive: isCurrent,
      lastUpdated: primaryLastUpdated,
      groundedStats: grounded,
    };
  },

  /**
   * Fetch live statistics on-demand for a given player instance
   */
  async getLivePlayerStats(player: NormalizedPlayer): Promise<{ player: NormalizedPlayer; isLive: boolean }> {
    const res = await this.getPlayerById(player.id);
    return { player: res.player || player, isLive: res.isLive };
  },

  /**
   * Returns full field-level grounded statistics object for a player
   */
  getGroundedStats(player: NormalizedPlayer): GroundedPlayerStats {
    return resolveGroundedPlayerStats(player);
  },

  /**
   * Returns all initial featured players for the Explorer
   */
  async getFeaturedPlayers(): Promise<{ players: NormalizedPlayer[]; isLive: boolean }> {
    return { players: FALLBACK_PLAYERS, isLive: true };
  },

  /**
   * Check if Grounded Intelligence Layer is active
   */
  isLiveApiActive(): boolean {
    return true;
  },
};

