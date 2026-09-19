import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onScrollToSection: (sectionId: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  activeHeroColor?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onScrollToSection,
  activeHeroColor = '#111622',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-navigation-header"
        className="relative z-40 w-full pt-2 pb-1 sm:pt-2.5 sm:pb-1.5 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="px-5 sm:px-7 py-2 sm:py-2.5 rounded-full flex items-center justify-between transition-all duration-300 bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-[0_8px_25px_-8px_rgba(20,24,35,0.05)]"
          >
            {/* Left: Brand Identity & Ultra-Clean Architectural Wordmark */}
            <div className="flex items-center gap-7 lg:gap-10">
              <button
                id="brand-logo-btn"
                onClick={() => onScrollToSection('hero-showcase-section')}
                className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
              >
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-sans text-[11px] font-bold tracking-tight shadow-xs group-hover:scale-105 transition-all duration-700"
                  style={{ backgroundColor: activeHeroColor }}
                >
                  P
                </div>
                <span 
                  className="font-sans font-bold text-xs sm:text-[13px] tracking-[0.22em] uppercase leading-none transition-colors duration-700 group-hover:opacity-80"
                  style={{ color: activeHeroColor }}
                >
                  PASTEL & FORM
                </span>
              </button>

              {/* Desktop Nav Links: Pure refined luxury sans typography */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                <button
                  id="nav-link-hero"
                  onClick={() => onScrollToSection('hero-showcase-section')}
                  className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#4A5468] hover:text-[#111622] transition-colors cursor-pointer"
                >
                  Exhibition
                </button>
                <button
                  id="nav-link-lighting"
                  onClick={() => onScrollToSection('cta-showcase-section')}
                  className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#4A5468] hover:text-[#111622] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111622]" />
                  <span>Light Studio</span>
                </button>
                <button
                  id="nav-link-shop"
                  onClick={() => onScrollToSection('signature-collection-section')}
                  className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#4A5468] hover:text-[#111622] transition-colors cursor-pointer"
                >
                  Catalog
                </button>
                <button
                  id="nav-link-curated"
                  onClick={() => onScrollToSection('curated-collections-section')}
                  className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#4A5468] hover:text-[#111622] transition-colors cursor-pointer"
                >
                  Curated
                </button>
              </nav>
            </div>

            {/* Right: Search, Minimalist Wishlist (no red number badge!), Luxury Bag Pill */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                id="navbar-search-btn"
                onClick={onOpenSearch}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A5468] hover:text-[#111622] hover:bg-black/5 transition-all active:scale-95 cursor-pointer"
                aria-label="Search"
                title="Search furniture"
              >
                <Search className="w-4 h-4 stroke-[1.75]" />
              </button>

              {/* Wishlist button: Dynamically matching hero color and logo */}
              <button
                id="navbar-wishlist-btn"
                onClick={onOpenWishlist}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 active:scale-95 cursor-pointer hover:brightness-95"
                style={{ 
                  color: activeHeroColor,
                  backgroundColor: `${activeHeroColor}18`
                }}
                aria-label="Wishlist"
                title="Saved Pieces"
              >
                <Heart 
                  className="w-4 h-4 transition-all duration-700" 
                  style={{ 
                    stroke: activeHeroColor,
                    strokeWidth: 2,
                    fill: wishlistCount > 0 ? activeHeroColor : 'none' 
                  }} 
                />
              </button>

              {/* Dynamic Bag Pill matching hero section color */}
              <button
                id="navbar-cart-btn"
                onClick={onOpenCart}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-white transition-all duration-700 active:scale-95 shadow-sm cursor-pointer hover:brightness-110"
                style={{ backgroundColor: activeHeroColor }}
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                <span className="text-[11px] font-semibold tracking-widest uppercase">
                  Bag {cartCount > 0 ? `(${cartCount})` : ''}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                id="navbar-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#4A5468] hover:bg-black/5 cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Minimal Clean Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden max-w-6xl mx-auto px-4 mt-2 pointer-events-auto"
            >
              <div className="glass-surface rounded-2xl p-4 shadow-xl border border-black/[0.08] bg-white/95 backdrop-blur-2xl flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    onScrollToSection('hero-showcase-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.16em] font-semibold text-[#141A26] py-1.5"
                >
                  Exhibition Showcase
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('cta-showcase-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.16em] font-semibold text-[#141A26] py-1.5"
                >
                  3D Light Studio
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('signature-collection-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.16em] font-semibold text-[#141A26] py-1.5"
                >
                  Catalog
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('curated-collections-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.16em] font-semibold text-[#141A26] py-1.5"
                >
                  Curated Sets
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
