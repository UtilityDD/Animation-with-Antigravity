import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const SwitchExplosion: React.FC<{ snapFrame?: number }> = ({ snapFrame = 25 }) => {
  const frame = useCurrentFrame();

  const isClosed = frame >= snapFrame;
  const switchAngle = isClosed ? 0 : -35;

  // Expansion of the light burst after switch closure
  const burstProgress = isClosed
    ? interpolate(frame - snapFrame, [0, 40], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  const filamentGlow = isClosed
    ? interpolate(frame - snapFrame, [0, 15], [0.2, 1], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: 1400,
        height: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="1300" height="540" viewBox="0 0 1300 540">
        <defs>
          <filter id="switchGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="bulbDetonation" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Heavy PCB Conductive Circuit Tracks */}
        <path
          d="M 220 270 L 450 270"
          stroke={isClosed ? '#00F0FF' : '#334155'}
          strokeWidth="10"
          strokeLinecap="round"
          filter={isClosed ? 'url(#switchGlow)' : undefined}
        />
        <path
          d="M 580 270 L 950 270"
          stroke={isClosed ? '#00F0FF' : '#334155'}
          strokeWidth="10"
          strokeLinecap="round"
          filter={isClosed ? 'url(#switchGlow)' : undefined}
        />

        {/* Dynamic Energy Packets racing down the wires if switch is closed */}
        {isClosed &&
          [0, 80, 160, 240, 320].map((offset, i) => {
            const x1 = 220 + ((frame * 12 + offset) % 230);
            const x2 = 580 + ((frame * 12 + offset) % 370);
            return (
              <React.Fragment key={i}>
                <circle cx={x1} cy="270" r="5" fill="#FFFFFF" />
                <circle cx={x2} cy="270" r="5" fill="#FFFFFF" />
              </React.Fragment>
            );
          })}

        {/* 2. KNIFE SWITCH ASSEMBLY (X=450 to 580, Y=270) */}
        <g id="knife-switch">
          {/* Terminals */}
          <circle cx="450" cy="270" r="16" fill="#CBD5E1" stroke="#0F172A" strokeWidth="4" />
          <circle cx="580" cy="270" r="16" fill="#CBD5E1" stroke="#0F172A" strokeWidth="4" />

          {/* Blade Hinge */}
          <g transform={`translate(450, 270) rotate(${switchAngle})`}>
            <rect x="0" y="-8" width="138" height="16" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
            <circle cx="130" cy="0" r="12" fill="#EF4444" />
          </g>

          {/* Snap Spark on Closure */}
          {frame >= snapFrame && frame <= snapFrame + 10 && (
            <g transform="translate(580, 270)">
              <polygon points="0,-30 8,-8 30,0 8,8 0,30 -8,8 -30,0 -8,-8" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="24" fill="#00F0FF" opacity="0.8" filter="url(#switchGlow)" />
            </g>
          )}
        </g>

        {/* 3. LIGHTBULB / SUPERNOVA DETONATION (At Right: X=950, Y=270) */}
        <g id="bulb-assembly" transform="translate(950, 270)">
          {/* Radial Bloom Sphere */}
          {isClosed && (
            <circle cx="0" cy="0" r={320 * burstProgress} fill="url(#bulbDetonation)" />
          )}

          {/* Radial Flare Rays */}
          {isClosed &&
            Array.from({ length: 24 }).map((_, i) => {
              const deg = (i * 360) / 24;
              const rad = (deg * Math.PI) / 180;
              const rayLen = (180 + (i % 2 === 0 ? 120 : 60)) * burstProgress;
              const x2 = Math.cos(rad) * rayLen;
              const y2 = Math.sin(rad) * rayLen;
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x2}
                  y2={y2}
                  stroke="#FEF08A"
                  strokeWidth={i % 2 === 0 ? 4 : 2}
                  opacity={0.8 * (1 - burstProgress * 0.3)}
                />
              );
            })}

          {/* Bulb Filament Shell */}
          <circle
            cx="0"
            cy="0"
            r="60"
            fill={isClosed ? 'rgba(254, 240, 138, 0.4)' : '#1E293B'}
            stroke={isClosed ? '#FFFFFF' : '#64748B'}
            strokeWidth="4"
          />

          {/* Glowing Tungsten Core */}
          <path
            d="M-20 30 L-10 -20 L0 30 L10 -20 L20 30"
            fill="none"
            stroke={isClosed ? '#FFFFFF' : '#94A3B8'}
            strokeWidth={isClosed ? '6' : '3'}
            strokeLinejoin="round"
            filter={isClosed ? 'url(#switchGlow)' : undefined}
          />
        </g>
      </svg>
    </div>
  );
};
