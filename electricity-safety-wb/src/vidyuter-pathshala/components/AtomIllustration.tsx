import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';

interface AtomIllustrationProps {
  scale?: number;
  showLabels?: boolean;
}

export const AtomIllustration: React.FC<AtomIllustrationProps> = ({
  scale = 1,
  showLabels = true,
}) => {
  const frame = useCurrentFrame();

  // Orbital rotations
  const rot1 = (frame * 1.8) % 360;
  const rot2 = (frame * -2.2) % 360;
  const rot3 = (frame * 1.4) % 360;

  // Nucleus glow pulse
  const pulse = Math.sin(frame * 0.08) * 0.15 + 1;

  return (
    <div
      style={{
        position: 'relative',
        width: 600 * scale,
        height: 600 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background ambient field aura */}
      <div
        style={{
          position: 'absolute',
          width: 440 * scale,
          height: 440 * scale,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(11,15,25,0) 70%)',
          transform: `scale(${pulse})`,
        }}
      />

      {/* SVG Orbital Paths & Orbiting Electrons */}
      <svg
        width={600 * scale}
        height={600 * scale}
        viewBox="0 0 600 600"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbit 1: Angled 30 deg */}
        <g transform="translate(300, 300) rotate(30)">
          <ellipse
            cx="0"
            cy="0"
            rx="240"
            ry="75"
            fill="none"
            stroke="rgba(0, 240, 255, 0.35)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {/* Electron 1A */}
          <g transform={`rotate(${rot1}) translate(240, 0)`}>
            <circle cx="0" cy="0" r="10" fill={THEME.colors.electronBlue} filter="url(#glowEffect)" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">-</text>
          </g>
          {/* Electron 1B */}
          <g transform={`rotate(${rot1 + 180}) translate(240, 0)`}>
            <circle cx="0" cy="0" r="10" fill={THEME.colors.electronBlue} filter="url(#glowEffect)" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">-</text>
          </g>
        </g>

        {/* Orbit 2: Angled -45 deg */}
        <g transform="translate(300, 300) rotate(-45)">
          <ellipse
            cx="0"
            cy="0"
            rx="230"
            ry="70"
            fill="none"
            stroke="rgba(0, 240, 255, 0.35)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {/* Electron 2A */}
          <g transform={`rotate(${rot2}) translate(230, 0)`}>
            <circle cx="0" cy="0" r="10" fill={THEME.colors.electronBlue} filter="url(#glowEffect)" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">-</text>
          </g>
          {/* Electron 2B */}
          <g transform={`rotate(${rot2 + 180}) translate(230, 0)`}>
            <circle cx="0" cy="0" r="10" fill={THEME.colors.electronBlue} filter="url(#glowEffect)" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">-</text>
          </g>
        </g>

        {/* Orbit 3: Angled 90 deg */}
        <g transform="translate(300, 300) rotate(90)">
          <ellipse
            cx="0"
            cy="0"
            rx="250"
            ry="80"
            fill="none"
            stroke="rgba(0, 240, 255, 0.35)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {/* Electron 3A */}
          <g transform={`rotate(${rot3}) translate(250, 0)`}>
            <circle cx="0" cy="0" r="10" fill={THEME.colors.electronBlue} filter="url(#glowEffect)" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">-</text>
          </g>
          {/* Electron 3B */}
          <g transform={`rotate(${rot3 + 180}) translate(250, 0)`}>
            <circle cx="0" cy="0" r="10" fill={THEME.colors.electronBlue} filter="url(#glowEffect)" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">-</text>
          </g>
        </g>

        {/* Central Nucleus Aura */}
        <circle cx="300" cy="300" r={65 * pulse} fill="url(#nucleusGlow)" />

        {/* Nucleus Protons and Neutrons Cluster */}
        <g transform="translate(300, 300)">
          {/* Neutrons (Neutral) */}
          <circle cx="-16" cy="-14" r="14" fill={THEME.colors.neutronSlate} stroke="#1E293B" strokeWidth="2" />
          <circle cx="18" cy="12" r="14" fill={THEME.colors.neutronSlate} stroke="#1E293B" strokeWidth="2" />
          <circle cx="-6" cy="18" r="14" fill={THEME.colors.neutronSlate} stroke="#1E293B" strokeWidth="2" />
          
          {/* Protons (Positive) */}
          <circle cx="14" cy="-14" r="15" fill={THEME.colors.protonGold} filter="url(#glowEffect)" />
          <text x="14" y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">+</text>

          <circle cx="-18" cy="8" r="15" fill={THEME.colors.protonGold} filter="url(#glowEffect)" />
          <text x="-18" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">+</text>

          <circle cx="2" cy="-2" r="15" fill={THEME.colors.protonGold} filter="url(#glowEffect)" />
          <text x="2" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">+</text>
        </g>
      </svg>

      {/* Semantic Scientific Labels */}
      {showLabels && (
        <>
          {/* Nucleus Callout */}
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: '68%',
              background: 'rgba(19, 27, 46, 0.90)',
              border: `1px solid ${THEME.colors.protonGold}`,
              borderRadius: 12,
              padding: '8px 16px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 18, fontWeight: 700, color: THEME.colors.protonGold }}>
              নিউক্লিয়াস (Nucleus)
            </div>
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 14, color: THEME.colors.textMuted }}>
              প্রোটন (+) ও নিউট্রন (০)
            </div>
          </div>

          {/* Electron Callout */}
          <div
            style={{
              position: 'absolute',
              bottom: '16%',
              left: '12%',
              background: 'rgba(19, 27, 46, 0.90)',
              border: `1px solid ${THEME.colors.electronBlue}`,
              borderRadius: 12,
              padding: '8px 16px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 18, fontWeight: 700, color: THEME.colors.electronBlue }}>
              ইলেকট্রন (Electron)
            </div>
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 14, color: THEME.colors.textMuted }}>
              ঋণাত্মক চার্জযুক্ত ঘূর্ণায়মান কণা (-)
            </div>
          </div>
        </>
      )}
    </div>
  );
};
