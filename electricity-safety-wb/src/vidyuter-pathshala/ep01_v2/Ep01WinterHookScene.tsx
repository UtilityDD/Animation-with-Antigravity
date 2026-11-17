import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import { BoyRig } from './BoyRig';

/**
 * ACT 1: Everyday Sensory Hook (0..1218f / 20.0s)
 * - Rich lived-in Indian winter bedroom across Z0-Z4 depth layers (bookshelf, clock, nightstand, teacup, phone, ceiling fan)
 * - Accurate camera coordinates: negative x/y pans LEFT/UP, positive x pans RIGHT!
 * - Realistic Indian 6A Modular Switchboard (6A rocker + red neon + 3-pin socket) with X-ray brass cutaway & PVC conduit to bulb
 */
export const Ep01WinterHookScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);

  const armLift = ci(local, [170, 340], [0, 1], EASE_OUT);
  const blanketLift = armLift * 105;
  const sparkFlash = local >= 295 && local < 455 && frame % 10 < 5;
  const fiberMacroAlpha = ci(local, [330, 360, 445, 470], [0, 1, 1, 0], EASE_OUT);

  const switchClosed = local >= 505;
  const wirePulse = (frame * 6.5) % 48;
  const bulbGlow = ci(local, [560, 610], [0, 1], EASE_OUT);
  const mistDrift = Math.sin(frame * 0.025) * 28;
  const isSurprised = local >= 325;
  const eyeX = local >= 720 ? ci(local, [720, 820, 960], [-0.4, 0.75, -0.2]) : 0.35;
  const eyeY = local >= 720 ? ci(local, [720, 820, 960], [0.2, -0.75, 0.1]) : 0.45;
  const thoughtAlpha = ci(local, [760, 800, 1170, 1210], [0, 1, 1, 0], EASE_OUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: switchClosed
          ? 'radial-gradient(ellipse at 65% 28%, #3A2A14 0%, #090B10 78%)'
          : 'radial-gradient(ellipse at 42% 45%, #121A2B 0%, #05070D 84%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          // 0..3.6s: Wide moonlit room -> dolly toward bed
          { f: 0, x: 0, y: 0, z: 0.96, rotateY: -1.4 },
          { f: 216, x: -120, y: 20, z: 1.16, rotateY: 0 },
          // 3.6..5.7s: Boy lifts quilted blanket
          { f: 342, x: -180, y: 40, z: 1.32, rotateY: 1.2 },
          // 5.7..7.6s: Crash-zoom straight onto blanket fiber cutaway (x=700, y=575)!
          { f: 456, x: -240, y: 45, z: 1.82, rotateY: 1.8 },
          // 7.6..11.8s: Whip-pan RIGHT to realistic 6A switchboard (x=1340) -> track UP wiring conduit to ceiling bulb (y=215)!
          { f: 505, x: 310, y: 20, z: 1.35, rotateY: -1.8 },
          { f: 615, x: 300, y: -110, z: 1.38, rotateY: -1.0 },
          { f: 708, x: 240, y: -210, z: 1.25, rotateY: 0 },
          // 11.8..20.0s: Pan/dolly onto surprised boy's face + ? thought bubble!
          { f: 785, x: -210, y: -35, z: 1.35, rotateY: 1.4 },
          { f: 1020, x: -160, y: -25, z: 1.26, rotateY: 0.6 },
          { f: duration, x: -40, y: 0, z: 1.06, rotateY: 0 },
        ]}
      >
        {/* Z0: Far Bedroom Wall, Moonlit Frosted Window + Night Mist, Wall Clock & Bookshelf */}
        <DepthLayer plane="Z0">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <defs>
              <linearGradient id="moonShaft4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="1920" height="1080" fill="#0B101B" />
            {/* Moonlit Frosted Window */}
            <rect x="200" y="100" width="440" height="380" rx="8" fill="#081326" stroke="#1E293B" strokeWidth="14" />
            <circle cx="510" cy="215" r="46" fill="#E0F2FE" opacity="0.7" />
            <ellipse cx={370 + mistDrift} cy="385" rx="145" ry="34" fill="#CBD5E1" opacity="0.24" />
            <ellipse cx={470 - mistDrift * 0.7} cy="425" rx="130" ry="28" fill="#94A3B8" opacity="0.18" />
            <line x1="420" y1="100" x2="420" y2="480" stroke="#1E293B" strokeWidth="8" />
            <line x1="200" y1="290" x2="640" y2="290" stroke="#1E293B" strokeWidth="8" />
            <polygon points="200,480 640,100 1200,980 580,980" fill="url(#moonShaft4)" />

            {/* Framed Wall Clock (11:45) */}
            <g transform="translate(880, 210)">
              <circle cx="0" cy="0" r="54" fill="#1E293B" stroke="#475569" strokeWidth="6" />
              <line x1="0" y1="0" x2="0" y2="-32" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-26" y2="6" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Wooden Bookshelf on Right */}
            <g transform="translate(1540, 170)">
              <rect x="0" y="0" width="260" height="340" fill="#17110C" stroke="#2D1E14" strokeWidth="6" />
              {[105, 215].map((sy) => (
                <g key={sy}>
                  <rect x="8" y={sy} width="244" height="10" fill="#2D1E14" />
                  {[20, 48, 76, 108, 138, 170, 200].map((bx, i) => (
                    <rect key={bx} x={bx} y={sy - 62 - (i % 3) * 10} width="22" height={62 + (i % 3) * 10} fill={['#7F1D1D', '#1E3A8A', '#14532D', '#78350F'][i % 4]} opacity="0.7" />
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </DepthLayer>

        {/* Z1: Midground Room Items — Bedside Table, Warm Lamp, Steaming Teacup, Spectacles, Phone, Study Chair */}
        <DepthLayer plane="Z1">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <rect x="0" y="735" width="1920" height="360" fill="#14100D" />
            <rect x="0" y="725" width="1920" height="12" fill="#261A12" />
            {/* Bedside Nightstand */}
            <rect x="120" y="688" width="235" height="150" rx="6" fill="#23160E" stroke="#3B2316" strokeWidth="2.5" />
            <circle cx="188" cy="586" r="105" fill="rgba(245, 158, 11, 0.3)" />
            <polygon points="158,608 218,608 205,560 171,560" fill="#D97706" />
            <rect x="184" y="608" width="8" height="80" fill="#78350F" />
            {/* Steaming Teacup on Saucer */}
            <ellipse cx="276" cy="686" rx="28" ry="6" fill="#64748B" />
            <rect x="256" y="644" width="40" height="40" rx="6" fill="#CBD5E1" />
            <path d={`M 274,636 Q ${268 + Math.sin(frame * 0.08) * 6},610 280,588`} fill="none" stroke="#E2E8F0" strokeWidth="2.5" opacity="0.65" />
            {/* Charging Smartphone */}
            <rect x="308" y="672" width="76" height="14" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            {/* Right Side Study Desk & Chair Silhouette */}
            <rect x="1520" y="650" width="320" height="18" rx="4" fill="#23160E" />
            <rect x="1550" y="668" width="18" height="110" fill="#1A100A" />
            <rect x="1790" y="668" width="18" height="110" fill="#1A100A" />
          </svg>
        </DepthLayer>

        {/* Z2: Hero Stage — BoyRig + Quilted Blanket + Fiber Macro + Realistic 6A Switchboard & Wiring Conduit */}
        <DepthLayer plane="Z2">
          <BoyRig
            pose={{
              worldX: 350,
              worldY: 165,
              chestLeanDeg: isSurprised ? -4 : 6,
              breathY: Math.sin(frame * 0.05) * 2,
              headRollDeg: isSurprised ? -5 : 4,
              eyeLookX: eyeX,
              eyeLookY: eyeY,
              blinkAmount: frame % 165 > 158 ? 1 : 0,
              expression: isSurprised ? 'surprised' : 'curious',
              armLift,
            }}
            scale={0.76}
          />

          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
            <defs>
              <radialGradient id="ep1BulbGlow4" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.92" />
                <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Bed Floor Mask */}
            <rect x="380" y="758" width="540" height="80" fill="#14100D" />

            {/* Ceiling Molding Beam + Ceramic Rose */}
            <rect x="0" y="0" width="1920" height="44" fill="#18120D" stroke="#2D1E14" strokeWidth="2" />
            {/* Wooden Bed + Pillow + Soft Draped Quilted Comforter */}
            <g transform="translate(650, 625)">
              <ellipse cx="0" cy="148" rx="315" ry="26" fill="rgba(0,0,0,0.65)" />
              <rect x="-282" y="-82" width="34" height="222" rx="6" fill="#451A03" stroke="#78350F" strokeWidth="2.5" />
              <rect x="-252" y="54" width="525" height="84" rx="14" fill="#1E293B" stroke="#475569" strokeWidth="3" />
              <rect x="-238" y="8" width="115" height="36" rx="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              <rect x="-244" y="38" width="508" height="22" rx="8" fill="#CBD5E1" opacity="0.92" />
              {/* Soft Draped Comforter with Warm Cream Inner Lining */}
              <path
                d={`M -145,42 C -70,${-8 - blanketLift * 0.45} 35,${-68 - blanketLift} 225,${-10 - blanketLift * 0.4} Q 242,20 232,48 L -145,48 Z`}
                fill="url(#moonShaft4)"
              />
              <path
                d={`M -145,42 C -70,${-8 - blanketLift * 0.45} 35,${-68 - blanketLift} 225,${-10 - blanketLift * 0.4} Q 242,20 232,48 L -145,48 Z`}
                fill="#312E81"
                stroke="#818CF8"
                strokeWidth="3.5"
              />
              {/* Inner Fleece Fold */}
              <path
                d={`M 145,${16 - blanketLift * 0.3} Q 195,${-14 - blanketLift * 0.4} 225,${-10 - blanketLift * 0.4} Q 232,20 222,42 Z`}
                fill="#E0E7FF"
                opacity="0.72"
              />
              <path d={`M -65,42 Q 30,${-24 - blanketLift * 0.42} 145,44`} fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.65" />
              <path d={`M 10,44 Q 95,${-12 - blanketLift * 0.32} 195,46`} fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.65" />
              {sparkFlash && (
                <>
                  <path d={`M -42,${18 - blanketLift * 0.15} L -22,${-6 - blanketLift * 0.2} L -8,${12 - blanketLift * 0.12} L 12,${-10 - blanketLift * 0.22}`} fill="none" stroke="#E0F2FE" strokeWidth="4.5" filter="drop-shadow(0 0 14px #38BDF8)" />
                  <path d={`M 65,${10 - blanketLift * 0.18} L 86,${-14 - blanketLift * 0.25} L 98,${8 - blanketLift * 0.15} L 120,${-12 - blanketLift * 0.22}`} fill="none" stroke="#38BDF8" strokeWidth="4.5" filter="drop-shadow(0 0 14px #38BDF8)" />
                </>
              )}
            </g>

            {/* Macro Fiber Cutaway Lens inside Blanket (5.7..7.6s) */}
            {fiberMacroAlpha > 0.01 && (
              <g transform="translate(700, 565)" opacity={fiberMacroAlpha}>
                <circle cx="0" cy="0" r="108" fill="#0B1324" stroke="#38BDF8" strokeWidth="4" />
                <line x1="-80" y1="-35" x2="80" y2="35" stroke="#818CF8" strokeWidth="8" strokeLinecap="round" />
                <line x1="-80" y1="35" x2="80" y2="-35" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                <circle cx="-18" cy="-12" r="6" fill="#38BDF8" />
                <circle cx="22" cy="14" r="6" fill="#38BDF8" />
                <path d="M -12,-8 L 0,-22 L 10,8 L 24,-6" fill="none" stroke="#E0F2FE" strokeWidth="3.5" filter="drop-shadow(0 0 8px #38BDF8)" />
              </g>
            )}

            {/* Realistic PVC Conduit & Live Copper Wiring Path from Switchboard -> Ceiling Junction -> Bulb */}
            <path d="M 1390,520 L 1465,520 L 1465,145 L 1280,145 L 1280,195" fill="none" stroke="#334155" strokeWidth="18" strokeLinejoin="round" />
            <path d="M 1390,520 L 1465,520 L 1465,145 L 1280,145 L 1280,195" fill="none" stroke="#B45309" strokeWidth="6" strokeLinejoin="round" />
            {switchClosed && (
              <path
                d="M 1390,520 L 1465,520 L 1465,145 L 1280,145 L 1280,195"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="4.5"
                strokeDasharray="12 14"
                strokeDashoffset={-wirePulse}
                strokeLinejoin="round"
                filter="drop-shadow(0 0 8px #38BDF8)"
              />
            )}
            <rect x="1449" y="130" width="32" height="32" rx="6" fill="#475569" stroke="#94A3B8" strokeWidth="2" />

            {/* Realistic Indian 6A Modular Switchboard (6A Rocker + Red Neon + 3-Pin Socket) */}
            <g transform="translate(1280, 520)">
              <rect x="-112" y="-92" width="224" height="184" rx="14" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="4" />
              <rect x="-98" y="-78" width="196" height="156" rx="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
              {/* Corner Mounting Screw Caps */}
              {[-84, 84].map((sx) => (
                <circle key={sx} cx={sx} cy="0" r="4.5" fill="#94A3B8" />
              ))}
              {/* Left Module: 6A Switch with X-ray Cutaway */}
              <rect x="-72" y="-54" width="68" height="108" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              <circle cx="-54" cy="14" r="6" fill="#FBBF24" />
              <circle cx="-22" cy="14" r="6" fill="#FBBF24" />
              <line x1="-54" y1="14" x2={switchClosed ? -22 : -28} y2={switchClosed ? 14 : -16} stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
              {/* Red Neon Indicator LED */}
              <circle cx="-38" cy="-36" r="4.5" fill={switchClosed ? '#EF4444' : '#450A0A'} />
              {/* Right Module: 3-Pin 6A Socket */}
              <g transform="translate(42, 0)">
                <rect x="-32" y="-54" width="64" height="108" rx="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
                <circle cx="0" cy="-24" r="6.5" fill="#1E293B" />
                <circle cx="-15" cy="14" r="5.5" fill="#1E293B" />
                <circle cx="15" cy="14" r="5.5" fill="#1E293B" />
              </g>
              {local >= 505 && local < 530 && (
                <path d="M -30,6 L -24,14 L -18,8" fill="none" stroke="#E0F2FE" strokeWidth="4" filter="drop-shadow(0 0 14px #38BDF8)" />
              )}
              <text x="-38" y="70" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="800">6A</text>
            </g>

            {/* Ceiling Tungsten Bulb */}
            <g transform="translate(1280, 235)">
              {switchClosed && <circle cx="0" cy="0" r="185" fill="url(#ep1BulbGlow4)" opacity={bulbGlow} />}
              <rect x="-18" y="-58" width="36" height="24" rx="4" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
              <circle cx="0" cy="0" r="44" fill={switchClosed ? 'rgba(254, 240, 138, 0.92)' : 'rgba(30, 41, 59, 0.65)'} stroke="#BAE6FD" strokeWidth="2.5" />
              <path d="M -14,-22 L -8,8 L 0,-4 L 8,8 L 14,-22" fill="none" stroke={switchClosed ? '#FEF08A' : '#64748B'} strokeWidth="3.5" />
            </g>

            {/* Surprised Boy's "?" Thought Bubble (11.8..20.0s) */}
            {thoughtAlpha > 0.01 && (
              <g opacity={thoughtAlpha}>
                <circle cx="665" cy="365" r="7" fill="#F8F1E3" />
                <circle cx="695" cy="335" r="11" fill="#F8F1E3" />
                <g transform="translate(795, 255)">
                  <ellipse cx="0" cy="0" rx="110" ry="58" fill="#F8F1E3" stroke="#CBD5E1" strokeWidth="2.5" />
                  <path d="M -55,0 L -42,-12 L -34,4 L -22,-8" fill="none" stroke="#0284C7" strokeWidth="3.5" />
                  <text x="0" y="10" textAnchor="middle" fill="#0F172A" fontSize="34" fontWeight="800">=?</text>
                  <circle cx="52" cy="0" r="16" fill="#FBBF24" />
                </g>
              </g>
            )}
          </svg>
        </DepthLayer>

        {/* Z3: Near Foreground Bedpost & Curtain Framing */}
        <DepthLayer plane="Z3">
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <rect x="-40" y="180" width="135" height="940" fill="#05070C" />
            <path d="M 1780,0 Q 1860,360 1920,760 L 1920,0 Z" fill="#05070C" />
          </svg>
        </DepthLayer>

        {/* Z4: Lens Dust Motes */}
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={620} count={26} opacity={0.85} seed={11} />
        </DepthLayer>
      </MultiplaneCameraRig>

      <VidyuterKineticTitle frame={local} startFrame={15} endFrame={250} lines={[{ text: 'শীতের রাত', highlight: 'রাত', sizePx: 64 }]} x={90} y={100} accentColor="#BAE6FD" variant="slide" />
      <VidyuterKineticTitle frame={local} startFrame={280} endFrame={500} lines={[{ text: 'চটপট! নীলচে স্ফুলিঙ্গ', highlight: 'স্ফুলিঙ্গ', sizePx: 62 }]} x={90} y={100} accentColor="#38BDF8" variant="spark" />
      <VidyuterKineticTitle frame={local} startFrame={790} endFrame={1195} lines={[{ text: 'আসলে বিদ্যুৎ কী?', highlight: 'কী?', sizePx: 68 }]} x={90} y={100} accentColor="#FBBF24" variant="spring" />
      <KineticWord localMs={localMs} appearMs={8400} emphasizeStartMs={8600} emphasizeEndMs={10800} removeMs={11400} text="6A সুইচ" x={1280} y={820} accentColor="#FBBF24" />
    </div>
  );
};
