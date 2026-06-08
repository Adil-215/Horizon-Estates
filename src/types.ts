/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  glassType: string;
  energyRating: string;
  image: string;
  description: string;
  tags: string[];
  category: 'Signature' | 'Classic' | 'Futuristic';
}

export interface Hotspot {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  specDetails: { label: string; value: string }[];
  x: number; // percentage from left
  y: number; // percentage from top
}

export interface TourBooking {
  propertyId: string;
  propertyName: string;
  date: string;
  time: string;
  name: string;
  email: string;
  note?: string;
  status: 'pending' | 'confirmed';
}

export interface CuratedItem {
  propertyId: string;
  curatedAt: string;
  notes?: string;
}
