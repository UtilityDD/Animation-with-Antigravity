import React from 'react';
import { Easing, interpolate } from 'remotion';

export interface Camera25DState {
  x: number;
  y: number;
  z: number;
  zoom: number;
  roll: number;
}

export interface Camera25DKeyframe {
  frame: number;
  state: Camera25DState;
  easing?: (t: number) => number;
}

export const STAGE_FOCAL_LENGTH = 940;
export const EASE_FILM = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_SMOOTH = Easing.bezier(0.42, 0, 0.58, 1);
export const EASE_ENERGETIC = Easing.bezier(0.16, 1, 0.3, 1);

export function interpolateCamera25D(
  frame: number,
  keyframes: Camera25DKeyframe[]
): Camera25DState {
  if (keyframes.length === 0) {
    return { x: 0, y: 0, z: 0, zoom: 1, roll: 0 };
  }
  if (frame <= keyframes[0].frame) return keyframes[0].state;
  const last = keyframes[keyframes.length - 1];
  if (frame >= last.frame) return last.state;

  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const span = Math.max(1, b.frame - a.frame);
      const rawT = (frame - a.frame) / span;
      const t = b.easing ? b.easing(rawT) : rawT;
      return {
        x: interpolate(t, [0, 1], [a.state.x, b.state.x]),
        y: interpolate(t, [0, 1], [a.state.y, b.state.y]),
        z: interpolate(t, [0, 1], [a.state.z, b.state.z]),
        zoom: interpolate(t, [0, 1], [a.state.zoom, b.state.zoom]),
        roll: interpolate(t, [0, 1], [a.state.roll, b.state.roll]),
      };
    }
  }
  return last.state;
}

export function projectWorldPoint(
  worldX: number,
  worldY: number,
  worldZ: number,
  camera: Camera25DState
): { screenX: number; screenY: number; scale: number; visible: boolean } {
  const dz = worldZ - camera.z;
  const denom = STAGE_FOCAL_LENGTH + dz;
  if (denom <= 60) {
    return { screenX: 960, screenY: 540, scale: 0, visible: false };
  }
  const persp = STAGE_FOCAL_LENGTH / denom;
  const scale = persp * camera.zoom;
  return {
    screenX: 960 + (worldX - camera.x) * scale,
    screenY: 540 + (worldY - camera.y) * scale,
    scale,
    visible: true,
  };
}

export interface DepthLayerProps {
  worldX: number;
  worldY: number;
  worldZ: number;
  camera: Camera25DState;
  blurPx?: number;
  opacity?: number;
  children: React.ReactNode;
}

export const DepthLayer: React.FC<DepthLayerProps> = ({
  worldX,
  worldY,
  worldZ,
  camera,
  blurPx = 0,
  opacity = 1,
  children,
}) => {
  const p = projectWorldPoint(worldX, worldY, worldZ, camera);
  if (!p.visible || opacity <= 0.001) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transform: `translate3d(${p.screenX.toFixed(2)}px, ${p.screenY.toFixed(
          2
        )}px, 0) scale(${p.scale.toFixed(4)})`,
        transformOrigin: '0 0',
        filter: blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : undefined,
        opacity,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export const StageViewport: React.FC<{
  camera: Camera25DState;
  children: React.ReactNode;
}> = ({ camera, children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `rotate(${camera.roll.toFixed(3)}deg)`,
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </div>
  );
};
