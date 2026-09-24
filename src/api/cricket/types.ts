// Raw CricAPI / CricketData.org response schemas

export interface CricApiPlayerSearchItem {
  id: string;
  name: string;
  country?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  playerImg?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
}

export interface CricApiSearchResponse {
  apikey?: string;
  data?: CricApiPlayerSearchItem[];
  status: string;
  info?: {
    hitsToday?: number;
    hitsLimit?: number;
    credits?: number;
  };
}

export interface CricApiStatItem {
  fn?: string; // Format name: test, odi, t20i
  stat?: string; // Metric name: runs, avg, sr, etc.
  value?: string;
}

export interface CricApiPlayerInfoData {
  id: string;
  name: string;
  country?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  playerImg?: string;
  stats?: Array<{
    fn?: string;
    matchtype?: string;
    stat?: string;
    value?: string;
  }>;
}

export interface CricApiPlayerInfoResponse {
  apikey?: string;
  data?: CricApiPlayerInfoData;
  status: string;
}

// BBS (Big Balls Sports Data) Response Schemas
export interface BbsBattingStats {
  matches?: number;
  innings?: number;
  not_outs?: number;
  runs?: number;
  balls?: number;
  high_score?: string | number;
  average?: number | null;
  strike_rate?: number | null;
  hundreds?: number;
  fifties?: number;
  ducks?: number;
  fours?: number;
  sixes?: number;
}

export interface BbsBowlingStats {
  matches?: number;
  innings?: number;
  overs?: string | number;
  balls?: number;
  maidens?: number;
  runs?: number;
  wickets?: number;
  average?: number | null;
  economy?: number | null;
  strike_rate?: number | null;
  best_bowling?: string;
  four_wickets?: number;
  five_wickets?: number;
  ten_wickets?: number;
}

export interface BbsPlayerFormat {
  batting?: BbsBattingStats;
  bowling?: BbsBowlingStats;
}

export interface BbsPlayerResponse {
  data?: {
    id: string;
    name: string;
    career?: {
      first_match?: string;
      last_match?: string;
      matches?: number;
    };
    batting?: BbsBattingStats;
    bowling?: BbsBowlingStats;
    by_format?: {
      Test?: BbsPlayerFormat;
      ODI?: BbsPlayerFormat;
      T20?: BbsPlayerFormat;
      MDM?: BbsPlayerFormat;
      ODM?: BbsPlayerFormat;
    };
  };
  meta?: {
    source?: string;
    updated_at?: string;
  };
  error?: {
    code?: string;
    message?: string;
  };
}
