import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';

/**
 * Stage 3 (0..1184 local frames): Continuous Bridge Dive
 * - 1909 Microscope Beam -> Plastic Comb on Table -> Polymer Molecular Chain -> Single Carbon Atom
 */
export const Stage3CombZoomShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [1148, 1184], [1, 0], EASE_INOUT);

  // 4-stage continuous optical dive
  const combOpacity = ci(local, [240, 320, 620, 700], [0, 1, 1, 0], EASE_INOUT);
  const combScale = ci(local, [240, 680], [0.75, 2.3], EASE_INOUT);
  const polymerOpacity = ci(local, [580, 660, 880, 950], [0, 1, 1, 0], EASE_INOUT);
  const polymerScale = ci(local, [580, 940], [0.85, 2.1], EASE_INOUT);
  const atomOpacity = ci(local, [860, 940], [0, 1], EASE_OUT);
  const atomScale = ci(local, [860, 1184], [0.72, 1.15], EASE_OUT);
  const beamOpacity = ci(local, [0, 20, 260, 330], [0, 1, 1, 0], EASE_INOUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, #0D1E38 0%, #050811 76%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Layer 1: 1909 Gold Foil Beam Morph */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: beamOpacity }}>
        <circle cx="960" cy="540" r="180" fill="none" stroke="#FBBF24" strokeWidth="3" strokeDasharray="10 8" />
        <line x1="360" y1="540" x2="1560" y2="540" stroke="#38BDF8" strokeWidth="4" strokeDasharray="12 10" />
        <circle cx="960" cy="540" r="18" fill="#10B981" filter="drop-shadow(0 0 18px #10B981)" />
      </svg>

      {/* Layer 2: Everyday Plastic Comb on Table */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: combOpacity,
          transform: `scale(${combScale})`,
          transformOrigin: '960px 540px',
        }}
      >
        <rect x="420" y="650" width="1080" height="460" fill="#1E130B" stroke="#451A03" strokeWidth="3" />
        <g transform="translate(960, 540) rotate(-6)">
          <rect x="-260" y="-48" width="520" height="40" rx="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="2.5" />
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={-236 + i * 27} y="-8" width="11" height="78" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          ))}
        </g>
      </svg>

      {/* Layer 3: Polymer Chain */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: polymerOpacity,
          transform: `scale(${polymerScale})`,
          transformOrigin: '960px 540px',
        }}
      >
        <path d="M 460,540 L 660,460 L 860,560 L 1060,460 L 1260,560 L 1460,460" fill="none" stroke="#38BDF8" strokeWidth="6" />
        {[460, 660, 860, 1060, 1260, 1460].map((cx, i) => {
          const cy = i % 2 === 0 ? 540 : 460;
          return (
            <g key={cx} transform={`translate(${cx}, ${i === 2 ? 560 : cy})`}>
              <circle cx="0" cy="0" r="24" fill="#1E293B" stroke="#F43F5E" strokeWidth="3" />
              <circle cx="0" cy="-58" r="12" fill="#334155" stroke="#BAE6FD" strokeWidth="2" />
              <line x1="0" y1="-24" x2="0" y2="-46" stroke="#94A3B8" strokeWidth="3" />
            </g>
          );
        })}
      </svg>

      {/* Layer 4: Single Carbon Atom (Diffuse Electron Cloud) */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: atomOpacity,
          transform: `scale(${atomScale})`,
          transformOrigin: '960px 540px',
        }}
      >
        <defs>
          <radialGradient id="cAtomCloud" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="960" cy="540" r="220" fill="url(#cAtomCloud)" />
        {/* Tiny Nucleus (6p + 6n) */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = i * 1.047;
          return (
            <g key={i}>
              <circle cx={960 + Math.cos(a) * 10} cy={540 + Math.sin(a) * 10} r="7" fill="#F43F5E" />
              <circle cx={960 + Math.cos(a + 0.52) * 13} cy={540 + Math.sin(a + 0.52) * 13} r="6.5" fill="#94A3B8" />
            </g>
          );
        })}
        {/* Diffuse Electrons */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = frame * 0.055 + i * 1.047;
          const rad = 115 + Math.sin(frame * 0.08 + i * 2) * 42;
          return (
            <circle
              key={`e${i}`}
              cx={960 + Math.cos(ang) * rad}
              cy={540 + Math.sin(ang * 1.1) * rad * 0.85}
              r="7.5"
              fill="#38BDF8"
              filter="drop-shadow(0 0 8px #38BDF8)"
            />
          );
        })}
      </svg>

      <DustMotes frame={frame} cx={960} cy={540} radius={450} count={28} opacity={0.45} seed={23} />
    </div>
  );
};
