/**
 * Centralized Gemini Cricket Intelligence Schemas & Types
 * Defines strict contracts for all structured Gemini outputs across CrickXplore.
 */

export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type FactSource = 'gemini' | 'gemini-search' | 'fallback' | 'bbs';

export interface FactItem {
  field: string;
  value: string | number | boolean | null;
  confidence: ConfidenceLevel;
  source: FactSource;
  verified: boolean;
  lastUpdated?: string;
  notes?: string;
}

export interface PlayerIntelligenceData {
  source: 'gemini';
  playerId: string;
  playerName: string;
  narrative: string;
  tacticalProfile: {
    strengths: string[];
    weaknesses: string[];
    signatureShotsOrDeliveries: string[];
    matchRole: string;
    clutchRating?: string;
  };
  formatAnalysis: {
    test?: string;
    odi?: string;
    t20i?: string;
    ipl?: string;
  };
  facts: FactItem[];
  caveats: string[];
  generatedAt: string;
}

export interface PlayerEnrichmentData {
  source: 'gemini';
  playerId: string;
  playerName: string;
  t20iStats?: {
    matches?: number | null;
    runs?: number | null;
    battingAverage?: number | null;
    strikeRate?: number | null;
    wickets?: number | null;
    bowlingEconomy?: number | null;
    fifties?: number | null;
    centuries?: number | null;
  };
  iplStats?: {
    franchiseHistory: string[];
    recentRole?: string;
    matches?: number | null;
    runs?: number | null;
    battingAverage?: number | null;
    strikeRate?: number | null;
    wickets?: number | null;
    bowlingEconomy?: number | null;
    iplTitles?: string[];
  };
  biographicalContext?: {
    bioSummary: string;
    internationalDebutYear?: number | null;
    careerEra: string;
    notableMilestones: string[];
  };
  facts: FactItem[];
  caveats: string[];
  generatedAt: string;
}

export interface PlayerStatsGapData {
  source: 'gemini';
  playerId: string;
  playerName: string;
  identifiedGaps: string[];
  missingFormatInsights: Record<string, string>;
  confidenceRating: ConfidenceLevel;
  facts: FactItem[];
  caveats: string[];
  generatedAt: string;
}

export interface PlayerComparisonData {
  source: 'gemini';
  playerAId: string;
  playerAName: string;
  playerBId: string;
  playerBName: string;
  verdict: string;
  tacticalAdvantage: {
    playerA: string[];
    playerB: string[];
  };
  formatByFormatVerdict: {
    test?: string;
    odi?: string;
    t20i?: string;
    ipl?: string;
  };
  headToHeadContext?: string;
  comparativeNarrative: string;
  caveats: string[];
  generatedAt: string;
}

export interface CricketQueryData {
  source: 'gemini';
  query: string;
  answer: string;
  relatedEntities: {
    players?: string[];
    teams?: string[];
    tournaments?: string[];
    eras?: string[];
  };
  confidence: ConfidenceLevel;
  citations?: string[];
  caveats: string[];
  generatedAt: string;
}

export interface CardInsightData {
  source: 'gemini';
  playerId: string;
  playerName: string;
  cardTitle: string;
  collectorLore: string;
  rarityInsight: string;
  iconicStatHighlights: string[];
  flavorQuote: string;
  generatedAt: string;
}

export interface CurrentCricketContextData {
  source: 'gemini';
  topic: string;
  summary: string;
  recentEvents: string[];
  tournamentContext?: string;
  keyPerformers?: string[];
  sources?: string[];
  generatedAt: string;
}

export interface GeminiHealthStatus {
  status: 'operational' | 'degraded' | 'unavailable';
  model: string;
  testedAt: string;
  authValid: boolean;
  error?: string;
}
