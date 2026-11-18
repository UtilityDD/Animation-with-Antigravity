import React from 'react';
import { DustMotes, EASE_IN, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig, type MultiplaneCamKey } from '../core/MultiplaneCameraRig';
import { BoyRig } from './BoyRig';
import { EASE_POP, NeutralAtomCloud, seeded } from './Ep01SharedGraphics';
import {
  BedWithBlanket,
  BedroomFarWall,
  BedroomForeground,
  BedroomMidground,
  BulbLightWash,
  DESK_TOP,
  DeskBackProps,
  DeskForeground,
  DeskFront,
  DeskWall,
  PopWord,
  WallCircuit,
  WorldTag,
} from './Ep01BedroomSet';

const centreOn = (f: number, X: number, Y: number, z: number, extra: Partial<MultiplaneCamKey> = {}): MultiplaneCamKey => ({
  f,
  x: (X - 960) * z,
  y: (Y - 540) * z,
  z,
  ...extra,
});

type P = [number, number];

/** Polyline helper: cumulative arc length + point lookup (wraps around for closed loops). */
function makeTrack(pts: P[]) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = seg.reduce((a, b) => a + b, 0);
  const at = (s: number): P => {
    let d = ((s % total) + total) % total;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i]) {
        const t = seg[i] > 0 ? d / seg[i] : 0;
        return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
      }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  };
  const lengthTo = (target: P) => {
    let best = 0;
    let bestD = Infinity;
    let acc = 0;
    for (let i = 0; i < pts.length; i++) {
      const d = Math.hypot(pts[i][0] - target[0], pts[i][1] - target[1]);
      if (d < bestD) {
        bestD = d;
        best = acc;
      }
      if (i < seg.length) acc += seg[i];
    }
    return best;
  };
  return { total, at, lengthTo };
}

function bez(p0: P, c1: P, c2: P, p1: P, n = 24): P[] {
  const out: P[] = [];
  for (let k = 1; k <= n; k++) {
    const t = k / n;
    const u = 1 - t;
    out.push([
      u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0],
      u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1],
    ]);
  }
  return out;
}

/* ========================================================================================== */
/* ACT 3 — "electricity is more than wires" → into the atom → comb, hair & paper at the desk  */
/* ========================================================================================== */

/**
 * ACT 3 cue sheet (act3_physics.mp3, local frames @60fps, from VO pauses):
 *  0–176   "সুতরাং বিদ্যুৎ মানেই শুধু তারের ভেতর প্রবাহ নয়।"
 *  206–665 "বিদ্যুৎ হলো … উপস্থিতি, পারস্পরিক ক্রিয়া এবং গতি … সমষ্টি।"
 *  703–849 "কম্বলের সুতো থেকে ডুব দিই পরমাণুর ভেতরে—"
 *  872–984 "কেন্দ্রে থাকে প্রোটন ও নিউট্রন,"   1009–1173 "আর চারপাশে মেঘের মতো বিস্তৃত থাকে ইলেকট্রন।"
 *  1202–1315 "ঘর্ষণে নতুন চার্জ তৈরি হয় না—"   1336–1499 "শুধু ইলেকট্রন এক বস্তু থেকে অন্য বস্তুতে চলে যায়,"
 *  1523–1646 "আর আবেশের টানেই কাগজ লাফিয়ে ওঠে!"
 */
const A3 = { cards: [300, 372, 470], dive: 703, nucleus: 872, cloud: 1009, rub: 1202, transfer: 1336, induce: 1523 };

// Wall conduit as a track (same geometry as the Act 1 wiring)
const CONDUIT_TRACK = makeTrack([
  [1390, 520],
  [1465, 520],
  [1465, 145],
  [1280, 145],
  [1280, 195],
]);

/** Shot A: back in the bedroom, light on. Wire flow → pull back → charge present / interacting / moving. */
const BedroomMoreThanWires: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const breath = Math.sin(frame * 0.05) * 2;
  // Boy at the Act 1 mark: head centre (590, 480), hair crown ≈ y 423 (BoyRig maths @ scale 0.76)
  const headX = 590;
  const crownY = 424 + breath;
  const charges = ci(local, [A3.cards[0], A3.cards[0] + 50], [0, 1]);
  const hairUp = ci(local, [A3.cards[1] - 6, A3.cards[1] + 34], [0, 1], EASE_OUT);
  const flowBoost = ci(local, [A3.cards[2] - 6, A3.cards[2] + 20], [0.55, 1]);
  const diveFlash = ci(local, [A3.dive + 20, A3.dive + 50], [0, 1], EASE_IN);

  const keys: MultiplaneCamKey[] = [
    // inside-the-wire close-up: electrons drifting in the copper
    centreOn(0, 1462, 330, 2.1, { rotateY: 0.8 }),
    centreOn(160, 1458, 345, 1.95, { rotateY: 0, stop: true }),
    // "…শুধু তারের ভেতর প্রবাহ নয়" → pull back: the whole room is full of electricity
    centreOn(300, 980, 470, 1.04, { rotateY: -0.8, stop: true }),
    centreOn(620, 940, 490, 1.1, { rotateY: 0 }),
    // "কম্বলের সুতো থেকে ডুব দিই" → crash into the blanket
    centreOn(A3.dive, 740, 570, 1.5, { rotateY: 1.0 }),
    centreOn(A3.dive + 60, 720, 585, 3.8, { rotateY: 1.4 }),
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 65% 28%, #3A2A14 0%, #090B10 78%)' }}>
      <MultiplaneCameraRig local={local} frame={frame} keys={keys}>
        <DepthLayer plane="Z0">
          <BedroomFarWall frame={frame} />
        </DepthLayer>
        <DepthLayer plane="Z1">
          <BedroomMidground frame={frame} />
        </DepthLayer>
        <DepthLayer plane="Z2">
          <BoyRig
            pose={{
              worldX: 350,
              worldY: 165,
              chestLeanDeg: 0,
              breathY: breath,
              headRollDeg: 0,
              eyeLookX: local > A3.cards[1] ? ci(local, [A3.cards[1], A3.cards[1] + 30, A3.cards[2], A3.cards[2] + 30], [-0.2, -0.5, -0.5, 0.9]) : 0.3,
              eyeLookY: local > A3.cards[1] ? ci(local, [A3.cards[1], A3.cards[1] + 30, A3.cards[2], A3.cards[2] + 30], [0, -0.9, -0.9, -0.5]) : 0.5,
              blinkAmount: frame % 165 > 158 ? 1 : 0,
              expression: hairUp > 0.3 && local < A3.cards[2] + 40 ? 'surprised' : 'curious',
              armLift: 0.55,
            }}
            scale={0.76}
          />
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
            <rect x="380" y="758" width="540" height="80" fill="#14100D" />

            {/* static hair: strands stand up, leaning toward the charged blanket */}
            {hairUp > 0.01 &&
              Array.from({ length: 9 }).map((_, i) => {
                const rx = headX - 34 + i * 8.5;
                const ry = crownY + Math.pow((rx - headX) / 36, 2) * 16;
                const len = 10 + hairUp * (30 + (i % 3) * 7);
                const bend = hairUp * (10 + i * 1.6) + Math.sin(frame * 0.3 + i) * 2.5 * hairUp;
                return (
                  <path
                    key={i}
                    d={`M ${rx},${ry} Q ${rx + bend * 0.3},${ry - len * 0.6} ${rx + bend},${ry - len}`}
                    fill="none"
                    stroke="#1C1917"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                );
              })}

            <BedWithBlanket blanketLift={60} crackle={0} arcSeed={0} charges={charges} frame={frame} />

            <WallCircuit frame={frame} closed front={0} flow={0} bulbGlow={1} xray={1} />
            {/* free electrons drifting inside the copper core of the wall wire */}
            {Array.from({ length: 34 }).map((_, k) => {
              const s = k * (CONDUIT_TRACK.total / 34) + local * 0.9 * flowBoost;
              const [px, py] = CONDUIT_TRACK.at(s);
              if (py > 190 && px < 1300) return null;
              const jx = Math.sin(frame * 0.9 + k * 2.3) * 2;
              const jy = Math.cos(frame * 1.1 + k * 1.7) * 2;
              return <circle key={k} cx={px + jx} cy={py + jy} r="4.5" fill="#7DD3FC" opacity={0.6 + 0.4 * flowBoost} filter="drop-shadow(0 0 4px #38BDF8)" />;
            })}

            {/* the three faces of electricity, pinned to where they happen in this room */}
            <WorldTag local={local} at={A3.cards[0]} until={650} text="উপস্থিতি" x={760} y={548} color="#F43F5E" dx={70} dy={-150} />
            <WorldTag local={local} at={A3.cards[1]} until={650} text="পারস্পরিক ক্রিয়া" x={600} y={392} color="#FBBF24" dx={-170} dy={-110} />
            <WorldTag local={local} at={A3.cards[2]} until={650} text="গতি" x={1465} y={330} color="#38BDF8" dx={130} dy={-20} />
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z3">
          <BedroomForeground />
        </DepthLayer>
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={620} count={26} opacity={0.85} seed={31} />
        </DepthLayer>
      </MultiplaneCameraRig>
      <BulbLightWash amount={0.8} />
      {/* blanket-blue flash as the lens punches through the fibres */}
      <div style={{ position: 'absolute', inset: 0, background: '#A5B4FC', opacity: diveFlash * 0.6, mixBlendMode: 'screen' }} />
    </div>
  );
};

/** Shot B: fibres rush past the lens, a neutral atom with an electron cloud fills the frame. */
const AtomDive: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const diveT = ci(local, [A3.dive + 10, A3.dive + 90], [0, 1], EASE_IN);
  const atomIn = ci(local, [A3.dive + 55, A3.dive + 130], [0, 1], EASE_OUT);
  const nucleusGlow = ci(local, [A3.nucleus, A3.nucleus + 24, A3.cloud, A3.cloud + 30], [0, 1, 1, 0.3]);
  const cloudStrength = 0.35 + 0.65 * ci(local, [A3.cloud, A3.cloud + 70], [0, 1], EASE_OUT);

  const keys: MultiplaneCamKey[] = [
    centreOn(A3.dive, 960, 540, 0.9, { rotateY: 0 }),
    centreOn(A3.dive + 80, 960, 540, 1.4, { rotateY: 0, stop: true }),
    centreOn(A3.nucleus + 40, 960, 540, 1.75, { rotateY: -0.6, stop: true }),
    // pull out so the cloud fills the frame
    centreOn(A3.cloud + 80, 960, 540, 1.15, { rotateY: 0.8 }),
    centreOn(A3.rub, 960, 540, 1.25, { rotateY: 0 }),
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #0E1A33 0%, #050811 75%)' }}>
      <MultiplaneCameraRig local={local} frame={frame} keys={keys} shakes={[{ f: A3.dive + 64, amp: 5, dur: 14 }]}>
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={i} x1={-100 + i * 160} y1="0" x2={300 + i * 160} y2="1080" stroke="#312E81" strokeWidth="18" opacity={0.35 * (1 - atomIn * 0.6)} />
            ))}
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z2">
          <svg width="1920" height="1080" style={{ overflow: 'visible' }}>
            {diveT < 1 && (
              <g transform={`translate(960, 540) scale(${(1 + diveT * 7).toFixed(3)})`} opacity={ci(diveT, [0, 0.15, 0.75, 1], [0, 1, 0.8, 0])}>
                <line x1="-170" y1="-70" x2="170" y2="70" stroke="#818CF8" strokeWidth="26" strokeLinecap="round" />
                <line x1="-170" y1="70" x2="170" y2="-70" stroke="#CBD5E1" strokeWidth="26" strokeLinecap="round" />
              </g>
            )}
            {atomIn > 0.01 && (
              <g opacity={atomIn} transform={`translate(960, 540) scale(${(0.3 + 0.7 * atomIn).toFixed(3)}) translate(-960, -540)`}>
                <NeutralAtomCloud frame={frame} cx={960} cy={540} radius={330} cloudStrength={cloudStrength} nucleusGlow={nucleusGlow} dots={220} />
                <WorldTag local={local} at={A3.nucleus + 4} until={A3.cloud + 20} text="প্রোটন" x={953} y={534} color="#FDA4AF" dx={-130} dy={-100} size={26} />
                <WorldTag local={local} at={A3.nucleus + 30} until={A3.cloud + 20} text="নিউট্রন" x={968} y={534} color="#CBD5E1" dx={130} dy={-100} size={26} />
              </g>
            )}
          </svg>
        </DepthLayer>
        {/* near electron-cloud specks drifting past the lens: we are INSIDE the cloud */}
        <DepthLayer plane="Z3" opacityOverride={0.5 * atomIn * cloudStrength}>
          <svg width="1920" height="1080">
            {Array.from({ length: 22 }).map((_, i) => {
              const a = seeded(i * 3.3) * Math.PI * 2 + frame * 0.004 * (i % 2 ? 1 : -1);
              const r = 300 + seeded(i * 7.7) * 520;
              return <circle key={i} cx={960 + Math.cos(a) * r} cy={540 + Math.sin(a) * r * 0.62} r={6 + seeded(i) * 8} fill="#BAE6FD" />;
            })}
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={580} count={24} opacity={0.75} seed={33} />
        </DepthLayer>
      </MultiplaneCameraRig>
    </div>
  );
};

/* --- Study desk: the boy combs his hair, then the comb lifts paper scraps --- */

const BOY_DESK = { W: 380, Y: 200, s: 1 };
const HEAD = { x: BOY_DESK.W + 240, y: BOY_DESK.Y + 620 + (-82 - 320) * BOY_DESK.s }; // (620, 418)
const CROWN_Y = HEAD.y - 70;
const SHOULDER: P = [BOY_DESK.W + 240 + 82 * BOY_DESK.s, BOY_DESK.Y + 620 + (36 - 320) * BOY_DESK.s]; // (702, 536)
const SCRAPS = [
  { x: 880, r: -18 },
  { x: 930, r: 12 },
  { x: 985, r: -6 },
  { x: 1035, r: 20 },
  { x: 1085, r: -14 },
];

/** Rubber-hose sleeve from the shoulder to a hand position, matching BoyRig's sweater. */
const NoodleArm: React.FC<{ hand: P; ctrl: P }> = ({ hand, ctrl }) => {
  const d = `M ${SHOULDER[0]},${SHOULDER[1]} Q ${ctrl[0].toFixed(1)},${ctrl[1].toFixed(1)} ${hand[0].toFixed(1)},${hand[1].toFixed(1)}`;
  return (
    <g>
      <path d={d} fill="none" stroke="#1E3A8A" strokeWidth="35" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#1D4ED8" strokeWidth="30" strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1] + 4} r="16" fill="#93C5FD" opacity="0.9" />
    </g>
  );
};

const CombDesk: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const breath = Math.sin(frame * 0.05) * 1.5;
  const combIn = ci(local, [A3.rub - 20, A3.rub + 16], [0, 1], EASE_OUT);
  const toPaper = ci(local, [1500, 1550], [0, 1], EASE_INOUT);
  const rubPhase = local >= A3.rub && local < 1500 ? Math.sin((local - A3.rub) * 0.21) : 0;
  const rubX = HEAD.x + rubPhase * 52;
  const rubY = CROWN_Y - 8 + breath + Math.abs(rubPhase) * 4;
  const restX = 800;
  const restY = 520;
  const hx = restX + (rubX - restX) * combIn;
  const hy = restY + (rubY - restY) * combIn;
  const combX = hx + (985 - hx) * toPaper;
  const combY = hy + (612 - hy) * toPaper;
  const hopped = (k: number) => ci(local, [A3.transfer + k * 24, A3.transfer + k * 24 + 22], [0, 1], EASE_INOUT);
  const nHopped = [0, 1, 2, 3, 4, 5].filter((k) => hopped(k) >= 1).length;
  const polarize = ci(local, [1500, 1535], [0, 1], EASE_OUT);
  const jumped = local >= 1575;

  const hand: P = [combX + 8, combY - 26];
  const ctrlRub: P = [SHOULDER[0] + 120, (SHOULDER[1] + hand[1]) / 2 + 30];
  const ctrlPaper: P = [(SHOULDER[0] + hand[0]) / 2, Math.max(SHOULDER[1], hand[1]) + 70];
  const ctrl: P = [ctrlRub[0] + (ctrlPaper[0] - ctrlRub[0]) * toPaper, ctrlRub[1] + (ctrlPaper[1] - ctrlRub[1]) * toPaper];

  const keys: MultiplaneCamKey[] = [
    centreOn(A3.rub - 30, 700, 470, 1.0, { rotateY: -0.8 }),
    centreOn(A3.rub + 70, 650, 420, 1.32, { rotateY: 0.6 }),
    centreOn(1490, 680, 430, 1.34, { rotateY: 0, stop: true }),
    centreOn(1560, 860, 560, 1.3, { rotateY: -0.6 }),
    centreOn(1700, 900, 585, 1.45, { rotateY: -1.0 }),
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0E0B09' }}>
      <MultiplaneCameraRig local={local} frame={frame} keys={keys}>
        <DepthLayer plane="Z0" opacityOverride={0.8} blurOverride={5}>
          <DeskWall />
        </DepthLayer>
        <DepthLayer plane="Z1">
          <DeskBackProps />
        </DepthLayer>
        <DepthLayer plane="Z2">
          <BoyRig
            pose={{
              worldX: BOY_DESK.W,
              worldY: BOY_DESK.Y,
              chestLeanDeg: 0,
              breathY: breath,
              headRollDeg: jumped ? -4 : rubPhase * 2,
              eyeLookX: toPaper > 0.3 ? 0.95 : 0.1,
              eyeLookY: toPaper > 0.3 ? 0.7 : -0.95,
              blinkAmount: frame % 170 > 163 ? 1 : 0,
              expression: jumped ? 'surprised' : 'curious',
              armLift: 0,
            }}
            scale={BOY_DESK.s}
            hideRightArm
          />
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
            <DeskFront />

            {/* torn notebook scraps on the desk; they polarise, then jump to the comb */}
            {SCRAPS.map((p, i) => {
              const lift = ci(local, [1562 + i * 7, 1604 + i * 7], [0, 1], EASE_POP);
              const tx = combX - 64 + i * 32;
              const ty = combY + 46;
              const px = p.x + (tx - p.x) * lift;
              const py = DESK_TOP - 10 + (ty - (DESK_TOP - 10)) * lift;
              return (
                <g key={i} transform={`translate(${px.toFixed(1)}, ${py.toFixed(1)}) rotate(${(p.r * (1 - lift) + (i - 2) * 6 * lift).toFixed(1)})`}>
                  <rect x="-19" y="-11" width="38" height="22" rx="2" fill="#F2E5CE" stroke="#CBB89A" strokeWidth="1.5" />
                  <line x1="-15" y1="-3" x2="15" y2="-3" stroke="#93C5FD" strokeWidth="1.2" opacity="0.6" />
                  <line x1="-15" y1="4" x2="15" y2="4" stroke="#93C5FD" strokeWidth="1.2" opacity="0.6" />
                  <g opacity={polarize}>
                    <circle cx="0" cy="-6" r="4.5" fill="#F43F5E" />
                    <circle cx="0" cy="6" r="4.5" fill="#38BDF8" />
                  </g>
                </g>
              );
            })}

            {/* positive charges left behind in the hair as electrons leave */}
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <g key={k} opacity={ci(hopped(k), [0.3, 1], [0, 1]) * ci(local, [1530, 1560], [1, 0.35])}>
                <circle cx={HEAD.x - 40 + k * 16} cy={CROWN_Y + 18 + (k % 2) * 12 + breath} r="8" fill="#F43F5E" stroke="#FDA4AF" strokeWidth="1.2" />
                <text x={HEAD.x - 40 + k * 16} y={CROWN_Y + 23.5 + (k % 2) * 12 + breath} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">+</text>
              </g>
            ))}

            {/* comb (held) */}
            <g transform={`translate(${combX.toFixed(1)}, ${combY.toFixed(1)}) scale(0.62)`} opacity={combIn}>
              <rect x="-150" y="-30" width="300" height="34" rx="10" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />
              {Array.from({ length: 14 }).map((_, i) => (
                <rect key={i} x={-142 + i * 21} y="2" width="10" height="46" rx="3" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.2" />
              ))}
            </g>

            {/* electrons hop hair → comb, then ride on the comb */}
            {[0, 1, 2, 3, 4, 5].map((k) => {
              const t = hopped(k);
              const sx = HEAD.x - 40 + k * 16;
              const sy = CROWN_Y + 18 + (k % 2) * 12 + breath;
              const ex = combX - 70 + k * 28;
              const ey = combY - 6;
              const x = sx + (ex - sx) * t;
              const y = sy + (ey - sy) * t - Math.sin(t * Math.PI) * 50;
              if (t <= 0) return null;
              return (
                <g key={k}>
                  <circle cx={x} cy={y} r="8" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1.2" filter={t < 1 ? 'drop-shadow(0 0 8px #38BDF8)' : undefined} />
                  <text x={x} y={y + 5} textAnchor="middle" fill="#0F172A" fontSize="15" fontWeight="800">−</text>
                </g>
              );
            })}

            {combIn > 0.01 && <NoodleArm hand={hand} ctrl={ctrl} />}
            {combIn > 0.01 && <ellipse cx={hand[0]} cy={hand[1] + 14} rx="17" ry="15" fill="#DFA580" stroke="#B87D5B" strokeWidth="1.5" opacity={combIn} />}

            {/* live tally pinned to hair and comb: nothing created, only moved */}
            {local >= A3.transfer && (
              <g opacity={ci(local, [A3.transfer, A3.transfer + 16, 1640, 1664], [0, 1, 1, 0])}>
                <g transform={`translate(${HEAD.x - 120}, ${CROWN_Y + 10})`} opacity={ci(local, [1530, 1560], [1, 0])}>
                  <rect x="-44" y="-24" width="88" height="44" rx="22" fill="rgba(8,12,22,0.85)" stroke="#F43F5E" strokeWidth="2" />
                  <text x="0" y="10" textAnchor="middle" fill="#FDA4AF" fontSize="28" fontWeight="800">+{nHopped}</text>
                </g>
                <g transform={`translate(${(combX + 140).toFixed(1)}, ${(combY - 6).toFixed(1)})`}>
                  <rect x="-44" y="-24" width="88" height="44" rx="22" fill="rgba(8,12,22,0.85)" stroke="#38BDF8" strokeWidth="2" />
                  <text x="0" y="10" textAnchor="middle" fill="#7DD3FC" fontSize="28" fontWeight="800">−{nHopped}</text>
                </g>
              </g>
            )}

            <WorldTag local={local} at={A3.rub + 14} until={1326} text="নতুন চার্জ নয়" x={HEAD.x} y={CROWN_Y - 30} color="#F43F5E" dx={190} dy={-70} size={28} />
            <WorldTag local={local} at={A3.induce + 6} until={1690} text="আবেশ" x={combX + 40} y={combY + 52} color="#FBBF24" dx={250} dy={70} size={30} />
            <PopWord local={local} at={1572} until={1650} text="টপাটপ!" x={combX - 40} y={combY - 110} color="#FDE68A" size={52} tilt={-7} />
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z3">
          <DeskForeground />
        </DepthLayer>
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={600} count={22} opacity={0.7} seed={37} />
        </DepthLayer>
      </MultiplaneCameraRig>
    </div>
  );
};

export const Ep01MicroPhysicsScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  const roomA = ci(local, [A3.dive + 40, A3.dive + 62], [1, 0]);
  const atomA = ci(local, [A3.dive + 30, A3.dive + 56, A3.rub - 30, A3.rub - 4], [0, 1, 1, 0]);
  const deskA = ci(local, [A3.rub - 30, A3.rub - 4], [0, 1]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B1120', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      {roomA > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: roomA }}>
          <BedroomMoreThanWires frame={frame} local={local} />
        </div>
      )}
      {atomA > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: atomA }}>
          <AtomDive frame={frame} local={local} />
        </div>
      )}
      {deskA > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: deskA }}>
          <CombDesk frame={frame} local={local} />
        </div>
      )}
      <KineticWord localMs={localMs} appearMs={16800} emphasizeStartMs={17100} emphasizeEndMs={19300} removeMs={19700} text="ইলেকট্রন মেঘ" x={960} y={930} accentColor="#38BDF8" mode="SCALE_GLOW" />
    </div>
  );
};

/* ========================================================================================== */
/* ACT 3E — the boy's switch-and-bulb kit on the desk → the whole house wakes up              */
/* ========================================================================================== */

/**
 * ACT 3E cue sheet (act3e_switch_bulb.mp3, local frames @60fps):
 *  0–224 "এবার তাকান … 6A মডুলার সুইচের ভেতরে।"   258–493 "সুইচ খোলা থাকলে … কাঁপতে থাকে,"  514–577 "বাল্ব নিভে থাকে।"
 *  607–718 "সুইচ চাপতেই তামার পাত জুড়ে যায়,"  740–828 "শুরু হয় একমুখী প্রবাহ—"
 *  850–1028 "… যতগুলো ইলেকট্রন ঢোকে,"  1051–1160 "সমান সংখ্যক ইলেকট্রন বেরিয়ে যায়!"
 *  1184–1283 "বাল্ব একটাও ইলেকট্রন খায় না—"  1304–1470 "… আলো ও তাপে বদলে দেয়।"
 *  1497 "পাখা" · 1602 "ইস্ত্রি" · 1688 "কলিং বেল" · 1760 "জলের পাম্প"
 */
export const ACT3E_CUES = { press: 650, inCount: 850, outCount: 1051, noEat: 1184, energy: 1304, grid: 1497 };

// Desk-kit geometry (electron direction: cell − → switch → bulb → cell +)
const CELL = { x: 400, top: 470, bottom: DESK_TOP };
const SW = { x: 910, y: 640 };
const BULB_K = { x: 1440, y: 552 };
const LEAD_IN: P = [1422, 640];
const LEAD_OUT: P = [1458, 640];

const WIRE_NEG: P[] = [
  [470, 688],
  ...bez([470, 688], [600, 716], [740, 716], [850, 690]),
  [970, 690],
  ...bez([970, 690], [1110, 718], [1300, 718], [1400, 692]),
  [LEAD_IN[0], 668],
];
const BULB_PATH: P[] = [
  LEAD_IN,
  [1422, 580],
  ...bez([1422, 580], [1426, 538], [1454, 538], [1458, 580], 12),
  LEAD_OUT,
];
const WIRE_POS: P[] = [
  [LEAD_OUT[0], 668],
  [1482, 692],
  ...bez([1482, 692], [1620, 700], [1660, 520], [1620, 400]),
  ...bez([1620, 400], [1500, 160], [700, 150], [470, 330], 40),
  ...bez([470, 330], [420, 380], [400, 420], [400, 452]),
];
const KIT_TRACK = makeTrack([...WIRE_NEG, ...BULB_PATH, ...WIRE_POS]);
const toD = (pts: P[]) => pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
const D_NEG = toD(WIRE_NEG);
const D_POS = toD(WIRE_POS);
const D_FILAMENT = toD(BULB_PATH);
const N_E = 52;
const SPACING = KIT_TRACK.total / N_E;
const S_IN = KIT_TRACK.lengthTo(LEAD_IN);
const S_OUT = KIT_TRACK.lengthTo(LEAD_OUT);

const crossings = (drift: number, point: number) => {
  const phase = point % SPACING;
  return drift >= phase ? Math.floor((drift - phase) / SPACING) + 1 : 0;
};

const CounterPill: React.FC<{ x: number; y: number; text: string; color: string; emph: number }> = ({ x, y, text, color, emph }) => (
  <g transform={`translate(${x}, ${y}) scale(${(1 + emph * 0.18).toFixed(3)})`}>
    <rect x="-78" y="-27" width="156" height="52" rx="26" fill="rgba(8,12,22,0.88)" stroke={color} strokeWidth={2 + emph * 2} />
    <text x="0" y="9" textAnchor="middle" fill="#F8FAFC" fontSize="27" fontWeight="800">{text}</text>
  </g>
);

const SwitchBulbKit: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const C = ACT3E_CUES;
  const lever = ci(local, [C.press, C.press + 10], [0, 1], EASE_IN);
  const closed = lever >= 1;
  const V = 3.0;
  const t = Math.max(0, local - C.press - 10);
  const drift = t < 40 ? (V * t * t) / 80 : V * 20 + V * (t - 40);
  const nIn = crossings(drift, S_IN);
  const nOut = crossings(drift, S_OUT);
  const glow = ci(local, [C.press + 10, C.press + 30], [0, 1], EASE_OUT);
  const energyT = ci(local, [C.energy, C.energy + 40], [0, 1], EASE_OUT);
  const emphIn = ci(local, [C.inCount, C.inCount + 16, 1028, 1050], [0, 1, 1, 0]);
  const emphOut = ci(local, [C.outCount, C.outCount + 16, 1160, 1180], [0, 1, 1, 0]);
  const xrayWin = ci(local, [0, 40], [0, 1]);

  const keys: MultiplaneCamKey[] = [
    centreOn(0, SW.x, SW.y, 2.2, { rotateY: 1.0 }),
    centreOn(190, SW.x, SW.y, 2.0, { rotateY: 0, stop: true }),
    centreOn(320, 960, 470, 1.0, { rotateY: -0.8 }),
    centreOn(600, 940, 490, 1.05, { rotateY: 0 }),
    centreOn(C.press, SW.x, SW.y - 10, 1.45, { rotateY: 0.6, stop: true }),
    centreOn(790, 960, 470, 1.0, { rotateY: 0 }),
    centreOn(C.inCount, 1430, 590, 1.55, { rotateY: -1.0 }),
    centreOn(1160, 1440, 585, 1.6, { rotateY: -0.6 }),
    centreOn(C.energy, 1440, 560, 1.85, { rotateY: 0, stop: true }),
    centreOn(C.grid, 1300, 540, 1.3, { rotateY: 0.6 }),
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0E0B09' }}>
      <MultiplaneCameraRig local={local} frame={frame} keys={keys} shakes={[{ f: C.press + 8, amp: 4, dur: 12 }]}>
        <DepthLayer plane="Z0" opacityOverride={0.8} blurOverride={5}>
          <DeskWall />
        </DepthLayer>
        <DepthLayer plane="Z1">
          <DeskBackProps />
        </DepthLayer>
        <DepthLayer plane="Z2">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
            <DeskFront />
            <ellipse cx={BULB_K.x} cy={DESK_TOP} rx={360 * glow} ry={50 * glow} fill="rgba(254, 240, 138, 0.18)" />

            {/* insulated wires, see-through (X-ray) so the copper core and its electrons show */}
            <path d={D_NEG} fill="none" stroke="rgba(30, 41, 59, 0.55)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
            <path d={D_POS} fill="none" stroke="rgba(185, 28, 28, 0.45)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
            <path d={D_NEG} fill="none" stroke="#C2410C" strokeWidth="6" strokeLinejoin="round" />
            <path d={D_POS} fill="none" stroke="#C2410C" strokeWidth="6" strokeLinejoin="round" />

            {/* Cell standing on the desk */}
            <g>
              <rect x={CELL.x - 20} y={CELL.top - 18} width="40" height="20" rx="4" fill="#CBD5E1" />
              <rect x={CELL.x - 60} y={CELL.top} width="120" height={CELL.bottom - CELL.top} rx="16" fill="#1E293B" stroke="#475569" strokeWidth="3" />
              <rect x={CELL.x - 60} y={CELL.top} width="120" height="70" rx="16" fill="#B45309" />
              <rect x={CELL.x - 48} y={CELL.top + 10} width="14" height={CELL.bottom - CELL.top - 30} rx="7" fill="#F8FAFC" opacity="0.12" />
              <text x={CELL.x} y={CELL.top + 50} textAnchor="middle" fill="#FFF7ED" fontSize="36" fontWeight="800">+</text>
              <text x={CELL.x} y={CELL.bottom - 40} textAnchor="middle" fill="#7DD3FC" fontSize="40" fontWeight="800">−</text>
              <rect x={CELL.x + 58} y={CELL.bottom - 22} width="16" height="12" rx="3" fill="#94A3B8" />
            </g>

            {/* Bulb in its holder (light + heat) */}
            <g>
              {glow > 0 && <circle cx={BULB_K.x} cy={BULB_K.y} r={150 + energyT * 50} fill="rgba(254, 240, 138, 0.16)" opacity={glow} />}
              <rect x={BULB_K.x - 46} y="628" width="92" height={DESK_TOP - 628} rx="10" fill="#334155" stroke="#64748B" strokeWidth="3" />
              <rect x={BULB_K.x - 30} y="612" width="60" height="22" rx="4" fill="#94A3B8" />
              <path
                d={`M ${BULB_K.x - 30},612 C ${BULB_K.x - 34},590 ${BULB_K.x - 70},560 ${BULB_K.x - 70},${BULB_K.y - 10} A 70,70 0 1,1 ${BULB_K.x + 70},${BULB_K.y - 10} C ${BULB_K.x + 70},560 ${BULB_K.x + 34},590 ${BULB_K.x + 30},612 Z`}
                fill={glow > 0.05 ? `rgba(254, 240, 138, ${(0.18 + 0.55 * glow).toFixed(2)})` : 'rgba(148, 163, 184, 0.14)'}
                stroke="#BAE6FD"
                strokeWidth="3"
                filter={glow > 0.05 ? 'drop-shadow(0 0 40px #FBBF24)' : undefined}
              />
              <path d={D_FILAMENT} fill="none" stroke={glow > 0.05 ? '#F59E0B' : '#64748B'} strokeWidth="3.5" filter={glow > 0.05 ? 'drop-shadow(0 0 10px #FDE68A)' : undefined} />
              {energyT > 0 &&
                [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
                  const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
                  const r0 = 96 + ((frame * 2 + k * 9) % 30);
                  return <line key={k} x1={BULB_K.x + Math.cos(a) * r0} y1={BULB_K.y - 20 + Math.sin(a) * r0} x2={BULB_K.x + Math.cos(a) * (r0 + 26)} y2={BULB_K.y - 20 + Math.sin(a) * (r0 + 26)} stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" opacity={energyT * (k === 2 ? 0 : 1)} />;
                })}
              {energyT > 0 &&
                [-30, 0, 30].map((hx, k) => (
                  <path
                    key={hx}
                    d={`M ${BULB_K.x + hx},${BULB_K.y - 110} q 10,-16 0,-32 q -10,-16 0,-32`}
                    fill="none"
                    stroke="#FB923C"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity={energyT * (0.5 + 0.5 * Math.sin(frame * 0.2 + k))}
                    transform={`translate(0, ${(-((frame * 1.2 + k * 14) % 30)).toFixed(1)})`}
                  />
                ))}
            </g>

            {/* free electrons: jiggle in place while open; the whole loop drifts together once closed */}
            {Array.from({ length: N_E }).map((_, k) => {
              const s = k * SPACING + drift;
              const [px, py] = KIT_TRACK.at(s);
              const jx = Math.sin(frame * 0.9 + k * 2.3) * 3.5;
              const jy = Math.cos(frame * 1.1 + k * 1.7) * 3.5;
              return <circle key={k} cx={px + jx} cy={py + jy} r="6" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1" opacity="0.92" />;
            })}

            {/* 6A modular switch on a wooden block, front cover X-rayed to show brass contacts */}
            <g transform={`translate(${SW.x}, ${SW.y})`}>
              <rect x="-110" y="-60" width="220" height={DESK_TOP - SW.y + 60} rx="8" fill="#5B3A22" stroke="#3B2316" strokeWidth="3" />
              <rect x="-82" y="-50" width="164" height="104" rx="12" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3" />
              <rect x="-62" y="-36" width="124" height="76" rx="8" fill="#0F172A" opacity={0.25 + 0.75 * xrayWin} />
              <rect x="-52" y="8" width="28" height="12" rx="3" fill="#D97706" />
              <rect x="24" y="8" width="28" height="12" rx="3" fill="#D97706" />
              <line
                x1="-38"
                y1="8"
                x2={-38 + 76 * Math.cos((-38 * (1 - lever) * Math.PI) / 180)}
                y2={8 + 76 * Math.sin((-38 * (1 - lever) * Math.PI) / 180)}
                stroke="#F59E0B"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <circle cx="-38" cy="-24" r="4" fill={closed ? '#EF4444' : '#450A0A'} />
              <text x="44" y="-16" textAnchor="middle" fill="#94A3B8" fontSize="15" fontWeight="800">6A</text>
              {local >= C.press + 10 && local < C.press + 28 && (
                <path d="M 26,-4 L 34,6 L 28,8 L 38,20" fill="none" stroke="#E0F2FE" strokeWidth="3.5" filter="drop-shadow(0 0 10px #38BDF8)" />
              )}
            </g>

            {/* flow direction chevrons on the wire (only once flowing) */}
            {closed &&
              [0.12, 0.36, 0.7, 0.86].map((u, k) => {
                const s = u * KIT_TRACK.total;
                const [ax, ay] = KIT_TRACK.at(s);
                const [bx, by] = KIT_TRACK.at(s + 6);
                const ang = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
                if (Math.hypot(ax - BULB_K.x, ay - BULB_K.y) < 170) return null;
                return (
                  <path key={k} d="M -10,-12 L 6,0 L -10,12" transform={`translate(${ax.toFixed(1)}, ${(ay - 0).toFixed(1)}) rotate(${ang.toFixed(1)})`} fill="none" stroke="#E0F2FE" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity={ci(local, [740, 770], [0, 0.9])} />
                );
              })}

            {/* IN / OUT counters pinned to the two bulb leads */}
            {local >= 760 && (
              <g opacity={ci(local, [760, 780, 1480, 1500], [0, 1, 1, 0])}>
                <line x1={LEAD_IN[0]} y1={LEAD_IN[1] + 10} x2="1300" y2="760" stroke="#38BDF8" strokeWidth="2" />
                <line x1={LEAD_OUT[0]} y1={LEAD_OUT[1] + 10} x2="1585" y2="760" stroke="#10B981" strokeWidth="2" />
                <CounterPill x={1270} y={782} text={`ঢুকল ${nIn}`} color="#38BDF8" emph={emphIn} />
                <CounterPill x={1615} y={782} text={`বেরোল ${nOut}`} color="#10B981" emph={emphOut} />
              </g>
            )}

            <PopWord local={local} at={C.press + 2} until={C.press + 70} text="খট্!" x={SW.x + 120} y={SW.y - 110} color="#FDE68A" size={56} tilt={8} />
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z3">
          <DeskForeground />
        </DepthLayer>
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={600} count={22} opacity={0.7} seed={35} />
        </DepthLayer>
      </MultiplaneCameraRig>
      {/* the bulb really lights the room */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: glow * 0.9,
          background: 'radial-gradient(ellipse 60% 70% at 72% 52%, rgba(253, 186, 116, 0.26) 0%, rgba(245, 158, 11, 0.10) 45%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
};

/* --- The whole house wakes up: fan, iron, calling bell, water pump --- */

const HOUSE = { l: 360, r: 1460, roof: 300, mid: 600, ground: 900 };
const ROOMS = [
  { at: 1497, label: 'পাখা', color: '#38BDF8', x: HOUSE.l, y: HOUSE.roof, w: 550, h: 300, light: [635, 330] as P },
  { at: 1602, label: 'ইস্ত্রি', color: '#F43F5E', x: HOUSE.l, y: HOUSE.mid, w: 550, h: 300, light: [635, 630] as P },
  { at: 1688, label: 'কলিং বেল', color: '#A855F7', x: 910, y: HOUSE.mid, w: 550, h: 300, light: [1180, 630] as P },
];

const HouseWakesUp: React.FC<{ frame: number; local: number; duration: number }> = ({ frame, local, duration }) => {
  const lit = (at: number) => ci(local, [at, at + 22], [0, 1], EASE_OUT);
  const fanOn = lit(1497);
  const ironOn = lit(1602);
  const bellOn = lit(1688);
  const pumpOn = lit(1760);
  const fanAng = frame * 0.5 * fanOn;
  const bellShake = bellOn > 0 ? Math.sin(frame * 1.6) * 7 * bellOn : 0;
  const tankLevel = ci(local, [1770, duration], [0.2, 0.75]);

  const keys: MultiplaneCamKey[] = [
    centreOn(ACT3E_CUES.grid - 30, 960, 560, 0.95, { rotateY: 0 }),
    centreOn(1497, 780, 500, 1.08, { rotateY: 0.6 }),
    centreOn(1602, 790, 640, 1.08, { rotateY: 0.3 }),
    centreOn(1688, 1000, 650, 1.08, { rotateY: -0.3 }),
    centreOn(1760, 1120, 590, 1.05, { rotateY: -0.6 }),
    centreOn(duration, 980, 570, 1.0, { rotateY: 0 }),
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(#050A18 0%, #0B1630 70%, #0A0F1A 100%)' }}>
      <MultiplaneCameraRig local={local} frame={frame} keys={keys}>
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            {Array.from({ length: 40 }).map((_, i) => (
              <circle key={i} cx={seeded(i) * 1920} cy={seeded(i + 50) * 420} r={1 + seeded(i + 9) * 1.6} fill="#E0F2FE" opacity={0.4 + 0.4 * Math.sin(frame * 0.05 + i)} />
            ))}
            <circle cx="1640" cy="140" r="44" fill="#E0F2FE" opacity="0.6" />
            {/* neighbouring houses */}
            <rect x="-40" y="560" width="300" height="400" fill="#0F172A" />
            <rect x="1700" y="520" width="300" height="440" fill="#0F172A" />
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z1">
          <svg width="1920" height="1080">
            <rect x="0" y={HOUSE.ground} width="1920" height="200" fill="#111827" />
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z2">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
            {/* electric pole + service wire into the house */}
            <rect x="196" y="230" width="12" height={HOUSE.ground - 230} fill="#475569" />
            <rect x="170" y="240" width="64" height="8" fill="#475569" />
            <path d={`M 228,248 Q 300,300 ${HOUSE.l},330`} fill="none" stroke="#B45309" strokeWidth="3" />

            {/* house shell (cutaway) */}
            <rect x={HOUSE.l} y={HOUSE.roof} width={HOUSE.r - HOUSE.l} height={HOUSE.ground - HOUSE.roof} fill="#1F2937" />
            {/* the boy's room (top right) — already lit by the bulb we just switched on */}
            <rect x="910" y={HOUSE.roof} width="550" height="300" fill="#3A2A14" />
            <circle cx="1185" cy="400" r="260" fill="rgba(254, 240, 138, 0.10)" clipPath="url(#boyRoomClip)" />
            <clipPath id="boyRoomClip">
              <rect x="910" y={HOUSE.roof} width="550" height="300" />
            </clipPath>
            <circle cx="1185" cy="340" r="16" fill="#FEF08A" filter="drop-shadow(0 0 12px #FBBF24)" />
            <rect x="1060" y="520" width="200" height="12" fill="#6B4226" />
            <circle cx="1120" cy="470" r="20" fill="#C1845E" />
            <rect x="1100" y="490" width="40" height="34" rx="10" fill="#1D4ED8" />

            <defs>
              <radialGradient id="roomGlow">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
              </radialGradient>
              {ROOMS.map((r, i) => (
                <clipPath key={i} id={`roomClip${i}`}>
                  <rect x={r.x} y={r.y} width={r.w} height={r.h} />
                </clipPath>
              ))}
            </defs>
            {ROOMS.map((r, i) => {
              const on = lit(r.at);
              return (
                <g key={r.label} clipPath={`url(#roomClip${i})`}>
                  <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="#2A2017" />
                  <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="#3A2A14" opacity={on} />
                  <circle cx={r.light[0]} cy={r.light[1] + 60} r={300} fill="url(#roomGlow)" opacity={on} />
                </g>
              );
            })}

            {/* Fan (top-left room) — perspective ceiling fan */}
            <g transform="translate(635, 330)">
              <rect x="-3" y="-30" width="6" height="30" fill="#94A3B8" />
              {[0, 1, 2].map((k) => {
                const a = fanAng + (k * Math.PI * 2) / 3;
                return <ellipse key={k} cx={Math.cos(a) * 70} cy={Math.sin(a) * 9} rx={Math.abs(Math.cos(a)) * 58 + 8} ry="6" fill="#E2E8F0" />;
              })}
              <ellipse cx="0" cy="0" rx="16" ry="9" fill="#CBD5E1" />
              {fanOn > 0.5 && <ellipse cx="0" cy="0" rx="140" ry="16" fill="none" stroke="#BAE6FD" strokeWidth="2" opacity="0.3" />}
            </g>
            {/* curtain blown by the fan */}
            <path d={`M 780,360 Q ${790 + fanOn * (18 + Math.sin(frame * 0.25) * 8)},450 ${780 + fanOn * 30},560 L 820,560 L 820,360 Z`} fill="#7F1D1D" opacity="0.8" />

            {/* Iron on an ironing board (ground-left) */}
            <g transform="translate(635, 800)">
              <rect x="-170" y="0" width="340" height="14" rx="7" fill="#64748B" />
              <line x1="-110" y1="14" x2="-50" y2="100" stroke="#475569" strokeWidth="6" />
              <line x1="110" y1="14" x2="50" y2="100" stroke="#475569" strokeWidth="6" />
              <rect x="-120" y="-10" width="190" height="12" rx="4" fill="#E0F2FE" opacity="0.8" />
              <path d="M -10,-2 L 90,-2 L 75,-36 Q 30,-50 -10,-24 Z" fill={ironOn > 0.5 ? '#F43F5E' : '#7F1D1D'} />
              <rect x="10" y="-52" width="60" height="10" rx="5" fill="#334155" />
              {[0, 1, 2].map((k) => (
                <path key={k} d={`M ${20 + k * 22},-60 q 8,-12 0,-24 q -8,-12 0,-24`} fill="none" stroke="#E2E8F0" strokeWidth="3" opacity={ironOn * (0.4 + 0.4 * Math.sin(frame * 0.2 + k))} transform={`translate(0, ${(-((frame * 0.8 + k * 10) % 20)).toFixed(1)})`} />
              ))}
            </g>

            {/* Front door + calling bell (ground-right) */}
            <rect x="1300" y="690" width="130" height="210" rx="4" fill="#5B3A22" stroke="#78350F" strokeWidth="4" />
            <circle cx="1405" cy="800" r="6" fill="#FBBF24" />
            <g transform={`translate(1210, 680) rotate(${bellShake.toFixed(2)})`}>
              <path d="M -26,24 L -18,-14 A 18,18 0 0,1 18,-14 L 26,24 Z" fill={bellOn > 0.5 ? '#A855F7' : '#4C1D95'} />
              <circle cx="0" cy="30" r="6" fill="#E9D5FF" />
            </g>
            {bellOn > 0.1 &&
              [1, 2].map((k) => (
                <path key={k} d={`M ${1250 + k * 14},${650 - k * 6} q ${12 + k * 6},30 0,${60 + k * 12}`} fill="none" stroke="#C4B5FD" strokeWidth="3" opacity={bellOn * (0.4 + 0.5 * Math.sin(frame * 0.6 + k))} />
              ))}

            {/* Room shading: dark until each appliance is named */}
            {ROOMS.map((r) => (
              <rect key={`dark${r.label}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="#05070D" opacity={0.72 * (1 - lit(r.at))} />
            ))}

            {/* floor slabs, walls, roof */}
            <rect x={HOUSE.l - 10} y={HOUSE.roof - 14} width={HOUSE.r - HOUSE.l + 20} height="16" fill="#475569" />
            <rect x={HOUSE.l} y={HOUSE.mid - 6} width={HOUSE.r - HOUSE.l} height="12" fill="#475569" />
            <rect x="904" y={HOUSE.roof} width="12" height={HOUSE.ground - HOUSE.roof} fill="#475569" />
            <rect x={HOUSE.l - 10} y={HOUSE.roof} width="14" height={HOUSE.ground - HOUSE.roof} fill="#475569" />
            <rect x={HOUSE.r - 4} y={HOUSE.roof} width="14" height={HOUSE.ground - HOUSE.roof} fill="#475569" />

            {/* house wiring: glows room by room as each appliance switches on */}
            <path d={`M ${HOUSE.l},330 L ${HOUSE.r - 20},330`} fill="none" stroke="#B45309" strokeWidth="4" />
            <path d={`M ${HOUSE.l + 20},330 L ${HOUSE.l + 20},630 L ${HOUSE.r - 20},630`} fill="none" stroke="#B45309" strokeWidth="4" />
            <path d={`M ${HOUSE.l},330 L 635,330`} fill="none" stroke="#7DD3FC" strokeWidth="4" strokeDasharray="10 12" strokeDashoffset={-frame * 3} opacity={fanOn} />
            <path d={`M ${HOUSE.l + 20},330 L ${HOUSE.l + 20},630 L 640,630`} fill="none" stroke="#7DD3FC" strokeWidth="4" strokeDasharray="10 12" strokeDashoffset={-frame * 3} opacity={ironOn} />
            <path d={`M 640,630 L 1210,630`} fill="none" stroke="#7DD3FC" strokeWidth="4" strokeDasharray="10 12" strokeDashoffset={-frame * 3} opacity={bellOn} />
            <path d={`M 1210,630 L ${HOUSE.r - 20},630 L ${HOUSE.r - 20},860 L 1560,860`} fill="none" stroke="#7DD3FC" strokeWidth="4" strokeDasharray="10 12" strokeDashoffset={-frame * 3} opacity={pumpOn} />

            {/* Roof tank + water pump outside */}
            <g>
              <rect x="1180" y="190" width="150" height="96" rx="14" fill="#1E293B" stroke="#475569" strokeWidth="3" />
              <rect x="1186" y={286 - 90 * tankLevel} width="138" height={90 * tankLevel} rx="10" fill="#0EA5E9" opacity="0.55" />
              <path d="M 1560,850 L 1600,850 L 1600,240 L 1330,240" fill="none" stroke="#64748B" strokeWidth="10" />
              {pumpOn > 0.1 &&
                Array.from({ length: 8 }).map((_, k) => {
                  const u = ((frame * 0.012 + k / 8) % 1) * 1;
                  const L1 = 610;
                  const L2 = 270;
                  const s = u * (L1 + L2);
                  const x = s < L1 ? 1600 : 1600 - (s - L1);
                  const y = s < L1 ? 850 - s : 240;
                  return <circle key={k} cx={x} cy={y} r="5" fill="#7DD3FC" opacity={pumpOn} />;
                })}
              <g transform={`translate(1560, 868) translate(${pumpOn > 0.5 ? Math.sin(frame * 2.2) * 1.5 : 0}, 0)`}>
                <rect x="-50" y="-26" width="80" height="50" rx="10" fill={pumpOn > 0.5 ? '#10B981' : '#064E3B'} />
                <circle cx="44" cy="0" r="18" fill="none" stroke={pumpOn > 0.5 ? '#10B981' : '#064E3B'} strokeWidth="7" />
              </g>
            </g>

            {/* one small name per appliance, pinned to it, as it is said */}
            <WorldTag local={local} at={1497} until={duration + 10} text="পাখা" x={635} y={345} color="#38BDF8" dx={0} dy={120} size={28} />
            <WorldTag local={local} at={1602} until={duration + 10} text="ইস্ত্রি" x={680} y={770} color="#F43F5E" dx={120} dy={-80} size={28} />
            <WorldTag local={local} at={1688} until={duration + 10} text="কলিং বেল" x={1210} y={700} color="#A855F7" dx={-120} dy={110} size={28} />
            <WorldTag local={local} at={1760} until={duration + 10} text="জলের পাম্প" x={1560} y={860} color="#10B981" dx={120} dy={-120} size={28} />
          </svg>
        </DepthLayer>
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={620} count={18} opacity={0.6} seed={41} />
        </DepthLayer>
      </MultiplaneCameraRig>
    </div>
  );
};

export const Ep01SwitchBulbScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const C = ACT3E_CUES;
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  const houseA = ci(local, [C.grid - 30, C.grid - 2], [0, 1], EASE_INOUT);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B1120', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      {houseA < 1 && (
        <div style={{ position: 'absolute', inset: 0, opacity: 1 - houseA }}>
          <SwitchBulbKit frame={frame} local={local} />
        </div>
      )}
      {houseA > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: houseA }}>
          <HouseWakesUp frame={frame} local={local} duration={duration} />
        </div>
      )}
      <KineticWord localMs={localMs} appearMs={17500} emphasizeStartMs={17700} emphasizeEndMs={19300} removeMs={19700} text="ঢুকল = বেরোল" x={960} y={150} accentColor="#10B981" mode="SCALE_GLOW" />
    </div>
  );
};
