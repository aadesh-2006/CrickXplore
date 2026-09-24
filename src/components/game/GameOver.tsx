import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { GamePlayer } from '../../game/types';
import { Trophy, Sparkles, RotateCcw, Award, Users, ArrowLeft, Crown } from 'lucide-react';
import { gameSound } from '../../game/sound';

interface GameOverProps {
  winner: GamePlayer | null;
  players: GamePlayer[];
  onPlayAgain: () => void;
  onNewSetup: () => void;
  onBackToHub?: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  winner,
  players,
  onPlayAgain,
  onNewSetup,
  onBackToHub,
}) => {
  useEffect(() => {
    gameSound.playGameOver();
  }, []);

  const rankedPlayers = [...players].sort(
    (a, b) => b.cardsWonCount - a.cardsWonCount || b.hand.length - a.hand.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="w-full max-w-3xl mx-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(245,158,11,0.25)] text-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

      {/* Trophy Icon Frame */}
      <div className="relative inline-block mb-4">
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 flex items-center justify-center mx-auto shadow-2xl ring-8 ring-amber-500/20 shadow-amber-500/40"
        >
          <Trophy className="w-12 h-12 sm:w-14 sm:h-14 text-slate-950 drop-shadow-md" />
        </motion.div>
        <div className="absolute -top-2 -right-2 bg-emerald-400 text-slate-950 p-2 rounded-full shadow-lg animate-bounce">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest mb-3">
        CRICKXPLORE ARENA CHAMPION
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-serif-luxury tracking-wide mb-2 drop-shadow-lg">
        {winner?.name || 'Grand Champion'}
      </h1>

      <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
        Conquered all stat duels, dominated category selection, and claimed the ultimate cricket arena championship!
      </p>

      {/* Final Match Standings */}
      <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 text-left shadow-inner">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Final Match Standings & Stats
        </h3>

        <div className="space-y-2.5">
          {rankedPlayers.map((player, idx) => {
            const isChamp = player.id === winner?.id;

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isChamp
                    ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border-amber-400/50 shadow-md'
                    : 'bg-white/5 border-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs font-mono ${
                      isChamp
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      {player.name}
                      {isChamp && (
                        <span className="flex items-center gap-1 text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.2 rounded-md shadow-sm">
                          <Crown className="w-3 h-3" /> WINNER
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Cards swept from pot: <strong className="text-amber-300">{player.cardsWonCount}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Final Hand</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    {player.hand.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
        <button
          type="button"
          onClick={() => {
            gameSound.playCardSelect();
            onPlayAgain();
          }}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <RotateCcw className="w-5 h-5" /> Play Rematch (Same Players)
        </button>

        <button
          type="button"
          onClick={() => {
            gameSound.playCardSelect();
            onNewSetup();
          }}
          className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Users className="w-5 h-5" /> New Match Setup
        </button>

        {onBackToHub && (
          <button
            type="button"
            onClick={onBackToHub}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-950/80 hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Hub
          </button>
        )}
      </div>
    </motion.div>
  );
};
