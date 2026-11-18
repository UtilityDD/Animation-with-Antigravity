import React, { useId } from 'react';
import { EASE_OUT, ci } from '../historical/scene1/Scene1Shared';

export type DepthPlane = 'Z0' | 'Z1' | 'Z2' | 'Z3' | 'Z4';

const PERSPECTIVE = 1100;

const PLANE_CONFIG: Record<DepthPlane, { zPx: number; blurPx: number; opacity: number }> = {
  Z0: { zPx: -620, blurPx: 8, opacity: 0.32 },
  Z1: { zPx: -210, blurPx: 3, opacity: 0.52 },
  Z2: { zPx: 0, blurPx: 0, opacity: 1.0 },
  Z3: { zPx: 260, blurPx: 10, opacity: 0.24 },
  Z4: { zPx: 420, blurPx: 14, opacity: 0.2 },
};

export interface MultiplaneCamKey {
  f: number;
  x: number;
  y: number;
  /** Total magnification of the Z2 hero plane (1 = framing unchanged). */
  z: number;
  rotateX?: number;
  rotateY?: number;
  /** Force the camera to come to rest on this key (zero velocity). */
  stop?: boolean;
}

export interface CameraShake {
  /** Local frame the impulse starts. */
  f: number;
  /** Peak amplitude in px. */
  amp: number;
  /** Decay length in frames (default 18). */
  dur?: number;
}

type Channel = 'x' | 'y' | 'z' | 'rotateX' | 'rotateY';
const CHANNELS: Channel[] = ['x', 'y', 'z', 'rotateX', 'rotateY'];

interface CamState {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
}

const val = (k: MultiplaneCamKey, c: Channel) => (k[c] as number | undefined) ?? (c === 'z' ? 1 : 0);

/**
 * Monotone cubic (Fritsch–Carlson / PCHIP) tangents on non-uniform key times.
 * The camera flows THROUGH keys when motion continues in the same direction,
 * settles where a channel reverses or holds, and never overshoots a key.
 */
function tangents(keys: MultiplaneCamKey[], c: Channel): number[] {
  const n = keys.length;
  const m = new Array<number>(n).fill(0);
  if (n < 3) return m;
  for (let k = 1; k < n - 1; k++) {
    if (keys[k].stop) continue;
    const h0 = keys[k].f - keys[k - 1].f;
    const h1 = keys[k + 1].f - keys[k].f;
    if (h0 <= 0 || h1 <= 0) continue;
    const d0 = (val(keys[k], c) - val(keys[k - 1], c)) / h0;
    const d1 = (val(keys[k + 1], c) - val(keys[k], c)) / h1;
    if (d0 * d1 <= 0) continue;
    const w1 = 2 * h1 + h0;
    const w2 = h1 + 2 * h0;
    m[k] = (w1 + w2) / (w1 / d0 + w2 / d1);
  }
  return m;
}

export function sampleCamera(frame: number, keys: MultiplaneCamKey[]): CamState {
  if (keys.length === 0) return { x: 0, y: 0, z: 1, rotateX: 0, rotateY: 0 };
  const sorted = [...keys].sort((a, b) => a.f - b.f);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const pick = (k: MultiplaneCamKey): CamState => ({
    x: val(k, 'x'),
    y: val(k, 'y'),
    z: val(k, 'z'),
    rotateX: val(k, 'rotateX'),
    rotateY: val(k, 'rotateY'),
  });
  if (frame <= first.f) return pick(first);
  if (frame >= last.f) return pick(last);

  let i = 0;
  while (i < sorted.length - 2 && frame > sorted[i + 1].f) i++;
  const a = sorted[i];
  const b = sorted[i + 1];
  const h = b.f - a.f;
  const s = h > 0 ? (frame - a.f) / h : 1;
  const s2 = s * s;
  const s3 = s2 * s;
  const h00 = 2 * s3 - 3 * s2 + 1;
  const h10 = s3 - 2 * s2 + s;
  const h01 = -2 * s3 + 3 * s2;
  const h11 = s3 - s2;

  const out = {} as CamState;
  for (const c of CHANNELS) {
    const m = tangents(sorted, c);
    out[c] = h00 * val(a, c) + h10 * h * m[i] + h01 * val(b, c) + h11 * h * m[i + 1];
  }
  const clampRot = (v: number) => Math.max(-5, Math.min(5, v));
  out.rotateX = clampRot(out.rotateX);
  out.rotateY = clampRot(out.rotateY);
  return out;
}

function shakeOffset(local: number, shakes: CameraShake[]) {
  let sx = 0;
  let sy = 0;
  let sr = 0;
  for (const sh of shakes) {
    const t = local - sh.f;
    const dur = sh.dur ?? 18;
    if (t < 0 || t > dur) continue;
    const env = Math.pow(1 - t / dur, 2);
    sx += sh.amp * env * Math.sin(t * 2.9 + sh.f);
    sy += sh.amp * 0.8 * env * Math.cos(t * 3.7 + sh.f * 0.5);
    sr += sh.amp * 0.04 * env * Math.sin(t * 2.3);
  }
  return { sx, sy, sr };
}

/**
 * True CSS 3D Multiplane Camera Rig (perspective: 1100, preserve-3d).
 * - Monotone-spline camera path (no stop-start at every key)
 * - Real dolly: ~60% of each push-in is a translateZ move, so near planes rush past
 *   and far planes lag (true parallax), the rest is lens zoom. Z2 framing is unchanged.
 * - Speed-driven directional motion blur on pans/whips
 * - Decaying impulse shakes for impacts (spark snap, switch click)
 * - Continuous handheld drift (+-3.5px, +-0.14deg), +-5deg tilt guardrail
 */
export const MultiplaneCameraRig: React.FC<{
  local: number;
  frame: number;
  keys: MultiplaneCamKey[];
  shakes?: CameraShake[];
  /** Fraction of magnification delivered by physical dolly (0 = pure zoom). */
  dollyShare?: number;
  motionBlur?: boolean;
  children: React.ReactNode;
}> = ({ local, frame, keys, shakes = [], dollyShare = 0.6, motionBlur = true, children }) => {
  const filterId = `mpblur${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const cam = sampleCamera(local, keys);
  const prev = sampleCamera(local - 1, keys);

  const driftX = Math.sin(frame * 0.025) * 3.5;
  const driftY = Math.cos(frame * 0.021) * 3.0;
  const driftRotZ = Math.sin(frame * 0.017) * 0.14;
  const { sx, sy, sr } = shakeOffset(local, shakes);

  const zTotal = Math.max(0.2, cam.z);
  const mDolly = Math.pow(zTotal, dollyShare);
  // Keep the nearest plane (Z4 @ +420) safely in front of the lens.
  const dolly = Math.min(PERSPECTIVE * (1 - 1 / mDolly), 520);
  const mDollyEff = PERSPECTIVE / (PERSPECTIVE - dolly);
  const zoomRest = zTotal / mDollyEff;

  const tx = (-cam.x + driftX + sx) / mDollyEff;
  const ty = (-cam.y + driftY + sy) / mDollyEff;

  // Screen-space speed of the hero plane (px/frame) -> directional blur.
  const vx = Math.abs(cam.x - prev.x);
  const vy = Math.abs(cam.y - prev.y);
  const blurX = motionBlur ? Math.min(16, Math.max(0, vx - 2) * 0.45) : 0;
  const blurY = motionBlur ? Math.min(16, Math.max(0, vy - 2) * 0.45) : 0;
  const blurOn = blurX > 0.15 || blurY > 0.15;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        perspective: PERSPECTIVE,
        perspectiveOrigin: '50% 50%',
        overflow: 'hidden',
        filter: blurOn ? `url(#${filterId})` : undefined,
      }}
    >
      {blurOn && (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation={`${blurX.toFixed(2)} ${blurY.toFixed(2)}`} />
          </filter>
        </svg>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transformOrigin: '960px 540px',
          transform: `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${dolly.toFixed(2)}px) scale(${zoomRest.toFixed(4)}) rotateX(${cam.rotateX.toFixed(2)}deg) rotateY(${cam.rotateY.toFixed(2)}deg) rotateZ(${(driftRotZ + sr).toFixed(3)}deg)`,
        }}
      >
        {children}
      </div>
    </div>
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
  const blur = blurOverride ?? cfg.blurPx;
  const opacity = opacityOverride ?? cfg.opacity;

  return (
    <div
      data-depth-plane={plane}
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translateZ(${cfg.zPx}px) scale(${(1 - cfg.zPx / PERSPECTIVE).toFixed(4)})`,
        transformOrigin: '960px 540px',
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
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
 * Entrance rises from the মাত্রা line; emphasis eases in/out (no hard snap).
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

  const alpha = ci(localMs, [appearMs, appearMs + 160, removeMs - 180, removeMs], [0, 1, 1, 0], EASE_OUT);
  const rise = ci(localMs, [appearMs, appearMs + 260], [22, 0], EASE_OUT);
  const emph = ci(
    localMs,
    [emphasizeStartMs, emphasizeStartMs + 220, emphasizeEndMs - 220, emphasizeEndMs],
    [0, 1, 1, 0],
    EASE_OUT,
  );
  const scale = mode === 'SCALE_GLOW' ? 1 + emph * 0.12 : 1 + emph * 0.03;
  const lerpColor = emph > 0.5 ? accentColor : '#F8FAFC';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${rise.toFixed(1)}px) scale(${scale.toFixed(3)})`,
        opacity: alpha,
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
        fontSize: 56,
        fontWeight: 700,
        color: lerpColor,
        padding: '4px 18px',
        borderRadius: 10,
        background: mode === 'HIGHLIGHT_BAR' ? `rgba(15, 23, 42, ${(0.78 * emph).toFixed(3)})` : 'transparent',
        borderBottom: mode === 'STROKE_UNDERLINE' ? `4px solid ${accentColor}` : undefined,
        textShadow: `0 0 ${(24 * emph).toFixed(1)}px ${accentColor}, 0 4px 16px rgba(0,0,0,0.8)`,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};
