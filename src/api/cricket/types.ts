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
