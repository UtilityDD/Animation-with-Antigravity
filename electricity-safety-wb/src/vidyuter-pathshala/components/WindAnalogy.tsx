import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';

export const WindAnalogy: React.FC = () => {
  const frame = useCurrentFrame();

  // Wind flutter wave
  const leafWave = Math.sin(frame * 0.12) * 8;
  const windOffset = (frame * 6) % 300;

  return (
    <div
      style={{
        display: 'flex',
        gap: 36,
        width: 1400,
        height: 520,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* LEFT CARD: THE WIND ANALOGY */}
      <div
        style={{
          flex: 1,
          height: '100%',
          background: THEME.colors.bgCard,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          borderRadius: 24,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 26, fontWeight: 700, color: THEME.colors.brandCyan }}>
          বাতাসের অদৃশ্য প্রভাব (Wind)
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 14, color: THEME.colors.textMuted, marginBottom: 16 }}>
          We see the rustling leaves, not the air itself
        </div>

        <svg width="420" height="280" viewBox="0 0 420 280">
          {/* Flowing Wind Streamlines */}
          {[60, 110, 160, 210].map((y, idx) => (
            <path
              key={y}
              d={`M${-100 + ((windOffset + idx * 70) % 520)} ${y} Q${-50 + ((windOffset + idx * 70) % 520)} ${y - 15} ${0 + ((windOffset + idx * 70) % 520)} ${y} T${100 + ((windOffset + idx * 70) % 520)} ${y}`}
              fill="none"
              stroke="rgba(56, 189, 248, 0.4)"
              strokeWidth="3"
              strokeDasharray="8 6"
            />
          ))}

          {/* Tree Trunk */}
          <path d="M260 260 Q255 180 250 140 Q245 180 240 260 Z" fill="#78350F" />

          {/* Tree Foliage swinging in wind */}
          <g transform={`translate(250, 110) rotate(${leafWave})`}>
            <circle cx="0" cy="0" r="60" fill="#15803D" opacity="0.9" />
            <circle cx="-35" cy="15" r="45" fill="#16A34A" opacity="0.9" />
            <circle cx="35" cy="10" r="45" fill="#22C55E" opacity="0.9" />
            <circle cx="0" cy="-35" r="45" fill="#4ADE80" opacity="0.8" />
          </g>
        </svg>

        <div
          style={{
            fontFamily: THEME.fonts.bengali,
            fontSize: 18,
            color: '#FFFFFF',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.3)',
            padding: '10px 20px',
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          বাতাস অদৃশ্য, কিন্তু গাছের পাতা নড়ে তার প্রমাণ দেয়
        </div>
      </div>

      {/* RIGHT CARD: ELECTRICITY EFFECTS */}
      <div
        style={{
          flex: 1,
          height: '100%',
          background: THEME.colors.bgCard,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          borderRadius: 24,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 26, fontWeight: 700, color: THEME.colors.currentAmber }}>
          বিদ্যুতের অদৃশ্য ক্রিয়া (Electricity)
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 14, color: THEME.colors.textMuted, marginBottom: 16 }}>
          We witness light, heat & motion, not the charge itself
        </div>

        <svg width="420" height="280" viewBox="0 0 420 280">
          {/* Electric Field lines in background */}
          <defs>
            <radialGradient id="electricBurst" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central glowing orb / light source */}
          <circle cx="210" cy="120" r="90" fill="url(#electricBurst)" />

          {/* Glowing Bulb */}
          <g transform="translate(210, 120)">
            <circle cx="0" cy="0" r="40" fill="rgba(254, 240, 138, 0.4)" stroke="#FEF08A" strokeWidth="3" />
            <path d="M-12 15 L0 -15 L12 15" stroke="#FFFFFF" strokeWidth="3" fill="none" />
            <rect x="-16" y="38" width="32" height="20" rx="3" fill="#64748B" />
          </g>

          {/* Radiating Energy Wave Rings */}
          {[60, 95, 130].map((r, i) => (
            <circle
              key={i}
              cx="210"
              cy="120"
              r={r + (frame * 1.5) % 35}
              fill="none"
              stroke="rgba(0, 240, 255, 0.35)"
              strokeWidth="2"
            />
          ))}
        </svg>

        <div
          style={{
            fontFamily: THEME.fonts.bengali,
            fontSize: 18,
            color: '#FFFFFF',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.3)',
            padding: '10px 20px',
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          বিদ্যুৎ অদৃশ্য চার্জের ক্রিয়া, যা আলো, তাপ ও গতিতে প্রকাশ পায়
        </div>
      </div>
    </div>
  );
};
