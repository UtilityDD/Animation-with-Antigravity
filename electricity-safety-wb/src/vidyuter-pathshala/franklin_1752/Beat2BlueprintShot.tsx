import React from 'react';
import {
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  camAt,
  camTransform,
  ci,
} from '../historical/scene1/Scene1Shared';

/**
 * Beat 2 (0..1295 local): Exact Collinson-Letter Kite Arrangement on Drafting Table
 * - Silk handkerchief stretched over cedar cross + bridle loop + ribbon tail
 * - 1-ft sharp vertical metal wire at top
 * - Clear Y-junction: wet hemp twine -> brass key hanging vertically down + dry crimson silk ribbon extending right!
 * - Snappy 22-26f camera focus hops onto each part!
 */
export const Beat2BlueprintShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [1260, 1295], [1, 0], EASE_INOUT);

  // Snappy 22-26f camera hops between components
  const cam = camAt(local, [
    { f: 0, x: 760, y: 510, z: 0.94, sx: 880, sy: 540 },
    { f: 280, x: 760, y: 495, z: 0.98, sx: 880, sy: 540 },
    // Snappy hop up to the 1-ft pointed metal wire!
    { f: 306, x: 760, y: 240, z: 1.55, sx: 860, sy: 480 },
    { f: 620, x: 760, y: 255, z: 1.58, sx: 860, sy: 480 },
    // Snappy pan down to the clear Y-junction (hemp twine -> hanging brass key + dry silk ribbon)!
    { f: 648, x: 960, y: 695, z: 1.58, sx: 920, sy: 560 },
    { f: 1295, x: 985, y: 700, z: 1.64, sx: 920, sy: 560 },
  ]);

  const silkReveal = ci(local, [110, 220], [0, 1], EASE_OUT);
  const wireReveal = ci(local, [310, 410], [0, 1], EASE_OUT);
  const keyReveal = ci(local, [620, 720], [0, 1], EASE_OUT);
  const ribbonReveal = ci(local, [820, 940], [0, 1], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 45% 50%, #241910 0%, #090C14 80%)',
        opacity: fadeIn * fadeOut,
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
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
          {/* Oak Drafting Table & Blueprint Sheet */}
          <rect x="-200" y="-200" width="2320" height="1480" fill="#1C140E" />
          <g transform="translate(820, 540) rotate(-1)">
            <rect x="-560" y="-420" width="1120" height="840" rx="8" fill="#162135" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="2.5" />
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`v${i}`} x1={-450 + i * 100} y1="-420" x2={-450 + i * 100} y2="420" stroke="#38BDF8" strokeOpacity="0.08" strokeWidth="1" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="-560" y1={-320 + i * 100} x2="560" y2={-320 + i * 100} stroke="#38BDF8" strokeOpacity="0.08" strokeWidth="1" />
            ))}
          </g>

          {/* Kite Arrangement (Top to Bottom) */}
          <g transform="translate(760, 410)">
            {/* Cedar Wood Cross Strips */}
            <line x1="0" y1="-155" x2="0" y2="175" stroke="#B45309" strokeWidth="10" strokeLinecap="round" />
            <line x1="-130" y1="-15" x2="130" y2="-15" stroke="#B45309" strokeWidth="10" strokeLinecap="round" />

            {/* Silk Handkerchief tied at 4 corners */}
            <polygon
              points="0,-155 130,-15 0,175 -130,-15"
              fill="rgba(242, 229, 206, 0.22)"
              stroke="#F2E5CE"
              strokeWidth="3"
              opacity={silkReveal}
            />
            {/* Bridle Loop + Kite Tail */}
            <path d="M 0,175 Q -18,235 12,285 Q 32,320 -8,355" fill="none" stroke="#F2E5CE" strokeWidth="4" opacity={silkReveal} />
            <path d="M 0,-75 Q 65,-15 55,105" fill="none" stroke="#8C7355" strokeWidth="3" strokeDasharray="6 4" opacity={silkReveal} />

            {/* 1-ft Sharp Pointed Metal Wire at Top */}
            <g opacity={wireReveal}>
              <line x1="0" y1="-155" x2="0" y2="-250" stroke="#38BDF8" strokeWidth="5.5" strokeLinecap="round" />
              <polygon points="0,-268 -7,-242 7,-242" fill="#E0F2FE" />
              <text x="26" y="-205" fill="#BAE6FD" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                সূচালো ধাতব তার
              </text>
            </g>

            {/* Long Hemp Twine descending to the clear Y-Junction */}
            <path d="M 55,105 Q 95,215 165,275" fill="none" stroke="#8C7355" strokeWidth="6" strokeDasharray="10 5" opacity={keyReveal} />
            <text x="-135" y="245" fill="#FDE68A" fontSize="26" fontWeight="600" opacity={keyReveal} style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              শণের সুতো (পরিবাহী)
            </text>

            {/* CLEAR Y-JUNCTION KNOT at (165, 275): Brass Key hangs VERTICALLY DOWN, Dry Silk Ribbon goes RIGHT! */}
            <g transform="translate(165, 275)" opacity={keyReveal}>
              <circle cx="0" cy="0" r="8" fill="#FDE68A" />
              {/* Brass Key hanging vertically down from the knot */}
              <circle cx="0" cy="24" r="18" fill="none" stroke="#FBBF24" strokeWidth="5.5" />
              <line x1="0" y1="42" x2="0" y2="96" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
              <line x1="0" y1="78" x2="18" y2="78" stroke="#FBBF24" strokeWidth="5" />
              <text x="-155" y="68" fill="#FDE047" fontSize="26" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                ধাতব চাবি
              </text>
            </g>

            {/* Dry Crimson Silk Ribbon extending cleanly RIGHT from the knot */}
            <g opacity={ribbonReveal}>
              <path d="M 165,275 L 420,275" fill="none" stroke="#9E2A2B" strokeWidth="10" strokeLinecap="round" />
              <text x="200" y="325" fill="#FDA4AF" fontSize="26" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                শুকনো সিল্ক (অপরিবাহী)
              </text>
            </g>
          </g>
        </svg>

        <DustMotes frame={frame} cx={820} cy={480} radius={440} count={26} opacity={0.5} seed={72} />
      </div>
    </div>
  );
};
