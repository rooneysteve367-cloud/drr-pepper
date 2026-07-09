import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Award, HelpCircle, Check, Sparkles, Star } from 'lucide-react';
import { sfx } from '../utils/sound';

interface SwagReward {
  pointsNeeded: number;
  item: string;
  image: string;
  desc: string;
  badge: string;
}

export default function Rewards() {
  const [cansPerMonth, setCansPerMonth] = useState<number>(12);
  const [activeTab, setActiveTab] = useState<'perks' | 'swag'>('perks');

  // Calculates points: each can = 10 Pepper Points
  const monthlyPoints = cansPerMonth * 10;
  const yearlyPoints = monthlyPoints * 12;

  const swagTiers: SwagReward[] = [
    {
      pointsNeeded: 120,
      item: 'Vintage Waco Trucker Cap',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=300',
      desc: 'An authentic distressed cotton snapback with the legendary retro 10-2-4 clock crest.',
      badge: 'Classic Swag'
    },
    {
      pointsNeeded: 350,
      item: 'Retro Velvet Varsity Tee',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300',
      desc: 'Heavyweight organic ringspun cotton t-shirt featuring flocked velvet typography.',
      badge: 'Premium Apparel'
    },
    {
      pointsNeeded: 800,
      item: 'The Waco Heritage Steel Cooler',
      image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=300',
      desc: 'Stainless steel latch cooler with dynamic vacuum-insulated walls. Keeps 24 cans freezing cold.',
      badge: 'Legendary Gear'
    }
  ];

  const benefits = [
    {
      title: 'Free Shipping for Life',
      desc: 'Order cold cans direct to your garage or college dorm with zero standard delivery shipping fees.',
      icon: <Check className="text-gold" size={16} />
    },
    {
      title: '$100K College Tuition Entries',
      desc: 'Pepper Points automatically convert to entries in the annual Dr Pepper Tuition Giveaway live at the SEC title game.',
      icon: <Check className="text-gold" size={16} />
    },
    {
      title: 'Early Limited Releases',
      desc: 'Get exclusive access to order limited flavor experiments (like Dr Pepper Creamy Coconut) 14 days before nationwide retail.',
      icon: <Check className="text-gold" size={16} />
    }
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setCansPerMonth(val);
    if (val % 3 === 0) {
      sfx.playTick();
    }
  };

  return (
    <section
      id="rewards"
      className="relative py-24 sm:py-32 bg-burgundy text-cream border-b border-cream/10 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Loyalty Explanation Column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
              <Gift size={12} className="animate-pulse" />
              <span>Pepper Pack Rewards</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
              Fuel Your Passion.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
                Unlock Legendary Swag.
              </span>
            </h2>

            <p className="text-cream/80 text-sm sm:text-base mt-4 font-sans">
              Earn points for every single standard or zero sugar can of Dr Pepper you enjoy. Redeem points for vintage clothing, collectors glasses, or enter the legendary $100,000 college tuition giveaway!
            </p>

            {/* Loyalty Benefits Checklist */}
            <div className="flex flex-col gap-4 mt-8 w-full">
              {benefits.map((ben) => (
                <div key={ben.title} className="flex gap-3 items-start border-l border-cream/10 pl-4 py-1">
                  <div className="p-1 rounded-none bg-cream/5 border border-cream/10 mt-0.5">
                    {ben.icon}
                  </div>
                  <div>
                    <h4 className="text-cream font-serif font-bold text-sm">{ben.title}</h4>
                    <p className="text-cream/65 text-xs mt-0.5 leading-relaxed font-sans">{ben.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                sfx.playCanCrack();
                const element = document.getElementById('newsletter-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 bg-cream hover:bg-cream/90 text-burgundy px-8 py-3.5 rounded-none font-bold text-sm tracking-widest uppercase hover:scale-102 transition-all cursor-pointer border border-cream/20 shadow-lg"
            >
              Join Pepper Pack
            </button>
          </div>

          {/* Right Gamified Point Calculator Column */}
          <div className="lg:col-span-7 bg-dark-cherry border border-cream/10 rounded-none p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
            <div className="absolute top-4 right-4 text-gold/60">
              <Sparkles size={24} className="animate-pulse" />
            </div>

            <h3 className="text-xl font-bold font-serif tracking-tight mb-6 text-left text-cream">
              Pepper Points Calculator
            </h3>

            {/* Slider Simulator */}
            <div className="text-left bg-burgundy rounded-none p-5 border border-cream/10 mb-8">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-cream/60 text-xs uppercase font-mono tracking-widest">
                  Sips Consumed per Month
                </span>
                <span className="text-cream font-serif italic font-black text-2xl">
                  {cansPerMonth}{' '}
                  <span className="text-xs text-gold font-bold uppercase font-mono">Cans</span>
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="60"
                value={cansPerMonth}
                onChange={handleSliderChange}
                className="w-full accent-gold h-1 bg-dark-cherry rounded-none appearance-none cursor-pointer mb-2"
              />

              <div className="flex justify-between text-[10px] font-mono text-cream/40 uppercase">
                <span>1 Can / Month</span>
                <span>30 Cans (Case)</span>
                <span>60 Cans / Month</span>
              </div>
            </div>

            {/* Counter outputs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-burgundy p-4 rounded-none border border-cream/10 text-left">
                <span className="text-cream/40 font-mono text-[10px] uppercase tracking-widest block">
                  Monthly Points
                </span>
                <span className="text-2xl sm:text-3xl font-black text-gold font-serif block mt-1">
                  {monthlyPoints}{' '}
                  <span className="text-xs text-cream/60 font-normal">pts</span>
                </span>
              </div>

              <div className="bg-burgundy p-4 rounded-none border border-cream/10 text-left">
                <span className="text-cream/40 font-mono text-[10px] uppercase tracking-widest block">
                  Yearly Points
                </span>
                <span className="text-2xl sm:text-3xl font-black text-cream font-serif block mt-1">
                  {yearlyPoints}{' '}
                  <span className="text-xs text-cream/60 font-normal">pts</span>
                </span>
              </div>
            </div>

            {/* Rewards tiers preview matching points simulated */}
            <div className="text-left">
              <h4 className="text-cream/60 text-xs uppercase font-mono tracking-widest mb-3">
                Unlockable Merchandise Tiers
              </h4>
              <div className="flex flex-col gap-3">
                {swagTiers.map((tier) => {
                  const unlocked = yearlyPoints >= tier.pointsNeeded;
                  return (
                    <div
                      key={tier.item}
                      className={`p-3 rounded-none border flex items-center gap-4 transition-all ${
                        unlocked
                          ? 'bg-burgundy/40 border-gold/50 shadow-inner'
                          : 'bg-burgundy/10 border-cream/10 opacity-60'
                      }`}
                    >
                      <img
                        src={tier.image}
                        alt={tier.item}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-none object-cover border border-cream/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <h5 className="text-sm font-serif font-bold text-cream truncate">
                            {tier.item}
                          </h5>
                          <span className="text-[10px] font-mono uppercase shrink-0 text-gold">
                            {tier.pointsNeeded} pts
                          </span>
                        </div>
                        <p className="text-cream/70 text-[11px] font-sans truncate mt-0.5">
                          {tier.desc}
                        </p>
                      </div>

                      {/* Unlock Stamp */}
                      <span
                        className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-none font-bold shrink-0 ${
                          unlocked
                            ? 'bg-gold text-burgundy shadow-md'
                            : 'bg-burgundy/80 text-cream/40'
                        }`}
                      >
                        {unlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
