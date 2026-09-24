import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { StoryHero } from '../components/stories/StoryHero';
import { StoryCard } from '../components/stories/StoryCard';
import { CRICKET_STORIES } from '../data/stories/storyCatalog';
import type { StoryCategory } from '../types/stories';
import type { AppView } from '../App';

interface StoriesPageProps {
  onNavigateView: (
    view: AppView,
    playerId?: string,
    cardId?: string,
    momentId?: string,
    stadiumId?: string,
    storySlug?: string
  ) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPlayTone: () => void;
  onSelectStorySlug: (slug: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
  onSelectStorySlug,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'ALL'>('ALL');

  const categories: (StoryCategory | 'ALL')[] = [
    'ALL',
    'World Cup',
    'Chase Mastery',
    'Miracle Inning',
    'Epoch Defining',
    'Record Breaker',
  ];

  const featuredStory = CRICKET_STORIES.find((s) => s.featured) || CRICKET_STORIES[0];

  const filteredStories = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return CRICKET_STORIES;
    }
    return CRICKET_STORIES.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectStory = (slug: string) => {
    onPlayTone();
    onSelectStorySlug(slug);
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white selection:bg-amber-400 selection:text-black relative">
      {/* Dynamic Ambient Background */}
      <CricketAtmosphericBackground />

      {/* Navigation */}
      <Navbar
        currentView="stories"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Landing Hero */}
        <StoryHero
          featuredStory={featuredStory}
          onSelectStory={handleSelectStory}
          totalStoriesCount={CRICKET_STORIES.length}
        />

        {/* Stories Catalog Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    onPlayTone();
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-tech uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20 scale-105'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {category === 'ALL' ? 'All Chronicles' : category}
                </button>
              );
            })}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.slug}
                story={story}
                onSelectStory={handleSelectStory}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
