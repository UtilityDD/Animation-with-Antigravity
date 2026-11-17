import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CameraRig } from './CameraRig';
import { KineticWord } from './KineticWord';
import { ElectricArcs } from './ElectricArcs';
import { SparkBurst } from './SparkBurst';

export const Beat1ElectricHook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14', overflow: 'hidden' }}>
      {/* Dynamic Camera with zoom punch and decay shake on word slams */}
      <CameraRig
        keyframes={[
          { frame: 0, scale: 1.25, x: 0, y: -20, rotate: -2, shake: 0 },
          { frame: 12, scale: 1.35, x: 0, y: -10, rotate: -1, shake: 14 }, // Impact 1: "বিদ্যুৎ"
          { frame: 40, scale: 1.15, x: 0, y: 0, rotate: 1, shake: 4 },
          { frame: 65, scale: 1.25, x: 0, y: 10, rotate: 0, shake: 12 },   // Impact 2: "কী?"
          { frame: 140, scale: 1.0, x: 0, y: 0, rotate: 0, shake: 0 },
        ]}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.12) 0%, rgba(7, 11, 20, 0) 70%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          }}
        />

        {/* Dynamic Electric Arcs */}
        <ElectricArcs intensity={1.5} color="#00F0FF" />

        {/* Spark Bursts on Word Slams */}
        <SparkBurst x={960} y={480} startFrame={14} count={20} color="#00F0FF" />
        <SparkBurst x={1260} y={500} startFrame={65} count={16} color="#FBBF24" />

        {/* Main Kinetic Typography Container */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            width: '100%',
            zIndex: 30,
          }}
        >
          {/* Word 1: বিদ্যুৎ */}
          <KineticWord
            text="বিদ্যুৎ"
            startFrame={14}
            fontSize={140}
            color="#FFFFFF"
            accentGlow="rgba(0, 240, 255, 0.95)"
            outlineColor="#00F0FF"
            animationType="slam"
          />

          {/* Word 2: আসলে */}
          <KineticWord
            text="আসলে"
            startFrame={36}
            fontSize={85}
            color="#94A3B8"
            accentGlow="rgba(255, 255, 255, 0.4)"
            animationType="slideUp"
          />

          {/* Word 3: কী? */}
          <KineticWord
            text="কী?"
            startFrame={62}
            fontSize={150}
            color="#FBBF24"
            accentGlow="rgba(251, 191, 36, 0.95)"
            outlineColor="#F59E0B"
            animationType="slam"
          />
        </div>

        {/* Sub-pill badge */}
        {frame > 75 && (
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid rgba(0, 240, 255, 0.5)',
              borderRadius: 30,
              padding: '10px 28px',
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: '#00F0FF',
              letterSpacing: '1px',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
              zIndex: 30,
            }}
          >
            ⚡ WHAT IS ELECTRICITY?
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
