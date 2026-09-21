import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords } from 'lucide-react';
import type { NormalizedPlayer, FormatType } from '../../types/player';

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

  // Render a factual metric row
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
          className="relative w-full max-w-4xl bg-[#0a0b10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-500/5 z-10 overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header & Close */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-black text-white">
                  FACTUAL TELEMETRY COMPARISON
                </h3>
                <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-widest">
                  Side-by-side statistical matrix
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Format Selection Tabs */}
          <div className="flex justify-center mb-8">
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
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-tech uppercase tracking-wider text-amber-300">
                    TITAN A
                  </span>
                  <select
                    value={playerA.id}
                    onChange={(e) => {
                      const found = allPlayers.find(p => p.id === e.target.value);
                      if (found) onSelectPlayerA(found);
                    }}
                    className="bg-black/60 border border-white/10 text-zinc-300 text-xs rounded-lg px-2 py-1 font-tech focus:outline-none"
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
                <div className="text-xs text-zinc-400 mt-1 font-light">
                  {playerA.country} • {playerA.role.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Player B Header Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between text-right">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <select
                    value={playerB.id}
                    onChange={(e) => {
                      const found = allPlayers.find(p => p.id === e.target.value);
                      if (found) onSelectPlayerB(found);
                    }}
                    className="bg-black/60 border border-white/10 text-zinc-300 text-xs rounded-lg px-2 py-1 font-tech focus:outline-none"
                  >
                    {allPlayers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] font-tech uppercase tracking-wider text-amber-300">
                    TITAN B
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif-luxury font-black text-white">
                  {playerB.name}
                </h4>
                <div className="text-xs text-zinc-400 mt-1 font-light">
                  {playerB.country} • {playerB.role.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Metrics List */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-xs uppercase font-tech tracking-wider text-zinc-400 mb-2 block text-center">
              {activeFormat.toUpperCase()} STATISTICAL BREAKDOWN
            </span>

            {/* Batting metrics */}
            {(battingA || battingB) && (
              <>
                <div className="text-[11px] font-tech text-amber-400 font-semibold mt-2 mb-1">
                  BATTING TELEMETRY
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
                <div className="text-[11px] font-tech text-rose-400 font-semibold mt-4 mb-1">
                  BOWLING TELEMETRY
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

          {/* Footer note */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-zinc-400">
            <span>Highlighted gold figures represent higher performance factors.</span>
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
