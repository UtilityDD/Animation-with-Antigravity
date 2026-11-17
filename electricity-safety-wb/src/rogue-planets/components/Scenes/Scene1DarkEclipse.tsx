import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CosmicParallaxStage } from '../CosmicParallaxStage';
import { PicoRig } from '../PicoCharacterRig';
import { RoguePlanetSphere } from '../CosmicProps';

/**
 * SCENE 1: The Dark Eclipse (0:00 – 0:04 | Frames 0 – 240 @ 60 FPS)
 * Visual Hook: A pitch-black spherical void eclipses a distant starfield.
 * Scout explorer Pico floats in the foreground sweeping a spotlight beam across the frozen surface.
 */
export const Scene1DarkEclipse: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow, cinematic 60 FPS camera push-in
  const camScale = interpolate(frame, [0, 240], [1.0, 1.12], { extrapolateRight: 'clamp' });
  const camX = interpolate(frame, [0, 240], [-60, 40], { extrapolateRight: 'clamp' });

  // Floating probe trajectory
  const picoX = interpolate(frame, [0, 240], [420, 520]);
  const picoY = 620 + Math.sin(frame * 0.05) * 16;
  const spotlightRot = interpolate(frame, [0, 240], [-25, 10]);

  return (
    <CosmicParallaxStage
      camX={camX}
      camY={0}
      camScale={camScale}
      particleCount={60}
      bgGradient="radial-gradient(ellipse at 70% 40%, #180A59 0%, #09134B 60%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Deep Purple Nebula Haze */}
          <path
            d="M 200 300 Q 600 120 1200 240 T 2000 400 Q 1800 800 1100 700 T 200 650 Z"
            fill="#6535A8"
            opacity="0.25"
            filter="blur(40px)"
          />
          {/* Distant bright star being eclipsed */}
          <circle cx="1280" cy="540" r="160" fill="none" stroke="#FFD244" strokeWidth="4" opacity="0.4" />
          <circle cx="1280" cy="540" r="80" fill="#FFD244" opacity="0.8" />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Interstellar drift debris */}
          {[120, 460, 920, 1540, 1820].map((x, i) => (
            <circle key={i} cx={x} cy={200 + (i * 180) % 800} r={2.5} fill="#FFFFFF" opacity={0.6} />
          ))}
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Colossal Eclipsing Rogue Planet */}
          <RoguePlanetSphere
            x={1260}
            y={540}
            radius={380}
            glowColor="#22D7DA"
            rotation={frame * 0.08}
          />

          {/* Hero Explorer Pico with sweeping spotlight beam */}
          <g transform={`rotate(${spotlightRot}, ${picoX}, ${picoY})`}>
            <PicoRig
              x={picoX}
              y={picoY}
              scale={0.95}
              frame={frame}
              lookAtX={0.8}
              lookAtY={-0.2}
              headTilt={-8}
              holdingProp="spotlight"
              expression="curious"
            />
          </g>
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22D7DA', boxShadow: '0 0 10px #22D7DA' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#22D7DA', letterSpacing: '0.15em' }}>DEEP SPACE SCAN // UNBOUND MASS DETECTED</span>
          </div>
        </div>
      }
    />
  );
};

