import React from 'react';
import { ShoppingBag, Eye, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface FinalShowcaseSectionProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
  onScrollToCatalog: () => void;
}

export const FinalShowcaseSection: React.FC<FinalShowcaseSectionProps> = ({
  products,
  onOpenDetail,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = [],
  onScrollToCatalog
}) => {
  const pouf = products.find(p => p.id === 'prod-pouf-cirrus');

  return (
    <section
      id="final-showcase-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F0F4EE 0%, #F5F4EE 40%, #F8F5EE 100%)'
      }}
    >
      {/* Soft diffused background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[500px] rounded-full bg-[#EAE2D5] blur-[120px] opacity-60 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {pouf && (
          <div
            onClick={() => onOpenDetail(pouf)}
            className="group relative rounded-[40px] bg-white/85 hover:bg-white border border-black/5 p-8 sm:p-14 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col md:flex-row items-center justify-between gap-10"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.95), 0 16px 36px -12px rgba(40, 35, 25, 0.06)'
            }}
          >
            {/* Left Image Stage */}
            <div className="md:w-1/2 w-full flex items-center justify-center">
              <div
                className="relative w-full h-72 sm:h-84 rounded-3xl bg-[#F6E6ED] flex items-center justify-center p-8 overflow-hidden"
                style={{
                  boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.9), 0 10px 24px -8px rgba(60, 30, 45, 0.06)'
                }}
              >
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 max-w-[220px] h-6 bg-[#25101A] rounded-[100%] pointer-events-none -z-10 opacity-30 blur-md"
                />
                <img
                  src={pouf.images[0]}
                  alt={pouf.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[92%] max-w-[92%] object-contain contact-shadow select-none group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="md:w-1/2 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#9E5B7A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#556075]">
                  Studio Accent Archetype
                </span>
              </div>

              <h2 className="font-display font-normal text-3xl sm:text-4xl text-[#141A26] mb-3">
                {pouf.name}
              </h2>

              <p className="font-editorial text-base sm:text-lg text-[#556075] leading-relaxed mb-6">
                {pouf.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div>
                  <span className="text-[10px] text-[#7A8598] uppercase block">Price</span>
                  <span className="text-2xl font-bold text-[#141A26]">
                    ${pouf.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(pouf, 0);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#182030] text-white hover:bg-[#2A3448] text-xs font-semibold uppercase tracking-wider transition-all shadow-tactile"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Pouf</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetail(pouf);
                  }}
                  className="px-4 py-3 rounded-full glass-pill text-xs font-semibold text-[#182030] hover:bg-white"
                >
                  Inspect
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onScrollToCatalog();
                }}
                className="text-xs uppercase tracking-wider font-semibold text-[#182030] hover:underline flex items-center gap-1.5"
              >
                <span>Browse all 20 studio pieces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
