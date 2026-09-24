import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, PlusCircle, ArrowRight, Gavel, Check, AlertCircle } from 'lucide-react';
import { IPL2026_AUCTION_RULES } from '../../types/auction.ts';
import type { IPLTeamCode } from '../../types/player.ts';

interface AuctionRoomCreatorProps {
  onCreateRoom: (hostName: string, maxParticipants: number, teamCode: IPLTeamCode) => void;
  onJoinRoom: (roomCode: string, participantName: string, teamCode: IPLTeamCode) => { success: boolean; message: string };
}

export const AuctionRoomCreator: React.FC<AuctionRoomCreatorProps> = ({
  onCreateRoom,
  onJoinRoom,
}) => {
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [hostName, setHostName] = useState('Auction Master');
  const [participantCount, setParticipantCount] = useState<number>(6);
  const [selectedFranchise, setSelectedFranchise] = useState<IPLTeamCode>('CSK');

  // Join mode states
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('Bidder 1');
  const [joinError, setJoinError] = useState<string | null>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRoom(hostName, participantCount, selectedFranchise);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);
    if (!joinCode.trim()) {
      setJoinError('Please enter a valid room code (e.g. AUC-8921)');
      return;
    }
    const result = onJoinRoom(joinCode, joinName, selectedFranchise);
    if (!result.success) {
      setJoinError(result.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs uppercase tracking-widest font-tech mb-4">
          <Gavel className="w-3.5 h-3.5 text-amber-400" />
          <span>Multiplayer IPL Auction Room</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-white tracking-wide mb-3">
          IPL 2026 <span className="text-amber-400">AUCTION WAR ROOM</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Create a private auction room, configure 2–10 participant tables, assemble your 457-player auction pool, and prepare for the battle of franchises.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => { setMode('create'); setJoinError(null); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              mode === 'create'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Room (Host)</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('join'); setJoinError(null); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              mode === 'join'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Join with Code</span>
          </button>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Panel */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-7 bg-[#0c0d14]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {mode === 'create' ? (
            <form onSubmit={handleCreateSubmit} className="space-y-6 relative z-10">
              {/* Host Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-2 font-tech">
                  Host / Franchise Representative Name
                </label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="e.g. Chennai Super Kings Strategy Lead"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm font-medium"
                />
              </div>

              {/* Number of Participants (2 to 10) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-300 font-tech">
                    Number of Participant Bidders
                  </label>
                  <span className="text-amber-400 font-bold text-sm">{participantCount} Bidders</span>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setParticipantCount(num)}
                      className={`py-2 rounded-lg text-xs font-semibold font-tech transition-all cursor-pointer ${
                        participantCount === num
                          ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20 scale-105'
                          : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Supports 2 to 10 simultaneous franchise bidding tables in the room lobby.
                </p>
              </div>

              {/* Franchise Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-2 font-tech">
                  Select Your Franchise
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {IPL2026_AUCTION_RULES.franchises.map((f) => (
                    <button
                      key={f.code}
                      type="button"
                      onClick={() => setSelectedFranchise(f.code)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedFranchise === f.code
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10 scale-105'
                          : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.07]'
                      }`}
                    >
                      <span className="block text-xs font-bold font-tech">{f.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold uppercase tracking-wider text-xs transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                <span>Create Room & Enter Lobby</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoinSubmit} className="space-y-6 relative z-10">
              {joinError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{joinError}</span>
                </div>
              )}

              {/* Room Code */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-2 font-tech">
                  Room Access Code
                </label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g. AUC-8921"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-base font-mono tracking-widest uppercase"
                />
              </div>

              {/* Participant Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-2 font-tech">
                  Your Name / Bidder Handle
                </label>
                <input
                  type="text"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="e.g. Mumbai Indians Scout"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm font-medium"
                />
              </div>

              {/* Preferred Franchise */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-2 font-tech">
                  Preferred Franchise Table
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {IPL2026_AUCTION_RULES.franchises.map((f) => (
                    <button
                      key={f.code}
                      type="button"
                      onClick={() => setSelectedFranchise(f.code)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedFranchise === f.code
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                          : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.07]'
                      }`}
                    >
                      <span className="block text-xs font-bold font-tech">{f.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Join CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold uppercase tracking-wider text-xs transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                <span>Join Auction Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>

        {/* Specifications & Rules Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c0d14]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider font-tech mb-4">
              <Shield className="w-4 h-4" />
              <span>IPL 2026 Official Rules Standard</span>
            </div>

            <ul className="space-y-3 text-xs text-zinc-300 font-light">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Format:</strong> Official IPL 2026 Mini-Auction regulations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Squad Sizes:</strong> Minimum 18 to Maximum 25 players per franchise.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Overseas Cap:</strong> Maximum 8 overseas players per squad.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>RTM Rule:</strong> No Right-To-Match (RTM) options in 2026 mini-auction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Available Slots:</strong> 77 available roster spots across 10 franchises.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Base Price Tiers:</strong> ₹2.0 Cr down to ₹30 Lakh.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-5 text-xs text-zinc-400">
            <p className="font-semibold text-amber-300 mb-1 font-tech uppercase tracking-wider">
              Multiplayer Lobby Phase
            </p>
            <p className="leading-relaxed">
              This milestone allows room setup and player pool assembly from the 457-player database. The real-time bidding engine will activate in the next milestone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
