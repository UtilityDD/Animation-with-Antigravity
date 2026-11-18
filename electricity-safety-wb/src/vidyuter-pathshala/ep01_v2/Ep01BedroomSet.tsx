import React from 'react';
import { ci } from '../historical/scene1/Scene1Shared';

/**
 * The boy's winter bedroom, split by depth plane so every act can come back to the same room.
 * Story-first rule for EP01: an idea is shown happening HERE (blanket, comb, switch, phone…)
 * before it is ever shown as an abstraction.
 */

export const seeded = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Re-randomised lightning path between two points */
export function jaggedArc(x0: number, y0: number, x1: number, y1: number, seed: number, segs = 6) {
  let d = `M ${x0.toFixed(1)},${y0.toFixed(1)}`;
  for (let i = 1; i < segs; i++) {
    const t = i / segs;
    const jx = (seeded(seed + i) - 0.5) * 10;
    const jy = (seeded(seed + i * 3.1) - 0.5) * 26;
    d += ` L ${(x0 + (x1 - x0) * t + jx).toFixed(1)},${(y0 + (y1 - y0) * t + jy).toFixed(1)}`;
  }
  return `${d} L ${x1.toFixed(1)},${y1.toFixed(1)}`;
}

/** Wall wiring path: switchboard → up the wall → ceiling junction → bulb */
export const CONDUIT_D = 'M 1390,520 L 1465,520 L 1465,145 L 1280,145 L 1280,195';
export const CONDUIT_LEN = 75 + 375 + 185 + 50;
export const BED = { x: 650, y: 625 };
export const BULB = { x: 1280, y: 235 };
export const SWITCHBOARD = { x: 1280, y: 520 };
export const PHONE = { x: 346, y: 679 };

/** Z0 — far wall, moonlit window, clock, bookshelf */
export const BedroomFarWall: React.FC<{ frame: number }> = ({ frame }) => {
  const mistDrift = Math.sin(frame * 0.025) * 28;
  return (
    <svg width="1920" height="1080" viewBox="0 0 1920 1080">
      <defs>
        <linearGradient id="bedMoonShaft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1920" height="1080" fill="#0B101B" />
      <rect x="200" y="100" width="440" height="380" rx="8" fill="#081326" stroke="#1E293B" strokeWidth="14" />
      <circle cx="510" cy="215" r="46" fill="#E0F2FE" opacity="0.7" />
      <ellipse cx={370 + mistDrift} cy="385" rx="145" ry="34" fill="#CBD5E1" opacity="0.24" />
      <ellipse cx={470 - mistDrift * 0.7} cy="425" rx="130" ry="28" fill="#94A3B8" opacity="0.18" />
      <line x1="420" y1="100" x2="420" y2="480" stroke="#1E293B" strokeWidth="8" />
      <line x1="200" y1="290" x2="640" y2="290" stroke="#1E293B" strokeWidth="8" />
      <polygon points="200,480 640,100 1200,980 580,980" fill="url(#bedMoonShaft)" />
      <g transform="translate(880, 210)">
        <circle cx="0" cy="0" r="54" fill="#1E293B" stroke="#475569" strokeWidth="6" />
        <line x1="0" y1="0" x2="0" y2="-32" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-26" y2="6" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(1540, 170)">
        <rect x="0" y="0" width="260" height="340" fill="#17110C" stroke="#2D1E14" strokeWidth="6" />
        {[105, 215].map((sy) => (
          <g key={sy}>
            <rect x="8" y={sy} width="244" height="10" fill="#2D1E14" />
            {[20, 48, 76, 108, 138, 170, 200].map((bx, i) => (
              <rect key={bx} x={bx} y={sy - 62 - (i % 3) * 10} width="22" height={62 + (i % 3) * 10} fill={['#7F1D1D', '#1E3A8A', '#14532D', '#78350F'][i % 4]} opacity="0.7" />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
};

/** Z1 — floor, nightstand + lamp + tea + phone, study desk */
export const BedroomMidground: React.FC<{ frame: number; phoneLit?: number; hidePhone?: boolean }> = ({ frame, phoneLit = 0, hidePhone = false }) => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080">
    <rect x="0" y="735" width="1920" height="360" fill="#14100D" />
    <rect x="0" y="725" width="1920" height="12" fill="#261A12" />
    <rect x="120" y="688" width="235" height="150" rx="6" fill="#23160E" stroke="#3B2316" strokeWidth="2.5" />
    <circle cx="188" cy="586" r="105" fill="rgba(245, 158, 11, 0.3)" />
    <polygon points="158,608 218,608 205,560 171,560" fill="#D97706" />
    <rect x="184" y="608" width="8" height="80" fill="#78350F" />
    <ellipse cx="276" cy="686" rx="28" ry="6" fill="#64748B" />
    <rect x="256" y="644" width="40" height="40" rx="6" fill="#CBD5E1" />
    <path d={`M 274,636 Q ${268 + Math.sin(frame * 0.08) * 6},610 280,588`} fill="none" stroke="#E2E8F0" strokeWidth="2.5" opacity="0.65" />
    {!hidePhone && <rect x="308" y="672" width="76" height="14" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />}
    {!hidePhone && phoneLit > 0 && <rect x="312" y="674" width="68" height="10" rx="3" fill="#BAE6FD" opacity={phoneLit} />}
    <rect x="1520" y="650" width="320" height="18" rx="4" fill="#23160E" />
    <rect x="1550" y="668" width="18" height="110" fill="#1A100A" />
    <rect x="1790" y="668" width="18" height="110" fill="#1A100A" />
  </svg>
);

/** Z2 (inside an <svg>) — bed, pillow, quilted blanket with optional static crackle */
export const BedWithBlanket: React.FC<{ blanketLift: number; crackle: number; arcSeed: number; charges?: number; frame?: number }> = ({
  blanketLift,
  crackle,
  arcSeed,
  charges = 0,
  frame = 0,
}) => (
  <g transform={`translate(${BED.x}, ${BED.y})`}>
    <defs>
      <linearGradient id="bedQuiltSheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="0" cy="148" rx="315" ry="26" fill="rgba(0,0,0,0.65)" />
    <rect x="-282" y="-82" width="34" height="222" rx="6" fill="#451A03" stroke="#78350F" strokeWidth="2.5" />
    <rect x="-252" y="54" width="525" height="84" rx="14" fill="#1E293B" stroke="#475569" strokeWidth="3" />
    <rect x="-238" y="8" width="115" height="36" rx="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
    <rect x="-244" y="38" width="508" height="22" rx="8" fill="#CBD5E1" opacity="0.92" />
    <path
      d={`M -145,42 C -70,${-8 - blanketLift * 0.45} 35,${-68 - blanketLift} 225,${-10 - blanketLift * 0.4} Q 242,20 232,48 L -145,48 Z`}
      fill="#312E81"
      stroke="#818CF8"
      strokeWidth="3.5"
    />
    <path
      d={`M -145,42 C -70,${-8 - blanketLift * 0.45} 35,${-68 - blanketLift} 225,${-10 - blanketLift * 0.4} Q 242,20 232,48 L -145,48 Z`}
      fill="url(#bedQuiltSheen)"
    />
    <path d={`M 145,${16 - blanketLift * 0.3} Q 195,${-14 - blanketLift * 0.4} 225,${-10 - blanketLift * 0.4} Q 232,20 222,42 Z`} fill="#E0E7FF" opacity="0.72" />
    <path d={`M -65,42 Q 30,${-24 - blanketLift * 0.42} 145,44`} fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.65" />
    <path d={`M 10,44 Q 95,${-12 - blanketLift * 0.32} 195,46`} fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.65" />

    {/* charges sitting ON the blanket surface (static: present, not flowing) */}
    {charges > 0.01 &&
      Array.from({ length: 10 }).map((_, i) => {
        const x = -110 + i * 33;
        const t = (x + 145) / 370;
        const surfaceY = 40 - Math.sin(t * Math.PI) * (55 + blanketLift * 0.7) - 8;
        const a = ci(charges, [i * 0.06, i * 0.06 + 0.4], [0, 1]);
        const neg = i % 2 === 0;
        const bob = Math.sin(frame * 0.15 + i) * 2;
        return (
          <g key={i} transform={`translate(${x}, ${(surfaceY + bob).toFixed(1)})`} opacity={a}>
            <circle r="9" fill={neg ? '#0EA5E9' : '#F43F5E'} stroke="#F8FAFC" strokeWidth="1.5" />
            <text y="6" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">{neg ? '−' : '+'}</text>
          </g>
        );
      })}

    {crackle > 0.04 && (
      <g opacity={crackle}>
        <circle cx="40" cy={-6 - blanketLift * 0.2} r={60 + crackle * 50} fill="rgba(56, 189, 248, 0.16)" />
        {[
          { x0: -48, x1: 18, y: 14 - blanketLift * 0.15 },
          { x0: 58, x1: 126, y: 8 - blanketLift * 0.2 },
          { x0: -4, x1: 70, y: -16 - blanketLift * 0.3 },
        ].map((a, i) => (
          <path
            key={i}
            d={jaggedArc(a.x0, a.y, a.x1, a.y - 10, arcSeed * 7 + i * 13)}
            fill="none"
            stroke={i === 1 ? '#38BDF8' : '#E0F2FE'}
            strokeWidth={2.5 + crackle * 2.5}
            strokeLinejoin="round"
            filter="drop-shadow(0 0 12px #38BDF8)"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => {
          const r = seeded(arcSeed * 3 + i);
          return <circle key={`e${i}`} cx={-40 + r * 170} cy={-20 - blanketLift * 0.2 - seeded(i * 9 + arcSeed) * 50} r={1.6 + r * 1.8} fill="#E0F2FE" />;
        })}
      </g>
    )}
  </g>
);

/**
 * Z2 (inside an <svg>) — wall conduit, real 6A modular switchboard and ceiling bulb.
 * `front` 0..1 = the near-instant push racing along the wire; `flow` > 0 shows the steady drift.
 */
export const WallCircuit: React.FC<{
  frame: number;
  closed: boolean;
  front: number;
  frontAlpha?: number;
  flow: number;
  bulbGlow: number;
  sparkAtSwitch?: boolean;
  /** Extra X-ray: copper core + free electrons visible inside the conduit. */
  xray?: number;
}> = ({ frame, closed, front, frontAlpha = 1, flow, bulbGlow, sparkAtSwitch = false, xray = 0 }) => {
  const wirePulse = (frame * 6.5) % 48;
  return (
    <g>
      <defs>
        <radialGradient id="wallBulbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.92" />
          <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1920" height="44" fill="#18120D" stroke="#2D1E14" strokeWidth="2" />
      <path d={CONDUIT_D} fill="none" stroke="#334155" strokeWidth={18 + xray * 14} strokeLinejoin="round" opacity={1 - xray * 0.55} />
      <path d={CONDUIT_D} fill="none" stroke="#B45309" strokeWidth={6 + xray * 4} strokeLinejoin="round" />
      {closed && front > 0 && (
        <path
          d={CONDUIT_D}
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="7"
          strokeDasharray={`${(front * CONDUIT_LEN).toFixed(1)} 2000`}
          strokeLinejoin="round"
          opacity={frontAlpha}
          filter="drop-shadow(0 0 12px #38BDF8)"
        />
      )}
      {flow > 0.01 && (
        <path
          d={CONDUIT_D}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="4.5"
          strokeDasharray="12 14"
          strokeDashoffset={-wirePulse}
          strokeLinejoin="round"
          opacity={flow}
          filter="drop-shadow(0 0 8px #38BDF8)"
        />
      )}
      <rect x="1449" y="130" width="32" height="32" rx="6" fill="#475569" stroke="#94A3B8" strokeWidth="2" />

      <g transform={`translate(${SWITCHBOARD.x}, ${SWITCHBOARD.y})`}>
        <rect x="-112" y="-92" width="224" height="184" rx="14" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="4" />
        <rect x="-98" y="-78" width="196" height="156" rx="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
        {[-84, 84].map((sx) => (
          <circle key={sx} cx={sx} cy="0" r="4.5" fill="#94A3B8" />
        ))}
        <rect x="-72" y="-54" width="68" height="108" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2" />
        <circle cx="-54" cy="14" r="6" fill="#FBBF24" />
        <circle cx="-22" cy="14" r="6" fill="#FBBF24" />
        <line x1="-54" y1="14" x2={closed ? -22 : -28} y2={closed ? 14 : -16} stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
        <circle cx="-38" cy="-36" r="4.5" fill={closed ? '#EF4444' : '#450A0A'} />
        <g transform="translate(42, 0)">
          <rect x="-32" y="-54" width="64" height="108" rx="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="0" cy="-24" r="6.5" fill="#1E293B" />
          <circle cx="-15" cy="14" r="5.5" fill="#1E293B" />
          <circle cx="15" cy="14" r="5.5" fill="#1E293B" />
        </g>
        {sparkAtSwitch && <path d="M -30,6 L -24,14 L -18,8" fill="none" stroke="#E0F2FE" strokeWidth="4" filter="drop-shadow(0 0 14px #38BDF8)" />}
        <text x="-38" y="72" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="800">6A</text>
      </g>

      <g transform={`translate(${BULB.x}, ${BULB.y})`}>
        {bulbGlow > 0 && <circle cx="0" cy="0" r="185" fill="url(#wallBulbGlow)" opacity={bulbGlow} />}
        <rect x="-18" y="-58" width="36" height="24" rx="4" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <circle cx="0" cy="0" r="44" fill={bulbGlow > 0.05 ? `rgba(254, 240, 138, ${(0.3 + 0.62 * bulbGlow).toFixed(2)})` : 'rgba(30, 41, 59, 0.65)'} stroke="#BAE6FD" strokeWidth="2.5" />
        <path d="M -14,-22 L -8,8 L 0,-4 L 8,8 L 14,-22" fill="none" stroke={bulbGlow > 0.05 ? '#FEF08A' : '#64748B'} strokeWidth="3.5" />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------------------------------ */
/* Study desk corner of the same room (comb + paper, the boy's switch-and-bulb kit)            */
/* ------------------------------------------------------------------------------------------ */

export const DESK_TOP = 700;

/** Z0 — warm wall behind the study desk: calendar, framed photo, book shelf */
export const DeskWall: React.FC = () => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080">
    <defs>
      <radialGradient id="deskWallLamp" cx="78%" cy="45%" r="70%">
        <stop offset="0%" stopColor="#3B2A18" />
        <stop offset="100%" stopColor="#0E0B09" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="1920" height="1080" fill="url(#deskWallLamp)" />
    {/* framed family photo */}
    <g transform="translate(250, 230)">
      <rect x="-80" y="-60" width="160" height="120" fill="#2A1C12" stroke="#5C3A21" strokeWidth="8" />
      <circle cx="-22" cy="-6" r="18" fill="#7C5A44" />
      <circle cx="26" cy="-2" r="16" fill="#6B4A36" />
      <rect x="-50" y="18" width="100" height="30" rx="10" fill="#3F2D20" />
    </g>
    {/* wall calendar */}
    <g transform="translate(1540, 230)">
      <rect x="-90" y="-100" width="180" height="210" fill="#E7E0D3" opacity="0.55" />
      <rect x="-90" y="-100" width="180" height="46" fill="#B91C1C" opacity="0.6" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={-74 + (i % 5) * 31} y={-38 + Math.floor(i / 5) * 34} width="22" height="22" fill="#94A3B8" opacity="0.35" />
      ))}
    </g>
    {/* wall shelf */}
    <rect x="1040" y="470" width="420" height="12" fill="#3B2316" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <rect key={i} x={1060 + i * 34} y={470 - 70 - (i % 3) * 12} width="26" height={70 + (i % 3) * 12} fill={['#7F1D1D', '#1E3A8A', '#14532D', '#78350F'][i % 4]} opacity="0.75" />
    ))}
  </svg>
);

/** Z1 — desk lamp pool of light + pencil cup at the back of the desk */
export const DeskBackProps: React.FC = () => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080">
    <ellipse cx="1500" cy="700" rx="520" ry="90" fill="rgba(251, 191, 36, 0.10)" />
    <g transform="translate(1720, 700)">
      <rect x="-50" y="-10" width="100" height="14" rx="5" fill="#334155" />
      <line x1="0" y1="-10" x2="-40" y2="-200" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
      <line x1="-40" y1="-200" x2="-150" y2="-250" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
      <path d="M -200,-240 L -120,-270 L -110,-220 Z" fill="#F59E0B" />
      <circle cx="-150" cy="-232" r="40" fill="rgba(254, 240, 138, 0.35)" />
    </g>
  </svg>
);

/** Z2 (inside an <svg>) — wooden desk top + front panel; draw AFTER the boy so it hides his lap */
export const DeskFront: React.FC = () => (
  <g>
    <rect x="-200" y={DESK_TOP} width="2320" height="22" fill="#6B4226" />
    <rect x="-200" y={DESK_TOP + 22} width="2320" height="400" fill="#3B2316" />
    {[760, 820, 900, 990].map((y, i) => (
      <path key={y} d={`M -200,${y} C 400,${y - 14 + i * 4} 1100,${y + 18} 2120,${y - 6}`} fill="none" stroke="#4A2D1A" strokeWidth="3" opacity="0.7" />
    ))}
  </g>
);

/** Z3 — out-of-focus foreground pencil cup on the desk edge */
export const DeskForeground: React.FC = () => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080">
    <rect x="1700" y="760" width="160" height="320" rx="20" fill="#0B0F19" />
    <rect x="1730" y="640" width="14" height="130" fill="#1E293B" transform="rotate(-8 1737 700)" />
    <rect x="1790" y="660" width="14" height="110" fill="#1E293B" transform="rotate(10 1797 700)" />
    <rect x="-40" y="820" width="220" height="300" fill="#05070C" />
  </svg>
);

/** Z3 — near bedpost + curtain framing */
export const BedroomForeground: React.FC = () => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080">
    <rect x="-40" y="180" width="135" height="940" fill="#05070C" />
    <path d="M 1780,0 Q 1860,360 1920,760 L 1920,0 Z" fill="#05070C" />
  </svg>
);

/** Screen-space warm light from the ceiling bulb washing over every plane */
export const BulbLightWash: React.FC<{ amount: number }> = ({ amount }) =>
  amount > 0.01 ? (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: amount,
        background:
          'radial-gradient(ellipse 70% 85% at 66% 18%, rgba(253, 186, 116, 0.30) 0%, rgba(245, 158, 11, 0.14) 38%, rgba(120, 53, 15, 0.05) 70%, rgba(0,0,0,0) 100%)',
      }}
    />
  ) : null;

/**
 * Comic-book sound word drawn in the world (not a heading): pops, tilts, shakes, fades.
 * Use for onomatopoeia and the one or two words a beat genuinely needs.
 */
export const PopWord: React.FC<{
  local: number;
  at: number;
  until: number;
  text: string;
  x: number;
  y: number;
  color?: string;
  size?: number;
  tilt?: number;
}> = ({ local, at, until, text, x, y, color = '#FDE68A', size = 64, tilt = -8 }) => {
  if (local < at || local > until) return null;
  const pop = ci(local, [at, at + 6, at + 14], [0.3, 1.25, 1]);
  const a = ci(local, [at, at + 4, until - 12, until], [0, 1, 1, 0]);
  const jitter = local - at < 18 ? Math.sin((local - at) * 2.7) * 3 : 0;
  return (
    <g transform={`translate(${(x + jitter).toFixed(1)}, ${y}) rotate(${tilt}) scale(${pop.toFixed(3)})`} opacity={a}>
      <text textAnchor="middle" y={size * 0.35} fontSize={size} fontWeight="800" fill="#0F172A" stroke="#0F172A" strokeWidth="14" strokeLinejoin="round">
        {text}
      </text>
      <text textAnchor="middle" y={size * 0.35} fontSize={size} fontWeight="800" fill={color}>
        {text}
      </text>
    </g>
  );
};

/** Small in-world tag pinned to an object with a short tick (replaces slide-style headings). */
export const WorldTag: React.FC<{
  local: number;
  at: number;
  until: number;
  text: string;
  x: number;
  y: number;
  color: string;
  dx?: number;
  dy?: number;
  size?: number;
}> = ({ local, at, until, text, x, y, color, dx = 0, dy = -60, size = 30 }) => {
  if (local < at || local > until) return null;
  const a = ci(local, [at, at + 10, until - 12, until], [0, 1, 1, 0]);
  const grow = ci(local, [at, at + 14], [0, 1]);
  const w = text.length * size * 0.52 + 30;
  return (
    <g opacity={a}>
      <circle cx={x} cy={y} r={6 + 10 * (1 - grow)} fill="none" stroke={color} strokeWidth="2.5" opacity={1 - grow * 0.6} />
      <circle cx={x} cy={y} r="5" fill={color} />
      <line x1={x} y1={y} x2={x + dx * grow} y2={y + dy * grow} stroke={color} strokeWidth="2.5" />
      <g transform={`translate(${x + dx}, ${y + dy - size * 0.75})`} opacity={grow}>
        <rect x={-w / 2} y={-size * 0.8} width={w} height={size * 1.45} rx={size * 0.72} fill="rgba(8, 12, 22, 0.82)" stroke={color} strokeWidth="2" />
        <text textAnchor="middle" y={size * 0.3} fill="#F8FAFC" fontSize={size} fontWeight="700">
          {text}
        </text>
      </g>
    </g>
  );
};
