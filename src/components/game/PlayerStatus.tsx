import React from 'react';
import { motion } from 'framer-motion';
import type { GamePlayer } from '../../game/types';
import { Crown, Skull, Swords } from 'lucide-react';

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
  const activeCount = players.filter((p) => !p.isEliminated && p.hand.length > 0).length;

  return (
    <div className="w-full bg-slate-900/80 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Virtual Arena Roster ({activeCount}/{players.length} Active)
        </span>
        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
          HOT-SEAT TABLE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {players.map((player, idx) => {
          const isActiveTurn = idx === activePlayerIndex;
          const isController = player.id === controllerPlayerId;
          const isEliminated = player.isEliminated || player.hand.length === 0;

          let borderClass = 'border-white/5 bg-slate-950/60';
          let glowClass = '';

          if (isEliminated) {
            borderClass = 'border-rose-950/40 bg-rose-950/10 opacity-50 grayscale';
          } else if (isActiveTurn) {
            borderClass = 'border-emerald-400 bg-gradient-to-b from-emerald-950/40 to-slate-950/80 ring-2 ring-emerald-400/50';
            glowClass = 'shadow-[0_0_20px_rgba(16,185,129,0.3)]';
          } else if (isController) {
            borderClass = 'border-amber-400/60 bg-gradient-to-b from-amber-950/30 to-slate-950/80 ring-1 ring-amber-400/30';
            glowClass = 'shadow-[0_0_15px_rgba(245,158,11,0.2)]';
          }

          return (
            <motion.div
              key={player.id}
              initial={false}
              animate={isActiveTurn ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ repeat: isActiveTurn ? Infinity : 0, duration: 2.5 }}
              className={`p-3 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${borderClass} ${glowClass}`}
            >
              {/* Top Row: Tag / Badges */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-black text-slate-400 font-mono">
                  P{idx + 1}
                </span>

                {isEliminated ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-black text-rose-400 bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.2 rounded-md">
                    <Skull className="w-2.5 h-2.5" /> ELIMINATED
                  </span>
                ) : isController ? (
                  <span className="flex items-center gap-1 text-[9px] font-black text-amber-300 bg-amber-500/25 border border-amber-400/50 px-2 py-0.5 rounded-md shadow-sm">
                    <Crown className="w-2.5 h-2.5 text-amber-400" /> LEADER
                  </span>
                ) : isActiveTurn ? (
                  <span className="flex items-center gap-1 text-[9px] font-black text-emerald-300 bg-emerald-500/25 border border-emerald-400/50 px-2 py-0.5 rounded-md animate-pulse">
                    <Swords className="w-2.5 h-2.5 text-emerald-400" /> TURN
                  </span>
                ) : null}
              </div>

              {/* Player Name */}
              <div className="font-bold text-sm text-white truncate my-0.5" title={player.name}>
                {player.name}
              </div>

              {/* Card Count & Cards Won Summary */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-white/5 mt-1.5">
                <span className="text-[10px]">Cards in Hand:</span>
                <span
                  className={`font-black text-sm font-mono ${
                    isEliminated
                      ? 'text-slate-600'
                      : player.hand.length <= 1
                      ? 'text-rose-400 animate-pulse'
                      : 'text-emerald-400'
                  }`}
                >
                  {player.hand.length}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
