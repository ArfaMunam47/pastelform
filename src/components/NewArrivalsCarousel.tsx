import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface NewArrivalsProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickAdd: (product: Product, colorIndex: number) => void;
}

export const NewArrivalsCarousel: React.FC<NewArrivalsProps> = ({
  products,
  onOpenDetail,
  onToggleWishlist,
  wishlistIds,
  onQuickAdd
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dedicated new arrival products
  const newArrivalItems = products.filter(p => p.isNewArrival);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="new-arrivals-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FBF6EF 0%, #F8EFE9 45%, #F0F5EE 100%)'
      }}
    >
      {/* Ambient peach & sage glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#FCE8DC] blur-[120px] opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#E0EBE2] blur-[110px] opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B26244]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
                Summer 2026 Release
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight">
              New Sculptural Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-[#182030] hover:bg-white active:scale-95 shadow-xs transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white/90 border border-black/10 flex items-center justify-center text-[#182030] hover:bg-white active:scale-95 shadow-xs transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Editorial Grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto scrollbar-none pb-4"
        >
          {newArrivalItems.map((prod) => {
            const stageBg = prod.stageBg || 'bg-[#F5EDE5]';

            return (
              <div
                key={prod.id}
                id={`new-arrival-card-${prod.id}`}
                onClick={() => onOpenDetail(prod)}
                className="group relative rounded-[32px] bg-white/80 hover:bg-white/95 border border-black/5 hover:border-black/10 p-7 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#182030] text-white text-[9px] font-bold tracking-widest uppercase">
                    New Silhouette
                  </span>
                  <span className="text-xs text-[#7A8598] font-mono">
                    {prod.category}
                  </span>
                </div>

                {/* Stage Pod */}
                <div
                  className={`relative w-full h-64 rounded-2xl ${stageBg} flex items-center justify-center p-6 my-3 overflow-hidden`}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[92%] max-w-[92%] object-contain select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="pt-3 border-t border-black/5">
                  <h3 className="font-display font-normal text-xl text-[#141A26] mb-1">
                    {prod.name}
                  </h3>
                  <p className="font-editorial text-sm text-[#556075] line-clamp-2 mb-4">
                    {prod.subtitle}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5">
                    <span className="text-base font-bold text-[#141A26]">
                      ${prod.price.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        id={`inspect-btn-${prod.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDetail(prod);
                        }}
                        aria-label={`Inspect ${prod.name} details`}
                        className="px-3.5 py-1.5 rounded-full bg-white/90 border border-black/10 text-xs font-medium text-[#182030] hover:bg-white hover:border-black/20 shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#556075]" />
                        <span>Inspect</span>
                      </button>
                      <button
                        id={`quick-add-btn-${prod.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickAdd(prod, 0);
                        }}
                        aria-label={`Add ${prod.name} to bag`}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-[#182030] text-white hover:bg-[#253046] active:scale-95 shadow-xs transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
