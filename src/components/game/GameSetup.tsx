import React, { useState } from 'react';
import type { GameConfig } from '../../game/types';
import type { FormatType } from '../../types/player';
import { Play, Sparkles, BookOpen, Dices } from 'lucide-react';

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
  onOpenRules: () => void;
}

const DEFAULT_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];
const FUNNY_NAMES = ['Master Blaster', 'Yorker King', 'Spin Wizard', 'Cover Driver', 'Finisher', 'Googly Lord'];

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, onOpenRules }) => {
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [playerNames, setPlayerNames] = useState<string[]>(['Captain Rohit', 'King Kohli', 'Boom Bumrah']);
  const [format, setFormat] = useState<'ALL' | FormatType>('ALL');
  const [cardsPerPlayer, setCardsPerPlayer] = useState<number>(3);

  const handlePlayerCountChange = (count: number) => {
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
    const shuffled = [...FUNNY_NAMES].sort(() => 0.5 - Math.random());
    setPlayerNames(shuffled.slice(0, playerCount));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNames = playerNames.map((n, i) => n.trim() || `Player ${i + 1}`);
    onStartGame({
      playersCount: playerCount,
      playerNames: cleanNames,
      format,
      era: 'ALL',
      cardsPerPlayer,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/90 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4" /> LOCAL MULTIPLAYER ARENA
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          CrickXplore Card Game
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2 max-w-lg mx-auto">
          Pass-and-play stat duels for 3 to 6 players on a single device. Outsmart your friends with cricket mastery!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Player Count Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
            1. Number of Players (3 to 6)
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {[3, 4, 5, 6].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => handlePlayerCountChange(count)}
                className={`py-3 rounded-xl font-black text-sm transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                  playerCount === count
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <span>{count} Players</span>
                <span className="text-[10px] font-medium opacity-80">
                  {count === 3 ? 'Classic Duel' : count === 6 ? 'Mega Arena' : 'Battle'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Player Names */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Player Names (Hot-Seat Roster)
            </label>
            <button
              type="button"
              onClick={randomizeNames}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5" /> Randomize Names
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {playerNames.map((name, idx) => (
              <div key={idx} className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500">
                  P{idx + 1}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  maxLength={18}
                  placeholder={`Player ${idx + 1}`}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 pl-11 pr-3 text-sm text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Format & Cards per Player */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Format Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              3. Match Format Scope
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ALL', label: 'All Formats' },
                { id: 'test', label: 'Test Only' },
                { id: 'odi', label: 'ODI Only' },
                { id: 't20i', label: 'T20I Only' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setFormat(fmt.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    format === fmt.id
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards per Player */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              4. Starting Cards Per Player
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCardsPerPlayer(num)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    cardsPerPlayer === num
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {num} Cards
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-base shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-slate-950" /> Deal & Start Match
          </button>

          <button
            type="button"
            onClick={onOpenRules}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" /> How to Play
          </button>
        </div>
      </form>
    </div>
  );
};
