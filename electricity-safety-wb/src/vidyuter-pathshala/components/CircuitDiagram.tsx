import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';

interface CircuitDiagramProps {
  isSwitchClosed?: boolean;
  showElectronDrift?: boolean;
  showCurrentArrows?: boolean;
  highlightBulb?: boolean;
}

export const CircuitDiagram: React.FC<CircuitDiagramProps> = ({
  isSwitchClosed = true,
  showElectronDrift = true,
  showCurrentArrows = true,
  highlightBulb = true,
}) => {
  const frame = useCurrentFrame();

  // Switch animation
  const switchAngle = isSwitchClosed ? 0 : -35;

  // Bulb glow intensity
  const bulbGlow = isSwitchClosed ? 1 : 0;
  const filamentPulse = isSwitchClosed ? Math.sin(frame * 0.15) * 0.08 + 1 : 0;

  // Electron drift progression along the rectangular circuit path
  // Perimeter of wire loop: top, right, bottom, left
  const electronOffset = isSwitchClosed ? (frame * 3) % 200 : 0;
  const currentArrowOffset = isSwitchClosed ? (frame * 4) % 200 : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: 1100,
        height: 640,
        background: 'rgba(19, 27, 46, 0.75)',
        border: `1px solid ${THEME.colors.bgCardBorder}`,
        borderRadius: 24,
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(12px)',
        padding: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="1040" height="580" viewBox="0 0 1040 580">
        <defs>
          {/* Bulb Glow Gradient */}
          <radialGradient id="bulbBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity={0.9 * bulbGlow} />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity={0.45 * bulbGlow} />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          {/* Wire Glow Filter */}
          <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Circuit Loop Wire Base (Rectangular loop: (180, 100) to (860, 480)) */}
        {/* Top Wire: from Switch (450) to Bulb (860) */}
        <line
          x1="220"
          y1="100"
          x2="450"
          y2="100"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />
        <line
          x1="570"
          y1="100"
          x2="860"
          y2="100"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />

        {/* Right Wire: down to Bulb terminal */}
        <line
          x1="860"
          y1="100"
          x2="860"
          y2="220"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />
        <line
          x1="860"
          y1="340"
          x2="860"
          y2="480"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />

        {/* Bottom Wire: from Bulb to Battery (-) */}
        <line
          x1="860"
          y1="480"
          x2="180"
          y2="480"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />

        {/* Left Wire: from Battery (+) up to top */}
        <line
          x1="180"
          y1="480"
          x2="180"
          y2="360"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />
        <line
          x1="180"
          y1="220"
          x2="180"
          y2="100"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />
        <line
          x1="180"
          y1="100"
          x2="220"
          y2="100"
          stroke={isSwitchClosed ? THEME.colors.brandCyan : '#475569'}
          strokeWidth="6"
          strokeLinecap="round"
          filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
        />

        {/* 2. KNIFE SWITCH (At Top: X=450 to 570, Y=100) */}
        <g id="knife-switch">
          {/* Contact terminals */}
          <circle cx="450" cy="100" r="10" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3" />
          <circle cx="570" cy="100" r="10" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3" />
          
          {/* Switch Blade Hinge */}
          <g transform={`translate(450, 100) rotate(${switchAngle})`}>
            <rect x="0" y="-5" width="125" height="10" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <circle cx="120" cy="0" r="8" fill="#EF4444" />
          </g>

          <text
            x="510"
            y="65"
            textAnchor="middle"
            fill={isSwitchClosed ? THEME.colors.successGreen : THEME.colors.dangerRed}
            fontSize="18"
            fontFamily={THEME.fonts.bengali}
            fontWeight="bold"
          >
            {isSwitchClosed ? 'সুইচ বন্ধ (Closed Switch - ON)' : 'সুইচ খোলা (Open Switch - OFF)'}
          </text>
        </g>

        {/* 3. BATTERY (Left Side: X=180, Y=290) */}
        <g id="battery-cell" transform="translate(140, 220)">
          {/* Battery Body (1.5V Cylindrical) */}
          <rect x="0" y="20" width="80" height="120" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="3" />
          {/* Positive Cap (Top) */}
          <rect x="25" y="6" width="30" height="14" rx="3" fill="#F59E0B" />
          
          {/* Polarity Markers */}
          <text x="40" y="52" textAnchor="middle" fill="#F59E0B" fontSize="28" fontWeight="bold">+</text>
          <text x="40" y="125" textAnchor="middle" fill="#38BDF8" fontSize="32" fontWeight="bold">-</text>

          {/* Label */}
          <text x="40" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily={THEME.fonts.english} fontWeight="bold">
            1.5V
          </text>
          <text x="40" y="102" textAnchor="middle" fill={THEME.colors.brandCyan} fontSize="12" fontFamily={THEME.fonts.bengali}>
            ব্যাটারি
          </text>
        </g>

        {/* 4. LIGHTBULB (Right Side: X=860, Y=280) */}
        <g id="lightbulb" transform="translate(860, 280)">
          {/* Radial Bloom Glow */}
          {isSwitchClosed && (
            <circle cx="0" cy="0" r={160 * filamentPulse} fill="url(#bulbBloom)" />
          )}

          {/* Glass Envelope */}
          <circle
            cx="0"
            cy="-10"
            r="55"
            fill={isSwitchClosed ? 'rgba(254, 240, 138, 0.25)' : 'rgba(255, 255, 255, 0.05)'}
            stroke={isSwitchClosed ? '#FEF08A' : '#64748B'}
            strokeWidth="3"
          />
          {/* Bulb Metallic Base */}
          <rect x="-24" y="42" width="48" height="30" rx="4" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <path d="M-20 48 H20 M-20 56 H20 M-20 64 H20" stroke="#334155" strokeWidth="2" />

          {/* Tungsten Filament */}
          <path
            d="M-18 25 L-10 -15 L-5 -25 L0 -15 L5 -25 L10 -15 L18 25"
            fill="none"
            stroke={isSwitchClosed ? '#FFFBEB' : '#94A3B8'}
            strokeWidth={isSwitchClosed ? '4' : '2'}
            strokeLinejoin="round"
            filter={isSwitchClosed ? 'url(#wireGlow)' : undefined}
          />

          <text
            x="0"
            y="105"
            textAnchor="middle"
            fill={isSwitchClosed ? '#FEF08A' : THEME.colors.textMuted}
            fontSize="18"
            fontFamily={THEME.fonts.bengali}
            fontWeight="bold"
          >
            {isSwitchClosed ? 'বাল্ব জ্বলছে (Light & Heat)' : 'বাল্ব নিভে আছে'}
          </text>
        </g>

        {/* 5. ELECTRON DRIFT PARTICLES (Cyan Dots moving Negative -> Positive) */}
        {showElectronDrift && isSwitchClosed && (
          <g id="electron-stream">
            {/* Bottom wire: moving from right (860) to left (180) */}
            {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((offset, i) => {
              const xPos = 860 - ((offset + electronOffset) % 680);
              return (
                <circle
                  key={`e-bot-${i}`}
                  cx={xPos}
                  cy="480"
                  r="5"
                  fill={THEME.colors.electronBlue}
                  filter="url(#wireGlow)"
                />
              );
            })}

            {/* Top wire: moving from left (180) to right (860) via closed switch */}
            {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((offset, i) => {
              const xPos = 220 + ((offset + electronOffset) % 640);
              return (
                <circle
                  key={`e-top-${i}`}
                  cx={xPos}
                  cy="100"
                  r="5"
                  fill={THEME.colors.electronBlue}
                  filter="url(#wireGlow)"
                />
              );
            })}
          </g>
        )}

        {/* 6. CONVENTIONAL CURRENT ARROWS (Amber Arrows: Positive -> Negative) */}
        {showCurrentArrows && isSwitchClosed && (
          <g id="current-arrows">
            {/* Top Wire Arrow: Moving Left to Right */}
            <g transform="translate(680, 100)">
              <polygon points="12,0 -8,-7 -4,0 -8,7" fill={THEME.colors.currentAmber} />
              <text x="0" y="-14" textAnchor="middle" fill={THEME.colors.currentAmber} fontSize="14" fontWeight="bold">
                I (তড়িৎ প্রবাহ)
              </text>
            </g>

            {/* Bottom Wire Arrow: Moving Right to Left */}
            <g transform="translate(480, 480) rotate(180)">
              <polygon points="12,0 -8,-7 -4,0 -8,7" fill={THEME.colors.currentAmber} />
            </g>
          </g>
        )}
      </svg>

      {/* Educational Annotation Footer Banner */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 40,
          right: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(11, 15, 25, 0.90)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 14,
          padding: '10px 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: THEME.colors.electronBlue }} />
          <span style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.textPure }}>
            ইলেকট্রন প্রবাহ: ঋণাত্মক (-) থেকে ধনাত্মক (+)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 14, height: 10, background: THEME.colors.currentAmber }} />
          <span style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.currentAmber }}>
            প্রচলিত কারেন্ট (I): ধনাত্মক (+) থেকে ঋণাত্মক (-)
          </span>
        </div>

        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, fontWeight: 700, color: THEME.colors.brandCyan }}>
          চার্জ সংরক্ষণ নীতি: বাল্ব ইলেকট্রন খায় না (I_in = I_out)
        </div>
      </div>
    </div>
  );
};
