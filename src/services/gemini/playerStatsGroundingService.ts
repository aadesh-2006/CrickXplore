import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import type { NormalizedPlayer, FormatType } from '../../types/player';
import type { GroundedPlayerStats } from '../../data/live-player-stats/types';
import { makeGroundedField, validateGroundedStats, GROUNDED_PLAYER_ARCHIVE } from '../../data/live-player-stats/groundedRegistry';

function resolveApiKey(): string {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }
  try {
    const cwd = process.cwd ? process.cwd() : '.';
    const envPaths = [path.resolve(cwd, '.env'), path.resolve(cwd, '../.env')];
    for (const p of envPaths) {
      if (fs.existsSync(p)) {
        const lines = fs.readFileSync(p, 'utf-8').split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('GEMINI_API_KEY=')) {
            const key = line.trim().substring('GEMINI_API_KEY='.length).trim();
            if (key) return key;
          }
        }
      }
    }
  } catch {
    // ignore
  }
  return '';
}

export interface GroundingFetchResult {
  playerId: string;
  playerName: string;
  status: 'CURRENT_GROUNDED' | 'PARTIAL' | 'FALLBACK' | 'FAILED' | 'AMBIGUOUS';
  source?: string;
  sourceUrl?: string;
  retrievedAt: string;
  stats?: GroundedPlayerStats;
  error?: string;
}

export class PlayerStatsGroundingService {
  private ai: GoogleGenAI | null = null;
  private readonly model = 'gemini-3.6-flash';

  constructor() {
    const key = resolveApiKey();
    if (key) {
      this.ai = new GoogleGenAI({ apiKey: key });
    }
  }

  /**
   * Generically refreshes statistics for ANY player using Gemini Google Search Grounding.
   */
  public async refreshPlayerStats(player: NormalizedPlayer): Promise<GroundingFetchResult> {
    const now = new Date().toISOString();

    // If pre-cached in verified grounded archive, use it
    if (GROUNDED_PLAYER_ARCHIVE[player.id]) {
      const arch = GROUNDED_PLAYER_ARCHIVE[player.id];
      return {
        playerId: player.id,
        playerName: player.name,
        status: 'CURRENT_GROUNDED',
        source: arch.formats.odi?.summary?.primarySource || arch.formats.test?.summary?.primarySource || 'ESPNcricinfo',
        sourceUrl: arch.formats.odi?.summary?.sourceUrl || arch.formats.test?.summary?.sourceUrl,
        retrievedAt: arch.retrievedAt,
        stats: arch,
      };
    }

    if (!this.ai) {
      return {
        playerId: player.id,
        playerName: player.name,
        status: 'FALLBACK',
        retrievedAt: now,
        error: 'GEMINI_API_KEY not configured',
      };
    }

    const prompt = `You are a cricket data intelligence system.
Find and return the latest official career statistics for the cricket player: "${player.name}" from ${player.country} (${player.role}).

Search authoritative sources such as ESPNcricinfo, ICC official, or official board websites.
Return a STRICT JSON object only (no markdown, no conversational text) matching this schema:
{
  "playerName": "${player.name}",
  "country": "${player.country}",
  "primarySource": "ESPNcricinfo",
  "sourceUrl": "https://www.espncricinfo.com/cricketers/...",
  "lastUpdated": "2026-08-01",
  "formats": {
    "test": {
      "matches": number or null,
      "innings": number or null,
      "runs": number or null,
      "highestScore": string or null,
      "average": number or null,
      "strikeRate": number or null,
      "hundreds": number or null,
      "fifties": number or null,
      "wickets": number or null,
      "bowlingAverage": number or null,
      "economy": number or null
    },
    "odi": { ... },
    "t20i": { ... },
    "ipl": { ... }
  }
}
CRITICAL RULES:
- Never combine broad T20 career totals into T20I or IPL. Keep T20I and IPL strictly separated.
- If the player has not played a format, set that format to null.
- Only output numbers verified from search results.`;

    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      let raw = response.text?.trim() || '';
      if (raw.startsWith('```json')) raw = raw.slice(7);
      if (raw.startsWith('```')) raw = raw.slice(3);
      if (raw.endsWith('```')) raw = raw.slice(0, -3);
      raw = raw.trim();

      const parsed = JSON.parse(raw);
      const primaryUrl = parsed.sourceUrl || response.candidates?.[0]?.groundingMetadata?.groundingChunks?.[0]?.web?.uri;
      const primarySource = parsed.primarySource || 'ESPNcricinfo';

      const formats: GroundedPlayerStats['formats'] = {};
      const formatKeys: FormatType[] = ['test', 'odi', 't20i', 'ipl'];

      let groundedFormatCount = 0;

      for (const fmt of formatKeys) {
        const fData = parsed.formats?.[fmt];
        if (!fData || (!fData.matches && !fData.runs && !fData.wickets)) continue;

        groundedFormatCount++;
        formats[fmt] = {
          summary: {
            format: fmt,
            status: 'CURRENT_VERIFIED',
            primarySource,
            sourceUrl: primaryUrl,
            lastUpdated: parsed.lastUpdated || now.split('T')[0],
            verifiedFieldsCount: Object.keys(fData).filter(k => fData[k] !== null && fData[k] !== undefined).length,
            fallbackFieldsCount: 0,
          },
          batting: {
            matches: makeGroundedField(fData.matches, primarySource, primaryUrl, now),
            innings: makeGroundedField(fData.innings, primarySource, primaryUrl, now),
            runs: makeGroundedField(fData.runs, primarySource, primaryUrl, now),
            highestScore: makeGroundedField(fData.highestScore, primarySource, primaryUrl, now),
            average: makeGroundedField(fData.average, primarySource, primaryUrl, now),
            strikeRate: makeGroundedField(fData.strikeRate, primarySource, primaryUrl, now),
            hundreds: makeGroundedField(fData.hundreds, primarySource, primaryUrl, now),
            fifties: makeGroundedField(fData.fifties, primarySource, primaryUrl, now),
          },
          bowling: fData.wickets !== undefined || fData.economy !== undefined ? {
            matches: makeGroundedField(fData.matches, primarySource, primaryUrl, now),
            innings: makeGroundedField(fData.innings, primarySource, primaryUrl, now),
            wickets: makeGroundedField(fData.wickets, primarySource, primaryUrl, now),
            average: makeGroundedField(fData.bowlingAverage, primarySource, primaryUrl, now),
            economy: makeGroundedField(fData.economy, primarySource, primaryUrl, now),
          } : undefined,
        };
      }

      if (groundedFormatCount === 0) {
        return {
          playerId: player.id,
          playerName: player.name,
          status: 'AMBIGUOUS',
          retrievedAt: now,
          error: 'No formats could be extracted from search results',
        };
      }

      const groundedStats: GroundedPlayerStats = {
        playerId: player.id,
        playerName: player.name,
        country: player.country,
        role: player.role,
        retrievedAt: now,
        overallStatus: 'CURRENT_VERIFIED',
        formats,
      };

      const { isValid, errors } = validateGroundedStats(groundedStats);
      if (!isValid) {
        return {
          playerId: player.id,
          playerName: player.name,
          status: 'FAILED',
          retrievedAt: now,
          error: `Validation failed: ${errors.join('; ')}`,
        };
      }

      return {
        playerId: player.id,
        playerName: player.name,
        status: 'CURRENT_GROUNDED',
        source: primarySource,
        sourceUrl: primaryUrl,
        retrievedAt: now,
        stats: groundedStats,
      };
    } catch (err: any) {
      const isQuota = err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED');
      return {
        playerId: player.id,
        playerName: player.name,
        status: isQuota ? 'FALLBACK' : 'FAILED',
        retrievedAt: now,
        error: err.message,
      };
    }
  }

  /**
   * Executes a controlled batch of player statistics refreshes with rate limiting.
   */
  public async refreshBatch(
    players: NormalizedPlayer[],
    options?: { delayMs?: number; onProgress?: (res: GroundingFetchResult, index: number) => void }
  ): Promise<GroundingFetchResult[]> {
    const delay = options?.delayMs ?? 2000;
    const results: GroundingFetchResult[] = [];

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const res = await this.refreshPlayerStats(player);
      results.push(res);
      if (options?.onProgress) {
        options.onProgress(res, i + 1);
      }
      if (i < players.length - 1 && delay > 0) {
        await new Promise(r => setTimeout(r, delay));
      }
    }

    return results;
  }
}

export const playerStatsGroundingService = new PlayerStatsGroundingService();
