export type FormatType = 'test' | 'odi' | 't20i';

export type PlayerRole = 'batter' | 'bowler' | 'all-rounder' | 'wicket-keeper';

export interface BattingStats {
  matches: number;
  innings?: number;
  runs: number;
  average?: number | null;
  strikeRate?: number | null;
  highestScore?: string;
  centuries?: number;
  fifties?: number;
  fours?: number;
  sixes?: number;
  notOuts?: number;
}

export interface BowlingStats {
  matches: number;
  innings?: number;
  balls?: number;
  overs?: number;
  wickets: number;
  economy?: number | null;
  average?: number | null;
  strikeRate?: number | null;
  bestBowlingInnings?: string;
  bestBowlingMatch?: string;
  fiveWickets?: number;
  tenWickets?: number;
}

export interface FormatStats {
  batting?: BattingStats;
  bowling?: BowlingStats;
}

export interface NormalizedPlayer {
  id: string;
  name: string;
  country: string;
  countryCode?: string;
  role: PlayerRole;
  battingStyle?: string;
  bowlingStyle?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  imageUrl?: string;
  stats: {
    test?: FormatStats;
    odi?: FormatStats;
    t20i?: FormatStats;
  };
  badges?: string[];
  isFallbackData?: boolean;
}

export interface PlayerFilterOptions {
  searchQuery: string;
  role: PlayerRole | 'all';
  country: string | 'all';
  format: FormatType | 'all';
}
