import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface BestSellersProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickAdd: (product: Product, colorIndex: number) => void;
}

export const BestSellersSection: React.FC<BestSellersProps> = ({
  products,
  onOpenDetail,
  onToggleWishlist,
  wishlistIds,
  onQuickAdd
}) => {
  // 3 dedicated best sellers
  const bestSellerProducts = products.filter(p => p.isBestSeller);

  const testimonials = [
    {
      author: 'Elena & Lucas Vance',
      role: 'Curators, Stockholm Architecture Forum',
      quote: 'The Astral floor lamp radiates a sunset warmth that makes our concrete studio feel human. It arrived flawlessly crated.',
      rating: 5
    },
    {
      author: 'Kaito Moriyama',
      role: 'Interior Designer, Kyoto',
      quote: 'The Sorella nightstand eliminated all aggressive corners in our master sanctuary. The lilac marble inlay is exquisite.',
      rating: 5
    }
  ];

  return (
    <section
      id="bestsellers-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EDE7F4 0%, #EEF2F8 45%, #EEF4FA 100%)'
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] rounded-full bg-[#E5DDF0] blur-[120px] opacity-65 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#7F5E9E]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
                Permanent Collection
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight">
              Best Selling Sculptural Pieces
            </h2>
          </div>
          <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-md">
            Acclaimed furniture forms that have found enduring homes in design-led residences across 32 countries.
          </p>
        </div>

        {/* 3 Best Seller Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {bestSellerProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenDetail={onOpenDetail}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(prod.id)}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>

        {/* Editorial Collector Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={t.author}
              className={`p-8 rounded-[30px] border border-black/5 shadow-pastel-sm flex flex-col justify-between ${
                idx === 0 ? 'bg-[#F2EFF8]/90' : 'bg-[#EBF2F8]/90'
              }`}
              style={{
                boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 8px 24px -8px rgba(30, 40, 50, 0.04)'
              }}
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D99A45] text-[#D99A45]" />
                  ))}
                </div>
                <p className="font-editorial italic text-lg sm:text-xl text-[#202736] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#141A26] block">
                    {t.author}
                  </span>
                  <span className="text-[11px] text-[#6E7B90]">
                    {t.role}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A889D]">
                  Verified Studio Collector
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
