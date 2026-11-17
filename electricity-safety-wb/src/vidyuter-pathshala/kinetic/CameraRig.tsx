import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface CameraKeyframe {
  frame: number;
  scale?: number;
  x?: number;
  y?: number;
  rotate?: number;
  shake?: number; // shake amplitude
}

interface CameraRigProps {
  children: React.ReactNode;
  keyframes: CameraKeyframe[];
}

export const CameraRig: React.FC<CameraRigProps> = ({ children, keyframes }) => {
  const frame = useCurrentFrame();

  if (keyframes.length === 0) {
    return <div style={{ width: '100%', height: '100%' }}>{children}</div>;
  }

  const frames = keyframes.map((k) => k.frame);
  const scales = keyframes.map((k) => k.scale ?? 1);
  const xs = keyframes.map((k) => k.x ?? 0);
  const ys = keyframes.map((k) => k.y ?? 0);
  const rots = keyframes.map((k) => k.rotate ?? 0);
  const shakes = keyframes.map((k) => k.shake ?? 0);

  const currentScale = interpolate(frame, frames, scales, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentX = interpolate(frame, frames, xs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentY = interpolate(frame, frames, ys, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentRot = interpolate(frame, frames, rots, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentShake = interpolate(frame, frames, shakes, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Calculate random high frequency shake on beats
  const shakeX = currentShake > 0 ? (Math.sin(frame * 1.8) * currentShake) : 0;
  const shakeY = currentShake > 0 ? (Math.cos(frame * 2.1) * currentShake) : 0;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: `scale(${currentScale}) translate3d(${(currentX + shakeX).toFixed(1)}px, ${(currentY + shakeY).toFixed(1)}px, 0) rotate(${currentRot.toFixed(2)}deg)`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
