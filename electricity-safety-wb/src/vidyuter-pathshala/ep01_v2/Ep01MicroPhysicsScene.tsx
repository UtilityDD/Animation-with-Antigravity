import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';

/**
 * ACT 3A–3D: Electron Cloud Atom (NO Bohr rings!) + Comb/Hair/Paper Induced Polarization
 */
export const Ep01MicroPhysicsScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  const showComb = local >= duration * 0.52;
  const paperLift = ci(local, [duration * 0.7, duration * 0.92], [0, 95], EASE_OUT);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B1120', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 1.0, rotateY: -1.5 },
          { f: duration * 0.48, x: 0, y: 0, z: 1.24, rotateY: 1.5 },
          { f: duration * 0.56, x: 0, y: 0, z: 1.02, rotateY: 0 },
          { f: duration, x: 0, y: -25, z: 1.15, rotateY: -1.2 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            <circle cx="960" cy="540" r="420" fill="rgba(56, 189, 248, 0.08)" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="1920" height="1080">
            <rect x="200" y="760" width="1520" height="280" fill="#0F172A" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          {!showComb ? (
            <svg width="1920" height="1080">
              <defs>
                <radialGradient id="ep1AtomCloud" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.38" />
                  <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="960" cy="540" r="240" fill="url(#ep1AtomCloud)" />
              <circle cx="954" cy="535" r="10" fill="#F43F5E" />
              <circle cx="966" cy="545" r="10" fill="#F43F5E" />
              <circle cx="965" cy="534" r="9" fill="#94A3B8" />
              <circle cx="955" cy="546" r="9" fill="#94A3B8" />
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const a = frame * 0.055 + i * 1.047;
                const r = 135 + Math.sin(frame * 0.08 + i) * 42;
                return <circle key={i} cx={960 + Math.cos(a) * r} cy={540 + Math.sin(a * 1.1) * r * 0.85} r="8" fill="#38BDF8" />;
              })}
            </svg>
          ) : (
            <svg width="1920" height="1080">
              <g transform="translate(960, 340)">
                <rect x="-260" y="-42" width="520" height="40" rx="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />
                {[-160, -80, 0, 80, 160].map((x) => (
                  <text key={x} x={x} y="-14" textAnchor="middle" fill="#E0F2FE" fontSize="26" fontWeight="800">-</text>
                ))}
              </g>
              <g transform={`translate(960, ${690 - paperLift})`}>
                <rect x="-140" y="-65" width="280" height="130" rx="14" fill="#F2E5CE" stroke="#D97706" strokeWidth="3" />
                {[-75, 0, 75].map((px) => (
                  <circle key={`p${px}`} cx={px} cy="-28" r="13" fill="#F43F5E" />
                ))}
                {[-75, 0, 75].map((px) => (
                  <circle key={`m${px}`} cx={px} cy="32" r="13" fill="#38BDF8" />
                ))}
              </g>
            </svg>
          )}
        </DepthLayer>

        <DepthLayer plane="Z3">
          <svg width="1920" height="1080">
            <ellipse cx="1820" cy="1010" rx="140" ry="200" fill="#050811" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={580} count={24} opacity={0.75} seed={31} />
        </DepthLayer>
      </MultiplaneCameraRig>

      <KineticWord localMs={localMs} appearMs={4200} emphasizeStartMs={4500} emphasizeEndMs={7500} removeMs={8200} text="ইলেকট্রন মেঘ" x={960} y={880} accentColor="#38BDF8" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={11500} emphasizeStartMs={12000} emphasizeEndMs={15200} removeMs={15800} text="আবেশে আকর্ষণ" x={960} y={880} accentColor="#FBBF24" />
    </div>
  );
};

/**
 * ACT 3E–3F: 6A Modular Wall Switch Cutaway + 5 IN = 5 OUT Bulb Conservation + Home Conversions
 */
export const Ep01SwitchBulbScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  const switchClosed = local >= duration * 0.25 && local < duration * 0.85;
  const flow = (frame * 3.8) % 60;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B1120', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 1.0, rotateY: 1.2 },
          { f: duration * 0.35, x: -140, y: 20, z: 1.26, rotateY: 0 },
          { f: duration * 0.72, x: 160, y: -20, z: 1.32, rotateY: -1.4 },
          { f: duration, x: 0, y: 0, z: 1.06, rotateY: 0 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            <rect x="0" y="0" width="1920" height="1080" fill="#0F172A" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="1920" height="1080">
            <rect x="180" y="760" width="1560" height="280" fill="#1E293B" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          <svg width="1920" height="1080">
            {/* Copper Circuit Loop */}
            <rect x="440" y="300" width="1040" height="440" rx="28" fill="none" stroke="#D97706" strokeWidth="10" />
            {switchClosed && (
              <>
                <line x1="580" y1="265" x2="1340" y2="265" stroke="#38BDF8" strokeWidth="4" strokeDasharray="14 14" strokeDashoffset={-flow} />
                <line x1="1340" y1="775" x2="580" y2="775" stroke="#FBBF24" strokeWidth="3.5" strokeDasharray="14 14" strokeDashoffset={flow} opacity="0.8" />
              </>
            )}

            {/* 6A Modular Switch on Bottom */}
            <g transform="translate(960, 740)">
              <rect x="-70" y="-45" width="140" height="90" rx="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
              <line x1="-35" y1="0" x2={switchClosed ? 35 : 22} y2={switchClosed ? 0 : -28} stroke="#D97706" strokeWidth="8" strokeLinecap="round" />
            </g>

            {/* Bulb + 5 IN = 5 OUT Conservation Tally */}
            <g transform="translate(1480, 520)">
              <circle
                cx="0"
                cy="0"
                r="64"
                fill={switchClosed ? '#FEF08A' : '#1E293B'}
                stroke="#94A3B8"
                strokeWidth="4"
                filter={switchClosed ? 'drop-shadow(0 0 38px #FBBF24)' : undefined}
              />
              <text x="0" y="110" textAnchor="middle" fill="#6EE7B7" fontSize="34" fontWeight="800">
                5 IN = 5 OUT
              </text>
            </g>
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z3">
          <svg width="1920" height="1080">
            <rect x="-20" y="140" width="110" height="940" fill="#050811" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={580} count={24} opacity={0.75} seed={35} />
        </DepthLayer>
      </MultiplaneCameraRig>

      <KineticWord localMs={localMs} appearMs={5200} emphasizeStartMs={5600} emphasizeEndMs={9800} removeMs={10500} text="৫ IN = ৫ OUT" x={1480} y={240} accentColor="#10B981" mode="SCALE_GLOW" />
    </div>
  );
};
