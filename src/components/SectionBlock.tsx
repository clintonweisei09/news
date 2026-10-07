import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Article, NewsCategory } from '../types';

interface SectionBlockProps {
  title: string;
  category: NewsCategory;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onViewAll?: (category: NewsCategory) => void;
  accentColor?: string;
  isFullWidth?: boolean;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({
  title,
  category,
  articles,
  onSelectArticle,
  onViewAll,
  isFullWidth = false
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (articles.length === 0) return null;

  // Lead story is the first article, followed by remaining secondary articles
  const leadStory = articles[0];
  const secondaryStories = articles.slice(1, 7);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-5 pt-4 select-none w-full">
      
      {/* 1. Section Header: Full Width Header with Title & Red Accent */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2.5 w-full">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-6 bg-red-600 inline-block rounded-xs"></span>
          <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-slate-950">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Horizontal scroll track controls */}
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-white shadow-2xs">
            <button
              onClick={scrollLeft}
              className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-red-600 transition-colors"
              title="Previous posts"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-red-600 transition-colors"
              title="Next posts"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {onViewAll && (
            <button
              onClick={() => onViewAll(category)}
              className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider flex items-center gap-1 group transition-colors ml-1"
            >
              <span className="hidden sm:inline">View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Lead Story Card (Expansive horizontal format) */}
      {leadStory && (
        <div
          onClick={() => onSelectArticle(leadStory)}
          className={`border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-slate-400 hover:shadow-md transition-all cursor-pointer group flex flex-col ${
            isFullWidth ? 'lg:flex-row' : 'md:flex-row'
          } items-stretch w-full`}
        >
          {/* Main Visual Image */}
          <div className={`${isFullWidth ? 'lg:w-3/5' : 'md:w-3/5'} aspect-16/9 md:aspect-auto overflow-hidden bg-slate-100 relative shrink-0 min-h-[220px] lg:min-h-[260px]`}>
            <img
              src={leadStory.imageUrl}
              alt={leadStory.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-sm shadow-md">
              {leadStory.categoryLabel}
            </span>
            <span className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
              {leadStory.readTime}
            </span>
          </div>

          {/* Lead Content Text */}
          <div className={`${isFullWidth ? 'lg:w-2/5' : 'md:w-2/5'} p-5 sm:p-6 flex flex-col justify-between space-y-3 bg-white`}>
            <div className="space-y-2">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                {leadStory.kicker}
              </span>
              <h4 className="font-serif font-bold text-lg sm:text-2xl text-slate-950 group-hover:text-red-600 transition-colors leading-snug">
                {leadStory.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {leadStory.deck}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                {leadStory.author.avatar && (
                  <img
                    src={leadStory.author.avatar}
                    alt={leadStory.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300"
                  />
                )}
                <span className="font-sans font-medium text-slate-800 truncate max-w-[130px]">
                  {leadStory.author.name}
                </span>
              </div>
              <span className="text-red-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-sans">
                Read Story →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Secondary Posts Grid:
          - When isFullWidth is true: Displays all 6 posts horizontally across the screen in 6 columns on wide screens, covering horizontally without sidebars!
          - When not full-width: Displays in a 3-column layout or horizontal scroll.
      */}
      <div 
        ref={scrollRef}
        className={
          isFullWidth
            ? "grid grid-flow-col auto-cols-[280px] sm:auto-cols-[300px] lg:grid-flow-row lg:grid-cols-6 gap-4 overflow-x-auto pb-2 custom-scrollbar snap-x w-full"
            : "grid grid-flow-col auto-cols-[280px] sm:auto-cols-[310px] md:grid-flow-row md:grid-cols-3 gap-4.5 overflow-x-auto pb-2 custom-scrollbar snap-x w-full"
        }
      >
        {secondaryStories.map((story) => (
          <div
            key={story.id}
            onClick={() => onSelectArticle(story)}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between snap-start"
          >
            <div>
              {/* Media Thumbnail */}
              <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-slate-900/85 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-xs">
                  {story.categoryLabel}
                </span>
                <span className="absolute bottom-2 right-2 bg-black/75 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                  {story.readTime}
                </span>
              </div>

              {/* Title & Small Intercept/Excerpt */}
              <div className="p-3.5 space-y-1.5">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-tight block">
                  {story.kicker}
                </span>
                <h5 className="font-serif font-bold text-sm text-slate-950 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                  {story.title}
                </h5>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {story.deck}
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="px-3.5 pb-2.5 pt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {story.publishedAt}
              </span>
              <span className="text-red-600 font-bold group-hover:underline">
                Read Full →
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
