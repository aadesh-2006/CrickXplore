import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Sparkles, Compass, Users } from 'lucide-react';

interface NavbarProps {
  currentView?: 'home' | 'players';
  onNavigateView?: (view: 'home' | 'players') => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onSelectCategory?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onSelectCategory,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Explore', view: 'home' as const, href: '#universe' },
    { label: 'Players', view: 'players' as const, categoryId: 'players' },
    { label: 'Moments', view: 'home' as const, href: '#universe', categoryId: 'moments' },
    { label: 'Stadiums', view: 'home' as const, href: '#universe', categoryId: 'stadiums' },
    { label: 'Cards', view: 'home' as const, href: '#universe', categoryId: 'cards' },
    { label: 'Game', view: 'home' as const, href: '#universe', categoryId: 'card-game' },
  ];

  const handleNavClick = (view: 'home' | 'players', href?: string, categoryId?: string) => {
    setMobileMenuOpen(false);
    if (onNavigateView) {
      onNavigateView(view);
    }
    if (categoryId && onSelectCategory) {
      onSelectCategory(categoryId);
    }
    if (view === 'home' && href) {
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#08090d]/85 backdrop-blur-xl border-b border-white/[0.08] py-4 shadow-2xl shadow-black/50'
            : 'bg-gradient-to-b from-[#060709]/90 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center gap-3 select-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            {/* Logo Emblem */}
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#090a0f] flex items-center justify-center relative overflow-hidden">
                {/* Seam line motif */}
                <div className="absolute inset-0 cricket-seam opacity-40 group-hover:opacity-70 transition-opacity" />
                <span className="font-serif-luxury text-amber-300 text-base font-bold relative z-10">CX</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl sm:text-2xl font-black tracking-wider text-white group-hover:text-amber-300 transition-colors">
                CRICK<span className="text-amber-400">X</span>PLORE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-tech -mt-1 hidden sm:block">
                Cricket Sanctuary
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = (item.view === 'players' && currentView === 'players') ||
                               (item.label === 'Explore' && currentView === 'home');
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view, item.href, item.categoryId)}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest rounded-full transition-all duration-200 cursor-pointer font-medium ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Audio Ambience + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={onToggleAudio}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
              }`}
              title="Toggle Stadium Atmospheric Drone"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                  <span className="font-tech text-[10px] uppercase">Atmosphere: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="font-tech text-[10px] uppercase">Soundscape</span>
                </>
              )}
            </button>

            {/* Quick Explore / Players Switcher Pill */}
            {currentView === 'home' ? (
              <button
                onClick={() => handleNavClick('players')}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black hover:bg-amber-300 text-xs font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-amber-400/20 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>PLAYERS</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black hover:bg-amber-300 text-xs font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-amber-400/20 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>SANCTUARY</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-full border text-xs transition-colors ${
                isPlayingAudio
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-white/[0.05] border-white/10 text-zinc-400'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[73px] z-40 bg-[#090b10]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase font-tech tracking-[0.2em] text-zinc-400">
                Navigation
              </span>
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.view, item.href, item.categoryId)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.05] text-left text-sm font-medium tracking-wide text-zinc-200 hover:text-amber-300 transition-all cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-tech">CrickXplore • Phase 2</span>
                <button
                  onClick={() => handleNavClick(currentView === 'home' ? 'players' : 'home')}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold text-xs tracking-wider"
                >
                  {currentView === 'home' ? 'View Players' : 'Back to Sanctuary'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
