import React from 'react';
import { Sparkles } from 'lucide-react';
import { NewsCategory } from '../types';

interface HeaderProps {
  activeCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
  onOpenMonetization: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenMonetization
}) => {
  // All homepage category pages functional when clicked
  const topPages: { id: NewsCategory; label: string; isHighlight?: boolean }[] = [
    { id: 'top-stories', label: 'Top Stories' },
    { id: 'politics', label: 'Politics' },
    { id: 'scandals', label: 'Scandals' },
    { id: 'gossip', label: 'Gossip' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'technology', label: 'Technology' },
    { id: 'world', label: 'World News' },
    { id: 'sports', label: 'Sports' },
    { id: 'science-health', label: 'Science & Health' },
    { id: 'arts-culture', label: 'Arts & Culture' },
    { id: 'climate-energy', label: 'Climate & Energy' },
    { id: 'opinion', label: 'Opinion' },
    { id: 'corridors-of-power', label: 'Corridors of Power', isHighlight: true }
  ];

  const handleNavClick = (catId: NewsCategory) => {
    onSelectCategory(catId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-xs select-none">
      
      {/* Brand Bar */}
      <div className="max-w-[1780px] mx-auto px-4 lg:px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo: The AfricaN */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('top-stories');
            }}
            className="flex items-baseline gap-1 group"
          >
            <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-slate-950">
              The
            </span>
            <span className="font-sans font-black text-3xl sm:text-4xl tracking-tighter text-red-600 group-hover:text-red-700 transition-colors">
              AfricaN
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 mb-1 ml-0.5 animate-pulse"></span>
          </a>
        </div>

        {/* Right Action: Advertise CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMonetization}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Advertise with Us</span>
          </button>
        </div>
      </div>

      {/* Top Pages Navigation Bar */}
      <nav className="bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-[1780px] mx-auto px-4 lg:px-6 overflow-x-auto scrollbar-none flex items-center gap-1 sm:gap-1.5 py-1.5">
          {topPages.map((page) => {
            const isActive = activeCategory === page.id;
            return (
              <button
                key={page.id}
                onClick={() => handleNavClick(page.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all rounded-md ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : page.isHighlight
                    ? 'text-yellow-400 hover:text-white hover:bg-slate-800 font-extrabold'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800'
                }`}
              >
                {page.label}
              </button>
            );
          })}
        </div>
      </nav>

    </header>
  );
};
