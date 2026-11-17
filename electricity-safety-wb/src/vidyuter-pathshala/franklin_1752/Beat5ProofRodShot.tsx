import React from 'react';
import {
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  camAt,
  camTransform,
  ci,
  rnd,
} from '../historical/scene1/Scene1Shared';

/**
 * Beat 5 (0..1180 local frames): Full-Bleed Comparison -> Modern Grounded Lightning Rod
 */
export const Beat5ProofRodShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 24], [0, 1], EASE_OUT);

  const cam = camAt(local, [
    { f: 0, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 195, x: 960, y: 540, z: 1.02, sx: 960, sy: 540 },
    { f: 221, x: 960, y: 515, z: 1.32, sx: 960, sy: 525 },
    { f: 505, x: 960, y: 515, z: 1.3, sx: 960, sy: 525 },
    { f: 533, x: 960, y: 470, z: 1.38, sx: 960, sy: 495 },
    { f: 830, x: 960, y: 470, z: 1.35, sx: 960, sy: 495 },
    { f: 860, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 1127, x: 960, y: 530, z: 1.04, sx: 960, sy: 535 },
  ]);

  const showComparison = local < 535;
  const showRod = local >= 500;
  const flow = (frame * 2.6) % 36;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #111D36 0%, #050811 78%)',
        opacity: fadeIn,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: camTransform(cam),
          transformOrigin: '0 0',
        }}
      >
        {/* PART A: Luminous Sky-Charged Jar = Lab-Charged Jar Comparison on Workbench */}
        {showComparison && (
          <svg
            width="1920"
            height="1080"
            style={{ position: 'absolute', inset: 0, opacity: ci(local, [0, 22, 495, 535], [0, 1, 1, 0]) }}
          >
            {/* Full-width workbench */}
            <rect x="0" y="790" width="1920" height="340" fill="#1C130C" stroke="#451A03" strokeWidth="3" />

            {/* Left: Sky-Charged Leyden Jar under storm clouds */}
            <g transform="translate(590, 590)">
              <path d="M -170,-210 Q 0,-280 170,-210 Z" fill="#1E293B" />
              <path d="M 0,-210 L 0,-125" stroke="#38BDF8" strokeWidth="3.5" strokeDasharray="8 8" strokeDashoffset={-flow} />
              <rect x="-72" y="-85" width="144" height="215" rx="16" fill="rgba(56, 189, 248, 0.35)" stroke="#BAE6FD" strokeWidth="2.5" />
              <rect x="-6" y="-135" width="12" height="165" fill="#F59E0B" />
              <circle cx="0" cy="-140" r="16" fill="#FDE047" />
            </g>

            {/* Luminous "=" Symbol */}
            <text x="960" y="615" textAnchor="middle" fill="#FBBF24" fontSize="112" fontWeight="700">=</text>

            {/* Right: Lab Friction-Charged Leyden Jar */}
            <g transform="translate(1330, 590)">
              <circle cx="0" cy="-190" r="46" fill="rgba(56, 189, 248, 0.18)" stroke="#BAE6FD" strokeWidth="2.5" />
              <path d="M 0,-144 L 0,-125" stroke="#38BDF8" strokeWidth="3.5" strokeDasharray="8 8" strokeDashoffset={-flow} />
              <rect x="-72" y="-85" width="144" height="215" rx="16" fill="rgba(56, 189, 248, 0.35)" stroke="#BAE6FD" strokeWidth="2.5" />
              <rect x="-6" y="-135" width="12" height="165" fill="#F59E0B" />
              <circle cx="0" cy="-140" r="16" fill="#FDE047" />
            </g>
          </svg>
        )}

        {/* PART B: Full-Bleed Colonial Brick House Protected by Grounded Lightning Rod */}
        {showRod && (
          <svg
            width="1920"
            height="1080"
            style={{ position: 'absolute', inset: 0, opacity: ci(local, [500, 538], [0, 1], EASE_OUT) }}
          >
            {/* Full-bleed Storm Sky + Rain */}
            <path d="M 0,0 L 1920,0 L 1920,340 Q 1440,390 960,335 Q 480,395 0,345 Z" fill="#182236" opacity="0.88" />
            {Array.from({ length: 28 }).map((_, i) => {
              const rx = rnd(i * 9) * 1920;
              const ry = (frame * 12 + rnd(i * 15) * 1080) % 1080;
              return <line key={i} x1={rx} y1={ry} x2={rx - 12} y2={ry + 30} stroke="#64748B" strokeWidth="1.3" opacity="0.3" />;
            })}

            {/* Damp Earth */}
            <rect x="-100" y="850" width="2120" height="320" fill="#1C130C" stroke="#3B2316" strokeWidth="3" />

            {/* Colonial Brick Building */}
            <g transform="translate(960, 620)">
              <rect x="-240" y="-40" width="480" height="270" fill="#1E293B" stroke="#334155" strokeWidth="3" />
              <polygon points="-280,-40 0,-185 280,-40" fill="#2B3648" stroke="#475569" strokeWidth="3" />
              {/* Warm Lit Windows */}
              {[-140, 0, 140].map((wx) => (
                <rect key={wx} x={wx - 28} y="30" width="56" height="82" rx="4" fill="#F59E0B" opacity="0.45" stroke="#475569" strokeWidth="2" />
              ))}

              {/* Pointed Copper Lightning Rod + Exterior Grounding Strip into Earth */}
              <line x1="0" y1="-310" x2="0" y2="-185" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" />
              <polygon points="0,-328 -8,-302 8,-302" fill="#FEF08A" />
              <path d="M 0,-185 L 250,-40 L 250,245" fill="none" stroke="#D97706" strokeWidth="8" strokeLinejoin="round" />
              {/* Safe Sky Charge Guided Quietly into Earth */}
              <path
                d="M 0,-310 L 0,-185 L 250,-40 L 250,245"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3.5"
                strokeDasharray="12 10"
                strokeDashoffset={-flow}
                filter="drop-shadow(0 0 8px #38BDF8)"
              />
            </g>
          </svg>
        )}

        <DustMotes frame={frame} cx={960} cy={520} radius={440} count={28} opacity={0.45} color="#38BDF8" seed={75} />
      </div>
    </div>
  );
};
