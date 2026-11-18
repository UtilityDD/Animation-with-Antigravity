import React from 'react';
import { AmberGem, DustMotes, EASE_IN, EASE_INOUT, EASE_OUT, Feather, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig, type MultiplaneCamKey } from '../core/MultiplaneCameraRig';
import { GlobeDiveShot } from '../historical/scene1/GlobeDiveShot';
import { ThalesRig, getThalesExpressionParams, thalesAmberScreen, type ThalesPose } from '../historical/ThalesRig';
import { DustPuff, LampFlame, ScreenFlash, ShockRing, SparkBurst, StaticArcs, flameFlicker, pulseAt } from './Ep01Fx';
import { WorldTag, jaggedArc } from './Ep01BedroomSet';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import {
  FaradayInductionSVG,
  FranklinKiteSVG,
  GilbertVersoriumSVG,
  LeydenJarSVG,
  OerstedCompassSVG,
  ThomsonCathodeSVG,
  VoltaicPileSVG,
} from '../historical/scene2/Scene2Apparatus';

/**
 * ACT 2A: GlobeDiveShot -> Miletus oil-lamp chamber. Thales rubs amber faster and faster, stops,
 * stretches his arm out over the feathers lying on the table — CUT to a table-level macro where
 * the feathers quiver and snap up — CUT back wide: the last feathers leap, Thales recoils, the wool
 * falls, feathers dangle from the amber in his outstretched hand.
 *
 * VO (act2a_miletus.mp3, local frames @60fps):
 *  0–197 "এই প্রশ্নের শুরু … আড়াই হাজার বছর আগে..." · 234–285 "প্রাচীন গ্রিসে।" · 322–367 "মানুষ দেখল,"
 *  392–580 "অ্যাম্বার নামে … পশমে ঘষলে..." · 615–773 "না ছুঁয়েই ছোট্ট পালক নিজের দিকে টেনে নিচ্ছে!"
 *  812–1208 "খ্রিস্টপূর্ব প্রায় ছশো অব্দে দার্শনিক থেলিস অব মিলেটাসের নামের সাথে … জড়িয়ে আছে।"
 *  1242–1338 "তখন কেউ জানত না এর কারণ কী..." · 1367–1522 "এটা ছিল কেবল স্থির তড়িতের প্রথম ঝলক।"
 * Keep MILETUS_CUES in sync with scripts/synthesize_ep01v2_sound.py.
 */
export const MILETUS_CUES = {
  reveal: 270,
  rubFast: 420,
  rubStop: 590,
  reachEnd: 662,
  quiver: 640,
  macroIn: 664,
  macroOut: 775,
  /** feather i snaps off the table (0,1 inside the macro; 2,3 in the wide shot) */
  launch: [712, 740, 786, 804],
  fly: 20,
  woolDrop: 795,
  /** Thales is named: the title card lands */
  thales: 812,
  settle: 950,
  /** "তখন কেউ জানত না এর কারণ কী..." — he studies the amber */
  ponder: 1242,
  /** "… স্থির তড়িতের প্রথম ঝলক।" — the amber flashes */
  glimpse: 1400,
};

const THALES = { worldX: 380, worldY: 21, scale: 0.9 };
const TABLE_Y = 770;
/** feathers lie on the table under the outstretched amber (reach = 1, see ThalesRig.thalesReachArm) */
const FEATHER_REST = [
  { dx: -330, rot: 84, len: 132 },
  { dx: -185, rot: 95, len: 146 },
  { dx: -40, rot: 87, len: 140 },
  { dx: 110, rot: 93, len: 126 },
];
/** clinging offsets from the amber centre and hanging angle (180 = tip straight down) */
const CLING = [
  { x: -26, y: 22, rot: 208 },
  { x: -8, y: 30, rot: 184 },
  { x: 12, y: 30, rot: 160 },
  { x: 28, y: 16, rot: 134 },
];

const centreOnM = (f: number, X: number, Y: number, z: number, extra: Partial<MultiplaneCamKey> = {}): MultiplaneCamKey => ({
  f,
  x: (X - 960) * z,
  y: (Y - 540) * z,
  z,
  ...extra,
});

function rubProgressAt(local: number) {
  const C = MILETUS_CUES;
  const l = Math.min(local, C.rubStop);
  const slow = 0.03;
  const fast = 0.058;
  const ramp = 120;
  if (l < C.rubFast) return (slow * l) % 1;
  if (l < C.rubFast + ramp) {
    const u = l - C.rubFast;
    return (slow * l + ((fast - slow) * u * u) / (2 * ramp)) % 1;
  }
  return (slow * (C.rubFast + ramp) + ((fast - slow) * ramp) / 2 + fast * (l - C.rubFast - ramp)) % 1;
}

function thalesPoseAt(frame: number, local: number): ThalesPose {
  const C = MILETUS_CUES;
  const reach = ci(local, [C.rubStop, C.reachEnd], [0, 1], EASE_INOUT) - ci(local, [C.settle, C.settle + 170], [0, 0.16], EASE_INOUT);
  const amaze = ci(local, [C.macroOut, C.macroOut + 34], [0, 1], EASE_OUT);
  const rubbing = local < C.rubStop;
  const rubIntensity = ci(local, [C.rubFast, C.rubFast + 120], [0, 1]);
  const pondering = local >= C.ponder;
  const base = getThalesExpressionParams(pondering ? 'contemplative' : amaze > 0.05 ? 'astonished' : local > C.rubStop - 60 ? 'curious' : 'focused');
  const tension = ci(local, [C.quiver, C.macroOut], [0, 1]);
  const k = !pondering && amaze > 0.05 ? amaze : 1;
  // the recoil relaxes as he starts to study the amber
  const recoil = amaze * (1 - ci(local, [C.ponder, C.ponder + 60], [0, 0.75], EASE_INOUT));
  return {
    worldX: THALES.worldX,
    worldY: THALES.worldY,
    // leans into the rubbing, then out over the feathers, then recoils in astonishment
    chestLeanDeg:
      (rubbing ? 2 + rubIntensity * 2 + Math.sin(local * 0.37) * rubIntensity : 0) + ci(local, [C.rubStop, C.reachEnd], [0, 5]) - recoil * 11,
    torsoYaw: 0,
    breathY: Math.sin(frame * 0.05) * 2 * (1 - tension * 0.7) + Math.sin(frame * 0.21) * 1.5 * amaze,
    shoulderElevateY: -8 * recoil,
    neckPitchDeg: 6 - recoil * 8,
    headRollDeg: (rubbing ? 4 : 7) - recoil * 9 + (pondering ? 5 : 0) + Math.sin(frame * 0.04) * 1.2,
    headPitch: 0,
    eyeLookX: rubbing ? 0.45 : amaze > 0.3 ? 0.85 : 0.95,
    eyeLookY: rubbing ? 0.6 : amaze > 0.3 ? 0.35 : 0.85,
    blinkAmount: local > C.quiver && local < C.settle ? 0 : frame % 150 > 144 ? 1 : 0,
    eyeWiden: base.eyeWiden * k + tension * 0.35 * (1 - amaze),
    browFurrow: base.browFurrow,
    browLift: base.browLift * k + tension * 3,
    mouthOpen: base.mouthOpen * k,
    mouthState: base.mouthState,
    rubProgress: rubProgressAt(local),
    reach: Math.max(0, reach),
    handTremble: Math.sin(frame * 1.3) * (1.6 * tension * (1 - amaze) + 0.8 * amaze),
    leftArmState: local >= C.woolDrop ? 'raisedWonder' : 'holdingWool',
    rightArmState: 'reachingAmber',
    amberGlow: 0.2 + ci(local, [C.rubFast, C.rubStop, C.reachEnd], [0, 0.45, 0.9]) + pulseAt(local, [C.glimpse], 14, 0.9),
    beardSwayDeg: Math.sin(frame * 0.07) * 2 - amaze * 3,
    amazeBlend: amaze,
  };
}

const AMBER_REST = thalesAmberScreen({ ...thalesPoseAt(0, MILETUS_CUES.reachEnd), breathY: 0 }, THALES.scale);
const featherRestPos = (i: number) => ({ x: AMBER_REST.x + FEATHER_REST[i].dx, y: TABLE_Y - 8 });

/** Feather i in wide-shot screen space. */
function featherState(i: number, frame: number, local: number, amber: { x: number; y: number }) {
  const C = MILETUS_CUES;
  const rest = featherRestPos(i);
  const fr = FEATHER_REST[i];
  const cling = CLING[i];
  const launch = C.launch[i];
  const side = fr.rot > 0 ? 1 : -1;
  const q = ci(local, [C.quiver, launch], [0, 1]);
  if (local < launch) {
    const hop = q > 0.05 ? Math.abs(Math.sin(frame * (0.9 + i * 0.13))) * q * q * 7 : 0;
    // the tip lifts towards the amber before the whole feather goes
    return { x: rest.x, y: rest.y - hop, rot: fr.rot - side * 26 * q * q + Math.sin(frame * 0.05 + i) * 1.5, flutter: 0.1 + q * 0.9, len: fr.len };
  }
  const t = ci(local, [launch, launch + C.fly], [0, 1], EASE_OUT);
  const tx = amber.x + cling.x;
  const ty = amber.y + cling.y;
  const after = local - launch - C.fly;
  const sway = Math.sin(frame * 0.09 + i * 1.7) * 9 * ci(after, [0, 20], [0, 1]);
  const settle = after > 0 ? Math.exp(-after / 9) * Math.sin(after * 0.7) * 14 : 0;
  return {
    x: rest.x + (tx - rest.x) * t,
    y: rest.y + (ty - rest.y) * t - Math.sin(t * Math.PI) * 30,
    rot: fr.rot + (cling.rot + (fr.rot < 0 ? -360 : 0) - fr.rot) * t + sway + settle,
    flutter: 0.25 + (1 - t) * 0.6,
    len: fr.len,
  };
}

const WoolCloth: React.FC = () => (
  <path d="M -45,-15 C -20,-35 45,-30 65,-10 C 80,15 70,50 45,65 C 20,75 -35,70 -50,45 C -65,25 -60,5 -45,-15 Z" fill="#92400E" stroke="#451A03" strokeWidth="2" />
);

/** Table-level macro: feathers huge in the lamplight, the charged amber descends into frame. */
const AmberMacroShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const C = MILETUS_CUES;
  const t = local - C.macroIn;
  const flick = flameFlicker(frame, 1.3);
  const amberY = ci(local, [C.macroIn, C.launch[0] - 6, C.macroOut], [210, 300, 280], EASE_OUT);
  const amber = { x: 960, y: amberY };
  const push = 1 + t * 0.0009;
  const contacts = [C.launch[0] + C.fly, C.launch[1] + C.fly];
  const shake = pulseAt(local, contacts, 5, 7);
  const sx = Math.sin(local * 2.1) * shake;
  const sy = Math.cos(local * 2.7) * shake;
  const field = ci(local, [C.macroIn, C.macroIn + 40], [0.15, 1]);
  const BIG = [
    { x: 560, rot: 80, len: 330 },
    { x: 1250, rot: -98, len: 360 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, #2A1A0C 0%, #0B0704 80%)', overflow: 'hidden' }}>
      {/* out-of-focus lamp + wall */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, filter: 'blur(14px)' }}>
        <circle cx="1560" cy="380" r={160 * flick} fill="rgba(251, 191, 36, 0.35)" />
        <circle cx="1560" cy="380" r={70 * flick} fill="rgba(254, 243, 199, 0.55)" />
        <circle cx="380" cy="300" r="90" fill="rgba(96, 165, 250, 0.10)" />
        <rect x="120" y="0" width="200" height="760" fill="#120C07" />
      </svg>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <linearGradient id="macroTable" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B3A1E" />
            <stop offset="100%" stopColor="#1C1009" />
          </linearGradient>
          <radialGradient id="macroPool" cx="62%" cy="10%" r="70%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform={`translate(${960 + sx}, ${540 + sy}) scale(${push.toFixed(4)}) translate(-960, -540)`}>
          {/* table top in perspective, lit from the lamp on the right */}
          <rect x="-200" y="700" width="2320" height="600" fill="url(#macroTable)" />
          <rect x="-200" y="700" width="2320" height="600" fill="url(#macroPool)" opacity={flick} />
          {Array.from({ length: 11 }).map((_, k) => (
            <line key={k} x1={960 + (k - 5) * 120} y1="700" x2={960 + (k - 5) * 520} y2="1100" stroke="#2B1A0E" strokeWidth="3" opacity="0.6" />
          ))}
          <line x1="-200" y1="702" x2="2120" y2="702" stroke="#8B5E34" strokeWidth="4" opacity="0.7" />

          {/* field lines reaching down from the amber to the feather tips */}
          {BIG.map((b, i) => {
            if (local >= C.launch[i]) return null;
            const tipX = b.x + (b.rot > 0 ? 1 : -1) * b.len * 0.9;
            const d = `M ${amber.x},${amber.y + 60} Q ${(amber.x + tipX) / 2},${amber.y + 260} ${tipX},748`;
            return <path key={i} d={d} fill="none" stroke="#93C5FD" strokeWidth="3" strokeDasharray="6 14" strokeDashoffset={-frame * 3} opacity={0.5 * field} />;
          })}

          {/* the two feathers that go first */}
          {BIG.map((b, i) => {
            const launch = C.launch[i];
            const q = ci(local, [C.macroIn, launch], [0, 1]);
            const side = b.rot > 0 ? 1 : -1;
            if (local < launch) {
              const hop = Math.abs(Math.sin(frame * (0.85 + i * 0.2))) * q * q * 16;
              return (
                <g key={i} transform={`translate(${b.x}, ${(752 - hop).toFixed(1)}) rotate(${(b.rot - side * 24 * q * q + Math.sin(frame * 0.6 + i) * 2 * q).toFixed(2)})`}>
                  <Feather length={b.len} frame={frame} flutter={0.15 + q * 1.1} />
                </g>
              );
            }
            const u = ci(local, [launch, launch + C.fly], [0, 1], EASE_OUT);
            const cl = CLING[i];
            const x = b.x + (amber.x + cl.x * 2.4 - b.x) * u;
            const y = 752 + (amber.y + cl.y * 2.4 + 20 - 752) * u - Math.sin(u * Math.PI) * 60;
            const rot = b.rot + (cl.rot + (b.rot < 0 ? -360 : 0) - b.rot) * u + Math.sin(frame * 0.1 + i) * 6 * u;
            return (
              <g key={i} transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${rot.toFixed(2)})`}>
                <Feather length={b.len * (1 - u * 0.15)} frame={frame} flutter={0.6 * (1 - u) + 0.2} />
              </g>
            );
          })}

          {/* Thales' hand comes down from the top of frame gripping the amber */}
          <g transform={`translate(${amber.x}, ${amber.y})`}>
            <AmberGem id="macroAmber" size={190} glow={0.75 + 0.2 * flick} charge={0.6 + 0.4 * field} />
            <path d="M -330,-420 C -230,-280 -140,-160 -70,-96 L 4,-150 C -60,-220 -150,-330 -230,-460 Z" fill="#E4B596" />
            <ellipse cx="-30" cy="-108" rx="76" ry="48" fill="#ECC4A8" transform="rotate(-24 -30 -108)" />
            {[-62, -22, 18, 52].map((fx, k) => (
              <path key={fx} d={`M ${fx},-112 q ${10 + k * 4},38 ${6 - k * 4},${70 - Math.abs(k - 1.5) * 8}`} fill="none" stroke="#E4B596" strokeWidth="24" strokeLinecap="round" />
            ))}
            <StaticArcs frame={frame} x={0} y={10} radius={92} amount={field * 0.9} count={5} seed={7} />
          </g>

          {contacts.map((c, i) => (
            <g key={c}>
              <ShockRing local={local} at={c} x={amber.x + CLING[i].x * 2.4} y={amber.y + 70} r={170} />
              <SparkBurst local={local} at={c} x={amber.x + CLING[i].x * 2.4} y={amber.y + 70} count={18} speed={12} color="#FDE047" core="#FFFBEB" seed={i + 4} size={1.6} />
            </g>
          ))}
        </g>
      </svg>
      <ScreenFlash amount={pulseAt(local, contacts, 6, 0.6)} color="253, 230, 138" at={[50, 30]} />
    </div>
  );
};

export const Ep01MiletusScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const C = MILETUS_CUES;
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);

  const showGlobe = local < C.reveal + 50;
  const globeAlpha = ci(local, [0, 18, C.reveal + 5, C.reveal + 48], [0, 1, 1, 0], EASE_INOUT);
  const roomReveal = ci(local, [C.reveal, C.reveal + 50], [0, 1], EASE_OUT);
  const inMacro = local >= C.macroIn && local < C.macroOut;

  const pose = thalesPoseAt(frame, local);
  const amber = thalesAmberScreen(pose, THALES.scale);
  const flick = flameFlicker(frame);
  const charge = ci(local, [400, C.rubStop, C.reachEnd], [0, 0.6, 1]);
  const wideContacts = C.launch.slice(2).map((l) => l + C.fly);
  const woolT = ci(local, [C.woolDrop, C.woolDrop + 22], [0, 1], EASE_IN);

  const keys: MultiplaneCamKey[] = [
    centreOnM(C.reveal, 860, 520, 1.0, { rotateY: 1.5 }),
    centreOnM(C.rubFast, 800, 470, 1.18, { rotateY: 0.4 }),
    centreOnM(C.rubStop, 820, 480, 1.32, { rotateY: 0, stop: true }),
    // low, slow push along the table as the arm stretches over the feathers
    centreOnM(C.macroIn, 930, 620, 1.55, { rotateY: -1.2 }),
    centreOnM(C.macroOut, 880, 540, 1.16, { rotateY: 0.6, stop: true }),
    centreOnM(C.settle, 860, 480, 1.3, { rotateY: 0 }),
    // close on the amber for the 'first glimpse'
    centreOnM(C.glimpse, 930, 460, 1.5, { rotateY: -0.4, stop: true }),
    centreOnM(duration, 860, 450, 1.42, { rotateY: -0.6 }),
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: roomReveal }}>
        <MultiplaneCameraRig
          local={local}
          frame={frame}
          keys={keys}
          shakes={[...wideContacts.map((f) => ({ f, amp: 4, dur: 12 })), { f: C.woolDrop + 22, amp: 2, dur: 8 }]}
        >
          <DepthLayer plane="Z0">
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
              <rect x="0" y="0" width="1920" height="1080" fill="#1A120B" />
              {/* arched window onto the Miletus night harbour */}
              <path d="M 120,760 L 120,330 A 170,170 0 0,1 460,330 L 460,760 Z" fill="#0E1A30" />
              <circle cx="360" cy="300" r="34" fill="#E0F2FE" opacity="0.55" />
              <path d="M 120,640 Q 290,620 460,646 L 460,760 L 120,760 Z" fill="#0B2540" />
              <rect x="1420" y="120" width="96" height="660" fill="#241A12" />
              <rect x="1404" y="110" width="128" height="26" fill="#2E2117" />
              {/* lamplight on the back wall + Thales' shadow thrown by the flame */}
              <circle cx="1500" cy="600" r={560 * flick} fill="rgba(245, 158, 11, 0.13)" />
              <ellipse cx={560 - (flick - 0.9) * 120} cy="420" rx={210 * (2 - flick)} ry="300" fill="rgba(0,0,0,0.32)" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z1">
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
              <ellipse cx="240" cy="700" rx="64" ry="104" fill="#7C2D12" />
              <rect x="200" y="590" width="80" height="14" rx="7" fill="#9A3412" />
              <ellipse cx="1760" cy="700" rx="92" ry="40" fill="#57534E" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z2">
            <ThalesRig pose={pose} scale={THALES.scale} />
            <svg width="1920" height="1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
              <defs>
                <radialGradient id="milTablePool" cx="68%" cy="0%" r="70%">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="milLampLight" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect x="-100" y={TABLE_Y} width="2120" height="400" fill="#2A1A0E" stroke="#6B4423" strokeWidth="4" />
              <rect x="-100" y={TABLE_Y} width="2120" height="400" fill="url(#milTablePool)" opacity={flick} />
              <line x1="-100" y1={TABLE_Y + 34} x2="2020" y2={TABLE_Y + 34} stroke="#3B2513" strokeWidth="3" />

              {/* clay oil lamp on the table */}
              <g transform={`translate(1500, ${TABLE_Y})`}>
                <ellipse cx="0" cy="-14" rx="62" ry="22" fill="#9A3412" />
                <ellipse cx="0" cy="-22" rx="44" ry="11" fill="#7C2D12" />
                <path d="M 50,-24 Q 82,-30 86,-20 Q 80,-12 54,-12 Z" fill="#9A3412" />
                <path d="M -60,-18 Q -86,-34 -72,-46" fill="none" stroke="#9A3412" strokeWidth="9" strokeLinecap="round" />
              </g>
              <LampFlame frame={frame} x={1582} y={TABLE_Y - 24} scale={1.25} />
              <ellipse cx="1250" cy={TABLE_Y - 60} rx={620 * flick} ry={300 * flick} fill="url(#milLampLight)" />

              {/* charge halo + crackle around the amber, growing with every stroke of the wool */}
              {charge > 0.02 && <circle cx={amber.x} cy={amber.y} r={40 + charge * 46} fill="rgba(251, 191, 36, 0.14)" opacity={charge} />}
              <StaticArcs frame={frame} x={amber.x} y={amber.y} radius={30} amount={charge * (local < C.rubStop ? 0.8 : 1)} count={4} />
              {/* the invisible pull made visible: faint field lines to the feathers while they quiver */}
              {local > C.quiver &&
                FEATHER_REST.map((_, i) => {
                  if (local >= C.launch[i]) return null;
                  const rp = featherRestPos(i);
                  return (
                    <path
                      key={i}
                      d={`M ${amber.x},${amber.y + 20} Q ${(amber.x + rp.x) / 2},${(amber.y + rp.y) / 2 + 30} ${rp.x},${rp.y}`}
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="2"
                      strokeDasharray="4 10"
                      strokeDashoffset={-frame * 2}
                      opacity={0.45 * ci(local, [C.quiver, C.quiver + 30], [0, 1])}
                    />
                  );
                })}

              {FEATHER_REST.map((_, i) => {
                const s = featherState(i, frame, local, amber);
                return (
                  <g key={i} transform={`translate(${s.x.toFixed(1)}, ${s.y.toFixed(1)}) rotate(${s.rot.toFixed(2)})`}>
                    <Feather length={s.len} frame={frame} flutter={s.flutter} />
                  </g>
                );
              })}

              {/* the wool slips out of his left hand as he throws it up in wonder */}
              {local >= C.woolDrop && (
                <g transform={`translate(${290 + woolT * 50}, ${600 + woolT * (TABLE_Y - 618)}) rotate(${woolT * 8}) scale(${(0.9 + woolT * 0.35).toFixed(3)}, ${(0.9 - woolT * 0.62).toFixed(3)})`}>
                  <WoolCloth />
                </g>
              )}
              <DustPuff local={local} at={C.woolDrop + 22} x={330} y={TABLE_Y} width={130} color="#78716C" />

              <ShockRing local={local} at={C.glimpse} x={amber.x} y={amber.y} r={150} color="#93C5FD" life={40} />
              <SparkBurst local={local} at={C.glimpse} x={amber.x} y={amber.y} count={20} speed={11} color="#93C5FD" core="#F0F9FF" seed={31} gravity={0.05} />
              <StaticArcs frame={frame} x={amber.x} y={amber.y} radius={34} amount={pulseAt(local, [C.glimpse], 30, 1)} count={6} seed={13} />
              <WorldTag local={local} at={C.glimpse + 6} until={duration + 10} text="স্থির তড়িৎ" x={amber.x + 20} y={amber.y - 30} color="#93C5FD" dx={110} dy={-110} size={30} />
              {wideContacts.map((c, i) => (
                <g key={c}>
                  <ShockRing local={local} at={c} x={amber.x} y={amber.y + 20} r={110} />
                  <SparkBurst local={local} at={c} x={amber.x + CLING[i + 2].x} y={amber.y + 26} count={14} color="#FDE047" core="#FFFBEB" seed={i + 9} />
                </g>
              ))}
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z3">
            <svg width="1920" height="1080">
              <ellipse cx="140" cy="1040" rx="160" ry="220" fill="#090705" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z4">
            <DustMotes frame={frame} cx={1300} cy={560} radius={580} count={26} opacity={0.8} seed={21} />
          </DepthLayer>
        </MultiplaneCameraRig>
        <ScreenFlash amount={pulseAt(local, wideContacts, 6, 0.4) + pulseAt(local, [C.glimpse], 10, 0.45)} color="253, 230, 138" at={[50, 50]} />
      </div>

      {inMacro && <AmberMacroShot frame={frame} local={local} />}

      {showGlobe && (
        <div style={{ position: 'absolute', inset: 0, opacity: globeAlpha, pointerEvents: 'none' }}>
          <GlobeDiveShot frame={local + 170} />
        </div>
      )}

      <VidyuterKineticTitle frame={local} startFrame={C.thales} endFrame={C.ponder - 10} lines={[{ text: 'মিলেটাস • খ্রি.পূ. ~600', highlight: '~600', sizePx: 64 }]} x={90} y={100} accentColor="#F59E0B" variant="slide" />
      <KineticWord localMs={localMs} appearMs={6600} emphasizeStartMs={6800} emphasizeEndMs={9400} removeMs={9900} text="অ্যাম্বার" x={1180} y={380} accentColor="#F59E0B" />
    </div>
  );
};

const TIMELINE_ITEMS = [
  { x: 320, label: 'খ্রি.পূ. ~600 · থেলিস', color: '#F59E0B' },
  { x: 860, label: '1600 · গিলবার্ট', color: '#A855F7' },
  { x: 1320, label: '1745–46 · লেইডেন জার', color: '#38BDF8' },
  { x: 1780, label: '1752 · ফ্র্যাঙ্কলিন', color: '#FBBF24' },
  { x: 2240, label: '1800 · ভোল্টা', color: '#D9822B' },
  { x: 2700, label: '1820 · ওরস্টেড-অ্যাম্পিয়ার', color: '#10B981' },
  { x: 3160, label: '1831 · ফ্যারাডে', color: '#38BDF8' },
  { x: 3620, label: '1860-এর দশক · ম্যাক্সওয়েল', color: '#A855F7' },
  { x: 4080, label: '1897 · জে. জে. থমসন', color: '#38BDF8' },
];

/**
 * When each milestone is NAMED in act2b_timeline.mp3 (local frames @60fps).
 * Measured from VO pauses (ffmpeg silencedetect). 1831 (index 6) shares the sentence "আঠারোশো বিশ থেকে আঠারোশো একত্রিশে…" with 1820, so its cue is estimated within that phrase.
 */
const TIMELINE_CUES = [0, 115, 364, 733, 1401, 1570, 1645, 1882, 2120];
/** "আকাশের বিদ্যুৎ আর গবেষণাগারের বিদ্যুৎ একই!" — second strike down Franklin's kite string */
const FRANKLIN_SKY = 1190;
/** final word "ইলেকট্রন!" — the cathode tube fires */
const ELECTRON_CUE = 2467;
const TIMELINE_YEARS = [-600, 1600, 1745, 1752, 1800, 1820, 1831, 1860, 1897];

/** width/height of each Scene2Apparatus nested <svg> (viewBox is centred on 0,0) */
const APPARATUS_SIZE: Record<number, [number, number]> = {
  1: [700, 540],
  2: [680, 540],
  3: [760, 560],
  4: [700, 540],
  5: [700, 540],
  6: [720, 540],
  8: [760, 540],
};

/** Camera key that centres world-x `X` on screen at magnification z */
const centreOn = (f: number, X: number, z: number, extra: Partial<MultiplaneCamKey> = {}): MultiplaneCamKey => ({
  f,
  x: (X - 960) * z,
  y: 0,
  z,
  ...extra,
});

function timelineKeys(duration: number): MultiplaneCamKey[] {
  const keys: MultiplaneCamKey[] = [
    // open between Thales and the "//" break so the empty axis start never fills the frame
    centreOn(0, 600, 1.02, { rotateY: 1.2 }),
    centreOn(150, 640, 1.04, { rotateY: 0.6 }),
  ];
  const last = TIMELINE_ITEMS.length - 1;
  for (let i = 1; i <= last; i++) {
    const X = TIMELINE_ITEMS[i].x;
    const arrive = TIMELINE_CUES[i] - 9;
    const leave = i < last ? Math.max(arrive + 30, TIMELINE_CUES[i + 1] - 9 - 26) : duration;
    if (i === 3) {
      // Franklin carries 8.5s of VO → slow push-in on the kite, then back out
      keys.push(centreOn(arrive, X - 20, 1.08, { rotateY: -0.8 }));
      keys.push(centreOn(arrive + 260, X, 1.24, { rotateY: 0 }));
      keys.push(centreOn(leave, X + 20, 1.08, { rotateY: 0.6 }));
    } else {
      keys.push(centreOn(arrive, X - 22, 1.06, { rotateY: i % 2 ? -0.8 : 0.8 }));
      keys.push(centreOn(leave, X + 22, i < last ? 1.06 : 1.12, { rotateY: 0 }));
    }
  }
  return keys;
}

/** Maxwell 1860s: E and B fields as a travelling electromagnetic wave */
const MaxwellWaveSVG: React.FC<{ frame: number }> = ({ frame }) => {
  const pts = (amp: number, squash: number) =>
    Array.from({ length: 41 }, (_, k) => {
      const x = -110 + k * 5.5;
      const y = Math.sin(k * 0.33 - frame * 0.12) * amp * squash;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  return (
    <g>
      <line x1="-120" y1="0" x2="125" y2="0" stroke="#64748B" strokeWidth="2" />
      <polyline points={pts(46, 1)} fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      <polyline points={pts(46, 0.42)} fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" transform="skewX(-35)" />
      <text x="-112" y="-56" fill="#38BDF8" fontSize="26" fontWeight="700">E</text>
      <text x="96" y="-24" fill="#F59E0B" fontSize="26" fontWeight="700">B</text>
    </g>
  );
};

/**
 * ACT 2B: Camera-tracked horizontal timeline. Pans RIGHT through history, landing on each
 * milestone as the narrator names it; the active milestone lifts, the rest dim.
 */
export const Ep01BrokenTimelineScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  let active = 0;
  TIMELINE_CUES.forEach((c, i) => {
    if (local >= c - 12) active = i;
  });
  const railX = ci(local, TIMELINE_CUES, TIMELINE_ITEMS.map((it) => Math.max(576, it.x)), EASE_INOUT);
  // hold on each year, roll to the next one just before it is named
  const yIn: number[] = [];
  const yOut: number[] = [];
  TIMELINE_CUES.forEach((c, i) => {
    if (i > 0) {
      yIn.push(c - 40);
      yOut.push(TIMELINE_YEARS[i - 1]);
    }
    yIn.push(c);
    yOut.push(TIMELINE_YEARS[i]);
  });
  const year = Math.round(ci(local, yIn, yOut, EASE_INOUT));
  const yearPrev = Math.round(ci(local - 1, yIn, yOut, EASE_INOUT));
  const yearRoll = Math.min(1, Math.abs(year - yearPrev) / 25);
  const yearText = year < 0 ? `খ্রি.পূ. ${-year}` : `${year}`;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050811', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      {/* giant year odometer: the camera is travelling through time, not reading a list */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 690,
          textAlign: 'center',
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
          fontWeight: 800,
          fontSize: 260,
          lineHeight: 1,
          color: '#1E3A5F',
          opacity: 0.55,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: 4,
          transform: `translateX(${(-yearRoll * 40).toFixed(1)}px)`,
          filter: yearRoll > 0.02 ? `blur(${(yearRoll * 4).toFixed(1)}px)` : undefined,
        }}
      >
        {yearText}
      </div>
      <MultiplaneCameraRig local={local} frame={frame} keys={timelineKeys(duration)}>
        <DepthLayer plane="Z0">
          <svg width="4500" height="1080">
            <circle cx="800" cy="400" r="240" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="12 10" />
            <circle cx="2400" cy="420" r="220" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <circle cx="3700" cy="380" r="260" fill="none" stroke="#A855F7" strokeWidth="3" strokeDasharray="4 12" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="4500" height="1080">
            <rect x="200" y="760" width="4000" height="8" fill="#1E293B" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          <svg width="4500" height="1080" style={{ overflow: 'visible' }}>
            {/* the timeline is a copper wire; history is the current running along it */}
            <line x1="120" y1="540" x2="540" y2="540" stroke="#7C2D12" strokeWidth="12" strokeLinecap="round" />
            <line x1="120" y1="540" x2="540" y2="540" stroke="#D97706" strokeWidth="4" />
            <line x1="534" y1="566" x2="558" y2="514" stroke="#FBBF24" strokeWidth="5" />
            <line x1="558" y1="566" x2="582" y2="514" stroke="#FBBF24" strokeWidth="5" />
            <line x1="576" y1="540" x2="4260" y2="540" stroke="#7C2D12" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
            <line x1="576" y1="540" x2="4260" y2="540" stroke="#D97706" strokeWidth="4" opacity="0.55" />
            {/* the stretch of wire history has already reached carries flowing electrons */}
            <line x1="576" y1="540" x2={railX} y2="540" stroke="#38BDF8" strokeWidth="5" strokeDasharray="10 14" strokeDashoffset={-frame * 2.5} filter="drop-shadow(0 0 8px #38BDF8)" />
            <circle cx={railX} cy="540" r="10" fill="#E0F2FE" filter="drop-shadow(0 0 14px #38BDF8)" />

            {/* arrival of each milestone: the current front hits the node — ring, sparks, glow */}
            {TIMELINE_ITEMS.map((item, idx) => {
              const cue = TIMELINE_CUES[idx];
              const g = pulseAt(local, [cue], 14);
              return (
                <g key={`arr${idx}`}>
                  {g > 0.02 && <circle cx={item.x} cy="540" r={40 + g * 50} fill={item.color} opacity={g * 0.28} />}
                  <ShockRing local={local} at={cue} x={item.x} y={540} r={130} color={item.color} life={32} />
                  <SparkBurst local={local} at={cue} x={item.x} y={540} count={14} speed={8} gravity={0.15} color={item.color} core="#F8FAFC" seed={idx + 30} />
                </g>
              );
            })}
            {/* Leyden jar discharge */}
            <SparkBurst local={local} at={TIMELINE_CUES[2] + 6} x={TIMELINE_ITEMS[2].x} y={360} count={20} speed={11} gravity={0.1} color="#7DD3FC" seed={52} size={1.3} />
            {pulseAt(local, [TIMELINE_CUES[2] + 6], 4) > 0.05 && (
              <path
                d={jaggedArc(TIMELINE_ITEMS[2].x - 40, 330, TIMELINE_ITEMS[2].x + 40, 400, Math.floor(local / 2) * 5, 7)}
                fill="none"
                stroke="#E0F2FE"
                strokeWidth="4"
                opacity={pulseAt(local, [TIMELINE_CUES[2] + 6], 4)}
                filter="drop-shadow(0 0 10px #38BDF8)"
              />
            )}
            {/* Franklin: lightning strikes the kite */}
            {pulseAt(local, [TIMELINE_CUES[3] + 4, TIMELINE_CUES[3] + 13, FRANKLIN_SKY, FRANKLIN_SKY + 9], 3) > 0.05 && (
              <g opacity={pulseAt(local, [TIMELINE_CUES[3] + 4, TIMELINE_CUES[3] + 13, FRANKLIN_SKY, FRANKLIN_SKY + 9], 3)}>
                <path d={jaggedArc(TIMELINE_ITEMS[3].x + 160, -40, TIMELINE_ITEMS[3].x + 20, 330, local < TIMELINE_CUES[3] + 13 ? 71 : 93, 9)} fill="none" stroke="#FEF9C3" strokeWidth="6" filter="drop-shadow(0 0 16px #FDE047)" />
                <path d={jaggedArc(TIMELINE_ITEMS[3].x + 160, -40, TIMELINE_ITEMS[3].x + 20, 330, local < TIMELINE_CUES[3] + 13 ? 71 : 93, 9)} fill="none" stroke="#FFFFFF" strokeWidth="2" />
              </g>
            )}
            {/* Thomson: the cathode tube zaps */}
            <StaticArcs frame={frame} x={TIMELINE_ITEMS[8].x} y={390} radius={60} amount={ci(local, [TIMELINE_CUES[8], TIMELINE_CUES[8] + 10, TIMELINE_CUES[8] + 90, TIMELINE_CUES[8] + 140], [0, 1, 1, 0.3])} color="#38BDF8" count={5} seed={11} />
            <SparkBurst local={local} at={TIMELINE_CUES[8] + 4} x={TIMELINE_ITEMS[8].x + 60} y={390} count={18} speed={12} gravity={0.05} dir={0} spread={70} color="#7DD3FC" seed={61} />
            <SparkBurst local={local} at={ELECTRON_CUE} x={TIMELINE_ITEMS[8].x + 60} y={390} count={26} speed={14} gravity={0.02} dir={0} spread={120} color="#7DD3FC" core="#F0F9FF" seed={67} size={1.3} />
            <ShockRing local={local} at={ELECTRON_CUE} x={TIMELINE_ITEMS[8].x + 60} y={390} r={140} color="#38BDF8" />
            <StaticArcs frame={frame} x={TIMELINE_ITEMS[8].x + 60} y={390} radius={40} amount={pulseAt(local, [ELECTRON_CUE], 24, 1)} color="#7DD3FC" count={6} seed={17} />

            {TIMELINE_ITEMS.map((item, idx) => {
              const isActive = idx === active;
              const cue = TIMELINE_CUES[idx];
              const nextCue = TIMELINE_CUES[idx + 1] ?? 1e9;
              const lift =
                ci(local, [cue - 12, cue + 14], [0, 1], EASE_OUT) * ci(local, [nextCue - 12, nextCue + 10], [1, 0], EASE_OUT);
              const dim = idx > active ? 0.4 : 0.55 + 0.45 * lift;
              return (
                <g key={item.label} transform={`translate(${item.x}, 540)`} opacity={dim}>
                  <circle cx="0" cy="0" r={14 + lift * 6} fill={item.color} filter={isActive ? `drop-shadow(0 0 12px ${item.color})` : undefined} />
                  <g transform={`translate(0, ${(-150 - lift * 18).toFixed(1)}) scale(${(0.62 + lift * 0.1).toFixed(3)})`}>
                    {idx === 0 && <AmberGem id="tlAmber" size={64} glow={0.8} />}
                    {idx === 7 && <MaxwellWaveSVG frame={frame} />}
                    {/* Scene2 apparatus are nested <svg>s anchored top-left: re-centre on the milestone */}
                    {APPARATUS_SIZE[idx] && (
                      <g transform={`translate(${-APPARATUS_SIZE[idx][0] / 2}, ${-APPARATUS_SIZE[idx][1] / 2})`}>
                        {idx === 1 && <GilbertVersoriumSVG frame={frame} local={local} />}
                        {idx === 2 && <LeydenJarSVG frame={frame} local={local} />}
                        {idx === 3 && <FranklinKiteSVG frame={frame} local={local} />}
                        {idx === 4 && <VoltaicPileSVG frame={frame} />}
                        {idx === 5 && <OerstedCompassSVG frame={frame} local={local} />}
                        {idx === 6 && <FaradayInductionSVG frame={frame} />}
                        {idx === 8 && <ThomsonCathodeSVG frame={frame} local={local} />}
                      </g>
                    )}
                  </g>
                  <text x="0" y={(65 + lift * 6).toFixed(1)} textAnchor="middle" fill={isActive ? '#F8FAFC' : '#CBD5E1'} fontSize={(28 + lift * 6).toFixed(1)} fontWeight="700">
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z3">
          <svg width="4500" height="1080">
            <ellipse cx="180" cy="1020" rx="130" ry="200" fill="#050811" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={2100} cy={520} radius={900} count={32} opacity={0.75} seed={22} />
        </DepthLayer>
      </MultiplaneCameraRig>
      {/* lightning lights up the whole lens for the Franklin beat */}
      <ScreenFlash amount={pulseAt(local, [TIMELINE_CUES[3] + 4, TIMELINE_CUES[3] + 13, FRANKLIN_SKY, FRANKLIN_SKY + 9], 4, 0.7)} color="254, 249, 195" at={[55, 25]} />
      <ScreenFlash amount={pulseAt(local, [TIMELINE_CUES[2] + 6, TIMELINE_CUES[8] + 4], 4, 0.3) + pulseAt(local, [ELECTRON_CUE], 8, 0.45)} color="125, 211, 252" at={[50, 38]} />
    </div>
  );
};
