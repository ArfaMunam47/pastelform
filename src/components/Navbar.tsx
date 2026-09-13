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
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onScrollToSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-2.5' : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="glass-surface px-6 sm:px-8 py-3 rounded-full flex items-center justify-between transition-all duration-300">
            
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-8 lg:gap-12">
              <button
                id="brand-logo-btn"
                onClick={() => onScrollToSection('hero-showcase-section')}
                className="flex items-center gap-2.5 text-left focus:outline-none group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A202C] group-hover:scale-125 transition-transform duration-300" />
                <span className="font-display text-lg tracking-[0.08em] text-[#111622] uppercase">
                  Pastel & Form
                </span>
              </button>

              {/* Desktop Nav Links: Shop, Collections, New Arrivals */}
              <nav className="hidden md:flex items-center gap-7">
                <button
                  id="nav-link-shop"
                  onClick={() => onScrollToSection('signature-collection-section')}
                  className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#505765] hover:text-[#111622] transition-colors"
                >
                  Shop
                </button>
                <button
                  id="nav-link-collections"
                  onClick={() => onScrollToSection('curated-collections-section')}
                  className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#505765] hover:text-[#111622] transition-colors"
                >
                  Collections
                </button>
                <button
                  id="nav-link-new-arrivals"
                  onClick={() => onScrollToSection('new-arrivals-section')}
                  className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#505765] hover:text-[#111622] transition-colors"
                >
                  New Arrivals
                </button>
                <button
                  id="nav-link-lighting-studio"
                  onClick={() => onScrollToSection('cta-showcase-section')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E53945]/10 text-[#E53945] text-[11px] tracking-[0.1em] uppercase font-bold hover:bg-[#E53945]/20 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E53945] animate-pulse" />
                  3D Studio
                </button>
              </nav>
            </div>

            {/* Right: Search, Wishlist, Bag */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                id="navbar-search-btn"
                onClick={onOpenSearch}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A5260] hover:text-[#111622] hover:bg-white/70 transition-all active:scale-95"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[1.5]" />
              </button>

              <button
                id="navbar-wishlist-btn"
                onClick={onOpenWishlist}
                className="hidden sm:flex relative w-9 h-9 rounded-full items-center justify-center text-[#4A5260] hover:text-[#111622] hover:bg-white/70 transition-all active:scale-95"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D66847]" />
                )}
              </button>

              <button
                id="navbar-cart-btn"
                onClick={onOpenCart}
                className="flex items-center gap-2 pl-3.5 pr-4 py-1.5 rounded-full bg-[#1A202C] text-white hover:bg-[#2D3748] transition-all active:scale-95 shadow-tactile"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.75]" />
                <span className="text-[11px] font-medium tracking-wider uppercase">Bag</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                id="navbar-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#4A5260] hover:bg-white/70"
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
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="md:hidden max-w-6xl mx-auto px-4 mt-2"
            >
              <div className="glass-surface rounded-2xl p-5 shadow-pastel-lg flex flex-col gap-3.5">
                <button
                  onClick={() => {
                    onScrollToSection('signature-collection-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.14em] font-medium text-[#2D3748] py-1"
                >
                  Shop
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('curated-collections-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.14em] font-medium text-[#2D3748] py-1"
                >
                  Collections
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('new-arrivals-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.14em] font-medium text-[#2D3748] py-1"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('cta-showcase-section');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.14em] font-bold text-[#E53945] py-1 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E53945]" />
                  <span>3D Lighting Studio</span>
                </button>
                <button
                  onClick={() => {
                    onOpenWishlist();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-[0.14em] font-medium text-[#2D3748] py-1 flex items-center justify-between"
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5E7EB]">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
