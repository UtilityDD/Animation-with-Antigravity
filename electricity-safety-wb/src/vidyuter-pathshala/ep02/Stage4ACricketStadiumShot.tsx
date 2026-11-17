import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, camAt, camTransform, ci } from '../historical/scene1/Scene1Shared';

/**
 * Stage 4A (0..2308 local frames): Analogy 1 — Cricket Stadium & Mustard Seed + Solid Matter Repulsion
 * - Zooms out from Carbon atom (0..320f) into a rich glowing Cricket Stadium (stands, floodlights, green outfield, pitch, wickets)
 * - Center pitch holds tiny glowing mustard seed = Nucleus; far outer stands hold diffuse cyan firefly cloud
 * - 1390..2308f: Neighboring atom electron clouds repelling each other (why empty-space solids feel rock-solid)
 */
export const Stage4ACricketStadiumShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [2272, 2308], [1, 0], EASE_INOUT);

  const cam = camAt(local, [
    // Continuous zoom-out from atom scale (2.8x) into massive Cricket Stadium (1.0x)
    { f: 0, x: 960, y: 550, z: 2.75, sx: 960, sy: 540 },
    { f: 340, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    // Snappy 26f zoom onto center pitch mustard seed
    { f: 560, x: 960, y: 540, z: 1.02, sx: 960, sy: 540 },
    { f: 586, x: 960, y: 555, z: 1.78, sx: 960, sy: 540 },
    { f: 920, x: 960, y: 555, z: 1.82, sx: 960, sy: 540 },
    // Snappy 26f pull-back to full stadium & diffuse electron firefly stands
    { f: 946, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 1380, x: 960, y: 540, z: 1.02, sx: 960, sy: 540 },
    { f: 2308, x: 960, y: 540, z: 1.06, sx: 960, sy: 540 },
  ]);

  const showRepulsion = local >= 1390;
  const stadiumAlpha = ci(local, [0, 25, 1370, 1420], [0, 1, 1, 0], EASE_INOUT);
  const repulsionAlpha = ci(local, [1380, 1430], [0, 1], EASE_OUT);
  const pressRatio = ci(local, [1520, 1850, 2100], [0, 1, 0.72], EASE_INOUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #0D2038 0%, #050811 78%)',
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
        {/* PART 1: Glowing Cricket Stadium Scale Analogy */}
        {stadiumAlpha > 0.01 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: stadiumAlpha }}>
            <defs>
              <radialGradient id="stadiumOutfield" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#065F46" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#022C22" stopOpacity="0.55" />
              </radialGradient>
            </defs>

            {/* Outer Tiered Stadium Bowl & Floodlight Towers */}
            <ellipse cx="960" cy="560" rx="730" ry="355" fill="rgba(15, 23, 42, 0.65)" stroke="#334155" strokeWidth="6" />
            <ellipse cx="960" cy="560" rx="680" ry="325" fill="none" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="44" />
            <ellipse cx="960" cy="560" rx="625" ry="290" fill="none" stroke="#475569" strokeWidth="2.5" strokeDasharray="8 10" />

            {/* 4 Stadium Floodlight Towers */}
            {[
              [330, 315],
              [1590, 315],
              [355, 815],
              [1565, 815],
            ].map(([fx, fy], idx) => (
              <g key={idx} transform={`translate(${fx}, ${fy})`}>
                <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="0" cy="0" r="18" fill="rgba(224, 242, 254, 0.35)" filter="drop-shadow(0 0 12px #E0F2FE)" />
              </g>
            ))}

            {/* Lush Green Cricket Outfield & Boundary Rope */}
            <ellipse cx="960" cy="560" rx="565" ry="255" fill="url(#stadiumOutfield)" stroke="#F8FAFC" strokeOpacity="0.45" strokeWidth="3" strokeDasharray="14 8" />
            <ellipse cx="960" cy="560" rx="220" ry="125" fill="none" stroke="#F8FAFC" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="8 8" />

            {/* Center Cricket Pitch + Tiny Wickets */}
            <rect x="932" y="490" width="56" height="140" rx="4" fill="#D97706" opacity="0.58" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="952" y1="496" x2="968" y2="496" stroke="#FEF08A" strokeWidth="2.5" />
            <line x1="952" y1="624" x2="968" y2="624" stroke="#FEF08A" strokeWidth="2.5" />

            {/* Tiny Glowing Mustard Seed at Center Pitch = Nucleus */}
            <circle cx="960" cy="560" r="5.5" fill="#F43F5E" filter="drop-shadow(0 0 10px #F43F5E)" />
            <circle cx="962" cy="558" r="2.2" fill="#94A3B8" />
            <text x="960" y="668" textAnchor="middle" fill="#FDA4AF" fontSize="24" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              পিচের সরিষার দানা = নিউক্লিয়াস (+ প্রোটন ও নিউট্রন)
            </text>

            {/* Darting Cyan Electron Fireflies in Outer Stands (Diffuse Probability Cloud, NOT rings) */}
            {Array.from({ length: 16 }).map((_, i) => {
              const ang = frame * 0.032 + i * 0.39;
              const rx = 625 + Math.sin(frame * 0.07 + i * 1.9) * 58;
              const ry = 290 + Math.cos(frame * 0.06 + i * 1.3) * 34;
              return (
                <circle
                  key={i}
                  cx={960 + Math.cos(ang) * rx}
                  cy={560 + Math.sin(ang) * ry}
                  r="5.5"
                  fill="#38BDF8"
                  filter="drop-shadow(0 0 8px #38BDF8)"
                />
              );
            })}

            <text x="960" y="955" textAnchor="middle" fill="#BAE6FD" fontSize="26" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              আকারের তুলনা: গ্যালারির জোনাকি = ইলেকট্রন মেঘের বিস্তৃত অঞ্চল
            </text>
          </svg>
        )}

        {/* PART 2: Why Empty-Space Solids Feel Rock-Solid (Electron Cloud Repulsion) */}
        {showRepulsion && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: repulsionAlpha }}>
            <defs>
              <radialGradient id="cloudRepel" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g transform={`translate(${660 + pressRatio * 145}, 560)`}>
              <circle cx="0" cy="0" r="185" fill="url(#cloudRepel)" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="2.5" strokeDasharray="8 6" />
              <circle cx="0" cy="0" r="14" fill="#F43F5E" />
              <text x="0" y="225" textAnchor="middle" fill="#BAE6FD" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                হাতের পরমাণুর ইলেকট্রন মেঘ
              </text>
            </g>

            <g transform={`translate(${1260 - pressRatio * 145}, 560)`}>
              <circle cx="0" cy="0" r="185" fill="url(#cloudRepel)" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="2.5" strokeDasharray="8 6" />
              <circle cx="0" cy="0" r="14" fill="#F43F5E" />
              <text x="0" y="225" textAnchor="middle" fill="#BAE6FD" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                টেবিলের পরমাণুর ইলেকট্রন মেঘ
              </text>
            </g>

            {pressRatio > 0.35 && (
              <g transform="translate(960, 560)">
                <line x1="0" y1="-160" x2="0" y2="160" stroke="#FBBF24" strokeWidth="5" strokeDasharray="10 8" />
                <text x="0" y="-190" textAnchor="middle" fill="#FDE047" fontSize="32" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  বৈদ্যুতিক বিকর্ষণ! (স্পর্শ মানেই বিকর্ষণ)
                </text>
              </g>
            )}
          </svg>
        )}

        <DustMotes frame={frame} cx={960} cy={520} radius={460} count={28} opacity={0.45} seed={41} />
      </div>
    </div>
  );
};
