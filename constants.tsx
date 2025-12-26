import React from 'react';
import { Shield, MapPin, Tablet, School, Building, Smartphone, Check, X } from 'lucide-react';

export const COLORS = {
  primary: '#0b1c2e',   // Official Dark Blue
  secondary: '#f03c2e', // Official Brand Red
  accent: '#00b894',    // Emerald Green
  neutral: '#faf8f5',   // Warm off-white
  charcoal: '#2d3436'   // Charcoal
};

export const ROUTES = {
  HOME: '/',
  MODEL: '/model',
  IMPACT: '/impact',
  STUDIO: '/studio',
  AUTH: '/auth',
  PROFILE: '/profile'
};

export const COMPARISON_DATA = [
  { feature: 'Kota Quality Content', acadup: true, others: 'Variable' },
  { feature: 'Cost (Annual)', acadup: '₹30k - 50k', others: '₹1.5L - 3L' },
  { feature: 'School Integration', acadup: true, others: false },
  { feature: 'Physical Centers Nearby', acadup: true, others: 'Only Hubs' },
  { feature: 'Digital-First Pedagogy', acadup: true, others: true },
  { feature: 'Tier 3 Focus', acadup: true, others: false },
];