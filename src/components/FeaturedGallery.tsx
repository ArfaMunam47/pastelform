import React from 'react';
import { Eye, ShoppingBag, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface FeaturedGalleryProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const FeaturedGallery: React.FC<FeaturedGalleryProps> = ({
  products,
  onOpenProduct,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = []
}) => {
  // 3 distinct signature pieces that do NOT repeat the hero chair:
  // 1. Wave Modular Sofa (prod-sofa-ondulation)
  // 2. Kanso Honey Sculptural Dining Chair (prod-chair-kanso)
  // 3. Venezia Fluted Credenza (prod-credenza-venezia)
  const signatureSofa = products.find(p => p.id === 'prod-sofa-ondulation') || products[1];
  const featuredChair = products.find(p => p.id === 'prod-chair-kanso') || products.find(p => p.category === 'Dining Chairs') || products[4];
  const flutedCredenza = products.find(p => p.id === 'prod-credenza-venezia') || products[12] || products[3];

  return (
    <section
      id="featured-gallery-section"
      className="py-24 px-4 sm:px-6 lg:px-10 transition-colors duration-700 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAF8F4 0%, #F4F1E9 50%, #ECE7DD 100%)'
      }}
    >
      {/* Soft atmospheric ambient glow */}
      <div className="max-w-7xl mx-auto">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8A67B5]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
                Signature Gallery
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight">
              Curated Sculptural Monuments
            </h2>
          </div>
          <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-md">
            Individual architectural artifacts presented in pure 3D space to celebrate tactile permanence and organic contours.
          </p>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Piece 1: Large Span (7 Cols) — Ondulation Modular Wave Sofa */}
          <div
            id={`gallery-pod-${signatureSofa.id}`}
            onClick={() => onOpenProduct(signatureSofa)}
            className="lg:col-span-7 group relative rounded-[36px] bg-[#FAF8F5]/90 hover:bg-[#FDFCFA] border border-black/5 hover:border-black/10 p-7 sm:p-10 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
          >
            {/* Top Meta */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/5 text-[#182030] text-[10px] font-bold tracking-wider uppercase">
                  Monumental Centerpiece
                </span>
                <span className="text-xs text-[#6A7382] font-mono">
                  No. 01
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {onToggleWishlist && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(signatureSofa);
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-[#6A7382] hover:text-[#182030] shadow-xs"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.includes(signatureSofa.id) ? 'fill-[#C95332] text-[#C95332]' : ''}`} />
                  </button>
                )}
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#182030] text-white group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* The Isolated 3D Stage (Clean Transparent Alpha Canvas) */}
            <div
              className="relative w-full h-80 sm:h-96 flex items-center justify-center p-6 my-4 bg-transparent overflow-visible select-none"
              style={{ perspective: '1200px' }}
            >
              {/* Isolated 3D Sofa with Dimensional Hover Projection */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ease-out"
                style={{
                  transform: 'perspective(1200px) rotateX(2deg) rotateY(-3deg) translateZ(10px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src={signatureSofa.colorVariants[0]?.image || signatureSofa.images[0]}
                  alt={signatureSofa.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[92%] max-w-[92%] object-contain select-none transition-all duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute bottom-2 left-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/90 text-[#182030] border border-black/5 shadow-xs">
                  Sculptural Curve
                </span>
              </div>
            </div>

            {/* Bottom Content & Price */}
            <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A8598] block mb-1">
                  {signatureSofa.category} • Hand-Tailored
                </span>
                <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#141A26]">
                  {signatureSofa.name}
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#556075] mt-1 max-w-md">
                  {signatureSofa.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="text-right">
                  <span className="text-xs text-[#7A8598] block">Price</span>
                  <span className="text-xl font-bold text-[#141A26]">
                    ${signatureSofa.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(signatureSofa, 0);
                  }}
                  className="p-3 rounded-full bg-[#182030] text-white hover:bg-[#2F3A4F] active:scale-95 transition-all shadow-tactile"
                  title="Add to bag"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: 2 Stacked Asymmetric Pieces (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Piece 2: Architectural Chair */}
            <div
              id={`gallery-pod-${featuredChair.id}`}
              onClick={() => onOpenProduct(featuredChair)}
              className="group relative rounded-[32px] bg-[#FAF8F5]/90 hover:bg-[#FDFCFA] border border-black/5 hover:border-black/10 p-6 sm:p-7 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[#182030] text-[10px] font-bold tracking-wider uppercase">
                  Sculptural Chair Archetype
                </span>
                <span className="text-xs text-[#6A7382] font-mono">
                  No. 02
                </span>
              </div>

              {/* Stage Container */}
              <div
                className="relative w-full h-56 flex items-center justify-center p-4 my-2 bg-transparent overflow-visible select-none"
                style={{ perspective: '1000px' }}
              >
                <img
                  src={featuredChair.colorVariants[0]?.image || featuredChair.images[0]}
                  alt={featuredChair.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[88%] max-w-[90%] object-contain select-none group-hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-normal text-xl text-[#141A26]">
                    {featuredChair.name}
                  </h4>
                  <span className="text-xs text-[#6A7382]">
                    Bent Ash & Butter Wool • Kyoto
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#141A26]">
                    ${featuredChair.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(featuredChair, 0);
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#182030] text-white hover:bg-[#253046] active:scale-95 shadow-xs transition-all cursor-pointer"
                    title="Add to bag"
                    aria-label={`Add ${featuredChair.name} to bag`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Piece 3: Fluted Credenza */}
            <div
              id={`gallery-pod-${flutedCredenza.id}`}
              onClick={() => onOpenProduct(flutedCredenza)}
              className="group relative rounded-[32px] bg-[#FAF8F5]/90 hover:bg-[#FDFCFA] border border-black/5 hover:border-black/10 p-6 sm:p-7 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[#182030] text-[10px] font-bold tracking-wider uppercase">
                  Tambour Joinery
                </span>
                <span className="text-xs text-[#6A7382] font-mono">
                  No. 03
                </span>
              </div>

              {/* Stage Container */}
              <div
                className="relative w-full h-56 flex items-center justify-center p-4 my-2 bg-transparent overflow-visible select-none"
                style={{ perspective: '1000px' }}
              >
                <img
                  src={flutedCredenza.colorVariants[0]?.image || flutedCredenza.images[0]}
                  alt={flutedCredenza.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[88%] max-w-[90%] object-contain select-none group-hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-normal text-xl text-[#141A26]">
                    {flutedCredenza.name}
                  </h4>
                  <span className="text-xs text-[#6A7382]">
                    Ribbed Solid Walnut • Sliding Tambour
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#141A26]">
                    ${flutedCredenza.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(flutedCredenza, 0);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-[#182030] text-white hover:bg-[#2F3A4F]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
