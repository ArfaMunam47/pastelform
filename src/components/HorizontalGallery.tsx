import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface HorizontalGalleryProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
}

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  products,
  onOpenDetail,
  onQuickAdd,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Curate 8 distinctive sculptural pieces for the horizontal gallery
  const curatedProducts = products.slice(0, 8);

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;
    setCanScrollLeft(current > 10);
    setCanScrollRight(current < maxScroll - 10);
    setScrollProgress(maxScroll > 0 ? (current / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scrollByAmount = (offset: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleQuickAddClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAdd(product, 0);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // Pastel themes for gallery items
  const galleryPastels = [
    { bg: 'from-[#FAF2E1] to-[#F5E6C4]', border: '#EBD6AA', tag: '#B8861E', name: 'Butter Gold' },
    { bg: 'from-[#EBF6F0] to-[#DAEFE3]', border: '#C5E6D2', tag: '#2D754C', name: 'Pistachio Mint' },
    { bg: 'from-[#F6EFFD] to-[#E9DBFA]', border: '#DEC5F6', tag: '#6B4194', name: 'Soft Lilac' },
    { bg: 'from-[#EEF5FC] to-[#DCEAF8]', border: '#C8DEF4', tag: '#2E679B', name: 'Powder Sky' },
    { bg: 'from-[#FEF1EB] to-[#FCE0D4]', border: '#F7C4B0', tag: '#B54C28', name: 'Warm Terracotta' },
    { bg: 'from-[#FDF3F8] to-[#F8DCEB]', border: '#F1C3DE', tag: '#96396E', name: 'Blush Rose' },
    { bg: 'from-[#EDF6F3] to-[#DAECE5]', border: '#C2E0D3', tag: '#337759', name: 'Eucalyptus' },
    { bg: 'from-[#FFF8EE] to-[#FEEEDB]', border: '#FBD9B3', tag: '#A66311', name: 'Golden Amber' },
  ];

  return (
    <section
      id="horizontal-gallery-section"
      className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#F7F2EB]/60 via-[#F3EDF9]/40 to-[#EBF5EF]/50"
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#E5D7F8]/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#D4EFE4]/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/5 shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#A37B3E]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#182030]">
                Interactive Animation 01 • Horizontal Gallery
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-[#182030] tracking-tight">
              Curated 3D Panorama <span className="italic font-normal">Reel</span>
            </h2>
            <p className="font-editorial text-[#5A6372] text-base sm:text-lg max-w-xl mt-1">
              Drag or glide through high-craft sculptural statements. Each object suspended in its dedicated pastel atmosphere.
            </p>
          </div>

          {/* Navigation Controls & Progress */}
          <div className="flex items-center gap-3">
            {/* Scroll Progress Bar */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <span className="text-[10px] font-mono text-[#8C96A6]">Scroll</span>
              <div className="w-24 h-1.5 rounded-full bg-black/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#9B82C8] via-[#529E74] to-[#DC6C43] transition-all duration-150 rounded-full"
                  style={{ width: `${Math.max(15, scrollProgress)}%` }}
                />
              </div>
            </div>

            {/* Left / Right Navigation Buttons */}
            <button
              onClick={() => scrollByAmount(-400)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-11 h-11 rounded-full flex items-center justify-center bg-white/90 border border-black/5 shadow-xs transition-all ${
                canScrollLeft ? 'text-[#182030] hover:bg-white hover:scale-105 active:scale-95' : 'text-black/20 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByAmount(400)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-11 h-11 rounded-full flex items-center justify-center bg-white/90 border border-black/5 shadow-xs transition-all ${
                canScrollRight ? 'text-[#182030] hover:bg-white hover:scale-105 active:scale-95' : 'text-black/20 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Drag-To-Scroll Reel */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex gap-6 overflow-x-auto scrollbar-none px-4 sm:px-6 lg:px-8 py-4 ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        style={{
          scrollSnapType: isDragging ? 'none' : 'x mandatory',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {curatedProducts.map((product, idx) => {
          const theme = galleryPastels[idx % galleryPastels.length];
          const isAdded = addedId === product.id;

          return (
            <div
              key={product.id}
              onClick={() => onOpenDetail(product)}
              className={`group flex-shrink-0 w-[290px] sm:w-[340px] rounded-[32px] p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between bg-gradient-to-br ${theme.bg}`}
              style={{
                scrollSnapAlign: 'start',
                perspective: '1200px',
                boxShadow: '0 12px 32px -8px rgba(30, 24, 40, 0.06), inset 0 2px 4px rgba(255, 255, 255, 0.85)',
                border: `1.5px solid ${theme.border}`
              }}
            >
              {/* Card Top Pill */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 shadow-xs"
                  style={{ color: theme.tag }}
                >
                  {product.category}
                </span>
                <span className="text-[10px] font-mono text-[#7A8598]">
                  0{idx + 1} / 0{curatedProducts.length}
                </span>
              </div>

              {/* 3D Elevated Image Stage - Standardized across all models */}
              <div
                className="relative w-full h-52 sm:h-56 flex items-center justify-center my-2 select-none"
                style={{ perspective: '1000px' }}
              >
                {/* Natural Ground Shadow */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/5 max-w-[160px] h-2.5 bg-[#121824] rounded-full pointer-events-none -z-10 opacity-15 blur-[6px] group-hover:scale-90 group-hover:opacity-10 transition-all duration-500" />

                {/* 3D Projected Product Render with consistent scaling */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center p-2 select-none transition-all duration-500 ease-out"
                  style={{
                    transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(8px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img
                    src={product.colorVariants[0]?.image || product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[86%] max-w-[88%] object-contain select-none transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1.5"
                    style={{
                      filter: 'drop-shadow(0 10px 16px rgba(18, 24, 38, 0.08))'
                    }}
                  />
                </div>

                {/* Floating Inspect Tooltip */}
                <div className="absolute bottom-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182030] text-white text-[10px] font-bold shadow-md">
                    <Eye className="w-3 h-3" />
                    <span>View Product</span>
                  </span>
                </div>
              </div>

              {/* Card Meta & Bottom Controls */}
              <div className="pt-4 border-t border-black/5">
                <h4 className="font-display text-lg text-[#182030] line-clamp-1 group-hover:text-[#A37B3E] transition-colors">
                  {product.name}
                </h4>
                <p className="font-editorial text-xs text-[#6A7382] line-clamp-1 mt-0.5">
                  {product.subtitle}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2">
                  <div className="text-sm font-bold text-[#182030]">
                    ${product.price.toLocaleString()}
                  </div>

                  <button
                    onClick={(e) => handleQuickAddClick(e, product)}
                    disabled={isAdded}
                    className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                      isAdded
                        ? 'px-3 py-1 bg-[#2E7D52] text-white text-[11px] font-bold shadow-xs'
                        : 'w-8 h-8 rounded-full bg-white hover:bg-[#182030] hover:text-white text-[#182030] border border-black/5 shadow-xs active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Added</span>
                      </span>
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[2]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
