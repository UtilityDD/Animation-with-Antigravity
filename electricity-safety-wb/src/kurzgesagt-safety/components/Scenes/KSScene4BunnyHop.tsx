import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KurzgesagtSafetyParallax } from '../KurzgesagtSafetyParallax';
import { GeometricBishu, GeometricMitu, GeometricBidyutBondhu } from '../KurzgesagtCharacterRigs';

export const KSScene4BunnyHop: React.FC = () => {
  const frame = useCurrentFrame();

  const camX = interpolate(frame, [0, 780], [60, -180]);
  const camScale = interpolate(frame, [0, 780], [1.02, 1.08]);

  // Rhythmic 60 FPS Bunny Hop Physics
  const hopCycle = (frame % 50) / 50; // Each hop takes ~50 frames (~0.8s)
  const hopArcY = -Math.sin(hopCycle * Math.PI) * 65;
  const hopRetreatX = interpolate(frame, [0, 780], [0, -420]);

  // Squash & Stretch
  const hopSquashY = hopCycle < 0.15 || hopCycle > 0.85 ? 0.82 : 1.15;
  const hopSquashX = hopCycle < 0.15 || hopCycle > 0.85 ? 1.16 : 0.88;

  return (
    <KurzgesagtSafetyParallax
      camX={camX}
      camY={15}
      camScale={camScale}
      rainIntensity={0.4}
      bgGradient="radial-gradient(ellipse at 40% 60%, #180A59 0%, #09134B 55%, #05071A 100%)"
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* 10 Meter / 30 Feet Safe Distance Boundary Arc */}
          <ellipse cx="1400" cy="980" rx="680" ry="190" fill="none" stroke="#22D7DA" strokeWidth="3" strokeDasharray="14 8" opacity="0.6" />
          <text x="760" y="930" fill="#22D7DA" fontSize="16" fontWeight="bold">
            SAFE DISTANCE &gt; 10 METERS (30 FEET)
          </text>
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          <path d="M 0 920 Q 1100 890 2200 930 L 2200 1360 L 0 1360 Z" fill="#C47A53" />

          {/* Bishu Bunny-Hopping (Joined Feet) */}
          <GeometricBishu
            x={1120 + hopRetreatX}
            y={830 + hopArcY}
            scale={0.94}
            frame={frame}
            squashX={hopSquashX}
            squashY={hopSquashY}
            flipX={true}
            leftLegAngle={0}
            rightLegAngle={0}
            leftArmAngle={35}
            rightArmAngle={35}
            lookAtX={-0.6}
            expression="alert"
          />

          {/* Mitu Bunny-Hopping Beside Him */}
          <GeometricMitu
            x={980 + hopRetreatX}
            y={855 + hopArcY}
            scale={0.94}
            frame={frame}
            squashX={hopSquashX}
            squashY={hopSquashY}
            flipX={true}
            leftLegAngle={0}
            rightLegAngle={0}
            leftArmAngle={30}
            rightArmAngle={30}
            lookAtX={-0.6}
            expression="alert"
          />

          {/* Joined Feet Highlight Ring */}
          <ellipse
            cx={1120 + hopRetreatX}
            cy={965 + hopArcY}
            rx="32"
            ry="12"
            fill="none"
            stroke="#FFD244"
            strokeWidth="3.5"
          />

          {/* Mascot Bidyut Bondhu Guiding with Safe Badge */}
          <GeometricBidyutBondhu
            x={760 + hopRetreatX * 0.8}
            y={680}
            scale={1.15}
            frame={frame}
          />

          {/* Protocol Card */}
          <g transform="translate(1100, 380)">
            <rect x="-240" y="-45" width="480" height="90" rx="18" fill="#09134B" stroke="#22D7DA" strokeWidth="3" />
            <text x="0" y="-8" textAnchor="middle" fill="#FFD244" fontSize="22" fontWeight="800">
              খরগোশ লাফ বা পা না তুলে ঘষে চলা
            </text>
            <text x="0" y="24" textAnchor="middle" fill="#22D7DA" fontSize="14" fontWeight="bold">
              BUNNY HOP OR SHUFFLE PROTOCOL // ΔV = 0V
            </text>
          </g>
        </svg>
      }
    />
  );
};
