import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { ThalesRig, getThalesExpressionParams } from '../historical/ThalesRig';

/**
 * ACT 2A (Miletus c. 600 BCE Globe-to-Room Dive + ThalesRig)
 */
export const Ep01MiletusScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);

  const globeAlpha = ci(local, [0, 18, 220, 270], [0, 1, 1, 0], EASE_INOUT);
  const globeScale = ci(local, [0, 260], [0.85, 5.2], EASE_INOUT);
  const roomReveal = ci(local, [215, 270], [0, 1], EASE_OUT);
  const featherLift = ci(local, [580, 740], [0, 1], EASE_OUT);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#090B10', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: roomReveal }}>
        <MultiplaneCameraRig
          local={local}
          frame={frame}
          keys={[
            { f: 215, x: 0, y: 0, z: 1.0, rotateY: 1.5 },
            { f: 520, x: -90, y: 20, z: 1.24, rotateY: 0 },
            { f: 780, x: -160, y: 40, z: 1.48, rotateY: -1.5 },
            { f: duration, x: -110, y: 15, z: 1.32, rotateY: 0 },
          ]}
        >
          <DepthLayer plane="Z0">
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
              <rect x="0" y="0" width="1920" height="1080" fill="#17120D" />
              <path d="M 280,760 L 280,340 A 180,180 0 0,1 640,340 L 640,760 Z" fill="#1E293B" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z1">
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
              <ellipse cx="320" cy="680" rx="68" ry="110" fill="#7C2D12" />
              <ellipse cx="1620" cy="690" rx="90" ry="38" fill="#D6D3D1" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z2">
            {(() => {
              const expr = getThalesExpressionParams(featherLift > 0.35 ? 'astonished' : 'curious');
              return (
                <ThalesRig
                  pose={{
                    worldX: 1040,
                    worldY: 140,
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
              );
            })()}
            <svg width="1920" height="1080" style={{ position: 'relative', zIndex: 2 }}>
              <rect x="-100" y="710" width="2120" height="400" fill="#23160C" stroke="#5C3A21" strokeWidth="4" />
              {/* Baltic Amber Rod */}
              <ellipse cx="780" cy="595" rx="52" ry="28" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2.5" />
              {/* Levitating Feathers */}
              {[-36, 0, 36].map((fx, i) => (
                <ellipse
                  key={i}
                  cx={780 + fx}
                  cy={680 - featherLift * 54}
                  rx="14"
                  ry="6"
                  fill="#F8FAFC"
                  transform={`rotate(${(i - 1) * 18}, ${780 + fx}, ${680 - featherLift * 54})`}
                />
              ))}
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z3">
            <svg width="1920" height="1080">
              <ellipse cx="140" cy="1040" rx="160" ry="220" fill="#090705" />
            </svg>
          </DepthLayer>

          <DepthLayer plane="Z4">
            <DustMotes frame={frame} cx={960} cy={520} radius={580} count={24} opacity={0.75} seed={21} />
          </DepthLayer>
        </MultiplaneCameraRig>
      </div>

      {local < 275 && (
        <div style={{ position: 'absolute', inset: 0, background: '#040812', opacity: globeAlpha, pointerEvents: 'none' }}>
          <svg width="1920" height="1080" style={{ transform: `scale(${globeScale})`, transformOrigin: '960px 510px' }}>
            <circle cx="960" cy="510" r="240" fill="#0F294A" stroke="#38BDF8" strokeWidth="3" />
            <circle cx="995" cy="465" r="10" fill="#FBBF24" />
            <text x="960" y="438" textAnchor="middle" fill="#FDE68A" fontSize="24" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              মিলেটাস • খ্রি.পূ. ~৬০০
            </text>
          </svg>
        </div>
      )}

      <KineticWord localMs={localMs} appearMs={5200} emphasizeStartMs={5400} emphasizeEndMs={7400} removeMs={7800} text="অ্যাম্বার" x={660} y={240} accentColor="#F59E0B" />
      <KineticWord localMs={localMs} appearMs={8000} emphasizeStartMs={8200} emphasizeEndMs={10600} removeMs={11200} text="স্পর্শ ছাড়াই আকর্ষণ!" x={960} y={880} accentColor="#38BDF8" mode="SCALE_GLOW" />
    </div>
  );
};

const TIMELINE_ITEMS = [
  { x: 320, label: 'খ্রি.পূ. ~৬০০ · থেলিস', color: '#F59E0B' },
  { x: 860, label: '১৬০০ · গিলবার্ট', color: '#A855F7' },
  { x: 1320, label: '১৭৪৫ · লেইডেন জার', color: '#38BDF8' },
  { x: 1780, label: '১৭৫২ · ফ্র্যাঙ্কলিন', color: '#FBBF24' },
  { x: 2240, label: '১৮০০ · ভোল্টা', color: '#D9822B' },
  { x: 2700, label: '১৮২০ · ওরস্টেড-অ্যাম্পিয়ার', color: '#10B981' },
  { x: 3160, label: '১৮৩১ · ফ্যারাডে', color: '#38BDF8' },
  { x: 3620, label: '১৮৬০ · ম্যাক্সওয়েল', color: '#A855F7' },
  { x: 4080, label: '১৮৯৭ · জে. জে. থমসন', color: '#38BDF8' },
];

/**
 * ACT 2B: Camera-Tracked Horizontal Timeline with explicit "//" Axis Break
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
          { f: 0, x: 420, y: 0, z: 1.0, rotateY: 1.2 },
          { f: duration * 0.3, x: -460, y: 0, z: 1.06, rotateY: 0 },
          { f: duration * 0.65, x: -1650, y: 0, z: 1.08, rotateY: -1.2 },
          { f: duration, x: -2950, y: 0, z: 1.02, rotateY: 0 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="4500" height="1080">
            <circle cx="1400" cy="400" r="240" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="12 10" />
            <circle cx="3100" cy="420" r="220" fill="none" stroke="#F59E0B" strokeWidth="3" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="4500" height="1080">
            <rect x="600" y="760" width="3200" height="8" fill="#1E293B" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          <svg width="4500" height="1080" style={{ overflow: 'visible' }}>
            <line x1="200" y1="540" x2="540" y2="540" stroke="#38BDF8" strokeWidth="4" />
            <line x1="534" y1="566" x2="558" y2="514" stroke="#FBBF24" strokeWidth="5" />
            <line x1="558" y1="566" x2="582" y2="514" stroke="#FBBF24" strokeWidth="5" />
            <line x1="576" y1="540" x2="4260" y2="540" stroke="#38BDF8" strokeWidth="4" />

            {TIMELINE_ITEMS.map((item, idx) => (
              <g key={item.label} transform={`translate(${item.x}, 540)`}>
                <circle cx="0" cy="0" r="14" fill={item.color} />
                {idx === 3 && (
                  /* 1752 Franklin Kite (ZERO lightning bolt!) */
                  <g transform="translate(0, -110)">
                    <polygon points="0,-32 24,0 0,38 -24,0" fill="rgba(242,229,206,0.28)" stroke="#F2E5CE" strokeWidth="2.5" />
                    <line x1="0" y1="38" x2="0" y2="75" stroke="#8C7355" strokeWidth="2.5" />
                  </g>
                )}
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
    </div>
  );
};
