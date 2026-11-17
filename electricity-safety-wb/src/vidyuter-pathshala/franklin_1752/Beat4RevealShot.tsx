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
 * Beat 4 (0..1281 local frames): Full-Bleed 2-Part Scientific Reveal
 * - Part A (0..520f): Extreme Macro of Wet Hemp Twine — loose stray fibers bristle straight up!
 * - Part B (520..1281f): Wet Conduction (#38BDF8) down to Brass Key -> stops at Dry Silk -> Knuckle Spark -> Leyden Jar Charging
 */
export const Beat4RevealShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [1195, 1228], [1, 0], EASE_INOUT);

  const cam = camAt(local, [
    { f: 0, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 195, x: 960, y: 540, z: 1.02, sx: 960, sy: 540 },
    // Snappy 26f zoom-in on bristling hemp fibers (left/center, clear of right title)
    { f: 221, x: 650, y: 515, z: 1.48, sx: 840, sy: 540 },
    { f: 425, x: 650, y: 515, z: 1.45, sx: 840, sy: 540 },
    // Snappy 26f transition onto Y-junction key & dry silk ribbon
    { f: 451, x: 560, y: 510, z: 1.38, sx: 820, sy: 540 },
    { f: 775, x: 560, y: 510, z: 1.36, sx: 820, sy: 540 },
    // Snappy 26f pull-back to frame key + knuckle spark + Leyden jar charging
    { f: 801, x: 740, y: 530, z: 1.08, sx: 880, sy: 540 },
    { f: 1228, x: 740, y: 530, z: 1.12, sx: 880, sy: 540 },
  ]);

  const partA = local < 445;
  const partB = local >= 415;
  const fiberLift = ci(local, [45, 250], [0, 1], EASE_OUT);
  const chargeFlow = (frame * 2.8) % 36;
  const sparkTick = local > 835 && local < 905;
  const jarMove = ci(local, [930, 995], [0, 1], EASE_OUT);
  const jarCharge = ci(local, [975, 1185], [0.1, 0.94], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 40% 50%, #0A1D33 0%, #050811 78%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Distant Rainy Backdrop */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }}>
        {Array.from({ length: 32 }).map((_, i) => {
          const rx = rnd(i * 7) * 1920;
          const ry = (frame * 11 + rnd(i * 13) * 1080) % 1080;
          return <line key={i} x1={rx} y1={ry} x2={rx - 10} y2={ry + 28} stroke="#64748B" strokeWidth="1.3" />;
        })}
      </svg>

      {/* Camera Layer */}
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
        {/* PART A: Extreme Macro of Braided Hemp Twine & Rising Stray Fibers */}
        {partA && (
          <svg
            width="1920"
            height="1080"
            style={{ position: 'absolute', inset: 0, opacity: ci(local, [0, 22, 410, 445], [0, 1, 1, 0]) }}
          >
            {/* Subtle Electrostatic Field Glow around twine */}
            <ellipse cx="640" cy="540" rx="540" ry="180" fill="rgba(56, 189, 248, 0.08)" />
            {/* Thick Braided Hemp Twine spanning diagonally */}
            <line x1="80" y1="680" x2="1180" y2="410" stroke="#5C4727" strokeWidth="26" strokeLinecap="round" />
            <line x1="80" y1="680" x2="1180" y2="410" stroke="#8C7355" strokeWidth="14" strokeDasharray="18 14" strokeLinecap="round" />

            {/* Stray Hemp Fibers Bristling Straight Up in Electrostatic Repulsion! */}
            {Array.from({ length: 12 }).map((_, i) => {
              const t = 0.14 + i * 0.07;
              const bx = 80 + t * 1100;
              const by = 680 - t * 270;
              const len = (55 + (i % 3) * 24) * fiberLift + 14;
              const ang = -104 + (i % 3 - 1) * 14;
              const ex = bx + Math.cos((ang * Math.PI) / 180) * len;
              const ey = by + Math.sin((ang * Math.PI) / 180) * len;
              return (
                <g key={i}>
                  <line x1={bx} y1={by} x2={ex} y2={ey} stroke="#D6B98C" strokeWidth="3.2" strokeLinecap="round" />
                  <circle cx={ex} cy={ey} r="5.5" fill="#38BDF8" opacity={fiberLift * 0.85} />
                </g>
              );
            })}
          </svg>
        )}

        {/* PART B: Wet Conduction -> Brass Key -> Dry Silk Insulation -> Knuckle Spark -> Leyden Jar */}
        {partB && (
          <svg
            width="1920"
            height="1080"
            style={{ position: 'absolute', inset: 0, opacity: ci(local, [415, 450], [0, 1], EASE_OUT) }}
          >
            {/* Wet Hemp Twine descending from storm */}
            <path d="M 220,110 Q 380,320 520,480" fill="none" stroke="#5C4727" strokeWidth="10" />
            <path
              d="M 220,110 Q 380,320 520,480"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeDasharray="12 10"
              strokeDashoffset={-chargeFlow}
              filter="drop-shadow(0 0 8px #38BDF8)"
            />

            {/* Dry Crimson Silk Ribbon (Stops Charge Cleanly!) held by Franklin's colonial-cuffed hand */}
            <path d="M 520,480 L 245,515" fill="none" stroke="#9E2A2B" strokeWidth="10" strokeLinecap="round" />
            <g transform="translate(245, 515) rotate(-8)">
              <ellipse cx="0" cy="0" rx="18" ry="13" fill="#ECC4A8" stroke="#C99672" strokeWidth="1.4" />
              <rect x="-46" y="-14" width="32" height="28" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="-150" y="-18" width="110" height="36" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.8" />
            </g>

            {/* Brass Key */}
            <g transform="translate(520, 480)">
              <circle cx="0" cy="0" r="22" fill="none" stroke="#FBBF24" strokeWidth="6" />
              <line x1="0" y1="22" x2="0" y2="96" stroke="#FBBF24" strokeWidth="6.5" strokeLinecap="round" />
              <line x1="0" y1="68" x2="22" y2="68" stroke="#FBBF24" strokeWidth="5.5" />
            </g>

            {/* Approaching Knuckle + Tiny Blue-White Spark (785..925f) */}
            <g
              transform={`translate(${ci(local, [785, 840, 915], [760, 578, 760], EASE_OUT)}, 515)`}
              opacity={ci(local, [780, 805, 895, 925], [0, 1, 1, 0])}
            >
              <ellipse cx="16" cy="10" rx="22" ry="14" fill="#ECC4A8" stroke="#C99672" strokeWidth="1.4" />
              <rect x="34" y="-6" width="22" height="32" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="52" y="-10" width="90" height="40" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.8" />
              {sparkTick && (
                <path
                  d="M -42,4 L -24,-6 L -14,5 L -2,0"
                  fill="none"
                  stroke="#E0F2FE"
                  strokeWidth="4"
                  filter="drop-shadow(0 0 10px #38BDF8)"
                />
              )}
            </g>

            {/* Wooden Shed Table Supporting the Leyden Jar */}
            <rect x="640" y="705" width="760" height="340" rx="8" fill="#23160E" stroke="#451A03" strokeWidth="3" />

            {/* Leyden Jar Lifted Toward Key & Storing Sky Charge (930..1228f) */}
            <g transform={`translate(${1040 - jarMove * 480}, ${575 + jarMove * 110})`}>
              <rect x="-64" y="-80" width="128" height="200" rx="16" fill="rgba(56, 189, 248, 0.14)" stroke="#BAE6FD" strokeWidth="2.5" />
              <rect x="-56" y={112 - jarCharge * 176} width="112" height={jarCharge * 176} rx="12" fill="#38BDF8" opacity="0.48" />
              <rect x="-6" y="-145" width="12" height="175" fill="#F59E0B" />
              <circle cx="0" cy="-150" r="16" fill="#FDE047" />
            </g>
          </svg>
        )}

        <DustMotes frame={frame} cx={640} cy={520} radius={420} count={26} opacity={0.55} color="#38BDF8" seed={74} />
      </div>
    </div>
  );
};
