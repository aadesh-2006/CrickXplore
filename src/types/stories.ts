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

export interface FullStoryImage {
  src: string;
  alt: string;
  layout?: 'landscape' | 'portrait';
  float?: 'left' | 'right';
  caption?: string;
}

export interface FullStorySection {
  id: string;
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  pullQuote?: StoryQuote;
  keyStat?: StoryKeyStat;
  highlightCard?: {
    title?: string;
    items: string[];
  };
  image?: FullStoryImage;
}

export interface FullStory {
  slug: string;
  title: string;
  subtitle: string;
  player: string;
  playerId?: string;
  year: number;
  date: string;
  matchContext: string;
  tournament: string;
  venue: string;
  headlineScore: string;
  readTime: string;
  tagline?: string;
  colorAccent: StoryColorAccent;
  sections: FullStorySection[];
  editorialNote?: string;
}
