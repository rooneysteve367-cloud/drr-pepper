import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight, Check, Eye, Heart } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { sfx } from '../utils/sound';

interface ProductShowcaseProps {
  onOpenBuyModal: (product?: Product) => void;
  onOpenCompareModal: () => void;
}

export default function ProductShowcase({ onOpenBuyModal, onOpenCompareModal }: ProductShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(PRODUCTS[0]);
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>({});

  const categories = [
    { label: 'All Varieties', value: 'all' },
    { label: 'Original Classic', value: 'classic' },
    { label: 'Zero Sugar', value: 'zero' },
    { label: 'Cherry Twist', value: 'cherry' },
    { label: 'Smooth Cream', value: 'cream' },
    { label: 'Limited Edition', value: 'limited' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playTick();
    setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardClick = (prod: Product) => {
    sfx.playSwoosh();
    setActiveDetailProduct(prod);
  };

  return (
    <section
      id="products"
      className="relative py-24 sm:py-32 bg-burgundy text-cream overflow-hidden transition-all duration-1000"
      style={{
        backgroundImage: activeDetailProduct
          ? `radial-gradient(circle at 80% 20%, var(--tw-gradient-from), transparent 60%)`
          : undefined,
      }}
    >
      {/* Dynamic Background Flare mapping to Active Product */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 transition-all duration-1000">
        <div
          className={`absolute top-10 right-10 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 bg-gradient-to-br ${
            activeDetailProduct?.id === 'original' ? 'from-gold to-transparent' :
            activeDetailProduct?.id === 'cherry' ? 'from-[#4A1014] to-transparent' :
            activeDetailProduct?.id === 'creamsoda' ? 'from-gold to-transparent' :
            activeDetailProduct?.id === 'strawberries_cream' ? 'from-[#FAF7F2] to-transparent' :
            activeDetailProduct?.id === 'zerosugar' ? 'from-dark-cherry to-transparent' : 'from-gold to-transparent'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
              <Sparkles size={12} />
              <span>THE COLA REBEL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
              Sip the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
                Uncompromising.
              </span>
            </h2>
            <p className="text-cream/80 text-sm sm:text-base mt-2">
              Find your signature can. Hover or click to examine flavor profiles, raw caloric metrics,
              and select individual buying retailers near you.
            </p>
          </div>

          <button
            onClick={() => {
              sfx.playTick();
              onOpenCompareModal();
            }}
            className="shrink-0 bg-transparent hover:bg-cream hover:text-burgundy border border-cream px-6 py-3 rounded-none text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span>Compare Ingredients</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                sfx.playTick();
                setSelectedCategory(cat.value);
              }}
              className={`px-5 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase shrink-0 transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-cream text-burgundy shadow-lg border border-cream'
                  : 'bg-dark-cherry/40 text-cream/60 hover:bg-dark-cherry/80 hover:text-cream border border-cream/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Catalog Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Grid of Cards */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => {
                const isHovered = hoveredId === prod.id;
                const isActiveDetail = activeDetailProduct?.id === prod.id;
                const isLiked = likedProducts[prod.id];

                return (
                  <motion.div
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onMouseEnter={() => {
                      setHoveredId(prod.id);
                      sfx.playTick();
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleCardClick(prod)}
                    className={`relative bg-dark-cherry/45 rounded-none p-6 border cursor-pointer overflow-hidden transition-all duration-300 backdrop-blur-md h-[340px] flex flex-col justify-between ${
                      isActiveDetail
                        ? 'border-gold shadow-[0_0_25px_rgba(197,160,89,0.15)] bg-dark-cherry/90'
                        : isHovered
                        ? 'border-cream/30 shadow-xl bg-dark-cherry/60'
                        : 'border-cream/10'
                    }`}
                  >
                    {/* Like button overlay */}
                    <button
                      onClick={(e) => toggleLike(prod.id, e)}
                      className="absolute top-4 right-4 z-20 p-2 rounded-none bg-burgundy/60 border border-cream/10 hover:border-gold transition-all"
                    >
                      <Heart
                        size={14}
                        className={isLiked ? 'fill-gold text-gold' : 'text-cream/40'}
                      />
                    </button>

                    {/* Dynamic colored background glow */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at 50% 80%, #C5A05933, transparent 70%)`,
                        opacity: isHovered || isActiveDetail ? 1 : 0,
                      }}
                    />

                    {/* Image Area */}
                    <div className="h-40 w-full flex items-center justify-center relative mt-2 z-10">
                      <motion.img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="h-full object-contain filter contrast-110 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                        animate={{
                          y: isHovered ? [0, -8, 0] : 0,
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>

                    {/* Label Area */}
                    <div className="text-left relative z-10 mt-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                        {prod.calories} Calories • Rating {prod.rating}★
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-extrabold tracking-tight text-cream leading-tight mt-1">
                        {prod.name}
                      </h3>
                      <p className="text-cream/70 text-xs line-clamp-1 mt-1 font-sans">
                        {prod.tagline}
                      </p>
                    </div>

                    {/* Quick Examine Hover indicator */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cream/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Eye size={12} />
                      <span>Examine</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Active Product Detailed View Column */}
          <div className="md:col-span-5">
            {activeDetailProduct ? (
              <motion.div
                key={activeDetailProduct.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-dark-cherry/95 border border-cream/10 rounded-none p-6 sm:p-8 backdrop-blur-md shadow-2xl text-left relative overflow-hidden flex flex-col h-full justify-between"
              >
                {/* Visual Accent Corner Glow */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-40 bg-gold"
                />

                <div>
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-1 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-[10px] uppercase tracking-widest mb-4">
                    <Check size={10} />
                    <span>Selected: {activeDetailProduct.category}</span>
                  </div>

                  {/* Title & Tag */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-cream leading-tight">
                    {activeDetailProduct.name}
                  </h3>
                  <p className="text-gold font-serif italic text-xs uppercase tracking-wider mt-1">
                    {activeDetailProduct.tagline}
                  </p>

                  <p className="text-cream/90 text-sm leading-relaxed mt-4">
                    {activeDetailProduct.description}
                  </p>

                  {/* Flavor Notes Bubbles */}
                  <div className="mt-6">
                    <h4 className="text-cream/60 text-xs uppercase font-mono tracking-widest mb-2">
                      Aromatic Flavor Notes
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDetailProduct.flavorNotes.map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-1 rounded-none bg-burgundy text-cream/90 font-mono text-[10px] uppercase border border-cream/10"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition Metrics Mini Table */}
                  <div className="mt-8 bg-burgundy/60 rounded-none p-4 border border-cream/10">
                    <h4 className="text-cream text-xs uppercase font-mono tracking-widest border-b border-cream/10 pb-2 mb-3">
                      Core Nutritional Facts (12oz Can)
                    </h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-mono text-cream/60">
                      <div className="flex justify-between border-b border-cream/5 pb-1">
                        <span>Calories</span>
                        <strong className="text-cream">{activeDetailProduct.calories}</strong>
                      </div>
                      <div className="flex justify-between border-b border-cream/5 pb-1">
                        <span>Sodium</span>
                        <strong className="text-cream">
                          {activeDetailProduct.nutritionInfo.sodium}
                        </strong>
                      </div>
                      <div className="flex justify-between border-b border-cream/5 pb-1">
                        <span>Total Carbs</span>
                        <strong className="text-cream">
                          {activeDetailProduct.nutritionInfo.totalCarb}
                        </strong>
                      </div>
                      <div className="flex justify-between border-b border-cream/5 pb-1">
                        <span>Sugars</span>
                        <strong className="text-cream">
                          {activeDetailProduct.nutritionInfo.sugars}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion Trigger Button */}
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      sfx.playCanCrack();
                      onOpenBuyModal(activeDetailProduct);
                    }}
                    className="w-full py-4 rounded-none font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 cursor-pointer border border-cream bg-cream text-burgundy hover:bg-transparent hover:text-cream"
                  >
                    <span>Deploy 12-Pack Delivery</span>
                  </button>
                  <p className="text-center text-cream/40 text-[10px] font-mono uppercase tracking-widest">
                    Free shipping for Pepper Pack loyalty members
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full bg-dark-cherry/20 border border-dashed border-cream/10 rounded-none p-8 flex items-center justify-center">
                <p className="text-cream/60 text-sm">Select a variety to examine specs.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
