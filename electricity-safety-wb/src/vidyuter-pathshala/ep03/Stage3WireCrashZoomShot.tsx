import React from 'react';
import { EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { CameraRig, LivingLabBackdrop } from './CameraRig';

/**
 * Stage 3: Macro Crash-Zoom Bridge (scale 1.0 -> 6.0)
 * - Volta's brass wire whip-pans & morphs into a modern orange-insulated copper cable on modern lab bench
 * - Orange PVC sleeve peels back cleanly -> camera dives straight into a single copper strand!
 */
export const Stage3WireCrashZoomShot: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  const peelBack = ci(local, [duration * 0.25, duration * 0.58], [0, 260], EASE_OUT);
  const zoomScale = ci(local, [duration * 0.52, duration], [1.0, 6.2], EASE_INOUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, #0D1E38 0%, #050811 76%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <LivingLabBackdrop mode="modern" frame={frame} />

      <CameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 960, y: 540, z: 1.0 },
          { f: duration * 0.52, x: 960, y: 540, z: 1.15 },
          { f: duration, x: 1120, y: 540, z: zoomScale },
        ]}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
          {/* Modern Slate Lab Bench */}
          <rect x="-100" y="690" width="2120" height="440" fill="#0F172A" stroke="#1E293B" strokeWidth="4" />

          {/* Exposed Braided Copper Strands */}
          <g transform="translate(960, 540)">
            {[-24, -8, 8, 24].map((sy, idx) => (
              <rect
                key={idx}
                x="-60"
                y={sy - 6}
                width="420"
                height="12"
                rx="6"
                fill="#D9822B"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
            ))}

            {/* Peeling Orange-Brown PVC Insulation Sleeve */}
            <rect
              x={-540 - peelBack}
              y="-48"
              width="680"
              height="96"
              rx="18"
              fill="#EA580C"
              stroke="#FB923C"
              strokeWidth="3.5"
            />
          </g>
        </svg>
      </CameraRig>
    </div>
  );
};
