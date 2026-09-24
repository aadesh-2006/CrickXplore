/**
 * Central Cricket Data Orchestration Service
 * Integrates:
 * 1. Grounded Current Player Statistics Layer (Grounded in ESPNcricinfo, ICC, IPL Official records)
 * 2. Immutable Fallback Baseline (High confidence historical archive)
 * 3. Gemini Cricket Intelligence (Tactical profiles, clutch analysis, narrative context, collectibles)
 *
 * CRITICAL RULE: Gemini never blindly overwrites verified numeric statistics.
 */

import { FALLBACK_PLAYERS } from '../data/players';
import { playerApi } from '../api/cricket/playerApi';
import { clientGeminiApi } from './gemini/geminiClient';
import { resolveGroundedPlayerStats } from '../data/live-player-stats/groundedRegistry';
import type { GroundedPlayerStats } from '../data/live-player-stats/types';
import type { NormalizedPlayer, FormatType, BattingStats, BowlingStats } from '../types/player';
import type {
  PlayerIntelligenceData,
  PlayerEnrichmentData,
  PlayerStatsGapData,
  CardInsightData,
} from '../../server/services/gemini/geminiSchemas';

export type DataFieldSource = 'VERIFIED' | 'LIVE' | 'GEMINI_ENRICHED' | 'UNKNOWN';

export interface SourcedValue<T> {
  value: T;
  source: DataFieldSource;
  sourceLabel?: string;
  sourceUrl?: string;
  verified: boolean;
  confidence?: number;
  lastUpdated?: string;
}

export interface OrchestratedFormatStats {
  batting?: { [K in keyof BattingStats]?: SourcedValue<BattingStats[K]> };
  bowling?: { [K in keyof BowlingStats]?: SourcedValue<BowlingStats[K]> };
}

export interface OrchestratedPlayerStats {
  test?: OrchestratedFormatStats;
  odi?: OrchestratedFormatStats;
  t20i?: OrchestratedFormatStats;
  ipl?: OrchestratedFormatStats;
}

export interface OrchestratedPlayer extends NormalizedPlayer {
  sourcedStats: OrchestratedPlayerStats;
  groundedStats?: GroundedPlayerStats;
  intelligence?: PlayerIntelligenceData | null;
  enrichment?: PlayerEnrichmentData | null;
  cardLore?: CardInsightData | null;
  dataSourceSummary: {
    baselineSource: DataFieldSource;
    hasLiveTelemetry: boolean;
    hasGeminiEnrichment: boolean;
    primarySource?: string;
    lastUpdated?: string;
  };
}

function buildSourcedStatsFromGrounded(grounded: GroundedPlayerStats): OrchestratedPlayerStats {
  const result: OrchestratedPlayerStats = {};
  const formats: FormatType[] = ['test', 'odi', 't20i', 'ipl'];

  for (const fmt of formats) {
    const fmtData = grounded.formats[fmt];
    if (!fmtData) continue;

    const fmtResult: OrchestratedFormatStats = {};

    if (fmtData.batting) {
      fmtResult.batting = {};
      for (const [k, field] of Object.entries(fmtData.batting)) {
        if (field && field.value !== null && field.value !== undefined) {
          fmtResult.batting[k as keyof BattingStats] = {
            value: field.value as never,
            source: field.verified ? (fmtData.summary?.status === 'CURRENT_VERIFIED' ? 'LIVE' : 'VERIFIED') : 'GEMINI_ENRICHED',
            sourceLabel: field.source,
            sourceUrl: field.sourceUrl,
            verified: field.verified,
            confidence: field.confidence,
            lastUpdated: field.retrievedAt,
          };
        }
      }
    }

    if (fmtData.bowling) {
      fmtResult.bowling = {};
      for (const [k, field] of Object.entries(fmtData.bowling)) {
        if (field && field.value !== null && field.value !== undefined) {
          fmtResult.bowling[k as keyof BowlingStats] = {
            value: field.value as never,
            source: field.verified ? (fmtData.summary?.status === 'CURRENT_VERIFIED' ? 'LIVE' : 'VERIFIED') : 'GEMINI_ENRICHED',
            sourceLabel: field.source,
            sourceUrl: field.sourceUrl,
            verified: field.verified,
            confidence: field.confidence,
            lastUpdated: field.retrievedAt,
          };
        }
      }
    }

    result[fmt] = fmtResult;
  }

  return result;
}

export class CricketDataService {
  /**
   * Get all baseline players
   */
  public getBaselinePlayers(): NormalizedPlayer[] {
    return FALLBACK_PLAYERS;
  }

  /**
   * Search players with multi-provider orchestration
   */
  public async searchPlayers(query: string): Promise<{ players: NormalizedPlayer[]; isLive: boolean }> {
    return playerApi.searchPlayers(query);
  }

  /**
   * Get a baseline player by ID (Synchronous)
   */
  public getPlayerByIdSync(id: string): NormalizedPlayer | null {
    return FALLBACK_PLAYERS.find(p => p.id === id) || null;
  }

  /**
   * Fully orchestrates a player's complete profile with grounded verified stats, telemetry, and Gemini intelligence
   */
  public async getOrchestratedPlayer(
    id: string,
    options?: { includeGemini?: boolean; cardTier?: string }
  ): Promise<OrchestratedPlayer | null> {
    const basePlayer = this.getPlayerByIdSync(id);
    if (!basePlayer) return null;

    // 1. Fetch grounded statistics
    const liveRes = await playerApi.getPlayerById(id);
    const currentPlayer = liveRes.player || basePlayer;
    const groundedStats = liveRes.groundedStats || resolveGroundedPlayerStats(currentPlayer);

    // 2. Wrap stats with per-field provenance
    const sourcedStats = buildSourcedStatsFromGrounded(groundedStats);

    let intelligence: PlayerIntelligenceData | null = null;
    let enrichment: PlayerEnrichmentData | null = null;
    let cardLore: CardInsightData | null = null;

    // 3. Enrich with Gemini Intelligence (if enabled)
    if (options?.includeGemini !== false) {
      try {
        const [intelData, enrichData, cardData] = await Promise.all([
          clientGeminiApi.getPlayerIntelligence(currentPlayer),
          clientGeminiApi.getPlayerEnrichment(currentPlayer),
          clientGeminiApi.getCardInsight(currentPlayer, { tier: options?.cardTier }),
        ]);

        intelligence = intelData;
        enrichment = enrichData;
        cardLore = cardData;
      } catch (err) {
        console.warn(`[CricketDataService] Gemini enrichment failed for ${currentPlayer.name}:`, err);
      }
    }

    const isCurrent = groundedStats.overallStatus === 'CURRENT_VERIFIED';

    return {
      ...currentPlayer,
      sourcedStats,
      groundedStats,
      intelligence,
      enrichment,
      cardLore,
      dataSourceSummary: {
        baselineSource: isCurrent ? 'LIVE' : 'VERIFIED',
        hasLiveTelemetry: isCurrent,
        hasGeminiEnrichment: !!intelligence || !!enrichment,
        primarySource: groundedStats.formats.odi?.summary?.primarySource || groundedStats.formats.test?.summary?.primarySource || 'Verified Archive DB',
        lastUpdated: liveRes.lastUpdated,
      },
    };
  }

  /**
   * Get gap analysis between verified and missing data
   */
  public async getPlayerStatsGap(player: NormalizedPlayer): Promise<PlayerStatsGapData | null> {
    return clientGeminiApi.getPlayerStatsGap(player);
  }
}

export const cricketDataService = new CricketDataService();

