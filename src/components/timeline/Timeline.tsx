import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, Calendar, History } from 'lucide-react';
import type { TimelineEvent, EraId, EventCategory, CricketFormat } from '../../types/timeline';
import { TimelineEventCard } from './TimelineEventCard';

interface TimelineProps {
  events: TimelineEvent[];
  selectedEraId: EraId | 'ALL';
  onSelectEra: (eraId: EraId | 'ALL') => void;
  onSelectEvent: (event: TimelineEvent) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  selectedEraId,
  onSelectEra,
  onSelectEvent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'ALL' | CricketFormat>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | EventCategory>('ALL');
  const [showFilters, setShowFilters] = useState(false);

  // Filtered Events logic
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Era filter
      if (selectedEraId !== 'ALL' && event.eraId !== selectedEraId) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'ALL' && event.format !== selectedFormat) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'ALL' && event.category !== selectedCategory) {
        return false;
      }
      // Search query (case insensitive)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesSubtitle = event.subtitle?.toLowerCase().includes(query);
        const matchesDescription = event.description.toLowerCase().includes(query);
        const matchesVenue = event.venue?.toLowerCase().includes(query);
        const matchesLocation = event.location?.toLowerCase().includes(query);
        const matchesTeams = event.teams?.some((t) => t.toLowerCase().includes(query));
        const matchesPlayers = event.players?.some((p) => p.toLowerCase().includes(query));
        const matchesTags = event.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesYear = event.year.toString().includes(query);

        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesDescription &&
          !matchesVenue &&
          !matchesLocation &&
          !matchesTeams &&
          !matchesPlayers &&
          !matchesTags &&
          !matchesYear
        ) {
          return false;
        }
      }
      return true;
    });
  }, [events, selectedEraId, selectedFormat, selectedCategory, searchQuery]);

  // Group filtered events by year
  const eventsByYear = useMemo(() => {
    const map = new Map<number, TimelineEvent[]>();
    // Sort chronological
    const sorted = [...filteredEvents].sort((a, b) => a.year - b.year);
    sorted.forEach((e) => {
      const list = map.get(e.year) || [];
      list.push(e);
      map.set(e.year, list);
    });
    return Array.from(map.entries());
  }, [filteredEvents]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedFormat('ALL');
    setSelectedCategory('ALL');
    onSelectEra('ALL');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedFormat !== 'ALL' ||
    selectedCategory !== 'ALL' ||
    selectedEraId !== 'ALL';

  return (
    <section id="timeline-chronicles" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Filter and Search Bar */}
      <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#090b10]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search years, players, venues, World Cups..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/60 text-white text-xs font-sans placeholder:text-zinc-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Format Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
            <span className="text-[10px] uppercase font-tech text-zinc-400 mr-1 hidden sm:inline">
              Format:
            </span>
            {(['ALL', 'Test', 'ODI', 'T20I', 'Multi-format'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech tracking-wider uppercase transition-all cursor-pointer ${
                  selectedFormat === fmt
                    ? 'bg-amber-400 text-black font-bold shadow-md'
                    : 'bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                {fmt}
              </button>
            ))}

            {/* Toggle Advanced Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3 py-1.5 rounded-lg text-xs font-tech tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer border ${
                showFilters || selectedCategory !== 'ALL'
                  ? 'bg-white/10 text-amber-300 border-amber-400/40'
                  : 'bg-white/[0.03] text-zinc-300 hover:text-white border-white/[0.06]'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Categories</span>
            </button>
          </div>
        </div>

        {/* Expandable Category Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-4 mt-4 border-t border-white/[0.08]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-tech text-zinc-400 w-full mb-1">
                  Filter by Category:
                </span>
                {(
                  [
                    'ALL',
                    'WORLD_CUP',
                    'TEST',
                    'ODI',
                    'T20',
                    'RECORD',
                    'PLAYER',
                    'TEAM',
                    'FORMAT',
                    'TOURNAMENT',
                    'CULTURAL',
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-[11px] font-tech uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-white/[0.02] text-zinc-400 hover:text-zinc-200 border border-white/[0.05]'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Results Status */}
        <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-zinc-400">
          <div>
            Showing <span className="text-amber-300 font-bold">{filteredEvents.length}</span> of{' '}
            <span>{events.length}</span> historical milestones
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-amber-400 hover:text-amber-300 underline text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Timeline Stream / Empty State */}
      {filteredEvents.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 space-y-4">
          <History className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="font-serif-luxury text-xl text-white">No Historical Records Found</h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            No chronicles match your active filter criteria. Try adjusting your search query or reset the filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2 rounded-xl bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase font-tech cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Central Vertical Temporal Seam (Visible on medium+ screens) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-amber-400/40 via-white/10 to-purple-400/40" />

          {/* Grouped Years */}
          <div className="space-y-16">
            {eventsByYear.map(([year, yearEvents], yearIdx) => (
              <div key={year} className="relative">
                {/* Year Marker Badge */}
                <div className="flex items-center justify-center mb-8 relative z-20">
                  <div className="px-5 py-1.5 rounded-full bg-[#090b10] border border-amber-400/40 text-amber-300 font-serif-luxury text-xl font-bold shadow-xl shadow-amber-500/10 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{year}</span>
                  </div>
                </div>

                {/* Events Grid for this year */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {yearEvents.map((event, eventIdx) => (
                    <TimelineEventCard
                      key={event.id}
                      event={event}
                      onClick={() => onSelectEvent(event)}
                      index={yearIdx * 2 + eventIdx}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
