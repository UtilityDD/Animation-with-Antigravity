import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CosmicParallaxStage } from '../CosmicParallaxStage';
import { PicoRig } from '../PicoCharacterRig';
import { SolarClockworkRings } from '../CosmicProps';

/**
 * SCENE 2: The Cosmic Question (0:04 – 0:11 | Frames 240 – 660, local 0 – 420 @ 60 FPS)
 * Contrast between our orderly, sun-bound solar system clockwork and the endless black void beyond.
 */
export const Scene2CosmicQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth horizontal pan from the solar system (left) toward the dark gulf (right)
  const camX = interpolate(frame, [0, 420], [-120, 260], { extrapolateRight: 'clamp' });
  const camScale = interpolate(frame, [0, 200, 420], [1.0, 1.05, 1.0]);

  // Pico looking through holographic scanner with head tilt
  const picoX = interpolate(frame, [0, 420], [680, 840]);
  const lookX = interpolate(frame, [0, 180, 420], [0.2, 0.9, 0.7]);

  return (
    <CosmicParallaxStage
      camX={camX}
      camY={0}
      camScale={camScale}
      particleCount={45}
      bgGradient="radial-gradient(ellipse at 30% 50%, #243CDB 0%, #09134B 55%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Distant orbital boundary lines */}
          <circle cx="580" cy="620" r="780" fill="none" stroke="#243CDB" strokeWidth="1.5" strokeDasharray="12 8" opacity="0.3" />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Faint distant stars */}
          {[200, 480, 880, 1340, 1720, 2040].map((sx, i) => (
            <circle key={i} cx={sx} cy={160 + (i * 210) % 900} r={2} fill="#FFFFFF" opacity={0.7} />
          ))}
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Orderly Solar Clockwork Orbits with Sun on Left */}
          <SolarClockworkRings x={540} y={620} scale={1.15} time={frame} />

          {/* Question / Anomaly Hologram Badge */}
          {frame >= 120 && (
            <g transform={`translate(1320, 420) scale(${interpolate(frame, [120, 160], [0, 1], { extrapolateRight: 'clamp' })})`}>
              <rect x="-140" y="-36" width="280" height="72" rx="14" fill="#09134B" stroke="#22D7DA" strokeWidth="2.5" />
              <text x="0" y="-4" textAnchor="middle" fill="#FFD244" fontSize="18" fontWeight="bold">
                TRINARY ORBITS?
              </text>
              <text x="0" y="22" textAnchor="middle" fill="#22D7DA" fontSize="13" fontWeight="600">
                WHAT LIES BEYOND THE SUN?
              </text>
            </g>
          )}

          {/* Pico floating on the threshold of deep space holding Hologram Magnifier */}
          <PicoRig
            x={picoX}
            y={600}
            scale={0.92}
            frame={frame}
            lookAtX={lookX}
            lookAtY={-0.1}
            headTilt={interpolate(frame, [0, 160, 420], [-6, 12, 6])}
            expression={frame < 180 ? 'curious' : 'surprised'}
            holdingProp="magnifier"
          />
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', bottom: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#8CAAF7', letterSpacing: '0.12em' }}>
            STELLAR SYSTEM LIMIT // REACHING INTERSTELLAR BOUNDARY
          </span>
        </div>
      }
    />
  );
};

