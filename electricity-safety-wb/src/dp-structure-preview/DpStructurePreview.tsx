import React, { useEffect } from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FontInjector } from '../kinetic-master/FontInjector';
import { DpHighlightTarget, DpStructure3DModel } from './DpStructure3DModel';

const EASE_CINEMA = Easing.bezier(0.25, 0.85, 0.35, 1);

interface CamPose {
  pos: [number, number, number];
  look: [number, number, number];
}

function getCameraPose(frame: number): CamPose {
  // 0-4s (0-240): Dramatic low-angle reveal gliding upward
  if (frame < 240) {
    const t = EASE_CINEMA(frame / 240);
    return {
      pos: [
        interpolate(t, [0, 1], [3.0, 2.2]),
        interpolate(t, [0, 1], [1.0, 4.5]),
        interpolate(t, [0, 1], [7.8, 7.2]),
      ],
      look: [0, interpolate(t, [0, 1], [3.6, 5.1]), 0],
    };
  }
  // 4-8s (240-480): Three-quarter elevated close-up on HT Cross-Arm & Insulators
  if (frame < 480) {
    const t = EASE_CINEMA((frame - 240) / 240);
    return {
      pos: [
        interpolate(t, [0, 1], [2.8, 2.0]),
        interpolate(t, [0, 1], [8.1, 7.3]),
        interpolate(t, [0, 1], [3.6, 2.7]),
      ],
      look: [
        interpolate(t, [0, 1], [0.1, 0.0]),
        interpolate(t, [0, 1], [7.3, 6.9]),
        0.1,
      ],
    };
  }
  // 8-12s (480-720): Macro tracking downward along Jumper arc & LT Cable Dressing
  if (frame < 720) {
    const t = EASE_CINEMA((frame - 480) / 240);
    return {
      pos: [
        interpolate(t, [0, 1], [1.85, 1.65]),
        interpolate(t, [0, 1], [6.2, 3.0]),
        interpolate(t, [0, 1], [2.6, 2.4]),
      ],
      look: [
        interpolate(t, [0, 1], [0.25, 0.72]),
        interpolate(t, [0, 1], [5.3, 2.85]),
        0.25,
      ],
    };
  }
  // 12-16s (720-960): Clean Side-by-Side Comparison (Untidy vs Properly Dressed)
  if (frame < 960) {
    const t = EASE_CINEMA((frame - 720) / 240);
    return {
      pos: [0, interpolate(t, [0, 1], [5.3, 4.9]), interpolate(t, [0, 1], [7.4, 6.6])],
      look: [0, 4.9, 0],
    };
  }
  // 16-20s (960-1200): Sweeping Final Structure Pull-Back
  const t = EASE_CINEMA((frame - 960) / 240);
  return {
    pos: [
      interpolate(t, [0, 1], [-1.8, -2.9]),
      interpolate(t, [0, 1], [4.6, 5.1]),
      interpolate(t, [0, 1], [7.8, 9.6]),
    ],
    look: [0, interpolate(t, [0, 1], [4.9, 4.6]), 0],
  };
}

const CameraController: React.FC<{ frame: number }> = ({ frame }) => {
  const { camera } = useThree();
  const pose = getCameraPose(frame);

  useEffect(() => {
    camera.position.set(...pose.pos);
    camera.lookAt(...pose.look);
    camera.updateProjectionMatrix();
  }, [camera, pose.pos[0], pose.pos[1], pose.pos[2], pose.look[0], pose.look[1], pose.look[2]]);

  return null;
};

const TechnicalCallout: React.FC<{
  visible: boolean;
  x: number;
  y: number;
  lineToX: number;
  lineToY: number;
  title: string;
  subtitle?: string;
  accent?: string;
}> = ({ visible, x, y, lineToX, lineToY, title, subtitle, accent = '#F5B841' }) => {
  if (!visible) return null;
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <polyline
        points={`${lineToX},${lineToY} ${x + 12},${y + 22} ${x},${y + 22}`}
        fill="none"
        stroke={accent}
        strokeWidth={2.5}
        opacity={0.9}
      />
      <circle cx={lineToX} cy={lineToY} r={6} fill={accent} />
      <g transform={`translate(${x > lineToX ? x : x - 440}, ${y - 12})`}>
        <rect
          x={0}
          y={0}
          width={440}
          height={subtitle ? 74 : 48}
          rx={6}
          fill="rgba(16, 24, 34, 0.84)"
          stroke={accent}
          strokeWidth={1.5}
        />
        <text
          x={18}
          y={31}
          fill="#F8FAFC"
          fontSize={22}
          fontWeight={700}
          fontFamily="Hind Siliguri, Noto Sans Bengali, sans-serif"
        >
          {title}
        </text>
        {subtitle && (
          <text
            x={18}
            y={58}
            fill="#CBD5E1"
            fontSize={16}
            fontWeight={500}
            fontFamily="Inter, Segoe UI, sans-serif"
          >
            {subtitle}
          </text>
        )}
      </g>
    </svg>
  );
};

export const DpStructurePreview: React.FC = () => {
  const frame = useCurrentFrame();
  const isComparison = frame >= 720 && frame < 960;

  const highlight: DpHighlightTarget =
    frame >= 240 && frame < 480
      ? 'ht-assembly'
      : frame >= 480 && frame < 720
      ? 'jumpers-lt'
      : 'none';
  const highlightPulse = 0.55 + 0.45 * Math.sin(frame * 0.14);

  // Title timings (16-20s)
  const mainTitleOpacity = interpolate(frame, [975, 1005, 1110, 1135], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const endTagOpacity = interpolate(frame, [1115, 1145, 1200], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#131D29', overflow: 'hidden' }}>
      <FontInjector />
      <Audio src={staticFile('audio/dp_preview_20s.mp3')} />

      {/* Warm Golden-Hour Sky Backdrop behind WebGL transparent/fogged canvas */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, #1E3246 0%, #3E5B73 42%, #C9915C 84%, #6D5D4B 100%)',
        }}
      />

      <ThreeCanvas width={1920} height={1080} shadows dpr={[1, 1.5]}>
        <fog attach="fog" args={['#596A7A', 14, 42]} />
        <CameraController frame={frame} />

        {/* Golden-Hour Industrial Lighting */}
        <ambientLight intensity={0.48} color="#DCE8F5" />
        <hemisphereLight args={['#B8D4F0', '#5E4D3B', 0.55]} />
        <directionalLight
          position={[9, 14, 8]}
          intensity={2.3}
          color="#FFE3B8"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={35}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={12}
          shadow-camera-bottom={-2}
        />
        <directionalLight position={[-7, 6, -6]} intensity={0.65} color="#7CB3E8" />

        {/* Ground Pad & Rural Horizon Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial color="#5A5D52" roughness={0.95} metalness={0.02} />
        </mesh>
        {/* Concrete Substation Pad under DP Poles */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <boxGeometry args={isComparison ? [8.5, 0.04, 2.4] : [3.8, 0.04, 2.2]} />
          <meshStandardMaterial color="#7E827D" roughness={0.9} />
        </mesh>

        {!isComparison ? (
          <DpStructure3DModel
            mode="dressed"
            highlight={highlight}
            highlightPulse={highlightPulse}
          />
        ) : (
          <group>
            {/* Left: Untidy Arrangement */}
            <DpStructure3DModel mode="untidy" position={[-2.25, 0, 0]} rotationY={0.14} />
            {/* Right: Properly Dressed Arrangement */}
            <DpStructure3DModel
              mode="dressed"
              highlight="jumpers-lt"
              highlightPulse={0.7}
              position={[2.25, 0, 0]}
              rotationY={-0.14}
            />
          </group>
        )}
      </ThreeCanvas>

      {/* ================================================================= */}
      {/* RESTRAINED TECHNICAL ANNOTATIONS & PROVISIONAL WATERMARK          */}
      {/* ================================================================= */}
      <div
        style={{
          position: 'absolute',
          top: 34,
          right: 48,
          padding: '8px 16px',
          borderRadius: 6,
          background: 'rgba(15, 23, 34, 0.76)',
          border: '1px solid rgba(245, 184, 65, 0.55)',
          color: '#E2E8F0',
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 0.6,
          fontFamily: 'Inter, Segoe UI, sans-serif',
        }}
      >
        PROVISIONAL 3D MODEL — 11 kV / 433 V DP STRUCTURE (PENDING WBSEDCL VERIFICATION)
      </div>

      {/* 4-8s HT Assembly Callout */}
      <TechnicalCallout
        visible={frame >= 265 && frame < 465}
        x={1240}
        y={230}
        lineToX={980}
        lineToY={385}
        title="১১ কেভি এইচটি ক্রস-আর্ম ও ইনসুলেটর"
        subtitle="11 kV HT Cross-Arm & Porcelain Insulators (Provisional)"
        accent="#F5B841"
      />

      {/* 8-12s Jumper & LT Cable Dressing Callout */}
      <TechnicalCallout
        visible={frame >= 505 && frame < 705}
        x={1260}
        y={520}
        lineToX={990}
        lineToY={580}
        title="সঠিক জাম্পার ও এলটি কেবল ড্রেসিং"
        subtitle="Jumper Routing & Cleated LT Supports (Provisional)"
        accent="#4BE3C1"
      />

      {/* 12-16s Side-by-Side Comparison Overlay */}
      {isComparison && (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 110,
              bottom: 110,
              width: 2,
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.65), transparent)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 160,
              bottom: 92,
              padding: '12px 24px',
              borderRadius: 8,
              background: 'rgba(24, 16, 16, 0.85)',
              border: '1.5px solid #F87171',
              color: '#FEE2E2',
              fontSize: 28,
              fontWeight: 700,
              fontFamily: 'Hind Siliguri, Noto Sans Bengali, sans-serif',
            }}
          >
            অগোছালো ড্রেসিং (Untidy)
          </div>
          <div
            style={{
              position: 'absolute',
              right: 160,
              bottom: 92,
              padding: '12px 24px',
              borderRadius: 8,
              background: 'rgba(12, 28, 26, 0.85)',
              border: '1.5px solid #34D399',
              color: '#D1FAE5',
              fontSize: 28,
              fontWeight: 700,
              fontFamily: 'Hind Siliguri, Noto Sans Bengali, sans-serif',
            }}
          >
            সঠিক ড্রেসিং (Properly Dressed)
          </div>
        </AbsoluteFill>
      )}

      {/* 16-20s Final Bengali Titles */}
      {mainTitleOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 88,
            bottom: 118,
            opacity: mainTitleOpacity,
            transform: `translateY(${(1 - mainTitleOpacity) * 18}px)`,
            fontFamily: 'Hind Siliguri, Noto Sans Bengali, sans-serif',
            fontSize: 78,
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '0 6px 28px rgba(0, 0, 0, 0.72)',
          }}
        >
          ডিপি স্ট্রাকচার ড্রেসিং
        </div>
      )}

      {endTagOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 88,
            bottom: 118,
            opacity: endTagOpacity,
            transform: `translateY(${(1 - endTagOpacity) * 16}px)`,
            fontFamily: 'Hind Siliguri, Noto Sans Bengali, sans-serif',
            fontSize: 74,
            fontWeight: 700,
            color: '#FBBF24',
            textShadow: '0 6px 28px rgba(0, 0, 0, 0.78)',
          }}
        >
          কাজের কারিগর
        </div>
      )}
    </AbsoluteFill>
  );
};
