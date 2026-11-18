import React from 'react';

export interface BoyPose {
  worldX: number;
  worldY: number;
  chestLeanDeg: number;
  breathY: number;
  headRollDeg: number;
  eyeLookX: number;
  eyeLookY: number;
  blinkAmount: number;
  expression: 'curious' | 'surprised' | 'puzzled' | 'happy';
  armLift: number; // 0..1 lifting blanket
}

/**
 * Premium Seamless Young Student Rig (Cozy Ribbed Winter Sweater)
 * - Seamless neck-to-collar join with chin shadow, iris gradients & catchlights, natural shoulders
 */
export const BoyRig: React.FC<{
  pose: BoyPose;
  scale?: number;
  opacity?: number;
  /** Hide the screen-right arm so a scene can draw its own (e.g. holding a comb). */
  hideRightArm?: boolean;
}> = ({ pose, scale = 1.0, opacity = 1.0, hideRightArm = false }) => {
  const {
    worldX,
    worldY,
    chestLeanDeg,
    breathY,
    headRollDeg,
    eyeLookX,
    eyeLookY,
    blinkAmount,
    expression,
    armLift,
  } = pose;

  const isSurprised = expression === 'surprised';
  const isPuzzled = expression === 'puzzled';
  const isHappy = expression === 'happy';
  const browLift = isSurprised ? 7.5 : isHappy ? 4 : 1.5;
  // puzzled: one brow up, one knitted down
  const browL = isPuzzled ? 8 : browLift;
  const browR = isPuzzled ? -2 : browLift;
  const eyeRy = Math.max(1.2, (1 - blinkAmount * 0.92) * (isSurprised ? 11.5 : 8.2));

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
      <svg width="480" height="620" viewBox="-240 -300 480 620" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="boySkinP" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5CFAF" />
            <stop offset="65%" stopColor="#DFA580" />
            <stop offset="100%" stopColor="#C1845E" />
          </linearGradient>
          <linearGradient id="boySweaterP" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="55%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <clipPath id="boyLeftEyeP">
            <ellipse cx="0" cy="0" rx="11" ry={eyeRy} />
          </clipPath>
          <clipPath id="boyRightEyeP">
            <ellipse cx="0" cy="0" rx="11" ry={eyeRy} />
          </clipPath>
        </defs>

        <g transform={`rotate(${chestLeanDeg}, 0, 180)`}>
          {/* Natural Rounded Shoulders & Cozy Ribbed Sweater */}
          <path
            d="M -88,230 L -94,48 C -94,8 -48,-6 0,-6 C 48,-6 94,8 94,48 L 88,230 Z"
            fill="url(#boySweaterP)"
            stroke="#1E3A8A"
            strokeWidth="2.5"
          />

          {/* Seamless Neck tucked neatly behind sweater collar */}
          <rect x="-19" y="-36" width="38" height="48" rx="14" fill="#CE926D" />
          {/* Ribbed Knit Crew-Neck Collar */}
          <path d="M -32,2 Q 0,28 32,2" fill="none" stroke="#93C5FD" strokeWidth="10" strokeLinecap="round" />
          <path d="M -32,2 Q 0,28 32,2" fill="none" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />

          {/* Articulated Right Arm lifting blanket corner */}
          <g transform={`translate(82, 36) rotate(${-26 - armLift * 36})`} display={hideRightArm ? 'none' : undefined}>
            <rect x="-16" y="0" width="32" height="114" rx="14" fill="url(#boySweaterP)" stroke="#1E3A8A" strokeWidth="1.8" />
            <rect x="-15" y="98" width="30" height="14" rx="4" fill="#93C5FD" opacity="0.85" />
            <ellipse cx="0" cy="124" rx="14" ry="15" fill="url(#boySkinP)" />
          </g>
          {/* Left Arm */}
          <g transform={`translate(-82, 36) rotate(${18 + armLift * 14})`}>
            <rect x="-16" y="0" width="32" height="108" rx="14" fill="url(#boySweaterP)" stroke="#1E3A8A" strokeWidth="1.8" />
            <rect x="-15" y="92" width="30" height="14" rx="4" fill="#93C5FD" opacity="0.85" />
            <ellipse cx="0" cy="118" rx="14" ry="15" fill="url(#boySkinP)" />
          </g>

          {/* Head seated naturally on neck (chin shadow over neck) */}
          <g transform={`translate(0, -82) rotate(${headRollDeg})`}>
            <ellipse cx="0" cy="54" rx="22" ry="8" fill="rgba(0,0,0,0.22)" />
            <ellipse cx="-52" cy="4" rx="9" ry="13" fill="#D4956E" stroke="#B87D5B" strokeWidth="1.4" />
            <ellipse cx="52" cy="4" rx="9" ry="13" fill="#D4956E" stroke="#B87D5B" strokeWidth="1.4" />
            <ellipse cx="0" cy="0" rx="52" ry="59" fill="url(#boySkinP)" stroke="#B87D5B" strokeWidth="1.8" />
            <ellipse cx="-26" cy="16" rx="11" ry="6" fill="#F43F5E" opacity="0.14" />
            <ellipse cx="26" cy="16" rx="11" ry="6" fill="#F43F5E" opacity="0.14" />

            {/* Textured Layered Hair */}
            <path
              d="M -54,-10 C -58,-64 -20,-80 14,-74 C 48,-68 58,-42 54,-8 C 40,-34 12,-42 -18,-36 C -38,-32 -46,-20 -54,-10 Z"
              fill="#1C1917"
            />
            <path d="M -26,-52 Q -4,-64 24,-50" fill="none" stroke="#44403C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Expressive Eyes with Glossy Catchlights */}
            {[-19, 19].map((ex, idx) => (
              <g key={ex} transform={`translate(${ex}, -4)`}>
                <g clipPath={idx === 0 ? 'url(#boyLeftEyeP)' : 'url(#boyRightEyeP)'}>
                  <ellipse cx="0" cy="0" rx="11" ry={eyeRy} fill="#FFFFFF" />
                  <circle cx={eyeLookX * 4.2} cy={eyeLookY * 3.8} r="5.5" fill="#1E293B" />
                  <circle cx={eyeLookX * 4.2} cy={eyeLookY * 3.8} r="2.6" fill="#020617" />
                  <circle cx={eyeLookX * 4.2 + 1.8} cy={eyeLookY * 3.8 - 1.8} r="1.8" fill="#FFFFFF" />
                </g>
                <ellipse cx="0" cy="0" rx="11" ry={eyeRy} fill="none" stroke="#8C583A" strokeWidth="1.4" />
              </g>
            ))}

            {/* Expressive Eyebrows */}
            <path d={`M -30,${-20 - browL} Q -19,${-26 - browL} -8,${-20 - browL}`} fill="none" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
            <path d={`M 8,${-20 - browR + (isPuzzled ? 3 : 0)} Q 19,${-26 - browR} 30,${-20 - browR}`} fill="none" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M -2,-4 L -5,12 L 4,14" fill="none" stroke="#B87D5B" strokeWidth="2.2" strokeLinecap="round" />
            {isSurprised ? (
              <ellipse cx="0" cy="31" rx="8" ry="10" fill="#7F1D1D" stroke="#8C583A" strokeWidth="1.5" />
            ) : isHappy ? (
              <g>
                <path d="M -17,26 Q 0,46 17,26 Z" fill="#7F1D1D" stroke="#8C583A" strokeWidth="2" strokeLinejoin="round" />
                <path d="M -13,27.5 Q 0,32 13,27.5" fill="none" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" />
              </g>
            ) : isPuzzled ? (
              <path d="M -12,32 Q -6,27 0,32 Q 6,37 12,31" fill="none" stroke="#8C583A" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M -12,31 Q 0,35 12,30" fill="none" stroke="#8C583A" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
