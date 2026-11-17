import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KurzgesagtSafetyParallax } from '../KurzgesagtSafetyParallax';
import { GeometricBishu, GeometricMitu } from '../KurzgesagtCharacterRigs';
import { GeometricUtilityPole } from '../KurzgesagtInfographics';
import { getCameraShake } from '../../../components/ParallaxStage';

export const KSScene1SnappedWire: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 240], [1.0, 1.12]);
  const camX = interpolate(frame, [0, 240], [-80, 40]);

  // Lightning strike at frame 55 with camera shake
  const shake = getCameraShake(frame, 55, 18, 22);
  const lightning = interpolate(frame, [52, 57, 70], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const wireSnapped = frame >= 60;

  return (
    <KurzgesagtSafetyParallax
      camX={camX}
      camY={0}
      camScale={camScale}
      shakeX={shake.shakeX}
      shakeY={shake.shakeY}
      lightningFlash={lightning}
      rainIntensity={0.8}
      bgGradient="radial-gradient(ellipse at 60% 40%, #180A59 0%, #09134B 60%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Dark Storm Clouds */}
          {[200, 680, 1200, 1750].map((cx, i) => (
            <ellipse key={i} cx={cx} cy={220} rx={240} ry={80} fill="#180A59" opacity="0.6" />
          ))}
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Distant Palm Silhouettes */}
          {[280, 740, 1680].map((px, i) => (
            <polygon key={i} points={`${px},780 ${px-8},640 ${px+8},640`} fill="#180A59" />
          ))}
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Ground Surface */}
          <path d="M 0 920 Q 1100 890 2200 930 L 2200 1360 L 0 1360 Z" fill="#C47A53" />

          {/* Roadside Water Puddle */}
          <ellipse cx="1460" cy="980" rx={180} ry={42} fill="#09134B" stroke="#22D7DA" strokeWidth={wireSnapped ? 3.5 : 1.5} />

          {/* Utility Pole with Snapping Wire */}
          <GeometricUtilityPole x={1340} y={800} wireSnapped={wireSnapped} sparkFrame={frame} />

          {/* Jagged Lightning Bolt */}
          {frame >= 52 && frame <= 75 && (
            <polyline
              points="1480,80 1420,280 1490,310 1395,540 1450,560 1400,740"
              fill="none"
              stroke="#22D7DA"
              strokeWidth="10"
            />
          )}

          {/* Mitu and Bishu halting in shock */}
          <GeometricBishu
            x={640}
            y={830}
            scale={0.92}
            frame={frame}
            lookAtX={0.8}
            lookAtY={0.3}
            headTilt={wireSnapped ? 12 : 0}
            expression={wireSnapped ? 'shocked' : 'normal'}
            rightArmAngle={wireSnapped ? -45 : -15}
          />
          <GeometricMitu
            x={520}
            y={855}
            scale={0.92}
            frame={frame}
            lookAtX={0.8}
            lookAtY={0.3}
            headTilt={wireSnapped ? 10 : 0}
            expression={wireSnapped ? 'alert' : 'normal'}
            rightArmAngle={wireSnapped ? -55 : 15}
          />

          {/* Danger Tag Badge */}
          {wireSnapped && (
            <g transform="translate(1560, 720)">
              <rect x="-140" y="-36" width="280" height="72" rx="14" fill="#09134B" stroke="#22D7DA" strokeWidth="3" />
              <text x="0" y="-6" textAnchor="middle" fill="#FFD244" fontSize="19" fontWeight="bold">
                ⚡ বিপদ! ছেঁড়া তার
              </text>
              <text x="0" y="20" textAnchor="middle" fill="#22D7DA" fontSize="13" fontWeight="bold">
                LIVE 440V WIRE IN PUDDLE
              </text>
            </g>
          )}
        </svg>
      }
    />
  );
};
