import React, { useState } from 'react';
import type { GameState } from '../../game/types';
import type { NormalizedPlayer } from '../../types/player';
import {
  controllerPlayCard,
  controllerSelectCategory,
  challengerPlayCard,
  resolveComparison,
  handleCategoryDecision,
  dismissPassDevicePrompt,
  resetGame,
} from '../../game/engine';
import { PlayerStatus } from './PlayerStatus';
import { ChainDisplay } from './ChainDisplay';
import { GameCardView } from './GameCardView';
import { CategorySelector } from './CategorySelector';
import { ComparisonPanel } from './ComparisonPanel';
import { PassDeviceOverlay } from './PassDeviceOverlay';
import { GameOver } from './GameOver';
import { GameRulesModal } from './GameRulesModal';
import { Crown, Swords, BookOpen, ArrowRight } from 'lucide-react';

interface GameBoardProps {
  initialState: GameState;
  playersPool: NormalizedPlayer[];
  onExitGame: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  initialState,
  playersPool,
  onExitGame,
}) => {
  const [state, setState] = useState<GameState>(initialState);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isChangingCategoryInDecision, setIsChangingCategoryInDecision] = useState<boolean>(false);

  const activePlayer = state.players[state.activePlayerIndex];
  const controller = state.players.find((p) => p.id === state.controllerPlayerId);
  const isControllerTurn = activePlayer?.id === state.controllerPlayerId;

  // Handle Play Selected Card
  const handleConfirmCardPlay = () => {
    if (!selectedCardId) return;

    if (state.phase === 'CONTROLLER_SELECT_CARD') {
      const nextState = controllerPlayCard(state, selectedCardId);
      setState(nextState);
      setSelectedCardId(null);
    } else if (state.phase === 'CHALLENGER_SELECT_CARD') {
      const nextState = challengerPlayCard(state, selectedCardId);
      setState(nextState);
      setSelectedCardId(null);
    }
  };

  // Handle Category Selection
  const handleSelectCategory = (categoryKey: string) => {
    if (state.phase === 'CONTROLLER_SELECT_CATEGORY') {
      const nextState = controllerSelectCategory(state, categoryKey);
      setState(nextState);
    } else if (state.phase === 'CATEGORY_CHANGE_DECISION') {
      const nextState = handleCategoryDecision(state, 'CHANGE', categoryKey);
      setState(nextState);
      setIsChangingCategoryInDecision(false);
    }
  };

  // Handle Category Keep Decision
  const handleKeepCategory = () => {
    const nextState = handleCategoryDecision(state, 'KEEP');
    setState(nextState);
  };

  // Handle Pass Device Dismiss
  const handleDismissPassDevice = () => {
    const nextState = dismissPassDevicePrompt(state);
    setState(nextState);
  };

  // Handle Comparison Resolution
  const handleResolveComparison = () => {
    const nextState = resolveComparison(state);
    setState(nextState);
  };

  // Handle Rematch / Reset
  const handlePlayAgain = () => {
    const nextState = resetGame(state, playersPool);
    setState(nextState);
    setSelectedCardId(null);
  };

  // Render Game Over if Phase is GAME_OVER
  if (state.phase === 'GAME_OVER') {
    return (
      <div className="py-6 px-4">
        <GameOver
          winner={state.winner}
          players={state.players}
          onPlayAgain={handlePlayAgain}
          onNewSetup={onExitGame}
        />
      </div>
    );
  }

  const passTargetPlayer = state.players.find((p) => p.id === state.passDeviceTargetPlayerId);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Pass Device Overlay */}
      {state.phase === 'PASS_DEVICE' && passTargetPlayer && (
        <PassDeviceOverlay
          targetPlayer={passTargetPlayer}
          isController={passTargetPlayer.id === state.controllerPlayerId}
          onReady={handleDismissPassDevice}
        />
      )}

      {/* Rules Modal */}
      <GameRulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      {/* Top Match Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              CrickXplore Match • Round {state.turnNumber}
            </div>
            <div className="text-sm font-black text-white flex items-center gap-2">
              <span>Leader: {controller?.name || 'Controller'}</span>
              {state.currentCategory && (
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  {state.currentCategory.label}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRulesOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" /> Rules
          </button>
          <button
            onClick={onExitGame}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Exit Match
          </button>
        </div>
      </div>

      {/* Roster & Pot Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PlayerStatus
            players={state.players}
            activePlayerIndex={state.activePlayerIndex}
            controllerPlayerId={state.controllerPlayerId}
          />
        </div>
        <div className="lg:col-span-1">
          <ChainDisplay
            chain={state.activeChain}
            currentControllerCard={state.currentControllerCard}
            currentChallengerCard={state.currentChallengerCard}
          />
        </div>
      </div>

      {/* Main Arena Content by Phase */}
      <div className="min-h-[420px] flex items-center justify-center">
        {/* 1. COMPARISON REVEAL */}
        {state.phase === 'COMPARISON_REVEAL' && state.lastComparison && (
          <ComparisonPanel
            comparison={state.lastComparison}
            players={state.players}
            onContinue={handleResolveComparison}
          />
        )}

        {/* 2. CATEGORY CHANGE DECISION (Prompt for new controller) */}
        {state.phase === 'CATEGORY_CHANGE_DECISION' && (
          <div className="w-full max-w-2xl bg-slate-900/90 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl text-center">
            {!isChangingCategoryInDecision ? (
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Crown className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">
                    Category Control Decision
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                    <strong>{controller?.name}</strong>, you conquered the duel and took Category Control! Do you want to keep the current category or change it?
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                  <div className="text-xs uppercase font-bold text-slate-400">Current Category</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">
                    {state.currentCategory?.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {state.currentCategory?.direction === 'HIGHER_IS_BETTER'
                      ? '▲ Higher is better'
                      : '▼ Lower is better'}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleKeepCategory}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg cursor-pointer"
                  >
                    Keep Current Category
                  </button>
                  <button
                    onClick={() => setIsChangingCategoryInDecision(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg cursor-pointer"
                  >
                    Change to New Category
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <CategorySelector
                  card={
                    activePlayer?.hand[0] || {
                      instanceId: 'temp',
                      playerId: 'temp',
                      playerName: 'Player',
                      country: 'India',
                      countryCode: 'IND',
                      role: 'all-rounder',
                      imageUrl: '',
                      stats: {},
                    }
                  }
                  onSelectCategory={handleSelectCategory}
                  title="Choose Your New Category"
                  subtitle="Select the stat category you want to challenge other players on."
                />
                <button
                  onClick={() => setIsChangingCategoryInDecision(false)}
                  className="mt-4 text-xs font-bold text-slate-400 hover:text-white"
                >
                  ← Go Back
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. CONTROLLER SELECT CATEGORY */}
        {state.phase === 'CONTROLLER_SELECT_CATEGORY' && state.currentControllerCard && (
          <div className="w-full space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Category Selection
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
                {controller?.name}, Set the Duel Category
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                You played <strong>{state.currentControllerCard.playerName}</strong>. Pick the stat category where they dominate!
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <GameCardView card={state.currentControllerCard} isController={true} showAllStats={true} />
              <div className="flex-1 max-w-2xl">
                <CategorySelector
                  card={state.currentControllerCard}
                  onSelectCategory={handleSelectCategory}
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. CONTROLLER / CHALLENGER SELECT CARD FROM HAND */}
        {(state.phase === 'CONTROLLER_SELECT_CARD' || state.phase === 'CHALLENGER_SELECT_CARD') && (
          <div className="w-full space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                {isControllerTurn ? (
                  <>
                    <Crown className="w-3.5 h-3.5 text-amber-400" /> Controller Turn: {activePlayer?.name}
                  </>
                ) : (
                  <>
                    <Swords className="w-3.5 h-3.5 text-emerald-400" /> Challenger Turn: {activePlayer?.name}
                  </>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white">
                {isControllerTurn ? 'Play Your Lead Card' : 'Choose Your Challenger Card'}
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                {isControllerTurn
                  ? 'Choose a player from your hand to initiate the next battle.'
                  : `Duel against ${controller?.name}'s leader in ${state.currentCategory?.label || 'the chosen category'}.`}
              </p>

              {/* Show current category & controller card if in challenger mode */}
              {!isControllerTurn && state.currentCategory && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-emerald-500/30 inline-flex items-center gap-3 text-xs">
                  <span className="text-slate-400 font-medium">Category:</span>
                  <span className="font-bold text-emerald-400">{state.currentCategory.label}</span>
                  <span className="text-slate-400">
                    ({state.currentCategory.direction === 'HIGHER_IS_BETTER' ? '▲ Higher' : '▼ Lower'})
                  </span>
                </div>
              )}
            </div>

            {/* Hand Cards Grid */}
            <div className="flex flex-wrap items-center justify-center gap-4 py-2">
              {activePlayer?.hand.map((card) => {
                const isSelected = card.instanceId === selectedCardId;

                return (
                  <GameCardView
                    key={card.instanceId}
                    card={card}
                    isSelected={isSelected}
                    highlightCategory={state.currentCategory}
                    onClick={() => setSelectedCardId(card.instanceId)}
                  />
                );
              })}
            </div>

            {/* Confirm Selection CTA */}
            <div className="flex justify-center pt-2">
              <button
                disabled={!selectedCardId}
                onClick={handleConfirmCardPlay}
                className={`px-8 py-3.5 rounded-xl font-black text-base shadow-xl flex items-center gap-2 transition-all ${
                  selectedCardId
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 cursor-pointer shadow-emerald-500/25 transform hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                {isControllerTurn ? 'Play Card & Set Category' : 'Play Card to Duel'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
