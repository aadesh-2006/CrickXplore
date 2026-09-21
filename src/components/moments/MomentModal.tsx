import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  MapPin,
  Flame,
  Activity,
  Volume2,
  Users,
  Landmark,
  Crown,
  History,
  Quote,
  ShieldCheck,
} from 'lucide-react';
import type { CricketMoment } from '../../types/moment';
import {
  getPlayersByIds,
  getCardsByIds,
  getStadiumById,
} from '../../utils/universeRelations';

interface MomentModalProps {
  moment: CricketMoment | null;
  onClose: () => void;
  onExplorePlayer: (playerId: string) => void;
  onExploreStadium: (stadiumId: string) => void;
  onExploreTimeline: (timelineEventId?: string) => void;
  onExploreCollection: (cardId?: string) => void;
}

export const MomentModal: React.FC<MomentModalProps> = ({
  moment,
  onClose,
  onExplorePlayer,
  onExploreStadium,
  onExploreTimeline,
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

  if (!moment) return null;

  const resolvedPlayers = getPlayersByIds(moment.relatedPlayerIds);
  const resolvedCards = getCardsByIds(moment.relatedCardIds);
  const resolvedStadium = moment.relatedStadiumIds && moment.relatedStadiumIds.length > 0
    ? getStadiumById(moment.relatedStadiumIds[0])
    : undefined;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#090b10] border border-white/15 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-rose-500/15 via-amber-500/5 to-transparent pointer-events-none" />

          {/* Modal Header Bar */}
          <div className="relative z-10 px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif-luxury text-3xl font-black text-white">
                  {moment.year}
                </span>
                {moment.date && (
                  <>
                    <span className="text-zinc-600 font-tech text-xs">•</span>
                    <span className="text-xs text-zinc-400 font-tech flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {moment.date}
                    </span>
                  </>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech uppercase tracking-wider bg-white/10 text-zinc-300 border border-white/10">
                  {moment.format}
                </span>
                {moment.tensionIndex && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-rose-400" />
                    {moment.tensionIndex}% Pressure Peak
                  </span>
                )}
                {moment.decibelCaldera && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech text-amber-300 bg-amber-500/10 border border-amber-500/20 flex items-center gap-1 hidden sm:inline-flex">
                    <Volume2 className="w-3 h-3 text-amber-400" />
                    {moment.decibelCaldera}
                  </span>
                )}
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
                {moment.title}
              </h2>
              {moment.subtitle && (
                <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                  {moment.subtitle}
                </p>
              )}
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

          {/* Documentary Body */}
          <div className="relative z-10 px-6 sm:px-8 py-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {/* Venue & Location Strip */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">{moment.venue}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">{moment.location}</span>
              </div>
              {moment.tournament && (
                <div className="text-zinc-400 font-tech uppercase tracking-wider text-[11px]">
                  {moment.tournament}
                </div>
              )}
            </div>

            {/* Mini Documentary Chapter 1: The Context */}
            <div className="space-y-2 p-5 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="text-[10px] font-tech uppercase tracking-[0.25em] text-amber-400 font-bold flex items-center gap-1.5">
                <span>01</span>
                <span>•</span>
                <span>The Context: What Was Happening?</span>
              </div>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light font-sans">
                {moment.context}
              </p>
            </div>

            {/* Mini Documentary Chapter 2: The Moment */}
            <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-r from-rose-950/20 via-black to-amber-950/20 border border-amber-500/20">
              <div className="text-[10px] font-tech uppercase tracking-[0.25em] text-rose-400 font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>02</span>
                <span>•</span>
                <span>The Moment: What Happened?</span>
              </div>
              <p className="text-white text-sm sm:text-base leading-relaxed font-normal font-sans">
                {moment.theMoment}
              </p>
            </div>

            {/* Mini Documentary Chapter 3: Why It Mattered */}
            <div className="space-y-2 p-5 rounded-2xl bg-black/40 border border-white/[0.06]">
              <div className="text-[10px] font-tech uppercase tracking-[0.25em] text-sky-400 font-bold flex items-center gap-1.5">
                <span>03</span>
                <span>•</span>
                <span>The Legacy: Why It Mattered</span>
              </div>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light font-sans">
                {moment.whyItMattered}
              </p>
            </div>

            {/* Official Match Ledger / Scorecard */}
            {moment.scorecardSnippet && (
              <div className="p-4 rounded-xl bg-black/70 border border-amber-500/30 font-mono space-y-1">
                <div className="text-[10px] uppercase font-tech tracking-wider text-amber-400/90 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Archive Scorecard Ledger</span>
                </div>
                <div className="text-xs sm:text-sm text-white font-bold tracking-tight">
                  {moment.scorecardSnippet}
                </div>
              </div>
            )}

            {/* Historic Quote */}
            {moment.quote && (
              <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-amber-400 flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm italic text-zinc-200 font-serif leading-relaxed mb-1">
                    "{moment.quote.text}"
                  </p>
                  <span className="text-[10px] uppercase font-tech text-amber-300 block">
                    — {moment.quote.author}
                  </span>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* CROSS-UNIVERSE RELATIONSHIPS */}
            {/* ======================================================== */}
            <div className="pt-4 border-t border-white/[0.08] space-y-4">
              <h4 className="text-xs font-tech uppercase tracking-[0.2em] text-zinc-400">
                Connected Universe Artifacts
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Cross-link to Stadium Atlas */}
                {resolvedStadium && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex items-center justify-between gap-3 group">
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-tech text-emerald-400 block mb-0.5">
                        Stadium Colosseum
                      </span>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {resolvedStadium.name}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-tech">
                        {resolvedStadium.city}, {resolvedStadium.country}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreStadium(resolvedStadium.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Landmark className="w-3 h-3" />
                      <span>ATLAS</span>
                    </button>
                  </div>
                )}

                {/* 2. Cross-link to Timeline Chronicle */}
                {moment.timelineEventId && (
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 hover:border-amber-400/50 transition-all flex items-center justify-between gap-3 group">
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-tech text-amber-400 block mb-0.5">
                        Historical Epoch
                      </span>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {moment.year} Timeline Chronicle
                      </div>
                      <div className="text-[10px] text-zinc-400 font-tech">
                        Era: {moment.eraId}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreTimeline(moment.timelineEventId);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <History className="w-3 h-3" />
                      <span>TIMELINE</span>
                    </button>
                  </div>
                )}

                {/* 3. Cross-link to Featured Players */}
                {resolvedPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={player.imageUrl}
                        alt={player.name}
                        className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {player.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-tech truncate">
                          {player.country} • {player.role?.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExplorePlayer(player.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shrink-0 shadow-md"
                    >
                      <Users className="w-3 h-3" />
                      <span>EXPLORE</span>
                    </button>
                  </div>
                ))}

                {/* 4. Cross-link to Collectible Cards */}
                {resolvedCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 hover:border-purple-400/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-tech text-purple-400 block mb-0.5">
                        Collectible Relic
                      </span>
                      <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                        {card.playerName}
                      </div>
                      <div className="text-[10px] text-purple-300/80 font-tech font-mono">
                        {card.serialNumber} • {card.variant}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreCollection(card.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Crown className="w-3 h-3" />
                      <span>VIEW CARD</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="relative z-10 px-6 sm:px-8 py-4 bg-black/50 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] text-zinc-500 font-tech">
              CRICKXPLORE HISTORICAL MOMENT ARCHIVE
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Close Archive
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
