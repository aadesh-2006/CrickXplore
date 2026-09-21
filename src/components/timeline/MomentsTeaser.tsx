import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Lock } from 'lucide-react';

export const MomentsTeaser: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false);

  const handleTeaserClick = () => {
    setShowNotice(true);
    setTimeout(() => setShowNotice(false), 3500);
  };

  return (
    <section className="py-24 px-6 sm:px-8 relative overflow-hidden border-t border-white/[0.08]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/15 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-tech uppercase tracking-[0.2em]">
          <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Next Horizon Preview</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-black text-white tracking-tight">
          The Moments are Next
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Ball-by-ball tension curves, crowd decibel caldera logs, and deep tactical breakdowns of the deliveries that altered cricket destinies forever.
        </p>

        <div className="pt-4 flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleTeaserClick}
            className="group px-7 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-rose-400/40 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:shadow-xl hover:shadow-rose-500/10"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Enter the Moment Archive</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {showNotice && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-tech text-rose-300 bg-rose-950/60 border border-rose-500/30 px-4 py-2 rounded-lg"
            >
              Archive Vault opening in future phase • Stay tuned
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
