import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Swords,
  Sparkles,
  Target,
  Shield,
  Zap,
  Info,
  Layers,
  Award,
  ShieldCheck,
} from 'lucide-react';
import type { NormalizedPlayer, FormatType } from '../../types/player';
import { usePlayerComparisonAi } from '../../hooks/usePlayerComparisonAi';

interface PlayerComparisonModalProps {
  playerA: NormalizedPlayer | null;
  playerB: NormalizedPlayer | null;
  allPlayers: NormalizedPlayer[];
  onClose: () => void;
  onSelectPlayerA: (player: NormalizedPlayer) => void;
  onSelectPlayerB: (player: NormalizedPlayer) => void;
  onPlayTone?: () => void;
}

export const PlayerComparisonModal: React.FC<PlayerComparisonModalProps> = ({
  playerA,
  playerB,
  allPlayers,
  onClose,
  onSelectPlayerA,
  onSelectPlayerB,
  onPlayTone,
}) => {
  const [activeFormat, setActiveFormat] = useState<FormatType>('test');

  // Central Gemini Comparative Intelligence Hook
  const {
    comparison: aiComparison,
    loading: loadingAi,
  } = usePlayerComparisonAi(playerA, playerB);

  if (!playerA || !playerB) return null;

  const handleFormatChange = (fmt: FormatType) => {
    setActiveFormat(fmt);
    if (onPlayTone) onPlayTone();
  };

  const statA = playerA.stats[activeFormat];
  const statB = playerB.stats[activeFormat];

  const battingA = statA?.batting;
  const battingB = statB?.batting;
  const bowlingA = statA?.bowling;
  const bowlingB = statB?.bowling;

  // Render a factual metric row (IMMUTABLE NUMERICAL TELEMETRY)
  const renderMetricRow = (
    label: string,
    valA: string | number | undefined | null,
    valB: string | number | undefined | null,
    isHigherBetter: boolean = true
  ) => {
    const numA = typeof valA === 'number' ? valA : parseFloat(String(valA));
    const numB = typeof valB === 'number' ? valB : parseFloat(String(valB));
    const hasNumbers = !isNaN(numA) && !isNaN(numB);

    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
        {/* Value A */}
        <div className="w-1/3 text-left font-tech font-bold text-sm">
          <span
            className={
              hasNumbers && numA !== numB
                ? (isHigherBetter ? numA > numB : numA < numB)
                  ? 'text-amber-300'
                  : 'text-zinc-400'
                : 'text-white'
            }
          >
            {valA ?? '—'}
          </span>
        </div>

        {/* Metric Label */}
        <div className="w-1/3 text-center text-[10px] font-tech uppercase tracking-wider text-zinc-400">
          {label}
        </div>

        {/* Value B */}
        <div className="w-1/3 text-right font-tech font-bold text-sm">
          <span
            className={
              hasNumbers && numA !== numB
                ? (isHigherBetter ? numB > numA : numB < numA)
                  ? 'text-amber-300'
                  : 'text-zinc-400'
                : 'text-white'
            }
          >
            {valB ?? '—'}
          </span>
        </div>
      </div>
    );
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
          className="relative w-full max-w-5xl bg-[#0a0b10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-500/5 z-10 overflow-hidden my-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

          {/* Header & Close */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-black text-white">
                  HEAD-TO-HEAD TELEMETRY & INTELLIGENCE
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-widest">
                    Side-by-side statistical & tactical matrix
                  </span>
                  {loadingAi ? (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[9px] font-mono text-purple-300 uppercase tracking-wider animate-pulse flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 animate-spin" /> Synthesizing AI Matchup...
                    </span>
                  ) : aiComparison ? (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[9px] font-mono text-purple-200 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-purple-400" /> GEMINI COMPARATIVE LAYER
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Format Selection Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              {(['test', 'odi', 't20i'] as FormatType[]).map((fmt) => {
                const active = activeFormat === fmt;
                return (
                  <button
                    key={fmt}
                    onClick={() => handleFormatChange(fmt)}
                    className={`px-6 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-widest transition-all cursor-pointer ${
                      active
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Versus Header Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 items-stretch">
            {/* Player A Header Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-tech uppercase tracking-wider text-amber-300 font-bold">
                    TITAN A
                  </span>
                  <select
                    value={playerA.id}
                    onChange={(e) => {
                      const found = allPlayers.find(p => p.id === e.target.value);
                      if (found) onSelectPlayerA(found);
                    }}
                    className="bg-black/80 border border-white/10 text-zinc-300 text-xs rounded-lg px-2.5 py-1 font-tech focus:outline-none focus:border-amber-400/50 cursor-pointer"
                  >
                    {allPlayers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif-luxury font-black text-white">
                  {playerA.name}
                </h4>
                <div className="text-xs text-zinc-400 mt-1 font-light flex items-center gap-2">
                  <span>{playerA.country}</span>
                  <span>•</span>
                  <span className="uppercase font-tech text-[10px] text-amber-300/90">{playerA.role}</span>
                </div>
              </div>
            </div>

            {/* Player B Header Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-bl from-white/[0.04] to-transparent border border-white/[0.08] flex flex-col justify-between text-right">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <select
                    value={playerB.id}
                    onChange={(e) => {
                      const found = allPlayers.find(p => p.id === e.target.value);
                      if (found) onSelectPlayerB(found);
                    }}
                    className="bg-black/80 border border-white/10 text-zinc-300 text-xs rounded-lg px-2.5 py-1 font-tech focus:outline-none focus:border-amber-400/50 cursor-pointer"
                  >
                    {allPlayers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] font-tech uppercase tracking-wider text-amber-300 font-bold">
                    TITAN B
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif-luxury font-black text-white">
                  {playerB.name}
                </h4>
                <div className="text-xs text-zinc-400 mt-1 font-light flex items-center justify-end gap-2">
                  <span className="uppercase font-tech text-[10px] text-amber-300/90">{playerB.role}</span>
                  <span>•</span>
                  <span>{playerB.country}</span>
                </div>
              </div>
            </div>
          </div>

          {/* GEMINI AI COMPARATIVE INTELLIGENCE MATRIX */}
          {aiComparison && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-950/20 via-white/[0.02] to-transparent border border-purple-500/20 relative overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h4 className="text-xs font-tech font-bold uppercase tracking-[0.2em] text-purple-300">
                    Gemini Matchup Intelligence & Tactical Verdict
                  </h4>
                </div>
                <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                  <Info className="w-3 h-3 text-purple-400" /> Qualitative AI Analysis
                </span>
              </div>

              {/* Analytical Verdict */}
              <p className="text-sm text-zinc-200 font-light leading-relaxed mb-4">
                {aiComparison.verdict}
              </p>

              {/* Tactical Advantage Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/[0.06] mb-4">
                {/* Player A Advantages */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] font-tech uppercase tracking-widest text-amber-300 flex items-center gap-1 mb-2">
                    <Target className="w-3 h-3 text-amber-400" /> {playerA.name} Tactical Edge
                  </span>
                  <ul className="space-y-1.5">
                    {(aiComparison.tacticalAdvantage?.playerA || []).map((adv, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 font-light flex items-start gap-1.5">
                        <span className="text-amber-400 text-xs leading-none">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Player B Advantages */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] font-tech uppercase tracking-widest text-purple-300 flex items-center gap-1 mb-2">
                    <Target className="w-3 h-3 text-purple-400" /> {playerB.name} Tactical Edge
                  </span>
                  <ul className="space-y-1.5">
                    {(aiComparison.tacticalAdvantage?.playerB || []).map((adv, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 font-light flex items-start gap-1.5">
                        <span className="text-purple-400 text-xs leading-none">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Format-by-Format Context Strip */}
              {aiComparison.formatByFormatVerdict && (
                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-tech uppercase tracking-widest text-zinc-400 flex items-center gap-1 mb-2">
                    <Layers className="w-3 h-3 text-amber-400" /> Format-Specific Context & Dynamics
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {aiComparison.formatByFormatVerdict.test && (
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-xs">
                        <span className="text-[9px] font-tech uppercase text-amber-300 block mb-0.5">Test Match Assessment</span>
                        <p className="text-[11px] text-zinc-300 font-light leading-snug">{aiComparison.formatByFormatVerdict.test}</p>
                      </div>
                    )}
                    {aiComparison.formatByFormatVerdict.odi && (
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-xs">
                        <span className="text-[9px] font-tech uppercase text-emerald-300 block mb-0.5">ODI Dynamics</span>
                        <p className="text-[11px] text-zinc-300 font-light leading-snug">{aiComparison.formatByFormatVerdict.odi}</p>
                      </div>
                    )}
                    {(aiComparison.formatByFormatVerdict.t20i || aiComparison.formatByFormatVerdict.ipl) && (
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-xs">
                        <span className="text-[9px] font-tech uppercase text-purple-300 block mb-0.5">T20I & IPL Franchises</span>
                        <p className="text-[11px] text-zinc-300 font-light leading-snug">
                          {aiComparison.formatByFormatVerdict.t20i || aiComparison.formatByFormatVerdict.ipl}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Comparison Metrics List (IMMUTABLE FACTUAL TELEMETRY) */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-tech tracking-wider text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeFormat.toUpperCase()} Verified Statistical Matrix</span>
              </span>
              <span className="text-[9px] font-mono text-zinc-500">IMMUTABLE FEEDS</span>
            </div>

            {/* Batting metrics */}
            {(battingA || battingB) && (
              <>
                <div className="text-[11px] font-tech text-amber-400 font-semibold mt-2 mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> BATTING TELEMETRY
                </div>
                {renderMetricRow('Matches', battingA?.matches, battingB?.matches, true)}
                {renderMetricRow('Innings', battingA?.innings, battingB?.innings, true)}
                {renderMetricRow('Total Runs', battingA?.runs, battingB?.runs, true)}
                {renderMetricRow('Batting Average', battingA?.average?.toFixed(2), battingB?.average?.toFixed(2), true)}
                {renderMetricRow('Strike Rate', battingA?.strikeRate?.toFixed(2), battingB?.strikeRate?.toFixed(2), true)}
                {renderMetricRow('Centuries (100s)', battingA?.centuries, battingB?.centuries, true)}
                {renderMetricRow('Fifties (50s)', battingA?.fifties, battingB?.fifties, true)}
                {renderMetricRow('Highest Score', battingA?.highestScore, battingB?.highestScore, true)}
              </>
            )}

            {/* Bowling metrics */}
            {(bowlingA || bowlingB) && (
              <>
                <div className="text-[11px] font-tech text-rose-400 font-semibold mt-4 mb-1 flex items-center gap-1">
                  <Award className="w-3 h-3" /> BOWLING TELEMETRY
                </div>
                {renderMetricRow('Matches', bowlingA?.matches, bowlingB?.matches, true)}
                {renderMetricRow('Wickets', bowlingA?.wickets, bowlingB?.wickets, true)}
                {renderMetricRow('Economy Rate', bowlingA?.economy?.toFixed(2), bowlingB?.economy?.toFixed(2), false)}
                {renderMetricRow('Bowling Average', bowlingA?.average?.toFixed(2), bowlingB?.average?.toFixed(2), false)}
                {renderMetricRow('Bowling Strike Rate', bowlingA?.strikeRate?.toFixed(2), bowlingB?.strikeRate?.toFixed(2), false)}
                {renderMetricRow('5-Wicket Hauls', bowlingA?.fiveWickets, bowlingB?.fiveWickets, true)}
              </>
            )}
          </div>

          {/* Footer Note & Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Shield className="w-3.5 h-3.5 text-amber-400/80" />
              Highlighted gold figures denote higher factual values. Gemini analysis is non-destructive qualitative intelligence.
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-white hover:bg-amber-300 text-black font-semibold tracking-wider transition-all cursor-pointer"
            >
              Close Comparison
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
