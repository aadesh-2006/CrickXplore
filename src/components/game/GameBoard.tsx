import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { GameHistory } from './GameHistory';
import { Crown, Swords, BookOpen, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { gameSound } from '../../game/sound';

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
  const [isMuted, setIsMuted] = useState<boolean>(gameSound.getMuted());
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isChangingCategoryInDecision, setIsChangingCategoryInDecision] = useState<boolean>(false);

  const activePlayer = state.players[state.activePlayerIndex];
  const controller = state.players.find((p) => p.id === state.controllerPlayerId);
  const isControllerTurn = activePlayer?.id === state.controllerPlayerId;

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    gameSound.setMuted(nextMuted);
  };

  // Handle Play Selected Card
  const handleConfirmCardPlay = () => {
    if (!selectedCardId) return;
    gameSound.playCardReveal();

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
    gameSound.playCategorySelect();
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
    gameSound.playCardSelect();
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
          onBackToHub={onExitGame}
        />
      </div>
    );
  }

  const passTargetPlayer = state.players.find((p) => p.id === state.passDeviceTargetPlayerId);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 select-none">
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

      {/* Virtual Table Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-amber-500/20 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400/20 to-emerald-500/20 text-amber-300 border border-amber-400/30">
            <Crown className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              CrickXplore Virtual Arena • Round {state.turnNumber}
            </div>
            <div className="text-sm sm:text-base font-black text-white flex flex-wrap items-center gap-2">
              <span>Category Leader: <strong className="text-amber-300">{controller?.name || 'Controller'}</strong></span>
              {state.currentCategory && (
                <span className="text-xs bg-emerald-500/15 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  {state.currentCategory.label}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isMuted
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}
            title={isMuted ? 'Unmute game sounds' : 'Mute game sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Rules Button */}
          <button
            type="button"
            onClick={() => setIsRulesOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" /> Rules
          </button>

          {/* Exit Match */}
          <button
            type="button"
            onClick={onExitGame}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-bold transition-colors border border-white/5 cursor-pointer"
          >
            Exit Match
          </button>
        </div>
      </div>

      {/* Roster & Active Chain Table View */}
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
            controllerName={controller?.name}
          />
        </div>
      </div>

      {/* Main Virtual Cricket Table Arena */}
      <div className="min-h-[460px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {/* 1. COMPARISON REVEAL ARENA */}
          {state.phase === 'COMPARISON_REVEAL' && state.lastComparison && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <ComparisonPanel
                comparison={state.lastComparison}
                players={state.players}
                onContinue={handleResolveComparison}
              />
            </motion.div>
          )}

          {/* 2. CATEGORY CONTROL MOMENT & DECISION */}
          {state.phase === 'CATEGORY_CHANGE_DECISION' && (
            <motion.div
              key="category-decision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-slate-900/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              {!isChangingCategoryInDecision ? (
                <div className="space-y-6 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mx-auto text-slate-950 shadow-xl ring-8 ring-amber-500/20 animate-bounce">
                    <Crown className="w-10 h-10" />
                  </div>

                  <div>
                    <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest mb-2">
                      CATEGORY CONTROL ACQUIRED
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
                      {controller?.name}, Command the Table!
                    </h3>
                    <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                      You won the duel and swept the chain pot! Choose whether to maintain the current duel metric or initiate a brand new challenge.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 max-w-md mx-auto">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Active Category Metric</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">
                      {state.currentCategory?.label}
                    </div>
                    <div className="text-xs text-slate-400">
                      {state.currentCategory?.direction === 'HIGHER_IS_BETTER'
                        ? '▲ Higher is better'
                        : '▼ Lower is better'}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={handleKeepCategory}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
                    >
                      Keep Category ({state.currentCategory?.label})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        gameSound.playCardSelect();
                        setIsChangingCategoryInDecision(true);
                      }}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
                    >
                      Change to New Category
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      NEW CATEGORY — NEW CHALLENGE
                    </span>
                  </div>

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
                    title="Choose Your New Duel Category"
                    subtitle="Select the statistic where your upcoming cards dominate."
                  />
                  <button
                    type="button"
                    onClick={() => setIsChangingCategoryInDecision(false)}
                    className="mt-4 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Keep Current Category Instead
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* 3. CONTROLLER SELECT CATEGORY (Opening play) */}
          {state.phase === 'CONTROLLER_SELECT_CATEGORY' && state.currentControllerCard && (
            <motion.div
              key="controller-category"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full space-y-6"
            >
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
                  Category Command
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 font-serif-luxury">
                  {controller?.name}, Set the Duel Metric
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  You led with <strong>{state.currentControllerCard.playerName}</strong>. Pick the stat where your card holds the highest advantage!
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
            </motion.div>
          )}

          {/* 4. CONTROLLER / CHALLENGER SELECT CARD FROM HAND */}
          {(state.phase === 'CONTROLLER_SELECT_CARD' || state.phase === 'CHALLENGER_SELECT_CARD') && (
            <motion.div
              key="select-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full space-y-6"
            >
              <div className="text-center max-w-xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-widest mb-2.5">
                  {isControllerTurn ? (
                    <>
                      <Crown className="w-3.5 h-3.5 text-amber-400" /> Leader Turn: {activePlayer?.name}
                    </>
                  ) : (
                    <>
                      <Swords className="w-3.5 h-3.5 text-emerald-400" /> Challenger Turn: {activePlayer?.name}
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
                  {isControllerTurn ? 'Select Your Lead Card' : 'Select Your Challenger Card'}
                </h2>

                <p className="text-sm text-slate-300 mt-1">
                  {isControllerTurn
                    ? 'Choose a player card from your private hand to initiate the round.'
                    : `Face ${controller?.name}'s leader in ${state.currentCategory?.label || 'the active category'}.`}
                </p>

                {/* Show active category if in challenger mode */}
                {!isControllerTurn && state.currentCategory && (
                  <div className="mt-3 p-3 rounded-2xl bg-slate-950/80 border border-emerald-500/30 inline-flex items-center gap-3 text-xs shadow-md">
                    <span className="text-slate-400 font-medium">Active Duel Category:</span>
                    <span className="font-black text-emerald-300">{state.currentCategory.label}</span>
                    <span className="text-slate-400">
                      ({state.currentCategory.direction === 'HIGHER_IS_BETTER' ? '▲ Higher Wins' : '▼ Lower Wins'})
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
                      onClick={() => {
                        gameSound.playCardSelect();
                        setSelectedCardId(card.instanceId);
                      }}
                    />
                  );
                })}
              </div>

              {/* Confirm Card Selection CTA */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  disabled={!selectedCardId}
                  onClick={handleConfirmCardPlay}
                  className={`px-8 py-4 rounded-2xl font-black text-base shadow-xl flex items-center gap-2 transition-all ${
                    selectedCardId
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.35)] transform hover:-translate-y-0.5 active:translate-y-0'
                      : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {isControllerTurn ? 'Play Card & Choose Category' : 'Play Card to Duel'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Match Chronicles Log */}
      <div className="mt-8">
        <GameHistory history={state.history} />
      </div>
    </div>
  );
};
