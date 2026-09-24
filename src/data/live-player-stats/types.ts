/**
 * Grounded Field-Level Cricket Statistics Schema
 * Every individual numeric and categorical field retains its own verifiable provenance.
 */

export type StatSourceType =
  | 'ESPNcricinfo'
  | 'ICC Official'
  | 'IPL Official (iplt20.com)'
  | 'BCCI / Cricket Australia / ECB'
  | 'Verified Baseline Archive'
  | 'Unavailable';

export interface GroundedField<T> {
  value: T | null;
  source: string;
  sourceUrl?: string;
  retrievedAt: string;
  confidence: number; // 0.0 to 1.0
  verified: boolean;
}

export interface GroundedBattingStats {
  matches?: GroundedField<number>;
  innings?: GroundedField<number>;
  runs?: GroundedField<number>;
  balls?: GroundedField<number>;
  highestScore?: GroundedField<string>;
  average?: GroundedField<number>;
  strikeRate?: GroundedField<number>;
  fours?: GroundedField<number>;
  sixes?: GroundedField<number>;
  fifties?: GroundedField<number>;
  hundreds?: GroundedField<number>;
  ducks?: GroundedField<number>;
  notOuts?: GroundedField<number>;
}

export interface GroundedBowlingStats {
  matches?: GroundedField<number>;
  innings?: GroundedField<number>;
  overs?: GroundedField<number>;
  balls?: GroundedField<number>;
  maidens?: GroundedField<number>;
  runsConceded?: GroundedField<number>;
  wickets?: GroundedField<number>;
  average?: GroundedField<number>;
  economy?: GroundedField<number>;
  strikeRate?: GroundedField<number>;
  bestBowlingInnings?: GroundedField<string>;
  bestBowlingMatch?: GroundedField<string>;
  fourWickets?: GroundedField<number>;
  fiveWickets?: GroundedField<number>;
  tenWickets?: GroundedField<number>;
}

export interface GroundedFieldingStats {
  catches?: GroundedField<number>;
  stumpings?: GroundedField<number>;
  runOuts?: GroundedField<number>;
}

export interface GroundedFormatStats {
  batting?: GroundedBattingStats;
  bowling?: GroundedBowlingStats;
  fielding?: GroundedFieldingStats;
  summary: {
    format: 'test' | 'odi' | 't20i' | 'ipl';
    status: 'CURRENT_VERIFIED' | 'PARTIALLY_VERIFIED' | 'FALLBACK_ARCHIVE' | 'UNAVAILABLE';
    primarySource: string;
    sourceUrl?: string;
    lastUpdated: string;
    verifiedFieldsCount: number;
    fallbackFieldsCount: number;
  };
}

export interface GroundedPlayerStats {
  playerId: string;
  playerName: string;
  country: string;
  role: string;
  formats: {
    test?: GroundedFormatStats;
    odi?: GroundedFormatStats;
    t20i?: GroundedFormatStats;
    ipl?: GroundedFormatStats;
  };
  retrievedAt: string;
  overallStatus: 'CURRENT_VERIFIED' | 'PARTIALLY_VERIFIED' | 'FALLBACK_ARCHIVE';
}
