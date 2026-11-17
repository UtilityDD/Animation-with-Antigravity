import React from 'react';
import { dampedSpring } from '../KineticTypography';

export interface ExpressiveActorProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  frame: number;
  // Kinematic parameters
  squashX?: number;
  squashY?: number;
  bodyLean?: number;
  headTilt?: number;
  leftArmAngle?: number;
  rightArmAngle?: number;
  leftLegAngle?: number;
  rightLegAngle?: number;
  kneeBend?: number;
  lookAtX?: number; // pupil targeting (-1 to +1)
  lookAtY?: number;
  expression?: 'alert' | 'shocked' | 'explaining' | 'happy' | 'cautious';
  impactFrame?: number;
  holdingBamboo?: boolean;
}

/**
 * Expressive Mitu Rig:
 * Independent head, emotive brows, mouth phonemes, organic curved limbs,
 * pupil saccades, and secondary hair inertia.
 */
export const ExpressiveMitu: React.FC<ExpressiveActorProps> = ({
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
  rightArmAngle = -15,
  leftLegAngle = 0,
  rightLegAngle = 0,
  kneeBend = 0,
  lookAtX = 0,
  lookAtY = 0,
  expression = 'explaining',
  impactFrame = 0,
  holdingBamboo = false,
}) => {
  // Secondary hair recoil on impacts/motion
  const hairRecoil = dampedSpring(frame, impactFrame, 16, 0.12, 0.35);
  const breathY = Math.sin(frame * 0.08) * 2.2;

  // Eye blink (3.2s cycle = 192 frames)
  const blinkCycle = (frame + 35) % 192;
  let eyeScaleY = 1;
  if (blinkCycle < 2) eyeScaleY = 0.4;
  else if (blinkCycle < 5) eyeScaleY = 0.05;
  else if (blinkCycle < 8) eyeScaleY = 0.7;

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
      filter="drop-shadow(0 12px 18px rgba(3, 5, 20, 0.6))"
    >
      {/* Ground Contact Shadow */}
      <ellipse
        cx="0"
        cy="126"
        rx={46 * squashX}
        ry={12 * (1 / Math.max(0.3, squashY))}
        fill="rgba(4, 7, 23, 0.65)"
      />

      {/* Back Hair Braid (with inertia drag) */}
      <g transform={`translate(-25, -34) rotate(${12 + hairRecoil})`}>
        <path d="M 0 0 C -20 18 -16 44 -6 60 C -2 46 -10 22 0 0" fill="#0D1333" />
        <circle cx="-6" cy="60" r="6.5" fill="#FF5E57" />
      </g>

      {/* Back Arm */}
      <g>
        <path
          d={createSplineLimb(-22, -12, leftArmAngle, 56, 10)}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <ellipse cx="-22" cy="-12" rx="9" ry="11" fill="url(#uniform-royal)" />
      </g>

      {/* Legs & Knee Bends */}
      <g transform={`translate(-13, 52) rotate(${leftLegAngle})`}>
        <path
          d={`M 0 0 Q ${-kneeBend} 28 0 62`}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Rubber Boot */}
        <path
          d="M -9 42 L 9 42 L 14 66 C 14 73 2 75 -12 75 C -18 75 -18 67 -18 63 Z"
          fill="url(#boot-gum)"
          stroke="#B37805"
          strokeWidth="1.5"
        />
      </g>

      <g transform={`translate(13, 52) rotate(${rightLegAngle})`}>
        <path
          d={`M 0 0 Q ${kneeBend} 28 0 62`}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M -9 42 L 9 42 L 14 66 C 14 73 2 75 -12 75 C -18 75 -18 67 -18 63 Z"
          fill="url(#boot-gum)"
          stroke="#B37805"
          strokeWidth="1.5"
        />
      </g>

      {/* Torso & Dress */}
      <g>
        <path d="M -24 -28 C -8 -31 8 -31 24 -28 L 34 54 C 12 58 -12 58 -34 54 Z" fill="url(#uniform-royal)" />
        <path d="M 6 -30 C 18 -30 24 -28 24 -28 L 34 54 C 22 56 12 57 0 56 L 8 -29 Z" fill="#0D1333" opacity="0.35" />
        <polygon points="0,-28 -15,-10 0,2 15,-10" fill="#FFFFFF" />
        <line x1="0" y1="-28" x2="0" y2="2" stroke="#CBD5E1" strokeWidth="1.5" />
      </g>

      {/* Head Group with Expressive Facial Rig */}
      <g transform={`translate(0, -44) rotate(${headTilt})`}>
        <rect x="-8" y="8" width="16" height="18" rx="4" fill="url(#skin-warm)" />
        <circle cx="0" cy="-6" r="28" fill="url(#skin-warm)" />

        {/* Styled Hair Silhouette */}
        <path d="M -28 -8 C -29 -38 29 -38 28 -8 C 18 -20 -18 -20 -28 -8 Z" fill="#0D1333" />
        <path d="M -15 -27 C -6 -35 8 -35 17 -27" fill="none" stroke="#3858E9" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />

        {/* Eyes & Saccades */}
        <g transform={`translate(-10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8" ry="9.5" fill="#FFFFFF" stroke="#0D1333" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.5} cy={lookAtY * 3} r="3.6" fill="#0D1333" />
          <circle cx={lookAtX * 3.5 + 1.2} cy={lookAtY * 3 - 1.2} r="1.4" fill="#1DD1A1" />
        </g>
        <g transform={`translate(10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8" ry="9.5" fill="#FFFFFF" stroke="#0D1333" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.5} cy={lookAtY * 3} r="3.6" fill="#0D1333" />
          <circle cx={lookAtX * 3.5 + 1.2} cy={lookAtY * 3 - 1.2} r="1.4" fill="#1DD1A1" />
        </g>

        {/* Dynamic Eyebrows & Mouth Expressions */}
        {expression === 'shocked' ? (
          <>
            <path d="M -17 -24 Q -10 -26 -3 -20" fill="none" stroke="#0D1333" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 3 -20 Q 10 -26 17 -24" fill="none" stroke="#0D1333" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="0" cy="14" r="5.5" fill="#782314" stroke="#0D1333" strokeWidth="1.5" />
          </>
        ) : expression === 'happy' ? (
          <>
            <path d="M -16 -20 Q -10 -23 -4 -19" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 4 -19 Q 10 -23 16 -20" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M -7 10 Q 0 18 7 10" fill="none" stroke="#6C1E0A" strokeWidth="2.6" strokeLinecap="round" />
          </>
        ) : expression === 'cautious' ? (
          <>
            <path d="M -16 -22 Q -10 -20 -4 -22" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 4 -22 Q 10 -20 16 -22" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-6" y1="12" x2="6" y2="12" stroke="#6C1E0A" strokeWidth="2.4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M -16 -20 Q -10 -23 -4 -19" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 4 -19 Q 10 -23 16 -20" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M -5 12 Q 0 16 5 12" fill="none" stroke="#6C1E0A" strokeWidth="2.4" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Front Hair Braid */}
      <g transform={`translate(25, -34) rotate(${-12 - hairRecoil})`}>
        <path d="M 0 0 C 20 18 16 44 6 60 C 2 46 10 22 0 0" fill="#0D1333" />
        <circle cx="6" cy="60" r="6.5" fill="#FF5E57" />
      </g>

      {/* Front Arm */}
      <g>
        <path
          d={createSplineLimb(22, -12, rightArmAngle, 56, -10)}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <ellipse cx="22" cy="-12" rx="9" ry="11" fill="url(#uniform-royal)" />
      </g>

      {/* Bamboo Pole Accessory */}
      {holdingBamboo && (
        <g transform="translate(32, 16) rotate(-18)">
          <rect x="-8" y="-12" width="280" height="15" rx="5" fill="#FFD152" stroke="#B37805" strokeWidth="2" />
          <line x1="70" y1="-12" x2="70" y2="3" stroke="#8A5802" strokeWidth="3" />
          <line x1="140" y1="-12" x2="140" y2="3" stroke="#8A5802" strokeWidth="3" />
          <line x1="210" y1="-12" x2="210" y2="3" stroke="#8A5802" strokeWidth="3" />
        </g>
      )}
    </g>
  );
};

/**
 * Expressive Bishu Rig:
 * Independent shorts, curved spline legs, dynamic torso compression,
 * expressive brows, and full bunny-hop kinematics.
 */
export const ExpressiveBishu: React.FC<ExpressiveActorProps> = ({
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
  expression = 'alert',
}) => {
  const breathY = Math.sin(frame * 0.08 + 1) * 2.2;
  const blinkCycle = (frame + 70) % 180;
  let eyeScaleY = 1;
  if (blinkCycle < 2) eyeScaleY = 0.4;
  else if (blinkCycle < 5) eyeScaleY = 0.05;
  else if (blinkCycle < 8) eyeScaleY = 0.7;

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
      filter="drop-shadow(0 12px 18px rgba(3, 5, 20, 0.6))"
    >
      <ellipse
        cx="0"
        cy="128"
        rx={46 * squashX}
        ry={12 * (1 / Math.max(0.3, squashY))}
        fill="rgba(4, 7, 23, 0.65)"
      />

      {/* Back Arm */}
      <g>
        <path
          d={createSplineLimb(-22, -14, leftArmAngle, 58, 12)}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <rect x="-28" y="-18" width="16" height="18" rx="6" fill="url(#shirt-slate)" />
      </g>

      {/* Legs & Shorts */}
      <g transform={`translate(-12, 54) rotate(${leftLegAngle})`}>
        <rect x="-8" y="0" width="16" height="24" rx="4" fill="#0D1333" />
        <path
          d={`M 0 20 Q ${-kneeBend} 42 0 66`}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M -9 46 L 9 46 L 14 68 C 14 74 2 76 -12 76 C -18 76 -18 68 -18 64 Z"
          fill="url(#boot-gum)"
          stroke="#B37805"
          strokeWidth="1.5"
        />
      </g>

      <g transform={`translate(12, 54) rotate(${rightLegAngle})`}>
        <rect x="-8" y="0" width="16" height="24" rx="4" fill="#0D1333" />
        <path
          d={`M 0 20 Q ${kneeBend} 42 0 66`}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M -9 46 L 9 46 L 14 68 C 14 74 2 76 -12 76 C -18 76 -18 68 -18 64 Z"
          fill="url(#boot-gum)"
          stroke="#B37805"
          strokeWidth="1.5"
        />
      </g>

      {/* Torso & Shirt */}
      <rect x="-24" y="-28" width="48" height="56" rx="10" fill="url(#shirt-slate)" />
      <path d="M 6 -28 L 24 -28 L 24 28 L 8 28 Z" fill="#0D1333" opacity="0.32" />
      <polygon points="0,-28 -12,-12 0,0 12,-12" fill="#FFFFFF" />

      {/* Head Group */}
      <g transform={`translate(0, -48) rotate(${headTilt})`}>
        <rect x="-8" y="8" width="16" height="18" rx="4" fill="url(#skin-warm)" />
        <circle cx="0" cy="-6" r="28" fill="url(#skin-warm)" />

        <path d="M -29 -4 C -30 -36 30 -36 29 -4 C 18 -16 -18 -16 -29 -4 Z" fill="#0D1333" />
        <path d="M -18 -26 C -8 -34 8 -34 18 -26" fill="none" stroke="#8EA3E8" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />

        {/* Eyes & Saccades */}
        <g transform={`translate(-10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8" ry="9.5" fill="#FFFFFF" stroke="#0D1333" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.5} cy={lookAtY * 3} r="3.6" fill="#0D1333" />
          <circle cx={lookAtX * 3.5 + 1.2} cy={lookAtY * 3 - 1.2} r="1.4" fill="#1DD1A1" />
        </g>
        <g transform={`translate(10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8" ry="9.5" fill="#FFFFFF" stroke="#0D1333" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.5} cy={lookAtY * 3} r="3.6" fill="#0D1333" />
          <circle cx={lookAtX * 3.5 + 1.2} cy={lookAtY * 3 - 1.2} r="1.4" fill="#1DD1A1" />
        </g>

        {expression === 'shocked' ? (
          <>
            <path d="M -16 -22 Q -10 -25 -4 -18" fill="none" stroke="#0D1333" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 4 -18 Q 10 -25 16 -22" fill="none" stroke="#0D1333" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="0" cy="14" r="6" fill="#782314" stroke="#0D1333" strokeWidth="1.6" />
          </>
        ) : (
          <>
            <path d="M -16 -20 Q -10 -23 -4 -19" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 4 -19 Q 10 -23 16 -20" fill="none" stroke="#0D1333" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M -7 10 Q 0 16 7 10" fill="none" stroke="#6C1E0A" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Front Arm */}
      <g>
        <path
          d={createSplineLimb(22, -14, rightArmAngle, 58, -12)}
          fill="none"
          stroke="url(#skin-warm)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <rect x="12" y="-18" width="16" height="18" rx="6" fill="url(#shirt-slate)" />
      </g>
    </g>
  );
};
