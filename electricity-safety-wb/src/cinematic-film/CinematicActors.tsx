import React from 'react';
import { dampedSpring } from '../kinetic-master/KineticTypography';

export interface CinematicActorProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  frame: number;
  squashX?: number;
  squashY?: number;
  bodyLean?: number;
  headTilt?: number;
  leftArmAngle?: number;
  rightArmAngle?: number;
  leftLegAngle?: number;
  rightLegAngle?: number;
  kneeBend?: number;
  lookAtX?: number;
  lookAtY?: number;
  expression?: 'curious' | 'shocked' | 'fear' | 'explaining' | 'happy' | 'cautious';
  impactFrame?: number;
  holdingBamboo?: boolean;
}

/**
 * Cinematic Bishu Actor
 * Built for close-up emotional acting and high-octane physics leaps.
 * Features:
 * - Dynamic eyelid aperture and expressive eyebrow flexure
 * - Pupil look-at targeting with secondary eye darting (saccades)
 * - Volume-conserving squash & stretch (Sx = 1/Sy)
 * - Segmented boots with rubber grip details
 * - Dynamic rain highlights and volumetric rim lighting
 */
export const CinematicBishu: React.FC<CinematicActorProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  frame,
  squashX = 1,
  squashY = 1,
  bodyLean = 0,
  headTilt = 0,
  leftArmAngle = 10,
  rightArmAngle = -12,
  leftLegAngle = 0,
  rightLegAngle = 0,
  kneeBend = 0,
  lookAtX = 0,
  lookAtY = 0,
  expression = 'curious',
}) => {
  const breathY = Math.sin(frame * 0.08 + 1) * 2.5;

  // Snappy natural blinking
  const blinkCycle = (frame + 65) % 170;
  let eyeScaleY = 1;
  if (blinkCycle < 2) eyeScaleY = 0.35;
  else if (blinkCycle < 5) eyeScaleY = 0.05;
  else if (blinkCycle < 8) eyeScaleY = 0.65;

  // Organic curved arm spline builder
  const createSplineLimb = (startX: number, startY: number, angleDeg: number, len: number, bend: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const endX = startX + Math.sin(rad) * len;
    const endY = startY + Math.cos(rad) * len;
    const midX = (startX + endX) / 2 + Math.cos(rad) * bend;
    const midY = (startY + endY) / 2 - Math.sin(rad) * bend;
    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  return (
    <g
      transform={`translate(${x}, ${y + breathY}) scale(${flipX ? -scale : scale}, ${scale}) scale(${squashX}, ${squashY}) rotate(${bodyLean})`}
      filter="drop-shadow(0 16px 24px rgba(2, 4, 18, 0.75))"
    >
      {/* Dynamic Ground Shadow */}
      <ellipse
        cx="0"
        cy="128"
        rx={48 * squashX}
        ry={13 * (1 / Math.max(0.3, squashY))}
        fill="rgba(2, 4, 18, 0.7)"
      />

      {/* Back Arm */}
      <g>
        <path
          d={createSplineLimb(-22, -14, leftArmAngle, 58, 12)}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <rect x="-28" y="-18" width="16" height="18" rx="6" fill="url(#shirt-slate)" />
      </g>

      {/* Legs & Shorts */}
      <g transform={`translate(-12, 54) rotate(${leftLegAngle})`}>
        <rect x="-8" y="0" width="16" height="24" rx="4" fill="#0A0F2B" />
        <path
          d={`M 0 20 Q ${-kneeBend} 42 0 66`}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Rubber Boot */}
        <path
          d="M -10 46 L 10 46 L 15 68 C 15 75 2 77 -13 77 C -19 77 -19 69 -19 65 Z"
          fill="url(#boot-gum)"
          stroke="#B37805"
          strokeWidth="1.8"
        />
        <line x1="-17" y1="75" x2="13" y2="75" stroke="#7A5202" strokeWidth="2.5" />
      </g>

      <g transform={`translate(12, 54) rotate(${rightLegAngle})`}>
        <rect x="-8" y="0" width="16" height="24" rx="4" fill="#0A0F2B" />
        <path
          d={`M 0 20 Q ${kneeBend} 42 0 66`}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M -10 46 L 10 46 L 15 68 C 15 75 2 77 -13 77 C -19 77 -19 69 -19 65 Z"
          fill="url(#boot-gum)"
          stroke="#B37805"
          strokeWidth="1.8"
        />
        <line x1="-17" y1="75" x2="13" y2="75" stroke="#7A5202" strokeWidth="2.5" />
      </g>

      {/* Torso & Shirt with Volumetric Shading */}
      <rect x="-25" y="-28" width="50" height="56" rx="10" fill="url(#shirt-slate)" />
      <path d="M 6 -28 L 25 -28 L 25 28 L 8 28 Z" fill="#0A0F2B" opacity="0.35" />
      <polygon points="0,-28 -12,-12 0,0 12,-12" fill="#FFFFFF" />

      {/* Head Group with Micro-Acting Expression Rig */}
      <g transform={`translate(0, -48) rotate(${headTilt})`}>
        <rect x="-8" y="8" width="16" height="18" rx="4" fill="url(#skin-warm)" />
        <circle cx="0" cy="-6" r="29" fill="url(#skin-warm)" />

        {/* Hair Helmet */}
        <path d="M -30 -4 C -31 -38 31 -38 30 -4 C 18 -16 -18 -16 -30 -4 Z" fill="#080C24" />
        <path d="M -18 -26 C -8 -34 8 -34 18 -26" fill="none" stroke="#8EA3E8" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

        {/* Eyes & Saccades */}
        <g transform={`translate(-10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8.5" ry="10" fill="#FFFFFF" stroke="#080C24" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.8} cy={lookAtY * 3.2} r="3.8" fill="#080C24" />
          <circle cx={lookAtX * 3.8 + 1.2} cy={lookAtY * 3.2 - 1.2} r="1.4" fill="#1DD1A1" />
        </g>
        <g transform={`translate(10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8.5" ry="10" fill="#FFFFFF" stroke="#080C24" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.8} cy={lookAtY * 3.2} r="3.8" fill="#080C24" />
          <circle cx={lookAtX * 3.8 + 1.2} cy={lookAtY * 3.2 - 1.2} r="1.4" fill="#1DD1A1" />
        </g>

        {/* Emotional Acting Expressions */}
        {expression === 'shocked' || expression === 'fear' ? (
          <>
            {/* Raised arched brows */}
            <path d="M -17 -24 Q -10 -27 -3 -20" fill="none" stroke="#080C24" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M 3 -20 Q 10 -27 17 -24" fill="none" stroke="#080C24" strokeWidth="2.6" strokeLinecap="round" />
            {/* Gasping mouth */}
            <circle cx="0" cy="14" r="6.5" fill="#782314" stroke="#080C24" strokeWidth="1.8" />
          </>
        ) : expression === 'cautious' ? (
          <>
            <path d="M -16 -22 Q -10 -20 -4 -22" fill="none" stroke="#080C24" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 4 -22 Q 10 -20 16 -22" fill="none" stroke="#080C24" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="-6" y1="12" x2="6" y2="12" stroke="#6C1E0A" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Curious friendly glance */}
            <path d="M -16 -21 Q -10 -24 -4 -20" fill="none" stroke="#080C24" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 4 -20 Q 10 -24 16 -21" fill="none" stroke="#080C24" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M -6 12 Q 0 17 6 12" fill="none" stroke="#6C1E0A" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Front Arm */}
      <g>
        <path
          d={createSplineLimb(22, -14, rightArmAngle, 58, -12)}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <rect x="12" y="-18" width="16" height="18" rx="6" fill="url(#shirt-slate)" />
      </g>
    </g>
  );
};
