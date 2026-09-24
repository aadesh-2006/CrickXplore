import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import type { CricketStory } from '../../types/stories';

interface StoryCardProps {
  story: CricketStory;
  onSelectStory: (slug: string) => void;
  featured?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onSelectStory,
  featured = false,
}) => {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelectStory(story.slug)}
      className={`group relative rounded-3xl bg-[#090b10]/90 border border-white/[0.08] hover:border-amber-400/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Dynamic Background Glow */}
      <div
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: story.colorAccent.primary }}
      />

      <div>
        {/* Category & Year Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-tech font-bold uppercase tracking-[0.25em] text-amber-300">
              {story.year} • {story.tournament.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-zinc-300">
              {story.category}
            </span>
          </div>
        </div>

        {/* Player Name & Headline Score */}
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <span className="font-serif-luxury text-sm sm:text-base font-bold tracking-wider text-zinc-300 uppercase">
            {story.player}
          </span>
          <span className="font-serif-luxury text-xl sm:text-2xl font-black text-amber-400">
            {story.headlineScore}
          </span>
        </div>

        {/* Story Title */}
        <h3 className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-amber-200 transition-colors duration-300 leading-tight mb-3">
          {story.title}
        </h3>

        {/* Subtitle / Synopsis */}
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans line-clamp-3">
          {story.synopsis}
        </p>
      </div>

      {/* Card Footer: Reading Time & Read Button */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-tech">
          <BookOpen className="w-3.5 h-3.5 text-amber-400/80" />
          <span>{story.readTime}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform duration-300">
          <span>Read Narrative</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.article>
  );
};
