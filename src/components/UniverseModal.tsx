import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Trophy,
  Users,
  Crown,
  History,
  Flame,
  Landmark,
} from 'lucide-react';
import type { UniverseItem } from '../types';

interface UniverseModalProps {
  item: UniverseItem | null;
  onClose: () => void;
  onLaunchExplorer?: (targetId: string) => void;
}

export const UniverseModal: React.FC<UniverseModalProps> = ({ item, onClose, onLaunchExplorer }) => {
  if (!item) return null;

  const isPlayers = item.id === 'players';
  const isCards = item.id === 'cards';
  const isTimeline = item.id === 'timeline';
  const isMoments = item.id === 'moments';
  const isStadiums = item.id === 'stadiums';
  const isGame = item.id === 'card-game';
  const isLiveRealm = isPlayers || isCards || isTimeline || isMoments || isStadiums || isGame;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[#0d0f15] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-500/5 z-10 overflow-hidden my-8"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${item.accentColor} rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-60`} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Tag / Category */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-tech tracking-widest uppercase">
              {item.badge}
            </span>
            <span className="text-xs text-zinc-400 font-tech tracking-wider uppercase">
              {item.category}
            </span>
          </div>

          {/* Title & Tagline */}
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-black text-white tracking-wide mb-2">
            {item.title}
          </h2>
          <p className="text-base sm:text-lg text-amber-300/90 font-medium mb-6">
            {item.tagline}
          </p>

          {/* Lore Section */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs uppercase font-tech tracking-wider text-zinc-400 mb-1">
                  Universe Lore
                </h4>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
                  {item.detailedLore}
                </p>
              </div>
            </div>
          </div>

          {/* Key Capabilities / Features Planned */}
          <div className="mb-6">
            <h4 className="text-xs uppercase font-tech tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Architectural Modules</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-xs text-amber-200">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Status:{' '}
                  {isPlayers
                    ? 'Live in Phase 2'
                    : isCards
                    ? 'Live in Phase 3'
                    : isTimeline
                    ? 'Live in Phase 4'
                    : isMoments || isStadiums
                    ? 'Live in Phase 5'
                    : isGame
                    ? 'Live in Phase 6'
                    : `${item.statsValue} (${item.statsLabel})`}
                </span>
              </div>
            </div>
          </div>

          {/* Quote */}
          {item.quote && (
            <div className="p-4 rounded-xl border-l-2 border-amber-400/80 bg-black/40 mb-8 italic text-xs sm:text-sm text-zinc-300">
              "{item.quote.text}"
              <span className="block not-italic text-[11px] font-tech text-zinc-400 mt-1">
                — {item.quote.author}
              </span>
            </div>
          )}

          {/* Footer note & action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-tech">
              <ShieldAlert className="w-4 h-4 text-amber-400/80" />
              <span>
                {isLiveRealm
                  ? 'Live interactive realm active'
                  : 'Live interactive preview'}
              </span>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isLiveRealm && onLaunchExplorer && (
                <button
                  onClick={() => {
                    onClose();
                    onLaunchExplorer(item.id);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:scale-105 text-black font-bold text-xs tracking-wider shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
                >
                  {isCards ? (
                    <Crown className="w-3.5 h-3.5" />
                  ) : isTimeline ? (
                    <History className="w-3.5 h-3.5" />
                  ) : isMoments ? (
                    <Flame className="w-3.5 h-3.5" />
                  ) : isStadiums ? (
                    <Landmark className="w-3.5 h-3.5" />
                  ) : isGame ? (
                    <Trophy className="w-3.5 h-3.5" />
                  ) : (
                    <Users className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {isCards
                      ? 'Enter Digital Collection'
                      : isTimeline
                      ? 'Enter Timeline Chronicles'
                      : isMoments
                      ? 'Enter Moment Archive'
                      : isStadiums
                      ? 'Enter Stadium Atlas'
                      : isGame
                      ? 'Enter Card Game Arena'
                      : 'Enter Player Explorer'}
                  </span>
                </button>
              )}

              <button
                onClick={onClose}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-white font-semibold text-xs tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span>Close</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
