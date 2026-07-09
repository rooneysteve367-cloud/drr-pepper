import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import { FAQ_DATA } from '../data';
import { sfx } from '../utils/sound';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const handleToggle = (id: string) => {
    sfx.playTick();
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const text = (faq.question + ' ' + faq.answer + ' ' + faq.category).toLowerCase();
    return text.includes(searchQuery.toLowerCase());
  });

  return (
    <section
      id="faq-section"
      className="relative py-24 sm:py-32 bg-burgundy text-cream border-b border-cream/10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-gold/10 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
            <HelpCircle size={12} />
            <span>Truth & Science</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-none">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
              Puzzles.
            </span>
          </h2>
          <p className="text-cream/80 text-sm sm:text-base mt-2 font-sans text-center">
            Dissecting the rumors, historical facts, and formula mysteries of America's oldest soft drink brand.
          </p>
        </div>

        {/* Realtime FAQ Search field */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search FAQs (e.g., 'prune juice', 'period', '23')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-cherry border border-cream/10 focus:border-gold rounded-none py-3.5 px-12 text-sm outline-none font-sans text-cream placeholder-cream/40"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream font-mono text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    className={`bg-dark-cherry border rounded-none transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'border-gold bg-dark-cherry shadow-lg'
                        : 'border-cream/10 hover:border-cream/20'
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => handleToggle(faq.id)}
                      className="w-full py-5 px-6 flex items-center justify-between text-left outline-none cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gold mb-1 leading-none">
                          Category: {faq.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-serif font-bold text-cream tracking-tight leading-tight">
                          {faq.question}
                        </h3>
                      </div>

                      <div className="shrink-0 p-1 bg-burgundy rounded-none border border-cream/10 text-cream/60 group-hover:text-cream ml-4">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>

                    {/* Content pane with framer motion height toggle */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="border-t border-cream/10 bg-burgundy/40"
                        >
                          <div className="py-5 px-6 text-cream/90 text-xs sm:text-sm leading-relaxed font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12 border border-dashed border-cream/10 rounded-none bg-dark-cherry/20">
                <HelpCircle size={32} className="text-gold/40 mb-2 mx-auto animate-pulse" />
                <p className="text-cream/60 text-sm">No FAQs found matching your query.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
