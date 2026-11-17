import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CameraRig } from './CameraRig';
import { KineticWord } from './KineticWord';
import { AtomCore3D } from './AtomCore3D';
import { SparkBurst } from './SparkBurst';

export const Beat3AtomicFury: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14', overflow: 'hidden' }}>
      {/* Dynamic Camera plunging into the atom */}
      <CameraRig
        keyframes={[
          { frame: 0, scale: 0.95, x: 0, y: 30, rotate: 0, shake: 0 },
          { frame: 50, scale: 1.15, x: 0, y: 15, rotate: 3, shake: 4 },
          { frame: 105, scale: 1.45, x: 0, y: 0, rotate: 6, shake: 16 }, // Impact on "তাণ্ডব!"
          { frame: 180, scale: 1.55, x: 0, y: -10, rotate: 9, shake: 2 },
        ]}
      >
        {/* Rapid 3D Atom Core */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <AtomCore3D scale={1.25} />
        </div>

        <SparkBurst x={960} y={440} startFrame={108} count={24} color="#00F0FF" />

        {/* Word-by-Word Kinetic Typography */}
        <div
          style={{
            position: 'absolute',
            bottom: '16%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            width: '100%',
            zIndex: 30,
          }}
        >
          <KineticWord
            text="পদার্থের গভীরে"
            startFrame={12}
            fontSize={65}
            color="#E2E8F0"
            accentGlow="rgba(255,255,255,0.3)"
            animationType="slideUp"
          />

          <KineticWord
            text="ইলেকট্রনের"
            startFrame={55}
            fontSize={85}
            color="#00F0FF"
            accentGlow="rgba(0, 240, 255, 0.9)"
            outlineColor="#0284C7"
            animationType="pop"
          />

          <KineticWord
            text="তাণ্ডব!"
            startFrame={105}
            fontSize={135}
            color="#FBBF24"
            accentGlow="rgba(251, 191, 36, 0.95)"
            outlineColor="#D97706"
            animationType="slam"
          />
        </div>

        {/* Floating Subatomic Polarities */}
        {frame > 30 && (
          <div
            style={{
              position: 'absolute',
              top: 100,
              right: 120,
              background: 'rgba(19, 27, 46, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: 16,
              padding: '12px 24px',
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 30,
            }}
          >
            <span style={{ color: '#F59E0B' }}>প্রোটন (+)</span> •{' '}
            <span style={{ color: '#00F0FF' }}>ইলেকট্রন (-)</span>
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
