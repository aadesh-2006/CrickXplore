import React from 'react';
import type { GameCard } from '../../game/types';
import { Layers, Flame } from 'lucide-react';

interface ChainDisplayProps {
  chain: GameCard[];
  currentControllerCard?: GameCard | null;
  currentChallengerCard?: GameCard | null;
}

export const ChainDisplay: React.FC<ChainDisplayProps> = ({
  chain,
  currentControllerCard,
  currentChallengerCard,
}) => {
  const activeCount =
    chain.length +
    (currentControllerCard ? 1 : 0) +
    (currentChallengerCard ? 1 : 0);

  const isHighTension = activeCount >= 4;

  return (
    <div
      className={`rounded-2xl p-4 transition-all duration-300 border ${
        isHighTension
          ? 'bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
          : 'bg-slate-900/60 border-white/5'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-xl ${
              isHighTension ? 'bg-amber-500/20 text-amber-400 animate-bounce' : 'bg-white/5 text-slate-400'
            }`}
          >
            {isHighTension ? <Flame className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              Active Pot / Chain
              {isHighTension && (
                <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.2 rounded-full font-bold">
                  HIGH STAKES
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {activeCount === 0
                ? 'Pot is currently empty'
                : `${activeCount} ${activeCount === 1 ? 'card' : 'cards'} at stake for the next winning challenger`}
            </div>
          </div>
        </div>

        {/* Stack Indicator */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(activeCount, 6) }).map((_, idx) => (
            <div
              key={idx}
              className={`w-3.5 h-6 rounded-sm border ${
                isHighTension
                  ? 'bg-amber-500/80 border-amber-300 shadow-sm'
                  : 'bg-emerald-500/60 border-emerald-400/40'
              }`}
              style={{
                transform: `rotate(${(idx - 2) * 4}deg) translateY(${Math.abs(idx - 2)}px)`,
              }}
            />
          ))}
          {activeCount > 6 && (
            <span className="text-xs font-black text-amber-400 ml-1">+{activeCount - 6}</span>
          )}
        </div>
      </div>
    </div>
  );
};
