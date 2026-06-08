/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landmark, Compass, Eye, Shield, Users, Trophy, Award, MapPin } from 'lucide-react';
import aboutVillaImg from '../assets/images/about_villa_1780917791506.png';

interface Pillar {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  statLabel: string;
}

export default function AboutUs() {
  const pillars: Pillar[] = [
    {
      id: 'heritage',
      icon: Landmark,
      title: 'Structural Heritage',
      subtitle: 'Designing for Generations',
      description: 'Horizon Estates was founded on the singular principle of structural permanence. By combining prehistoric stone-crafting principles with modern structural node logic, we design living monuments that stand resilient across multiple centuries.',
      stat: '500+',
      statLabel: 'Year Structural Lifespan'
    },
    {
      id: 'innovation',
      icon: Compass,
      title: 'Bioclimatic Balance',
      subtitle: 'Passive Energy Leadership',
      description: 'We believe premium space must exist in complete thermal harmony with its micro-climate. Our architectural creations utilize self-tinting glass matrixes, subterranean heat capture loops, and volcanic pozzolan structures to attain absolute self-sufficiency.',
      stat: '100%',
      statLabel: 'Off-grid Thermal Stability'
    },
    {
      id: 'exclusivity',
      icon: Shield,
      title: 'Sovereign Standards',
      subtitle: 'Unyielding Security & Privacy',
      description: 'Each creation is custom-tailored with advanced structural acoustics, sub-soil foundations, and secure biological envelope controls, offering a serene, fortified shelter for family legacy records and custom living parameters.',
      stat: '24m',
      statLabel: 'Max Cantilever Clear Span'
    }
  ];

  const [activePillarId, setActivePillarId] = useState<string>(pillars[0].id);
  const activePillar = pillars.find(p => p.id === activePillarId) || pillars[0];

  return (
    <section 
      id="about" 
      className="relative bg-gradient-to-b from-[#080B15] to-[#04060B] py-24 md:py-32 px-6 overflow-hidden border-t border-b border-white/[0.02]"
    >
      {/* Immersive Stationary Background Real Estate Scenery */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Architectural House / Luxury Villa Background with stationary bg-fixed alignment matching the main hero */}
        <div 
          style={{ 
            backgroundImage: `url(${aboutVillaImg})`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-100"
        />
        
        {/* Perfect Uniform and light translucent shade to ensure premium readability without darkening sides */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Decorative Blueprint Dots Grid (Stationary) */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(rgba(125,211,252,0.02)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 md:mb-24" id="about-header">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-sky-300 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              QUI SUMUS / OUR PHILOSOPHY
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Architects of <span className="font-normal text-sky-100">Sovereign Legacies</span>
            </h2>
            <p className="text-sm text-slate-200 font-normal max-w-md leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              Horizon Estates is an avant-garde architectural and engineering collective. We build private, high-tech habitats in some of the earth’s most demanding landscapes, providing unmatched solace, isolation, and luxury.
            </p>
          </div>
        </div>

        {/* Brand Showcase Grid splitting columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch" id="about-content-root">
          
          {/* LEFT SIDE: Mission & Statistics (5 Columns - Floating backdrop-blur) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 bg-black/20 backdrop-blur-md border border-white/[0.05] p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]" id="about-mission">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-sky-500/[0.05] blur-[40px] pointer-events-none" />
            
            <div className="flex flex-col gap-6">
              <span className="text-[9px] font-mono tracking-widest text-[#7DD3FC] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] font-semibold">
                THE MANIFESTO
              </span>
              <p className="text-base sm:text-lg font-normal text-white leading-relaxed font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                &ldquo;Our designs do not merely exist within nature&mdash;they converse with it. We engineer estates that are structurally permanent, biologically balanced, and visually silent, ensuring deep aesthetic value for multiple centuries.&rdquo;
              </p>
              <div className="h-[1px] bg-white/[0.08]" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400/80 to-amber-300/80 p-[1px] shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  <div className="w-full h-full rounded-full bg-[#0D121F] flex items-center justify-center font-mono text-[9px] text-white">
                    HE
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-white tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Horizon Engineering Laboratory</span>
                  <span className="block text-[10px] text-slate-300 font-mono uppercase tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">LUGANO, SWITZERLAND</span>
                </div>
              </div>
            </div>

            {/* Quick Core Multipliers Matrix */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/[0.08] text-left">
              <div>
                <span className="block text-xl font-mono text-white tracking-wide mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-bold">15+</span>
                <span className="block text-[9px] text-slate-300 font-mono uppercase tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-medium">Years Active</span>
              </div>
              <div>
                <span className="block text-xl font-mono text-[#7DD3FC] tracking-wide mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-bold">28</span>
                <span className="block text-[9px] text-slate-300 font-mono uppercase tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-medium">Sovereign Havens Built</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Pillars Accordion / Spec Sheet (7 Columns - Floating backdrop-blur) */}
          <div className="lg:col-span-7 bg-black/20 backdrop-blur-md border border-white/[0.05] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] relative" id="about-pillars">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-sky-500/[0.03] blur-[60px] pointer-events-none" />

            {/* Tabs Selector headers */}
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]" />
                  <span className="text-[10px] font-mono tracking-widest text-[#7DD3FC] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] font-semibold">
                    Core Design Directives
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                  TAB SELECTOR
                </span>
              </div>

              {/* Dynamic Pillars Tabs */}
              <div className="flex flex-col sm:flex-row gap-2 mb-8">
                {pillars.map((pillar) => {
                  const isActive = pillar.id === activePillarId;
                  const IconComponent = pillar.icon;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActivePillarId(pillar.id)}
                      className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl border text-xs font-mono tracking-wider transition-all duration-300 uppercase ${
                        isActive
                          ? 'bg-sky-500/15 border-sky-400/30 text-sky-200 backdrop-blur-sm shadow-[0_4px_20px_rgba(14,165,233,0.15)] font-semibold'
                          : 'bg-black/35 backdrop-blur-sm border-white/5 text-slate-300 hover:text-white hover:bg-black/50 hover:border-white/10'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-400'}`} />
                      <span>{pillar.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Focus Pillar Display Card */}
              <div className="p-6 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/5 mb-8 animate-[fadeIn_0.3s_ease-out]" id="active-pillar-detail">
                <span className="text-[9px] font-mono text-[#7DD3FC] uppercase tracking-[0.2em] block mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] font-semibold">
                  {activePillar.subtitle}
                </span>
                <h3 className="text-xl font-medium text-white tracking-wide mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {activePillar.title}
                </h3>
                <p className="text-xs text-slate-100 font-normal leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {activePillar.description}
                </p>
              </div>
            </div>

            {/* Pillar Live Specification Counter Footer inside right display */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 rounded-2xl border border-dashed border-white/10 bg-black/30 backdrop-blur-sm">
              <div>
                <span className="block text-[8px] font-mono text-slate-300 uppercase tracking-wider mb-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] font-semibold">
                  KPI VALUE MEASUREMENT
                </span>
                <span className="block text-xs font-mono text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {activePillar.statLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center bg-black/45 border border-white/10 rounded-xl px-4 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                <Trophy className="w-4 h-4 text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                <span className="text-lg font-mono text-white tracking-wider font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                  {activePillar.stat}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
