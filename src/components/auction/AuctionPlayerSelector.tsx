import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Calendar, Info, Users } from 'lucide-react';
import { FALLBACK_PLAYERS } from '../../data/players/index.ts';
import {
  getIplSeasonAvailabilityList,
  getPlayersForIplYear,
  getAllIplCareerPlayers,
} from '../../data/auction/auctionSeasonData.ts';
import type { NormalizedPlayer, PlayerRole } from '../../types/player.ts';

interface AuctionPlayerSelectorProps {
  selectedPlayerIds: string[];
  onAddPlayer: (playerId: string) => boolean;
  onAddMultiplePlayers: (playerIds: string[]) => number;
}

export const AuctionPlayerSelector: React.FC<AuctionPlayerSelectorProps> = ({
  selectedPlayerIds,
  onAddPlayer,
  onAddMultiplePlayers,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'year'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<PlayerRole | 'all'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const selectedSet = useMemo(() => new Set(selectedPlayerIds), [selectedPlayerIds]);

  // Countries for filter dropdown
  const countries = useMemo(() => {
    const list = Array.from(new Set(FALLBACK_PLAYERS.map((p) => p.country))).sort();
    return list;
  }, []);

  // Filtered players in Search Tab
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FALLBACK_PLAYERS.filter((player) => {
      // Role filter
      if (selectedRole !== 'all' && player.role !== selectedRole) return false;

      // Country filter
      if (selectedCountry !== 'all' && player.country !== selectedCountry) return false;

      // Search query
      if (!query) return true;

      const nameMatch = player.name.toLowerCase().includes(query);
      const countryMatch = player.country.toLowerCase().includes(query);
      const roleMatch = player.role.toLowerCase().includes(query);
      const iplTeamMatch = player.ipl2026Team?.toLowerCase().includes(query);

      return nameMatch || countryMatch || roleMatch || iplTeamMatch;
    });
  }, [searchQuery, selectedRole, selectedCountry]);

  // Year availability metadata
  const seasonAvailabilityList = useMemo(() => getIplSeasonAvailabilityList(), []);
  const currentSeasonData = useMemo(() => getPlayersForIplYear(selectedYear), [selectedYear]);
  const allCareerIplPlayers = useMemo(() => getAllIplCareerPlayers(), []);

  const handleAddPlayer = (player: NormalizedPlayer) => {
    const added = onAddPlayer(player.id);
    if (added) {
      setAddedNotice(`Added ${player.name} to auction pool.`);
      setTimeout(() => setAddedNotice(null), 2500);
    }
  };

  const handleAddYearPlayers = () => {
    if (!currentSeasonData.isAvailable || currentSeasonData.players.length === 0) return;
    const playerIds = currentSeasonData.players.map((p) => p.id);
    const addedCount = onAddMultiplePlayers(playerIds);
    setAddedNotice(`Added ${addedCount} players from IPL ${selectedYear} to auction pool.`);
    setTimeout(() => setAddedNotice(null), 3500);
  };

  const handleAddAllCareerPlayers = () => {
    const playerIds = allCareerIplPlayers.map((p) => p.id);
    const addedCount = onAddMultiplePlayers(playerIds);
    setAddedNotice(`Added ${addedCount} IPL career players to auction pool.`);
    setTimeout(() => setAddedNotice(null), 3500);
  };

  return (
    <div className="bg-[#0c0d14]/90 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col h-full">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
        <div>
          <h2 className="text-base font-serif-luxury font-bold text-white tracking-wide flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Player Database & Pool Ingestion</span>
          </h2>
          <p className="text-[11px] text-zinc-400 font-light">
            Search 457 players or load verified IPL season rosters
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex rounded-xl bg-black/40 border border-white/10 p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search 457 DB</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('year')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              activeTab === 'year'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>IPL Year Filter</span>
          </button>
        </div>
      </div>

      {/* Floating Added Toast */}
      {addedNotice && (
        <div className="mb-3 px-3.5 py-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{addedNotice}</span>
        </div>
      )}

      {/* TAB 1: SEARCH & FILTER (457 PLAYERS) */}
      {activeTab === 'search' && (
        <div className="flex flex-col flex-1 min-h-0 space-y-4">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by player name, country, role (e.g. Virat, Bumrah, Australia)..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-tech text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Role Pills */}
            <div className="flex flex-wrap gap-1">
              {(['all', 'batter', 'bowler', 'all-rounder', 'wicket-keeper'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedRole === role
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
                      : 'bg-white/5 border border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {role === 'all' ? 'All Roles' : role}
                </button>
              ))}
            </div>

            {/* Country Dropdown */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-black/50 border border-white/10 text-zinc-300 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">All Nations ({countries.length})</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <span className="text-[11px] text-zinc-500 font-tech ml-auto">
              {searchResults.length} / {FALLBACK_PLAYERS.length} Players
            </span>
          </div>

          {/* Search Result List */}
          <div className="flex-1 min-h-[340px] max-h-[460px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {searchResults.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No players match your search filter "{searchQuery}".
              </div>
            ) : (
              searchResults.map((player) => {
                const isSelected = selectedSet.has(player.id);
                return (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-amber-400/[0.04] border-amber-400/30'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Player Avatar / Emblem */}
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden text-[10px] font-bold text-amber-300">
                        {player.imageUrl ? (
                          <img
                            src={player.imageUrl}
                            alt={player.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback on broken image
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          player.name.substring(0, 2).toUpperCase()
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-white truncate">
                            {player.name}
                          </span>
                          {player.ipl2026Team && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              {player.ipl2026Team}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-tech">
                          <span>{player.country}</span>
                          <span>•</span>
                          <span className="capitalize">{player.role}</span>
                          {player.battingStyle && (
                            <>
                              <span>•</span>
                              <span className="truncate hidden sm:inline">{player.battingStyle}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      disabled={isSelected}
                      onClick={() => handleAddPlayer(player)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                          : 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-black shadow-sm'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: IPL YEAR FILTER (2008 - 2026) */}
      {activeTab === 'year' && (
        <div className="flex flex-col flex-1 min-h-0 space-y-4">
          {/* Season Year Selector Bar */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-300 mb-2 font-tech">
              Select IPL Season (2008 – 2026)
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
              {seasonAvailabilityList.map((season) => (
                <button
                  key={season.year}
                  type="button"
                  onClick={() => setSelectedYear(season.year)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-tech shrink-0 transition-all cursor-pointer ${
                    selectedYear === season.year
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 scale-105'
                      : season.isAvailable
                      ? 'bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20'
                      : 'bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {season.year}
                  {season.isAvailable && ' ★'}
                </button>
              ))}
            </div>
          </div>

          {/* Season Status Box */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-tech">
                  <span>IPL {selectedYear} Season Pool</span>
                  {currentSeasonData.isAvailable ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px]">
                      VERIFIED DATA ({currentSeasonData.players.length} Players)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 text-[10px]">
                      ARCHIVE PENDING
                    </span>
                  )}
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  {currentSeasonData.message}
                </p>
              </div>

              {currentSeasonData.isAvailable && currentSeasonData.players.length > 0 && (
                <button
                  type="button"
                  onClick={handleAddYearPlayers}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add All ({currentSeasonData.players.length})</span>
                </button>
              )}
            </div>

            {/* Non-Fabrication Notice for 2008-2025 */}
            {!currentSeasonData.isAvailable && (
              <div className="p-3.5 rounded-xl bg-amber-400/5 border border-amber-400/20 flex items-start gap-2.5 text-xs text-zinc-300">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-amber-300">Data Integrity Policy</p>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    CrickXplore strictly avoids hallucinating or fabricating historical season participation. Only fully verified season mappings (such as IPL 2026 with 162 franchise players) are populated by year.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleAddAllCareerPlayers}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                    >
                      Load All Career IPL Players ({allCareerIplPlayers.length})
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Player Cards from Selected Season */}
          <div className="flex-1 min-h-[220px] max-h-[320px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {currentSeasonData.isAvailable && currentSeasonData.players.length > 0 ? (
              currentSeasonData.players.map((player) => {
                const isSelected = selectedSet.has(player.id);
                return (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-amber-400/[0.04] border-amber-400/30'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0 text-[9px] font-bold text-amber-300">
                        {player.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-white truncate block">
                          {player.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-tech">
                          {player.country} • {player.role} • {player.ipl2026Team}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isSelected}
                      onClick={() => handleAddPlayer(player)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-black'
                      }`}
                    >
                      {isSelected ? 'Added ✓' : '+ Add'}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-zinc-500 text-xs">
                {currentSeasonData.isAvailable
                  ? 'No players found for this season.'
                  : `Historical data for IPL ${selectedYear} is unmapped in this build.`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
