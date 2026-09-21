import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, Quote } from 'lucide-react';
import type { TimelineEra, EraId } from '../../types/timeline';

interface EraSelectorProps {
  eras: TimelineEra[];
  selectedEraId: EraId | 'ALL';
  onSelectEra: (eraId: EraId | 'ALL') => void;
}

export const EraSelector: React.FC<EraSelectorProps> = ({
  eras,
  selectedEraId,
  onSelectEra,
}) => {
  const activeEra = eras.find((e) => e.id === selectedEraId);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-12">
      {/* Era Selector Nav Ribbon */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-3 pt-2 px-1 scrollbar-none border-b border-white/[0.08]">
        {/* 'ALL ERAS' Option */}
        <button
          onClick={() => onSelectEra('ALL')}
          className={`shrink-0 px-4 py-2 rounded-xl text-xs uppercase font-tech tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
            selectedEraId === 'ALL'
              ? 'bg-amber-400 text-black font-bold border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border-white/[0.08]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Complete Lore</span>
        </button>

        {/* Individual Decades */}
        {eras.map((era) => {
          const isSelected = era.id === selectedEraId;
          return (
            <button
              key={era.id}
              onClick={() => onSelectEra(era.id)}
              className={`shrink-0 px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex flex-col items-center border relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-white/10 to-white/[0.02] border-amber-400/60 shadow-xl shadow-amber-500/10 scale-105'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeEraPill"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]"
                />
              )}
              <span
                className={`font-serif-luxury text-sm font-bold tracking-wider ${
                  isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                }`}
              >
                {era.decade}
              </span>
              <span className="text-[10px] font-tech text-zinc-400 tracking-wider">
                {era.yearsSpan.split('—')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Detail Card for Selected Era */}
      {activeEra && (
        <motion.div
          key={activeEra.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 p-6 sm:p-8 rounded-2xl bg-[#090b10]/80 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Era Tint */}
          <div
            className="absolute top-0 right-0 w-96 h-96 blur-[120px] rounded-full pointer-events-none opacity-20"
            style={{ backgroundColor: activeEra.visualAccent.primary }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Cols: Title, Lore, Themes */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider ${activeEra.visualAccent.badgeBg} ${activeEra.visualAccent.text} border ${activeEra.visualAccent.border}`}>
                  {activeEra.yearsSpan}
                </span>
                <span className="text-xs text-zinc-400 font-tech">
                  {activeEra.notableTeams.join(' • ')}
                </span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {activeEra.title}
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeEra.shortDescription}
              </p>

              {/* Defining Themes */}
              <div className="pt-2">
                <div className="text-[10px] font-tech uppercase tracking-[0.2em] text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Defining Era Milestones</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeEra.definingThemes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-200"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Era Quote & Notable Players */}
            <div className="p-5 rounded-xl bg-black/40 border border-white/[0.08] space-y-4">
              <div className="flex items-start gap-2.5">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs italic text-zinc-300 font-serif leading-relaxed mb-1.5">
                    "{activeEra.epochQuote.text}"
                  </p>
                  <span className="text-[10px] uppercase font-tech text-amber-300 block">
                    — {activeEra.epochQuote.author}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08]">
                <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-400 block mb-2">
                  Pantheon Players in this Era
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeEra.notablePlayers.map((player) => (
                    <span
                      key={player}
                      className="px-2 py-0.5 rounded text-[11px] bg-white/[0.05] text-zinc-300 border border-white/5"
                    >
                      {player}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
