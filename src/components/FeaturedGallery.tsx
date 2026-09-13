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
  // We use 3 specific unique gallery pieces: Aura Lounge Chair, Monolith Travertine Table, Solstice Armchair
  const auraChair = products.find(p => p.id === 'prod-lounge-aura') || products[0];
  const travertineTable = products.find(p => p.id === 'prod-table-travertine') || products[1];
  const solsticeChair = products.find(p => p.id === 'prod-armchair-solstice') || products[2];

  return (
    <section
      id="featured-gallery-section"
      className="py-24 px-4 sm:px-6 lg:px-10 transition-colors duration-700 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EDE6F5 0%, #F0EEF8 35%, #EEF4FA 100%)'
      }}
    >
      {/* Soft atmospheric ambient glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-[#E2EDF7] blur-[120px] opacity-70 pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-[#E6DEF2] blur-[100px] opacity-60 pointer-events-none -z-10" />

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
            Individual furniture artifacts presented in isolation to honor the tension between spatial lightness and tactile permanence.
          </p>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Piece 1: Large Span (7 Cols) — Aura Bouclé Lounge Chair on Powder Blue Stage */}
          <div
            id={`gallery-pod-${auraChair.id}`}
            onClick={() => onOpenProduct(auraChair)}
            className="lg:col-span-7 group relative rounded-[36px] bg-white/80 hover:bg-white/95 border border-black/5 hover:border-black/10 p-7 sm:p-10 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
          >
            {/* Top Meta */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#DDE9F4] text-[#34597A] text-[10px] font-bold tracking-wider uppercase">
                  Powder Blue Stage
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
                      onToggleWishlist(auraChair);
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center glass-pill text-[#6A7382] hover:text-[#182030]"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.includes(auraChair.id) ? 'fill-[#C95332] text-[#C95332]' : ''}`} />
                  </button>
                )}
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#182030] text-white group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* The Isolated 3D Stage (Powder Blue Pod so Cream Bouclé stands out!) */}
            <div
              className="relative w-full h-80 sm:h-96 rounded-3xl bg-[#DDE9F4] flex items-center justify-center p-6 my-4 overflow-hidden"
              style={{
                boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.9), 0 10px 25px -8px rgba(35, 60, 85, 0.08)'
              }}
            >
              {/* Soft interior highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

              {/* Natural Contact Shadow */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 max-w-[280px] h-6 bg-[#162230] rounded-[100%] pointer-events-none -z-10 opacity-35 blur-md"
              />

              {/* Isolated 3D Chair */}
              <img
                src={auraChair.images[0]}
                alt={auraChair.name}
                referrerPolicy="no-referrer"
                className="max-h-[92%] max-w-[92%] object-contain contact-shadow select-none group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/90 text-[#254663] shadow-xs">
                  Virgin Bouclé Loop
                </span>
              </div>
            </div>

            {/* Bottom Content & Price */}
            <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A8598] block mb-1">
                  {auraChair.category} • Hand-Finished in Biella
                </span>
                <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#141A26]">
                  {auraChair.name}
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#556075] mt-1 max-w-md">
                  {auraChair.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="text-right">
                  <span className="text-xs text-[#7A8598] block">Price</span>
                  <span className="text-xl font-bold text-[#141A26]">
                    ${auraChair.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(auraChair, 0);
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
            
            {/* Piece 2: Travertine Table on Soft Sage Stage */}
            <div
              id={`gallery-pod-${travertineTable.id}`}
              onClick={() => onOpenProduct(travertineTable)}
              className="group relative rounded-[32px] bg-white/80 hover:bg-white/95 border border-black/5 hover:border-black/10 p-6 sm:p-7 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E0EBE2] text-[#3B6344] text-[10px] font-bold tracking-wider uppercase">
                  Soft Sage Stage
                </span>
                <span className="text-xs text-[#6A7382] font-mono">
                  No. 02
                </span>
              </div>

              {/* Sage Stage Pod */}
              <div
                className="relative w-full h-56 rounded-2xl bg-[#E0EBE2] flex items-center justify-center p-4 my-2 overflow-hidden"
                style={{
                  boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.9), 0 8px 18px -6px rgba(30, 50, 35, 0.06)'
                }}
              >
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 max-w-[220px] h-5 bg-[#142318] rounded-[100%] pointer-events-none -z-10 opacity-30 blur-md"
                />
                <img
                  src={travertineTable.images[0]}
                  alt={travertineTable.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[90%] max-w-[90%] object-contain contact-shadow select-none group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-normal text-xl text-[#141A26]">
                    {travertineTable.name}
                  </h4>
                  <span className="text-xs text-[#6A7382]">
                    Roman Travertine • Tivoli
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#141A26]">
                    ${travertineTable.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(travertineTable, 0);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-[#182030] text-white hover:bg-[#2F3A4F]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Piece 3: Solstice Armchair on Warm Peach Stage */}
            <div
              id={`gallery-pod-${solsticeChair.id}`}
              onClick={() => onOpenProduct(solsticeChair)}
              className="group relative rounded-[32px] bg-white/80 hover:bg-white/95 border border-black/5 hover:border-black/10 p-6 sm:p-7 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F5E2D8] text-[#91462D] text-[10px] font-bold tracking-wider uppercase">
                  Warm Peach Stage
                </span>
                <span className="text-xs text-[#6A7382] font-mono">
                  No. 03
                </span>
              </div>

              {/* Peach Stage Pod */}
              <div
                className="relative w-full h-56 rounded-2xl bg-[#F5E2D8] flex items-center justify-center p-4 my-2 overflow-hidden"
                style={{
                  boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.9), 0 8px 18px -6px rgba(60, 30, 20, 0.06)'
                }}
              >
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 max-w-[200px] h-5 bg-[#26150F] rounded-[100%] pointer-events-none -z-10 opacity-30 blur-md"
                />
                <img
                  src={solsticeChair.images[0]}
                  alt={solsticeChair.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[90%] max-w-[90%] object-contain contact-shadow select-none group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-normal text-xl text-[#141A26]">
                    {solsticeChair.name}
                  </h4>
                  <span className="text-xs text-[#6A7382]">
                    Mint Virgin Bouclé • Contoured
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#141A26]">
                    ${solsticeChair.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(solsticeChair, 0);
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
