import React from 'react';
import { motion } from 'framer-motion';

export const CuratedStatsSection: React.FC = () => {
  const stats = [
    { number: '147+', label: 'Years of Archival Lore', sub: 'From 1877 MCG to 2026' },
    { number: '500+', label: 'Deconstructed Legends', sub: 'Batting, Spin & Pace' },
    { number: '48', label: 'Sacred Colosseums', sub: 'Lord’s, MCG, Eden, WACA' },
    { number: '100%', label: 'Pure Cricket Atmosphere', sub: 'Zero Generic Scoreboard Clutter' },
  ];

  return (
    <section className="relative py-24 px-6 sm:px-8 border-y border-white/[0.06] bg-[#050608]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col ${idx !== 0 ? 'sm:pl-8 pt-6 sm:pt-0' : ''}`}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-500 mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-zinc-200 tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-400 font-tech">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
