import React from 'react';
import { EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { CameraRig, LivingLabBackdrop } from './CameraRig';

/**
 * Stage 4B (0..2120f):
 * - 0..840f: Marble Pipe Paradox — 5mm push on left pops rightmost marble out INSTANTLY + rings bell!
 * - 840..1540f: Checkpoint Gate Laser Ring + Brushed-Aluminum Analog Ammeter (1 A -> 3 A spring needle)
 * - 1540..2120f: Overhead Desk Circuit (Cyan electron flow - -> + vs faint Gold conventional + -> -)
 */
export const Stage4BMarbleAndAmmeter: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 30, duration], [1, 0], EASE_INOUT);

  const p1 = ci(local, [0, 24, 810, 850], [0, 1, 1, 0], EASE_INOUT);
  const p2 = ci(local, [825, 865, 1520, 1560], [0, 1, 1, 0], EASE_INOUT);
  const p3 = ci(local, [1535, 1575], [0, 1], EASE_OUT);

  // Marble pipe piston tap (340..420f)
  const tap = ci(local, [340, 395], [0, 1], EASE_OUT);
  const bellRing = local >= 390 && local < 450 ? Math.sin((local - 390) * 0.6) * 8 : 0;

  // Ammeter needle angle: 1 A (-36 deg) -> 3 A (+18 deg)
  const highCurrent = local >= 1200;
  const needleAngle = highCurrent
    ? ci(local, [1200, 1255], [-36, 18], EASE_OUT)
    : ci(local, [900, 960], [-65, -36], EASE_OUT);
  const eSpeed = highCurrent ? 6.4 : 2.6;
  const eCount = highCurrent ? 9 : 4;
  const chevronFlow = (frame * 3.5) % 60;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #0D1E38 0%, #050811 78%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <LivingLabBackdrop mode="modern" frame={frame} />

      <CameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 960, y: 540, z: 1.0 },
          { f: 840, x: 960, y: 540, z: 1.06 },
          { f: 880, x: 960, y: 540, z: 1.04 },
          { f: 1540, x: 960, y: 540, z: 1.08 },
          { f: duration, x: 960, y: 540, z: 1.02 },
        ]}
      >
        {/* PART 1: Transparent Glass Marble Pipe + Instant Bell */}
        {p1 > 0.01 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: p1 }}>
            <rect x="-100" y="700" width="2120" height="440" fill="#0F172A" stroke="#1E293B" strokeWidth="4" />
            {/* Glass Tube */}
            <rect x="420" y="505" width="1020" height="72" rx="12" fill="rgba(56, 189, 248, 0.1)" stroke="#BAE6FD" strokeWidth="3" />
            {/* Piston Pusher on Left */}
            <g transform={`translate(${320 + tap * 58}, 541)`}>
              <rect x="-60" y="-12" width="120" height="24" rx="4" fill="#94A3B8" />
              <rect x="56" y="-26" width="18" height="52" rx="4" fill="#F59E0B" />
            </g>
            {/* Packed Glowing Glass Marbles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={i}
                cx={455 + i * 68 + tap * 54}
                cy="541"
                r="28"
                fill="#0284C7"
                stroke="#BAE6FD"
                strokeWidth="2.5"
              />
            ))}
            {/* Brass Bell on Right */}
            <g transform={`translate(1545, 520) rotate(${bellRing})`}>
              <path d="M -38,38 L -28,-22 A 28,28 0 0,1 28,-22 L 38,38 Z" fill="#F59E0B" stroke="#FDE047" strokeWidth="2.5" />
              <circle cx="0" cy="44" r="9" fill="#FDE047" />
            </g>
          </svg>
        )}

        {/* PART 2: Checkpoint Laser Ring + Analog Ammeter (1 A -> 3 A) */}
        {local >= 825 && p2 > 0.01 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: p2 }}>
            {/* Transparent Wire + Checkpoint Laser Gate on Left */}
            <g transform="translate(560, 560)">
              <rect x="-360" y="-34" width="720" height="68" rx="34" fill="rgba(56, 189, 248, 0.12)" stroke="#38BDF8" strokeWidth="3" />
              {Array.from({ length: eCount }).map((_, i) => (
                <circle
                  key={i}
                  cx={((i * (680 / eCount) + frame * eSpeed) % 680) - 340}
                  cy="0"
                  r="11"
                  fill="#38BDF8"
                  filter="drop-shadow(0 0 8px #38BDF8)"
                />
              ))}
              {/* Laser Checkpoint Ring */}
              <ellipse cx="0" cy="0" rx="18" ry="56" fill="none" stroke="#10B981" strokeWidth="6" filter="drop-shadow(0 0 12px #10B981)" />
            </g>

            {/* Brushed-Aluminum Analog Ammeter on Right */}
            <g transform="translate(1360, 540)">
              <rect x="-210" y="-210" width="420" height="420" rx="32" fill="#1E293B" stroke="#94A3B8" strokeWidth="6" />
              <circle cx="0" cy="15" r="155" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="4" />
              <path d="M -110,60 A 125,125 0 0,1 110,60" fill="none" stroke="#334155" strokeWidth="3" />
              {['0', '1', '2', '3', '4', '5'].map((lbl, idx) => {
                const a = (-65 + idx * 26) * (Math.PI / 180) - Math.PI / 2;
                return (
                  <text key={lbl} x={Math.cos(a) * 102} y={15 + Math.sin(a) * 102} textAnchor="middle" fill="#0F172A" fontSize="24" fontWeight="800">
                    {lbl}
                  </text>
                );
              })}
              <text x="0" y="95" textAnchor="middle" fill="#0284C7" fontSize="34" fontWeight="800">
                {highCurrent ? '3 A' : '1 A'}
              </text>
              {/* Spring Needle */}
              <g transform={`translate(0, 45) rotate(${needleAngle})`}>
                <polygon points="0,-130 -6,12 6,12" fill="#EF4444" />
                <circle cx="0" cy="0" r="12" fill="#0F172A" />
              </g>
            </g>
          </svg>
        )}

        {/* PART 3: Clean Overhead Circuit (Electron Flow - -> + vs Conventional + -> -) */}
        {local >= 1535 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: p3 }}>
            <rect x="420" y="310" width="1080" height="460" rx="28" fill="none" stroke="#D97706" strokeWidth="10" />
            {/* Top: Cyan Electron Flow (- -> +) */}
            <line x1="560" y1="275" x2="1360" y2="275" stroke="#38BDF8" strokeWidth="4" strokeDasharray="16 14" strokeDashoffset={-chevronFlow} />
            <text x="960" y="245" textAnchor="middle" fill="#BAE6FD" fontSize="26" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              ইলেকট্রন প্রবাহ (- → +)
            </text>
            {/* Bottom: Faint Gold Conventional Current (+ -> -) */}
            <line x1="1360" y1="815" x2="560" y2="815" stroke="#FBBF24" strokeWidth="3.5" strokeDasharray="14 14" strokeDashoffset={chevronFlow} opacity="0.75" />
            <text x="960" y="860" textAnchor="middle" fill="#FDE68A" fontSize="26" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              প্রচলিত প্রবাহ (+ → -, ১৮২০)
            </text>
            {/* Battery + Bulb */}
            <rect x="380" y="470" width="80" height="140" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="4" />
            <circle cx="1500" cy="540" r="48" fill="#FEF08A" filter="drop-shadow(0 0 28px #FBBF24)" />
          </svg>
        )}
      </CameraRig>
    </div>
  );
};
