import React, { useState, useEffect } from 'react';
import { 
  TICKER_HEADLINES, 
  MAIN_SLIDER_ARTICLES, 
  ALL_SECTIONS_ARTICLES 
} from './data/mockNewsData';
import { Article, NewsCategory } from './types';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { MainSlider } from './components/MainSlider';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { SectionBlock } from './components/SectionBlock';
import { AdBanner } from './components/AdBanner';
import { FloatingAd } from './components/FloatingAd';
import { AnimatedFlashAd } from './components/AnimatedFlashAd';
import { ArticleModal } from './components/ArticleModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MonetizationDrawer } from './components/MonetizationDrawer';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('top-stories');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMonetizationOpen, setIsMonetizationOpen] = useState(false);
  const [isAdFreeMode, setIsAdFreeMode] = useState(false);

  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('african_saved_stories');
      return stored ? JSON.parse(stored) : ['slider-politics-summit'];
    } catch {
      return ['slider-politics-summit'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('african_saved_stories', JSON.stringify(savedArticleIds));
    } catch {
      // ignore storage errors
    }
  }, [savedArticleIds]);

  const handleToggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) => 
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleSelectArticleById = (articleId: string) => {
    const found = ALL_SECTIONS_ARTICLES.find((a) => a.id === articleId);
    if (found) {
      setSelectedArticle(found);
    }
  };

  // Helper filters for homepage sections (returns 7 posts per section)
  const getArticlesByCategory = (cat: NewsCategory) => {
    return ALL_SECTIONS_ARTICLES.filter((a) => a.category === cat).slice(0, 7);
  };

  const isBrowsingSpecificCategory = activeCategory !== 'top-stories';
  const categoryFilteredArticles = ALL_SECTIONS_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div id="top" className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. Header (Brand Logo "The AfricaN" + Top Pages) */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMonetization={() => setIsMonetizationOpen(true)}
      />

      {/* 2. India.com Style Flash News Ticker */}
      <NewsTicker
        headlines={TICKER_HEADLINES}
        onSelectHeadline={handleSelectArticleById}
      />

      {/* 3. Top Changing Leaderboard Banner Ad */}
      <div className="max-w-[1780px] mx-auto px-4 lg:px-6 w-full">
        <AdBanner
          slot="leaderboard"
          isAdFreeMode={isAdFreeMode}
          onOpenMonetization={() => setIsMonetizationOpen(true)}
        />
      </div>

      {/* 4. UPPER SECTION: Three-Column Layout with Sidebars
          - Left Sidebar: Fast Updates + Sponsored Ad + Club Madness (scrolls 5s) + 3D Ad Cube
          - Center Column: Top Stories + Politics & Governance + [1 Ad: AnimatedFlashAd] + Scandals & Whistleblowers
          - Right Sidebar: Most Read + Companion ad + CORRIDORS OF POWER + 3D Ad Cube + Popular Posts
      */}
      <div className="max-w-[1780px] mx-auto px-4 lg:px-6 w-full flex-1 pb-10">
        
        {isBrowsingSpecificCategory ? (
          /* Specific Category Dedicated View */
          <div className="space-y-6">
            <div className="pb-3 border-b-2 border-slate-900 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-red-600">News Desk</span>
                <h2 className="font-serif text-3xl font-bold text-slate-950 capitalize mt-0.5">
                  {activeCategory.replace('-', ' ')}
                </h2>
              </div>
              <button
                onClick={() => setActiveCategory('top-stories')}
                className="text-xs uppercase font-bold text-red-600 hover:text-red-800"
              >
                ← All Sections
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryFilteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="border border-slate-200 rounded-2xl p-4 bg-white hover:border-slate-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {art.imageUrl && (
                      <div className="aspect-16/10 rounded-xl overflow-hidden bg-slate-100 relative">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-red-600 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-xs shadow-xs">
                          {art.categoryLabel}
                        </span>
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                          {art.readTime}
                        </span>
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-tight block">
                      {art.kicker}
                    </span>
                    <h3 className="font-serif font-bold text-base text-slate-950 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {art.deck}
                    </p>
                  </div>
                  <div className="pt-3 text-[11px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100 mt-3">
                    <span>{art.publishedAt}</span>
                    <span className="text-red-600 font-bold group-hover:translate-x-0.5 transition-transform">Read Full Story →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Top 3-Column Grid with Left Sidebar, Center Hero & Politics & Scandals, and Right Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT SIDEBAR (NON-STICKY: Fast Updates, Sponsored Ad, Club Madness auto-scrolling 5s, 3D Ad Cube) */}
              <div className="hidden lg:block lg:col-span-3">
                <LeftSidebar
                  onSelectUpdate={handleSelectArticleById}
                  onSelectArticle={(art) => setSelectedArticle(art)}
                  isAdFreeMode={isAdFreeMode}
                  onOpenMonetization={() => setIsMonetizationOpen(true)}
                />
              </div>

              {/* MAIN CENTER COLUMN (Top Stories, Politics, Scandals) */}
              <main className="lg:col-span-6 space-y-10">
                
                {/* 1. TOP STORIES SECTION & MAIN HERO SLIDER */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2">
                    <span className="w-2.5 h-6 bg-red-600 inline-block"></span>
                    <h3 className="font-sans font-black text-xl uppercase tracking-tight text-slate-950">
                      Top Stories
                    </h3>
                  </div>

                  <MainSlider
                    sliderArticles={MAIN_SLIDER_ARTICLES}
                    trendingArticles={ALL_SECTIONS_ARTICLES}
                    onSelectArticle={(art) => setSelectedArticle(art)}
                    onToggleBookmark={handleToggleBookmark}
                    savedArticleIds={savedArticleIds}
                  />

                  {/* Top Stories Section (7 posts) */}
                  <SectionBlock
                    title="Top Stories Today"
                    category="top-stories"
                    articles={getArticlesByCategory('top-stories')}
                    onSelectArticle={(art) => setSelectedArticle(art)}
                    onViewAll={(cat) => setActiveCategory(cat)}
                  />
                </div>

                {/* 2. POLITICS & GOVERNANCE SECTION */}
                <SectionBlock
                  title="Politics & Governance"
                  category="politics"
                  articles={getArticlesByCategory('politics')}
                  onSelectArticle={(art) => setSelectedArticle(art)}
                  onViewAll={(cat) => setActiveCategory(cat)}
                />

                {/* SINGLE SPONSORED AD BETWEEN POLITICS & SCANDALS PER USER INSTRUCTIONS */}
                <AnimatedFlashAd
                  isAdFreeMode={isAdFreeMode}
                  onOpenMonetization={() => setIsMonetizationOpen(true)}
                />

                {/* 3. SCANDALS & WHISTLEBLOWER INVESTIGATIONS SECTION */}
                <SectionBlock
                  title="Scandals & Whistleblower Investigations"
                  category="scandals"
                  articles={getArticlesByCategory('scandals')}
                  onSelectArticle={(art) => setSelectedArticle(art)}
                  onViewAll={(cat) => setActiveCategory(cat)}
                />

              </main>

              {/* RIGHT SIDEBAR (NON-STICKY: Most Read Today, Companion ad, CORRIDORS OF POWER, 3D Cube alone to spin, Popular Posts) */}
              <div className="hidden lg:block lg:col-span-3">
                <RightSidebar
                  onSelectArticle={(art) => setSelectedArticle(art)}
                  isAdFreeMode={isAdFreeMode}
                  onOpenMonetization={() => setIsMonetizationOpen(true)}
                />
              </div>

            </div>

            {/* LOWER FULL-WIDTH HORIZONTAL SECTIONS:
                As instructed: "Remove world news & continental diplomacy section, and let sections of gossip & whispers,
                entertainment & celebrity, technology & innovation, sports arena, science and health, arts and culture,
                to display horizontally not centered as we are not going to add any sidebar, let them cover horizontally"
            */}
            <div className="w-full space-y-12 mt-12 pt-8 border-t-2 border-slate-900/10">
              
              {/* 4. GOSSIP & WHISPERS (Full-Width Horizontal Coverage) */}
              <SectionBlock
                title="Gossip & Whispers"
                category="gossip"
                articles={getArticlesByCategory('gossip')}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onViewAll={(cat) => setActiveCategory(cat)}
                isFullWidth={true}
              />

              {/* AD PLACED DIRECTLY ABOVE ENTERTAINMENT & CELEBRITY PER INSTRUCTIONS */}
              <AdBanner
                slot="midpage"
                isAdFreeMode={isAdFreeMode}
                onOpenMonetization={() => setIsMonetizationOpen(true)}
              />

              {/* 5. ENTERTAINMENT & CELEBRITY (Full-Width Horizontal Coverage) */}
              <SectionBlock
                title="Entertainment & Celebrity"
                category="entertainment"
                articles={getArticlesByCategory('entertainment')}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onViewAll={(cat) => setActiveCategory(cat)}
                isFullWidth={true}
              />

              {/* 6. TECHNOLOGY & INNOVATION (Full-Width Horizontal Coverage) */}
              <SectionBlock
                title="Technology & Innovation"
                category="technology"
                articles={getArticlesByCategory('technology')}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onViewAll={(cat) => setActiveCategory(cat)}
                isFullWidth={true}
              />

              {/* IN-FEED NATIVE SPONSORED STORY (With its OWN Emerald & Slate Gradient Background!) */}
              {!isAdFreeMode && (
                <div 
                  onClick={() => handleSelectArticleById('tech-fintech-1')}
                  className="border-2 border-emerald-500/60 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl cursor-pointer hover:border-yellow-400 transition-all group w-full"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-emerald-400 mb-2">
                    <span className="text-yellow-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>SPONSORED ENTERPRISE SPOTLIGHT</span>
                    </span>
                    <span className="font-mono text-emerald-300">Continental Paid Partnership</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="flex-1 space-y-1.5">
                      <h4 className="font-serif font-bold text-lg sm:text-2xl text-white group-hover:text-yellow-300 transition-colors leading-snug">
                        Safaricom 5G & M-Pesa Global: Connecting Across the Continent with Lightning Speed
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                        Experience ultra-fast 5G enterprise broadband and zero-fee continental mobile money transfers powering Africa's digital expansion.
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-xs text-emerald-300 font-mono">
                        <span className="font-bold text-white font-sans">Safaricom Enterprise</span>
                        <span>·</span>
                        <span>3 min read</span>
                        <span>·</span>
                        <span className="text-yellow-400 font-bold">Pan-African High Speed</span>
                      </div>
                    </div>

                    <div className="w-full sm:w-48 h-28 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-white/20 shadow-md">
                      <img
                        src="/src/assets/images/african_fintech_hub_1791232334696.jpg"
                        alt="Sponsor"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 7. SPORTS ARENA & FOOTBALL (Full-Width Horizontal Coverage) */}
              <SectionBlock
                title="Sports Arena & Football"
                category="sports"
                articles={getArticlesByCategory('sports')}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onViewAll={(cat) => setActiveCategory(cat)}
                isFullWidth={true}
              />

              {/* 8. SCIENCE & HEALTH (Full-Width Horizontal Coverage) */}
              <SectionBlock
                title="Science & Health"
                category="science-health"
                articles={getArticlesByCategory('science-health')}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onViewAll={(cat) => setActiveCategory(cat)}
                isFullWidth={true}
              />

              {/* 9. ARTS & CULTURE (Full-Width Horizontal Coverage) */}
              <SectionBlock
                title="Arts & Culture"
                category="arts-culture"
                articles={getArticlesByCategory('arts-culture')}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onViewAll={(cat) => setActiveCategory(cat)}
                isFullWidth={true}
              />

            </div>
          </>
        )}

      </div>

      {/* 5. Floating Bottom Right Sponsor Widget (Animated) */}
      <FloatingAd
        isAdFreeMode={isAdFreeMode}
        onOpenMonetization={() => setIsMonetizationOpen(true)}
      />

      {/* 6. Mobile Sticky Bottom Ad Banner */}
      <AdBanner
        slot="mobile_sticky"
        isAdFreeMode={isAdFreeMode}
        onOpenMonetization={() => setIsMonetizationOpen(true)}
      />

      {/* 7. Mobile Bottom Dock */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
        }}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setActiveCategory('top-stories')}
        leftSidebarElement={
          <LeftSidebar
            onSelectUpdate={handleSelectArticleById}
            onSelectArticle={(art) => setSelectedArticle(art)}
            isAdFreeMode={isAdFreeMode}
            onOpenMonetization={() => setIsMonetizationOpen(true)}
          />
        }
        rightSidebarElement={
          <RightSidebar
            onSelectArticle={(art) => setSelectedArticle(art)}
            isAdFreeMode={isAdFreeMode}
            onOpenMonetization={() => setIsMonetizationOpen(true)}
          />
        }
      />

      {/* 8. Article Reading Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={savedArticleIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          isAdFreeMode={isAdFreeMode}
          onOpenMonetization={() => setIsMonetizationOpen(true)}
        />
      )}

      {/* 9. Monetization & Ad-Free Subscription Drawer */}
      <MonetizationDrawer
        isOpen={isMonetizationOpen}
        onClose={() => setIsMonetizationOpen(false)}
        isAdFreeMode={isAdFreeMode}
        onToggleAdFree={() => setIsAdFreeMode(!isAdFreeMode)}
      />

      {/* 10. Modern Newspaper Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 text-white py-12 text-xs select-none">
        <div className="max-w-[1780px] mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-black text-xl text-white">The</span>
              <span className="font-sans font-black text-2xl text-red-600">AfricaN</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Africa's premier digital news publication covering high-stakes politics, corridors of power court cases, entertainment gossip, technology, and investigative journalism.
            </p>
            <p className="text-[10px] font-mono text-slate-500">
              Nairobi · Johannesburg · Lagos · Cairo · Accra · London
            </p>
          </div>

          <div>
            <h6 className="font-mono uppercase tracking-wider text-[11px] font-bold text-red-500 mb-3">
              Homepage Sections
            </h6>
            <ul className="space-y-2 text-slate-300">
              <li><button onClick={() => setActiveCategory('politics')} className="hover:text-white transition-colors">Politics & State House</button></li>
              <li><button onClick={() => setActiveCategory('scandals')} className="hover:text-white transition-colors">Scandals & Whistleblowers</button></li>
              <li><button onClick={() => setActiveCategory('gossip')} className="hover:text-white transition-colors">Gossip & Whispers</button></li>
              <li><button onClick={() => setActiveCategory('entertainment')} className="hover:text-white transition-colors">Entertainment & Celebrity</button></li>
              <li><button onClick={() => setActiveCategory('technology')} className="hover:text-white transition-colors">Technology & Innovation</button></li>
            </ul>
          </div>

          <div>
            <h6 className="font-mono uppercase tracking-wider text-[11px] font-bold text-red-500 mb-3">
              More Desks
            </h6>
            <ul className="space-y-2 text-slate-300">
              <li><button onClick={() => setActiveCategory('sports')} className="hover:text-white transition-colors">Sports Arena & Football</button></li>
              <li><button onClick={() => setActiveCategory('science-health')} className="hover:text-white transition-colors">Science & Health</button></li>
              <li><button onClick={() => setActiveCategory('arts-culture')} className="hover:text-white transition-colors">Arts & Culture</button></li>
              <li><button onClick={() => setActiveCategory('top-stories')} className="hover:text-white transition-colors">All Desks</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h6 className="font-mono uppercase tracking-wider text-[11px] font-bold text-red-500 mb-3">
              Commercial & Compliance
            </h6>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              The AfricaN complies with IAB international display standards. All sponsored content is clearly disclosed.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-mono">
              © 2026 The AfricaN Media Trust. All rights reserved.
            </div>
            <div className="pt-1.5 text-xs font-bold text-yellow-400 font-mono flex items-center gap-1.5">
              <span>✦</span>
              <span>Designed by Clinton weisei</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
