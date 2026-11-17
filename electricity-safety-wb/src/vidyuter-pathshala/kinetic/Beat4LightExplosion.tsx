import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CameraRig } from './CameraRig';
import { KineticWord } from './KineticWord';
import { SwitchExplosion } from './SwitchExplosion';
import { SparkBurst } from './SparkBurst';

export const Beat4LightExplosion: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14', overflow: 'hidden' }}>
      {/* Dynamic Camera with zoom punch at switch snap and light expansion */}
      <CameraRig
        keyframes={[
          { frame: 0, scale: 1.15, x: -100, y: 0, rotate: -1, shake: 0 },
          { frame: 22, scale: 1.35, x: 0, y: 0, rotate: 1, shake: 18 },  // Switch snap shock
          { frame: 60, scale: 1.1, x: 100, y: 0, rotate: 0, shake: 6 },
          { frame: 75, scale: 1.45, x: 140, y: 0, rotate: 0, shake: 20 }, // "আলোর বিস্ফোরণ!" slam
          { frame: 160, scale: 1.2, x: 50, y: 0, rotate: 0, shake: 0 },
        ]}
      >
        {/* Switch Assembly and Supernova Bulb */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
          }}
        >
          <SwitchExplosion snapFrame={22} />
        </div>

        {/* Explosive Sparks */}
        <SparkBurst x={760} y={420} startFrame={22} count={20} color="#00F0FF" />
        <SparkBurst x={1260} y={420} startFrame={75} count={28} color="#FEF08A" />

        {/* Word-by-Word Kinetic Typography */}
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
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
            text="সুইচ অন!"
            startFrame={10}
            fontSize={95}
            color="#00F0FF"
            accentGlow="rgba(0, 240, 255, 0.95)"
            outlineColor="#0284C7"
            animationType="slam"
          />

          <KineticWord
            text="আলোর"
            startFrame={50}
            fontSize={85}
            color="#FEF08A"
            accentGlow="rgba(254, 240, 138, 0.6)"
            animationType="slideUp"
          />

          <KineticWord
            text="বিস্ফোরণ!"
            startFrame={72}
            fontSize={135}
            color="#FBBF24"
            accentGlow="rgba(251, 191, 36, 0.95)"
            outlineColor="#D97706"
            animationType="slam"
          />
        </div>

        {/* Conservation principle pill */}
        {frame > 35 && (
          <div
            style={{
              position: 'absolute',
              top: 80,
              left: 100,
              background: 'rgba(19, 27, 46, 0.85)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 16,
              padding: '10px 22px',
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: '#10B981',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
              zIndex: 30,
            }}
          >
            ✓ সার্কিট বদ্ধ • চার্জের অক্ষয় প্রবাহ!
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
