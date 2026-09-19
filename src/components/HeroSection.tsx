import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Eye, Heart, Sparkles, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { HeroOrbStage } from './HeroOrbStage';
import { HERO_CHAIRS, HeroChairItem } from '../data/heroChairs';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface HeroSectionProps {
  heroProduct?: Product;
  featuredProducts?: Product[];
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onExploreClick: () => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
  wishlistIds?: string[];
  onActiveColorChange?: (color: string) => void;
}

const CYCLE_DURATION = 3000; // Exact 3-second cycle requested by user

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenProduct,
  onExploreClick,
  onToggleWishlist,
  wishlistIds = [],
  onActiveColorChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  // Default to stage on left side as requested by user ("make the circle in left side")
  const [stagePosition, setStagePosition] = useState<'left' | 'right'>('left');

  const resetTimerRef = useRef<(() => void) | null>(null);

  const activeChair: HeroChairItem = HERO_CHAIRS[currentIndex];

  // Preload all 4 hero images on mount so there is never a network hitch or blank frame
  useEffect(() => {
    HERO_CHAIRS.forEach((chair) => {
      const img = new Image();
      img.src = chair.image;
    });
  }, []);

  // Notify parent of active hero accent color for navbar logo and bag sync
  useEffect(() => {
    if (onActiveColorChange) {
      onActiveColorChange(activeChair.accentColor);
    }
  }, [activeChair.accentColor, onActiveColorChange]);

  // Corresponding product in main catalog
  const matchingCatalogProduct = PRODUCTS.find((p) => p.id === activeChair.id) || PRODUCTS[0];
  const isSaved = wishlistIds.includes(matchingCatalogProduct.id);

  // Manual direct selection
  const selectIndex = useCallback((idx: number) => {
    setCurrentIndex(idx);
    resetTimerRef.current?.();
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_CHAIRS.length);
    resetTimerRef.current?.();
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_CHAIRS.length) % HERO_CHAIRS.length);
    resetTimerRef.current?.();
  }, []);

  // Continuous, rock-solid 3-second rotation cycle using requestAnimationFrame
  // CRITICAL: Next animation frame is ALWAYS scheduled, so the loop NEVER dies or gets stuck!
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let accumulatedTime = 0;

    resetTimerRef.current = () => {
      accumulatedTime = 0;
      lastTime = performance.now();
      setProgress(0);
    };

    const tick = (now: number) => {
      // Guard against huge delta spikes when switching browser tabs (max 150ms)
      const delta = Math.min(now - lastTime, 150);
      lastTime = now;

      if (!isPaused) {
        accumulatedTime += delta;
        const currentProgress = Math.min(100, (accumulatedTime / CYCLE_DURATION) * 100);
        setProgress(currentProgress);

        if (accumulatedTime >= CYCLE_DURATION) {
          accumulatedTime = 0;
          setProgress(0);
          setCurrentIndex((prev) => (prev + 1) % HERO_CHAIRS.length);
        }
      }

      // Continuous loop: always schedule next frame
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused]);

  const handleInspect = useCallback((productId?: string) => {
    const targetId = productId || activeChair.id;
    const prod = PRODUCTS.find((p) => p.id === targetId) || matchingCatalogProduct;
    onOpenProduct(prod);
  }, [activeChair.id, matchingCatalogProduct, onOpenProduct]);

  return (
    <section
      id="hero-showcase-section"
      className="relative min-h-0 pt-2 sm:pt-4 pb-6 sm:pb-8 px-3 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden transition-colors duration-1000 bg-[#F7F5F0]"
    >
      {/* Dynamic atmospheric ambient glow matching active product theme */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-1000"
          style={{ backgroundColor: activeChair.ambientGlowColor, opacity: 0.65 }}
        />
        <div
          className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-1000"
          style={{ backgroundColor: activeChair.ambientGlowColor, opacity: 0.45 }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* =========================================================================
            THE SHOWCASE BOX / CARD (Compact view to fit on one screen)
            - Box background dynamically matches the product's color family
            - Soft rounded geometry: rounded-[26px]
            - Circle stage on LEFT side
            - Rich contrasting content container with 4 circular thumbnail selectors
            - One-click Stage Position toggle in top header
           ========================================================================= */}
        <div
          className="relative w-full rounded-[24px] sm:rounded-[30px] p-4 sm:p-5 lg:p-6 transition-all duration-1000 shadow-[0_20px_50px_-15px_rgba(20,30,50,0.07)] border"
          style={{
            backgroundColor: activeChair.boxBg,
            borderColor: activeChair.boxBorder,
          }}
        >
          {/* Top Bar inside the showcase box */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 sm:mb-4 pb-2.5 border-b border-black/5">
            {/* Exhibition / Collection Badge & Auto 3s Status */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <span
                className="w-2 h-2 rounded-full transition-colors duration-700 animate-pulse"
                style={{ backgroundColor: activeChair.accentColor }}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 font-mono">
                {activeChair.flavorLabel} Edition
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-medium text-slate-500">
                0{currentIndex + 1} / 04
              </span>
              <span className="text-slate-300">•</span>
              
              {/* Play / Pause Toggle Button for 3s rotation */}
              <button
                onClick={() => setIsPaused(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 hover:bg-white text-slate-700 text-[10px] font-semibold border border-slate-200/90 shadow-2xs transition-all cursor-pointer"
                title={isPaused ? "Resume 3-second auto rotation" : "Pause auto rotation"}
                aria-label={isPaused ? "Resume 3s auto cycle" : "Pause 3s auto cycle"}
              >
                {isPaused ? (
                  <>
                    <Play className="w-2.5 h-2.5 fill-slate-700 text-slate-700" />
                    <span>Paused</span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>3s Auto</span>
                    <Pause className="w-2.5 h-2.5 text-slate-500 hover:text-slate-800 ml-0.5" />
                  </>
                )}
              </button>
            </div>

            {/* Layout Toggle (Circle on Left vs Circle on Right) */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline-block">
                Stage:
              </span>
              <div className="inline-flex rounded-full p-0.5 bg-white/80 border border-slate-200/80 shadow-xs text-[11px] font-medium">
                <button
                  onClick={() => setStagePosition('left')}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    stagePosition === 'left'
                      ? 'bg-[#111622] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Place circular stage on Left side"
                >
                  Left
                </button>
                <button
                  onClick={() => setStagePosition('right')}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    stagePosition === 'right'
                      ? 'bg-[#111622] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Place circular stage on Right side"
                >
                  Right
                </button>
              </div>
            </div>
          </div>

          {/* Inner Grid: Circular Stage & Typography Container with ample padding and gap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 xl:gap-10 items-center">
            
            {/*
              CIRCULAR STAGE (When stagePosition === 'left', renders in column 1)
            */}
            {stagePosition === 'left' && (
              <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full order-1">
                <HeroOrbStage
                  activeChair={activeChair}
                  onInspectProduct={handleInspect}
                  isPaused={isPaused}
                  align="center"
                />
              </div>
            )}

            {/*
              CONTENT & TYPOGRAPHY CONTAINER (Inspired by Reference 35686.png)
              - Rich contrasting shape container matching the product theme
              - Crisp typography, high contrast
              - 4 circular thumbnail selectors ("the circle in left side")
              - Clean action buttons
            */}
            <div
              className={`lg:col-span-6 xl:col-span-6 flex flex-col items-start justify-center p-4 sm:p-5 lg:p-7 rounded-[20px] sm:rounded-[26px] transition-all duration-1000 relative overflow-hidden shadow-xl border ${
                stagePosition === 'left' ? 'order-2' : 'order-1'
              }`}
              style={{
                backgroundColor: activeChair.shapeBg,
                borderColor: activeChair.shapeBorder,
              }}
            >
              {/* Subtle ambient light gradient inside the dark curved container */}
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
                style={{ backgroundColor: activeChair.tagColor }}
              />

              {/* Tag / Category Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-medium tracking-wide mb-2.5 border border-white/20">
                <Sparkles className="w-3 h-3 text-white/90" />
                <span>{activeChair.category}</span>
                <span className="text-white/40">•</span>
                <span className="font-mono font-bold text-white/95">${activeChair.price}</span>
              </div>

              {/* Display Headline with Crisp, Snappy Typography Transition */}
              <div className="mb-2 sm:mb-2.5 w-full min-h-[38px] sm:min-h-[46px] flex items-center">
                <h1 className="font-sans font-bold text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] leading-[1.18] tracking-[-0.02em] text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeChair.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {activeChair.name}
                    </motion.div>
                  </AnimatePresence>
                </h1>
              </div>

              {/* Materials & Tactile description */}
              <p className="font-sans text-xs sm:text-[13px] text-white/85 leading-relaxed mb-3.5 sm:mb-4 font-normal max-w-lg line-clamp-2">
                Crafted with {activeChair.materials}. A sculptured visual statement designed with uncompromised comfort and architectural balance.
              </p>

              {/*
                THE 4 CIRCULAR SELECTORS WITH PREV/NEXT NAVIGATION
                - 4 circular preview buttons
                - Smooth, uninterrupted 3s cycle
                - Interactive left/right chevrons
              */}
              <div className="w-full mb-3.5 sm:mb-4">
                <div className="flex items-center justify-between text-[10px] font-sans font-semibold text-white/80 uppercase tracking-[0.14em] mb-2">
                  <span>Select Architectural Form:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goToPrev}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
                      title="Previous piece"
                      aria-label="Previous piece"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
                      title="Next piece"
                      aria-label="Next piece"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  {HERO_CHAIRS.map((chair, idx) => {
                    const isActive = currentIndex === idx;
                    return (
                      <button
                        key={chair.id}
                        onClick={() => selectIndex(idx)}
                        className="group flex flex-col items-center gap-1 cursor-pointer relative focus:outline-none"
                        aria-label={`Select ${chair.name}`}
                        title={chair.name}
                      >
                        {/* The Circular Button */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center p-1 transition-all duration-300 relative border ${
                            isActive
                              ? 'scale-110 shadow-lg bg-white ring-2 ring-white/95'
                              : 'bg-white/80 hover:bg-white border-white/30 hover:scale-105 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={chair.image}
                            alt={chair.name}
                            className="w-full h-full object-contain pointer-events-none"
                          />
                        </div>

                        {/* Minimal progress bar beneath circle with 3s timeline */}
                        <div className="w-7 h-1 rounded-full bg-white/20 overflow-hidden mt-0.5">
                          {isActive ? (
                            <div
                              className="h-full rounded-full bg-white"
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          ) : (
                            <div
                              className={`h-full ${
                                idx < currentIndex ? 'w-full bg-white/40' : 'w-0'
                              }`}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full pt-1">
                {/* Primary Explore CTA */}
                <button
                  id="hero-explore-btn"
                  onClick={onExploreClick}
                  className="group flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#111622] bg-white hover:bg-slate-100 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <span>Explore Catalog</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {/* Secondary Inspect Piece Button */}
                <button
                  id="hero-inspect-btn"
                  onClick={() => handleInspect()}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-white/90" />
                  <span>Inspect</span>
                </button>

                {/* Wishlist Button */}
                <button
                  id="hero-wishlist-btn"
                  onClick={() => onToggleWishlist?.(matchingCatalogProduct)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer border ${
                    isSaved
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'bg-white/15 border-white/25 text-white hover:bg-white/30 hover:border-white'
                  }`}
                  aria-label="Save to wishlist"
                  title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

            </div>

            {/*
              CIRCULAR STAGE (When stagePosition === 'right', renders in column 2)
            */}
            {stagePosition === 'right' && (
              <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full order-2">
                <HeroOrbStage
                  activeChair={activeChair}
                  onInspectProduct={handleInspect}
                  isPaused={isPaused}
                  align="center"
                />
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

