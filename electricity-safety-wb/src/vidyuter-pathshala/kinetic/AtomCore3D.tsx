import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const AtomCore3D: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();

  // Rapid rotation speeds for intense kinetic feel
  const rot1 = (frame * 6) % 360;
  const rot2 = (frame * -7.5) % 360;
  const rot3 = (frame * 5.2) % 360;

  const nucleusPulse = Math.sin(frame * 0.25) * 0.15 + 1;

  return (
    <div
      style={{
        position: 'relative',
        width: 800 * scale,
        height: 800 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={800 * scale}
        height={800 * scale}
        viewBox="0 0 800 800"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <filter id="atomGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="nukeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit 1: Tilted 35 deg */}
        <g transform="translate(400, 400) rotate(35)">
          <ellipse
            cx="0"
            cy="0"
            rx="320"
            ry="90"
            fill="none"
            stroke="rgba(0, 240, 255, 0.4)"
            strokeWidth="3"
            strokeDasharray="12 8"
          />
          {/* Electron with speed trail */}
          <g transform={`rotate(${rot1}) translate(320, 0)`}>
            <circle cx="0" cy="0" r="14" fill="#00F0FF" filter="url(#atomGlow)" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
            {/* Motion trail arcs */}
            <path d="M-14 0 A14 14 0 0 1 -35 -15" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="3" fill="none" />
          </g>
          <g transform={`rotate(${rot1 + 180}) translate(320, 0)`}>
            <circle cx="0" cy="0" r="14" fill="#00F0FF" filter="url(#atomGlow)" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
          </g>
        </g>

        {/* Orbit 2: Tilted -50 deg */}
        <g transform="translate(400, 400) rotate(-50)">
          <ellipse
            cx="0"
            cy="0"
            rx="300"
            ry="85"
            fill="none"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="3"
            strokeDasharray="10 6"
          />
          <g transform={`rotate(${rot2}) translate(300, 0)`}>
            <circle cx="0" cy="0" r="14" fill="#38BDF8" filter="url(#atomGlow)" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
          </g>
          <g transform={`rotate(${rot2 + 180}) translate(300, 0)`}>
            <circle cx="0" cy="0" r="14" fill="#38BDF8" filter="url(#atomGlow)" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
          </g>
        </g>

        {/* Orbit 3: Vertical 90 deg */}
        <g transform="translate(400, 400) rotate(90)">
          <ellipse
            cx="0"
            cy="0"
            rx="330"
            ry="95"
            fill="none"
            stroke="rgba(0, 240, 255, 0.3)"
            strokeWidth="3"
            strokeDasharray="14 10"
          />
          <g transform={`rotate(${rot3}) translate(330, 0)`}>
            <circle cx="0" cy="0" r="14" fill="#00F0FF" filter="url(#atomGlow)" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
          </g>
        </g>

        {/* Central Nucleus Core */}
        <circle cx="400" cy="400" r={80 * nucleusPulse} fill="url(#nukeGlow)" />
        
        <g transform="translate(400, 400)">
          {/* Protons (+) */}
          <circle cx="-16" cy="-14" r="18" fill="#F59E0B" filter="url(#atomGlow)" />
          <text x="-16" y="-7" fill="#FFF" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>

          <circle cx="16" cy="14" r="18" fill="#F59E0B" filter="url(#atomGlow)" />
          <text x="16" y="21" fill="#FFF" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>

          <circle cx="18" cy="-12" r="18" fill="#F59E0B" filter="url(#atomGlow)" />
          <text x="18" y="-5" fill="#FFF" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>

          {/* Neutrons (0) */}
          <circle cx="-18" cy="14" r="16" fill="#64748B" stroke="#334155" strokeWidth="2" />
          <circle cx="0" cy="2" r="16" fill="#64748B" stroke="#334155" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};
