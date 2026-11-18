import React from 'react';
import { Easing } from 'remotion';
import { ci } from '../historical/scene1/Scene1Shared';

export const EASE_POP = Easing.bezier(0.34, 1.56, 0.64, 1);

export const seeded = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Neutral helium atom: 2 protons + 2 neutrons, and 2 electrons drawn as a
 * PROBABILITY CLOUD (1s-like radial density), never as planets on orbits.
 * Dots are re-sampled every few frames, staggered, so the cloud shimmers.
 */
export const NeutralAtomCloud: React.FC<{
  frame: number;
  cx: number;
  cy: number;
  radius?: number;
  cloudStrength?: number; // 0..1
  nucleusGlow?: number; // 0..1
  dots?: number;
}> = ({ frame, cx, cy, radius = 240, cloudStrength = 1, nucleusGlow = 0, dots = 150 }) => {
  const gid = `heCloud${Math.round(cx)}${Math.round(cy)}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.5 * cloudStrength} />
          <stop offset="45%" stopColor="#38BDF8" stopOpacity={0.2 * cloudStrength} />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={radius} fill={`url(#${gid})`} />
      {Array.from({ length: dots }).map((_, i) => {
        const epoch = Math.floor((frame + i * 3) / 7);
        const u = Math.max(1e-4, seeded(i * 13.7 + epoch * 1.37));
        const a = seeded(i * 7.1 + epoch * 2.9) * Math.PI * 2;
        const r = Math.min(radius, radius * 0.36 * Math.sqrt(-2 * Math.log(u)));
        const life = ((frame + i * 3) % 7) / 7;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(a) * r}
            cy={cy + Math.sin(a) * r}
            r={2.2}
            fill="#BAE6FD"
            opacity={(0.75 * Math.sin(life * Math.PI) * cloudStrength).toFixed(3)}
          />
        );
      })}
      {nucleusGlow > 0.01 && <circle cx={cx} cy={cy} r={34 + nucleusGlow * 10} fill="rgba(244, 63, 94, 0.18)" opacity={nucleusGlow} />}
      <circle cx={cx - 7} cy={cy - 6} r="11" fill="#F43F5E" stroke="#FDA4AF" strokeWidth="1.5" />
      <circle cx={cx + 8} cy={cy + 7} r="11" fill="#F43F5E" stroke="#FDA4AF" strokeWidth="1.5" />
      <circle cx={cx + 8} cy={cy - 6} r="10" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx={cx - 7} cy={cy + 8} r="10" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="1.5" />
    </g>
  );
};

export type GlyphKind = 'charge' | 'interaction' | 'motion' | 'static' | 'current';

const Glyph: React.FC<{ kind: GlyphKind; frame: number }> = ({ kind, frame }) => {
  switch (kind) {
    case 'charge':
      return (
        <g>
          <circle cx="-26" cy="0" r="24" fill="#F43F5E" />
          <text x="-26" y="10" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="700">+</text>
          <circle cx="26" cy="0" r="24" fill="#0EA5E9" />
          <text x="26" y="9" textAnchor="middle" fill="#fff" fontSize="32" fontWeight="700">−</text>
        </g>
      );
    case 'interaction': {
      const pull = Math.sin(frame * 0.12) * 4;
      return (
        <g>
          <circle cx={-48 + pull} cy="0" r="18" fill="#F43F5E" />
          <circle cx={48 - pull} cy="0" r="18" fill="#0EA5E9" />
          {/* › ‹ : pulled toward each other */}
          <path d="M -18,-10 L -6,0 L -18,10" fill="none" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 18,-10 L 6,0 L 18,10" fill="none" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    }
    case 'motion':
      return (
        <g>
          <line x1="-60" y1="0" x2="60" y2="0" stroke="#B45309" strokeWidth="10" strokeLinecap="round" />
          {[0, 1, 2].map((k) => {
            const x = -50 + (((frame * 1.6 + k * 40) % 110) as number);
            return <circle key={k} cx={x} cy="0" r="7" fill="#38BDF8" />;
          })}
          <path d="M 30,-24 L 54,-24 M 46,-31 L 54,-24 L 46,-17" fill="none" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'static':
      return (
        <g>
          <rect x="-56" y="-26" width="112" height="16" rx="5" fill="#0284C7" />
          {Array.from({ length: 9 }).map((_, k) => (
            <rect key={k} x={-52 + k * 12.5} y="-12" width="6" height="26" rx="2" fill="#0284C7" />
          ))}
          {Math.sin(frame * 0.5) > 0 && (
            <path d="M 20,24 L 30,36 L 24,38 L 36,52" fill="none" stroke="#E0F2FE" strokeWidth="3" filter="drop-shadow(0 0 6px #38BDF8)" />
          )}
        </g>
      );
    case 'current':
    default:
      return (
        <g>
          <circle cx="0" cy="-8" r="30" fill="#FEF08A" filter="drop-shadow(0 0 14px #FBBF24)" />
          <rect x="-12" y="20" width="24" height="16" rx="3" fill="#94A3B8" />
          <path d="M -10,6 L -5,-16 L 0,-4 L 5,-16 L 10,6" fill="none" stroke="#F59E0B" strokeWidth="3" />
        </g>
      );
  }
};

/** Circular concept card that pops in (spring) and can be dismissed. */
export const GlyphCard: React.FC<{
  kind: GlyphKind;
  x: number;
  y: number;
  label: string;
  color: string;
  local: number;
  frame: number;
  appear: number;
  exit?: number;
}> = ({ kind, x, y, label, color, local, frame, appear, exit = 1e9 }) => {
  if (local < appear) return null;
  const pop = ci(local, [appear, appear + 20], [0.5, 1], EASE_POP);
  const alpha = ci(local, [appear, appear + 10, exit, exit + 16], [0, 1, 1, 0]);
  const labelY = ci(local, [appear + 6, appear + 24], [176, 152], EASE_POP);
  return (
    <g transform={`translate(${x}, ${y}) scale(${pop.toFixed(3)})`} opacity={alpha}>
      <circle cx="0" cy="0" r="95" fill="rgba(15,23,42,0.88)" stroke={color} strokeWidth="4" />
      <circle cx="0" cy="0" r="95" fill="none" stroke={color} strokeWidth="2" opacity={ci(local, [appear, appear + 30], [0.9, 0])} transform={`scale(${ci(local, [appear, appear + 30], [1, 1.35]).toFixed(3)})`} />
      <Glyph kind={kind} frame={frame} />
      <text x="0" y={labelY.toFixed(1)} textAnchor="middle" fill="#F8FAFC" fontSize="32" fontWeight="700">
        {label}
      </text>
    </g>
  );
};
