import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface KineticWordProps {
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  accentGlow?: string;
  outlineColor?: string;
  delayIndex?: number;
  animationType?: 'slam' | 'pop' | 'slideUp' | 'glitch';
}

export const KineticWord: React.FC<KineticWordProps> = ({
  text,
  startFrame,
  fontSize = 90,
  color = '#FFFFFF',
  accentGlow = 'rgba(0, 240, 255, 0.8)',
  outlineColor,
  delayIndex = 0,
  animationType = 'slam',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const effectiveStart = startFrame + delayIndex * 4;

  if (frame < effectiveStart) {
    return null;
  }

  const localFrame = frame - effectiveStart;

  // Spring bounce scale
  const spr = spring({
    frame: localFrame,
    fps,
    config: {
      damping: 10,
      stiffness: 220,
      mass: 0.4,
    },
  });

  let scale = 1;
  let translateY = 0;
  let opacity = 1;

  if (animationType === 'slam') {
    scale = interpolate(spr, [0, 1], [2.2, 1]);
    opacity = interpolate(localFrame, [0, 4], [0, 1], { extrapolateRight: 'clamp' });
  } else if (animationType === 'pop') {
    scale = interpolate(spr, [0, 1], [0.2, 1]);
    opacity = interpolate(localFrame, [0, 3], [0, 1], { extrapolateRight: 'clamp' });
  } else if (animationType === 'slideUp') {
    translateY = interpolate(spr, [0, 1], [50, 0]);
    opacity = interpolate(localFrame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });
  }

  // Jitter on very first 3 frames of slam
  const jitterX = animationType === 'slam' && localFrame < 4 ? (Math.random() - 0.5) * 6 : 0;

  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
        fontSize,
        fontWeight: 800,
        color,
        letterSpacing: '1px',
        lineHeight: 1.1,
        textShadow: `0 0 25px ${accentGlow}, 0 4px 15px rgba(0,0,0,0.9)`,
        WebkitTextStroke: outlineColor ? `2px ${outlineColor}` : undefined,
        transform: `translate3d(${jitterX}px, ${translateY}px, 0) scale(${scale})`,
        transformOrigin: '50% 50%',
        opacity,
        margin: '0 12px',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
};
