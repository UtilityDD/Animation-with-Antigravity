import React from 'react';

export interface MarsdenPose {
  worldX: number;
  worldY: number;
  chestLeanDeg: number;
  breathY: number;
  headRollDeg: number;
  neckPitchDeg: number;
  eyeLookX: number;
  eyeLookY: number;
  blinkAmount: number;
  expression: 'focused' | 'shocked';
}

/**
 * Grounded 1909 Ernest Marsden Rig (20-year-old Manchester undergraduate)
 * - Dark tweed waistcoat, rolled-up white shirt sleeves, articulated peering/reacting posture
 */
export const MarsdenRig: React.FC<{
  pose: MarsdenPose;
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
  } = pose;

  const isShocked = expression === 'shocked';
  const browLift = isShocked ? 7 : 0;
  const eyeRy = Math.max(1.2, (1 - blinkAmount * 0.92) * (isShocked ? 12 : 8.5));

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
      <svg width="520" height="720" viewBox="-260 -340 520 720" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="emSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9DFCD" />
            <stop offset="100%" stopColor="#D49E7B" />
          </linearGradient>
          <linearGradient id="emVest" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <clipPath id="emLeftEye">
            <ellipse cx="0" cy="0" rx="12" ry={eyeRy} />
          </clipPath>
          <clipPath id="emRightEye">
            <ellipse cx="0" cy="0" rx="12" ry={eyeRy} />
          </clipPath>
        </defs>

        <g transform={`rotate(${chestLeanDeg}, 0, 240)`}>
          {/* Torso: White Shirt + Dark Lab Waistcoat */}
          <path d="M -88,360 L -96,42 Q 0,-18 96,42 L 88,360 Z" fill="url(#emVest)" stroke="#475569" strokeWidth="2" />
          <path d="M -32,0 L 32,0 L 18,75 L -18,75 Z" fill="#F8FAFC" />
          {[-24, 34, 92, 150].map((by) => (
            <circle key={by} cx="0" cy={by + 70} r="4" fill="#94A3B8" />
          ))}

          {/* Left Arm reaching forward toward microscope */}
          <g transform="translate(-88, 48) rotate(36)">
            <rect x="-16" y="0" width="32" height="125" rx="14" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <g transform="translate(0, 122) rotate(38)">
              <rect x="-13" y="0" width="26" height="95" rx="11" fill="url(#emSkin)" />
              <ellipse cx="0" cy="102" rx="15" ry="13" fill="url(#emSkin)" />
            </g>
          </g>

          {/* Right Arm */}
          <g transform="translate(88, 52) rotate(-14)">
            <rect x="-16" y="0" width="32" height="130" rx="14" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="0" cy="142" rx="14" ry="16" fill="url(#emSkin)" />
          </g>

          {/* Neck & Head */}
          <g transform={`translate(0, -18) rotate(${headRollDeg})`}>
            <rect x="-22" y="-50" width="44" height="62" rx="16" fill="url(#emSkin)" />
            <g transform={`translate(0, ${-115 + neckPitchDeg * 1.1})`}>
              {/* Head Silhouette */}
              <ellipse cx="0" cy="0" rx="58" ry="68" fill="url(#emSkin)" stroke="#C99672" strokeWidth="1.8" />
              {/* Youthful Parted Dark Brown Hair */}
              <path
                d="M -60,-14 C -64,-68 -24,-86 12,-82 C 48,-78 64,-52 60,-10 C 44,-36 16,-48 -18,-42 C -42,-38 -52,-26 -60,-14 Z"
                fill="#292524"
              />
              {/* Eyes */}
              {[-22, 20].map((ex, idx) => (
                <g key={ex} transform={`translate(${ex}, -4)`}>
                  <g clipPath={idx === 0 ? 'url(#emLeftEye)' : 'url(#emRightEye)'}>
                    <ellipse cx="0" cy="0" rx="12" ry={eyeRy} fill="#FFFFFF" />
                    <circle cx={eyeLookX * 5} cy={eyeLookY * 4} r="5.5" fill="#1E293B" />
                    <circle cx={eyeLookX * 5 + 1.8} cy={eyeLookY * 4 - 1.8} r="1.8" fill="#FFFFFF" />
                  </g>
                  <ellipse cx="0" cy="0" rx="12" ry={eyeRy} fill="none" stroke="#9A6B4C" strokeWidth="1.4" />
                </g>
              ))}
              {/* Eyebrows */}
              <path d={`M -34,${-22 - browLift} Q -22,${-28 - browLift} -10,${-22 - browLift}`} fill="none" stroke="#292524" strokeWidth="3.5" strokeLinecap="round" />
              <path d={`M 8,${-22 - browLift} Q 20,${-28 - browLift} 32,${-22 - browLift}`} fill="none" stroke="#292524" strokeWidth="3.5" strokeLinecap="round" />
              {/* Nose */}
              <path d="M -2,-4 L -6,16 L 4,18" fill="none" stroke="#C99672" strokeWidth="2.2" strokeLinecap="round" />
              {/* Mouth */}
              {isShocked ? (
                <ellipse cx="-1" cy="38" rx="9" ry="11" fill="#7F1D1D" stroke="#9A6B4C" strokeWidth="1.5" />
              ) : (
                <path d="M -14,36 Q -1,40 12,35" fill="none" stroke="#9A6B4C" strokeWidth="2.6" strokeLinecap="round" />
              )}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
