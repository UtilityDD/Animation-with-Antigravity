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

  const showGlobe = local < 280;
  const globeAlpha = ci(local, [0, 18, 225, 275], [0, 1, 1, 0], EASE_INOUT);
  const roomReveal = ci(local, [220, 275], [0, 1], EASE_OUT);
  const featherLift = ci(local, [550, 760], [0, 1], EASE_OUT);
  const expr = getThalesExpressionParams(featherLift > 0.35 ? 'astonished' : 'curious');

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: roomReveal }}>
        <MultiplaneCameraRig
          local={local}
          frame={frame}
          keys={[
            { f: 220, x: 0, y: 0, z: 1.0, rotateY: 1.5 },
            { f: 520, x: -65, y: 15, z: 1.18, rotateY: 0 },
            { f: 800, x: -115, y: 25, z: 1.32, rotateY: -1.2 },
            { f: duration, x: -75, y: 10, z: 1.18, rotateY: 0 },
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
                worldY: 115,
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
                rubProgress: (Math.sin(local * 0.18) + 1) * 0.5,
                leftArmState: featherLift > 0.4 ? 'raisedWonder' : 'holdingWool',
                rightArmState: featherLift > 0.4 ? 'astonished' : 'rubbingAmber',
                amberGlow: featherLift,
                amazeBlend: featherLift,
              }}
              scale={0.78}
            />
            <svg width="1920" height="1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
              <rect x="-100" y="710" width="2120" height="400" fill="#23160C" stroke="#5C3A21" strokeWidth="4" />
              {/* Amber Gem held above table + Feathers lifting from Table Surface (y=695 -> y=575) */}
              <g transform="translate(690, 505)">
                <AmberGem id="miletusAmber" size={64} glow={featherLift} />
              </g>
              {[-52, 0, 52].map((fx, i) => (
                <g key={i} transform={`translate(${690 + fx}, ${692 - featherLift * 102}) rotate(${(i - 1) * 20})`}>
                  <Feather length={58} frame={frame} />
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
            <DustMotes frame={frame} cx={960} cy={520} radius={580} count={26} opacity={0.8} seed={21} />
          </DepthLayer>
        </MultiplaneCameraRig>
      </div>

      {showGlobe && (
        <div style={{ position: 'absolute', inset: 0, opacity: globeAlpha, pointerEvents: 'none' }}>
          <GlobeDiveShot frame={local + 170} />
        </div>
      )}

      <VidyuterKineticTitle frame={local} startFrame={260} endFrame={720} lines={[{ text: 'মিলেটাস • খ্রি.পূ. ~600', highlight: '~600', sizePx: 64 }]} x={90} y={100} accentColor="#F59E0B" variant="slide" />
      <VidyuterKineticTitle frame={local} startFrame={750} endFrame={1340} lines={[{ text: 'স্পর্শ ছাড়াই আকর্ষণ!', highlight: 'আকর্ষণ!', sizePx: 66 }]} x={90} y={100} accentColor="#38BDF8" variant="spark" />
      <KineticWord localMs={localMs} appearMs={5200} emphasizeStartMs={5400} emphasizeEndMs={7400} removeMs={7800} text="অ্যাম্বার" x={690} y={405} accentColor="#F59E0B" />
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
 * ACT 2B: Camera-Tracked Horizontal Timeline starting centered on Thales + "//" Axis Break (zero empty left void!)
 */
export const Ep01BrokenTimelineScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050811', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: -240, y: 0, z: 1.02, rotateY: 1.2 },
          { f: duration * 0.3, x: -960, y: 0, z: 1.06, rotateY: 0 },
          { f: duration * 0.65, x: -2050, y: 0, z: 1.08, rotateY: -1.2 },
          { f: duration, x: -3120, y: 0, z: 1.02, rotateY: 0 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="4500" height="1080">
            <circle cx="800" cy="400" r="240" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="12 10" />
            <circle cx="2400" cy="420" r="220" fill="none" stroke="#F59E0B" strokeWidth="3" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="4500" height="1080">
            <rect x="200" y="760" width="4000" height="8" fill="#1E293B" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          <svg width="4500" height="1080" style={{ overflow: 'visible' }}>
            <line x1="120" y1="540" x2="540" y2="540" stroke="#38BDF8" strokeWidth="4" />
            <line x1="534" y1="566" x2="558" y2="514" stroke="#FBBF24" strokeWidth="5" />
            <line x1="558" y1="566" x2="582" y2="514" stroke="#FBBF24" strokeWidth="5" />
            <line x1="576" y1="540" x2="4260" y2="540" stroke="#38BDF8" strokeWidth="4" />

            {TIMELINE_ITEMS.map((item, idx) => (
              <g key={item.label} transform={`translate(${item.x}, 540)`}>
                <circle cx="0" cy="0" r="14" fill={item.color} />
                <g transform="translate(0, -140) scale(0.75)">
                  {idx === 0 && <AmberGem id="tlAmber" size={52} glow={0.8} />}
                  {idx === 1 && <GilbertVersoriumSVG frame={frame} local={local} />}
                  {idx === 2 && <LeydenJarSVG frame={frame} local={local} />}
                  {idx === 3 && <FranklinKiteSVG frame={frame} local={local} />}
                  {idx === 4 && <VoltaicPileSVG frame={frame} />}
                  {idx === 5 && <OerstedCompassSVG frame={frame} local={local} />}
                  {idx === 6 && <FaradayInductionSVG frame={frame} />}
                  {idx === 8 && <ThomsonCathodeSVG frame={frame} local={local} />}
                </g>
                <text x="0" y="65" textAnchor="middle" fill="#F8FAFC" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  {item.label}
                </text>
              </g>
            ))}
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

      <VidyuterKineticTitle frame={local} startFrame={20} endFrame={2160} lines={[{ text: 'বিজ্ঞানের বিবর্তন • 2,500 বছর', highlight: '2,500', sizePx: 54 }]} align="center" x={960} y={76} accentColor="#38BDF8" variant="slide" />
    </div>
  );
};
