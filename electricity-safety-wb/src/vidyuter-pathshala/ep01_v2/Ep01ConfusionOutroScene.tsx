import React from 'react';
import { DustMotes, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import { ACT4 } from './voiceBeats';

/**
 * ACT 4: Constructive Confusion Finale & Episode 02 Teaser
 * - 0..24%: 3-Icon Visual Recap
 * - 24..76%: Spinning Indian kWh Electric Meter & 0% Phone Battery Paradox + 4.5s Thinking Ring
 * - 76..100%: Luminous Electron-Cloud Atom Episode 02 Teaser («পরমাণু ও বৈদ্যুতিক চার্জ»)
 */
export const Ep01ConfusionOutroScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);

  const showRecap = local < ACT4.bill;
  const showBillQ = local >= ACT4.bill - 12 && local < ACT4.battery + 16;
  const showBatteryQ = local >= ACT4.battery - 8 && local < ACT4.push + 16;
  const showPushQ = local >= ACT4.push - 8 && local < ACT4.reassure + 20;
  const showEp02Teaser = local >= ACT4.teaser - 12;

  const meterSpin = (frame * 7) % 360;
  const kwhNum = (428.0 + ci(local, [ACT4.bill, ACT4.battery], [0, 4.6])).toFixed(1);
  const batteryPct = Math.max(0, Math.round(ci(local, [ACT4.battery, ACT4.push - 20], [100, 0], EASE_OUT)));
  const pushWave = ((local - ACT4.push) * 0.045) % 1;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050811', opacity: fadeIn, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 0.96, rotateY: -1.2 },
          { f: ACT4.question, x: 0, y: 0, z: 1.06, rotateY: 0 },
          { f: ACT4.bill, x: -160, y: -15, z: 1.24, rotateY: 1.4 },
          { f: ACT4.battery, x: 180, y: -10, z: 1.26, rotateY: -1.4 },
          { f: ACT4.push, x: 0, y: 8, z: 1.22, rotateY: 0 },
          { f: ACT4.reassure, x: 0, y: 0, z: 1.04, rotateY: 0 },
          { f: ACT4.teaser, x: 0, y: -12, z: 1.2, rotateY: 0.6 },
          { f: duration, x: 0, y: -8, z: 1.26, rotateY: -0.4 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            <circle
              cx="960"
              cy="540"
              r="460"
              fill={showEp02Teaser ? 'rgba(56, 189, 248, 0.1)' : showRecap ? 'rgba(16, 185, 129, 0.07)' : 'rgba(244, 63, 94, 0.09)'}
            />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="1920" height="1080">
            <rect x="220" y="770" width="1480" height="260" fill="#0F172A" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          {/* BEAT 1 (0..420f): Staggered 3-Item Recap */}
          {showRecap && (
            <svg width="1920" height="1080" style={{ opacity: ci(local, [0, 18, 390, 420], [0, 1, 1, 0]) }}>
              {[
                { x: 480, label: 'বৈদ্যুতিক চার্জ', c: '#F43F5E', start: 45 },
                { x: 960, label: 'স্থির তড়িৎ', c: '#38BDF8', start: 135 },
                { x: 1440, label: 'তড়িৎ প্রবাহ', c: '#FBBF24', start: 225 },
              ].map((it, idx) => {
                const pop = ci(local, [it.start, it.start + 32], [0, 1], EASE_OUT);
                return (
                  <g key={it.label} transform={`translate(${it.x}, 520) scale(${0.7 + pop * 0.3})`} opacity={pop}>
                    <circle cx="0" cy="0" r="102" fill="rgba(15,23,42,0.9)" stroke={it.c} strokeWidth="4" />
                    {idx === 0 && (
                      <g>
                        <circle cx="0" cy="0" r="14" fill="#F43F5E" />
                        <circle cx={Math.cos(frame * 0.08) * 48} cy={Math.sin(frame * 0.08) * 48} r="9" fill="#38BDF8" filter="drop-shadow(0 0 8px #38BDF8)" />
                        <circle cx={Math.cos(frame * 0.08 + 3.14) * 48} cy={Math.sin(frame * 0.08 + 3.14) * 48} r="9" fill="#38BDF8" filter="drop-shadow(0 0 8px #38BDF8)" />
                      </g>
                    )}
                    {idx === 1 && (
                      <g>
                        <rect x="-46" y="-36" width="92" height="16" rx="5" fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.5" />
                        {[-30, -10, 10, 30].map((tx) => (
                          <rect key={tx} x={tx - 3} y="-20" width="6" height="18" rx="2" fill="#0284C7" />
                        ))}
                        <path d="M -22,6 L -6,-6 L 4,8 L 22,-4" fill="none" stroke="#E0F2FE" strokeWidth="3.5" filter="drop-shadow(0 0 8px #38BDF8)" />
                        <polygon points="-24,26 24,22 18,44 -20,42" fill="#F5EBD6" stroke="#D97706" strokeWidth="1.5" />
                      </g>
                    )}
                    {idx === 2 && (
                      <g>
                        <rect x="-44" y="-32" width="88" height="64" rx="14" fill="none" stroke="#D97706" strokeWidth="6" />
                        {[0, 1, 2, 3].map((di) => {
                          const t = ((frame * 0.02 + di * 0.25) % 1) * 4;
                          const px = t < 1 ? -44 + t * 88 : t < 2 ? 44 : t < 3 ? 44 - (t - 2) * 88 : -44;
                          const py = t < 1 ? -32 : t < 2 ? -32 + (t - 1) * 64 : t < 3 ? 32 : 32 - (t - 3) * 64;
                          return <circle key={di} cx={px} cy={py} r="6.5" fill="#FEF08A" filter="drop-shadow(0 0 8px #FBBF24)" />;
                        })}
                      </g>
                    )}
                    <text x="0" y="155" textAnchor="middle" fill="#F8FAFC" fontSize="32" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                      {it.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}

          {/* BEAT 2 (400..940f): Question 1 — Indian kWh Meter Spotlight */}
          {showBillQ && (
            <svg width="1920" height="1080" style={{ opacity: ci(local, [400, 430, 910, 940], [0, 1, 1, 0]) }}>
              <g transform="translate(760, 520)">
                <rect x="-170" y="-200" width="340" height="400" rx="24" fill="#1E293B" stroke="#94A3B8" strokeWidth="5" />
                <rect x="-145" y="-175" width="290" height="305" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
                {/* LCD kWh Display */}
                <rect x="-118" y="-145" width="236" height="88" rx="10" fill="#022C22" stroke="#10B981" strokeWidth="3" />
                <text x="0" y="-88" textAnchor="middle" fill="#6EE7B7" fontSize="34" fontWeight="800">{kwhNum} kWh</text>
                {/* Blinking 3200 imp LED */}
                <circle cx="88" cy="-22" r="8" fill="#EF4444" opacity={frame % 18 < 8 ? 1 : 0.2} filter="drop-shadow(0 0 10px #EF4444)" />
                {/* Spinning Aluminum Disc */}
                <ellipse cx="0" cy="48" rx="96" ry="22" fill="#334155" stroke="#94A3B8" strokeWidth="3" />
                <circle cx={Math.cos((meterSpin * Math.PI) / 180) * 76} cy="48" r="8" fill="#EF4444" />
                {/* Copper Terminals */}
                {[-70, -24, 24, 70].map((tx) => (
                  <rect key={tx} x={tx - 9} y="150" width="18" height="42" rx="4" fill="#D97706" />
                ))}
                {/* Pulsing Question Badge */}
                <circle cx="155" cy="-175" r={34 + Math.sin(frame * 0.14) * 3} fill="#F43F5E" filter="drop-shadow(0 0 16px #F43F5E)" />
                <text x="155" y="-162" textAnchor="middle" fill="#FFF" fontSize="42" fontWeight="800">?</text>
              </g>
            </svg>
          )}

          {/* BEAT 3 (920..1300f): Question 2 — 0% Draining Smartphone Spotlight */}
          {showBatteryQ && (
            <svg width="1920" height="1080" style={{ opacity: ci(local, [920, 950, 1270, 1300], [0, 1, 1, 0]) }}>
              <g transform={`translate(${1150 + (batteryPct === 0 ? Math.sin(frame * 1.4) * 3 : 0)}, 520)`}>
                <rect x="-110" y="-195" width="220" height="390" rx="30" fill="#0F172A" stroke={batteryPct < 20 ? '#F43F5E' : '#64748B'} strokeWidth="5" />
                <rect x="-92" y="-172" width="184" height="344" rx="20" fill="#020617" />
                <rect x="-28" y="-162" width="56" height="8" rx="4" fill="#334155" />
                {/* Battery Icon */}
                <rect x="-22" y="-76" width="44" height="12" rx="3" fill="#64748B" />
                <rect x="-54" y="-64" width="108" height="154" rx="12" fill="none" stroke={batteryPct < 20 ? '#F43F5E' : '#10B981'} strokeWidth="4.5" />
                <rect
                  x="-44"
                  y={82 - (batteryPct / 100) * 138}
                  width="88"
                  height={(batteryPct / 100) * 138}
                  rx="8"
                  fill={batteryPct < 20 ? '#F43F5E' : '#10B981'}
                  opacity="0.55"
                />
                <text x="0" y="22" textAnchor="middle" fill={batteryPct < 20 ? '#F43F5E' : '#F8FAFC'} fontSize="42" fontWeight="800">
                  {batteryPct}%
                </text>
                <circle cx="105" cy="-165" r={34 + Math.sin(frame * 0.14) * 3} fill="#FBBF24" filter="drop-shadow(0 0 16px #FBBF24)" />
                <text x="105" y="-152" textAnchor="middle" fill="#0F172A" fontSize="42" fontWeight="800">?</text>
              </g>
            </svg>
          )}

          {/* BEAT 4 (1280..1690f): Question 3 — Who Pushes the Electrons in the Wall? */}
          {showPushQ && (
            <svg width="1920" height="1080" style={{ opacity: ci(local, [1280, 1310, 1660, 1690], [0, 1, 1, 0]) }}>
              {/* Cutaway Wall Copper Wire */}
              <rect x="340" y="455" width="1240" height="90" rx="22" fill="#1E293B" stroke="#B45309" strokeWidth="6" />
              <rect x="360" y="470" width="1200" height="60" rx="14" fill="#451A03" opacity="0.6" />
              {/* Electrons waiting -> pushed by "?" force wave */}
              {Array.from({ length: 12 }).map((_, i) => {
                const ex = 430 + i * 98 + pushWave * 65;
                const ey = 500 + Math.sin(frame * 0.25 + i) * 6;
                return <circle key={i} cx={ex} cy={ey} r="13" fill="#38BDF8" filter="drop-shadow(0 0 10px #38BDF8)" />;
              })}
              {/* Giant Pulsing "?" Force Pushing from Left */}
              <g transform={`translate(${275 + pushWave * 45}, 500)`}>
                <circle cx="0" cy="0" r={54 + Math.sin(frame * 0.2) * 5} fill="rgba(251, 191, 36, 0.2)" stroke="#FBBF24" strokeWidth="4" />
                <text x="0" y="18" textAnchor="middle" fill="#FDE68A" fontSize="58" fontWeight="800">?</text>
              </g>
            </svg>
          )}

          {/* BEAT 5 (1670..2106f): Luminous EP02 Atom Teaser */}
          {showEp02Teaser && (
            <svg width="1920" height="1080" style={{ opacity: ci(local, [1670, 1710], [0, 1], EASE_OUT) }}>
              <circle cx="960" cy="460" r={165 + Math.sin(frame * 0.07) * 10} fill="rgba(56, 189, 248, 0.16)" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="8 6" />
              <circle cx="954" cy="455" r="11" fill="#F43F5E" />
              <circle cx="966" cy="465" r="11" fill="#F43F5E" />
              <circle cx="966" cy="454" r="10" fill="#94A3B8" />
              <circle cx="954" cy="466" r="10" fill="#94A3B8" />
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const a = frame * 0.065 + i * 1.047;
                return <circle key={i} cx={960 + Math.cos(a) * 120} cy={460 + Math.sin(a * 1.1) * 95} r="8.5" fill="#38BDF8" filter="drop-shadow(0 0 10px #38BDF8)" />;
              })}
              <text x="960" y="705" textAnchor="middle" fill="#FDE68A" fontSize="48" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                পর্ব 02 • পরমাণু ও বৈদ্যুতিক চার্জ
              </text>
            </svg>
          )}
        </DepthLayer>

        <DepthLayer plane="Z3">
          <svg width="1920" height="1080">
            <ellipse cx="120" cy="1020" rx="140" ry="200" fill="#050811" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={580} count={24} opacity={0.75} seed={40} />
        </DepthLayer>
      </MultiplaneCameraRig>

      {/* Word-by-Word Kinetic Bangla Questions & Beats */}
      <VidyuterKineticTitle frame={local} startFrame={ACT4.bill} endFrame={ACT4.battery} lines={[{ text: 'ইলেকট্রিক বিল আসে কেন?', highlight: 'আসে কেন?', sizePx: 64 }]} align="center" x={960} y={78} accentColor="#F43F5E" variant="spark" />
      <VidyuterKineticTitle frame={local} startFrame={ACT4.battery} endFrame={ACT4.push} lines={[{ text: 'ব্যাটারি 0% হয় কী করে?', highlight: '0%', sizePx: 64 }]} align="center" x={960} y={78} accentColor="#FBBF24" variant="spark" />
      <VidyuterKineticTitle frame={local} startFrame={ACT4.push} endFrame={ACT4.reassure} lines={[{ text: 'ইলেকট্রনকে ধাক্কাটা দিচ্ছে কে?', highlight: 'দিচ্ছে কে?', sizePx: 64 }]} align="center" x={960} y={78} accentColor="#38BDF8" variant="spring" />

      <KineticWord localMs={localMs} appearMs={(ACT4.question / 60) * 1000} emphasizeStartMs={((ACT4.question + 30) / 60) * 1000} emphasizeEndMs={(ACT4.bill / 60) * 1000} removeMs={((ACT4.bill + 20) / 60) * 1000} text="ইলেকট্রন খরচ নেই" x={1250} y={420} accentColor="#10B981" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT4.bill / 60) * 1000} emphasizeStartMs={((ACT4.bill + 24) / 60) * 1000} emphasizeEndMs={(ACT4.battery / 60) * 1000} removeMs={((ACT4.battery + 12) / 60) * 1000} text="তবুও বিল?!" x={1250} y={560} accentColor="#F43F5E" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT4.battery / 60) * 1000} emphasizeStartMs={((ACT4.battery + 24) / 60) * 1000} emphasizeEndMs={(ACT4.push / 60) * 1000} removeMs={((ACT4.push + 12) / 60) * 1000} text="0% ব্যাটারি?!" x={620} y={500} accentColor="#F43F5E" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT4.push / 60) * 1000} emphasizeStartMs={((ACT4.push + 24) / 60) * 1000} emphasizeEndMs={(ACT4.reassure / 60) * 1000} removeMs={((ACT4.reassure + 16) / 60) * 1000} text="ধাক্কা দিচ্ছে কে?" x={960} y={720} accentColor="#FBBF24" mode="SCALE_GLOW" />
      <KineticWord localMs={localMs} appearMs={(ACT4.teaser / 60) * 1000} emphasizeStartMs={((ACT4.teaser + 20) / 60) * 1000} emphasizeEndMs={((ACT4.teaser + 160) / 60) * 1000} removeMs={((ACT4.teaser + 220) / 60) * 1000} text="পর্ব 02" x={960} y={840} accentColor="#38BDF8" mode="SCALE_GLOW" />
    </div>
  );
};
