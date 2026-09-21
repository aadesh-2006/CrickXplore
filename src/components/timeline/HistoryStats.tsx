import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Layers, Flame, Users } from 'lucide-react';
import type { TimelineEra, TimelineEvent } from '../../types/timeline';

interface HistoryStatsProps {
  eras: TimelineEra[];
  events: TimelineEvent[];
}

export const HistoryStats: React.FC<HistoryStatsProps> = ({ eras, events }) => {
  const minYear = Math.min(...events.map((e) => e.year));
  const maxYear = Math.max(...events.map((e) => e.year));
  const yearsSpan = maxYear - minYear + 1;

  const worldCupCount = events.filter((e) => e.category === 'WORLD_CUP').length;
  const pivotalMomentsCount = events.filter((e) => e.importance === 'PIVOTAL').length;
  const uniquePlayersCount = new Set(
    events.flatMap((e) => e.relatedPlayerIds || [])
  ).size;

  const stats = [
    {
      label: 'Documented Span',
      value: `${yearsSpan} Years`,
      sub: `${minYear} — ${maxYear}`,
      icon: Calendar,
      color: 'text-amber-400',
    },
    {
      label: 'Curated Eras',
      value: `${eras.length} Epochs`,
      sub: '1970s to 2020s',
      icon: Layers,
      color: 'text-sky-400',
    },
    {
      label: 'Curated Chronicles',
      value: `${events.length} Milestones`,
      sub: `${pivotalMomentsCount} Pivotal Moments`,
      icon: Flame,
      color: 'text-rose-400',
    },
    {
      label: 'World Cups Catalogued',
      value: `${worldCupCount} Finals`,
      sub: '1975 to Present',
      icon: Trophy,
      color: 'text-yellow-400',
    },
    {
      label: 'Cross-Linked Titans',
      value: `${uniquePlayersCount} Legends`,
      sub: 'In Player Pantheon',
      icon: Users,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="py-12 px-6 sm:px-8 border-y border-white/[0.08] bg-[#07080c]/60">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-2 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-400">
                    {stat.label}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                </div>
                <div>
                  <div className="font-serif-luxury text-xl sm:text-2xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-tech text-zinc-400">
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
