import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShoppingBag, Truck, Gift, CreditCard, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { sfx } from '../utils/sound';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export default function BuyModal({ isOpen, onClose, initialProduct }: BuyModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [packSize, setPackSize] = useState<'6' | '12' | '24'>('12');
  const [quantity, setQuantity] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [joinRewards, setJoinRewards] = useState<boolean>(true);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');

  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  // Pricing mapping
  const prices = {
    '6': 6.99,
    '12': 11.99,
    '24': 19.99
  };

  const unitPrice = prices[packSize];
  const itemsSubtotal = unitPrice * quantity;
  const shippingFee = joinRewards ? 0.00 : 4.99;
  const estimatedTax = itemsSubtotal * 0.0825; // Texas sales tax
  const grandTotal = itemsSubtotal + shippingFee + estimatedTax;

  const handleQuantityChange = (dir: 'inc' | 'dec') => {
    sfx.playBubble();
    if (dir === 'inc') {
      setQuantity((q) => q + 1);
    } else if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !zip) {
      alert('Please fill out all billing credentials.');
      return;
    }
    sfx.playCanCrack();
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-cherry/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-burgundy border border-cream/10 rounded-none w-full max-w-4xl shadow-2xl overflow-hidden relative min-h-[500px]"
      >
        {/* Header bar */}
        <div className="p-5 border-b border-cream/10 flex items-center justify-between bg-dark-cherry">
          <div className="flex gap-2 items-center">
            <ShoppingBag className="text-gold" size={18} />
            <span className="font-serif font-black uppercase text-sm tracking-widest text-cream">
              Pepper Direct checkout Portal
            </span>
          </div>

          <button
            onClick={() => {
              sfx.playSwoosh();
              onClose();
              // Reset
              setCheckoutStep('details');
              setQuantity(1);
            }}
            className="p-1.5 rounded-none hover:bg-cream/5 text-cream/40 hover:text-cream transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {checkoutStep === 'details' ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-0"
            >
              {/* Left Column Can Specs & Choices */}
              <div className="md:col-span-7 p-6 sm:p-8 text-left border-r border-cream/10">
                <h3 className="text-lg font-serif font-bold text-cream mb-4">1. Configure Your Pack</h3>

                {/* Flavor row picker */}
                <div className="mb-6">
                  <span className="text-cream/50 text-[10px] font-mono uppercase tracking-widest block mb-2">
                    Select Flavor Variety
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCTS.map((prod) => {
                      const isSelected = selectedProduct.id === prod.id;
                      return (
                        <button
                          key={prod.id}
                          onClick={() => {
                            sfx.playTick();
                            setSelectedProduct(prod);
                          }}
                          className={`px-3 py-2 rounded-none text-xs font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-gold text-burgundy border-gold font-extrabold shadow'
                              : 'bg-dark-cherry border-cream/10 text-cream/60 hover:text-cream hover:border-cream/20'
                          }`}
                        >
                          {prod.name.split(' ')[2] || prod.name.split(' ')[1] || 'Original'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pack sizing row picker */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {[
                    { val: '6', label: '6-Pack', sub: '$6.99' },
                    { val: '12', label: '12-Pack', sub: '$11.99', popular: true },
                    { val: '24', label: '24-Pack', sub: '$19.99' },
                  ].map((tier) => {
                    const isSelected = packSize === tier.val;
                    return (
                      <button
                        key={tier.val}
                        onClick={() => {
                          sfx.playTick();
                          setPackSize(tier.val as any);
                        }}
                        className={`p-3 rounded-none border text-center transition-all flex flex-col justify-center relative cursor-pointer ${
                          isSelected
                            ? 'bg-dark-cherry/40 border-gold shadow'
                            : 'bg-dark-cherry border-cream/10 hover:border-cream/20'
                        }`}
                      >
                        {tier.popular && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gold text-burgundy font-mono text-[8px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded-none">
                            Popular
                          </span>
                        )}
                        <span className="text-cream font-serif font-bold text-sm block">{tier.label}</span>
                        <span className="text-cream/60 font-mono text-xs block mt-1">{tier.sub}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quantity Row */}
                <div className="mb-8 flex items-center justify-between bg-dark-cherry p-4 rounded-none border border-cream/10">
                  <div className="text-left">
                    <span className="text-cream font-serif font-bold text-sm block">Quantity</span>
                    <span className="text-cream/40 text-[10px] font-mono uppercase tracking-widest mt-0.5 block">
                      Direct courier cases
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange('dec')}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-none bg-burgundy border border-cream/10 flex items-center justify-center text-cream/60 hover:text-cream disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-lg font-black text-cream w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('inc')}
                      className="w-10 h-10 rounded-none bg-burgundy border border-cream/10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Billing credentials fields form */}
                <h3 className="text-lg font-serif font-bold text-cream mb-4">2. Courier Destination Details</h3>
                <form onSubmit={handleSubmitCheckout} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Full Name..."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-dark-cherry border border-cream/10 focus:border-gold rounded-none py-3 px-4 text-xs sm:text-sm outline-none text-cream placeholder-cream/40 font-sans"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Shipping ZIP Code..."
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="bg-dark-cherry border border-cream/10 focus:border-gold rounded-none py-3 px-4 text-xs sm:text-sm outline-none text-cream placeholder-cream/40 font-sans"
                    />
                  </div>

                  <input
                    type="email"
                    required
                    placeholder="Email Address for notifications..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-dark-cherry border border-cream/10 focus:border-gold rounded-none py-3 px-4 text-xs sm:text-sm outline-none w-full text-cream placeholder-cream/40 font-sans"
                  />

                  {/* Loyalty fee waiving checkbox */}
                  <label className="flex items-start gap-3 mt-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={joinRewards}
                      onChange={(e) => {
                        sfx.playTick();
                        setJoinRewards(e.target.checked);
                      }}
                      className="mt-1 accent-gold cursor-pointer"
                    />
                    <div className="text-left leading-none">
                      <span className="text-cream/90 text-xs font-bold block flex items-center gap-1">
                        Free Courier Shipping waiver <Gift size={12} className="text-gold" />
                      </span>
                      <span className="text-cream/55 text-[10px] block mt-1 leading-relaxed font-sans">
                        Yes, enroll my email in the free Pepper Pack loyalty club to waive the $4.99 shipping fee instantly!
                      </span>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-cream hover:bg-cream/90 text-burgundy py-4 rounded-none font-black text-xs sm:text-sm tracking-widest uppercase hover:scale-101 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-cream/20 shadow-lg"
                  >
                    <CreditCard size={16} />
                    <span>Authorize Delivery • ${grandTotal.toFixed(2)}</span>
                  </button>
                </form>
              </div>

              {/* Right Column Checkout Pricing details panel */}
              <div className="md:col-span-5 p-6 sm:p-8 bg-dark-cherry flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-cream/40 text-xs uppercase font-mono tracking-widest mb-4 border-b border-cream/10 pb-2">
                    Order Summary
                  </h3>

                  {/* Can graphic detail */}
                  <div className="flex gap-4 items-center bg-burgundy/40 p-3 rounded-none border border-cream/10 mb-6">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      referrerPolicy="no-referrer"
                      className="h-16 object-contain filter contrast-110 drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]"
                    />
                    <div>
                      <h4 className="text-xs font-serif font-bold text-cream">{selectedProduct.name}</h4>
                      <span className="text-[10px] font-mono text-cream/50 block mt-1">
                        {packSize}-Pack • Qty {quantity}
                      </span>
                      <span className="text-gold text-[10px] font-mono font-bold mt-1 block">
                        {(unitPrice * quantity).toFixed(2)} USD
                      </span>
                    </div>
                  </div>

                  {/* Pricing lines detail */}
                  <div className="flex flex-col gap-2.5 text-xs font-mono text-cream/60">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="text-cream/90">${itemsSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <Truck size={12} className="text-cream/40" />
                        <span>Shipping Courier</span>
                      </span>
                      <span className={joinRewards ? 'text-gold font-bold' : 'text-cream/90'}>
                        {joinRewards ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Sales Tax (8.25%)</span>
                      <span className="text-cream/90">${estimatedTax.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Grand Total output */}
                <div className="border-t border-cream/10 pt-4 mt-8">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-cream/40 text-[10px] font-mono uppercase font-bold">
                      Grand Total (USD)
                    </span>
                    <span className="text-cream font-serif font-black text-2xl sm:text-3xl tracking-tight">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[9px] text-cream/40 leading-normal font-sans">
                    Couriers deliver in insulated cold crates in 1-2 business days. Direct sales backed by Keurig Dr Pepper standard freshness guarantees.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            // Success layout
            <motion.div
              key="checkout-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-16 text-center flex flex-col items-center justify-center max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-none bg-gold/10 border border-gold flex items-center justify-center text-gold mb-6 animate-bounce">
                <Check size={32} strokeWidth={3} />
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-black text-cream tracking-tight">
                Order Confirmed!
              </h3>
              <p className="text-cream/40 text-xs font-mono uppercase tracking-widest mt-1.5 text-gold">
                Tracking Ref: #DRP-{Math.floor(100000 + Math.random() * 900000)}
              </p>

              <p className="text-cream/80 text-sm leading-relaxed mt-4 font-sans text-center">
                Thank you, **{fullName}**! We are packing your chilled **{packSize}-pack of {selectedProduct.name}** immediately. A receipt with tracking dispatch logistics has been fired to **{email}**.
              </p>

              <div className="w-full bg-burgundy p-4 rounded-none border border-cream/10 mt-8 text-left text-xs font-mono text-cream/50 uppercase flex gap-3.5 items-center">
                <Sparkles size={18} className="text-gold animate-spin" />
                <div>
                  <span className="font-bold text-cream/80 block leading-none">Pepper Pack points Added</span>
                  <span className="block mt-1">+{packSize === '6' ? '60' : packSize === '12' ? '120' : '240'} Loyalty Points credited</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sfx.playTick();
                  onClose();
                  setCheckoutStep('details');
                  setQuantity(1);
                }}
                className="mt-8 bg-cream/5 hover:bg-cream/10 text-cream border border-cream/15 px-8 py-3 rounded-none text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Continue Exploring
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
