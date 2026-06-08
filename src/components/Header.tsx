/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bookmark, Calendar, Menu, X, Landmark } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

interface HeaderProps {
  curatedCount: number;
  onOpenCuration: () => void;
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({
  curatedCount,
  onOpenCuration,
  onOpenBooking,
  activeSection,
  onNavigate
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Explore', target: 'explore' },
    { label: 'Collections', target: 'collections' },
    { label: 'About Us', target: 'about' },
    { label: 'Our Vision', target: 'vision' }
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl font-sans" id="header-root">
      {/* Absolute Glow Background Accent */}
      <div className="absolute -top-10 left-1/4 w-[50%] h-[30px] bg-sky-400/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Main Bar */}
      <div className="flex items-center justify-between px-6 py-3.5 rounded-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/[0.12]">
        {/* LOGO */}
        <div 
          onClick={() => handleLinkClick('hero')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-amber-300 flex items-center justify-center p-[1px] transition-transform duration-500 group-hover:rotate-185">
            <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center">
              <Landmark className="w-4 h-4 text-sky-300 group-hover:text-amber-200 transition-colors" />
            </div>
          </div>
          <span className="text-xl font-light tracking-[0.2em] text-white select-none">
            HORIZON ESTATES
          </span>
        </div>

        {/* CENTER LINKS - Sleek spaced-out styling */}
        <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className={`px-5 py-2 text-xs font-light tracking-[0.25em] uppercase transition-all duration-300 rounded-full relative ${
                  isActive 
                    ? 'text-white font-normal bg-white/[0.04] border border-white/[0.08]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS - Badge & Inverted capsule CTA button */}
        <div className="flex items-center gap-3" id="nav-actions">
          {/* Curation board toggle */}
          <button
            onClick={onOpenCuration}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all duration-300 text-xs tracking-wider"
            title="My Saved Collections"
            id="saved-boards-btn"
          >
            <Bookmark className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden sm:inline font-light tracking-widest uppercase">Saved</span>
            {curatedCount > 0 ? (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-sky-400 to-sky-300 text-[#0B0F19] text-[10px] font-bold shadow-[0_0_12px_rgba(125,211,252,0.4)] animate-pulse">
                {curatedCount}
              </span>
            ) : (
              <span className="text-slate-500 text-[10px]">0</span>
            )}
          </button>

          {/* Book Private Tour - Inverted Capsule */}
          <button
            onClick={onOpenBooking}
            className="relative hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B0F19] hover:bg-slate-200 text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] active:scale-95"
            id="book-tour-btn"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Tour</span>
          </button>

          {/* Hamburger Menu on Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.04] md:hidden"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div 
            className="mt-2.5 select-none md:hidden w-full rounded-2xl bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
            id="mobile-menu-drawer"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.target;
                return (
                  <button
                    key={link.target}
                    onClick={() => handleLinkClick(link.target)}
                    className={`w-full text-left px-5 py-3 rounded-xl text-xs font-light tracking-[0.2em] uppercase transition-all duration-200 ${
                      isActive 
                        ? 'text-white bg-white/[0.05] border-l-2 border-sky-300' 
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              <div className="h-[1px] bg-white/[0.08] my-3" />

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-[#0B0F19] text-xs font-bold tracking-[0.15em] uppercase hover:bg-slate-200 transition-colors"
                id="mobile-book-tour-btn"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Tour</span>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
