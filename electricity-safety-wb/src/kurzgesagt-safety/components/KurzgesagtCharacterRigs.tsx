import React from 'react';

export interface GeometricPuppetProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  frame?: number;
  squashX?: number;
  squashY?: number;
  headTilt?: number;
  leftArmAngle?: number;
  rightArmAngle?: number;
  leftLegAngle?: number;
  rightLegAngle?: number;
  expression?: 'normal' | 'alert' | 'shocked' | 'happy';
  lookAtX?: number;
  lookAtY?: number;
}

export const getBlinkScale = (frame: number, offset = 0): number => {
  const cycle = (frame + offset) % 180; // 60 FPS: blink every ~3.0s
  if (cycle >= 0 && cycle < 3) return 0.5;
  if (cycle >= 3 && cycle < 7) return 0.05;
  if (cycle >= 7 && cycle < 10) return 0.65;
  return 1.0;
};

/**
 * Geometric Mitu Rig (Kurzgesagt Vector Aesthetic)
 */
export const GeometricMitu: React.FC<GeometricPuppetProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  frame = 0,
  squashX = 1,
  squashY = 1,
  headTilt = 0,
  leftArmAngle = 15,
  rightArmAngle = -15,
  leftLegAngle = 0,
  rightLegAngle = 0,
  expression = 'normal',
  lookAtX = 0,
  lookAtY = 0,
}) => {
  const blink = getBlinkScale(frame, 20);
  const breathY = Math.sin(frame * 0.08) * 2.5;
  const hairSway = Math.sin((frame - 4) * 0.12) * 8;

  return (
    <g
      transform={`translate(${x}, ${y + breathY}) scale(${flipX ? -scale : scale}, ${scale}) scale(${squashX}, ${squashY})`}
      style={{ filter: 'drop-shadow(0px 8px 10px rgba(0,0,0,0.4))' }}
    >
      {/* Ground Shadow */}
      <ellipse cx="0" cy="115" rx={36 * squashX} ry={10 * (2 - squashY)} fill="rgba(9, 19, 75, 0.45)" />

      {/* Back Braided Pigtail */}
      <g transform={`translate(-24, -28) rotate(${12 + hairSway})`}>
        <path d="M 0 0 Q -18 20 -10 46" stroke="#09134B" strokeWidth="12" strokeLinecap="round" fill="none" />
        <circle cx="-10" cy="46" r="6" fill="#EF4444" />
      </g>

      {/* Back Arm */}
      <g transform={`translate(-18, -12) rotate(${leftArmAngle})`}>
        <rect x="-6" y="0" width="12" height="38" rx="6" fill="#C47A53" />
        <rect x="-7" y="0" width="14" height="16" rx="4" fill="#FFFFFF" />
      </g>

      {/* Legs */}
      <g transform={`translate(-10, 52) rotate(${leftLegAngle})`}>
        <rect x="-6" y="0" width="12" height="60" rx="6" fill="#C47A53" />
        <ellipse cx="0" cy="60" rx="10" ry="5" fill="#09134B" />
      </g>
      <g transform={`translate(10, 52) rotate(${rightLegAngle})`}>
        <rect x="-6" y="0" width="12" height="60" rx="6" fill="#C47A53" />
        <ellipse cx="0" cy="60" rx="10" ry="5" fill="#09134B" />
      </g>

      {/* Torso & Bold Royal Blue School Uniform (#243CDB) */}
      <path d="M -22 -24 L 22 -24 L 32 52 L -32 52 Z" fill="#243CDB" />
      {/* 2-Tone Shadow */}
      <path d="M 8 -24 L 22 -24 L 32 52 L 12 52 Z" fill="#180A59" opacity="0.35" />
      <polygon points="0,-24 -12,-8 12,-8" fill="#FFFFFF" /> {/* Collar */}

      {/* Head Group */}
      <g transform={`translate(0, -38) rotate(${headTilt})`}>
        {/* Head Base */}
        <circle cx="0" cy="0" r="26" fill="#D97742" />
        <path d="M 8 -24 C 22 -16, 26 12, 10 24 C 20 18, 24 -12, 8 -24 Z" fill="#B45309" opacity="0.4" />
        {/* Black Hair Helmet */}
        <path d="M -26 0 C -26 -28, 26 -28, 26 0 C 18 -14, -14 -14, -26 0 Z" fill="#09134B" />

        {/* Expressive Visor Eyes */}
        <g transform={`translate(-9, -2) scale(1, ${blink})`}>
          <ellipse cx="0" cy="0" rx="7" ry="8.5" fill="#FFFFFF" stroke="#09134B" strokeWidth="1.8" />
          <circle cx={lookAtX * 3} cy={lookAtY * 2.5} r="3.2" fill="#09134B" />
          <circle cx={lookAtX * 3 + 1} cy={lookAtY * 2.5 - 1} r="1.2" fill="#22D7DA" />
        </g>
        <g transform={`translate(9, -2) scale(1, ${blink})`}>
          <ellipse cx="0" cy="0" rx="7" ry="8.5" fill="#FFFFFF" stroke="#09134B" strokeWidth="1.8" />
          <circle cx={lookAtX * 3} cy={lookAtY * 2.5} r="3.2" fill="#09134B" />
          <circle cx={lookAtX * 3 + 1} cy={lookAtY * 2.5 - 1} r="1.2" fill="#22D7DA" />
        </g>

        {/* Mouth */}
        {expression === 'shocked' ? (
          <ellipse cx="0" cy="14" rx="5" ry="6.5" fill="#7F1D1D" stroke="#09134B" strokeWidth="1.5" />
        ) : expression === 'alert' ? (
          <line x1="-5" y1="14" x2="5" y2="14" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          <path d="M -6 12 Q 0 18 6 12" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </g>

      {/* Front Braided Pigtail */}
      <g transform={`translate(24, -28) rotate(${-12 - hairSway})`}>
        <path d="M 0 0 Q 18 20 10 46" stroke="#09134B" strokeWidth="12" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="46" r="6" fill="#EF4444" />
      </g>

      {/* Front Arm */}
      <g transform={`translate(18, -12) rotate(${rightArmAngle})`}>
        <rect x="-6" y="0" width="12" height="38" rx="6" fill="#C47A53" />
        <rect x="-7" y="0" width="14" height="16" rx="4" fill="#FFFFFF" />
      </g>
    </g>
  );
};

/**
 * Geometric Bishu Rig (Kurzgesagt Vector Aesthetic)
 */
export const GeometricBishu: React.FC<GeometricPuppetProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  frame = 0,
  squashX = 1,
  squashY = 1,
  headTilt = 0,
  leftArmAngle = 12,
  rightArmAngle = -12,
  leftLegAngle = 0,
  rightLegAngle = 0,
  expression = 'normal',
  lookAtX = 0,
  lookAtY = 0,
}) => {
  const blink = getBlinkScale(frame, 70);
  const breathY = Math.sin(frame * 0.08) * 2.5;

  return (
    <g
      transform={`translate(${x}, ${y + breathY}) scale(${flipX ? -scale : scale}, ${scale}) scale(${squashX}, ${squashY})`}
      style={{ filter: 'drop-shadow(0px 8px 10px rgba(0,0,0,0.4))' }}
    >
      <ellipse cx="0" cy="125" rx={40 * squashX} ry={11 * (2 - squashY)} fill="rgba(9, 19, 75, 0.45)" />

      {/* Back Arm */}
      <g transform={`translate(-20, -18) rotate(${leftArmAngle})`}>
        <rect x="-7" y="0" width="14" height="44" rx="7" fill="#C47A53" />
        <rect x="-8" y="0" width="16" height="18" rx="5" fill="#8CAAF7" />
      </g>

      {/* Legs */}
      <g transform={`translate(-12, 58) rotate(${leftLegAngle})`}>
        <rect x="-7" y="0" width="14" height="38" rx="6" fill="#180A59" />
        <rect x="-6" y="32" width="12" height="32" rx="5" fill="#C47A53" />
        <ellipse cx="0" cy="64" rx="12" ry="6" fill="#FFD244" />
      </g>
      <g transform={`translate(12, 58) rotate(${rightLegAngle})`}>
        <rect x="-7" y="0" width="14" height="38" rx="6" fill="#180A59" />
        <rect x="-6" y="32" width="12" height="32" rx="5" fill="#C47A53" />
        <ellipse cx="0" cy="64" rx="12" ry="6" fill="#FFD244" />
      </g>

      {/* Torso Shirt (#8CAAF7 Light Blue with Deep Indigo Shorts #180A59) */}
      <rect x="-24" y="-30" width="48" height="54" rx="12" fill="#8CAAF7" />
      <path d="M 6 -30 L 24 -30 L 24 24 L 8 24 Z" fill="#64748B" opacity="0.3" />
      <rect x="-22" y="22" width="44" height="36" rx="8" fill="#180A59" />

      {/* Head */}
      <g transform={`translate(0, -48) rotate(${headTilt})`}>
        <circle cx="0" cy="0" r="28" fill="#C47A53" />
        <path d="M 8 -26 C 24 -16, 28 14, 10 26 C 22 20, 26 -12, 8 -26 Z" fill="#9A3412" opacity="0.35" />
        {/* Hair */}
        <path d="M -28 0 C -30 -32, 30 -32, 28 0 C 18 -18, -14 -18, -28 0 Z" fill="#09134B" />

        {/* Eyes */}
        <g transform={`translate(-10, -2) scale(1, ${blink})`}>
          <ellipse cx="0" cy="0" rx="7.5" ry="9" fill="#FFFFFF" stroke="#09134B" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.2} cy={lookAtY * 2.8} r="3.4" fill="#09134B" />
          <circle cx={lookAtX * 3.2 + 1} cy={lookAtY * 2.8 - 1} r="1.2" fill="#22D7DA" />
        </g>
        <g transform={`translate(10, -2) scale(1, ${blink})`}>
          <ellipse cx="0" cy="0" rx="7.5" ry="9" fill="#FFFFFF" stroke="#09134B" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.2} cy={lookAtY * 2.8} r="3.4" fill="#09134B" />
          <circle cx={lookAtX * 3.2 + 1} cy={lookAtY * 2.8 - 1} r="1.2" fill="#22D7DA" />
        </g>

        {/* Mouth */}
        {expression === 'shocked' ? (
          <ellipse cx="0" cy="15" rx="6" ry="7.5" fill="#7F1D1D" stroke="#09134B" strokeWidth="1.8" />
        ) : (
          <path d="M -7 13 Q 0 20 7 13" fill="none" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </g>

      {/* Front Arm */}
      <g transform={`translate(20, -18) rotate(${rightArmAngle})`}>
        <rect x="-7" y="0" width="14" height="44" rx="7" fill="#C47A53" />
        <rect x="-8" y="0" width="16" height="18" rx="5" fill="#8CAAF7" />
      </g>
    </g>
  );
};

/**
 * Geometric Bidyut Bondhu (Kurzgesagt-Style Glowing Lantern Guardian Mascot)
 */
export const GeometricBidyutBondhu: React.FC<{
  x: number;
  y: number;
  scale?: number;
  frame?: number;
  holdingStopSign?: boolean;
}> = ({ x, y, scale = 1, frame = 0, holdingStopSign = false }) => {
  const hoverY = Math.sin(frame * 0.1) * 8;
  const pulseR = 72 + Math.sin(frame * 0.14) * 8;
  const blink = getBlinkScale(frame, 110);

  return (
    <g transform={`translate(${x}, ${y + hoverY}) scale(${scale})`}>
      {/* Radial Energy Halo */}
      <circle cx="0" cy="0" r={pulseR} fill="rgba(255, 210, 68, 0.22)" />
      <circle cx="0" cy="0" r={pulseR * 0.65} fill="rgba(34, 215, 218, 0.18)" />

      {/* Lantern Handle & Brass Top */}
      <path d="M -26 -52 Q 0 -82 26 -52" fill="none" stroke="#FFD244" strokeWidth="5.5" strokeLinecap="round" />
      <polygon points="-28,-38 28,-38 20,-52 -20,-52" fill="#FF851D" stroke="#FFD244" strokeWidth="2" />

      {/* Glass Body */}
      <rect x="-30" y="-38" width="60" height="74" rx="22" fill="#FFD244" stroke="#FF851D" strokeWidth="3.5" />
      <circle cx="0" cy="2" r="16" fill="#FFFFFF" opacity="0.6" />

      {/* Eyes */}
      <g transform={`scale(1, ${blink})`}>
        <circle cx="-11" cy="-10" r="5.5" fill="#09134B" />
        <circle cx="-9" cy="-12" r="2" fill="#FFFFFF" />
        <circle cx="11" cy="-10" r="5.5" fill="#09134B" />
        <circle cx="13" cy="-12" r="2" fill="#FFFFFF" />
      </g>
      <path d="M -10 10 Q 0 20 10 10" fill="none" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />

      {/* Base with Bengali Emblem */}
      <rect x="-34" y="34" width="68" height="20" rx="6" fill="#FF851D" stroke="#FFD244" strokeWidth="2" />
      <text x="0" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
        বিদ্যুৎ বন্ধু
      </text>

      {/* Stop Sign Shield */}
      {holdingStopSign && (
        <g transform="translate(62, -10)">
          <circle cx="0" cy="0" r="26" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3.5" />
          <path d="M -10 -10 L 10 10 M 10 -10 L -10 10" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};
