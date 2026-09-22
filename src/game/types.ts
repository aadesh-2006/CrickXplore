import type { FormatType, NormalizedPlayer, PlayerRole } from '../types/player';
import type { EraId } from '../types/timeline';

export type StatDirection = 'HIGHER_IS_BETTER' | 'LOWER_IS_BETTER';

export interface GameCard {
  instanceId: string;
  playerId: string;
  playerName: string;
  country: string;
  countryCode: string;
  role: PlayerRole;
  imageUrl: string;
  stats: NormalizedPlayer['stats'];
  badges?: string[];
}

export interface GameCategoryDefinition {
  key: string;
  label: string;
  format: FormatType;
  statType: 'batting' | 'bowling';
  direction: StatDirection;
  unit?: string;
  formatValue: (val: number | null | undefined) => string;
  getValue: (card: GameCard) => number | null;
}

export type GamePhase =
  | 'SETUP'
  | 'DEALING'
  | 'PASS_DEVICE'
  | 'CONTROLLER_SELECT_CARD'
  | 'CONTROLLER_SELECT_CATEGORY'
  | 'CHALLENGER_SELECT_CARD'
  | 'COMPARISON_REVEAL'
  | 'CATEGORY_CHANGE_DECISION'
  | 'CHAIN_WON'
  | 'GAME_OVER';

export interface GamePlayer {
  id: string;
  name: string;
  hand: GameCard[];
  isEliminated: boolean;
  isHost: boolean;
  cardsWonCount: number;
}

export type InvalidStatReason =
  | 'MISSING_CONTROLLER_STAT'
  | 'MISSING_CHALLENGER_STAT'
  | 'MISSING_BOTH_STATS';

export interface ComparisonResult {
  categoryKey: string;
  categoryLabel: string;
  direction: StatDirection;
  format: FormatType;
  controllerPlayerId: string;
  controllerCard: GameCard;
  controllerValue: number | null;
  challengerPlayerId: string;
  challengerCard: GameCard;
  challengerValue: number | null;
  winnerPlayerId: string | null; // null if tie or invalid
  winnerCard: GameCard | null;
  isTie: boolean;
  isInvalid?: boolean;
  invalidReason?: InvalidStatReason | null;
  chainCardsInvolved: GameCard[];
}

export interface GameHistoryEntry {
  id: string;
  turn: number;
  timestamp: number;
  type:
    | 'CARD_PLAYED'
    | 'CATEGORY_CHOSEN'
    | 'CHALLENGE_WON'
    | 'CATEGORY_CHANGED'
    | 'CHAIN_COLLECTED'
    | 'PLAYER_ELIMINATED'
    | 'GAME_WON'
    | 'TIE'
    | 'INVALID_CHALLENGE';
  actorName: string;
  description: string;
}

export interface GameConfig {
  playersCount: number; // 3 to 6
  playerNames: string[];
  format: 'ALL' | FormatType;
  era: 'ALL' | EraId;
  cardsPerPlayer: number;
}

export interface GameState {
  phase: GamePhase;
  config: GameConfig;
  players: GamePlayer[];
  activePlayerIndex: number; // index of player currently acting
  controllerPlayerId: string; // ID of player who holds category control
  currentControllerCard: GameCard | null;
  currentChallengerCard: GameCard | null;
  currentCategory: GameCategoryDefinition | null;
  activeChain: GameCard[];
  lastComparison: ComparisonResult | null;
  history: GameHistoryEntry[];
  turnNumber: number;
  winner: GamePlayer | null;
  passDeviceTargetPlayerId: string | null;
}
