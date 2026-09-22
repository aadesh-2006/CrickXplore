import React from 'react';
import type { ComparisonResult, GamePlayer } from '../../game/types';
import { GameCardView } from './GameCardView';
import { getCategoryByKey } from '../../game/categories';
import { Swords, Trophy, AlertCircle, ArrowRight, Shield, AlertTriangle } from 'lucide-react';

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

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900/90 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Stat Category & Duel Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
          <Swords className="w-4 h-4" /> STAT DUEL ARENA
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white">
          {comparison.categoryLabel}
        </h2>
        <div className="text-sm font-semibold text-slate-400 mt-1">
          Rule:{' '}
          <span className="text-emerald-400 font-bold">
            {comparison.direction === 'HIGHER_IS_BETTER' ? '▲ HIGHER WINS' : '▼ LOWER WINS'}
          </span>
          {' • '}Format: <span className="uppercase text-white font-bold">{comparison.format}</span>
        </div>
      </div>

      {/* Arena Faceoff Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 my-4">
        {/* Left: Controller Side */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Shield className="w-3.5 h-3.5" /> Category Controller: {controller?.name || 'Controller'}
          </div>
          <GameCardView
            card={comparison.controllerCard}
            isController={true}
            isWinner={isControllerWinner}
            isLoser={isChallengerWinner}
            isTie={isTie}
            highlightCategory={category}
          />
        </div>

        {/* Center: VS Badge and Pot Stakes */}
        <div className="flex flex-col items-center justify-center my-2 md:my-0">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-xl ring-4 ring-slate-900 animate-pulse">
            VS
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Cards at Stake
            </span>
            <span className="text-lg font-black text-amber-400">
              {potCount} {potCount === 1 ? 'Card' : 'Cards'} in Pot
            </span>
          </div>
        </div>

        {/* Right: Challenger Side */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            <Swords className="w-3.5 h-3.5" /> Challenger: {challenger?.name || 'Challenger'}
          </div>
          <GameCardView
            card={comparison.challengerCard}
            isController={false}
            isWinner={isChallengerWinner}
            isLoser={isControllerWinner}
            isTie={isTie}
            highlightCategory={category}
          />
        </div>
      </div>

      {/* Duel Verdict Callout */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-950/60 border border-white/10 text-center max-w-2xl mx-auto">
        {isInvalid && (
          <div className="space-y-1">
            <div className="text-amber-400 font-black text-lg flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Stat Unavailable on Played Card — Challenge Invalid
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {comparison.invalidReason === 'MISSING_CHALLENGER_STAT'
                ? `${challenger?.name}'s card does not have a ${comparison.categoryLabel} stat. Challenge cannot be evaluated!`
                : `${controller?.name}'s card does not have a ${comparison.categoryLabel} stat.`}
              <br />
              <span className="text-emerald-400 font-semibold">
                Control remains with {controller?.name}. Both cards join the active chain pot.
              </span>
            </p>
          </div>
        )}

        {!isInvalid && isChallengerWinner && (
          <div className="space-y-1">
            <div className="text-emerald-400 font-black text-lg flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              {challenger?.name} Defeats Controller!
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {challenger?.name} takes Category Control and claims all {potCount} cards from the chain pot!
            </p>
          </div>
        )}

        {!isInvalid && isControllerWinner && (
          <div className="space-y-1">
            <div className="text-amber-400 font-black text-lg flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              {controller?.name} Defends Successfully!
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Control retained! Both cards are added to the active chain pot ({potCount} cards total).
            </p>
          </div>
        )}

        {!isInvalid && isTie && (
          <div className="space-y-1">
            <div className="text-cyan-400 font-black text-lg flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5 text-cyan-400" />
              Exact Tie!
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Both stats matched perfectly. Control stays with {controller?.name}. Cards join the chain pot.
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-base shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Continue Turn
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
