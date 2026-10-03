import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, Calendar, MapPin, Trophy, ShieldCheck, Bookmark, Compass } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { StoryProgress } from '../components/stories/StoryProgress';
import { RelatedStories } from '../components/stories/RelatedStories';
import { getFullStoryBySlug, FULL_STORIES } from '../data/stories/fullStoriesCatalog';
import { CRICKET_STORIES, getRelatedStories } from '../data/stories/storyCatalog';
import type { AppView } from '../App';

interface FullStoryArticlePageProps {
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
  onSelectStorySlug: (slug: string, isFull?: boolean) => void;
  onBackToChronicle: () => void;
}

export const FullStoryArticlePage: React.FC<FullStoryArticlePageProps> = ({
  slug,
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
  onSelectStorySlug,
  onBackToChronicle,
}) => {
  const fullStory = getFullStoryBySlug(slug) || FULL_STORIES[0];
  const relatedStories = getRelatedStories(fullStory.slug, 3);

  const currentIndex = CRICKET_STORIES.findIndex((s) => s.slug === fullStory.slug);
  const previousStory = currentIndex > 0 ? CRICKET_STORIES[currentIndex - 1] : undefined;
  const nextStory = currentIndex < CRICKET_STORIES.length - 1 ? CRICKET_STORIES[currentIndex + 1] : undefined;

  // Filter sections with explicit headings for chapter numbering and table of contents
  const titledSections = fullStory.sections.filter((s) => Boolean(s.heading));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleReturnToChronicle = () => {
    onPlayTone();
    onBackToChronicle();
  };

  const handleBackToAllStories = () => {
    onPlayTone();
    onNavigateView('stories');
  };

  const renderInlineFormatted = (text: string) => {
    // Parse inline bolding **text** and *italic*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldContent = part.slice(2, -2);
        return (
          <strong key={index} className="font-bold text-amber-300 font-serif">
            {boldContent}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        const italicContent = part.slice(1, -1);
        return (
          <em key={index} className="italic text-amber-100/90 font-serif">
            {italicContent}
          </em>
        );
      }
      return part;
    });
  };

  const renderMarkdownTable = (tableText: string, key: number | string) => {
    const lines = tableText
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (lines.length < 2) return null;

    const parseRow = (rowStr: string) =>
      rowStr
        .split('|')
        .map((c) => c.trim())
        .filter((c, idx, arr) => (idx > 0 && idx < arr.length - 1) || (arr.length <= 2 && c.length > 0));

    const headerCols = parseRow(lines[0]);
    const isDivider = (l: string) => l.includes('---') || l.includes('---|');
    const dataLines = lines.slice(1).filter((l) => !isDivider(l));

    return (
      <div key={key} className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
        <table className="w-full text-left font-tech text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-amber-300 font-bold uppercase tracking-wider">
              {headerCols.map((col, idx) => (
                <th key={idx} className="py-3 px-4">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06] text-zinc-300">
            {dataLines.map((rowLine, rIdx) => {
              const cols = parseRow(rowLine);
              return (
                <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                  {cols.map((col, cIdx) => (
                    <td key={cIdx} className="py-2.5 px-4 font-mono text-xs sm:text-sm">
                      {renderInlineFormatted(col)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderBlockquote = (quoteText: string, key: number | string) => {
    const cleanText = quoteText.replace(/^>\s*/gm, '').trim();
    const subParas = cleanText.split('\n\n').filter((p) => p.trim().length > 0);

    return (
      <blockquote
        key={key}
        className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-400/[0.04] border-l-4 border-amber-400 text-amber-100 font-serif text-[17px] sm:text-[19px] italic leading-relaxed"
      >
        {subParas.map((para, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {renderInlineFormatted(para)}
          </p>
        ))}
      </blockquote>
    );
  };

  interface RenderBlock {
    type: 'paragraph' | 'table' | 'blockquote' | 'hr' | 'header' | 'highlight';
    content: string;
  }

  const groupSectionParagraphs = (paragraphs: string[]): RenderBlock[] => {
    const blocks: RenderBlock[] = [];
    let currentProse: string[] = [];

    const flushProse = () => {
      if (currentProse.length > 0) {
        blocks.push({
          type: 'paragraph',
          content: currentProse.join(' '),
        });
        currentProse = [];
      }
    };

    for (let i = 0; i < paragraphs.length; i++) {
      const raw = paragraphs[i];
      const text = raw.trim();
      if (!text) continue;

      // 1. HR
      if (text === '---' || text === '***') {
        flushProse();
        blocks.push({ type: 'hr', content: text });
        continue;
      }

      // 2. Table
      if (text.startsWith('|') || (text.includes('|') && text.includes('\n'))) {
        flushProse();
        blocks.push({ type: 'table', content: raw });
        continue;
      }

      // 3. Blockquote
      if (text.startsWith('>')) {
        flushProse();
        blocks.push({ type: 'blockquote', content: raw });
        continue;
      }

      // 4. Markdown Header
      if (text.startsWith('# ') || text.startsWith('## ') || text.startsWith('### ')) {
        flushProse();
        blocks.push({ type: 'header', content: text });
        continue;
      }

      // 5. Already an explicit multi-paragraph block (\n\n)
      if (raw.includes('\n\n')) {
        flushProse();
        const parts = raw.split('\n\n').map((p) => p.trim()).filter((p) => p.length > 0);
        for (const part of parts) {
          if (part.startsWith('|')) {
            blocks.push({ type: 'table', content: part });
          } else if (part.startsWith('>')) {
            blocks.push({ type: 'blockquote', content: part });
          } else {
            blocks.push({ type: 'paragraph', content: part });
          }
        }
        continue;
      }

      // 6. Check for special standalone items:
      const isColonIntro = text.endsWith(':');
      const isPureShortScoreOrStat =
        /^(\*\*)?(\d+[\*\/]?(\s*(runs|balls|fours|sixes))?)(\*\*)?[.,]?$/i.test(text) ||
        /^(\*\*)?(\d+(\.\d+)?)(\*\*)?[.,]?$/.test(text);
      const isSpecialPhrase =
        /^(\*\*)([^*]+)(\*\*)[.,!?:—]*$/.test(text) && text.length <= 40;
      const isShortDramaticToken =
        text.length <= 25 &&
        text.split(/\s+/).length <= 3 &&
        /^[A-Z*][a-zA-Z0-9\s—.'"]+[.?!—]?$/.test(text) &&
        !text.includes(',');

      const isAlreadyFullParagraph = text.length > 120 && text.split('. ').length >= 2;

      if (isAlreadyFullParagraph) {
        flushProse();
        blocks.push({ type: 'paragraph', content: text });
        continue;
      }

      if (isColonIntro || isPureShortScoreOrStat || isSpecialPhrase || isShortDramaticToken) {
        flushProse();
        blocks.push({
          type: isPureShortScoreOrStat || isSpecialPhrase ? 'highlight' : 'paragraph',
          content: text,
        });
        continue;
      }

      // Accumulate normal narrative prose
      const proseWordCount = currentProse.join(' ').split(/\s+/).length;
      if (proseWordCount >= 60) {
        flushProse();
      }
      currentProse.push(text);
    }

    flushProse();
    return blocks;
  };

  const renderBlock = (block: RenderBlock, bIdx: number | string) => {
    switch (block.type) {
      case 'hr':
        return <hr key={bIdx} className="my-8 border-t border-white/10" />;
      case 'table':
        return renderMarkdownTable(block.content, bIdx);
      case 'blockquote':
        return renderBlockquote(block.content, bIdx);
      case 'header': {
        const cleanHeading = block.content.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim();
        if (block.content.startsWith('# ')) {
          return (
            <div key={bIdx} className="my-6 p-4 sm:p-5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-center">
              <span className="font-serif-luxury text-2xl sm:text-4xl font-black text-amber-300 tracking-wide block drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                {cleanHeading}
              </span>
            </div>
          );
        }
        return (
          <h4 key={bIdx} className="font-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-400 font-bold mt-8 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{cleanHeading}</span>
          </h4>
        );
      }
      case 'highlight':
        return (
          <p
            key={bIdx}
            className="text-amber-300 font-serif-luxury text-xl sm:text-2xl font-bold leading-snug mb-5 sm:mb-6"
          >
            {renderInlineFormatted(block.content)}
          </p>
        );
      case 'paragraph':
      default:
        return (
          <p
            key={bIdx}
            className="text-zinc-300 font-serif text-[17px] sm:text-[19px] leading-[1.8] sm:leading-[1.85] tracking-normal mb-5 sm:mb-6"
          >
            {renderInlineFormatted(block.content)}
          </p>
        );
    }
  };

  let chapterCounter = 0;

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

      {/* Full Article Main Container - Width aligned with navbar content measure (~1000px) */}
      <main className="relative z-10 pt-36 md:pt-40 pb-28 px-6 sm:px-10 md:px-12 max-w-[1000px] mx-auto">
        {/* Navigation Actions Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleReturnToChronicle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 text-xs font-tech uppercase tracking-wider text-amber-300 hover:text-amber-200 transition-all cursor-pointer group shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Chronicle</span>
          </button>

          <button
            onClick={handleBackToAllStories}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 text-xs font-tech uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-zinc-400" />
            <span>All Stories</span>
          </button>
        </div>

        {/* Editorial Essay Header */}
        <header className="space-y-6 pb-12 border-b border-white/10 relative">
          {/* Ambient Glow */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-2xl h-72 rounded-full blur-[140px] pointer-events-none opacity-25"
            style={{ background: fullStory.colorAccent.primary }}
          />

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-amber-400/15 border border-amber-400/40 text-amber-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Bookmark className="w-3 h-3 text-amber-400" />
              Full Historical Essay
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1.5">
              <Trophy className="w-3 h-3 text-zinc-400" />
              {fullStory.year} • {fullStory.tournament.toUpperCase()}
            </span>
            <span className="text-xs font-tech text-zinc-400 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              {fullStory.readTime}
            </span>
          </div>

          {/* Player & Headline Score */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 pt-2">
            <div>
              <span className="text-xs font-tech uppercase tracking-[0.25em] text-amber-400/80 block mb-1">
                IMMORTAL WORLD CUP MASTERPIECE
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-black text-amber-300 uppercase tracking-wide">
                {fullStory.player}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-serif-luxury text-4xl sm:text-6xl font-black text-amber-400 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                {fullStory.headlineScore}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            {fullStory.title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif-luxury text-lg sm:text-2xl text-amber-100/90 italic leading-relaxed">
            {fullStory.subtitle}
          </p>

          {/* Match Context Details Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-tech text-zinc-400 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{fullStory.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{fullStory.venue}</span>
            </div>
            <div className="hidden sm:block text-zinc-600">•</div>
            <div className="text-zinc-400">
              {fullStory.matchContext}
            </div>
          </div>
        </header>

        {/* Table of Contents / Chapter Navigation */}
        {titledSections.length > 0 && (
          <nav className="my-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
            <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-amber-400 block mb-3 font-semibold">
              Full Essay Chapters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {titledSections.map((section, idx) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-amber-400/10 border border-transparent hover:border-amber-400/20 text-zinc-300 hover:text-amber-300 text-xs font-tech transition-all flex items-start gap-2"
                >
                  <span className="text-amber-400/70 shrink-0 font-mono text-[11px]">{String(idx + 1).padStart(2, '0')}.</span>
                  <span className="truncate">{section.heading}</span>
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Full Long-Form Narrative Body */}
        <article className="space-y-16 sm:space-y-20">
          {fullStory.sections.map((section) => {
            const hasHeading = Boolean(section.heading);
            if (hasHeading) {
              chapterCounter += 1;
            }

            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 relative flow-root"
              >
                {/* Section Header */}
                {hasHeading && (
                  <div className="space-y-2 border-b border-white/[0.06] pb-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="text-[10px] font-tech uppercase tracking-[0.25em] text-amber-400 font-bold">
                        Chapter {String(chapterCounter).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                      {section.heading}
                    </h2>
                    {section.subheading && (
                      <p className="text-sm font-tech uppercase tracking-wider text-amber-200/70">
                        {section.subheading}
                      </p>
                    )}
                  </div>
                )}

                {/* Floated Editorial Image (Direct sibling of paragraphs for natural text wrapping) */}
                {section.image && (
                  <figure
                    className={`float-none mb-6 mt-1 ${
                      section.image.float === 'left'
                        ? 'md:float-left md:w-[33%] md:max-w-[380px] md:mr-8 md:mb-6'
                        : 'md:float-right md:w-[58%] md:max-w-[640px] lg:w-[60%] lg:max-w-[680px] md:ml-8 md:mb-6'
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className="w-full h-auto object-contain block"
                        loading="lazy"
                      />
                    </div>
                  </figure>
                )}

                {/* Flowing Prose Paragraphs */}
                {groupSectionParagraphs(section.paragraphs).map((block, bIdx) => renderBlock(block, bIdx))}

                {/* Key Statistic Callout */}
                {section.keyStat && (
                  <div className="clear-both my-8 p-6 rounded-2xl bg-white/[0.02] border border-amber-400/25 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-zinc-400 block mb-1">
                          Historical Record
                        </span>
                        <span className="font-tech text-xs sm:text-sm text-amber-200/90 max-w-md block">
                          {section.keyStat.label}
                        </span>
                      </div>
                      <div className="shrink-0 text-left sm:text-right">
                        <span className="font-serif-luxury text-3xl sm:text-4xl font-black text-amber-400 drop-shadow-sm">
                          {section.keyStat.value}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pull Quote */}
                {section.pullQuote && (
                  <figure className="clear-both my-10 p-6 sm:p-8 rounded-2xl bg-amber-400/[0.04] border-l-4 border-amber-400 relative">
                    <blockquote className="font-serif-luxury text-lg sm:text-xl text-amber-100 italic leading-relaxed mb-3">
                      &ldquo;{section.pullQuote.text}&rdquo;
                    </blockquote>
                    {(section.pullQuote.author || section.pullQuote.context) && (
                      <figcaption className="text-xs font-tech uppercase tracking-wider text-amber-300/80 flex flex-wrap items-center gap-2">
                        {section.pullQuote.author && <span className="font-bold">{section.pullQuote.author}</span>}
                        {section.pullQuote.author && section.pullQuote.context && <span className="text-zinc-500">•</span>}
                        {section.pullQuote.context && <span className="text-zinc-400">{section.pullQuote.context}</span>}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            );
          })}
        </article>

        {/* Editorial Footnote Callout */}
        {fullStory.editorialNote && (
          <div className="mt-16 mb-12 p-6 rounded-2xl bg-amber-400/5 border border-amber-400/20 text-xs font-tech text-amber-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{fullStory.editorialNote}</p>
          </div>
        )}

        {/* Return to Chronicle Bottom Card */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-md shadow-[0_0_40px_rgba(245,158,11,0.1)]">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-tech uppercase tracking-[0.25em] text-amber-400 font-bold block">
              Finished Reading
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Explore the Visual Chronicle & Milestones
            </h3>
            <p className="text-xs font-tech text-zinc-400 leading-relaxed">
              Revisit the concise summary, key quotes, and archival metadata on the primary Chronicle page.
            </p>
          </div>
          <button
            onClick={handleReturnToChronicle}
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(245,158,11,0.35)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Chronicle</span>
          </button>
        </div>

        {/* Related Stories & Pagination */}
        <RelatedStories
          currentSlug={fullStory.slug}
          relatedStories={relatedStories}
          onSelectStory={(targetSlug) => onSelectStorySlug(targetSlug, false)}
          previousStory={previousStory}
          nextStory={nextStory}
        />
      </main>

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
