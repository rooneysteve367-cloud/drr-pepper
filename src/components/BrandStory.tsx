import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, History, Trophy, Sparkles } from 'lucide-react';
import { TIMELINE } from '../data';
import { sfx } from '../utils/sound';

export default function BrandStory() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleYearClick = (idx: number) => {
    sfx.playTick();
    setSelectedIdx(idx);
  };

  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 bg-dark-cherry border-y border-cream/10 overflow-hidden"
    >
      {/* Background abstract visual elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-burgundy/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
            <History size={12} />
            <span>Legacy & Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
            A Story Written In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
              23 Secret Flavors.
            </span>
          </h2>
          <p className="text-cream/80 text-base sm:text-lg mt-4 max-w-xl mx-auto font-sans">
            Before soda giants dominated the globe, a creative pharmacist in Texas dreamed up an
            unmatched sensory elixir. Experience the timeline of America’s most unique beverage.
          </p>
        </div>

        {/* Timeline Control Rail */}
        <div className="relative mb-12 sm:mb-16">
          {/* Horizontal Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-burgundy -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-[2.5px] bg-gradient-to-r from-gold to-cream -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(selectedIdx / (TIMELINE.length - 1)) * 100}%` }}
          />

          {/* Staggered Years Row */}
          <div className="flex justify-between items-center relative z-10 overflow-x-auto py-4 scrollbar-none px-2">
            {TIMELINE.map((item, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={item.year}
                  onClick={() => handleYearClick(idx)}
                  className="flex flex-col items-center gap-2 cursor-pointer outline-none shrink-0"
                >
                  {/* Dynamic point icon */}
                  <motion.div
                    className={`w-10 h-10 rounded-none flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-gold to-gold/80 border-cream text-burgundy shadow-lg shadow-gold/20 scale-110'
                        : 'bg-burgundy border-cream/10 text-cream/60 hover:border-gold hover:text-cream'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Calendar size={14} className={isActive ? 'text-burgundy' : 'text-cream/60'} />
                  </motion.div>

                  {/* Year text */}
                  <span
                    className={`font-mono text-sm sm:text-base font-bold tracking-wider transition-all duration-300 ${
                      isActive ? 'text-gold scale-105' : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Timeline Feature Card */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-burgundy border border-cream/10 rounded-none p-6 sm:p-10 backdrop-blur-md shadow-2xl relative"
            >
              {/* Highlight Decorative Border */}
              <div className="absolute top-0 left-12 w-24 h-[2px] bg-gradient-to-r from-gold to-transparent" />

              {/* Milestone Details */}
              <div className="md:col-span-8 flex flex-col items-start text-left">
                {/* Badge tag */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-cream/5 border border-cream/15 text-gold font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-4">
                  <Trophy size={12} />
                  <span>{TIMELINE[selectedIdx].badge}</span>
                </div>

                {/* Main Year Display */}
                <h3 className="text-4xl sm:text-6xl font-serif font-black text-cream leading-none flex items-baseline gap-4">
                  {TIMELINE[selectedIdx].year}
                  <span className="text-cream/40 font-mono text-lg font-normal uppercase tracking-widest hidden sm:inline">
                    • milestone
                  </span>
                </h3>

                {/* Milestone Title */}
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-cream mt-4 tracking-tight">
                  {TIMELINE[selectedIdx].title}
                </h4>

                {/* Milestone Description */}
                <p className="text-cream/80 text-sm sm:text-base leading-relaxed mt-3 max-w-3xl">
                  {TIMELINE[selectedIdx].description}
                </p>
              </div>

              {/* Graphical Feature Box */}
              <div className="md:col-span-4 h-full flex items-center justify-center bg-gradient-to-br from-burgundy/40 to-dark-cherry/20 border border-cream/10 rounded-none p-6 relative overflow-hidden min-h-[160px] md:min-h-[220px]">
                <div className="absolute inset-0 bg-radial from-gold/20 via-transparent to-transparent opacity-60" />

                {/* Rotating Badge Crest */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-36 h-36 rounded-none border border-dashed border-gold/15 flex items-center justify-center pointer-events-none"
                />

                <div className="relative text-center flex flex-col items-center">
                  <Sparkles size={36} className="text-gold mb-3 animate-bounce" />
                  <span className="text-cream/60 font-mono text-xs uppercase tracking-widest">
                    Dr Pepper Secret Recipe
                  </span>
                  <span className="text-cream font-serif font-black text-xl tracking-tight mt-1">
                    Authentic Blend
                  </span>
                  <span className="text-cream/40 text-[10px] font-mono uppercase mt-2">
                    EST. 1885 • Waco TX
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
