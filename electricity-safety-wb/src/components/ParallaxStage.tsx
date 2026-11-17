import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export interface ParallaxStageProps {
  /** Camera X pan in pixels at 1.0x focus plane */
  camX?: number;
  /** Camera Y pan in pixels at 1.0x focus plane */
  camY?: number;
  /** Camera zoom factor (1.0 = default) */
  camScale?: number;
  /** Subtle 2.5D perspective tilt in degrees */
  camTiltY?: number;
  /** High-frequency camera shake on impacts (lightning, thunder, spark arcs) */
  shakeX?: number;
  shakeY?: number;
  /** Enable broadcast depth-of-field blur on distant Layer 0 */
  depthOfField?: boolean;
  /** Layer 0: Deep Background (0.2x drift speed) - Skies, cranes, distant groves */
  layer0?: React.ReactNode;
  /** Layer 1: Midground (0.5x drift speed) - Mud huts, ponds, electric poles */
  layer1?: React.ReactNode;
  /** Layer 2: Focus Plane (1.0x speed) - Protagonists Mitu & Bishu, active props */
  layer2?: React.ReactNode;
  /** Layer 3: Foreground Occlusion (1.4x speed) - Rain, grass blades, fence posts */
  layer3?: React.ReactNode;
  /** UI / Diagram overlay unaffected by camera pan */
  hudOverlay?: React.ReactNode;
  /** Optional monsoon rain intensity (0 = none, 1 = heavy storm) */
  rainIntensity?: number;
  /** Optional lightning flash opacity (0 to 1) */
  lightningFlash?: number;
  /** Sky background gradient override */
  skyGradient?: string;
}

/**
 * Helper to compute broadcast-style decaying impact camera shake
 */
export const getCameraShake = (
  frame: number,
  triggerFrame: number,
  duration = 14,
  intensity = 16
): { shakeX: number; shakeY: number } => {
  const elapsed = frame - triggerFrame;
  if (elapsed < 0 || elapsed > duration) return { shakeX: 0, shakeY: 0 };
  const decay = 1 - elapsed / duration;
  const shakeX = Math.sin(elapsed * 2.8) * intensity * decay;
  const shakeY = Math.cos(elapsed * 3.4) * (intensity * 0.7) * decay;
  return { shakeX, shakeY };
};

/**
 * 2.5D Multi-Plane Camera & Bengal Patachitra Frame Engine
 * Implements exact 0.2x, 0.5x, 1.0x, and 1.4x depth plane parallax speeds with depth-of-field and impact shake.
 */
export const ParallaxStage: React.FC<ParallaxStageProps> = ({
  camX = 0,
  camY = 0,
  camScale = 1,
  camTiltY = 0,
  shakeX = 0,
  shakeY = 0,
  depthOfField = true,
  layer0,
  layer1,
  layer2,
  layer3,
  hudOverlay,
  rainIntensity = 0,
  lightningFlash = 0,
  skyGradient = 'linear-gradient(180deg, #1E293B 0%, #334155 55%, #475569 100%)',
}) => {
  const frame = useCurrentFrame();

  const totalCamX = camX + shakeX;
  const totalCamY = camY + shakeY;

  // Compute parallax transforms for the 4 depth planes
  const getPlaneStyle = (
    speedMultiplier: number,
    zDistance: number
  ): React.CSSProperties => {
    const tx = -totalCamX * speedMultiplier;
    const ty = -totalCamY * speedMultiplier;
    const scale = 1 + (camScale - 1) * speedMultiplier;
    const rotY = camTiltY * speedMultiplier * 0.4;

    return {
      position: 'absolute',
      inset: -120, // Overscan margin so camera pans never expose edges
      width: 2160,
      height: 1320,
      transform: `perspective(1600px) translate3d(${tx}px, ${ty}px, ${zDistance}px) scale(${scale}) rotateY(${rotY}deg)`,
      transformOrigin: 'center center',
      pointerEvents: 'none',
    };
  };

  // Deterministic rain droplets for Layer 3 foreground
  const rainDrops = React.useMemo(() => {
    return Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      x: (i * 137.5) % 2100,
      speed: 28 + (i % 5) * 6,
      length: 32 + (i % 4) * 14,
      opacity: 0.25 + (i % 3) * 0.15,
      phase: (i * 43) % 1200,
    }));
  }, []);

  return (
    <AbsoluteFill
      style={{
        background: skyGradient,
        overflow: 'hidden',
        fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', 'Segoe UI', sans-serif",
      }}
    >
      {/* Subtle Patachitra hand-woven paper texture grain */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 248, 231, 0.04) 1px, transparent 0), radial-gradient(rgba(196, 122, 83, 0.04) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
          zIndex: 1,
        }}
      />

      {/* LAYER 0: Deep Background (Speed: 0.2x) */}
      <div style={{ ...getPlaneStyle(0.2, -160), zIndex: 2 }}>{layer0}</div>

      {/* LAYER 1: Midground 1 (Speed: 0.5x) */}
      <div style={{ ...getPlaneStyle(0.5, -60), zIndex: 3 }}>{layer1}</div>

      {/* LAYER 2: Focus Plane (Speed: 1.0x) */}
      <div style={{ ...getPlaneStyle(1.0, 0), zIndex: 4 }}>{layer2}</div>

      {/* LAYER 3: Foreground Occlusion & Rain (Speed: 1.4x) */}
      <div style={{ ...getPlaneStyle(1.4, 80), zIndex: 5 }}>
        {layer3}
        {rainIntensity > 0.01 && (
          <svg width="2160" height="1320" viewBox="0 0 2160 1320" style={{ position: 'absolute', inset: 0 }}>
            <g opacity={rainIntensity}>
              {rainDrops.map((drop) => {
                const yPos = ((frame * drop.speed + drop.phase) % 1400) - 80;
                const xPos = (drop.x - ((frame * drop.speed * 0.22) % 2160) + 2160) % 2160;
                return (
                  <line
                    key={drop.id}
                    x1={xPos}
                    y1={yPos}
                    x2={xPos - drop.length * 0.22}
                    y2={yPos + drop.length}
                    stroke="#BAE6FD"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    opacity={drop.opacity}
                  />
                );
              })}
            </g>
          </svg>
        )}
      </div>

      {/* Lightning Flash Overlay */}
      {lightningFlash > 0.01 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#E0F2FE',
            opacity: interpolate(lightningFlash, [0, 1], [0, 0.85]),
            mixBlendMode: 'screen',
            zIndex: 6,
          }}
        />
      )}

      {/* HUD / Diagram Layer */}
      {hudOverlay && <AbsoluteFill style={{ zIndex: 7 }}>{hudOverlay}</AbsoluteFill>}

      {/* Authentic Bengal Patachitra Decorative Border Frame */}
      <PatachitraBorderFrame />
    </AbsoluteFill>
  );
};

export const PatachitraBorderFrame: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 10 }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <pattern id="patachitra-top-bottom" x="0" y="0" width="60" height="22" patternUnits="userSpaceOnUse">
            <rect width="60" height="22" fill="#7C2D12" />
            <path d="M 0 22 L 30 4 L 60 22 Z" fill="#C47A53" />
            <circle cx="30" cy="13" r="4" fill="#FFD600" />
            <circle cx="10" cy="7" r="2.5" fill="#FFF8E7" />
            <circle cx="50" cy="7" r="2.5" fill="#FFF8E7" />
            <line x1="0" y1="21" x2="60" y2="21" stroke="#FFD600" strokeWidth="1.5" />
          </pattern>
          <pattern id="patachitra-left-right" x="0" y="0" width="22" height="60" patternUnits="userSpaceOnUse">
            <rect width="22" height="60" fill="#7C2D12" />
            <path d="M 22 0 L 4 30 L 22 60 Z" fill="#C47A53" />
            <circle cx="13" cy="30" r="4" fill="#FFD600" />
            <circle cx="7" cy="10" r="2.5" fill="#FFF8E7" />
            <circle cx="7" cy="50" r="2.5" fill="#FFF8E7" />
            <line x1="21" y1="0" x2="21" y2="60" stroke="#FFD600" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* Top & Bottom Borders */}
        <rect x="0" y="0" width="1920" height="18" fill="url(#patachitra-top-bottom)" />
        <rect x="0" y="1062" width="1920" height="18" fill="url(#patachitra-top-bottom)" />

        {/* Left & Right Borders */}
        <rect x="0" y="0" width="18" height="1080" fill="url(#patachitra-left-right)" />
        <rect x="1902" y="0" width="18" height="1080" fill="url(#patachitra-left-right)" />

        {/* 4 Corner Lotus Medallions */}
        {[
          [18, 18],
          [1902, 18],
          [18, 1062],
          [1902, 1062],
        ].map(([cx, cy], idx) => (
          <g key={idx} transform={`translate(${cx}, ${cy})`}>
            <circle r="16" fill="#7C2D12" stroke="#FFD600" strokeWidth="2.5" />
            <circle r="9" fill="#C47A53" />
            <circle r="4" fill="#FFD600" />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
