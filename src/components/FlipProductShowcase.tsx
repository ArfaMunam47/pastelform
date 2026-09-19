import React, { useState } from 'react';
import { Sparkles, RefreshCw, Ruler, Shield, Layers, ArrowRight, Eye, Check, Plus, Info } from 'lucide-react';
import { Product } from '../types';

interface FlipProductShowcaseProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
}

export const FlipProductShowcase: React.FC<FlipProductShowcaseProps> = ({
  products,
  onOpenDetail,
  onQuickAdd,
}) => {
  // Select 4 iconic models representing different silhouettes
  const selectableProducts = [
    products.find(p => p.id === 'prod-chair-kanso') || products[2], // Yellow Chair
    products.find(p => p.id === 'prod-table-paloma') || products.find(p => p.id === 'prod-table-travertine') || products[1], // Sculptural Table
    products.find(p => p.id === 'prod-bench-arcadia') || products[3], // Coral Bench
    products.find(p => p.id === 'prod-lamp-astral') || products[4], // Clean Luxury Lamp
  ].filter(Boolean) as Product[];

  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const currentProduct = selectableProducts[activeProductIdx] || selectableProducts[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -9;
    const tiltY = ((x - centerX) / centerX) * 9;
    setMouseTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(currentProduct, 0);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <section
      id="flip-showcase-section"
      className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#F5F1E8]/50 via-[#F7EFFC]/40 to-[#EBF6F0]/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-black/5 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9B82C8]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#182030]">
              Interactive Animation 03 • 3D Flip Transition
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-light text-[#182030] tracking-tight">
            Dual-Sided <span className="italic font-normal">3D Architecture</span>
          </h2>
          <p className="font-editorial text-[#5A6372] text-base sm:text-lg mt-2">
            Click the card or the 3D Flip button to rotate between photorealistic studio view and the exploded structural blueprint.
          </p>

          {/* Model Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {selectableProducts.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => {
                  setActiveProductIdx(idx);
                  setIsFlipped(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  activeProductIdx === idx
                    ? 'bg-[#182030] text-white border-[#182030] shadow-xs scale-105'
                    : 'bg-white/80 hover:bg-white text-[#5A6372] border-black/5'
                }`}
              >
                {prod.name.split(' ')[0]} {prod.category}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Flip Card Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div
            className="w-full relative"
            style={{ perspective: '1600px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* The Flipping Element */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full rounded-[40px] p-6 sm:p-10 cursor-pointer transition-all duration-700 ease-out select-none"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${isFlipped ? 0 : mouseTilt.x}deg) rotateY(${isFlipped ? 180 : mouseTilt.y}deg)`,
                backgroundColor: isFlipped ? '#F7F5F0' : '#FAF8F4',
                boxShadow: '0 24px 60px -16px rgba(24, 28, 40, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
                border: '1.5px solid rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* FRONT: Visual Studio Stage */}
              <div
                className="w-full flex flex-col items-center"
                style={{
                  backfaceVisibility: 'hidden',
                  display: isFlipped ? 'none' : 'flex'
                }}
              >
                {/* Top Controls Bar */}
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#182030] border border-black/5 shadow-xs">
                      {currentProduct.category}
                    </span>
                    <span className="text-xs text-[#7A8598] font-mono">3D Exterior Angle</span>
                  </div>

                  {/* 3D Flip Trigger Badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#182030] text-white text-xs font-bold shadow-xs hover:bg-[#2A344A] transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#E6BF5C]" />
                    <span>Flip to Blueprint</span>
                  </button>
                </div>

                {/* Main 3D Render Stage */}
                <div
                  className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-6 my-2"
                  style={{ perspective: '1200px' }}
                >
                  {/* Narrow Base Shadow */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/5 max-w-[260px] h-3 bg-[#121824] rounded-[100%] pointer-events-none -z-10 opacity-24 blur-[7px]" />

                  {/* Projected 3D Model */}
                  <img
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[92%] max-w-[92%] object-contain select-none transition-transform duration-500 hover:scale-105"
                    style={{
                      filter: 'drop-shadow(0 20px 26px rgba(18, 24, 38, 0.15)) drop-shadow(0 6px 10px rgba(18, 24, 38, 0.08))'
                    }}
                  />

                  {/* Click to Flip hint */}
                  <div className="absolute bottom-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/5 text-[11px] font-semibold text-[#5A6372] shadow-xs">
                    Click anywhere on card to flip
                  </div>
                </div>

                {/* Front Footer Info */}
                <div className="w-full pt-6 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-display font-normal text-[#182030] tracking-tight">
                      {currentProduct.name}
                    </h3>
                    <p className="font-editorial text-sm text-[#5A6372] mt-0.5">
                      {currentProduct.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-[#182030]">
                      ${currentProduct.price.toLocaleString()}
                    </span>
                    <button
                      onClick={handleQuickAddClick}
                      disabled={addedAnimation}
                      className="px-5 py-2.5 rounded-full bg-[#182030] hover:bg-[#2A344A] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                    >
                      {addedAnimation ? 'Added to Bag!' : 'Quick Add'}
                    </button>
                  </div>
                </div>
              </div>

              {/* BACK: 3D Architectural Blueprint & Anatomical X-Ray */}
              <div
                className="w-full flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: isFlipped ? 'flex' : 'none'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Back Header */}
                <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-black/5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#182030] text-white">
                      Isometric Spec Sheet
                    </span>
                    <span className="text-xs text-[#7A8598] font-mono">Structural Blueprint</span>
                  </div>

                  <button
                    onClick={() => setIsFlipped(false)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#182030] text-xs font-bold shadow-xs border border-black/5 hover:bg-[#182030] hover:text-white transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Flip to 3D View</span>
                  </button>
                </div>

                {/* Blueprint Anatomy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-2">
                  {/* Left: Dimensions Blueprint (7 cols) */}
                  <div className="md:col-span-7 p-6 rounded-3xl bg-white border border-black/5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Ruler className="w-4 h-4 text-[#A37B3E]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#182030]">
                          Metric Dimensions & Clearances
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center my-4">
                        <div className="p-3 rounded-2xl bg-[#F6F4EE]">
                          <span className="text-[10px] font-bold text-[#8A94A6] block uppercase">Width</span>
                          <span className="text-base font-bold text-[#182030] block mt-0.5">{currentProduct.dimensions.width} cm</span>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#F6F4EE]">
                          <span className="text-[10px] font-bold text-[#8A94A6] block uppercase">Depth</span>
                          <span className="text-base font-bold text-[#182030] block mt-0.5">{currentProduct.dimensions.depth} cm</span>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#F6F4EE]">
                          <span className="text-[10px] font-bold text-[#8A94A6] block uppercase">Height</span>
                          <span className="text-base font-bold text-[#182030] block mt-0.5">{currentProduct.dimensions.height} cm</span>
                        </div>
                      </div>

                      <div className="text-xs text-[#5A6372] space-y-1.5 mt-4">
                        <div className="flex justify-between py-1 border-b border-black/[0.04]">
                          <span>Seat / Deck Height:</span>
                          <span className="font-bold text-[#182030]">{currentProduct.dimensions.seatHeight || 42} cm</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-black/[0.04]">
                          <span>Net Weight:</span>
                          <span className="font-bold text-[#182030]">18.4 kg</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Assembly Required:</span>
                          <span className="font-bold text-[#2E7D52]">Zero (Monolithic Delivery)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Craft & Provenance (5 cols) */}
                  <div className="md:col-span-5 flex flex-col justify-between gap-4">
                    <div className="p-5 rounded-3xl bg-white border border-black/5 shadow-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-[#529E74]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#182030]">
                          Material Grade
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#182030] block">
                        {currentProduct.material}
                      </span>
                      <p className="text-xs text-[#6A7382] mt-1 leading-relaxed">
                        {currentProduct.features[0] || currentProduct.description}
                      </p>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-black/5 shadow-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-[#9B82C8]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#182030]">
                          Warranty & Provenance
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#182030] block">
                        10-Year Structural Guarantee
                      </span>
                      <span className="text-[11px] text-[#6A7382] block mt-0.5">
                        {currentProduct.leadTime || 'In Stock (3-5 Days)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Footer Actions */}
                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <button
                    onClick={() => onOpenDetail(currentProduct)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-black/5 text-[#182030] text-xs font-bold border border-black/10 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Full 3D Inspector</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleQuickAddClick}
                      disabled={addedAnimation}
                      className="px-6 py-2.5 rounded-full bg-[#182030] hover:bg-[#2A344A] text-white text-xs font-semibold shadow-xs transition-all"
                    >
                      {addedAnimation ? 'Added!' : `Purchase for $${currentProduct.price}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
