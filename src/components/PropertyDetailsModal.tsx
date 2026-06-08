/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, CalendarRange, Bookmark, BookmarkCheck, Shield, ChevronRight, Minimize2, Landmark, Compass } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  isCurated: boolean;
  onToggleCurated: (id: string) => void;
  onBookTour: (property: Property) => void;
}

export default function PropertyDetailsModal({
  property,
  onClose,
  isCurated,
  onToggleCurated,
  onBookTour
}: PropertyDetailsModalProps) {
  if (!property) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center font-sans px-4 select-none"
      id="details-modal-overlay"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-md transition-opacity" 
      />

      {/* Main Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0b0f19] border border-white/10 rounded-3xl overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,0.8)] z-10 flex flex-col md:flex-row"
        id="details-modal-body"
      >
        {/* Glow corners */}
        <div className="absolute top-0 left-0 w-[20rem] h-[20rem] bg-sky-500/[0.02] blur-[80px] rounded-full pointer-events-none" />

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all z-30 bg-[#0B0F19]/50 backdrop-blur-xl"
          id="close-details-modal-btn"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Left Side Column: Image Banner (Massive structure image) */}
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto min-h-[250px] md:min-h-full overflow-hidden bg-[#121826]">
          <img
            src={property.image}
            alt={property.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B0F19]/90 via-transparent to-black/30 md:from-[#0B0F19]/0 md:via-transparent md:to-[#0B0F19]/80 z-10 pointer-events-none" />

          {/* Quick specs over thumbnail */}
          <div className="absolute bottom-6 left-6 z-20">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-amber-300 rounded uppercase">
              {property.category} Creation
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight mt-3">{property.name}</h3>
            <p className="text-slate-300 font-mono text-xs">{property.location}</p>
          </div>
        </div>

        {/* Right Side Column: Meta Technical specs */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto bg-[#0b0f19]">
          <div className="relative z-10">
            {/* Tagline details */}
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#7DD3FC] uppercase flex items-center gap-1.5 mb-5">
              <Compass className="w-3.5 h-3.5" /> INTEGRATED ARCHITECTURAL SCHEMATICS
            </span>

            {/* Core details Paragraph */}
            <h4 className="text-[9px] font-mono tracking-widest uppercase text-slate-500 mb-2">Description Overview</h4>
            <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed tracking-wide mb-6">
              {property.description}
            </p>

            {/* Detailed specifications list */}
            <h4 className="text-[9px] font-mono tracking-widest uppercase text-slate-500 mb-3">Thermodynamics & Materials</h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#121826]/60 p-3 rounded-xl border border-white/[0.04]">
                <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-500">Volume area</span>
                <span className="text-xs font-mono text-white tracking-wider">{property.areaSqFt.toLocaleString()} SQFT</span>
              </div>
              <div className="bg-[#121826]/60 p-3 rounded-xl border border-white/[0.04]">
                <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-500">Living space</span>
                <span className="text-xs font-mono text-white tracking-wider">{property.bedrooms} BD / {property.bathrooms} BA</span>
              </div>
              <div className="bg-[#121826]/60 p-3 rounded-xl border border-white/[0.04]">
                <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-500">Glass Matrix</span>
                <span className="text-[11px] font-mono text-sky-300 truncate block" title={property.glassType}>{property.glassType}</span>
              </div>
              <div className="bg-[#121826]/60 p-3 rounded-xl border border-white/[0.04]">
                <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-500">Power Rating</span>
                <span className="text-xs font-mono text-amber-200 tracking-wider">{property.energyRating}</span>
              </div>
            </div>

            {/* Custom high end tags */}
            <h4 className="text-[9px] font-mono tracking-widest uppercase text-slate-500 mb-2">Architectural Tags</h4>
            <div className="flex flex-wrap gap-1.5 mb-8">
              {property.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 text-[9px] font-mono text-[#F8FAFC]/80 uppercase tracking-widest bg-white/[0.03] border border-white/[0.06] rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="relative z-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div>
              <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-500">Inquiry Price</span>
              <span className="text-xl font-mono text-amber-200 tracking-wider">
                {property.price}
              </span>
            </div>

            <div className="flex gap-2.5 w-full sm:w-auto">
              {/* Toggle Curate button inside modal */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCurated(property.id);
                }}
                className={`p-3 rounded-xl border transition-all ${
                  isCurated
                    ? 'bg-sky-400 text-[#0B0F19] border-sky-300'
                    : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
                title={isCurated ? 'Remove from Board' : 'Save to Board'}
                id={`modal-btn-curate-${property.id}`}
              >
                {isCurated ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
              </button>

              {/* Book Private Showcase */}
              <button
                onClick={() => onBookTour(property)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0B0F19] hover:bg-slate-200 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.1)] active:scale-95"
                id={`modal-book-btn-${property.id}`}
              >
                <CalendarRange className="w-3.5 h-3.5" />
                <span>Request Viewing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
