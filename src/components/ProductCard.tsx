import React, { useState } from 'react';
import { Heart, Plus, Check, Eye, RefreshCw, Ruler, Layers, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  isLarge?: boolean;
}

// Harmonious pastel clay palette matching user reference images
const CATEGORY_PASTELS: Record<string, { bg: string; hoverBg: string; border: string; tagBg: string; text: string; glow: string }> = {
  'Dining Chairs': { bg: '#FCF7E8', hoverBg: '#FAF2D7', border: '#EFE2BD', tagBg: '#F7E6B5', text: '#7E5B10', glow: 'rgba(230, 191, 92, 0.18)' },
  'Sofas': { bg: '#F6EFFD', hoverBg: '#EFE4FB', border: '#E4D3F5', tagBg: '#EBDBFA', text: '#644287', glow: 'rgba(155, 130, 200, 0.18)' },
  'Armchairs': { bg: '#EDF7F2', hoverBg: '#E2F2E9', border: '#D3ECDE', tagBg: '#D8EFE3', text: '#2B6846', glow: 'rgba(82, 158, 116, 0.18)' },
  'Lounge Chairs': { bg: '#EEF6FD', hoverBg: '#E2EFFB', border: '#D2E6F8', tagBg: '#D6EAF8', text: '#2A5D8A', glow: 'rgba(78, 141, 196, 0.18)' },
  'Dining Tables': { bg: '#EDF5EE', hoverBg: '#E1EFE3', border: '#D1E6D4', tagBg: '#D7EBD9', text: '#2D613D', glow: 'rgba(74, 141, 99, 0.18)' },
  'Coffee Tables': { bg: '#EEF5FC', hoverBg: '#E2EFF9', border: '#D2E5F6', tagBg: '#D7E9F8', text: '#24567F', glow: 'rgba(78, 141, 196, 0.18)' },
  'Side Tables': { bg: '#F6EFF9', hoverBg: '#EFE4F6', border: '#E2D1ED', tagBg: '#E9DAF3', text: '#684589', glow: 'rgba(144, 108, 184, 0.18)' },
  'Cabinets': { bg: '#EDF4EE', hoverBg: '#E2EFE4', border: '#D2E6D5', tagBg: '#D7EBD9', text: '#2A5B37', glow: 'rgba(69, 133, 90, 0.18)' },
  'Desks': { bg: '#FDF1EB', hoverBg: '#F9E6DC', border: '#F2D3C4', tagBg: '#F7DCCE', text: '#8A4228', glow: 'rgba(178, 98, 68, 0.18)' },
  'Beds': { bg: '#F8EEF4', hoverBg: '#F3E1EC', border: '#EACEDF', tagBg: '#EFD6E5', text: '#7E385E', glow: 'rgba(158, 91, 127, 0.18)' },
  'Bedside Tables': { bg: '#F4EEFA', hoverBg: '#EDE2F7', border: '#DFCFEE', tagBg: '#E6D7F3', text: '#644485', glow: 'rgba(140, 109, 175, 0.18)' },
  'Bookshelves': { bg: '#EDF6F1', hoverBg: '#E1F0E7', border: '#D1E7D9', tagBg: '#D7EBDD', text: '#276848', glow: 'rgba(66, 147, 107, 0.18)' },
  'Benches': { bg: '#FEF2EC', hoverBg: '#FDE7DC', border: '#F7D2C0', tagBg: '#FCDCCB', text: '#9B4524', glow: 'rgba(220, 108, 67, 0.18)' },
  'Stools': { bg: '#EEF5FB', hoverBg: '#E3EFF8', border: '#D3E5F4', tagBg: '#D9E9F6', text: '#2A5978', glow: 'rgba(78, 125, 158, 0.18)' },
  'Ottomans': { bg: '#F9EEF5', hoverBg: '#F4E1ED', border: '#ECCDE0', tagBg: '#F1D6E6', text: '#7A395E', glow: 'rgba(156, 91, 124, 0.18)' },
  'Lighting': { bg: '#FFF7ED', hoverBg: '#FEF0DC', border: '#FDE0BA', tagBg: '#FDE7C8', text: '#8C5611', glow: 'rgba(212, 134, 36, 0.18)' },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onToggleWishlist,
  isWishlisted,
  onQuickAdd,
  isLarge = false
}) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentVariant =
    (product.colorVariants && product.colorVariants[selectedVariantIdx]) ||
    (product.colorVariants && product.colorVariants[0]) ||
    { name: 'Standard', hex: '#DDD0EC', bgGradient: 'from-[#EDE6F5] to-[#DDD0EC]', image: product.images?.[0] || '' };

  const pastel = CATEGORY_PASTELS[product.category] || {
    bg: '#FAF4EB',
    hoverBg: '#F5EBDD',
    border: '#E8DCCB',
    tagBg: '#EDE0CE',
    text: '#48382A',
    glow: 'rgba(100, 80, 60, 0.15)'
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedVariantIdx);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleFlipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      id={`product-card-wrapper-${product.id}`}
      className="relative w-full"
      style={{ perspective: '1400px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Flippable Card Container */}
      <div
        id={`product-card-${product.id}`}
        onClick={() => onOpenDetail(product)}
        className="group relative rounded-[28px] sm:rounded-[32px] p-5 sm:p-5.5 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between overflow-hidden h-[450px] sm:h-[470px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          boxShadow: isHovered 
            ? 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.02), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9), 0 20px 40px -12px rgba(22, 28, 44, 0.09), 0 2px 6px rgba(22, 28, 44, 0.03)' 
            : 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.02), inset 0 1px 2px 0 rgba(255, 255, 255, 0.8), 0 4px 20px -4px rgba(22, 28, 44, 0.04), 0 1px 2px rgba(22, 28, 44, 0.02)'
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="w-full flex flex-col justify-between h-full"
          style={{
            backfaceVisibility: 'hidden',
            display: isFlipped ? 'none' : 'flex'
          }}
        >
          {/* Top Bar: Category, Badge, 3D Flip & Wishlist (Uniform fixed height) */}
          <div className="relative z-20 flex items-center justify-between w-full h-7 mb-1 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase"
                style={{ backgroundColor: pastel.tagBg, color: pastel.text }}
              >
                {product.category}
              </span>
              {product.badge ? (
                <span className="px-2 py-0.5 rounded-full bg-white/90 text-[9px] font-bold tracking-wider text-[#182030] border border-black/5 shadow-xs">
                  {product.badge}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[9px] font-medium tracking-wider text-[#64748B]">
                  {product.material}
                </span>
              )}
            </div>

            {/* Action Buttons: 3D Flip & Wishlist */}
            <div className="flex items-center gap-1.5">
              {/* 3D Flip Transition Button */}
              <button
                id={`flip-btn-${product.id}`}
                onClick={handleFlipClick}
                title="3D Flip: View Blueprint & Anatomy"
                aria-label="3D Flip blueprint"
                className="w-7.5 h-7.5 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-[#4A5568] hover:text-[#182030] shadow-xs border border-black/5 transition-all duration-300 hover:rotate-180"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Wishlist Button */}
              <button
                id={`wishlist-btn-${product.id}`}
                onClick={handleWishlistClick}
                aria-label="Add to wishlist"
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-200 border border-black/5 ${
                  isWishlisted
                    ? 'text-[#C95332] bg-white shadow-xs ring-1 ring-[#C95332]/20'
                    : 'text-[#8A94A6] hover:text-[#182030] bg-white/80 hover:bg-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C95332]' : ''}`} />
              </button>
            </div>
          </div>

          {/* 3D Isolated Product Stage with Exact Uniform Height */}
          <div
            className="relative w-full flex-1 min-h-[190px] max-h-[230px] flex items-center justify-center my-1 transition-all duration-500 bg-transparent overflow-visible"
            style={{ perspective: '1200px' }}
          >
            {/* 3D Elevated Furniture Object */}
            <div
              className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-3 select-none transition-all duration-500 ease-out"
              style={{
                transform: isHovered
                  ? 'perspective(1200px) rotateX(-2deg) rotateY(4.5deg) translateY(-6px) scale(1.05) translateZ(28px)'
                  : 'perspective(1200px) rotateX(2deg) rotateY(-3deg) translateY(0px) scale(1) translateZ(6px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {!hasError ? (
                <img
                  src={currentVariant.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setHasError(true)}
                  className={`max-h-[92%] max-w-[92%] object-contain select-none transition-all duration-500 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-xs font-semibold text-[#303848]">{product.name}</span>
                  <span className="text-[10px] text-[#7A8598] mt-0.5">3D Render Available</span>
                </div>
              )}
            </div>

            {/* Quick Action Pill on Hover */}
            <div
              className={`absolute bottom-1 z-20 flex items-center gap-2 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <button
                id={`flip-pill-${product.id}`}
                onClick={handleFlipClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#182030] text-[11px] font-bold shadow-pastel-sm border border-black/5 transition-all"
              >
                <RefreshCw className="w-3 h-3 text-[#A37B3E]" />
                <span>3D Flip</span>
              </button>
              <button
                id={`quickview-btn-${product.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(product);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#182030] hover:bg-[#2A344A] text-white text-[11px] font-semibold shadow-pastel-sm transition-all"
              >
                <Eye className="w-3 h-3" />
                <span>Inspect</span>
              </button>
            </div>
          </div>

          {/* Card Bottom: Product Information & Architectural Typography (Exact Fixed Height across all cards) */}
          <div className="relative z-20 pt-2.5 border-t border-black/[0.06] flex flex-col justify-between h-[122px] flex-shrink-0">
            
            {/* Color Swatch Dots / Material Indicator (Uniform Height for every single card) */}
            <div className="flex items-center gap-1.5 h-5">
              {product.colorVariants && product.colorVariants.length > 1 ? (
                <>
                  {product.colorVariants.map((variant, index) => {
                    const isActive = selectedVariantIdx === index;
                    return (
                      <button
                        key={variant.name}
                        id={`card-swatch-${product.id}-${index}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVariantIdx(index);
                        }}
                        title={variant.name}
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-200 border border-black/10 ${
                          isActive ? 'scale-125 ring-1.5 ring-offset-1 ring-[#182030]' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: variant.hex }}
                      />
                    );
                  })}
                  <span className="text-[11px] text-[#64748B] font-medium ml-1">
                    {currentVariant.name}
                  </span>
                </>
              ) : (
                <>
                  <span 
                    className="w-3 h-3 rounded-full border border-black/10 shadow-xs flex-shrink-0"
                    style={{ backgroundColor: currentVariant.hex }}
                  />
                  <span className="text-[11px] text-[#64748B] font-medium">
                    {currentVariant.name} • {product.material}
                  </span>
                </>
              )}
            </div>

            {/* Product Name (Punchy, never truncates with dot dot) */}
            <div>
              <h4 className="font-display font-medium text-lg sm:text-[19px] text-[#182030] tracking-tight leading-snug">
                {product.name}
              </h4>
              <p className="font-editorial text-xs text-[#64748B] line-clamp-1 mt-0.5">
                {product.subtitle}
              </p>
            </div>

            {/* Price & Quick Add */}
            <div className="flex items-center justify-between pt-1">
              <div className="text-base font-semibold text-[#182030] tracking-tight">
                ${product.price.toLocaleString()}
              </div>

              <button
                id={`quick-add-${product.id}`}
                onClick={handleQuickAddClick}
                disabled={addedAnimation}
                className={`flex items-center justify-center rounded-full transition-all duration-200 shadow-xs ${
                  addedAnimation
                    ? 'px-3 py-1.5 bg-[#2E7D52] text-white text-[11px] font-semibold'
                    : 'w-8 h-8 bg-white/90 hover:bg-[#182030] hover:text-white text-[#182030] active:scale-95 border border-black/5'
                }`}
                title="Quick add to bag"
              >
                {addedAnimation ? (
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

        {/* BACK SIDE (3D Flip Blueprint & Material X-Ray View) */}
        <div
          className="w-full flex flex-col justify-between h-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: isFlipped ? 'flex' : 'none'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Back Top Bar */}
          <div className="flex items-center justify-between w-full mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 text-[#182030] text-[10px] font-mono font-bold tracking-wider uppercase">
              <Ruler className="w-3 h-3 text-[#A37B3E]" />
              <span>Architectural Blueprint</span>
            </div>
            <button
              onClick={handleFlipClick}
              title="Flip back to 3D View"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#182030] text-[10px] font-bold shadow-xs border border-black/5 hover:bg-[#182030] hover:text-white transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Front</span>
            </button>
          </div>

          {/* Blueprint Specs Body */}
          <div className="flex-1 flex flex-col justify-center space-y-3 py-2">
            {/* Dimensions Grid */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-black/5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A7382] block mb-1.5">
                Exact Dimensions ({product.dimensions.unit})
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-1.5 rounded-xl bg-black/[0.03]">
                  <span className="text-[10px] text-[#808996] block">Width</span>
                  <span className="text-xs font-bold text-[#182030]">{product.dimensions.width} cm</span>
                </div>
                <div className="p-1.5 rounded-xl bg-black/[0.03]">
                  <span className="text-[10px] text-[#808996] block">Depth</span>
                  <span className="text-xs font-bold text-[#182030]">{product.dimensions.depth} cm</span>
                </div>
                <div className="p-1.5 rounded-xl bg-black/[0.03]">
                  <span className="text-[10px] text-[#808996] block">Height</span>
                  <span className="text-xs font-bold text-[#182030]">{product.dimensions.height} cm</span>
                </div>
              </div>
            </div>

            {/* Material & Construction */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-black/5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A7382] block mb-1">
                Material & Craft
              </span>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#182030]">
                <Layers className="w-3.5 h-3.5 text-[#A37B3E]" />
                <span>{product.material}</span>
              </div>
              <p className="text-[11px] text-[#6A7382] mt-1 line-clamp-2 leading-relaxed">
                {product.features[0] || product.subtitle}
              </p>
            </div>

            {/* In-Stock & Dispatch */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/60 border border-black/5 text-[11px]">
              <span className="text-[#6A7382]">Lead Time</span>
              <span className="font-bold text-[#2E7D52] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {product.leadTime || 'In Stock'}
              </span>
            </div>
          </div>

          {/* Back Action Bar */}
          <div className="pt-3 border-t border-black/5 flex items-center justify-between gap-2">
            <button
              onClick={() => onOpenDetail(product)}
              className="flex-1 py-2 px-3 rounded-full bg-white hover:bg-[#182030] hover:text-white text-[#182030] text-xs font-semibold border border-black/5 shadow-xs transition-all text-center"
            >
              Full Specification
            </button>
            <button
              onClick={handleQuickAddClick}
              disabled={addedAnimation}
              className="py-2 px-4 rounded-full bg-[#182030] hover:bg-[#2A344A] text-white text-xs font-semibold shadow-xs transition-all"
            >
              {addedAnimation ? 'Added!' : `Add $${product.price}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
