import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, Sparkles, Send } from 'lucide-react';
import { sfx } from '../utils/sound';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    sfx.playCanCrack();
    setSuccess(true);
  };

  const perks = [
    '20% welcome coupon',
    'Tuple points multiplier multiplier days',
    'Tuition Giveaway alerts',
    'Secret flavor pre-orders'
  ];

  return (
    <section
      id="newsletter-section"
      className="relative py-24 sm:py-32 bg-burgundy text-cream border-b border-cream/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Core Newsletter Container with Glassmorphic gradient block */}
        <div className="bg-dark-cherry border border-cream/10 rounded-none p-8 sm:p-16 relative overflow-hidden shadow-2xl text-left">
          {/* Accent lighting sphere */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Title & Copy segment */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-[10px] uppercase tracking-widest mb-4">
                <Mail size={12} />
                <span>The Pepper Pack</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
                Never Settle for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
                  Boring Sips.
                </span>
              </h2>

              <p className="text-cream/80 text-sm sm:text-base mt-4 max-w-lg leading-relaxed font-sans">
                Join our elite member circle today. Receive secret recipes, birthday discount coupons, and exclusive invitations to order pilot flavor experiments before the public.
              </p>

              {/* Bulleted checklist */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {perks.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-cream/90">
                    <CheckCircle size={14} className="text-gold shrink-0" />
                    <span className="text-xs sm:text-sm font-sans font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Input segment with AnimatePresence */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key="input-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                  >
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="Type your primary email address..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-burgundy border border-cream/10 focus:border-gold rounded-none py-4.5 px-14 text-sm outline-none font-sans text-cream placeholder-cream/40"
                        />
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-cream hover:bg-cream/90 text-burgundy py-4.5 rounded-none font-black text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:scale-101 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Join Pack & Claim 20% Off</span>
                        <Send size={15} />
                      </button>
                    </form>
                    <p className="text-cream/40 font-mono text-[10px] uppercase text-center mt-3">
                      Est. 1885 • Spam free compliance secured • SSL Encrypted
                    </p>
                  </motion.div>
                ) : (
                  // Success layout
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-burgundy/40 border border-cream/10 p-8 rounded-none text-center flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-none bg-gold/10 border border-gold flex items-center justify-center text-gold mb-4 animate-bounce">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-cream">
                      You are Officially a Pepper!
                    </h3>
                    <p className="text-cream/70 text-xs mt-2 max-w-xs leading-relaxed">
                      Discount verification email sent. Use code **PEPPERPACK20** at nearby retailers or in the checkout modal.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
