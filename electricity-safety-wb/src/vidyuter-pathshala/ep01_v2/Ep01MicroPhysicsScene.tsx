import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import { ACT3, ACT3E } from './voiceBeats';

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
  const atomAlpha = ci(local, [0, 24, ACT3.friction - 20, ACT3.friction + 16], [0, 1, 1, 0], EASE_INOUT);
  const combStageAlpha = ci(local, [ACT3.friction - 10, ACT3.friction + 24], [0, 1], EASE_OUT);
  const combSlide = ci(local, [ACT3.friction, ACT3.friction + 80], [-420, 0], EASE_OUT);
  const combApproach = ci(local, [ACT3.friction + 70, ACT3.paper - 20], [0, 1], EASE_INOUT);
  const chargeTransfer = ci(local, [ACT3.friction + 16, ACT3.friction + 110], [0, 1], EASE_OUT);
  const polarize = ci(local, [ACT3.friction + 90, ACT3.paper - 8], [0, 1], EASE_OUT);
  const paperLift = ci(local, [ACT3.paper, ACT3.paper + 36, Math.min(duration - 8, ACT3.paper + 90)], [0, 0.2, 1], EASE_OUT);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B1120', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 0.92, rotateY: -1.4 },
          { f: ACT3.intoAtom, x: 0, y: -8, z: 1.18, rotateY: -0.4 },
          { f: ACT3.nucleus, x: 0, y: 0, z: 1.46, rotateY: 0.3 },
          { f: ACT3.cloud, x: 0, y: 6, z: 1.38, rotateY: -0.5 },
          { f: ACT3.friction, x: -180, y: 16, z: 1.22, rotateY: 1.0 },
          { f: ACT3.paper, x: 90, y: 48, z: 1.4, rotateY: -0.6 },
          { f: duration, x: 40, y: 12, z: 1.16, rotateY: 0 },
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
          {atomAlpha > 0.01 && (
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: atomAlpha }}>
              <defs>
                <radialGradient id="ep1AtomCloud" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.48" />
                  <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="960" cy="540" r={270 + Math.sin(frame * 0.06) * 12} fill="url(#ep1AtomCloud)" />
              <circle cx="960" cy="540" r="185" fill="none" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="2" strokeDasharray="10 12" />
              {/* Clustered Nucleus */}
              {[
                { x: -7, y: -6, c: '#F43F5E' },
                { x: 7, y: 6, c: '#F43F5E' },
                { x: 6, y: -7, c: '#94A3B8' },
                { x: -6, y: 7, c: '#94A3B8' },
              ].map((n, idx) => (
                <circle key={idx} cx={960 + n.x} cy={540 + n.y} r="10.5" fill={n.c} stroke="#0F172A" strokeWidth="1.5" />
              ))}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const a = frame * 0.055 + i * 1.047;
                const r = 140 + Math.sin(frame * 0.08 + i) * 44;
                return <circle key={i} cx={960 + Math.cos(a) * r} cy={540 + Math.sin(a * 1.1) * r * 0.85} r="8.5" fill="#38BDF8" filter="drop-shadow(0 0 10px #38BDF8)" />;
              })}
            </svg>
          )}

          {combStageAlpha > 0.01 && (
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: combStageAlpha, overflow: 'visible' }}>
              <defs>
                <linearGradient id="combBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
              </defs>

              {/* Detailed Layered Hair Strands (Frizzing Upward as Charges Leave) */}
              <g transform="translate(460, 520)">
                <path d="M -120,-80 Q 0,-160 120,-80 Q 138,95 90,150 Q -90,150 -120,-80 Z" fill="#1C1917" stroke="#44403C" strokeWidth="3" />
                {[-75, -45, -15, 15, 45, 75].map((hx, idx) => {
                  const frizz = chargeTransfer * (18 + (idx % 2) * 14);
                  return (
                    <path
                      key={hx}
                      d={`M ${hx},-65 Q ${hx * 1.2},${-110 - frizz} ${hx * 1.45},${-135 - frizz * 1.4 + Math.sin(frame * 0.08 + idx) * 4}`}
                      fill="none"
                      stroke="#292524"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  );
                })}
                {[-40, 0, 40].map((px, i) => (
                  <g key={px} transform={`translate(${px}, ${-30 + i * 24})`} opacity={chargeTransfer}>
                    <circle cx="0" cy="0" r="14" fill="rgba(244, 63, 94, 0.25)" stroke="#FDA4AF" strokeWidth="1.5" />
                    <text x="0" y="6" textAnchor="middle" fill="#FDA4AF" fontSize="22" fontWeight="800">+</text>
                  </g>
                ))}
              </g>

              {/* Hopping Electrons with Micro-Sparks (Hair -> Comb) */}
              {chargeTransfer > 0.05 && chargeTransfer < 0.98 && (
                <g>
                  {[-30, 0, 30].map((dy, i) => {
                    const hop = (chargeTransfer * 1.4 - i * 0.15) % 1;
                    return (
                      <circle
                        key={i}
                        cx={610 + hop * 280}
                        cy={440 + dy - Math.sin(hop * Math.PI) * 55}
                        r="7"
                        fill="#38BDF8"
                        filter="drop-shadow(0 0 8px #38BDF8)"
                      />
                    );
                  })}
                  <path d="M 680,415 L 705,392 L 722,418 L 748,395" fill="none" stroke="#E0F2FE" strokeWidth="3.5" filter="drop-shadow(0 0 10px #38BDF8)" />
                </g>
              )}

              {/* Detailed Glossy Comb Sliding In & Descending Toward Paper Scraps */}
              <g transform={`translate(${1150 + combSlide}, ${340 + combApproach * 125})`}>
                <rect x="-265" y="-46" width="530" height="44" rx="14" fill="url(#combBodyGrad)" stroke="#7DD3FC" strokeWidth="2.5" />
                <rect x="-245" y="-38" width="490" height="10" rx="5" fill="#E0F2FE" opacity="0.28" />
                {Array.from({ length: 16 }).map((_, i) => (
                  <rect key={i} x={-242 + i * 31.5} y="-2" width="12" height="58" rx="4" fill="url(#combBodyGrad)" stroke="#7DD3FC" strokeWidth="1.2" />
                ))}
                {[-165, -82, 0, 82, 165].map((x) => (
                  <g key={x} transform={`translate(${x}, -24)`} opacity={chargeTransfer}>
                    <circle cx="0" cy="0" r="12" fill="rgba(14, 165, 233, 0.35)" />
                    <text x="0" y="7" textAnchor="middle" fill="#E0F2FE" fontSize="24" fontWeight="800">-</text>
                  </g>
                ))}
              </g>

              {/* Curved Electric Field Attraction Arcs */}
              {polarize > 0.25 && (
                <g opacity={polarize * (1 - paperLift * 0.4)}>
                  {[-120, 0, 120].map((fx, i) => (
                    <path
                      key={i}
                      d={`M ${1150 + fx},${520} Q ${1150 + fx * 0.85},600 ${1150 + fx},${675 - paperLift * 105}`}
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth="2.2"
                      strokeDasharray="8 8"
                      strokeDashoffset={-(frame * 1.4) % 32}
                    />
                  ))}
                </g>
              )}

              {/* 3 Torn-Edge Paper Scraps with Real-Time Charge Polarization & Lift */}
              {[
                { ox: -155, oy: 15, rot: -14, stagger: 0 },
                { ox: 0, oy: 0, rot: 8, stagger: 0.14 },
                { ox: 155, oy: 18, rot: -10, stagger: 0.28 },
              ].map((scrap, idx) => {
                const liftT = Math.max(0, Math.min(1, paperLift * 1.35 - scrap.stagger));
                const py = 720 + scrap.oy - liftT * 155;
                const pRot = scrap.rot * (1 - liftT * 0.65) + Math.sin(frame * 0.1 + idx) * 3 * liftT;
                const plusShift = polarize * 18;
                return (
                  <g key={idx} transform={`translate(${1150 + scrap.ox}, ${py}) rotate(${pRot})`}>
                    <path
                      d="M -62,-36 L -18,-42 L 24,-34 L 64,-38 L 58,0 L 66,36 L 12,42 L -32,34 L -64,38 L -56,2 Z"
                      fill="#F5EBD6"
                      stroke="#D97706"
                      strokeWidth="2.5"
                    />
                    <circle cx="-20" cy={-8 - plusShift} r="9" fill="#F43F5E" />
                    <circle cx="20" cy={-8 - plusShift} r="9" fill="#F43F5E" />
                    <circle cx="-20" cy={10 + plusShift} r="9" fill="#38BDF8" />
                    <circle cx="20" cy={10 + plusShift} r="9" fill="#38BDF8" />
                  </g>
                );
              })}
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

      <VidyuterKineticTitle frame={local} startFrame={ACT3.intoAtom} endFrame={ACT3.friction - 12} lines={[{ text: 'পরমাণু ও ইলেকট্রন মেঘ', highlight: 'ইলেকট্রন', sizePx: 62 }]} align="center" x={960} y={78} accentColor="#38BDF8" variant="spring" />
      <VidyuterKineticTitle frame={local} startFrame={ACT3.friction} endFrame={duration - 24} lines={[{ text: 'আবেশে কাগজ আকর্ষণ!', highlight: 'আবেশে', sizePx: 64 }]} align="center" x={960} y={78} accentColor="#FBBF24" variant="spark" />
      <KineticWord localMs={localMs} appearMs={800} emphasizeStartMs={1000} emphasizeEndMs={2400} removeMs={2800} text="উপস্থিতি" x={520} y={870} accentColor="#F43F5E" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={2500} emphasizeStartMs={2700} emphasizeEndMs={4200} removeMs={4600} text="ক্রিয়া" x={960} y={870} accentColor="#FBBF24" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={4300} emphasizeStartMs={4500} emphasizeEndMs={6000} removeMs={6400} text="গতি" x={1400} y={870} accentColor="#38BDF8" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT3.nucleus / 60) * 1000} emphasizeStartMs={((ACT3.nucleus + 20) / 60) * 1000} emphasizeEndMs={(ACT3.cloud / 60) * 1000} removeMs={((ACT3.cloud + 40) / 60) * 1000} text="প্রোটন + নিউট্রন" x={960} y={870} accentColor="#F43F5E" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT3.cloud / 60) * 1000} emphasizeStartMs={((ACT3.cloud + 24) / 60) * 1000} emphasizeEndMs={(ACT3.friction / 60) * 1000} removeMs={((ACT3.friction + 30) / 60) * 1000} text="ইলেকট্রন মেঘ" x={960} y={870} accentColor="#38BDF8" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT3.friction / 60) * 1000} emphasizeStartMs={((ACT3.friction + 30) / 60) * 1000} emphasizeEndMs={(ACT3.paper / 60) * 1000} removeMs={((ACT3.paper + 10) / 60) * 1000} text="আবেশ" x={760} y={870} accentColor="#FBBF24" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT3.paper / 60) * 1000} emphasizeStartMs={((ACT3.paper + 16) / 60) * 1000} emphasizeEndMs={((ACT3.paper + 80) / 60) * 1000} removeMs={((ACT3.paper + 110) / 60) * 1000} text="লাফিয়ে ওঠে!" x={1180} y={870} accentColor="#38BDF8" mode="SCALE_GLOW" />
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
  const showHomeGrid = local >= ACT3E.fan;
  const switchFrame = ACT3E.click;
  const switchClosed = local >= switchFrame;
  const rockerT = local < switchFrame - 12
    ? 0
    : ci(local, [switchFrame - 12, switchFrame + 8, switchFrame + 20], [0, 1.12, 1], EASE_OUT);
  const waveT = switchClosed ? ci(local, [ACT3E.flow, ACT3E.flow + 50], [0, 1], EASE_OUT) : 0;
  const bulbHeat = switchClosed ? ci(local, [ACT3E.flow + 8, ACT3E.conserve + 40], [0, 1], EASE_OUT) : 0;
  const filamentColor =
    bulbHeat < 0.16 ? '#475569' :
    bulbHeat < 0.38 ? '#9F1239' :
    bulbHeat < 0.58 ? '#EA580C' :
    bulbHeat < 0.8 ? '#FDBA74' : '#FEF08A';
  const driftOffset = switchClosed ? (local - switchFrame) * 1.15 : 0;
  const fanRot = (frame * 8) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0B1120', opacity: fadeIn * fadeOut, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        focusIndex={2}
        defocusBoost={waveT > 0.04 && waveT < 0.96 ? 5 : 0}
        keys={[
          { f: 0, x: 0, y: 170, z: 1.42, rotateY: 1.2 },
          { f: switchFrame - 10, x: 0, y: 170, z: 1.48, rotateY: 0 },
          { f: switchFrame + 55, x: 250, y: 20, z: 1.28, rotateY: -1.4 },
          { f: ACT3E.notEaten, x: 290, y: -10, z: 1.34, rotateY: -0.6 },
          { f: ACT3E.fan, x: 0, y: 0, z: 1.02, rotateY: 0 },
          { f: duration, x: 0, y: 0, z: 1.08, rotateY: 0.8 },
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
            <svg width="1920" height="1080" style={{ overflow: 'visible' }}>
              {/* Cutaway Copper Conduit */}
              <rect x="440" y="300" width="1040" height="440" rx="28" fill="none" stroke="#78350F" strokeWidth="18" />
              <rect x="440" y="300" width="1040" height="440" rx="28" fill="none" stroke="#D97706" strokeWidth="8" opacity="0.82" />

              {/* Free Electrons: Jittering in place when open -> Drifting steadily when closed */}
              {Array.from({ length: 14 }).map((_, i) => {
                const jitterX = !switchClosed ? Math.sin(frame * 0.45 + i * 1.9) * 5.5 : 0;
                const jitterY = !switchClosed ? Math.cos(frame * 0.52 + i * 2.3) * 3.5 : 0;
                const topX = 520 + ((i * 70 + driftOffset) % 900) + jitterX;
                const botX = 1420 - ((i * 70 + driftOffset) % 900) - jitterX;
                return (
                  <g key={i}>
                    <circle cx={topX} cy={300 + jitterY} r="6.5" fill="#38BDF8" filter="drop-shadow(0 0 6px #38BDF8)" />
                    <circle cx={botX} cy={740 - jitterY} r="6.5" fill="#38BDF8" filter="drop-shadow(0 0 6px #38BDF8)" />
                  </g>
                );
              })}

              {/* Fast Luminous Energy Wavefront Racing from Switch -> Bulb */}
              {switchClosed && waveT < 0.99 && (
                <g>
                  <circle
                    cx={960 + waveT * 520 - 26}
                    cy={(waveT < 0.65 ? 740 : 740 - ((waveT - 0.65) / 0.35) * 220) + 4}
                    r="11"
                    fill="#FDBA74"
                    opacity={(1 - waveT) * 0.45}
                  />
                  <circle
                    cx={960 + waveT * 520}
                    cy={waveT < 0.65 ? 740 : 740 - ((waveT - 0.65) / 0.35) * 220}
                    r="18"
                    fill="#FEF08A"
                    opacity={1 - waveT * 0.5}
                    filter="drop-shadow(0 0 22px #FBBF24)"
                  />
                </g>
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
                <line x1="-36" y1="0" x2={22 + 14 * rockerT} y2={-30 + 30 * rockerT} stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
                <ellipse cx={-6 + Math.sin(local * 0.01) * -4} cy="-18" rx="16" ry="5" fill="#FFFFFF" opacity="0.18" />
              </g>

              {/* Detailed Glass Bulb with Coiled Tungsten Filament Heating Up */}
              <g transform="translate(1480, 520)">
                {bulbHeat > 0.05 && (
                  <circle cx="0" cy="-10" r={120 + bulbHeat * 75} fill="rgba(254, 240, 138, 0.28)" opacity={bulbHeat} />
                )}
                <rect x="-26" y="58" width="52" height="30" rx="6" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                <path d="M -38,56 C -68,36 -74,-18 -54,-52 C -32,-88 32,-88 54,-52 C 74,-18 68,36 38,56 Z" fill={bulbHeat < 0.12 ? 'rgba(30, 41, 59, 0.68)' : bulbHeat < 0.45 ? `rgba(159, 18, 57, ${0.2 + bulbHeat * 0.45})` : `rgba(254, 240, 138, ${0.18 + bulbHeat * 0.7})`} stroke={bulbHeat > 0.7 ? '#FDE68A' : '#BAE6FD'} strokeWidth="3.5" />
                {/* Glass Stem & Lead-in Wires */}
                <line x1="-18" y1="54" x2="-16" y2="-8" stroke="#94A3B8" strokeWidth="3" />
                <line x1="18" y1="54" x2="16" y2="-8" stroke="#94A3B8" strokeWidth="3" />
                {/* Coiled Tungsten Filament */}
                <path
                  d="M -16,-8 Q -10,-28 -4,-8 Q 0,-28 4,-8 Q 10,-28 16,-8"
                  fill="none"
                  stroke={filamentColor}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  filter={bulbHeat > 0.2 ? 'drop-shadow(0 0 18px #FBBF24)' : undefined}
                />
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
              ].map((app, idx) => {
                const appearAt = [ACT3E.fan, ACT3E.iron, ACT3E.fan, ACT3E.bell, ACT3E.pump];
                const pop = ci(local, [appearAt[idx], appearAt[idx] + 18], [0, 1], EASE_OUT);
                const heroSlot = local < ACT3E.iron ? 0 : local < ACT3E.bell ? 1 : local < ACT3E.pump ? 3 : 4;
                const dim = idx === heroSlot ? 1 : 0.34;
                return (
                  <g key={app.label} transform={`translate(${app.x}, 520) scale(${0.72 + pop * (idx === heroSlot ? 0.32 : 0.16)})`} opacity={pop * dim}>
                    <circle cx="0" cy="0" r="98" fill="rgba(15, 23, 42, 0.88)" stroke={app.c} strokeWidth="3.5" />
                    {idx === 0 && (
                      <g transform={`rotate(${fanRot})`}>
                        {[0, 120, 240].map((deg) => (
                          <path key={deg} d="M 0,0 L -10,-58 A 14,14 0 0,1 10,-58 Z" fill="#38BDF8" transform={`rotate(${deg})`} />
                        ))}
                        <circle cx="0" cy="0" r="12" fill="#E0F2FE" />
                      </g>
                    )}
                    {idx === 1 && (
                      <g>
                        <path d="M -46,20 L 46,20 L 24,-22 L -32,-22 Z" fill="#F43F5E" stroke="#FDA4AF" strokeWidth="2" />
                        <path d="M -26,-22 L -20,-36 L 14,-36 L 18,-22" fill="none" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
                        {[-18, 0, 18].map((sx, sIdx) => (
                          <path key={sx} d={`M ${sx},30 Q ${sx + Math.sin(frame * 0.25 + sIdx) * 5},42 ${sx},52`} fill="none" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
                        ))}
                      </g>
                    )}
                    {idx === 2 && (
                      <g>
                        <circle cx="0" cy="-4" r={34 + Math.sin(frame * 0.16) * 3} fill="#FEF08A" filter="drop-shadow(0 0 20px #FBBF24)" />
                        <rect x="-12" y="28" width="24" height="14" rx="4" fill="#94A3B8" />
                      </g>
                    )}
                    {idx === 3 && (
                      <g transform={`rotate(${Math.sin(frame * 0.9) * 8})`}>
                        <path d="M -32,20 L -20,-24 A 20,20 0 0,1 20,-24 L 32,20 Z" fill="#A855F7" stroke="#E9D5FF" strokeWidth="2" />
                        <circle cx={Math.sin(frame * 0.9) * 14} cy="30" r="8" fill="#FBBF24" />
                      </g>
                    )}
                    {idx === 4 && (
                      <g>
                        <rect x="-34" y="-24" width="68" height="48" rx="10" fill="#065F46" stroke="#10B981" strokeWidth="3" />
                        <g transform={`rotate(${-fanRot * 0.8})`}>
                          <line x1="-18" y1="0" x2="18" y2="0" stroke="#6EE7B7" strokeWidth="5" strokeLinecap="round" />
                          <line x1="0" y1="-18" x2="0" y2="18" stroke="#6EE7B7" strokeWidth="5" strokeLinecap="round" />
                        </g>
                        <circle cx={38 + ((frame * 2) % 24)} cy="-14" r="5" fill="#38BDF8" />
                      </g>
                    )}
                    <text x="0" y="150" textAnchor="middle" fill="#F8FAFC" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                      {app.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </DepthLayer>

        <DepthLayer plane="Z3" opacityOverride={0.78}>
          <svg width="1920" height="1080">
            <path d="M 0,0 L 120,0 C 70,220 110,520 48,1080 L 0,1080 Z" fill="#050811" />
            <ellipse cx="960" cy="980" rx="520" ry="78" fill="#020617" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={580} count={24} opacity={0.75} seed={35} />
        </DepthLayer>
      </MultiplaneCameraRig>

      <VidyuterKineticTitle frame={local} startFrame={ACT3E.notEaten} endFrame={ACT3E.fan - 8} lines={[{ text: 'বাল্ব ইলেকট্রন খায় না!', highlight: 'খায় না!', sizePx: 62 }]} align="center" x={960} y={80} accentColor="#10B981" variant="spring" />
      <KineticWord localMs={localMs} appearMs={(ACT3E.jitter / 60) * 1000} emphasizeStartMs={((ACT3E.jitter + 20) / 60) * 1000} emphasizeEndMs={(ACT3E.click / 60) * 1000} removeMs={((ACT3E.click + 20) / 60) * 1000} text="জায়গায় কাঁপছে" x={960} y={900} accentColor="#38BDF8" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT3E.flow / 60) * 1000} emphasizeStartMs={((ACT3E.flow + 20) / 60) * 1000} emphasizeEndMs={(ACT3E.conserve / 60) * 1000} removeMs={((ACT3E.conserve + 30) / 60) * 1000} text="একমুখী প্রবাহ" x={960} y={900} accentColor="#FBBF24" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT3E.conserve / 60) * 1000} emphasizeStartMs={((ACT3E.conserve + 24) / 60) * 1000} emphasizeEndMs={(ACT3E.notEaten / 60) * 1000} removeMs={((ACT3E.notEaten + 20) / 60) * 1000} text="5 ঢোকে = 5 বেরোয়" x={1420} y={240} accentColor="#10B981" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT3E.notEaten / 60) * 1000} emphasizeStartMs={((ACT3E.notEaten + 20) / 60) * 1000} emphasizeEndMs={(ACT3E.fan / 60) * 1000} removeMs={((ACT3E.fan + 10) / 60) * 1000} text="5 IN = 5 OUT" x={1420} y={240} accentColor="#10B981" mode="SCALE_GLOW" />
    </div>
  );
};
