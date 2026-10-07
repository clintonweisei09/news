import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface FloatingCubeAdProps {
  isAdFreeMode: boolean;
  onOpenMonetization: () => void;
  variant?: 'luxury' | 'nightlife';
  className?: string;
}

interface CubeFace {
  id: string;
  sponsor: string;
  category: string;
  tagline: string;
  highlight: string;
  ctaText: string;
  bgGradient: string;
  borderColor: string;
  badgeBg: string;
  icon: string;
}

// 1. Luxury & Sovereign Showcase (Right rail cube) - 6 distinct faces, EACH with its OWN background color!
const LUXURY_CUBE_FACES: CubeFace[] = [
  {
    id: 'face-front',
    sponsor: 'Mercedes-AMG Vision EQ',
    category: 'Luxury Automotive',
    tagline: 'Electric Performance Revolution. 0-100 km/h in 2.2s',
    highlight: 'VIP Test Drives in Nairobi, Lagos & Johannesburg',
    ctaText: 'Book Test Drive',
    bgGradient: 'from-blue-900 via-indigo-950 to-slate-950',
    borderColor: 'border-blue-400/80',
    badgeBg: 'bg-blue-400 text-slate-950',
    icon: '🏎️'
  },
  {
    id: 'face-right',
    sponsor: 'Cartier African Haute Couture',
    category: 'High Jewellery',
    tagline: 'Ancestral Gold Filigree & Hand-Crafted Chronographs',
    highlight: 'Exclusive Runway Pieces at Flagship Boutiques',
    ctaText: 'View High Jewellery',
    bgGradient: 'from-emerald-800 via-teal-950 to-slate-950',
    borderColor: 'border-emerald-400/80',
    badgeBg: 'bg-emerald-400 text-slate-950',
    icon: '💎'
  },
  {
    id: 'face-back',
    sponsor: 'Standard Chartered Private Wealth',
    category: 'Private Banking',
    tagline: 'Offshore Family Office Portfolios & Multi-Currency',
    highlight: 'Dedicated Wealth Director · Zero-Fee Remittances',
    ctaText: 'Open Wealth Account',
    bgGradient: 'from-rose-900 via-red-950 to-slate-950',
    borderColor: 'border-rose-400/80',
    badgeBg: 'bg-rose-500 text-white',
    icon: '💳'
  },
  {
    id: 'face-left',
    sponsor: 'Eko Atlantic Marina Towers',
    category: 'Ultra-Luxury Real Estate',
    tagline: 'Oceanfront Sky Penthouses with Helipads & Yacht Berths',
    highlight: '12% Guaranteed Annual Yield · Prime Title Deeds',
    ctaText: 'Inquire on Penthouse',
    bgGradient: 'from-amber-700 via-orange-950 to-slate-950',
    borderColor: 'border-amber-400/80',
    badgeBg: 'bg-amber-400 text-black',
    icon: '🏙️'
  },
  {
    id: 'face-top',
    sponsor: 'Zanzibar Serena Coral Resort',
    category: 'Island Resorts',
    tagline: 'Private Overwater Island Villas & Coral Reef Sanctuary',
    highlight: 'Complimentary Seaplane Transfer with Stays',
    ctaText: 'Reserve Island Suite',
    bgGradient: 'from-purple-800 via-violet-950 to-slate-950',
    borderColor: 'border-purple-400/80',
    badgeBg: 'bg-purple-400 text-black',
    icon: '🏖️'
  },
  {
    id: 'face-bottom',
    sponsor: 'Starbucks Reserve African Roasts',
    category: 'Artisanal Coffee',
    tagline: 'Rare Single-Origin Yirgacheffe & Mount Kenya Lots',
    highlight: 'Nitro Pour-Overs at Flagship Reserve Lounges',
    ctaText: 'Find Reserve Lounge',
    bgGradient: 'from-yellow-800 via-amber-950 to-stone-950',
    borderColor: 'border-yellow-400/80',
    badgeBg: 'bg-yellow-400 text-black',
    icon: '☕'
  }
];

// 2. Nightlife & Kenyan Club Scene Cube (Left rail below Club Madness) - 6 distinct faces!
const NIGHTLIFE_CUBE_FACES: CubeFace[] = [
  {
    id: 'night-front',
    sponsor: 'Tusker Malt & Premium Cider',
    category: 'Premium Brew',
    tagline: 'Pure 100% African Golden Malt for Club Legends',
    highlight: 'Special Buckets at Quiver, Alchemist & Milan',
    ctaText: 'Order Club Bucket',
    bgGradient: 'from-amber-600 via-yellow-900 to-stone-950',
    borderColor: 'border-amber-400/80',
    badgeBg: 'bg-amber-400 text-slate-950',
    icon: '🍺'
  },
  {
    id: 'night-right',
    sponsor: 'Johnnie Walker Blue Label',
    category: 'Ultra-Luxury Whisky',
    tagline: 'Keep Walking Nairobi. Handcrafted Rare Casks',
    highlight: 'VIP Bottle Service with Custom Ice Sculptures',
    ctaText: 'Reserve VIP Bottle',
    bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    borderColor: 'border-cyan-400/80',
    badgeBg: 'bg-cyan-400 text-slate-950',
    icon: '🥃'
  },
  {
    id: 'night-back',
    sponsor: 'Moët & Chandon Nectar',
    category: 'Champagne Lounge',
    tagline: 'The Crown of Nairobi Nightlife Celebrations',
    highlight: 'Champagne Trains with Sparklers at Midnight',
    ctaText: 'Order Magnum Bottle',
    bgGradient: 'from-yellow-950 via-stone-900 to-black',
    borderColor: 'border-yellow-300/80',
    badgeBg: 'bg-yellow-400 text-black',
    icon: '🍾'
  },
  {
    id: 'night-left',
    sponsor: 'Uber VIP Black Nairobi',
    category: 'Safe Night Rides',
    tagline: 'Chauffeured Luxury Sedans Ready Outside All Clubs',
    highlight: 'Zero Surge on Pre-Booked Midnight Club Pickups',
    ctaText: 'Book VIP Chauffeur',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    borderColor: 'border-emerald-400/80',
    badgeBg: 'bg-emerald-400 text-slate-950',
    icon: '🚘'
  },
  {
    id: 'night-top',
    sponsor: 'Red Bull Night Edition',
    category: 'Energy & Mixers',
    tagline: 'Vitalizes Mind & Body for All-Night DJ Sets',
    highlight: 'Available at All Main Bars & Cocktails Stations',
    ctaText: 'Grab Red Bull Mix',
    bgGradient: 'from-rose-900 via-purple-950 to-slate-950',
    borderColor: 'border-rose-400/80',
    badgeBg: 'bg-rose-400 text-white',
    icon: '⚡'
  },
  {
    id: 'night-bottom',
    sponsor: 'Spotify Afro-Beats Live',
    category: 'Club Anthems',
    tagline: 'Stream Tonight’s Kenyan & Amapiano Club Playlists',
    highlight: 'Exclusive Live DJ Sets from Alchemist & 1824',
    ctaText: 'Listen on Spotify',
    bgGradient: 'from-green-800 via-emerald-950 to-black',
    borderColor: 'border-green-400/80',
    badgeBg: 'bg-green-400 text-slate-950',
    icon: '🎧'
  }
];

export const FloatingCubeAd: React.FC<FloatingCubeAdProps> = ({
  isAdFreeMode,
  onOpenMonetization,
  variant = 'luxury',
  className = ''
}) => {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const cubeFaces = variant === 'nightlife' ? NIGHTLIFE_CUBE_FACES : LUXURY_CUBE_FACES;

  // Multi-directional rotation steps: up, down, left, right across all 6 faces!
  const rotationSteps = [
    { x: 0, y: 0 },       // Front
    { x: 0, y: -90 },     // Right
    { x: -90, y: -90 },   // Top
    { x: 0, y: -180 },    // Back
    { x: 90, y: -180 },   // Bottom
    { x: 0, y: -270 },    // Left
    { x: 90, y: 0 },      // Down tilt
    { x: -90, y: 0 }      // Up tilt
  ];

  // Auto-spin smoothly every 3.5 seconds
  useEffect(() => {
    if (isAdFreeMode) return;

    let step = 0;
    const timer = setInterval(() => {
      step = (step + 1) % rotationSteps.length;
      setRotX(rotationSteps[step].x);
      setRotY(rotationSteps[step].y);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAdFreeMode]);

  if (isAdFreeMode) return null;

  return (
    /* LEAVE THE CUBE ALONE TO SPIN: No surrounding frame, no header, no buttons, no borders! */
    <div className={`w-full py-4 flex flex-col items-center justify-center select-none overflow-visible relative ${className}`}>
      
      {/* 3D Floating Scene Container with Smooth 3D Transition */}
      <div 
        className="perspective-1000 py-4 flex flex-col items-center justify-center w-full cursor-pointer"
        onClick={onOpenMonetization}
        title="Click to explore offer"
      >
        {/* Floating Levitation Wrapper */}
        <div className="animate-float-levitate transform-style-3d relative w-[230px] h-[165px] flex items-center justify-center">
          
          {/* 3D True 6-Sided Cube Box with Silky Smooth 3D Transition */}
          <div
            className="w-full h-full transform-style-3d cursor-pointer"
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: 'transform 1.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {/* FACE 1: FRONT */}
            <div
              className={`absolute inset-0 rounded-2xl p-3.5 border-2 ${cubeFaces[0].borderColor} bg-gradient-to-br ${cubeFaces[0].bgGradient} flex flex-col justify-between shadow-2xl backface-hidden text-white`}
              style={{ transform: 'translateZ(105px)' }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase ${cubeFaces[0].badgeBg}`}>
                  {cubeFaces[0].category}
                </span>
                <span className="text-xl">{cubeFaces[0].icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-white leading-tight font-sans">
                  {cubeFaces[0].sponsor}
                </h4>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-snug">
                  {cubeFaces[0].tagline}
                </p>
                <div className="text-[9px] text-yellow-300 font-mono font-medium truncate">
                  {cubeFaces[0].highlight}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[9px]">
                <span className="text-yellow-400 font-bold flex items-center gap-0.5">
                  {cubeFaces[0].ctaText} →
                </span>
                <span className="text-slate-400 font-mono text-[8px] uppercase">Sponsored</span>
              </div>
            </div>

            {/* FACE 2: RIGHT */}
            <div
              className={`absolute inset-0 rounded-2xl p-3.5 border-2 ${cubeFaces[1].borderColor} bg-gradient-to-br ${cubeFaces[1].bgGradient} flex flex-col justify-between shadow-2xl backface-hidden text-white`}
              style={{ transform: 'rotateY(90deg) translateZ(105px)' }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase ${cubeFaces[1].badgeBg}`}>
                  {cubeFaces[1].category}
                </span>
                <span className="text-xl">{cubeFaces[1].icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-white leading-tight font-sans">
                  {cubeFaces[1].sponsor}
                </h4>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-snug">
                  {cubeFaces[1].tagline}
                </p>
                <div className="text-[9px] text-yellow-300 font-mono font-medium truncate">
                  {cubeFaces[1].highlight}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[9px]">
                <span className="text-yellow-400 font-bold flex items-center gap-0.5">
                  {cubeFaces[1].ctaText} →
                </span>
                <span className="text-slate-400 font-mono text-[8px] uppercase">Sponsored</span>
              </div>
            </div>

            {/* FACE 3: BACK */}
            <div
              className={`absolute inset-0 rounded-2xl p-3.5 border-2 ${cubeFaces[2].borderColor} bg-gradient-to-br ${cubeFaces[2].bgGradient} flex flex-col justify-between shadow-2xl backface-hidden text-white`}
              style={{ transform: 'rotateY(180deg) translateZ(105px)' }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase ${cubeFaces[2].badgeBg}`}>
                  {cubeFaces[2].category}
                </span>
                <span className="text-xl">{cubeFaces[2].icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-white leading-tight font-sans">
                  {cubeFaces[2].sponsor}
                </h4>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-snug">
                  {cubeFaces[2].tagline}
                </p>
                <div className="text-[9px] text-yellow-300 font-mono font-medium truncate">
                  {cubeFaces[2].highlight}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[9px]">
                <span className="text-yellow-400 font-bold flex items-center gap-0.5">
                  {cubeFaces[2].ctaText} →
                </span>
                <span className="text-slate-400 font-mono text-[8px] uppercase">Sponsored</span>
              </div>
            </div>

            {/* FACE 4: LEFT */}
            <div
              className={`absolute inset-0 rounded-2xl p-3.5 border-2 ${cubeFaces[3].borderColor} bg-gradient-to-br ${cubeFaces[3].bgGradient} flex flex-col justify-between shadow-2xl backface-hidden text-white`}
              style={{ transform: 'rotateY(-90deg) translateZ(105px)' }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase ${cubeFaces[3].badgeBg}`}>
                  {cubeFaces[3].category}
                </span>
                <span className="text-xl">{cubeFaces[3].icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-white leading-tight font-sans">
                  {cubeFaces[3].sponsor}
                </h4>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-snug">
                  {cubeFaces[3].tagline}
                </p>
                <div className="text-[9px] text-yellow-300 font-mono font-medium truncate">
                  {cubeFaces[3].highlight}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[9px]">
                <span className="text-yellow-400 font-bold flex items-center gap-0.5">
                  {cubeFaces[3].ctaText} →
                </span>
                <span className="text-slate-400 font-mono text-[8px] uppercase">Sponsored</span>
              </div>
            </div>

            {/* FACE 5: TOP */}
            <div
              className={`absolute inset-0 rounded-2xl p-3.5 border-2 ${cubeFaces[4].borderColor} bg-gradient-to-br ${cubeFaces[4].bgGradient} flex flex-col justify-between shadow-2xl backface-hidden text-white`}
              style={{ transform: 'rotateX(90deg) translateZ(105px)' }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase ${cubeFaces[4].badgeBg}`}>
                  {cubeFaces[4].category}
                </span>
                <span className="text-xl">{cubeFaces[4].icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-white leading-tight font-sans">
                  {cubeFaces[4].sponsor}
                </h4>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-snug">
                  {cubeFaces[4].tagline}
                </p>
                <div className="text-[9px] text-yellow-300 font-mono font-medium truncate">
                  {cubeFaces[4].highlight}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[9px]">
                <span className="text-yellow-400 font-bold flex items-center gap-0.5">
                  {cubeFaces[4].ctaText} →
                </span>
                <span className="text-slate-400 font-mono text-[8px] uppercase">Sponsored</span>
              </div>
            </div>

            {/* FACE 6: BOTTOM */}
            <div
              className={`absolute inset-0 rounded-2xl p-3.5 border-2 ${cubeFaces[5].borderColor} bg-gradient-to-br ${cubeFaces[5].bgGradient} flex flex-col justify-between shadow-2xl backface-hidden text-white`}
              style={{ transform: 'rotateX(-90deg) translateZ(105px)' }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase ${cubeFaces[5].badgeBg}`}>
                  {cubeFaces[5].category}
                </span>
                <span className="text-xl">{cubeFaces[5].icon}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-white leading-tight font-sans">
                  {cubeFaces[5].sponsor}
                </h4>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-snug">
                  {cubeFaces[5].tagline}
                </p>
                <div className="text-[9px] text-yellow-300 font-mono font-medium truncate">
                  {cubeFaces[5].highlight}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[9px]">
                <span className="text-yellow-400 font-bold flex items-center gap-0.5">
                  {cubeFaces[5].ctaText} →
                </span>
                <span className="text-slate-400 font-mono text-[8px] uppercase">Sponsored</span>
              </div>
            </div>

          </div>
        </div>

        {/* Breathing Levitation Shadow */}
        <div className="w-28 h-2 bg-red-600/35 rounded-full blur-md animate-shadow-breath mt-4"></div>
      </div>
    </div>
  );
};
