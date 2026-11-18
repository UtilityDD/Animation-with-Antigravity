import React from 'react';
import { AmberGem, DustMotes, EASE_INOUT, EASE_OUT, Feather, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig, type MultiplaneCamKey } from '../core/MultiplaneCameraRig';
import { GlobeDiveShot } from '../historical/scene1/GlobeDiveShot';
import { ThalesRig, getThalesExpressionParams } from '../historical/ThalesRig';
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
 * ACT 2A: Real v1 GlobeDiveShot -> Miletus Oil-Lamp Chamber + ThalesRig + Table-to-Amber Feather Levitation
 */
export const Ep01MiletusScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);

  // VO cues (act2a_miletus.mp3): "গ্রিসের মিলেটাস শহরে" 4.67s · "থেলিস … অ্যাম্বার ঘষতেই দেখলেন" 8.68–12.31s
  // "কোনো স্পর্শ ছাড়াই … পালক … আটকে যাচ্ছে!" 12.76–16.98s
  const showGlobe = local < 300;
  const globeAlpha = ci(local, [0, 18, 255, 298], [0, 1, 1, 0], EASE_INOUT);
  const roomReveal = ci(local, [250, 300], [0, 1], EASE_OUT);
  const featherLift = ci(local, [770, 990], [0, 1], EASE_OUT);
  const rubbing = local < 790;
  const expr = getThalesExpressionParams(featherLift > 0.35 ? 'astonished' : local > 520 ? 'focused' : 'curious');
  // Amber sits in Thales' rubbing hand (rig space -> screen space, see ThalesRig 'rubbingAmber')
  const AMBER = { x: 1300, y: 636 };
  const FEATHER_REST = [
    { x: 1150, y: 742, r: -24 },
    { x: 1215, y: 748, r: 8 },
    { x: 1420, y: 744, r: 26 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: roomReveal }}>
        <MultiplaneCameraRig
          local={local}
          frame={frame}
          keys={[
            { f: 250, x: -40, y: -10, z: 1.0, rotateY: 1.5 },
            { f: 520, x: 120, y: -40, z: 1.14, rotateY: 0 },
            // push in on the amber as the feathers jump
            { f: 780, x: 220, y: -40, z: 1.24, rotateY: -0.6 },
            { f: 1000, x: 300, y: 10, z: 1.42, rotateY: -1.2, stop: true },
            { f: duration, x: 200, y: -20, z: 1.2, rotateY: 0 },
          ]}
        >
          <DepthLayer plane="Z0">
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
              <rect x="0" y="0" width="1920" height="1080" fill="#17110B" />
              <path d="M 260,760 L 260,310 A 190,190 0 0,1 640,310 L 640,760 Z" fill="#142138" />
              <rect x="1350" y="140" width="90" height="620" fill="#231912" />
              <circle cx="450" cy="360" r="150" fill="rgba(245, 158, 11, 0.22)" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z1">
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
              <ellipse cx="300" cy="675" rx="68" ry="110" fill="#7C2D12" />
              <ellipse cx="1640" cy="685" rx="95" ry="40" fill="#D6D3D1" />
              {/* Warm Burning Greek Oil Lamp */}
              <g transform="translate(1520, 665)">
                <ellipse cx="0" cy="18" rx="45" ry="16" fill="#B45309" />
                <circle cx="38" cy="-12" r="24" fill="rgba(251, 191, 36, 0.35)" />
              </g>
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z2">
            <ThalesRig
              pose={{
                worldX: 880,
                worldY: -60,
                chestLeanDeg: -6,
                torsoYaw: 0,
                breathY: Math.sin(frame * 0.05) * 2,
                headRollDeg: -4,
                neckPitchDeg: 6,
                headPitch: 0,
                eyeLookX: -0.6,
                eyeLookY: 0.35,
                blinkAmount: frame % 150 > 144 ? 1 : 0,
                ...expr,
                // rub cycles while rubbing, then the hand freezes holding the amber still
                rubProgress: rubbing ? (local * 0.03) % 1 : 0,
                leftArmState: featherLift > 0.4 ? 'raisedWonder' : 'holdingWool',
                rightArmState: 'rubbingAmber',
                amberGlow: featherLift,
                amazeBlend: featherLift,
              }}
              scale={0.78}
            />
            <svg width="1920" height="1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
              <rect x="-100" y="760" width="2120" height="400" fill="#23160C" stroke="#5C3A21" strokeWidth="4" />
              {/* Charge halo around the hand-held amber */}
              {featherLift > 0.02 && (
                <circle cx={AMBER.x} cy={AMBER.y} r={50 + featherLift * 40} fill="rgba(251, 191, 36, 0.14)" opacity={featherLift} />
              )}
              {/* Feathers lift off the table and fly to the amber — no contact */}
              {FEATHER_REST.map((fr, i) => {
                const t = ci(local, [770 + i * 26, 960 + i * 22], [0, 1], EASE_OUT);
                const wob = Math.sin(frame * 0.2 + i) * 6 * (1 - t);
                const fx = fr.x + (AMBER.x - 30 + i * 30 - fr.x) * t + wob;
                const fy = fr.y + (AMBER.y + 34 - fr.y) * t - Math.sin(t * Math.PI) * 40;
                return (
                  <g key={i} transform={`translate(${fx.toFixed(1)}, ${fy.toFixed(1)}) rotate(${(fr.r * (1 - t) + (i - 1) * 35 * t).toFixed(1)})`}>
                    <Feather length={58} frame={frame} />
                  </g>
                );
              })}
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z3">
            <svg width="1920" height="1080">
              <ellipse cx="140" cy="1040" rx="160" ry="220" fill="#090705" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z4">
            <DustMotes frame={frame} cx={960} cy={520} radius={580} count={26} opacity={0.8} seed={21} />
          </DepthLayer>
        </MultiplaneCameraRig>
      </div>

      {showGlobe && (
        <div style={{ position: 'absolute', inset: 0, opacity: globeAlpha, pointerEvents: 'none' }}>
          <GlobeDiveShot frame={local + 170} />
        </div>
      )}

      <VidyuterKineticTitle frame={local} startFrame={270} endFrame={740} lines={[{ text: 'মিলেটাস • খ্রি.পূ. ~600', highlight: '~600', sizePx: 64 }]} x={90} y={100} accentColor="#F59E0B" variant="slide" />
      <KineticWord localMs={localMs} appearMs={10300} emphasizeStartMs={10500} emphasizeEndMs={12300} removeMs={12700} text="অ্যাম্বার" x={1280} y={440} accentColor="#F59E0B" />
    </div>
  );
};

const TIMELINE_ITEMS = [
  { x: 320, label: 'খ্রি.পূ. ~600 · থেলিস', color: '#F59E0B' },
  { x: 860, label: '1600 · গিলবার্ট', color: '#A855F7' },
  { x: 1320, label: '1745 · লেইডেন জার', color: '#38BDF8' },
  { x: 1780, label: '1752 · ফ্র্যাঙ্কলিন', color: '#FBBF24' },
  { x: 2240, label: '1800 · ভোল্টা', color: '#D9822B' },
  { x: 2700, label: '1820 · ওরস্টেড-অ্যাম্পিয়ার', color: '#10B981' },
  { x: 3160, label: '1831 · ফ্যারাডে', color: '#38BDF8' },
  { x: 3620, label: '1860 · ম্যাক্সওয়েল', color: '#A855F7' },
  { x: 4080, label: '1897 · জে. জে. থমসন', color: '#38BDF8' },
];

/**
 * When each milestone is NAMED in act2b_timeline.mp3 (local frames @60fps).
 * Measured from the 9 VO phrases between pauses (ffmpeg silencedetect) — one phrase per milestone.
 */
const TIMELINE_CUES = [0, 186, 394, 614, 1127, 1414, 1580, 1786, 1934];
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

    </div>
  );
};
