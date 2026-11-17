import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CameraRig } from './CameraRig';
import { KineticWord } from './KineticWord';
import { SparkBurst } from './SparkBurst';

export const Beat2NoMagic: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14', overflow: 'hidden' }}>
      {/* Dynamic Camera with whip-pan entrance and tilt */}
      <CameraRig
        keyframes={[
          { frame: 0, scale: 1.15, x: 260, y: 0, rotate: -3, shake: 0 },
          { frame: 20, scale: 1.05, x: 0, y: 0, rotate: 1, shake: 8 },  // Pan in
          { frame: 45, scale: 1.25, x: 0, y: -10, rotate: 0, shake: 15 }, // "জাদু নয়!" slam
          { frame: 140, scale: 1.0, x: 0, y: 0, rotate: 0, shake: 0 },
        ]}
      >
        {/* Background Digital Oscilloscope Waveform */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.25 }}
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
              <stop offset="50%" stopColor="#EF4444" stopOpacity="1" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 540 Q 240 ${540 + Math.sin(frame * 0.15) * 120} 480 540 T 960 540 T 1440 540 T 1920 540`}
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="4"
          />
        </svg>

        {/* Broken Wand & Red Warning Stamp */}
        <svg
          width="360"
          height="360"
          viewBox="0 0 360 360"
          style={{
            position: 'absolute',
            top: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
          }}
        >
          {/* Magic Wand broken in two */}
          <g transform="translate(180, 180) rotate(-35)">
            <rect x="-90" y="-8" width="80" height="16" rx="4" fill="#64748B" />
            <polygon points="-90,-8 -120,-8 -110,8 -90,8" fill="#FBBF24" />
            <rect x="10" y="-8" width="80" height="16" rx="4" fill="#64748B" />
          </g>

          {/* Red Glowing 'X' Slash */}
          {frame > 35 && (
            <g stroke="#EF4444" strokeWidth="12" strokeLinecap="round" opacity="0.9">
              <line x1="80" y1="80" x2="280" y2="280" />
              <line x1="280" y1="80" x2="80" y2="280" />
            </g>
          )}
        </svg>

        <SparkBurst x={960} y={480} startFrame={38} count={18} color="#EF4444" />

        {/* Word-by-Word Kinetic Typography */}
        <div
          style={{
            position: 'absolute',
            bottom: '24%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            zIndex: 30,
          }}
        >
          <KineticWord
            text="এটা কোনো"
            startFrame={10}
            fontSize={75}
            color="#E2E8F0"
            accentGlow="rgba(255,255,255,0.4)"
            animationType="slideUp"
          />

          <KineticWord
            text="জাদু নয়!"
            startFrame={36}
            fontSize={120}
            color="#EF4444"
            accentGlow="rgba(239, 68, 68, 0.95)"
            outlineColor="#B91C1C"
            animationType="slam"
          />
        </div>

        {/* Technical Subtitle */}
        {frame > 50 && (
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: '#38BDF8',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            🔬 It is Pure Physical Science
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
