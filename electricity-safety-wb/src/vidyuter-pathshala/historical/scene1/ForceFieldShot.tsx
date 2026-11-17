import React from 'react';
import {
  AmberGem,
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  Feather,
  ci,
} from './Scene1Shared';

/**
 * Beat 6: Invisible Electrostatic Attraction Field (Frames 1230 to 1882)
 * Translucent glowing dipole field vectors curving smoothly between the real
 * AmberGem and the hovering Feather, set in warm museum chiaroscuro.
 */
export const ForceFieldShot: React.FC<{ frame: number }> = ({ frame }) => {
  const local = Math.max(0, frame - 1230);

  const fadeIn = ci(local, [0, 35], [0, 1], EASE_OUT);
  const zoom = ci(local, [0, 650], [1.06, 0.96], EASE_INOUT);
  const fieldFlow = (frame * 0.7) % 48;
  const hoverY = Math.sin(frame * 0.045) * 8;
  const fieldReveal = ci(local, [25, 110], [0, 1], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 65% 50%, #141C30 0%, #050811 75%)',
        opacity: fadeIn,
        overflow: 'hidden',
      }}
    >
      {/* Subtle Golden & Cyan Atmospheric Glow on Right Stage */}
      <div
        style={{
          position: 'absolute',
          left: 1260,
          top: 540,
          width: 1000,
          height: 750,
          transform: `translate(-50%, -50%) scale(${zoom.toFixed(4)})`,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, rgba(56, 189, 248, 0.08) 45%, rgba(5, 8, 17, 0) 72%)',
          pointerEvents: 'none',
        }}
      />

      {/* Right Stage Dipole Visualization (centered around x=1260, y=540) */}
      <div
        style={{
          position: 'absolute',
          left: 1260,
          top: 540,
          transform: `translate(-50%, -50%) scale(${zoom.toFixed(4)})`,
        }}
      >
        <svg width="900" height="620" viewBox="-450 -310 900 620" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="dipoleLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Curved Electrostatic Force Field Lines connecting Amber -> Feather */}
          <g opacity={fieldReveal}>
            {[-170, -110, -55, 0, 55, 110, 170].map((arcY, idx) => (
              <g key={idx}>
                {/* Soft Outer Glow Line */}
                <path
                  d={`M -210,0 Q 0,${arcY * 2.1} 210,0`}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  strokeOpacity="0.14"
                />
                {/* Flowing Dashed Vector Line */}
                <path
                  d={`M -210,0 Q 0,${arcY * 2.1} 210,0`}
                  fill="none"
                  stroke="url(#dipoleLineGrad)"
                  strokeWidth="2.2"
                  strokeDasharray="12 12"
                  strokeDashoffset={-fieldFlow}
                  opacity={0.78 - Math.abs(arcY) * 0.0018}
                />
              </g>
            ))}
          </g>

          {/* Left: Charged Amber Gemstone */}
          <g transform={`translate(-225, ${hoverY * 0.6})`}>
            <AmberGem id="fieldAmber" size={135} glow={0.85} charge={0.95} />
          </g>

          {/* Right: Suspended Hovering Feather (Pulled by Invisible Force) */}
          <g transform={`translate(225, ${95 + hoverY}) rotate(-28)`}>
            <Feather length={210} flutter={0.3} frame={frame} />
          </g>
        </svg>
      </div>

      {/* Floating Dust Motes in Light Beam */}
      <DustMotes frame={frame} cx={1260} cy={540} radius={380} count={32} opacity={0.7} seed={43} />
    </div>
  );
};
