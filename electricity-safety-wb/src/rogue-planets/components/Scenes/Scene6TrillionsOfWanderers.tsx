import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CosmicParallaxStage } from '../CosmicParallaxStage';

/**
 * SCENE 6: Trillions of Wanderers (0:47 – 0:57 | Frames 2820 – 3420, local 0 – 600 @ 60 FPS)
 * The Galactic Twist: Monumental pullback revealing the Milky Way galaxy,
 * showing that rogue planets outnumber all stars by up to 10-to-1.
 */
export const Scene6TrillionsOfWanderers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grand epic zoom-out
  const camScale = interpolate(frame, [0, 600], [1.18, 0.94]);
  const galaxyRotation = frame * 0.04;

  // Counter number ticking up to trillions
  const counterVal = Math.min(
    100,
    Math.floor(
      interpolate(frame, [60, 480], [1, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    )
  );

  return (
    <CosmicParallaxStage
      camX={0}
      camY={0}
      camScale={camScale}
      particleCount={100}
      bgGradient="radial-gradient(ellipse at 50% 50%, #6535A8 0%, #180A59 50%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Galactic Core Glow */}
          <circle cx="1100" cy="680" r="160" fill="#FFD244" opacity="0.85" filter="blur(30px)" />
          <circle cx="1100" cy="680" r="320" fill="#ED4BA4" opacity="0.35" filter="blur(60px)" />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Swirling Spiral Arms of the Milky Way */}
          <g transform={`translate(1100, 680) rotate(${galaxyRotation})`}>
            {[0, 120, 240].map((armRot, armIdx) => (
              <g key={armIdx} transform={`rotate(${armRot})`}>
                <path
                  d="M 0 0 C 180 80, 420 180, 650 360 C 850 520, 940 760, 980 940"
                  fill="none"
                  stroke="#243CDB"
                  strokeWidth="68"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                <path
                  d="M 0 0 C 180 80, 420 180, 650 360 C 850 520, 940 760, 980 940"
                  fill="none"
                  stroke="#22D7DA"
                  strokeWidth="24"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Multiplying Cyan Rogue Planet Dots throughout Interstellar Voids */}
          {Array.from({ length: 65 }).map((_, i) => {
            const rad = (i * 37.5) * (Math.PI / 180);
            const dist = 140 + (i * 12.8) % 780;
            const px = 1100 + Math.cos(rad + galaxyRotation * 0.05) * dist;
            const py = 680 + Math.sin(rad + galaxyRotation * 0.05) * (dist * 0.65);
            const popScale = spring({
              frame: Math.max(0, frame - (i * 6)),
              fps,
              config: { damping: 12, stiffness: 120 },
            });

            return (
              <g key={i} transform={`translate(${px}, ${py}) scale(${popScale})`}>
                <circle cx="0" cy="0" r={4 + (i % 3) * 2.5} fill="#22D7DA" />
                <circle cx="0" cy="0" r={8 + (i % 3) * 3} fill="none" stroke="#22D7DA" strokeWidth="1.2" opacity="0.6" />
              </g>
            );
          })}

          {/* Central Mind-Bending Statistic Card */}
          <g transform="translate(1100, 310)">
            <rect x="-240" y="-48" width="480" height="96" rx="20" fill="#09134B" stroke="#22D7DA" strokeWidth="3.5" />
            <text x="0" y="-8" textAnchor="middle" fill="#FFD244" fontSize="28" fontWeight="800">
              {counterVal > 0 ? `${counterVal * 10} BILLION+` : 'TRILLIONS'}
            </text>
            <text x="0" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="600" letterSpacing="0.08em">
              ROGUE PLANETS POPULATING THE MILKY WAY
            </text>
          </g>
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', bottom: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#FFD244', letterSpacing: '0.12em' }}>
            MACRO-STATISTICAL SURVEY // POPULATION RATIO ~ 10:1 vs MAIN SEQUENCE STARS
          </span>
        </div>
      }
    />
  );
};

