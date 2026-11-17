import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ElectricArcsProps {
  intensity?: number;
  color?: string;
}

export const ElectricArcs: React.FC<ElectricArcsProps> = ({
  intensity = 1,
  color = '#00F0FF',
}) => {
  const frame = useCurrentFrame();

  // Generate deterministic pseudo-random lightning path based on frame
  const seed = (frame * 17) % 100;
  const isFlash = frame % 3 === 0;

  if (!isFlash && intensity < 0.5) return null;

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
        zIndex: 20,
        opacity: isFlash ? 1 : 0.7,
      }}
    >
      <defs>
        <filter id="arcGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main diagonal lightning bolt */}
      <path
        d={`M ${150 + seed * 2} 0 
            L ${350 + (seed % 30)} 240 
            L ${280 - (seed % 20)} 280 
            L ${600 + (seed % 40)} 520 
            L ${520 - (seed % 25)} 560 
            L ${960 + (seed % 50)} 780 
            L ${1200 + (seed % 30)} 1080`}
        stroke={color}
        strokeWidth={isFlash ? 5 : 3}
        fill="none"
        filter="url(#arcGlow)"
        strokeLinecap="round"
      />

      {/* Branching secondary tendril */}
      <path
        d={`M ${600 + (seed % 40)} 520 
            L ${820 + (seed % 50)} 460 
            L ${1050 + (seed % 30)} 500`}
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        filter="url(#arcGlow)"
      />

      {/* Right corner arc */}
      <path
        d={`M 1800 ${200 + seed * 3} 
            L 1550 ${380 - (seed % 30)} 
            L 1620 ${430 + (seed % 20)} 
            L 1400 ${650 - (seed % 40)}`}
        stroke={color}
        strokeWidth="3"
        fill="none"
        filter="url(#arcGlow)"
      />
    </svg>
  );
};
