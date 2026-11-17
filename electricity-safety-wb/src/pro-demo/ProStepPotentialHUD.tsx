import React from 'react';
import { interpolate } from 'remotion';

interface ProInfographicProps {
  x: number;
  y: number;
  frame: number;
}

/**
 * Professional Studio-Grade Scientific HUD:
 * - Animated propagating equipotential voltage waves with animated strokeDashoffset
 * - Neon multi-pass bloom filter (feGaussianBlur + feMerge)
 * - Dynamic numerical voltage meter readout with animated digital readout
 * - Organic electric current arc lightning with jitter
 */
export const ProStepPotentialHUD: React.FC<ProInfographicProps> = ({ x, y, frame }) => {
  // Dashed wave propagation speed
  const dashOffset = -frame * 2.5;

  // Pulsing equipotential rings
  const ring1Scale = 1 + Math.sin(frame * 0.08) * 0.02;
  const ring2Scale = 1 + Math.sin(frame * 0.08 + 1) * 0.02;
  const ring3Scale = 1 + Math.sin(frame * 0.08 + 2) * 0.02;

  // Real-time voltage calculation for meter readout
  const baseVoltage = 11000;
  const currentDiff = Math.round(
    interpolate(Math.sin(frame * 0.12), [-1, 1], [3200, 4800])
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* 1. Concentric Voltage Ground Isobars with Glow */}
      <g filter="url(#pro-glow-cyan)">
        {/* Ring 3 (Outer - Low Voltage: 2,400V) */}
        <circle
          cx="0"
          cy="0"
          r={260 * ring3Scale}
          fill="none"
          stroke="#22D7DA"
          strokeWidth="2.5"
          strokeDasharray="16 10"
          strokeDashoffset={dashOffset}
          opacity="0.5"
        />

        {/* Ring 2 (Mid - High Voltage: 6,800V) */}
        <circle
          cx="0"
          cy="0"
          r={180 * ring2Scale}
          fill="none"
          stroke="#FFD244"
          strokeWidth="3"
          strokeDasharray="14 8"
          strokeDashoffset={dashOffset * 1.3}
          opacity="0.75"
        />

        {/* Ring 1 (Inner - Lethal Voltage: 11,000V) */}
        <circle
          cx="0"
          cy="0"
          r={105 * ring1Scale}
          fill="none"
          stroke="#EF4444"
          strokeWidth="3.5"
          strokeDasharray="10 6"
          strokeDashoffset={dashOffset * 1.8}
          opacity="0.95"
        />
      </g>

      {/* Radial Isobar Voltage Value Tags */}
      <g fontFamily="monospace" fontSize="11" fontWeight="700">
        <rect x="95" y="-12" width="60" height="20" rx="4" fill="#0B0E38" stroke="#EF4444" strokeWidth="1.2" />
        <text x="125" y="2" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">
          11 kV
        </text>

        <rect x="170" y="-12" width="60" height="20" rx="4" fill="#0B0E38" stroke="#FFD244" strokeWidth="1.2" />
        <text x="200" y="2" textAnchor="middle" fill="#FFD244" fontSize="11" fontWeight="bold">
          6.8 kV
        </text>

        <rect x="250" y="-12" width="60" height="20" rx="4" fill="#0B0E38" stroke="#22D7DA" strokeWidth="1.2" />
        <text x="280" y="2" textAnchor="middle" fill="#22D7DA" fontSize="11" fontWeight="bold">
          2.4 kV
        </text>
      </g>

      {/* 2. Floating Scientific HUD Telemetry Card (Kurzgesagt Style Glass Panel) */}
      <g transform="translate(160, -180)">
        {/* Glass Card Background */}
        <rect
          x="-15"
          y="-20"
          width="320"
          height="120"
          rx="14"
          fill="rgba(11, 14, 56, 0.88)"
          stroke="#22D7DA"
          strokeWidth="1.8"
          filter="url(#pro-shadow)"
        />

        {/* Telemetry Header */}
        <circle cx="5" cy="0" r="5" fill="#EF4444" />
        <text x="22" y="4" fill="#FFFFFF" fontSize="12" fontWeight="800" letterSpacing="0.08em" fontFamily="monospace">
          STEP POTENTIAL // বিভব পার্থক্য
        </text>

        {/* Animated Formula Display */}
        <text x="5" y="32" fill="#94A3B8" fontSize="13" fontFamily="sans-serif">
          &Delta;V = V<tspan fontSize="9">left</tspan> &minus; V<tspan fontSize="9">right</tspan>
        </text>

        {/* Real-time Dynamic Voltage Delta */}
        <text x="5" y="70" fill="#FFD244" fontSize="32" fontWeight="900" fontFamily="monospace">
          {currentDiff} <tspan fontSize="18" fill="#22D7DA">VOLTS</tspan>
        </text>

        {/* Hazard Warning Pill */}
        <g transform="translate(200, 48)">
          <rect x="0" y="0" width="85" height="26" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="1.5" />
          <text x="42" y="17" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">
            LETHAL ⚠️
          </text>
        </g>
      </g>

      {/* 3. Snapped High-Voltage Conductor Striking Soil */}
      <g transform="translate(0, 0)">
        {/* Wire Shadow on ground */}
        <path d="M -180 -160 Q -60 -40 0 0" fill="none" stroke="rgba(3,4,20,0.5)" strokeWidth="12" />
        {/* Conductor Cable */}
        <path
          d="M -180 -180 Q -60 -40 0 0"
          fill="none"
          stroke="url(#electric-wire-grad)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* High-Voltage Impact Arc Sparks */}
        <g filter="url(#pro-glow-cyan)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="32" fill="none" stroke="#22D7DA" strokeWidth="3" opacity="0.8" />
          {/* Dynamic lightning crackles */}
          {[-45, 15, 75, 140, 210, 310].map((deg, idx) => {
            const sparkLen = 25 + Math.sin(frame * 0.3 + idx) * 15;
            const rad = (deg * Math.PI) / 180;
            const sx = Math.cos(rad) * sparkLen;
            const sy = Math.sin(rad) * sparkLen;
            return (
              <line
                key={idx}
                x1="0"
                y1="0"
                x2={sx}
                y2={sy}
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </g>
    </g>
  );
};
