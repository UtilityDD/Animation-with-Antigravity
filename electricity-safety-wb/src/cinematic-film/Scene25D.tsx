import React from 'react';
import { Easing, interpolate } from 'remotion';

export interface CameraState {
  /** World X coordinate at camera look-at center */
  x: number;
  /** World Y coordinate at camera look-at center */
  y: number;
  /** Camera Z position (negative = pulled back, positive = pushed in) */
  z: number;
  /** Additional optical zoom multiplier */
  zoom: number;
  /** Subtle Dutch tilt / roll in degrees */
  roll?: number;
}

export interface CameraKeyframe {
  frame: number;
  state: CameraState;
  easing?: (t: number) => number;
}

export const FOCAL_LENGTH = 920;

export const EASE_CINEMATIC = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_WHIP = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);

/**
 * Deterministic keyframe camera interpolator with per-segment easing.
 */
export function interpolateCamera(
  frame: number,
  keyframes: CameraKeyframe[]
): CameraState {
  if (keyframes.length === 0) {
    return { x: 0, y: 0, z: 0, zoom: 1, roll: 0 };
  }
  if (frame <= keyframes[0].frame) {
    return { roll: 0, ...keyframes[0].state };
  }
  const last = keyframes[keyframes.length - 1];
  if (frame >= last.frame) {
    return { roll: 0, ...last.state };
  }

  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const ease = b.easing ?? EASE_CINEMATIC;
      const t = interpolate(frame, [a.frame, b.frame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: ease,
      });
      return {
        x: a.state.x + (b.state.x - a.state.x) * t,
        y: a.state.y + (b.state.y - a.state.y) * t,
        z: a.state.z + (b.state.z - a.state.z) * t,
        zoom: a.state.zoom + (b.state.zoom - a.state.zoom) * t,
        roll:
          (a.state.roll ?? 0) +
          ((b.state.roll ?? 0) - (a.state.roll ?? 0)) * t,
      };
    }
  }
  return { roll: 0, ...last.state };
}

/**
 * Projects a 3D world point (worldX, worldY, worldZ) into 1920x1080 screen space.
 */
export function projectPoint(
  worldX: number,
  worldY: number,
  worldZ: number,
  camera: CameraState
): { screenX: number; screenY: number; scale: number; visible: boolean } {
  const dz = worldZ - camera.z;
  // Cull objects behind the camera lens
  if (dz <= -FOCAL_LENGTH + 140) {
    return { screenX: 960, screenY: 540, scale: 0, visible: false };
  }
  const pScale = FOCAL_LENGTH / (FOCAL_LENGTH + dz);
  const scale = pScale * camera.zoom;
  const screenX = 960 + (worldX - camera.x) * scale;
  const screenY = 540 + (worldY - camera.y) * scale;
  return { screenX, screenY, scale, visible: true };
}

interface DepthNodeProps {
  worldX?: number;
  worldY?: number;
  worldZ: number;
  camera: CameraState;
  /** Optional subtle atmospheric haze opacity/brightness attenuation for distant objects */
  hazeOpacity?: number;
  /** Optional subtle blur in px (keep <= 2.5px for Chromium performance) */
  blurPx?: number;
  zIndex?: number;
  children: React.ReactNode;
}

/**
 * Places a scene element at an explicit 3D coordinate in the virtual 2.5D stage.
 * Automatically computes perspective scale, camera-relative parallax, and occlusion order.
 */
export const DepthNode: React.FC<DepthNodeProps> = ({
  worldX = 0,
  worldY = 0,
  worldZ,
  camera,
  blurPx = 0,
  zIndex,
  children,
}) => {
  const { screenX, screenY, scale, visible } = projectPoint(
    worldX,
    worldY,
    worldZ,
    camera
  );

  if (!visible || scale <= 0.02) {
    return null;
  }

  // Convert worldZ to deterministic CSS zIndex (larger Z = further back = lower zIndex)
  const computedZIndex = zIndex ?? Math.round(5000 - worldZ);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        zIndex: computedZIndex,
        transform: `translate3d(${screenX.toFixed(2)}px, ${screenY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
        transformOrigin: '0 0',
        filter: blurPx > 0.1 ? `blur(${blurPx.toFixed(2)}px)` : undefined,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
};

interface CameraStageProps {
  camera: CameraState;
  motionBlurPx?: number;
  children: React.ReactNode;
}

/**
 * Root 1920x1080 camera viewport applying global roll and optional whip-transition blur.
 */
export const CameraStage: React.FC<CameraStageProps> = ({
  camera,
  motionBlurPx = 0,
  children,
}) => {
  const roll = camera.roll ?? 0;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        transform: roll !== 0 ? `rotate(${roll.toFixed(3)}deg) scale(1.03)` : undefined,
        filter: motionBlurPx > 0.1 ? `blur(${motionBlurPx.toFixed(2)}px)` : undefined,
      }}
    >
      {children}
    </div>
  );
};

