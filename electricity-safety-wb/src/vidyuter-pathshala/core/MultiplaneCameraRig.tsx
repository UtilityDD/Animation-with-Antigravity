import React from 'react';
import { EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';

export type DepthPlane = 'Z0' | 'Z1' | 'Z2' | 'Z3' | 'Z4';

const PLANE_CONFIG: Record<DepthPlane, { zPx: number; blurPx: number; opacity: number }> = {
  Z0: { zPx: -620, blurPx: 8, opacity: 0.32 },
  Z1: { zPx: -210, blurPx: 3, opacity: 0.52 },
  Z2: { zPx: 0, blurPx: 0, opacity: 1.0 },
  Z3: { zPx: 260, blurPx: 10, opacity: 0.24 },
  Z4: { zPx: 420, blurPx: 14, opacity: 0.2 },
};

const PLANE_INDEX: Record<DepthPlane, number> = { Z0: 0, Z1: 1, Z2: 2, Z3: 3, Z4: 4 };

type FocusState = { sharp: DepthPlane; boost: number; focusIndex: number | null };

const FocusContext = React.createContext<FocusState>({ sharp: 'Z2', boost: 0, focusIndex: null });

/** Blur by signed distance from the sharp plane. Nearer planes blur harder than farther ones. */
function premiumBlur(plane: DepthPlane, sharp: DepthPlane, boost: number): number {
  const dist = PLANE_INDEX[plane] - PLANE_INDEX[sharp];
  if (dist === 0) return 0;
  const mag = Math.abs(dist);
  const towardCamera = dist > 0;
  return Math.min(20, (towardCamera ? 8 + mag * 3.5 : 3 + mag * 3) + boost);
}

/** Continuous rack-focus blur. At focusIndex 2 and boost 0 this matches the default Z-table. */
function rackBlur(plane: DepthPlane, focusIndex: number, boost: number): number {
  const dist = PLANE_INDEX[plane] - focusIndex;
  const mag = Math.abs(dist);
  if (mag < 0.05) return 0;
  const towardCamera = dist > 0;
  const base = towardCamera
    ? (mag <= 1 ? mag * 10 : 10 + (mag - 1) * 4)
    : (mag <= 1 ? mag * 3 : 3 + (mag - 1) * 5);
  return Math.min(20, base + boost);
}

export interface MultiplaneCamKey {
  f: number;
  x: number;
  y: number;
  z: number;
  rotateX?: number;
  rotateY?: number;
}

function interpKeys(frame: number, keys: MultiplaneCamKey[]) {
  if (keys.length === 0) return { x: 0, y: 0, z: 1, rotateX: 0, rotateY: 0 };
  if (frame <= keys[0].f) {
    return { x: keys[0].x, y: keys[0].y, z: keys[0].z, rotateX: keys[0].rotateX ?? 0, rotateY: keys[0].rotateY ?? 0 };
  }
  const last = keys[keys.length - 1];
  if (frame >= last.f) {
    return { x: last.x, y: last.y, z: last.z, rotateX: last.rotateX ?? 0, rotateY: last.rotateY ?? 0 };
  }
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame >= a.f && frame <= b.f) {
      const t = ci(frame, [a.f, b.f], [0, 1], EASE_INOUT);
      const clampRot = (v: number) => Math.max(-5, Math.min(5, v));
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        rotateX: clampRot((a.rotateX ?? 0) + ((b.rotateX ?? 0) - (a.rotateX ?? 0)) * t),
        rotateY: clampRot((a.rotateY ?? 0) + ((b.rotateY ?? 0) - (a.rotateY ?? 0)) * t),
      };
    }
  }
  return { x: last.x, y: last.y, z: last.z, rotateX: last.rotateX ?? 0, rotateY: last.rotateY ?? 0 };
}

/**
 * True CSS 3D Multiplane Camera Rig (perspective: 1100, preserve-3d)
 * with continuous optical drift (+-3.5px, +-0.14deg) and +-5deg tilt guardrail.
 */
export const MultiplaneCameraRig: React.FC<{
  local: number;
  frame: number;
  keys: MultiplaneCamKey[];
  /** Plane that stays sharp. Omit to keep the original Z2-sharp blur table. */
  sharpPlane?: DepthPlane;
  /** 0 = Z0 … 4 = Z4. When set, focus racks continuously instead of stepping. */
  focusIndex?: number;
  /** Extra blur on every plane except the sharp one. Use during macro inserts. */
  defocusBoost?: number;
  children: React.ReactNode;
}> = ({ local, frame, keys, sharpPlane = 'Z2', focusIndex, defocusBoost = 0, children }) => {
  const cam = interpKeys(local, keys);
  const driftX = Math.sin(frame * 0.025) * 3.5;
  const driftY = Math.cos(frame * 0.021) * 3.0;
  const driftRotZ = Math.sin(frame * 0.017) * 0.14;

  return (
    <FocusContext.Provider value={{ sharp: sharpPlane, boost: defocusBoost, focusIndex: focusIndex ?? null }}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        perspective: 1100,
        perspectiveOrigin: '50% 50%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transformOrigin: '960px 540px',
          transform: `translate3d(${(-cam.x + driftX).toFixed(2)}px, ${(-cam.y + driftY).toFixed(2)}px, 0px) scale(${cam.z.toFixed(4)}) rotateX(${cam.rotateX.toFixed(2)}deg) rotateY(${cam.rotateY.toFixed(2)}deg) rotateZ(${driftRotZ.toFixed(3)}deg)`,
        }}
      >
        {children}
      </div>
    </div>
    </FocusContext.Provider>
  );
};

/**
 * 5-Plane Depth Layer (Z0..Z4) mounted inside MultiplaneCameraRig.
 */
export const DepthLayer: React.FC<{
  plane: DepthPlane;
  blurOverride?: number;
  opacityOverride?: number;
  children: React.ReactNode;
}> = ({ plane, blurOverride, opacityOverride, children }) => {
  const cfg = PLANE_CONFIG[plane];
  const focus = React.useContext(FocusContext);
  const premium = focus.focusIndex != null || focus.sharp !== 'Z2' || focus.boost > 0.01;
  const dist = focus.focusIndex != null
    ? PLANE_INDEX[plane] - focus.focusIndex
    : PLANE_INDEX[plane] - PLANE_INDEX[focus.sharp];
  let blur = blurOverride ?? cfg.blurPx;
  let grade = '';
  if (premium) {
    if (focus.focusIndex != null && blurOverride == null) {
      blur = rackBlur(plane, focus.focusIndex, focus.boost);
    } else if (blurOverride != null && Math.abs(dist) > 0.2) {
      blur = blurOverride + focus.boost;
    } else {
      blur = premiumBlur(plane, focus.sharp, focus.boost);
    }
    if (dist < -0.35) grade = ' saturate(0.72) brightness(1.07)';
  }
  const opacity = opacityOverride ?? cfg.opacity;

  return (
    <div
      data-depth-plane={plane}
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translateZ(${cfg.zPx}px) scale(${(1 - cfg.zPx / 1100).toFixed(4)})`,
        transformOrigin: '960px 540px',
        filter: blur > 0 || grade ? `blur(${blur.toFixed(2)}px)${grade}` : undefined,
        opacity,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Track 4 Screen-Space Kinetic Trigger Word (+APPEAR -> *EMPHASIZE -> -REMOVE)
 * Max 3 simultaneous words on screen; never full prose sentences.
 */
export const KineticWord: React.FC<{
  localMs: number;
  appearMs: number;
  emphasizeStartMs: number;
  emphasizeEndMs: number;
  removeMs: number;
  text: string;
  x: number;
  y: number;
  accentColor?: string;
  mode?: 'HIGHLIGHT_BAR' | 'STROKE_UNDERLINE' | 'SCALE_GLOW';
}> = ({
  localMs,
  appearMs,
  emphasizeStartMs,
  emphasizeEndMs,
  removeMs,
  text,
  x,
  y,
  accentColor = '#38BDF8',
  mode = 'HIGHLIGHT_BAR',
}) => {
  if (localMs < appearMs || localMs > removeMs) return null;

  const alpha = ci(localMs, [appearMs, appearMs + 120, removeMs - 140, removeMs], [0, 1, 1, 0], EASE_OUT);
  const isEmph = localMs >= emphasizeStartMs && localMs <= emphasizeEndMs;
  const scale = isEmph && mode === 'SCALE_GLOW' ? 1.12 : 1.0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: alpha,
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
        fontSize: 56,
        fontWeight: 700,
        color: isEmph ? accentColor : '#F8FAFC',
        padding: mode === 'HIGHLIGHT_BAR' && isEmph ? '4px 18px' : '4px 8px',
        borderRadius: 10,
        background: mode === 'HIGHLIGHT_BAR' && isEmph ? 'rgba(15, 23, 42, 0.78)' : 'transparent',
        borderBottom: mode === 'STROKE_UNDERLINE' ? `4px solid ${accentColor}` : undefined,
        textShadow: isEmph ? `0 0 24px ${accentColor}` : '0 4px 16px rgba(0,0,0,0.8)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};
