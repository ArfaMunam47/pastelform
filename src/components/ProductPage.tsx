import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  Maximize2,
  Box,
  Layers,
  Ruler,
  Clock,
  ThumbsUp,
  Sparkle
} from 'lucide-react';
import { Product, ColorVariant } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, selectedColor: ColorVariant, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenProduct: (product: Product) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenProduct,
  onOpenCart,
  cartCount,
}) => {
  // Active finish / color variant
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'care' | 'reviews'>('overview');
  const [copied, setCopied] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [swatchRequested, setSwatchRequested] = useState(false);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedColorIndex(0);
    setQuantity(1);
  }, [product.id]);

  const activeVariant: ColorVariant =
    product.colorVariants[selectedColorIndex] || product.colorVariants[0];

  const handleAdd = () => {
    onAddToCart(product, activeVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2400);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Find 4 related complementary products in same or complementary category
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141A26] pb-24 antialiased selection:bg-[#141A26] selection:text-white">
      {/* =========================================================================
          STICKY TOP NAVIGATION BAR (With Back Button, Breadcrumbs, & Quick Bag)
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-black/[0.06] py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <button
              id="product-page-back-btn"
              onClick={onBack}
              className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white hover:bg-[#141A26] hover:text-white border border-black/10 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Exhibition</span>
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-2 text-xs text-[#737E92] truncate font-medium">
              <button onClick={onBack} className="hover:text-[#141A26] transition-colors cursor-pointer">
                Exhibition
              </button>
              <span>/</span>
              <span className="text-[#556075]">{product.category}</span>
              <span>/</span>
              <span className="text-[#141A26] font-semibold truncate">{product.name}</span>
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Share */}
            <button
              id="product-page-share-btn"
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#556075] hover:text-[#141A26] hover:border-black/20 shadow-xs transition-colors cursor-pointer"
              title="Share piece"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Wishlist Toggle */}
            <button
              id="product-page-wishlist-btn"
              onClick={() => onToggleWishlist(product)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-[#E74C3C]/10 border-[#E74C3C]/20 text-[#E74C3C]'
                  : 'bg-white border-black/10 text-[#556075] hover:text-[#141A26]'
              }`}
              title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#E74C3C]' : ''}`} />
            </button>

            {/* Shopping Bag */}
            <button
              id="product-page-cart-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141A26] text-white hover:bg-[#232B3B] text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer ml-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN PRODUCT CONTAINER
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* LEFT: HIGH-RESOLUTION 3D PRODUCT SHOWCASE & FINISHES */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Primary Display Stage */}
            <div className="relative rounded-3xl bg-white border border-black/[0.08] shadow-[0_16px_40px_-16px_rgba(20,26,40,0.06)] p-6 sm:p-12 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[520px] overflow-hidden group">
              
              {/* Subtle architectural background radiance */}
              <div
                className="absolute inset-0 pointer-events-none opacity-60 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${activeVariant.hex}22 0%, transparent 65%)`,
                }}
              />

              {/* Tag / Badge */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#141A26] text-white text-[10px] font-bold tracking-widest uppercase">
                  {product.badge || 'Sculptural Edition'}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/5 text-[#556075] text-[10px] font-semibold tracking-wider uppercase font-mono">
                  No. {product.id.slice(-4)}
                </span>
              </div>

              {/* Active Finish Label */}
              <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-xs font-mono text-[#556075] shadow-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/15"
                  style={{ backgroundColor: activeVariant.hex }}
                />
                <span>{activeVariant.name}</span>
              </div>

              {/* Main Product Image (Isolated 3D Render) */}
              <motion.div
                key={activeVariant.image}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-[480px] h-[340px] sm:h-[400px] flex items-center justify-center p-4"
              >
                <img
                  src={activeVariant.image}
                  alt={`${product.name} in ${activeVariant.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                />
              </motion.div>

              {/* Micro specs overlay bar */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-[#737E92]">
                <span className="hidden sm:inline">1:1 Studio Model</span>
                <span className="mx-auto sm:mx-0">
                  {typeof product.dimensions === 'object' && product.dimensions !== null
                    ? `${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height} ${product.dimensions.unit || 'cm'}`
                    : String(product.dimensions || '')}
                </span>
                <span className="hidden sm:inline">Designed in Copenhagen</span>
              </div>
            </div>

            {/* Finish Variant Thumbnails Strip */}
            <div className="p-4 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#141A26]">
                  Select Finish:
                </span>
                <span className="text-xs text-[#737E92] font-mono">
                  {product.colorVariants.length} Curated Options
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {product.colorVariants.map((variant, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#141A26] text-white border-[#141A26] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#556075] border-black/10 hover:border-black/25'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                        style={{ backgroundColor: variant.hex }}
                      />
                      <span>{variant.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Atelier Craftsmanship Highlights Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-black/[0.06] flex flex-col gap-1.5">
                <Truck className="w-4 h-4 text-[#2E7D56]" />
                <span className="text-xs font-bold text-[#141A26]">White Glove Placement</span>
                <span className="text-[11px] text-[#737E92] leading-tight">
                  Complimentary unboxing & debris removal
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.06] flex flex-col gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E7D56]" />
                <span className="text-xs font-bold text-[#141A26]">10-Year Warranty</span>
                <span className="text-[11px] text-[#737E92] leading-tight">
                  Full structural timber & frame guarantee
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/[0.06] flex flex-col gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#2E7D56]" />
                <span className="text-xs font-bold text-[#141A26]">30-Day Trial</span>
                <span className="text-[11px] text-[#737E92] leading-tight">
                  Effortless in-home living evaluation
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: BUYING COLUMN, SPECS & STORY */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Header: Title, Category & Price */}
            <div className="pb-6 border-b border-black/[0.08]">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#737E92]">
                  {product.category} • Atelier Edition
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#E67E22] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#E67E22]" />
                  <span>4.9</span>
                  <span className="text-[#8C98AA] font-normal">(48 Reviews)</span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-[#141A26] font-normal tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="font-editorial text-base sm:text-lg text-[#556075] mt-2.5 leading-relaxed">
                {product.subtitle || 'Architectural statement piece hand-sculpted in organic geometry.'}
              </p>

              {/* Price & Lead Time */}
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#141A26]">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#737E92] ml-2">USD • Taxes Included</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#2E7D56] bg-[#2E7D56]/10 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  <span>In Stock • Ships in 48h</span>
                </div>
              </div>
            </div>

            {/* Quantity & CTA Button Group */}
            <div className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#141A26]">
                  Quantity
                </span>
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-black/10">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#556075] hover:text-[#141A26] disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-sm font-bold min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#556075] hover:text-[#141A26] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Bag Primary CTA */}
              <button
                id="product-page-add-to-bag"
                onClick={handleAdd}
                className="w-full py-4 rounded-2xl bg-[#141A26] hover:bg-[#202738] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all duration-200 active:scale-[0.98] shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[2]" />
                    <span>Add to Bag • ${(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>

              {/* Secondary Actions: Free Swatches & White Glove Consultation */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setSwatchRequested(true);
                    setTimeout(() => setSwatchRequested(false), 3000);
                  }}
                  className="py-2.5 px-3 rounded-xl border border-black/10 hover:border-black/20 text-xs font-semibold text-[#556075] hover:text-[#141A26] bg-white transition-colors cursor-pointer text-center"
                >
                  {swatchRequested ? '✓ Swatches Ordered' : 'Order Free Swatches'}
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                    isWishlisted
                      ? 'border-[#E74C3C]/30 text-[#E74C3C] bg-[#E74C3C]/5'
                      : 'border-black/10 hover:border-black/20 text-[#556075] hover:text-[#141A26] bg-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#E74C3C]' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Save for Later'}</span>
                </button>
              </div>
            </div>

            {/* TABS: STORY, SPECIFICATIONS, CARE & REVIEWS */}
            <div className="rounded-3xl bg-white border border-black/[0.08] p-6 shadow-sm">
              
              {/* Tab navigation pills */}
              <div className="flex items-center gap-2 pb-4 border-b border-black/[0.06] overflow-x-auto">
                {(
                  [
                    { id: 'overview', label: 'Story' },
                    { id: 'specs', label: 'Dimensions' },
                    { id: 'care', label: 'Care' },
                    { id: 'reviews', label: 'Reviews' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#141A26] text-white shadow-xs'
                        : 'text-[#737E92] hover:text-[#141A26] hover:bg-black/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="pt-4 text-xs leading-relaxed text-[#556075]">
                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    <p className="font-editorial text-sm text-[#141A26] leading-relaxed">
                      {product.editorialStory ||
                        (product as any).story ||
                        'Conceived as an architectural intervention in living spaces, this piece explores the harmony of organic curves and monolithic stability. Handcrafted by master artisans with FSC-certified timbers and double-woven textiles.'}
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px]">
                      <div className="p-2.5 rounded-xl bg-[#FAF8F5]">
                        <span className="block text-[#8C98AA] uppercase text-[10px]">Primary Material</span>
                        <span className="font-bold text-[#141A26]">{product.material}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FAF8F5]">
                        <span className="block text-[#8C98AA] uppercase text-[10px]">Fabric Rub Count</span>
                        <span className="font-bold text-[#141A26]">65,000 Martindale</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b border-black/5">
                      <span className="text-[#8C98AA]">Overall Dimensions</span>
                      <span className="font-bold text-[#141A26]">
                        {typeof product.dimensions === 'object' && product.dimensions !== null
                          ? `${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height} ${product.dimensions.unit || 'cm'}${product.dimensions.seatHeight ? ` (Seat: ${product.dimensions.seatHeight} ${product.dimensions.unit || 'cm'})` : ''}`
                          : String(product.dimensions || '')}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-black/5">
                      <span className="text-[#8C98AA]">Gross Weight</span>
                      <span className="font-bold text-[#141A26]">28.5 kg / 62.8 lbs</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-black/5">
                      <span className="text-[#8C98AA]">Frame Composition</span>
                      <span className="font-bold text-[#141A26]">Kiln-Dried FSC Beech & Solid Ash</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-black/5">
                      <span className="text-[#8C98AA]">Assembly</span>
                      <span className="font-bold text-[#141A26]">Delivered fully assembled</span>
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-2.5">
                    <p>
                      Vacuum weekly using a soft upholstery brush attachment on low suction. For liquid spills, immediately blot with a clean, dry microfiber cloth. Avoid rubbing into the bouclé fibers.
                    </p>
                    <p>
                      Keep away from prolonged direct sunlight to preserve textile color depth. Professional steam cleaning recommended annually.
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#141A26]">Elena V. — Zurich</span>
                        <div className="flex text-[#E67E22]"><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /></div>
                      </div>
                      <p className="text-[11px] italic">
                        "The sculptural silhouette commands the room without being overpowering. The tactile bouclé feels incredible to the touch."
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#141A26]">Marcus L. — Copenhagen</span>
                        <div className="flex text-[#E67E22]"><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /><Star className="w-3 h-3 fill-[#E67E22]" /></div>
                      </div>
                      <p className="text-[11px] italic">
                        "Flawless delivery and packaging. It looks like a museum exhibit in our living pavilion."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            CURATED PAIRINGS ("COMPLETE THE SPACE")
           ========================================================================= */}
        <section className="mt-20 pt-12 border-t border-black/[0.08]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#737E92]">
                Architectural Curation
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#141A26] mt-1">
                Complete The Living Space
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold uppercase tracking-wider text-[#141A26] hover:underline cursor-pointer"
            >
              View Full Exhibition →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => onOpenProduct(relProduct)}
                className="group rounded-2xl bg-white border border-black/[0.08] hover:border-black/20 p-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="w-full h-44 flex items-center justify-center p-3 relative overflow-hidden">
                  <img
                    src={relProduct.colorVariants[0].image}
                    alt={relProduct.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-3 border-t border-black/5 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8C98AA] block uppercase">
                      {relProduct.category}
                    </span>
                    <h3 className="font-sans font-bold text-sm text-[#141A26] group-hover:text-black">
                      {relProduct.name}
                    </h3>
                  </div>
                  <span className="font-sans font-bold text-sm text-[#141A26]">
                    ${relProduct.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};
