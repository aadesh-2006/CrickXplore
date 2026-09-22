import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Globe, Calendar, Zap, ArrowRight, Plus, Check } from 'lucide-react';
import type { NormalizedPlayer, FormatType } from '../../types/player';
import { DigitalCollectibleCard } from './DigitalCollectibleCard';

interface PlayerProfileModalProps {
  player: NormalizedPlayer | null;
  onClose: () => void;
  onToggleCompare: (player: NormalizedPlayer) => void;
  isCompared: boolean;
  onPlayTone?: () => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  player,
  onClose,
  onToggleCompare,
  isCompared,
  onPlayTone,
}) => {
  const [activeFormat, setActiveFormat] = useState<FormatType>('test');

  if (!player) return null;

  const formatStats = player.stats[activeFormat];
  const batting = formatStats?.batting;
  const bowling = formatStats?.bowling;

  const handleFormatChange = (fmt: FormatType) => {
    setActiveFormat(fmt);
    if (onPlayTone) onPlayTone();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0a0b10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-500/5 z-10 overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Row: Meta Badges + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pr-12">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-tech tracking-widest uppercase">
                {player.role.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-tech tracking-wider uppercase">
                {player.country}
              </span>
            </div>

            <button
              onClick={() => {
                if (onPlayTone) onPlayTone();
                onToggleCompare(player);
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-tech uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isCompared
                  ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20'
                  : 'bg-white/[0.06] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isCompared ? 'In Comparison Matrix' : 'Add to Compare'}</span>
            </button>
          </div>

          {/* Header Info */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-black text-white tracking-tight leading-none mb-3">
              {player.name}
            </h2>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-400 font-light">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Born in {player.placeOfBirth || player.country}</span>
              </div>
              {player.dateOfBirth && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>DOB: {player.dateOfBirth}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{player.battingStyle || 'Right-hand bat'}</span>
                {player.bowlingStyle && <span>/ {player.bowlingStyle}</span>}
              </div>
            </div>
          </div>

          {/* Format Selector Pill Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] w-fit mb-8">
            {(['test', 'odi', 't20i'] as FormatType[]).map((fmt) => {
              const active = activeFormat === fmt;
              return (
                <button
                  key={fmt}
                  onClick={() => handleFormatChange(fmt)}
                  className={`px-6 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Statistics Visual Breakdown Grid */}
          <div className="mb-12">
            <h4 className="text-xs uppercase font-tech tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeFormat.toUpperCase()} Career Telemetry</span>
            </h4>

            {batting || bowling ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Batting metrics if present */}
                {batting && (
                  <>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                      <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Matches</span>
                      <span className="text-2xl font-bold font-tech text-white">{batting.matches}</span>
                      <span className="text-[10px] text-zinc-500 mt-1">{batting.innings ?? batting.matches} innings</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                      <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Career Runs</span>
                      <span className="text-2xl font-bold font-tech text-amber-300">{batting.runs.toLocaleString()}</span>
                      <span className="text-[10px] text-zinc-500 mt-1">HS: {batting.highestScore}</span>
                    </div>

                    {batting.average != null && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Batting Average</span>
                        <span className="text-2xl font-bold font-tech text-emerald-400">{batting.average.toFixed(2)}</span>
                        <span className="text-[10px] text-zinc-500 mt-1">SR: {batting.strikeRate ?? '—'}</span>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                      <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">100s / 50s</span>
                      <span className="text-2xl font-bold font-tech text-white">
                        {batting.centuries ?? 0} <span className="text-zinc-600">/</span> {batting.fifties ?? 0}
                      </span>
                      <span className="text-[10px] text-zinc-500 mt-1">Centuries & Fifties</span>
                    </div>

                    {batting.fours !== undefined && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Boundaries (4s / 6s)</span>
                        <span className="text-2xl font-bold font-tech text-white">
                          {batting.fours} <span className="text-zinc-600">/</span> {batting.sixes || 0}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-1">Total Boundary Count</span>
                      </div>
                    )}
                  </>
                )}

                {/* Bowling metrics if present */}
                {bowling && (
                  <>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                      <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Wickets</span>
                      <span className="text-2xl font-bold font-tech text-rose-400">{bowling.wickets}</span>
                      <span className="text-[10px] text-zinc-500 mt-1">BBI: {bowling.bestBowlingInnings || '—'}</span>
                    </div>

                    {bowling.economy != null && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Economy Rate</span>
                        <span className="text-2xl font-bold font-tech text-cyan-400">{bowling.economy.toFixed(2)}</span>
                        <span className="text-[10px] text-zinc-500 mt-1">Avg: {bowling.average?.toFixed(2) || '—'}</span>
                      </div>
                    )}

                    {bowling.fiveWickets !== undefined && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">5-Wicket Hauls</span>
                        <span className="text-2xl font-bold font-tech text-white">{bowling.fiveWickets}</span>
                        <span className="text-[10px] text-zinc-500 mt-1">{bowling.tenWickets ? `${bowling.tenWickets} 10WM` : 'Innings'}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center text-zinc-500 text-xs font-tech">
                No official {activeFormat.toUpperCase()} statistics recorded for this player in archive.
              </div>
            )}
          </div>

          {/* Collectible Card Preview Section */}
          <div className="pt-8 border-t border-white/10">
            <div className="text-center mb-6">
              <span className="text-[10px] font-tech uppercase tracking-[0.25em] text-amber-400 block mb-1">
                Artifact Vault Synthesis
              </span>
              <h3 className="text-2xl font-serif-luxury font-black text-white">
                DIGITAL COLLECTIBLE CARD PREVIEW
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1 font-light">
                Hover to tilt holographic foils. Click to flip and reveal career milestone runes.
              </p>
            </div>

            <DigitalCollectibleCard player={player} onPlayTone={onPlayTone} />
          </div>

          {/* Footer Close Action */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-tech">
              CrickXplore Player Registry • v0.2
            </span>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-amber-300 text-black font-semibold text-xs tracking-wider transition-all cursor-pointer"
            >
              <span>Done Viewing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
