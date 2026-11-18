import React from 'react';
import { ci } from '../historical/scene1/Scene1Shared';
import { jaggedArc, seeded } from './Ep01BedroomSet';

/**
 * EP01 v2 visual effects, each paired with a sound cue in scripts/synthesize_ep01v2_sound.py.
 * Everything is drawn in-world (inside the scene SVG / camera rig) unless it is a light effect
 * that genuinely fills the lens (ScreenFlash, SpeedLines).
 */

/** Exponential decay pulse that fires at each cue: 0..1 */
export const pulseAt = (local: number, cues: number[], decay = 10, peak = 1) => {
  let v = 0;
  for (const c of cues) {
    const t = local - c;
    if (t >= 0 && t < decay * 6) v = Math.max(v, Math.exp(-t / decay) * peak);
  }
  return v;
};

/** Filament / tube-light ignition: flickers (0/1-ish) for `len` frames after `at`, then steady 1. */
export const ignitionFlicker = (local: number, at: number, len = 18, seed = 1) => {
  if (local < at) return 0;
  const t = local - at;
  if (t >= len) return 1;
  const step = Math.floor(t / 2);
  const on = seeded(step * 7.3 + seed) > 0.42 - (t / len) * 0.4;
  return on ? 0.55 + 0.45 * (t / len) : 0.08;
};

/** Live oil-lamp / candle flicker multiplier around 1. */
export const flameFlicker = (frame: number, seed = 0) =>
  0.86 + 0.08 * Math.sin(frame * 0.31 + seed) + 0.05 * Math.sin(frame * 0.83 + seed * 2.1) + 0.03 * Math.sin(frame * 1.97 + seed);

/** Embers / static sparks radiating from (x, y), with gravity and fading trails. */
export const SparkBurst: React.FC<{
  local: number;
  at: number;
  x: number;
  y: number;
  count?: number;
  speed?: number;
  life?: number;
  color?: string;
  core?: string;
  gravity?: number;
  spread?: number;
  dir?: number;
  seed?: number;
  size?: number;
}> = ({ local, at, x, y, count = 14, speed = 9, life = 34, color = '#38BDF8', core = '#E0F2FE', gravity = 0.18, spread = 360, dir = -90, seed = 1, size = 1 }) => {
  const t = local - at;
  if (t < 0 || t > life) return null;
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const a = ((dir + (seeded(seed * 31 + i) - 0.5) * spread) * Math.PI) / 180;
        const v = speed * (0.45 + seeded(seed * 17 + i * 3) * 0.75);
        const myLife = life * (0.55 + seeded(seed * 5 + i) * 0.45);
        if (t > myLife) return null;
        const drag = (1 - Math.exp(-t * 0.09)) / 0.09;
        const px = x + Math.cos(a) * v * drag;
        const py = y + Math.sin(a) * v * drag + gravity * t * t * 0.5;
        const tail = 3.2;
        const qx = x + Math.cos(a) * v * Math.max(0, drag - tail);
        const qy = y + Math.sin(a) * v * Math.max(0, drag - tail) + gravity * Math.max(0, t - 1) ** 2 * 0.5;
        const fade = 1 - t / myLife;
        return (
          <g key={i} opacity={fade}>
            <line x1={qx} y1={qy} x2={px} y2={py} stroke={color} strokeWidth={3.2 * size} strokeLinecap="round" />
            <circle cx={px} cy={py} r={1.8 * size} fill={core} />
          </g>
        );
      })}
    </g>
  );
};

/** Expanding double ring at an impact point. */
export const ShockRing: React.FC<{ local: number; at: number; x: number; y: number; r?: number; color?: string; life?: number; width?: number }> = ({
  local,
  at,
  x,
  y,
  r = 120,
  color = '#FDE047',
  life = 30,
  width = 4,
}) => {
  const t = local - at;
  if (t < 0 || t > life) return null;
  const u = ci(t, [0, life], [0, 1]);
  const e = 1 - (1 - u) ** 3;
  return (
    <g opacity={1 - u}>
      <circle cx={x} cy={y} r={10 + e * r} fill="none" stroke={color} strokeWidth={width * (1 - u * 0.7)} />
      <circle cx={x} cy={y} r={6 + e * r * 0.62} fill="none" stroke="#F8FAFC" strokeWidth={width * 0.5 * (1 - u)} />
    </g>
  );
};

/** Little jagged static arcs dancing around a point (charged object). */
export const StaticArcs: React.FC<{ frame: number; x: number; y: number; radius: number; amount: number; color?: string; count?: number; seed?: number }> = ({
  frame,
  x,
  y,
  radius,
  amount,
  color = '#93C5FD',
  count = 4,
  seed = 3,
}) => {
  if (amount < 0.02) return null;
  const step = Math.floor(frame / 3);
  return (
    <g opacity={Math.min(1, amount)}>
      {Array.from({ length: count }).map((_, i) => {
        // each arc lives for a few 3-frame steps, then jumps elsewhere
        const k = step + i * 5;
        if (seeded(k * 1.7 + seed) > 0.25 + amount * 0.65) return null;
        const a0 = seeded(k * 2.3 + i + seed) * Math.PI * 2;
        const a1 = a0 + 0.5 + seeded(k * 0.7 + seed) * 0.9;
        const r0 = radius * (0.75 + seeded(k + 9) * 0.25);
        const r1 = radius * (1.05 + seeded(k + 4) * 0.5 * amount);
        const d = jaggedArc(x + Math.cos(a0) * r0, y + Math.sin(a0) * r0, x + Math.cos(a1) * r1, y + Math.sin(a1) * r1, k * 13 + i, 5);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.45" />
            <path d={d} fill="none" stroke="#F0F9FF" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
};

/** Soft dust puff where something lands. */
export const DustPuff: React.FC<{ local: number; at: number; x: number; y: number; width?: number; color?: string; life?: number }> = ({
  local,
  at,
  x,
  y,
  width = 160,
  color = '#CBD5E1',
  life = 40,
}) => {
  const t = local - at;
  if (t < 0 || t > life) return null;
  const u = t / life;
  const e = 1 - (1 - u) ** 2;
  return (
    <g opacity={(1 - u) * 0.55}>
      {[-1, -0.5, 0, 0.5, 1].map((s, i) => (
        <circle key={i} cx={x + s * width * 0.5 * (0.4 + e)} cy={y - e * (10 + Math.abs(s) * 6) - (1 - Math.abs(s)) * e * 14} r={8 + e * (16 - Math.abs(s) * 5)} fill={color} />
      ))}
    </g>
  );
};

/** Full-lens light flash (screen-blended). */
export const ScreenFlash: React.FC<{ amount: number; color?: string; at?: [number, number] }> = ({ amount, color = '191, 227, 255', at = [50, 50] }) =>
  amount > 0.01 ? (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        background: `radial-gradient(circle at ${at[0]}% ${at[1]}%, rgba(${color}, ${(0.85 * amount).toFixed(3)}) 0%, rgba(${color}, ${(0.35 * amount).toFixed(3)}) 35%, rgba(${color}, 0) 75%)`,
        zIndex: 50,
      }}
    />
  ) : null;

/** Radial speed streaks for a crash-zoom / dive. `amount` 0..1 */
export const SpeedLines: React.FC<{ frame: number; amount: number; color?: string; cx?: number; cy?: number }> = ({ frame, amount, color = '#C7D2FE', cx = 960, cy = 540 }) => {
  if (amount < 0.01) return null;
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 40 }}>
      {Array.from({ length: 64 }).map((_, i) => {
        const a = seeded(i * 3.1) * Math.PI * 2;
        const phase = (frame * 0.09 + seeded(i * 1.3)) % 1;
        const r0 = 160 + phase * 900;
        const len = (90 + seeded(i) * 260) * amount * (0.4 + phase);
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r0}
            y1={cy + Math.sin(a) * r0}
            x2={cx + Math.cos(a) * (r0 + len)}
            y2={cy + Math.sin(a) * (r0 + len)}
            stroke={color}
            strokeWidth={1.5 + seeded(i * 7) * 3}
            strokeLinecap="round"
            opacity={amount * (0.25 + phase * 0.6)}
          />
        );
      })}
    </svg>
  );
};

/** Oil-lamp flame (Greek clay lamp) with live flicker, drawn at the wick. */
export const LampFlame: React.FC<{ frame: number; x: number; y: number; scale?: number; seed?: number }> = ({ frame, x, y, scale = 1, seed = 0 }) => {
  const f = flameFlicker(frame, seed);
  const lean = Math.sin(frame * 0.17 + seed) * 4 + Math.sin(frame * 0.53) * 2;
  const h = 46 * f;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="0" cy={-h * 0.4} r={90 * f} fill="rgba(251, 191, 36, 0.10)" />
      <circle cx="0" cy={-h * 0.4} r={44 * f} fill="rgba(251, 191, 36, 0.18)" />
      <path d={`M -11,0 C -14,${-h * 0.45} ${lean - 3},${-h * 0.8} ${lean},${-h} C ${lean + 3},${-h * 0.8} 14,${-h * 0.45} 11,0 Z`} fill="#F59E0B" />
      <path d={`M -6,0 C -8,${-h * 0.35} ${lean * 0.7 - 2},${-h * 0.6} ${lean * 0.7},${-h * 0.72} C ${lean * 0.7 + 2},${-h * 0.6} 8,${-h * 0.35} 6,0 Z`} fill="#FEF3C7" />
      <ellipse cx="0" cy="-3" rx="4" ry="6" fill="#60A5FA" opacity="0.7" />
    </g>
  );
};
