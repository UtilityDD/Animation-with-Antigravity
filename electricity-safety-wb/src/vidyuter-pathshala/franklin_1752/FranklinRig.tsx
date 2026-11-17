import React from 'react';

export type FranklinExpression = 'contemplative' | 'curious' | 'amazed';

export interface FranklinPose {
  worldX: number;
  worldY: number;
  chestLeanDeg: number;
  breathY: number;
  headRollDeg: number;
  neckPitchDeg: number;
  eyeLookX: number;
  eyeLookY: number;
  blinkAmount: number; // 0..1
  expression: FranklinExpression;
  poseMode: 'studyThinking' | 'holdingSilk' | 'watchingSpark';
}

export const FranklinRig: React.FC<{
  pose: FranklinPose;
  scale?: number;
  opacity?: number;
}> = ({ pose, scale = 1.0, opacity = 1.0 }) => {
  const {
    worldX,
    worldY,
    chestLeanDeg,
    breathY,
    headRollDeg,
    neckPitchDeg,
    eyeLookX,
    eyeLookY,
    blinkAmount,
    expression,
    poseMode,
  } = pose;

  const isAmazed = expression === 'amazed';
  const isCurious = expression === 'curious';

  const browLift = isAmazed ? 6.5 : isCurious ? 2.5 : 0;
  const browFurrow = expression === 'contemplative' ? 0.55 : isCurious ? 0.25 : 0;
  const eyeWiden = isAmazed ? 0.85 : isCurious ? 0.25 : 0;
  const eyeRy = Math.max(1.2, (1 - blinkAmount * 0.92) * (9 + eyeWiden * 4.5));
  const lidDrop = blinkAmount * 16 - eyeWiden * 3;

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
      <svg width="560" height="780" viewBox="-280 -380 560 780" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="bfSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9DFCD" />
            <stop offset="55%" stopColor="#ECC4A8" />
            <stop offset="100%" stopColor="#D49E7B" />
          </linearGradient>
          <linearGradient id="bfCoat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="55%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="bfVest" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
          <linearGradient id="bfHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <clipPath id="bfLeftEyeClip">
            <ellipse cx="0" cy="0" rx="13.5" ry={eyeRy} />
          </clipPath>
          <clipPath id="bfRightEyeClip">
            <ellipse cx="0" cy="0" rx="13.5" ry={eyeRy} />
          </clipPath>
        </defs>

        <g transform={`rotate(${chestLeanDeg}, 0, 260)`}>
          {/* ========================================================== */}
          {/* TORSO: 18th-Century Colonial Frock Coat + Waistcoat        */}
          {/* ========================================================== */}
          <path
            d="M -112,48 C -118,12 -68,-28 0,-28 C 68,-28 118,12 122,48 L 145,420 L -140,420 Z"
            fill="url(#bfCoat)"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Waistcoat Panel */}
          <polygon points="-38,-18 38,-18 48,360 -48,360" fill="url(#bfVest)" />
          {/* Tailored Coat Lapels */}
          <polygon points="-38,-18 -84,22 -52,165 -38,165" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <polygon points="38,-18 84,22 52,165 38,165" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          {/* Brass Waistcoat Buttons */}
          {[55, 110, 165, 220].map((by) => (
            <circle key={by} cx="0" cy={by} r="4.5" fill="#FBBF24" />
          ))}
          {/* Ruffled White Linen Cravat */}
          <path d="M -24,-24 L 24,-24 L 18,46 Q 0,62 -18,46 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M -8,-10 Q 0,18 -4,44 M 8,-10 Q 0,18 4,44" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* ========================================================== */}
          {/* ARTICULATED ARMS & HANDS                                   */}
          {/* ========================================================== */}
          {poseMode === 'studyThinking' && (
            <>
              {/* Left Arm resting thoughtfully across waist */}
              <g transform="translate(-108, 45) rotate(14)">
                <path d="M -18,-10 C -36,42 -34,110 -18,158 L 22,152 C 14,102 18,42 26,-8 Z" fill="url(#bfCoat)" stroke="#475569" strokeWidth="1.8" />
                <g transform="translate(-8, 154) rotate(-72)">
                  <rect x="-13" y="0" width="26" height="82" rx="12" fill="url(#bfCoat)" />
                  <ellipse cx="0" cy="92" rx="14" ry="16" fill="url(#bfSkin)" />
                </g>
              </g>
              {/* Right Arm bent upward, hand resting thoughtfully on chin */}
              <g transform="translate(106, 46) rotate(-18)">
                <path d="M -18,-10 C 6,42 12,100 6,148 L -32,144 C -26,96 -28,42 -16,-10 Z" fill="url(#bfCoat)" stroke="#475569" strokeWidth="1.8" />
                <g transform="translate(-12, 144) rotate(142)">
                  <rect x="-13" y="0" width="26" height="96" rx="12" fill="url(#bfCoat)" />
                  <rect x="-16" y="78" width="32" height="16" rx="4" fill="#F8FAFC" />
                  {/* Fingers curled thoughtfully near chin */}
                  <g transform="translate(0, 102)">
                    <ellipse cx="0" cy="0" rx="14" ry="15" fill="url(#bfSkin)" />
                    <rect x="-12" y="6" width="7" height="18" rx="3.5" fill="url(#bfSkin)" stroke="#C99672" strokeWidth="0.9" />
                    <rect x="-4" y="8" width="7" height="20" rx="3.5" fill="url(#bfSkin)" stroke="#C99672" strokeWidth="0.9" />
                  </g>
                </g>
              </g>
            </>
          )}

          {poseMode === 'holdingSilk' && (
            <>
              {/* Right Arm resting at side */}
              <g transform="translate(106, 48) rotate(-8)">
                <path d="M -18,-10 C 6,44 10,115 2,168 L -34,162 C -26,110 -28,44 -16,-10 Z" fill="url(#bfCoat)" stroke="#475569" strokeWidth="1.8" />
              </g>
              {/* Left Arm reaching horizontally forward holding dry silk ribbon */}
              <g transform="translate(-104, 46) rotate(56)">
                <path d="M -18,-10 C -34,42 -32,102 -18,144 L 22,138 C 14,98 18,42 26,-8 Z" fill="url(#bfCoat)" stroke="#475569" strokeWidth="1.8" />
                <g transform="translate(-4, 140) rotate(24)">
                  <rect x="-14" y="0" width="28" height="86" rx="13" fill="url(#bfCoat)" />
                  <rect x="-16" y="72" width="32" height="14" rx="4" fill="#F8FAFC" />
                  {/* Realistic Hand with Thumb + Gripping Fingers */}
                  <g transform="translate(0, 96)">
                    <ellipse cx="0" cy="0" rx="15" ry="16" fill="url(#bfSkin)" stroke="#C99672" strokeWidth="1" />
                    <path d="M -10,-6 Q -22,-16 -12,-24 Q -2,-24 2,-10 Z" fill="url(#bfSkin)" stroke="#C99672" strokeWidth="1" />
                    {[-8, -1, 6, 12].map((fx, idx) => (
                      <rect key={idx} x={fx - 3} y="8" width="6" height="16" rx="3" fill="url(#bfSkin)" stroke="#C99672" strokeWidth="0.8" />
                    ))}
                  </g>
                </g>
              </g>
            </>
          )}

          {/* ========================================================== */}
          {/* NECK & HEAD (Expressive face + colonial spectacles)        */}
          {/* ========================================================== */}
          <g transform={`translate(-4, -32) rotate(${neckPitchDeg + headRollDeg})`}>
            <path d="M -30,0 L -24,55 C -8,60 8,60 24,55 L 30,0 Z" fill="url(#bfSkin)" stroke="#D49E7B" strokeWidth="1.5" />

            <g transform="translate(0, -72)">
              {/* Face */}
              <ellipse cx="0" cy="0" rx="64" ry="76" fill="url(#bfSkin)" />
              <ellipse cx="-63" cy="8" rx="9" ry="15" fill="url(#bfSkin)" stroke="#D49E7B" strokeWidth="1.2" />
              <ellipse cx="63" cy="8" rx="11" ry="16" fill="url(#bfSkin)" stroke="#D49E7B" strokeWidth="1.2" />

              {/* Receding Forehead + Shoulder-Length Colonial Curls */}
              <path
                d="M -64,-22 C -74,-55 -48,-82 -26,-78 C -10,-62 10,-62 26,-78 C 48,-82 74,-55 64,-22 C 74,8 70,38 56,56 C 46,32 52,-10 38,-34 C 18,-54 -18,-54 -38,-34 C -52,-10 -46,32 -56,56 C -70,38 -74,8 -64,-22 Z"
                fill="url(#bfHair)"
              />

              {/* Forehead Lines */}
              <path d={`M -24,${-38 - browLift * 0.4} Q 0,${-44 - browLift * 0.5} 24,${-38 - browLift * 0.4}`} fill="none" stroke="#C99672" strokeWidth="1.6" strokeLinecap="round" />

              {/* Expressive Eyebrows */}
              <path
                d={`M -44,${-16 - browLift} Q -28,${-24 - browLift + browFurrow * 5} -12,${-15 - browLift + browFurrow * 7}`}
                fill="none"
                stroke="#475569"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d={`M 12,${-15 - browLift + browFurrow * 7} Q 28,${-24 - browLift + browFurrow * 5} 44,${-16 - browLift}`}
                fill="none"
                stroke="#475569"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Eyes with Real Clipping & Eyelids */}
              <g transform="translate(-28, -2)">
                <ellipse cx="0" cy="0" rx="13.5" ry={eyeRy} fill="#FFFFFF" stroke="#C99672" strokeWidth="1" />
                <g clipPath="url(#bfLeftEyeClip)">
                  <circle cx={eyeLookX * 5} cy={eyeLookY * 4} r="7" fill="#334155" />
                  <circle cx={eyeLookX * 5} cy={eyeLookY * 4} r="3.8" fill="#0F172A" />
                  <circle cx={eyeLookX * 5 - 2.2} cy={eyeLookY * 4 - 2.2} r="1.8" fill="#FFFFFF" />
                </g>
                <path d={`M -13.5,0 Q 0,${-11 + lidDrop} 13.5,0`} fill="none" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />
              </g>
              <g transform="translate(28, -2)">
                <ellipse cx="0" cy="0" rx="13.5" ry={eyeRy} fill="#FFFFFF" stroke="#C99672" strokeWidth="1" />
                <g clipPath="url(#bfRightEyeClip)">
                  <circle cx={eyeLookX * 5} cy={eyeLookY * 4} r="7" fill="#334155" />
                  <circle cx={eyeLookX * 5} cy={eyeLookY * 4} r="3.8" fill="#0F172A" />
                  <circle cx={eyeLookX * 5 - 2.2} cy={eyeLookY * 4 - 2.2} r="1.8" fill="#FFFFFF" />
                </g>
                <path d={`M -13.5,0 Q 0,${-11 + lidDrop} 13.5,0`} fill="none" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />
              </g>

              {/* Iconic Brass-Rimmed Colonial Spectacles */}
              <g stroke="#D97706" strokeWidth="2.4" fill="rgba(224, 242, 254, 0.08)">
                <circle cx="-28" cy="-2" r="18" />
                <circle cx="28" cy="-2" r="18" />
                <path d="M -10,-2 Q 0,-7 10,-2" fill="none" />
                <line x1="-46" y1="-2" x2="-60" y2="-4" />
                <line x1="46" y1="-2" x2="60" y2="-4" />
              </g>

              {/* Classical Nose */}
              <path d="M -2,-12 L -5,20 L 4,22 L -2,24" fill="none" stroke="#C28E6B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Expressive Mouth */}
              {isAmazed ? (
                <ellipse cx="0" cy="40" rx="9" ry="12" fill="#4C1D95" stroke="#C99672" strokeWidth="1.8" />
              ) : isCurious ? (
                <path d="M -11,38 Q 0,34 11,38" fill="none" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
              ) : (
                <path d="M -12,38 Q 0,41 12,38" fill="none" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
              )}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
