import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig, type MultiplaneCamKey } from '../core/MultiplaneCameraRig';
import { BoyRig } from './BoyRig';
import { EASE_POP, NeutralAtomCloud } from './Ep01SharedGraphics';
import { crackleIntensity } from './Ep01WinterHookScene';
import {
  BedWithBlanket,
  BedroomFarWall,
  BedroomForeground,
  BedroomMidground,
  BED,
  BulbLightWash,
  CONDUIT_D,
  PHONE,
  WallCircuit,
  WorldTag,
} from './Ep01BedroomSet';
import { DustPuff, ScreenFlash, ShockRing, SparkBurst, pulseAt } from './Ep01Fx';

/**
 * ACT 4 cue sheet (act4_confusion.mp3, local frames @60fps, from VO pauses):
 *  0–130 "আজ আমরা দেখলাম বৈদ্যুতিক চার্জ," · 143–261 "স্থির তড়িৎ এবং তড়িৎ প্রবাহ।"
 *  296–389 "কিন্তু এতক্ষণ যা জানলেন," · 412–539 "… একটা খটকা লাগছে?"
 *  575–836 "যদি বাল্ব একটাও ইলেকট্রন খরচ না করে— সবটাই … ফিরে যায়—"
 *  859–1034 "তবে প্রতি মাসে … বিল আসে কেন?"     1072–1220 "ফোনের ব্যাটারিই বা শূন্য শতাংশে …?"
 *  1257–1374 "আর দেয়ালের তারে তো কেউ চিরুনি ঘষছে না—" · 1396–1540 "… ধাক্কাটা দিচ্ছে কে?"
 *  1567–1599 "চিন্তা নেই—" · 1620–1823 "পরের পর্বগুলোতে …" · 1858–1940 "দেখা হচ্ছে দ্বিতীয় পর্বে—" · 1964 "পরমাণু ও বৈদ্যুতিক চার্জ।"
 */
const A4 = { recap: [40, 150, 205], khotka: 412, p1: 575, bill: 859, p2: 1072, p3: 1257, push: 1396, calm: 1567, answer: 1620, teaser: 1858 };

const centreOn = (f: number, X: number, Y: number, z: number, extra: Partial<MultiplaneCamKey> = {}): MultiplaneCamKey => ({
  f,
  x: (X - 960) * z,
  y: (Y - 540) * z,
  z,
  ...extra,
});

const BILL_REST = { x: 770, y: 585 };
const PHONE_HERO = { x: 430, y: 500 };
const WIRE_SPOT = { x: 1465, y: 380 };

/** Episode where each paradox gets answered (see MASTER_CURRICULUM) — stamped onto the object. */
const EpisodeChip: React.FC<{ local: number; at: number; x: number; y: number; text: string; color: string }> = ({ local, at, x, y, text, color }) => {
  if (local < at) return null;
  const s = ci(local, [at, at + 18], [1.8, 1], EASE_POP);
  const a = ci(local, [at, at + 8], [0, 1]);
  return (
    <g transform={`translate(${x}, ${y}) rotate(-6) scale(${s.toFixed(3)})`} opacity={a}>
      <rect x="-74" y="-25" width="148" height="48" rx="24" fill={color} stroke="#0F172A" strokeWidth="3" />
      <text x="0" y="9" textAnchor="middle" fill="#0F172A" fontSize="26" fontWeight="800">{text}</text>
    </g>
  );
};

export const Ep01ConfusionOutroScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const roomOut = ci(local, [A4.teaser - 30, A4.teaser + 6], [1, 0], EASE_INOUT);
  const teaserIn = ci(local, [A4.teaser - 10, A4.teaser + 30], [0, 1], EASE_OUT);
  const breath = Math.sin(frame * 0.05) * 2;

  // recap, played out on the real objects
  const charges = ci(local, [A4.recap[0], A4.recap[0] + 40, 380, 420], [0, 1, 1, 0]);
  const crackle = crackleIntensity(local, [A4.recap[1], A4.recap[1] + 16, A4.recap[1] + 38]);
  const flowFlare = ci(local, [A4.recap[2], A4.recap[2] + 20, 330, 380], [0.6, 1, 1, 0.6]);

  // paradox 1: the bill drops onto the blanket
  const billT = ci(local, [A4.bill - 14, A4.bill + 26], [0, 1], EASE_OUT);
  const billY = BILL_REST.y - 700 * (1 - billT);
  const billSway = (1 - billT) * Math.sin(local * 0.25) * 14;
  // paradox 2: the phone rises from the nightstand, battery drains to 0
  const phoneT = ci(local, [A4.p2 - 10, A4.p2 + 30], [0, 1], EASE_OUT);
  const batteryPct = Math.round(ci(local, [A4.p2 + 30, A4.p2 + 140], [100, 0], EASE_INOUT));
  const phoneDead = local > A4.p2 + 150;
  // paradox 3: comb crossed out, a mystery "?" hand jabs at the wire
  const combA = ci(local, [A4.p3 + 10, A4.p3 + 30], [0, 1]);
  const combX = ci(local, [A4.p3 + 50, A4.p3 + 62], [0, 1]);
  const pushA = ci(local, [A4.push, A4.push + 14], [0, 1]);
  const jab = local >= A4.push ? Math.max(0, Math.sin((local - A4.push) * 0.18)) * 22 : 0;
  // each forward peak of the jab: sin((t)*0.18) = 1  →  t = 8.7 + k·34.9
  const JABS = [0, 1, 2, 3, 4].map((k) => Math.round(A4.push + 8.7 + k * 34.9));
  const CHIPS = [A4.answer + 10, A4.answer + 22, A4.answer + 34];
  const deathT = ci(local, [A4.p2 + 150, A4.p2 + 168], [0, 1]);
  const lowPulse = batteryPct < 20 && !phoneDead ? 0.5 + 0.5 * Math.sin(frame * 0.35) : 0;

  // boy's gaze follows each mystery
  const lookX = ci(local, [A4.khotka, A4.khotka + 30, A4.bill - 20, A4.bill + 20, A4.p2, A4.p2 + 30, A4.p3, A4.p3 + 30, A4.calm, A4.calm + 30], [0.3, -0.3, -0.3, 0.6, 0.6, -1, -1, 1, 1, 0]);
  const lookY = ci(local, [A4.khotka, A4.khotka + 30, A4.bill - 20, A4.bill + 20, A4.p2, A4.p2 + 30, A4.p3, A4.p3 + 30, A4.calm, A4.calm + 30], [0.4, -0.9, -0.9, 0.8, 0.8, 0.1, 0.1, -0.7, -0.7, 0.3]);
  const puzzled = local >= A4.bill && local < A4.calm;
  const thought = ci(local, [A4.khotka, A4.khotka + 24, 560, 590], [0, 1, 1, 0]);

  const keys: MultiplaneCamKey[] = [
    centreOn(0, 960, 500, 1.0, { rotateY: -1.0 }),
    centreOn(370, 900, 500, 1.06, { rotateY: 0 }),
    centreOn(A4.khotka + 50, 650, 430, 1.45, { rotateY: 0.8, stop: true }),
    // "যদি বাল্ব একটাও ইলেকট্রন খরচ না করে…"
    centreOn(A4.p1 + 40, 1330, 330, 1.3, { rotateY: -0.8 }),
    centreOn(830, 1310, 340, 1.34, { rotateY: -0.4, stop: true }),
    centreOn(A4.bill + 30, 720, 520, 1.3, { rotateY: 0.6, stop: true }),
    centreOn(A4.p2 + 30, 470, 520, 1.32, { rotateY: 1.0, stop: true }),
    centreOn(A4.p3 + 30, 1390, 390, 1.32, { rotateY: -1.0 }),
    centreOn(1530, 1400, 380, 1.4, { rotateY: -0.6, stop: true }),
    centreOn(A4.calm + 40, 960, 470, 1.0, { rotateY: 0, stop: true }),
    centreOn(A4.teaser, 960, 470, 1.06, { rotateY: 0.4 }),
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050811', opacity: fadeIn, overflow: 'hidden' }}>
      {roomOut > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: roomOut, background: 'radial-gradient(ellipse at 65% 28%, #3A2A14 0%, #090B10 78%)' }}>
          <MultiplaneCameraRig local={local} frame={frame} keys={keys} shakes={[{ f: A4.bill + 22, amp: 3, dur: 10 }]}>
            <DepthLayer plane="Z0">
              <BedroomFarWall frame={frame} />
            </DepthLayer>
            <DepthLayer plane="Z1">
              <BedroomMidground frame={frame} hidePhone={phoneT > 0} />
            </DepthLayer>
            <DepthLayer plane="Z2">
              <BoyRig
                pose={{
                  worldX: 350,
                  worldY: 165,
                  chestLeanDeg: puzzled ? 2 : 0,
                  breathY: breath,
                  headRollDeg: puzzled ? -6 : 3,
                  eyeLookX: lookX,
                  eyeLookY: lookY,
                  blinkAmount: frame % 165 > 158 ? 1 : 0,
                  expression: puzzled && (local < A4.bill + 90 || (local > A4.p2 + 140 && local < A4.p2 + 200)) ? 'surprised' : 'curious',
                  armLift: 0.55,
                }}
                scale={0.76}
              />
              <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
                <rect x="380" y="758" width="540" height="80" fill="#14100D" />
                <BedWithBlanket blanketLift={60} crackle={crackle} arcSeed={Math.floor(local / 2)} charges={charges} frame={frame} />
                <WallCircuit frame={frame} closed front={0} flow={local < A4.recap[2] ? 0.6 : flowFlare} bulbGlow={1} xray={local >= A4.p3 ? ci(local, [A4.p3, A4.p3 + 30], [0, 1]) : 0} />

                {/* recap: charges glint, the blanket crackles, the wall wire flares */}
                {[0, 16].map((d, i) => (
                  <SparkBurst key={d} local={local} at={A4.recap[0] + d} x={660 + i * 110} y={565} count={8} speed={4} gravity={0} life={26} color={i ? '#7DD3FC' : '#FDA4AF'} core="#FFFFFF" seed={i + 140} />
                ))}
                {[A4.recap[1], A4.recap[1] + 16, A4.recap[1] + 38].map((b, i) => (
                  <SparkBurst key={b} local={local} at={b} x={BED.x + 20 + i * 30} y={BED.y - 20} count={i ? 8 : 14} speed={i ? 6 : 9} gravity={0.12} life={26} color="#38BDF8" seed={i + 150} />
                ))}
                <path d={CONDUIT_D} fill="none" stroke="#FDE68A" strokeWidth="20" strokeLinejoin="round" opacity={pulseAt(local, [A4.recap[2]], 26, 0.45)} filter="blur(6px)" />

                {/* recap tags, pinned to the objects */}
                <WorldTag local={local} at={A4.recap[0]} until={380} text="বৈদ্যুতিক চার্জ" x={700} y={560} color="#F43F5E" dx={-60} dy={-170} size={28} />
                <WorldTag local={local} at={A4.recap[1]} until={380} text="স্থির তড়িৎ" x={830} y={600} color="#38BDF8" dx={170} dy={-60} size={28} />
                <WorldTag local={local} at={A4.recap[2]} until={380} text="তড়িৎ প্রবাহ" x={1465} y={330} color="#FBBF24" dx={150} dy={-40} size={28} />

                {/* khotka: a big question mark in the boy's head */}
                {thought > 0.01 && (
                  <g opacity={thought}>
                    <circle cx="665" cy="365" r="7" fill="#F8F1E3" />
                    <circle cx="695" cy="335" r="11" fill="#F8F1E3" />
                    <g transform={`translate(780, 260) scale(${ci(local, [A4.khotka, A4.khotka + 18], [0.6, 1], EASE_POP).toFixed(3)})`}>
                      <ellipse cx="0" cy="0" rx="90" ry="62" fill="#F8F1E3" stroke="#CBD5E1" strokeWidth="2.5" />
                      <text x="0" y="26" textAnchor="middle" fill="#F43F5E" fontSize="76" fontWeight="800">?</text>
                    </g>
                  </g>
                )}

                {/* the bulb hands every electron back — so what are we paying for? */}
                {local >= A4.p1 && local < A4.bill + 40 && (
                  <g opacity={ci(local, [A4.p1, A4.p1 + 20, A4.bill + 10, A4.bill + 40], [0, 1, 1, 0])}>
                    <path d="M 1214,262 A 74,74 0 1,1 1346,262" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="8 8" strokeDashoffset={-frame * 1.5} />
                    <path d="M 1336,250 l 12,14 l 6,-18" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                  </g>
                )}

                {/* Paradox 1 — the electricity bill drops onto the blanket */}
                {billT > 0 && (
                  <g transform={`translate(${(BILL_REST.x + billSway).toFixed(1)}, ${billY.toFixed(1)}) rotate(${(-8 + billSway * 0.6).toFixed(1)})`}>
                    <rect x="-80" y="-104" width="160" height="208" rx="4" fill="#F8F5EC" stroke="#CBD5E1" strokeWidth="2" />
                    <rect x="-80" y="-104" width="160" height="34" fill="#0369A1" />
                    <text x="0" y="-80" textAnchor="middle" fill="#F8FAFC" fontSize="20" fontWeight="800">বিদ্যুৎ বিল</text>
                    {[-52, -36, -20].map((y) => (
                      <rect key={y} x="-62" y={y} width={y === -36 ? 80 : 110} height="6" rx="3" fill="#CBD5E1" />
                    ))}
                    <text x="0" y="18" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="700">432 kWh</text>
                    <text x="0" y="66" textAnchor="middle" fill="#B91C1C" fontSize="38" fontWeight="800">₹ 1,240</text>
                  </g>
                )}

                <DustPuff local={local} at={A4.bill + 22} x={BILL_REST.x} y={BILL_REST.y + 100} width={190} color="#E2E8F0" life={36} />

                {/* Paradox 2 — the phone lifts off the nightstand and dies */}
                {phoneT > 0 && (
                  <g
                    transform={`translate(${(PHONE.x + (PHONE_HERO.x - PHONE.x) * phoneT).toFixed(1)}, ${(PHONE.y + (PHONE_HERO.y - PHONE.y) * phoneT).toFixed(1)}) rotate(${(90 * (1 - phoneT) - 6 * phoneT).toFixed(1)}) scale(${(0.4 + 0.6 * phoneT).toFixed(3)})`}
                  >
                    {lowPulse > 0 && <rect x="-80" y="-136" width="160" height="272" rx="28" fill="none" stroke="#F43F5E" strokeWidth="10" opacity={lowPulse * 0.6} filter="blur(4px)" />}
                    <rect x="-62" y="-118" width="124" height="236" rx="18" fill="#0F172A" stroke={lowPulse > 0 ? '#F43F5E' : '#38BDF8'} strokeWidth="3" />
                    <rect x="-54" y="-104" width="108" height="208" rx="10" fill={phoneDead ? '#020617' : '#0B1324'} />
                    {/* screen dies like an old CRT: collapses to a line, then a dot */}
                    {deathT > 0 && deathT < 1 && (
                      <rect
                        x={-54 * (deathT < 0.5 ? 1 : 2 * (1 - deathT))}
                        y={-Math.max(2, 104 * (1 - deathT * 2.2))}
                        width={108 * (deathT < 0.5 ? 1 : 2 * (1 - deathT))}
                        height={Math.max(4, 208 * (1 - deathT * 2.2))}
                        fill="#F8FAFC"
                        opacity={0.9}
                        filter="drop-shadow(0 0 8px #E0F2FE)"
                      />
                    )}
                    {!phoneDead && (
                      <g>
                        <rect x="-14" y="-52" width="28" height="8" rx="3" fill="#64748B" />
                        <rect x="-32" y="-44" width="64" height="104" rx="8" fill="none" stroke={batteryPct < 20 ? '#F43F5E' : '#10B981'} strokeWidth="4" />
                        <rect x="-26" y={54 - (batteryPct / 100) * 92} width="52" height={(batteryPct / 100) * 92} rx="5" fill={batteryPct < 20 ? '#F43F5E' : '#10B981'} opacity="0.5" />
                        <text x="0" y="16" textAnchor="middle" fill={batteryPct < 20 ? '#FDA4AF' : '#F8FAFC'} fontSize="30" fontWeight="800">{batteryPct}%</text>
                      </g>
                    )}
                  </g>
                )}

                {/* Paradox 3 — nobody is rubbing a comb on the wall wire… so who pushes? */}
                {local >= A4.p3 && (
                  <g>
                    <g transform="translate(1610, 300) rotate(-12)" opacity={combA}>
                      <rect x="-60" y="-14" width="120" height="16" rx="5" fill="#0284C7" />
                      {Array.from({ length: 8 }).map((_, k) => (
                        <rect key={k} x={-56 + k * 15} y="0" width="7" height="24" rx="2" fill="#0284C7" />
                      ))}
                      <line x1="-74" y1="-28" x2="74" y2="34" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" strokeDasharray="170" strokeDashoffset={170 * (1 - combX)} />
                      {[0, 4, 8, 12].map((d, i) => (
                        <SparkBurst key={d} local={local} at={A4.p3 + 50 + d} x={-74 + 148 * (i / 3)} y={-28 + 62 * (i / 3)} count={6} speed={4} gravity={0.2} life={18} color="#F43F5E" core="#FFE4E6" seed={i + 160} />
                      ))}
                    </g>
                    <g transform={`translate(${(WIRE_SPOT.x - 100 + jab).toFixed(1)}, ${WIRE_SPOT.y})`} opacity={pushA}>
                      <path d="M -50,-16 L 4,-16 L 4,-30 L 40,0 L 4,30 L 4,16 L -50,16 Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="3" />
                      <text x="-20" y="11" textAnchor="middle" fill="#0F172A" fontSize="30" fontWeight="800">?</text>
                    </g>
                  </g>
                )}

                {JABS.map((j, k) => (
                  <ShockRing key={j} local={local} at={j} x={WIRE_SPOT.x - 36} y={WIRE_SPOT.y} r={70 - k * 6} color="#FBBF24" life={20} width={3} />
                ))}
                {/* each episode chip lands like a rubber stamp */}
                <ShockRing local={local} at={CHIPS[0]} x={BILL_REST.x + 10} y={BILL_REST.y - 140} r={110} color="#FDA4AF" life={24} />
                <ShockRing local={local} at={CHIPS[1]} x={PHONE_HERO.x - 10} y={PHONE_HERO.y - 160} r={110} color="#BAE6FD" life={24} />
                <ShockRing local={local} at={CHIPS[2]} x={WIRE_SPOT.x + 120} y={WIRE_SPOT.y - 170} r={110} color="#FDE68A" life={24} />

                <EpisodeChip local={local} at={A4.answer + 10} x={BILL_REST.x + 10} y={BILL_REST.y - 140} text="পর্ব 16" color="#FDA4AF" />
                <EpisodeChip local={local} at={A4.answer + 22} x={PHONE_HERO.x - 10} y={PHONE_HERO.y - 160} text="পর্ব 10" color="#BAE6FD" />
                <EpisodeChip local={local} at={A4.answer + 34} x={WIRE_SPOT.x + 120} y={WIRE_SPOT.y - 170} text="পর্ব 05" color="#FDE68A" />
              </svg>
            </DepthLayer>
            <DepthLayer plane="Z3">
              <BedroomForeground />
            </DepthLayer>
            <DepthLayer plane="Z4">
              <DustMotes frame={frame} cx={960} cy={520} radius={620} count={24} opacity={0.75} seed={40} />
            </DepthLayer>
          </MultiplaneCameraRig>
          <BulbLightWash amount={0.75} />
          <ScreenFlash amount={pulseAt(local, [A4.p2 + 150], 5, 0.25)} color="224, 242, 254" at={[30, 50]} />
        </div>
      )}

      {/* Episode 02 end card */}
      {teaserIn > 0.01 && (
        <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }} opacity={teaserIn}>
          <defs>
            <radialGradient id="teaserBloom">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="960" cy="440" r={360 + 50 * Math.sin(frame * 0.06)} fill="url(#teaserBloom)" opacity={ci(local, [A4.teaser, A4.teaser + 40], [0, 1]) * (0.75 + pulseAt(local, [1964], 14, 0.6))} />
          <g transform={`translate(960, 440) scale(${(0.7 + 0.3 * teaserIn + (local - A4.teaser) * 0.0006).toFixed(4)}) translate(-960, -440)`}>
            <NeutralAtomCloud frame={frame} cx={960} cy={440} radius={210} cloudStrength={1} nucleusGlow={0.6} dots={130} />
          </g>
          <text x="960" y="740" textAnchor="middle" fill="#94A3B8" fontSize="30" fontWeight="700" opacity={ci(local, [1900, 1925], [0, 1])}>
            পরবর্তী পর্ব 02
          </text>
          <text x="960" y="810" textAnchor="middle" fill="#FDE68A" fontSize="56" fontWeight="800" opacity={ci(local, [1964, 1990], [0, 1])}>
            পরমাণু ও বৈদ্যুতিক চার্জ
          </text>
          <ShockRing local={local} at={1964} x={960} y={440} r={300} color="#FDE68A" life={44} />
          <SparkBurst local={local} at={1964} x={960} y={440} count={26} speed={14} gravity={0.04} life={44} color="#FDE68A" core="#FFFBEB" seed={170} />
        </svg>
      )}

      <ScreenFlash amount={pulseAt(local, [1964], 10, 0.35)} color="253, 230, 138" at={[50, 45]} />
      <KineticWord localMs={localMs} appearMs={27000} emphasizeStartMs={27300} emphasizeEndMs={30200} removeMs={30700} text="পরের পর্বগুলোতে উত্তর!" x={960} y={960} accentColor="#38BDF8" mode="SCALE_GLOW" />
    </div>
  );
};
