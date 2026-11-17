import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';

export const StaticAttraction: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Comb rubbing hair (frames 0 to 180)
  // Phase 2: Comb moving to paper scraps (frames 180 to 300)
  // Phase 3: Paper scraps jumping (frames 300+)

  const rubCycle = Math.sin(frame * 0.25) * 20;

  // Comb position: rubs at hair (X=360), then moves to above paper (X=850)
  const combX = interpolate(frame, [150, 240], [360, 850], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Paper scraps jumping upwards
  const paperJump = interpolate(frame, [250, 320], [0, 95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Electron transfer opacity (from hair to comb)
  const transferOpacity = interpolate(frame, [40, 90, 160], [0, 1, 0.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1300,
        height: 560,
        background: 'rgba(19, 27, 46, 0.85)',
        border: `1px solid ${THEME.colors.bgCardBorder}`,
        borderRadius: 24,
        padding: 30,
        boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
      }}
    >
      <svg width="1240" height="420" viewBox="0 0 1240 420">
        <defs>
          <filter id="chargeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* SECTION A: DRY HAIR STRANDS (Left: X=240, Y=140) */}
        <g id="hair-section" transform="translate(240, 140)">
          <text x="60" y="-30" textAnchor="middle" fill="#E2E8F0" fontSize="20" fontFamily={THEME.fonts.bengali} fontWeight="bold">
            শুকনো চুল (Dry Hair)
          </text>
          {/* Hair strands */}
          {[0, 20, 40, 60, 80, 100, 120].map((x, i) => (
            <path
              key={i}
              d={`M${x} 0 Q${x + (i % 2 === 0 ? 15 : -15)} 80 ${x} 160`}
              stroke="#713F12"
              strokeWidth="4"
              fill="none"
            />
          ))}

          {/* Residual Positive Charge on Hair after rubbing */}
          {frame > 100 && (
            <g id="hair-positive-charges">
              <circle cx="20" cy="50" r="10" fill={THEME.colors.protonGold} />
              <text x="20" y="55" fill="#FFF" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
              <circle cx="60" cy="70" r="10" fill={THEME.colors.protonGold} />
              <text x="60" y="75" fill="#FFF" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
              <circle cx="100" cy="40" r="10" fill={THEME.colors.protonGold} />
              <text x="100" y="45" fill="#FFF" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
            </g>
          )}
        </g>

        {/* SECTION B: ELECTRON TRANSFER STREAM (Mid left) */}
        {frame < 220 && (
          <g id="electron-transfer" opacity={transferOpacity}>
            {[
              { x: 310, y: 160 },
              { x: 330, y: 180 },
              { x: 320, y: 220 },
              { x: 340, y: 240 },
            ].map((pt, idx) => (
              <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
                <circle cx="0" cy="0" r="8" fill={THEME.colors.electronBlue} filter="url(#chargeGlow)" />
                <text x="0" y="4" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">-</text>
              </g>
            ))}
            <text x="325" y="130" fill={THEME.colors.brandCyan} fontSize="14" fontFamily={THEME.fonts.bengali} textAnchor="middle">
              ইলেকট্রন স্থানান্তর
            </text>
          </g>
        )}

        {/* SECTION C: MOVING PLASTIC COMB */}
        <g
          id="comb-assembly"
          transform={`translate(${combX + (frame < 150 ? rubCycle : 0)}, 140)`}
        >
          {/* Comb Spine */}
          <rect x="-80" y="0" width="160" height="30" rx="6" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
          
          {/* Comb Teeth */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
            <rect key={i} x={-72 + i * 10} y="30" width="4" height="45" rx="2" fill="#0284C7" />
          ))}

          {/* Accumulated Static Negative Charges on Comb */}
          {frame > 80 && (
            <g id="accumulated-negative">
              {[-60, -30, 0, 30, 60].map((cx, i) => (
                <g key={i} transform={`translate(${cx}, -12)`}>
                  <circle cx="0" cy="0" r="9" fill={THEME.colors.electronBlue} filter="url(#chargeGlow)" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">-</text>
                </g>
              ))}
            </g>
          )}

          <text x="0" y="-30" textAnchor="middle" fill={THEME.colors.electronBlue} fontSize="18" fontFamily={THEME.fonts.bengali} fontWeight="bold">
            চার্জিত চিরুনি (Static Charge -)
          </text>
        </g>

        {/* SECTION D: PAPER SCRAPS AT BOTTOM RIGHT (X=850, Y=330) */}
        <g id="paper-section" transform="translate(850, 330)">
          <rect x="-100" y="10" width="200" height="6" rx="3" fill="#475569" />
          <text x="0" y="45" textAnchor="middle" fill="#94A3B8" fontSize="18" fontFamily={THEME.fonts.bengali}>
            ছোট কাগজের টুকরো (Paper Scraps)
          </text>

          {/* Pieces of paper jumping up to the comb teeth */}
          <g transform={`translate(-50, ${-paperJump}) rotate(${paperJump * 0.2})`}>
            <polygon points="-12,-8 12,-4 8,8 -10,6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          </g>
          <g transform={`translate(-10, ${-paperJump * 0.95}) rotate(${-paperJump * 0.3})`}>
            <polygon points="-10,-10 10,-6 6,10 -8,8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          </g>
          <g transform={`translate(35, ${-paperJump * 1.05}) rotate(${paperJump * 0.25})`}>
            <polygon points="-14,-6 8,-10 12,6 -6,12" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          </g>
        </g>
      </svg>

      {/* Principle Callout */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 40,
          right: 40,
          background: 'rgba(11, 15, 25, 0.92)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: 14,
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 18, color: '#FFFFFF', fontWeight: 600 }}>
          💡 বৈজ্ঞানিক সত্য: ঘর্ষণে কোনো নতুন চার্জ তৈরি হয় না, কেবল এক বস্তু থেকে অন্য বস্তুতে ইলেকট্রন স্থানান্তরিত হয়।
        </div>
        <div style={{ fontFamily: THEME.fonts.english, fontSize: 15, color: THEME.colors.brandCyan, fontWeight: 700 }}>
          Triboelectric Electron Transfer
        </div>
      </div>
    </div>
  );
};
