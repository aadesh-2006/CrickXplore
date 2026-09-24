import {
  FULL_COLLECTIBLE_CATALOG,
  generateCollectibleCard,
  getCollectibleCardById,
  getCollectibleCardByPlayerId,
  CURATED_HERO_CARD_OVERRIDES,
} from './cards/cardCatalog';
import type { CollectibleCard } from '../types/collectibleCard';

/**
 * CrickXplore Full Dynamic Collectible Card Catalog
 * Maps all 457 players deterministically into digital collectible artifacts.
 */
export const SAMPLE_COLLECTION: CollectibleCard[] = FULL_COLLECTIBLE_CATALOG;

export {
  FULL_COLLECTIBLE_CATALOG,
  generateCollectibleCard,
  getCollectibleCardById,
  getCollectibleCardByPlayerId,
  CURATED_HERO_CARD_OVERRIDES,
};

