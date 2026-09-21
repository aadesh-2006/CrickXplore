import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Zap, Volume2, Disc, ArrowRight } from 'lucide-react';
import { SENSORY_FACTS } from '../data/universeData';

interface SensoryAtmosphereSectionProps {
  onPlayTone?: () => void;
}

export const SensoryAtmosphereSection: React.FC<SensoryAtmosphereSectionProps> = ({ onPlayTone }) => {
  const [activeSensoryIndex, setActiveSensoryIndex] = useState(0);
  const activeFact = SENSORY_FACTS[activeSensoryIndex];

  const handleSelect = (idx: number) => {
    setActiveSensoryIndex(idx);
    if (onPlayTone) onPlayTone();
  };

  return (
    <section id="sensory" className="relative py-28 px-6 sm:px-8 border-t border-white/[0.06] bg-[#07080c]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[11px] font-tech uppercase tracking-[0.25em] text-amber-300 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Sensory Physics & Lore</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-black text-white tracking-tight">
              THE ANATOMY OF A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
                MILLISECOND.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-light">
            Cricket is won and lost in the unseen sensory micro-moments. Inspect the tactile poetry of the sport.
          </p>
        </div>

        {/* Sensory Interactive Showcase (Digital Museum Exhibition Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Navigation Selector List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SENSORY_FACTS.map((item, idx) => {
              const isSelected = idx === activeSensoryIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-white/[0.07] border-amber-400/50 shadow-xl shadow-amber-500/5'
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-tech text-sm font-bold transition-colors ${
                        isSelected ? 'text-amber-400' : 'text-zinc-400 group-hover:text-zinc-400'
                      }`}
                    >
                      {item.number}
                    </span>
                    <div>
                      <div className="text-[10px] font-tech uppercase tracking-wider text-zinc-400 mb-0.5">
                        {item.subtitle}
                      </div>
                      <h4
                        className={`text-base sm:text-lg font-serif-luxury font-bold transition-colors ${
                          isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-amber-400 scale-125 shadow-[0_0_10px_#fbbf24]'
                        : 'bg-white/10 group-hover:bg-white/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Museum Exhibit Stage (7 Cols) */}
          <div className="lg:col-span-7 relative min-h-[420px] rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0e1017] via-[#0b0c11] to-[#07080a] border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Ambient Graphic Backdrop */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFact.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-tech tracking-widest uppercase">
                      EXHIBIT {activeFact.number}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-tech">
                      <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>TELEMETRY SYNCED</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-3xl sm:text-4xl font-serif-luxury font-black text-white tracking-wide mb-3">
                    {activeFact.title}
                  </h3>
                  <span className="text-xs uppercase font-tech tracking-[0.2em] text-amber-400 block mb-6">
                    {activeFact.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed mb-6">
                    {activeFact.description}
                  </p>

                  {/* Technical Analysis Note */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 font-light leading-relaxed flex items-start gap-3">
                    <Disc className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{activeFact.detail}</span>
                  </div>
                </div>

                {/* Bottom Interactive Trigger Bar */}
                <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-tech">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Resonant Acoustic Signature: 1.2 kHz Active</span>
                  </div>

                  <button
                    onClick={onPlayTone}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-amber-400 hover:text-black border border-white/10 text-xs text-zinc-200 font-medium tracking-wider transition-all duration-300 cursor-pointer"
                  >
                    <span>Trigger Acoustic Willow Strike</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
