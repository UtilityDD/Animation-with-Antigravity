import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';

export const EnergyConversionMatrix: React.FC = () => {
  const frame = useCurrentFrame();

  const fanRot = (frame * 10) % 360;
  const bellHammer = Math.sin(frame * 0.4) * 15;
  const heatPulse = Math.sin(frame * 0.1) * 0.15 + 0.85;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        width: 1400,
        height: 500,
      }}
    >
      {/* 1. HEAT (ELECTRIC IRON) */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 24, fontWeight: 700, color: THEME.colors.dangerRed }}>
          তাপ শক্তি (Heat)
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.textMuted, marginBottom: 12 }}>
          Electric Iron • Joule Heating
        </div>

        <svg width="200" height="220" viewBox="0 0 200 220">
          {/* Iron Body */}
          <path d="M40 150 L160 150 L130 90 L60 90 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
          {/* Handle */}
          <path d="M70 90 L70 50 L120 50 L120 90" stroke="#64748B" strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* Soleplate Base */}
          <rect x="35" y="150" width="130" height="12" rx="4" fill="#EF4444" opacity={heatPulse} />

          {/* Radiating Heat Waves */}
          {[175, 190, 205].map((y, i) => (
            <path
              key={i}
              d={`M45 ${y} Q65 ${y - 8} 85 ${y} T125 ${y} T155 ${y}`}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              opacity={0.8 - i * 0.25}
            />
          ))}
        </svg>

        <div
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            padding: '6px 14px',
            borderRadius: 16,
            fontFamily: THEME.fonts.bengali,
            fontSize: 16,
            color: '#FCA5A5',
            marginTop: 10,
          }}
        >
          ইস্ত্রি • হিটার
        </div>
      </div>

      {/* 2. MOTION (CEILING FAN / MOTOR) */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 24, fontWeight: 700, color: THEME.colors.brandCyan }}>
          যান্ত্রিক গতি (Motion)
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.textMuted, marginBottom: 12 }}>
          Motor • Lorentz Torque
        </div>

        <svg width="200" height="220" viewBox="0 0 200 220">
          <line x1="100" y1="20" x2="100" y2="80" stroke="#64748B" strokeWidth="6" />
          <g transform={`translate(100, 110) rotate(${fanRot})`}>
            <circle cx="0" cy="0" r="22" fill="#1E293B" stroke={THEME.colors.brandCyan} strokeWidth="2" />
            {[0, 120, 240].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path d="M-8 -20 L-14 -70 Q0 -76 14 -70 L8 -20 Z" fill="#38BDF8" />
              </g>
            ))}
          </g>
        </svg>

        <div
          style={{
            background: 'rgba(0, 240, 255, 0.15)',
            padding: '6px 14px',
            borderRadius: 16,
            fontFamily: THEME.fonts.bengali,
            fontSize: 16,
            color: THEME.colors.brandCyan,
            marginTop: 10,
          }}
        >
          পাখা • পানির পাম্প
        </div>
      </div>

      {/* 3. LIGHT (BULB / LED) */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 24, fontWeight: 700, color: THEME.colors.currentAmber }}>
          আলোক শক্তি (Light)
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.textMuted, marginBottom: 12 }}>
          Lamp / LED • Radiation
        </div>

        <svg width="200" height="220" viewBox="0 0 200 220">
          <circle cx="100" cy="100" r="50" fill="rgba(254, 240, 138, 0.3)" stroke="#FEF08A" strokeWidth="3" />
          <path d="M88 120 L100 80 L112 120" stroke="#FFFBEB" strokeWidth="3" fill="none" />
          <rect x="85" y="145" width="30" height="20" rx="3" fill="#64748B" />

          {/* Light rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1={100 + Math.cos((deg * Math.PI) / 180) * 58}
              y1={100 + Math.sin((deg * Math.PI) / 180) * 58}
              x2={100 + Math.cos((deg * Math.PI) / 180) * 75}
              y2={100 + Math.sin((deg * Math.PI) / 180) * 75}
              stroke="#FDE047"
              strokeWidth="2.5"
            />
          ))}
        </svg>

        <div
          style={{
            background: 'rgba(251, 191, 36, 0.15)',
            padding: '6px 14px',
            borderRadius: 16,
            fontFamily: THEME.fonts.bengali,
            fontSize: 16,
            color: '#FDE047',
            marginTop: 10,
          }}
        >
          টিউবলাইট • বাল্ব
        </div>
      </div>

      {/* 4. SOUND (ELECTRIC BELL) */}
      <div
        style={{
          background: THEME.colors.bgCard,
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 24, fontWeight: 700, color: THEME.colors.successGreen }}>
          শব্দ শক্তি (Sound)
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 13, color: THEME.colors.textMuted, marginBottom: 12 }}>
          Doorbell / Buzzer • Acoustic Wave
        </div>

        <svg width="200" height="220" viewBox="0 0 200 220">
          {/* Bell Gong Dome */}
          <path d="M50 120 C50 60 150 60 150 120 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
          {/* Hammer Pivot & Striker */}
          <g transform={`translate(100, 160) rotate(${bellHammer})`}>
            <line x1="0" y1="0" x2="35" y2="-45" stroke="#475569" strokeWidth="4" />
            <circle cx="35" cy="-45" r="8" fill="#F59E0B" />
          </g>

          {/* Sound Wave Arcs */}
          {[160, 175, 190].map((r, i) => (
            <path
              key={i}
              d={`M${r} 85 A${25 + i * 15} ${25 + i * 15} 0 0 1 ${r} 135`}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />
          ))}
        </svg>

        <div
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            padding: '6px 14px',
            borderRadius: 16,
            fontFamily: THEME.fonts.bengali,
            fontSize: 16,
            color: '#6EE7B7',
            marginTop: 10,
          }}
        >
          কলিং বেল • লাউডস্পিকার
        </div>
      </div>
    </div>
  );
};
