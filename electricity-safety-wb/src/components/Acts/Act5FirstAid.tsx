import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  CheckCircle2,
  HeartPulse,
  PhoneCall,
  PowerOff,
  ShieldCheck,
  XCircle,
  Zap,
} from 'lucide-react';

export const Act5FirstAid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 9 (0-450): Split / Sequential comparison of WRONG (0-220) vs CORRECT (220-450) rescue
  // Scene 10 (450-900): Golden Rules of First Aid (প্রাথমিক চিকিৎসার নিয়মাবলী) with Mitu, adults & 3 animated step badges
  const isScene10 = frame >= 450;
  const isCorrectPhase = frame >= 220 && frame < 450;
  const scene10Frame = Math.max(0, frame - 450);

  // 4-Layer 2.5D Parallax Camera System
  const camX = interpolate(
    frame,
    [0, 220, 450, 700, 900],
    [25, -25, 0, -15, 0],
    { extrapolateRight: 'clamp' }
  );
  const camY = interpolate(
    frame,
    [0, 220, 450, 700, 900],
    [10, -10, 0, 8, 0],
    { extrapolateRight: 'clamp' }
  );
  const camScale = interpolate(
    frame,
    [0, 210, 220, 440, 450, 900],
    [1.0, 1.05, 1.0, 1.06, 1.0, 1.03],
    { extrapolateRight: 'clamp' }
  );

  const getLayerTransform = (speed: number) => ({
    transform: `translate3d(${camX * speed}px, ${camY * speed}px, 0) scale(${
      1 + (camScale - 1) * speed
    })`,
    transformOrigin: 'center center',
  });

  // Main Switch Toggle animation in Correct Phase (frames 220-310)
  const switchToggle = interpolate(
    frame,
    [235, 275],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Dry Bamboo Pole push animation in Correct Phase (frames 285-380)
  const bambooPush = interpolate(
    frame,
    [285, 360],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Step Badges Staggered Springs in Scene 10
  const badge1Spring = spring({
    frame: Math.max(0, scene10Frame - 35),
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const badge2Spring = spring({
    frame: Math.max(0, scene10Frame - 105),
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const badge3Spring = spring({
    frame: Math.max(0, scene10Frame - 175),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
      }}
    >
      {/* LAYER 0: Deep Background (0.2x Parallax) - Rural Household Courtyard Window & Sky */}
      <AbsoluteFill style={getLayerTransform(0.2)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <rect width="1920" height="1080" fill="#1E293B" />
          {/* Distant Window View showing green village grove */}
          <g transform="translate(840, 160)">
            <rect
              x="0"
              y="0"
              width="240"
              height="260"
              rx="10"
              fill="#38BDF8"
              stroke="#4A2511"
              strokeWidth="10"
            />
            <path d="M0,185 Q120,140 240,180 L240,260 L0,260 Z" fill="#2D5A27" />
            {/* Wooden Window Bars */}
            {[60, 120, 180].map((wx) => (
              <line
                key={`wbar-${wx}`}
                x1={wx}
                y1="0"
                x2={wx}
                y2="260"
                stroke="#4A2511"
                strokeWidth="6"
              />
            ))}
          </g>
        </svg>
      </AbsoluteFill>

      {/* LAYER 1: Midground (0.5x Parallax) - Terracotta Mud Room Interior & Floor */}
      <AbsoluteFill style={getLayerTransform(0.5)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Terracotta Mud Wall with Cutout for Window */}
          <path
            d="M0,0 L1920,0 L1920,820 L0,820 Z M840,160 L840,420 L1080,420 L1080,160 Z"
            fill="#C47A53"
            fillRule="evenodd"
          />
          {/* Lower Terracotta Dado & Alpana Border */}
          <rect x="0" y="680" width="1920" height="140" fill="#9A5835" />
          <line
            x1="0"
            y1="680"
            x2="1920"
            y2="680"
            stroke="#FFF8E7"
            strokeWidth="4"
            strokeDasharray="20 12"
          />
          {/* Earthern Room Floor */}
          <rect x="0" y="820" width="1920" height="260" fill="#6E3B23" />
        </svg>
      </AbsoluteFill>

      {/* LAYER 2: Focus Plane (1.0x Parallax) - Scene 9 Split Comparison (Wrong vs Correct) & Scene 10 First Aid */}
      <AbsoluteFill style={getLayerTransform(1.0)}>
        {!isScene10 ? (
          /* ==================== SCENE 9: SPLIT COMPARISON (FRAMES 0-450) ==================== */
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            {/* LEFT PANEL: ভুল পদ্ধতি (WRONG) ❌ (Highlighted 0-220, dimmed slightly 220-450) */}
            <g opacity={isCorrectPhase ? 0.48 : 1}>
              {/* Panel Card Frame */}
              <rect
                x="60"
                y="75"
                width="860"
                height="840"
                rx="26"
                fill="#1E1B2E"
                stroke="#EF4444"
                strokeWidth="8"
              />
              {/* Header Banner: ভুল পদ্ধতি (WRONG) ❌ */}
              <rect
                x="60"
                y="75"
                width="860"
                height="92"
                rx="22"
                fill="#991B1B"
              />
              <text
                x="490"
                y="134"
                textAnchor="middle"
                fontSize="36"
                fontWeight="900"
                fill="#FFF8E7"
              >
                ভুল পদ্ধতি (WRONG) ❌ — খালি হাতে স্পর্শ নয়!
              </text>

              {/* Faulty Live Iron / Appliance on Table */}
              <rect x="680" y="540" width="170" height="260" rx="8" fill="#78350F" />
              <path
                d="M715,540 L795,540 L780,500 L730,500 Z"
                fill="#94A3B8"
                stroke="#00F2FE"
                strokeWidth="4"
              />
              {/* Exposed Live Wire Arcing */}
              <path
                d="M780,520 Q830,450 860,360"
                fill="none"
                stroke="#00F2FE"
                strokeWidth="5"
              />

              {/* Secondary Electrocution X-Ray / Ghost Cyan Shock Wave (#00F2FE) Across Both Figures */}
              <g
                opacity={0.55 + Math.sin(frame * 0.65) * 0.35}
              >
                <ellipse
                  cx="480"
                  cy="550"
                  rx="280"
                  ry="190"
                  fill="#00F2FE"
                  opacity="0.22"
                />
                {/* High-Voltage Lightning Arc Bridging Victim and Bare-Handed Rescuer */}
                <polyline
                  points="735,515 620,475 565,510 460,465 360,505 260,480"
                  fill="none"
                  stroke="#00F2FE"
                  strokeWidth="8"
                />
                <polyline
                  points="735,515 610,505 540,470 440,515 340,475 260,480"
                  fill="none"
                  stroke="#FFD600"
                  strokeWidth="4"
                />
              </g>

              {/* Victim Touching Faulty Appliance (Right Figure in Left Panel) */}
              <g transform="translate(555, 365)">
                <rect x="18" y="235" width="24" height="175" rx="8" fill="#D97706" />
                <rect x="58" y="235" width="24" height="175" rx="8" fill="#D97706" />
                <path d="M5,90 L95,90 L88,245 L12,245 Z" fill="#0284C7" stroke="#00F2FE" strokeWidth="4" />
                <circle cx="50" cy="40" r="38" fill="#D97706" stroke="#00F2FE" strokeWidth="4" />
                {/* Arm stuck to live appliance */}
                <line x1="85" y1="115" x2="175" y2="145" stroke="#D97706" strokeWidth="22" strokeLinecap="round" />
                {/* X-ray Skeleton Ribcage Flash */}
                {frame % 6 < 3 && (
                  <g stroke="#00F2FE" strokeWidth="4" opacity="0.85">
                    <line x1="50" y1="95" x2="50" y2="195" />
                    <line x1="25" y1="115" x2="75" y2="115" />
                    <line x1="22" y1="140" x2="78" y2="140" />
                    <line x1="26" y1="165" x2="74" y2="165" />
                  </g>
                )}
              </g>

              {/* Bare-Handed Rescuer Grabbing Victim & Getting Shocked Too (Left Figure in Left Panel) */}
              <g transform="translate(215, 365)">
                <rect x="18" y="235" width="24" height="175" rx="8" fill="#D97706" />
                <rect x="58" y="235" width="24" height="175" rx="8" fill="#D97706" />
                <path d="M5,90 L95,90 L88,245 L12,245 Z" fill="#E11D48" stroke="#00F2FE" strokeWidth="4" />
                <circle cx="50" cy="40" r="38" fill="#D97706" stroke="#00F2FE" strokeWidth="4" />
                {/* Bare arm touching victim */}
                <line x1="88" y1="125" x2="345" y2="125" stroke="#D97706" strokeWidth="22" strokeLinecap="round" />
                {frame % 6 < 3 && (
                  <g stroke="#00F2FE" strokeWidth="4" opacity="0.85">
                    <line x1="50" y1="95" x2="50" y2="195" />
                    <line x1="25" y1="115" x2="75" y2="115" />
                    <line x1="22" y1="140" x2="78" y2="140" />
                    <line x1="26" y1="165" x2="74" y2="165" />
                  </g>
                )}
              </g>

              {/* Bottom Warning Caption in Left Panel */}
              <rect
                x="110"
                y="805"
                width="760"
                height="74"
                rx="14"
                fill="#7F1D1D"
                stroke="#EF4444"
                strokeWidth="3"
              />
              <text
                x="490"
                y="852"
                textAnchor="middle"
                fontSize="26"
                fontWeight="800"
                fill="#FFF8E7"
              >
                খালি হাতে ধরলে উদ্ধারকারীও বিদ্যুৎস্পৃষ্ট হবেন!
              </text>
            </g>

            {/* RIGHT PANEL: সঠিক পদ্ধতি (CORRECT) ✔️ (Highlighted strongly 220-450) */}
            <g
              opacity={isCorrectPhase ? 1 : 0.42}
              transform={`scale(${isCorrectPhase ? 1 : 0.98})`}
              style={{ transformOrigin: '1430px 495px' }}
            >
              {/* Panel Card Frame */}
              <rect
                x="1000"
                y="75"
                width="860"
                height="840"
                rx="26"
                fill="#0F291E"
                stroke="#22C55E"
                strokeWidth="8"
              />
              {/* Header Banner: সঠিক পদ্ধতি (CORRECT) ✔️ */}
              <rect
                x="1000"
                y="75"
                width="860"
                height="92"
                rx="22"
                fill="#15803D"
              />
              <text
                x="1430"
                y="134"
                textAnchor="middle"
                fontSize="34"
                fontWeight="900"
                fill="#FFF8E7"
              >
                সঠিক পদ্ধতি (CORRECT) ✔️ — মেন সুইচ ও শুকনো বাঁশ
              </text>

              {/* STEP 1 INSET: Main Switch Toggle Box (মেন সুইচ বন্ধ করুন) */}
              <g transform="translate(1045, 200)">
                <rect
                  x="0"
                  y="0"
                  width="330"
                  height="170"
                  rx="16"
                  fill="#1E293B"
                  stroke="#FFD600"
                  strokeWidth="4"
                />
                {/* Main Switch Metal Box */}
                <rect
                  x="24"
                  y="24"
                  width="95"
                  height="120"
                  rx="8"
                  fill="#64748B"
                  stroke="#0F172A"
                  strokeWidth="4"
                />
                {/* Animated Lever Handle toggling from ON (top) to OFF (bottom) */}
                <g
                  transform={`translate(119, 75) rotate(${interpolate(
                    switchToggle,
                    [0, 1],
                    [-35, 40]
                  )})`}
                >
                  <rect x="0" y="-8" width="42" height="16" rx="4" fill="#0F172A" />
                  <circle cx="42" cy="0" r="14" fill="#EF4444" />
                </g>
                <text x="175" y="65" fontSize="23" fontWeight="900" fill="#FFD600">
                  ১. মেন সুইচ বন্ধ করুন
                </text>
                <text
                  x="175"
                  y="102"
                  fontSize="20"
                  fontWeight="800"
                  fill={switchToggle > 0.5 ? '#22C55E' : '#EF4444'}
                >
                  {switchToggle > 0.5 ? 'POWER: OFF ✔️' : 'POWER: ON ⚡'}
                </text>
              </g>

              {/* Dry Wooden Plank / Rubber Mat under Rescuer's Feet */}
              <rect
                x="1055"
                y="765"
                width="240"
                height="26"
                rx="6"
                fill="#B45309"
                stroke="#FFF8E7"
                strokeWidth="3"
              />
              <text
                x="1175"
                y="754"
                textAnchor="middle"
                fontSize="18"
                fontWeight="800"
                fill="#FFD600"
              >
                শুকনো কাঠের পাটাতন / রাবার ম্যাট
              </text>

              {/* Rescuer Standing on Dry Wooden Plank Using Dry Bamboo Pole (শুকনো বাঁশ) */}
              <g transform="translate(1110, 390)">
                <rect x="18" y="210" width="24" height="165" rx="8" fill="#D97706" />
                <rect x="58" y="210" width="24" height="165" rx="8" fill="#D97706" />
                {/* Rubber Slippers */}
                <rect x="10" y="362" width="38" height="14" rx="5" fill="#FFD600" />
                <rect x="52" y="362" width="38" height="14" rx="5" fill="#FFD600" />
                <path d="M5,85 L95,85 L88,225 L12,225 Z" fill="#16A34A" stroke="#0F172A" strokeWidth="4" />
                <circle cx="50" cy="36" r="36" fill="#D97706" stroke="#0F172A" strokeWidth="4" />

                {/* Dry Golden-Brown Bamboo Stick (শুকনো বাঁশ) Pushing Wire/Victim Safely */}
                <g
                  transform={`translate(75, 120) translate(${
                    bambooPush * 35
                  }, 0)`}
                >
                  <rect
                    x="0"
                    y="-10"
                    width="390"
                    height="20"
                    rx="8"
                    fill="#D97706"
                    stroke="#4A2511"
                    strokeWidth="4"
                  />
                  {[80, 160, 240, 320].map((jx) => (
                    <line
                      key={`dry-joint-${jx}`}
                      x1={jx}
                      y1="-10"
                      x2={jx}
                      y2="10"
                      stroke="#4A2511"
                      strokeWidth="4"
                    />
                  ))}
                  <rect
                    x="110"
                    y="-52"
                    width="175"
                    height="36"
                    rx="8"
                    fill="#15803D"
                    stroke="#FFF8E7"
                    strokeWidth="2.5"
                  />
                  <text
                    x="197"
                    y="-27"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="900"
                    fill="#FFF8E7"
                  >
                    শুকনো বাঁশ / কাঠ ✔️
                  </text>
                </g>
              </g>

              {/* Separated Victim (Pushed safely away from wire as bambooPush -> 1) */}
              <g
                transform={`translate(${1560 + bambooPush * 55}, 390)`}
              >
                <rect x="18" y="210" width="24" height="165" rx="8" fill="#D97706" />
                <rect x="58" y="210" width="24" height="165" rx="8" fill="#D97706" />
                <path d="M5,85 L95,85 L88,225 L12,225 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="4" />
                <circle cx="50" cy="36" r="36" fill="#D97706" stroke="#0F172A" strokeWidth="4" />
              </g>

              {/* Bottom Caption in Right Panel */}
              <rect
                x="1050"
                y="805"
                width="760"
                height="74"
                rx="14"
                fill="#14532D"
                stroke="#22C55E"
                strokeWidth="3"
              />
              <text
                x="1430"
                y="852"
                textAnchor="middle"
                fontSize="25"
                fontWeight="800"
                fill="#FFF8E7"
              >
                মেন সুইচ বন্ধ করুন এবং শুকনো বাঁশ বা কাঠ দিয়ে তারটি সরিয়ে দিন!
              </text>
            </g>
          </svg>
        ) : (
          /* ==================== SCENE 10: GOLDEN RULES OF FIRST AID (FRAMES 450-900) ==================== */
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            {/* Title Header Card */}
            <g transform="translate(460, 55)">
              <rect
                x="0"
                y="0"
                width="1000"
                height="96"
                rx="24"
                fill="#0F172A"
                stroke="#FFD600"
                strokeWidth="5"
              />
              <text
                x="500"
                y="62"
                textAnchor="middle"
                fontSize="40"
                fontWeight="900"
                fill="#FFD600"
              >
                প্রাথমিক চিকিৎসার নিয়মাবলী (Golden Rules of First Aid)
              </text>
            </g>

            {/* Woven Shitalpati Mat on Veranda Floor for Recovery Position */}
            <g transform="translate(880, 650)">
              <polygon
                points="40,0 880,0 940,210 -20,210"
                fill="#D97706"
                stroke="#78350F"
                strokeWidth="6"
              />
              {/* Patient Resting Safely in Recovery Position under Warm Blanket */}
              <g transform="translate(180, 55)">
                {/* Pillow */}
                <rect
                  x="0"
                  y="20"
                  width="95"
                  height="55"
                  rx="18"
                  fill="#FFF8E7"
                  stroke="#475569"
                  strokeWidth="3"
                />
                {/* Patient Head */}
                <circle
                  cx="55"
                  cy="42"
                  r="36"
                  fill="#D97706"
                  stroke="#0F172A"
                  strokeWidth="4"
                />
                {/* Breathing Indicator Wave near Nose/Chest */}
                <circle
                  cx="135"
                  cy="45"
                  r={18 + Math.sin(frame * 0.15) * 6}
                  fill="#22C55E"
                  opacity="0.4"
                />
                {/* Warm Blanket Covering Body */}
                <path
                  d="M95,25 Q290,5 480,35 L490,115 L95,115 Z"
                  fill="#0284C7"
                  stroke="#0F172A"
                  strokeWidth="4"
                />
              </g>

              {/* Mitu (10yo girl in blue school uniform) & Adult Calling Doctor / Ambulance */}
              <g transform="translate(650, -230)">
                {/* Adult Villager with Phone Calling Doctor */}
                <rect x="20" y="190" width="24" height="140" rx="8" fill="#D97706" />
                <rect x="60" y="190" width="24" height="140" rx="8" fill="#D97706" />
                <path d="M8,70 L96,70 L90,200 L14,200 Z" fill="#FFF8E7" stroke="#0F172A" strokeWidth="4" />
                <circle cx="52" cy="28" r="34" fill="#D97706" stroke="#0F172A" strokeWidth="4" />
                {/* Phone at Ear with Sonic Rings */}
                <rect x="76" y="14" width="16" height="32" rx="4" fill="#0F172A" />
                <circle
                  cx="95"
                  cy="24"
                  r={22 + ((frame * 1.5) % 35)}
                  fill="none"
                  stroke="#00F2FE"
                  strokeWidth="3"
                  opacity={1 - ((frame * 1.5) % 35) / 35}
                />

                {/* Mitu in Blue School Uniform Assisting */}
                <g transform="translate(-145, 55)">
                  <rect x="16" y="145" width="18" height="115" rx="6" fill="#D97706" />
                  <rect x="48" y="145" width="18" height="115" rx="6" fill="#D97706" />
                  <path d="M4,60 L78,60 L88,165 L-6,165 Z" fill="#1D4ED8" stroke="#0F172A" strokeWidth="3.5" />
                  <circle cx="41" cy="24" r="30" fill="#D97706" stroke="#0F172A" strokeWidth="3.5" />
                  {/* Twin Pigtails with White Ribbons */}
                  <circle cx="8" cy="28" r="10" fill="#0F172A" />
                  <circle cx="74" cy="28" r="10" fill="#0F172A" />
                </g>
              </g>
            </g>
          </svg>
        )}

        {/* SCENE 10: 3 ANIMATED STEP BADGES ON LEFT */}
        {isScene10 && (
          <div
            style={{
              position: 'absolute',
              top: 195,
              left: 75,
              width: 740,
              display: 'flex',
              flexDirection: 'column',
              gap: 26,
            }}
          >
            {/* Step Badge 1 */}
            <div
              style={{
                transform: `scale(${badge1Spring}) translateX(${interpolate(
                  badge1Spring,
                  [0, 1],
                  [-90, 0]
                )}px)`,
                backgroundColor: '#FFF8E7',
                border: '5px solid #EF4444',
                borderRadius: 22,
                padding: '20px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 18,
                  backgroundColor: '#FEE2E2',
                  border: '3px solid #EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <PowerOff size={44} color="#DC2626" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#991B1B' }}>
                  ১. মেন সুইচ বন্ধ (Turn Off Main Switch)
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 4 }}>
                  সবার আগে বাড়ির মেন সুইচ বন্ধ করে বিদ্যুৎ সংযোগ বিচ্ছিন্ন করুন।
                </div>
              </div>
            </div>

            {/* Step Badge 2 */}
            <div
              style={{
                transform: `scale(${badge2Spring}) translateX(${interpolate(
                  badge2Spring,
                  [0, 1],
                  [-90, 0]
                )}px)`,
                backgroundColor: '#FFF8E7',
                border: '5px solid #D97706',
                borderRadius: 22,
                padding: '20px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 18,
                  backgroundColor: '#FEF3C7',
                  border: '3px solid #D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={44} color="#B45309" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#92400E' }}>
                  ২. শুকনো বাঁশ/কাঠ ব্যবহার (Use Dry Wood/Bamboo)
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 4 }}>
                  শুকনো কাঠের ওপর দাঁড়িয়ে শুকনো বাঁশ বা লাঠি দিয়ে আক্রান্তকে তার থেকে আলাদা করুন।
                </div>
              </div>
            </div>

            {/* Step Badge 3 */}
            <div
              style={{
                transform: `scale(${badge3Spring}) translateX(${interpolate(
                  badge3Spring,
                  [0, 1],
                  [-90, 0]
                )}px)`,
                backgroundColor: '#FFF8E7',
                border: '5px solid #16A34A',
                borderRadius: 22,
                padding: '20px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 18,
                  backgroundColor: '#DCFCE7',
                  border: '3px solid #16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <HeartPulse size={44} color="#15803D" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#166534' }}>
                  ৩. দ্রুত চিকিৎসকের সহায়তা (Call Medical Help)
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginTop: 4 }}>
                  আক্রান্তের শ্বাস-প্রশ্বাস পরীক্ষা করুন, শরীর গরম রাখুন ও দ্রুত হাসপাতালে নিয়ে যান।
                </div>
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* LAYER 3: Foreground Occlusion Elements (1.4x Parallax) */}
      <AbsoluteFill style={{ ...getLayerTransform(1.4), pointerEvents: 'none' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <rect x="-30" y="0" width="65" height="1080" fill="#271206" opacity="0.7" />
          <rect x="1885" y="0" width="65" height="1080" fill="#271206" opacity="0.7" />
        </svg>
      </AbsoluteFill>

      {/* PATACHITRA BORDER & SUBTITLE BANNER */}
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
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            border: '3px solid #FFD600',
            borderRadius: 18,
            padding: '14px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
          }}
        >
          <Zap size={32} color="#22C55E" fill="#22C55E" />
          <span
            style={{
              color: '#FFF8E7',
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {isScene10
              ? 'প্রাথমিক চিকিৎসা: ১. মেন সুইচ বন্ধ করুন • ২. শুকনো বাঁশ/কাঠ ব্যবহার করুন • ৩. দ্রুত ডাক্তার ডাকুন'
              : 'বিদ্যুৎস্পৃষ্ট ব্যক্তিকে খালি হাতে ছোঁবেন না — প্রথমে মেন সুইচ বন্ধ করুন ও শুকনো বাঁশ ব্যবহার করুন!'}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
