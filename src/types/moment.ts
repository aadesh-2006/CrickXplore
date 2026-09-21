import type { CricketFormat, EraId } from './timeline';

export type MomentCategory =
  | 'WORLD_CUP'
  | 'TEST'
  | 'ODI'
  | 'T20'
  | 'ASHES'
  | 'INDIVIDUAL'
  | 'RECORD'
  | 'COMEBACK'
  | 'UPSET'
  | 'FINAL'
  | 'LAST_BALL'
  | 'CULTURAL';

export interface CricketMoment {
  id: string;
  title: string;
  subtitle?: string;
  year: number;
  date?: string;
  category: MomentCategory;
  format: CricketFormat;
  tournament?: string;
  venue: string;
  location: string;
  eraId: EraId;
  timelineEventId?: string;
  shortDescription: string;
  context: string;
  theMoment: string;
  whyItMattered: string;
  scorecardSnippet?: string;
  quote?: {
    text: string;
    author: string;
  };
  tensionIndex?: number; // 1-100 scale of match pressure
  decibelCaldera?: string; // e.g. "115 dB (Rooftop eruption)"
  tags: string[];
  players?: string[];
  teams?: string[];
  relatedPlayerIds?: string[];
  relatedStadiumIds?: string[];
  relatedCardIds?: string[];
  imageUrl?: string;
}

export interface MomentFilterState {
  eraId: EraId | 'ALL';
  format: 'ALL' | CricketFormat;
  category: 'ALL' | MomentCategory;
  searchQuery: string;
}
