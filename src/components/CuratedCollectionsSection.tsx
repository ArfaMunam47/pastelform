import React from 'react';
import { Eye, ShoppingBag, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CuratedCollectionsProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const CuratedCollectionsSection: React.FC<CuratedCollectionsProps> = ({
  products,
  onOpenDetail,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = []
}) => {
  const palomaTable = products.find(p => p.id === 'prod-table-paloma');

  return (
    <section
      id="curated-collections-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FCF8EB 0%, #FAF3EA 40%, #FBF0F3 100%)'
      }}
    >
      {/* Diffused rose & butter light aura */}
      <div className="absolute top-1/4 right-5 w-[550px] h-[550px] rounded-full bg-[#FCE8EE] blur-[120px] opacity-70 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#9E5B7A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
                Atmospheric Ensemble
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight">
              The Serene Living Pavilion
            </h2>
          </div>
          <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-md">
            Harmonized design ecosystems engineered to turn the modern home into a quiet, meditative temple of soft color.
          </p>
        </div>

        {/* Curated Pavilion Card */}
        {palomaTable && (
          <div
            onClick={() => onOpenDetail(palomaTable)}
            className="group relative rounded-[40px] bg-white/85 hover:bg-white border border-black/5 p-8 sm:p-14 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col lg:flex-row items-center justify-between gap-10"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.95), 0 16px 36px -12px rgba(45, 30, 40, 0.06)'
            }}
          >
            {/* Left Content */}
            <div className="lg:w-1/2 flex flex-col items-start">
              <span className="px-3 py-1 rounded-full bg-[#F6F0DF] text-[#7A6730] text-[10px] font-bold tracking-wider uppercase mb-4">
                Curated Focal Anchor
              </span>

              <h3 className="font-display font-normal text-3xl sm:text-4xl text-[#141A26] mb-3">
                {palomaTable.name}
              </h3>

              <p className="font-editorial text-base sm:text-lg text-[#556075] leading-relaxed mb-6">
                {palomaTable.description}
              </p>

              <div className="flex items-center gap-6 mb-8 text-xs text-[#6A7588]">
                <span>Asymmetrical River Silhouette</span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span>Lilac Mineral Composite</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="mr-2">
                  <span className="text-[10px] text-[#7A8598] uppercase block">Price</span>
                  <span className="text-2xl font-bold text-[#141A26]">
                    ${palomaTable.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(palomaTable, 0);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#182030] text-white hover:bg-[#2A3448] text-xs font-semibold uppercase tracking-wider transition-all shadow-tactile"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Table</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetail(palomaTable);
                  }}
                  className="px-4 py-3 rounded-full glass-pill text-xs font-semibold text-[#182030] hover:bg-white"
                >
                  Inspect
                </button>
              </div>
            </div>

            {/* Right: Stage Pod with Isolated Paloma Table */}
            <div className="lg:w-1/2 w-full flex items-center justify-center">
              <div
                className="relative w-full h-80 sm:h-96 flex items-center justify-center p-8 bg-transparent overflow-visible select-none"
                style={{ perspective: '1100px' }}
              >
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    transform: 'perspective(1100px) rotateX(2deg) rotateY(-3deg) translateZ(10px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img
                    src={palomaTable.images[0]}
                    alt={palomaTable.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[90%] max-w-[90%] object-contain select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
