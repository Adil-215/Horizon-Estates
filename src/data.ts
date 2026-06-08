/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Hotspot } from './types';

// Import our generated beautiful high-res images to enable correct build-time compilation
import heroVillaImg from './assets/images/hero_villa_1780838898037.png';
import inlinePreviewImg from './assets/images/inline_preview_1780838918159.png';
import propertyOnyxImg from './assets/images/property_onyx_1780838940275.png';
import propertyZenImg from './assets/images/property_zen_1780838973390.png';

export const IMAGES = {
  heroVilla: heroVillaImg,
  inlinePreview: inlinePreviewImg,
  propertyOnyx: propertyOnyxImg,
  propertyZen: propertyZenImg,
  propertyHorizon: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  propertyOceanus: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  propertyMonolith: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
};

export const PROPERTIES: Property[] = [
  {
    id: 'prop-onyx',
    name: 'Onyx Monolith',
    location: 'Amangiri Plateau, Utah',
    price: '$18,400,000',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8200,
    glassType: 'Electrochromic Low-E',
    energyRating: 'A+++ Net-Zero',
    image: IMAGES.propertyOnyx,
    description: 'An architectural tribute to the desert mesa. Constructed with raw obsidian-infused concrete and full-height performance glazing, the Onyx Monolith completely blends into its prehistoric surroundings while hosting state-of-the-art automation panels and geothermal micro-grids.',
    tags: ['Desert', 'Solar Grid', 'Off-grid Capable', 'Obsidian Facade'],
    category: 'Futuristic'
  },
  {
    id: 'prop-zen',
    name: 'Zen Glass Pavilion',
    location: 'Kyoto Highlands, Japan',
    price: '$12,500,000',
    bedrooms: 3,
    bathrooms: 4,
    areaSqFt: 5400,
    glassType: 'Museum-Grade Low-Reflective',
    energyRating: 'Class A Passive House',
    image: IMAGES.propertyZen,
    description: 'Floating on shallow black pebble ponds amidst ancient maple woods, the Zen Glass Pavilion is a masterclass in structural dematerialization. Slender carbon-fiber pillars support a floating roof plane, while dual-chambered soundproof glass offers uninterrupted views of cascading mountain streams.',
    tags: ['Zen Ponds', 'Carbon Fiber', 'Redwood Forest', 'Thermal Core'],
    category: 'Signature'
  },
  {
    id: 'prop-horizon',
    name: 'The Horizon Cascade',
    location: 'Amalfi Cliffs, Italy',
    price: '$24,000,000',
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 11200,
    glassType: 'Storm-Rated Solar-Harvesting',
    energyRating: 'A++ Smart Energy',
    image: IMAGES.propertyHorizon,
    description: 'Carved directly into pristine limestone cliffs, this residence cascades across four fluid levels connected by a transparent panoramic elevator. Fully automated glass panels glide effortlessly to unify the immense living space with a heated saltwater infinity pool hovering over the Tyrrhenian Sea.',
    tags: ['Oceanfront', 'Cascade Pool', 'Cliff Integrated', 'Cavity Insulation'],
    category: 'Classic'
  },
  {
    id: 'prop-oceanus',
    name: 'Oceanus Tech-Estate',
    location: 'Bora Bora, French Polynesia',
    price: '$29,500,000',
    bedrooms: 7,
    bathrooms: 8,
    areaSqFt: 13500,
    glassType: 'Self-Cleaning Acoustic Comfort',
    energyRating: 'Biophilic Gold Tier',
    image: IMAGES.propertyOceanus,
    description: 'A cutting-edge sanctuary situated on a private peninsula. Features integrated tidal propulsion generators, smart home interfaces designed into glass columns, a deep-sea salt filtration bath system, and living spaces shaded by responsive solar fins that trace the sun’s trajectory.',
    tags: ['Private Lagoon', 'Self-Cleaning Glass', 'Solar Fins', 'Tidal Powered'],
    category: 'Futuristic'
  },
  {
    id: 'prop-monolith',
    name: 'The Obsidian Core',
    location: 'Reykjavík Lava Fields, Iceland',
    price: '$9,800,000',
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 6100,
    glassType: 'Triple-Glazed Argon Filled',
    energyRating: 'Volcanic Geothermal A++',
    image: IMAGES.propertyMonolith,
    description: 'Designed to withstand the dramatic subarctic climate. Combining structural dark basalt blocks with immense structural glass voids, this estate harnesses direct geothermal vents for absolute thermal stability. Inside, bespoke hand-charred timber offsets the brutalist dark concrete structure.',
    tags: ['Iceland Lava', 'Subarctic Glass', 'Geothermal Core', 'Bespoke Timber'],
    category: 'Signature'
  }
];

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'hotspot-balcony',
    title: 'Cantilevered Sunset Deck',
    shortLabel: 'Balcony Deck',
    description: 'A 4.5-meter gravity-defying reinforced concrete deck. Reaching out over the reflecting pool, it is lined with deep-charcoal heated basalt stones and framed with frameless crystal glass balustrades to ensure an unobstructed horizon.',
    specDetails: [
      { label: 'Outreach', value: '4.5 Meters' },
      { label: 'Stone Bed', value: 'Geothermal Heated Basalt' },
      { label: 'Glass', value: '18mm Structural Layered' }
    ],
    x: 26,
    y: 41
  },
  {
    id: 'hotspot-smart-pavilion',
    title: 'Adaptive Smart Glass Pavilion',
    shortLabel: 'Glass Pavilion',
    description: 'Stretching floor-to-ceiling high-fidelity panes engineered with electrochromic self-shading arrays. Managed by the central Horizon Estates AI system, the glass dynamically adjusts its light and thermal transmission, shifting from pure ice-transparency into deep obsidian privacy within 30 seconds.',
    specDetails: [
      { label: 'U-Value', value: '0.48 W/m²K' },
      { label: 'Response Time', value: '< 30 Seconds' },
      { label: 'Shading Levels', value: 'Dynamic 5% to 90%' }
    ],
    x: 62,
    y: 33
  },
  {
    id: 'hotspot-entrance',
    title: 'The Great Architectural Pivot Portal',
    shortLabel: 'Main Entrance',
    description: 'A monolithic 6-meter pivot door crafted from burnished naval steel and integrated smart locks. The door effortlessly glides on an offset hydraulic hinge, opening directly into a double-height foyer lined with vertical cedar fins and warm structural linear lighting grids.',
    specDetails: [
      { label: 'Portal Height', value: '6.0 Meters' },
      { label: 'Core Material', value: 'Burnished Naval Steel' },
      { label: 'Bio-security', value: 'Dual-Spectrum Hand Scanning' }
    ],
    x: 71,
    y: 50
  }
];
