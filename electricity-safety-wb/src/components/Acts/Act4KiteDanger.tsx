import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { AlertOctagon, Ban, ShieldAlert, Zap } from 'lucide-react';

export const Act4KiteDanger: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 7 (0-450): Kite tangles into 11kV line & sparks travel down string
  // Scene 8 (450-1050): Bishu approaches with green bamboo stick (কাঁচা বাঁশ), Bidyut Bondhu intervenes with safety rules
  const isScene8 = frame >= 450;
  const scene8Frame = Math.max(0, frame - 450);

  // 4-Layer 2.5D Parallax Camera System
  const camX = interpolate(
    frame,
    [0, 260, 450, 650, 1050],
    [-40, 25, 10, -20, 0],
    { extrapolateRight: 'clamp' }
  );
  const camY = interpolate(
    frame,
    [0, 260, 450, 650, 1050],
    [-25, 15, 10, 0, 0],
    { extrapolateRight: 'clamp' }
  );
  const camScale = interpolate(
    frame,
    [0, 280, 450, 600, 1050],
    [1.0, 1.12, 1.05, 1.02, 1.0],
    { extrapolateRight: 'clamp' }
  );

  const getLayerTransform = (speed: number) => ({
    transform: `translate3d(${camX * speed}px, ${camY * speed}px, 0) scale(${
      1 + (camScale - 1) * speed
    })`,
    transformOrigin: 'center center',
  });

  // Kite flight path: flies freely 0-180, tangles at frame 180 on 11kV overhead wire (x=1180, y=245)
  const kiteX = interpolate(
    frame,
    [0, 90, 180, 1050],
    [620, 910, 1180, 1180],
    { extrapolateRight: 'clamp' }
  );
  const kiteY = interpolate(
    frame,
    [0, 90, 180, 1050],
    [170, 130, 240, 240],
    { extrapolateRight: 'clamp' }
  );
  const isTangled = frame >= 180;

  // Sparks travelling down the wet manja string after frame 185
  const sparkProgress = ((frame - 185) * 0.025) % 1;

  // Scene 8 animations: Bishu walking with green bamboo stick, Bidyut Bondhu & Rule cards
  const bishuWalk = interpolate(
    scene8Frame,
    [0, 95, 160],
    [0, 1, 0.65],
    { extrapolateRight: 'clamp' }
  );

  const mascotPop = spring({
    frame: Math.max(0, scene8Frame - 70),
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  const rule1Spring = spring({
    frame: Math.max(0, scene8Frame - 130),
    fps,
    config: { damping: 13, stiffness: 115 },
  });

  const rule2Spring = spring({
    frame: Math.max(0, scene8Frame - 200),
    fps,
    config: { damping: 13, stiffness: 115 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
      }}
    >
      {/* LAYER 0: Deep Background (0.2x Parallax) - Monsoon-cleared Afternoon Sky, Clouds & Distant Palm/Banana Trees */}
      <AbsoluteFill style={getLayerTransform(0.2)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <defs>
            <linearGradient id="act4AfternoonSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="45%" stopColor="#38BDF8" />
              <stop offset="82%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#2D5A27" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#act4AfternoonSky)" />

          {/* Sun Glow through Post-Monsoon Clouds */}
          <circle cx="380" cy="210" r="95" fill="#FFD600" opacity="0.35" />
          <circle cx="380" cy="210" r="55" fill="#FFF8E7" opacity="0.7" />

          {/* Monsoon-Cleared Fluffy Clouds */}
          <g
            fill="#FFF8E7"
            opacity="0.82"
            transform={`translate(${frame * 0.15}, 0)`}
          >
            <ellipse cx="320" cy="180" rx="140" ry="48" />
            <ellipse cx="420" cy="195" rx="110" ry="40" />
            <ellipse cx="1380" cy="145" rx="170" ry="52" />
            <ellipse cx="1500" cy="160" rx="120" ry="42" />
          </g>

          {/* Distant Flying White Cranes (বক) */}
          {[0, 1, 2, 3].map((cIdx) => {
            const cx = 1500 - ((frame * 1.4 + cIdx * 75) % 1600);
            const cy = 150 + cIdx * 24 + Math.sin(frame * 0.2 + cIdx) * 8;
            const wingY = Math.sin(frame * 0.35 + cIdx) * 10;
            return (
              <path
                key={`crane-${cIdx}`}
                d={`M${cx - 14},${cy + wingY} Q${cx - 5},${cy - 8} ${cx},${cy} Q${
                  cx + 5
                },${cy - 8} ${cx + 14},${cy + wingY}`}
                fill="none"
                stroke="#FFF8E7"
                strokeWidth="3"
              />
            );
          })}

          {/* Distant Horizon Palm (তাল গাছ) & Banana Groves */}
          <path
            d="M0,700 Q480,650 960,690 T1920,680 L1920,1080 L0,1080 Z"
            fill="#1E3F1B"
          />
          {[180, 310, 1660, 1790].map((px, idx) => (
            <g key={`palm-${idx}`} transform={`translate(${px}, 460)`}>
              <rect x="-7" y="0" width="14" height="240" fill="#142912" />
              <circle cx="0" cy="0" r="38" fill="#1E3F1B" />
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      {/* LAYER 1: Midground (0.5x Parallax) - Lush Green Village Field, Distant Terracotta Huts */}
      <AbsoluteFill style={getLayerTransform(0.5)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Rolling Green Field (গ্রামের মাঠ) */}
          <path
            d="M0,715 Q620,675 1240,720 T1920,700 L1920,1080 L0,1080 Z"
            fill="#2D5A27"
          />
          {/* Earthern Village Footpath */}
          <path
            d="M0,890 Q600,820 1250,875 T1920,850 L1920,1080 L0,1080 Z"
            fill="#C47A53"
            stroke="#7C3F23"
            strokeWidth="4"
          />

          {/* Distant Background Kite in Safe Open Field (Far Left) */}
          <g
            transform={`translate(${240 + Math.sin(frame * 0.08) * 18}, ${
              290 + Math.cos(frame * 0.06) * 14
            }) rotate(-18)`}
          >
            <polygon
              points="0,-28 24,0 0,28 -24,0"
              fill="#22C55E"
              stroke="#FFF8E7"
              strokeWidth="2.5"
            />
          </g>

          {/* Village Mud Hut (মাটির বাড়ি) on Left Midground */}
          <g transform="translate(90, 560)">
            <rect
              x="0"
              y="70"
              width="210"
              height="125"
              fill="#C47A53"
              stroke="#4A2511"
              strokeWidth="4"
            />
            <polygon
              points="-25,75 105,0 235,75"
              fill="#D97706"
              stroke="#4A2511"
              strokeWidth="4"
            />
            <rect x="82" y="115" width="44" height="80" fill="#4A2511" />
          </g>
        </svg>
      </AbsoluteFill>

      {/* LAYER 2: Focus Plane (1.0x Parallax) - 11kV Overhead Lines, Fenced WBSEDCL DTR Transformer, Tangled Kite, Bishu & Bidyut Bondhu */}
      <AbsoluteFill style={getLayerTransform(1.0)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* WBSEDCL Double-Pole Structure & Fenced Distribution Transformer (DTR 11kV/440V) */}
          <g transform="translate(1320, 140)">
            {/* Two Concrete Poles */}
            <rect
              x="40"
              y="0"
              width="24"
              height="740"
              fill="#94A3B8"
              stroke="#334155"
              strokeWidth="4"
            />
            <rect
              x="260"
              y="0"
              width="24"
              height="740"
              fill="#94A3B8"
              stroke="#334155"
              strokeWidth="4"
            />

            {/* Top Cross-Arm & Porcelain Insulators */}
            <rect
              x="10"
              y="48"
              width="304"
              height="16"
              fill="#475569"
              stroke="#1E293B"
              strokeWidth="3"
            />
            {[35, 162, 285].map((ix, idx) => (
              <g key={`ins-${idx}`} transform={`translate(${ix}, 20)`}>
                <rect x="-8" y="0" width="16" height="28" rx="4" fill="#7C2D12" />
                <ellipse cx="0" cy="8" rx="12" ry="4" fill="#9A3412" />
                <ellipse cx="0" cy="18" rx="12" ry="4" fill="#9A3412" />
              </g>
            ))}

            {/* Transformer Support Channel & DTR Box */}
            <rect
              x="25"
              y="340"
              width="274"
              height="18"
              fill="#334155"
              stroke="#0F172A"
              strokeWidth="3"
            />
            {/* DTR Cooling Fins & Main Tank */}
            <rect
              x="78"
              y="210"
              width="168"
              height="130"
              rx="8"
              fill="#475569"
              stroke="#0F172A"
              strokeWidth="5"
            />
            {[96, 118, 140, 184, 206, 228].map((fx, idx) => (
              <line
                key={`fin-${idx}`}
                x1={fx}
                y1="222"
                x2={fx}
                y2="328"
                stroke="#1E293B"
                strokeWidth="5"
              />
            ))}
            {/* Conservator Tank on Top of DTR */}
            <rect
              x="105"
              y="172"
              width="114"
              height="28"
              rx="14"
              fill="#64748B"
              stroke="#0F172A"
              strokeWidth="4"
            />

            {/* Red/Yellow High-Voltage Danger Plate on Transformer */}
            <rect
              x="98"
              y="245"
              width="128"
              height="64"
              rx="6"
              fill="#FFD600"
              stroke="#DC2626"
              strokeWidth="4"
            />
            <text
              x="162"
              y="272"
              textAnchor="middle"
              fontSize="18"
              fontWeight="900"
              fill="#DC2626"
            >
              ⚡ DANGER
            </text>
            <text
              x="162"
              y="298"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              fill="#0F172A"
            >
              11kV / 440V
            </text>

            {/* Protective Metal Mesh Fence around DTR Base */}
            <g transform="translate(-10, 520)">
              <rect
                x="0"
                y="0"
                width="344"
                height="225"
                fill="#1E293B"
                fillOpacity="0.35"
                stroke="#475569"
                strokeWidth="6"
              />
              {/* Diamond Mesh Lines */}
              {Array.from({ length: 11 }).map((_, mIdx) => (
                <g key={`mesh-${mIdx}`} stroke="#94A3B8" strokeWidth="1.8" opacity="0.65">
                  <line x1={mIdx * 34} y1="0" x2="0" y2={mIdx * 22} />
                  <line x1={mIdx * 34} y1="225" x2="344" y2={225 - mIdx * 22} />
                </g>
              ))}
              {/* Fence Warning Sign */}
              <rect
                x="72"
                y="75"
                width="200"
                height="62"
                rx="8"
                fill="#DC2626"
                stroke="#FFF8E7"
                strokeWidth="3"
              />
              <text
                x="172"
                y="102"
                textAnchor="middle"
                fontSize="18"
                fontWeight="900"
                fill="#FFF8E7"
              >
                বিপজ্জনক স্থান (DTR)
              </text>
              <text
                x="172"
                y="126"
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill="#FFD600"
              >
                ভিতরে প্রবেশ নিষেধ
              </text>
            </g>
          </g>

          {/* High-Voltage 11kV Overhead Power Lines Spanning Across Sky */}
          <g fill="none" stroke="#0F172A" strokeWidth="5">
            <path d="M0,150 Q680,245 1355,165" />
            <path d="M0,195 Q680,290 1482,165" />
            <path d="M0,240 Q680,335 1605,165" />
          </g>

          {/* MAGENTA & YELLOW DIAMOND KITE (ঘুড়ি) */}
          <g
            transform={`translate(${kiteX}, ${kiteY}) rotate(${
              isTangled ? 38 + Math.sin(frame * 0.4) * 5 : -15 + Math.sin(frame * 0.1) * 8
            })`}
          >
            {/* Diamond Body */}
            <polygon
              points="0,-58 52,0 0,58 -52,0"
              fill="#E11D48"
              stroke="#FFF8E7"
              strokeWidth="4"
            />
            <polygon points="0,-58 52,0 0,0" fill="#FFD600" />
            <polygon points="0,58 -52,0 0,0" fill="#FFD600" />
            {/* Cross Spars */}
            <line x1="0" y1="-58" x2="0" y2="58" stroke="#4A2511" strokeWidth="3" />
            <path
              d="M-52,0 Q0,-24 52,0"
              fill="none"
              stroke="#4A2511"
              strokeWidth="3"
            />
            {/* Tail Ribbons */}
            <polygon points="0,58 -18,92 18,92" fill="#E11D48" stroke="#FFF8E7" strokeWidth="2" />
          </g>

          {/* Wet Manja/Cotton Kite String from Child's Reel (x=480, y=735) to Kite */}
          <path
            d={`M480,735 Q${(480 + kiteX) / 2},${(735 + kiteY) / 2 + 65} ${kiteX},${kiteY}`}
            fill="none"
            stroke={isTangled ? '#00F2FE' : '#FFF8E7'}
            strokeWidth={isTangled ? '4' : '2.5'}
          />

          {/* HIGH-VOLTAGE SPARKS (#00F2FE & #FFD600) When Kite Tangles in 11kV Line */}
          {isTangled && (
            <g>
              {/* Arc Burst at Tangled Kite Point */}
              <circle
                cx={kiteX}
                cy={kiteY}
                r={36 + Math.sin(frame * 0.8) * 14}
                fill="#00F2FE"
                opacity="0.45"
              />
              <circle cx={kiteX} cy={kiteY} r="16" fill="#FFD600" />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = ((deg + frame * 9) * Math.PI) / 180;
                return (
                  <line
                    key={`spark-ray-${deg}`}
                    x1={kiteX}
                    y1={kiteY}
                    x2={kiteX + Math.cos(rad) * 65}
                    y2={kiteY + Math.sin(rad) * 65}
                    stroke="#00F2FE"
                    strokeWidth="4"
                  />
                );
              })}

              {/* Electric Pulse Travelling Down the Wet Kite String */}
              {[0, 0.33, 0.66].map((offset, idx) => {
                const t = (sparkProgress + offset) % 1;
                const sx = (1 - t) * kiteX + t * 480;
                const sy =
                  (1 - t) * kiteY +
                  t * 735 +
                  4 * t * (1 - t) * 65;
                return (
                  <g key={`string-spark-${idx}`} transform={`translate(${sx}, ${sy})`}>
                    <circle cx="0" cy="0" r="14" fill="#00F2FE" opacity="0.65" />
                    <circle cx="0" cy="0" r="7" fill="#FFD600" />
                  </g>
                );
              })}
            </g>
          )}

          {/* Younger Child Holding Kite Reel (লাটাই) on Left */}
          <g transform="translate(410, 650)">
            {/* Legs */}
            <rect x="16" y="135" width="18" height="80" rx="6" fill="#D97706" stroke="#0F172A" strokeWidth="3" />
            <rect x="44" y="135" width="18" height="80" rx="6" fill="#D97706" stroke="#0F172A" strokeWidth="3" />
            {/* Body */}
            <path d="M8,60 L68,60 L64,145 L12,145 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="3.5" />
            {/* Head */}
            <circle cx="38" cy="25" r="28" fill="#D97706" stroke="#0F172A" strokeWidth="3.5" />
            <path d="M10,18 Q38,-14 66,18 Z" fill="#0F172A" />
            {/* Wooden Latai (Spool) */}
            <g transform="translate(72, 75)">
              <polygon points="0,-20 26,0 0,20 -12,0" fill="#B45309" stroke="#0F172A" strokeWidth="3" />
              <circle cx="6" cy="0" r="10" fill="#E11D48" />
            </g>
          </g>

          {/* SCENE 8: BISHU APPROACHING WITH GREEN BAMBOO STICK (কাঁচা বাঁশ) */}
          {isScene8 && (
            <g
              transform={`translate(${interpolate(
                bishuWalk,
                [0, 1],
                [760, 1020]
              )}, 540)`}
            >
              {/* Legs */}
              <rect x="15" y="180" width="22" height="115" rx="8" fill="#D97706" stroke="#0F172A" strokeWidth="3.5" />
              <rect x="52" y="180" width="22" height="115" rx="8" fill="#D97706" stroke="#0F172A" strokeWidth="3.5" />
              {/* Shorts & Shirt */}
              <rect x="8" y="140" width="72" height="52" rx="6" fill="#1E3A8A" stroke="#0F172A" strokeWidth="3.5" />
              <path d="M4,55 L84,55 L78,145 L10,145 Z" fill="#F59E0B" stroke="#0F172A" strokeWidth="3.5" />
              {/* Head */}
              <circle cx="44" cy="18" r="34" fill="#D97706" stroke="#0F172A" strokeWidth="3.5" />
              <path d="M10,10 Q44,-28 78,10 Z" fill="#0F172A" />

              {/* Long Green Bamboo Pole (কাঁচা বাঁশ) Reaching Up Toward Tangled Kite */}
              <g
                transform={`translate(65, 85) rotate(${
                  scene8Frame > 85 ? -28 : -52
                })`}
              >
                <rect
                  x="0"
                  y="-8"
                  width="390"
                  height="16"
                  rx="6"
                  fill="#22C55E"
                  stroke="#14532D"
                  strokeWidth="3.5"
                />
                {/* Bamboo joints & green leaves */}
                {[70, 150, 230, 310].map((bx) => (
                  <line
                    key={`bjoint-${bx}`}
                    x1={bx}
                    y1="-8"
                    x2={bx}
                    y2="8"
                    stroke="#14532D"
                    strokeWidth="4"
                  />
                ))}
                {/* Label Tag on Green Bamboo */}
                <g transform="translate(140, -48) rotate(28)">
                  <rect
                    x="0"
                    y="0"
                    width="145"
                    height="34"
                    rx="8"
                    fill="#DC2626"
                    stroke="#FFF8E7"
                    strokeWidth="2.5"
                  />
                  <text
                    x="72"
                    y="23"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="800"
                    fill="#FFF8E7"
                  >
                    কাঁচা বাঁশ ❌
                  </text>
                </g>
              </g>
            </g>
          )}

          {/* SCENE 8: BIDYUT BONDHU MASCOT WITH GIANT RED CROSS ❌ & SAFETY SHIELD */}
          {isScene8 && (
            <g
              transform={`translate(1165, ${
                445 + Math.sin(frame * 0.14) * 10
              }) scale(${mascotPop})`}
            >
              {/* Giant Red Cross Shield Blocking the Bamboo Pole */}
              <g transform="translate(-85, -55)">
                <circle
                  cx="0"
                  cy="0"
                  r="64"
                  fill="#DC2626"
                  stroke="#FFF8E7"
                  strokeWidth="6"
                />
                <path
                  d="M-28,-28 L28,28 M28,-28 L-28,28"
                  stroke="#FFF8E7"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </g>

              {/* Bidyut Bondhu Lantern Body */}
              <circle cx="0" cy="0" r="105" fill="#FFD600" opacity="0.28" />
              <path
                d="M-38,-48 L38,-48 L50,40 L-50,40 Z"
                fill="#F59E0B"
                stroke="#4A2511"
                strokeWidth="4.5"
              />
              <rect
                x="-30"
                y="-34"
                width="60"
                height="60"
                rx="12"
                fill="#FEF08A"
                stroke="#B45309"
                strokeWidth="3.5"
              />
              <circle cx="-12" cy="-10" r="6" fill="#0F172A" />
              <circle cx="12" cy="-10" r="6" fill="#0F172A" />
              <path
                d="M-12,10 Q0,20 12,10"
                fill="none"
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M-46,-48 Q0,-90 46,-48 Z"
                fill="#D97706"
                stroke="#4A2511"
                strokeWidth="4.5"
              />
            </g>
          )}
        </svg>

        {/* SCENE 7 CALLOUT BANNER (When kite tangles in 11kV overhead wire) */}
        {!isScene8 && isTangled && (
          <div
            style={{
              position: 'absolute',
              top: 90,
              left: 75,
              backgroundColor: 'rgba(127, 29, 29, 0.95)',
              border: '4px solid #FFD600',
              borderRadius: 20,
              padding: '18px 28px',
              maxWidth: 640,
              boxShadow: '0 14px 32px rgba(0,0,0,0.5)',
              transform: `scale(${spring({
                frame: frame - 180,
                fps,
                config: { damping: 12 },
              })})`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: '#FFD600',
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              <AlertOctagon size={34} color="#FFD600" />
              <span>হাই-ভোল্টেজ ১১ কেভি (11kV) লাইনে ঘুড়ি আটকেছে!</span>
            </div>
            <div
              style={{
                color: '#FFF8E7',
                fontSize: 20,
                fontWeight: 700,
                marginTop: 6,
              }}
            >
              ভেজা সুতো বা মাঞ্জা সুতো দিয়ে মারাত্মক বিদ্যুৎ প্রবাহিত হয়ে নিচে নেমে আসছে!
            </div>
          </div>
        )}

        {/* SCENE 8 SPRING-ANIMATED RULE CARDS */}
        {isScene8 && (
          <div
            style={{
              position: 'absolute',
              top: 95,
              left: 65,
              width: 680,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            {/* Rule Card 1 */}
            <div
              style={{
                transform: `scale(${rule1Spring}) translateY(${interpolate(
                  rule1Spring,
                  [0, 1],
                  [40, 0]
                )}px)`,
                backgroundColor: '#FFF8E7',
                border: '5px solid #DC2626',
                borderRadius: 22,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  backgroundColor: '#FEE2E2',
                  border: '3px solid #DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Ban size={44} color="#DC2626" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: '#991B1B',
                    lineHeight: 1.3,
                  }}
                >
                  ১. বিদ্যুতের লাইনের কাছে ঘুড়ি ওড়াবেন না
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: '#1E293B',
                    marginTop: 4,
                  }}
                >
                  খোলা মাঠে ঘুড়ি ওড়ান — ইলেকট্রিক তার বা ট্রান্সফরমারের কাছে নয়।
                </div>
              </div>
            </div>

            {/* Rule Card 2 */}
            <div
              style={{
                transform: `scale(${rule2Spring}) translateY(${interpolate(
                  rule2Spring,
                  [0, 1],
                  [40, 0]
                )}px)`,
                backgroundColor: '#FFF8E7',
                border: '5px solid #EA580C',
                borderRadius: 22,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  backgroundColor: '#FFEDD5',
                  border: '3px solid #EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldAlert size={44} color="#EA580C" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: '#9A3412',
                    lineHeight: 1.3,
                  }}
                >
                  ২. তারে আটকে থাকা ঘুড়ি বাঁশ বা লাঠি দিয়ে নামাবেন না
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: '#1E293B',
                    marginTop: 4,
                  }}
                >
                  কাঁচা বাঁশ ও ভেজা সুতোয় বিদ্যুৎ প্রবাহিত হয় — ট্রান্সফরমারের বেড়ার ভেতর ঢুকবেন না!
                </div>
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* LAYER 3: Foreground Occlusion Elements (1.4x Parallax) - Foreground Grass Blades & Bamboo Fence Posts */}
      <AbsoluteFill style={{ ...getLayerTransform(1.4), pointerEvents: 'none' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Foreground swaying grass tufts along bottom edge */}
          {Array.from({ length: 18 }).map((_, idx) => {
            const gx = idx * 112;
            const sway = Math.sin(frame * 0.08 + idx) * 10;
            return (
              <g key={`grass-${idx}`} fill="#142912">
                <path
                  d={`M${gx},1080 Q${gx - 15 + sway},1000 ${
                    gx - 28 + sway
                  },955 Q${gx + 5},1010 ${gx + 18},1080 Z`}
                />
                <path
                  d={`M${gx + 15},1080 Q${gx + 25 + sway},985 ${
                    gx + 42 + sway
                  },940 Q${gx + 30},1010 ${gx + 35},1080 Z`}
                />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* PATACHITRA FRAME & SUBTITLE BANNER */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <rect
            x="14"
            y="14"
            width="1892"
            height="1052"
            rx="18"
            fill="none"
            stroke="#C47A53"
            strokeWidth="12"
          />
          <rect
            x="24"
            y="24"
            width="1872"
            height="1032"
            rx="12"
            fill="none"
            stroke="#FFD600"
            strokeWidth="3"
            strokeDasharray="16 10"
          />
        </svg>

        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            border: '3px solid #FFD600',
            borderRadius: 18,
            padding: '14px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
          }}
        >
          <Zap size={32} color="#FFD600" fill="#FFD600" />
          <span
            style={{
              color: '#FFF8E7',
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {isScene8
              ? 'তারে আটকে যাওয়া ঘুড়ি কাঁচা বাঁশ দিয়ে নামাতে যাবেন না এবং ডিটিআর (DTR) বেড়ার কাছে যাবেন না!'
              : 'বিদ্যুতের লাইনের কাছে ঘুড়ি ওড়ানো মারাত্মক বিপজ্জনক — সুতো দিয়ে বিদ্যুৎ প্রবাহিত হতে পারে।'}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
