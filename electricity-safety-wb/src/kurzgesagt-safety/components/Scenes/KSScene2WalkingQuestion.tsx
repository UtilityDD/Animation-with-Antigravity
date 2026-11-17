import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KurzgesagtSafetyParallax } from '../KurzgesagtSafetyParallax';
import { GeometricBishu, GeometricMitu } from '../KurzgesagtCharacterRigs';

export const KSScene2WalkingQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 240, 480], [1.02, 1.15, 1.08]);
  const camX = interpolate(frame, [0, 480], [0, 80]);

  // Bishu steps forward; Mitu pulls him back
  const bishuX = interpolate(frame, [0, 180, 260, 480], [740, 920, 860, 860], { extrapolateRight: 'clamp' });
  const mituArmAngle = interpolate(frame, [0, 180, 240, 480], [15, -45, -75, -60], { extrapolateRight: 'clamp' });

  return (
    <KurzgesagtSafetyParallax
      camX={camX}
      camY={15}
      camScale={camScale}
      rainIntensity={0.6}
      bgGradient="radial-gradient(ellipse at 40% 50%, #243CDB 0%, #09134B 55%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          <circle cx="1100" cy="540" r="720" fill="none" stroke="#243CDB" strokeWidth="2" strokeDasharray="14 10" opacity="0.25" />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Ground Voltage Contour Rings spreading from puddle */}
          {[180, 320, 480, 660].map((r, i) => (
            <ellipse
              key={i}
              cx="1380"
              cy="980"
              rx={r}
              ry={r * 0.28}
              fill="none"
              stroke="#22D7DA"
              strokeWidth={2.5}
              strokeDasharray="10 6"
              opacity={0.45 - i * 0.08}
            />
          ))}
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          <path d="M 0 920 Q 1100 890 2200 930 L 2200 1360 L 0 1360 Z" fill="#C47A53" />

          {/* Bishu stepping onto voltage field */}
          <GeometricBishu
            x={bishuX}
            y={830}
            scale={0.96}
            frame={frame}
            leftLegAngle={frame < 180 ? 25 : 5}
            rightLegAngle={frame < 180 ? -25 : -5}
            lookAtX={0.6}
            lookAtY={0.4}
            expression={frame < 180 ? 'normal' : 'shocked'}
          />

          {/* Mitu grabbing him to safety */}
          <GeometricMitu
            x={640}
            y={855}
            scale={0.96}
            frame={frame}
            rightArmAngle={mituArmAngle}
            lookAtX={0.7}
            lookAtY={0.2}
            expression="alert"
          />

          {/* Big Conceptual Question Banner */}
          {frame >= 120 && (
            <g transform="translate(1100, 380)">
              <rect x="-240" y="-45" width="480" height="90" rx="18" fill="#09134B" stroke="#FFD244" strokeWidth="3" />
              <text x="0" y="-8" textAnchor="middle" fill="#FFD244" fontSize="22" fontWeight="800">
                কেন সাধারণ হাঁটা এখানে প্রাণঘাতী?
              </text>
              <text x="0" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="600">
                WHY DOES WALKING NORMALLY KILL?
              </text>
            </g>
          )}
        </svg>
      }
    />
  );
};
