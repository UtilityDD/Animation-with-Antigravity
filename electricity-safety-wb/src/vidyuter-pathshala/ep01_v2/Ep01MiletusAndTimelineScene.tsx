import React from 'react';
import { AmberGem, DustMotes, EASE_INOUT, EASE_OUT, Feather, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
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
import { ACT2A, ACT2B } from './voiceBeats';

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

  const showGlobe = local < ACT2A.enterRoom + 12;
  const globeAlpha = ci(local, [0, 18, ACT2A.enterRoom - 40, ACT2A.enterRoom + 8], [0, 1, 1, 0], EASE_INOUT);
  const roomReveal = ci(local, [ACT2A.enterRoom - 24, ACT2A.enterRoom + 8], [0, 1], EASE_OUT);
  const rubbing = local >= ACT2A.rubStart && local <= ACT2A.rubEnd;
  const featherLift = ci(local, [ACT2A.feather, ACT2A.feather + 28, ACT2A.featherLand], [0, 0.12, 1], EASE_OUT);
  const expr = getThalesExpressionParams(featherLift > 0.35 ? 'astonished' : 'curious');

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: roomReveal }}>
        <MultiplaneCameraRig
          local={local}
          frame={frame}
          keys={[
            { f: ACT2A.enterRoom, x: 0, y: 0, z: 1.0, rotateY: 1.2 },
            { f: ACT2A.rubStart, x: -40, y: 24, z: 1.28, rotateY: 0.2 },
            { f: ACT2A.feather, x: -90, y: 48, z: 1.58, rotateY: -0.8 },
            { f: ACT2A.caveat, x: 30, y: -8, z: 1.12, rotateY: 0.4 },
            { f: duration, x: -20, y: 6, z: 1.08, rotateY: 0 },
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
              {/* Warm Burning Greek Oil Lamp with Flickering Flame */}
              <g transform="translate(1520, 665)">
                <path d="M -46,12 Q -52,32 0,34 Q 48,32 54,10 L 72,-2 Q 52,-8 36,2 Q 0,-10 -34,2 Z" fill="#B45309" stroke="#F59E0B" strokeWidth="2" />
                <path d="M -44,8 C -68,-6 -64,26 -42,22" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
                <ellipse cx="0" cy="4" rx="22" ry="6" fill="#78350F" />
                <circle
                  cx="66"
                  cy="-16"
                  r={34 + Math.sin(frame * 0.28) * 5}
                  fill="rgba(251, 191, 36, 0.34)"
                />
                <path
                  d={`M 60,-4 Q ${66 + Math.sin(frame * 0.35) * 3},-28 68,-34 Q 76,-22 72,-4 Z`}
                  fill="#FDE047"
                />
              </g>
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z2">
            <ThalesRig
              pose={{
                worldX: 880,
                worldY: 115,
                chestLeanDeg: ci(featherLift, [0, 0.35, 1], [-10, -4, 3]),
                torsoYaw: 0,
                breathY: Math.sin(frame * 0.05) * 2,
                shoulderElevateY: featherLift * -8,
                headRollDeg: ci(featherLift, [0, 1], [-6, 2]),
                neckPitchDeg: ci(featherLift, [0, 1], [8, 2]),
                headPitch: 0,
                eyeLookX: -0.65,
                eyeLookY: ci(featherLift, [0, 1], [0.45, 0.15]),
                blinkAmount: frame % 150 > 144 ? 1 : 0,
                ...expr,
                rubProgress: rubbing ? (Math.sin(local * 0.55) + 1) * 0.5 : 0,
                leftArmState: featherLift > 0.38 ? 'raisedWonder' : 'holdingWool',
                rightArmState: 'rubbingAmber',
                amberGlow: featherLift,
                amazeBlend: featherLift,
              }}
              scale={0.78}
            />
            <svg width="1920" height="1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
              <rect x="-100" y="710" width="2120" height="400" fill="#23160C" stroke="#5C3A21" strokeWidth="4" />
              {/* Amber Gem held above table + Rubbing Micro-Sparks + Static Attraction Threads + Staggered Feathers */}
              <g transform="translate(690, 505)">
                <AmberGem id="miletusAmber" size={68} glow={featherLift} charge={featherLift} />
                {local >= 320 && local < 560 && Math.sin(frame * 0.9) > 0.2 && (
                  <path d="M -24,-10 L -10,-26 L 2,-8 L 18,-22" fill="none" stroke="#E0F2FE" strokeWidth="3" filter="drop-shadow(0 0 8px #38BDF8)" />
                )}
              </g>
              {[-54, 0, 54].map((fx, i) => {
                const stagger = Math.max(0, Math.min(1, featherLift * 1.25 - i * 0.12));
                const flutter = Math.sin(frame * 0.09 + i * 1.7) * 5 * stagger;
                const fy = 692 - stagger * 106 + flutter;
                return (
                  <g key={i}>
                    {stagger > 0.15 && (
                      <path
                        d={`M ${690 + fx * 0.35},528 Q ${690 + fx * 0.65},${(528 + fy) * 0.5} ${690 + fx},${fy - 14}`}
                        fill="none"
                        stroke="#FBBF24"
                        strokeWidth="1.8"
                        strokeDasharray="6 6"
                        strokeDashoffset={-(frame * 1.4) % 24}
                        opacity={stagger * 0.72}
                      />
                    )}
                    <g transform={`translate(${690 + fx}, ${fy}) rotate(${(i - 1) * 18 + flutter * 1.1})`}>
                      <Feather length={60} frame={frame} />
                    </g>
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

      <VidyuterKineticTitle frame={local} startFrame={ACT2A.enterRoom} endFrame={ACT2A.rubStart} lines={[{ text: 'মিলেটাস • খ্রি.পূ. ~600', highlight: '~600', sizePx: 64 }]} x={90} y={100} accentColor="#F59E0B" variant="slide" />
      <VidyuterKineticTitle frame={local} startFrame={ACT2A.feather} endFrame={ACT2A.caveat} lines={[{ text: 'স্পর্শ ছাড়াই আকর্ষণ!', highlight: 'আকর্ষণ!', sizePx: 66 }]} x={90} y={100} accentColor="#38BDF8" variant="spark" />
      <KineticWord localMs={localMs} appearMs={(ACT2A.rubStart / 60) * 1000} emphasizeStartMs={((ACT2A.rubStart + 40) / 60) * 1000} emphasizeEndMs={(ACT2A.rubEnd / 60) * 1000} removeMs={((ACT2A.feather - 8) / 60) * 1000} text="অ্যাম্বার" x={690} y={405} accentColor="#F59E0B" />
    </div>
  );
};

interface EraBeat {
  startF: number;
  endF: number;
  year: string;
  name: string;
  color: string;
}

const ERA_BEATS: EraBeat[] = [
  { startF: ACT2B.gilbert, endF: ACT2B.leyden, year: '1600', name: 'উইলিয়াম গিলবার্ট', color: '#A855F7' },
  { startF: ACT2B.leyden, endF: ACT2B.franklin, year: '1745–46', name: 'লেইডেন জার', color: '#38BDF8' },
  { startF: ACT2B.franklin, endF: ACT2B.volta, year: '1752', name: 'বেঞ্জামিন ফ্র্যাঙ্কলিন', color: '#FBBF24' },
  { startF: ACT2B.volta, endF: ACT2B.oersted, year: '1800', name: 'আলেসান্দ্রো ভোল্টা', color: '#D9822B' },
  { startF: ACT2B.oersted, endF: ACT2B.faraday, year: '1820', name: 'ওরস্টেড ও অ্যাম্পিয়ার', color: '#10B981' },
  { startF: ACT2B.faraday, endF: ACT2B.maxwell, year: '1831', name: 'মাইকেল ফ্যারাডে', color: '#38BDF8' },
  { startF: ACT2B.maxwell, endF: ACT2B.thomson, year: '1860s', name: 'ম্যাক্সওয়েল', color: '#A855F7' },
  { startF: ACT2B.thomson, endF: ACT2B.end + 40, year: '1897', name: 'জে. জে. থমসন', color: '#38BDF8' },
];

const MaxwellWaveSVG: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const reveal = ci(local, [0, 35], [0, 1], EASE_OUT);
  const phase = frame * 0.14;
  const ePts = Array.from({ length: 38 }, (_, i) => {
    const px = -190 + i * 10.5;
    const py = Math.sin(i * 0.42 - phase) * 72 * reveal;
    return `${i === 0 ? 'M' : 'L'} ${px},${py}`;
  }).join(' ');
  const bPts = Array.from({ length: 38 }, (_, i) => {
    const px = -190 + i * 10.5;
    const py = Math.cos(i * 0.42 - phase) * 40 * reveal;
    return `${i === 0 ? 'M' : 'L'} ${px},${py}`;
  }).join(' ');

  return (
    <svg width="520" height="320" viewBox="-260 -160 520 320" style={{ overflow: 'visible' }}>
      <circle cx="0" cy="0" r="145" fill="rgba(168, 85, 247, 0.12)" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="8 6" />
      <line x1="-210" y1="0" x2="210" y2="0" stroke="#475569" strokeWidth="2.5" />
      <path d={bPts} fill="none" stroke="#38BDF8" strokeWidth="4" opacity="0.82" />
      <path d={ePts} fill="none" stroke="#FBBF24" strokeWidth="5" filter="drop-shadow(0 0 12px #F59E0B)" />
      <polygon points="215,0 196,-9 196,9" fill="#FBBF24" />
    </svg>
  );
};

/**
 * ACT 2B: Clean, Voiceover-Synced Spotlight Timeline (Zero Overlapping Clutter!)
 * - 0..170f: "এরপর পেরিয়ে গেল প্রায় আড়াই হাজার বছর" (2,500-year time leap to 1600)
 * - 170..2192f: One hero SVG apparatus on stage at a time, synced to act2b_timeline.mp3
 */
export const Ep01BrokenTimelineScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  const gapAlpha = ci(local, [0, 12, ACT2B.leapEnd - 16, ACT2B.leapEnd + 10], [0, 1, 1, 0], EASE_INOUT);
  const warpYear = Math.round(ci(local, [8, ACT2B.leapEnd], [-600, 1600], EASE_OUT));

  const activeIdx = ERA_BEATS.findIndex((b) => local >= b.startF && local < b.endF);
  const activeBeat = activeIdx >= 0 ? ERA_BEATS[activeIdx] : null;
  const accentColor = activeBeat?.color ?? '#F59E0B';

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, #0D162B 0%, #04070F 85%)', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 1.0, rotateY: 0.8 },
          { f: ACT2B.leapEnd, x: 0, y: 0, z: 1.06, rotateY: 0 },
          { f: ACT2B.franklin, x: 0, y: -12, z: 1.12, rotateY: -0.8 },
          { f: ACT2B.faraday, x: 0, y: 10, z: 1.1, rotateY: 0.8 },
          { f: duration, x: 0, y: 0, z: 1.18, rotateY: 0 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            <circle cx="960" cy="500" r="420" fill={accentColor} opacity="0.08" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          {/* 0..170f: 2,500-Year Time Leap */}
          {gapAlpha > 0.01 && (
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: gapAlpha }}>
              {Array.from({ length: 14 }).map((_, i) => {
                const px = 280 + i * 105;
                const py = 540 + Math.sin(frame * 0.06 + i) * 28;
                return <circle key={i} cx={px} cy={py} r={4 + (i % 3) * 2} fill="#F59E0B" opacity={0.28 + 0.3 * Math.sin(frame * 0.1 + i)} />;
              })}
              <text x="960" y="485" textAnchor="middle" fill="#FDE68A" fontSize="86" fontWeight="800" style={{ fontFamily: "'Inter', sans-serif" }}>
                {warpYear < 0 ? `${Math.abs(warpYear)} BC` : warpYear}
              </text>
              <text x="960" y="555" textAnchor="middle" fill="#94A3B8" fontSize="34" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                ~2,500 বছর পর...
              </text>
            </svg>
          )}

          {/* 170..2192f: Single Hero Spotlight Stage (Zero Clutter) */}
          {ERA_BEATS.map((beat, idx) => {
            const bLocal = local - beat.startF;
            const bDur = beat.endF - beat.startF;
            if (bLocal < -16 || bLocal > bDur + 16) return null;

            const enterT = ci(bLocal, [-12, 18], [0, 1], EASE_OUT);
            const exitT = ci(bLocal, [bDur - 18, bDur + 12], [1, 0], EASE_INOUT);
            const alpha = enterT * exitT;
            const zScale = 0.82 + enterT * 0.3 + (1 - exitT) * 0.28;

            return (
              <div
                key={beat.year}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: alpha,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 960,
                    top: 470,
                    transform: `translate(-50%, -50%) scale(${zScale.toFixed(3)})`,
                  }}
                >
                  {idx === 0 && <GilbertVersoriumSVG frame={frame} local={Math.max(0, bLocal)} />}
                  {idx === 1 && <LeydenJarSVG frame={frame} local={Math.max(0, bLocal)} />}
                  {idx === 2 && <FranklinKiteSVG frame={frame} local={Math.max(0, bLocal)} />}
                  {idx === 3 && <VoltaicPileSVG frame={frame} />}
                  {idx === 4 && <OerstedCompassSVG frame={frame} local={Math.max(0, bLocal)} />}
                  {idx === 5 && <FaradayInductionSVG frame={frame} />}
                  {idx === 6 && <MaxwellWaveSVG frame={frame} local={Math.max(0, bLocal)} />}
                  {idx === 7 && <ThomsonCathodeSVG frame={frame} local={Math.max(0, bLocal)} />}
                </div>

                {/* Clean Top-Center Year + Bangla Name */}
                <div
                  style={{
                    position: 'absolute',
                    top: 72,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 52, fontWeight: 800, color: beat.color, fontFamily: "'Inter', sans-serif", letterSpacing: 1 }}>
                    {beat.year}
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#F8FAFC', fontFamily: "'Hind Siliguri', sans-serif", marginTop: 4 }}>
                    {beat.name}
                  </div>
                </div>
              </div>
            );
          })}
        </DepthLayer>

        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={620} count={24} opacity={0.7} seed={22} />
        </DepthLayer>
      </MultiplaneCameraRig>

      {/* Minimal Bottom Progress Track (Only Dots & Active Year) */}
      {local >= ACT2B.leapEnd - 8 && (
        <svg width="1920" height="120" style={{ position: 'absolute', bottom: 36, left: 0, pointerEvents: 'none' }}>
          <line x1="360" y1="50" x2="1560" y2="50" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          <line
            x1="360"
            y1="50"
            x2={360 + ci(local, [ACT2B.leapEnd, duration], [0, 1200])}
            y2="50"
            stroke="#38BDF8"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {ERA_BEATS.map((b, i) => {
            const cx = 360 + (i / (ERA_BEATS.length - 1)) * 1200;
            const isPast = local >= b.startF;
            const isNow = i === activeIdx;
            return (
              <g key={b.year} transform={`translate(${cx}, 50)`}>
                <circle cx="0" cy="0" r={isNow ? 11 : 6.5} fill={isPast ? b.color : '#334155'} />
                <text
                  x="0"
                  y="36"
                  textAnchor="middle"
                  fill={isNow ? '#F8FAFC' : '#64748B'}
                  fontSize={isNow ? '20' : '16'}
                  fontWeight={isNow ? '800' : '600'}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {b.year}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};
