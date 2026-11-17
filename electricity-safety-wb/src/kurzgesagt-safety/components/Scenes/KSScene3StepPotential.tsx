import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { KurzgesagtSafetyParallax } from '../KurzgesagtSafetyParallax';
import { StepPotentialInfographic } from '../KurzgesagtInfographics';

export const KSScene3StepPotential: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  return (
    <KurzgesagtSafetyParallax
      camX={0}
      camY={0}
      camScale={interpolate(frame, [0, 780], [1.0, 1.05])}
      bgGradient="radial-gradient(ellipse at 50% 50%, #180A59 0%, #09134B 60%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          <circle cx="1100" cy="680" r="640" fill="none" stroke="#243CDB" strokeWidth="2" strokeDasharray="16 12" opacity="0.35" />
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Central Scientific Diagram Card */}
          <g transform={`translate(1100, 640) scale(${cardScale})`}>
            <StepPotentialInfographic x={0} y={0} scale={1.22} frame={frame} />
          </g>
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#22D7DA', letterSpacing: '0.12em' }}>
            ELECTRO-PHYSICS BREAKOUT // POTENTIAL GRADIENT LOOP ANALYSIS
          </span>
        </div>
      }
    />
  );
};
