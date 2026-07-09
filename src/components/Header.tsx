import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Menu, X, ShoppingCart, Sparkles, Moon, Sun } from 'lucide-react';
import { sfx } from '../utils/sound';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenBuyModal: () => void;
}

export default function Header({
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled,
  onOpenBuyModal,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sfx.toggle(nextState);
    if (nextState) {
      setTimeout(() => sfx.playCanCrack(), 100);
    }
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    sfx.playTick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { label: 'Products', id: 'products' },
    { label: 'Why Pepper', id: 'why-pepper' },
    { label: 'Story', id: 'story' },
    { label: 'Flavor Wheel', id: 'flavor-wheel' },
    { label: 'Recipes', id: 'recipes' },
    { label: 'Find Stores', id: 'stores' },
    { label: 'Quiz', id: 'quiz' },
    { label: 'Rewards', id: 'rewards' },
  ];

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-burgundy/90 backdrop-blur-md border-b border-cream/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Crest */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group animate-fade-in"
        >
          <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center border border-gold/30 group-hover:border-gold transition-all duration-300 shadow-sm shrink-0">
            <div className="w-6 h-6 rounded-full bg-burgundy flex items-center justify-center">
              <span className="text-cream font-serif font-black text-xs italic">23</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-cream font-serif font-extrabold italic tracking-tight text-xl leading-none">
              Dr Pepper
            </span>
            <span className="text-gold text-[9px] uppercase font-mono tracking-widest font-bold leading-none mt-1">
              Est. 1885 • Waco TX
            </span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => sfx.playTick()}
              className="text-cream/80 hover:text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 hover:bg-cream/5 font-sans"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sfx.playTick()}
            className="p-2 rounded-full border border-cream/15 text-cream/80 hover:text-gold hover:bg-cream/5 transition-all duration-200"
            aria-label="Toggle Sound"
            title={soundEnabled ? 'Disable Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sfx.playTick();
              setDarkMode(!darkMode);
            }}
            onMouseEnter={() => sfx.playTick()}
            className="p-2 rounded-full border border-cream/15 text-cream/80 hover:text-gold hover:bg-cream/5 transition-all duration-200"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Buy Now CTA */}
          <button
            onClick={() => {
              sfx.playCanCrack();
              onOpenBuyModal();
            }}
            onMouseEnter={() => sfx.playTick()}
            className="relative overflow-hidden bg-transparent border border-cream text-cream hover:bg-cream hover:text-burgundy px-6 py-2.5 rounded-none font-bold text-xs tracking-widest uppercase shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart size={14} />
            <span>Buy Now</span>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          </button>
        </div>

        {/* Mobile controls & Burger */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Sound Toggle (Mobile) */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-full border border-cream/10 text-cream/80 hover:text-gold transition-all duration-200"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Buy Mobile Button */}
          <button
            onClick={() => {
              sfx.playCanCrack();
              onOpenBuyModal();
            }}
            className="bg-transparent text-cream p-2 rounded-none shadow-md hover:scale-105 transition-all duration-200 border border-cream"
            aria-label="Buy Now"
          >
            <ShoppingCart size={16} />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => {
              sfx.playTick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg border border-cream/10 text-cream/80 hover:text-cream hover:bg-cream/5 transition-all duration-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-burgundy border-b border-cream/10 mt-2 px-4 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-cream/80 hover:text-gold text-left py-2 border-b border-cream/5 text-xs font-semibold uppercase tracking-wider font-sans transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}

              <div className="flex items-center justify-between pt-4">
                <span className="text-cream/60 text-xs uppercase tracking-wider font-semibold font-sans">Appearance</span>
                <button
                  onClick={() => {
                    sfx.playTick();
                    setDarkMode(!darkMode);
                  }}
                  className="flex items-center gap-2 text-cream/80 border border-cream/10 px-4 py-2 rounded-none text-xs uppercase tracking-wider font-semibold hover:bg-cream/5 transition-all duration-200"
                >
                  {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                  <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sfx.playCanCrack();
                  onOpenBuyModal();
                }}
                className="w-full mt-2 bg-cream text-burgundy border border-cream py-3 rounded-none font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-transparent hover:text-cream transition-all duration-300"
              >
                <ShoppingCart size={18} />
                <span>Order Dr Pepper Online</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
