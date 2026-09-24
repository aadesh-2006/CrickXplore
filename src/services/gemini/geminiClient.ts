/**
 * Client-side Gemini API Interface
 * Calls secure server endpoints at /api/gemini/* (API key remains on the server).
 * Includes client-side in-memory caching and request deduplication.
 */

import type {
  PlayerIntelligenceData,
  PlayerEnrichmentData,
  PlayerStatsGapData,
  PlayerComparisonData,
  CricketQueryData,
  CardInsightData,
  CurrentCricketContextData,
  GeminiHealthStatus,
} from '../../../server/services/gemini/geminiSchemas';
import type { NormalizedPlayer } from '../../types/player';

class ClientGeminiApi {
  private cache = new Map<string, { data: unknown; timestamp: number }>();
  private inFlight = new Map<string, Promise<unknown>>();
  private readonly CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes client cache

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.CACHE_TTL_MS) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  private setCached<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private async fetchEndpoint<T>(endpoint: string, body?: unknown, method = 'POST'): Promise<T> {
    const cacheKey = `${method}:${endpoint}:${JSON.stringify(body || '')}`;
    const cached = this.getCached<T>(cacheKey);
    if (cached) return cached;

    if (this.inFlight.has(cacheKey)) {
      return this.inFlight.get(cacheKey) as Promise<T>;
    }

    const promise = (async () => {
      try {
        // If in Node/SSR/Testing environment without browser window, route directly to server service
        if (typeof window === 'undefined') {
          const { geminiIntelligenceService } = await import('../../../server/services/gemini/geminiService');
          if (endpoint === '/api/gemini/health') return (await geminiIntelligenceService.getHealthStatus()) as unknown as T;
          if (endpoint === '/api/gemini/player-intelligence') {
            const player = (body as { player: NormalizedPlayer }).player;
            return (await geminiIntelligenceService.getPlayerIntelligence(player)) as unknown as T;
          }
          if (endpoint === '/api/gemini/player-enrichment') {
            const player = (body as { player: NormalizedPlayer }).player;
            return (await geminiIntelligenceService.getPlayerEnrichment(player)) as unknown as T;
          }
          if (endpoint === '/api/gemini/player-stats-gap') {
            const player = (body as { player: NormalizedPlayer }).player;
            return (await geminiIntelligenceService.getPlayerStatsGap(player)) as unknown as T;
          }
          if (endpoint === '/api/gemini/player-comparison') {
            const { playerA, playerB } = body as { playerA: NormalizedPlayer; playerB: NormalizedPlayer };
            return (await geminiIntelligenceService.comparePlayers(playerA, playerB)) as unknown as T;
          }
          if (endpoint === '/api/gemini/query') {
            const { query, context } = body as { query: string; context?: Record<string, unknown> };
            return (await geminiIntelligenceService.answerCricketQuery(query, context)) as unknown as T;
          }
          if (endpoint === '/api/gemini/card-insight') {
            const { player, cardMeta } = body as { player: NormalizedPlayer; cardMeta?: { tier?: string } };
            return (await geminiIntelligenceService.generateCardInsight(player, cardMeta)) as unknown as T;
          }
          if (endpoint === '/api/gemini/current-context') {
            const { topic } = body as { topic: string };
            return (await geminiIntelligenceService.getCurrentCricketContext(topic)) as unknown as T;
          }
        }

        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as T;
        this.setCached(cacheKey, data);
        return data;
      } catch (err) {
        console.warn(`[ClientGeminiApi] Request to ${endpoint} failed:`, (err as Error).message);
        throw err;
      } finally {
        this.inFlight.delete(cacheKey);
      }
    })();

    this.inFlight.set(cacheKey, promise);
    return promise;
  }

  /**
   * Health Check
   */
  public async getHealth(): Promise<GeminiHealthStatus> {
    try {
      return await this.fetchEndpoint<GeminiHealthStatus>('/api/gemini/health', undefined, 'GET');
    } catch {
      return {
        status: 'unavailable',
        model: 'none',
        testedAt: new Date().toISOString(),
        authValid: false,
        error: 'Cannot reach Gemini server endpoint',
      };
    }
  }

  /**
   * Player Intelligence
   */
  public async getPlayerIntelligence(player: NormalizedPlayer): Promise<PlayerIntelligenceData | null> {
    try {
      return await this.fetchEndpoint<PlayerIntelligenceData>('/api/gemini/player-intelligence', { player });
    } catch {
      return null;
    }
  }

  /**
   * Player Enrichment
   */
  public async getPlayerEnrichment(player: NormalizedPlayer): Promise<PlayerEnrichmentData | null> {
    try {
      return await this.fetchEndpoint<PlayerEnrichmentData>('/api/gemini/player-enrichment', { player });
    } catch {
      return null;
    }
  }

  /**
   * Player Stats Gap
   */
  public async getPlayerStatsGap(player: NormalizedPlayer): Promise<PlayerStatsGapData | null> {
    try {
      return await this.fetchEndpoint<PlayerStatsGapData>('/api/gemini/player-stats-gap', { player });
    } catch {
      return null;
    }
  }

  /**
   * Player Comparison
   */
  public async comparePlayers(
    playerA: NormalizedPlayer,
    playerB: NormalizedPlayer
  ): Promise<PlayerComparisonData | null> {
    try {
      return await this.fetchEndpoint<PlayerComparisonData>('/api/gemini/player-comparison', { playerA, playerB });
    } catch {
      return null;
    }
  }

  /**
   * Cricket Query
   */
  public async query(query: string, context?: Record<string, unknown>): Promise<CricketQueryData | null> {
    try {
      return await this.fetchEndpoint<CricketQueryData>('/api/gemini/query', { query, context });
    } catch {
      return null;
    }
  }

  /**
   * Card Lore & Insight
   */
  public async getCardInsight(
    player: NormalizedPlayer,
    cardMeta?: { tier?: string; serialNumber?: string }
  ): Promise<CardInsightData | null> {
    try {
      return await this.fetchEndpoint<CardInsightData>('/api/gemini/card-insight', { player, cardMeta });
    } catch {
      return null;
    }
  }

  /**
   * Current Cricket Context
   */
  public async getCurrentContext(topic: string): Promise<CurrentCricketContextData | null> {
    try {
      return await this.fetchEndpoint<CurrentCricketContextData>('/api/gemini/current-context', { topic });
    } catch {
      return null;
    }
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export const clientGeminiApi = new ClientGeminiApi();
