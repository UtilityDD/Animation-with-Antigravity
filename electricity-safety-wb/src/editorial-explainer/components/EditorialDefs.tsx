import React from 'react';

/**
 * Editorial Visual Lighting & Shading Engine
 * Provides authentic atmospheric depth, directional lighting, and soft ambient drop shadows.
 * Avoids cheap plastic neon glows.
 */
export const EditorialDefs: React.FC = () => {
  return (
    <defs>
      {/* 1. Subtle, Elegant Vector Glow (Controlled & Soft) */}
      <filter id="editorial-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feColorMatrix
          type="matrix"
          values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 0.5 0"
          result="softBlur"
        />
        <feMerge>
          <feMergeNode in="softBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* 2. Natural Ambient Drop Shadow for Cast Shadows */}
      <filter id="ambient-ground-shadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#06091F" floodOpacity="0.45" />
      </filter>

      {/* 3. Deep Atmospheric Skies */}
      <radialGradient id="sky-storm" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#1E2958" />
        <stop offset="60%" stopColor="#0D1333" />
        <stop offset="100%" stopColor="#06091F" />
      </radialGradient>

      <radialGradient id="sky-warm-sunset" cx="50%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#FF9F43" />
        <stop offset="40%" stopColor="#3B2667" />
        <stop offset="85%" stopColor="#12183A" />
        <stop offset="100%" stopColor="#080C24" />
      </radialGradient>

      {/* 4. Directional Cel Shading for Characters (45-degree Key Light) */}
      <linearGradient id="skin-warm" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#F5B289" />
        <stop offset="65%" stopColor="#E2895A" />
        <stop offset="100%" stopColor="#BD5F32" />
      </linearGradient>

      <linearGradient id="uniform-royal" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#3858E9" />
        <stop offset="60%" stopColor="#253CB8" />
        <stop offset="100%" stopColor="#131F6D" />
      </linearGradient>

      <linearGradient id="shirt-slate" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#8EA3E8" />
        <stop offset="65%" stopColor="#5B73C4" />
        <stop offset="100%" stopColor="#304185" />
      </linearGradient>

      <linearGradient id="boot-gum" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD152" />
        <stop offset="70%" stopColor="#E5A61E" />
        <stop offset="100%" stopColor="#B37805" />
      </linearGradient>

      {/* 5. Wet Ground Conductive Layer Gradient */}
      <linearGradient id="wet-ground" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#111B47" />
        <stop offset="40%" stopColor="#0A102E" />
        <stop offset="100%" stopColor="#040717" />
      </linearGradient>

      {/* 6. Equipotential Scientific Radial Gradient */}
      <radialGradient id="potential-field" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF5E57" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#FFD152" stopOpacity="0.4" />
        <stop offset="75%" stopColor="#1DD1A1" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#111B47" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
};
