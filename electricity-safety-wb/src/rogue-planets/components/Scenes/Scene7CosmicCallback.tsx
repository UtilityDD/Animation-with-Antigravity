import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CosmicParallaxStage } from '../CosmicParallaxStage';
import { PicoRig } from '../PicoCharacterRig';
import { RoguePlanetSphere } from '../CosmicProps';

/**
 * SCENE 7: The Cosmic Callback (0:57 – 1:00 | Frames 3420 – 3600, local 0 – 180 @ 60 FPS)
 * A reflective observatory deck ending: Pico holds a warm lantern looking into the vast,
 * quiet cosmos. Concluding punchline: "The universe isn't empty—it's waiting."
 */
export const Scene7CosmicCallback: React.FC = () => {
  const frame = useCurrentFrame();

  // Gentle final pull-back
  const camScale = interpolate(frame, [0, 180], [1.04, 0.98]);

  // Text fade-in at frame 20, holding until fade to black at frame 160-180
  const textOpacity = interpolate(frame, [15, 45, 155, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <CosmicParallaxStage
      camX={0}
      camY={0}
      camScale={camScale}
      particleCount={40}
      bgGradient="radial-gradient(ellipse at 50% 30%, #180A59 0%, #09134B 60%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Distant soft nebula and quiet starfield */}
          <circle cx="1500" cy="460" r="280" fill="#6535A8" opacity="0.3" filter="blur(50px)" />
          <RoguePlanetSphere x={1520} y={480} radius={180} glowColor="#22D7DA" rotation={frame * 0.05} />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Observatory Geometric Glass Dome Ribs */}
          <path
            d="M 280 1360 Q 1100 240 1920 1360"
            fill="none"
            stroke="#243CDB"
            strokeWidth="8"
            opacity="0.45"
          />
          <line x1="1100" y1="240" x2="1100" y2="1360" stroke="#243CDB" strokeWidth="4" opacity="0.3" />
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Observation Deck Railing / Floor */}
          <rect x="0" y="980" width="2200" height="380" fill="#09134B" stroke="#243CDB" strokeWidth="4" />

          {/* Hero Explorer Pico standing and holding warm lantern */}
          <PicoRig
            x={1080}
            y={895}
            scale={1.05}
            frame={frame}
            lookAtX={0.4}
            lookAtY={-0.3}
            headTilt={4}
            holdingProp="lantern"
            expression="happy"
          />

          {/* Inspiring Final Card */}
          <g transform="translate(1100, 480)" opacity={textOpacity}>
            <text
              x="0"
              y="-12"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="38"
              fontWeight="800"
              letterSpacing="0.1em"
            >
              THE UNIVERSE ISN'T EMPTY.
            </text>
            <text
              x="0"
              y="42"
              textAnchor="middle"
              fill="#22D7DA"
              fontSize="28"
              fontWeight="700"
              letterSpacing="0.16em"
            >
              IT'S WAITING.
            </text>
          </g>
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', bottom: 38, left: 44, color: '#FFFFFF', opacity: textOpacity }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#8CAAF7', letterSpacing: '0.12em' }}>
            ROGUE PLANETS // THE DARK WANDERERS OF THE MILKY WAY
          </span>
        </div>
      }
    />
  );
};

