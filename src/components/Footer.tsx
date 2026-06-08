/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight, Compass, Sparkles, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    // Simulate luxury newsletter registration delay
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
    }, 1200);
  };

  const handleLinkClick = (target: string) => {
    onNavigate(target);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="bg-gradient-to-b from-[#0F1424] to-[#080B15] text-[#F8FAFC] pt-24 pb-12 border-t border-[#7DD3FC]/10 relative select-none overflow-hidden"
      id="site-footer"
    >
      {/* Absolute glow decorative light */}
      <div className="absolute top-0 left-1/4 w-[45rem] h-[20rem] bg-sky-400/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[5%] w-[35rem] h-[12rem] bg-amber-300/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div 
        className="max-w-6xl mx-auto px-6 relative z-10" 
        id="footer-inner-wrapper"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-20 animate-fade-in">
          
          {/* COLUMN 1: Brand Identity */}
          <div className="lg:col-span-4 flex flex-col gap-6" id="footer-col-brand">
            <div 
              onClick={() => handleLinkClick('hero')} 
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 to-amber-300 flex items-center justify-center p-[1px] transition-transform duration-500 group-hover:rotate-[360deg]">
                <div className="w-full h-full rounded-lg bg-[#121826] flex items-center justify-center">
                  <span className="text-xs font-sans font-bold text-sky-300">H</span>
                </div>
              </div>
              <span className="text-lg font-light tracking-[0.25em] text-white group-hover:text-sky-300 transition-colors duration-300 uppercase">
                HORIZON ESTATES
              </span>
            </div>

            <p className="text-[#94A3B8] font-light text-xs sm:text-sm leading-relaxed max-w-sm tracking-wide">
              Engineering autonomous architectural milestones. Delivering biological harmony through steel, dynamic glass facades, and light telemetry.
            </p>

            {/* Social Icons row with glow state */}
            <div className="flex items-center gap-3 mt-2" id="footer-socials-row">
              {[
                { Icon: Instagram, link: '#instagram', title: 'Instagram' },
                { Icon: Linkedin, link: '#linkedin', title: 'LinkedIn' },
                { Icon: Twitter, link: '#twitter', title: 'Twitter' },
                { Icon: Youtube, link: '#youtube', title: 'YouTube' }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.01] flex items-center justify-center text-slate-400 transition-all duration-300 hover:text-[#7DD3FC] hover:border-[#7DD3FC]/40 hover:bg-[#7DD3FC]/5 hover:scale-110 hover:shadow-[0_0_20px_rgba(125,211,252,0.15)]"
                  title={item.title}
                >
                  <item.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Explore Navigation */}
          <div className="lg:col-span-2 md:col-span-1" id="footer-col-explore">
            <h4 className="text-[10px] font-mono font-medium tracking-[0.3em] uppercase text-slate-300 mb-6">Explore</h4>
            <ul className="flex flex-col gap-3.5 text-xs font-light text-slate-400">
              {[
                { label: 'Properties', target: 'collections' },
                { label: 'Collections', target: 'collections' },
                { label: 'About Us', target: 'about' }
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleLinkClick(link.target)}
                    className="hover:text-[#7DD3FC] transition-all duration-300 tracking-widest uppercase text-[10px] relative group overflow-hidden text-left"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#7DD3FC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#7DD3FC] transition-all duration-300 tracking-widest uppercase text-[10px] relative group overflow-hidden text-left"
                >
                  <span>Concierge</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#7DD3FC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Company */}
          <div className="lg:col-span-2 md:col-span-1" id="footer-col-company">
            <h4 className="text-[10px] font-mono font-medium tracking-[0.3em] uppercase text-slate-300 mb-6">Company</h4>
            <ul className="flex flex-col gap-3.5 text-xs font-light text-slate-400">
              {[
                { label: 'Our Story', target: 'vision' },
                { label: 'Philosophy', target: 'about' },
                { label: 'Journal', target: 'vision' }
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleLinkClick(link.target)}
                    className="hover:text-[#7DD3FC] transition-all duration-300 tracking-widest uppercase text-[10px] relative group overflow-hidden text-left"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#7DD3FC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#7DD3FC] transition-all duration-300 tracking-widest uppercase text-[10px] relative group overflow-hidden text-left"
                >
                  <span>Contact</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#7DD3FC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Newsletter Input field */}
          <div className="lg:col-span-4 flex flex-col gap-5" id="footer-col-newsletter">
            <h4 className="text-[10px] font-mono font-medium tracking-[0.3em] uppercase text-slate-300">Subscribe</h4>
            <p className="text-[#94A3B8] font-light text-xs leading-relaxed max-w-xs tracking-wide">
              Sign up for private releases of future architectural models and secure VIP priority previews.
            </p>

            {isSubscribed ? (
              <div 
                className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-2xl flex items-center gap-2"
                id="newsletter-success-notif"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span className="font-light tracking-wide">Email logged. Telemetry transmission established.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitNewsletter} className="flex gap-2 items-center w-full" id="newsletter-form">
                <div className="relative flex-1 group">
                  <input
                    type="email"
                    placeholder="Insert secure email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/40 rounded-xl px-4 py-3 text-xs font-light placeholder-slate-600 focus:outline-none focus:shadow-[0_0_15px_rgba(125,211,252,0.1)] transition-all duration-300"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-3.5 bg-white text-[#0B0F19] hover:bg-sky-200 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl shrink-0 cursor-pointer"
                  id="newsletter-submit-btn"
                  aria-label="Submit subscribe form"
                >
                  <ArrowRight className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* BOTTOM BAR: Subtle legal dividers & elegant scroll back up button */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <p className="text-left" id="footer-copyright">
              &copy; {new Date().getFullYear()} Horizon Estates Inc. All rights reserved.
            </p>
            
            <div className="flex items-center gap-8" id="footer-bottom-actions">
              <div className="flex gap-6" id="footer-legal-links">
                <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
              </div>

              {/* High-end minimalist scroll to top node */}
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer group py-1"
                id="footer-back-to-top"
              >
                <span>BACK TO TOP</span>
                <span className="inline-block transform group-hover:-translate-y-1 transition-transform duration-300">↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
