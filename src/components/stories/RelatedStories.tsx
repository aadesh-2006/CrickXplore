import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StoryCard } from './StoryCard';
import type { CricketStory } from '../../types/stories';

interface RelatedStoriesProps {
  currentSlug: string;
  relatedStories: CricketStory[];
  onSelectStory: (slug: string) => void;
  previousStory?: CricketStory;
  nextStory?: CricketStory;
}

export const RelatedStories: React.FC<RelatedStoriesProps> = ({
  relatedStories,
  onSelectStory,
  previousStory,
  nextStory,
}) => {
  return (
    <div className="pt-16 border-t border-white/10 space-y-12">
      {/* Prev / Next Pagination Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previousStory ? (
          <button
            onClick={() => onSelectStory(previousStory.slug)}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 text-left transition-all group flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-tech uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
                Previous Chronicle
              </span>
              <span className="font-serif-luxury text-sm font-bold text-white group-hover:text-amber-300 transition-colors block line-clamp-1">
                {previousStory.player}: {previousStory.headlineScore}
              </span>
            </div>
          </button>
        ) : <div />}

        {nextStory ? (
          <button
            onClick={() => onSelectStory(nextStory.slug)}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 text-right transition-all group flex items-center justify-between sm:justify-end gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-tech uppercase tracking-wider text-zinc-400 flex items-center justify-end gap-1.5">
                Next Chronicle
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-serif-luxury text-sm font-bold text-white group-hover:text-amber-300 transition-colors block line-clamp-1">
                {nextStory.player}: {nextStory.headlineScore}
              </span>
            </div>
          </button>
        ) : <div />}
      </div>

      {/* More Stories Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-2xl font-black text-white">
            Explore More Chronicles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedStories.map((story) => (
            <StoryCard key={story.slug} story={story} onSelectStory={onSelectStory} />
          ))}
        </div>
      </div>
    </div>
  );
};
