/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, CalendarRange, PenTool, CheckCircle, Landmark, Sparkles } from 'lucide-react';
import { Property, CuratedItem } from '../types';

interface CurationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  curatedIds: string[];
  onRemoveCurated: (id: string) => void;
  onBookTourForProperty: (property: Property) => void;
}

export default function CurationPanel({
  isOpen,
  onClose,
  properties,
  curatedIds,
  onRemoveCurated,
  onBookTourForProperty
}: CurationPanelProps) {
  // Grab properties saved
  const savedProperties = properties.filter(p => curatedIds.includes(p.id));
  
  // Manage notes corresponding to propertyId in localState
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const savedNotes = localStorage.getItem('horizon_curation_notes');
      return savedNotes ? JSON.parse(savedNotes) : {};
    } catch {
      return {};
    }
  });

  const [activeNotesEditId, setActiveNotesEditId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  const saveNote = (propId: string, text: string) => {
    const updatedNotes = { ...notes, [propId]: text };
    setNotes(updatedNotes);
    localStorage.setItem('horizon_curation_notes', JSON.stringify(updatedNotes));
    setActiveNotesEditId(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end font-sans"
      id="curation-drawer-root"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-md transition-opacity" 
      />

      {/* Drawer Body Column */}
      <div 
        className="relative w-full max-w-lg h-full bg-[#0B0F19]/95 border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
        id="curation-drawer-body"
      >
        {/* Decorative Grid backdrop */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[size:2rem_2rem] border-white" style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`
        }} />

        {/* TOP BAR */}
        <div className="relative z-10">
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-sky-300" />
              <h3 className="text-lg font-light tracking-widest text-[#F8FAFC]">MY CURATED BOARD</h3>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-full border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
              id="close-curation-drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-light text-slate-400 leading-relaxed mb-6">
            Below is your personal selection of luxury estates currently saved to your browser’s secure offline storage. Enter notes or book private showcases.
          </p>
        </div>

        {/* LIST CONTAINER */}
        <div className="flex-1 overflow-y-auto pr-1 select-none flex flex-col gap-5 relative z-10" id="scrollable-curation-list">
          {savedProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
              <Sparkles className="w-6 h-6 text-slate-600 mb-3 animate-pulse" />
              <p className="text-slate-400 text-xs font-light tracking-wide">Your collection list is blank.</p>
              <p className="text-slate-500 text-[10px] font-mono tracking-wider mt-1 uppercase">Click curation badges on elements below to populate</p>
              <button 
                onClick={onClose}
                className="mt-6 px-4 py-2 border border-white/10 hover:border-white/30 text-[9px] font-mono uppercase tracking-widest text-slate-300 hover:text-white transition-all rounded-full"
              >
                Browse Creation Catalog
              </button>
            </div>
          ) : (
            savedProperties.map((property) => (
              <div 
                key={property.id}
                className="p-4 border border-white/[0.06] bg-[#121826]/40 hover:border-white/10 transition-all rounded-2xl flex flex-col gap-4"
                id={`curated-item-${property.id}`}
              >
                {/* Upper Thumbnail Row */}
                <div className="flex items-center gap-4">
                  <img
                    src={property.image}
                    alt={property.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-12 object-cover rounded-lg border border-white/[0.08]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[8px] font-mono uppercase tracking-widest text-[#7DD3FC] mb-0.5">{property.location}</span>
                    <h4 className="text-slate-200 text-sm font-light tracking-wide truncate">{property.name}</h4>
                    <span className="text-amber-200 font-mono text-[11px] font-light">{property.price}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => onRemoveCurated(property.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                      title="Discard curation"
                      id={`remove-curate-btn-${property.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Micro Editor Notes Field (Interactive Curation feature) */}
                <div className="bg-[#0B0F19]/80 rounded-xl p-3 border border-white/[0.04]">
                  {activeNotesEditId === property.id ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={tempNoteText}
                        onChange={(e) => setTempNoteText(e.target.value)}
                        placeholder="Add special notes, glass demands, or customized queries..."
                        className="w-full text-xs font-light bg-transparent text-white border-0 focus:ring-0 placeholder-slate-600 focus:outline-none resize-none h-16 leading-relaxed"
                        rows={2}
                        maxLength={200}
                      />
                      <div className="flex justify-end gap-1.5 pt-2 border-t border-white/[0.05]">
                        <button
                          onClick={() => setActiveNotesEditId(null)}
                          className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveNote(property.id, tempNoteText)}
                          className="px-2.5 py-1 text-[9px] bg-sky-400 text-[#0B0F19] rounded font-semibold font-mono uppercase tracking-wider hover:bg-sky-300 transition-colors"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0 pr-2">
                        {notes[property.id] ? (
                          <p className="text-slate-400 text-[11px] font-light leading-relaxed italic truncate">
                            &ldquo;{notes[property.id]}&rdquo;
                          </p>
                        ) : (
                          <span className="text-slate-600 font-light text-[10px] tracking-wider uppercase flex items-center gap-1.5 select-none">
                            <PenTool className="w-2.5 h-2.5" /> Tap write node to supply spec notes
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setActiveNotesEditId(property.id);
                          setTempNoteText(notes[property.id] || '');
                        }}
                        className="p-1 px-1.5 border border-white/5 hover:border-white/20 hover:text-white hover:bg-white/[0.02] text-slate-500 rounded text-[9px] font-mono uppercase tracking-widest transition-all shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct Booking Link Specific to item */}
                <button
                  onClick={() => onBookTourForProperty(property)}
                  className="w-full flex items-center justify-center gap-2 py-2 mt-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 text-[9px] font-mono uppercase tracking-widest transition-all"
                  id={`book-curate-link-${property.id}`}
                >
                  <CalendarRange className="w-3.5 h-3.5 text-sky-400" />
                  <span>Schedule Private Showcase</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* BOTTOM TOTAL SUMMARY */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.08]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">Curation Total</span>
            <span className="text-lg font-mono text-white tracking-widest font-light">{savedProperties.length} Estates</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-white text-[#0B0F19] hover:bg-slate-200 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(255,255,255,0.06)] flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Apply Selected Board</span>
          </button>
        </div>
      </div>
    </div>
  );
}
