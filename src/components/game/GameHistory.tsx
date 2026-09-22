import React from 'react';
import type { GameHistoryEntry } from '../../game/types';
import { History, Swords, Crown, Trophy, Skull, Shuffle, CheckCircle2 } from 'lucide-react';

interface GameHistoryProps {
  history: GameHistoryEntry[];
}

export const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const getIcon = (type: GameHistoryEntry['type']) => {
    switch (type) {
      case 'CATEGORY_CHOSEN':
      case 'CATEGORY_CHANGED':
        return <Crown className="w-3.5 h-3.5 text-amber-400" />;
      case 'CHALLENGE_WON':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'CHAIN_COLLECTED':
        return <Trophy className="w-3.5 h-3.5 text-amber-300" />;
      case 'PLAYER_ELIMINATED':
        return <Skull className="w-3.5 h-3.5 text-rose-400" />;
      case 'GAME_WON':
        return <Trophy className="w-3.5 h-3.5 text-yellow-400" />;
      case 'TIE':
        return <Shuffle className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Swords className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const reversedHistory = [...history].reverse();

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
        <History className="w-4 h-4 text-emerald-400" /> Match Event Log
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {reversedHistory.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-300"
          >
            <div className="p-1 rounded-md bg-white/5 shrink-0 mt-0.5">
              {getIcon(item.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white">{item.actorName}</span>
                <span className="text-[10px] text-slate-500 font-mono">Turn {item.turn}</span>
              </div>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {history.length === 0 && (
          <div className="text-center py-4 text-xs text-slate-500">
            No events recorded yet.
          </div>
        )}
      </div>
    </div>
  );
};
