import { cricketApiClient } from './client';
import type { CricApiSearchResponse, CricApiPlayerInfoResponse, CricApiPlayerSearchItem } from './types';
import type { NormalizedPlayer, PlayerRole } from '../../types/player';
import { FALLBACK_PLAYERS } from '../../data/fallbackPlayers';

/**
 * Normalizes raw role strings from API into standard PlayerRole
 */
function normalizeRole(roleStr?: string): PlayerRole {
  if (!roleStr) return 'batter';
  const lower = roleStr.toLowerCase();
  if (lower.includes('allrounder') || lower.includes('all-rounder') || lower.includes('all rounder')) {
    return 'all-rounder';
  }
  if (lower.includes('wicket') || lower.includes('keeper') || lower.includes('wk')) {
    return 'wicket-keeper';
  }
  if (lower.includes('bowl')) {
    return 'bowler';
  }
  return 'batter';
}

/**
 * Normalizes a raw CricAPI search item into a NormalizedPlayer stub
 */
function normalizeSearchItem(raw: CricApiPlayerSearchItem): NormalizedPlayer {
  return {
    id: raw.id,
    name: raw.name,
    country: raw.country || 'International',
    countryCode: raw.country?.slice(0, 3).toUpperCase() || 'INT',
    role: normalizeRole(raw.role),
    battingStyle: raw.battingStyle,
    bowlingStyle: raw.bowlingStyle,
    placeOfBirth: raw.placeOfBirth,
    dateOfBirth: raw.dateOfBirth,
    imageUrl: raw.playerImg,
    isFallbackData: false,
    stats: {},
  };
}

/**
 * Centralized Cricket Player Data Service
 */
export const playerApi = {
  /**
   * Search for players with fallback support
   */
  async searchPlayers(query: string): Promise<{ players: NormalizedPlayer[]; isLive: boolean; error?: string }> {
    const trimmed = query.trim().toLowerCase();

    // If client does not have API key, use fallback dataset
    if (!cricketApiClient.hasApiKey()) {
      const results = trimmed.length === 0
        ? FALLBACK_PLAYERS
        : FALLBACK_PLAYERS.filter(
            p =>
              p.name.toLowerCase().includes(trimmed) ||
              p.country.toLowerCase().includes(trimmed) ||
              p.role.toLowerCase().includes(trimmed)
          );
      return { players: results, isLive: false };
    }

    // Attempt live API search
    try {
      if (trimmed.length === 0) {
        return { players: FALLBACK_PLAYERS, isLive: false };
      }

      const response = await cricketApiClient.get<CricApiSearchResponse>('players', {
        search: trimmed,
      });

      if (!response.data || response.data.length === 0) {
        // Fall back to local search if remote returned no results
        const localMatches = FALLBACK_PLAYERS.filter(p =>
          p.name.toLowerCase().includes(trimmed)
        );
        return { players: localMatches, isLive: true };
      }

      const normalized = response.data.map(normalizeSearchItem);
      return { players: normalized, isLive: true };
    } catch (err: unknown) {
      console.warn('[CrickXplore] Live API search failed, falling back to local archive:', err);
      const filtered = FALLBACK_PLAYERS.filter(p =>
        p.name.toLowerCase().includes(trimmed)
      );
      return {
        players: filtered.length > 0 ? filtered : FALLBACK_PLAYERS,
        isLive: false,
        error: 'Live API currently unavailable. Displaying archival database.',
      };
    }
  },

  /**
   * Get complete player profile and statistics by ID
   */
  async getPlayerById(id: string): Promise<{ player: NormalizedPlayer | null; isLive: boolean }> {
    // Check fallback dataset first
    const fallbackMatch = FALLBACK_PLAYERS.find(p => p.id === id);
    if (fallbackMatch) {
      return { player: fallbackMatch, isLive: false };
    }

    if (!cricketApiClient.hasApiKey()) {
      return { player: fallbackMatch || null, isLive: false };
    }

    // Attempt live API fetch
    try {
      const response = await cricketApiClient.get<CricApiPlayerInfoResponse>('players_info', {
        id,
      });

      if (!response.data) {
        return { player: fallbackMatch || null, isLive: true };
      }

      const raw = response.data;
      const normalized: NormalizedPlayer = {
        id: raw.id,
        name: raw.name,
        country: raw.country || 'International',
        countryCode: raw.country?.slice(0, 3).toUpperCase() || 'INT',
        role: normalizeRole(raw.role),
        battingStyle: raw.battingStyle,
        bowlingStyle: raw.bowlingStyle,
        placeOfBirth: raw.placeOfBirth,
        dateOfBirth: raw.dateOfBirth,
        imageUrl: raw.playerImg,
        isFallbackData: false,
        stats: {},
      };

      return { player: normalized, isLive: true };
    } catch (err) {
      console.warn('[CrickXplore] Failed to fetch player profile by ID:', err);
      return { player: fallbackMatch || null, isLive: false };
    }
  },

  /**
   * Returns all initial featured players for the Explorer
   */
  async getFeaturedPlayers(): Promise<{ players: NormalizedPlayer[]; isLive: boolean }> {
    return { players: FALLBACK_PLAYERS, isLive: cricketApiClient.hasApiKey() };
  },

  /**
   * Check if Live API key is active
   */
  isLiveApiActive(): boolean {
    return cricketApiClient.hasApiKey();
  },
};
