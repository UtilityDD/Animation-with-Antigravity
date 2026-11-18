import React from 'react';

export type ThalesExpression = 'focused' | 'curious' | 'astonished' | 'contemplative';

export interface ThalesPose {
  worldX: number;
  worldY: number;

  // Torso & Himation
  chestLeanDeg: number;
  torsoYaw: number;
  breathY: number;
  shoulderElevateY?: number;

  // Head & Neck
  neckPitchDeg: number;
  headRollDeg: number;
  headPitch: number;

  // Facial acting
  eyeLookX: number;
  eyeLookY: number;
  blinkAmount: number; // 0..1
  eyeWiden: number;    // 0..1
  browFurrow: number;  // 0..1
  browLift: number;    // px
  mouthOpen: number;   // 0..1
  mouthState: 'neutral' | 'focus' | 'gasp' | 'smile';

  // Arms & Action
  rubProgress: number; // 0..1 rubbing oscillation
  leftArmState: 'holdingWool' | 'resting' | 'raisedWonder';
  rightArmState: 'rubbingAmber' | 'holdingAmberUp' | 'astonished' | 'reachingAmber';
  amberGlow: number; // 0..1 electrostatic glow
  /** 'reachingAmber' only: 0 = rubbing at the chest, 1 = arm stretched out holding the amber. */
  reach?: number;
  /** 'reachingAmber' only: extra forearm wobble in degrees (nervous / awed tremble). */
  handTremble?: number;
  beardSwayDeg?: number;
  amazeBlend?: number; // 0..1 for smooth gesture interpolation
}

export function getThalesExpressionParams(expr: ThalesExpression): {
  eyeWiden: number;
  browLift: number;
  browFurrow: number;
  mouthOpen: number;
  mouthState: 'neutral' | 'focus' | 'gasp' | 'smile';
} {
  switch (expr) {
    case 'curious':
      return { eyeWiden: 0.25, browLift: 3.5, browFurrow: 0.25, mouthOpen: 0.14, mouthState: 'neutral' };
    case 'astonished':
      return { eyeWiden: 0.95, browLift: 9.0, browFurrow: 0, mouthOpen: 0.88, mouthState: 'gasp' };
    case 'contemplative':
      return { eyeWiden: 0.05, browLift: 1.0, browFurrow: 0.65, mouthOpen: 0, mouthState: 'focus' };
    case 'focused':
    default:
      return { eyeWiden: 0.12, browLift: 1.0, browFurrow: 0.55, mouthOpen: 0.05, mouthState: 'focus' };
  }
}

export interface ThalesRigProps {
  pose: ThalesPose;
  scale?: number;
  opacity?: number;
}

/**
 * Natural Expressive Hand with Thumb + 4 Staggered Curved Fingers
 */
const ExpressiveHand: React.FC<{ flipX?: boolean; open?: number }> = ({ flipX = false, open = 1 }) => (
  <g transform={`scale(${flipX ? -1 : 1}, 1)`}>
    {/* Palm */}
    <path
      d="M -14,-6 C -16,10 -12,24 0,26 C 12,26 17,12 15,-4 C 13,-14 -10,-14 -14,-6 Z"
      fill="url(#thalesSkin)"
      stroke="#C99672"
      strokeWidth="1.2"
    />
    {/* Thumb */}
    <path
      d={`M -12,2 Q ${-22 - open * 6},${-6 - open * 4} ${-26 - open * 6},${6 - open * 2} Q -18,14 -10,12 Z`}
      fill="url(#thalesSkin)"
      stroke="#C99672"
      strokeWidth="1.1"
    />
    {/* Index Finger */}
    <rect
      x="-11"
      y="18"
      width="6.5"
      height={24}
      rx="3.2"
      fill="url(#thalesSkin)"
      stroke="#C99672"
      strokeWidth="1"
      transform={`rotate(${14 * open}, -8, 18)`}
    />
    {/* Middle Finger */}
    <rect
      x="-3.5"
      y="20"
      width="6.8"
      height={27}
      rx="3.4"
      fill="url(#thalesSkin)"
      stroke="#C99672"
      strokeWidth="1"
      transform={`rotate(${4 * open}, 0, 20)`}
    />
    {/* Ring Finger */}
    <rect
      x="4"
      y="19"
      width="6.4"
      height={24}
      rx="3.2"
      fill="url(#thalesSkin)"
      stroke="#C99672"
      strokeWidth="1"
      transform={`rotate(${-6 * open}, 7, 19)`}
    />
    {/* Pinky Finger */}
    <rect
      x="10.5"
      y="15"
      width="5.6"
      height={19}
      rx="2.8"
      fill="url(#thalesSkin)"
      stroke="#C99672"
      strokeWidth="1"
      transform={`rotate(${-15 * open}, 13, 15)`}
    />
  </g>
);


// ------------------------------------------------------------------
// 'reachingAmber' arm geometry — shared by the renderer and by scenes that need to
// place glow / feathers / sparks exactly on the amber held in Thales' hand.
// ------------------------------------------------------------------
const SHOULDER_R = { x: 105, y: 42 };
const ELBOW_IN_UPPER = { x: -8, y: 140 };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rotPt = (x: number, y: number, deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { x: x * Math.cos(r) - y * Math.sin(r), y: x * Math.sin(r) + y * Math.cos(r) };
};

export function thalesReachArm(pose: Pick<ThalesPose, 'rubProgress' | 'reach' | 'handTremble'>) {
  const reach = Math.min(1, Math.max(0, pose.reach ?? 0));
  const rubAngle = Math.sin(pose.rubProgress * Math.PI * 2) * 16 * (1 - reach);
  const rubX = Math.cos(pose.rubProgress * Math.PI * 2) * 22 * (1 - reach);
  const upperDeg = lerp(22, -62, reach) + rubAngle;
  const foreDeg = lerp(-50, -20, reach) + rubAngle * 0.8 + (pose.handTremble ?? 0);
  const foreLen = lerp(92, 116, reach);
  const amberInFore = { x: rubX + lerp(14, 2, reach), y: foreLen + lerp(16, 30, reach) };
  return { reach, upperDeg, foreDeg, foreLen, rubX, amberInFore };
}

/** Amber centre in rig SVG coordinates (before the chest-lean rotation). */
function amberRigPoint(pose: Pick<ThalesPose, 'rubProgress' | 'reach' | 'handTremble' | 'chestLeanDeg'>) {
  const a = thalesReachArm(pose);
  const inFore = rotPt(a.amberInFore.x, a.amberInFore.y, a.foreDeg);
  const inUpper = rotPt(ELBOW_IN_UPPER.x + inFore.x, ELBOW_IN_UPPER.y + inFore.y, a.upperDeg);
  const p = { x: SHOULDER_R.x + inUpper.x, y: SHOULDER_R.y + inUpper.y };
  // body group rotates about (0, 260)
  const q = rotPt(p.x, p.y - 260, pose.chestLeanDeg);
  return { x: q.x, y: q.y + 260 };
}

/** Screen position (scene px) of the amber held by a ThalesRig drawn with `pose` and `scale`. */
export function thalesAmberScreen(pose: ThalesPose, scale = 1) {
  const p = amberRigPoint(pose);
  // the rig div is 640x880, viewBox origin at (-320,-400), scaled about its bottom centre
  return { x: pose.worldX + 320 + p.x * scale, y: pose.worldY + pose.breathY + 880 + (p.y + 400 - 880) * scale };
}

export const ThalesRig: React.FC<ThalesRigProps> = ({
  pose,
  scale = 1.0,
  opacity = 1.0,
}) => {
  const {
    worldX,
    worldY,
    chestLeanDeg,
    breathY,
    shoulderElevateY = 0,
    neckPitchDeg,
    headRollDeg,
    eyeLookX,
    eyeLookY,
    blinkAmount,
    eyeWiden,
    browFurrow,
    browLift,
    mouthOpen,
    mouthState,
    rubProgress,
    leftArmState,
    rightArmState,
    amberGlow,
    beardSwayDeg = 0,
    amazeBlend = 1,
  } = pose;

  const rubAngle = Math.sin(rubProgress * Math.PI * 2) * 16;
  const rubX = Math.cos(rubProgress * Math.PI * 2) * 22;

  const eyeRy = Math.max(1.2, (1 - blinkAmount * 0.92) * (10 + eyeWiden * 5.5));
  const lidDropTop = blinkAmount * 18 - eyeWiden * 3.5;
  const jawDropY = mouthState === 'gasp' ? mouthOpen * 9 : mouthOpen * 3;
  const cheekLift = mouthState === 'gasp' ? 2.5 * mouthOpen : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: worldX,
        top: worldY + breathY,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="640"
        height="880"
        viewBox="-320 -400 640 880"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="thalesSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9DFCD" />
            <stop offset="50%" stopColor="#ECC4A8" />
            <stop offset="100%" stopColor="#D49E7B" />
          </linearGradient>

          <linearGradient id="thalesSkinShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4B596" />
            <stop offset="100%" stopColor="#BF8763" />
          </linearGradient>

          <linearGradient id="himationBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8F9FA" />
            <stop offset="45%" stopColor="#E2E8F0" />
            <stop offset="85%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="himationShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748B" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="greekGoldBorder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFDF73" />
            <stop offset="100%" stopColor="#AA820A" />
          </linearGradient>

          <linearGradient id="thalesBeard" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <radialGradient id="amberGem" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="25%" stopColor="#FFAA00" />
            <stop offset="65%" stopColor="#E67300" />
            <stop offset="90%" stopColor="#993D00" />
            <stop offset="100%" stopColor="#5E2200" />
          </radialGradient>

          <linearGradient id="woolCloth" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <clipPath id="leftEyeClip">
            <ellipse cx="0" cy="0" rx="16" ry={eyeRy} />
          </clipPath>
          <clipPath id="rightEyeClip">
            <ellipse cx="0" cy="0" rx="16" ry={eyeRy} />
          </clipPath>
        </defs>

        {/* ========================================================== */}
        {/* BODY & CHEST LAYER (Natural 3/4 Seated Posture, extends    */}
        {/* cleanly below the table top so it never floats!)           */}
        {/* ========================================================== */}
        <g transform={`rotate(${chestLeanDeg}, 0, 260)`}>
          {/* ========================================================== */}
          {/* FAR / LEFT ARM (Reaches naturally forward toward action)   */}
          {/* ========================================================== */}
          {leftArmState === 'raisedWonder' && (
            <g transform={`translate(-105, ${32 + shoulderElevateY}) rotate(${28 + amazeBlend * 22})`}>
              {/* Rounded Shoulder & Draped Sleeve */}
              <path
                d="M -22,-16 C -48,15 -56,75 -42,126 L 12,118 C 12,70 16,15 24,-10 Z"
                fill="url(#himationBase)"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              {/* Forearm bent naturally forward & upward toward the floating feather */}
              <g transform={`translate(-22, 118) rotate(${68 + amazeBlend * 24})`}>
                <path
                  d="M -15,0 C -17,38 -13,78 -9,104 L 11,104 C 14,76 17,38 15,0 Z"
                  fill="url(#thalesSkinShadow)"
                />
                {/* Wrist & Expressive Open Hand gesturing in disbelief */}
                <g transform="translate(1, 108) rotate(-18)">
                  <ExpressiveHand open={0.9} />
                </g>
              </g>
            </g>
          )}

          {leftArmState === 'holdingWool' && (
            <g transform="translate(-112, 42)">
              <path
                d="M -18,-10 C -45,28 -48,95 -32,148 L 16,142 C 12,92 18,32 28,-8 Z"
                fill="url(#himationBase)"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              <g transform="translate(-18, 144) rotate(-16)">
                <rect x="-14" y="0" width="28" height="86" rx="13" fill="url(#thalesSkinShadow)" />
                <circle cx="0" cy="92" r="20" fill="url(#thalesSkinShadow)" />
                <g transform="translate(10, 100)">
                  <path
                    d="M -45,-15 C -20,-35 45,-30 65,-10 C 80,15 70,50 45,65 C 20,75 -35,70 -50,45 C -65,25 -60,5 -45,-15 Z"
                    fill="url(#woolCloth)"
                    stroke="#451A03"
                    strokeWidth="2"
                  />
                </g>
              </g>
            </g>
          )}

          {/* TORSO & ANATOMICAL SHOULDERS (Seated Tunic + Himation) */}
          <g transform={`translate(0, ${shoulderElevateY * 0.4})`}>
            {/* Base Chiton / Tunic extending well below table edge */}
            <path
              d="M -115,45 C -122,12 -72,-28 0,-28 C 72,-28 128,12 138,48 L 168,460 L -152,460 Z"
              fill="url(#himationBase)"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            {/* Organic Diagonal Himation Sash & Folds (gives real 3/4 depth!) */}
            <path
              d="M -112,48 C -65,92 -10,135 58,162 C 102,178 134,172 152,158 L 168,460 L -140,460 Z"
              fill="#F1F5F9"
              opacity="0.7"
            />
            <path
              d="M -105,58 Q -25,135 55,195 Q 110,235 156,285"
              fill="none"
              stroke="url(#himationShadow)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M -42,35 Q 25,115 95,215"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M -110,48 Q -28,108 58,158 Q 112,188 152,225"
              fill="none"
              stroke="url(#greekGoldBorder)"
              strokeWidth="7.5"
              strokeLinecap="round"
            />
          </g>

          {/* ========================================================== */}
          {/* NEAR / RIGHT ARM (Foreground expressive posture)           */}
          {/* ========================================================== */}
          {rightArmState === 'rubbingAmber' && (
            <g transform={`translate(105, 42) rotate(${22 + rubAngle})`}>
              <path
                d="M -18,-10 C 4,38 2,96 -16,142 L 24,146 C 36,98 32,38 18,-10 Z"
                fill="url(#himationBase)"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              <g transform={`translate(-8, 140) rotate(${-50 + rubAngle * 0.8})`}>
                <rect x="-15" y="0" width="30" height="92" rx="14" fill="url(#thalesSkin)" />
                <g transform={`translate(${rubX}, 92)`}>
                  <ellipse cx="-4" cy="8" rx="14" ry="15" fill="url(#thalesSkin)" />
                  <g transform="translate(14, 8)">
                    <path
                      d="M -22,-14 C -12,-26 16,-24 28,-10 C 38,4 32,26 18,34 C 4,40 -18,36 -26,20 C -32,6 -30,-4 -22,-14 Z"
                      fill="url(#amberGem)"
                      stroke="#FFDF73"
                      strokeWidth="2"
                    />
                    <ellipse cx="-6" cy="-8" rx="4" ry="2" fill="#FFFFFF" opacity="0.85" />
                  </g>
                  {amberGlow > 0.2 && (
                    <g transform="translate(18, 12)">
                      <circle cx="0" cy="0" r="14" fill="rgba(255, 223, 115, 0.25)" />
                      <path d="M 0,0 L -8,12 L -4,16 L -14,24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 6,-4 L 16,-10 L 14,-16 L 24,-20" fill="none" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  )}
                </g>
              </g>
            </g>
          )}

          {rightArmState === 'reachingAmber' && (() => {
            const a = thalesReachArm(pose);
            return (
              <g transform={`translate(${SHOULDER_R.x}, ${SHOULDER_R.y}) rotate(${a.upperDeg.toFixed(2)})`}>
                <path
                  d="M -18,-10 C 4,38 2,96 -16,142 L 24,146 C 36,98 32,38 18,-10 Z"
                  fill="url(#himationBase)"
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
                {/* shoulder cap so the stretched sleeve stays attached to the body */}
                <ellipse cx="2" cy="4" rx="30" ry="26" fill="#E2E8F0" />
                <g transform={`translate(${ELBOW_IN_UPPER.x}, ${ELBOW_IN_UPPER.y}) rotate(${a.foreDeg.toFixed(2)})`}>
                  <rect x="-15" y="0" width="30" height={a.foreLen} rx="14" fill="url(#thalesSkin)" />
                  <g transform={`translate(${a.amberInFore.x.toFixed(2)}, ${a.amberInFore.y.toFixed(2)})`}>
                    {/* amber gripped by the fingertips, fingers curl over it from above */}
                    <g transform={`scale(${(1 + a.reach * 0.25).toFixed(3)})`}>
                      <path
                        d="M -22,-14 C -12,-26 16,-24 28,-10 C 38,4 32,26 18,34 C 4,40 -18,36 -26,20 C -32,6 -30,-4 -22,-14 Z"
                        transform="translate(-2, -10)"
                        fill="url(#amberGem)"
                        stroke="#FFDF73"
                        strokeWidth="2"
                      />
                      <ellipse cx="-10" cy="-16" rx="5" ry="2.4" fill="#FFFFFF" opacity="0.85" />
                    </g>
                    <ellipse cx="0" cy={-22 - a.reach * 6} rx="17" ry="14" fill="url(#thalesSkin)" />
                    {[-12, -3, 6, 14].map((fx, i) => (
                      <path
                        key={fx}
                        d={`M ${fx},${-26 - a.reach * 6} q ${4 + i},10 ${2 - i},${16 + (i === 1 || i === 2 ? 4 : 0)}`}
                        fill="none"
                        stroke="#E4B596"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    ))}
                    {amberGlow > 0.2 && (
                      <g opacity={Math.min(1, amberGlow)}>
                        <circle cx="0" cy="0" r={20 + amberGlow * 14} fill="rgba(255, 223, 115, 0.22)" />
                      </g>
                    )}
                  </g>
                </g>
              </g>
            );
          })()}

          {rightArmState === 'astonished' && (
            /* Natural human startled recoil: upper arm hugs close to side, forearm bent up toward chest! */
            <g transform={`translate(106, ${40 + shoulderElevateY}) rotate(${-8 - amazeBlend * 12})`}>
              {/* Shoulder & Draped Sleeve */}
              <path
                d="M -20,-14 C 14,20 26,76 18,124 L -26,120 C -22,72 -24,20 -18,-14 Z"
                fill="url(#himationBase)"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              {/* Forearm bent sharply inward toward chest/chin in genuine startle */}
              <g transform={`translate(2, 118) rotate(${112 + amazeBlend * 22})`}>
                <path
                  d="M -16,0 C -18,38 -13,76 -9,98 L 11,98 C 14,74 17,38 15,0 Z"
                  fill="url(#thalesSkin)"
                />
                {/* Hand slightly curved near upper chest */}
                <g transform="translate(1, 102) rotate(12)">
                  <ExpressiveHand flipX open={0.75} />
                </g>
              </g>
            </g>
          )}

          {/* ========================================================== */}
          {/* NECK & HEAD LAYER (3/4 turned slightly toward left action) */}
          {/* ========================================================== */}
          <g transform={`translate(-8, -32) rotate(${neckPitchDeg + headRollDeg})`}>
            <path
              d="M -34,0 L -28,60 C -10,65 10,65 28,60 L 34,0 Z"
              fill="url(#thalesSkin)"
              stroke="#D49E7B"
              strokeWidth="1.5"
            />
            <path d="M -16,10 Q 0,45 18,55" fill="none" stroke="#D49E7B" strokeWidth="2.5" />

            <g transform="translate(0, -75)">
              <ellipse cx="0" cy="0" rx="70" ry="84" fill="url(#thalesSkin)" />

              {/* Ears (asymmetric slightly for 3/4 turn) */}
              <ellipse cx="-68" cy="10" rx="10" ry="17" fill="url(#thalesSkinShadow)" stroke="#D49E7B" strokeWidth="1.5" />
              <ellipse cx="70" cy="10" rx="13" ry="18" fill="url(#thalesSkin)" stroke="#D49E7B" strokeWidth="1.5" />

              {/* Hair & Curls */}
              <path
                d="M -76,-30 C -82,-85 -38,-125 0,-125 C 40,-125 84,-85 76,-30 C 70,-10 72,10 66,30 C 58,10 60,-40 43,-70 C 18,-95 -20,-95 -45,-70 C -60,-40 -58,10 -66,30 C -72,10 -70,-10 -76,-30 Z"
                fill="url(#thalesBeard)"
              />
              <circle cx="-53" cy="-70" r="14" fill="#CBD5E1" />
              <circle cx="-28" cy="-95" r="16" fill="#E2E8F0" />
              <circle cx="0" cy="-105" r="17" fill="#F1F5F9" />
              <circle cx="30" cy="-95" r="16" fill="#E2E8F0" />
              <circle cx="53" cy="-70" r="14" fill="#CBD5E1" />

              {/* Golden Olive Wreath */}
              <g transform="translate(0, -65)">
                <path d="M -58,0 Q 0,-30 58,0" fill="none" stroke="#AA820A" strokeWidth="3" />
                {[-44, -24, 0, 24, 44].map((lx, idx) => (
                  <path
                    key={idx}
                    d={`M ${lx},-8 C ${lx - 8},-18 ${lx},-24 ${lx + 8},-18 Z`}
                    fill="url(#greekGoldBorder)"
                    stroke="#AA820A"
                    strokeWidth="1"
                  />
                ))}
              </g>

              {/* Forehead expression lines */}
              <path
                d={`M -32,${-40 - browLift * 0.4} Q -4,${-48 - browLift * 0.6} 26,${-40 - browLift * 0.4}`}
                fill="none"
                stroke="#C99672"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d={`M -24,${-30 - browLift * 0.3} Q -4,${-36 - browLift * 0.45} 18,${-30 - browLift * 0.3}`}
                fill="none"
                stroke="#C99672"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Eyebrows */}
              <path
                d={`M -54,${-15 - browLift} Q -36,${-25 - browLift * 1.1 + browFurrow * 6} -17,${-14 - browLift * 0.8 + browFurrow * 9}`}
                fill="none"
                stroke="#64748B"
                strokeWidth="5.8"
                strokeLinecap="round"
              />
              <path
                d={`M 12,${-14 - browLift * 0.8 + browFurrow * 9} Q 32,${-25 - browLift * 1.1 + browFurrow * 6} 52,${-15 - browLift}`}
                fill="none"
                stroke="#64748B"
                strokeWidth="5.8"
                strokeLinecap="round"
              />

              {/* Cheek Highlights */}
              <ellipse cx="-44" cy={22 - cheekLift} rx="12" ry="7" fill="#F4A28C" opacity="0.28" />
              <ellipse cx="40" cy={22 - cheekLift} rx="12" ry="7" fill="#F4A28C" opacity="0.28" />

              {/* Left Eye */}
              <g transform="translate(-36, 0)">
                <ellipse cx="0" cy="0" rx="15.5" ry={eyeRy} fill="#FFFFFF" stroke="#C99672" strokeWidth="1.2" />
                <g clipPath="url(#leftEyeClip)">
                  <circle cx={eyeLookX * 6} cy={eyeLookY * 4.5} r={8.2 - eyeWiden * 0.8} fill="#78350F" />
                  <circle cx={eyeLookX * 6} cy={eyeLookY * 4.5} r={4.5 - eyeWiden * 0.7} fill="#0F172A" />
                  <circle cx={eyeLookX * 6 - 2.6} cy={eyeLookY * 4.5 - 2.6} r="2.3" fill="#FFFFFF" />
                </g>
                <path
                  d={`M -15.5,0 Q 0,${-13 + lidDropTop} 15.5,0`}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </g>

              {/* Right Eye */}
              <g transform="translate(32, 0)">
                <ellipse cx="0" cy="0" rx="16" ry={eyeRy} fill="#FFFFFF" stroke="#C99672" strokeWidth="1.2" />
                <g clipPath="url(#rightEyeClip)">
                  <circle cx={eyeLookX * 6} cy={eyeLookY * 4.5} r={8.2 - eyeWiden * 0.8} fill="#78350F" />
                  <circle cx={eyeLookX * 6} cy={eyeLookY * 4.5} r={4.5 - eyeWiden * 0.7} fill="#0F172A" />
                  <circle cx={eyeLookX * 6 - 2.6} cy={eyeLookY * 4.5 - 2.6} r="2.3" fill="#FFFFFF" />
                </g>
                <path
                  d={`M -16,0 Q 0,${-13 + lidDropTop} 16,0`}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </g>

              {/* Nose (angled slightly left) */}
              <path
                d="M -3,-18 L -8,22 L 2,24 L -3,26 L -11,20"
                fill="none"
                stroke="#C28E6B"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Flowing Beard & Mustache */}
              <g transform={`translate(-3, ${32 + jawDropY}) rotate(${beardSwayDeg}, 0, 10)`}>
                <path
                  d="M -52,12 C -62,60 -48,130 -28,165 C -14,190 14,190 28,165 C 48,130 62,60 52,12 C 38,30 18,40 0,38 C -18,40 -38,30 -52,12 Z"
                  fill="url(#thalesBeard)"
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
                <path d="M -30,50 Q -22,110 -14,145" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                <path d="M 0,45 Q 2,120 0,160" fill="none" stroke="#F1F5F9" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 30,50 Q 22,110 14,145" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />

                {mouthState === 'gasp' ? (
                  <ellipse
                    cx="0"
                    cy="15"
                    rx={11.5 * Math.max(0.25, mouthOpen)}
                    ry={15.5 * Math.max(0.25, mouthOpen)}
                    fill="#3B0764"
                    stroke="#D49E7B"
                    strokeWidth="2.2"
                  />
                ) : mouthState === 'smile' ? (
                  <path d="M -14,12 Q 0,22 14,12" fill="none" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" />
                ) : (
                  <path d="M -10,12 Q 0,14 10,12" fill="none" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
                )}

                <path
                  d={`M -38,${4 - mouthOpen * 3} C -16,-7 -6,12 0,14 C 6,12 16,-7 38,${4 - mouthOpen * 3} C 28,16 12,20 0,16 C -12,20 -28,16 -38,${4 - mouthOpen * 3} Z`}
                  fill="url(#thalesBeard)"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
