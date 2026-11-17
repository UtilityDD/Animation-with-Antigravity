import React from 'react';
import { EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { CameraRig, LivingLabBackdrop } from './CameraRig';
import { VoltaRig } from './VoltaRig';

/**
 * Stage 1 (1799–1800, Northern Italy):
 * - 0..235f: Spatial Geography Entry — 2.5D Rotating Globe -> Clouds/Como Rooftops -> Gliding through Stone Arch Window!
 * - 235..640f: Dolly-in across Italian study onto Leyden Jar -> 1ms crack spark -> darkness (Volta: frustrated)
 * - 640..1580f: Lateral workbench pan stacking Copper/Brine/Zinc Voltaic Pile (Volta: focused; plaque: ১৮০০ · আলেসান্দ্রো ভোল্টা)
 * - 1580..end: Rack-focus onto water electrolysis beaker with nonstop rising bubbles (Volta: awe!)
 */
export const Stage1VoltaicShot: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 32, duration], [1, 0], EASE_INOUT);

  // Globe-to-Lab Dive (0..240f)
  const globeActive = local < 250;
  const globeAlpha = ci(local, [0, 18, 195, 245], [0, 1, 1, 0], EASE_INOUT);
  const globeScale = ci(local, [0, 235], [0.85, 5.4], EASE_INOUT);
  const labReveal = ci(local, [185, 245], [0, 1], EASE_OUT);

  const sparkFlash = local >= 440 && local < 456;
  const pileLayerCount = Math.floor(ci(local, [680, 1420], [0, 10]));
  const wireConnected = local >= 1580;
  const plaqueAlpha = ci(local, [700, 740, 890, 940], [0, 1, 1, 0], EASE_INOUT);
  const panX = ci(local, [200, 640, 1520, duration], [180, 180, -240, -180], EASE_INOUT);
  const voltaExpr = wireConnected ? 'awe' : local < 640 ? 'frustrated' : 'focused';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 45% 48%, #1C140B 0%, #05070C 78%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: labReveal }}>
        <LivingLabBackdrop mode="italian1800" frame={frame} panX={panX} />

        <CameraRig
          local={local}
          frame={frame}
          keys={[
            { f: 185, x: 720, y: 530, z: 0.96 },
            { f: 600, x: 640, y: 540, z: 1.24 },
            // Lateral workbench pan rightward to Voltaic Pile
            { f: 760, x: 1120, y: 520, z: 1.14 },
            { f: 1480, x: 1160, y: 500, z: 1.16 },
            // Rack-focus pull-back onto Voltaic Pile + Electrolysis Beaker
            { f: 1640, x: 1380, y: 525, z: 1.12 },
            { f: duration, x: 1420, y: 520, z: 1.18 },
          ]}
        >
          {/* Grounded Expressive Alessandro Volta Rig behind Italian Oak Bench */}
          <VoltaRig
            pose={{
              worldX: 740,
              worldY: 160,
              chestLeanDeg: wireConnected ? -6 : local < 640 ? 6 : -3,
              breathY: Math.sin(frame * 0.05) * 2,
              headRollDeg: wireConnected ? -5 : 3,
              eyeLookX: wireConnected ? 0.65 : local < 640 ? -0.55 : 0.2,
              eyeLookY: 0.25,
              blinkAmount: frame % 165 > 158 ? 1 : 0,
              expression: voltaExpr,
            }}
            scale={0.76}
          />

          <svg width="2400" height="1080" viewBox="0 0 2400 1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
          {/* Full-width Italian Oak Workbench */}
          <rect x="-200" y="720" width="2800" height="440" fill="#1E140B" stroke="#451A03" strokeWidth="4" />

          {/* PROP 1 (x=640): Leyden Jar + Discharge Tongs (1ms flash -> dead) */}
          <g transform="translate(640, 560)">
            <rect x="-78" y="135" width="156" height="24" rx="5" fill="#451A03" />
            <rect x="-52" y="-30" width="104" height="165" rx="14" fill="rgba(56, 189, 248, 0.14)" stroke="#BAE6FD" strokeWidth="2.5" />
            <rect x="-52" y="35" width="104" height="100" rx="10" fill="#B45309" opacity="0.72" />
            <rect x="-6" y="-95" width="12" height="130" fill="#F59E0B" />
            <circle cx="0" cy="-102" r="16" fill="#FDE047" />
            {/* Curved Discharge Tongs */}
            <path
              d={`M -52,85 Q -120,-20 ${local > 340 ? -24 : -95},-95`}
              fill="none"
              stroke="#D97706"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {sparkFlash && (
              <path
                d="M -22,-98 L -14,-110 L -6,-94 L 0,-102"
                fill="none"
                stroke="#E0F2FE"
                strokeWidth="5"
                filter="drop-shadow(0 0 18px #38BDF8)"
              />
            )}
          </g>

          {/* PROP 2 (x=1160): Articulated Voltaic Pile (Copper + Brine + Zinc between 3 Glass Rods) */}
          <g transform="translate(1160, 560)">
            <rect x="-110" y="135" width="220" height="28" rx="6" fill="#3B2316" stroke="#78350F" strokeWidth="2.5" />
            {/* 3 Vertical Glass Support Rods */}
            {[-72, 0, 72].map((rx) => (
              <rect key={rx} x={rx - 4} y="-195" width="8" height="330" rx="4" fill="rgba(186, 230, 253, 0.25)" stroke="#BAE6FD" strokeWidth="1.2" />
            ))}
            {/* Stacked Alternating Discs: Copper (#D9822B) -> Brine Cloth (#38BDF8) -> Zinc (#94A3B8) */}
            {Array.from({ length: pileLayerCount }).map((_, i) => {
              const dy = 115 - i * 28;
              return (
                <g key={i} transform={`translate(0, ${dy})`}>
                  <rect x="-58" y="0" width="116" height="9" rx="3" fill="#D9822B" stroke="#F59E0B" strokeWidth="1" />
                  <rect x="-54" y="-9" width="108" height="8" rx="2" fill="#0284C7" opacity="0.65" />
                  <rect x="-58" y="-19" width="116" height="9" rx="3" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="1" />
                </g>
              );
            })}
            {/* Diegetic Wooden Base Plaque (2.5s only) */}
            <text
              x="0"
              y="198"
              textAnchor="middle"
              fill="#FDE68A"
              fontSize="26"
              fontWeight="700"
              opacity={plaqueAlpha}
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ১৮০০ · আলেসান্দ্রো ভোল্টা
            </text>
          </g>

          {/* PROP 3 (x=1590): Nicholson & Carlisle Water Electrolysis Beaker */}
          <g transform="translate(1590, 565)">
            <rect x="-95" y="-55" width="190" height="210" rx="14" fill="rgba(56, 189, 248, 0.1)" stroke="#BAE6FD" strokeWidth="3" />
            <rect x="-89" y="15" width="178" height="134" rx="10" fill="rgba(14, 165, 233, 0.2)" />
            {/* 2 Submerged Electrodes */}
            <rect x="-42" y="-25" width="10" height="135" rx="3" fill="#D9822B" />
            <rect x="32" y="-25" width="10" height="135" rx="3" fill="#94A3B8" />
            {/* Connecting Brass Wires from Voltaic Pile */}
            {wireConnected && (
              <>
                <path d="M -37,-25 C -140,-180 -280,-260 -430,-165" fill="none" stroke="#F59E0B" strokeWidth="4.5" />
                <path d="M 37,-25 C -80,175 -260,185 -430,135" fill="none" stroke="#94A3B8" strokeWidth="4.5" />
                {/* Nonstop Rising H2/O2 Micro-Bubbles */}
                {Array.from({ length: 14 }).map((_, b) => {
                  const by = 105 - ((frame * 2.4 + b * 24) % 100);
                  const bx = (b % 2 === 0 ? -37 : 37) + Math.sin(frame * 0.1 + b) * 6;
                  return <circle key={b} cx={bx} cy={by} r={b % 3 === 0 ? 4.5 : 3} fill="#E0F2FE" opacity="0.85" />;
                })}
              </>
            )}
          </g>
        </svg>
      </CameraRig>
      </div>

      {/* Spatial Geography Entry Overlay (0..245f): Rotating Globe -> Como Clouds/Rooftops -> Window Dive */}
      {globeActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 48%, #0C1B33 0%, #03060E 80%)',
            opacity: globeAlpha,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <svg
            width="1920"
            height="1080"
            viewBox="0 0 1920 1080"
            style={{ transform: `scale(${globeScale})`, transformOrigin: '960px 510px' }}
          >
            {/* Rotating 2.5D Earth Sphere */}
            <circle cx="960" cy="510" r="240" fill="#0F294A" stroke="#38BDF8" strokeWidth="3" />
            <path d="M 880,380 Q 940,350 995,410 Q 1030,470 975,540 Q 930,520 910,455 Z" fill="#1E4D3A" opacity="0.85" />
            <path d="M 790,480 Q 845,450 870,525 Q 840,610 780,585 Z" fill="#1E4D3A" opacity="0.75" />
            {/* Latitude / Longitude Arcs */}
            <ellipse cx="960" cy="510" rx="240" ry="75" fill="none" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="1.5" />
            <ellipse cx="960" cy="510" rx="110" ry="240" fill="none" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="1.5" />
            {/* Northern Italy Highlight */}
            <circle cx="960" cy="450" r="9" fill="#FBBF24" />
            <text x="960" y="425" textAnchor="middle" fill="#FDE68A" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              উত্তর ইতালি • ১৮০০
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};
