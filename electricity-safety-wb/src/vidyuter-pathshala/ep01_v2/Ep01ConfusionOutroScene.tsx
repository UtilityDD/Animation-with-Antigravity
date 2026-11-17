import React from 'react';
import { DustMotes, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';

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
  const showConfusion = local >= duration * 0.24 && local < duration * 0.78;
  const showEp02Teaser = local >= duration * 0.78;
  const meterSpin = (frame * 6) % 360;
  const kwhNum = (428.0 + (local / duration) * 2.4).toFixed(1);
  const batteryPct = Math.max(0, Math.round(ci(local, [duration * 0.35, duration * 0.65], [100, 0])));
  const pauseRatio = ci(local, [duration * 0.56, duration * 0.76], [0, 1]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050811', opacity: fadeIn, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 1.0, rotateY: -1.2 },
          { f: duration * 0.3, x: 0, y: 0, z: 1.08, rotateY: 0 },
          { f: duration * 0.72, x: 0, y: -20, z: 1.14, rotateY: 1.4 },
          { f: duration, x: 0, y: 0, z: 1.06, rotateY: 0 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            <circle cx="960" cy="540" r="460" fill={showEp02Teaser ? 'rgba(56, 189, 248, 0.09)' : 'rgba(244, 63, 94, 0.08)'} />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="1920" height="1080">
            <rect x="220" y="770" width="1480" height="260" fill="#0F172A" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          {!showConfusion && !showEp02Teaser && (
            <svg width="1920" height="1080">
              {[
                { x: 480, label: 'বৈদ্যুতিক চার্জ', c: '#F43F5E' },
                { x: 960, label: 'স্থির তড়িৎ', c: '#38BDF8' },
                { x: 1440, label: 'তড়িৎ প্রবাহ', c: '#FBBF24' },
              ].map((it) => (
                <g key={it.label} transform={`translate(${it.x}, 520)`}>
                  <circle cx="0" cy="0" r="95" fill="rgba(15,23,42,0.85)" stroke={it.c} strokeWidth="4" />
                  <text x="0" y="155" textAnchor="middle" fill="#F8FAFC" fontSize="32" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                    {it.label}
                  </text>
                </g>
              ))}
            </svg>
          )}

          {showConfusion && (
            <svg width="1920" height="1080">
              <g transform="translate(560, 520)">
                <rect x="-155" y="-185" width="310" height="370" rx="22" fill="#1E293B" stroke="#94A3B8" strokeWidth="5" />
                <rect x="-132" y="-160" width="264" height="285" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
                <rect x="-105" y="-132" width="210" height="82" rx="8" fill="#022C22" stroke="#10B981" strokeWidth="2.5" />
                <text x="0" y="-80" textAnchor="middle" fill="#6EE7B7" fontSize="30" fontWeight="800">{kwhNum} kWh</text>
                <circle cx="80" cy="-16" r="7" fill="#EF4444" opacity={frame % 24 < 10 ? 1 : 0.2} />
                <ellipse cx="0" cy="45" rx="86" ry="20" fill="#334155" stroke="#94A3B8" strokeWidth="3" />
                <circle cx={Math.cos((meterSpin * Math.PI) / 180) * 68} cy="45" r="7" fill="#EF4444" />
                {[-60, -20, 20, 60].map((tx) => (
                  <rect key={tx} x={tx - 8} y="140" width="16" height="38" rx="3" fill="#D97706" />
                ))}
                <text x="0" y="245" textAnchor="middle" fill="#FDA4AF" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  বিল আসে কেন?!
                </text>
              </g>

              <g transform="translate(960, 520)">
                <circle cx="0" cy="0" r="64" fill="none" stroke="#1E293B" strokeWidth="8" />
                <circle
                  cx="0"
                  cy="0"
                  r="64"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="8"
                  strokeDasharray={402}
                  strokeDashoffset={402 * (1 - pauseRatio)}
                  transform="rotate(-90)"
                />
                <text x="0" y="14" textAnchor="middle" fill="#FDE68A" fontSize="42" fontWeight="800">?</text>
              </g>

              <g transform="translate(1360, 520)">
                <rect x="-95" y="-175" width="190" height="350" rx="26" fill="#0F172A" stroke="#64748B" strokeWidth="5" />
                <rect x="-80" y="-155" width="160" height="310" rx="18" fill="#020617" />
                <rect x="-26" y="-146" width="52" height="8" rx="4" fill="#334155" />
                <rect x="-18" y="-66" width="36" height="10" rx="3" fill="#64748B" />
                <rect x="-46" y="-56" width="92" height="132" rx="10" fill="none" stroke={batteryPct < 20 ? '#F43F5E' : '#10B981'} strokeWidth="4" />
                <rect
                  x="-38"
                  y={70 - (batteryPct / 100) * 118}
                  width="76"
                  height={(batteryPct / 100) * 118}
                  rx="6"
                  fill={batteryPct < 20 ? '#F43F5E' : '#10B981'}
                  opacity="0.45"
                />
                <text x="0" y="18" textAnchor="middle" fill={batteryPct < 20 ? '#F43F5E' : '#F8FAFC'} fontSize="34" fontWeight="800">
                  {batteryPct}%
                </text>
                <text x="0" y="245" textAnchor="middle" fill="#BAE6FD" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  ব্যাটারি 0% কেন?!
                </text>
              </g>
            </svg>
          )}

          {showEp02Teaser && (
            <svg width="1920" height="1080">
              <circle cx="960" cy="460" r="150" fill="rgba(56, 189, 248, 0.16)" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="8 6" />
              <circle cx="954" cy="455" r="10" fill="#F43F5E" />
              <circle cx="966" cy="465" r="10" fill="#F43F5E" />
              {[0, 1, 2, 3].map((i) => {
                const a = frame * 0.06 + i * 1.57;
                return <circle key={i} cx={960 + Math.cos(a) * 110} cy={460 + Math.sin(a * 1.1) * 90} r="8" fill="#38BDF8" />;
              })}
              <text x="960" y="700" textAnchor="middle" fill="#FDE68A" fontSize="46" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                পরবর্তী পর্ব 02 • পরমাণু ও বৈদ্যুতিক চার্জ
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

      <VidyuterKineticTitle frame={local} startFrame={510} endFrame={1640} lines={[{ text: 'মনে খটকা লাগছে?', highlight: 'খটকা', sizePx: 66 }]} align="center" x={960} y={80} accentColor="#F43F5E" variant="spring" />
      <KineticWord localMs={localMs} appearMs={5800} emphasizeStartMs={6200} emphasizeEndMs={12000} removeMs={13500} text="পরের পর্বে উত্তর!" x={960} y={930} accentColor="#38BDF8" mode="SCALE_GLOW" />
    </div>
  );
};
