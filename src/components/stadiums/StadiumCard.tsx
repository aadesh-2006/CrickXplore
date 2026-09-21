import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import type { CricketStadium } from '../../types/stadium';

interface StadiumCardProps {
  stadium: CricketStadium;
  onClick: () => void;
  index: number;
}

export const StadiumCard: React.FC<StadiumCardProps> = ({ stadium, onClick, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      onClick={onClick}
      className="group relative rounded-2xl bg-[#090b10] border border-white/[0.08] hover:border-emerald-400/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-6 hover:shadow-2xl hover:shadow-emerald-950/20 hover:-translate-y-1.5 select-none"
    >
      {/* Background Architectural Blueprint Line Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b98108_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Header: Location, Country Badge, Established Year */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {stadium.countryCode}
            </span>
            <span className="text-xs text-zinc-400 font-tech">
              {stadium.city}, {stadium.country}
            </span>
          </div>

          <span className="text-[11px] font-tech text-zinc-400">
            Est. {stadium.establishedYear}
          </span>
        </div>

        {/* Stadium Name */}
        <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-emerald-200 transition-colors leading-snug mb-2">
          {stadium.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed line-clamp-3 mb-4 font-light">
          {stadium.description}
        </p>

        {/* Key Metrics Strip (Capacity & Formats) */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/50 border border-white/[0.06] mb-4 text-xs font-tech">
          <div>
            <span className="text-[9px] uppercase text-zinc-500 block">Capacity</span>
            <span className="text-white font-bold">
              {stadium.capacity.toLocaleString()} seats
            </span>
          </div>
          <div>
            <span className="text-[9px] uppercase text-zinc-500 block">Hosted Formats</span>
            <span className="text-zinc-300 truncate block">
              {stadium.primaryFormats.join(' • ')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Famous Moments Count & Inspect CTA */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-tech">
          <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{stadium.famousFor.length} Landmark Epics</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors shrink-0">
          <span className="uppercase tracking-wider text-[11px] font-tech">Inspect Colosseum</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
};
