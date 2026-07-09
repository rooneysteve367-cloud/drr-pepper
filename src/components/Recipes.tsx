import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Heart, Share2, Timer, Flame, Check } from 'lucide-react';
import { RECIPES } from '../data';
import { Recipe } from '../types';
import { sfx } from '../utils/sound';

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(RECIPES[0]);
  const [savedRecipeIds, setSavedRecipeIds] = useState<Record<string, boolean>>({});
  const [shares, setShares] = useState<Record<string, number>>({});
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // load initial share counts
    const initialShares: Record<string, number> = {};
    RECIPES.forEach((r) => {
      initialShares[r.id] = r.shareCount;
    });
    setShares(initialShares);
  }, []);

  const categories = ['All', 'Cocktail', 'Mocktail', 'Dessert', 'Float'];

  const filteredRecipes = activeCategory === 'All'
    ? RECIPES
    : RECIPES.filter((r) => r.category === activeCategory);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playTick();
    setSavedRecipeIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playCanCrack();
    setShares((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    alert('Recipe link copied to clipboard! Share the taste.');
  };

  const handleRecipeClick = (recipe: Recipe) => {
    sfx.playSwoosh();
    setSelectedRecipe(recipe);
    setCheckedIngredients({}); // reset list checkboxes
  };

  const toggleIngredientCheck = (ing: string) => {
    sfx.playTick();
    setCheckedIngredients((prev) => ({ ...prev, [ing]: !prev[ing] }));
  };

  return (
    <section
      id="recipes"
      className="relative py-24 sm:py-32 bg-burgundy border-b border-cream/10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gradient-to-tr from-gold to-transparent blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
            <Utensils size={12} />
            <span>Pepper Cookery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
            Craft Culinary{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
              Masterpieces.
            </span>
          </h2>
          <p className="text-cream/80 text-sm sm:text-base mt-2 max-w-xl mx-auto font-sans">
            The secret 23 flavors add a rich, deep, caramelized complexity to recipes. Elevate your kitchens with desserts, mocktails, and marinades.
          </p>
        </div>

        {/* Categories row */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sfx.playTick();
                setActiveCategory(cat);
                // default select first item in category if available
                const first = RECIPES.find((r) => cat === 'All' || r.category === cat);
                if (first) setSelectedRecipe(first);
              }}
              className={`px-5 py-2 rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-300 shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cream text-burgundy border border-cream shadow-lg'
                  : 'bg-dark-cherry/40 text-cream/60 hover:bg-dark-cherry/80 hover:text-cream border border-cream/10'
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick List of Category Recipes */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {filteredRecipes.map((recipe) => {
              const isSelected = selectedRecipe?.id === recipe.id;
              const isSaved = savedRecipeIds[recipe.id];
              return (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeClick(recipe)}
                  className={`relative p-4 rounded-none border cursor-pointer transition-all duration-300 flex gap-4 text-left items-center ${
                    isSelected
                      ? 'border-gold bg-dark-cherry shadow-xl'
                      : 'border-cream/10 bg-dark-cherry/40 hover:border-cream/20 hover:bg-dark-cherry/60'
                  }`}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-none object-cover border border-cream/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold">
                      {recipe.category} • {recipe.prepTime}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-cream tracking-tight truncate">
                      {recipe.name}
                    </h3>
                    <p className="text-cream/70 text-[11px] font-sans truncate mt-0.5">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Actions overlay */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={(e) => toggleSave(recipe.id, e)}
                      className="p-1 rounded-none text-cream/60 hover:text-gold transition-colors"
                    >
                      <Heart size={14} className={isSaved ? 'fill-gold text-gold' : ''} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Recipe Focus card */}
          <div className="lg:col-span-8">
            {selectedRecipe ? (
              <motion.div
                key={selectedRecipe.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-dark-cherry border border-cream/10 rounded-none overflow-hidden backdrop-blur-md shadow-2xl text-left"
              >
                {/* Recipe Hero Image banner */}
                <div className="relative h-[240px] sm:h-[300px] w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/20 to-transparent z-10" />
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-90"
                  />

                  {/* Rating / Meta tags overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold leading-none mb-1">
                        Recipe Card • {selectedRecipe.difficulty}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-black text-cream leading-tight">
                        {selectedRecipe.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleSave(selectedRecipe.id, e)}
                        className="p-2.5 rounded-none bg-burgundy/80 border border-cream/10 text-cream hover:text-gold backdrop-blur-md transition-all cursor-pointer"
                        title="Save Recipe"
                      >
                        <Heart
                          size={16}
                          className={savedRecipeIds[selectedRecipe.id] ? 'fill-gold text-gold' : ''}
                        />
                      </button>
                      <button
                        onClick={(e) => handleShare(selectedRecipe.id, e)}
                        className="p-2.5 rounded-none bg-burgundy/80 border border-cream/10 text-cream hover:text-gold backdrop-blur-md transition-all flex items-center gap-1.5 font-mono text-xs cursor-pointer"
                        title="Share Recipe"
                      >
                        <Share2 size={15} />
                        <span>{shares[selectedRecipe.id] || selectedRecipe.shareCount}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-cream/90 text-sm sm:text-base leading-relaxed font-sans">
                    {selectedRecipe.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 border-t border-cream/10 pt-8">
                    {/* Ingredients list with checkable items */}
                    <div className="md:col-span-5 text-left">
                      <h4 className="text-cream font-serif font-bold text-lg mb-4 flex items-center gap-1.5">
                        <Timer size={18} className="text-gold" />
                        <span>Ingredients checklist</span>
                      </h4>
                      <p className="text-cream/40 text-[11px] font-mono uppercase tracking-widest mb-3">
                        Tap items to mark items you have
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {selectedRecipe.ingredients.map((ing) => {
                          const isChecked = checkedIngredients[ing];
                          return (
                            <button
                              key={ing}
                              onClick={() => toggleIngredientCheck(ing)}
                              className={`flex items-start gap-2.5 text-left w-full cursor-pointer transition-colors ${
                                isChecked ? 'text-cream/40 line-through' : 'text-cream/95 hover:text-cream'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-none border mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                                  isChecked
                                    ? 'bg-gold border-gold text-burgundy'
                                    : 'border-cream/20 bg-burgundy hover:border-gold/50'
                                  }`}
                              >
                                {isChecked && <Check size={10} strokeWidth={3} className="text-burgundy" />}
                              </div>
                              <span className="text-xs sm:text-sm">{ing}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step by step Instructions */}
                    <div className="md:col-span-7 text-left">
                      <h4 className="text-cream font-serif font-bold text-lg mb-4 flex items-center gap-1.5">
                        <Flame size={18} className="text-gold" />
                        <span>Preparation instructions</span>
                      </h4>
                      <div className="flex flex-col gap-4">
                        {selectedRecipe.instructions.map((step, index) => (
                          <div key={index} className="flex gap-4 items-start">
                            <span className="w-6 h-6 rounded-none bg-burgundy border border-cream/10 text-gold flex items-center justify-center font-mono text-xs font-black shrink-0">
                              {index + 1}
                            </span>
                            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed pt-0.5 font-sans">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Preparation tips banner */}
                      {selectedRecipe.prepTips && (
                        <div className="mt-8 bg-burgundy border border-cream/15 rounded-none p-4">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                            Pro Chef Secret
                          </span>
                          <p className="text-cream/80 text-xs mt-1 leading-relaxed">
                            {selectedRecipe.prepTips}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full bg-dark-cherry/20 border border-dashed border-cream/10 rounded-none p-8 flex items-center justify-center">
                <p className="text-cream/60 text-sm">Select a recipe on the left to display ingredients and step guide.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
