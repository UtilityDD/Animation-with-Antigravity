import React from 'react';
import { ThalesPose, ThalesRig, getThalesExpressionParams } from '../ThalesRig';
import {
  AmberGem,
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  camAt,
  camTransform,
  ci,
} from './Scene1Shared';

/**
 * Beat 4: Thales & Close-up Rubbing Insert Shot (Frames 510 to 900)
 * - 510..690: Medium shot of Thales seated at the stone table, 100% framed
 *   including his hands, amber, and wool cloth (zero cutoffs).
 * - 690..900: Smooth camera push-in to a dramatic macro close-up of hands
 *   rubbing the amber stone against wool with crackling electrostatic sparks.
 */
export const ThalesRubbingShot: React.FC<{ frame: number }> = ({ frame }) => {
  const local = Math.max(0, frame - 510);

  const fadeIn = ci(local, [0, 28], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [365, 395], [1, 0], EASE_INOUT);

  // Camera smoothly moves from medium framing of Thales -> macro close-up on hands/amber
  const cam = camAt(local, [
    { f: 0, x: 1200, y: 510, z: 0.94, sx: 1240, sy: 540 },
    { f: 165, x: 1200, y: 525, z: 1.0, sx: 1240, sy: 540 },
    { f: 245, x: 1185, y: 695, z: 1.85, sx: 1240, sy: 560 },
    { f: 390, x: 1190, y: 695, z: 1.98, sx: 1240, sy: 560 },
  ]);

  // Rubbing cycle speeds up as he rubs vigorously
  const rubSpeed = ci(local, [120, 240], [0.06, 0.13]);
  const rubProgress = (local * rubSpeed) % 1;
  const rubOsc = Math.sin(local * 0.28) * 32;
  const sparksActive = local > 150;
  const chargeLevel = ci(local, [150, 350], [0, 1]);

  // Eye saccades: eyes actively track the rubbing amber stone back and forth!
  const saccadeX = Math.cos(rubProgress * Math.PI * 2) * 0.25 + 0.12;
  const saccadeY = 0.72 + Math.sin(local * 0.11) * 0.06;

  // Warm flickering oil lamp rim light
  const lampFlicker = 0.88 + Math.sin(frame * 0.35) * 0.12;

  const expr = getThalesExpressionParams(local > 140 ? 'curious' : 'focused');
  const thalesPose: ThalesPose = {
    worldX: 1180,
    worldY: 160, // Positioned higher so torso + arms + hands stay comfortably inside frame
    chestLeanDeg: 6 + Math.sin(local * 0.08) * 2.2,
    torsoYaw: 0.15,
    breathY: Math.sin(local * 0.05) * 2.5,
    neckPitchDeg: 10,
    headRollDeg: -3 + Math.sin(local * 0.06) * 2.5,
    headPitch: 0.2,
    eyeLookX: saccadeX,
    eyeLookY: saccadeY,
    blinkAmount: local % 140 > 133 ? 1 : 0,
    eyeWiden: expr.eyeWiden,
    browFurrow: expr.browFurrow,
    browLift: expr.browLift,
    mouthOpen: expr.mouthOpen,
    mouthState: expr.mouthState,
    rubProgress,
    leftArmState: 'holdingWool',
    rightArmState: 'rubbingAmber',
    amberGlow: chargeLevel,
    beardSwayDeg: Math.sin(local * 0.08) * 1.8,
  };

  // Show dedicated ultra-detailed macro overlay as camera zooms in (local > 190)
  const macroMix = ci(local, [185, 245], [0, 1], EASE_INOUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 65% 55%, #161E31 0%, #060912 75%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Camera Layer */}
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
        {/* Distant Greek Columns */}
        <div
          style={{
            position: 'absolute',
            left: 820,
            top: 0,
            bottom: 360,
            width: 90,
            background: 'linear-gradient(90deg, #070B14 0%, #161F33 50%, #070B14 100%)',
            opacity: 0.65,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 1580,
            top: 0,
            bottom: 360,
            width: 100,
            background: 'linear-gradient(90deg, #070B14 0%, #161F33 50%, #070B14 100%)',
            opacity: 0.55,
          }}
        />

        {/* Warm Oil Lamp Rim Illumination behind Thales */}
        <div
          style={{
            position: 'absolute',
            left: 1200,
            top: 480,
            width: 900,
            height: 750,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(245, 158, 11, ${0.24 * lampFlicker}) 0%, rgba(15, 23, 42, 0) 68%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Thales Character Rig */}
        <ThalesRig pose={thalesPose} scale={0.92} opacity={1 - macroMix * 0.7} />

        {/* Stone Study Table (placed so hands rest clearly on top) */}
        <div
          style={{
            position: 'absolute',
            left: 500,
            right: -300,
            top: 660,
            bottom: -300,
            background: 'linear-gradient(180deg, #252E42 0%, #101622 35%, #06080E 100%)',
            borderTop: '3px solid #475569',
            boxShadow: '0 -12px 40px rgba(0,0,0,0.65)',
          }}
        />

        {/* Detailed Macro Hands + Wool Cloth + Translucent AmberGem + Sparks */}
        <svg
          width="700"
          height="420"
          viewBox="-350 -210 700 420"
          style={{
            position: 'absolute',
            left: 1185,
            top: 690,
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',
            opacity: macroMix,
          }}
        >
          <defs>
            <linearGradient id="macroWool" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="55%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
            <linearGradient id="macroSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9DFCD" />
              <stop offset="55%" stopColor="#ECC4A8" />
              <stop offset="100%" stopColor="#C99672" />
            </linearGradient>
          </defs>

          {/* Table Contact Shadow */}
          <ellipse cx="0" cy="58" rx="190" ry="26" fill="#000000" opacity="0.65" />

          {/* Coarse Woven Wool Cloth with Fuzzy Fibers */}
          <g transform="translate(-10, 26)">
            <path
              d="M -140,-18 C -95,-42 75,-46 135,-16 C 165,12 150,48 100,56 C 25,68 -80,62 -135,34 C -160,18 -160,0 -140,-18 Z"
              fill="url(#macroWool)"
              stroke="#451A03"
              strokeWidth="2.5"
            />
            {[-95, -50, -5, 40, 85].map((wx) => (
              <path
                key={wx}
                d={`M ${wx - 22},-16 Q ${wx},8 ${wx + 24},-14`}
                fill="none"
                stroke="#B45309"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.75"
              />
            ))}
            {/* Fine fuzzy stray wool fibers along top contour */}
            {[-110, -70, -30, 15, 60, 105].map((fx, idx) => (
              <path
                key={fx}
                d={`M ${fx},${-32 + (idx % 2) * 4} q ${idx % 2 ? 6 : -6},-9 ${idx % 2 ? 12 : -10},-12`}
                fill="none"
                stroke="#D97706"
                strokeWidth="1.3"
                strokeLinecap="round"
                opacity="0.55"
              />
            ))}
          </g>

          {/* Left Hand & Wrist holding wool edge steady */}
          <g transform="translate(-135, 16)">
            <path d="M -110,8 Q -45,-14 8,-2 Q 24,14 6,30 Q -42,42 -110,32 Z" fill="url(#macroSkin)" />
            <ellipse cx="4" cy="4" rx="14" ry="7.5" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.2" />
            <ellipse cx="2" cy="17" rx="13" ry="7" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.2" />
            <ellipse cx="-2" cy="28" rx="11" ry="6" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.1" />
            {/* Thumb pressing wool */}
            <path d="M -26,-6 Q -6,-18 10,-10 Q 14,-2 2,2 Q -16,4 -26,-6 Z" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.1" />
          </g>

          {/* Right Hand gripping & rubbing AmberGem across the wool */}
          <g transform={`translate(${rubOsc}, -28)`}>
            <AmberGem id="macroAmber" size={115} glow={0.35 + chargeLevel * 0.65} charge={chargeLevel} />

            {/* Realistic Forearm, Wrist, Thumb & Knuckles gripping Amber */}
            <g transform="translate(26, -24)">
              <path d="M -38,-4 Q 14,-34 118,-14 L 128,22 Q 40,34 -14,22 Z" fill="url(#macroSkin)" />
              {/* Thumb curving down front side */}
              <path d="M -22,12 Q -36,26 -24,38 Q -12,42 -4,28 Z" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.2" />
              {/* Curved fingers */}
              <ellipse cx="-26" cy="-12" rx="14" ry="7.5" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.2" />
              <ellipse cx="-24" cy="2" rx="15" ry="8.5" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.2" />
              <ellipse cx="-14" cy="16" rx="14" ry="8" fill="url(#macroSkin)" stroke="#C99672" strokeWidth="1.2" />
            </g>

            {/* Electrostatic Friction Sparks jumping between Amber and Wool */}
            {sparksActive && (
              <g transform="translate(0, 38)">
                <path
                  d={`M -16,0 L ${-24 + Math.sin(frame * 1.4) * 8},12 L -12,18 L -28,28`}
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 8px #60A5FA)"
                />
                <path
                  d={`M 18,-4 L ${28 + Math.cos(frame * 1.7) * 8},8 L 16,14 L 32,24`}
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 8px #FACC15)"
                />
                <circle cx="-28" cy="28" r="3" fill="#FFFFFF" />
                <circle cx="32" cy="24" r="2.8" fill="#FFFFFF" />
              </g>
            )}
          </g>
        </svg>

        {/* Dust motes floating above the table */}
        <DustMotes frame={frame} cx={1185} cy={560} radius={320} count={28} opacity={0.85} seed={19} />
      </div>
    </div>
  );
};
