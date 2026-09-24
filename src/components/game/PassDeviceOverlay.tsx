import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { GamePlayer } from '../../game/types';
import { Smartphone, ShieldCheck, EyeOff, ArrowRight, UserCheck, Crown, Swords } from 'lucide-react';
import { gameSound } from '../../game/sound';

interface PassDeviceOverlayProps {
  targetPlayer: GamePlayer;
  isController: boolean;
  onReady: () => void;
}

export const PassDeviceOverlay: React.FC<PassDeviceOverlayProps> = ({
  targetPlayer,
  isController,
  onReady,
}) => {
  useEffect(() => {
    gameSound.playCardSelect();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
      >
        {/* Glow effects */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

        <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto mb-5 text-amber-300 shadow-inner">
          <Smartphone className="w-9 h-9 animate-bounce" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 mb-3">
          <EyeOff className="w-3.5 h-3.5 text-amber-400" /> Hot-Seat Hand Privacy Guard
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-300 uppercase tracking-wider">
          Pass the Device
        </h2>

        <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 my-2.5 font-serif-luxury drop-shadow-md">
          {targetPlayer.name}
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-xs text-slate-300 mb-6 flex items-start gap-2.5 text-left">
          {isController ? (
            <Crown className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          ) : (
            <Swords className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-bold text-white block mb-0.5">
              {isController ? 'Category Leader Turn' : 'Challenger Turn'}
            </span>
            <span className="text-slate-400">
              {isController
                ? 'Hand the device to the Leader to pick their opening card and category.'
                : 'Hand the device to the Challenger to select their card and face the duel.'}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Hand is concealed until you tap to begin</span>
        </div>

        <button
          onClick={() => {
            gameSound.playCardSelect();
            onReady();
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <UserCheck className="w-5 h-5" />
          I am {targetPlayer.name} — Ready
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};
