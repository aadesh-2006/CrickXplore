import React from 'react';
import type { GamePlayer } from '../../game/types';
import { Crown, Skull } from 'lucide-react';

interface PlayerStatusProps {
  players: GamePlayer[];
  activePlayerIndex: number;
  controllerPlayerId: string;
}

export const PlayerStatus: React.FC<PlayerStatusProps> = ({
  players,
  activePlayerIndex,
  controllerPlayerId,
}) => {
  return (
    <div className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-3 md:p-4 backdrop-blur-md">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
        <span>Table Roster ({players.filter((p) => !p.isEliminated).length}/{players.length} Active)</span>
        <span className="text-[10px] text-emerald-400 font-semibold">Hot-Seat Mode</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {players.map((player, idx) => {
          const isActiveTurn = idx === activePlayerIndex;
          const isController = player.id === controllerPlayerId;
          const isEliminated = player.isEliminated || player.hand.length === 0;

          let borderClass = 'border-white/5 bg-slate-950/40';
          if (isActiveTurn && !isEliminated) {
            borderClass = 'border-emerald-400 bg-emerald-950/20 ring-1 ring-emerald-400/50';
          } else if (isController && !isEliminated) {
            borderClass = 'border-amber-400/50 bg-amber-950/20';
          } else if (isEliminated) {
            borderClass = 'border-rose-900/30 bg-rose-950/10 opacity-50';
          }

          return (
            <div
              key={player.id}
              className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden ${borderClass}`}
            >
              {/* Top Row: Controller crown or eliminated icon */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase truncate">
                  P{idx + 1}
                </span>

                {isEliminated ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded">
                    <Skull className="w-2.5 h-2.5" /> OUT
                  </span>
                ) : isController ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded">
                    <Crown className="w-2.5 h-2.5 text-amber-400" /> LEAD
                  </span>
                ) : isActiveTurn ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded animate-pulse">
                    TURN
                  </span>
                ) : null}
              </div>

              {/* Player Name */}
              <div className="font-bold text-sm text-white truncate my-0.5">
                {player.name}
              </div>

              {/* Card Count */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5 mt-1">
                <span>Cards:</span>
                <span
                  className={`font-black ${
                    isEliminated
                      ? 'text-slate-500'
                      : player.hand.length <= 1
                      ? 'text-rose-400 animate-pulse'
                      : 'text-white'
                  }`}
                >
                  {player.hand.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
