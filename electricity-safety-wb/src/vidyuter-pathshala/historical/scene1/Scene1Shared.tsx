import React from 'react';
import { Easing, interpolate } from 'remotion';

export const EASE_INOUT = Easing.bezier(0.45, 0, 0.2, 1);
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 0.9, 0.4);

export const ci = (
  frame: number,
  input: number[],
  output: number[],
  easing?: (t: number) => number
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const toBn = (s: string | number) =>
  String(s).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

/** Deterministic pseudo-random in [0,1) */
export const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ------------------------------------------------------------------
// Focus-point camera: puts world point (x,y) at screen point (sx,sy)
// ------------------------------------------------------------------
export interface CamKey {
  f: number;
  x: number;
  y: number;
  z: number;
  sx?: number;
  sy?: number;
}
export interface CamState {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
}

export function camAt(frame: number, keys: CamKey[], easing = EASE_INOUT): CamState {
  const full = (k: CamKey): CamState => ({ x: k.x, y: k.y, z: k.z, sx: k.sx ?? 960, sy: k.sy ?? 540 });
  if (frame <= keys[0].f) return full(keys[0]);
  const last = keys[keys.length - 1];
  if (frame >= last.f) return full(last);
  for (let i = 0; i < keys.length - 1; i++) {
    const a = full(keys[i]);
    const b = full(keys[i + 1]);
    if (frame >= keys[i].f && frame <= keys[i + 1].f) {
      const t = easing((frame - keys[i].f) / Math.max(1, keys[i + 1].f - keys[i].f));
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        sx: a.sx + (b.sx - a.sx) * t,
        sy: a.sy + (b.sy - a.sy) * t,
      };
    }
  }
  return full(last);
}

export const camTransform = (c: CamState, shakeX = 0, shakeY = 0) =>
  `translate(${(c.sx - c.x * c.z + shakeX).toFixed(2)}px, ${(c.sy - c.y * c.z + shakeY).toFixed(2)}px) scale(${c.z.toFixed(4)})`;

// ------------------------------------------------------------------
// Film grade: vignette + subtle animated grain
// ------------------------------------------------------------------
export const FilmGrade: React.FC<{ frame: number; vignette?: number }> = ({ frame, vignette = 0.6 }) => (
  <>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `radial-gradient(ellipse 75% 70% at 52% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,${vignette}) 100%)`,
        zIndex: 8000,
      }}
    />
    <svg
      width={960}
      height={540}
      viewBox="0 0 960 540"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        opacity: 0.08,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 8001,
      }}
    >
      <filter id="s1grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={frame % 24} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="960" height="540" filter="url(#s1grain)" />
    </svg>
  </>
);

// ------------------------------------------------------------------
// Floating dust motes inside a light pool
// ------------------------------------------------------------------
export const DustMotes: React.FC<{
  frame: number;
  cx: number;
  cy: number;
  radius: number;
  count?: number;
  opacity?: number;
  color?: string;
  seed?: number;
}> = ({ frame, cx, cy, radius, count = 40, opacity = 1, color = '#FFE2B0', seed = 1 }) => (
  <svg
    width={1920}
    height={1080}
    style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }}
  >
    {Array.from({ length: count }).map((_, i) => {
      const a = rnd(i * 3 + seed) * Math.PI * 2;
      const d = Math.sqrt(rnd(i * 7 + seed)) * radius;
      const speed = 0.15 + rnd(i * 11 + seed) * 0.35;
      const rise = ((frame * speed + rnd(i * 5 + seed) * 400) % 400) - 200;
      const x = cx + Math.cos(a) * d + Math.sin(frame * 0.02 + i) * 14;
      const y = cy + Math.sin(a) * d * 0.7 - rise * 0.5;
      const dist = Math.hypot(x - cx, y - cy) / radius;
      const falloff = Math.max(0, 1 - dist);
      const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.07 + i * 1.7);
      const r = 1.2 + rnd(i * 13 + seed) * 2.6;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={color}
          opacity={falloff * twinkle * 0.75 * opacity}
        />
      );
    })}
  </svg>
);

// ------------------------------------------------------------------
// Premium amber gemstone (translucent, faceted, trapped insect)
// Drawn centred on (0,0), ~ size px wide.
// ------------------------------------------------------------------
export const AmberGem: React.FC<{ id: string; size?: number; glow?: number; charge?: number }> = ({
  id,
  size = 120,
  glow = 0.3,
  charge = 0,
}) => {
  const s = size / 100;
  return (
    <g transform={`scale(${s})`}>
      <defs>
        <radialGradient id={`${id}-body`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#FFF4C2" />
          <stop offset="22%" stopColor="#FFC23D" />
          <stop offset="58%" stopColor="#E77B06" />
          <stop offset="85%" stopColor="#9A3E02" />
          <stop offset="100%" stopColor="#5A1F00" />
        </radialGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC85A" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF9A1F" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-charge`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#BFE3FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5AB4FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {glow > 0.01 && <circle cx="0" cy="0" r="95" fill={`url(#${id}-glow)`} opacity={glow} />}
      {charge > 0.01 && <circle cx="0" cy="0" r="80" fill={`url(#${id}-charge)`} opacity={charge * 0.55} />}
      {/* body */}
      <path
        d="M -42,-22 C -30,-46 6,-50 30,-36 C 50,-24 54,6 44,26 C 32,46 2,52 -22,44 C -44,36 -54,4 -42,-22 Z"
        fill={`url(#${id}-body)`}
        stroke="#FFD27A"
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      {/* trapped insect, deep inside */}
      <g opacity="0.32" transform="translate(6,8) rotate(-18)">
        <ellipse cx="0" cy="0" rx="7" ry="3.6" fill="#3B1600" />
        <ellipse cx="-8" cy="0" rx="3.6" ry="3" fill="#3B1600" />
        <ellipse cx="9" cy="0" rx="5" ry="2.8" fill="#3B1600" />
        {[-4, 0, 4].map((lx) => (
          <g key={lx}>
            <line x1={lx} y1="2" x2={lx - 3} y2="8" stroke="#3B1600" strokeWidth="0.9" />
            <line x1={lx} y1="-2" x2={lx - 3} y2="-8" stroke="#3B1600" strokeWidth="0.9" />
          </g>
        ))}
      </g>
      {/* internal facets */}
      <path d="M -30,-20 L -2,-34 L 22,-24 L 8,-4 L -18,-2 Z" fill="#FFFFFF" opacity="0.18" />
      <path d="M 8,-4 L 36,4 L 26,28 L 2,22 Z" fill="#7A2C00" opacity="0.25" />
      {/* specular highlights */}
      <ellipse cx="-18" cy="-24" rx="11" ry="5" fill="#FFFFFF" opacity="0.85" transform="rotate(-22,-18,-24)" />
      <circle cx="-4" cy="-30" r="2.4" fill="#FFFFFF" opacity="0.9" />
      <path d="M 30,18 Q 38,4 36,-8" stroke="#FFF1C9" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
    </g>
  );
};

// ------------------------------------------------------------------
// Premium feather: rachis + individual barbs + downy afterfeather.
// Base (quill end) at (0,0), tip at (0,-length).
// ------------------------------------------------------------------
export const Feather: React.FC<{ length?: number; flutter?: number; frame?: number; opacity?: number }> = ({
  length = 260,
  flutter = 0,
  frame = 0,
  opacity = 1,
}) => {
  const L = length;
  const N = 30;
  const rx = (t: number) => Math.sin(t * Math.PI * 0.9) * L * 0.05;
  const ry = (t: number) => -t * L;
  const env = (t: number) => {
    const u = Math.min(1, Math.max(0, (t - 0.14) / 0.86));
    return Math.pow(Math.sin(Math.PI * Math.pow(u, 0.85)), 0.7);
  };
  const WL = L * 0.2;
  const WR = L * 0.15;

  const leftEnds: string[] = [];
  const rightEnds: string[] = [];
  const barbs: React.ReactNode[] = [];
  for (let i = 0; i <= N; i++) {
    const t = 0.14 + (0.86 * i) / N;
    const x0 = rx(t);
    const y0 = ry(t);
    const wob = Math.sin(frame * 0.35 + i * 0.9) * flutter * 6;
    const wl = env(t) * WL;
    const wr = env(t) * WR;
    const lx = x0 - wl;
    const ly = y0 - wl * 0.55 + wob;
    const rxe = x0 + wr;
    const rye = y0 - wr * 0.6 - wob;
    leftEnds.push(`${lx.toFixed(1)},${ly.toFixed(1)}`);
    rightEnds.push(`${rxe.toFixed(1)},${rye.toFixed(1)}`);
    barbs.push(
      <path
        key={`l${i}`}
        d={`M ${x0.toFixed(1)},${y0.toFixed(1)} Q ${(x0 - wl * 0.5).toFixed(1)},${(y0 - wl * 0.12).toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)}`}
        stroke="#FFFFFF"
        strokeOpacity={0.55}
        strokeWidth={1}
        fill="none"
      />,
      <path
        key={`r${i}`}
        d={`M ${x0.toFixed(1)},${y0.toFixed(1)} Q ${(x0 + wr * 0.5).toFixed(1)},${(y0 - wr * 0.15).toFixed(1)} ${rxe.toFixed(1)},${rye.toFixed(1)}`}
        stroke="#F1F5F9"
        strokeOpacity={0.5}
        strokeWidth={1}
        fill="none"
      />
    );
  }
  const tip = `${rx(1).toFixed(1)},${ry(1).toFixed(1)}`;
  const vaneL = `M ${rx(0.14)},${ry(0.14)} L ${leftEnds.join(' L ')} L ${tip} Z`;
  const vaneR = `M ${rx(0.14)},${ry(0.14)} L ${rightEnds.join(' L ')} L ${tip} Z`;

  // downy afterfeather near the base
  const down: React.ReactNode[] = [];
  for (let i = 0; i < 14; i++) {
    const t = 0.04 + rnd(i + 3) * 0.12;
    const side = i % 2 === 0 ? -1 : 1;
    const len = L * (0.08 + rnd(i + 9) * 0.07);
    const x0 = rx(t);
    const y0 = ry(t);
    const sway = Math.sin(frame * 0.2 + i) * (2 + flutter * 6);
    down.push(
      <path
        key={`d${i}`}
        d={`M ${x0},${y0} q ${side * len * 0.4},${-len * 0.1 + sway} ${side * len},${-len * 0.45 + sway}`}
        stroke="#FFFFFF"
        strokeOpacity={0.45}
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
      />
    );
  }

  return (
    <g opacity={opacity}>
      <path d={vaneL} fill="#F8FAFC" fillOpacity={0.62} />
      <path d={vaneR} fill="#E2E8F0" fillOpacity={0.55} />
      {barbs}
      {down}
      {/* rachis */}
      <path
        d={`M 0,${L * 0.02} Q ${rx(0.5) * 1.2},${ry(0.5)} ${tip}`}
        stroke="#FFFFFF"
        strokeWidth={2.6}
        fill="none"
        strokeLinecap="round"
      />
      {/* calamus (quill) */}
      <line x1="0" y1={L * 0.04} x2={rx(0.12)} y2={ry(0.12)} stroke="#D6CBB8" strokeWidth={3.4} strokeLinecap="round" />
    </g>
  );
};
