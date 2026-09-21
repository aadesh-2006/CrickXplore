import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  Crown,
  ArrowLeft,
  X,
  Layers,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { DigitalCollectibleCard } from '../components/cards/DigitalCollectibleCard';
import { CollectibleCardModal } from '../components/cards/CollectibleCardModal';
import { SAMPLE_COLLECTION } from '../data/sampleCollection';
import type { CollectibleCard, CardVariant, CardFilterOptions } from '../types/collectibleCard';
import type { FormatType, PlayerRole } from '../types/player';

import type { AppView } from '../App';

interface CollectionPageProps {
  onNavigateView: (
    view: AppView,
    playerId?: string,
    cardId?: string,
    momentId?: string,
    stadiumId?: string
  ) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPlayTone: () => void;
  initialSelectedCardId?: string;
}

const VARIANTS: Array<{ id: CardVariant | 'all'; label: string }> = [
  { id: 'all', label: 'All Editions' },
  { id: 'STANDARD', label: 'Standard' },
  { id: 'GOLD', label: 'Gold' },
  { id: 'WORLD_CUP', label: 'World Cup' },
  { id: 'RECORD', label: 'Record' },
  { id: 'ICONIC_MOMENT', label: 'Iconic Moment' },
  { id: 'LEGEND', label: 'Legend' },
];

const FORMATS: Array<{ id: FormatType | 'all'; label: string }> = [
  { id: 'all', label: 'All Formats' },
  { id: 'test', label: 'Test' },
  { id: 'odi', label: 'ODI' },
  { id: 't20i', label: 'T20I' },
];

const ROLES: Array<{ id: PlayerRole | 'all'; label: string }> = [
  { id: 'all', label: 'All Roles' },
  { id: 'batter', label: 'Batters' },
  { id: 'bowler', label: 'Bowlers' },
  { id: 'all-rounder', label: 'All-Rounders' },
  { id: 'wicket-keeper', label: 'Keepers' },
];

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
  initialSelectedCardId,
}) => {
  const [selectedCard, setSelectedCard] = useState<CollectibleCard | null>(null);

  useEffect(() => {
    if (initialSelectedCardId) {
      const match = SAMPLE_COLLECTION.find(
        (c) => c.id === initialSelectedCardId || c.serialNumber === initialSelectedCardId
      );
      if (match) {
        setSelectedCard(match);
      }
    }
  }, [initialSelectedCardId]);

  const [filters, setFilters] = useState<CardFilterOptions>({
    searchQuery: '',
    variant: 'all',
    format: 'all',
    role: 'all',
    rarity: 'all',
  });

  // Filtered Cards
  const filteredCards = useMemo(() => {
    const q = filters.searchQuery.toLowerCase().trim();

    return SAMPLE_COLLECTION.filter((card) => {
      // Search
      if (q && !card.playerName.toLowerCase().includes(q) &&
          !card.signatureTitle.toLowerCase().includes(q) &&
          !card.nationality.toLowerCase().includes(q) &&
          !card.serialNumber.toLowerCase().includes(q)) {
        return false;
      }
      // Variant
      if (filters.variant !== 'all' && card.variant !== filters.variant) {
        return false;
      }
      // Format
      if (filters.format !== 'all' && card.format !== filters.format) {
        return false;
      }
      // Role
      if (filters.role !== 'all' && card.role !== filters.role) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const handleCardClick = (card: CollectibleCard) => {
    onPlayTone();
    setSelectedCard(card);
  };

  const handleInspectPlayerInPantheon = (playerId: string) => {
    onNavigateView('players', playerId);
  };

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Interactive Background Particle & Lighting Layer */}
      <CricketAtmosphericBackground />

      {/* Main Navbar */}
      <Navbar
        currentView="collection"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      <main className="relative z-10 pt-32 pb-24 px-6 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigateView('home')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs font-tech uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sanctuary</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-tech text-amber-300">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Permanent Digital Artifacts • Series 1</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-tech uppercase tracking-[0.25em] text-amber-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Digital Album</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-black tracking-tight text-white mb-4"
          >
            CRICK<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">X</span>PLORE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
              COLLECTION.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto"
          >
            Your archive of cricket's greatest stories. Permanent collectible relics showcasing the titans, records, world cups, and golden moments.
          </motion.p>
        </div>

        {/* Collection Metrics Strip */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
            <span className="text-[10px] font-tech uppercase tracking-wider text-zinc-500 mb-1">Catalogued Relics</span>
            <span className="text-2xl sm:text-3xl font-bold font-tech text-white">{SAMPLE_COLLECTION.length}</span>
            <span className="text-[10px] text-zinc-500 mt-1">Series 1 Minted</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
            <span className="text-[10px] font-tech uppercase tracking-wider text-amber-400 mb-1">Mythic Legends</span>
            <span className="text-2xl sm:text-3xl font-bold font-tech text-amber-300">
              {SAMPLE_COLLECTION.filter(c => c.variant === 'LEGEND').length}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1">Highest Tier</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
            <span className="text-[10px] font-tech uppercase tracking-wider text-emerald-400 mb-1">World Cup Relics</span>
            <span className="text-2xl sm:text-3xl font-bold font-tech text-emerald-300">
              {SAMPLE_COLLECTION.filter(c => c.variant === 'WORLD_CUP' || c.variant === 'ICONIC_MOMENT').length}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1">Historic Finals</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
            <span className="text-[10px] font-tech uppercase tracking-wider text-cyan-400 mb-1">Record Breakers</span>
            <span className="text-2xl sm:text-3xl font-bold font-tech text-cyan-300">
              {SAMPLE_COLLECTION.filter(c => c.variant === 'RECORD').length}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1">Statistical Feats</span>
          </div>
        </div>

        {/* Interactive Filters & Search */}
        <div className="max-w-5xl mx-auto mb-12">
          {/* Search bar */}
          <div className="relative group mb-6">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative flex items-center bg-[#0d0f16] border border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-xl">
              <Search className="w-5 h-5 text-amber-400 shrink-0 mr-3.5" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search collection by player, serial, edition, or record title..."
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm font-light focus:outline-none"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col gap-4">
            {/* Variant Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-500 mr-2 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Variant:</span>
              </span>
              {VARIANTS.map((v) => {
                const active = filters.variant === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onPlayTone();
                      setFilters({ ...filters, variant: v.id });
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      active
                        ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/20'
                        : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>

            {/* Format & Role Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/[0.06]">
              {/* Formats */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-500 mr-2 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-amber-400/80" />
                  <span>Format:</span>
                </span>
                {FORMATS.map((fmt) => {
                  const active = filters.format === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => {
                        onPlayTone();
                        setFilters({ ...filters, format: fmt.id });
                      }}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-tech uppercase tracking-wider transition-all cursor-pointer ${
                        active
                          ? 'bg-white/15 text-white font-bold border border-white/20'
                          : 'bg-white/[0.02] border border-white/[0.04] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  );
                })}
              </div>

              {/* Roles */}
              <div className="flex flex-wrap items-center gap-1.5">
                {ROLES.map((role) => {
                  const active = filters.role === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        onPlayTone();
                        setFilters({ ...filters, role: role.id });
                      }}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-tech uppercase tracking-wider transition-all cursor-pointer ${
                        active
                          ? 'bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold'
                          : 'bg-white/[0.02] border border-white/[0.04] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Collectible Cards Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {filteredCards.map((card) => (
                <div key={card.id} onClick={() => handleCardClick(card)} className="w-full flex justify-center">
                  <DigitalCollectibleCard
                    card={card}
                    onPlayTone={onPlayTone}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-md mx-auto text-center py-20 px-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
              <AlertCircle className="w-10 h-10 text-amber-400/80 mx-auto mb-4" />
              <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                No Collectibles Match Query
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-6">
                Try searching by player name or resetting variant and format filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    variant: 'all',
                    format: 'all',
                    role: 'all',
                    rarity: 'all',
                  })
                }
                className="px-6 py-2.5 rounded-full bg-amber-400 text-black font-semibold text-xs tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Card Inspection Modal */}
      <CollectibleCardModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
        onViewPlayerProfile={handleInspectPlayerInPantheon}
        onPlayTone={onPlayTone}
      />

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
