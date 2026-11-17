import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { EditorialDefs } from '../EditorialDefs';
import { editorialSnappy } from '../../motionCurves';

/**
 * Scene 3: The Physics of Step Potential (ধাপ বিভব)
 * Duration: 780 frames (0:12 - 0:25)
 * Narrative: Detailed scientific breakdown of concentric voltage gradients in conductive soil
 * and why stepping across equipotential lines creates a fatal voltage difference (ΔV = V1 - V2).
 */
export const EditorialScene3StepPotential: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle continuous camera drift
  const camScale = interpolate(frame, [0, 780], [1.0, 1.06]);

  // Progressive construction of the equipotential rings
  const ring1Progress = Math.min(1, Math.max(0, frame / 50));
  const ring2Progress = Math.min(1, Math.max(0, (frame - 40) / 50));
  const ring3Progress = Math.min(1, Math.max(0, (frame - 80) / 50));

  // Dynamic wave travel along concentric lines
  const dashTravel = -frame * 2.2;

  // Stride potential calculation simulation
  const foot1Volts = 8400;
  const foot2Volts = 4600;
  const deltaV = foot1Volts - foot2Volts; // 3,800 Volts!

  // Pulsing current arc through human circuit diagram (Frame 180+)
  const currentFlowActive = frame >= 180;
  const currentPulse = currentFlowActive ? (frame * 6) % 100 : 0;

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        transform: `scale(${camScale})`,
        transformOrigin: '960px 540px',
      }}
    >
      <EditorialDefs />

      {/* Dark Technical Background */}
      <rect x="0" y="0" width="1920" height="1080" fill="#06091F" />

      {/* Isometric Grid Underlay for Scientific Precision */}
      <g opacity="0.12">
        {Array.from({ length: 19 }).map((_, i) => (
          <line key={`x-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="1080" stroke="#3858E9" strokeWidth="1" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`y-${i}`} x1="0" y1={i * 100} x2="1920" y2={i * 100} stroke="#3858E9" strokeWidth="1" />
        ))}
      </g>

      {/* 1. Left Section: Physical Radial Soil Field */}
      <g transform="translate(680, 560)">
        {/* Radial Soil Conductive Glow */}
        <circle cx="0" cy="0" r="420" fill="url(#potential-field)" opacity="0.6" />

        {/* Snapped Wire Impact Epicenter (11 kV) */}
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="32" fill="none" stroke="#FF5E57" strokeWidth="3" opacity="0.8" />
        <text x="0" y="-45" textAnchor="middle" fill="#FF5E57" fontSize="15" fontWeight="800" fontFamily="monospace">
          11,000 V (LIVE CABLE)
        </text>

        {/* Concentric Isobar Ring 1: 8.4 kV */}
        {ring1Progress > 0 && (
          <g opacity={ring1Progress}>
            <circle
              cx="0"
              cy="0"
              r="140"
              fill="none"
              stroke="#FF5E57"
              strokeWidth="2.5"
              strokeDasharray="14 8"
              strokeDashoffset={dashTravel}
            />
            <rect x="110" y="-14" width="75" height="22" rx="4" fill="#0D1333" stroke="#FF5E57" strokeWidth="1.2" />
            <text x="147" y="2" textAnchor="middle" fill="#FF5E57" fontSize="12" fontWeight="bold" fontFamily="monospace">
              8,400 V
            </text>
          </g>
        )}

        {/* Concentric Isobar Ring 2: 4.6 kV */}
        {ring2Progress > 0 && (
          <g opacity={ring2Progress}>
            <circle
              cx="0"
              cy="0"
              r="260"
              fill="none"
              stroke="#FFD152"
              strokeWidth="2.5"
              strokeDasharray="16 10"
              strokeDashoffset={dashTravel * 0.8}
            />
            <rect x="220" y="-14" width="75" height="22" rx="4" fill="#0D1333" stroke="#FFD152" strokeWidth="1.2" />
            <text x="257" y="2" textAnchor="middle" fill="#FFD152" fontSize="12" fontWeight="bold" fontFamily="monospace">
              4,600 V
            </text>
          </g>
        )}

        {/* Concentric Isobar Ring 3: Safe Outer Rim (1.2 kV -> 0 V) */}
        {ring3Progress > 0 && (
          <g opacity={ring3Progress}>
            <circle
              cx="0"
              cy="0"
              r="380"
              fill="none"
              stroke="#1DD1A1"
              strokeWidth="2"
              strokeDasharray="18 12"
              strokeDashoffset={dashTravel * 0.6}
            />
            <rect x="330" y="-14" width="75" height="22" rx="4" fill="#0D1333" stroke="#1DD1A1" strokeWidth="1.2" />
            <text x="367" y="2" textAnchor="middle" fill="#1DD1A1" fontSize="12" fontWeight="bold" fontFamily="monospace">
              1,200 V
            </text>
          </g>
        )}

        {/* Human Feet Footprint Crossing Two Isobars */}
        <g transform="translate(140, 90)">
          {/* Foot 1 on 8,400V ring */}
          <ellipse cx="0" cy="0" rx="16" ry="32" fill="#FF5E57" />
          <text x="0" y="-40" textAnchor="middle" fill="#FF5E57" fontSize="12" fontWeight="bold" fontFamily="monospace">
            V1 = 8,400V
          </text>

          {/* Stride vector to Foot 2 on 4,600V ring */}
          <g transform="translate(120, 80)">
            <ellipse cx="0" cy="0" rx="16" ry="32" fill="#FFD152" />
            <text x="0" y="48" textAnchor="middle" fill="#FFD152" fontSize="12" fontWeight="bold" fontFamily="monospace">
              V2 = 4,600V
            </text>
          </g>

          {/* Deadly Circuit Arrow between feet */}
          <path d="M 0 0 Q 60 80 120 80" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="8 6" />
        </g>
      </g>

      {/* 2. Right Section: Anatomical Closed-Loop Electrical Model */}
      <g transform="translate(1480, 520)">
        {/* Background Card */}
        <rect
          x="-240"
          y="-300"
          width="480"
          height="620"
          rx="18"
          fill="rgba(13, 19, 51, 0.95)"
          stroke="rgba(255, 255, 255, 0.12)"
          filter="url(#ambient-ground-shadow)"
        />

        {/* Section Heading */}
        <text x="0" y="-250" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800" letterSpacing="0.06em">
          THE HUMAN VOLTAGE LOOP
        </text>
        <text x="0" y="-225" textAnchor="middle" fill="#94A3B8" fontSize="13">
          Current enters one leg, crosses pelvic cavity, exits other leg
        </text>

        {/* Anatomical Human Vector Silhouette */}
        <g transform="translate(0, 40)">
          {/* Head */}
          <circle cx="0" cy="-140" r="26" fill="#1E2958" stroke="#3858E9" strokeWidth="2" />
          {/* Torso */}
          <path d="M -24 -110 L 24 -110 L 18 10 L -18 10 Z" fill="#1E2958" stroke="#3858E9" strokeWidth="2" />
          
          {/* Left Leg (Contact Point V1) */}
          <path d="M -14 10 L -50 140" fill="none" stroke={currentFlowActive ? "#FF5E57" : "#3858E9"} strokeWidth="8" strokeLinecap="round" />
          {/* Right Leg (Contact Point V2) */}
          <path d="M 14 10 L 50 140" fill="none" stroke={currentFlowActive ? "#FFD152" : "#3858E9"} strokeWidth="8" strokeLinecap="round" />

          {/* Current Flow Pulse Animation through Body */}
          {currentFlowActive && (
            <path
              d="M -50 140 L -14 10 Q 0 -20 14 10 L 50 140"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="16 12"
              strokeDashoffset={-frame * 5}
              strokeLinecap="round"
            />
          )}

          {/* Heart / Organ Vulnerability Warning */}
          <g transform="translate(0, -60)">
            <circle cx="0" cy="0" r="16" fill="rgba(239, 68, 68, 0.25)" stroke="#EF4444" strokeWidth="2" />
            <path d="M -8 -4 C -8 -12, 0 -12, 0 -4 C 0 -12, 8 -12, 8 -4 C 8 4, 0 10, 0 12 C 0 10, -8 4, -8 -4 Z" fill="#EF4444" />
          </g>
        </g>

        {/* Real-Time Mathematical Telemetry Meter */}
        <g transform="translate(0, 240)">
          <rect x="-180" y="-30" width="360" height="60" rx="10" fill="#06091F" stroke="#FF5E57" strokeWidth="1.5" />
          <text x="-160" y="6" fill="#94A3B8" fontSize="12" fontFamily="monospace">
            POTENTIAL DELTA:
          </text>
          <text x="160" y="8" textAnchor="end" fill="#FF5E57" fontSize="24" fontWeight="900" fontFamily="monospace">
            &Delta;V = 3,800 V
          </text>
        </g>
      </g>
    </svg>
  );
};

