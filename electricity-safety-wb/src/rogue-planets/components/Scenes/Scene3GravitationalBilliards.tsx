import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CosmicParallaxStage } from '../CosmicParallaxStage';

/**
 * SCENE 3: Gravitational Billiards (0:11 – 0:20 | Frames 660 – 1200, local 0 – 540 @ 60 FPS)
 * Kinetic action sequence showing two gas giants playing gravitational billiards,
 * ejecting a young terrestrial world into the interstellar dark.
 */
export const Scene3GravitationalBilliards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fast energetic whip-pan camera
  const camX = interpolate(frame, [0, 220, 360, 540], [-80, 20, 280, 440], { extrapolateRight: 'clamp' });
  const camScale = interpolate(frame, [0, 220, 340, 540], [1.0, 1.15, 1.08, 1.02]);

  // Gas Giant 1 (Massive Striped Orange & Yellow Giant)
  const giant1X = 640 + Math.sin(frame * 0.04) * 35;
  const giant1Y = 460 + Math.cos(frame * 0.04) * 25;

  // Gas Giant 2 (Striped Cyan & Magenta Giant)
  const giant2X = 1180 - Math.sin(frame * 0.04) * 45;
  const giant2Y = 620 - Math.cos(frame * 0.04) * 30;

  // Ejected World: Approaches close encounter (frames 0-210), compresses in anticipation (210-240), then catapults (240-540)
  const isEjecting = frame >= 240;
  const ejectSpring = spring({
    frame: Math.max(0, frame - 240),
    fps,
    config: { damping: 10, stiffness: 85, mass: 0.8 },
  });

  const ejectedX = frame < 210
    ? interpolate(frame, [0, 210], [380, 860])
    : frame < 240
    ? 860 + Math.sin((frame - 210) * 0.4) * 12 // Anticipation jitter
    : 860 + ejectSpring * 1400; // Catapult launch!

  const ejectedY = frame < 210
    ? interpolate(frame, [0, 210], [520, 540])
    : frame < 240
    ? 540
    : 540 - ejectSpring * 450;

  const ejectedSquashX = frame >= 210 && frame < 240 ? 0.78 : isEjecting ? 1.25 : 1.0;
  const ejectedSquashY = frame >= 210 && frame < 240 ? 1.22 : isEjecting ? 0.80 : 1.0;

  return (
    <CosmicParallaxStage
      camX={camX}
      camY={0}
      camScale={camScale}
      particleCount={80}
      bgGradient="radial-gradient(ellipse at 50% 50%, #6535A8 0%, #180A59 55%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Swirling Protoplanetary Debris Disc */}
          <ellipse
            cx="1000"
            cy="580"
            rx="1050"
            ry="480"
            fill="none"
            stroke="#ED4BA4"
            strokeWidth="32"
            opacity="0.25"
            transform={`rotate(${-12 + frame * 0.05}, 1000, 580)`}
          />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Elastic Gravitational Slingshot Tension Lines between Giants */}
          <path
            d={`M ${giant1X} ${giant1Y} Q ${ejectedX} ${ejectedY} ${giant2X} ${giant2Y}`}
            fill="none"
            stroke="#ED4BA4"
            strokeWidth={4 + Math.sin(frame * 0.3) * 2}
            strokeDasharray="14 8"
            opacity="0.85"
          />
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Giant 1 (Gas Giant) */}
          <g transform={`translate(${giant1X}, ${giant1Y})`}>
            <circle cx="0" cy="0" r="160" fill="#FF851D" stroke="#FFD244" strokeWidth="4" />
            <path d="M -155 -30 Q 0 -60 155 -30 L 155 10 Q 0 -20 -155 10 Z" fill="#B45309" opacity="0.6" />
            <path d="M -150 40 Q 0 10 150 40 L 140 80 Q 0 50 -140 80 Z" fill="#FFD244" opacity="0.4" />
            <circle cx="-50" cy="60" r="26" fill="#DC2626" opacity="0.8" /> {/* Great Red Storm */}
          </g>

          {/* Giant 2 (Ice Giant) */}
          <g transform={`translate(${giant2X}, ${giant2Y})`}>
            <circle cx="0" cy="0" r="130" fill="#243CDB" stroke="#22D7DA" strokeWidth="4" />
            <ellipse cx="0" cy="0" rx="190" ry="32" fill="none" stroke="#22D7DA" strokeWidth="6" opacity="0.65" transform="rotate(-24)" />
          </g>

          {/* Ejected Terrestrial World with Dynamic Slingshot Squash & Stretch */}
          <g transform={`translate(${ejectedX}, ${ejectedY}) rotate(${-15 + frame * 2}) scale(${ejectedSquashX}, ${ejectedSquashY})`}>
            <circle cx="0" cy="0" r="62" fill="#8CAAF7" stroke="#22D7DA" strokeWidth="3.5" />
            <circle cx="-16" cy="-12" r="16" fill="#180A59" opacity="0.4" />
            {/* Speed Smear Lines on ejection */}
            {isEjecting && (
              <g>
                <line x1="-160" y1="-8" x2="-80" y2="-8" stroke="#ED4BA4" strokeWidth="4" strokeLinecap="round" />
                <line x1="-220" y1="12" x2="-95" y2="12" stroke="#22D7DA" strokeWidth="3" strokeLinecap="round" />
                <line x1="-140" y1="28" x2="-75" y2="28" stroke="#FFD244" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}
          </g>

          {/* Dynamic Vector Slingshot Label */}
          {frame >= 220 && frame <= 380 && (
            <g transform="translate(920, 360)">
              <rect x="-130" y="-30" width="260" height="60" rx="12" fill="#09134B" stroke="#ED4BA4" strokeWidth="3" />
              <text x="0" y="-4" textAnchor="middle" fill="#FFD244" fontSize="16" fontWeight="bold">
                GRAVITATIONAL SLINGSHOT
              </text>
              <text x="0" y="18" textAnchor="middle" fill="#ED4BA4" fontSize="12" fontWeight="bold">
                ESCAPE VELOCITY EXCEEDED
              </text>
            </g>
          )}
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#ED4BA4', letterSpacing: '0.12em' }}>
            ORBITAL PERTURBATION // 3-BODY CHAOS IN PROGRESS
          </span>
        </div>
      }
    />
  );
};

