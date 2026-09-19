import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, TreePine, Compass, ArrowRight, RotateCw, Eye } from 'lucide-react';
import { Product } from '../types';

interface PinnedProductStoryProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
}

interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  rotation: { x: number; y: number; scale: number };
  accentColor: string;
  pastelBg: string;
  description: string;
  hotspots: { label: string; x: string; y: string }[];
  specs: { key: string; val: string }[];
}

export const PinnedProductStory: React.FC<PinnedProductStoryProps> = ({
  product,
  onOpenDetail,
  onQuickAdd,
}) => {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const chapters: StoryChapter[] = [
    {
      id: 1,
      title: 'Monolithic Contours',
      subtitle: 'Sculpted in Copenhagen without rigid angles',
      badge: '01 / GEOMETRY',
      icon: <Compass className="w-4 h-4 text-[#527A9E]" />,
      rotation: { x: 2, y: -4, scale: 1 },
      accentColor: '#527A9E',
      pastelBg: 'bg-gradient-to-br from-[#EEF5FB] via-[#E2EFFB] to-[#D5E6F5]',
      description: 'Zero hard angles. The outer shell follows the natural curve of the human spine, providing complete lumbar immersion while maintaining an elevated 3/4 floating silhouette.',
      hotspots: [
        { label: 'Organic 120° Incline', x: '25%', y: '30%' },
        { label: 'Seamless Outer Shell', x: '75%', y: '45%' },
      ],
      specs: [
        { key: 'Incline Angle', val: '118° Ergonomic' },
        { key: 'Contour Gauge', val: 'Continuous Cold Form' },
      ]
    },
    {
      id: 2,
      title: 'Cold-Cured Latex Core',
      subtitle: 'Dual-density foam that remembers your posture',
      badge: '02 / ANATOMY',
      icon: <Layers className="w-4 h-4 text-[#9B82C8]" />,
      rotation: { x: -3, y: 8, scale: 1.04 },
      accentColor: '#9B82C8',
      pastelBg: 'bg-gradient-to-br from-[#F5EFFC] via-[#EBDCF9] to-[#DFCBF4]',
      description: 'Beneath the tactile bouclé lies an engineered cold-cured latex core wrapped around a solid kiln-dried hardwood skeleton, guaranteed against sagging for over 25 years.',
      hotspots: [
        { label: 'High-Density Base Core', x: '50%', y: '60%' },
        { label: 'Memory Cushion Layer', x: '50%', y: '40%' },
      ],
      specs: [
        { key: 'Foam Density', val: '48 kg/m³ High Resilience' },
        { key: 'Load Rating', val: 'Tested to 320 kg' },
      ]
    },
    {
      id: 3,
      title: 'Biella Virgin Wool Bouclé',
      subtitle: 'Heavy-gauge unbleached loop yarn from Northern Italy',
      badge: '03 / TACTILITY',
      icon: <ShieldCheck className="w-4 h-4 text-[#529E74]" />,
      rotation: { x: 4, y: -6, scale: 1.02 },
      accentColor: '#529E74',
      pastelBg: 'bg-gradient-to-br from-[#EDF7F2] via-[#E0F2E8] to-[#D2EBDE]',
      description: 'Spun from 100% unbleached virgin wool with tight irregular loops that capture natural sunlight. Treated with an invisible organic shield to repel liquids and resist wear.',
      hotspots: [
        { label: 'Virgin Wool Looped Surface', x: '45%', y: '25%' },
        { label: 'Invisible Spill Shield', x: '65%', y: '55%' },
      ],
      specs: [
        { key: 'Martindale Rubs', val: '85,000 Cycles' },
        { key: 'Composition', val: '92% Wool, 8% Linen' },
      ]
    },
    {
      id: 4,
      title: 'FSC European White Oak',
      subtitle: 'Solid timber joinery with acoustic felt dampers',
      badge: '04 / FOUNDATION',
      icon: <TreePine className="w-4 h-4 text-[#C97242]" />,
      rotation: { x: 8, y: 2, scale: 0.98 },
      accentColor: '#C97242',
      pastelBg: 'bg-gradient-to-br from-[#FEF2EC] via-[#FCE4D8] to-[#F8D2C0]',
      description: 'Milled from sustainable European white oak with natural visible grain variations. Hand-rubbed with organic matte oil and fitted with floor-protecting acoustic gliders.',
      hotspots: [
        { label: 'Solid White Oak Timber', x: '50%', y: '82%' },
        { label: 'Acoustic Floor Gliders', x: '25%', y: '90%' },
      ],
      specs: [
        { key: 'Wood Origin', val: 'FSC European Oak' },
        { key: 'Finish', val: 'Organic Matte Hardwax' },
      ]
    }
  ];

  const currentChapter = chapters[activeChapterIdx];
  const currentVariant = product.colorVariants?.[selectedColorIdx] || {
    name: 'Warm Ivory',
    hex: '#F7F4EE',
    image: product.images[0]
  };

  return (
    <section
      id="pinned-product-story"
      className="py-16 sm:py-24 relative overflow-hidden bg-[#FAF7F2] border-t border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-black/5 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A37B3E]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#182030]">
              Interactive Animation 02 • Pinned Product Story
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-light text-[#182030] tracking-tight">
            Anatomy of an <span className="italic font-normal">Iconic Form</span>
          </h2>
          <p className="font-editorial text-[#5A6372] text-base sm:text-lg mt-2">
            Step through the layers of craft, material provenance, and ergonomics behind the Solis Lounge Chair.
          </p>
        </div>

        {/* Pinned Scrollytelling Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Interactive 3D Pinned Stage (Takes 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Stage Pod */}
            <div
              className={`relative w-full aspect-square sm:aspect-[4/3] rounded-[36px] p-8 flex items-center justify-center transition-all duration-700 ${currentChapter.pastelBg} border border-white/60 shadow-pastel-lg`}
              style={{ perspective: '1400px' }}
            >
              {/* 3D Model with Dynamic Chapter Rotation */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 ease-out"
                style={{
                  transform: `perspective(1400px) rotateX(${currentChapter.rotation.x}deg) rotateY(${currentChapter.rotation.y}deg) scale(${currentChapter.rotation.scale})`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src={currentVariant.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[85%] max-w-[88%] object-contain select-none transition-all duration-700"
                />

                {/* Animated Interactive Hotspots */}
                {currentChapter.hotspots.map((spot, i) => (
                  <div
                    key={spot.label}
                    className="absolute z-30 transition-all duration-500 pointer-events-none"
                    style={{ left: spot.x, top: spot.y }}
                  >
                    <div className="relative flex items-center">
                      <div className="relative flex items-center justify-center w-6 h-6">
                        <span
                          className="absolute w-6 h-6 rounded-full animate-ping opacity-40"
                          style={{ backgroundColor: currentChapter.accentColor }}
                        />
                        <span
                          className="relative w-3 h-3 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: currentChapter.accentColor }}
                        />
                      </div>
                      <span className="ml-2 px-2.5 py-1 rounded-full bg-white/95 text-[#182030] text-[10px] font-bold shadow-md border border-black/5 whitespace-nowrap">
                        {spot.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stage Controls: Color Swatches & 3D Status */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-20">
                {/* Swatches */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/85 backdrop-blur-md shadow-xs border border-black/5">
                  {product.colorVariants?.map((v, i) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedColorIdx(i)}
                      title={v.name}
                      className={`w-4 h-4 rounded-full transition-all border border-black/10 ${
                        selectedColorIdx === i ? 'scale-125 ring-1.5 ring-[#182030]' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: v.hex }}
                    />
                  ))}
                  <span className="text-[10px] font-semibold text-[#182030] px-1.5">
                    {currentVariant.name}
                  </span>
                </div>

                {/* Inspect Button */}
                <button
                  onClick={() => onOpenDetail(product)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#182030] hover:bg-[#2A344A] text-white text-[11px] font-semibold shadow-xs transition-all"
                >
                  <Eye className="w-3 h-3" />
                  <span>Inspect 3D</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Chapter Steps & Deep Story Content (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Interactive Chapter Tab Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-black/[0.04] border border-black/5">
              {chapters.map((ch, idx) => {
                const isActive = activeChapterIdx === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterIdx(idx)}
                    className={`py-2 px-2.5 rounded-xl text-center transition-all flex flex-col items-center gap-1 ${
                      isActive
                        ? 'bg-white text-[#182030] font-bold shadow-xs'
                        : 'text-[#6A7382] hover:text-[#182030] hover:bg-white/50'
                    }`}
                  >
                    <span className="text-[10px] font-mono tracking-wider">{ch.badge.split(' / ')[0]}</span>
                    <span className="text-xs font-semibold line-clamp-1">{ch.badge.split(' / ')[1]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Card */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-black/5 shadow-pastel-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentChapter.accentColor}18` }}
                >
                  {currentChapter.icon}
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: currentChapter.accentColor }}
                >
                  {currentChapter.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#182030] tracking-tight">
                {currentChapter.title}
              </h3>
              <p className="text-sm font-medium text-[#7A8598] mt-1">
                {currentChapter.subtitle}
              </p>

              <p className="font-editorial text-sm text-[#4A5468] leading-relaxed mt-4">
                {currentChapter.description}
              </p>

              {/* Spec Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-black/5">
                {currentChapter.specs.map((sp) => (
                  <div key={sp.key} className="p-3 rounded-2xl bg-[#FAF8F5] border border-black/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A94A6] block">
                      {sp.key}
                    </span>
                    <span className="text-xs font-bold text-[#182030] block mt-0.5">
                      {sp.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Row */}
              <div className="mt-6 pt-4 flex items-center justify-between gap-3">
                <div className="text-lg font-bold text-[#182030]">
                  ${product.price.toLocaleString()}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onQuickAdd(product, selectedColorIdx)}
                    className="px-4 py-2 rounded-full bg-[#182030] hover:bg-[#2A344A] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => onOpenDetail(product)}
                    className="p-2 rounded-full border border-black/10 hover:bg-black/5 text-[#182030] transition-all"
                    title="View Full Product Sheet"
                  >
                    <ArrowRight className="w-4 h-4" />
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
