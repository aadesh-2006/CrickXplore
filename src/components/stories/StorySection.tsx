import React from 'react';
import { Quote, Activity } from 'lucide-react';
import type { StorySection as StorySectionType, StoryColorAccent } from '../../types/stories';

interface StorySectionProps {
  section: StorySectionType;
  colorAccent: StoryColorAccent;
}

export const StorySection: React.FC<StorySectionProps> = ({ section, colorAccent }) => {
  return (
    <section id={section.id} className="py-10 border-b border-white/[0.06] last:border-b-0 space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          {section.heading}
        </h2>
        {section.subheading && (
          <p className={`font-tech text-xs sm:text-sm uppercase tracking-widest ${colorAccent.text} font-semibold`}>
            {section.subheading}
          </p>
        )}
      </div>

      {/* Section Body Paragraphs */}
      <div className="space-y-5 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed sm:leading-loose">
        {section.body.map((paragraph, idx) => (
          <p key={idx} className="first-letter:text-3xl first-letter:font-serif-luxury first-letter:text-amber-300 first-letter:mr-1">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Key Statistic Callout */}
      {section.keyStat && (
        <div className="my-8 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-5">
          <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-black text-white block">
              {section.keyStat.value}
            </span>
            <span className="font-tech text-xs uppercase tracking-wider text-zinc-400">
              {section.keyStat.label}
            </span>
          </div>
        </div>
      )}

      {/* Editorial Quote Block */}
      {section.quote && (
        <blockquote className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-400/5 to-transparent border-l-4 border-amber-400 text-left relative overflow-hidden">
          <Quote className="w-8 h-8 text-amber-400/20 absolute right-4 bottom-4" />
          <p className="font-serif-luxury text-lg sm:text-xl text-amber-100/95 italic leading-relaxed mb-3">
            “{section.quote.text}”
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs font-tech text-zinc-400">
            {section.quote.author && <span className="text-amber-300 font-bold">{section.quote.author}</span>}
            {section.quote.context && <span>• {section.quote.context}</span>}
          </div>
        </blockquote>
      )}
    </section>
  );
};
