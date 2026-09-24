import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameCard } from '../../game/types';
import { Layers, Flame } from 'lucide-react';

interface ChainDisplayProps {
  chain: GameCard[];
  currentControllerCard?: GameCard | null;
  currentChallengerCard?: GameCard | null;
  controllerName?: string;
}

export const ChainDisplay: React.FC<ChainDisplayProps> = ({
  chain,
  currentControllerCard,
  currentChallengerCard,
  controllerName,
}) => {
  const activeCount =
    chain.length +
    (currentControllerCard ? 1 : 0) +
    (currentChallengerCard ? 1 : 0);

  const isHighTension = activeCount >= 4;

  return (
    <div
      className={`rounded-2xl p-4 transition-all duration-300 border relative overflow-hidden ${
        isHighTension
          ? 'bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.2)]'
          : 'bg-slate-900/80 border-white/10 shadow-lg backdrop-blur-md'
      }`}
    >
      {/* Dynamic top highlight line */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] ${
          isHighTension
            ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 animate-pulse'
            : 'bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent'
        }`}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Pot Metadata */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl shrink-0 transition-transform ${
              isHighTension
                ? 'bg-amber-500/20 text-amber-300 shadow-md ring-1 ring-amber-400/40'
                : 'bg-white/5 text-slate-400'
            }`}
          >
            {isHighTension ? (
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
            ) : (
              <Layers className="w-5 h-5 text-emerald-400" />
            )}
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span>Active Chain Pot</span>
              {isHighTension && (
                <span className="text-[10px] bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black px-2 py-0.2 rounded-full shadow-sm animate-pulse">
                  HIGH STAKES
                </span>
              )}
            </div>

            <div className="text-xs text-slate-400 mt-0.5">
              {activeCount === 0 ? (
                <span>Pot is currently empty (Next cards will initiate chain)</span>
              ) : (
                <span>
                  <strong className="text-amber-400 font-bold">{activeCount}</strong>{' '}
                  {activeCount === 1 ? 'card' : 'cards'} accumulated in pot
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controller Tag & 3D Card Stack Visual */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
          {controllerName && (
            <div className="text-right hidden md:block">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Led by</span>
              <span className="text-xs font-bold text-amber-300 truncate max-w-[100px] block">
                {controllerName}
              </span>
            </div>
          )}

          {/* 3D Stack Visualization */}
          <div className="flex items-center gap-1">
            <AnimatePresence>
              {Array.from({ length: Math.min(activeCount, 6) }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 10 }}
                  className={`w-4 h-7 rounded-sm border transition-transform ${
                    isHighTension
                      ? 'bg-gradient-to-t from-amber-600 to-yellow-400 border-amber-300 shadow-sm'
                      : 'bg-gradient-to-t from-emerald-600 to-emerald-400 border-emerald-300/40'
                  }`}
                  style={{
                    transform: `rotate(${(idx - 2.5) * 6}deg) translateY(${Math.abs(idx - 2.5) * 1.5}px)`,
                  }}
                />
              ))}
            </AnimatePresence>

            {activeCount > 6 && (
              <span className="text-xs font-black text-amber-400 ml-1.5 font-mono">
                +{activeCount - 6}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
