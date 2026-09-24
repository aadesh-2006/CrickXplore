import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { GameConfig } from '../../game/types';
import type { FormatType } from '../../types/player';
import type { EraId } from '../../types/timeline';
import { Play, BookOpen, Dices, Shield, Swords, Layers, Calendar, Trophy, Users } from 'lucide-react';
import { gameSound } from '../../game/sound';

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
  onOpenRules: () => void;
}

const DEFAULT_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];
const FUNNY_NAMES = ['Master Blaster', 'Yorker King', 'Spin Wizard', 'Cover Driver', 'Finisher', 'Googly Lord'];

const ERAS: { id: 'ALL' | EraId; label: string; period: string }[] = [
  { id: 'ALL', label: 'All Eras', period: 'All Decades' },
  { id: '1970s', label: '1970s', period: 'Classic Era' },
  { id: '1980s', label: '1980s', period: 'World Cup Dawn' },
  { id: '1990s', label: '1990s', period: 'Global Expansion' },
  { id: '2000s', label: '2000s', period: 'Dominance Era' },
  { id: '2010s', label: '2010s', period: 'T20 Revolution' },
  { id: '2020s', label: '2020s', period: 'Modern Era' },
];

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, onOpenRules }) => {
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [playerNames, setPlayerNames] = useState<string[]>(['Captain Rohit', 'King Kohli', 'Boom Bumrah']);
  const [format, setFormat] = useState<'ALL' | FormatType>('ALL');
  const [era, setEra] = useState<'ALL' | EraId>('ALL');
  const [cardsPerPlayer, setCardsPerPlayer] = useState<number>(3);

  const handlePlayerCountChange = (count: number) => {
    gameSound.playCardSelect();
    setPlayerCount(count);
    const newNames = [...playerNames];
    while (newNames.length < count) {
      newNames.push(DEFAULT_NAMES[newNames.length] || `Player ${newNames.length + 1}`);
    }
    setPlayerNames(newNames.slice(0, count));
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const randomizeNames = () => {
    gameSound.playCardSelect();
    const shuffled = [...FUNNY_NAMES].sort(() => 0.5 - Math.random());
    setPlayerNames(shuffled.slice(0, playerCount));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gameSound.playVictory();
    const cleanNames = playerNames.map((n, i) => n.trim() || `Player ${i + 1}`);
    onStartGame({
      playersCount: playerCount,
      playerNames: cleanNames,
      format,
      era,
      cardsPerPlayer,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-slate-900/95 border border-amber-500/20 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />

      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest mb-3">
          <Swords className="w-4 h-4 text-amber-400 animate-pulse" /> ENTER THE ARENA
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-serif-luxury drop-shadow-md">
          CRICK<span className="text-amber-400">X</span>PLORE CARD ARENA
        </h1>
        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
          The ultimate cricket strategy & knowledge card battle. Choose your format, command your categories, and sweep the chain pot in local hot-seat duels!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Player Count Selection */}
        <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-white/5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" /> 1. Number of Players
            </span>
            <span className="text-emerald-400 text-[11px] font-mono">Hot-Seat Mode</span>
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {[3, 4, 5, 6].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => handlePlayerCountChange(count)}
                className={`py-3 px-2 rounded-xl font-black text-sm transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                  playerCount === count
                    ? 'bg-gradient-to-b from-emerald-400 to-emerald-500 text-slate-950 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-[1.02]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span>{count} Players</span>
                <span className="text-[10px] font-medium opacity-80">
                  {count === 3 ? 'Classic Tri-Duel' : count === 6 ? 'Mega Colosseum' : 'Arena Battle'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Player Names */}
        <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> 2. Player Names (Table Roster)
            </label>
            <button
              type="button"
              onClick={randomizeNames}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Dices className="w-3.5 h-3.5" /> Randomize Roster
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {playerNames.map((name, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-amber-400/80">
                  P{idx + 1}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  maxLength={18}
                  placeholder={`Player ${idx + 1}`}
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Format & Era Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Format Filter */}
          <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-white/5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-400" /> 3. Match Format Scope
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ALL', label: 'All Formats', sub: 'Test, ODI, T20I' },
                { id: 'test', label: 'Test Arena', sub: 'Traditional Red Ball' },
                { id: 'odi', label: 'ODI Arena', sub: '50-Over Battles' },
                { id: 't20i', label: 'T20I Arena', sub: 'High Strike Rates' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => {
                    gameSound.playCardSelect();
                    setFormat(fmt.id as any);
                  }}
                  className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                    format === fmt.id
                      ? 'bg-blue-500/20 text-blue-300 border-blue-400/60 shadow-md'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{fmt.label}</div>
                  <div className="text-[10px] text-slate-400">{fmt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Era Filter & Cards Count */}
          <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-white/5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" /> 4. Cricket Era Pool
            </label>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {ERAS.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => {
                    gameSound.playCardSelect();
                    setEra(e.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-left transition-all border text-xs flex items-center justify-between cursor-pointer ${
                    era === e.id
                      ? 'bg-purple-500/20 text-purple-300 border-purple-400/60 font-bold'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <span>{e.label}</span>
                  <span className="text-[10px] text-slate-500">{e.period}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Hand Size Quick Selection */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Cards per Player Hand:
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  gameSound.playCardSelect();
                  setCardsPerPlayer(num);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  cardsPerPlayer === num
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                }`}
              >
                {num} Cards
              </button>
            ))}
          </div>
        </div>

        {/* 6. Visual Arena Match Preview Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-slate-950/80 to-amber-500/10 border border-white/10 flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Players</span>
            <span className="text-base font-black text-emerald-400">{playerCount} Combatants</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting Hand Size</span>
            <span className="text-base font-black text-amber-400">{cardsPerPlayer} Cards Each</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Format Scope</span>
            <span className="text-base font-black text-blue-400 uppercase">{format}</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Era Scope</span>
            <span className="text-base font-black text-purple-400">
              {ERAS.find((item) => item.id === era)?.label || 'All Eras'}
            </span>
          </div>
        </div>

        {/* 7. Action CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
          <button
            type="submit"
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-lg shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-slate-950" /> DEAL THE DECK & ENTER
          </button>

          <button
            type="button"
            onClick={onOpenRules}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" /> How to Play
          </button>
        </div>
      </form>
    </motion.div>
  );
};
