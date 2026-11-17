import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SparkBurstProps {
  x: number;
  y: number;
  startFrame: number;
  count?: number;
  color?: string;
}

export const SparkBurst: React.FC<SparkBurstProps> = ({
  x,
  y,
  startFrame,
  count = 16,
  color = '#00F0FF',
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > startFrame + 30) {
    return null;
  }

  const localFrame = frame - startFrame;

  // Expanding shockwave ring
  const ringRadius = interpolate(localFrame, [0, 25], [10, 260], {
    extrapolateRight: 'clamp',
  });
  const ringOpacity = interpolate(localFrame, [0, 5, 25], [0, 1, 0], {
    extrapolateRight: 'clamp',
  });

  // Particle distance expansion
  const particleDistance = interpolate(localFrame, [0, 25], [5, 220], {
    extrapolateRight: 'clamp',
  });
  const particleOpacity = interpolate(localFrame, [0, 4, 25], [0, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 25,
      }}
    >
      <defs>
        <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Expanding shockwave ring */}
      <circle
        cx={x}
        cy={y}
        r={ringRadius}
        fill="none"
        stroke={color}
        strokeWidth={Math.max(1, 5 - localFrame * 0.18)}
        opacity={ringOpacity}
      />

      {/* Radiating spark particles */}
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * 360) / count;
        const rad = (angle * Math.PI) / 180;
        const px = x + Math.cos(rad) * particleDistance;
        const py = y + Math.sin(rad) * particleDistance;
        const size = (i % 2 === 0 ? 6 : 4) * (1 - localFrame / 28);

        return (
          <g key={i} transform={`translate(${px}, ${py})`} opacity={particleOpacity}>
            <polygon
              points={`0,-${size * 2} ${size},0 0,${size * 2} -${size},0`}
              fill="#FFFFFF"
            />
            <circle cx="0" cy="0" r={size * 1.5} fill="url(#sparkGlow)" />
          </g>
        );
      })}
    </svg>
  );
};
