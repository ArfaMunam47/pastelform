import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  CreditCard,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOpenProductDetail: (product: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenProductDetail
}) => {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('Alex Mercer');
  const [customerEmail, setCustomerEmail] = useState('alex.mercer@design2026.io');
  const [shippingAddress, setShippingAddress] = useState('420 Sunset Boulevard, Suite 8A, Los Angeles, CA 90028');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card'>('apple_pay');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2500;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const estimatedTax = subtotal * 0.08;
  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 95;
  const total = subtotal + estimatedTax + shippingCost;

  const handleStartCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#CEEBDD', '#E2D9F3', '#FAF1CE', '#FCDDD0', '#A8D0EF']
        });
      } catch (err) {
        console.log(err);
      }
    }, 1200);
  };

  const handleOrderFinish = () => {
    setOrderComplete(false);
    setCheckoutModalOpen(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Slide-over Cart Drawer */}
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EDE8E1] bg-white/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#EAF6EF] flex items-center justify-center text-[#2D7551]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#1C2027]">
                  Shopping Bag
                </h3>
                <span className="text-xs text-[#7A8290]">
                  {items.length} {items.length === 1 ? 'sculptural piece' : 'sculptural pieces'}
                </span>
              </div>
            </div>

            <button
              id="close-cart-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#555E6D] hover:text-black border border-[#EDE8E1] shadow-xs"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="px-6 py-3.5 bg-[#FAF1CE]/40 border-b border-[#EDE8E1]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-[#2D7551] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked Complimentary White-Glove Delivery!
                </span>
              ) : (
                <span className="text-[#685D48]">
                  Add <strong>${(freeShippingThreshold - subtotal).toLocaleString()}</strong> for free white-glove delivery
                </span>
              )}
              <span className="text-[11px] font-bold text-[#8C6C0F]">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#529E74] to-[#2D7551] rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length > 0 ? (
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 rounded-2xl bg-white border border-[#EDE8E1] shadow-pastel-sm relative group"
                  >
                    {/* Thumbnail on pastel pill card */}
                    <div 
                      onClick={() => {
                        onClose();
                        onOpenProductDetail(item.product);
                      }}
                      className={`w-20 h-20 rounded-xl p-2 shrink-0 flex items-center justify-center bg-gradient-to-b ${item.selectedColor.bgGradient} cursor-pointer`}
                    >
                      <img
                        src={item.selectedColor.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain contact-shadow"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 
                            onClick={() => {
                              onClose();
                              onOpenProductDetail(item.product);
                            }}
                            className="font-display font-bold text-sm text-[#1C2027] hover:text-[#529E74] cursor-pointer line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#98A2B3] hover:text-[#A83D58] p-1 transition-colors"
                            title="Remove piece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Color & Material */}
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="w-3 h-3 rounded-full border border-black/10"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-xs text-[#6B7586]">
                            {item.selectedColor.name} • {item.product.material}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F4F1EA]">
                        <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded-full px-2.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 text-xs text-[#555E6D] hover:text-black font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-[#1C2027] min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 text-xs text-[#555E6D] hover:text-black font-bold"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-extrabold text-sm text-[#1C2027]">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-[#EAF6EF] text-[#2D7551] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-lg text-[#1C2027] mb-1">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-[#7A8392] max-w-xs mx-auto mb-6">
                  Discover colorful sculptural furniture pieces designed to bring joy and personality to your space.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#23272F] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EDE8E1] bg-white/95 space-y-3">
              {/* Order breakdown */}
              <div className="space-y-1.5 text-xs text-[#5E6676]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1C2027]">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Delivery</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#2D7551]">Complimentary</strong> : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#1C2027] pt-2 border-t border-[#EDE8E1]">
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  id="cart-checkout-btn"
                  onClick={handleStartCheckout}
                  className="w-full py-3.5 rounded-full bg-[#23272F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-tactile transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  id="cart-continue-shopping-btn"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-bold text-[#555E6D] hover:text-black transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Checkout Experience Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#FAF8F5] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white z-10 max-h-[90vh] overflow-y-auto"
            >
              {!orderComplete ? (
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#EDE8E1] mb-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8290]">
                        Pastel & Form Checkout
                      </span>
                      <h3 className="font-display font-bold text-xl text-[#1C2027]">
                        Secure Studio Order
                      </h3>
                    </div>
                    <button
                      onClick={() => setCheckoutModalOpen(false)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#555E6D] hover:text-black border border-[#EDE8E1]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    {/* Customer Info */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#707886] mb-1.5">
                        Collector Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white border border-[#EDE8E1] rounded-xl px-3.5 py-2.5 text-xs text-[#1C2027] focus:outline-none focus:border-[#23272F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#707886] mb-1.5">
                        Email Confirmation
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-white border border-[#EDE8E1] rounded-xl px-3.5 py-2.5 text-xs text-[#1C2027] focus:outline-none focus:border-[#23272F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#707886] mb-1.5">
                        White-Glove Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full bg-white border border-[#EDE8E1] rounded-xl px-3.5 py-2.5 text-xs text-[#1C2027] focus:outline-none focus:border-[#23272F]"
                      />
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#707886] mb-2">
                        Payment Selection
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('apple_pay')}
                          className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            paymentMethod === 'apple_pay'
                              ? 'bg-[#23272F] text-white border-[#23272F]'
                              : 'bg-white border-[#EDE8E1] text-[#424956] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <span> Pay Express</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            paymentMethod === 'card'
                              ? 'bg-[#23272F] text-white border-[#23272F]'
                              : 'bg-white border-[#EDE8E1] text-[#424956] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Credit Card</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Total Overview */}
                    <div className="p-4 rounded-2xl bg-[#F2FAF5] border border-[#D1ECD9] space-y-1 text-xs">
                      <div className="flex justify-between text-[#2D7551]">
                        <span>Items ({items.reduce((s, i) => s + i.quantity, 0)} pieces)</span>
                        <span className="font-bold">${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#1F5439] font-extrabold text-sm pt-1 border-t border-[#C0E7CD]">
                        <span>Total Due</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="submit-order-btn"
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-full bg-[#23272F] hover:bg-black text-white font-bold text-xs uppercase tracking-wider shadow-tactile transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <span>Processing Studio Transaction...</span>
                      ) : (
                        <span>Authorize & Place Order (${total.toFixed(2)})</span>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Celebration Confirmation Screen */
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EAF6EF] text-[#2D7551] flex items-center justify-center mx-auto shadow-pastel-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-[#1C2027]">
                    Order Reserved Successfully!
                  </h3>
                  <p className="text-xs text-[#525B6C] leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{customerName}</strong>. Your artisanal furniture order <strong>#PF-2026-{Math.floor(100000 + Math.random() * 900000)}</strong> is registered with our studio workshop in Milan.
                  </p>
                  <div className="p-4 rounded-2xl bg-white border border-[#EDE8E1] text-xs text-left max-w-xs mx-auto space-y-1">
                    <div className="text-[11px] text-[#7A8290]">Delivering to:</div>
                    <div className="font-medium text-[#1C2027] truncate">{shippingAddress}</div>
                    <div className="text-[11px] text-[#529E74] font-semibold pt-1">
                      Estimated Delivery: 4-6 Business Days
                    </div>
                  </div>
                  <button
                    id="finish-order-btn"
                    onClick={handleOrderFinish}
                    className="px-8 py-3 rounded-full bg-[#23272F] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    Back to Design Studio
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
