import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';

/**
 * ACT 3A–3D: Electron Cloud Atom (NO Bohr rings!) + Dry Hair/Comb/Paper Induced Polarization
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
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.42" />
                  <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="960" cy="540" r="260" fill="url(#ep1AtomCloud)" />
              <circle cx="954" cy="535" r="10" fill="#F43F5E" />
              <circle cx="966" cy="545" r="10" fill="#F43F5E" />
              <circle cx="965" cy="534" r="9" fill="#94A3B8" />
              <circle cx="955" cy="546" r="9" fill="#94A3B8" />
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const a = frame * 0.055 + i * 1.047;
                const r = 140 + Math.sin(frame * 0.08 + i) * 44;
                return <circle key={i} cx={960 + Math.cos(a) * r} cy={540 + Math.sin(a * 1.1) * r * 0.85} r="8.5" fill="#38BDF8" filter="drop-shadow(0 0 8px #38BDF8)" />;
              })}
            </svg>
          ) : (
            <svg width="1920" height="1080">
              {/* Hair Strands + Negatively Charged Comb + Induced Paper Scraps */}
              <g transform="translate(500, 520)">
                <path d="M -110,-90 Q 0,-150 110,-90 Q 130,90 85,140 Q -85,140 -110,-90 Z" fill="#292524" stroke="#57534E" strokeWidth="3" />
                <text x="0" y="18" textAnchor="middle" fill="#FDA4AF" fontSize="32" fontWeight="800">+</text>
              </g>
              <g transform="translate(1140, 360)">
                <rect x="-260" y="-42" width="520" height="40" rx="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />
                {Array.from({ length: 16 }).map((_, i) => (
                  <rect key={i} x={-240 + i * 31} y="-2" width="12" height="54" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
                ))}
                {[-160, -80, 0, 80, 160].map((x) => (
                  <text key={x} x={x} y="-14" textAnchor="middle" fill="#E0F2FE" fontSize="26" fontWeight="800">-</text>
                ))}
              </g>
              <g transform={`translate(1140, ${690 - paperLift})`}>
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

      <VidyuterKineticTitle frame={local} startFrame={20} endFrame={820} lines={[{ text: 'পরমাণু ও ইলেকট্রন মেঘ', highlight: 'ইলেকট্রন', sizePx: 62 }]} align="center" x={960} y={80} accentColor="#38BDF8" variant="spring" />
      <VidyuterKineticTitle frame={local} startFrame={860} endFrame={1640} lines={[{ text: 'আবেশে কাগজ আকর্ষণ!', highlight: 'আবেশে', sizePx: 64 }]} align="center" x={960} y={80} accentColor="#FBBF24" variant="spark" />
      <KineticWord localMs={localMs} appearMs={4200} emphasizeStartMs={4500} emphasizeEndMs={7500} removeMs={8200} text="ইলেকট্রন মেঘ" x={960} y={880} accentColor="#38BDF8" mode="SCALE_GLOW" />
    </div>
  );
};

/**
 * ACT 3E–3F: Detailed 6A Switch + Non-Overlapping 5 IN = 5 OUT Bulb Conservation + Indian Home Conversions
 */
export const Ep01SwitchBulbScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);
  const showHomeGrid = local >= duration * 0.72;
  const switchClosed = local >= duration * 0.22 && local < duration * 0.68;
  const flow = (frame * 3.8) % 60;
  const fanRot = (frame * 8) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B1120', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 1.0, rotateY: 1.2 },
          { f: duration * 0.35, x: -120, y: 15, z: 1.2, rotateY: 0 },
          { f: duration * 0.7, x: 120, y: -15, z: 1.24, rotateY: -1.2 },
          { f: duration, x: 0, y: 0, z: 1.04, rotateY: 0 },
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
          {!showHomeGrid ? (
            <svg width="1920" height="1080">
              <rect x="440" y="300" width="1040" height="440" rx="28" fill="none" stroke="#B45309" strokeWidth="14" />
              <rect x="440" y="300" width="1040" height="440" rx="28" fill="none" stroke="#F59E0B" strokeWidth="4" opacity="0.65" />

              {switchClosed && (
                <>
                  <line x1="580" y1="262" x2="1340" y2="262" stroke="#38BDF8" strokeWidth="4.5" strokeDasharray="14 14" strokeDashoffset={-flow} />
                  <line x1="1340" y1="778" x2="580" y2="778" stroke="#FBBF24" strokeWidth="3.5" strokeDasharray="14 14" strokeDashoffset={flow} opacity="0.8" />
                </>
              )}

              {/* Realistic Battery Cell */}
              <g transform="translate(440, 520)">
                <rect x="-22" y="-102" width="44" height="18" rx="4" fill="#FBBF24" />
                <rect x="-48" y="-85" width="96" height="170" rx="14" fill="#1E293B" stroke="#38BDF8" strokeWidth="3.5" />
                <text x="0" y="-42" textAnchor="middle" fill="#F43F5E" fontSize="30" fontWeight="800">+</text>
                <text x="0" y="54" textAnchor="middle" fill="#38BDF8" fontSize="34" fontWeight="800">-</text>
              </g>

              {/* 6A Modular Switch */}
              <g transform="translate(960, 740)">
                <rect x="-85" y="-55" width="170" height="110" rx="14" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3.5" />
                <rect x="-52" y="-34" width="104" height="68" rx="8" fill="#0F172A" />
                <circle cx="-36" cy="0" r="7" fill="#FBBF24" />
                <circle cx="36" cy="0" r="7" fill="#FBBF24" />
                <line x1="-36" y1="0" x2={switchClosed ? 36 : 22} y2={switchClosed ? 0 : -30} stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
              </g>

              {/* Glass Bulb + Clean Pill Badge OUTSIDE Copper Wire */}
              <g transform="translate(1480, 520)">
                <rect x="-24" y="58" width="48" height="28" rx="6" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                <circle
                  cx="0"
                  cy="0"
                  r="66"
                  fill={switchClosed ? 'rgba(254, 240, 138, 0.88)' : 'rgba(30, 41, 59, 0.7)'}
                  stroke="#BAE6FD"
                  strokeWidth="3.5"
                  filter={switchClosed ? 'drop-shadow(0 0 38px #FBBF24)' : undefined}
                />
                <path d="M -20,26 L -12,-14 L 0,4 L 12,-14 L 20,26" fill="none" stroke={switchClosed ? '#F59E0B' : '#64748B'} strokeWidth="4" />
                <g transform="translate(0, 265)">
                  <rect x="-125" y="-32" width="250" height="58" rx="14" fill="#0F172A" stroke="#10B981" strokeWidth="2.5" />
                  <text x="0" y="9" textAnchor="middle" fill="#6EE7B7" fontSize="30" fontWeight="800">
                    5 IN = 5 OUT
                  </text>
                </g>
              </g>
            </svg>
          ) : (
            <svg width="1920" height="1080">
              {[
                { x: 340, label: 'পাখা', c: '#38BDF8' },
                { x: 650, label: 'ইস্ত্রি', c: '#F43F5E' },
                { x: 960, label: 'বাল্ব', c: '#FBBF24' },
                { x: 1270, label: 'কলিং বেল', c: '#A855F7' },
                { x: 1580, label: 'জলের পাম্প', c: '#10B981' },
              ].map((app, idx) => (
                <g key={app.label} transform={`translate(${app.x}, 520)`}>
                  <circle cx="0" cy="0" r="95" fill="rgba(15, 23, 42, 0.86)" stroke={app.c} strokeWidth="3.5" />
                  {idx === 0 && (
                    <g transform={`rotate(${fanRot})`}>
                      <line x1="-55" y1="0" x2="55" y2="0" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" />
                      <line x1="0" y1="-55" x2="0" y2="55" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" />
                    </g>
                  )}
                  {idx === 1 && <path d="M -42,20 L 42,20 L 22,-22 L -32,-22 Z" fill="#F43F5E" />}
                  {idx === 2 && <circle cx="0" cy="0" r="32" fill="#FEF08A" filter="drop-shadow(0 0 18px #FBBF24)" />}
                  {idx === 3 && <path d="M -28,24 L -18,-20 A 18,18 0 0,1 18,-20 L 28,24 Z" fill="#A855F7" />}
                  {idx === 4 && <rect x="-32" y="-26" width="64" height="52" rx="8" fill="#10B981" />}
                  <text x="0" y="148" textAnchor="middle" fill="#F8FAFC" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                    {app.label}
                  </text>
                </g>
              ))}
            </svg>
          )}
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

      <VidyuterKineticTitle frame={local} startFrame={20} endFrame={1300} lines={[{ text: 'বাল্ব ইলেকট্রন খায় না!', highlight: 'খায় না!', sizePx: 62 }]} align="center" x={960} y={80} accentColor="#10B981" variant="spring" />
      <KineticWord localMs={localMs} appearMs={5200} emphasizeStartMs={5600} emphasizeEndMs={9800} removeMs={10500} text="5 IN = 5 OUT" x={1480} y={240} accentColor="#10B981" mode="SCALE_GLOW" />
    </div>
  );
};
