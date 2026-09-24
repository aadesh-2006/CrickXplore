import { FALLBACK_PLAYERS } from '../players';
import type { NormalizedPlayer, FormatType } from '../../types/player';
import type { CollectibleCard, CardVariant, CardRarity, CardMetric } from '../../types/collectibleCard';

export interface CardGenerationOptions {
  variant?: CardVariant;
  format?: FormatType;
  edition?: string;
  serialNumber?: string;
  signatureTitle?: string;
}

/**
 * Curated hero card configurations preserving existing lore, serial numbers, and custom titles.
 */
export const CURATED_HERO_CARD_OVERRIDES: Record<string, CardGenerationOptions> = {
  'virat-kohli': {
    variant: 'LEGEND',
    format: 'odi',
    edition: 'Mythic Pantheon Series',
    serialNumber: 'CX-LEG-VK-0018',
    signatureTitle: '50 ODI CENTURIES • MASTER OF THE CHASE',
  },
  'jasprit-bumrah': {
    variant: 'RECORD',
    format: 'test',
    edition: 'Immortal Records Series',
    serialNumber: 'CX-REC-JB-0093',
    signatureTitle: 'TEST STRIKE RATE 45.3 • SEAM ALCHEMY',
  },
  'steve-smith': {
    variant: 'GOLD',
    format: 'test',
    edition: 'Gilded Master Edition',
    serialNumber: 'CX-GLD-SS-0049',
    signatureTitle: 'ASHES COLOSSUS • TEST AVERAGE 56.97',
  },
  'ben-stokes': {
    variant: 'ICONIC_MOMENT',
    format: 'test',
    edition: 'Frozen in Tension Series',
    serialNumber: 'CX-MOM-BS-0135',
    signatureTitle: 'HEADINGLEY 135* • UNBROKEN 10TH WICKET',
  },
  'pat-cummins': {
    variant: 'WORLD_CUP',
    format: 'odi',
    edition: 'World Cup Apex Series',
    serialNumber: 'CX-WC-PC-0030',
    signatureTitle: 'WORLD CHAMPION CAPTAIN • 2023 AHMEDABAD',
  },
  'rohit-sharma': {
    variant: 'RECORD',
    format: 'odi',
    edition: 'Immortal Records Series',
    serialNumber: 'CX-REC-RS-0264',
    signatureTitle: '264 EDEN GARDENS • 3X DOUBLE CENTURIES',
  },
  'kane-williamson': {
    variant: 'STANDARD',
    format: 'test',
    edition: 'Genesis Series 1',
    serialNumber: 'CX-STD-KW-0022',
    signatureTitle: 'WTC INAUGURAL WINNER • TECHNICAL PURITY',
  },
  'rashid-khan': {
    variant: 'GOLD',
    format: 't20i',
    edition: 'Gilded Master Edition',
    serialNumber: 'CX-GLD-RK-0019',
    signatureTitle: 'T20 WIZARD • 150 WICKETS AT 14.16 AVG',
  },
  'ms-dhoni': {
    variant: 'ICONIC_MOMENT',
    format: 'odi',
    edition: 'Frozen in Tension Series',
    serialNumber: 'CX-MOM-MSD-0007',
    signatureTitle: 'WANKHEDE 2011 • THE WORLD CUP WINNING SIX',
  },
  'dale-steyn': {
    variant: 'LEGEND',
    format: 'test',
    edition: 'Mythic Pantheon Series',
    serialNumber: 'CX-LEG-DS-0439',
    signatureTitle: '263 WEEKS AT WORLD NO. 1 • 439 TEST WICKETS',
  },
};

/**
 * Deterministically derives a card variant based on player career accomplishments & badges.
 */
export function deriveCardVariant(player: NormalizedPlayer): CardVariant {
  if (CURATED_HERO_CARD_OVERRIDES[player.id]?.variant) {
    return CURATED_HERO_CARD_OVERRIDES[player.id].variant!;
  }

  const bTest = player.stats.test?.batting;
  const bOdi = player.stats.odi?.batting;
  const bT20 = player.stats.t20i?.batting;

  const bwTest = player.stats.test?.bowling;
  const bwOdi = player.stats.odi?.bowling;
  const bwT20 = player.stats.t20i?.bowling;

  const totalRuns = (bTest?.runs || 0) + (bOdi?.runs || 0) + (bT20?.runs || 0);
  const totalWickets = (bwTest?.wickets || 0) + (bwOdi?.wickets || 0) + (bwT20?.wickets || 0);
  const totalCenturies = (bTest?.centuries || 0) + (bOdi?.centuries || 0) + (bT20?.centuries || 0);
  const total5Wickets = (bwTest?.fiveWickets || 0) + (bwOdi?.fiveWickets || 0) + (bwT20?.fiveWickets || 0);

  const badgesStr = (player.badges || []).join(' ').toLowerCase();

  const isLegendary =
    totalRuns >= 8000 ||
    totalWickets >= 350 ||
    totalCenturies >= 20 ||
    total5Wickets >= 15 ||
    badgesStr.includes('legend') ||
    badgesStr.includes('hall of fame') ||
    badgesStr.includes('all-time');

  if (isLegendary) return 'LEGEND';

  const isRecordHolder =
    totalRuns >= 5000 ||
    totalWickets >= 200 ||
    totalCenturies >= 10 ||
    total5Wickets >= 8 ||
    badgesStr.includes('record') ||
    badgesStr.includes('fastest') ||
    badgesStr.includes('highest');

  if (isRecordHolder) return 'RECORD';

  const isWorldCupStar =
    badgesStr.includes('world cup') ||
    badgesStr.includes('champion') ||
    badgesStr.includes('final') ||
    badgesStr.includes('trophy');

  if (isWorldCupStar) return 'WORLD_CUP';

  const isGoldStar =
    player.ipl2026Team !== undefined ||
    totalRuns >= 1500 ||
    totalWickets >= 60 ||
    totalCenturies >= 3 ||
    (bTest?.matches || 0) + (bOdi?.matches || 0) >= 30;

  if (isGoldStar) return 'GOLD';

  return 'STANDARD';
}

/**
 * Deterministically determines the primary format for card display.
 */
export function deriveCardFormat(player: NormalizedPlayer): FormatType {
  if (CURATED_HERO_CARD_OVERRIDES[player.id]?.format) {
    return CURATED_HERO_CARD_OVERRIDES[player.id].format!;
  }
  if (player.stats.test && (player.stats.test.batting?.matches || player.stats.test.bowling?.matches)) {
    return 'test';
  }
  if (player.stats.odi && (player.stats.odi.batting?.matches || player.stats.odi.bowling?.matches)) {
    return 'odi';
  }
  if (player.stats.t20i && (player.stats.t20i.batting?.matches || player.stats.t20i.bowling?.matches)) {
    return 't20i';
  }
  return 'test';
}

/**
 * Maps a CardVariant to its corresponding CardRarity.
 */
export function getRarityFromVariant(variant: CardVariant): CardRarity {
  switch (variant) {
    case 'STANDARD':
      return 'Core';
    case 'GOLD':
      return 'Rare';
    case 'WORLD_CUP':
      return 'Epic';
    case 'RECORD':
      return 'Epic';
    case 'ICONIC_MOMENT':
      return 'Legendary';
    case 'LEGEND':
      return 'Mythic';
  }
}

/**
 * Maps a CardVariant to its series edition name.
 */
export function getEditionFromVariant(variant: CardVariant): string {
  switch (variant) {
    case 'LEGEND':
      return 'Mythic Pantheon Series';
    case 'RECORD':
      return 'Immortal Records Series';
    case 'WORLD_CUP':
      return 'World Cup Apex Series';
    case 'ICONIC_MOMENT':
      return 'Frozen in Tension Series';
    case 'GOLD':
      return 'Gilded Master Edition';
    case 'STANDARD':
    default:
      return 'Genesis Series 1';
  }
}

/**
 * Deterministically generates a CollectibleCard from ANY NormalizedPlayer.
 */
export function generateCollectibleCard(
  player: NormalizedPlayer,
  overrideOptions?: CardGenerationOptions
): CollectibleCard {
  const curated = CURATED_HERO_CARD_OVERRIDES[player.id] || {};
  const variant = overrideOptions?.variant || curated.variant || deriveCardVariant(player);
  const format = overrideOptions?.format || curated.format || deriveCardFormat(player);
  const rarity = getRarityFromVariant(variant);
  const edition = overrideOptions?.edition || curated.edition || getEditionFromVariant(variant);

  // Derive stats from selected format with fallback cascade
  const formatData = player.stats[format] || player.stats.test || player.stats.odi || player.stats.t20i;
  const batting = formatData?.batting;
  const bowling = formatData?.bowling;
  const isBowler = player.role === 'bowler';
  const isAllRounder = player.role === 'all-rounder';

  // Primary & secondary metrics
  let primaryMetric: CardMetric = { label: 'Matches', value: '—' };
  let secondaryMetric: CardMetric = { label: 'Average', value: '—' };
  let tertiaryMetric: CardMetric = { label: 'Signature', value: '—' };

  if (isBowler && bowling) {
    primaryMetric = {
      label: `${format.toUpperCase()} Wickets`,
      value: bowling.wickets,
      sublabel: bowling.bestBowlingInnings ? `BBI: ${bowling.bestBowlingInnings}` : undefined,
    };
    secondaryMetric = {
      label: 'Economy',
      value: bowling.economy != null ? bowling.economy.toFixed(2) : '—',
      sublabel: bowling.average != null ? `Avg: ${bowling.average.toFixed(1)}` : undefined,
    };
    tertiaryMetric = {
      label: '5-Wicket Hauls',
      value: bowling.fiveWickets ?? 0,
      sublabel: bowling.tenWickets ? `${bowling.tenWickets} 10WM` : undefined,
    };
  } else if (isAllRounder && batting && bowling && bowling.wickets > 10) {
    primaryMetric = {
      label: `${format.toUpperCase()} Runs`,
      value: batting.runs.toLocaleString(),
      sublabel: `Avg: ${batting.average != null ? batting.average.toFixed(1) : '—'}`,
    };
    secondaryMetric = {
      label: `${format.toUpperCase()} Wickets`,
      value: bowling.wickets,
      sublabel: bowling.economy != null ? `Econ: ${bowling.economy.toFixed(2)}` : undefined,
    };
    tertiaryMetric = {
      label: '100s / 5Ws',
      value: `${batting.centuries ?? 0} / ${bowling.fiveWickets ?? 0}`,
      sublabel: 'Double Threat',
    };
  } else if (batting) {
    primaryMetric = {
      label: `${format.toUpperCase()} Runs`,
      value: batting.runs.toLocaleString(),
      sublabel: batting.highestScore ? `HS: ${batting.highestScore}` : undefined,
    };
    secondaryMetric = {
      label: 'Batting Avg',
      value: batting.average != null ? batting.average.toFixed(1) : '—',
      sublabel: batting.strikeRate != null ? `SR: ${batting.strikeRate.toFixed(1)}` : undefined,
    };
    tertiaryMetric = {
      label: 'Centuries',
      value: batting.centuries ?? 0,
      sublabel: batting.fifties !== undefined ? `${batting.fifties} Fifties` : undefined,
    };
  } else if (bowling) {
    primaryMetric = {
      label: `${format.toUpperCase()} Wickets`,
      value: bowling.wickets,
      sublabel: bowling.bestBowlingInnings ? `BBI: ${bowling.bestBowlingInnings}` : undefined,
    };
    secondaryMetric = {
      label: 'Economy',
      value: bowling.economy != null ? bowling.economy.toFixed(2) : '—',
      sublabel: bowling.average != null ? `Avg: ${bowling.average.toFixed(1)}` : undefined,
    };
  }

  // Deterministic Serial Number
  const variantPrefix = variant.slice(0, 3);
  const serialNumber =
    overrideOptions?.serialNumber ||
    curated.serialNumber ||
    `CX-${variantPrefix}-${player.id.toUpperCase()}-${format.toUpperCase()}`;

  // Signature Title
  const signatureTitle =
    overrideOptions?.signatureTitle ||
    curated.signatureTitle ||
    (player.badges && player.badges[0]) ||
    (player.ipl2026Team ? `${player.country} • ${player.ipl2026Team}` : `${player.country} ${player.role.toUpperCase()}`);

  // Lore snippet
  const loreSnippet =
    player.badges && player.badges.length > 0
      ? `${player.badges[0]}${player.badges.length > 1 ? ` • ${player.badges.slice(1).join(' • ')}` : ''}`
      : `Mastery etched into cricket history. Representing ${player.country} across ${format.toUpperCase()} arenas.`;

  return {
    id: `card-${player.id}-${variant.toLowerCase()}-${format}`,
    playerId: player.id,
    playerName: player.name,
    nationality: player.country,
    countryCode: player.countryCode || player.country.slice(0, 3).toUpperCase(),
    role: player.role,
    format,
    variant,
    rarity,
    edition,
    serialNumber,
    portraitUrl: player.imageUrl,
    signatureTitle,
    primaryMetric,
    secondaryMetric,
    tertiaryMetric,
    loreSnippet,
    badges: player.badges && player.badges.length > 0 ? player.badges : ['CRICKXPLORE VAULT'],
    season: '2026 Inception Series',
    foilShineIntensity:
      variant === 'LEGEND'
        ? 0.95
        : variant === 'ICONIC_MOMENT'
        ? 0.85
        : variant === 'WORLD_CUP'
        ? 0.8
        : variant === 'RECORD'
        ? 0.75
        : variant === 'GOLD'
        ? 0.7
        : 0.45,
    rawBattingStats: batting,
    rawBowlingStats: bowling,
  };
}

/**
 * Complete Dynamic Collectible Card Catalog containing all 457 players.
 */
export const FULL_COLLECTIBLE_CATALOG: CollectibleCard[] = FALLBACK_PLAYERS.map(p => generateCollectibleCard(p));

/**
 * Look up a collectible card by card ID or serial number.
 */
export function getCollectibleCardById(cardIdOrSerial: string): CollectibleCard | undefined {
  return FULL_COLLECTIBLE_CATALOG.find(c => c.id === cardIdOrSerial || c.serialNumber === cardIdOrSerial);
}

/**
 * Look up a collectible card by player ID.
 */
export function getCollectibleCardByPlayerId(playerId: string): CollectibleCard | undefined {
  return FULL_COLLECTIBLE_CATALOG.find(c => c.playerId === playerId);
}
