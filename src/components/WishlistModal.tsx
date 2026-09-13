import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onOpenDetail: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onQuickAdd,
  onOpenDetail
}) => {
  if (!isOpen) return null;

  const totalSavedValue = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EDE8E1] bg-white/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FEF1EB] flex items-center justify-center text-[#E27856]">
              <Heart className="w-4 h-4 fill-[#E27856]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#1C2027]">
                Saved Collection
              </h3>
              <span className="text-xs text-[#7A8290]">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'saved piece' : 'saved pieces'}
              </span>
            </div>
          </div>

          <button
            id="close-wishlist-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#555E6D] hover:text-black border border-[#EDE8E1]"
            aria-label="Close wishlist"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length > 0 ? (
            <AnimatePresence>
              {wishlistProducts.map((prod) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-pastel-sm relative group"
                >
                  {/* Thumbnail on soft pastel pill */}
                  <div
                    onClick={() => {
                      onClose();
                      onOpenDetail(prod);
                    }}
                    className={`w-20 h-20 rounded-xl p-2 shrink-0 flex items-center justify-center bg-gradient-to-b ${prod.colorVariants?.[0]?.bgGradient || 'from-[#FAF8F5] to-[#EDE8E1]'} cursor-pointer`}
                  >
                    <img
                      src={prod.colorVariants?.[0]?.image || prod.images?.[0] || ''}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain contact-shadow"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            onClose();
                            onOpenDetail(prod);
                          }}
                          className="font-display font-bold text-sm text-[#1C2027] hover:text-[#529E74] cursor-pointer line-clamp-1"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(prod)}
                          className="text-[#98A2B3] hover:text-[#A83D58] p-1 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs text-[#6B7586] block mt-0.5">
                        {prod.category} • {prod.material}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F4F1EA]">
                      <span className="font-extrabold text-sm text-[#1C2027]">
                        ${prod.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => onQuickAdd(prod, 0)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#23272F] hover:bg-black text-white text-[11px] font-bold shadow-xs transition-transform active:scale-95"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FEF1EB] text-[#E27856] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#1C2027] mb-1">
                No saved pieces yet
              </h4>
              <p className="text-xs text-[#7A8392] max-w-xs mx-auto mb-6">
                Tap the heart icon on any design piece to save it to your personal curation.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#23272F] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Browse Collection
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-[#EDE8E1] bg-white/95">
            <div className="flex items-center justify-between text-xs text-[#5E6676] mb-3">
              <span>Total Curation Value</span>
              <span className="text-sm font-extrabold text-[#1C2027]">
                ${totalSavedValue.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                wishlistProducts.forEach(p => onQuickAdd(p, 0));
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-[#23272F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-tactile transition-all text-center"
            >
              Add All to Shopping Bag
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
