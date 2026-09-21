import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, ArrowUpRight, Flame } from 'lucide-react';
import type { TimelineEvent } from '../../types/timeline';

interface TimelineEventCardProps {
  event: TimelineEvent;
  onClick: () => void;
  index: number;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  WORLD_CUP: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30' },
  TEST: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30' },
  ODI: { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-500/30' },
  T20: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/30' },
  RECORD: { bg: 'bg-yellow-500/15', text: 'text-yellow-300', border: 'border-yellow-500/30' },
  PLAYER: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  TEAM: { bg: 'bg-teal-500/15', text: 'text-teal-300', border: 'border-teal-500/30' },
  FORMAT: { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-500/30' },
  TOURNAMENT: { bg: 'bg-indigo-500/15', text: 'text-indigo-300', border: 'border-indigo-500/30' },
  CULTURAL: { bg: 'bg-orange-500/15', text: 'text-orange-300', border: 'border-orange-500/30' },
};

export const TimelineEventCard: React.FC<TimelineEventCardProps> = ({
  event,
  onClick,
  index,
}) => {
  const catStyle = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.WORLD_CUP;
  const isPivotal = event.importance === 'PIVOTAL';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      onClick={onClick}
      className={`group relative rounded-2xl bg-[#090b10] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-6 hover:shadow-2xl hover:-translate-y-1 select-none ${
        isPivotal
          ? 'border-amber-500/30 hover:border-amber-400/70 hover:shadow-amber-500/15'
          : 'border-white/[0.08] hover:border-white/30 hover:shadow-black/60'
      }`}
    >
      {/* Background Archival Grid/Grain Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

      {/* Pivotal Glow Flare */}
      {isPivotal && (
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/15 blur-2xl rounded-full pointer-events-none group-hover:opacity-100 transition-opacity" />
      )}

      {/* Top Header: Year Marker + Category + Importance */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
              {event.year}
            </span>
            <span className="text-zinc-600 font-tech text-xs">•</span>
            <span className="text-[11px] font-tech text-zinc-400 tracking-wider">
              {event.format}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isPivotal && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-tech font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                <span>PIVOTAL</span>
              </span>
            )}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-tech uppercase tracking-wider ${catStyle.bg} ${catStyle.text} border ${catStyle.border}`}
            >
              {event.category.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mb-1.5 line-clamp-2">
          {event.title}
        </h3>

        {/* Subtitle / Venue */}
        {event.subtitle && (
          <p className="text-xs text-zinc-400 font-sans line-clamp-1 mb-3">
            {event.subtitle}
          </p>
        )}

        {/* Description snippet */}
        <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed line-clamp-3 mb-4">
          {event.description}
        </p>

        {/* Scorecard fragment (if available) */}
        {event.scorecardSnippet && (
          <div className="mb-4 p-2.5 rounded-lg bg-black/60 border border-white/[0.06] font-mono text-[11px] text-amber-300/90 tracking-tight">
            <div className="text-[9px] uppercase font-tech text-zinc-400 mb-0.5">Archive Ledger</div>
            <div className="truncate">{event.scorecardSnippet}</div>
          </div>
        )}
      </div>

      {/* Bottom Footer: Meta tags & Explore CTA */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-zinc-400 text-xs truncate">
          {event.venue ? (
            <div className="flex items-center gap-1 truncate text-[11px]">
              <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
              <span className="truncate">{event.location?.split(',')[0]}</span>
            </div>
          ) : event.teams && event.teams.length > 0 ? (
            <div className="flex items-center gap-1 truncate text-[11px]">
              <Users className="w-3 h-3 text-zinc-400 shrink-0" />
              <span className="truncate">{event.teams.join(' vs ')}</span>
            </div>
          ) : (
            <span className="text-[11px] font-tech text-zinc-400">HISTORICAL RECORD</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors shrink-0">
          <span className="uppercase tracking-wider text-[11px] font-tech">Inspect</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
};
