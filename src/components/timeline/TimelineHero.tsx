import React from 'react';
import { motion } from 'framer-motion';
import { Hourglass, Sparkles, ArrowDown, History } from 'lucide-react';
import type { TimelineEra } from '../../types/timeline';

interface TimelineHeroProps {
  currentEra: TimelineEra;
  onExploreClick: () => void;
  totalEventsCount: number;
}

export const TimelineHero: React.FC<TimelineHeroProps> = ({
  currentEra,
  onExploreClick,
  totalEventsCount,
}) => {
  return (
    <section className="relative pt-32 pb-16 px-6 sm:px-8 overflow-hidden">
      {/* Dynamic atmospheric era ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentEra.visualAccent.primary} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-6"
        >
          <History className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-tech uppercase tracking-[0.25em] text-zinc-300">
            THE CRICKET WORLD CHRONICLES • 1970 — 2026+
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span className="text-[10px] font-tech text-amber-300">
            {totalEventsCount} Epoch Milestones
          </span>
        </motion.div>

        {/* Main Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]"
        >
          A Game Measured in{' '}
          <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Centuries
          </span>
          ,<br className="hidden sm:inline" /> Remembered in{' '}
          <span className="text-zinc-300 italic font-normal">Moments.</span>
        </motion.h1>

        {/* Subtitle / Era Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Journey across six transformative eras of cricket history. From five-day Test epics and the
          Packer rebellion to World Cup miracles and the modern T20 revolution.
        </motion.p>

        {/* Active Era Dynamic Banner */}
        <motion.div
          key={currentEra.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-lg mb-10 shadow-2xl relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at top right, ${currentEra.visualAccent.primary}, transparent 70%)`,
            }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left px-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-white/10 text-white">
                  FOCUS DECADE
                </span>
                <span className={`text-xs font-tech font-semibold ${currentEra.visualAccent.text}`}>
                  {currentEra.yearsSpan}
                </span>
              </div>
              <h3 className="font-serif-luxury text-lg text-white font-bold">
                {currentEra.title}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-serif-luxury font-black text-amber-300">
                {currentEra.decade}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onExploreClick}
            className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Explore Timeline</span>
            <ArrowDown className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#format-evolution"
            className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Hourglass className="w-4 h-4 text-amber-400" />
            <span>Format Evolution</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
