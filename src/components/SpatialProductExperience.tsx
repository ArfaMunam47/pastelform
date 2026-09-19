import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Rotate3d,
  Maximize2,
  Sparkles,
  ArrowUpRight,
  Sun,
  Moon,
  Layers,
  Check,
  Eye,
  ShoppingBag,
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { SPATIAL_PRODUCTS, SpatialProduct, SpatialColorVariant, ProductHotspot } from '../data/spatialProducts';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

type ViewerMode = '3D' | 'COLORS' | 'DETAILS';

interface SpatialProductExperienceProps {
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex?: number) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const SpatialProductExperience: React.FC<SpatialProductExperienceProps> = ({
  onOpenDetail,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<ViewerMode>('3D');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<ProductHotspot | null>(null);

  const currentProduct: SpatialProduct = SPATIAL_PRODUCTS[activeProductIndex];
  const activeColor: SpatialColorVariant = currentProduct.colors[selectedColorIndex] || currentProduct.colors[0];

  // Matching catalog product for cart & modal actions
  const catalogProduct = PRODUCTS.find((p) => p.id === currentProduct.catalogId) || PRODUCTS[0];
  const isSaved = wishlistIds.includes(catalogProduct.id);

  // Drag rotation tracking
  const dragStartXRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (activeMode !== '3D') return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = rotationAngle;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || activeMode !== '3D') return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Map movement to rotation degrees
    const newAngle = (dragStartAngleRef.current + deltaX * 0.75) % 360;
    setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  // Reset color index when changing product
  const handleSelectProduct = (idx: number) => {
    if (idx === activeProductIndex) return;
    setActiveProductIndex(idx);
    setSelectedColorIndex(0);
    setActiveHotspot(null);
  };

  return (
    <section
      id="spatial-experience-section"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4F9F6] to-[#F7FAF9] text-[#131926] border-t border-slate-200/60"
    >
      {/* Delicate atmospheric pastels */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] rounded-full bg-[#E5F6EE] opacity-50 blur-[130px]" />
        <div className="absolute bottom-10 right-0 w-[550px] h-[550px] rounded-full bg-[#E8F1FC] opacity-45 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Main Grid: LEFT (Editorial Narrative) & RIGHT (Visually Dominant Interactive Stage) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: Editorial Narrative, Headline, CTA & Supporting Indicators
             ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
            
            {/* Small Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 bg-white/90 shadow-xs mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2D7D54]" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-700">
                INTERACTIVE EXPERIENCE
              </span>
            </motion.div>

            {/* Large Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-[-0.025em] font-semibold text-[#111622] mb-5"
            >
              Explore in <br />
              <span className="text-[#2D7D54] italic font-normal">3D & Augmented Space</span>
            </motion.h2>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-base sm:text-lg text-[#4B5565] leading-relaxed mb-7 max-w-md font-normal"
            >
              Visualize furniture from every angle, explore different finishes, and imagine how each piece transforms your space.
            </motion.p>

            {/* Primary CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <button
                id="spatial-try-now-btn"
                onClick={() => {
                  setActiveMode('3D');
                  setRotationAngle((prev) => (prev + 90) % 360);
                }}
                className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#111622] hover:bg-[#232B3B] shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>Try It Now</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenDetail(catalogProduct)}
                className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-[#111622] hover:bg-slate-100 transition-all cursor-pointer"
              >
                View Full Specs
              </button>
            </motion.div>

            {/*
              Small Feature Indicators (3 minimal items below CTA, as requested)
              - Rotate 360°
              - View in Space
              - See Details
            */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80 w-full max-w-lg"
            >
              {/* Feature 1 */}
              <div
                onClick={() => setActiveMode('3D')}
                className={`flex flex-col items-start gap-1 p-2 rounded-xl transition-all cursor-pointer ${
                  activeMode === '3D' ? 'bg-white shadow-xs' : 'hover:bg-white/50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#EAF5F0] text-[#2D7D54] flex items-center justify-center mb-1">
                  <Rotate3d className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#141A26]">Rotate 360°</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Explore every angle</p>
              </div>

              {/* Feature 2 */}
              <div
                onClick={() => setActiveMode('COLORS')}
                className={`flex flex-col items-start gap-1 p-2 rounded-xl transition-all cursor-pointer ${
                  activeMode === 'COLORS' ? 'bg-white shadow-xs' : 'hover:bg-white/50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#27699C] flex items-center justify-center mb-1">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#141A26]">Color Palette</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Switch fabric tones</p>
              </div>

              {/* Feature 3 */}
              <div
                onClick={() => setActiveMode('DETAILS')}
                className={`flex flex-col items-start gap-1 p-2 rounded-xl transition-all cursor-pointer ${
                  activeMode === 'DETAILS' ? 'bg-white shadow-xs' : 'hover:bg-white/50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#FDF0E6] text-[#A25F18] flex items-center justify-center mb-1">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#141A26]">See Details</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Explore materials</p>
              </div>
            </motion.div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Visually Dominant Interactive Stage
              - Segmented controls: 3D | AR | COLORS | DETAILS
              - One primary furniture piece with clean silhouette
              - Simulated 3D tilt, rotation grid, AR interior room, and color swatches
              - Quick product switcher rail (inspired by Reference 35747.png)
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center w-full relative">
            
            <div
              id="spatial-viewer-card"
              ref={viewerRef}
              className="relative w-full rounded-[30px] sm:rounded-[36px] bg-white border border-slate-200/90 shadow-[0_24px_55px_-15px_rgba(20,30,50,0.10)] overflow-hidden transition-all duration-700 flex flex-col"
              style={{ minHeight: '520px' }}
            >
              
              {/* TOP CONTROL BAR: Segmented navigation (3D | AR | COLORS | DETAILS) */}
              <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md">
                
                {/* Product Name & Index */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2D7D54]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                    {currentProduct.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    [{currentProduct.dimensions}]
                  </span>
                </div>

                {/* Segmented Mode Switcher (3D | COLORS | DETAILS) */}
                <div className="flex items-center p-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-inner">
                  {(['3D', 'COLORS', 'DETAILS'] as ViewerMode[]).map((mode) => {
                    const isActive = activeMode === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => {
                          setActiveMode(mode);
                          setActiveHotspot(null);
                        }}
                        className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer relative ${
                          isActive
                            ? 'text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-spatial-mode"
                            className="absolute inset-0 rounded-full bg-[#111622]"
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10">{mode}</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* MAIN VISUAL STAGE AREA */}
              <div
                className="relative flex-1 flex items-center justify-center overflow-hidden select-none"
                style={{ height: '420px', minHeight: '420px' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              >

                {/* -----------------------------------------------------------------
                    MODE: 3D STAGE (Perspective ground grid, framing marks & angle readout)
                   ----------------------------------------------------------------- */}
                {activeMode === '3D' && (
                  <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                    
                    {/* Perspective Spatial Floor Grid (Inspired by reference 35747.png) */}
                    <div
                      className="absolute bottom-0 w-[520px] h-[220px] opacity-45"
                      style={{
                        perspective: '600px',
                        transform: 'rotateX(62deg)',
                        backgroundImage: `
                          linear-gradient(to right, rgba(45, 125, 84, 0.18) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(45, 125, 84, 0.18) 1px, transparent 1px)
                        `,
                        backgroundSize: '36px 36px',
                        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
                      }}
                    />

                    {/* Corner Framing Marks [  ] (As in reference image 35747.png) */}
                    <div className="absolute w-[360px] sm:w-[420px] h-[340px] pointer-events-none">
                      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-slate-300/80 rounded-tl-sm" />
                      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-slate-300/80 rounded-tr-sm" />
                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-slate-300/80 rounded-bl-sm" />
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-slate-300/80 rounded-br-sm" />
                    </div>

                    {/* Degree Readout Badge */}
                    <div className="absolute top-4 left-5 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-[11px] font-mono text-slate-700">
                      <Rotate3d className="w-3.5 h-3.5 text-[#2D7D54]" />
                      <span className="font-bold">{Math.round(rotationAngle)}°</span>
                      <span className="text-slate-400">ROTATION</span>
                    </div>

                    {/* Drag helper hint */}
                    <div className="absolute bottom-4 left-5 px-3 py-1 rounded-full bg-slate-100/80 text-[11px] font-medium text-slate-500">
                      Drag horizontally to rotate 360°
                    </div>

                  </div>
                )}

                {/* -----------------------------------------------------------------
                    CENTRAL FURNITURE PRODUCT RENDER (ONE clean hero object)
                   ----------------------------------------------------------------- */}
                <div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, scale: 0.92, y: 12 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -6, 0],
                        transition: {
                          opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                          y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.94,
                        y: -10,
                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                      }}
                      className="relative flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] h-full"
                    >
                      {/* Interactive Simulated 3D Tilt & Horizontal Rotation */}
                      <div
                        className="relative transition-transform duration-100 ease-out flex items-center justify-center w-full"
                        style={{
                          transform: `perspective(900px) rotateY(${rotationAngle * 0.4}deg) rotateX(${
                            isDragging ? '6deg' : '0deg'
                          })`,
                        }}
                      >
                        {/* The Chair Product Image */}
                        <motion.img
                          key={`${currentProduct.id}-${activeColor.id}`}
                          src={currentProduct.image}
                          alt={currentProduct.name}
                          initial={{ opacity: 0.85, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="w-auto h-auto max-h-[270px] sm:max-h-[320px] object-contain drop-shadow-[0_20px_35px_rgba(20,28,45,0.22)] select-none pointer-events-none"
                          style={{
                            filter: activeColor.tintFilter || undefined,
                          }}
                          draggable={false}
                        />

                        {/* Soft Contact Ground Shadow beneath chair */}
                        <div
                          className="absolute -bottom-6 w-[56%] h-6 rounded-[100%] blur-md pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(ellipse at center, rgba(25, 35, 55, 0.38) 0%, rgba(25, 35, 55, 0) 72%)',
                          }}
                        />

                        {/* Interactive Hotspots (Visible in DETAILS mode) */}
                        {activeMode === 'DETAILS' && (
                          <div className="absolute inset-0 pointer-events-none">
                            {currentProduct.hotspots.map((hs) => {
                              const isSelected = activeHotspot?.id === hs.id;
                              return (
                                <button
                                  key={hs.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspot(isSelected ? null : hs);
                                  }}
                                  className="absolute pointer-events-auto cursor-pointer group"
                                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                                  title={hs.title}
                                >
                                  <span className="relative flex h-6 w-6 items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D7D54] opacity-70" />
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#2D7D54] border-2 border-white shadow-md items-center justify-center text-[10px] text-white font-bold">
                                      +
                                    </span>
                                  </span>

                                  {/* Floating Info Tooltip */}
                                  {isSelected && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.9, y: 6 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      className="absolute left-1/2 -translate-x-1/2 bottom-8 w-52 p-3 rounded-2xl bg-[#111622]/95 backdrop-blur-md text-white text-xs shadow-xl z-30 pointer-events-auto border border-white/15"
                                    >
                                      <div className="font-bold text-emerald-400 mb-1">{hs.title}</div>
                                      <p className="text-[11px] text-white/80 leading-relaxed">
                                        {hs.description}
                                      </p>
                                    </motion.div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* -----------------------------------------------------------------
                    RIGHT FLOATING COLLECTION RAIL (Directly inspired by Reference 35747.png)
                    - Vertical drawer allowing switching between the 4 designer chairs
                   ----------------------------------------------------------------- */}
                <div className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 p-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md">
                  <div className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-wider py-1 border-b border-slate-100">
                    MODELS
                  </div>
                  {SPATIAL_PRODUCTS.map((prod, idx) => {
                    const isSelected = activeProductIndex === idx;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => handleSelectProduct(idx)}
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center p-1 transition-all relative border cursor-pointer ${
                          isSelected
                            ? 'bg-[#111622] border-[#111622] shadow-sm scale-105'
                            : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:scale-102 opacity-75 hover:opacity-100'
                        }`}
                        title={prod.name}
                        aria-label={`Select ${prod.name}`}
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain pointer-events-none"
                        />
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* -----------------------------------------------------------------
                  BOTTOM CONTEXTUAL CONTROLS PANEL
                  - Changes dynamically based on activeMode (COLORS, DETAILS, 3D, AR)
                 ----------------------------------------------------------------- */}
              <div className="px-5 sm:px-7 py-3.5 bg-slate-50/95 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                
                {/* When COLORS mode is selected: Show 5 color swatches with names */}
                {activeMode === 'COLORS' ? (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="font-mono font-bold text-slate-600 uppercase tracking-wider text-[11px]">
                      Palette:
                    </span>
                    <div className="flex items-center gap-2">
                      {currentProduct.colors.map((color, cIdx) => {
                        const isColorActive = selectedColorIndex === cIdx;
                        return (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColorIndex(cIdx)}
                            className={`group relative flex items-center gap-1.5 p-1 rounded-full transition-all cursor-pointer border ${
                              isColorActive
                                ? 'bg-white shadow-xs border-slate-300 ring-2 ring-slate-900 ring-offset-1'
                                : 'bg-transparent border-transparent hover:bg-white/60'
                            }`}
                            title={color.name}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-black/10 shadow-xs block"
                              style={{ backgroundColor: color.colorHex }}
                            />
                            {isColorActive && (
                              <span className="text-[11px] font-semibold text-slate-800 pr-2">
                                {color.name}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : activeMode === 'DETAILS' ? (
                  /* When DETAILS mode is selected: Show specs summary */
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
                    <div>
                      <span className="font-bold text-slate-900">MATERIALS:</span> {currentProduct.materials}
                    </div>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <div>
                      <span className="font-bold text-slate-900">FRAME:</span> {currentProduct.frame}
                    </div>
                  </div>
                ) : (
                  /* Standard 3D & AR info */
                  <div className="flex items-center gap-3 text-[11px] text-slate-600 font-mono">
                    <span className="font-bold text-[#2D7D54]">{currentProduct.subtitle}</span>
                    <span className="text-slate-300">•</span>
                    <span>{currentProduct.designer}</span>
                  </div>
                )}

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2.5 ml-auto">
                  {/* Quick Add to Bag */}
                  <button
                    onClick={() => onQuickAdd(catalogProduct, selectedColorIndex)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111622] hover:bg-[#232B3B] text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => onToggleWishlist?.(catalogProduct)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer border ${
                      isSaved
                        ? 'bg-rose-500 border-rose-500 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:text-rose-500'
                    }`}
                    title={isSaved ? 'Saved' : 'Save'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
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
