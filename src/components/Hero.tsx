/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Compass, Filter } from 'lucide-react';

interface HeroProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    priceRange: string;
  }) => void;
  selectedCategory: string;
}

export default function Hero({ onFilterChange, selectedCategory }: HeroProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(selectedCategory || 'all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { value: 'all', label: 'All Portfolios' },
    { value: 'Signature', label: 'Signature Series' },
    { value: 'Futuristic', label: 'Futuristic Tech' },
    { value: 'Classic', label: 'Classic Luxury' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Investment' },
    { value: 'under-15', label: 'Under $15M' },
    { value: '15-25', label: '$15M – $25M' },
    { value: 'over-25', label: 'Over $25M' }
  ];

  const triggerUpdate = (s: string, cat: string, price: string) => {
    onFilterChange({
      search: s,
      category: cat,
      priceRange: price
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    triggerUpdate(val, category, priceRange);
  };

  const handleCategorySelection = (cat: string) => {
    setCategory(cat);
    triggerUpdate(search, cat, priceRange);
  };

  const handlePriceSelection = (price: string) => {
    setPriceRange(price);
    triggerUpdate(search, category, price);
  };

  return (
    <section 
      className="relative pt-32 pb-20 md:py-36 flex flex-col items-center justify-center min-h-[90vh] overflow-hidden px-4" 
      id="hero"
    >
      {/* Immersive Stationary Background Real Estate Scenery */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Architectural House / Luxury Villa Background with high-density fixed alignment */}
        <div 
          style={{ 
            backgroundImage: `url('/src/assets/images/hero_villa_1780838898037.png')`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-100"
          id="hero-fixed-background"
        />
        
        {/* Perfect Uniform and light translucent shade to ensure premium readability without darkening sides */}
        <div className="absolute inset-0 bg-black/25" />
      </div>
      
      {/* Hero Visual content container */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 select-none">
        {/* Subtle upper tagline pills */}
        <div 
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-black/40 border border-white/10 text-sky-200 font-mono text-[10px] tracking-[0.3em] uppercase mb-8 shadow-lg backdrop-blur-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          id="hero-tagline-pill"
        >
          <Compass className="w-3 h-3 animate-spin-slow text-amber-200" />
          <span>Horizon Estates Autonomous Tech-States</span>
        </div>

        {/* Large Thin Heading */}
        <h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.1] mb-6 max-w-4xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
          id="hero-title"
        >
          Experience living <br />
          <span className="font-semibold text-gradient bg-gradient-to-r from-sky-300 via-white to-amber-200 bg-clip-text text-transparent">
            beyond expectations.
          </span>
        </h1>

        {/* Elegant paragraph wrapper */}
        <p 
          className="text-slate-100 font-normal text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-12 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          id="hero-subtitle"
        >
          Embrace a life where ultra-luxury meets smart infrastructure, creating extraordinary structural masterpieces that transcend traditional luxury boundaries.
        </p>

        {/* Search & Filter Terminal Floating Widget (Glassmorphism Container) */}
        <div 
          className="w-full max-w-4xl p-5 md:p-6 rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
          id="hero-filter-panel"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl group transition-all duration-300 focus-within:border-sky-400/[0.4] focus-within:bg-[#121826]/40">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-sky-300 mr-2.5 transition-colors" />
              <input 
                type="text" 
                placeholder="Search estates or regions..." 
                value={search}
                onChange={handleSearchChange}
                className="w-full bg-transparent border-none text-white text-xs font-light tracking-wide placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Category Select Tag Trigger */}
            <div className="flex items-center px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl group transition-all duration-300 focus-within:border-sky-400/[0.4]">
              <Filter className="w-4 h-4 text-slate-400 mr-2.5" />
              <select 
                value={category}
                onChange={(e) => handleCategorySelection(e.target.value)}
                className="w-full bg-transparent border-none text-white text-xs font-light tracking-wide focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-[#121826] text-white">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price investment Range */}
            <div className="flex items-center px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl group transition-all duration-300 focus-within:border-sky-400/[0.4]">
              <MapPin className="w-4 h-4 text-slate-400 mr-2.5" />
              <select 
                value={priceRange}
                onChange={(e) => handlePriceSelection(e.target.value)}
                className="w-full bg-transparent border-none text-white text-xs font-light tracking-wide focus:outline-none cursor-pointer"
              >
                {priceRanges.map((p) => (
                  <option key={p.value} value={p.value} className="bg-[#121826] text-white">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick specs helper */}
          <div className="w-full flex flex-wrap gap-2 items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-300" /> Use fields above to narrow down global portfolios
            </span>
            <div className="flex gap-2">
              {['Signature', 'Futuristic'].map((quickCat) => (
                <button
                  key={quickCat}
                  onClick={() => handleCategorySelection(quickCat)}
                  className={`px-3 py-1 text-[9px] font-mono uppercase tracking-widest rounded-full border transition-all duration-300 ${
                    category === quickCat
                      ? 'bg-sky-400/20 text-sky-200 border-sky-400/30'
                      : 'bg-[#121826]/30 text-slate-400 border-white/[0.05] hover:text-slate-300'
                  }`}
                >
                  #{quickCat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Floating Scroll Indicator Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 font-mono text-[9px] tracking-[0.3em] uppercase pointer-events-none z-10">
        <span className="animate-pulse">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-sky-400/80 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-4 bg-sky-300 rounded animate-scroll-drip" />
        </div>
      </div>
    </section>
  );
}
