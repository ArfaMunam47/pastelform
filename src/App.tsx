import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedGallery } from './components/FeaturedGallery';
import { CategoryExperience } from './components/CategoryExperience';
import { ProductGrid } from './components/ProductGrid';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { EditorialShowcase } from './components/EditorialShowcase';
import { BestSellersSection } from './components/BestSellersSection';
import { MaterialSection } from './components/MaterialSection';
import { CuratedCollectionsSection } from './components/CuratedCollectionsSection';
import { ManifestoSection } from './components/ManifestoSection';
import { CallToActionSection } from './components/CallToActionSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast, ToastMessage } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ColorVariant, FurnitureCategory } from './types';

export default function App() {
  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0], // Solstice Armchair
      selectedColor: PRODUCTS[0].colorVariants[0],
      quantity: 1
    }
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);

  // Navigation & Filtering state
  const [selectedCategory, setSelectedCategory] = useState<FurnitureCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Micro-interaction Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Add Handler
  const handleAddToCart = (product: Product, selectedColor: ColorVariant, quantity: number) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor.name === selectedColor.name
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `cart-${product.id}-${selectedColor.name}-${Date.now()}`,
            product,
            selectedColor,
            quantity
          }
        ];
      }
    });

    addToast({
      type: 'cart',
      title: 'Added to Bag',
      subtitle: `${product.name} (${selectedColor.name}) × ${quantity}`,
      image: selectedColor.image
    });

    setCartDrawerOpen(true);
  };

  // Quick Add from Card
  const handleQuickAdd = (product: Product, colorIndex: number = 0) => {
    const color = product.colorVariants[colorIndex] || product.colorVariants[0];
    handleAddToCart(product, color, 1);
  };

  // Direct Checkout
  const handleDirectCheckout = (product: Product, selectedColor: ColorVariant, quantity: number) => {
    handleAddToCart(product, selectedColor, quantity);
    setDetailModalOpen(false);
    setCartDrawerOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast({
          type: 'wishlist',
          title: 'Removed from Saved',
          subtitle: product.name,
          image: product.colorVariants[0].image
        });
        return prev.filter(id => id !== product.id);
      } else {
        addToast({
          type: 'wishlist',
          title: 'Saved to Collection',
          subtitle: `${product.name} saved to your curation`,
          image: product.colorVariants[0].image
        });
        return [...prev, product.id];
      }
    });
  };

  // Open Product Detail Modal
  const handleOpenDetail = (product: Product) => {
    setActiveDetailProduct(product);
    setDetailModalOpen(true);
  };

  // Total cart items count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered wishlist products
  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  // Credenza for large editorial showcase
  const credenzaProduct = PRODUCTS.find(p => p.id === 'prod-credenza-venezia') || PRODUCTS[5];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#141A26] transition-colors duration-1000 antialiased selection:bg-[#D9EAE0] selection:text-[#183626]">
      
      {/* 1. Minimal Editorial Navigation Header */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWishlist={() => setWishlistModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToSection('signature-collection-section');
        }}
        onScrollToSection={scrollToSection}
      />

      {/* Main Experience: Rich, Full-Length Digital Exhibition */}
      <main>
        {/* 2. Hero Product Experience (3D Style Stage) */}
        <HeroSection
          heroProduct={PRODUCTS[0]}
          featuredProducts={PRODUCTS}
          onExploreClick={() => scrollToSection('featured-gallery-section')}
          onOpenProduct={handleOpenDetail}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 3. Featured Products Gallery (Asymmetric Layout, 3 Distinct Stage Pods) */}
        <FeaturedGallery
          products={PRODUCTS}
          onOpenDetail={handleOpenDetail}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 4. Explore Categories (Tactile Pastel Surfaces) */}
        <CategoryExperience
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onScrollToCatalog={() => scrollToSection('signature-collection-section')}
        />

        {/* 5. Signature Furniture Collection (Full 20 Piece Index) */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenDetail={handleOpenDetail}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickAdd={handleQuickAdd}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* 6. New Arrivals Section */}
        <NewArrivalsCarousel
          products={PRODUCTS}
          onOpenDetail={handleOpenDetail}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickAdd={handleQuickAdd}
        />

        {/* 7. Large Editorial Product Showcase (Venezia Credenza) */}
        <EditorialShowcase
          product={credenzaProduct}
          onOpenDetail={handleOpenDetail}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(credenzaProduct.id)}
        />

        {/* 8. Best Sellers Section */}
        <BestSellersSection
          products={PRODUCTS}
          onOpenDetail={handleOpenDetail}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickAdd={handleQuickAdd}
        />

        {/* 9. Furniture by Material (Tactile Surfaces: Travertine, Boucle, Ash, Murano Glass) */}
        <MaterialSection
          products={PRODUCTS}
          onOpenDetail={handleOpenDetail}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 10. Curated Collections (The Serene Living Pavilion) */}
        <CuratedCollectionsSection
          products={PRODUCTS}
          onOpenDetail={handleOpenDetail}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 11. Brand / Design Philosophy Manifesto */}
        <ManifestoSection />

        {/* 12. Immersive 3D Lighting Call to Action Section */}
        <CallToActionSection
          products={PRODUCTS}
          onOpenDetail={handleOpenDetail}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onScrollToCatalog={() => scrollToSection('signature-collection-section')}
        />
      </main>

      {/* 13. Premium Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToSection('signature-collection-section');
        }}
        onScrollToSection={scrollToSection}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeDetailProduct}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={activeDetailProduct ? wishlistIds.includes(activeDetailProduct.id) : false}
        onDirectCheckout={handleDirectCheckout}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenProductDetail={handleOpenDetail}
      />

      {/* Interactive Search Overlay */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleOpenDetail}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToSection('signature-collection-section');
        }}
      />

      {/* Saved Collection (Wishlist) Drawer */}
      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onQuickAdd={handleQuickAdd}
        onOpenDetail={handleOpenDetail}
      />

      {/* Subtle Micro-Interaction Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
