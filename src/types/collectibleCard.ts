import type { FormatType, PlayerRole, BattingStats, BowlingStats } from './player';

export type CardVariant =
  | 'STANDARD'
  | 'GOLD'
  | 'WORLD_CUP'
  | 'RECORD'
  | 'ICONIC_MOMENT'
  | 'LEGEND';

export type CardRarity = 'Core' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface CardMetric {
  label: string;
  value: string | number;
  sublabel?: string;
}

export interface CollectibleCard {
  id: string;
  playerId: string;
  playerName: string;
  nationality: string;
  countryCode: string;
  role: PlayerRole;
  format: FormatType;
  variant: CardVariant;
  rarity: CardRarity;
  edition: string;
  serialNumber: string;
  portraitUrl?: string;
  signatureTitle: string;
  primaryMetric: CardMetric;
  secondaryMetric: CardMetric;
  tertiaryMetric?: CardMetric;
  loreSnippet: string;
  badges: string[];
  season: string;
  foilShineIntensity: number;
  rawBattingStats?: BattingStats;
  rawBowlingStats?: BowlingStats;
}

export interface CardFilterOptions {
  searchQuery: string;
  variant: CardVariant | 'all';
  format: FormatType | 'all';
  role: PlayerRole | 'all';
  rarity: CardRarity | 'all';
}
