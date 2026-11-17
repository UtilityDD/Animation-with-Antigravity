import React from 'react';
import {
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  camAt,
  camTransform,
  ci,
  rnd,
} from '../historical/scene1/Scene1Shared';
import { FranklinRig } from './FranklinRig';

/**
 * Beat 1 (0..1339f): Full-Bleed 1752 Philadelphia Study
 * - Grounded FranklinRig with colonial frock coat, waistcoat, spectacles & hand on chin
 * - Snappy 24-28f focus zooms & pans synced to spoken phrases (wide study -> spark macro -> Franklin & storm window)
 */
export const Beat1StudyShot: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = ci(frame, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(frame, [1305, 1339], [1, 0], EASE_INOUT);

  // Snappy 24-28f documentary camera moves with gentle hold drift
  const cam = camAt(frame, [
    { f: 0, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 340, x: 980, y: 530, z: 1.04, sx: 960, sy: 540 },
    // Snappy 26f zoom-in onto the friction globe & tiny brass-knob spark!
    { f: 366, x: 980, y: 590, z: 1.85, sx: 1020, sy: 560 },
    { f: 680, x: 1005, y: 585, z: 1.92, sx: 1020, sy: 560 },
    // Snappy 28f pull-back & pan onto thoughtful Franklin + rainy storm window!
    { f: 708, x: 1320, y: 470, z: 1.24, sx: 1080, sy: 520 },
    { f: 990, x: 1340, y: 455, z: 1.28, sx: 1080, sy: 520 },
    // Snappy 26f zoom-in onto storm window clouds!
    { f: 1016, x: 1400, y: 310, z: 1.72, sx: 1120, sy: 480 },
    { f: 1339, x: 1410, y: 300, z: 1.8, sx: 1120, sy: 480 },
  ]);

  const spark = Math.sin(frame * 0.65) > 0.55;
  const spin = (frame * 1.4) % 360;
  const flicker = 0.88 + Math.sin(frame * 0.38) * 0.12;
  const cloudGlow = Math.sin(frame * 0.12) > 0.85 ? 0.35 : 0;

  // Franklin eyes track from workbench spark (left-down) up toward the storm window!
  const lookUp = ci(frame, [690, 740], [0, 1], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 65% 45%, #1E160E 0%, #07090F 75%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Distant Sky Layer (0.3x parallax outside window) */}
      <div
        style={{
          position: 'absolute',
          inset: -140,
          transform: camTransform({
            ...cam,
            x: 960 + (cam.x - 960) * 0.3,
            y: 540 + (cam.y - 540) * 0.3,
            z: 1 + (cam.z - 1) * 0.35,
          }),
          transformOrigin: '0 0',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 1060,
            top: 40,
            width: 760,
            height: 540,
            background: 'linear-gradient(180deg, #0D162B 0%, #1E293B 65%, #0F172A 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 60% 35%, rgba(186,230,253,0.45) 0%, transparent 65%)',
              opacity: cloudGlow,
            }}
          />
          <svg width="760" height="540" viewBox="0 0 760 540">
            <path d="M 0,540 L 0,410 L 180,410 L 180,375 L 310,375 L 310,405 L 420,405 L 440,210 L 460,405 L 760,405 L 760,540 Z" fill="#070B14" />
            <path d="M 40,175 Q 190,110 360,150 Q 520,100 700,160 L 730,230 L 20,230 Z" fill="#172236" opacity="0.85" />
            {Array.from({ length: 28 }).map((_, i) => {
              const rx = rnd(i * 7) * 760;
              const ry = (frame * 8 + rnd(i * 11) * 540) % 540;
              return <line key={i} x1={rx} y1={ry} x2={rx - 10} y2={ry + 24} stroke="#94A3B8" strokeWidth="1.2" opacity="0.32" />;
            })}
          </svg>
        </div>
      </div>

      {/* Main 1.0x Study Layer */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: camTransform(cam),
          transformOrigin: '0 0',
        }}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
          <defs>
            <radialGradient id="s1Candle" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.38 * flicker} />
              <stop offset="50%" stopColor="#D97706" stopOpacity={0.12 * flicker} />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="globeGlass" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.55" />
            </radialGradient>
          </defs>

          {/* Study Wall framing the Window */}
          <path
            d="M 0,0 L 1920,0 L 1920,1080 L 0,1080 Z M 1080,100 L 1080,520 L 1720,520 L 1720,100 Z"
            fill="#14100D"
            fillRule="evenodd"
          />
          <rect x="1080" y="100" width="640" height="420" fill="none" stroke="#3B2316" strokeWidth="14" />
          <line x1="1400" y1="100" x2="1400" y2="520" stroke="#3B2316" strokeWidth="8" />
          <line x1="1080" y1="310" x2="1720" y2="310" stroke="#3B2316" strokeWidth="8" />

          {/* Bookshelf */}
          <g transform="translate(520, 120)">
            <rect x="0" y="0" width="440" height="580" fill="#1D140E" stroke="#3B2316" strokeWidth="6" />
            {[140, 290, 440].map((sy) => (
              <g key={sy}>
                <rect x="8" y={sy} width="424" height="14" fill="#3B2316" />
                {Array.from({ length: 11 }).map((_, bi) => {
                  const bh = 72 + (bi % 4) * 12;
                  const cols = ['#7F1D1D', '#1E3A8A', '#14532D', '#78350F', '#334155'];
                  return (
                    <rect
                      key={bi}
                      x={22 + bi * 36}
                      y={sy - bh}
                      width="28"
                      height={bh}
                      rx="2"
                      fill={cols[(bi + sy) % cols.length]}
                      opacity="0.72"
                    />
                  );
                })}
              </g>
            ))}
          </g>
        </svg>

        {/* Grounded Expressive FranklinRig behind Workbench */}
        <FranklinRig
          pose={{
            worldX: 1350,
            worldY: 225,
            chestLeanDeg: -3 + lookUp * 2,
            breathY: Math.sin(frame * 0.05) * 2.2,
            headRollDeg: -4 + lookUp * 8,
            neckPitchDeg: 6 - lookUp * 14,
            eyeLookX: -0.45 + lookUp * 0.7,
            eyeLookY: 0.45 - lookUp * 0.85,
            blinkAmount: frame % 150 > 144 ? 1 : 0,
            expression: lookUp > 0.5 ? 'curious' : 'contemplative',
            poseMode: 'studyThinking',
          }}
          scale={0.78}
        />

        {/* Foreground Workbench + Instruments (overlaps Franklin's lower coat so he is seated behind it) */}
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <rect x="-100" y="700" width="2120" height="440" fill="#2A1910" stroke="#5C3A21" strokeWidth="4" />
          <circle cx="940" cy="640" r="340" fill="url(#s1Candle)" />

          {/* Brass Candlestick */}
          <g transform="translate(710, 625)">
            <rect x="-18" y="55" width="36" height="20" rx="4" fill="#D97706" />
            <rect x="-6" y="0" width="12" height="60" fill="#F59E0B" />
            <rect x="-5" y="-32" width="10" height="34" fill="#FFFBEB" />
            <path d={`M 0,-32 Q ${-6 + Math.sin(frame * 0.4) * 2},-48 0,-60 Q ${6 - Math.sin(frame * 0.4) * 2},-48 0,-32 Z`} fill="#FBBF24" />
          </g>

          {/* Electrostatic Friction Globe Machine */}
          <g transform="translate(880, 585)">
            <rect x="-85" y="95" width="170" height="22" rx="4" fill="#451A03" />
            <line x1="-85" y1="0" x2="85" y2="0" stroke="#94A3B8" strokeWidth="7" />
            <circle cx="0" cy="0" r="68" fill="url(#globeGlass)" stroke="#BAE6FD" strokeWidth="2.2" />
            <ellipse cx="0" cy="0" rx="66" ry="20" fill="none" stroke="#E0F2FE" strokeWidth="1.2" opacity="0.25" transform={`rotate(${spin})`} />
            <circle cx="105" cy="0" r="14" fill="#FBBF24" />
            <circle cx="148" cy="0" r="14" fill="#FBBF24" />
            {spark && (
              <path
                d="M 119,0 L 128,-6 L 132,5 L 136,0"
                fill="none"
                stroke="#E0F2FE"
                strokeWidth="3.2"
                filter="drop-shadow(0 0 8px #38BDF8)"
              />
            )}
          </g>

          {/* Leyden Jar */}
          <g transform="translate(1110, 605)">
            <rect x="-34" y="-22" width="68" height="114" rx="10" fill="rgba(56, 189, 248, 0.16)" stroke="#BAE6FD" strokeWidth="2" />
            <rect x="-34" y="28" width="68" height="64" rx="8" fill="#94A3B8" opacity="0.72" />
            <rect x="-4" y="-64" width="8" height="88" fill="#F59E0B" />
            <circle cx="0" cy="-68" r="11" fill="#FDE047" />
          </g>

          {/* Storm Sketch */}
          <g transform="translate(1540, 745) rotate(-5)">
            <rect x="-95" y="-48" width="190" height="96" rx="4" fill="#F2E5CE" stroke="#B45309" strokeWidth="1.5" />
            <path d="M -55,10 Q -25,-18 0,-8 Q 30,-22 55,10 Z" fill="none" stroke="#78350F" strokeWidth="2" opacity="0.6" />
          </g>
        </svg>

        <DustMotes frame={frame} cx={960} cy={520} radius={420} count={32} opacity={0.65} seed={71} />

        {/* Animated Thought Bubble (712..1016f): Storm Cloud Charge =? Lab Spark */}
        {(() => {
          const tbIn = ci(frame, [712, 742], [0, 1], EASE_OUT);
          const tbOut = ci(frame, [988, 1016], [1, 0], EASE_INOUT);
          const tbAlpha = tbIn * tbOut;
          if (tbAlpha <= 0.01) return null;

          const dot1 = ci(frame, [712, 724], [0, 1], EASE_OUT);
          const dot2 = ci(frame, [720, 732], [0, 1], EASE_OUT);
          const dot3 = ci(frame, [728, 740], [0, 1], EASE_OUT);
          const cloudPop = ci(frame, [732, 756], [0.65, 1], EASE_OUT);
          const floatY = Math.sin(frame * 0.07) * 4.5;
          const qPulse = 1 + Math.sin(frame * 0.14) * 0.08;
          const miniSpark = Math.sin(frame * 0.55) > 0.35;

          return (
            <svg
              width="1920"
              height="1080"
              viewBox="0 0 1920 1080"
              style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', opacity: tbAlpha }}
            >
              <defs>
                <filter id="tbShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#020617" floodOpacity="0.65" />
                </filter>
              </defs>

              {/* Staggered rising thought-trail dots */}
              <circle cx="1616" cy={458 + floatY * 0.25} r={6.5 * dot1} fill="#F2E5CE" stroke="#94A3B8" strokeWidth="1.5" opacity={dot1} />
              <circle cx="1632" cy={430 + floatY * 0.45} r={10 * dot2} fill="#F2E5CE" stroke="#94A3B8" strokeWidth="1.8" opacity={dot2} />
              <circle cx="1650" cy={396 + floatY * 0.65} r={14.5 * dot3} fill="#F2E5CE" stroke="#94A3B8" strokeWidth="2" opacity={dot3} />

              {/* Main Thought Cloud */}
              <g
                transform={`translate(1685, ${295 + floatY}) scale(${cloudPop})`}
                filter="url(#tbShadow)"
              >
                <path
                  d="M -92,38 C -124,38 -142,14 -134,-12 C -128,-34 -104,-46 -80,-42 C -68,-72 -32,-86 4,-74 C 24,-92 64,-88 82,-64 C 114,-64 136,-38 128,-8 C 142,16 124,44 92,42 C 74,60 36,62 12,50 C -14,66 -58,62 -76,42 Z"
                  fill="#F8F1E3"
                  stroke="#CBD5E1"
                  strokeWidth="2.8"
                />

                {/* Left Icon: Storm Cloud with ambient cyan charge */}
                <g transform="translate(-62, -12)">
                  <path
                    d="M -26,12 C -34,12 -38,4 -34,-3 C -30,-9 -22,-10 -16,-8 C -10,-18 6,-20 14,-12 C 24,-12 32,-3 28,6 C 30,12 24,16 16,16 L -20,16 Z"
                    fill="#334155"
                    stroke="#1E293B"
                    strokeWidth="1.8"
                  />
                  <path d="M -8,18 L -12,26 L -4,26 L -8,34" fill="none" stroke="#0284C7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4" cy="24" r="2.2" fill="#38BDF8" />
                </g>

                {/* Center: Animated "= ?" comparison */}
                <g transform={`translate(-2, -6) scale(${qPulse})`}>
                  <text
                    x="0"
                    y="6"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontSize="32"
                    fontWeight="800"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    =?
                  </text>
                </g>

                {/* Right Icon: Lab Brass Knobs + Tiny Electric Spark */}
                <g transform="translate(64, -8)">
                  <circle cx="-18" cy="4" r="7.5" fill="#D97706" stroke="#92400E" strokeWidth="1.4" />
                  <circle cx="18" cy="4" r="7.5" fill="#D97706" stroke="#92400E" strokeWidth="1.4" />
                  {miniSpark && (
                    <path
                      d="M -9,4 L -2,-2 L 3,9 L 10,4"
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      filter="drop-shadow(0 0 4px #38BDF8)"
                    />
                  )}
                </g>
              </g>
            </svg>
          );
        })()}
      </div>

      {/* Foreground 1.6x Blurred Bookshelf Edge */}
      <div
        style={{
          position: 'absolute',
          left: -120,
          top: -80,
          width: 240,
          height: 1240,
          background: '#080604',
          filter: 'blur(9px)',
          opacity: 0.85,
          transform: `translateX(${(-(cam.x - 960) * 0.55).toFixed(1)}px)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
