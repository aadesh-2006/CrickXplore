import type { GameCard, GameCategoryDefinition } from './types';
import type { FormatType } from '../types/player';

export const GAME_CATEGORIES: GameCategoryDefinition[] = [
  // ==========================================
  // TEST FORMAT CATEGORIES
  // ==========================================
  {
    key: 'test_batting_runs',
    label: 'Test Career Runs',
    format: 'test',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toLocaleString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.batting?.runs ?? null,
  },
  {
    key: 'test_batting_average',
    label: 'Test Batting Average',
    format: 'test',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.batting?.average ?? null,
  },
  {
    key: 'test_batting_strikeRate',
    label: 'Test Strike Rate',
    format: 'test',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.batting?.strikeRate ?? null,
  },
  {
    key: 'test_batting_centuries',
    label: 'Test Centuries (100s)',
    format: 'test',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.batting?.centuries ?? null,
  },
  {
    key: 'test_bowling_wickets',
    label: 'Test Wickets',
    format: 'test',
    statType: 'bowling',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.bowling?.wickets ?? null,
  },
  {
    key: 'test_bowling_economy',
    label: 'Test Bowling Economy',
    format: 'test',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? `${v.toFixed(2)} rpo` : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.bowling?.economy ?? null,
  },
  {
    key: 'test_bowling_average',
    label: 'Test Bowling Average',
    format: 'test',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.bowling?.average ?? null,
  },
  {
    key: 'test_bowling_strikeRate',
    label: 'Test Bowling Strike Rate',
    format: 'test',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? `${v.toFixed(1)} b/w` : 'N/A'),
    getValue: (card: GameCard) => card.stats.test?.bowling?.strikeRate ?? null,
  },

  // ==========================================
  // ODI FORMAT CATEGORIES
  // ==========================================
  {
    key: 'odi_batting_runs',
    label: 'ODI Career Runs',
    format: 'odi',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toLocaleString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.batting?.runs ?? null,
  },
  {
    key: 'odi_batting_average',
    label: 'ODI Batting Average',
    format: 'odi',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.batting?.average ?? null,
  },
  {
    key: 'odi_batting_strikeRate',
    label: 'ODI Batting Strike Rate',
    format: 'odi',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.batting?.strikeRate ?? null,
  },
  {
    key: 'odi_batting_centuries',
    label: 'ODI Centuries (100s)',
    format: 'odi',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.batting?.centuries ?? null,
  },
  {
    key: 'odi_bowling_wickets',
    label: 'ODI Wickets',
    format: 'odi',
    statType: 'bowling',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.bowling?.wickets ?? null,
  },
  {
    key: 'odi_bowling_economy',
    label: 'ODI Bowling Economy',
    format: 'odi',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? `${v.toFixed(2)} rpo` : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.bowling?.economy ?? null,
  },
  {
    key: 'odi_bowling_average',
    label: 'ODI Bowling Average',
    format: 'odi',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.bowling?.average ?? null,
  },
  {
    key: 'odi_bowling_strikeRate',
    label: 'ODI Bowling Strike Rate',
    format: 'odi',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? `${v.toFixed(1)} b/w` : 'N/A'),
    getValue: (card: GameCard) => card.stats.odi?.bowling?.strikeRate ?? null,
  },

  // ==========================================
  // T20I FORMAT CATEGORIES
  // ==========================================
  {
    key: 't20i_batting_runs',
    label: 'T20I Career Runs',
    format: 't20i',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toLocaleString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.t20i?.batting?.runs ?? null,
  },
  {
    key: 't20i_batting_average',
    label: 'T20I Batting Average',
    format: 't20i',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.t20i?.batting?.average ?? null,
  },
  {
    key: 't20i_batting_strikeRate',
    label: 'T20I Strike Rate',
    format: 't20i',
    statType: 'batting',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.t20i?.batting?.strikeRate ?? null,
  },
  {
    key: 't20i_bowling_wickets',
    label: 'T20I Wickets',
    format: 't20i',
    statType: 'bowling',
    direction: 'HIGHER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toString() : 'N/A'),
    getValue: (card: GameCard) => card.stats.t20i?.bowling?.wickets ?? null,
  },
  {
    key: 't20i_bowling_economy',
    label: 'T20I Economy',
    format: 't20i',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? `${v.toFixed(2)} rpo` : 'N/A'),
    getValue: (card: GameCard) => card.stats.t20i?.bowling?.economy ?? null,
  },
  {
    key: 't20i_bowling_average',
    label: 'T20I Bowling Average',
    format: 't20i',
    statType: 'bowling',
    direction: 'LOWER_IS_BETTER',
    formatValue: (v) => (v !== null && v !== undefined ? v.toFixed(2) : 'N/A'),
    getValue: (card: GameCard) => card.stats.t20i?.bowling?.average ?? null,
  },
];

export const getCategoryByKey = (key: string): GameCategoryDefinition | undefined => {
  return GAME_CATEGORIES.find((cat) => cat.key === key);
};

export const getAvailableCategoriesForCard = (
  card: GameCard,
  formatFilter?: 'ALL' | FormatType
): GameCategoryDefinition[] => {
  return GAME_CATEGORIES.filter((category) => {
    if (formatFilter && formatFilter !== 'ALL' && category.format !== formatFilter) {
      return false;
    }
    const val = category.getValue(card);
    return val !== null && val !== undefined && !Number.isNaN(val);
  });
};
