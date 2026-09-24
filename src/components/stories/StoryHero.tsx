import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ArrowRight, Trophy } from 'lucide-react';
import type { CricketStory } from '../../types/stories';

interface StoryHeroProps {
  featuredStory: CricketStory;
  onSelectStory: (slug: string) => void;
  totalStoriesCount: number;
}

export const StoryHero: React.FC<StoryHeroProps> = ({
  featuredStory,
  onSelectStory,
  totalStoriesCount,
}) => {
  return (
    <section className="relative pt-36 md:pt-40 pb-16 px-6 sm:px-8 overflow-hidden">
      {/* Dynamic atmospheric ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ background: featuredStory.colorAccent.primary }}
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-tech uppercase tracking-[0.25em] text-zinc-300">
            THE CRICKET WORLD CHRONICLES • EDITORIAL ARCHIVE
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span className="text-[10px] font-tech text-amber-300">
            {totalStoriesCount} Long-Form Narratives
          </span>
        </motion.div>

        {/* Main Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08]"
        >
          The Stories Behind{' '}
          <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            The Moments.
          </span>
        </motion.h1>

        {/* Editorial Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12 space-y-2"
        >
          <p className="font-serif-luxury text-lg sm:text-xl text-amber-200/90 italic">
            “Scorecards tell you what happened. Stories tell you why it mattered.”
          </p>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
            Cricket is remembered in numbers, but history is forged in the human crucible of pressure,
            context, defiance, and belief that separates a statistic from an immortal legacy.
          </p>
        </motion.div>

        {/* Featured Story Large Cinematic Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onClick={() => onSelectStory(featuredStory.slug)}
          className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-white/[0.06] to-black/60 border border-white/10 hover:border-amber-400/40 p-6 sm:p-10 text-left relative overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 group cursor-pointer"
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
            style={{ background: featuredStory.colorAccent.primary }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center gap-1.5">
                  <Trophy className="w-3 h-3" />
                  FEATURED CHRONICLE
                </span>
                <span className="text-xs font-tech font-semibold text-zinc-300">
                  {featuredStory.year} • {featuredStory.tournament}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-amber-300/90 uppercase tracking-wider">
                    {featuredStory.player}
                  </span>
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-black text-amber-400">
                    {featuredStory.headlineScore}
                  </span>
                </div>
                <h2 className="font-serif-luxury text-2xl sm:text-4xl font-black text-white group-hover:text-amber-200 transition-colors leading-tight">
                  {featuredStory.title}
                </h2>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans line-clamp-3">
                {featuredStory.synopsis}
              </p>

              <div className="flex items-center gap-4 text-xs font-tech text-zinc-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {featuredStory.readTime}
                </span>
                <span>•</span>
                <span>{featuredStory.venue}</span>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                type="button"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:scale-105 transition-all shadow-xl shadow-amber-500/20"
              >
                <span>Read Full Chronicle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
