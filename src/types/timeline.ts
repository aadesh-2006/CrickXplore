export type EraId = '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';

export type EventCategory =
  | 'WORLD_CUP'
  | 'TEST'
  | 'ODI'
  | 'T20'
  | 'RECORD'
  | 'PLAYER'
  | 'TEAM'
  | 'FORMAT'
  | 'TOURNAMENT'
  | 'CULTURAL';

export type EventImportance = 'PIVOTAL' | 'MAJOR' | 'MILESTONE';

export type CricketFormat = 'Test' | 'ODI' | 'T20I' | 'Multi-format';

export interface TimelineEra {
  id: EraId;
  decade: string;
  title: string;
  shortDescription: string;
  extendedLore?: string;
  yearsSpan: string;
  visualAccent: {
    primary: string;
    glow: string;
    border: string;
    text: string;
    badgeBg: string;
    gradient: string;
  };
  definingThemes: string[];
  majorFormatDevelopments: string[];
  notablePlayers: string[];
  notableTeams: string[];
  epochQuote: {
    text: string;
    author: string;
  };
}

export interface TimelineEvent {
  id: string;
  year: number;
  date?: string;
  title: string;
  subtitle?: string;
  category: EventCategory;
  description: string;
  detailedStory?: string;
  eraId: EraId;
  importance: EventImportance;
  format: CricketFormat;
  tournament?: string;
  location?: string;
  venue?: string;
  teams?: string[];
  players?: string[];
  tags: string[];
  relatedPlayerIds?: string[];
  relatedCardIds?: string[];
  scorecardSnippet?: string;
  quote?: {
    text: string;
    author: string;
  };
  impactHighlight?: string;
}

export interface FormatEvolutionStage {
  id: string;
  formatName: string;
  shortCode: 'TEST' | 'ODI' | 'T20I';
  birthYear: number;
  duration: string;
  overs: string;
  clothing: string;
  ballType: string;
  description: string;
  tacticalEvolution: string;
  culturalSignificance: string;
  keyMilestone: string;
  accentColor: string;
  accentBorder: string;
}

export interface TimelineFilterState {
  eraId: EraId | 'ALL';
  format: 'ALL' | 'Test' | 'ODI' | 'T20I' | 'Multi-format';
  category: 'ALL' | EventCategory;
  searchQuery: string;
}
