import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Award, Leaf, Zap, Smile } from 'lucide-react';
import { sfx } from '../utils/sound';

export default function WhyDrPepper() {
  const [satisfaction, setSatisfaction] = useState(80);
  const [countries, setCountries] = useState(0);
  const [flavors, setFlavors] = useState(0);

  // Simple count up effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // satisfaction
      let satVal = 80;
      const satInterval = setInterval(() => {
        satVal += 1;
        if (satVal >= 100) {
          setSatisfaction(100);
          clearInterval(satInterval);
        } else {
          setSatisfaction(satVal);
        }
      }, 30);

      // countries
      let countVal = 0;
      const countInterval = setInterval(() => {
        countVal += 1;
        if (countVal >= 45) {
          setCountries(45);
          clearInterval(countInterval);
        } else {
          setCountries(countVal);
        }
      }, 40);

      // flavors
      let flavVal = 0;
      const flavInterval = setInterval(() => {
        flavVal += 1;
        if (flavVal >= 23) {
          setFlavors(23);
          clearInterval(flavInterval);
        } else {
          setFlavors(flavVal);
        }
      }, 50);

      return () => {
        clearInterval(satInterval);
        clearInterval(countInterval);
        clearInterval(flavInterval);
      };
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Award className="text-gold" size={24} />,
      title: 'Legendary 23 Flavor Blend',
      desc: 'The sacred, proprietary recipe combines cherry, vanilla, licensing, almond, and subtle warm spices. Not just a cola, but a deep flavor symphony.',
      color: 'from-dark-cherry/40 to-transparent',
      borderColor: 'border-cream/10 hover:border-gold',
    },
    {
      icon: <Flame className="text-gold" size={24} />,
      title: 'Refreshing Peppery Bite',
      desc: 'Carbonated to absolute perfection to deliver that signature, crisp, prickling kick at the back of your throat. Ultimate refreshment under any sun.',
      color: 'from-dark-cherry/40 to-transparent',
      borderColor: 'border-cream/10 hover:border-gold',
    },
    {
      icon: <Leaf className="text-gold" size={24} />,
      title: 'Premium Craft Ingredients',
      desc: 'Using high-quality carbonated spring waters, premium cane sugars, and high-purity natural fruit oils to guarantee consistency in every sip.',
      color: 'from-dark-cherry/40 to-transparent',
      borderColor: 'border-cream/10 hover:border-gold',
    },
    {
      icon: <Zap className="text-gold" size={24} />,
      title: 'Zero compromise Options',
      desc: 'Our Zero Sugar formulations use advanced, custom-balanced sweetening agents to replicate the heavy velvet mouthfeel of the original formula perfectly.',
      color: 'from-dark-cherry/40 to-transparent',
      borderColor: 'border-cream/10 hover:border-gold',
    },
  ];

  return (
    <section
      id="why-pepper"
      className="relative py-24 sm:py-32 bg-burgundy overflow-hidden"
    >
      {/* Decorative vector background lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Bento-style Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => sfx.playTick()}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`bg-dark-cherry/50 backdrop-blur-md p-6 rounded-none border ${feat.borderColor} transition-all duration-300 flex flex-col items-start text-left bg-gradient-to-b ${feat.color} group cursor-pointer`}
              >
                <div className="p-3 bg-burgundy border border-cream/10 rounded-none mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-black text-cream tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-cream/80 text-xs sm:text-sm mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats, Big Headlines & Dynamic Counters */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
              <Star size={12} className="fill-gold text-gold" />
              <span>THE COLA REBEL</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
              Never Settle For The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
                Ordinary.
              </span>
            </h2>

            <p className="text-cream/80 text-sm sm:text-base leading-relaxed mt-4">
              When you open a Dr Pepper, you aren’t just having a fizzy soda. You are tasting history,
              subversion, and culinary craft. For over a century, we have refused to be box-labeled as
              just another generic cola. We represent the bold, the unique, and the dreamers who value
              one-of-a-kind flavor identity.
            </p>

            {/* Micro Counter Stats block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full border-t border-cream/10 pt-8">
              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl font-serif font-black italic text-gold tracking-tight">
                  {flavors}
                </span>
                <span className="text-cream/60 text-xs uppercase font-mono tracking-widest mt-1">
                  Secret Herbs & Spices
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl font-serif font-black text-cream tracking-tight">
                  {countries}+
                </span>
                <span className="text-cream/60 text-xs uppercase font-mono tracking-widest mt-1">
                  Global Markets
                </span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl font-serif font-black italic text-gold tracking-tight flex items-center">
                  {satisfaction}%<Smile size={18} className="text-gold ml-1" />
                </span>
                <span className="text-cream/60 text-xs uppercase font-mono tracking-widest mt-1">
                  Taste Satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
