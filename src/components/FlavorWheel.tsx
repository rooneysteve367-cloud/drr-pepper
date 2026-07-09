import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Compass, Star, Sparkles, Check } from 'lucide-react';
import { sfx } from '../utils/sound';

interface FlavorSlice {
  id: string;
  name: string;
  category: 'Spicy' | 'Sweet' | 'Fruity' | 'Herbal';
  color: string; // Tailwind bg color
  accentText: string;
  svgColor: string; // HEX color for SVG
  angleStart: number;
  angleEnd: number;
  description: string;
  strength: string; // e.g. "Medium", "Bold"
  prominentIn: string; // e.g. "Original, Diet"
}

export default function FlavorWheel() {
  const [activeSlice, setActiveSlice] = useState<FlavorSlice | null>(null);

  const slices: FlavorSlice[] = [
    {
      id: 'cherry',
      name: 'Black Cherry Bark',
      category: 'Fruity',
      color: 'bg-dark-cherry',
      accentText: 'text-gold',
      svgColor: '#4A1014',
      angleStart: 0,
      angleEnd: 90,
      description: 'The foundation of Dr Pepper\'s dark crimson soul. Black cherry delivers a deep, lush sweetness paired with a subtle, woody astringency that gives the beverage its unique base bite.',
      strength: 'Ultra-Bold (5/5)',
      prominentIn: 'Dr Pepper Original, Dr Pepper Cherry'
    },
    {
      id: 'vanilla',
      name: 'Madagascar Vanilla',
      category: 'Sweet',
      color: 'bg-gold',
      accentText: 'text-gold',
      svgColor: '#C5A059',
      angleStart: 90,
      angleEnd: 180,
      description: 'Provides the velvety cushion that binds the bitter herbal notes together. Warm, buttery, and comforting, vanilla gives Dr Pepper its iconic high-end creaminess.',
      strength: 'Smooth & Rich (4/5)',
      prominentIn: 'Dr Pepper & Cream Soda, Strawberries & Cream'
    },
    {
      id: 'allspice',
      name: 'Allspice & Clove',
      category: 'Spicy',
      color: 'bg-burgundy',
      accentText: 'text-gold',
      svgColor: '#711F25',
      angleStart: 180,
      angleEnd: 270,
      description: 'A punchy, warm botanical spice overlay. Allspice combines the sensory vibes of cinnamon, nutmeg, and black pepper, creating that elusive and mysterious "Waco" store bite.',
      strength: 'Spicy Bite (4/5)',
      prominentIn: 'Dr Pepper Original, Zero Sugar'
    },
    {
      id: 'anise',
      name: 'Licorice & Star Anise',
      category: 'Herbal',
      color: 'bg-stone-900',
      accentText: 'text-cream',
      svgColor: '#2b0709',
      angleStart: 270,
      angleEnd: 360,
      description: 'The secret weapon. Often misunderstood, licorice brings a deep, dark herbal, almost medicinal complexity that elevates the formula beyond a standard sweet cola.',
      strength: 'Complex Herbal (3/5)',
      prominentIn: 'Dr Pepper Original'
    }
  ];

  const handleSliceClick = (slice: FlavorSlice) => {
    sfx.playCanCrack();
    setActiveSlice(slice);
  };

  const drawSlicePath = (startAngle: number, endAngle: number, radius: number = 160) => {
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    const x1 = radius + radius * Math.cos(startRad);
    const y1 = radius + radius * Math.sin(startRad);
    const x2 = radius + radius * Math.cos(endRad);
    const y2 = radius + radius * Math.sin(endRad);
    return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <section
      id="flavor-wheel"
      className="relative py-24 sm:py-32 bg-burgundy border-b border-cream/10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
            <Compass size={12} className="animate-spin" style={{ animationDuration: '10s' }} />
            <span>Sensory Lab</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
            The Interactive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
              Flavor Wheel.
            </span>
          </h2>
          <p className="text-cream/80 text-sm sm:text-base mt-2 max-w-xl mx-auto font-sans">
            Click on the major aromatic pillars of the Dr Pepper formula. Discover the science and sweet chemistry that make each sip legendary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Wheel Graphics Container Column */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px] sm:min-h-[420px]">
            {/* Outer Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-none border border-dashed border-cream/15 flex items-center justify-center pointer-events-none"
            />

            {/* Glowing Accent */}
            <div className="absolute w-[200px] h-[200px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

            {/* Main Interactive SVG Wheel */}
            <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px]">
              <svg
                viewBox="0 0 320 320"
                className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter brightness-105"
              >
                {slices.map((slice) => {
                  const isActive = activeSlice?.id === slice.id;
                  return (
                    <g key={slice.id} className="cursor-pointer">
                      <motion.path
                        d={drawSlicePath(slice.angleStart, slice.angleEnd)}
                        fill={slice.svgColor}
                        stroke="#711F25"
                        strokeWidth="3"
                        whileHover={{ scale: 1.05, brightness: 1.2 }}
                        animate={{
                          scale: isActive ? 1.04 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleSliceClick(slice)}
                      />
                    </g>
                  );
                })}

                {/* Center Core Button Overlay */}
                <circle cx="160" cy="160" r="55" fill="#4A1014" stroke="#C5A059" strokeWidth="2" />
                <circle cx="160" cy="160" r="48" fill="#711F25" />
              </svg>

              {/* Center text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-gold font-mono text-[9px] uppercase tracking-widest leading-none">Secret</span>
                <span className="text-cream font-serif italic font-black text-sm tracking-tight leading-none mt-1">23 Blend</span>
                <span className="text-cream/40 text-[8px] font-mono uppercase mt-1">Tap Slices</span>
              </div>
            </div>
          </div>

          {/* Flavor Description Column */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {activeSlice ? (
                <motion.div
                  key={activeSlice.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-dark-cherry border border-cream/10 rounded-none p-6 sm:p-10 backdrop-blur-md shadow-2xl text-left"
                >
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-cream/5 border border-cream/10 text-gold font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-4">
                    <Sparkles size={12} />
                    <span>Pillar Note: {activeSlice.category}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-serif font-black text-cream tracking-tight">
                    {activeSlice.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 my-6 py-4 border-y border-cream/10">
                    <div>
                      <span className="text-cream/60 text-[10px] font-mono uppercase tracking-widest block">
                        Aromatic Strength
                      </span>
                      <strong className={`font-mono text-xs ${activeSlice.accentText}`}>
                        {activeSlice.strength}
                      </strong>
                    </div>
                    <div>
                      <span className="text-cream/60 text-[10px] font-mono uppercase tracking-widest block">
                        Featured Prominently In
                      </span>
                      <strong className="text-cream font-sans text-xs font-semibold">
                        {activeSlice.prominentIn}
                      </strong>
                    </div>
                  </div>

                  <p className="text-cream/85 text-sm sm:text-base leading-relaxed font-sans">
                    {activeSlice.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-cream/40 text-xs font-mono uppercase tracking-widest">
                    <Check size={14} className="text-gold" />
                    <span>Proprietary soft drink formula standard - FDA Compliant</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-dark-cherry/40 border border-dashed border-cream/10 rounded-none p-10 text-center flex flex-col items-center justify-center min-h-[300px]"
                >
                  <Star size={32} className="text-gold/40 mb-3 animate-pulse" />
                  <h3 className="text-lg font-serif font-bold text-cream">Examine the Botanical Slices</h3>
                  <p className="text-cream/65 text-sm max-w-sm mt-1">
                    Select any aromatic segment of the custom flavor wheel to analyze its sensory footprint and ingredient history.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
