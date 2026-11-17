import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { CameraRig } from './CameraRig';

interface Milestone {
  x: number;
  label: string;
  color: string;
}

const MILESTONES: Milestone[] = [
  { x: 420, label: '১৭৯১ · গ্যালভানি', color: '#10B981' },
  { x: 1040, label: '১৮০০ · ভোল্টা', color: '#F59E0B' },
  { x: 1680, label: '১৮২০ · অ্যাম্পিয়ার', color: '#38BDF8' },
  { x: 2320, label: '১৮২৭ · ওহম', color: '#F43F5E' },
  { x: 2940, label: 'আধুনিক যুগ', color: '#A855F7' },
];

/**
 * Stage 2: Continuous Glowing Copper Rail Timeline (ONLY Year + Name plaques!)
 * - Blurred archival blueprints floating in Z-Layer 0 behind the copper rail
 * - 1820 Ampère compass needle snaps perpendicular dynamically
 */
export const Stage2CopperRailTimeline: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 30, duration], [1, 0], EASE_INOUT);
  const pulse = (frame * 3.5) % 80;
  const compassSnap = ci(local, [duration * 0.42, duration * 0.48], [0, 72], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #0F1D36 0%, #050811 78%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Z-Layer 0: Blurred Archival Blueprints */}
      <div style={{ position: 'absolute', inset: -80, filter: 'blur(6px)', opacity: 0.2, pointerEvents: 'none' }}>
        <svg width="2100" height="1240" viewBox="0 0 2100 1240">
          <circle cx="520" cy="420" r="190" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="12 10" />
          <rect x="1150" y="280" width="540" height="360" fill="none" stroke="#F59E0B" strokeWidth="3" />
        </svg>
      </div>

      <CameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 520, y: 540, z: 1.04 },
          { f: duration * 0.25, x: 1080, y: 540, z: 1.08 },
          { f: duration * 0.52, x: 1700, y: 540, z: 1.12 },
          { f: duration * 0.78, x: 2340, y: 540, z: 1.08 },
          { f: duration, x: 2920, y: 540, z: 1.04 },
        ]}
      >
        <svg width="3500" height="1080" viewBox="0 0 3500 1080" style={{ overflow: 'visible' }}>
          {/* Continuous Glowing Copper Bus Rail */}
          <rect x="180" y="532" width="3050" height="16" rx="8" fill="#B45309" stroke="#F59E0B" strokeWidth="2.5" />
          <line
            x1="180"
            y1="540"
            x2="3230"
            y2="540"
            stroke="#38BDF8"
            strokeWidth="4"
            strokeDasharray="16 24"
            strokeDashoffset={-pulse}
            opacity="0.75"
          />

          {MILESTONES.map((m, idx) => (
            <g key={m.label} transform={`translate(${m.x}, 540)`}>
              <circle cx="0" cy="0" r="16" fill={m.color} filter={`drop-shadow(0 0 12px ${m.color})`} />
              {/* Articulated Physics Icon above Rail */}
              <g transform="translate(0, -145)">
                <circle cx="0" cy="0" r="78" fill="rgba(15, 23, 42, 0.86)" stroke={m.color} strokeWidth="3" />
                {idx === 0 && (
                  <path d="M -28,12 Q 0,-32 28,12 M -14,12 L -24,38 M 14,12 L 24,38" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
                )}
                {idx === 1 && (
                  <>
                    <rect x="-26" y="-26" width="52" height="12" rx="3" fill="#D9822B" />
                    <rect x="-26" y="-8" width="52" height="12" rx="3" fill="#94A3B8" />
                    <rect x="-26" y="10" width="52" height="12" rx="3" fill="#D9822B" />
                  </>
                )}
                {idx === 2 && (
                  /* Ampère Compass Needle snapping perpendicular! */
                  <g transform={`rotate(${compassSnap})`}>
                    <polygon points="0,-42 -9,0 9,0" fill="#F43F5E" />
                    <polygon points="0,42 -9,0 9,0" fill="#E2E8F0" />
                    <circle cx="0" cy="0" r="6" fill="#FBBF24" />
                  </g>
                )}
                {idx === 3 && (
                  /* Ohm Constricted Narrow Wire */
                  <path d="M -46,0 L -18,0 L -10,-14 L 0,14 L 10,-14 L 18,0 L 46,0" fill="none" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                )}
                {idx === 4 && (
                  /* Modern Microchip Bus */
                  <>
                    <rect x="-26" y="-26" width="52" height="52" rx="6" fill="#1E293B" stroke="#A855F7" strokeWidth="3" />
                    <circle cx="0" cy="0" r="10" fill="#38BDF8" />
                  </>
                )}
              </g>

              {/* ONLY Year + Name Plaque */}
              <text
                x="0"
                y="74"
                textAnchor="middle"
                fill="#F8FAFC"
                fontSize="30"
                fontWeight="700"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                {m.label}
              </text>
            </g>
          ))}
        </svg>

        <DustMotes frame={frame} cx={1650} cy={520} radius={650} count={32} opacity={0.45} seed={302} />
      </CameraRig>
    </div>
  );
};
