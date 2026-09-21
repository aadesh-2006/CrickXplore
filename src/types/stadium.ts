import type { CricketFormat } from './timeline';

export interface StadiumCoordinates {
  lat: number;
  lng: number;
}

export type WorldRegion = 'ALL' | 'Asia' | 'Europe' | 'Oceania' | 'Africa' | 'Americas';

export interface CricketStadium {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  countryCode: string;
  region: WorldRegion;
  coordinates: StadiumCoordinates;
  establishedYear: number;
  capacity: number;
  primaryFormats: CricketFormat[];
  description: string;
  architecturalNotes: string;
  pitchCharacter: string;
  acousticProfile?: string;
  famousFor: string[];
  famousMomentIds: string[];
  timelineEventIds: string[];
  notablePlayerIds: string[];
  tags: string[];
  imageUrl?: string;
}

export interface StadiumFilterState {
  region: WorldRegion;
  country: string | 'ALL';
  format: 'ALL' | CricketFormat;
  searchQuery: string;
}
