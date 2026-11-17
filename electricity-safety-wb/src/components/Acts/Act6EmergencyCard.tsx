import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Ambulance, Award, PhoneCall, ShieldCheck, Zap } from 'lucide-react';

export const Act6EmergencyCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 11 (0-320): Emergency Helpline Cards (19121 & 102/108), Bidyut Bondhu waving, School students marching with Bengali safety placards
  // Final Slate (320-450): Official awareness sign-off slate (WBSEDCL & School Education Dept., Govt. of West Bengal — জনস্বার্থে প্রচারিত)
  const isFinalSlate = frame >= 320;
  const slateFrame = Math.max(0, frame - 320);

  // 4-Layer 2.5D Parallax Camera System
  const camX = interpolate(
    frame,
    [0, 320, 450],
    [25, -20, 0],
    { extrapolateRight: 'clamp' }
  );
  const camY = interpolate(
    frame,
    [0, 320, 450],
    [8, 0, 0],
    { extrapolateRight: 'clamp' }
  );
  const camScale = interpolate(
    frame,
    [0, 319, 320, 450],
    [1.0, 1.04, 1.0, 1.02],
    { extrapolateRight: 'clamp' }
  );

  const getLayerTransform = (speed: number) => ({
    transform: `translate3d(${camX * speed}px, ${camY * speed}px, 0) scale(${
      1 + (camScale - 1) * speed
    })`,
    transformOrigin: 'center center',
  });

  // Helpline Card Springs
  const card19121Spring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const card102Spring = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Final Slate Entrance Spring
  const slateSpring = spring({
    frame: slateFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
      }}
    >
      {/* LAYER 0: Deep Background (0.2x Parallax) - Golden Bengal Sky & Village Horizon */}
      <AbsoluteFill style={getLayerTransform(0.2)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <defs>
            <linearGradient id="act6GoldenSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#2D5A27" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#act6GoldenSky)" />

          {/* Sunburst Rays Behind Helpline Cards */}
          <g
            transform={`translate(960, 420) rotate(${frame * 0.25})`}
            opacity="0.14"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <polygon
                key={`ray-${i}`}
                points="0,0 -65,-900 65,-900"
                fill="#FFD600"
                transform={`rotate(${i * 30})`}
              />
            ))}
          </g>

          {/* Distant Lush Bengal Groves */}
          <path
            d="M0,740 Q480,680 960,720 T1920,710 L1920,1080 L0,1080 Z"
            fill="#1E3F1B"
          />
        </svg>
      </AbsoluteFill>

      {/* LAYER 1: Midground (0.5x Parallax) - Primary School Building, WBSEDCL Pole & Terracotta Village Path */}
      <AbsoluteFill style={getLayerTransform(0.5)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Primary School Building on Left Midground */}
          <g transform="translate(80, 500)">
            <rect
              x="0"
              y="60"
              width="380"
              height="200"
              fill="#FFF8E7"
              stroke="#C47A53"
              strokeWidth="6"
            />
            <rect x="0" y="40" width="380" height="28" fill="#C47A53" />
            <rect
              x="85"
              y="72"
              width="210"
              height="36"
              rx="6"
              fill="#1E3A8A"
            />
            <text
              x="190"
              y="96"
              textAnchor="middle"
              fontSize="18"
              fontWeight="800"
              fill="#FFD600"
            >
              প্রাথমিক বিদ্যালয়
            </text>
          </g>

          {/* Terracotta Village Path */}
          <path
            d="M0,840 Q640,805 1280,845 T1920,825 L1920,1080 L0,1080 Z"
            fill="#C47A53"
            stroke="#7C3F23"
            strokeWidth="5"
          />
        </svg>
      </AbsoluteFill>

      {/* LAYER 2: Focus Plane (1.0x Parallax) - Scene 11 Helpline Cards & Marching Students OR Final Official Slate */}
      <AbsoluteFill style={getLayerTransform(1.0)}>
        {!isFinalSlate ? (
          <>
            {/* Top Header Banner */}
            <div
              style={{
                position: 'absolute',
                top: 48,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#0F172A',
                border: '4px solid #FFD600',
                borderRadius: 20,
                padding: '12px 42px',
                boxShadow: '0 10px 28px rgba(0,0,0,0.5)',
              }}
            >
              <span
                style={{
                  color: '#FFD600',
                  fontSize: 34,
                  fontWeight: 900,
                }}
              >
                জরুরি বৈদ্যুতিক সহায়তা ও হেল্পলাইন নম্বর (24×7 Helpline)
              </span>
            </div>

            {/* PROMINENT HIGH-CONTRAST EMERGENCY HELPLINE CARDS */}
            <div
              style={{
                position: 'absolute',
                top: 155,
                left: 80,
                right: 80,
                display: 'flex',
                justifyContent: 'center',
                gap: 42,
              }}
            >
              {/* Card 1: WBSEDCL 24x7 Toll-Free Electricity Helpline: 19121 (১৯১২১) */}
              <div
                style={{
                  transform: `scale(${card19121Spring})`,
                  width: 680,
                  backgroundColor: '#FFF8E7',
                  border: '7px solid #FFD600',
                  borderRadius: 28,
                  padding: '26px 32px',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                }}
              >
                {/* Animated Ringing Telephone with #FFD600 & #00F2FE Sonic Rings */}
                <div
                  style={{
                    position: 'relative',
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: '#0F172A',
                    border: '4px solid #00F2FE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: `rotate(${Math.sin(frame * 0.8) * 10}deg)`,
                  }}
                >
                  <PhoneCall size={58} color="#FFD600" />
                  {/* Sonic Ring Pulse */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: -14,
                      borderRadius: 80,
                      border: '4px solid #00F2FE',
                      opacity: 0.5 + Math.sin(frame * 0.3) * 0.4,
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#1E3A8A',
                      color: '#FFD600',
                      fontSize: 18,
                      fontWeight: 900,
                      padding: '4px 14px',
                      borderRadius: 8,
                      marginBottom: 6,
                    }}
                  >
                    WBSEDCL 24×7 TOLL-FREE HELPLINE
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: '#0F172A',
                    }}
                  >
                    যেকোনো বৈদ্যুতিক বিপদে এক্ষুনি ফোন করুন:
                  </div>
                  <div
                    style={{
                      fontSize: 64,
                      fontWeight: 900,
                      color: '#DC2626',
                      lineHeight: 1.1,
                      marginTop: 4,
                    }}
                  >
                    ১৯১২১ / 19121
                  </div>
                </div>
              </div>

              {/* Card 2: Emergency Ambulance: 102 / 108 (১০২ / ১০৮) */}
              <div
                style={{
                  transform: `scale(${card102Spring})`,
                  width: 580,
                  backgroundColor: '#FFF8E7',
                  border: '7px solid #EF4444',
                  borderRadius: 28,
                  padding: '26px 32px',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                }}
              >
                <div
                  style={{
                    width: 115,
                    height: 115,
                    borderRadius: 58,
                    backgroundColor: '#FEE2E2',
                    border: '4px solid #EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Ambulance size={60} color="#DC2626" />
                </div>

                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#DC2626',
                      color: '#FFF8E7',
                      fontSize: 18,
                      fontWeight: 900,
                      padding: '4px 14px',
                      borderRadius: 8,
                      marginBottom: 6,
                    }}
                  >
                    EMERGENCY AMBULANCE
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: '#0F172A',
                    }}
                  >
                    জরুরি অ্যাম্বুলেন্স পরিষেবা:
                  </div>
                  <div
                    style={{
                      fontSize: 56,
                      fontWeight: 900,
                      color: '#15803D',
                      lineHeight: 1.1,
                      marginTop: 4,
                    }}
                  >
                    ১০২ / ১০৮ (102/108)
                  </div>
                </div>
              </div>
            </div>

            {/* SVG SCENE: Bidyut Bondhu Mascot Waving & Rural Primary School Students Marching with Placards */}
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
              {/* Bidyut Bondhu Mascot Waving on Left */}
              <g
                transform={`translate(250, ${
                  660 + Math.sin(frame * 0.14) * 12
                })`}
              >
                <circle cx="0" cy="0" r="125" fill="#FFD600" opacity="0.25" />
                {/* Waving Arm */}
                <path
                  d={`M50,-10 Q95,${-45 + Math.sin(frame * 0.35) * 20} 110,${
                    -75 + Math.sin(frame * 0.35) * 20
                  }`}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M-42,-55 L42,-55 L56,45 L-56,45 Z"
                  fill="#F59E0B"
                  stroke="#4A2511"
                  strokeWidth="5"
                />
                <rect
                  x="-34"
                  y="-40"
                  width="68"
                  height="68"
                  rx="14"
                  fill="#FEF08A"
                  stroke="#B45309"
                  strokeWidth="4"
                />
                <circle cx="-14" cy="-12" r="7" fill="#0F172A" />
                <circle cx="14" cy="-12" r="7" fill="#0F172A" />
                <path
                  d="M-14,8 Q0,22 14,8"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M-52,-55 Q0,-105 52,-55 Z"
                  fill="#D97706"
                  stroke="#4A2511"
                  strokeWidth="5"
                />
                <rect
                  x="-75"
                  y="62"
                  width="150"
                  height="34"
                  rx="17"
                  fill="#0F172A"
                  stroke="#FFD600"
                  strokeWidth="3"
                />
                <text
                  x="0"
                  y="85"
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="800"
                  fill="#FFD600"
                >
                  বিদ্যুৎ বন্ধু
                </text>
              </g>

              {/* Marching School Students (Mitu, Bishu & Classmate) Holding Safety Placards */}
              {[
                {
                  name: 'Mitu',
                  xBase: 640,
                  placardText: 'সতর্কতাই জীবন রক্ষা',
                  placardSub: 'SAFETY SAVES LIVES',
                  placardColor: '#15803D',
                  uniformColor: '#1D4ED8',
                },
                {
                  name: 'Bishu',
                  xBase: 1060,
                  placardText: 'ছেঁড়া তার থেকে দূরে থাকুন',
                  placardSub: 'STAY AWAY FROM SNAPPED WIRES',
                  placardColor: '#DC2626',
                  uniformColor: '#0284C7',
                },
                {
                  name: 'Classmate',
                  xBase: 1480,
                  placardText: 'বিপদে ডায়াল করুন ১৯১২১',
                  placardSub: 'CALL 19121 IN EMERGENCY',
                  placardColor: '#B45309',
                  uniformColor: '#1D4ED8',
                },
              ].map((student, idx) => {
                const marchX =
                  student.xBase + interpolate(frame, [0, 320], [60, -40]);
                const bobY = Math.abs(Math.sin(frame * 0.25 + idx)) * 10;
                const legSwing = Math.sin(frame * 0.25 + idx) * 14;

                return (
                  <g
                    key={student.name}
                    transform={`translate(${marchX}, ${635 - bobY})`}
                  >
                    {/* Placard Wooden Stick */}
                    <rect
                      x="68"
                      y="-145"
                      width="10"
                      height="250"
                      fill="#78350F"
                      stroke="#271206"
                      strokeWidth="2.5"
                    />
                    {/* Placard Signboard */}
                    <g transform="translate(-95, -215)">
                      <rect
                        x="0"
                        y="0"
                        width="335"
                        height="92"
                        rx="16"
                        fill="#FFF8E7"
                        stroke={student.placardColor}
                        strokeWidth="6"
                      />
                      <text
                        x="167"
                        y="46"
                        textAnchor="middle"
                        fontSize="25"
                        fontWeight="900"
                        fill={student.placardColor}
                      >
                        {student.placardText}
                      </text>
                      <text
                        x="167"
                        y="75"
                        textAnchor="middle"
                        fontSize="15"
                        fontWeight="800"
                        fill="#1E293B"
                      >
                        {student.placardSub}
                      </text>
                    </g>

                    {/* Student Legs Marching */}
                    <rect
                      x={18 + legSwing * 0.4}
                      y="150"
                      width="20"
                      height="95"
                      rx="8"
                      fill="#D97706"
                      stroke="#0F172A"
                      strokeWidth="3"
                    />
                    <rect
                      x={48 - legSwing * 0.4}
                      y="150"
                      width="20"
                      height="95"
                      rx="8"
                      fill="#D97706"
                      stroke="#0F172A"
                      strokeWidth="3"
                    />
                    {/* Black School Shoes */}
                    <ellipse
                      cx={28 + legSwing * 0.4}
                      cy="248"
                      rx="18"
                      ry="8"
                      fill="#0F172A"
                    />
                    <ellipse
                      cx={58 - legSwing * 0.4}
                      cy="248"
                      rx="18"
                      ry="8"
                      fill="#0F172A"
                    />

                    {/* Blue & White School Uniform */}
                    <path
                      d="M6,62 L78,62 L86,160 L-2,160 Z"
                      fill={student.uniformColor}
                      stroke="#0F172A"
                      strokeWidth="3.5"
                    />
                    <polygon points="24,62 60,62 42,92" fill="#FFF8E7" />

                    {/* Head */}
                    <circle
                      cx="42"
                      cy="24"
                      r="32"
                      fill="#D97706"
                      stroke="#0F172A"
                      strokeWidth="3.5"
                    />
                    <path d="M10,16 Q42,-20 74,16 Z" fill="#0F172A" />
                    {/* Happy Smile */}
                    <path
                      d="M32,32 Q42,42 52,32"
                      fill="none"
                      stroke="#0F172A"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>
          </>
        ) : (
          /* ==================== FINAL SLATE (FRAMES 320-450): OFFICIAL PUBLIC INTEREST SIGN-OFF ==================== */
          <AbsoluteFill
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.96)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 70,
            }}
          >
            <div
              style={{
                transform: `scale(${slateSpring})`,
                width: 1560,
                backgroundColor: '#FFF8E7',
                border: '10px solid #C47A53',
                outline: '5px solid #FFD600',
                borderRadius: 36,
                padding: '54px 70px',
                textAlign: 'center',
                boxShadow: '0 25px 65px rgba(0,0,0,0.75)',
                position: 'relative',
              }}
            >
              {/* Golden Animated Emblem Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 36,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    backgroundColor: '#0F172A',
                    border: '4px solid #FFD600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Zap size={52} color="#00F2FE" fill="#00F2FE" />
                </div>
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 55,
                    backgroundColor: '#FEF3C7',
                    border: '5px solid #D97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Award size={64} color="#B45309" />
                </div>
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    backgroundColor: '#0F172A',
                    border: '4px solid #FFD600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldCheck size={52} color="#22C55E" />
                </div>
              </div>

              {/* Bengali Core Safety Motto */}
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#991B1B',
                  marginBottom: 16,
                }}
              >
                “বিদ্যুৎ আমাদের পরম বন্ধু — কিন্তু অসতর্কতাই ডেকে আনে বিপদ!”
              </div>

              {/* Official Organization Credits */}
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: '#0F172A',
                  marginTop: 18,
                }}
              >
                West Bengal State Electricity Distribution Company Limited (WBSEDCL)
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: '#1E3A8A',
                  marginTop: 8,
                }}
              >
                &amp; School Education Department, Government of West Bengal
              </div>

              {/* Helpline Reminder Strip */}
              <div
                style={{
                  marginTop: 28,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 32,
                  backgroundColor: '#0F172A',
                  color: '#FFD600',
                  padding: '14px 42px',
                  borderRadius: 20,
                  border: '3px solid #FFD600',
                  fontSize: 28,
                  fontWeight: 900,
                }}
              >
                <span>⚡ WBSEDCL Toll-Free: ১৯১২১ (19121)</span>
                <span>•</span>
                <span>🚑 Ambulance: ১০২ / ১০৮ (102 / 108)</span>
              </div>

              {/* Issued in Public Interest Footer */}
              <div
                style={{
                  marginTop: 28,
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#15803D',
                  letterSpacing: 1,
                }}
              >
                জনস্বার্থে প্রচারিত • ISSUED IN PUBLIC INTEREST
              </div>
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>

      {/* LAYER 3: Foreground Occlusion Elements (1.4x Parallax) */}
      <AbsoluteFill style={{ ...getLayerTransform(1.4), pointerEvents: 'none' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Decorative Patachitra Lotus Corners */}
          {[
            [60, 60],
            [1860, 60],
            [60, 1020],
            [1860, 1020],
          ].map(([cx, cy], idx) => (
            <g key={`lotus-corner-${idx}`} transform={`translate(${cx}, ${cy})`}>
              <circle cx="0" cy="0" r="28" fill="#C47A53" stroke="#FFD600" strokeWidth="4" />
              <circle cx="0" cy="0" r="12" fill="#FFD600" />
            </g>
          ))}
        </svg>
      </AbsoluteFill>

      {/* PATACHITRA FRAME BORDER */}
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
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
