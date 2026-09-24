import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ComparisonResult, GamePlayer } from '../../game/types';
import { GameCardView } from './GameCardView';
import { getCategoryByKey } from '../../game/categories';
import { Swords, Trophy, AlertCircle, ArrowRight, Shield, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { gameSound } from '../../game/sound';

interface ComparisonPanelProps {
  comparison: ComparisonResult;
  players: GamePlayer[];
  onContinue: () => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  comparison,
  players,
  onContinue,
}) => {
  const category = getCategoryByKey(comparison.categoryKey);
  const controller = players.find((p) => p.id === comparison.controllerPlayerId);
  const challenger = players.find((p) => p.id === comparison.challengerPlayerId);

  const isControllerWinner = comparison.winnerPlayerId === comparison.controllerPlayerId;
  const isChallengerWinner = comparison.winnerPlayerId === comparison.challengerPlayerId;
  const isTie = comparison.isTie;
  const isInvalid = comparison.isInvalid;

  const potCount = comparison.chainCardsInvolved.length;

  useEffect(() => {
    // Play sound based on duel outcome
    if (isInvalid) {
      gameSound.playInvalid();
    } else if (isTie) {
      gameSound.playTie();
    } else if (isChallengerWinner || isControllerWinner) {
      gameSound.playVictory();
    }
  }, [isInvalid, isTie, isChallengerWinner, isControllerWinner]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
      className="w-full max-w-5xl mx-auto bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-slate-900/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
    >
      {/* Dynamic ambient background glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />

      {/* Header: Duel Arena Banner */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-2"
        >
          <Swords className="w-4 h-4 text-emerald-400" /> STAT DUEL REVEAL
        </motion.div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif-luxury tracking-wide">
          {comparison.categoryLabel}
        </h2>
        
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 mt-1">
          <span>Direction:</span>
          <span
            className={`inline-flex items-center gap-1 font-black px-2 py-0.5 rounded-md border ${
              comparison.direction === 'HIGHER_IS_BETTER'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
            }`}
          >
            {comparison.direction === 'HIGHER_IS_BETTER' ? (
              <>
                <TrendingUp className="w-3.5 h-3.5" /> HIGHER WINS
              </>
            ) : (
              <>
                <TrendingDown className="w-3.5 h-3.5" /> LOWER WINS
              </>
            )}
          </span>
          <span className="text-slate-500">•</span>
          <span className="uppercase text-amber-300 font-bold">{comparison.format}</span>
        </div>
      </div>

      {/* Arena Faceoff Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 my-6">
        {/* Left: Controller Side */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5 bg-amber-500/15 px-3.5 py-1 rounded-full border border-amber-500/30 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> Category Leader: {controller?.name || 'Controller'}
          </div>
          <GameCardView
            card={comparison.controllerCard}
            isController={true}
            isWinner={isControllerWinner}
            isLoser={isChallengerWinner}
            isTie={isTie}
            highlightCategory={category}
          />
        </motion.div>

        {/* Center: VS Badge and Pot Stakes */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 300 }}
          className="flex flex-col items-center justify-center my-2 md:my-0"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-[0_0_30px_rgba(245,158,11,0.5)] ring-4 ring-slate-950 animate-pulse">
            VS
          </div>

          <div className="mt-4 text-center bg-slate-950/80 px-4 py-2 rounded-2xl border border-white/5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Cards at Stake
            </span>
            <span className="text-lg font-black text-amber-400">
              {potCount} {potCount === 1 ? 'Card' : 'Cards'} in Pot
            </span>
          </div>
        </motion.div>

        {/* Right: Challenger Side */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2 flex items-center gap-1.5 bg-blue-500/15 px-3.5 py-1 rounded-full border border-blue-500/30 shadow-sm">
            <Swords className="w-3.5 h-3.5 text-blue-400" /> Challenger: {challenger?.name || 'Challenger'}
          </div>
          <GameCardView
            card={comparison.challengerCard}
            isController={false}
            isWinner={isChallengerWinner}
            isLoser={isControllerWinner}
            isTie={isTie}
            highlightCategory={category}
          />
        </motion.div>
      </div>

      {/* Duel Verdict Callout */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-center max-w-2xl mx-auto shadow-inner"
      >
        {isInvalid && (
          <div className="space-y-1.5">
            <div className="text-amber-400 font-black text-lg flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
              Stat Unavailable — Challenge Invalid
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {comparison.invalidReason === 'MISSING_CHALLENGER_STAT'
                ? `${challenger?.name}'s card (${comparison.challengerCard.playerName}) does not possess a valid ${comparison.categoryLabel} statistic.`
                : `${controller?.name}'s card does not possess a valid ${comparison.categoryLabel} statistic.`}
              <br />
              <span className="text-emerald-400 font-bold mt-1 inline-block">
                Category Control remains with {controller?.name}. Both cards join the chain pot!
              </span>
            </p>
          </div>
        )}

        {!isInvalid && isChallengerWinner && (
          <div className="space-y-1.5">
            <div className="text-emerald-400 font-black text-lg sm:text-xl flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
              {challenger?.name} Conquers Category Control!
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              <strong>{challenger?.name}</strong> successfully defeated {controller?.name} and captures all{' '}
              <strong className="text-amber-400">{potCount} cards</strong> from the active chain pot into their hand!
            </p>
          </div>
        )}

        {!isInvalid && isControllerWinner && (
          <div className="space-y-1.5">
            <div className="text-amber-300 font-black text-lg sm:text-xl flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-amber-400" />
              {controller?.name} Defends Successfully!
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Category control defended! Both cards are added to the active chain pot ({potCount} cards total).
            </p>
          </div>
        )}

        {!isInvalid && isTie && (
          <div className="space-y-1.5">
            <div className="text-cyan-400 font-black text-lg sm:text-xl flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6 text-cyan-400" />
              Exact Tie Match!
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Stats matched identically ({comparison.controllerValue}). Control stays with {controller?.name}. Cards join the chain pot.
            </p>
          </div>
        )}
      </motion.div>

      {/* Action CTA */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            gameSound.playCardSelect();
            onContinue();
          }}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-base shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Continue Turn
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
