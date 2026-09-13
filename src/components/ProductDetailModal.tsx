import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Truck, 
  Shield, 
  Layers, 
  Sparkles, 
  Ruler, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Product, ColorVariant } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: ColorVariant, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onDirectCheckout: (product: Product, selectedColor: ColorVariant, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onDirectCheckout
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedColorIdx(0);
    setSelectedImageIdx(0);
    setQuantity(1);
    setJustAdded(false);
  }, [product?.id]);

  if (!product || !isOpen) return null;

  const activeColor =
    (product.colorVariants && product.colorVariants[selectedColorIdx]) ||
    (product.colorVariants && product.colorVariants[0]) ||
    { name: 'Standard', hex: '#EBE3F4', bgGradient: 'from-[#F5EFFE] to-[#EBE3F4]', image: product.images?.[0] || '' };

  const galleryImages = (product.images && product.images.length > 0) ? product.images : [activeColor.image];
  const currentImage = selectedImageIdx < galleryImages.length ? galleryImages[selectedImageIdx] : activeColor.image;

  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    // If the variant has a direct image, reset gallery to first
    setSelectedImageIdx(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  const handleAddToCartClick = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, activeColor, quantity);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#161A22]/40 backdrop-blur-sm"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF8F5] rounded-[36px] shadow-2xl border border-white/90 overflow-hidden flex flex-col z-10 my-auto"
      >
        {/* Header Close Bar */}
        <div className="absolute top-5 right-5 z-30">
          <button
            id="close-product-detail-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#2B3240] hover:text-black flex items-center justify-center shadow-pastel-sm hover:scale-105 active:scale-95 transition-all"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-9 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: 3D Visualization Stage & Gallery */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Main Visual Stage (Soft pastel background matching product stageBg or selected color) */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                }}
                className={`relative w-full aspect-square sm:aspect-[4/3] rounded-[32px] p-6 flex items-center justify-center overflow-hidden ${product.stageBg || 'bg-[#F2EDE4]'} border border-black/5 shadow-pastel-md transition-all duration-700 ease-out`}
              >
                {/* Ambient Halo behind product */}
                <div
                  className="absolute w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none transition-colors duration-700"
                  style={{ backgroundColor: activeColor.hex }}
                />

                {/* Main Product Image (Isolated 3D render) */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 max-h-[88%] max-w-[92%] object-contain contact-shadow hover:scale-104 transition-transform duration-500 select-none"
                  />
                </AnimatePresence>

                {/* Soft Contact Floor Shadow */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4 max-w-[280px] h-6 bg-[#161D28] blur-md rounded-[100%] pointer-events-none -z-10 opacity-30" />

                {/* Material Tag Pill Top-Left */}
                <div className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-black/5 text-xs font-bold text-[#2A313E]">
                  {product.material}
                </div>
              </div>

              {/* Gallery Image Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => {
                    const isCurrent = selectedImageIdx === idx;
                    return (
                      <button
                        key={idx}
                        id={`gallery-thumb-${idx}`}
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`relative w-18 h-18 rounded-2xl overflow-hidden p-1.5 border transition-all ${
                          isCurrent
                            ? 'border-[#23272F] bg-white shadow-pastel-sm scale-105'
                            : 'border-white/80 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} angle ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Architectural Dimensions Blueprint Box */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#EDE8E1] shadow-pastel-sm">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#737C8C]">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Exact Studio Dimensions</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-[#FAF8F5]">
                    <span className="text-[10px] text-[#868F9F] uppercase block">Width</span>
                    <span className="text-xs font-extrabold text-[#1C2027]">{product.dimensions.width} {product.dimensions.unit}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5]">
                    <span className="text-[10px] text-[#868F9F] uppercase block">Depth</span>
                    <span className="text-xs font-extrabold text-[#1C2027]">{product.dimensions.depth} {product.dimensions.unit}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5]">
                    <span className="text-[10px] text-[#868F9F] uppercase block">Height</span>
                    <span className="text-xs font-extrabold text-[#1C2027]">{product.dimensions.height} {product.dimensions.unit}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Product Specs & Actions */}
            <div className="lg:col-span-6 flex flex-col">
              
              {/* Category & Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#EAF6EF] text-[#2D7551] text-[11px] font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#FAF1CE] text-[#8C6C0F] text-[11px] font-bold uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C2027] tracking-tight mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-[#616A79] mb-4">
                {product.subtitle}
              </p>

              {/* Price & Reviews Bar */}
              <div className="flex items-baseline gap-4 py-3 border-y border-[#EDE8E1] mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#1C2027]">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#8891A0] line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 pl-4 border-l border-[#EDE8E1]">
                  <div className="flex items-center text-[#E27856]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E27856]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#23272F]">
                    {product.rating.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#7B8494]">
                    ({product.reviewsCount} collector reviews)
                  </span>
                </div>
              </div>

              {/* Editorial Description */}
              <p className="text-sm text-[#4E5666] leading-relaxed mb-6 font-normal">
                {product.description}
              </p>

              {/* Colorway Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#707886]">
                    Selected Colorway: <strong className="text-[#1C2027] normal-case">{activeColor.name}</strong>
                  </label>
                  <span className="text-xs text-[#529E74] font-semibold">
                    {product.inStock ? 'Ready to Ship' : 'Made to Order'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {product.colorVariants.map((variant, idx) => {
                    const isSelected = selectedColorIdx === idx;
                    return (
                      <button
                        key={variant.name}
                        id={`detail-color-${idx}`}
                        onClick={() => handleColorChange(idx)}
                        className={`group relative flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-white border-[#23272F] shadow-pastel-sm ring-2 ring-offset-2 ring-[#23272F]'
                            : 'bg-white/60 border-[#EDE8E1] hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: variant.hex }}
                        />
                        <span className="text-xs font-semibold text-[#2B3240]">
                          {variant.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features Pill List */}
              <div className="mb-8 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#707886] block mb-2">
                  Studio Craftsmanship Highlights
                </span>
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#515968]">
                    <Check className="w-3.5 h-3.5 text-[#529E74] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Quantity & CTA Button Row */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
                {/* Quantity Control */}
                <div className="flex items-center justify-between bg-white border border-[#EDE8E1] rounded-full px-4 py-2.5 shadow-pastel-sm sm:w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#555E6D] hover:text-black hover:bg-[#F2EFE9] text-base font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-[#1C2027]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#555E6D] hover:text-black hover:bg-[#F2EFE9] text-base font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="detail-add-to-bag-btn"
                  onClick={handleAddToCartClick}
                  disabled={isAdding}
                  className={`flex-1 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-tactile ${
                    justAdded 
                      ? 'bg-[#529E74] text-white' 
                      : 'bg-[#23272F] hover:bg-black text-white hover:scale-102 active:scale-98'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Bag ✓</span>
                    </>
                  ) : isAdding ? (
                    <span>Adding...</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  id="detail-wishlist-toggle-btn"
                  onClick={() => onToggleWishlist(product)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                    isWishlisted 
                      ? 'bg-[#E27856] text-white border-[#E27856] shadow-xs' 
                      : 'bg-white border-[#EDE8E1] text-[#4A5362] hover:bg-[#FAF8F5] shadow-pastel-sm'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Direct Buy Now Button */}
              <button
                id="detail-buy-now-btn"
                onClick={() => onDirectCheckout(product, activeColor, quantity)}
                className="w-full py-3 rounded-full bg-[#EAF6EF] hover:bg-[#DCF2E4] text-[#246342] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mb-6"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#EDE8E1] text-xs text-[#6B7484]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#529E74]" />
                  <span>Complimentary White-Glove delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#266D9E]" />
                  <span>10-Year structural frame warranty</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
