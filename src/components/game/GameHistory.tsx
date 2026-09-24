import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameHistoryEntry } from '../../game/types';
import { History, Swords, Crown, Trophy, Skull, Shuffle, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface GameHistoryProps {
  history: GameHistoryEntry[];
}

export const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBadgeInfo = (type: GameHistoryEntry['type']) => {
    switch (type) {
      case 'CATEGORY_CHOSEN':
      case 'CATEGORY_CHANGED':
        return {
          icon: <Crown className="w-3.5 h-3.5 text-amber-400" />,
          bg: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
          tag: 'CATEGORY',
        };
      case 'CHALLENGE_WON':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
          bg: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
          tag: 'DEFENDED',
        };
      case 'CHAIN_COLLECTED':
        return {
          icon: <Trophy className="w-3.5 h-3.5 text-yellow-400" />,
          bg: 'bg-yellow-500/20 border-yellow-400/40 text-yellow-300',
          tag: 'CONTROL WON',
        };
      case 'PLAYER_ELIMINATED':
        return {
          icon: <Skull className="w-3.5 h-3.5 text-rose-400" />,
          bg: 'bg-rose-500/20 border-rose-500/40 text-rose-300',
          tag: 'ELIMINATED',
        };
      case 'GAME_WON':
        return {
          icon: <Trophy className="w-3.5 h-3.5 text-yellow-300" />,
          bg: 'bg-amber-400/25 border-amber-300 text-amber-200',
          tag: 'CHAMPION',
        };
      case 'TIE':
        return {
          icon: <Shuffle className="w-3.5 h-3.5 text-cyan-400" />,
          bg: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
          tag: 'TIE',
        };
      case 'INVALID_CHALLENGE':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
          bg: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
          tag: 'INVALID',
        };
      default:
        return {
          icon: <Swords className="w-3.5 h-3.5 text-slate-400" />,
          bg: 'bg-white/5 border-white/10 text-slate-300',
          tag: 'PLAY',
        };
    }
  };

  const reversedHistory = [...history].reverse();
  const displayedHistory = isExpanded ? reversedHistory : reversedHistory.slice(0, 4);

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
          <History className="w-4 h-4 text-emerald-400" />
          <span>Match Event Chronicles ({history.length})</span>
        </div>

        {history.length > 4 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Show Recent
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> View All ({history.length})
              </>
            )}
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        <AnimatePresence>
          {displayedHistory.map((item) => {
            const badge = getBadgeInfo(item.type);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-300"
              >
                <div className="p-1.5 rounded-lg bg-white/5 shrink-0 mt-0.5">
                  {badge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-white truncate">{item.actorName}</span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${badge.bg}`}
                      >
                        {badge.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      R{item.turn}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {history.length === 0 && (
          <div className="text-center py-4 text-xs text-slate-500">
            No events recorded yet. Play a card to begin match chronicle.
          </div>
        )}
      </div>
    </div>
  );
};
