/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { IMAGES } from '../data';

interface EditorialSectionProps {
  onOpenBooking: () => void;
  onExploreClick: () => void;
}

export default function EditorialSection({ onOpenBooking, onExploreClick }: EditorialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollArea = viewportHeight + rect.height;
      if (totalScrollArea <= 0) return;

      const currentProgress = (viewportHeight - rect.top) / totalScrollArea;
      const clamped = Math.min(Math.max(currentProgress, 0), 1);
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute reactive coordinates for subtle depth
  const delta = scrollProgress - 0.5; // range: -0.5 to 0.5
  const glowTranslate1 = `${delta * 60}px, ${delta * 40}px`;
  const glowScale1 = 1 + delta * 0.2;
  const glowTranslate2 = `${delta * -80}px, ${delta * -50}px`;
  const glowScale2 = 1.15 - delta * 0.15;
  
  // High-end parallax lines
  const gridTranslateY = `${delta * -100}px`;
  const vectorRotation = `${delta * 120}deg`;

  return (
    <section 
      id="vision"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#0B0F19] to-[#080B15] py-24 md:py-36 overflow-hidden px-6" 
    >
      {/* Dynamic Grid Overlay (Reacts on Scroll) */}
      <div 
        style={{ transform: `translateY(${delta * -30}px)` }}
        className="absolute inset-0 bg-[radial-gradient(rgba(125,211,252,0.015)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none transition-transform duration-300 ease-out" 
      />

      {/* Floating Blueprint Circular Vector (Reacts on Scroll) */}
      <div 
        style={{ transform: `translateY(${gridTranslateY}) rotate(${vectorRotation})` }}
        className="absolute top-1/3 left-[-100px] w-[500px] h-[500px] border border-sky-400/[0.02] rounded-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
      >
        <div className="w-[380px] h-[380px] border border-dashed border-sky-400/[0.01] rounded-full flex items-center justify-center">
          <div className="w-[200px] h-[200px] border border-sky-400/[0.005] rounded-full" />
        </div>
      </div>

      {/* Dynamic Animated Ambient Light Blobs (Reacts on Scroll) */}
      <div 
        style={{ 
          transform: `translate(${glowTranslate1}) scale(${glowScale1})`,
          opacity: 0.04 + scrollProgress * 0.04
        }}
        className="absolute right-[-5%] top-1/6 w-[45rem] h-[45rem] bg-amber-500/20 blur-[130px] rounded-full pointer-events-none transition-all duration-300 ease-out" 
      />
      <div 
        style={{ 
          transform: `translate(${glowTranslate2}) scale(${glowScale2})`,
          opacity: 0.03 + (1 - scrollProgress) * 0.05
        }}
        className="absolute left-[-10%] bottom-[-10%] w-[50rem] h-[50rem] bg-sky-500/15 blur-[150px] rounded-full pointer-events-none transition-all duration-300 ease-out" 
      />

      {/* Ultra-subtle Horizontal Fine Drafting Lines */}
      <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-sky-400/[0.03] to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-300/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Asymmetrical Left Side - Broad Brand Concept Statement */}
          <div className="lg:col-span-4 lg:pt-4" id="editorial-left">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#7DD3FC] uppercase flex items-center gap-2 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Executive Philosophy
            </span>
            <p className="text-[#F8FAFC] font-light text-lg md:text-xl leading-relaxed tracking-wide mb-6">
              We do not develop subdivisions. We engineer bespoke biological platforms of light, concrete, and energy.
            </p>
            <div className="h-[1px] bg-gradient-to-r from-white/10 to-transparent w-36 mb-6" />
            <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed tracking-wide max-w-sm">
              Each state is completely unique, reflecting the architectural philosophy of dematerialization. Slender structural skeletons housing infinite technological grids.
            </p>
          </div>

          {/* Asymmetrical Right Side - Massive Premium Editorial Title */}
          <div className="lg:col-span-8 flex flex-col gap-8" id="editorial-right">
            {/* Heading containing the inline-block architectural preview */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-[#F8FAFC] leading-[1.25] tracking-tight">
              Shaping spaces
              <br />
              around your{' '}
              <span className="inline-block align-middle mx-2 sm:mx-3 my-1">
                {/* Embedded preview pill */}
                <span className="relative flex items-center justify-center p-[1px] rounded-2xl bg-gradient-to-r from-sky-400/40 via-white/10 to-amber-300/40 shadow-[0_4px_24px_rgba(125,211,252,0.15)] group transition-all duration-300 hover:scale-105 select-none">
                  <img
                    src={IMAGES.inlinePreview}
                    alt="Inline visual thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-16 h-8 sm:w-24 sm:h-11 md:w-28 md:h-12 object-cover rounded-[15px]"
                  />
                  {/* Subtle active glow light corner inside the glass pill */}
                  <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-sky-300 animate-pulse" />
                </span>
              </span>{' '}
              vision.
            </h2>

            <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl tracking-wide">
              We craft unique, high-performance environments that seamlessly blend your personal vision with timeless architectural designs. By collaborating with elite engineers and materials scientists, Horizon Estates delivers residences that operate as fully autonomous smart biological modules, adjusting light, climate, and safety matrices in real-time.
            </p>

            {/* Inverted pill button & frosted button CTAs */}
            <div className="flex flex-wrap gap-4 items-center mt-6" id="editorial-ctas">
              {/* Keep in Touch - Inverted capsule */}
              <button
                onClick={onOpenBooking}
                className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white hover:bg-[#DCE9FE] text-[#0B0F19] text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_8px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_35px_rgba(125,211,252,0.2)]"
                id="cta-keep-touch"
              >
                <span>Keep in Touch</span>
                <span className="w-6 h-6 rounded-full bg-[#0B0F19] group-hover:bg-[#121826] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              {/* Learn More - Subtle Frosted Glass Pill */}
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-full bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 text-white text-xs font-light tracking-[0.18em] uppercase transition-all duration-300"
                id="cta-learn-more"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
