import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, MapPin, Trophy, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { StoryProgress } from '../components/stories/StoryProgress';
import { StorySection } from '../components/stories/StorySection';
import { RelatedStories } from '../components/stories/RelatedStories';
import { CRICKET_STORIES, getStoryBySlug, getRelatedStories } from '../data/stories/storyCatalog';
import { hasFullStory } from '../data/stories/fullStoriesCatalog';
import type { AppView } from '../App';

interface StoryArticlePageProps {
  slug: string;
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
  onOpenFullStory?: (slug: string) => void;
}

export const StoryArticlePage: React.FC<StoryArticlePageProps> = ({
  slug,
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
  onSelectStorySlug,
  onOpenFullStory,
}) => {
  const story = getStoryBySlug(slug) || CRICKET_STORIES[0];
  const relatedStories = getRelatedStories(story.slug, 3);
  const storyHasFullArticle = hasFullStory(story.slug);

  const currentIndex = CRICKET_STORIES.findIndex((s) => s.slug === story.slug);
  const previousStory = currentIndex > 0 ? CRICKET_STORIES[currentIndex - 1] : undefined;
  const nextStory = currentIndex < CRICKET_STORIES.length - 1 ? CRICKET_STORIES[currentIndex + 1] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleOpenFullStory = (targetSlug: string) => {
    onPlayTone();
    if (onOpenFullStory) {
      onOpenFullStory(targetSlug);
    } else {
      window.location.hash = `stories/${targetSlug}/full`;
    }
  };

  const handleBackToStories = () => {
    onPlayTone();
    onNavigateView('stories');
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white selection:bg-amber-400 selection:text-black relative">
      {/* Reading Progress Indicator Bar */}
      <StoryProgress />

      {/* Dynamic Ambient Atmosphere */}
      <CricketAtmosphericBackground />

      {/* Navigation */}
      <Navbar
        currentView="stories"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      {/* Article Main Container */}
      <main className="relative z-10 pt-36 md:pt-40 pb-24 px-6 sm:px-8 max-w-4xl mx-auto">
        {/* Top Back Action */}
        <div className="mb-8">
          <button
            onClick={handleBackToStories}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-400/40 text-xs font-tech uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Chronicles</span>
          </button>
        </div>

        {/* Editorial Article Header */}
        <header className="space-y-6 pb-12 border-b border-white/10 relative">
          {/* Ambient Glow */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-[120px] pointer-events-none opacity-20"
            style={{ background: story.colorAccent.primary }}
          />

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center gap-1.5">
              <Trophy className="w-3 h-3" />
              {story.year} • {story.tournament.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-zinc-300">
              {story.category}
            </span>
            <span className="text-xs font-tech text-zinc-400 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              {story.readTime}
            </span>
          </div>

          {/* Player & Headline Score */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-tech uppercase tracking-[0.25em] text-zinc-400 block mb-1">
                IMMORTAL CHRONICLE
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-black text-amber-300 uppercase tracking-wide">
                {story.player}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-serif-luxury text-3xl sm:text-5xl font-black text-amber-400 drop-shadow-md">
                {story.headlineScore}
              </span>
            </div>
          </div>

          {/* Main Headline Title */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            {story.title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif-luxury text-lg sm:text-xl text-amber-100/85 italic leading-relaxed">
            {story.subtitle}
          </p>

          {/* Match Context Details Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-tech text-zinc-400 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{story.venue}</span>
            </div>
          </div>
        </header>

        {/* Read Full Story Callout Banner (Only when full story exists) */}
        {storyHasFullArticle && (
          <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/5 to-white/[0.02] border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.08)]">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-tech uppercase tracking-[0.25em] text-amber-400 font-bold">
                  Deep-Dive Historical Article Available
                </span>
              </div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                The Complete Untold History: Beyond the Scorecard
              </h3>
              <p className="text-xs font-tech text-zinc-400">
                Explore the comprehensive 15-minute long-form essay covering the full tournament context, collapse, and aftermath.
              </p>
            </div>
            <button
              onClick={() => handleOpenFullStory(story.slug)}
              className="shrink-0 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read the Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Table of Contents / Quick Jump */}
        <nav className="my-10 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-zinc-400 block mb-3">
            Chronicle Chapters
          </span>
          <div className="flex flex-wrap gap-2">
            {story.sections.map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-amber-300 text-xs font-tech transition-colors"
              >
                {idx + 1}. {section.heading}
              </a>
            ))}
          </div>
        </nav>

        {/* Story Narrative Sections */}
        <article className="prose-invert">
          {story.sections.map((section) => (
            <StorySection
              key={section.id}
              section={section}
              colorAccent={story.colorAccent}
            />
          ))}
        </article>

        {/* Editorial Footnote Callout */}
        {story.editorialNote && (
          <div className="my-12 p-5 rounded-2xl bg-amber-400/5 border border-amber-400/20 text-xs font-tech text-amber-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>{story.editorialNote}</p>
          </div>
        )}

        {/* Bottom Read Full Story CTA (Only when full story exists) */}
        {storyHasFullArticle && (
          <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-md shadow-[0_0_35px_rgba(245,158,11,0.08)]">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-tech uppercase tracking-[0.25em] text-amber-400 font-bold block">
                Looking for Deeper Historical Context?
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Read the Complete Long-Form Historical Essay
              </h3>
              <p className="text-xs font-tech text-zinc-400 leading-relaxed">
                Discover what the cricketing world was like in 1983, the lack of television broadcast, and how this untelevised miracle paved the road to Lord's.
              </p>
            </div>
            <button
              onClick={() => handleOpenFullStory(story.slug)}
              className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read the Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Related Stories & Pagination */}
        <RelatedStories
          currentSlug={story.slug}
          relatedStories={relatedStories}
          onSelectStory={onSelectStorySlug}
          previousStory={previousStory}
          nextStory={nextStory}
        />
      </main>

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
