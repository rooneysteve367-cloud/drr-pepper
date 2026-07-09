import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Gift, Check, Mail } from 'lucide-react';
import { sfx } from '../utils/sound';

interface ExitIntentModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function ExitIntentModal({ onClose, isOpen }: ExitIntentModalProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<{ id: number; color: string; left: number; top: number; delay: number }[]>([]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    sfx.playCanCrack();
    setSuccess(true);

    // Generate burst of confetti particles
    const colors = ['#f59e0b', '#d0103a', '#e63956', '#ffffff', '#8c1d40'];
    const particles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: 10 + Math.random() * 80, // %
      top: 100 + Math.random() * 40, // offset below screen
      delay: Math.random() * 0.3,
    }));
    setConfettiParticles(particles);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-dark-cherry/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="bg-burgundy border border-cream/10 rounded-none w-full max-w-lg shadow-2xl p-6 sm:p-10 text-left relative overflow-hidden"
      >
        {/* Confetti canvas simulation overlay on success */}
        {success && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {confettiParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-2.5 h-2.5 rounded-none"
                style={{
                  backgroundColor: p.color,
                  left: `${p.left}%`,
                  bottom: '0%',
                }}
                animate={{
                  y: ['0px', '-500px'],
                  x: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, 360],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 1.5,
                  delay: p.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        {/* Closing Trigger button */}
        <button
          onClick={() => {
            sfx.playTick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-none hover:bg-cream/5 text-cream/40 hover:text-cream transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Inner Card gradients */}
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-gold/10 blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col text-left"
            >
              {/* Promo tag */}
              <div className="inline-flex items-center gap-1 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-[10px] uppercase tracking-widest mb-4 self-start">
                <Gift size={12} className="animate-bounce" />
                <span>EXCLUSIVE PEPPER SPECIAL</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-cream tracking-tight leading-tight">
                Wait! Don't Miss Out On{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
                  20% Savings.
                </span>
              </h3>

              <p className="text-cream/80 text-xs sm:text-sm leading-relaxed mt-3 font-sans">
                Join the official **Pepper Pack** newsletter loyalty tier today. We'll drop a 20% discount coupon straight into your inbox for your next grocery can delivery or custom merch store order.
              </p>

              {/* Input Form submission */}
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mt-6">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your personal email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark-cherry border border-cream/10 focus:border-gold rounded-none py-3.5 px-12 text-xs sm:text-sm text-cream outline-none font-sans placeholder-cream/40"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={16} />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cream hover:bg-cream/90 text-burgundy py-3.5 rounded-none text-xs font-black tracking-widest uppercase shadow-md hover:shadow-xl transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2 border border-cream/20 shadow-lg"
                >
                  <span>Lock In 20% Discount</span>
                </button>
              </form>

              {/* Bullet proof benefit indicators */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-6 border-t border-cream/10 pt-4 text-[10px] font-mono uppercase text-cream/40">
                <div className="flex items-center gap-1.5">
                  <Check size={12} className="text-gold" />
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={12} className="text-gold" />
                  <span>Zero spam guarantee</span>
                </div>
              </div>
            </motion.div>
          ) : (
            // Success State
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center py-6"
            >
              <div className="w-16 h-16 rounded-none bg-gold/10 border border-gold flex items-center justify-center text-gold mb-6">
                <Sparkles size={28} className="animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-black text-cream tracking-tight">
                You're In, Pepper!
              </h3>
              <p className="text-cream/80 text-xs sm:text-sm mt-3 max-w-sm mx-auto leading-relaxed font-sans text-center">
                Check your inbox! We've sent your **20% discount coupon code** alongside exclusive recipes and first-look tickets to our next flavor releases. Welcome to the family!
              </p>

              <button
                onClick={() => {
                  sfx.playTick();
                  onClose();
                }}
                className="mt-8 bg-dark-cherry border border-cream/10 text-cream/60 hover:text-cream px-8 py-3 rounded-none text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Return to Site
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
