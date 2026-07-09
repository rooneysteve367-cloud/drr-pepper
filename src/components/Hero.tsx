import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Award } from 'lucide-react';
import { sfx } from '../utils/sound';

interface HeroProps {
  onOpenBuyModal: () => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

export default function Hero({ onOpenBuyModal }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll parallax effects for the hero text and images
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Handle mouse move for micro-parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2); // -1 to 1
      const y = (e.clientY - top - height / 2) / (height / 2); // -1 to 1
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize randomized floating bubbles
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage from left
      y: 100 + Math.random() * 20, // initial position from top
      size: Math.random() * 12 + 4, // 4px to 16px
      speed: Math.random() * 2 + 1, // rise speed
      delay: Math.random() * 8, // staggered entrance
    }));
    setBubbles(initialBubbles);
  }, []);

  // Bubble click event to pop them dynamically
  const handleBubbleClick = (id: number) => {
    sfx.playBubble();
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              y: 105, // reset to bottom
              x: Math.random() * 100,
              size: Math.random() * 12 + 4,
            }
          : b
      )
    );
  };

  const handleDiscoverClick = () => {
    sfx.playSwoosh();
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-burgundy via-dark-cherry to-burgundy overflow-hidden flex items-center pt-20"
    >
      {/* Dynamic Ambient Background Elements */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Radial Lighting / Luxury Gradient Flare */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-gold/15 via-transparent to-transparent blur-3xl opacity-80" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] rounded-full bg-radial from-burgundy/40 via-transparent to-transparent blur-3xl opacity-50 animate-pulse" />
        
        {/* Abstract Liquid Splashes & Flares */}
        <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-dark-cherry/30 blur-[100px] mix-blend-screen" />
      </motion.div>

      {/* Carbonated Interactive Rising Bubbles */}
      <div className="absolute inset-0 z-10 pointer-events-auto overflow-hidden">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            onClick={() => handleBubbleClick(b.id)}
            className="absolute rounded-full border border-cream/20 bg-cream/5 shadow-inner cursor-pointer hover:bg-gold/30 hover:border-gold transition-colors"
            style={{
              left: `${b.x}%`,
              width: b.size,
              height: b.size,
            }}
            animate={{
              y: ['105vh', '-10vh'],
            }}
            transition={{
              duration: 12 / b.speed,
              repeat: Infinity,
              delay: b.delay,
              ease: 'linear',
            }}
            whileHover={{ scale: 1.4 }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Branding & Copy Column */}
          <motion.div
            style={{ y: textY, opacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left text-cream"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-cream/5 border border-cream/10 backdrop-blur-md mb-6 hover:border-gold/50 transition-all duration-300">
              <Sparkles size={14} className="text-gold animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest font-bold text-cream/80">
                100% Authentic • The Original Since 1885
              </span>
            </div>

            {/* Headline with geometric editorial typography */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-black tracking-tight leading-tight uppercase">
              One of a
              <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold pb-2 font-serif italic font-normal normal-case">
                Kind Flavor.
              </span>
            </h1>

            {/* Core Subheadline emphasizing 23 flavors */}
            <p className="text-cream/90 text-base sm:text-lg font-sans mt-4 max-w-xl leading-relaxed">
              Dr Pepper isn't a simple cola. It is a secret, proprietary symphony of{' '}
              <strong className="text-gold font-semibold">23 unique flavors</strong>, blended for over
              140 years to create an unbeatable taste. Boldly original. Zero apologies.
            </p>

            {/* High Converting Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              {/* Buy Now button */}
              <button
                onClick={() => {
                  sfx.playCanCrack();
                  onOpenBuyModal();
                }}
                onMouseEnter={() => sfx.playTick()}
                className="bg-cream hover:bg-transparent hover:text-cream text-burgundy px-8 py-4 rounded-none font-extrabold text-xs uppercase tracking-widest shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-cream flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Grab Your Cold 12-Pack</span>
                <ArrowRight size={18} />
              </button>

              {/* Discover flavors button */}
              <button
                onClick={handleDiscoverClick}
                onMouseEnter={() => sfx.playTick()}
                className="bg-transparent hover:bg-gold hover:text-burgundy text-gold border border-gold px-8 py-4 rounded-none font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore The 23 Flavors</span>
              </button>
            </div>

            {/* Trust Badges and Brand Counters */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-cream/10 pt-8 mt-12 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-gold text-2xl sm:text-3xl font-serif italic tracking-tight flex items-center gap-1">
                  23<Zap size={16} className="text-gold" />
                </span>
                <span className="text-cream/60 text-[11px] sm:text-xs uppercase font-mono tracking-widest mt-1">
                  Signature Flavors
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-cream text-2xl sm:text-3xl font-serif font-bold italic tracking-tight flex items-center gap-1">
                  Est. 1885<Award size={16} className="text-gold" />
                </span>
                <span className="text-cream/60 text-[11px] sm:text-xs uppercase font-mono tracking-widest mt-1">
                  Older Than Coke
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-cream text-2xl sm:text-3xl font-serif font-extrabold italic tracking-tight">
                  100%
                </span>
                <span className="text-cream/60 text-[11px] sm:text-xs uppercase font-mono tracking-widest mt-1">
                  Bold Satisfaction
                </span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Floating Can Column */}
          <div className="lg:col-span-5 relative h-[450px] sm:h-[550px] flex items-center justify-center z-20">
            {/* Glowing Studio Spotlight behind can */}
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-gold/15 blur-3xl opacity-70 animate-pulse pointer-events-none" />

            {/* Depth rings */}
            <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-gold/10 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-cream/5 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />

            {/* Parallax Container holding the rendered can */}
            <motion.div
              style={{
                x: mousePosition.x * 25,
                y: mousePosition.y * 25,
                rotateX: mousePosition.y * -15,
                rotateY: mousePosition.x * 15,
              }}
              className="relative w-[280px] h-[400px] sm:w-[350px] sm:h-[480px] cursor-grab active:cursor-grabbing preserve-3d"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              {/* Main Premium Rendered Product Image */}
              <img
                src="/src/assets/images/dr_pepper_can_hero_1783610198728.jpg"
                alt="Dr Pepper Premium 3D Render Can Floating in Liquid Splash"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] filter contrast-110 saturate-105 select-none"
              />

              {/* Animated decorative sparks / light highlights */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute top-10 right-4 pointer-events-none text-gold/80"
              >
                <Sparkles size={28} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-16 left-2 pointer-events-none text-cream/40"
              >
                <Sparkles size={20} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Aesthetic bottom scroll-down indicator & fade out */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none opacity-80">
        <span className="text-[10px] font-mono uppercase tracking-widest text-cream/60">Scroll to Explore</span>
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-gold to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}
