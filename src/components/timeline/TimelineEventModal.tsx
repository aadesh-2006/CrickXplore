import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  MapPin,
  Trophy,
  Users,
  ArrowRight,
  Flame,
  ShieldCheck,
  Crown,
  ExternalLink,
} from 'lucide-react';
import type { TimelineEvent } from '../../types/timeline';
import { FALLBACK_PLAYERS } from '../../data/fallbackPlayers';
import { SAMPLE_COLLECTION } from '../../data/sampleCollection';

interface TimelineEventModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onExplorePlayer: (playerId: string) => void;
  onExploreCollection: (cardId?: string) => void;
}

export const TimelineEventModal: React.FC<TimelineEventModalProps> = ({
  event,
  onClose,
  onExplorePlayer,
  onExploreCollection,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  // Resolve related players from existing dataset
  const resolvedPlayers = (event.relatedPlayerIds || [])
    .map((id) => FALLBACK_PLAYERS.find((p) => p.id === id))
    .filter(Boolean);

  // Resolve related cards from existing sample collection
  const resolvedCards = (event.relatedCardIds || [])
    .map((serial) =>
      SAMPLE_COLLECTION.find(
        (c) => c.serialNumber === serial || c.id === serial
      )
    )
    .filter(Boolean);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[#090b10] border border-white/15 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Subtle Glow Header Aura */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Modal Header Bar */}
          <div className="relative z-10 px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif-luxury text-2xl font-black text-amber-300">
                  {event.year}
                </span>
                {event.date && (
                  <>
                    <span className="text-zinc-600 font-tech text-xs">•</span>
                    <span className="text-xs text-zinc-400 font-tech flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {event.date}
                    </span>
                  </>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech uppercase tracking-wider bg-white/10 text-zinc-300 border border-white/10">
                  {event.format}
                </span>
                {event.importance === 'PIVOTAL' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                    Pivotal Moment
                  </span>
                )}
              </div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white leading-tight">
                {event.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="relative z-10 px-6 sm:px-8 py-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {/* Subtitle / Venue banner */}
            {event.subtitle && (
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-zinc-300 text-sm">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">{event.subtitle}</span>
              </div>
            )}

            {/* Detailed Story Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-tech uppercase tracking-[0.2em] text-zinc-400">
                Historical Chronicle
              </h4>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-sans">
                {event.detailedStory || event.description}
              </p>
            </div>

            {/* Scorecard Ledger Box */}
            {event.scorecardSnippet && (
              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20 font-mono space-y-1">
                <div className="text-[10px] uppercase font-tech tracking-wider text-amber-400/80 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>Official Match Result Ledger</span>
                </div>
                <div className="text-xs sm:text-sm text-white font-bold tracking-tight">
                  {event.scorecardSnippet}
                </div>
              </div>
            )}

            {/* Venue, Tournament & Teams Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              {event.venue && (
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-tech text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400" /> Venue & Location
                  </span>
                  <p className="text-xs text-zinc-200 font-medium">{event.venue}</p>
                  {event.location && <p className="text-[11px] text-zinc-400">{event.location}</p>}
                </div>
              )}

              {event.tournament && (
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-tech text-zinc-400 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-400" /> Tournament
                  </span>
                  <p className="text-xs text-zinc-200 font-medium">{event.tournament}</p>
                </div>
              )}

              {event.teams && event.teams.length > 0 && (
                <div className="space-y-0.5 sm:col-span-2">
                  <span className="text-[10px] uppercase font-tech text-zinc-400 flex items-center gap-1">
                    <Users className="w-3 h-3 text-zinc-400" /> Teams Competing
                  </span>
                  <p className="text-xs text-zinc-200 font-medium">{event.teams.join(' vs ')}</p>
                </div>
              )}
            </div>

            {/* Impact Highlight */}
            {event.impactHighlight && (
              <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/20">
                <span className="text-[10px] uppercase font-tech tracking-wider text-amber-400 block mb-1">
                  Historical Paradigm Shift
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{event.impactHighlight}"
                </p>
              </div>
            )}

            {/* Cross-Link 1: Related Players in CrickXplore */}
            {resolvedPlayers.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-tech uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Featured Titans in Player Explorer</span>
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-tech">
                    Direct Pantheon Link
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resolvedPlayers.map((player) => (
                    <div
                      key={player?.id}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={player?.imageUrl}
                          alt={player?.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/20"
                        />
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                            {player?.name}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-tech">
                            {player?.country} • {player?.role?.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          if (player?.id) onExplorePlayer(player.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shadow-md"
                      >
                        <span>EXPLORE</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-Link 2: Related Collectible Cards in CrickXplore */}
            {resolvedCards.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-tech uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-purple-400" />
                    <span>Associated Digital Collectible Cards</span>
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-tech">
                    Series 1 Vault
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resolvedCards.map((card) => (
                    <div
                      key={card?.id}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/20 to-black border border-purple-500/20 hover:border-purple-400/40 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                          {card?.playerName}
                        </div>
                        <div className="text-[10px] text-purple-300/80 font-tech font-mono">
                          {card?.serialNumber} • {card?.variant}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onExploreCollection(card?.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>VIEW CARD</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="relative z-10 px-6 sm:px-8 py-4 bg-black/40 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] text-zinc-500 font-tech">
              CRICKXPLORE ARCHIVAL REPOSITORY
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Close Ledger
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
