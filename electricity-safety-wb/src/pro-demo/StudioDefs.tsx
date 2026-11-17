import React from 'react';

/**
 * Shared SVG filters & gradients for Studio-Grade 2D Vector Animation:
 * - Multi-stage bloom/neon glow filter
 * - Procedural grain/texture overlay to eliminate digital plastic flatness
 * - Ambient volumetric light gradients
 */
export const StudioDefs: React.FC = () => {
  return (
    <defs>
      {/* 1. Multi-Stage Neon Glow Filter (feGaussianBlur + feMerge) */}
      <filter id="pro-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="32" result="blur3" />
        <feMerge>
          <feMergeNode in="blur3" />
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="pro-glow-gold" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* 2. Soft Drop Shadow for Organic Volume */}
      <filter id="pro-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#020412" floodOpacity="0.55" />
      </filter>

      {/* 3. Volumetric Linear & Radial Gradients (45 deg light key) */}
      {/* Background Deep Sky */}
      <radialGradient id="sky-radial" cx="50%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#1E1668" />
        <stop offset="45%" stopColor="#0B0E38" />
        <stop offset="100%" stopColor="#030414" />
      </radialGradient>

      {/* Electric Conductor Gradient */}
      <linearGradient id="electric-wire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#22D7DA" />
        <stop offset="70%" stopColor="#1856C7" />
        <stop offset="100%" stopColor="#0C1B54" />
      </linearGradient>

      {/* Character Skin Gradient with ambient warm rim */}
      <linearGradient id="skin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F6B182" />
        <stop offset="55%" stopColor="#D97742" />
        <stop offset="100%" stopColor="#A84318" />
      </linearGradient>

      {/* Character Uniform Cloth Gradient with volume curvature */}
      <linearGradient id="cloth-blue" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#4364F7" />
        <stop offset="50%" stopColor="#243CDB" />
        <stop offset="100%" stopColor="#101D78" />
      </linearGradient>

      {/* Boots Rubber Gradient */}
      <linearGradient id="rubber-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="60%" stopColor="#FFD244" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>

      {/* Ground Field Voltage Wave */}
      <radialGradient id="voltage-wave-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22D7DA" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FFD244" stopOpacity="0.4" />
        <stop offset="85%" stopColor="#EF4444" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#09134B" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
};

