import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';

/**
 * ACT 1: Everyday Sensory Hook (Winter Bedroom Blanket Sparks -> 6A Modular Wall Switch -> Bulb)
 * - Full Z0-Z4 Multiplane 2.5D Parallax
 * - 100% camera coverage from 0ms to duration
 * - Phrase-synced KineticWord triggers (<= 3 simultaneous)
 */
export const Ep01WinterHookScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);

  const blanketLift = ci(local, [180, 420], [0, 95], EASE_OUT);
  const sparkFlash = local >= 310 && local < 450 && frame % 16 < 7;
  const switchClosed = local >= 540;
  const bulbGlow = ci(local, [545, 595], [0, 1], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: switchClosed
          ? 'radial-gradient(ellipse at 65% 32%, #292012 0%, #090B10 78%)'
          : 'radial-gradient(ellipse at 45% 45%, #111827 0%, #06080E 82%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 1.0, rotateY: -1.5 },
          { f: 210, x: -110, y: -35, z: 1.18, rotateY: 0 },
          { f: 350, x: -210, y: -65, z: 1.78, rotateY: 2.0 },
          { f: 520, x: 260, y: -25, z: 1.38, rotateY: -2.2 },
          { f: 780, x: 220, y: -85, z: 1.18, rotateY: 1.2 },
          { f: duration, x: 0, y: -30, z: 1.08, rotateY: 0 },
        ]}
      >
        {/* Z0: Far Bedroom Window & Moonlight */}
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <rect x="260" y="130" width="420" height="360" rx="8" fill="#0F172A" stroke="#1E293B" strokeWidth="10" />
            <circle cx="560" cy="240" r="44" fill="#BAE6FD" opacity="0.5" />
            <line x1="470" y1="130" x2="470" y2="490" stroke="#1E293B" strokeWidth="8" />
          </svg>
        </DepthLayer>

        {/* Z1: Midground Bedside Teacup & Charging Mobile Phone */}
        <DepthLayer plane="Z1">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <rect x="140" y="720" width="1640" height="360" fill="#131110" />
            {/* Bedside Teacup */}
            <rect x="260" y="650" width="52" height="58" rx="6" fill="#334155" />
            {/* Charging Phone */}
            <rect x="360" y="688" width="95" height="20" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          </svg>
        </DepthLayer>

        {/* Z2: Razor-Sharp Hero Props — Synthetic Blanket Fibers + 6A Modular Wall Switch + Ceiling Bulb */}
        <DepthLayer plane="Z2">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
            {/* Left Hero: Synthetic Fleece Blanket & Micro-Sparks */}
            <g transform="translate(640, 620)">
              <rect x="-240" y="40" width="480" height="90" rx="18" fill="#1E293B" stroke="#475569" strokeWidth="3" />
              <path
                d={`M -220,40 Q -40,${-55 - blanketLift} 220,${10 - blanketLift * 0.4} L 220,65 L -220,65 Z`}
                fill="#312E81"
                stroke="#6366F1"
                strokeWidth="3"
              />
              {sparkFlash && (
                <>
                  <path d="M -80,15 L -64,2 L -52,18 L -38,4" fill="none" stroke="#E0F2FE" strokeWidth="4" filter="drop-shadow(0 0 12px #38BDF8)" />
                  <path d="M 45,5 L 62,-8 L 72,10 L 88,-4" fill="none" stroke="#38BDF8" strokeWidth="4" filter="drop-shadow(0 0 12px #38BDF8)" />
                </>
              )}
            </g>

            {/* Right Hero: Indian 6A Modular Wall Switch Cutaway + Ceiling Bulb */}
            <g transform="translate(1320, 520)">
              <rect x="-85" y="-110" width="170" height="220" rx="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="4" />
              <rect x="-42" y="-56" width="84" height="112" rx="8" fill="#1E293B" />
              {/* Brass Contact Blade */}
              <line
                x1="-24"
                y1="18"
                x2={switchClosed ? 24 : 14}
                y2={switchClosed ? 18 : -16}
                stroke="#F59E0B"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {local >= 540 && local < 562 && (
                <circle cx="22" cy="14" r="10" fill="#38BDF8" filter="drop-shadow(0 0 14px #38BDF8)" />
              )}
            </g>

            {/* Ceiling Bulb */}
            <g transform="translate(1320, 220)">
              <line x1="0" y1="-220" x2="0" y2="-45" stroke="#475569" strokeWidth="5" />
              <circle
                cx="0"
                cy="0"
                r="42"
                fill={switchClosed ? '#FEF08A' : '#1E293B'}
                stroke="#94A3B8"
                strokeWidth="3"
                opacity={0.35 + bulbGlow * 0.65}
                filter={switchClosed ? 'drop-shadow(0 0 42px #FBBF24)' : undefined}
              />
            </g>
          </svg>
        </DepthLayer>

        {/* Z3: Near Foreground Bedpost Silhouette */}
        <DepthLayer plane="Z3">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <rect x="-40" y="180" width="135" height="940" fill="#05070C" />
            <ellipse cx="1860" cy="980" rx="140" ry="200" fill="#05070C" />
          </svg>
        </DepthLayer>

        {/* Z4: Lens Dust Motes */}
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={620} count={24} opacity={0.8} seed={11} />
        </DepthLayer>
      </MultiplaneCameraRig>

      {/* Track 4 Kinetic Bengali Words (Screen-space HUD, <= 3 simultaneous) */}
      <KineticWord localMs={localMs} appearMs={100} emphasizeStartMs={250} emphasizeEndMs={1400} removeMs={1750} text="শীতের রাত" x={460} y={240} accentColor="#BAE6FD" />
      <KineticWord localMs={localMs} appearMs={5200} emphasizeStartMs={5400} emphasizeEndMs={6800} removeMs={7300} text="চটপট! স্ফুলিঙ্গ" x={640} y={240} accentColor="#38BDF8" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={8200} emphasizeStartMs={8600} emphasizeEndMs={10500} removeMs={11200} text="বিদ্যুৎ কী?" x={960} y={880} accentColor="#FBBF24" mode="STROKE_UNDERLINE" />
    </div>
  );
};
