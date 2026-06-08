/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Landmark, Gem, Coins, Zap, Sparkles } from 'lucide-react';
import bgImage from '../assets/images/modern_apartments_1780921598192.png';

interface Benefit {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  iconColor: string;
}

export default function WhyChooseUs() {
  const benefits: Benefit[] = [
    {
      id: 'expert-knowledge',
      icon: Landmark,
      title: 'Expert Market Knowledge',
      description: 'Leveraging off-market transactions and deep predictive analytics to secure early access.',
      iconColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'premium-selection',
      icon: Gem,
      title: 'Premium Property Selection',
      description: 'Curating elite residences defined by architectural innovation and master engineering.',
      iconColor: 'text-sky-300 bg-sky-500/10 border-sky-500/20'
    },
    {
      id: 'best-value',
      icon: Coins,
      title: 'Best Value for Your Investment',
      description: 'Assertive price negotiations backed by comprehensive, real-time equity valuation modelling.',
      iconColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'fast-experience',
      icon: Zap,
      title: 'Fast & Hassle-Free Experience',
      description: 'Providing bespoke virtual staging and frictionless white-glove transactional closures.',
      iconColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <section 
      className="relative py-28 px-6 overflow-hidden border-t border-white/[0.02]" 
      id="why-choose-us"
    >
      {/* Stationary/Fixed Modern House Background Image - Fully clear with no tint */}
      <div 
        style={{ 
          backgroundImage: `url(${bgImage})`,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed pointer-events-none"
      />

      {/* Decorative center spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-indigo-500/[0.03] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Compact Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          <span className="text-[10px] font-mono tracking-[0.3em] text-sky-300 uppercase flex items-center justify-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" /> SYSTEM ADVANTAGES
          </span>
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
            Why Choose Horizon
          </h2>
        </div>

        {/* Dynamic Rectangular Cards with gap between them */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          id="why-choose-us-grid-container"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={benefit.id} 
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 rounded-2xl bg-black/85 border border-white/15 hover:border-white/30 backdrop-blur-md shadow-[0_12px_44px_rgba(0,0,0,0.7)] hover:bg-black/95 transition-all duration-300 group"
                id={`benefit-card-${benefit.id}`}
              >
                <div className={`p-2.5 rounded-xl border shrink-0 w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${benefit.iconColor}`}>
                  <Icon className="w-4.5 h-4.5 animate-pulse-slow" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-white tracking-tight group-hover:text-sky-200 transition-colors duration-200">{benefit.title}</h4>
                  <p className="text-slate-300 font-light text-xs mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis mr-2" title={benefit.description}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
