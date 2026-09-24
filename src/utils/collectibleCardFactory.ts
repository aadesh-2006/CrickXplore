import type { NormalizedPlayer } from '../types/player';
import type { CollectibleCard } from '../types/collectibleCard';
import { generateCollectibleCard, type CardGenerationOptions } from '../data/cards/cardCatalog';

/**
 * Deterministically generates a CollectibleCard from an existing NormalizedPlayer.
 */
export function createCollectibleCard(
  player: NormalizedPlayer,
  options?: CardGenerationOptions
): CollectibleCard {
  return generateCollectibleCard(player, options);
}

export { generateCollectibleCard };

