import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Activity } from 'lucide-react';
import type { CricketMoment } from '../../types/moment';

interface MomentCardProps {
  moment: CricketMoment;
  onClick: () => void;
  index: number;
}

export const MomentCard: React.FC<MomentCardProps> = ({ moment, onClick, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      onClick={onClick}
      className="group relative rounded-2xl bg-[#090b10] border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-6 hover:shadow-2xl hover:shadow-rose-950/20 hover:-translate-y-1.5 select-none"
    >
      {/* Background Archival Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/80 pointer-events-none" />

      {/* Tension Glow Flare */}
      {moment.tensionIndex && moment.tensionIndex >= 95 && (
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/15 blur-2xl rounded-full pointer-events-none group-hover:opacity-100 transition-opacity" />
      )}

      {/* Top Header: Year, Format & Category */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-baseline gap-2">
            <span className="font-serif-luxury text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
              {moment.year}
            </span>
            <span className="text-zinc-600 font-tech text-xs">•</span>
            <span className="text-[11px] font-tech uppercase text-zinc-400">
              {moment.format}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {moment.tensionIndex && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-tech font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                <Activity className="w-2.5 h-2.5 text-rose-400" />
                <span>{moment.tensionIndex}% Tension</span>
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech uppercase tracking-wider bg-white/10 text-zinc-300 border border-white/10">
              {moment.category.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mb-1">
          {moment.title}
        </h3>

        {moment.subtitle && (
          <p className="text-xs text-amber-300/80 font-sans line-clamp-1 mb-3">
            {moment.subtitle}
          </p>
        )}

        {/* Short Editorial Story Snippet */}
        <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed line-clamp-3 mb-4 font-light">
          {moment.shortDescription}
        </p>

        {/* Scorecard Snippet */}
        {moment.scorecardSnippet && (
          <div className="mb-4 p-2.5 rounded-lg bg-black/60 border border-white/[0.06] font-mono text-[11px] text-zinc-300 truncate">
            {moment.scorecardSnippet}
          </div>
        )}
      </div>

      {/* Footer: Venue, Teams & Enter CTA */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-zinc-400 text-xs truncate">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate">{moment.venue}</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors shrink-0">
          <span className="uppercase tracking-wider text-[11px] font-tech">Enter Moment</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
};
