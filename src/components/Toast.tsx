import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Heart, ShoppingBag } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist';
  title: string;
  subtitle: string;
  image?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto flex items-center gap-3 p-3.5 pr-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EDE8E1] shadow-pastel-lg max-w-sm"
          >
            {toast.image ? (
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] p-1 shrink-0 flex items-center justify-center border border-[#EDE8E1]">
                <img
                  src={toast.image}
                  alt={toast.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === 'cart' ? 'bg-[#EAF6EF] text-[#2D7551]' : 'bg-[#FEF1EB] text-[#E27856]'
              }`}>
                {toast.type === 'cart' ? <ShoppingBag className="w-4 h-4" /> : <Heart className="w-4 h-4 fill-current" />}
              </div>
            )}

            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1C2027] block truncate">
                {toast.title}
              </span>
              <span className="text-[11px] text-[#6E7788] block truncate">
                {toast.subtitle}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
