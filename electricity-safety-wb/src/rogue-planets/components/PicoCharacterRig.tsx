import React from 'react';

export interface PicoRigProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  frame?: number;
  squashX?: number;
  squashY?: number;
  headTilt?: number;
  wingLeftAngle?: number;
  wingRightAngle?: number;
  lookAtX?: number; // -1 to 1
  lookAtY?: number; // -1 to 1
  expression?: 'curious' | 'surprised' | 'happy' | 'concentrating';
  holdingProp?: 'none' | 'spotlight' | 'magnifier' | 'lantern';
  divingHelmet?: boolean;
}

export const getPicoBlinkScale = (frame: number): number => {
  const cycle = frame % 190; // 60 FPS: blink every ~3.1 seconds
  if (cycle >= 0 && cycle < 3) return 0.5;
  if (cycle >= 3 && cycle < 7) return 0.05; // fully shut
  if (cycle >= 7 && cycle < 10) return 0.65;
  return 1.0;
};

/**
 * PICO (The Astro-Biologist Geometric Explorer)
 * Original geometric mascot designed with Kurzgesagt-level visual density,
 * clean silhouettes, dual-tone lighting, and articulated limbs.
 */
export const PicoRig: React.FC<PicoRigProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  frame = 0,
  squashX = 1,
  squashY = 1,
  headTilt = 0,
  wingLeftAngle = 18,
  wingRightAngle = -18,
  lookAtX = 0,
  lookAtY = 0,
  expression = 'curious',
  holdingProp = 'none',
  divingHelmet = false,
}) => {
  const blinkScale = getPicoBlinkScale(frame);
  const breathY = Math.sin(frame * 0.08) * 3;
  const antennaSway = Math.sin(frame * 0.12) * 6;
  const corePulse = (Math.sin(frame * 0.15) + 1.2) * 0.45;

  return (
    <g
      transform={`translate(${x}, ${y + breathY}) scale(${flipX ? -scale : scale}, ${scale}) scale(${squashX}, ${squashY})`}
      style={{ filter: 'drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.45))' }}
    >
      {/* Ground / Atmospheric Shadow */}
      <ellipse cx="0" cy="98" rx={42 * squashX} ry={12 * (2 - squashY)} fill="rgba(5, 7, 26, 0.55)" />

      {/* Back Wing (Left Wing) */}
      <g transform={`translate(-28, 14) rotate(${wingLeftAngle})`}>
        <path d="M 0 0 C -22 10, -32 40, -14 56 C -4 42, 6 22, 0 0 Z" fill="#180A59" stroke="#243CDB" strokeWidth="2.5" />
      </g>

      {/* Dual Magnetic Landing Pods / Legs */}
      <g transform="translate(-16, 68)">
        <rect x="-7" y="0" width="14" height="26" rx="6" fill="#180A59" stroke="#243CDB" strokeWidth="2.2" />
        <ellipse cx="0" cy="26" rx="12" ry="5" fill="#FF851D" stroke="#09134B" strokeWidth="2" />
      </g>
      <g transform="translate(16, 68)">
        <rect x="-7" y="0" width="14" height="26" rx="6" fill="#180A59" stroke="#243CDB" strokeWidth="2.2" />
        <ellipse cx="0" cy="26" rx="12" ry="5" fill="#FF851D" stroke="#09134B" strokeWidth="2" />
      </g>

      {/* Main Egg-Shaped Body (Deep Space Indigo #09134B with Royal Blue #243CDB Rim) */}
      <path
        d="M 0 -58 C -46 -58, -48 64, 0 68 C 48 64, 46 -58, 0 -58 Z"
        fill="#09134B"
        stroke="#243CDB"
        strokeWidth="3.2"
      />
      {/* 2-Tone Right-Side Volumetric Shadow */}
      <path
        d="M 12 -56 C 36 -42, 42 36, 6 67 C 32 60, 44 -26, 12 -56 Z"
        fill="#180A59"
        opacity="0.85"
      />

      {/* Chest Glowing Core Gauge */}
      <g transform="translate(0, 18)">
        <circle cx="0" cy="0" r="14" fill="#180A59" stroke="#22D7DA" strokeWidth="2.2" />
        <circle cx="0" cy="0" r={8 + corePulse * 3} fill="rgba(34, 215, 218, 0.35)" />
        <circle cx="0" cy="0" r="4.5" fill="#22D7DA" />
      </g>

      {/* Dual Spring Sensor Antennae */}
      <g transform={`translate(-18, -54) rotate(${-8 + antennaSway})`}>
        <line x1="0" y1="0" x2="-8" y2="-28" stroke="#243CDB" strokeWidth="3" strokeLinecap="round" />
        <circle cx="-8" cy="-28" r="5" fill="#22D7DA" stroke="#FFFFFF" strokeWidth="1.5" />
      </g>
      <g transform={`translate(18, -54) rotate(${8 - antennaSway})`}>
        <line x1="0" y1="0" x2="8" y2="-28" stroke="#243CDB" strokeWidth="3" strokeLinecap="round" />
        <circle cx="8" cy="-28" r="5" fill="#22D7DA" stroke="#FFFFFF" strokeWidth="1.5" />
      </g>

      {/* Head / Visor Pivot Group */}
      <g transform={`translate(0, -18) rotate(${headTilt})`}>
        {/* Large Expressive White Visor Eyes */}
        <g transform={`translate(-17, 0) scale(1, ${blinkScale})`}>
          <ellipse cx="0" cy="0" rx="13" ry="15" fill="#FFFFFF" stroke="#09134B" strokeWidth="2.2" />
          {/* Luminous Cyan Pupil tracking target */}
          <circle cx={lookAtX * 5} cy={lookAtY * 4} r="5.5" fill="#09134B" />
          <circle cx={lookAtX * 5 + 1.5} cy={lookAtY * 4 - 1.5} r="2.2" fill="#22D7DA" />
        </g>

        <g transform={`translate(17, 0) scale(1, ${blinkScale})`}>
          <ellipse cx="0" cy="0" rx="13" ry="15" fill="#FFFFFF" stroke="#09134B" strokeWidth="2.2" />
          <circle cx={lookAtX * 5} cy={lookAtY * 4} r="5.5" fill="#09134B" />
          <circle cx={lookAtX * 5 + 1.5} cy={lookAtY * 4 - 1.5} r="2.2" fill="#22D7DA" />
        </g>

        {/* Eyebrows */}
        {expression === 'surprised' && (
          <g>
            <path d="M -26 -19 Q -17 -26 -8 -19" stroke="#FFD244" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M 8 -19 Q 17 -26 26 -19" stroke="#FFD244" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          </g>
        )}
        {expression === 'curious' && (
          <g>
            <path d="M -26 -17 Q -17 -23 -8 -18" stroke="#22D7DA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 8 -21 Q 17 -25 26 -21" stroke="#22D7DA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )}
        {expression === 'happy' && (
          <g>
            <path d="M -24 -17 Q -17 -21 -10 -17" stroke="#22D7DA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 10 -17 Q 17 -21 24 -17" stroke="#22D7DA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* Stylized Geometric Warm Amber Beak */}
        <polygon points="0,-4 -8,11 8,11" fill="#FF851D" stroke="#09134B" strokeWidth="1.8" />
        <line x1="-8" y1="11" x2="8" y2="11" stroke="#D97706" strokeWidth="2" />
      </g>

      {/* Front Wing (Right Wing) */}
      <g transform={`translate(28, 14) rotate(${wingRightAngle})`}>
        <path d="M 0 0 C 22 10, 32 40, 14 56 C 4 42, -6 22, 0 0 Z" fill="#09134B" stroke="#243CDB" strokeWidth="2.8" />
      </g>

      {/* Underwater Hydro-Dome Helmet for Scene 5 */}
      {divingHelmet && (
        <circle cx="0" cy="-16" r="54" fill="rgba(34, 215, 218, 0.16)" stroke="#22D7DA" strokeWidth="2.5" />
      )}

      {/* Handheld Props */}
      {holdingProp === 'spotlight' && (
        <g transform="translate(42, 28) rotate(-15)">
          <rect x="0" y="-8" width="28" height="16" rx="4" fill="#334155" stroke="#22D7DA" strokeWidth="2" />
          {/* Sweeping Cone of Light */}
          <polygon points="28,-6 240,-45 240,45 28,6" fill="rgba(34, 215, 218, 0.22)" />
          <polygon points="28,-3 240,-25 240,25 28,3" fill="rgba(255, 255, 255, 0.35)" />
        </g>
      )}

      {holdingProp === 'lantern' && (
        <g transform="translate(42, 26)">
          <line x1="0" y1="0" x2="0" y2="18" stroke="#FFD244" strokeWidth="2.5" />
          <rect x="-10" y="18" width="20" height="26" rx="6" fill="#FF851D" stroke="#FFD244" strokeWidth="2" />
          <circle cx="0" cy="31" r="5" fill="#FFF8E7" />
          <circle cx="0" cy="31" r="22" fill="rgba(255, 210, 68, 0.25)" />
        </g>
      )}

      {holdingProp === 'magnifier' && (
        <g transform="translate(38, 18) rotate(-25)">
          <line x1="0" y1="18" x2="16" y2="38" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="0" r="20" fill="rgba(34, 215, 218, 0.2)" stroke="#22D7DA" strokeWidth="3" />
          {/* Hologram Reticle */}
          <circle cx="0" cy="0" r="12" fill="none" stroke="#22D7DA" strokeWidth="1.2" strokeDasharray="3 3" />
        </g>
      )}
    </g>
  );
};

