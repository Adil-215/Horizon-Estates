/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EditorialSection from './components/EditorialSection';
import PropertyGrid from './components/PropertyGrid';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUs';
import CurationPanel from './components/CurationPanel';
import ContactModal from './components/ContactModal';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import Footer from './components/Footer';
import { Property } from './types';
import { PROPERTIES } from './data';
import { Bookmark, Sparkles, BellRing, Info, Star } from 'lucide-react';

export default function App() {
  // Saved collection persistent state
  const [curatedIds, setCuratedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('horizon_curated_estates');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state control drawers/tabs
  const [isCurationOpen, setIsCurationOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPropertyForBooking, setSelectedPropertyForBooking] = useState<Property | null>(null);
  const [selectedPropertyForInquiry, setSelectedPropertyForInquiry] = useState<Property | null>(null);
  
  // Custom Toast Notifier
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter state
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: 'all'
  });

  // Current scrolled active navigation indicator
  const [activeSection, setActiveSection] = useState('explore');

  // Sync curated collections
  const handleToggleCurated = (id: string) => {
    let updated: string[];
    const isAdding = !curatedIds.includes(id);
    const propName = PROPERTIES.find(p => p.id === id)?.name || 'Estate';

    if (curatedIds.includes(id)) {
      updated = curatedIds.filter(item => item !== id);
      triggerToast(`Removed "${propName}" from your Saved Board`);
    } else {
      updated = [...curatedIds, id];
      triggerToast(`Saved "${propName}" to your Saved Board`);
    }
    setCuratedIds(updated);
    localStorage.setItem('horizon_curated_estates', JSON.stringify(updated));
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    // Auto clear after 3s
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  };

  // Direct triggering from different modules
  const handleOpenBookingWithProperty = (property: Property) => {
    setSelectedPropertyForBooking(property);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedPropertyForBooking(null);
    setIsBookingOpen(true);
  };

  const handleOpenInquiry = (property: Property) => {
    setSelectedPropertyForInquiry(property);
  };

  // Scroll smooth anchor handling
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Live scroll listener for active section indicator highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const sections = [
        { id: 'hero', target: 'explore' },
        { id: 'vision', target: 'vision' },
        { id: 'collections', target: 'collections' },
        { id: 'about', target: 'about' }
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.target);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter algorithmic logic
  const filteredProperties = PROPERTIES.filter((property) => {
    // 1. Search Query mapping
    const matchesSearch = filters.search.trim() === '' || 
      property.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      property.location.toLowerCase().includes(filters.search.toLowerCase()) ||
      property.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      property.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

    // 2. Category selection mapping
    const matchesCategory = filters.category === 'all' || property.category === filters.category;

    // 3. Price investment Range mapping
    let matchesPrice = true;
    if (filters.priceRange !== 'all') {
      const priceNumeric = parseFloat(property.price.replace(/[$,]/g, '')) / 1000000; // Converts e.g. "$18,400,000" into 18.4
      if (filters.priceRange === 'under-15') {
        matchesPrice = priceNumeric < 15;
      } else if (filters.priceRange === '15-25') {
        matchesPrice = priceNumeric >= 15 && priceNumeric <= 25;
      } else if (filters.priceRange === 'over-25') {
        matchesPrice = priceNumeric > 25;
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="bg-[#0B0F19] text-[#F8FAFC] min-h-screen relative selection:bg-sky-400 selection:text-[#0B0F19]" id="horizon-theme-container">
      {/* Dynamic Upper Header Floating Grid */}
      <Header
        curatedCount={curatedIds.length}
        onOpenCuration={() => setIsCurationOpen(true)}
        onOpenBooking={handleOpenGeneralBooking}
        activeSection={activeSection}
        onNavigate={handleScrollToSection}
      />

      {/* Monolithic scroll layer masking the sticky footer beneath with volumetric drop-shadow */}
      <div className="relative z-10 bg-[#0B0F19] shadow-[0_45px_70px_-20px_rgba(0,0,0,0.95)] overflow-x-hidden w-full" id="main-content-sheet">
        {/* Hero terminal core with interactive filtering */}
        <Hero 
          onFilterChange={setFilters} 
          selectedCategory={filters.category}
        />

        {/* Editorial section */}
        <EditorialSection 
          onOpenBooking={handleOpenGeneralBooking}
          onExploreClick={() => handleScrollToSection('collections')}
        />

        {/* Engineering Design & About Us Section */}
        <AboutUs />

        {/* Curated Property Grid list */}
        <PropertyGrid
          properties={filteredProperties}
          curatedIds={curatedIds}
          onToggleCurated={handleToggleCurated}
          onSelectProperty={handleOpenInquiry}
        />

        {/* Dynamic Why Choose Us Core */}
        <WhyChooseUs />
      </div>

      {/* Bottom Footer block - Sticky Parallax z-0 */}
      <div className="sticky bottom-0 z-0 w-full">
        <Footer
          onNavigate={handleScrollToSection}
          onOpenBooking={handleOpenGeneralBooking}
        />
      </div>

      {/* Sidebar: Users curation list */}
      <CurationPanel
        isOpen={isCurationOpen}
        onClose={() => setIsCurationOpen(false)}
        properties={PROPERTIES}
        curatedIds={curatedIds}
        onRemoveCurated={handleToggleCurated}
        onBookTourForProperty={(prop) => {
          setIsCurationOpen(false);
          handleOpenBookingWithProperty(prop);
        }}
      />

      {/* Modal: Client Consultation Scheduling */}
      <ContactModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedPropertyForBooking(null);
        }}
        properties={PROPERTIES}
        selectedProperty={selectedPropertyForBooking}
      />

      {/* Modal: Property Spec Details Details view */}
      <PropertyDetailsModal
        property={selectedPropertyForInquiry}
        onClose={() => setSelectedPropertyForInquiry(null)}
        isCurated={selectedPropertyForInquiry ? curatedIds.includes(selectedPropertyForInquiry.id) : false}
        onToggleCurated={handleToggleCurated}
        onBookTour={(prop) => {
          setSelectedPropertyForInquiry(null);
          handleOpenBookingWithProperty(prop);
        }}
      />

      {/* Custom Sliding Toast Notification Panel */}
      {toastMessage && (
        <div 
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 bg-black/85 backdrop-blur-md rounded-2xl border border-sky-400/30 text-white shadow-[0_12px_40px_rgba(0,0,0,0.8)] animate-slide-up-fade"
          id="custom-action-toast"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-300 to-sky-500 text-[#0B0F19] flex items-center justify-center p-[1px]">
            <Star className="w-3 h-3 fill-current text-[#0B0F19]" />
          </div>
          <span className="text-xs font-light tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
