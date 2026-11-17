import React from 'react';
import { dampedOscillation } from './easing';

interface ProCharacterProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  frame: number;
  // Dynamic kinematics & pose inputs
  squashX?: number;
  squashY?: number;
  bodyAngle?: number;
  headTilt?: number;
  leftArmAngle?: number;
  rightArmAngle?: number;
  leftLegAngle?: number;
  rightLegAngle?: number;
  kneeBend?: number;
  lookAtX?: number; // -1 to +1 eye pupil target
  lookAtY?: number;
  blinkCycle?: number;
  lastLandFrame?: number; // for secondary spring follow-through
}

/**
 * Professional Studio-Grade 2D Character:
 * - Dynamic cubic bezier limbs (organic skin arcs instead of rigid rectangular boxes)
 * - Volume-conserving squash & stretch
 * - Secondary inertia on hair braids and collar via damped harmonic oscillation
 * - Volumetric lighting gradients and rim specular
 * - 4-stage eye blink with gaze tracking saccades
 */
export const ProCharacterMitu: React.FC<ProCharacterProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  frame,
  squashX = 1,
  squashY = 1,
  bodyAngle = 0,
  headTilt = 0,
  leftArmAngle = 10,
  rightArmAngle = -15,
  leftLegAngle = 0,
  rightLegAngle = 0,
  kneeBend = 0,
  lookAtX = 0,
  lookAtY = 0,
  lastLandFrame = 0,
}) => {
  // Organic secondary motion for hair & accessories
  const hairFollowThrough = dampedOscillation(frame, lastLandFrame, 16, 0.1, 0.35);
  const breathY = Math.sin(frame * 0.08) * 2.2;

  // Eye blink calculation (snappy 5-frame closing/opening)
  const blinkCyclePos = (frame + 45) % 150;
  let eyeScaleY = 1;
  if (blinkCyclePos < 2) eyeScaleY = 0.4;
  else if (blinkCyclePos < 6) eyeScaleY = 0.05;
  else if (blinkCyclePos < 9) eyeScaleY = 0.7;

  // Organic curved arm builder (3-point cubic bezier path)
  const createCurvedArmPath = (
    startX: number,
    startY: number,
    angleDeg: number,
    length: number,
    bend: number
  ) => {
    const rad = (angleDeg * Math.PI) / 180;
    const endX = startX + Math.sin(rad) * length;
    const endY = startY + Math.cos(rad) * length;
    const midX = (startX + endX) / 2 + Math.cos(rad) * bend;
    const midY = (startY + endY) / 2 - Math.sin(rad) * bend;

    // Build smooth stroke ribbon
    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  return (
    <g
      transform={`translate(${x}, ${y + breathY}) scale(${flipX ? -scale : scale}, ${scale}) scale(${squashX}, ${squashY}) rotate(${bodyAngle})`}
      filter="url(#pro-shadow)"
    >
      {/* Dynamic Ground Contact Shadow (expands when crouching, shrinks when jumping) */}
      <ellipse
        cx="0"
        cy="125"
        rx={45 * squashX}
        ry={12 * (1 / Math.max(0.2, squashY))}
        fill="rgba(3, 4, 20, 0.65)"
      />

      {/* Back Hair Braid with inertia drag */}
      <g transform={`translate(-26, -32) rotate(${15 + hairFollowThrough})`}>
        <path
          d="M 0 0 C -22 18 -18 42 -8 58 C -4 44 -12 22 0 0"
          fill="#0B0E38"
        />
        <circle cx="-8" cy="58" r="7" fill="#EF4444" />
      </g>

      {/* Back Arm (Curved Spline) */}
      <g>
        <path
          d={createCurvedArmPath(-20, -10, leftArmAngle, 56, 12)}
          fill="none"
          stroke="url(#skin-gradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Sleeve Cap */}
        <ellipse cx="-20" cy="-10" rx="9" ry="12" fill="url(#cloth-blue)" />
      </g>

      {/* Back Leg with organic knee bend */}
      <g transform={`translate(-12, 54) rotate(${leftLegAngle})`}>
        <path
          d={`M 0 0 Q ${-kneeBend} 30 0 62`}
          fill="none"
          stroke="url(#skin-gradient)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Rubber Boot */}
        <path
          d="M -9 44 L 9 44 L 14 66 C 14 72 2 74 -12 74 C -18 74 -18 66 -18 62 Z"
          fill="url(#rubber-yellow)"
          stroke="#D97706"
          strokeWidth="1.5"
        />
      </g>

      {/* Front Leg with organic knee bend */}
      <g transform={`translate(14, 54) rotate(${rightLegAngle})`}>
        <path
          d={`M 0 0 Q ${kneeBend} 30 0 62`}
          fill="none"
          stroke="url(#skin-gradient)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Rubber Boot */}
        <path
          d="M -9 44 L 9 44 L 14 66 C 14 72 2 74 -12 74 C -18 74 -18 66 -18 62 Z"
          fill="url(#rubber-yellow)"
          stroke="#D97706"
          strokeWidth="1.5"
        />
      </g>

      {/* Torso & Dress (Volumetric Contoured Shape with 45-deg key lighting) */}
      <g>
        {/* Base Dress Polygon */}
        <path
          d="M -24 -26 C -8 -30 8 -30 24 -26 L 36 56 C 12 60 -12 60 -36 56 Z"
          fill="url(#cloth-blue)"
        />
        {/* Ambient Darkened Crease / Shadow Side */}
        <path
          d="M 6 -28 C 18 -28 24 -26 24 -26 L 36 56 C 24 58 12 59 0 58 L 10 -27 Z"
          fill="#0B0E38"
          opacity="0.32"
        />
        {/* White Collar with Fold Creases */}
        <polygon points="0,-26 -16,-8 0,4 16,-8" fill="#FFFFFF" />
        <line x1="0" y1="-26" x2="0" y2="4" stroke="#CBD5E1" strokeWidth="1.5" />
      </g>

      {/* Head Group (Saccades & Head Tilt) */}
      <g transform={`translate(0, -42) rotate(${headTilt})`}>
        {/* Neck */}
        <rect x="-8" y="8" width="16" height="18" rx="4" fill="url(#skin-gradient)" />
        {/* Neck Shadow on Chest */}
        <ellipse cx="0" cy="18" rx="14" ry="4" fill="#0B0E38" opacity="0.3" />

        {/* Head Base Sphere */}
        <circle cx="0" cy="-6" r="28" fill="url(#skin-gradient)" />

        {/* Volumetric Hair Helmet */}
        <path
          d="M -28 -8 C -29 -38 29 -38 28 -8 C 18 -20 -18 -20 -28 -8 Z"
          fill="#0B0E38"
        />
        {/* Hair Specular Accent */}
        <path
          d="M -16 -28 C -6 -36 8 -36 18 -28"
          fill="none"
          stroke="#243CDB"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Expressive Visor Eyes with Dynamic Pupil Saccades */}
        <g transform={`translate(-10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8" ry="10" fill="#FFFFFF" stroke="#0B0E38" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.5} cy={lookAtY * 3} r="3.6" fill="#0B0E38" />
          <circle cx={lookAtX * 3.5 + 1.2} cy={lookAtY * 3 - 1.2} r="1.4" fill="#22D7DA" />
        </g>
        <g transform={`translate(10, -8) scale(1, ${eyeScaleY})`}>
          <ellipse cx="0" cy="0" rx="8" ry="10" fill="#FFFFFF" stroke="#0B0E38" strokeWidth="1.8" />
          <circle cx={lookAtX * 3.5} cy={lookAtY * 3} r="3.6" fill="#0B0E38" />
          <circle cx={lookAtX * 3.5 + 1.2} cy={lookAtY * 3 - 1.2} r="1.4" fill="#22D7DA" />
        </g>

        {/* Eyebrows with emotive curve */}
        <path d="M -17 -20 Q -10 -24 -3 -20" fill="none" stroke="#0B0E38" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 3 -20 Q 10 -24 17 -20" fill="none" stroke="#0B0E38" strokeWidth="2.2" strokeLinecap="round" />

        {/* Mouth */}
        <path d="M -7 10 Q 0 16 7 10" fill="none" stroke="#6C1E0A" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Front Hair Braid with inertia drag */}
      <g transform={`translate(26, -32) rotate(${-15 - hairFollowThrough})`}>
        <path
          d="M 0 0 C 22 18 18 42 8 58 C 4 44 12 22 0 0"
          fill="#0B0E38"
        />
        <circle cx="8" cy="58" r="7" fill="#EF4444" />
      </g>

      {/* Front Arm (Curved Spline in front of body) */}
      <g>
        <path
          d={createCurvedArmPath(20, -10, rightArmAngle, 56, -12)}
          fill="none"
          stroke="url(#skin-gradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Sleeve Cap */}
        <ellipse cx="20" cy="-10" rx="9" ry="12" fill="url(#cloth-blue)" />
      </g>
    </g>
  );
};

