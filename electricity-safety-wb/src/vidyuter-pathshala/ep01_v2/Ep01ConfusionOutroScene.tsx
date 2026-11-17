import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';

/**
 * ACT 4: Constructive Confusion Finale & Next-Course Promise
 * - 3-Icon Visual Recap -> Spinning Indian kWh Electric Meter & 0% Phone Battery Paradox
 * - 4.5s thinking pause ring -> Episode 02 Teaser
 */
export const Ep01ConfusionOutroScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const showConfusion = local >= duration * 0.25;
  const meterSpin = (frame * 6) % 360;
  const batteryPct = Math.max(0, Math.round(ci(local, [duration * 0.35, duration * 0.65], [100, 0])));
  const pauseRatio = ci(local, [duration * 0.62, duration * 0.85], [0, 1]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050811', opacity: fadeIn, overflow: 'hidden' }}>
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 1.0, rotateY: -1.2 },
          { f: duration * 0.3, x: 0, y: 0, z: 1.08, rotateY: 0 },
          { f: duration * 0.65, x: 0, y: -20, z: 1.14, rotateY: 1.4 },
          { f: duration, x: 0, y: 0, z: 1.04, rotateY: 0 },
        ]}
      >
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080">
            <circle cx="960" cy="540" r="460" fill="rgba(244, 63, 94, 0.08)" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z1">
          <svg width="1920" height="1080">
            <rect x="220" y="770" width="1480" height="260" fill="#0F172A" />
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z2">
          {!showConfusion ? (
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
          ) : (
            <svg width="1920" height="1080">
              {/* Left: Spinning Indian kWh Electric Meter */}
              <g transform="translate(560, 520)">
                <rect x="-150" y="-175" width="300" height="350" rx="22" fill="#1E293B" stroke="#94A3B8" strokeWidth="5" />
                <rect x="-105" y="-120" width="210" height="75" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
                <text x="0" y="-72" textAnchor="middle" fill="#FBBF24" fontSize="32" fontWeight="800">kWh</text>
                <ellipse cx="0" cy="40" rx="82" ry="18" fill="#334155" stroke="#94A3B8" strokeWidth="3" />
                <circle cx={Math.cos((meterSpin * Math.PI) / 180) * 65} cy="40" r="7" fill="#EF4444" />
                <text x="0" y="235" textAnchor="middle" fill="#FDA4AF" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  বিল আসে কেন?!
                </text>
              </g>

              {/* Center: 4.5s Thinking Pause Ring */}
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

              {/* Right: Phone Battery Dropping to 0% */}
              <g transform="translate(1360, 520)">
                <rect x="-90" y="-165" width="180" height="330" rx="24" fill="#0F172A" stroke="#64748B" strokeWidth="5" />
                <rect x="-45" y="-50" width="90" height="120" rx="8" fill="none" stroke={batteryPct < 20 ? '#F43F5E' : '#10B981'} strokeWidth="4" />
                <text x="0" y="22" textAnchor="middle" fill={batteryPct < 20 ? '#F43F5E' : '#F8FAFC'} fontSize="34" fontWeight="800">
                  {batteryPct}%
                </text>
                <text x="0" y="235" textAnchor="middle" fill="#BAE6FD" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  ব্যাটারি ০% কেন?!
                </text>
              </g>
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

      <KineticWord localMs={localMs} appearMs={5800} emphasizeStartMs={6200} emphasizeEndMs={12000} removeMs={13500} text="খটকা লাগছে?" x={960} y={200} accentColor="#F43F5E" mode="SCALE_GLOW" />
    </div>
  );
};
