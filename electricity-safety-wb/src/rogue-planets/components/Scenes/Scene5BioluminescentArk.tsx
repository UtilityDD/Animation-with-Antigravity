import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CosmicParallaxStage } from '../CosmicParallaxStage';
import { PicoRig } from '../PicoCharacterRig';
import { BioluminescentJellyfish, HydrothermalVent } from '../CosmicProps';

/**
 * SCENE 5: The Bioluminescent Ark (0:35 – 0:47 | Frames 2100 – 2820, local 0 – 720 @ 60 FPS)
 * Subsurface ocean interior: geothermal hydrothermal vents powering bizarre bioluminescent ecosystems,
 * proving that rogue planets can act as self-contained interstellar arks for life.
 */
export const Scene5BioluminescentArk: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow, serene tracking camera
  const camX = interpolate(frame, [0, 720], [-80, 120]);
  const camScale = interpolate(frame, [0, 360, 720], [1.0, 1.06, 1.0]);

  // Pico swimming gently across the ocean scene
  const picoX = interpolate(frame, [0, 720], [520, 840]);
  const picoY = 560 + Math.sin(frame * 0.06) * 22;

  // Undulating jellyfish creatures
  const jelly1Y = 460 + Math.sin(frame * 0.08) * 35;
  const jelly2Y = 620 + Math.cos(frame * 0.07) * 45;

  return (
    <CosmicParallaxStage
      camX={camX}
      camY={0}
      camScale={camScale}
      particleCount={90}
      bgGradient="radial-gradient(ellipse at 50% 80%, #243CDB 0%, #180A59 50%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Deep Ocean Basalt Floor */}
          <path d="M 0 1100 Q 550 1020 1100 1080 T 2200 1060 L 2200 1360 L 0 1360 Z" fill="#09134B" />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Hydrothermal Vents ("Black Smokers") on Ocean Floor */}
          <HydrothermalVent x={380} y={960} scale={1.1} frame={frame} />
          <HydrothermalVent x={1640} y={980} scale={1.25} frame={frame + 30} />
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Bioluminescent Extremophile Creatures */}
          <BioluminescentJellyfish x={1240} y={jelly1Y} scale={1.2} frame={frame} />
          <BioluminescentJellyfish x={1480} y={jelly2Y} scale={0.85} frame={frame + 45} />
          <BioluminescentJellyfish x={320} y={540 + Math.sin(frame * 0.09) * 28} scale={0.9} frame={frame + 15} />

          {/* Hero Explorer Pico in Hydro-Diving Sphere */}
          <PicoRig
            x={picoX}
            y={picoY}
            scale={0.92}
            frame={frame}
            lookAtX={0.6}
            lookAtY={-0.3}
            headTilt={Math.sin(frame * 0.05) * 8}
            wingLeftAngle={25 + Math.sin(frame * 0.1) * 15}
            wingRightAngle={-25 - Math.sin(frame * 0.1) * 15}
            expression="happy"
            divingHelmet={true}
          />

          {/* Educational Callout Badge */}
          {frame >= 180 && (
            <g transform="translate(1380, 360)">
              <rect x="-145" y="-35" width="290" height="70" rx="14" fill="#09134B" stroke="#22D7DA" strokeWidth="3" />
              <text x="0" y="-6" textAnchor="middle" fill="#22D7DA" fontSize="17" fontWeight="bold">
                CHEMOSYNTHESIS ZONES
              </text>
              <text x="0" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                LIFE WITHOUT SUNLIGHT
              </text>
            </g>
          )}
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#22D7DA', letterSpacing: '0.12em' }}>
            ABYSSAL BIOSIGNATURE // ORGANIC CHEMOSYNTHESIS ACTIVE
          </span>
        </div>
      }
    />
  );
};

