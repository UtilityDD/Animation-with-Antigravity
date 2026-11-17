import React from 'react';
import { EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { CameraRig, LivingLabBackdrop } from './CameraRig';

/**
 * Stage 4A (0..1549f):
 * - 0..620f: Split Terrain — Standing Pond (স্থির) vs Flowing River turning Waterwheel (প্রবাহ)
 * - 620..1549f: Inside svg_copper_cutaway — Open Switch (random bounce) -> Battery Connected (steady net drift!)
 */
export const Stage4APondVsCopper: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 30, duration], [1, 0], EASE_INOUT);

  const pondAlpha = ci(local, [0, 24, 595, 635], [0, 1, 1, 0], EASE_INOUT);
  const copperAlpha = ci(local, [610, 650], [0, 1], EASE_OUT);
  const batteryOn = local >= 1060;
  const wheelAngle = (frame * 2.4) % 360;
  const riverShift = (frame * 3.8) % 120;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #0B1B33 0%, #050811 78%)',
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
          { f: 590, x: 960, y: 540, z: 1.06 },
          { f: 640, x: 960, y: 540, z: 1.02 },
          { f: duration, x: 1020, y: 540, z: 1.14 },
        ]}
      >
        {/* PART 1: Standing Pond (স্থির) vs Flowing River (প্রবাহ) */}
        {pondAlpha > 0.01 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: pondAlpha }}>
            {/* Left: Standing Pond */}
            <g transform="translate(500, 560)">
              <rect x="-340" y="-120" width="680" height="240" rx="34" fill="rgba(14, 165, 233, 0.14)" stroke="#38BDF8" strokeWidth="3" />
              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx={-240 + i * 68}
                  cy={Math.sin(frame * 0.08 + i) * 10}
                  r="10"
                  fill="#38BDF8"
                  opacity="0.7"
                />
              ))}
              <text x="0" y="-165" textAnchor="middle" fill="#BAE6FD" fontSize="44" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                স্থির
              </text>
            </g>

            {/* Right: Flowing River + Waterwheel */}
            <g transform="translate(1420, 560)">
              <path d="M -340,-90 L 340,-45 L 340,145 L -340,100 Z" fill="rgba(14, 165, 233, 0.2)" stroke="#38BDF8" strokeWidth="3" />
              {Array.from({ length: 7 }).map((_, i) => (
                <circle
                  key={i}
                  cx={((i * 110 + riverShift) % 620) - 310}
                  cy={((i * 110 + riverShift) % 620) * 0.07}
                  r="10"
                  fill="#E0F2FE"
                  filter="drop-shadow(0 0 8px #38BDF8)"
                />
              ))}
              {/* Waterwheel */}
              <g transform={`translate(210, 40) rotate(${wheelAngle})`}>
                <circle cx="0" cy="0" r="62" fill="none" stroke="#F59E0B" strokeWidth="5" />
                {[0, 45, 90, 135].map((a) => (
                  <line key={a} x1="-62" y1="0" x2="62" y2="0" stroke="#F59E0B" strokeWidth="4" transform={`rotate(${a})`} />
                ))}
              </g>
              <text x="0" y="-165" textAnchor="middle" fill="#FDE68A" fontSize="44" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                প্রবাহ
              </text>
            </g>
          </svg>
        )}

        {/* PART 2: Inside Copper Crystal Lattice (Open Switch -> Battery Connected) */}
        {local >= 610 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: copperAlpha }}>
            {/* Cylindrical Copper Wire Cutaway Tunnel */}
            <rect x="160" y="310" width="1600" height="460" rx="44" fill="rgba(180, 83, 9, 0.14)" stroke="#D9822B" strokeWidth="6" />
            {batteryOn && (
              <rect x="166" y="316" width="1588" height="448" rx="40" fill="rgba(56, 189, 248, 0.06)" />
            )}

            {/* Copper (+) Lattice Ions Vibrating in Fixed Rows */}
            {Array.from({ length: 18 }).map((_, i) => {
              const col = i % 6;
              const row = Math.floor(i / 6);
              const ix = 320 + col * 255 + Math.sin(frame * 0.35 + i) * 2.5;
              const iy = 415 + row * 125 + Math.cos(frame * 0.3 + i * 2) * 2.5;
              return (
                <g key={i} transform={`translate(${ix}, ${iy})`}>
                  <circle cx="0" cy="0" r="24" fill="#9F1239" stroke="#F43F5E" strokeWidth="3" />
                  <text x="0" y="8" textAnchor="middle" fill="#FFF" fontSize="26" fontWeight="800">+</text>
                </g>
              );
            })}

            {/* Free Cyan Electrons: Random Bounce vs Steady Net Drift */}
            {Array.from({ length: 20 }).map((_, i) => {
              const baseEx = 260 + ((i * 173) % 1400);
              const drift = batteryOn ? ((frame * 3.2 + i * 95) % 1480) + 220 : baseEx + Math.sin(frame * 0.15 + i * 2.1) * 55;
              const ey = 370 + ((i * 89) % 340) + Math.cos(frame * 0.18 + i * 1.7) * 34;
              return (
                <circle
                  key={`e${i}`}
                  cx={drift}
                  cy={ey}
                  r="9"
                  fill="#38BDF8"
                  filter="drop-shadow(0 0 8px #38BDF8)"
                />
              );
            })}
          </svg>
        )}
      </CameraRig>
    </div>
  );
};
