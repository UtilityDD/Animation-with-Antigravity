import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';

export const PhenomenaHook: React.FC = () => {
  const frame = useCurrentFrame();

  // Rotation of ceiling fan
  const fanRot = (frame * 12) % 360;

  // Lightning flicker effect
  const lightningOpacity = frame > 80 && frame < 140 ? ((frame % 8 < 4) ? 1 : 0.2) : 0.8;

  // Paper leaping up to comb
  const paperY = interpolate(frame, [100, 150], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Lamp glow pulse
  const lampGlow = Math.min(1, Math.max(0, (frame - 20) / 30));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        width: 1400,
        height: 480,
      }}
    >
      {/* 1. TABLE LAMP CARD */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg width="180" height="220" viewBox="0 0 180 220">
          {/* Radial Lamp Glow */}
          <circle
            cx="90"
            cy="110"
            r={80 * lampGlow}
            fill="radial-gradient(circle, rgba(254,240,138,0.4) 0%, rgba(245,158,11,0) 70%)"
          />
          {/* Base */}
          <ellipse cx="90" cy="190" rx="45" ry="12" fill="#334155" />
          {/* Stand */}
          <path d="M90 190 L90 110" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
          {/* Lamp Shade */}
          <polygon points="60,110 120,110 140,65 40,65" fill={lampGlow > 0.5 ? '#FEF08A' : '#475569'} />
          {/* Light Rays */}
          {lampGlow > 0.5 && (
            <polygon points="40,65 140,65 170,180 10,180" fill="rgba(254, 240, 138, 0.18)" />
          )}
        </svg>
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginTop: 12 }}>
          বাতির আলো
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.brandCyan }}>
          Electric Illumination
        </div>
      </div>

      {/* 2. STATIC COMB ATTRACTION CARD */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <svg width="180" height="220" viewBox="0 0 180 220">
          {/* Comb */}
          <rect x="30" y="50" width="120" height="24" rx="4" fill="#38BDF8" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <rect key={i} x={36 + i * 9.5} y="74" width="4" height="28" rx="2" fill="#38BDF8" />
          ))}
          {/* Static Minus Charge Badges */}
          <circle cx="50" cy="40" r="7" fill="#0284C7" />
          <text x="50" y="44" fill="#FFF" fontSize="11" textAnchor="middle">-</text>
          <circle cx="90" cy="40" r="7" fill="#0284C7" />
          <text x="90" y="44" fill="#FFF" fontSize="11" textAnchor="middle">-</text>
          <circle cx="130" cy="40" r="7" fill="#0284C7" />
          <text x="130" y="44" fill="#FFF" fontSize="11" textAnchor="middle">-</text>

          {/* Paper pieces jumping up */}
          <g transform={`translate(0, ${paperY})`}>
            <rect x="55" y="115" width="18" height="12" fill="#E2E8F0" rx="2" transform="rotate(15 55 115)" />
            <rect x="85" y="110" width="14" height="14" fill="#E2E8F0" rx="2" transform="rotate(-20 85 110)" />
            <rect x="115" y="118" width="16" height="10" fill="#E2E8F0" rx="2" transform="rotate(25 115 118)" />
          </g>
        </svg>
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginTop: 12 }}>
          চিরুনির আকর্ষণ
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.brandCyan }}>
          Static Electricity
        </div>
      </div>

      {/* 3. ATMOSPHERIC LIGHTNING CARD */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <svg width="180" height="220" viewBox="0 0 180 220">
          {/* Cloud */}
          <path
            d="M30 70 Q45 45 75 50 Q95 35 125 45 Q150 55 145 75 Q160 90 140 100 Q40 105 30 70 Z"
            fill="#334155"
          />
          {/* Lightning Bolt */}
          <path
            d="M95 90 L80 130 L105 130 L75 190 L88 145 L70 145 Z"
            fill={THEME.colors.brandCyan}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            opacity={lightningOpacity}
            filter="drop-shadow(0 0 12px #00F0FF)"
          />
        </svg>
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginTop: 12 }}>
          আকাশে বজ্রপাত
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.brandCyan }}>
          Atmospheric Discharge
        </div>
      </div>

      {/* 4. CEILING FAN ROTATION CARD */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <svg width="180" height="220" viewBox="0 0 180 220">
          {/* Downrod */}
          <line x1="90" y1="20" x2="90" y2="80" stroke="#64748B" strokeWidth="6" />
          <g transform={`translate(90, 110) rotate(${fanRot})`}>
            {/* Center Cap */}
            <circle cx="0" cy="0" r="24" fill="#1E293B" stroke="#475569" strokeWidth="3" />
            {/* 3 Blades */}
            {[0, 120, 240].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path d="M-8 -20 L-14 -70 Q0 -78 14 -70 L8 -20 Z" fill="#94A3B8" />
              </g>
            ))}
          </g>
        </svg>
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginTop: 12 }}>
          পাখার ঘূর্ণন
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.brandCyan }}>
          Mechanical Motion
        </div>
      </div>
    </div>
  );
};
