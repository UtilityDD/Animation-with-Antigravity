import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { EditorialDefs } from '../EditorialDefs';
import { EditorialBishu } from '../EditorialCharacters';
import { anticipationEase, editorialSnappy } from '../../motionCurves';

/**
 * Scene 4: The Bunny Hop & Shuffle Solution
 * Duration: 780 frames (0:25 - 0:38)
 * Narrative: Demonstrates the physics solution: keeping feet locked together yields ΔV = 0.
 * Bishu demonstrates consecutive bunny hops retreating beyond the 30-foot (10m) safe perimeter.
 */
export const EditorialScene4BunnyHop: React.FC = () => {
  const frame = useCurrentFrame();

  // Wide cinematic tracking shot as Bishu retreats leftward
  const camProgress = Math.min(1, frame / 780);
  const camX = interpolate(camProgress, [0, 1], [-80, 120]);

  // Multiple consecutive hops:
  // Each hop cycle is 120 frames (2 seconds)
  const hopCycleFrame = frame % 130;
  let hopElevation = 0;
  let hopSquashY = 1;
  let hopSquashX = 1;
  let kneeBend = 0;
  let bodyAngle = 0;

  if (hopCycleFrame < 30) {
    // Phase 1: Anticipation crouch
    const t = hopCycleFrame / 30;
    const eased = anticipationEase(t);
    hopElevation = 0;
    hopSquashY = interpolate(eased, [0, 1], [1, 0.76]);
    hopSquashX = 1 / hopSquashY;
    kneeBend = interpolate(eased, [0, 1], [0, 24]);
    bodyAngle = -6;
  } else if (hopCycleFrame >= 30 && hopCycleFrame < 85) {
    // Phase 2: Parabolic hop through air with feet locked together
    const t = (hopCycleFrame - 30) / 55;
    const arc = Math.sin(t * Math.PI);
    hopElevation = arc * 210;
    hopSquashY = 1 + arc * 0.28;
    hopSquashX = 1 / hopSquashY;
    kneeBend = 4; // Feet locked tight!
    bodyAngle = interpolate(t, [0, 1], [-10, 8]);
  } else {
    // Phase 3: Cushioned landing & recovery
    const t = (hopCycleFrame - 85) / 45;
    const eased = editorialSnappy(t);
    const impact = Math.exp(-0.14 * (hopCycleFrame - 85)) * Math.cos(0.4 * (hopCycleFrame - 85));
    hopElevation = 0;
    hopSquashY = 1 - impact * 0.32;
    hopSquashX = 1 / hopSquashY;
    kneeBend = Math.max(0, impact * 14);
    bodyAngle = interpolate(eased, [0, 1], [6, 0]);
  }

  // Progressive overall displacement across the 780-frame scene
  const totalX = interpolate(frame, [0, 780], [1180, 480]);

  // Safe boundary indicator (30 Feet / 10 Meters)
  const boundaryX = 720;
  const isPastBoundary = totalX < boundaryX;

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        transform: `translate(${camX}px, 0px)`,
        transformOrigin: '960px 540px',
      }}
    >
      <EditorialDefs />

      {/* Atmospheric Background */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-storm)" />

      {/* Ground Terrain */}
      <path
        d="M -200 710 Q 560 690 1200 705 T 2120 700 L 2120 1080 L -200 1080 Z"
        fill="url(#wet-ground)"
      />

      {/* 30-Foot / 10-Meter Safe Perimeter Vertical Boundary Line */}
      <g transform={`translate(${boundaryX}, 0)`}>
        <line x1="0" y1="200" x2="0" y2="720" stroke="#1DD1A1" strokeWidth="2.5" strokeDasharray="10 8" opacity="0.6" />
        <rect x="-80" y="240" width="160" height="32" rx="6" fill="#0D1333" stroke="#1DD1A1" strokeWidth="1.5" />
        <text x="0" y="261" textAnchor="middle" fill="#1DD1A1" fontSize="13" fontWeight="bold" fontFamily="monospace">
          SAFE PERIMETER (10m)
        </text>
      </g>

      {/* Wire Impact Epicenter on Far Right */}
      <g transform="translate(1620, 705)">
        <path d="M 180 -380 Q 80 -120 0 0" fill="none" stroke="#64748B" strokeWidth="6" />
        <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="32" fill="none" stroke="#FF5E57" strokeWidth="3" opacity="0.8" />
        <text x="0" y="-45" textAnchor="middle" fill="#FF5E57" fontSize="14" fontWeight="bold" fontFamily="monospace">
          11 kV SOURCE
        </text>
      </g>

      {/* Bishu Executing the Bunny Hop */}
      <EditorialBishu
        x={totalX}
        y={680 - hopElevation}
        scale={1.35}
        frame={frame}
        squashX={hopSquashX}
        squashY={hopSquashY}
        bodyAngle={bodyAngle}
        leftArmAngle={hopElevation > 0 ? -45 : 15}
        rightArmAngle={hopElevation > 0 ? 45 : -20}
        kneeBend={kneeBend}
        lookAtX={-0.8}
        lookAtY={0.1}
        expression={isPastBoundary ? 'focused' : 'shocked'}
      />

      {/* Floating Scientific Law Badge: ΔV = 0 (Zero Potential Delta) */}
      <g
        transform={`translate(${totalX}, ${480 - hopElevation * 0.5})`}
        filter="url(#ambient-ground-shadow)"
      >
        <rect x="-110" y="-30" width="220" height="54" rx="12" fill="rgba(6, 9, 31, 0.94)" stroke="#1DD1A1" strokeWidth="2" />
        <text x="0" y="-5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700" letterSpacing="0.08em" fontFamily="monospace">
          LOCKED FEET RULE
        </text>
        <text x="0" y="16" textAnchor="middle" fill="#1DD1A1" fontSize="18" fontWeight="900" fontFamily="monospace">
          &Delta;V = 0 VOLTS ✔️
        </text>
      </g>
    </svg>
  );
};

