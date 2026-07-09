import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Phone, Star, ShieldCheck, CheckCircle } from 'lucide-react';
import { STORES } from '../data';
import { Store } from '../types';
import { sfx } from '../utils/sound';

export default function StoreLocator() {
  const [zipCode, setZipCode] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [stores, setStores] = useState<Store[]>(STORES);
  const [selectedStore, setSelectedStore] = useState<Store | null>(STORES[0]);
  const [gpsSimulated, setGpsSimulated] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  // Filter retailers based on checkboxes or selection
  const filterStores = (zipVal: string, filterVal: string) => {
    let result = [...STORES];

    // Simulating search filter
    if (zipVal.trim().length > 0) {
      // filters stores that are in the zip code (all our stores are Waco, TX so zip is 76701 or 76706)
      if (zipVal.startsWith('767')) {
        result = STORES;
      } else {
        // Mocking alternate distance matches
        result = STORES.slice(1, 3).map((st, i) => ({
          ...st,
          distance: `${(i + 1) * 3 + 2} miles away`
        }));
      }
    }

    // Category stock checkboxes
    if (filterVal !== 'all') {
      result = result.filter((st) => {
        if (filterVal === 'museum') return st.features.includes('Museum Gift Shop');
        if (filterVal === 'zerosugar') return st.features.includes('Zero Sugar Selection') || st.stock.includes('zerosugar');
        if (filterVal === 'cold') return st.features.includes('Cold Singles') || st.features.includes('Ice Cream Fountain');
        return true;
      });
    }

    setStores(result);
    if (result.length > 0) {
      setSelectedStore(result[0]);
    } else {
      setSelectedStore(null);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playSwoosh();
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      filterStores(zipCode, activeFilter);
    }, 600);
  };

  const handleGpsTrigger = () => {
    sfx.playCanCrack();
    setSearching(true);
    setGpsSimulated(true);
    setZipCode('76701'); // Waco core
    setTimeout(() => {
      setSearching(false);
      setGpsSimulated(false);
      setStores(STORES);
      setSelectedStore(STORES[0]);
    }, 800);
  };

  const handleStoreClick = (st: Store) => {
    sfx.playTick();
    setSelectedStore(st);
  };

  const handleDirections = (st: Store) => {
    sfx.playSwoosh();
    alert(`Directions routed to ${st.name} located at ${st.address}. Simulated ETA is 6 minutes.`);
  };

  return (
    <section
      id="stores"
      className="relative py-24 sm:py-32 bg-burgundy text-cream border-b border-cream/10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-cream/5 border border-cream/10 px-4 py-1.5 rounded-none text-gold font-mono text-xs uppercase tracking-widest mb-4">
            <MapPin size={12} />
            <span>Store Locator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight text-cream leading-tight">
            Find Near{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-serif italic font-normal normal-case block">
              Me.
            </span>
          </h2>
          <p className="text-cream/80 text-sm sm:text-base mt-2 max-w-xl mx-auto font-sans">
            Locate ice-cold Dr Pepper singles, limited editions, or case-packs immediately at surrounding supermarkets and local Waco historical fountains.
          </p>
        </div>

        {/* Input search controllers and filter bar */}
        <div className="bg-dark-cherry border border-cream/10 rounded-none backdrop-blur-md mb-8 p-6">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* ZIP Search Input */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                placeholder="Enter ZIP code, City, or Waco TX..."
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full bg-burgundy border border-cream/10 focus:border-gold rounded-none py-3.5 px-12 text-sm text-cream outline-none font-sans"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
            </div>

            {/* GPS Trigger button */}
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={handleGpsTrigger}
                className="w-full bg-burgundy hover:bg-burgundy/80 border border-cream/10 text-cream py-3.5 rounded-none text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation size={15} className={gpsSimulated ? 'animate-bounce text-gold' : ''} />
                <span>Simulate GPS Location</span>
              </button>
            </div>

            {/* Submit search button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={searching}
                className="w-full bg-cream hover:bg-cream/90 text-burgundy py-3.5 rounded-none text-sm font-black tracking-widest uppercase shadow-md hover:shadow-xl transition-all hover:scale-102 cursor-pointer"
              >
                {searching ? 'Querying...' : 'Find Retailers'}
              </button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-cream/10">
            <span className="text-cream/40 font-mono text-[10px] uppercase tracking-widest self-center mr-2">
              Retailer Stock Filters:
            </span>
            {[
              { label: 'All Stores', value: 'all' },
              { label: 'Exclusive Museum Stock', value: 'museum' },
              { label: 'Zero Sugar Stock', value: 'zerosugar' },
              { label: 'Chilled Fountain/Singles', value: 'cold' },
            ].map((filt) => (
              <button
                key={filt.value}
                onClick={() => {
                  sfx.playTick();
                  setActiveFilter(filt.value);
                  filterStores(zipCode, filt.value);
                }}
                className={`px-3.5 py-1.5 rounded-none text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors shrink-0 cursor-pointer border ${
                  activeFilter === filt.value
                    ? 'bg-gold border-gold text-burgundy'
                    : 'bg-burgundy border-cream/10 text-cream/60 hover:text-cream'
                }`}
              >
                {filt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Dual-Column Split Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Stores List */}
          <div className="lg:col-span-5 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
            {stores.length > 0 ? (
              stores.map((st) => {
                const isSelected = selectedStore?.id === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => handleStoreClick(st)}
                    className={`p-4 rounded-none border transition-all duration-300 text-left cursor-pointer ${
                      isSelected
                        ? 'bg-dark-cherry border-gold shadow-lg'
                        : 'bg-dark-cherry/30 border-cream/10 hover:border-cream/20 hover:bg-dark-cherry/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-serif font-bold text-cream tracking-tight leading-tight">
                          {st.name}
                        </h3>
                        <p className="text-cream/60 text-xs mt-1">{st.address}</p>
                      </div>
                      <span className="shrink-0 bg-cream/5 border border-cream/10 text-gold font-mono text-[10px] px-2 py-0.5 rounded-none font-bold">
                        {st.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center text-gold text-xs gap-0.5">
                        <Star size={12} className="fill-gold" />
                        <span>{st.rating}</span>
                      </div>
                      <span className="text-cream/40 text-xs font-mono">•</span>
                      <a
                        href={`tel:${st.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-cream/60 hover:text-gold text-xs transition-colors"
                      >
                        <Phone size={11} />
                        <span>{st.phone}</span>
                      </a>
                    </div>

                    {/* Stock Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {st.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[9px] font-mono text-cream/70 bg-burgundy border border-cream/10 px-2 py-0.5 rounded-none"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 border border-dashed border-cream/10 rounded-none text-center bg-dark-cherry/20">
                <p className="text-cream/60 text-sm">No match. Expand your search ZIP code.</p>
              </div>
            )}
          </div>

          {/* Right Map Canvas simulation Column */}
          <div className="lg:col-span-7 h-[500px] bg-dark-cherry border border-cream/10 rounded-none p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            {/* Visual Header of simulated map engine */}
            <div className="absolute top-4 left-4 z-10 bg-burgundy border border-cream/10 px-4 py-2 rounded-none backdrop-blur-md flex items-center gap-2">
              <ShieldCheck size={14} className="text-gold" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                Pepper Map Satellite v4.0
              </span>
            </div>

            {/* Simulated map graphic vector */}
            <div className="flex-1 w-full relative flex items-center justify-center my-4 overflow-hidden rounded-none bg-burgundy border border-cream/10">
              {/* Abstract Street Grid Map represented as lines */}
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal streets */}
                <line x1="0" y1="80" x2="100%" y2="80" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" />
                <line x1="0" y1="180" x2="100%" y2="180" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" />
                <line x1="0" y1="320" x2="100%" y2="320" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="0" y1="420" x2="100%" y2="420" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" />
                
                {/* Vertical avenues */}
                <line x1="120" y1="0" x2="120" y2="100%" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" />
                <line x1="280" y1="0" x2="280" y2="100%" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" />
                <line x1="450" y1="0" x2="450" y2="100%" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="580" y1="0" x2="580" y2="100%" stroke="rgba(250,247,242,0.15)" strokeWidth="1.5" />

                {/* Diagonal Highway route */}
                <path d="M 0 450 Q 250 250 650 50" fill="none" stroke="#C5A059" strokeWidth="3" opacity="0.4" />
              </svg>

              {/* Waco Brazos River simulation */}
              <div className="absolute top-0 right-1/4 w-28 h-full bg-gold/15 skew-x-12 blur-sm pointer-events-none" />

              {/* Dynamic Coordinate markers representing stores */}
              {stores.map((st, idx) => {
                const isSelected = selectedStore?.id === st.id;
                // Distribute positions based on store coordinates roughly mapped inside container
                const leftPos = [40, 25, 60, 50, 75][idx % 5];
                const topPos = [35, 60, 25, 70, 50][idx % 5];

                return (
                  <button
                    key={st.id}
                    onClick={() => handleStoreClick(st)}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125 z-10 group"
                    style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                  >
                    <div className="relative">
                      {/* Active pulsing rings */}
                      {isSelected && (
                        <>
                          <div className="absolute -inset-2 rounded-full bg-gold/30 animate-ping" />
                          <div className="absolute -inset-4 rounded-full bg-gold/10 animate-pulse" />
                        </>
                      )}
                      
                      {/* Marker body */}
                      <div
                        className={`w-8 h-8 rounded-none border flex items-center justify-center font-mono text-xs font-black shadow-lg transition-colors ${
                          isSelected
                            ? 'bg-gold border-cream text-burgundy font-serif'
                            : 'bg-dark-cherry border-gold/40 text-cream hover:bg-burgundy'
                        }`}
                      >
                        {idx + 1}
                      </div>

                      {/* Tooltip bubble on active hover */}
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-burgundy border border-cream/10 px-2 py-1 rounded-none text-[9px] font-mono uppercase tracking-widest text-cream whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {st.name.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Waco Texas Center Watermark Label */}
              <div className="absolute bottom-4 right-4 pointer-events-none text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cream/20 block">Waco Downtown</span>
                <span className="text-[8px] font-mono text-cream/20 uppercase block">Coordinates: 31.5513° N, 97.1294° W</span>
              </div>
            </div>

            {/* Active Store Directions Footer panel */}
            {selectedStore && (
              <div className="bg-burgundy rounded-none p-4 border border-cream/10 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-none bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold block font-bold">
                      Matched Stock Verified
                    </span>
                    <h4 className="text-sm font-serif font-bold text-cream">{selectedStore.name}</h4>
                  </div>
                </div>

                <button
                  onClick={() => handleDirections(selectedStore)}
                  className="bg-cream/5 hover:bg-cream/10 text-cream border border-cream/15 hover:border-gold px-5 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Navigation size={13} className="text-gold" />
                  <span>Route Directions</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
