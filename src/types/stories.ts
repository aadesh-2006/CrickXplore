export type StoryCategory =
  | 'World Cup'
  | 'Chase Mastery'
  | 'Epoch Defining'
  | 'Miracle Inning'
  | 'Record Breaker';

export interface StoryQuote {
  text: string;
  author?: string;
  context?: string;
}

export interface StoryKeyStat {
  value: string;
  label: string;
}

export interface StorySection {
  id: string;
  heading: string;
  subheading?: string;
  body: string[];
  quote?: StoryQuote;
  keyStat?: StoryKeyStat;
  imagePlaceholder?: string;
  caption?: string;
}

export interface StoryColorAccent {
  primary: string;
  glow: string;
  text: string;
  border: string;
}

export interface CricketStory {
  slug: string;
  title: string;
  subtitle: string;
  headlineScore: string;
  player: string;
  playerId?: string;
  year: number;
  date: string;
  matchContext: string;
  tournament: string;
  venue: string;
  category: StoryCategory;
  readTime: string;
  featured?: boolean;
  heroImage?: string;
  heroVideo?: string;
  tagline: string;
  synopsis: string;
  colorAccent: StoryColorAccent;
  sections: StorySection[];
  editorialNote?: string;
}
