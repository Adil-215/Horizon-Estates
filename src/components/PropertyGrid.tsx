/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Grid, Eye, Cpu, Compass, Settings, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';

interface PropertyGridProps {
  properties: Property[];
  curatedIds: string[];
  onToggleCurated: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export default function PropertyGrid({
  properties,
  curatedIds,
  onToggleCurated,
  onSelectProperty
}: PropertyGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Creations' },
    { value: 'Signature', label: 'Signature Series' },
    { value: 'Futuristic', label: 'Futuristic Tech' },
    { value: 'Classic', label: 'Classic Designs' }
  ];

  const filteredProperties = selectedCategory === 'all'
    ? properties
    : properties.filter(p => p.category === selectedCategory);

  return (
    <section 
      className="relative bg-gradient-to-b from-[#04060B] to-[#06080F] py-24 md:py-32 px-6 overflow-hidden border-t border-white/[0.02]" 
      id="collections"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-sky-300/25 to-transparent" />
      <div className="absolute left-[15%] top-1/3 w-[30rem] h-[30rem] bg-sky-500/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with generous space */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="grid-header">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-amber-200 uppercase flex items-center gap-1.5 mb-4">
              <Cpu className="w-3.5 h-3.5" /> CURATED DIGITAL CATALOG
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">
              Explore Our Collections
            </h2>
            <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed tracking-wide">
              Meticulously selected locations paired with futuristic architectural structures. Filter by conceptual framework below to review core specifications.
            </p>
          </div>

          {/* Inline Pills Filter Selector */}
          <div className="flex flex-wrap gap-2" id="filter-pills-container">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 border ${
                  selectedCategory === cat.value
                    ? 'bg-[#F8FAFC] text-[#0B0F19] border-white font-medium shadow-[0_4px_16px_rgba(255,255,255,0.06)]'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        {filteredProperties.length === 0 ? (
          <div className="py-24 text-center border border-white/[0.05] rounded-3xl bg-white/[0.01]">
            <Compass className="w-8 h-8 text-slate-500 mx-auto mb-4 animate-spin-slow" />
            <p className="text-slate-400 text-sm font-light">No corresponding creations found. Try adjusting filters.</p>
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            id="properties-grid-list"
          >
            {filteredProperties.map((property) => {
              const isCurated = curatedIds.includes(property.id);
              const isHovered = hoveredCardId === property.id;

              return (
                <div
                  key={property.id}
                  className="group relative flex flex-col rounded-3xl bg-white/[0.01] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  onMouseEnter={() => setHoveredCardId(property.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  id={`card-${property.id}`}
                >
                  {/* Property Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Soft ambient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-transparent to-[#06080F]/15 z-10 transition-opacity duration-500 group-hover:opacity-75" />
                    
                    {/* Real Image */}
                    <img
                      src={property.image}
                      alt={property.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Quick Badges overlaid */}
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-20">
                      {/* Category Label Pill */}
                      <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.08] text-[9px] font-mono tracking-[0.2em] text-[#7DD3FC] uppercase">
                        {property.category}
                      </span>

                      {/* Curate Pin Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCurated(property.id);
                        }}
                        className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                          isCurated
                            ? 'bg-sky-400 text-[#0B0F19] border-sky-300'
                            : 'bg-black/40 border-white/[0.08] text-slate-300 hover:text-white hover:bg-black/60'
                        }`}
                        title={isCurated ? 'Remove Curation' : 'Add to Curated Board'}
                        id={`btn-curate-${property.id}`}
                      >
                        {isCurated ? (
                          <BookmarkCheck className="w-4 h-4 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Price and core credentials over image bottom */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 mb-1">{property.location}</p>
                        <h4 className="text-xl font-light text-[#F8FAFC] tracking-tight">{property.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-mono text-amber-200">
                          {property.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Property Specifications Drawer on Hover */}
                  <div className="p-6 flex-1 flex flex-col gap-4 bg-[#090C14]/95 backdrop-blur-md relative z-20">
                    <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed tracking-wide line-clamp-2">
                      {property.description}
                    </p>

                    {/* Interactive high-tech specifications bento row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3.5 border-t border-b border-white/[0.05]">
                      <div className="min-w-0">
                        <span className="block text-[8px] font-mono tracking-widest uppercase text-slate-500 mb-1 truncate" title="Volume">Volume</span>
                        <span className="block text-xs font-mono text-white tracking-widest truncate">{property.areaSqFt.toLocaleString()} SQFT</span>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[8px] font-mono tracking-widest uppercase text-slate-500 mb-1 truncate" title="Dwellers Space">Dwellers Space</span>
                        <span className="block text-xs font-mono text-white tracking-widest truncate">{property.bedrooms}BD / {property.bathrooms}BA</span>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[8px] font-mono tracking-widest uppercase text-slate-500 mb-1 truncate" title="Insulated Shield">Insulated Shield</span>
                        <span className="block text-xs font-mono text-sky-300 uppercase truncate" title={property.glassType}>
                          {property.glassType}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[8px] font-mono tracking-widest uppercase text-slate-500 mb-1 truncate" title="Energy Ratio">Energy Ratio</span>
                        <span className="block text-xs font-mono text-amber-200 tracking-wider font-semibold truncate" title={property.energyRating}>
                          {property.energyRating}
                        </span>
                      </div>
                    </div>

                    {/* Tag listings */}
                    <div className="flex flex-wrap gap-1.5">
                      {property.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-white/[0.02] border border-white/[0.04] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Main CTA: View Full Specs & Blueprint */}
                    <div className="flex justify-between items-center mt-2 group-hover:translate-x-1 transition-transform duration-300">
                      <button
                        onClick={() => onSelectProperty(property)}
                        className="flex items-center gap-2 text-white hover:text-sky-300 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
                        id={`btn-view-spec-${property.id}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inquire System Details</span>
                      </button>
                      
                      <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
