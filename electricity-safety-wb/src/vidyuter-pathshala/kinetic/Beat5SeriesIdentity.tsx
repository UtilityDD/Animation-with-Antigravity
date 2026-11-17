import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CameraRig } from './CameraRig';
import { KineticWord } from './KineticWord';
import { SparkBurst } from './SparkBurst';

export const Beat5SeriesIdentity: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14', overflow: 'hidden' }}>
      <CameraRig
        keyframes={[
          { frame: 0, scale: 0.9, x: 0, y: 30, rotate: 0, shake: 0 },
          { frame: 18, scale: 1.15, x: 0, y: 0, rotate: 0, shake: 12 }, // Logo drop impact
          { frame: 75, scale: 1.25, x: 0, y: -15, rotate: 0, shake: 10 }, // "শূন্য থেকে শিখুন" impact
          { frame: 150, scale: 1.05, x: 0, y: 0, rotate: 0, shake: 0 },
        ]}
      >
        {/* Dynamic Electric Background Glow */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(circle at 50% 45%, rgba(0, 240, 255, 0.18) 0%, rgba(7, 11, 20, 0) 65%)',
          }}
        />

        {/* Grand 3D-styled Lightning Bolt Emblem */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            filter: 'drop-shadow(0 0 35px #00F0FF)',
          }}
        >
          <defs>
            <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path
            d="M 115 15 L 45 105 L 105 105 L 90 185 L 165 95 L 105 95 Z"
            fill="url(#boltGrad)"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>

        <SparkBurst x={960} y={320} startFrame={16} count={22} color="#00F0FF" />
        <SparkBurst x={960} y={640} startFrame={75} count={18} color="#FBBF24" />

        {/* Master Brand Kinetic Reveal */}
        <div
          style={{
            position: 'absolute',
            top: '44%',
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
            text="বিদ্যুতের"
            startFrame={14}
            fontSize={120}
            color="#FFFFFF"
            accentGlow="rgba(0, 240, 255, 0.9)"
            outlineColor="#00F0FF"
            animationType="slam"
          />

          <KineticWord
            text="পাঠশালা"
            startFrame={30}
            fontSize={120}
            color="#00F0FF"
            accentGlow="rgba(0, 240, 255, 0.95)"
            outlineColor="#0284C7"
            animationType="slam"
          />
        </div>

        {/* Animated Underline */}
        {frame > 35 && (
          <div
            style={{
              position: 'absolute',
              top: '58%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: Math.min(680, (frame - 35) * 35),
              height: 5,
              borderRadius: 3,
              background: 'linear-gradient(90deg, transparent, #00F0FF, #FFFFFF, #00F0FF, transparent)',
              boxShadow: '0 0 18px #00F0FF',
              zIndex: 30,
            }}
          />
        )}

        {/* Call to action badge: "শূন্য থেকে শিখুন" */}
        <div
          style={{
            position: 'absolute',
            bottom: '22%',
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
            text="শূন্য থেকে শিখুন!"
            startFrame={72}
            fontSize={75}
            color="#FBBF24"
            accentGlow="rgba(251, 191, 36, 0.95)"
            outlineColor="#D97706"
            animationType="pop"
          />
        </div>

        {/* English Tagline */}
        {frame > 85 && (
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: '#94A3B8',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              zIndex: 30,
            }}
          >
            Electricity Explained • From Zero to the Power Grid
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
