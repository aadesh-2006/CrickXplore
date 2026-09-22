import type { ComparisonResult, GameCard, GameCategoryDefinition, InvalidStatReason } from './types';

function isValidNumericStat(val: number | null | undefined): val is number {
  return val !== null && val !== undefined && typeof val === 'number' && !Number.isNaN(val);
}

export function compareGameCards(
  controllerPlayerId: string,
  controllerCard: GameCard,
  challengerPlayerId: string,
  challengerCard: GameCard,
  category: GameCategoryDefinition,
  activeChain: GameCard[] = []
): ComparisonResult {
  const rawControllerVal = category.getValue(controllerCard);
  const rawChallengerVal = category.getValue(challengerCard);

  const isControllerValid = isValidNumericStat(rawControllerVal);
  const isChallengerValid = isValidNumericStat(rawChallengerVal);

  const controllerVal: number | null = isControllerValid ? rawControllerVal : null;
  const challengerVal: number | null = isChallengerValid ? rawChallengerVal : null;

  const chainCardsInvolved = [...activeChain, controllerCard, challengerCard];

  // 1. Missing or Invalid stats validation
  // DO NOT invent stats or award victory if either side has null, undefined, NaN, or missing value
  if (controllerVal === null || challengerVal === null) {
    let invalidReason: InvalidStatReason = 'MISSING_BOTH_STATS';
    if (controllerVal !== null && challengerVal === null) {
      invalidReason = 'MISSING_CHALLENGER_STAT';
    } else if (controllerVal === null && challengerVal !== null) {
      invalidReason = 'MISSING_CONTROLLER_STAT';
    }

    return {
      categoryKey: category.key,
      categoryLabel: category.label,
      direction: category.direction,
      format: category.format,
      controllerPlayerId,
      controllerCard,
      controllerValue: controllerVal,
      challengerPlayerId,
      challengerCard,
      challengerValue: challengerVal,
      winnerPlayerId: null,
      winnerCard: null,
      isTie: false,
      isInvalid: true,
      invalidReason,
      chainCardsInvolved,
    };
  }

  // 2. Exact Tie
  if (Math.abs(controllerVal - challengerVal) < 0.00001) {
    return {
      categoryKey: category.key,
      categoryLabel: category.label,
      direction: category.direction,
      format: category.format,
      controllerPlayerId,
      controllerCard,
      controllerValue: controllerVal,
      challengerPlayerId,
      challengerCard,
      challengerValue: challengerVal,
      winnerPlayerId: null,
      winnerCard: null,
      isTie: true,
      isInvalid: false,
      invalidReason: null,
      chainCardsInvolved,
    };
  }

  // 3. Valid Numeric Comparison
  let challengerWins = false;

  if (category.direction === 'HIGHER_IS_BETTER') {
    challengerWins = challengerVal > controllerVal;
  } else {
    // LOWER_IS_BETTER (e.g. Economy, Bowling Avg, Bowling Strike Rate)
    challengerWins = challengerVal < controllerVal;
  }

  if (challengerWins) {
    return {
      categoryKey: category.key,
      categoryLabel: category.label,
      direction: category.direction,
      format: category.format,
      controllerPlayerId,
      controllerCard,
      controllerValue: controllerVal,
      challengerPlayerId,
      challengerCard,
      challengerValue: challengerVal,
      winnerPlayerId: challengerPlayerId,
      winnerCard: challengerCard,
      isTie: false,
      isInvalid: false,
      invalidReason: null,
      chainCardsInvolved,
    };
  } else {
    return {
      categoryKey: category.key,
      categoryLabel: category.label,
      direction: category.direction,
      format: category.format,
      controllerPlayerId,
      controllerCard,
      controllerValue: controllerVal,
      challengerPlayerId,
      challengerCard,
      challengerValue: challengerVal,
      winnerPlayerId: controllerPlayerId,
      winnerCard: controllerCard,
      isTie: false,
      isInvalid: false,
      invalidReason: null,
      chainCardsInvolved,
    };
  }
}
