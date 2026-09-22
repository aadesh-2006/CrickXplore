import type { NormalizedPlayer, FormatType } from '../types/player';
import type { CollectibleCard, CardVariant, CardRarity, CardMetric } from '../types/collectibleCard';

interface CardGenerationOptions {
  variant?: CardVariant;
  format?: FormatType;
  edition?: string;
  serialNumber?: string;
  signatureTitle?: string;
}

/**
 * Deterministically generates a CollectibleCard from an existing NormalizedPlayer.
 */
export function createCollectibleCard(
  player: NormalizedPlayer,
  options: CardGenerationOptions = {}
): CollectibleCard {
  const variant = options.variant || 'STANDARD';
  const format = options.format || 'test';
  const edition = options.edition || 'Genesis Series 1';

  // Format stats resolution
  const formatData = player.stats[format] || player.stats.test || player.stats.odi || player.stats.t20i;
  const batting = formatData?.batting;
  const bowling = formatData?.bowling;
  const isBowler = player.role === 'bowler';

  // Determine rarity from variant
  let rarity: CardRarity = 'Core';
  switch (variant) {
    case 'STANDARD':
      rarity = 'Core';
      break;
    case 'GOLD':
      rarity = 'Rare';
      break;
    case 'WORLD_CUP':
      rarity = 'Epic';
      break;
    case 'RECORD':
      rarity = 'Epic';
      break;
    case 'ICONIC_MOMENT':
      rarity = 'Legendary';
      break;
    case 'LEGEND':
      rarity = 'Mythic';
      break;
  }

  // Generate deterministic serial number if not supplied
  const variantPrefix = variant.slice(0, 3);
  const playerHash = player.id.split('-').map(part => part[0]).join('').toUpperCase();
  const serialNumber =
    options.serialNumber || `CX-${variantPrefix}-${playerHash}-${format.toUpperCase()}`;

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
  } else if (batting) {
    primaryMetric = {
      label: `${format.toUpperCase()} Runs`,
      value: batting.runs.toLocaleString(),
      sublabel: `HS: ${batting.highestScore}`,
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
  }

  // Lore snippet based on player and variant
  let loreSnippet = `Mastery etched into cricket history. Representing ${player.country} across ${format.toUpperCase()} arenas.`;
  if (player.badges && player.badges.length > 0) {
    loreSnippet = `${player.badges[0]} • ${player.badges.slice(1).join(' • ')}`;
  }

  const signatureTitle =
    options.signatureTitle ||
    (player.badges && player.badges[0]) ||
    `${player.country} ${player.role.toUpperCase()}`;

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
    badges: player.badges || ['CRICKXPLORE VAULT'],
    season: '2026 Inception Series',
    foilShineIntensity: variant === 'LEGEND' ? 0.9 : variant === 'GOLD' ? 0.75 : 0.45,
    rawBattingStats: batting,
    rawBowlingStats: bowling,
  };
}
