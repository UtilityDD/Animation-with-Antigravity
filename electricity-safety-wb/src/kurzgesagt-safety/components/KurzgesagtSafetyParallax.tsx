import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export interface KurzgesagtSafetyParallaxProps {
  camX?: number;
  camY?: number;
  camScale?: number;
  camTiltY?: number;
  shakeX?: number;
  shakeY?: number;
  lightningFlash?: number;
  rainIntensity?: number;
  layer0?: React.ReactNode;
  layer1?: React.ReactNode;
  layer2?: React.ReactNode;
  layer3?: React.ReactNode;
  hudOverlay?: React.ReactNode;
  bgGradient?: string;
}

/**
 * 60 FPS Kurzgesagt-Style Multi-Plane Virtual Camera & Parallax Engine
 */
export const KurzgesagtSafetyParallax: React.FC<KurzgesagtSafetyParallaxProps> = ({
  camX = 0,
  camY = 0,
  camScale = 1,
  camTiltY = 0,
  shakeX = 0,
  shakeY = 0,
  lightningFlash = 0,
  rainIntensity = 0,
  layer0,
  layer1,
  layer2,
  layer3,
  hudOverlay,
  bgGradient = 'radial-gradient(ellipse at 50% 40%, #180A59 0%, #09134B 60%, #05071A 100%)',
}) => {
  const frame = useCurrentFrame();

  const totalCamX = camX + shakeX;
  const totalCamY = camY + shakeY;

  const getPlaneStyle = (speedMultiplier: number, zDistance: number): React.CSSProperties => {
    const tx = -totalCamX * speedMultiplier;
    const ty = -totalCamY * speedMultiplier;
    const scale = 1 + (camScale - 1) * speedMultiplier;
    const rotY = camTiltY * speedMultiplier * 0.35;

    return {
      position: 'absolute',
      inset: -140,
      width: 2200,
      height: 1360,
      transform: `perspective(1800px) translate3d(${tx}px, ${ty}px, ${zDistance}px) scale(${scale}) rotateY(${rotY}deg)`,
      transformOrigin: 'center center',
      pointerEvents: 'none',
    };
  };

  // 60 FPS deterministic rain streaks
  const rainStreaks = React.useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: (i * 153.2) % 2200,
      speed: 32 + (i % 5) * 8,
      len: 42 + (i % 4) * 16,
      opacity: 0.35 + (i % 3) * 0.18,
    }));
  }, []);

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        overflow: 'hidden',
        fontFamily: "'Montserrat', 'Hind Siliguri', -apple-system, sans-serif",
      }}
    >
      {/* LAYER 0: Deep Background (0.15x) */}
      <div style={{ ...getPlaneStyle(0.15, -180), zIndex: 1 }}>{layer0}</div>

      {/* LAYER 1: Midground (0.40x) */}
      <div style={{ ...getPlaneStyle(0.40, -80), zIndex: 2 }}>{layer1}</div>

      {/* LAYER 2: Hero Focus Plane (1.00x) */}
      <div style={{ ...getPlaneStyle(1.00, 0), zIndex: 3 }}>{layer2}</div>

      {/* LAYER 3: Foreground Rain & Occlusion (1.50x) */}
      <div style={{ ...getPlaneStyle(1.50, 90), zIndex: 4 }}>
        {layer3}
        {rainIntensity > 0.05 && (
          <svg width="2200" height="1360" viewBox="0 0 2200 1360" style={{ position: 'absolute', inset: 0 }}>
            <g opacity={rainIntensity}>
              {rainStreaks.map((r) => {
                const yPos = ((frame * r.speed) % 1500) - 100;
                const xPos = (r.x - ((frame * r.speed * 0.2) % 2200) + 2200) % 2200;
                return (
                  <line
                    key={r.id}
                    x1={xPos}
                    y1={yPos}
                    x2={xPos - r.len * 0.2}
                    y2={yPos + r.len}
                    stroke="#22D7DA"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    opacity={r.opacity}
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
            backgroundColor: '#22D7DA',
            opacity: lightningFlash * 0.85,
            mixBlendMode: 'screen',
            zIndex: 6,
          }}
        />
      )}

      {/* HUD Overlay */}
      {hudOverlay && <AbsoluteFill style={{ zIndex: 10 }}>{hudOverlay}</AbsoluteFill>}
    </AbsoluteFill>
  );
};
