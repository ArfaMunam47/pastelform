import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react';
import { Product, FurnitureCategory } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: FurnitureCategory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');

  const popularSearches = [
    'Bouclé Armchair',
    'Curved Sofa',
    'Butter Yellow Chair',
    'Pebble Coffee Table',
    'Lilac Velvet',
    'Travertine Marble',
    'Daybed Bench'
  ];

  const suggestedCategories: FurnitureCategory[] = [
    'Sofas',
    'Armchairs',
    'Dining Chairs',
    'Coffee Tables',
    'Lighting',
    'Benches'
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
      />

      {/* Search Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white z-10 max-h-[85vh] overflow-hidden flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="w-5 h-5 text-[#7A8290] absolute left-4 pointer-events-none" />
          <input
            id="site-search-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search colorful furniture, bouclé, travertine, velvet..."
            className="w-full bg-white border border-[#EDE8E1] rounded-2xl pl-12 pr-12 py-3.5 text-sm text-[#1C2027] placeholder:text-[#8E97A6] focus:outline-none focus:border-[#23272F] shadow-pastel-sm"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-[#8A93A2] hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="absolute right-4 text-xs font-bold uppercase text-[#8A93A2] hover:text-black"
            >
              ESC
            </button>
          )}
        </div>

        {/* Dynamic Results or Suggestions */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-6">
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#707886] mb-3">
                <span>Matching Objects ({searchResults.length})</span>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#EDE8E1] hover:border-[#23272F] hover:shadow-pastel-sm cursor-pointer transition-all group"
                    >
                      <div className={`w-14 h-14 rounded-xl p-1.5 shrink-0 flex items-center justify-center bg-gradient-to-b ${prod.colorVariants?.[0]?.bgGradient || 'from-[#FAF8F5] to-[#EDE8E1]'}`}>
                        <img
                          src={prod.colorVariants?.[0]?.image || prod.images?.[0] || ''}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain contact-shadow"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7585] block truncate">
                          {prod.category}
                        </span>
                        <h5 className="font-display font-bold text-xs text-[#1C2027] group-hover:text-[#529E74] truncate">
                          {prod.name}
                        </h5>
                        <span className="text-xs font-extrabold text-[#23272F]">
                          ${prod.price.toLocaleString()}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#98A1B0] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-xs text-[#7A8392]">
                    No furniture found matching &ldquo;{query}&rdquo;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#707886] mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#E27856]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#EDE8E1] hover:border-[#23272F] text-xs text-[#3E4554] hover:text-[#1C2027] transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested Categories */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#707886] mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#529E74]" />
                  <span>Suggested Collections</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {suggestedCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategory(cat);
                        onClose();
                      }}
                      className="p-3 rounded-2xl bg-white border border-[#EDE8E1] hover:border-[#529E74] text-xs font-bold text-left text-[#2A313F] transition-all hover:shadow-xs"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Showcase Quick Picks */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#707886] block mb-2.5">
                  Studio Highlights
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {products.slice(0, 2).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-[#EDE8E1] hover:border-[#23272F] cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-xl p-1 shrink-0 flex items-center justify-center bg-gradient-to-b ${prod.colorVariants?.[0]?.bgGradient || 'from-[#FAF8F5] to-[#EDE8E1]'}`}>
                        <img
                          src={prod.colorVariants?.[0]?.image || prod.images?.[0] || ''}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1C2027] truncate">
                          {prod.name}
                        </div>
                        <div className="text-[11px] font-extrabold text-[#529E74]">
                          ${prod.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
