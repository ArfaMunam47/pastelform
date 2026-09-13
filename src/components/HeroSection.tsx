import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  heroProduct?: Product;
  featuredProducts?: Product[];
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onExploreClick: () => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
  wishlistIds?: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProduct,
  featuredProducts,
  onOpenProduct,
  onQuickAdd,
  onExploreClick,
  onToggleWishlist,
  isWishlisted = false,
  wishlistIds = []
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeProduct = heroProduct || (featuredProducts && featuredProducts.length > 0 ? featuredProducts[0] : undefined);

  if (!activeProduct) {
    return null;
  }

  const currentColor =
    (activeProduct.colorVariants && activeProduct.colorVariants[selectedColorIdx]) ||
    (activeProduct.colorVariants && activeProduct.colorVariants[0]) ||
    { name: 'Default', hex: '#EBE3F4', bgGradient: 'from-[#F5EFFE] to-[#EBE3F4]', image: activeProduct.images[0] };

  const isSaved = isWishlisted || wishlistIds.includes(activeProduct.id);

  const handleQuickAdd = () => {
    onQuickAdd(activeProduct, selectedColorIdx);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <section
      id="hero-showcase-section"
      className="relative min-h-[90vh] pt-28 pb-16 px-4 sm:px-6 lg:px-10 flex flex-col justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FBF8F3 0%, #F5EFF8 50%, #EDE6F5 100%)'
      }}
    >
      {/* Soft atmospheric ambient light aura */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Lavender / Peach aura glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-[#E5D8F2] blur-[110px] opacity-75" />
        <div className="absolute -top-16 right-10 w-[420px] h-[420px] rounded-full bg-[#FCECE4] blur-[90px] opacity-65" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Architectural Subtitle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#202736]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#545E70]">
              2026 Architectural Furniture Showcase
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs tracking-wider text-[#606A7C]">
            <span>Copenhagen Edition</span>
            <span className="w-1 h-1 rounded-full bg-black/30" />
            <span>Limited Studio Release</span>
          </div>
        </div>

        {/* Main Grid: Left Details & Right Heroic Isolated 3D Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Architectural Typography & Specifications */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#8A67B5]" />
              <span className="text-[11px] font-semibold tracking-wider text-[#2D3748] uppercase">
                {activeProduct.badge || 'Sculptural Icon'}
              </span>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <span className="text-[11px] text-[#718096]">
                Pure Organic Form
              </span>
            </div>

            {/* Main Title in 3D Cartoonish-Professional Fredoka Typography */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] text-[#141A26] text-3d-clay tracking-[-0.015em] mb-4">
              {activeProduct.name}
            </h1>

            {/* Editorial Descriptor */}
            <p className="font-editorial text-base sm:text-lg text-[#556073] leading-relaxed mb-6 max-w-lg">
              {activeProduct.description}
            </p>

            {/* Material & Architectural Specs Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md p-4 rounded-2xl bg-white/60 border border-black/5 mb-7">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A8598] block mb-0.5">
                  Material
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1E2636]">
                  {activeProduct.material} • Italian Silk Weave
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A8598] block mb-0.5">
                  Dimensions
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1E2636]">
                  {activeProduct.dimensions.width}W × {activeProduct.dimensions.depth}D × {activeProduct.dimensions.height}H cm
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A8598] block mb-0.5">
                  Craftsmanship
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1E2636]">
                  Cold-Cured Latex Core
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A8598] block mb-0.5">
                  Lead Time
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1E2636]">
                  {activeProduct.leadTime || 'In Stock'}
                </span>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              <div className="mr-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#7A8598] block font-semibold">
                  Investment
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#141A26]">
                    ${activeProduct.price.toLocaleString()}
                  </span>
                  {activeProduct.originalPrice && (
                    <span className="text-sm text-[#8E99AA] line-through font-normal">
                      ${activeProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action: Add to Bag */}
              <button
                id="hero-quick-add-btn"
                onClick={handleQuickAdd}
                disabled={addedAnimation}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-tactile ${
                  addedAnimation
                    ? 'bg-[#2E7D52] text-white'
                    : 'bg-[#182030] text-white hover:bg-[#2A3448] active:scale-95'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[2]" />
                    <span>Acquire Piece</span>
                  </>
                )}
              </button>

              {/* Action: Inspect Details */}
              <button
                id="hero-inspect-btn"
                onClick={() => onOpenProduct(activeProduct)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-full glass-pill text-xs font-semibold tracking-wider text-[#182030] hover:bg-white active:scale-95 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Spec</span>
              </button>

              {/* Wishlist */}
              {onToggleWishlist && (
                <button
                  id="hero-wishlist-btn"
                  onClick={() => onToggleWishlist(activeProduct)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isSaved
                      ? 'bg-white text-[#C95332] shadow-xs'
                      : 'glass-pill text-[#6A7588] hover:text-[#182030] hover:bg-white'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C95332]' : ''}`} />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Isolated 3D Product Presentation on Pastel Pedestal */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* The Pastel Showcase Stage Pod: Expansive, sculptural, allowing product to breathe and dominate */}
            <div
              className="relative w-full aspect-[4/3] max-w-[700px] rounded-[44px] bg-[#EBE3F4]/90 p-4 sm:p-6 flex items-center justify-center transition-all duration-700 overflow-visible"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.95), 0 24px 60px -20px rgba(45, 30, 65, 0.12)'
              }}
            >
              {/* Soft interior lighting gradient */}
              <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-[#DDD0EC] via-[#E8DEFA] to-[#F5EFFE] opacity-75 pointer-events-none" />

              {/* Diffused ambient spotlight center */}
              <div className="absolute w-96 h-96 rounded-full bg-white/50 blur-3xl pointer-events-none" />

              {/* Multi-layered Realistic Ground Contact Shadow */}
              {/* Layer 1: Wide soft ambient floor shadow */}
              <div
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[560px] h-10 bg-[#161022] rounded-[100%] pointer-events-none -z-10 transition-all duration-500"
                style={{
                  opacity: isHovered ? 0.32 : 0.42,
                  filter: isHovered ? 'blur(28px)' : 'blur(20px)',
                  transform: `translateX(-50%) scale(${isHovered ? 1.06 : 1})`
                }}
              />
              {/* Layer 2: Deep direct contact occlusion line */}
              <div
                className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 w-[72%] max-w-[420px] h-3.5 bg-[#0C0816] rounded-[100%] pointer-events-none -z-10 transition-all duration-500"
                style={{
                  opacity: isHovered ? 0.45 : 0.58,
                  filter: 'blur(8px)',
                  transform: `translateX(-50%) scale(${isHovered ? 0.95 : 1})`
                }}
              />

              {/* Isolated 3D Cutout Image: VISUALLY LARGER, occupying full presentation volume */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center p-0 cursor-pointer transition-transform duration-500 ease-out"
                onClick={() => onOpenProduct(activeProduct)}
                style={{
                  transform: isHovered ? 'translateY(-12px) scale(1.06)' : 'translateY(0) scale(1.02)'
                }}
              >
                <img
                  src={currentColor.image}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[102%] max-w-[102%] object-contain select-none transition-all duration-500"
                  style={{
                    filter: 'drop-shadow(0 20px 24px rgba(22, 16, 36, 0.18)) drop-shadow(0 6px 10px rgba(22, 16, 36, 0.09))'
                  }}
                />
              </div>

              {/* Floating Architectural Badge */}
              <div className="absolute top-5 left-6 z-20">
                <span className="px-3.5 py-1 rounded-full bg-white/90 text-[10px] font-bold tracking-widest text-[#45375A] shadow-xs uppercase border border-white/60">
                  Studio Masterpiece
                </span>
              </div>

              {/* Floating Interactive Inspect Trigger */}
              <div className="absolute bottom-5 right-6 z-20">
                <button
                  onClick={() => onOpenProduct(activeProduct)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-xs font-semibold text-[#202736] shadow-pastel-sm hover:shadow-pastel-md transition-all active:scale-95 border border-white/80"
                >
                  <span>360° Inspection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Under-Stage Architectural Navigation Prompt */}
            <div className="mt-4 flex items-center justify-between w-full max-w-[620px] px-2 text-xs text-[#7A8598]">
              <span className="italic font-editorial text-sm">
                "Form follows comfort — 2026 Studio Archival Entry"
              </span>
              <button
                onClick={onExploreClick}
                className="font-medium text-[#202736] hover:underline flex items-center gap-1"
              >
                <span>View Full Collection</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
