import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { AlertTriangle, CheckCircle2, ShieldAlert, XCircle, Zap } from 'lucide-react';

export const Act3WetHands: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene split: Scene 5 (0-450) Wet hands reaching for switchboard, Scene 6 (450-1050) Bidyut Bondhu intervention & safety rules
  const isScene6 = frame >= 450;
  const scene6Frame = Math.max(0, frame - 450);

  // 4-Layer 2.5D Parallax Camera System
  const camX = interpolate(
    frame,
    [0, 350, 450, 750, 1050],
    [35, -30, 0, -25, 0],
    { extrapolateRight: 'clamp' }
  );
  const camY = interpolate(
    frame,
    [0, 350, 450, 750, 1050],
    [15, -15, 0, 10, 0],
    { extrapolateRight: 'clamp' }
  );
  const camScale = interpolate(
    frame,
    [0, 350, 449, 450, 520, 1050],
    [1.0, 1.14, 1.18, 1.04, 1.0, 1.02],
    { extrapolateRight: 'clamp' }
  );

  const getLayerTransform = (speed: number) => ({
    transform: `translate3d(${camX * speed}px, ${camY * speed}px, 0) scale(${
      1 + (camScale - 1) * speed
    })`,
    transformOrigin: 'center center',
  });

  // Character Bishu's arm reaching animation in Scene 5, halting in Scene 6
  const armReach = interpolate(
    frame,
    [0, 120, 380, 450, 490],
    [0, 0.3, 0.92, 0.95, 0.25],
    { extrapolateRight: 'clamp' }
  );

  // Bidyut Bondhu swoop-in spring
  const mascotEnter = spring({
    frame: scene6Frame,
    fps,
    config: { damping: 12, stiffness: 110, mass: 0.9 },
  });

  // Callout cards staggered springs in Scene 6
  const card1Spring = spring({
    frame: Math.max(0, scene6Frame - 55),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const card2Spring = spring({
    frame: Math.max(0, scene6Frame - 125),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const card3Spring = spring({
    frame: Math.max(0, scene6Frame - 195),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Electric hazard pulse near switchboard when hand gets close (frames 260-465)
  const sparkIntensity = interpolate(
    frame,
    [250, 360, 445, 475],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
      }}
    >
      {/* LAYER 0: Deep Background (0.2x Parallax) - Monsoon sky & distant Bengal palm/banana silhouettes visible outside veranda */}
      <AbsoluteFill style={getLayerTransform(0.2)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <defs>
            <linearGradient id="act3SkyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="55%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#2D5A27" />
            </linearGradient>
            <radialGradient id="lanternAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD600" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFD600" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#act3SkyGrad)" />

          {/* Distant Monsoon Clouds */}
          <g opacity="0.45" transform={`translate(${Math.sin(frame * 0.01) * 20}, 0)`}>
            <ellipse cx="340" cy="190" rx="220" ry="70" fill="#334155" />
            <ellipse cx="520" cy="210" rx="180" ry="60" fill="#475569" />
            <ellipse cx="1450" cy="170" rx="260" ry="80" fill="#334155" />
          </g>

          {/* Distant Banana & Betel-nut Groves through Veranda Opening */}
          <g fill="#1E3F1B" opacity="0.85">
            <path d="M80,680 Q140,480 260,520 Q170,580 120,680 Z" />
            <path d="M120,680 Q210,430 340,460 Q240,540 160,680 Z" />
            <path d="M40,680 Q60,470 180,440 Q120,540 80,680 Z" />
            <rect x="380" y="340" width="14" height="350" fill="#142912" />
            <path d="M387,340 Q310,300 260,350 Q330,340 387,355 Z" />
            <path d="M387,340 Q460,290 510,345 Q450,335 387,355 Z" />
          </g>

          {/* Distant Rainfall Streaks Outside */}
          {Array.from({ length: 24 }).map((_, i) => {
            const x = (i * 83) % 750;
            const y = ((frame * 16 + i * 97) % 700) - 50;
            return (
              <line
                key={`bg-rain-${i}`}
                x1={x}
                y1={y}
                x2={x - 12}
                y2={y + 45}
                stroke="#00F2FE"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* LAYER 1: Midground (0.5x Parallax) - Village Mud-Walled Veranda (মাটির বারান্দা), Tin Roof & Courtyard Pond */}
      <AbsoluteFill style={getLayerTransform(0.5)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Courtyard Mud Ground & Puddle Outside Left */}
          <rect x="0" y="650" width="700" height="430" fill="#6E4730" />
          <ellipse cx="290" cy="790" rx="210" ry="48" fill="#0284C7" opacity="0.45" />
          <ellipse
            cx="290"
            cy="790"
            rx={60 + ((frame * 2) % 120)}
            ry={14 + ((frame * 0.5) % 28)}
            fill="none"
            stroke="#00F2FE"
            strokeWidth="2"
            opacity={1 - ((frame * 2) % 120) / 120}
          />

          {/* Main Terracotta Mud Wall (মাটির দেওয়াল) */}
          <rect
            x="520"
            y="80"
            width="1450"
            height="860"
            fill="#C47A53"
            stroke="#4A2511"
            strokeWidth="6"
          />

          {/* Mud Wall Textural Plastered Horizontal Bands & Alpana Trim */}
          <rect x="520" y="760" width="1450" height="180" fill="#9A5835" />
          <path
            d="M520,760 L1970,760"
            stroke="#FFF8E7"
            strokeWidth="4"
            strokeDasharray="18 12"
            opacity="0.7"
          />
          {/* Traditional Bengal Alpana motif along lower mud wall */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 580 + i * 98;
            return (
              <g key={`alpana-${i}`} transform={`translate(${x}, 795)`} opacity="0.75">
                <path
                  d="M0,0 C15,-22 35,-22 50,0 C35,22 15,22 0,0 Z"
                  fill="none"
                  stroke="#FFF8E7"
                  strokeWidth="3"
                />
                <circle cx="25" cy="0" r="5" fill="#FFF8E7" />
              </g>
            );
          })}

          {/* Bamboo Veranda Pillar separating courtyard and interior */}
          <rect
            x="500"
            y="60"
            width="44"
            height="890"
            fill="#8D6E3F"
            stroke="#3E2723"
            strokeWidth="4"
          />
          {[180, 320, 460, 600, 740].map((y, idx) => (
            <line
              key={`bamboo-node-${idx}`}
              x1="500"
              y1={y}
              x2="544"
              y2={y}
              stroke="#3E2723"
              strokeWidth="5"
            />
          ))}

          {/* Corrugated Tin Roof Overhang (টিনের চাল) */}
          <g>
            <polygon
              points="0,0 1920,0 1920,125 360,155 0,130"
              fill="#475569"
              stroke="#1E293B"
              strokeWidth="5"
            />
            {Array.from({ length: 30 }).map((_, i) => (
              <path
                key={`tin-rib-${i}`}
                d={`M${i * 66},0 L${i * 66 - 25},145`}
                stroke="#64748B"
                strokeWidth="6"
                opacity="0.6"
              />
            ))}
            {/* Water droplets dripping from tin roof edge on the left */}
            {[95, 210, 335, 445].map((xPos, idx) => {
              const dropY = 150 + ((frame * 9 + idx * 70) % 580);
              return (
                <g key={`roof-drop-${idx}`} transform={`translate(${xPos}, ${dropY})`}>
                  <path
                    d="M0,-14 C5,-4 8,4 0,10 C-8,4 -5,-4 0,-14 Z"
                    fill="#00F2FE"
                  />
                </g>
              );
            })}
          </g>

          {/* Veranda Floor (লালচে মাটির মেঝে) */}
          <polygon
            points="0,910 500,910 1920,910 1920,1080 0,1080"
            fill="#7C3F23"
            stroke="#3E1E0F"
            strokeWidth="5"
          />

          {/* Framed Patachitra Painting on Veranda Wall */}
          <g transform="translate(650, 220)">
            <rect
              x="0"
              y="0"
              width="190"
              height="240"
              rx="8"
              fill="#FFF8E7"
              stroke="#4A2511"
              strokeWidth="8"
            />
            <rect
              x="14"
              y="14"
              width="162"
              height="212"
              fill="#EAB308"
              opacity="0.2"
              stroke="#C47A53"
              strokeWidth="3"
            />
            {/* Stylized Patachitra Fish & Lotus */}
            <path
              d="M45,130 Q95,80 145,130 Q95,180 45,130 Z"
              fill="#E11D48"
              stroke="#1E293B"
              strokeWidth="3"
            />
            <circle cx="120" cy="122" r="5" fill="#FFF8E7" />
            <circle cx="121" cy="122" r="2.5" fill="#0F172A" />
          </g>
        </svg>
      </AbsoluteFill>

      {/* LAYER 2: Focus Plane (1.0x Parallax) - Switchboard, Table Fan, Bishu with Wet Hands, Bidyut Bondhu & Callout Cards */}
      <AbsoluteFill style={getLayerTransform(1.0)}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Wooden Table & Table Fan connected to Switchboard */}
          <g transform="translate(1370, 560)">
            {/* Wooden Stool */}
            <rect
              x="0"
              y="180"
              width="280"
              height="24"
              rx="6"
              fill="#78350F"
              stroke="#271206"
              strokeWidth="4"
            />
            <rect x="28" y="204" width="22" height="160" fill="#5C280B" />
            <rect x="230" y="204" width="22" height="160" fill="#5C280B" />

            {/* Table Fan */}
            <rect
              x="95"
              y="145"
              width="90"
              height="35"
              rx="10"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="4"
            />
            <rect x="130" y="65" width="20" height="85" fill="#334155" />
            <circle
              cx="140"
              cy="45"
              r="95"
              fill="#E2E8F0"
              fillOpacity="0.15"
              stroke="#1E293B"
              strokeWidth="6"
            />
            {/* Spinning or stationary fan blades */}
            <g transform={`translate(140, 45) rotate(${frame * 12})`}>
              <ellipse cx="0" cy="-52" rx="22" ry="38" fill="#0284C7" opacity="0.75" />
              <ellipse
                cx="45"
                cy="26"
                rx="22"
                ry="38"
                fill="#0284C7"
                opacity="0.75"
                transform="rotate(120 45 26)"
              />
              <ellipse
                cx="-45"
                cy="26"
                rx="22"
                ry="38"
                fill="#0284C7"
                opacity="0.75"
                transform="rotate(240 -45 26)"
              />
              <circle cx="0" cy="0" r="18" fill="#0F172A" />
            </g>
          </g>

          {/* Conduit Pipe & Wire from Roof to Switchboard */}
          <line
            x1="1210"
            y1="120"
            x2="1210"
            y2="370"
            stroke="#1E293B"
            strokeWidth="10"
          />
          <path
            d="M1245,490 Q1350,620 1465,710"
            fill="none"
            stroke="#0F172A"
            strokeWidth="7"
          />

          {/* Wall Electrical Switchboard (সুইচবোর্ড) */}
          <g transform="translate(1135, 365)">
            {/* Danger Glow Aura when wet hand gets close */}
            {sparkIntensity > 0 && (
              <circle
                cx="75"
                cy="80"
                r={95 + Math.sin(frame * 0.6) * 18}
                fill="#00F2FE"
                opacity={0.3 * sparkIntensity}
              />
            )}

            {/* Wooden Switchboard Box */}
            <rect
              x="0"
              y="0"
              width="155"
              height="175"
              rx="10"
              fill="#FFF8E7"
              stroke="#1E293B"
              strokeWidth="6"
            />
            <rect
              x="10"
              y="10"
              width="135"
              height="155"
              rx="6"
              fill="#F8FAFC"
              stroke="#94A3B8"
              strokeWidth="3"
            />

            {/* Red Indicator Light (Glowing) */}
            <circle
              cx="38"
              cy="40"
              r="12"
              fill="#EF4444"
              stroke="#7F1D1D"
              strokeWidth="3"
            />
            <circle
              cx="38"
              cy="40"
              r={18 + Math.sin(frame * 0.3) * 4}
              fill="#EF4444"
              opacity="0.45"
            />

            {/* 3-Pin Socket */}
            <circle cx="102" cy="36" r="7" fill="#0F172A" />
            <circle cx="88" cy="58" r="5" fill="#0F172A" />
            <circle cx="116" cy="58" r="5" fill="#0F172A" />

            {/* Switches Row */}
            {[32, 68, 104].map((sx, idx) => (
              <g key={`sw-${idx}`} transform={`translate(${sx}, 96)`}>
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="44"
                  rx="4"
                  fill="#E2E8F0"
                  stroke="#334155"
                  strokeWidth="3"
                />
                <rect
                  x="4"
                  y={idx === 0 ? '20' : '6'}
                  width="16"
                  height="18"
                  rx="2"
                  fill={idx === 0 ? '#F59E0B' : '#94A3B8'}
                />
              </g>
            ))}

            {/* High-Voltage Warning Arcs on Switchboard when Wet Hand Approaches */}
            {sparkIntensity > 0.1 && (
              <g stroke="#00F2FE" strokeWidth="4" fill="none" opacity={sparkIntensity}>
                <polyline points="25,115 -15,95 -5,75 -42,60" />
                <polyline points="35,135 -10,145 -28,125 -55,140" />
                <circle cx="25" cy="120" r="8" fill="#FFD600" />
              </g>
            )}
          </g>

          {/* Wet Puddle under Bishu's bare feet in Scene 5 */}
          <ellipse
            cx="810"
            cy="935"
            rx="145"
            ry="26"
            fill="#00F2FE"
            opacity={isScene6 ? 0.25 : 0.55}
          />

          {/* BISHU (14yo boy) Rig with Articulated Reaching Wet Arm */}
          <g
            transform={`translate(${interpolate(
              frame,
              [0, 110],
              [640, 770],
              { extrapolateRight: 'clamp' }
            )}, 465)`}
          >
            {/* Legs */}
            <rect
              x="12"
              y="290"
              width="28"
              height="165"
              rx="10"
              fill="#D97706"
              stroke="#1E293B"
              strokeWidth="4"
            />
            <rect
              x="58"
              y="290"
              width="28"
              height="165"
              rx="10"
              fill="#D97706"
              stroke="#1E293B"
              strokeWidth="4"
            />

            {/* Dry Rubber Slippers appear on Bishu's feet in Scene 6 after Card 2 */}
            {scene6Frame > 130 ? (
              <g>
                <rect
                  x="4"
                  y="445"
                  width="48"
                  height="16"
                  rx="6"
                  fill="#FFD600"
                  stroke="#0F172A"
                  strokeWidth="3"
                />
                <rect
                  x="52"
                  y="445"
                  width="48"
                  height="16"
                  rx="6"
                  fill="#FFD600"
                  stroke="#0F172A"
                  strokeWidth="3"
                />
              </g>
            ) : (
              <g>
                {/* Bare wet feet */}
                <ellipse
                  cx="26"
                  cy="452"
                  rx="22"
                  ry="9"
                  fill="#B45309"
                  stroke="#1E293B"
                  strokeWidth="3"
                />
                <ellipse
                  cx="72"
                  cy="452"
                  rx="22"
                  ry="9"
                  fill="#B45309"
                  stroke="#1E293B"
                  strokeWidth="3"
                />
              </g>
            )}

            {/* Shorts */}
            <path
              d="M0,220 L98,220 L92,310 L54,310 L49,265 L44,310 L6,310 Z"
              fill="#1E3A8A"
              stroke="#0F172A"
              strokeWidth="4"
            />

            {/* Torso / Kurta T-shirt */}
            <path
              d="M-6,95 Q49,80 104,95 L98,230 L0,230 Z"
              fill="#F59E0B"
              stroke="#1E293B"
              strokeWidth="4"
            />

            {/* Left Arm (Down by side) */}
            <path
              d="M6,108 Q-20,175 -8,240"
              fill="none"
              stroke="#B45309"
              strokeWidth="22"
              strokeLinecap="round"
            />

            {/* Head & Expressive Face (Patachitra Bold Line Profile) */}
            <g transform="translate(48, 32)">
              <circle
                cx="0"
                cy="0"
                r="46"
                fill="#D97706"
                stroke="#1E293B"
                strokeWidth="4.5"
              />
              {/* Thick Wavy Wet Bengal Hair */}
              <path
                d="M-46,-8 Q-38,-56 8,-52 Q48,-48 46,-4 Q30,-26 0,-24 Q-28,-22 -46,-8 Z"
                fill="#0F172A"
              />
              {/* Expressive Eye */}
              <ellipse cx="18" cy="-4" rx="10" ry="7" fill="#FFF8E7" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="21" cy="-4" r="4.5" fill="#0F172A" />
              {/* Eyebrow */}
              <path
                d={isScene6 ? 'M6,-16 Q18,-24 30,-16' : 'M6,-18 Q18,-12 30,-18'}
                fill="none"
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Mouth */}
              {isScene6 ? (
                <path
                  d="M8,20 Q20,30 30,18"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              ) : (
                <ellipse cx="20" cy="20" rx="8" ry="6" fill="#7F1D1D" />
              )}
            </g>

            {/* Right Arm (Articulated Reaching Toward Switchboard at x=1135) */}
            <g
              transform={`translate(82, 115) rotate(${interpolate(
                armReach,
                [0, 1],
                [35, -22]
              )})`}
            >
              {/* Upper & Forearm */}
              <rect
                x="0"
                y="-12"
                width="245"
                height="24"
                rx="12"
                fill="#D97706"
                stroke="#1E293B"
                strokeWidth="4"
              />
              {/* Open Hand */}
              <g transform="translate(245, 0)">
                <circle
                  cx="10"
                  cy="0"
                  r="16"
                  fill="#D97706"
                  stroke="#1E293B"
                  strokeWidth="3.5"
                />
                <line
                  x1="20"
                  y1="-6"
                  x2="38"
                  y2="-10"
                  stroke="#D97706"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="22"
                  y1="2"
                  x2="42"
                  y2="2"
                  stroke="#D97706"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Animated Water Droplets Dripping from Bishu's Wet Hand (#00F2FE) */}
                {!isScene6 &&
                  [0, 1, 2, 3].map((dIdx) => {
                    const dropOffset = ((frame * 6 + dIdx * 28) % 95);
                    return (
                      <g
                        key={`hand-drop-${dIdx}`}
                        transform={`translate(${8 + dIdx * 9}, ${15 + dropOffset})`}
                        opacity={1 - dropOffset / 95}
                      >
                        <path
                          d="M0,-10 C4,-2 6,4 0,8 C-6,4 -4,-2 0,-10 Z"
                          fill="#00F2FE"
                        />
                      </g>
                    );
                  })}
              </g>
            </g>
          </g>

          {/* SCENE 5 LIVE WARNING CALLOUT ABOVE SWITCHBOARD */}
          {!isScene6 && frame > 90 && (
            <g
              transform={`translate(980, 210) scale(${spring({
                frame: frame - 90,
                fps,
                config: { damping: 12 },
              })})`}
            >
              <rect
                x="0"
                y="0"
                width="440"
                height="110"
                rx="18"
                fill="#7F1D1D"
                stroke="#FFD600"
                strokeWidth="5"
              />
              <circle cx="58" cy="55" r="32" fill="#FFD600" />
              <text
                x="58"
                y="68"
                textAnchor="middle"
                fontSize="42"
                fontWeight="900"
                fill="#7F1D1D"
              >
                !
              </text>
              <text
                x="110"
                y="48"
                fontSize="27"
                fontWeight="800"
                fill="#FFF8E7"
              >
                ভেজা হাতে সুইচবোর্ড ছোঁবেন না!
              </text>
              <text
                x="110"
                y="84"
                fontSize="20"
                fontWeight="700"
                fill="#00F2FE"
              >
                WET HANDS CONDUCT ELECTRICITY
              </text>
            </g>
          )}

          {/* SCENE 6: "BIDYUT BONDHU" MASCOT SWOOPS IN TO HALT THE HAND */}
          {isScene6 && (
            <g
              transform={`translate(${interpolate(
                mascotEnter,
                [0, 1],
                [1400, 1020]
              )}, ${interpolate(
                mascotEnter,
                [0, 1],
                [120, 410]
              ) + Math.sin(frame * 0.12) * 10}) scale(${mascotEnter})`}
            >
              {/* Golden Aura */}
              <circle cx="0" cy="0" r="145" fill="url(#lanternAura)" />

              {/* Stop Shield in Bidyut Bondhu's Hand */}
              <g transform="translate(-88, 20)">
                <circle
                  cx="0"
                  cy="0"
                  r="42"
                  fill="#EF4444"
                  stroke="#FFF8E7"
                  strokeWidth="5"
                />
                <path
                  d="M-16,-16 L16,16 M16,-16 L-16,16"
                  stroke="#FFF8E7"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </g>

              {/* Brass Lantern Mascot Body */}
              <path
                d="M-42,-55 L42,-55 L56,45 L-56,45 Z"
                fill="#F59E0B"
                stroke="#4A2511"
                strokeWidth="5"
              />
              {/* Glowing Glass Chamber */}
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
              {/* Expressive Eyes & Smile inside Lantern */}
              <circle cx="-14" cy="-12" r="7" fill="#0F172A" />
              <circle cx="14" cy="-12" r="7" fill="#0F172A" />
              <circle cx="-12" cy="-14" r="2.5" fill="#FFF" />
              <circle cx="16" cy="-14" r="2.5" fill="#FFF" />
              <path
                d="M-14,8 Q0,22 14,8"
                fill="none"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Turban / Top Brass Dome Cap */}
              <path
                d="M-52,-55 Q0,-105 52,-55 Z"
                fill="#D97706"
                stroke="#4A2511"
                strokeWidth="5"
              />
              <circle
                cx="0"
                cy="-88"
                r="14"
                fill="#FFD600"
                stroke="#4A2511"
                strokeWidth="4"
              />
              {/* Base Pedestal */}
              <rect
                x="-48"
                y="45"
                width="96"
                height="22"
                rx="8"
                fill="#B45309"
                stroke="#4A2511"
                strokeWidth="4"
              />
              {/* Name Badge */}
              <rect
                x="-75"
                y="76"
                width="150"
                height="34"
                rx="17"
                fill="#0F172A"
                stroke="#FFD600"
                strokeWidth="3"
              />
              <text
                x="0"
                y="99"
                textAnchor="middle"
                fontSize="20"
                fontWeight="800"
                fill="#FFD600"
              >
                বিদ্যুৎ বন্ধু
              </text>
            </g>
          )}
        </svg>

        {/* SCENE 6 VISUAL CALLOUT CARDS (3 Key Rules) */}
        {isScene6 && (
          <div
            style={{
              position: 'absolute',
              top: 110,
              left: 70,
              width: 620,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            {/* Card 1: Water conducts electricity into bare skin (Red Warning X) */}
            <div
              style={{
                transform: `scale(${card1Spring}) translateX(${interpolate(
                  card1Spring,
                  [0, 1],
                  [-80, 0]
                )}px)`,
                backgroundColor: '#FFF8E7',
                border: '5px solid #EF4444',
                borderRadius: 20,
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 16,
                  backgroundColor: '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '3px solid #EF4444',
                }}
              >
                <XCircle size={46} color="#DC2626" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 900,
                    color: '#991B1B',
                    lineHeight: 1.25,
                  }}
                >
                  ১. জল বিদ্যুতের সুপরিবাহী (Water Conducts)
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: '#1E293B',
                    marginTop: 4,
                  }}
                >
                  ভেজা হাতে সুইচ বা প্লাগে হাত দিলে মারাত্মক শক লাগতে পারে!
                </div>
              </div>
            </div>

            {/* Card 2: Wearing dry rubber slippers + dry towel (Green Check) */}
            <div
              style={{
                transform: `scale(${card2Spring}) translateX(${interpolate(
                  card2Spring,
                  [0, 1],
                  [-80, 0]
                )}px)`,
                backgroundColor: '#FFF8E7',
                border: '5px solid #16A34A',
                borderRadius: 20,
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 16,
                  backgroundColor: '#DCFCE7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '3px solid #16A34A',
                }}
              >
                <CheckCircle2 size={46} color="#15803D" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 900,
                    color: '#166534',
                    lineHeight: 1.25,
                  }}
                >
                  ২. শুকনো রাবারের জুতো ও গামছা (✔️)
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: '#1E293B',
                    marginTop: 4,
                  }}
                >
                  হাত ভালো করে মুছে এবং পায়ে শুকনো রাবারের চটি পরে সুইচে হাত দিন।
                </div>
              </div>
            </div>

            {/* Card 3: Outdoor Inset - Waterlogged WBSEDCL Pole & Stay-wire (টানা তার) */}
            <div
              style={{
                transform: `scale(${card3Spring}) translateX(${interpolate(
                  card3Spring,
                  [0, 1],
                  [-80, 0]
                )}px)`,
                backgroundColor: '#0F172A',
                border: '5px solid #FFD600',
                borderRadius: 20,
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                boxShadow: '0 14px 30px rgba(0,0,0,0.55)',
              }}
            >
              {/* Mini SVG Inset of Waterlogged Pole & Stay-Wire */}
              <svg
                width="115"
                height="115"
                viewBox="0 0 120 120"
                style={{
                  borderRadius: 14,
                  backgroundColor: '#1E293B',
                  border: '2px solid #00F2FE',
                  flexShrink: 0,
                }}
              >
                {/* Waterlogged Base */}
                <rect x="0" y="82" width="120" height="38" fill="#0284C7" />
                {/* Concrete Pole */}
                <rect x="34" y="12" width="14" height="90" fill="#94A3B8" />
                {/* Stay Wire (টানা তার) */}
                <line
                  x1="46"
                  y1="26"
                  x2="96"
                  y2="96"
                  stroke="#E2E8F0"
                  strokeWidth="4"
                />
                {/* Animated Hazard Ring */}
                <circle
                  cx="72"
                  cy="64"
                  r={18 + Math.sin(frame * 0.25) * 6}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="4"
                />
                <circle
                  cx="72"
                  cy="64"
                  r="10"
                  fill="#00F2FE"
                  opacity="0.7"
                />
              </svg>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#EF4444',
                    color: '#FFF8E7',
                    fontSize: 16,
                    fontWeight: 900,
                    padding: '3px 10px',
                    borderRadius: 8,
                    marginBottom: 6,
                  }}
                >
                  স্পর্শ করবেন না / DO NOT TOUCH
                </div>
                <div
                  style={{
                    fontSize: 23,
                    fontWeight: 900,
                    color: '#FFD600',
                    lineHeight: 1.25,
                  }}
                >
                  ৩. জমা জলে ইলেকট্রিক পোল ও টানা তার
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#FFF8E7',
                    marginTop: 4,
                  }}
                >
                  বর্ষায় খুঁটি বা টানা তারে (Stay-Wire) হাত দেবেন না বা গবাদি পশু বাঁধবেন না।
                </div>
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* LAYER 3: Foreground Occlusion Elements (1.4x Parallax) - Hanging Lau/Gourd Vine, Bamboo Post & Rain Streaks */}
      <AbsoluteFill style={{ ...getLayerTransform(1.4), pointerEvents: 'none' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Foreground Right Bamboo Post */}
          <rect x="1845" y="-40" width="90" height="1160" fill="#2A1810" opacity="0.85" />

          {/* Hanging Monsoon Creeper Leaves on Top Left */}
          <g fill="#143311">
            <path d="M0,0 Q80,140 180,90 Q110,40 0,0 Z" />
            <path d="M120,0 Q190,150 290,85 Q210,30 120,0 Z" />
          </g>

          {/* Foreground Heavy Rain Streaks */}
          {Array.from({ length: 14 }).map((_, i) => {
            const rx = (i * 157) % 1920;
            const ry = ((frame * 26 + i * 130) % 1200) - 100;
            return (
              <line
                key={`fg-rain-${i}`}
                x1={rx}
                y1={ry}
                x2={rx - 18}
                y2={ry + 75}
                stroke="#00F2FE"
                strokeWidth="3"
                strokeOpacity="0.22"
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* BENGAL PATACHITRA DECORATIVE BORDER & BOTTOM NARRATION BANNER */}
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

        {/* Bottom Subtitle Banner */}
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
          <Zap size={32} color="#00F2FE" fill="#00F2FE" />
          <span
            style={{
              color: '#FFF8E7',
              fontSize: 27,
              fontWeight: 800,
              letterSpacing: 0.4,
            }}
          >
            {isScene6
              ? 'সতর্কতা: শুকনো হাতে ও রাবারের চটি পরে বৈদ্যুতিক সুইচে হাত দিন — টানা তার ছোঁবেন না!'
              : 'সাবধান! ভেজা হাতে বা খালি পায়ে কখনোই সুইচবোর্ড বা বৈদ্যুতিক সরঞ্জাম স্পর্শ করবেন না।'}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
