import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trophy,
  Globe,
  Calendar,
  Zap,
  ArrowRight,
  Plus,
  Check,
  Radio,
  Database,
  Sparkles,
  ShieldCheck,
  Flame,
  Target,
  Award,
  Layers,
  Info,
} from 'lucide-react';
import type { NormalizedPlayer, FormatType } from '../../types/player';
import { DigitalCollectibleCard } from './DigitalCollectibleCard';
import { playerApi } from '../../api/cricket/playerApi';
import { usePlayerIntelligence } from '../../hooks/usePlayerIntelligence';
import { usePlayerEnrichment } from '../../hooks/usePlayerEnrichment';

interface PlayerProfileModalProps {
  player: NormalizedPlayer | null;
  onClose: () => void;
  onToggleCompare: (player: NormalizedPlayer) => void;
  isCompared: boolean;
  onPlayTone?: () => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  player: initialPlayer,
  onClose,
  onToggleCompare,
  isCompared,
  onPlayTone,
}) => {
  const [activeFormat, setActiveFormat] = useState<FormatType>('test');
  const [displayPlayer, setDisplayPlayer] = useState<NormalizedPlayer | null>(initialPlayer);
  const [isLiveData, setIsLiveData] = useState<boolean>(false);
  const [liveLastUpdated, setLiveLastUpdated] = useState<string | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);

  // Central Gemini Intelligence Hooks
  const {
    intelligence,
    loading: loadingIntel,
  } = usePlayerIntelligence(displayPlayer);

  const {
    enrichment,
    loading: loadingEnrich,
  } = usePlayerEnrichment(displayPlayer);

  useEffect(() => {
    setDisplayPlayer(initialPlayer);
    setIsLiveData(false);
    setLiveLastUpdated(null);

    if (!initialPlayer) return;

    if (playerApi.isLiveApiActive()) {
      setIsLoadingLive(true);
      playerApi
        .getPlayerById(initialPlayer.id)
        .then(({ player: livePlayer, isLive, lastUpdated }) => {
          if (livePlayer && isLive) {
            setDisplayPlayer(livePlayer);
            setIsLiveData(true);
            if (lastUpdated) setLiveLastUpdated(lastUpdated);
          }
        })
        .catch(() => {
          // Keep displayPlayer as fallback
        })
        .finally(() => {
          setIsLoadingLive(false);
        });
    }
  }, [initialPlayer]);

  if (!displayPlayer) return null;

  const player = displayPlayer;
  const formatStats = player.stats[activeFormat];
  const batting = formatStats?.batting;
  const bowling = formatStats?.bowling;

  const handleFormatChange = (fmt: FormatType) => {
    setActiveFormat(fmt);
    if (onPlayTone) onPlayTone();
  };

  const isAiLoading = loadingIntel || loadingEnrich;

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
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Row: Meta Badges + Source Provenance + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pr-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-tech tracking-widest uppercase">
                {player.role.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-tech tracking-wider uppercase">
                {player.country}
              </span>

              {/* Verified Baseline / Live Telemetry Provenance Badge */}
              {isLiveData ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono tracking-wider uppercase" title={`Live match telemetry verified against sports API feeds${liveLastUpdated ? ` (Latest Match: ${liveLastUpdated})` : ''}`}>
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>LIVE TELEMETRY (VERIFIED{liveLastUpdated ? ` • ${liveLastUpdated}` : ''})</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400/90 text-[10px] font-mono tracking-wider uppercase" title="Curated high-confidence statistical archive">
                  <Database className="w-3 h-3 text-amber-400/80" />
                  <span>VERIFIED ARCHIVE DB</span>
                </span>
              )}

              {/* Gemini Cricket Intelligence Status Badge */}
              {isAiLoading ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-mono tracking-wider uppercase animate-pulse">
                  <Sparkles className="w-3 h-3 text-purple-400 animate-spin" />
                  <span>SYNTHESIZING GEMINI INTELLIGENCE...</span>
                </span>
              ) : intelligence ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-200 text-[10px] font-mono tracking-wider uppercase" title="Tactical profile & enrichment powered by Google Gemini">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>GEMINI INTELLIGENCE LAYER</span>
                </span>
              ) : null}

              {isLoadingLive && (
                <span className="text-[10px] font-mono text-zinc-500 animate-pulse">
                  Syncing live telemetry...
                </span>
              )}
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
          <div className="mb-6">
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
              {player.ipl2026Team && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[11px] font-tech font-bold">
                  <span>IPL 2026: {player.ipl2026Team}</span>
                </div>
              )}
            </div>
          </div>

          {/* GEMINI INTELLIGENCE & TACTICAL ANALYSIS BLOCK */}
          {intelligence && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-950/25 via-white/[0.02] to-transparent border border-purple-500/20 relative overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-purple-300">
                    Gemini Cricket Intelligence • Tactical Archetype
                  </h3>
                </div>
                {intelligence.tacticalProfile?.clutchRating && (
                  <span className="text-[10px] font-tech uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-200">
                    Temperament: {intelligence.tacticalProfile.clutchRating}
                  </span>
                )}
              </div>

              {/* AI Narrative */}
              <p className="text-sm text-zinc-300 leading-relaxed font-light mb-4">
                {intelligence.narrative}
              </p>

              {/* Tactical Strengths, Vulnerabilities & Signature Weapons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
                {intelligence.tacticalProfile?.strengths && intelligence.tacticalProfile.strengths.length > 0 && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-tech uppercase tracking-widest text-emerald-400 flex items-center gap-1 mb-1.5">
                      <Target className="w-3 h-3" /> Core Strengths
                    </span>
                    <ul className="space-y-1">
                      {intelligence.tacticalProfile.strengths.slice(0, 3).map((st, i) => (
                        <li key={i} className="text-xs text-zinc-300 font-light flex items-start gap-1.5">
                          <span className="text-emerald-400 text-xs leading-none">•</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {intelligence.tacticalProfile?.weaknesses && intelligence.tacticalProfile.weaknesses.length > 0 && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-tech uppercase tracking-widest text-rose-400 flex items-center gap-1 mb-1.5">
                      <Flame className="w-3 h-3" /> Vulnerabilities / Matchups
                    </span>
                    <ul className="space-y-1">
                      {intelligence.tacticalProfile.weaknesses.slice(0, 3).map((wk, i) => (
                        <li key={i} className="text-xs text-zinc-300 font-light flex items-start gap-1.5">
                          <span className="text-rose-400 text-xs leading-none">•</span>
                          <span>{wk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {intelligence.tacticalProfile?.signatureShotsOrDeliveries && intelligence.tacticalProfile.signatureShotsOrDeliveries.length > 0 && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-tech uppercase tracking-widest text-amber-400 flex items-center gap-1 mb-1.5">
                      <Zap className="w-3 h-3" /> Signature Weapons
                    </span>
                    <ul className="space-y-1">
                      {intelligence.tacticalProfile.signatureShotsOrDeliveries.slice(0, 3).map((sg, i) => (
                        <li key={i} className="text-xs text-zinc-300 font-light flex items-start gap-1.5">
                          <span className="text-amber-400 text-xs leading-none">•</span>
                          <span>{sg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Format Selector Pill Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] w-fit mb-6">
            {(['test', 'odi', 't20i', 'ipl'] as FormatType[]).map((fmt) => {
              const hasData = !!player.stats[fmt] || (fmt === 'ipl' && !!player.ipl2026Team);
              if (!hasData && fmt === 'ipl') return null;
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
                  {fmt === 'ipl' ? 'IPL FRANCHISE' : fmt.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Statistics Visual Breakdown Grid (VERIFIED NUMERICAL TELEMETRY) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs uppercase font-tech tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeFormat === 'ipl' ? 'IPL FRANCHISE' : activeFormat.toUpperCase()} Grounded Statistics</span>
              </h4>
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {isLiveData ? (
                  <span className="text-emerald-300">CURRENT GROUNDED TELEMETRY ({liveLastUpdated || 'VERIFIED'})</span>
                ) : (
                  <span className="text-amber-400/90">VERIFIED ARCHIVE DB</span>
                )}
              </span>
            </div>

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
                      <span className="text-[10px] text-zinc-500 mt-1">HS: {batting.highestScore || '—'}{batting.balls ? ` (${batting.balls.toLocaleString()} balls)` : ''}</span>
                    </div>

                    {batting.average != null && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Batting Average</span>
                        <span className="text-2xl font-bold font-tech text-emerald-400">{batting.average.toFixed(2)}</span>
                        <span className="text-[10px] text-zinc-500 mt-1">SR: {batting.strikeRate != null ? batting.strikeRate.toFixed(2) : '—'}</span>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                      <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">100s / 50s</span>
                      <span className="text-2xl font-bold font-tech text-white">
                        {batting.centuries ?? 0} <span className="text-zinc-600">/</span> {batting.fifties ?? 0}
                      </span>
                      <span className="text-[10px] text-zinc-500 mt-1">{batting.notOuts !== undefined ? `${batting.notOuts} Not Outs` : 'Centuries & Fifties'}</span>
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

                    {bowling.overs != null && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Overs / Maidens</span>
                        <span className="text-2xl font-bold font-tech text-cyan-300">
                          {bowling.overs} <span className="text-zinc-600">/</span> {bowling.maidens ?? 0}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-1">{bowling.runsConceded ? `${bowling.runsConceded} runs conceded` : `${bowling.balls || 0} balls`}</span>
                      </div>
                    )}

                    {bowling.economy != null && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">Economy Rate</span>
                        <span className="text-2xl font-bold font-tech text-cyan-400">{bowling.economy.toFixed(2)}</span>
                        <span className="text-[10px] text-zinc-500 mt-1">Avg: {bowling.average?.toFixed(2) || '—'} {bowling.strikeRate ? `• SR: ${bowling.strikeRate.toFixed(1)}` : ''}</span>
                      </div>
                    )}

                    {bowling.fiveWickets !== undefined && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
                        <span className="text-[10px] font-tech uppercase text-zinc-500 mb-1">5-Wicket Hauls</span>
                        <span className="text-2xl font-bold font-tech text-white">{bowling.fiveWickets}</span>
                        <span className="text-[10px] text-zinc-500 mt-1">{bowling.tenWickets ? `${bowling.tenWickets} 10WM` : (bowling.fourWickets ? `${bowling.fourWickets} 4W` : 'Innings')}</span>
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

          {/* T20I VS IPL ENRICHMENT BLOCK (SPECIFICALLY ENRICHED BY GEMINI) */}
          {(enrichment?.iplStats || enrichment?.t20iStats || activeFormat === 't20i') && (
            <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-white">
                    T20 International & IPL Franchise Context
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-purple-300/80 flex items-center gap-1">
                  <Info className="w-3 h-3 text-purple-400" /> AI Enriched Context • Separated T20 & Franchise Data
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* IPL Franchise Journey */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] font-tech uppercase tracking-widest text-amber-300 block mb-2">
                    IPL Franchise History & Titles
                  </span>
                  {enrichment?.iplStats?.franchiseHistory && enrichment.iplStats.franchiseHistory.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {enrichment.iplStats.franchiseHistory.map((franchise, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-tech">
                          {franchise}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-400 font-light mb-2">
                      {player.ipl2026Team ? `Contracted to ${player.ipl2026Team} for IPL 2026 campaign.` : 'No franchise mapping recorded.'}
                    </p>
                  )}

                  {enrichment?.iplStats?.iplTitles && enrichment.iplStats.iplTitles.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center gap-2 text-xs text-amber-200/90 font-light">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Titles: {enrichment.iplStats.iplTitles.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Biographical & Era Context */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] font-tech uppercase tracking-widest text-purple-300 block mb-2">
                    Career Era & Milestones
                  </span>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-3">
                    {enrichment?.biographicalContext?.bioSummary || `${player.name} is recognized globally as an integral part of ${player.country}'s modern cricket lineage.`}
                  </p>
                  {enrichment?.biographicalContext?.notableMilestones && enrichment.biographicalContext.notableMilestones.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {enrichment.biographicalContext.notableMilestones.slice(0, 2).map((ms, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200">
                          {ms}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
              CrickXplore Player Registry • v0.3 (Gemini Intelligence Integrated)
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
