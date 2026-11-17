import React from 'react';
import { interpolate } from 'remotion';

export interface CinematicCameraState {
  x: number;
  y: number;
  scale: number;
  rotation?: number;
}

interface ParallaxWorldProps {
  currentFrame: number;
  camState: CinematicCameraState;
  background: React.ReactNode;   // 0.15x parallax (sky, distant mountains, lightning)
  farMidground: React.ReactNode; // 0.40x parallax (village huts, distant utility towers, swaying palms)
  midground: React.ReactNode;    // 1.00x parallax (main focal action, character, live wire)
  foreground: React.ReactNode;   // 1.65x parallax (near foliage, passing raindrops, bokeh out-of-focus elements)
}

/**
 * 2.5D Parallax World Engine
 * Realizes true cinematic depth of field through 4 independent physical focal planes.
 * As the virtual camera tracks, pans, and crash-zooms, each layer moves with distinct optical parallax:
 * - Background: 0.15x
 * - Far Midground: 0.40x
 * - Midground (Focal Plane): 1.00x
 * - Foreground: 1.65x (with optical motion blur / scale amplification)
 */
export const ParallaxWorld: React.FC<ParallaxWorldProps> = ({
  currentFrame,
  camState,
  background,
  farMidground,
  midground,
  foreground,
}) => {
  const { x, y, scale, rotation = 0 } = camState;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#030514',
      }}
    >
      {/* Layer 1: Background Plane (0.15x Parallax) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2500,
          height: 1400,
          transform: `translate(${-290 + x * 0.15}px, ${-160 + y * 0.15}px) scale(${1 + (scale - 1) * 0.15})`,
          transformOrigin: '1250px 700px',
          pointerEvents: 'none',
        }}
      >
        {background}
      </div>

      {/* Layer 2: Far-Midground Plane (0.40x Parallax) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2400,
          height: 1350,
          transform: `translate(${-240 + x * 0.4}px, ${-135 + y * 0.4}px) scale(${1 + (scale - 1) * 0.4})`,
          transformOrigin: '1200px 675px',
          pointerEvents: 'none',
        }}
      >
        {farMidground}
      </div>

      {/* Layer 3: Main Focal Midground Plane (1.00x Parallax) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: '960px 540px',
        }}
      >
        {midground}
      </div>

      {/* Layer 4: Cinematic Foreground Plane (1.65x Parallax - Near Camera Silhouettes) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2600,
          height: 1460,
          transform: `translate(${-340 + x * 1.65}px, ${-190 + y * 1.65}px) scale(${1 + (scale - 1) * 1.65})`,
          transformOrigin: '1300px 730px',
          pointerEvents: 'none',
          zIndex: 40,
        }}
      >
        {foreground}
      </div>
    </div>
  );
};
