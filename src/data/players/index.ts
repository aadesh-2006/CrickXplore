import type { NormalizedPlayer } from '../../types/player';
import { INDIA_PLAYERS } from './india';
import { AUSTRALIA_PLAYERS } from './australia';
import { ENGLAND_PLAYERS } from './england';
import { SOUTH_AFRICA_PLAYERS } from './southAfrica';
import { WEST_INDIES_PLAYERS } from './westIndies';
import { PAKISTAN_PLAYERS } from './pakistan';
import { NEW_ZEALAND_PLAYERS } from './newZealand';
import { SRI_LANKA_PLAYERS } from './sriLanka';
import { BANGLADESH_PLAYERS } from './bangladesh';
import { AFGHANISTAN_PLAYERS } from './afghanistan';
import { ZIMBABWE_PLAYERS } from './zimbabwe';
import { IRELAND_PLAYERS } from './ireland';
import { OTHER_NATIONS_PLAYERS } from './otherNations';

export const FALLBACK_PLAYERS: NormalizedPlayer[] = [
  ...INDIA_PLAYERS,
  ...AUSTRALIA_PLAYERS,
  ...ENGLAND_PLAYERS,
  ...SOUTH_AFRICA_PLAYERS,
  ...WEST_INDIES_PLAYERS,
  ...PAKISTAN_PLAYERS,
  ...NEW_ZEALAND_PLAYERS,
  ...SRI_LANKA_PLAYERS,
  ...BANGLADESH_PLAYERS,
  ...AFGHANISTAN_PLAYERS,
  ...ZIMBABWE_PLAYERS,
  ...IRELAND_PLAYERS,
  ...OTHER_NATIONS_PLAYERS,
];

export {
  INDIA_PLAYERS,
  AUSTRALIA_PLAYERS,
  ENGLAND_PLAYERS,
  SOUTH_AFRICA_PLAYERS,
  WEST_INDIES_PLAYERS,
  PAKISTAN_PLAYERS,
  NEW_ZEALAND_PLAYERS,
  SRI_LANKA_PLAYERS,
  BANGLADESH_PLAYERS,
  AFGHANISTAN_PLAYERS,
  ZIMBABWE_PLAYERS,
  IRELAND_PLAYERS,
  OTHER_NATIONS_PLAYERS,
};
