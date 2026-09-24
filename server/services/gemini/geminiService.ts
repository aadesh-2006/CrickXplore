import { geminiServerClient, GeminiServerClient } from './geminiClient.ts';
import type {
  PlayerIntelligenceData,
  PlayerEnrichmentData,
  PlayerStatsGapData,
  PlayerComparisonData,
  CricketQueryData,
  CardInsightData,
  CurrentCricketContextData,
  GeminiHealthStatus,
} from './geminiSchemas.ts';
import {
  CRICKET_INTELLIGENCE_SYSTEM_PROMPT,
  buildPlayerIntelligencePrompt,
  buildPlayerEnrichmentPrompt,
  buildPlayerComparisonPrompt,
  buildCardInsightPrompt,
  buildCricketQueryPrompt,
  buildCurrentCricketContextPrompt,
} from './geminiPrompts.ts';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

export class GeminiIntelligenceService {
  private client: GeminiServerClient;
  private cache = new Map<string, CacheEntry<unknown>>();
  private inFlightRequests = new Map<string, Promise<unknown>>();

  // Cache TTL Constants
  private readonly TTL_INTELLIGENCE = 60 * 60 * 1000; // 1 hour
  private readonly TTL_ENRICHMENT = 2 * 60 * 60 * 1000; // 2 hours
  private readonly TTL_CARD_INSIGHT = 2 * 60 * 60 * 1000; // 2 hours
  private readonly TTL_COMPARISON = 30 * 60 * 1000; // 30 minutes
  private readonly TTL_QUERY = 15 * 60 * 1000; // 15 minutes
  private readonly TTL_CONTEXT = 15 * 60 * 1000; // 15 minutes

  constructor(clientOverride?: GeminiServerClient) {
    this.client = clientOverride || geminiServerClient;
  }

  /**
   * Helper: Cache retrieval with TTL check
   */
  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() - entry.timestamp > entry.ttlMs) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  /**
   * Helper: Cache storage
   */
  private setInCache<T>(key: string, data: T, ttlMs: number): void {
    this.cache.set(key, { data, timestamp: Date.now(), ttlMs });
  }

  /**
   * Helper: In-flight request deduplication wrapper
   */
  private async deduplicate<T>(key: string, executeFn: () => Promise<T>): Promise<T> {
    if (this.inFlightRequests.has(key)) {
      return this.inFlightRequests.get(key) as Promise<T>;
    }

    const promise = executeFn().finally(() => {
      this.inFlightRequests.delete(key);
    });

    this.inFlightRequests.set(key, promise);
    return promise;
  }

  /**
   * Check Gemini API Health & Connectivity
   */
  public async getHealthStatus(): Promise<GeminiHealthStatus> {
    if (!this.client.hasApiKey()) {
      return {
        status: 'unavailable',
        model: 'none',
        testedAt: new Date().toISOString(),
        authValid: false,
        error: 'GEMINI_API_KEY is not configured in server environment',
      };
    }

    try {
      const model = await this.client.ensureValidatedModel();
      return {
        status: 'operational',
        model,
        testedAt: new Date().toISOString(),
        authValid: true,
      };
    } catch (err) {
      return {
        status: 'degraded',
        model: this.client.getActiveModel(),
        testedAt: new Date().toISOString(),
        authValid: false,
        error: (err as Error).message,
      };
    }
  }

  /**
   * 1. Player Intelligence: tactical profile, clutch analysis, narrative
   */
  public async getPlayerIntelligence(player: {
    id: string;
    name: string;
    country: string;
    role: string;
    battingStyle?: string;
    bowlingStyle?: string;
    stats?: Record<string, unknown>;
    ipl2026Team?: string;
  }): Promise<PlayerIntelligenceData> {
    const cacheKey = `intel:${player.id}`;
    const cached = this.getFromCache<PlayerIntelligenceData>(cacheKey);
    if (cached) return cached;

    return this.deduplicate(cacheKey, async () => {
      if (!this.client.hasApiKey()) {
        return this.createFallbackIntelligence(player);
      }

      try {
        const prompt = buildPlayerIntelligencePrompt(player);
        const result = await this.client.generateStructured<PlayerIntelligenceData>(
          prompt,
          CRICKET_INTELLIGENCE_SYSTEM_PROMPT
        );

        // Sanitize and ensure required fields
        const sanitized: PlayerIntelligenceData = {
          source: 'gemini',
          playerId: player.id,
          playerName: player.name,
          narrative: result.narrative || `${player.name} is an accomplished ${player.role} representing ${player.country}.`,
          tacticalProfile: {
            strengths: Array.isArray(result.tacticalProfile?.strengths) ? result.tacticalProfile.strengths : ['Technical adaptability'],
            weaknesses: Array.isArray(result.tacticalProfile?.weaknesses) ? result.tacticalProfile.weaknesses : [],
            signatureShotsOrDeliveries: Array.isArray(result.tacticalProfile?.signatureShotsOrDeliveries) ? result.tacticalProfile.signatureShotsOrDeliveries : [],
            matchRole: result.tacticalProfile?.matchRole || player.role,
            clutchRating: result.tacticalProfile?.clutchRating,
          },
          formatAnalysis: result.formatAnalysis || {},
          facts: Array.isArray(result.facts) ? result.facts.map(f => ({ ...f, source: 'gemini' as const, verified: false })) : [],
          caveats: result.caveats || ['Enriched via Gemini Cricket Intelligence'],
          generatedAt: new Date().toISOString(),
        };

        this.setInCache(cacheKey, sanitized, this.TTL_INTELLIGENCE);
        return sanitized;
      } catch (err) {
        console.warn(`[GeminiService] getPlayerIntelligence failed for ${player.name}:`, (err as Error).message);
        const fallback = this.createFallbackIntelligence(player);
        this.setInCache(cacheKey, fallback, 60 * 1000); // 1 minute short cache on error
        return fallback;
      }
    });
  }

  /**
   * 2. Player Enrichment: T20I / IPL franchise gaps & biographical context
   */
  public async getPlayerEnrichment(player: {
    id: string;
    name: string;
    country: string;
    role: string;
  }): Promise<PlayerEnrichmentData> {
    const cacheKey = `enrich:${player.id}`;
    const cached = this.getFromCache<PlayerEnrichmentData>(cacheKey);
    if (cached) return cached;

    return this.deduplicate(cacheKey, async () => {
      if (!this.client.hasApiKey()) {
        return this.createFallbackEnrichment(player);
      }

      try {
        const prompt = buildPlayerEnrichmentPrompt(player);
        const result = await this.client.generateStructured<PlayerEnrichmentData>(
          prompt,
          CRICKET_INTELLIGENCE_SYSTEM_PROMPT
        );

        const sanitized: PlayerEnrichmentData = {
          source: 'gemini',
          playerId: player.id,
          playerName: player.name,
          t20iStats: result.t20iStats,
          iplStats: result.iplStats,
          biographicalContext: result.biographicalContext,
          facts: Array.isArray(result.facts) ? result.facts.map(f => ({ ...f, source: 'gemini' as const, verified: false })) : [],
          caveats: result.caveats || ['Enriched T20I/IPL context'],
          generatedAt: new Date().toISOString(),
        };

        this.setInCache(cacheKey, sanitized, this.TTL_ENRICHMENT);
        return sanitized;
      } catch (err) {
        console.warn(`[GeminiService] getPlayerEnrichment failed for ${player.name}:`, (err as Error).message);
        return this.createFallbackEnrichment(player);
      }
    });
  }

  /**
   * 3. Player Stats Gap Analysis
   */
  public async getPlayerStatsGap(player: {
    id: string;
    name: string;
    country: string;
    role: string;
  }): Promise<PlayerStatsGapData> {
    const cacheKey = `gap:${player.id}`;
    const cached = this.getFromCache<PlayerStatsGapData>(cacheKey);
    if (cached) return cached;

    return this.deduplicate(cacheKey, async () => {
      const enrichment = await this.getPlayerEnrichment(player);
      const gaps: string[] = [];
      const missingInsights: Record<string, string> = {};

      if (!enrichment.t20iStats?.matches) {
        gaps.push('T20I career breakdown unrecorded in raw source');
      }
      if (!enrichment.iplStats?.matches) {
        gaps.push('IPL career breakdown unrecorded in raw source');
      }

      if (enrichment.iplStats?.franchiseHistory && enrichment.iplStats.franchiseHistory.length > 0) {
        missingInsights['iplFranchises'] = `Represented: ${enrichment.iplStats.franchiseHistory.join(', ')}`;
      }

      const result: PlayerStatsGapData = {
        source: 'gemini',
        playerId: player.id,
        playerName: player.name,
        identifiedGaps: gaps,
        missingFormatInsights: missingInsights,
        confidenceRating: gaps.length > 0 ? 'medium' : 'high',
        facts: enrichment.facts,
        caveats: ['Derived via Gemini Gap Resolution'],
        generatedAt: new Date().toISOString(),
      };

      this.setInCache(cacheKey, result, this.TTL_ENRICHMENT);
      return result;
    });
  }

  /**
   * 4. Player Comparison: in-depth tactical head-to-head analysis
   */
  public async comparePlayers(
    playerA: { id: string; name: string; country: string; role: string },
    playerB: { id: string; name: string; country: string; role: string }
  ): Promise<PlayerComparisonData> {
    const cacheKey = `comp:${[playerA.id, playerB.id].sort().join('_')}`;
    const cached = this.getFromCache<PlayerComparisonData>(cacheKey);
    if (cached) return cached;

    return this.deduplicate(cacheKey, async () => {
      if (!this.client.hasApiKey()) {
        return this.createFallbackComparison(playerA, playerB);
      }

      try {
        const prompt = buildPlayerComparisonPrompt(playerA, playerB);
        const result = await this.client.generateStructured<PlayerComparisonData>(
          prompt,
          CRICKET_INTELLIGENCE_SYSTEM_PROMPT
        );

        const sanitized: PlayerComparisonData = {
          source: 'gemini',
          playerAId: playerA.id,
          playerAName: playerA.name,
          playerBId: playerB.id,
          playerBName: playerB.name,
          verdict: result.verdict || `Comparative analysis between ${playerA.name} and ${playerB.name}.`,
          tacticalAdvantage: result.tacticalAdvantage || { playerA: [], playerB: [] },
          formatByFormatVerdict: result.formatByFormatVerdict || {},
          headToHeadContext: result.headToHeadContext,
          comparativeNarrative: result.comparativeNarrative || '',
          caveats: result.caveats || ['Analytical comparison derived via Gemini'],
          generatedAt: new Date().toISOString(),
        };

        this.setInCache(cacheKey, sanitized, this.TTL_COMPARISON);
        return sanitized;
      } catch (err) {
        console.warn(`[GeminiService] comparePlayers failed:`, (err as Error).message);
        return this.createFallbackComparison(playerA, playerB);
      }
    });
  }

  /**
   * 5. Digital Collectible Card Insight & Lore
   */
  public async generateCardInsight(
    player: { id: string; name: string; country: string; role: string },
    cardMeta?: { tier?: string; serialNumber?: string }
  ): Promise<CardInsightData> {
    const cacheKey = `card:${player.id}:${cardMeta?.tier || 'standard'}`;
    const cached = this.getFromCache<CardInsightData>(cacheKey);
    if (cached) return cached;

    return this.deduplicate(cacheKey, async () => {
      if (!this.client.hasApiKey()) {
        return this.createFallbackCardInsight(player, cardMeta);
      }

      try {
        const prompt = buildCardInsightPrompt(player, cardMeta);
        const result = await this.client.generateStructured<CardInsightData>(
          prompt,
          CRICKET_INTELLIGENCE_SYSTEM_PROMPT
        );

        const sanitized: CardInsightData = {
          source: 'gemini',
          playerId: player.id,
          playerName: player.name,
          cardTitle: result.cardTitle || `${player.name} — CrickXplore Collectible`,
          collectorLore: result.collectorLore || `An iconic card commemorating ${player.name}'s contributions to ${player.country} cricket.`,
          rarityInsight: result.rarityInsight || 'Premium collectible edition featuring verified career telemetry.',
          iconicStatHighlights: Array.isArray(result.iconicStatHighlights) ? result.iconicStatHighlights : [],
          flavorQuote: result.flavorQuote || 'Every ball is an opportunity for greatness.',
          generatedAt: new Date().toISOString(),
        };

        this.setInCache(cacheKey, sanitized, this.TTL_CARD_INSIGHT);
        return sanitized;
      } catch (err) {
        console.warn(`[GeminiService] generateCardInsight failed for ${player.name}:`, (err as Error).message);
        return this.createFallbackCardInsight(player, cardMeta);
      }
    });
  }

  /**
   * 6. Natural Language Cricket Query
   */
  public async answerCricketQuery(
    query: string,
    context?: Record<string, unknown>
  ): Promise<CricketQueryData> {
    const normalizedQuery = query.trim().toLowerCase();
    const cacheKey = `query:${normalizedQuery}`;
    const cached = this.getFromCache<CricketQueryData>(cacheKey);
    if (cached) return cached;

    return this.deduplicate(cacheKey, async () => {
      if (!this.client.hasApiKey()) {
        return {
          source: 'gemini',
          query,
          answer: 'Cricket Intelligence is operating in offline mode. Please verify the server configuration.',
          relatedEntities: {},
          confidence: 'low',
          caveats: ['Offline Mode'],
          generatedAt: new Date().toISOString(),
        };
      }

      try {
        const prompt = buildCricketQueryPrompt(query, context);
        const result = await this.client.generateStructured<CricketQueryData>(
          prompt,
          CRICKET_INTELLIGENCE_SYSTEM_PROMPT
        );

        const sanitized: CricketQueryData = {
          source: 'gemini',
          query,
          answer: result.answer || 'No specific answer found.',
          relatedEntities: result.relatedEntities || {},
          confidence: result.confidence || 'medium',
          citations: result.citations,
          caveats: result.caveats || [],
          generatedAt: new Date().toISOString(),
        };

        this.setInCache(cacheKey, sanitized, this.TTL_QUERY);
        return sanitized;
      } catch (err) {
        console.warn(`[GeminiService] answerCricketQuery failed for "${query}":`, (err as Error).message);
        return {
          source: 'gemini',
          query,
          answer: `Could not retrieve response at this time. ${(err as Error).message}`,
          relatedEntities: {},
          confidence: 'low',
          caveats: ['Query failed'],
          generatedAt: new Date().toISOString(),
        };
      }
    });
  }

  /**
   * 7. Current Cricket Context
   */
  public async getCurrentCricketContext(topic: string): Promise<CurrentCricketContextData> {
    const cacheKey = `ctx:${topic.trim().toLowerCase()}`;
    const cached = this.getFromCache<CurrentCricketContextData>(cacheKey);
    if (cached) return cached;

    return this.deduplicate(cacheKey, async () => {
      if (!this.client.hasApiKey()) {
        return {
          source: 'gemini',
          topic,
          summary: `Current cricket context for "${topic}" is unavailable offline.`,
          recentEvents: [],
          sources: ['CrickXplore Archive'],
          generatedAt: new Date().toISOString(),
        };
      }

      try {
        const prompt = buildCurrentCricketContextPrompt(topic);
        const result = await this.client.generateStructured<CurrentCricketContextData>(
          prompt,
          CRICKET_INTELLIGENCE_SYSTEM_PROMPT
        );

        const sanitized: CurrentCricketContextData = {
          source: 'gemini',
          topic,
          summary: result.summary || `Cricket briefing for ${topic}.`,
          recentEvents: Array.isArray(result.recentEvents) ? result.recentEvents : [],
          tournamentContext: result.tournamentContext,
          keyPerformers: result.keyPerformers,
          sources: result.sources || ['CrickXplore Intelligence'],
          generatedAt: new Date().toISOString(),
        };

        this.setInCache(cacheKey, sanitized, this.TTL_CONTEXT);
        return sanitized;
      } catch (err) {
        return {
          source: 'gemini',
          topic,
          summary: `Context temporarily unavailable for ${topic}.`,
          recentEvents: [],
          sources: [],
          generatedAt: new Date().toISOString(),
        };
      }
    });
  }

  /**
   * Clear cache (useful for testing or manual revalidation)
   */
  public clearCache(): void {
    this.cache.clear();
  }

  // --- Safe Fallback Builders ---

  private createFallbackIntelligence(player: { id: string; name: string; country: string; role: string }): PlayerIntelligenceData {
    return {
      source: 'gemini',
      playerId: player.id,
      playerName: player.name,
      narrative: `${player.name} is a renowned ${player.role} who has represented ${player.country} across formats.`,
      tacticalProfile: {
        strengths: [`Proven international calibre in ${player.role} discipline`],
        weaknesses: [],
        signatureShotsOrDeliveries: [],
        matchRole: player.role,
      },
      formatAnalysis: {},
      facts: [],
      caveats: ['Generated via offline baseline intelligence'],
      generatedAt: new Date().toISOString(),
    };
  }

  private createFallbackEnrichment(player: { id: string; name: string; country: string; role: string }): PlayerEnrichmentData {
    return {
      source: 'gemini',
      playerId: player.id,
      playerName: player.name,
      biographicalContext: {
        bioSummary: `${player.name} represents ${player.country} as a specialist ${player.role}.`,
        careerEra: 'Modern Era',
        notableMilestones: [],
      },
      facts: [],
      caveats: ['Offline fallback enrichment'],
      generatedAt: new Date().toISOString(),
    };
  }

  private createFallbackComparison(
    playerA: { id: string; name: string; country: string; role: string },
    playerB: { id: string; name: string; country: string; role: string }
  ): PlayerComparisonData {
    return {
      source: 'gemini',
      playerAId: playerA.id,
      playerAName: playerA.name,
      playerBId: playerB.id,
      playerBName: playerB.name,
      verdict: `A statistical and tactical comparison between ${playerA.name} and ${playerB.name}.`,
      tacticalAdvantage: {
        playerA: [`Experience representing ${playerA.country}`],
        playerB: [`Experience representing ${playerB.country}`],
      },
      formatByFormatVerdict: {},
      comparativeNarrative: `Both ${playerA.name} and ${playerB.name} bring distinct tactical strengths to their respective sides.`,
      caveats: ['Offline comparison mode'],
      generatedAt: new Date().toISOString(),
    };
  }

  private createFallbackCardInsight(
    player: { id: string; name: string; country: string; role: string },
    cardMeta?: { tier?: string }
  ): CardInsightData {
    return {
      source: 'gemini',
      playerId: player.id,
      playerName: player.name,
      cardTitle: `${player.name} — ${cardMeta?.tier || 'Edition'} Card`,
      collectorLore: `Commemorative digital card featuring ${player.name} of ${player.country}.`,
      rarityInsight: 'Verified archival card authenticated by CrickXplore.',
      iconicStatHighlights: [],
      flavorQuote: 'Skill, discipline, and passion on the cricket pitch.',
      generatedAt: new Date().toISOString(),
    };
  }
}

export const geminiIntelligenceService = new GeminiIntelligenceService();
