import React from 'react';
import { Eye, ShoppingBag, Heart, Check, Sparkles, Compass } from 'lucide-react';
import { Product } from '../types';

interface EditorialShowcaseProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({
  product,
  onOpenDetail,
  onQuickAdd,
  onToggleWishlist,
  isWishlisted = false
}) => {
  return (
    <section
      id="editorial-showcase-section"
      className="py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F0F5EE 0%, #EEF4F0 40%, #EDE7F4 100%)'
      }}
    >
      {/* Diffused spotlight */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] rounded-full bg-[#DFEBE2] blur-[120px] opacity-70 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Eyebrow */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#527B5A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
              Editorial Focus • Architecture of Storage
            </span>
          </div>
          <span className="text-xs font-mono text-[#6B788C]">
            Vol. 26 — Monograph 04
          </span>
        </div>

        {/* Magazine-Style Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Isolated 3D Stage on Sage Pod */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              onClick={() => onOpenDetail(product)}
              className="group relative w-full aspect-[16/10] rounded-[36px] bg-[#E3EBE4] p-8 sm:p-12 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300"
              style={{
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.95), 0 16px 36px -12px rgba(35, 50, 40, 0.08)'
              }}
            >
              {/* Diffused highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

              {/* Realistic Contact Shadow */}
              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4/5 max-w-[420px] h-7 bg-[#142318] rounded-[100%] pointer-events-none -z-10 opacity-30 blur-md"
              />

              {/* Isolated Credenza */}
              <img
                src={product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-[90%] max-w-[95%] object-contain contact-shadow select-none group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-5 left-6">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-[#305739] shadow-xs">
                  Ash Wood Tambour & Peach Travertine Top
                </span>
              </div>
            </div>

            {/* Spec callout ticks */}
            <div className="grid grid-cols-3 gap-4 w-full mt-5 px-2 text-center">
              <div className="p-3 rounded-2xl bg-white/60 border border-black/5">
                <span className="text-[10px] font-semibold uppercase text-[#7A8598] block">Weight</span>
                <span className="text-xs sm:text-sm font-medium text-[#182030]">84 kg Solid Stone</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/60 border border-black/5">
                <span className="text-[10px] font-semibold uppercase text-[#7A8598] block">Acoustic</span>
                <span className="text-xs sm:text-sm font-medium text-[#182030]">Vibration Isolated</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/60 border border-black/5">
                <span className="text-[10px] font-semibold uppercase text-[#7A8598] block">Finish</span>
                <span className="text-xs sm:text-sm font-medium text-[#182030]">Dead Matte Lacquer</span>
              </div>
            </div>
          </div>

          {/* Right: Architectural Narrative & Spec */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#527B5A] mb-2">
              Featured Monolith
            </span>

            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight leading-[1.15] mb-5">
              {product.name}
            </h2>

            <p className="font-editorial text-base sm:text-lg text-[#556075] leading-relaxed mb-6">
              {product.description}
            </p>

            <blockquote className="border-l-2 border-[#527B5A] pl-4 italic font-editorial text-sm text-[#455060] mb-8">
              "We sought to eliminate the cold metallic machinery of media storage, replacing it with the ancient warmth of honest fluted European ash and honed Roman stone."
            </blockquote>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-[#141A26]">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#7A8598]">
                Includes White-Glove In-Home Placement
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full">
              <button
                onClick={() => onQuickAdd(product, 0)}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#182030] text-white hover:bg-[#2A3448] text-xs font-semibold uppercase tracking-wider transition-all shadow-tactile active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Credenza</span>
              </button>

              <button
                onClick={() => onOpenDetail(product)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-full glass-pill text-xs font-semibold tracking-wider text-[#182030] hover:bg-white active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Dimensions</span>
              </button>

              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isWishlisted ? 'bg-white text-[#C95332] shadow-xs' : 'glass-pill text-[#6A7588] hover:text-[#182030]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C95332]' : ''}`} />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
