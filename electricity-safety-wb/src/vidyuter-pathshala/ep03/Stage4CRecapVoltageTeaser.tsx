import React from 'react';
import { EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { CameraRig, LivingLabBackdrop } from './CameraRig';

/**
 * Stage 4C (0..1079f): Visual Recap (3 moving icons) + Episode 04 Voltage Teaser (1.5V dim vs 9V bright)
 */
export const Stage4CRecapVoltageTeaser: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const recapAlpha = ci(local, [0, 24, 510, 550], [0, 1, 1, 0], EASE_INOUT);
  const teaserAlpha = ci(local, [525, 570], [0, 1], EASE_OUT);
  const flow = (frame * 3.8) % 60;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #0F1D38 0%, #050811 78%)',
        opacity: fadeIn,
        overflow: 'hidden',
      }}
    >
      <LivingLabBackdrop mode="modern" frame={frame} />

      <CameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 960, y: 540, z: 1.0 },
          { f: 520, x: 960, y: 540, z: 1.05 },
          { f: 580, x: 960, y: 540, z: 1.02 },
          { f: duration, x: 960, y: 540, z: 1.18 },
        ]}
      >
        {/* PART 1: 3 Moving Visual Icons (Max 2 words each!) */}
        {recapAlpha > 0.01 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: recapAlpha }}>
            {[
              { x: 460, label: 'তড়িৎ প্রবাহ', color: '#38BDF8' },
              { x: 960, label: 'তাৎক্ষণিক সংকেত', color: '#10B981' },
              { x: 1460, label: 'অ্যাম্পিয়ার', color: '#FBBF24' },
            ].map((item, idx) => (
              <g key={item.label} transform={`translate(${item.x}, 520)`}>
                <circle cx="0" cy="0" r="105" fill="rgba(15, 23, 42, 0.85)" stroke={item.color} strokeWidth="4" />
                {idx === 0 && (
                  <line x1="-60" y1="0" x2="60" y2="0" stroke="#38BDF8" strokeWidth="6" strokeDasharray="12 10" strokeDashoffset={-flow} />
                )}
                {idx === 1 && (
                  <circle cx="0" cy="0" r={24 + Math.sin(frame * 0.14) * 8} fill="#10B981" />
                )}
                {idx === 2 && (
                  <line x1="0" y1="20" x2={Math.sin(frame * 0.08) * 42} y2="-52" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
                )}
                <text x="0" y="165" textAnchor="middle" fill="#F8FAFC" fontSize="34" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  {item.label}
                </text>
              </g>
            ))}
          </svg>
        )}

        {/* PART 2: Episode 04 Teaser — 1.5V Dim vs 9V Blazing */}
        {local >= 525 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: teaserAlpha }}>
            {/* Left: 1.5 V Dim Bulb */}
            <g transform="translate(620, 520)">
              <rect x="-70" y="-110" width="140" height="220" rx="18" fill="#1E293B" stroke="#94A3B8" strokeWidth="3" />
              <text x="0" y="10" textAnchor="middle" fill="#BAE6FD" fontSize="34" fontWeight="800">1.5 V</text>
              <circle cx="0" cy="-190" r="46" fill="#FDE047" opacity="0.28" />
            </g>
            {/* Right: 9 V Blazing Bulb */}
            <g transform="translate(1300, 520)">
              <rect x="-85" y="-120" width="170" height="240" rx="18" fill="#1E293B" stroke="#F59E0B" strokeWidth="4" />
              <text x="0" y="10" textAnchor="middle" fill="#FDE68A" fontSize="38" fontWeight="800">9 V</text>
              <circle cx="0" cy="-190" r="56" fill="#FEF08A" filter="drop-shadow(0 0 42px #FBBF24)" />
            </g>
            <text x="960" y="835" textAnchor="middle" fill="#FDE68A" fontSize="40" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              পরবর্তী পর্ব ০৪ • ভোল্টেজ ও বিভব প্রভেদ
            </text>
          </svg>
        )}
      </CameraRig>
    </div>
  );
};
