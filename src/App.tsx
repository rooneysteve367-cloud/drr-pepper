import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { sfx } from './utils/sound';
import { Product } from './types';

// Importing Custom Modular components
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import WhyDrPepper from './components/WhyDrPepper';
import BrandStory from './components/BrandStory';
import FlavorWheel from './components/FlavorWheel';
import Recipes from './components/Recipes';
import StoreLocator from './components/StoreLocator';
import FlavorQuiz from './components/FlavorQuiz';
import Rewards from './components/Rewards';
import Newsletter from './components/Newsletter';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Modals
import BuyModal from './components/BuyModal';
import ProductComparison from './components/ProductComparison';
import ExitIntentModal from './components/ExitIntentModal';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [buyModalOpen, setBuyModalOpen] = useState<boolean>(false);
  const [compareModalOpen, setCompareModalOpen] = useState<boolean>(false);
  const [exitIntentOpen, setExitIntentOpen] = useState<boolean>(false);
  const [selectedBuyProduct, setSelectedBuyProduct] = useState<Product | null>(null);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);

  // Loading Screen Timer Simulation (0.8s for fast and crisp luxury entrance)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Exit Intent Event Listener
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        const shown = sessionStorage.getItem('exit_intent_shown');
        if (!shown) {
          setExitIntentOpen(true);
          sessionStorage.setItem('exit_intent_shown', 'true');
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Exit Intent Fallback Timer (45 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem('exit_intent_shown');
      if (!shown) {
        setExitIntentOpen(true);
        sessionStorage.setItem('exit_intent_shown', 'true');
      }
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenBuyModal = (product?: Product) => {
    if (product) {
      setSelectedBuyProduct(product);
    } else {
      setSelectedBuyProduct(null);
    }
    setBuyModalOpen(true);
  };

  return (
    <div className={`min-h-screen text-sans selection:bg-amber-400 selection:text-stone-900 transition-colors duration-500 ${
      darkMode ? 'bg-stone-950 text-white' : 'bg-[#FAFAF9] text-stone-900'
    }`}>
      {/* 1. Cinematic Luxury Loading Intro Screen */}
      <AnimatePresence>
        {loadingScreen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[1000] bg-stone-950 flex flex-col items-center justify-center text-white"
          >
            {/* Spinning Golden Crest */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400 flex items-center justify-center mb-6"
            />
            <h1 className="font-sans font-black text-2xl tracking-widest uppercase">
              Dr Pepper
            </h1>
            <span className="text-amber-400 text-[10px] uppercase font-mono tracking-widest font-bold mt-2 animate-pulse">
              Loading Secret 23 Formula...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Global Accessibility Sound Prompter Banner */}
      {!soundEnabled && !loadingScreen && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-xs py-2 px-4 text-center font-bold font-sans tracking-wide flex items-center justify-center gap-2 relative z-40 shadow-md"
        >
          <Volume2 size={14} className="animate-bounce" />
          <span>Tap the speaker icon in the navigation bar to enable authentic carbonated fizz and can-crack sound effects!</span>
          <button
            onClick={() => {
              setSoundEnabled(true);
              sfx.toggle(true);
              setTimeout(() => sfx.playCanCrack(), 100);
            }}
            className="underline hover:text-white font-extrabold ml-2"
          >
            Enable Sound
          </button>
        </motion.div>
      )}

      {/* 3. Sticky Header Navbar */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenBuyModal={() => handleOpenBuyModal()}
      />

      {/* Main Sections */}
      <main className="relative overflow-hidden">
        {/* Cinematic Hero */}
        <Hero onOpenBuyModal={() => handleOpenBuyModal()} />

        {/* Product Showcase Catalog */}
        <ProductShowcase
          onOpenBuyModal={handleOpenBuyModal}
          onOpenCompareModal={() => setCompareModalOpen(true)}
        />

        {/* Why Dr Pepper Bento Grid */}
        <WhyDrPepper />

        {/* Brand Story Historical Timeline */}
        <BrandStory />

        {/* Interactive Sensory Flavor Wheel */}
        <FlavorWheel />

        {/* Multi-Stage Personality Match Quiz */}
        <FlavorQuiz onOpenBuyModal={handleOpenBuyModal} />

        {/* Cooking and Baking Recipes */}
        <Recipes />

        {/* Store Locator with Interactive Maps */}
        <StoreLocator />

        {/* Loyalty Program Rewards */}
        <Rewards />

        {/* High Converting Static Newsletter */}
        <Newsletter />

        {/* Searchable Accordion FAQ */}
        <FAQ />
      </main>

      {/* Corporate Brand Footer */}
      <Footer />

      {/* Popups & Overlays */}
      <AnimatePresence>
        {/* Direct Purchase Modal */}
        {buyModalOpen && (
          <BuyModal
            isOpen={buyModalOpen}
            onClose={() => setBuyModalOpen(false)}
            initialProduct={selectedBuyProduct}
          />
        )}

        {/* Side-by-Side Formula Comparison Matrix */}
        {compareModalOpen && (
          <ProductComparison
            onClose={() => setCompareModalOpen(false)}
            onSelectProductBuy={(prod) => {
              setCompareModalOpen(false);
              handleOpenBuyModal(prod);
            }}
          />
        )}

        {/* Email Capture Exit Intent Modal */}
        {exitIntentOpen && (
          <ExitIntentModal
            isOpen={exitIntentOpen}
            onClose={() => setExitIntentOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
