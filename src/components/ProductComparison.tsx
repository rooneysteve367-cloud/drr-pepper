import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, Scale, AlertCircle } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { sfx } from '../utils/sound';

interface ProductComparisonProps {
  onClose: () => void;
  onSelectProductBuy: (prod: Product) => void;
}

export default function ProductComparison({ onClose, onSelectProductBuy }: ProductComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['original', 'zerosugar', 'creamsoda']);

  const handleToggleProduct = (id: string) => {
    sfx.playTick();
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      } else {
        alert('Please keep at least 2 varieties selected to maintain comparison perspective.');
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // replace first item to keep length at 3
        setSelectedIds([selectedIds[1], selectedIds[2], id]);
      }
    }
  };

  const selectedProducts = PRODUCTS.filter((p) => selectedIds.includes(p.id));

  // comparative metrics mockups
  const getCaffeine = (id: string) => {
    if (id === 'zerosugar') return '41 mg / 12oz can';
    if (id === 'cherry') return '39 mg / 12oz can';
    if (id === 'creamsoda') return '41 mg / 12oz can';
    if (id === 'strawberries_cream') return '39 mg / 12oz can';
    return '41 mg / 12oz can';
  };

  const getSweetener = (id: string) => {
    if (id === 'zerosugar') return 'Aspartame & Acesulfame Potassium';
    if (id === 'diet') return 'Aspartame (Original sweetener)';
    return 'Natural Sugar & High Fructose Corn Syrup';
  };

  const getSodium = (id: string) => {
    if (id === 'zerosugar') return '60 mg (3% DV)';
    return '55 mg (2% DV)';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark-cherry/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-burgundy border border-cream/10 rounded-none w-full max-w-5xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
      >
        {/* Header Block */}
        <div className="p-6 border-b border-cream/10 flex items-center justify-between bg-dark-cherry">
          <div className="flex gap-2.5 items-center">
            <div className="p-2 rounded-none bg-gold/10 border border-gold/30 text-gold">
              <Scale size={20} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-serif font-bold tracking-tight text-cream leading-none">
                Comparative Formula Matrix
              </h3>
              <p className="text-cream/50 text-[11px] font-mono uppercase tracking-widest mt-1">
                Select up to 3 varieties to inspect side-by-side ingredients
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sfx.playSwoosh();
              onClose();
            }}
            className="p-2 rounded-none hover:bg-cream/5 border border-cream/10 text-cream/40 hover:text-cream transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Selector Buttons row */}
        <div className="p-4 bg-dark-cherry/40 border-b border-cream/10 flex flex-wrap gap-2 justify-start overflow-x-auto">
          {PRODUCTS.map((prod) => {
            const isSelected = selectedIds.includes(prod.id);
            return (
              <button
                key={prod.id}
                onClick={() => handleToggleProduct(prod.id)}
                className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-widest shrink-0 transition-colors border cursor-pointer ${
                  isSelected
                    ? 'bg-gold border-gold text-burgundy shadow'
                    : 'bg-dark-cherry border-cream/10 text-cream/60 hover:text-cream hover:border-cream/20'
                }`}
              >
                {prod.name.split(' ')[2] || prod.name.split(' ')[1] || 'Original'}
              </button>
            );
          })}
        </div>

        {/* Responsive comparison Grid table */}
        <div className="flex-1 overflow-x-auto p-6 scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-cream/10 text-cream/40 text-[10px] font-mono uppercase tracking-widest">
                <th className="py-4 font-normal">Formulation Specs</th>
                {selectedProducts.map((p) => (
                  <th key={p.id} className="py-4 font-serif font-black text-cream text-sm tracking-tight w-1/4">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-sans divide-y divide-cream/10 text-cream/80">
              {/* Image banner row */}
              <tr>
                <td className="py-4 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Product Can</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="h-28 object-contain filter contrast-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                    />
                  </td>
                ))}
              </tr>

              {/* Tagline */}
              <tr>
                <td className="py-4 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Tagline Focus</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-4 pr-4 italic font-serif font-medium text-cream text-xs leading-relaxed">
                    "{p.tagline}"
                  </td>
                ))}
              </tr>

              {/* Calories */}
              <tr>
                <td className="py-4 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Calories</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-4 font-mono font-bold text-cream text-base">
                    {p.calories} <span className="text-xs text-cream/40 font-normal">kcal</span>
                  </td>
                ))}
              </tr>

              {/* Sugar */}
              <tr>
                <td className="py-4 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Sugar content</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-4 font-mono font-bold text-cream">
                    {p.nutritionInfo.sugars}
                  </td>
                ))}
              </tr>

              {/* Caffeine */}
              <tr>
                <td className="py-4 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Caffeine quotient</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-4 font-mono text-cream/90">
                    {getCaffeine(p.id)}
                  </td>
                ))}
              </tr>

              {/* Sweetener */}
              <tr>
                <td className="py-4 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Sweetening Agent</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-4 text-xs font-mono text-cream/80">
                    {getSweetener(p.id)}
                  </td>
                ))}
              </tr>

              {/* Flavor notes */}
              <tr>
                <td className="py-4 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Principal Notes</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-4 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {p.flavorNotes.slice(0, 4).map((n) => (
                        <span
                          key={n}
                          className="px-1.5 py-0.5 rounded-none bg-burgundy text-[9px] font-mono text-gold border border-cream/10"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Action row */}
              <tr>
                <td className="py-6 font-mono text-[10px] uppercase text-cream/40 font-bold tracking-widest">Conversion Action</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="py-6">
                    <button
                      onClick={() => {
                        sfx.playCanCrack();
                        onSelectProductBuy(p);
                      }}
                      className={`px-5 py-2.5 rounded-none font-black text-[10px] tracking-widest uppercase shadow transition-all duration-300 hover:scale-105 hover:shadow-lg text-cream border border-cream/20 cursor-pointer ${p.buttonColor}`}
                    >
                      Order 12-Pack
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Warning panel footer */}
        <div className="p-4 bg-dark-cherry/80 border-t border-cream/10 flex gap-3 text-left">
          <AlertCircle size={16} className="text-gold shrink-0 mt-0.5" />
          <p className="text-[10px] sm:text-xs text-cream/60 leading-relaxed max-w-3xl font-sans">
            FDA warning check: Dr Pepper soft drink varieties are fully gluten-free, low-sodium certified, and contain zero fats. Aspartame-based variants contain phenylketonurics (phenylalanine). Standard storage conditions recommended: avoid direct solar heat.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
