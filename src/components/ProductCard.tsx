import React, { useState } from 'react';
import { Heart, Plus, Check, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  isLarge?: boolean;
}

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
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentVariant =
    (product.colorVariants && product.colorVariants[selectedVariantIdx]) ||
    (product.colorVariants && product.colorVariants[0]) ||
    { name: 'Standard', hex: '#DDD0EC', bgGradient: 'from-[#EDE6F5] to-[#DDD0EC]', image: product.images?.[0] || '' };
  const stageBackground = product.stageBg || 'bg-[#EAE4F2]';

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

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetail(product)}
      className="group relative rounded-[32px] p-5 sm:p-6 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between overflow-hidden"
      style={{
        background: `linear-gradient(175deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.72) 100%)`,
        boxShadow: isHovered 
          ? '0 24px 48px -12px rgba(22, 28, 44, 0.12), inset 0 2px 2px rgba(255, 255, 255, 1)' 
          : '0 12px 32px -8px rgba(22, 28, 44, 0.05), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.85)'
      }}
    >
      {/* Top Bar: Category & Wishlist */}
      <div className="relative z-20 flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5A6372]">
            {product.category}
          </span>
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[9px] font-bold tracking-wider text-[#182030] shadow-xs border border-black/5">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? 'text-[#C95332] bg-white shadow-xs ring-1 ring-[#C95332]/20'
              : 'text-[#8A94A6] hover:text-[#182030] hover:bg-white/80'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C95332]' : ''}`} />
        </button>
      </div>

      {/* 3D Isolated Product Environment with Sophisticated Pastel Stage */}
      <div
        className={`relative w-full rounded-[26px] flex items-center justify-center my-2 transition-all duration-500 overflow-hidden ${stageBackground} ${
          isLarge ? 'h-80 sm:h-92' : 'h-64 sm:h-72'
        }`}
        style={{
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.02), 0 8px 24px -6px rgba(20, 25, 35, 0.06)'
        }}
      >
        {/* Soft Radial Ambient Lighting */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)`,
            opacity: isHovered ? 0.95 : 0.75
          }}
        />

        {/* Colored ambient glow accent matching product hue */}
        <div
          className="absolute w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-500"
          style={{
            backgroundColor: product.accentHex || currentVariant.hex,
            opacity: isHovered ? 0.28 : 0.18,
            transform: isHovered ? 'scale(1.2)' : 'scale(1)'
          }}
        />

        {/* Soft Ground Contact Shadow (Layer 1: Wide ambient ground occlusion) */}
        <div
          className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 w-4/5 max-w-[260px] h-5 bg-[#121824] rounded-[100%] pointer-events-none -z-10 transition-all duration-500"
          style={{
            opacity: isHovered ? 0.22 : 0.32,
            filter: 'blur(14px)',
            transform: `translateX(-50%) scale(${isHovered ? 1.08 : 1})`
          }}
        />

        {/* Soft Contact Shadow (Layer 2: Crisp direct contact line right under feet) */}
        <div
          className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 w-3/5 max-w-[180px] h-2 bg-[#0E141E] rounded-[100%] pointer-events-none -z-10 transition-all duration-500"
          style={{
            opacity: isHovered ? 0.35 : 0.48,
            filter: 'blur(6px)',
            transform: `translateX(-50%) scale(${isHovered ? 0.95 : 1})`
          }}
        />

        {/* Isolated 3D Cutout Furniture Object: Visually Larger & Scaled */}
        <div
          className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-3 transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? 'translateY(-8px) scale(1.04)' : 'translateY(0) scale(1)'
          }}
        >
          <img
            src={currentVariant.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-[94%] max-w-[94%] object-contain select-none transition-all duration-500"
            style={{
              filter: 'drop-shadow(0 14px 18px rgba(18, 24, 38, 0.16)) drop-shadow(0 4px 6px rgba(18, 24, 38, 0.08))'
            }}
          />
        </div>

        {/* Inspect Pill on Hover */}
        <div
          className={`absolute bottom-3 z-20 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            id={`quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-[#182030] text-xs font-semibold hover:bg-white shadow-pastel-sm transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect 3D Spec</span>
          </button>
        </div>
      </div>

      {/* Card Bottom: Product Information & Architectural Typography */}
      <div className="relative z-20 pt-3 border-t border-black/5">
        
        {/* Color Swatch Dots */}
        {product.colorVariants && product.colorVariants.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2">
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
            <span className="text-[10px] text-[#6A7382] ml-1">
              {currentVariant.name}
            </span>
          </div>
        )}

        {/* Product Name & Subtitle */}
        <h4 className="font-display font-normal text-lg sm:text-xl text-[#182030] tracking-tight line-clamp-1">
          {product.name}
        </h4>
        <p className="font-editorial text-sm text-[#5F697A] line-clamp-1 mt-0.5">
          {product.subtitle}
        </p>

        {/* Price & Quick Add */}
        <div className="flex items-center justify-between mt-3 pt-2">
          <div className="text-sm font-semibold text-[#182030]">
            ${product.price.toLocaleString()}
          </div>

          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAddClick}
            disabled={addedAnimation}
            className={`flex items-center justify-center rounded-full transition-all duration-200 ${
              addedAnimation
                ? 'px-3 py-1.5 bg-[#2E7D52] text-white text-[11px] font-semibold'
                : 'w-8 h-8 glass-pill text-[#182030] hover:bg-[#182030] hover:text-white active:scale-95'
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
  );
};
