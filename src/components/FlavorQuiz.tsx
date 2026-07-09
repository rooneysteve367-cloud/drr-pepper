import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, RefreshCw, ShoppingCart, CheckCircle, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data';
import { Product } from '../types';
import { sfx } from '../utils/sound';

interface FlavorQuizProps {
  onOpenBuyModal: (product?: Product) => void;
}

export default function FlavorQuiz({ onOpenBuyModal }: FlavorQuizProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const handleAnswerSelect = (scoreRecord: Record<string, number>) => {
    sfx.playTick();
    
    // Accumulate scores
    const updatedScores = { ...scores };
    Object.entries(scoreRecord).forEach(([id, points]) => {
      updatedScores[id] = (updatedScores[id] || 0) + points;
    });
    setScores(updatedScores);

    // Advance question or finish
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      calculateResult(updatedScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
    sfx.playCanCrack();
    
    // Find key with maximum value
    let bestProductId = 'original';
    let maxPoints = -1;

    Object.entries(finalScores).forEach(([id, points]) => {
      if (points > maxPoints) {
        maxPoints = points;
        bestProductId = id;
      }
    });

    // Handle general categories fallback if category keys are returned
    let finalMatch = PRODUCTS.find((p) => p.id === bestProductId);
    if (!finalMatch) {
      // Find based on category match fallback
      finalMatch = PRODUCTS.find((p) => p.category === bestProductId) || PRODUCTS[0];
    }

    setMatchedProduct(finalMatch);
    setQuizFinished(true);
  };

  const resetQuiz = () => {
    sfx.playSwoosh();
    setCurrentQuestionIdx(0);
    setScores({});
    setQuizFinished(false);
    setMatchedProduct(null);
  };

  return (
    <section
      id="quiz"
      className="relative py-24 sm:py-32 bg-stone-950 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#8C1D40]/30 to-transparent blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-white">
        {/* Header Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
            <HelpCircle size={12} className="animate-pulse" />
            <span>Persona Finder</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none font-sans">
            The 23-Flavor Match Quiz.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Take our sensory quiz and let our flavor matrix calculate which specific Dr Pepper blend matches your taste profile.
          </p>
        </div>

        {/* Quiz Engine Workspace */}
        <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  {/* Progress Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      Step {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                    <div className="w-24 h-1.5 bg-stone-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-left font-sans tracking-tight mb-8">
                    {QUIZ_QUESTIONS[currentQuestionIdx].text}
                  </h3>

                  {/* Multi-Choice Options List */}
                  <div className="flex flex-col gap-3.5">
                    {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswerSelect(opt.score)}
                        className="w-full text-left bg-stone-950/60 hover:bg-stone-950/90 border border-white/5 hover:border-amber-400/40 p-4 rounded-2xl text-stone-300 hover:text-white transition-all duration-200 cursor-pointer text-xs sm:text-sm font-sans flex items-center justify-between group"
                      >
                        <span>{opt.text}</span>
                        <div className="w-5 h-5 rounded-full border border-stone-800 flex items-center justify-center shrink-0 group-hover:border-amber-400/40 group-hover:bg-amber-400/10 transition-all">
                          <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-amber-400 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 text-left border-t border-white/5 pt-4">
                  <p className="text-stone-500 text-[10px] font-mono uppercase">
                    Calculated in real-time based on 23 flavor compound values
                  </p>
                </div>
              </motion.div>
            ) : (
              // Results Display
              matchedProduct && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  {/* Left Column matching Product Image */}
                  <div className="md:col-span-4 flex justify-center relative">
                    <div className="absolute inset-0 bg-[#8C1D40]/30 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none" />
                    <motion.img
                      src={matchedProduct.image}
                      alt={matchedProduct.name}
                      referrerPolicy="no-referrer"
                      className="h-56 sm:h-72 object-contain filter contrast-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>

                  {/* Right Column match explanation */}
                  <div className="md:col-span-8 text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-[10px] uppercase tracking-widest mb-3">
                      <CheckCircle size={12} />
                      <span>Personality Match Found</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black text-white font-sans leading-none tracking-tight">
                      {matchedProduct.name}
                    </h3>
                    <p className="text-amber-400 font-mono text-xs uppercase tracking-wider font-bold mt-1">
                      {matchedProduct.tagline}
                    </p>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mt-4">
                      Your answers show that you appreciate the refined details and bold sensory depth in drinks. {matchedProduct.name} fits your lifestyle perfectly, delivering the delicious 23-flavor punch you crave!
                    </p>

                    {/* Matching notes tags */}
                    <div className="mt-4">
                      <span className="text-stone-500 text-[10px] font-mono uppercase block mb-1.5">
                        Matched Taste Elements
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {matchedProduct.flavorNotes.slice(0, 4).map((n) => (
                          <span
                            key={n}
                            className="px-2 py-0.5 rounded bg-stone-950 text-[10px] font-mono text-stone-300 border border-white/5"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions block */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <button
                        onClick={() => {
                          sfx.playCanCrack();
                          onOpenBuyModal(matchedProduct);
                        }}
                        className={`px-6 py-3 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border border-amber-400/20 text-white ${matchedProduct.buttonColor}`}
                      >
                        <ShoppingCart size={14} />
                        <span>Claim Match Delivery</span>
                      </button>

                      <button
                        onClick={resetQuiz}
                        className="px-6 py-3 rounded-full bg-stone-950 border border-white/10 hover:border-amber-400/40 text-stone-300 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw size={12} />
                        <span>Retake Quiz</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
