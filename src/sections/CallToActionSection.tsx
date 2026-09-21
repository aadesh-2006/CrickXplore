import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Trophy, ArrowRight } from 'lucide-react';

interface CallToActionSectionProps {
  onEnterUniverse: () => void;
  onPlayTone?: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onEnterUniverse,
  onPlayTone,
}) => {
  const handleClick = () => {
    if (onPlayTone) onPlayTone();
    onEnterUniverse();
  };

  return (
    <section className="relative py-32 px-6 sm:px-8 overflow-hidden bg-gradient-to-b from-[#060709] via-[#090b10] to-[#040507]">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-amber-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-radial from-amber-500/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-[11px] font-tech uppercase tracking-[0.25em] text-amber-300 mb-6">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Phase 1 Experience Active</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-black text-white tracking-tight leading-tight mb-6">
            STEP ONTO THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
              SACRED TURF.
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            A sanctuary built for purists, strategists, and dreamers. Explore the initial realms or prepare for future collectible card battles and tactical arenas.
          </p>

          {/* Action */}
          <button
            onClick={handleClick}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-black font-extrabold text-sm sm:text-base uppercase tracking-widest shadow-[0_0_40px_rgba(251,191,36,0.35)] hover:shadow-[0_0_60px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-black group-hover:rotate-90 transition-transform duration-500" />
            <span>EXPLORE THE REALMS</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
