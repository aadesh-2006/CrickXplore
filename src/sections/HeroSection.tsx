import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Compass, Flame, Shield, Radio } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { HERO_HIGHLIGHTS } from '../data/universeData';

interface HeroSectionProps {
  onEnterUniverse: () => void;
  onPlayTone?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterUniverse, onPlayTone }) => {
  const { normalizedX, normalizedY } = useMousePosition();

  const handleCtaClick = () => {
    if (onPlayTone) onPlayTone();
    onEnterUniverse();
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between items-center px-6 sm:px-8 overflow-hidden">
      {/* Top micro badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/20 backdrop-blur-md mb-8 z-10"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="text-[11px] font-tech tracking-[0.25em] text-amber-300 uppercase">
          Genesis Experience • Phase 1
        </span>
      </motion.div>

      {/* Main Hero Typography & Cinematic Composition */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center text-center z-10 my-auto">
        {/* Layered Cricket Relic Interactive Core */}
        <motion.div
          className="relative mb-6 sm:mb-8 pointer-events-none"
          style={{
            transform: `perspective(1000px) rotateX(${normalizedY * -12}deg) rotateY(${normalizedX * 16}deg)`,
            transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)'
          }}
        >
          {/* Outer Orbital Ring */}
          <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-amber-400/20 flex items-center justify-center relative animate-[spin_40s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
            <div className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </div>

          {/* Central Leather Sphere Artifact */}
          <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-br from-[#7a1818] via-[#450d0d] to-[#120404] shadow-[0_0_50px_rgba(200,50,50,0.25),inset_0_4px_16px_rgba(255,180,180,0.3)] flex items-center justify-center overflow-hidden border border-red-500/30">
            {/* Hand-stitched Seam Illusion */}
            <div className="absolute inset-0 cricket-seam opacity-50 rotate-45 scale-125" />
            
            {/* Specular Light Flare */}
            <div
              className="absolute w-24 h-24 rounded-full bg-white/20 blur-md pointer-events-none transition-transform duration-300"
              style={{
                transform: `translate(${normalizedX * 30}px, ${normalizedY * 30}px)`
              }}
            />

            {/* Emblem Center */}
            <div className="relative z-10 flex flex-col items-center justify-center text-amber-200/90 font-tech text-[10px] tracking-widest uppercase">
              <Flame className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400 mb-1 animate-pulse" />
              <span className="font-bold text-xs sm:text-sm">156g</span>
              <span className="text-[9px] text-zinc-400">PURE LORE</span>
            </div>
          </div>

          {/* Floating Data Badges */}
          <div
            className="absolute -left-12 sm:-left-24 top-1/4 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-2 text-left shadow-xl"
            style={{
              transform: `translate(${normalizedX * -15}px, ${normalizedY * -15}px)`
            }}
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <div className="text-[9px] font-tech text-zinc-400 uppercase tracking-wider">Physics</div>
              <div className="text-xs font-bold text-zinc-200">145 km/h Seam</div>
            </div>
          </div>

          <div
            className="absolute -right-12 sm:-right-24 bottom-1/4 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-2 text-left shadow-xl"
            style={{
              transform: `translate(${normalizedX * 15}px, ${normalizedY * 15}px)`
            }}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <div>
              <div className="text-[9px] font-tech text-zinc-400 uppercase tracking-wider">Reaction</div>
              <div className="text-xs font-bold text-zinc-200">0.4s Window</div>
            </div>
          </div>
        </motion.div>

        {/* Master Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-luxury font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 mb-6 drop-shadow-2xl"
        >
          CRICK<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">X</span>PLORE
        </motion.h1>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-2xl md:text-3xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed tracking-wide mb-10"
        >
          Explore the game beyond the scoreboard.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 z-20"
        >
          <button
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-black font-extrabold text-sm sm:text-base uppercase tracking-widest shadow-[0_0_35px_rgba(251,191,36,0.35)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-black group-hover:rotate-45 transition-transform duration-300" />
            <span>ENTER THE UNIVERSE</span>
            <Sparkles className="w-4 h-4 text-black opacity-70 group-hover:opacity-100" />
          </button>

          <button
            onClick={() => {
              const el = document.querySelector('#sensory');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white text-xs uppercase font-tech tracking-widest transition-all duration-300 cursor-pointer"
          >
            Sensory Showcase ↓
          </button>
        </motion.div>
      </div>

      {/* Highlights Bar at base of Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="w-full max-w-5xl mx-auto pt-12 z-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 border-t border-white/[0.08] pt-6">
          {HERO_HIGHLIGHTS.map((item, idx) => (
            <div key={idx} className="flex flex-col text-left px-2">
              <span className="text-[10px] font-tech uppercase tracking-widest text-zinc-400 mb-1">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-200">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Down indicator */}
      <div className="mt-8 text-zinc-400 animate-bounce">
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
};
