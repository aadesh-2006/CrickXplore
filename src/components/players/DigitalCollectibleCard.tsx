import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, RefreshCw, Zap, Crown } from 'lucide-react';
import type { NormalizedPlayer } from '../../types/player';

interface DigitalCollectibleCardProps {
  player: NormalizedPlayer;
  onPlayTone?: () => void;
}

export const DigitalCollectibleCard: React.FC<DigitalCollectibleCardProps> = ({ player, onPlayTone }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const toggleFlip = () => {
    if (onPlayTone) onPlayTone();
    setIsFlipped(!isFlipped);
  };

  // Primary highlight stat calculation
  const testStats = player.stats.test;
  const odiStats = player.stats.odi;

  const isBowler = player.role === 'bowler';
  const mainStatLabel = isBowler ? 'Test Wickets' : 'Test Avg';
  const mainStatVal = isBowler
    ? testStats?.bowling?.wickets ?? odiStats?.bowling?.wickets ?? '—'
    : testStats?.batting?.average?.toFixed(1) ?? odiStats?.batting?.average?.toFixed(1) ?? '—';

  return (
    <div className="flex flex-col items-center select-none perspective-[1200px]">
      {/* 3D Holographic Card Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleFlip}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-72 sm:w-80 h-[460px] rounded-3xl cursor-pointer group shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(226,177,68,0.15)]"
      >
        {/* FRONT OF THE CARD */}
        <div
          className={`absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden border border-amber-400/30 bg-gradient-to-b from-[#141722] via-[#0c0e15] to-[#08090d] transition-all duration-500 ${
            isFlipped ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Dynamic Holographic Foil Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,215,0,0.25) 0%, rgba(138,43,226,0.15) 40%, transparent 70%)`,
            }}
          />

          {/* Golden Seam Border Inset */}
          <div className="absolute inset-2 rounded-2xl border border-amber-400/20 pointer-events-none" />

          {/* Card Header: Country + Rarity Crest */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[10px] font-tech font-bold text-amber-300">
                {player.countryCode || player.country.slice(0, 3).toUpperCase()}
              </div>
              <span className="text-xs font-tech font-bold tracking-widest text-zinc-300 uppercase">
                {player.country}
              </span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[9px] font-tech text-amber-300 uppercase tracking-widest">
              <Crown className="w-3 h-3 text-amber-400" />
              <span>RELIC #001</span>
            </div>
          </div>

          {/* Central Visual Art & Avatar */}
          <div className="relative z-10 my-auto flex flex-col items-center text-center">
            {/* Player Avatar Halo */}
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl mb-4 bg-gradient-to-br from-amber-500/10 to-zinc-900 flex items-center justify-center">
              {player.imageUrl ? (
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : null}
              {/* Fallback Initials */}
              <div className="absolute inset-0 flex items-center justify-center font-serif-luxury text-4xl font-black text-amber-300/40 pointer-events-none">
                {player.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Name */}
            <h3 className="text-2xl font-serif-luxury font-black text-white tracking-wide leading-tight group-hover:text-amber-200 transition-colors">
              {player.name}
            </h3>

            {/* Role Badge */}
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-tech text-amber-300 uppercase tracking-widest">
              {player.role.toUpperCase()}
            </span>
          </div>

          {/* Bottom Card Strip: Format Badges & Primary Stat */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[9px] font-tech">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">TEST</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">ODI</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">T20I</span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[8px] font-tech uppercase text-zinc-400">{mainStatLabel}</span>
              <span className="text-sm font-bold font-tech text-amber-300">{mainStatVal}</span>
            </div>
          </div>

          {/* Footer watermark seal */}
          <div className="relative z-10 flex items-center justify-between pt-1 text-[8px] font-tech tracking-[0.2em] text-zinc-500 uppercase">
            <span>CRICKXPLORE</span>
            <span className="flex items-center gap-1 text-amber-400/80">
              <Sparkles className="w-2.5 h-2.5" />
              <span>COLLECTIBLE PREVIEW</span>
            </span>
          </div>
        </div>

        {/* BACK OF THE CARD (Flipped State) */}
        <div
          className={`absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden border border-amber-400/40 bg-gradient-to-b from-[#181a24] via-[#0f1118] to-[#07080c] transition-all duration-500 ${
            isFlipped ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-95'
          }`}
        >
          {/* Card Back Inset */}
          <div className="absolute inset-2 rounded-2xl border border-amber-400/20 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-tech font-bold tracking-widest text-amber-300 uppercase">
              TITAN ARCHIVE RUNES
            </span>
            <span className="text-[10px] font-tech text-zinc-400">SERIES 1</span>
          </div>

          {/* Back Body: Milestones & Badges */}
          <div className="relative z-10 my-auto flex flex-col gap-3">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-tech text-amber-400 mb-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>Career Milestones</span>
              </div>
              <div className="flex flex-col gap-1 text-xs text-zinc-300">
                {player.badges?.map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{b}</span>
                  </div>
                )) || (
                  <span className="text-zinc-500 italic">Archival telemetry recorded</span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/20">
              <div className="flex items-center gap-2 text-xs font-tech text-amber-300 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Tactical Profile</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300 font-tech">
                <div>
                  <span className="text-zinc-500 block text-[9px]">BAT STYLE</span>
                  <span>{player.battingStyle || 'Right Hand'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px]">BOWL STYLE</span>
                  <span>{player.bowlingStyle || 'Right Arm'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back Footer */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-tech text-zinc-400">
            <span>Tap again to flip front</span>
            <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          </div>
        </div>
      </motion.div>

      {/* Card Instruction Hint */}
      <span className="mt-3 text-[11px] font-tech text-zinc-500 flex items-center gap-1.5">
        <RefreshCw className="w-3 h-3 text-amber-400" />
        <span>Click card to inspect lore runes & flip</span>
      </span>
    </div>
  );
};
