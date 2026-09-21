import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const footerLinks = [
    { label: 'Explore Universe', href: '#universe' },
    { label: 'Players Pantheon', href: '#universe', categoryId: 'players' },
    { label: 'Iconic Moments', href: '#universe', categoryId: 'moments' },
    { label: 'Colosseums & Stadiums', href: '#universe', categoryId: 'stadiums' },
    { label: 'Digital Cards', href: '#universe', categoryId: 'cards' },
    { label: 'Card Game Arena', href: '#universe', categoryId: 'card-game' },
  ];

  const handleLinkClick = (href: string, categoryId?: string) => {
    if (categoryId && onSelectCategory) {
      onSelectCategory(categoryId);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#040507] border-t border-white/[0.08] pt-20 pb-12 px-6 sm:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Column (6 cols) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-[1px]">
                <div className="w-full h-full rounded-full bg-[#07080a] flex items-center justify-center">
                  <span className="font-serif-luxury text-amber-300 text-xs font-bold">CX</span>
                </div>
              </div>
              <span className="font-serif-luxury text-2xl font-black tracking-wider text-white">
                CRICK<span className="text-amber-400">X</span>PLORE
              </span>
            </div>

            <p className="text-lg text-zinc-300 font-serif-luxury italic mb-6">
              "Cricket, explored differently."
            </p>

            <p className="text-xs text-zinc-400 font-light max-w-md leading-relaxed">
              An experimental, frontend-heavy digital sanctuary dedicated to the poetry, pressure, colosseums, and sensory heartbeat of cricket.
            </p>
          </div>

          {/* Universe Links Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-xs uppercase font-tech tracking-[0.2em] text-zinc-300 mb-4 font-semibold">
              The Universe
            </span>
            <ul className="flex flex-col gap-2.5 text-xs">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href, link.categoryId)}
                    className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collectibles & Strategy Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-xs uppercase font-tech tracking-[0.2em] text-zinc-300 mb-4 font-semibold">
              Artifacts & Play
            </span>
            <ul className="flex flex-col gap-2.5 text-xs">
              {footerLinks.slice(3).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href, link.categoryId)}
                    className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Base Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-tech text-zinc-400">
          <div>
            © {new Date().getFullYear()} CrickXplore. Crafted for purists and dreamers.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Phase 1 • Genesis Edition</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
