import React from 'react';
import { interpolate } from 'remotion';
import { cameraSmooth, punchyEase } from './KineticTypography';

export interface CameraKeyframe {
  frame: number;
  scale: number;
  x: number;
  y: number;
  rotation?: number;
}

interface CameraRigProps {
  currentFrame: number;
  keyframes: CameraKeyframe[];
  children: React.ReactNode;
}

/**
 * Deterministic Multi-Point Camera Rig:
 * Interpolates scale, pan (x,y), and subtle roll across cinematic keyframes
 * using smooth acceleration/deceleration curves to eliminate stiff static framing.
 */
export const CameraRig: React.FC<CameraRigProps> = ({ currentFrame, keyframes, children }) => {
  if (keyframes.length === 0) {
    return <>{children}</>;
  }

  // Find surrounding keyframe segments
  let prev = keyframes[0];
  let next = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (currentFrame >= keyframes[i].frame && currentFrame <= keyframes[i + 1].frame) {
      prev = keyframes[i];
      next = keyframes[i + 1];
      break;
    }
  }

  const duration = next.frame - prev.frame;
  const rawProgress = duration > 0 ? Math.min(1, Math.max(0, (currentFrame - prev.frame) / duration)) : 1;
  const easedProgress = cameraSmooth(rawProgress);

  const currentScale = interpolate(easedProgress, [0, 1], [prev.scale, next.scale]);
  const currentX = interpolate(easedProgress, [0, 1], [prev.x, next.x]);
  const currentY = interpolate(easedProgress, [0, 1], [prev.y, next.y]);
  const currentRot = interpolate(easedProgress, [0, 1], [prev.rotation || 0, next.rotation || 0]);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          width: 1920,
          height: 1080,
          transform: `translate(${currentX}px, ${currentY}px) scale(${currentScale}) rotate(${currentRot}deg)`,
          transformOrigin: '960px 540px',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
};
