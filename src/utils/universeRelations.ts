import { CRICKET_MOMENTS } from '../data/moments/moments';
import { CRICKET_STADIUMS } from '../data/stadiums/stadiums';
import { TIMELINE_EVENTS } from '../data/timeline/events';
import { FALLBACK_PLAYERS } from '../data/fallbackPlayers';
import { SAMPLE_COLLECTION } from '../data/sampleCollection';
import type { CricketMoment } from '../types/moment';
import type { CricketStadium } from '../types/stadium';
import type { TimelineEvent } from '../types/timeline';
import type { NormalizedPlayer } from '../types/player';
import type { CollectibleCard } from '../types/collectibleCard';

export const getStadiumById = (id?: string): CricketStadium | undefined => {
  if (!id) return undefined;
  return CRICKET_STADIUMS.find((s) => s.id === id);
};

export const getMomentById = (id?: string): CricketMoment | undefined => {
  if (!id) return undefined;
  return CRICKET_MOMENTS.find((m) => m.id === id);
};

export const getMomentsForStadium = (stadiumId: string): CricketMoment[] => {
  return CRICKET_MOMENTS.filter(
    (m) => m.relatedStadiumIds?.includes(stadiumId) || m.venue.toLowerCase().includes(stadiumId)
  );
};

export const getMomentsForPlayer = (playerId: string): CricketMoment[] => {
  return CRICKET_MOMENTS.filter((m) => m.relatedPlayerIds?.includes(playerId));
};

export const getTimelineEventById = (id?: string): TimelineEvent | undefined => {
  if (!id) return undefined;
  return TIMELINE_EVENTS.find((e) => e.id === id);
};

export const getPlayersByIds = (playerIds?: string[]): NormalizedPlayer[] => {
  if (!playerIds || playerIds.length === 0) return [];
  return playerIds
    .map((id) => FALLBACK_PLAYERS.find((p) => p.id === id))
    .filter((p): p is NormalizedPlayer => Boolean(p));
};

export const getCardsByIds = (cardIds?: string[]): CollectibleCard[] => {
  if (!cardIds || cardIds.length === 0) return [];
  return cardIds
    .map((id) =>
      SAMPLE_COLLECTION.find((c) => c.id === id || c.serialNumber === id)
    )
    .filter((c): c is CollectibleCard => Boolean(c));
};
