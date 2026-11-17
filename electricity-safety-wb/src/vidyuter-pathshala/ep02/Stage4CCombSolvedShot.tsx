import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, camAt, camTransform, ci } from '../historical/scene1/Scene1Shared';

/**
 * Stage 4C (0..2255 local frames): Solving EP01's Comb Mystery
 * - 0..1300f: Dry Hair & Plastic Comb overlaid with microscopic stadium-scale atoms (heavy locked nuclei vs outer electrons jumping!)
 * - 1300..2255f: Induced Polarization lifting neutral paper scrap with near-side attraction vs far-side repulsion force vectors
 */
export const Stage4CCombSolvedShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [2220, 2255], [1, 0], EASE_INOUT);

  const cam = camAt(local, [
    { f: 0, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 1280, x: 960, y: 540, z: 1.04, sx: 960, sy: 540 },
    { f: 1310, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 2255, x: 960, y: 540, z: 1.06, sx: 960, sy: 540 },
  ]);

  const transferAlpha = ci(local, [0, 24, 1270, 1320], [0, 1, 1, 0], EASE_INOUT);
  const polarAlpha = ci(local, [1295, 1345], [0, 1], EASE_OUT);
  const transferProgress = ci(local, [320, 920], [0, 1], EASE_OUT);
  const paperLift = ci(local, [1680, 2080], [0, 125], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #111E36 0%, #050811 78%)',
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
        {/* PART 1: Hair & Comb Overlaid with Microscopic Atoms */}
        {transferAlpha > 0.01 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: transferAlpha }}>
            {/* Left: Dry Hair + Microscopic Atom Overlay */}
            <g transform="translate(460, 560)">
              <path d="M -165,-145 Q 0,-220 165,-145 Q 190,130 135,205 Q 0,150 -135,205 Q -190,130 -165,-145 Z" fill="#292524" stroke="#57534E" strokeWidth="3" />
              {/* Microscopic Atom Zone inside Hair */}
              <circle cx="0" cy="0" r="105" fill="rgba(56, 189, 248, 0.08)" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="0" cy="0" r="24" fill="#9F1239" stroke="#F43F5E" strokeWidth="3" />
              <text x="0" y="7" textAnchor="middle" fill="#FFF" fontSize="22" fontWeight="800">+</text>
              <text x="0" y="265" textAnchor="middle" fill="#FDA4AF" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                শুকনো চুল ({transferProgress > 0.5 ? '+ ধনাত্মক' : 'নিরপেক্ষ'})
              </text>
            </g>

            {/* Right: Plastic Comb + Microscopic Atom Overlay */}
            <g transform="translate(1440, 560)">
              <rect x="-210" y="-75" width="420" height="40" rx="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="2.5" />
              {Array.from({ length: 14 }).map((_, i) => (
                <rect key={i} x={-190 + i * 28} y="-35" width="11" height="75" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
              ))}
              {/* Microscopic Atom Zone inside Comb */}
              <circle cx="0" cy="70" r="95" fill="rgba(56, 189, 248, 0.08)" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="0" cy="70" r="22" fill="#9F1239" stroke="#F43F5E" strokeWidth="3" />
              <text x="0" y="77" textAnchor="middle" fill="#FFF" fontSize="20" fontWeight="800">+</text>
              <text x="0" y="265" textAnchor="middle" fill="#BAE6FD" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                প্লাস্টিকের চিরুনি ({transferProgress > 0.5 ? '- ঋণাত্মক' : 'নিরপেক্ষ'})
              </text>
            </g>

            {/* Jumping Light Outer Electrons (Hair -> Comb) */}
            {[0, 1, 2, 3].map((i) => {
              const p = Math.max(0, Math.min(1, transferProgress * 1.4 - i * 0.14));
              const ex = 515 + p * 880;
              const ey = 520 - Math.sin(p * Math.PI) * 155 + i * 24;
              return (
                <g key={i} transform={`translate(${ex}, ${ey})`}>
                  <circle cx="0" cy="0" r="14" fill="#075985" stroke="#38BDF8" strokeWidth="3" filter="drop-shadow(0 0 8px #38BDF8)" />
                  <text x="0" y="6" textAnchor="middle" fill="#E0F2FE" fontSize="20" fontWeight="800">-</text>
                </g>
              );
            })}

            <text x="960" y="925" textAnchor="middle" fill="#FDE68A" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              প্রোটন নিউক্লিয়াসে আটকা (১,৮৩৬× ভারী) — ঘর্ষণে শুধু বাইরের ইলেকট্রনই লাফ দেয়!
            </text>
          </svg>
        )}

        {/* PART 2: Induced Polarization with Strong Near-Side Attraction vs Weak Far-Side Repulsion */}
        {local >= 1295 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: polarAlpha }}>
            {/* Negatively Charged Comb Above */}
            <g transform="translate(960, 325)">
              <rect x="-260" y="-45" width="520" height="40" rx="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />
              {[-180, -90, 0, 90, 180].map((cx) => (
                <text key={cx} x={cx} y="-16" textAnchor="middle" fill="#E0F2FE" fontSize="28" fontWeight="800">-</text>
              ))}
            </g>

            {/* Strong Near-Side Attraction Arrow (+ pulled up toward -) */}
            <line x1="740" y1="530" x2="740" y2="390" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
            <polygon points="740,375 728,398 752,398" fill="#10B981" />
            <text x="615" y="455" textAnchor="end" fill="#6EE7B7" fontSize="26" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              প্রবল আকর্ষণ (কাছের +)
            </text>

            {/* Weak Far-Side Repulsion Arrow (- pushed down slightly) */}
            <line x1="1180" y1="590" x2="1180" y2="660" stroke="#F43F5E" strokeWidth="3.5" strokeDasharray="6 5" />
            <text x="1220" y="630" textAnchor="start" fill="#FDA4AF" fontSize="24" fontWeight="600" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              দুর্বল বিকর্ষণ (দূরের -)
            </text>

            {/* Neutral Paper Scrap Jumping Up */}
            <g transform={`translate(960, ${700 - paperLift})`}>
              <rect x="-150" y="-75" width="300" height="150" rx="14" fill="#F2E5CE" stroke="#D97706" strokeWidth="3" />
              {[-85, 0, 85].map((px) => (
                <g key={`p${px}`} transform={`translate(${px}, -35)`}>
                  <circle cx="0" cy="0" r="16" fill="#9F1239" />
                  <text x="0" y="6" textAnchor="middle" fill="#FFF" fontSize="22" fontWeight="800">+</text>
                </g>
              ))}
              {[-85, 0, 85].map((px) => (
                <g key={`m${px}`} transform={`translate(${px}, 38)`}>
                  <circle cx="0" cy="0" r="16" fill="#075985" />
                  <text x="0" y="6" textAnchor="middle" fill="#FFF" fontSize="22" fontWeight="800">-</text>
                </g>
              ))}
            </g>

            <text x="960" y="925" textAnchor="middle" fill="#BAE6FD" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              আবেশ (Polarization): কাছের বিপরীত আকর্ষণ দূরের বিকর্ষণকে হারিয়ে কাগজ তোলে!
            </text>
          </svg>
        )}

        <DustMotes frame={frame} cx={960} cy={520} radius={460} count={28} opacity={0.45} seed={43} />
      </div>
    </div>
  );
};
