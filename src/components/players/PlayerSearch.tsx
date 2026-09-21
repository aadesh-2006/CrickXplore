import React, { useRef, useEffect } from 'react';
import { Search, X, Filter, Sparkles, Shield, User, Globe, Activity } from 'lucide-react';
import type { PlayerRole, FormatType, PlayerFilterOptions } from '../../types/player';

interface PlayerSearchProps {
  filters: PlayerFilterOptions;
  onFilterChange: (filters: PlayerFilterOptions) => void;
  isLiveApi: boolean;
  totalResults: number;
  isLoading: boolean;
}

const ROLES: Array<{ id: PlayerRole | 'all'; label: string }> = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'batter', label: 'Batters' },
  { id: 'bowler', label: 'Bowlers' },
  { id: 'all-rounder', label: 'All-Rounders' },
  { id: 'wicket-keeper', label: 'Keepers' },
];

const FORMATS: Array<{ id: FormatType | 'all'; label: string }> = [
  { id: 'all', label: 'All Formats' },
  { id: 'test', label: 'Test' },
  { id: 'odi', label: 'ODI' },
  { id: 't20i', label: 'T20I' },
];

const COUNTRIES = [
  'all',
  'India',
  'Australia',
  'England',
  'New Zealand',
  'South Africa',
  'Pakistan',
  'Afghanistan',
];

export const PlayerSearch: React.FC<PlayerSearchProps> = ({
  filters,
  onFilterChange,
  isLiveApi,
  totalResults,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQueryChange = (val: string) => {
    onFilterChange({ ...filters, searchQuery: val });
  };

  const handleRoleSelect = (role: PlayerRole | 'all') => {
    onFilterChange({ ...filters, role });
  };

  const handleFormatSelect = (format: FormatType | 'all') => {
    onFilterChange({ ...filters, format });
  };

  const handleCountrySelect = (country: string) => {
    onFilterChange({ ...filters, country });
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-12">
      {/* Search Input Bar */}
      <div className="relative group mb-6">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-yellow-500/10 to-amber-500/30 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
        
        <div className="relative flex items-center bg-[#0d0f16] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl backdrop-blur-xl">
          <Search className="w-5 h-5 text-amber-400 shrink-0 mr-3.5 group-hover:scale-110 transition-transform" />
          
          <input
            ref={inputRef}
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search legends, strike rates, countries (e.g. Virat Kohli, Bumrah, Smith)..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base font-light focus:outline-none"
          />

          {isLoading && (
            <div className="flex items-center gap-2 mr-3 text-xs text-amber-400 font-tech">
              <Activity className="w-4 h-4 animate-spin text-amber-400" />
              <span className="hidden sm:inline">Querying...</span>
            </div>
          )}

          {filters.searchQuery && (
            <button
              onClick={() => handleQueryChange('')}
              className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] font-tech text-zinc-500">
            <span>PRESS</span>
            <kbd className="text-zinc-300 font-bold bg-white/10 px-1 rounded">/</kbd>
          </div>
        </div>
      </div>

      {/* Filter Matrix & Data Source Status */}
      <div className="flex flex-col gap-4">
        {/* Top filter row: Disciplines + Formats */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Roles / Disciplines */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-500 mr-1 flex items-center gap-1">
              <User className="w-3 h-3 text-amber-400/80" />
              <span>Role:</span>
            </span>
            {ROLES.map((role) => {
              const active = filters.role === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/20'
                      : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {role.label}
                </button>
              );
            })}
          </div>

          {/* Formats */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-400/80" />
              <span>Format:</span>
            </span>
            {FORMATS.map((fmt) => {
              const active = filters.format === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => handleFormatSelect(fmt.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    active
                      ? 'bg-zinc-200 text-black font-bold shadow-md'
                      : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom filter row: Countries + Archival Telemetry Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
          {/* Country quick chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-tech tracking-wider text-zinc-500 mr-1 flex items-center gap-1">
              <Globe className="w-3 h-3 text-amber-400/80" />
              <span>Nation:</span>
            </span>
            {COUNTRIES.map((country) => {
              const active = filters.country === country;
              return (
                <button
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-tech tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-400/20 border border-amber-400/50 text-amber-300 font-bold'
                      : 'bg-white/[0.02] border border-white/[0.04] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {country === 'all' ? 'ALL NATIONS' : country.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Results count & Mode pill */}
          <div className="flex items-center gap-3 text-xs font-tech">
            <span className="text-zinc-400">
              Showing <strong className="text-white">{totalResults}</strong> Titans
            </span>

            <div
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] uppercase tracking-wider ${
                isLiveApi
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}
            >
              {isLiveApi ? (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Live CricketData API</span>
                </>
              ) : (
                <>
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>Sample Archival Vault</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
