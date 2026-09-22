import React, { useState } from 'react';
import type { GameCard } from '../../game/types';
import { getAvailableCategoriesForCard } from '../../game/categories';
import type { FormatType } from '../../types/player';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

interface CategorySelectorProps {
  card: GameCard;
  onSelectCategory: (categoryKey: string) => void;
  formatFilter?: 'ALL' | FormatType;
  title?: string;
  subtitle?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  card,
  onSelectCategory,
  formatFilter = 'ALL',
  title = 'Select Stat Category',
  subtitle = 'Pick the metric where your player has the strongest competitive edge.',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'ALL' | FormatType>(formatFilter);
  const [selectedStatType, setSelectedStatType] = useState<'ALL' | 'batting' | 'bowling'>('ALL');

  const availableCategories = getAvailableCategoriesForCard(card, selectedFormat === 'ALL' ? undefined : selectedFormat);

  const filteredCategories = availableCategories.filter((cat) => {
    if (selectedStatType !== 'ALL' && cat.statType !== selectedStatType) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/80 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-2xl">
      <div className="text-center mb-5">
        <h3 className="text-xl md:text-2xl font-black text-white flex items-center justify-center gap-2">
          <Zap className="w-6 h-6 text-amber-400" />
          {title}
        </h3>
        <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Format and Type Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
        {/* Format tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/5">
          {(['ALL', 'test', 'odi', 't20i'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                selectedFormat === fmt
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {fmt === 'ALL' ? 'All Formats' : fmt.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Stat Type tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/5">
          {(['ALL', 'batting', 'bowling'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatType(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                selectedStatType === st
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {st === 'ALL' ? 'All Skills' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
        {filteredCategories.map((category) => {
          const rawValue = category.getValue(card);
          const isHigher = category.direction === 'HIGHER_IS_BETTER';

          return (
            <button
              key={category.key}
              onClick={() => onSelectCategory(category.key)}
              className="group flex flex-col justify-between p-3.5 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/40 transition-all text-left relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                    {category.format.toUpperCase()} • {category.statType}
                  </span>
                  <div className="font-bold text-sm text-white group-hover:text-emerald-300 mt-1 transition-colors">
                    {category.label}
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                    isHigher
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                  }`}
                >
                  {isHigher ? (
                    <>
                      <TrendingUp className="w-3 h-3" /> Higher
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3" /> Lower
                    </>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between border-t border-white/5 pt-2">
                <span className="text-xs text-slate-400">{card.playerName}:</span>
                <span className="text-base font-black text-emerald-400 group-hover:scale-105 transition-transform">
                  {category.formatValue(rawValue)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          No stats available matching the selected filter. Try selecting "All Formats" or "All Skills".
        </div>
      )}
    </div>
  );
};
