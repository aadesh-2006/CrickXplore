import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Zap, Layers, Sparkles } from 'lucide-react';
import { FORMAT_EVOLUTION_STAGES } from '../../data/timeline/formatEvolution';

export const FormatEvolution: React.FC = () => {
  return (
    <section id="format-evolution" className="py-20 px-6 sm:px-8 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-tech uppercase tracking-[0.2em] text-amber-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Format Evolution Exhibition</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Three Pillars of Modern Cricket
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Cricket is unique in world sports: rather than discarding older formats, the game expanded into three coexisting disciplines—each demanding distinct physical stamina, psychological fortitude, and tactical intelligence.
          </p>
        </div>

        {/* 3 Format Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FORMAT_EVOLUTION_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`rounded-2xl p-6 bg-[#090b10] border ${stage.accentBorder} relative overflow-hidden flex flex-col justify-between shadow-2xl group hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Top Accent Flare */}
              <div
                className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${stage.accentColor} pointer-events-none opacity-50`}
              />

              <div className="relative z-10 space-y-4">
                {/* Header: Short Code & Birth Year */}
                <div className="flex items-center justify-between">
                  <span className="font-serif-luxury text-3xl font-black text-white">
                    {stage.shortCode}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-tech text-zinc-400 block">
                      INCEPTION
                    </span>
                    <span className="font-tech text-sm font-bold text-amber-300">
                      {stage.birthYear}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white">
                    {stage.formatName}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Technical Specs List */}
                <div className="space-y-2 py-3 border-y border-white/[0.08] text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5 font-tech">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" /> Duration
                    </span>
                    <span className="text-zinc-200 font-medium">{stage.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5 font-tech">
                      <Shield className="w-3.5 h-3.5 text-zinc-500" /> Attire & Ball
                    </span>
                    <span className="text-zinc-200 font-medium truncate max-w-[170px] text-right">
                      {stage.clothing.split('(')[0]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5 font-tech">
                      <Zap className="w-3.5 h-3.5 text-zinc-500" /> Match Overs
                    </span>
                    <span className="text-zinc-200 font-medium">{stage.overs}</span>
                  </div>
                </div>

                {/* Tactical Evolution Details */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-tech tracking-wider text-amber-400 font-semibold block">
                    Tactical Paradigm
                  </span>
                  <p className="text-xs text-zinc-300/90 leading-relaxed font-sans">
                    {stage.tacticalEvolution}
                  </p>
                </div>
              </div>

              {/* Key Milestone Footer */}
              <div className="relative z-10 mt-6 pt-3 border-t border-white/[0.06]">
                <div className="text-[9px] uppercase font-tech text-zinc-500 mb-0.5">
                  Epoch Benchmark
                </div>
                <div className="text-[11px] font-tech text-zinc-300 font-medium line-clamp-1">
                  {stage.keyMilestone}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coexistence Harmony Synthesis Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-white/[0.02] to-purple-500/10 border border-white/10 text-center relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto space-y-2">
            <h4 className="font-serif-luxury text-xl font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>The Coexistence Doctrine</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              T20 sharpened fielding reflexes and boundary power; ODIs mastered tactical pacing and multi-tiered chases; Tests remain the uncompromising cathedral of character. Modern masters transition seamlessly across all three.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
