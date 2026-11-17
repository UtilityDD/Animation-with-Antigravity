import React from 'react';
import { EASE_INOUT, EASE_OUT, ci, rnd } from '../historical/scene1/Scene1Shared';

/**
 * Beat 1: 1752 Philadelphia Study — Friction Globe Spark + Leyden Jar + Rainy Window
 */
export const Beat1StudySpark: React.FC<{ frame: number }> = ({ frame }) => {
  const spark = Math.sin(frame * 0.65) > 0.55;
  const spin = (frame * 1.4) % 360;

  return (
    <svg width="820" height="580" viewBox="-410 -290 820 580" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="fGlobe" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.65" />
          <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rainy Window in Background */}
      <g transform="translate(80, -90)">
        <rect x="-170" y="-140" width="340" height="240" rx="8" fill="#0B1324" stroke="#334155" strokeWidth="5" />
        <line x1="0" y1="-140" x2="0" y2="100" stroke="#334155" strokeWidth="4" />
        <line x1="-170" y1="-20" x2="170" y2="-20" stroke="#334155" strokeWidth="4" />
        {/* Distant storm clouds outside window */}
        <path d="M -140,15 Q -70,-40 0,-18 Q 75,-45 140,15 Z" fill="#1E293B" opacity="0.85" />
        {Array.from({ length: 14 }).map((_, i) => {
          const rx = -150 + rnd(i * 5) * 300;
          const ry = -130 + ((frame * 6 + rnd(i * 9) * 210) % 210);
          return <line key={i} x1={rx} y1={ry} x2={rx - 6} y2={ry + 16} stroke="#64748B" strokeWidth="1.2" opacity="0.45" />;
        })}
      </g>

      {/* Wooden Workbench */}
      <rect x="-380" y="135" width="760" height="120" rx="6" fill="#2B1B12" stroke="#451A03" strokeWidth="2" />
      <circle cx="-180" cy="40" r="220" fill="url(#candleGlow)" />

      {/* Electrostatic Glass Friction Globe on Wooden Stand */}
      <g transform="translate(-150, 20)">
        <rect x="-75" y="90" width="150" height="26" rx="4" fill="#451A03" />
        <line x1="-75" y1="0" x2="75" y2="0" stroke="#94A3B8" strokeWidth="6" />
        <circle cx="0" cy="0" r="64" fill="url(#fGlobe)" stroke="#BAE6FD" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="62" ry="18" fill="none" stroke="#E0F2FE" strokeWidth="1" opacity="0.25" transform={`rotate(${spin})`} />
        {/* Brass Conductor Knobs + Tiny Lab Spark */}
        <circle cx="95" cy="0" r="14" fill="#FBBF24" />
        <circle cx="136" cy="0" r="14" fill="#FBBF24" />
        {spark && (
          <path
            d="M 109,0 L 118,-5 L 122,4 L 128,0"
            fill="none"
            stroke="#E0F2FE"
            strokeWidth="3"
            filter="drop-shadow(0 0 8px #38BDF8)"
          />
        )}
      </g>

      {/* Leyden Jar on Workbench */}
      <g transform="translate(80, 48)">
        <rect x="-34" y="-32" width="68" height="118" rx="10" fill="rgba(56, 189, 248, 0.16)" stroke="#BAE6FD" strokeWidth="2" />
        <rect x="-34" y="20" width="68" height="66" rx="8" fill="#94A3B8" opacity="0.7" />
        <rect x="-4" y="-68" width="8" height="90" fill="#F59E0B" />
        <circle cx="0" cy="-72" r="11" fill="#FDE047" />
      </g>

      {/* Parchment Letter & Quill */}
      <g transform="translate(225, 118) rotate(-4)">
        <rect x="-65" y="-32" width="130" height="64" rx="3" fill="#F2E5CE" stroke="#B45309" strokeWidth="1.5" />
        <line x1="-45" y1="-14" x2="35" y2="-14" stroke="#78350F" strokeWidth="2" opacity="0.55" />
        <line x1="-45" y1="0" x2="45" y2="0" stroke="#78350F" strokeWidth="2" opacity="0.55" />
        <line x1="-45" y1="14" x2="20" y2="14" stroke="#78350F" strokeWidth="2" opacity="0.55" />
      </g>
    </svg>
  );
};

/**
 * Beat 2: Engineered Apparatus Blueprint — Silk Kite + Pointed Wire + Hemp Twine + Key + Dry Silk Ribbon
 */
export const Beat2Apparatus: React.FC<{ frame: number; local: number }> = ({ local }) => {
  const revealWire = ci(local, [45, 95], [0, 1], EASE_OUT);
  const revealKey = ci(local, [110, 165], [0, 1], EASE_OUT);
  const revealSilk = ci(local, [175, 235], [0, 1], EASE_OUT);

  return (
    <svg width="780" height="580" viewBox="-390 -290 780 580" style={{ overflow: 'visible' }}>
      {/* Silk Handkerchief Kite with Cedar Wood Cross */}
      <g transform="translate(-80, -85)">
        <polygon points="0,-115 95,0 0,130 -95,0" fill="rgba(242, 229, 206, 0.14)" stroke="#F2E5CE" strokeWidth="3" />
        {/* Cedar Cross Strips */}
        <line x1="0" y1="-115" x2="0" y2="130" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
        <line x1="-95" y1="0" x2="95" y2="0" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />

        {/* Sharp Pointed Metal Wire at Top */}
        <g opacity={revealWire}>
          <line x1="0" y1="-115" x2="0" y2="-175" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="0,-188 -6,-168 6,-168" fill="#E0F2FE" />
          <text x="18" y="-155" fill="#BAE6FD" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
            সূচালো ধাতব তার
          </text>
        </g>
      </g>

      {/* Hemp Twine (Conductor when wet) -> Brass Key -> Dry Crimson Silk Ribbon (Insulator) */}
      <path d="M -80,45 Q -30,115 70,135" fill="none" stroke="#8C7355" strokeWidth="4.5" strokeDasharray="8 4" />
      <text x="-130" y="115" fill="#FDE68A" fontSize="21" fontWeight="600" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
        শণের সুতো (পরিবাহী)
      </text>

      {/* Brass House Key */}
      <g transform="translate(75, 138)" opacity={revealKey}>
        <circle cx="0" cy="0" r="16" fill="none" stroke="#FBBF24" strokeWidth="5" />
        <line x1="0" y1="16" x2="0" y2="64" stroke="#FBBF24" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="0" y1="48" x2="14" y2="48" stroke="#FBBF24" strokeWidth="4.5" />
        <text x="26" y="8" fill="#FDE047" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
          ধাতব চাবি
        </text>
      </g>

      {/* Dry Crimson Silk Ribbon (Insulator) */}
      <g opacity={revealSilk}>
        <path d="M 91,138 Q 165,148 245,165" fill="none" stroke="#9E2A2B" strokeWidth="8" strokeLinecap="round" />
        <text x="125" y="195" fill="#FDA4AF" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
          শুকনো সিল্ক (অপরিবাহী)
        </text>
      </g>
    </svg>
  );
};

/**
 * Beat 3: Sheltered Under Cover — Franklin & William inside dry wooden shed,
 * holding ONLY dry crimson silk ribbon; kite hovers silently under storm clouds (NO lightning strikes!)
 */
export const Beat3ShelteredShed: React.FC<{ frame: number }> = ({ frame }) => {
  const kiteSway = Math.sin(frame * 0.06) * 14;

  return (
    <svg width="860" height="580" viewBox="-430 -290 860 580" style={{ overflow: 'visible' }}>
      {/* Storm Sky & Gentle Rain */}
      <path d="M -380,-145 Q -240,-215 -100,-165 Q 35,-225 180,-160 Q 300,-195 380,-140 L 380,-280 L -380,-280 Z" fill="#1E293B" opacity="0.85" />
      {Array.from({ length: 24 }).map((_, i) => {
        const rx = -350 + rnd(i * 13) * 700;
        const ry = -220 + ((frame * 10 + rnd(i * 19) * 440) % 440);
        return <line key={i} x1={rx} y1={ry} x2={rx - 10} y2={ry + 24} stroke="#64748B" strokeWidth="1.3" opacity="0.35" />;
      })}

      {/* High Silk Kite Hovering Peacefully (NO lightning strikes!) */}
      <g transform={`translate(${145 + kiteSway}, -165) rotate(-14)`}>
        <polygon points="0,-42 32,0 0,48 -32,0" fill="#F2E5CE" fillOpacity="0.3" stroke="#F2E5CE" strokeWidth="2" />
        <line x1="0" y1="-42" x2="0" y2="-66" stroke="#38BDF8" strokeWidth="2.5" />
      </g>

      {/* Wet Hemp Twine leading down toward shed doorway (clear of wood frame) */}
      <path d={`M ${145 + kiteSway},-118 Q 20,10 -65,92`} fill="none" stroke="#8C7355" strokeWidth="3" />

      {/* Dry Wooden Shed Roof & Doorway Shelter (Right/Center Foreground) */}
      <g transform="translate(-145, 20)">
        <polygon points="-220,-180 120,-180 155,-135 -220,-135" fill="#2B1B12" stroke="#451A03" strokeWidth="2.5" />
        <rect x="-220" y="-135" width="32" height="335" fill="#3B2316" />
        {/* Warm Dry Interior Glow */}
        <rect x="-188" y="-135" width="265" height="335" fill="rgba(217, 130, 43, 0.08)" />

        {/* Companion Silhouette (William Franklin) behind */}
        <g transform="translate(-115, 25)" opacity="0.45">
          <circle cx="0" cy="-65" r="24" fill="#1E293B" />
          <path d="M -38,165 L -28,-35 Q 0,-45 28,-35 L 38,165 Z" fill="#1E293B" />
        </g>

        {/* Benjamin Franklin (46 yrs) standing strictly under dry roof holding dry silk ribbon */}
        <g transform="translate(-25, 35)">
          <circle cx="0" cy="-72" r="26" fill="#ECC4A8" />
          <path d="M -28,-74 Q -28,-102 0,-102 Q 28,-102 28,-74 Q 20,-84 0,-84 Q -20,-84 -28,-74 Z" fill="#64748B" />
          {/* 18th-Century Colonial Coat */}
          <path d="M -46,165 L -36,-38 Q 0,-52 36,-38 L 48,165 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
          {/* Extended Arm holding ONLY the Dry Crimson Silk Ribbon */}
          <path d="M 28,-22 L 96,18" fill="none" stroke="#334155" strokeWidth="22" strokeLinecap="round" />
          <circle cx="102" cy="22" r="11" fill="#ECC4A8" />
        </g>
      </g>

      {/* Brass Key + Dry Crimson Silk Ribbon */}
      <g transform="translate(-65, 92)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#FBBF24" strokeWidth="3.5" />
        <line x1="0" y1="10" x2="0" y2="34" stroke="#FBBF24" strokeWidth="4" />
        {/* Dry Silk Ribbon back into Franklin's hand */}
        <path d="M -10,0 Q -32,8 -42,-15" fill="none" stroke="#9E2A2B" strokeWidth="5.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

/**
 * Beat 4: 2-Part Scientific Reveal:
 * - First half: Rising loose hemp fibers (electrostatic repulsion)
 * - Second half: Wet conduction (#38BDF8) -> Key Knuckle Spark -> Leyden Jar Charging
 */
export const Beat4ScientificReveal: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const showJar = local > 175;
  const fiberLift = ci(local, [25, 120], [0, 1], EASE_OUT);
  const chargeFlow = (frame * 2.8) % 36;
  const sparkTick = local > 215 && local < 255;
  const jarCharge = ci(local, [270, 410], [0.1, 0.92], EASE_OUT);

  return (
    <svg width="800" height="560" viewBox="-400 -280 800 560" style={{ overflow: 'visible' }}>
      {/* Part A: Rising Stray Hemp Fibers (0..185f) */}
      {!showJar && (
        <g opacity={ci(local, [0, 20, 155, 185], [0, 1, 1, 0])}>
          {/* Magnified Wet Hemp Twine */}
          <line x1="-260" y1="30" x2="260" y2="30" stroke="#5C4727" strokeWidth="16" strokeLinecap="round" />
          {/* Bristling Stray Hemp Fibers standing straight up! */}
          {[-170, -100, -30, 40, 110, 180].map((fx, i) => {
            const ang = -90 + (i - 2.5) * 8;
            const len = 75 * fiberLift + 15;
            return (
              <g key={fx} transform={`translate(${fx}, 24)`}>
                <line
                  x1="0"
                  y1="0"
                  x2={Math.cos((ang * Math.PI) / 180) * len}
                  y2={Math.sin((ang * Math.PI) / 180) * len}
                  stroke="#D6B98C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle
                  cx={Math.cos((ang * Math.PI) / 180) * len}
                  cy={Math.sin((ang * Math.PI) / 180) * len}
                  r="6"
                  fill="#38BDF8"
                  opacity={fiberLift * 0.85}
                />
              </g>
            );
          })}
        </g>
      )}

      {/* Part B: Wet Conduction -> Knuckle Spark -> Leyden Jar Charging */}
      {showJar && (
        <g opacity={ci(local, [175, 205], [0, 1], EASE_OUT)}>
          {/* Wet Conductive Hemp Twine pulsing cyan */}
          <path d="M -250,-160 Q -120,-60 -30,-10" fill="none" stroke="#5C4727" strokeWidth="8" />
          <path
            d="M -250,-160 Q -120,-60 -30,-10"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeDasharray="10 10"
            strokeDashoffset={-chargeFlow}
            filter="drop-shadow(0 0 8px #38BDF8)"
          />

          {/* Brass Key */}
          <g transform="translate(-30, -10)">
            <circle cx="0" cy="0" r="18" fill="none" stroke="#FBBF24" strokeWidth="5.5" />
            <line x1="0" y1="18" x2="0" y2="75" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
            <line x1="0" y1="54" x2="18" y2="54" stroke="#FBBF24" strokeWidth="5" />
          </g>

          {/* Dry Silk Ribbon Knot Stopping Charge Cleanly! */}
          <path d="M -48,-10 L -210,45" fill="none" stroke="#9E2A2B" strokeWidth="8" strokeLinecap="round" />

          {/* Approaching Knuckle & Crisp Tiny Blue-White Spark */}
          <g transform={`translate(${ci(local, [185, 225, 265], [140, 28, 120], EASE_OUT)}, 18)`}>
            <path d="M 0,0 Q 35,-12 95,-6 L 105,22 Q 45,28 0,18 Z" fill="#ECC4A8" />
            {sparkTick && (
              <path
                d="M -48,2 L -28,-4 L -18,4 L -2,0"
                fill="none"
                stroke="#E0F2FE"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 10px #38BDF8)"
              />
            )}
          </g>

          {/* Leyden Jar Visibly Filling with Sky Charge */}
          <g transform="translate(175, 55)">
            <rect x="-56" y="-70" width="112" height="170" rx="14" fill="rgba(56, 189, 248, 0.14)" stroke="#BAE6FD" strokeWidth="2.5" />
            <rect x="-50" y={92 - jarCharge * 150} width="100" height={jarCharge * 150} rx="10" fill="#38BDF8" opacity="0.45" />
            <rect x="-5" y="-125" width="10" height="145" fill="#F59E0B" />
            <circle cx="0" cy="-130" r="14" fill="#FDE047" />
          </g>
        </g>
      )}
    </svg>
  );
};

/**
 * Beat 5: Sky Jar = Lab Jar Comparison -> Modern Lightning Rod Safely Grounded
 */
export const Beat5ComparisonAndRod: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const showRod = local > 265;
  const flow = (frame * 2.6) % 36;

  return (
    <svg width="820" height="560" viewBox="-410 -280 820 560" style={{ overflow: 'visible' }}>
      {!showRod && (
        <g opacity={ci(local, [0, 24, 240, 270], [0, 1, 1, 0])}>
          {/* Left: Sky-Charged Leyden Jar */}
          <g transform="translate(-175, 25)">
            <path d="M -80,-145 Q 0,-185 80,-145 Z" fill="#1E293B" />
            <path d="M 0,-145 L 0,-95" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 6" strokeDashoffset={-flow} />
            <rect x="-55" y="-65" width="110" height="165" rx="14" fill="rgba(56, 189, 248, 0.35)" stroke="#BAE6FD" strokeWidth="2.5" />
            <rect x="-5" y="-105" width="10" height="125" fill="#F59E0B" />
            <circle cx="0" cy="-110" r="14" fill="#FDE047" />
          </g>

          {/* Luminous "=" Symbol */}
          <text x="0" y="45" textAnchor="middle" fill="#FBBF24" fontSize="96" fontWeight="700">=</text>

          {/* Right: Lab Friction-Charged Leyden Jar */}
          <g transform="translate(175, 25)">
            <circle cx="0" cy="-145" r="28" fill="rgba(56, 189, 248, 0.2)" stroke="#BAE6FD" strokeWidth="2" />
            <path d="M 0,-118 L 0,-95" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 6" strokeDashoffset={-flow} />
            <rect x="-55" y="-65" width="110" height="165" rx="14" fill="rgba(56, 189, 248, 0.35)" stroke="#BAE6FD" strokeWidth="2.5" />
            <rect x="-5" y="-105" width="10" height="125" fill="#F59E0B" />
            <circle cx="0" cy="-110" r="14" fill="#FDE047" />
          </g>
        </g>
      )}

      {/* Pointed Lightning Rod Safely Guiding Charge into Earth */}
      {showRod && (
        <g opacity={ci(local, [265, 295], [0, 1], EASE_OUT)}>
          {/* Colonial Building */}
          <rect x="-120" y="-10" width="240" height="175" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          <polygon points="-140,-10 0,-95 140,-10" fill="#334155" />
          {/* Earth Ground */}
          <rect x="-280" y="165" width="560" height="35" rx="6" fill="#3B2316" />

          {/* Pointed Lightning Rod + Copper Grounding Strip */}
          <line x1="0" y1="-175" x2="0" y2="-95" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
          <polygon points="0,-188 -6,-168 6,-168" fill="#FEF08A" />
          <path d="M 0,-95 L 125,-10 L 125,180" fill="none" stroke="#D97706" strokeWidth="6" />
          <path
            d="M 0,-175 L 0,-95 L 125,-10 L 125,180"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeDasharray="10 10"
            strokeDashoffset={-flow}
          />
        </g>
      )}
    </svg>
  );
};
