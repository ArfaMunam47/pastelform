import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, RotateCcw, X } from 'lucide-react';
import { Product, FurnitureCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: FurnitureCategory | 'All';
  onSelectCategory: (cat: FurnitureCategory | 'All') => void;
  onOpenDetail: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickAdd: (product: Product, colorIndex: number) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

type SpatialFilter = 'All' | 'Seating' | 'Tables' | 'Storage & Desks' | 'Lighting & Accents';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenDetail,
  onToggleWishlist,
  wishlistIds,
  onQuickAdd,
  searchQuery,
  onClearSearch
}) => {
  const [activeSpatial, setActiveSpatial] = useState<SpatialFilter>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'curated' | 'price-asc' | 'price-desc'>('curated');

  const spatialFilters: { id: SpatialFilter; label: string }[] = [
    { id: 'All', label: 'All Artifacts' },
    { id: 'Seating', label: 'Sculptural Seating' },
    { id: 'Tables', label: 'Tables & Surfaces' },
    { id: 'Storage & Desks', label: 'Storage & Desks' },
    { id: 'Lighting & Accents', label: 'Lighting & Objects' }
  ];

  const materials = ['All', 'Bouclé', 'Velvet', 'Travertine', 'Matte Ceramic', 'Solid Oak', 'Brushed Brass'];

  const matchesSpatial = (product: Product, spatial: SpatialFilter) => {
    if (spatial === 'All') return true;
    if (spatial === 'Seating') return ['Armchairs', 'Sofas', 'Lounge Chairs', 'Dining Chairs', 'Benches', 'Ottomans'].includes(product.category);
    if (spatial === 'Tables') return ['Coffee Tables', 'Side Tables', 'Dining Tables'].includes(product.category);
    if (spatial === 'Storage & Desks') return ['Cabinets', 'Desks', 'Bookshelves', 'Bedside Tables'].includes(product.category);
    if (spatial === 'Lighting & Accents') return ['Lighting', 'Stools', 'Beds'].includes(product.category);
    return true;
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (!matchesSpatial(p, activeSpatial)) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedMaterial !== 'All' && p.material !== selectedMaterial) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [products, activeSpatial, selectedCategory, selectedMaterial, searchQuery, sortBy]);

  const handleReset = () => {
    setActiveSpatial('All');
    setSelectedMaterial('All');
    setSortBy('curated');
    onSelectCategory('All');
    if (searchQuery) onClearSearch();
  };

  return (
    <section
      id="signature-collection-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EDF5F1 0%, #F5F1EB 40%, #FBF6EF 100%)'
      }}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-5 w-[600px] h-[600px] rounded-full bg-[#E8EDE5] blur-[130px] opacity-70 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#3B6E52]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
                Complete Studio Index
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight">
              Signature Furniture Collection
            </h2>
          </div>
          <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-md">
            Twenty unique sculptural pieces photographed against calibrated pastel stages to honor every contour and material nuance.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-black/5">
          
          {/* Spatial Typology Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {spatialFilters.map((tab) => {
              const isActive = activeSpatial === tab.id && selectedCategory === 'All';
              return (
                <button
                  key={tab.id}
                  id={`filter-tab-${tab.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    setActiveSpatial(tab.id);
                    onSelectCategory('All');
                  }}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#182030] text-white shadow-tactile font-medium'
                      : 'bg-white/80 text-[#556075] hover:bg-white hover:text-[#141A26] border border-black/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Tools: Material & Sort */}
          <div className="flex items-center gap-3">
            {/* Material Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#7A8598] hidden sm:inline">
                Material:
              </span>
              <select
                id="filter-material-select"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="text-xs bg-white/90 border border-black/10 rounded-full px-3.5 py-2 text-[#182030] focus:outline-none focus:ring-1 focus:ring-[#182030]"
              >
                {materials.map(m => (
                  <option key={m} value={m}>{m === 'All' ? 'All Materials' : m}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <select
              id="filter-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white/90 border border-black/10 rounded-full px-3.5 py-2 text-[#182030] focus:outline-none focus:ring-1 focus:ring-[#182030]"
            >
              <option value="curated">Curated Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Reset Button */}
            {(activeSpatial !== 'All' || selectedCategory !== 'All' || selectedMaterial !== 'All' || searchQuery) && (
              <button
                id="filter-reset-btn"
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/80 text-xs text-[#8A4A32] hover:bg-white transition-all border border-black/5"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

        </div>

        {/* Active Search / Category Indicator */}
        {(searchQuery || selectedCategory !== 'All') && (
          <div className="flex items-center gap-2 mb-8 p-3 rounded-2xl bg-white/80 border border-black/5 max-w-md">
            <span className="text-xs text-[#6A7382]">Active Filter:</span>
            {selectedCategory !== 'All' && (
              <span className="px-2.5 py-1 rounded-full bg-[#E5EEF5] text-[#2D5A7B] text-xs font-semibold flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => onSelectCategory('All')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-1 rounded-full bg-[#F5EBE5] text-[#8C4A2D] text-xs font-semibold flex items-center gap-1">
                "{searchQuery}"
                <button onClick={onClearSearch}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Cards Grid: 3-column / 4-column balanced responsive grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white/60 border border-black/5">
            <p className="font-display text-2xl text-[#182030] mb-2">
              No matching architectural artifacts found
            </p>
            <p className="text-sm text-[#6A7382] mb-6">
              Try adjusting your material or category filters to explore the studio index.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-[#182030] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenDetail}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        )}

        {/* Bottom studio index summary count */}
        <div className="mt-14 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A8598] gap-4">
          <span>
            Displaying {filteredProducts.length} of {products.length} distinct studio pieces
          </span>
          <span className="font-editorial italic text-sm">
            All pieces finished by hand with non-toxic, solvent-free plant oils
          </span>
        </div>

      </div>
    </section>
  );
};
