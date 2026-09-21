export interface UniverseItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  detailedLore: string;
  accentColor: string;
  badge: string;
  statsLabel: string;
  statsValue: string;
  iconName: string;
  features: string[];
  quote: {
    text: string;
    author: string;
  };
}

export interface CricketSensoryFact {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
}
