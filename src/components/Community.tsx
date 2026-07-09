import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Star, Heart, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { REVIEWS } from '../data';
import { sfx } from '../utils/sound';

export default function Community() {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [ugclikes, setUgclikes] = useState<Record<number, number>>({
    0: 1420,
    1: 928,
    2: 2450,
    3: 312,
    4: 1845,
    5: 721
  });
  const [likedUgc, setLikedUgc] = useState<Record<number, boolean>>({});

  const handleReviewNav = (dir: 'prev' | 'next') => {
    sfx.playTick();
    if (dir === 'prev') {
      setActiveReviewIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
    } else {
      setActiveReviewIdx((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }
  };

  const handleUgcLike = (idx: number) => {
    sfx.playBubble();
    const alreadyLiked = likedUgc[idx];
    setLikedUgc((prev) => ({ ...prev, [idx]: !alreadyLiked }));
    setUgclikes((prev) => ({
      ...prev,
      [idx]: alreadyLiked ? prev[idx] - 1 : prev[idx] + 1
    }));
  };

  const ugcPosts = [
    {
      image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=300',
      user: '@cherry_fountain_fan',
      caption: 'The absolute best Dr Pepper cherry float I have ever assembled! Soft scoop bean vanilla + slow pour = microfoam heaven! 😍 #DrPepper #FloatLife',
    },
    {
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=300',
      user: '@waco_grillmaster',
      caption: 'Slow-simmered sticky wings with the Original Dr Pepper mahogany reduction. Completely glazed and caramelized. Legend status! 🍗 #PepperCooks',
    },
    {
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=300',
      user: '@neon_night_cruiser',
      caption: 'Midnight roadtrip, cold can of Cherry Dr Pepper in the console, neon lines on the highway. There is literally nothing else like this taste. 🚀',
    },
    {
      image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=300',
      user: '@craft_spiced_velvet',
      caption: 'Turned the classic into a double old-fashioned rosemary-star-anise mocktail. The herbal anise blend complements the 23-flavors so nicely!',
    }
  ];

  return (
    <section
      id="community"
      className="relative py-24 sm:py-32 bg-stone-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-gradient-to-tr from-[#D0103A] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Verified Testimonials carousel */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-rose-400 font-mono text-xs uppercase tracking-widest mb-4">
              <Star size={12} className="fill-rose-400" />
              <span>Verified Testimonials</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none font-sans">
              Loved By The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#D0103A]">
                Pepper Pack.
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base mt-4">
              Our customers are proudly independent. Read what long-time fan club members and creative home chefs have to say about their daily sips.
            </p>

            {/* Carousel display with height transition */}
            <div className="w-full mt-10 min-h-[220px] bg-stone-900/40 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIdx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-1.5 text-amber-400 mb-4">
                    {Array.from({ length: REVIEWS[activeReviewIdx].rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-stone-100 text-sm italic leading-relaxed font-serif">
                    "{REVIEWS[activeReviewIdx].text}"
                  </p>

                  <div className="flex gap-3 items-center mt-6">
                    <img
                      src={REVIEWS[activeReviewIdx].avatar}
                      alt={REVIEWS[activeReviewIdx].user}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border border-white/10 object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans leading-none">
                        {REVIEWS[activeReviewIdx].user}
                      </h4>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mt-1">
                        Verified Purchase • {REVIEWS[activeReviewIdx].variationPurchased}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider nav controls */}
              <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleReviewNav('prev')}
                  className="p-2 rounded-full border border-white/10 text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ArrowLeft size={14} />
                </button>
                <button
                  onClick={() => handleReviewNav('next')}
                  className="p-2 rounded-full border border-white/10 text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Instagram/UGC Masonry block */}
          <div className="lg:col-span-7">
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="text-xl font-bold font-sans tracking-tight">Social Wall #BeAPepper</h3>
              <a
                href="https://instagram.com"
                className="text-xs font-mono uppercase tracking-widest text-amber-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Instagram size={14} />
                <span>Visit Instagram</span>
              </a>
            </div>

            {/* UGC grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ugcPosts.map((post, index) => {
                const liked = likedUgc[index];
                return (
                  <div
                    key={index}
                    className="group bg-stone-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300"
                  >
                    {/* Image space with overlay */}
                    <div className="relative h-[200px] overflow-hidden">
                      <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors z-10" />
                      <img
                        src={post.image}
                        alt={post.user}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* User Badge overlay */}
                      <div className="absolute top-3 left-3 z-20 bg-stone-950/80 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono text-white flex items-center gap-1">
                        <Instagram size={10} className="text-amber-400" />
                        <span>{post.user}</span>
                      </div>
                    </div>

                    {/* Likes & Comments Interactive strip */}
                    <div className="p-3 text-left">
                      <p className="text-stone-300 text-xs line-clamp-2 leading-relaxed">
                        {post.caption}
                      </p>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleUgcLike(index)}
                          className="flex items-center gap-1.5 text-stone-400 hover:text-[#D0103A] text-xs transition-colors cursor-pointer"
                        >
                          <Heart size={13} className={liked ? 'fill-[#D0103A] text-[#D0103A]' : ''} />
                          <span className="font-mono text-[11px] font-bold text-stone-300">
                            {ugclikes[index]}
                          </span>
                        </button>

                        <div className="flex items-center gap-1 text-stone-500 text-xs font-mono uppercase">
                          <MessageCircle size={12} />
                          <span>Insta Feed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
