import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { DustMotes, EASE_INOUT, EASE_OUT, FilmGrade, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import { FontInjector } from '../../kinetic-master/FontInjector';
import { BoyRig } from './BoyRig';
import { ACT1 } from './voiceBeats';

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

  const armLift = ci(local, [ACT1.blanketStart, ACT1.blanketEnd], [0, 1], EASE_OUT);
  const blanketLift = armLift * 105;
  const sparkActive = (local >= ACT1.spark && local < ACT1.sparkEnd) || (local >= ACT1.blanketEcho && local < ACT1.blanketEcho + 70);
  const sparkPulse = sparkActive ? (Math.sin(frame * 1.15) > -0.15 ? 1 : 0.25) : 0;
  const sparkSeed = Math.floor(frame / 4);
  const sparkSmear = ci(local, [ACT1.spark, ACT1.spark + 14], [1, 0], EASE_OUT);
  const fiberMacroAlpha = ci(local, [ACT1.fiberIn, ACT1.fiberIn + 18, ACT1.fiberOut - 12, ACT1.fiberOut], [0, 1, 1, 0], EASE_OUT);
  const fingerReach = ci(local, [ACT1.fingerIn, ACT1.click - 8, ACT1.click + 28, ACT1.click + 50], [0, 1, 1, 0], EASE_OUT);
  const focusIndex = ci(local, [ACT1.blanketStart - 30, ACT1.blanketStart + 20], [1, 2], EASE_INOUT);
  const defocusBoost = fiberMacroAlpha * 6;
  const lampLevel = ci(local, [ACT1.nightEnd, ACT1.lampOutEnd], [1, 0], EASE_INOUT);

  const rockerT = local < ACT1.click - 16 ? 0 : ci(local, [ACT1.click - 16, ACT1.click, ACT1.click + 16], [0, 1.12, 1], EASE_OUT);
  const switchClosed = local >= ACT1.click;
  const wirePulse = (frame * 6.5) % 48;
  const bulbGlow = ci(local, [ACT1.bulbIn, ACT1.bulbFull], [0, 1], EASE_OUT);
  const filamentColor =
    bulbGlow < 0.18 ? '#334155' :
    bulbGlow < 0.4 ? '#9F1239' :
    bulbGlow < 0.62 ? '#EA580C' :
    bulbGlow < 0.84 ? '#FDBA74' : '#FEF08A';
  const lampFlicker = lampLevel * (0.82 + Math.sin(frame * 0.41) * 0.1 + (Math.sin(frame * 1.63) > 0.93 ? 0.16 : 0));
  const specShift = Math.sin(local * 0.012) * -5;
  const mistDrift = Math.sin(frame * 0.025) * 28;
  const isSurprised = local >= ACT1.spark && local < ACT1.fingerIn || local >= ACT1.sameThing;
  const eyeX = local < ACT1.fingerIn ? 0.4 : local < ACT1.sameThing ? 0.9 : local < ACT1.switchEnergy ? -0.15 : 0.75;
  const eyeY = local >= ACT1.bulbIn && local < ACT1.sameThing ? -0.7 : 0.25;
  const thoughtAlpha = ci(local, [ACT1.sameThing, ACT1.sameThing + 16, ACT1.sameThingEnd, ACT1.sameThingEnd + 20], [0, 1, 1, 0], EASE_OUT);

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
        focusIndex={focusIndex}
        defocusBoost={defocusBoost}
        keys={[
          { f: 0, x: -30, y: -8, z: 1.0, rotateY: -0.8, rotateX: 0.3 },
          { f: ACT1.nightEnd, x: -150, y: 18, z: 1.16, rotateY: 0.6, rotateX: 0.2 },
          { f: ACT1.blanketStart, x: -130, y: 28, z: 1.2, rotateY: 0.4, rotateX: 0 },
          { f: ACT1.blanketEnd, x: -190, y: 42, z: 1.38, rotateY: 1.1, rotateX: 0.3 },
          { f: ACT1.spark, x: -230, y: 48, z: 1.72, rotateY: 1.5, rotateX: 0.2 },
          { f: ACT1.sparkEnd, x: -160, y: 16, z: 1.24, rotateY: 0.2, rotateX: 0 },
          { f: ACT1.fingerIn, x: 290, y: 12, z: 1.32, rotateY: -1.6, rotateX: -0.3 },
          { f: ACT1.click, x: 310, y: 18, z: 1.42, rotateY: -1.1, rotateX: 0 },
          { f: ACT1.bulbIn, x: 250, y: -150, z: 1.34, rotateY: -0.5, rotateX: -0.6 },
          { f: ACT1.sameThing, x: -190, y: -28, z: 1.3, rotateY: 1.2, rotateX: 0 },
          { f: ACT1.blanketEcho, x: -210, y: 40, z: 1.46, rotateY: 1.3, rotateX: 0.2 },
          { f: ACT1.switchEnergy, x: 220, y: -30, z: 1.22, rotateY: -1.0, rotateX: -0.2 },
          { f: ACT1.question, x: -150, y: -16, z: 1.26, rotateY: 0.4, rotateX: 0 },
          { f: duration, x: -20, y: 0, z: 1.06, rotateY: 0, rotateX: 0 },
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
            <defs>
              <linearGradient id="moonShaftZ1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="200,480 640,100 1200,980 580,980" fill="url(#moonShaftZ1)" opacity={1 - bulbGlow * 0.55} />
            <rect x="0" y="735" width="1920" height="360" fill="#14100D" />
            <rect x="0" y="725" width="1920" height="12" fill="#261A12" />
            <ellipse cx="1280" cy="760" rx="320" ry="36" fill="#F59E0B" opacity={bulbGlow * 0.34} />
            {/* Bedside Nightstand */}
            <rect x="120" y="688" width="235" height="150" rx="6" fill="#23160E" stroke="#3B2316" strokeWidth="2.5" />
            <circle cx="188" cy="586" r="105" fill={`rgba(245, 158, 11, ${0.55 * lampFlicker})`} />
            <polygon points="158,608 218,608 205,560 171,560" fill={lampLevel > 0.2 ? '#F59E0B' : '#6B3A12'} />
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
              <ellipse
                cx={36}
                cy={158}
                rx={230 - blanketLift * 0.42}
                ry={14}
                fill="#000"
                opacity={0.42 - Math.min(0.22, blanketLift * 0.002)}
              />
              <rect x="-282" y="-82" width="34" height="222" rx="6" fill="#451A03" stroke="#78350F" strokeWidth="2.5" />
              <rect x="-252" y="54" width="525" height="84" rx="14" fill="#1E293B" stroke="#475569" strokeWidth="3" />
              <rect x="-238" y="8" width="115" height="36" rx="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              <rect x="-244" y="38" width="508" height="22" rx="8" fill="#CBD5E1" opacity="0.92" />
              {/* Soft Draped Quilted Comforter with Warm Cream Inner Lining */}
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
              {/* Stitched Diamond Quilting Seam Lines */}
              <path d={`M -65,42 Q 30,${-24 - blanketLift * 0.42} 145,44`} fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.65" />
              <path d={`M 10,44 Q 95,${-12 - blanketLift * 0.32} 195,46`} fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.65" />
              <path d={`M -105,40 Q -20,${-14 - blanketLift * 0.35} 75,44`} fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeDasharray="6 4" opacity="0.55" />
              {/* Inner Fleece Fold */}
              <path
                d={`M 145,${16 - blanketLift * 0.3} Q 195,${-14 - blanketLift * 0.4} 225,${-10 - blanketLift * 0.4} Q 232,20 222,42 Z`}
                fill="#E0E7FF"
                opacity="0.78"
              />
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const n = ci(local, [214 + i * 8, 308 + i * 8], [0, 1], EASE_OUT);
                const x = -88 + i * 50;
                const sway = Math.sin(frame * 0.16 + i * 0.7) * 3.2 * n;
                return (
                  <path
                    key={i}
                    d={`M ${x},40 Q ${x + 3 + sway},${26 - n * 14} ${x + sway},${16 - n * 22}`}
                    fill="none"
                    stroke="#E0E7FF"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    opacity={0.25 + n * 0.6}
                  />
                );
              })}

              {/* Electrostatic Charge Separation & Branching Body-to-Blanket Sparks */}
              {armLift > 0.25 && (
                <g opacity={ci(local, [220, 290, 450, 480], [0, 1, 1, 0])}>
                  {/* Positive charges on boy's sweater/arm & Negative charges on lifted blanket underside */}
                  {[-95, -45, 5, 55].map((cx, i) => (
                    <g key={cx}>
                      <circle cx={cx} cy={30 - i * 2} r="7" fill="rgba(244, 63, 94, 0.28)" stroke="#FDA4AF" strokeWidth="1.2" />
                      <text x={cx} y={34 - i * 2} textAnchor="middle" fill="#FDA4AF" fontSize="11" fontWeight="800">+</text>
                      <circle cx={cx + 12} cy={-12 - blanketLift * 0.35 + (i % 2) * 8} r="7" fill="rgba(56, 189, 248, 0.28)" stroke="#7DD3FC" strokeWidth="1.2" />
                      <text x={cx + 12} y={-8 - blanketLift * 0.35 + (i % 2) * 8} textAnchor="middle" fill="#7DD3FC" fontSize="12" fontWeight="800">-</text>
                    </g>
                  ))}
                </g>
              )}

              {sparkPulse > 0.1 && sparkSmear > 0.05 && (
                <g opacity={sparkPulse * sparkSmear * 0.55} transform="translate(-14, 8)">
                  <path
                    d={`M -68,${22 - blanketLift * 0.08} L ${-48},${-4 - blanketLift * 0.18} L -10,${-18 - blanketLift * 0.28}`}
                    fill="none"
                    stroke="#7DD3FC"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 35,${18 - blanketLift * 0.1} L 76,${6 - blanketLift * 0.14} L 105,${-22 - blanketLift * 0.28}`}
                    fill="none"
                    stroke="#7DD3FC"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {sparkPulse > 0.1 && (
                <g opacity={sparkPulse}>
                  <ellipse cx="25" cy={-8 - blanketLift * 0.22} rx="140" ry="62" fill="rgba(56, 189, 248, 0.24)" />
                  <path
                    d={`M -68,${22 - blanketLift * 0.08} L ${-48 + (sparkSeed % 7) - 3},${-4 - blanketLift * 0.18} L -32,${10 - blanketLift * 0.12} L -10,${-18 - blanketLift * 0.28}`}
                    fill="none"
                    stroke="#E0F2FE"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 14px #38BDF8)"
                  />
                  <path
                    d={`M -48,${-4 - blanketLift * 0.18} L -36,${-22 - blanketLift * 0.25} L -20,${-12 - blanketLift * 0.22}`}
                    fill="none"
                    stroke="#7DD3FC"
                    strokeWidth="2.2"
                  />
                  <path
                    d={`M 35,${18 - blanketLift * 0.1} L ${58 + ((sparkSeed * 3) % 9) - 4},${-10 - blanketLift * 0.24} L 76,${6 - blanketLift * 0.14} L 105,${-22 - blanketLift * 0.28}`}
                    fill="none"
                    stroke="#E0F2FE"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 16px #38BDF8)"
                  />
                  <path
                    d={`M 58,${-10 - blanketLift * 0.24} L 44,${-26 - blanketLift * 0.28}`}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                  />
                </g>
              )}
            </g>

            {/* Detailed Woven Textile Fiber Cutaway Lens inside Blanket (5.7..7.6s) */}
            {fiberMacroAlpha > 0.01 && (
              <g transform="translate(700, 565)" opacity={fiberMacroAlpha}>
                <defs>
                  <clipPath id="fiberMacroClip">
                    <circle cx="0" cy="0" r="106" />
                  </clipPath>
                </defs>
                <circle cx="0" cy="0" r="110" fill="#071022" stroke="#38BDF8" strokeWidth="4.5" filter="drop-shadow(0 0 18px rgba(56,189,248,0.45))" />
                <g clipPath="url(#fiberMacroClip)">
                  {/* Woven Warp & Weft Fiber Strands */}
                  {[-48, 0, 48].map((off, idx) => (
                    <g key={off}>
                      <path
                        d={`M -115,${off - 24} Q 0,${off + (idx % 2 === 0 ? 18 : -18)} 115,${off + 24}`}
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="14"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                      <path
                        d={`M -115,${off + 24} Q 0,${off - (idx % 2 === 0 ? 18 : -18)} 115,${off - 24}`}
                        fill="none"
                        stroke="#CBD5E1"
                        strokeWidth="12"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </g>
                  ))}
                  {/* Hopping Electrons & Micro Discharge Arc */}
                  {[-38, -8, 24, 52].map((ex, i) => {
                    const hop = ((frame * 0.14 + i * 0.4) % 1);
                    return (
                      <g key={ex}>
                        <circle
                          cx={ex + hop * 18}
                          cy={-16 + Math.sin(hop * Math.PI) * -18 + (i % 2) * 26}
                          r="6.5"
                          fill="#38BDF8"
                          filter="drop-shadow(0 0 8px #38BDF8)"
                        />
                      </g>
                    );
                  })}
                  <path d="M -28,-6 L -8,-28 L 8,10 L 28,-14 L 44,4" fill="none" stroke="#E0F2FE" strokeWidth="4" strokeLinecap="round" filter="drop-shadow(0 0 12px #38BDF8)" />
                  {[0, 1, 2].map((i) => {
                    const n = ci(local, [348 + i * 6, 390 + i * 6], [0, 1], EASE_OUT);
                    const sway = Math.sin(frame * 0.2 + i) * 4 * n;
                    return (
                      <path
                        key={i}
                        d={`M ${-40 + i * 28},18 Q ${-36 + i * 28 + sway},${4 - n * 10} ${-32 + i * 28 + sway},${-2 - n * 16}`}
                        fill="none"
                        stroke="#E0E7FF"
                        strokeWidth="1.4"
                        opacity={0.3 + n * 0.55}
                      />
                    );
                  })}
                </g>
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
              <ellipse cx="0" cy="112" rx="108" ry="12" fill="rgba(0,0,0,0.42)" />
              <rect x="-112" y="-92" width="224" height="184" rx="14" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="4" />
              <rect x="-98" y="-78" width="196" height="156" rx="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
              {/* Corner Mounting Screw Caps */}
              {[-84, 84].map((sx) => (
                <g key={sx}>
                  <circle cx={sx} cy="0" r="4.5" fill="#94A3B8" />
                  <ellipse cx={sx + specShift} cy={-1.2} rx="2.1" ry="1" fill="#FFF7ED" opacity="0.9" />
                </g>
              ))}
              {/* Left Module: 6A Switch with X-ray Cutaway */}
              <rect x="-72" y="-54" width="68" height="108" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              <circle cx="-54" cy="14" r="6" fill="#FBBF24" />
              <circle cx="-22" cy="14" r="6" fill="#FBBF24" />
              <line x1="-54" y1="14" x2={-28 + 6 * rockerT} y2={-16 + 30 * rockerT} stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
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
              {/* Animated Finger Pressing the 6A Rocker Switch */}
              {fingerReach > 0.01 && (
                <g
                  transform={`translate(${-38 - (1 - fingerReach) * 75}, ${18 + (1 - fingerReach) * 65}) rotate(-28)`}
                  opacity={fingerReach}
                >
                  <path d="M -16,95 L -14,10 C -14,-12 14,-12 14,10 L 18,95 Z" fill="#DFA580" stroke="#A16244" strokeWidth="2" />
                  <ellipse cx="0" cy="4" rx="8" ry="6" fill="#F5CFAF" opacity="0.6" />
                </g>
              )}
            </g>

            {/* Ceiling Tungsten Bulb */}
            <g transform="translate(1280, 235)">
              {switchClosed && <circle cx="0" cy="0" r="185" fill="url(#ep1BulbGlow4)" opacity={Math.max(0, bulbGlow - 0.35)} />}
              <rect x="-18" y="-58" width="36" height="24" rx="4" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
              <circle
                cx="0"
                cy="0"
                r="44"
                fill={bulbGlow < 0.2 ? 'rgba(30, 41, 59, 0.7)' : bulbGlow < 0.55 ? `rgba(234, 88, 12, ${0.25 + bulbGlow * 0.4})` : `rgba(254, 240, 138, ${0.35 + bulbGlow * 0.55})`}
                stroke={bulbGlow > 0.7 ? '#FDE68A' : '#BAE6FD'}
                strokeWidth="2.5"
              />
              <path
                d="M -14,-22 L -8,8 L 0,-4 L 8,8 L 14,-22"
                fill="none"
                stroke={filamentColor}
                strokeWidth="3.5"
                filter={bulbGlow > 0.45 ? 'drop-shadow(0 0 10px #FDBA74)' : undefined}
              />
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
        <DepthLayer plane="Z3" opacityOverride={0.82}>
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <rect x="28" y="430" width="72" height="690" rx="8" fill="#140E0A" />
            <rect x="16" y="408" width="96" height="28" rx="6" fill="#2A1A12" />
            <circle cx="64" cy="396" r="20" fill="#3B2618" />
            <rect x="40" y="560" width="48" height="14" rx="3" fill="#3B2618" />
            <path d="M 1660,0 C 1705,200 1635,420 1725,640 C 1788,820 1690,980 1755,1080 L 1920,1080 L 1920,0 Z" fill="#07080E" />
            <path d="M 1768,0 C 1835,220 1748,460 1860,720 L 1920,720 L 1920,0 Z" fill="#101624" opacity="0.9" />
            <path d="M 0,900 C 260,840 540,910 820,860 L 820,1080 L 0,1080 Z" fill="#05070C" />
          </svg>
        </DepthLayer>

        {/* Z4: Lens Dust Motes */}
        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={620} count={26} opacity={0.85} seed={11} />
        </DepthLayer>
      </MultiplaneCameraRig>

      <VidyuterKineticTitle frame={local} startFrame={8} endFrame={ACT1.nightEnd} lines={[{ text: 'শীতের রাত', highlight: 'রাত', sizePx: 64 }]} x={90} y={100} accentColor="#BAE6FD" variant="slide" />
      <VidyuterKineticTitle frame={local} startFrame={ACT1.spark} endFrame={ACT1.sparkEnd} lines={[{ text: 'চটপট! নীলচে স্ফুলিঙ্গ', highlight: 'স্ফুলিঙ্গ', sizePx: 62 }]} x={90} y={100} accentColor="#38BDF8" variant="spark" />
      <VidyuterKineticTitle frame={local} startFrame={ACT1.question} endFrame={ACT1.questionEnd + 18} lines={[{ text: 'আসলে বিদ্যুৎ কী?', highlight: 'কী?', sizePx: 68 }]} x={90} y={100} accentColor="#FBBF24" variant="spring" />
      <KineticWord localMs={localMs} appearMs={ACT1.fingerIn / 60 * 1000} emphasizeStartMs={ACT1.click / 60 * 1000} emphasizeEndMs={(ACT1.bulbIn / 60) * 1000} removeMs={(ACT1.bulbFull / 60) * 1000} text="6A সুইচ" x={1280} y={820} accentColor="#FBBF24" />
    </div>
  );
};

/** 20s scrub target for the premium craft pass. Guides are unchanged. */
export const WINTER_HOOK_TEST_FRAMES = 1218;

export const Ep01WinterHookPremiumTest: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, background: '#05070D', overflow: 'hidden' }}>
      <FontInjector />
      <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/act1_hook.mp3')} volume={1} />
      <Sequence from={ACT1.spark} durationInFrames={30}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/sfx_blanket_snap.mp3')} volume={0.35} />
      </Sequence>
      <Sequence from={ACT1.click} durationInFrames={24}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/sfx_switch_click.mp3')} volume={0.38} />
      </Sequence>
      <Ep01WinterHookScene frame={frame} local={frame} duration={WINTER_HOOK_TEST_FRAMES} />
      <FilmGrade frame={frame} vignette={0.5} />
    </div>
  );
};
