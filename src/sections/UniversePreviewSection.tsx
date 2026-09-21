import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Flame,
  Landmark,
  Hourglass,
  Sparkles,
  Swords,
  ArrowUpRight,
  Eye,
  Layers,
  Award
} from 'lucide-react';
import { UNIVERSE_SECTIONS } from '../data/universeData';
import type { UniverseItem } from '../types';

interface UniversePreviewSectionProps {
  onSelectItem: (item: UniverseItem) => void;
  onPlayTone?: () => void;
  selectedCategoryId?: string | null;
}

export const UniversePreviewSection: React.FC<UniversePreviewSectionProps> = ({
  onSelectItem,
  onPlayTone,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-amber-300" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-rose-400" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-emerald-400" />;
      case 'Hourglass':
        return <Hourglass className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-300" />;
      case 'Swords':
        return <Swords className="w-6 h-6 text-orange-400" />;
      default:
        return <Layers className="w-6 h-6 text-amber-300" />;
    }
  };

  const handleCardClick = (item: UniverseItem) => {
    if (onPlayTone) onPlayTone();
    onSelectItem(item);
  };

  return (
    <section id="universe" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
        {/* Editorial Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-tech uppercase tracking-[0.25em] text-zinc-400 mb-4"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>The Multidimensional Archive</span>
        </motion.div>

        {/* Master Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-black tracking-tight text-white max-w-4xl"
        >
          ONE GAME.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
            INFINITE STORIES.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mt-5 leading-relaxed"
        >
          Traverse the untold dimensions of cricket through curated archives, sensory moments, and interactive artifacts. Click any realm to preview what lies within.
        </motion.p>
      </div>

      {/* Grid of 6 Distinct Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {UNIVERSE_SECTIONS.map((item, index) => {
          const isHovered = hoveredCardId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onMouseEnter={() => {
                setHoveredCardId(item.id);
              }}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={() => handleCardClick(item)}
              className="group relative h-[420px] rounded-2xl sm:rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 bg-[#0c0d12] border border-white/[0.08] hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Card Ambient Glow Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${item.accentColor} opacity-20 group-hover:opacity-60 transition-opacity duration-700`}
              />

              {/* Textured Watermark Seam Motif */}
              <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500 pointer-events-none flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border border-dashed border-white/[0.03] group-hover:rotate-45 transition-transform duration-1000" />
              </div>

              {/* Card Top: Category Badge + Explore Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                    {getCardIcon(item.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-zinc-400 block">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-zinc-300">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-black text-zinc-400 flex items-center justify-center transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Card Center: Atmospheric Articulation & Tagline */}
              <div className="relative z-10 my-auto py-4">
                <span className="text-[11px] font-tech uppercase tracking-widest text-amber-300/80 mb-1 block">
                  {item.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-black text-white tracking-wide mb-3 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-3 group-hover:text-zinc-200 transition-colors">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Metric Strip & Exploration Trigger */}
              <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-tech uppercase tracking-wider text-zinc-400">
                    {item.statsLabel}
                  </span>
                  <span className="text-xs font-bold text-zinc-200 font-tech">
                    {item.statsValue}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider group-hover:translate-x-1 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>PREVIEW</span>
                </div>
              </div>

              {/* Subtle hover specular highlight */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-white/[0.04] to-transparent pointer-events-none transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
