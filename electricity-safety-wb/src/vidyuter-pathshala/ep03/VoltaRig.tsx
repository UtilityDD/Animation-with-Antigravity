import React from 'react';

export type VoltaExpression = 'frustrated' | 'focused' | 'awe';

export interface VoltaPose {
  worldX: number;
  worldY: number;
  chestLeanDeg: number;
  breathY: number;
  headRollDeg: number;
  eyeLookX: number;
  eyeLookY: number;
  blinkAmount: number;
  expression: VoltaExpression;
}

/**
 * Grounded 1800 Alessandro Volta Character Rig (Como / Pavia, Northern Italy)
 * - Articulated eyebrows, blinking/widening eyes, head tilts, period frock coat & cravat
 * - Expressive arc: frustration (dead Leyden flash) -> focus (stacking pile) -> awe (continuous bubbles)
 */
export const VoltaRig: React.FC<{
  pose: VoltaPose;
  scale?: number;
  opacity?: number;
}> = ({ pose, scale = 1.0, opacity = 1.0 }) => {
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
  } = pose;

  const isAwe = expression === 'awe';
  const isFrustrated = expression === 'frustrated';
  const browLift = isAwe ? 7 : isFrustrated ? -4 : 0;
  const eyeRy = Math.max(1.2, (1 - blinkAmount * 0.92) * (isAwe ? 12 : 8.5));

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
          <linearGradient id="avSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8DEC9" />
            <stop offset="100%" stopColor="#D19874" />
          </linearGradient>
          <linearGradient id="avCoat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#1C0D04" />
          </linearGradient>
          <clipPath id="avLeftEye">
            <ellipse cx="0" cy="0" rx="12" ry={eyeRy} />
          </clipPath>
          <clipPath id="avRightEye">
            <ellipse cx="0" cy="0" rx="12" ry={eyeRy} />
          </clipPath>
        </defs>

        <g transform={`rotate(${chestLeanDeg}, 0, 240)`}>
          {/* 1800 Italian Period Coat + Waistcoat + Cravat */}
          <path d="M -98,360 L -106,40 Q 0,-20 106,40 L 98,360 Z" fill="url(#avCoat)" stroke="#78350F" strokeWidth="2.5" />
          <path d="M -38,16 L 38,16 L 30,270 L -30,270 Z" fill="#92400E" />
          <path d="M -22,-18 L 22,-18 L 16,46 Q 0,58 -16,46 Z" fill="#F8FAFC" />

          {/* Articulated Left & Right Arms */}
          <g transform={`translate(-92, 48) rotate(${isAwe ? 48 : 30})`}>
            <rect x="-16" y="0" width="32" height="145" rx="14" fill="url(#avCoat)" />
            <ellipse cx="0" cy="154" rx="14" ry="15" fill="url(#avSkin)" />
          </g>
          <g transform={`translate(92, 48) rotate(${isFrustrated ? -32 : -16})`}>
            <rect x="-16" y="0" width="32" height="145" rx="14" fill="url(#avCoat)" />
            <ellipse cx="0" cy="154" rx="14" ry="15" fill="url(#avSkin)" />
          </g>

          {/* Neck & Head */}
          <g transform={`translate(0, -16) rotate(${headRollDeg})`}>
            <rect x="-20" y="-44" width="40" height="54" rx="14" fill="url(#avSkin)" />
            <g transform="translate(0, -108)">
              <ellipse cx="0" cy="0" rx="58" ry="66" fill="url(#avSkin)" stroke="#C99672" strokeWidth="1.8" />
              {/* 1800s Curly Silver-Grey Hair */}
              <path
                d="M -62,-6 C -68,-64 -26,-86 0,-84 C 28,-86 68,-64 62,-6 C 50,-32 24,-46 0,-46 C -24,-46 -50,-32 -62,-6 Z"
                fill="#CBD5E1"
                stroke="#64748B"
                strokeWidth="2"
              />
              {/* Expressive Eyes */}
              {[-22, 20].map((ex, idx) => (
                <g key={ex} transform={`translate(${ex}, -4)`}>
                  <g clipPath={idx === 0 ? 'url(#avLeftEye)' : 'url(#avRightEye)'}>
                    <ellipse cx="0" cy="0" rx="12" ry={eyeRy} fill="#FFFFFF" />
                    <circle cx={eyeLookX * 5} cy={eyeLookY * 4} r="5.5" fill="#1E293B" />
                    <circle cx={eyeLookX * 5 + 1.8} cy={eyeLookY * 4 - 1.8} r="1.8" fill="#FFFFFF" />
                  </g>
                  <ellipse cx="0" cy="0" rx="12" ry={eyeRy} fill="none" stroke="#9A6B4C" strokeWidth="1.4" />
                </g>
              ))}
              {/* Eyebrows reflecting frustration -> focus -> awe */}
              <path
                d={`M -34,${-22 - browLift} Q -22,${-26 - browLift + (isFrustrated ? 5 : 0)} -10,${-20 - browLift}`}
                fill="none"
                stroke="#475569"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d={`M 8,${-20 - browLift} Q 20,${-26 - browLift + (isFrustrated ? 5 : 0)} 32,${-22 - browLift}`}
                fill="none"
                stroke="#475569"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path d="M -2,-4 L -6,16 L 4,18" fill="none" stroke="#C99672" strokeWidth="2.2" strokeLinecap="round" />
              {isAwe ? (
                <ellipse cx="-1" cy="36" rx="9" ry="10" fill="#7F1D1D" stroke="#9A6B4C" strokeWidth="1.5" />
              ) : isFrustrated ? (
                <path d="M -14,40 Q -1,33 12,40" fill="none" stroke="#9A6B4C" strokeWidth="2.6" strokeLinecap="round" />
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
