import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export interface CosmicParallaxStageProps {
  /** Camera X pan at 1.0x focus plane */
  camX?: number;
  /** Camera Y pan at 1.0x focus plane */
  camY?: number;
  /** Camera zoom factor (1.0 = default) */
  camScale?: number;
  /** Subtle 2.5D perspective tilt in degrees */
  camTiltY?: number;
  /** Layer 0: Deep Void & Nebulae (0.15x drift speed) */
  layer0?: React.ReactNode;
  /** Layer 1: Distant Stars & Accretion Dust (0.40x drift speed) */
  layer1?: React.ReactNode;
  /** Layer 2: Primary Focus Plane (1.00x speed) - Hero Planets, Pico, props */
  layer2?: React.ReactNode;
  /** Layer 3: Foreground Stardust & Occlusion (1.50x speed) */
  layer3?: React.ReactNode;
  /** Overlay graphics / HUD */
  hudOverlay?: React.ReactNode;
  /** Ambient cosmic particles */
  particleCount?: number;
  /** Base background gradient */
  bgGradient?: string;
}

/**
 * 60 FPS Cinematic Virtual Camera & Multi-Plane Parallax Stage
 * Follows Kurzgesagt aesthetic with smooth 0.15x, 0.40x, 1.00x, and 1.50x depth planes.
 */
export const CosmicParallaxStage: React.FC<CosmicParallaxStageProps> = ({
  camX = 0,
  camY = 0,
  camScale = 1,
  camTiltY = 0,
  layer0,
  layer1,
  layer2,
  layer3,
  hudOverlay,
  particleCount = 50,
  bgGradient = 'radial-gradient(ellipse at 50% 50%, #180A59 0%, #09134B 65%, #05071A 100%)',
}) => {
  const frame = useCurrentFrame();

  const getPlaneStyle = (speedMultiplier: number, zDistance: number): React.CSSProperties => {
    const tx = -camX * speedMultiplier;
    const ty = -camY * speedMultiplier;
    const scale = 1 + (camScale - 1) * speedMultiplier;
    const rotY = camTiltY * speedMultiplier * 0.35;

    return {
      position: 'absolute',
      inset: -140, // 140px overscan so camera pans never reveal borders
      width: 2200,
      height: 1360,
      transform: `perspective(1800px) translate3d(${tx}px, ${ty}px, ${zDistance}px) scale(${scale}) rotateY(${rotY}deg)`,
      transformOrigin: 'center center',
      pointerEvents: 'none',
    };
  };

  // Deterministic 60 FPS floating cosmic dust motes
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: (i * 187.3) % 2160,
      y: (i * 123.7) % 1300,
      r: 1.2 + (i % 4) * 0.9,
      speedX: 0.18 + (i % 3) * 0.15,
      speedY: -0.25 - (i % 5) * 0.12,
      opacity: 0.25 + (i % 4) * 0.18,
      color: i % 3 === 0 ? '#22D7DA' : i % 3 === 1 ? '#FFD244' : '#8CAAF7',
    }));
  }, [particleCount]);

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        overflow: 'hidden',
        fontFamily: "'Montserrat', 'Poppins', -apple-system, sans-serif",
      }}
    >
      {/* LAYER 0: Deep Void & Nebulae (0.15x) */}
      <div style={{ ...getPlaneStyle(0.15, -180), zIndex: 1 }}>{layer0}</div>

      {/* LAYER 1: Distant Stars & Accretion Dust (0.40x) */}
      <div style={{ ...getPlaneStyle(0.40, -80), zIndex: 2 }}>{layer1}</div>

      {/* LAYER 2: Hero Focus Plane (1.00x) */}
      <div style={{ ...getPlaneStyle(1.00, 0), zIndex: 3 }}>{layer2}</div>

      {/* LAYER 3: Foreground Stardust & Occlusion (1.50x) */}
      <div style={{ ...getPlaneStyle(1.50, 90), zIndex: 4 }}>
        {layer3}
        <svg width="2200" height="1360" viewBox="0 0 2200 1360" style={{ position: 'absolute', inset: 0 }}>
          {particles.map((p) => {
            const posX = (p.x + frame * p.speedX) % 2200;
            const posY = ((p.y + frame * p.speedY) % 1360 + 1360) % 1360;
            return (
              <circle
                key={p.id}
                cx={posX}
                cy={posY}
                r={p.r}
                fill={p.color}
                opacity={p.opacity}
              />
            );
          })}
        </svg>
      </div>

      {/* HUD & Clean Title Layer */}
      {hudOverlay && <AbsoluteFill style={{ zIndex: 10 }}>{hudOverlay}</AbsoluteFill>}
    </AbsoluteFill>
  );
};

