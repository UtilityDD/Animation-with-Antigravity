import React from 'react';
import { useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { DustMotes, EASE_OUT, FilmGrade, ci } from './scene1/Scene1Shared';

/**
 * Scene 08: Universal Energy Conversion 5-Card Matrix (769 frames / 10.32s)
 * Synced to scene8.mp3:
 * - 0..220f: 5 cards activate sequentially on Fan (0f), Iron (62f), Bulb (112f), Bell (148f), Motor (205f)
 * - 235..769f: Golden energy lines connect all 5 cards ("শক্তির রূপান্তর ক্ষমতা")
 */
export const EnergyConversionGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const cards = [
    { label: 'পাখায় গতি', color: '#38BDF8', trigger: 10 },
    { label: 'ইস্ত্রিতে তাপ', color: '#F43F5E', trigger: 65 },
    { label: 'বাল্বে আলো', color: '#FBBF24', trigger: 112 },
    { label: 'বেলে শব্দ', color: '#A78BFA', trigger: 148 },
    { label: 'মোটরে ঘূর্ণন', color: '#34D399', trigger: 205 },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: 'radial-gradient(ellipse at 50% 55%, #101A32 0%, #050811 78%)',
        overflow: 'hidden',
      }}
    >
      {/* 5 Animated Conversion Cards */}
      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          top: 400,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {cards.map((c, idx) => {
          const active = ci(frame, [c.trigger, c.trigger + 22], [0, 1], EASE_OUT);
          const scale = 0.85 + 0.15 * active;
          return (
            <div
              key={c.label}
              style={{
                flex: 1,
                height: 410,
                borderRadius: 24,
                background: 'rgba(15, 23, 42, 0.78)',
                border: `2px solid ${active > 0.5 ? c.color : '#1E293B'}`,
                boxShadow: active > 0.5 ? `0 0 32px ${c.color}2E` : 'none',
                transform: `translateY(${((1 - active) * 32).toFixed(1)}px) scale(${scale.toFixed(4)})`,
                opacity: active,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 28,
              }}
            >
              <svg width="160" height="160" viewBox="-80 -80 160 160" style={{ overflow: 'visible' }}>
                {idx === 0 && (
                  /* Spinning Fan Blades */
                  <g transform={`rotate(${frame * 14})`}>
                    {[0, 120, 240].map((deg) => (
                      <ellipse key={deg} cx="0" cy="-36" rx="14" ry="34" fill={c.color} transform={`rotate(${deg})`} />
                    ))}
                    <circle cx="0" cy="0" r="14" fill="#E2E8F0" />
                  </g>
                )}
                {idx === 1 && (
                  /* Heated Iron Soleplate + Thermal Waves */
                  <g>
                    <path d="M -55,20 L 45,20 L 25,-22 L -35,-22 Z" fill="#334155" stroke={c.color} strokeWidth="3" />
                    <line x1="-50" y1="28" x2="45" y2="28" stroke={c.color} strokeWidth="8" strokeLinecap="round" />
                    {[-25, 0, 25].map((wx) => (
                      <path
                        key={wx}
                        d={`M ${wx},-32 Q ${wx + Math.sin(frame * 0.25) * 6},-48 ${wx},-62`}
                        fill="none"
                        stroke="#FDA4AF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    ))}
                  </g>
                )}
                {idx === 2 && (
                  /* Glowing Bulb */
                  <g>
                    <circle cx="0" cy="-8" r={44 + Math.sin(frame * 0.2) * 5} fill={c.color} opacity="0.25" />
                    <circle cx="0" cy="-8" r="34" fill="#FEF08A" stroke={c.color} strokeWidth="3" />
                    <rect x="-14" y="26" width="28" height="22" rx="4" fill="#94A3B8" />
                  </g>
                )}
                {idx === 3 && (
                  /* Ringing Bell + Sound Waves */
                  <g>
                    <path d="M -34,18 L 34,18 L 24,-28 Q 0,-48 -24,-28 Z" fill={c.color} />
                    <circle cx="0" cy="24" r="8" fill="#E2E8F0" />
                    {[46, 62].map((r, i) => (
                      <circle
                        key={r}
                        cx="0"
                        cy="-6"
                        r={r + ((frame * 0.8 + i * 10) % 18)}
                        fill="none"
                        stroke="#C4B5FD"
                        strokeWidth="2"
                        opacity={0.6 - ((frame * 0.8 + i * 10) % 18) * 0.03}
                      />
                    ))}
                  </g>
                )}
                {idx === 4 && (
                  /* Turning Motor Gear */
                  <g transform={`rotate(${frame * 5})`}>
                    <circle cx="0" cy="0" r="42" fill="none" stroke={c.color} strokeWidth="14" strokeDasharray="16 12" />
                    <circle cx="0" cy="0" r="22" fill="#0F172A" stroke={c.color} strokeWidth="4" />
                  </g>
                )}
              </svg>
              <span
                style={{
                  fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                  fontSize: 30,
                  fontWeight: 700,
                  color: c.color,
                }}
              >
                {c.label}
              </span>
            </div>
          );
        })}
      </div>

      <DustMotes frame={frame} cx={960} cy={540} radius={460} count={28} opacity={0.45} color="#FBBF24" seed={108} />
      <FilmGrade frame={frame} vignette={0.52} />

      <VidyuterKineticTitle
        frame={frame}
        startFrame={230}
        endFrame={755}
        lines={[{ text: 'শক্তির রূপান্তর ক্ষমতা', highlight: 'রূপান্তর', sizePx: 88 }]}
        align="center"
        x={960}
        y={145}
        accentColor="#FBBF24"
        variant="spring"
      />
    </div>
  );
};
