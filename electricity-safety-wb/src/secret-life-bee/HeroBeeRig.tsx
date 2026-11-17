import React from 'react';

export interface HeroBeePose {
  worldX: number;
  worldY: number;
  worldZ: number;
  /** 0.0 = Front, 0.5 = Three-Quarter, 1.0 = Side Profile */
  yaw: number;
  /** Body pitch tilt in degrees (negative = nose up, positive = nose down) */
  pitchDeg: number;
  /** Roll bank in degrees */
  rollDeg: number;
  /** 0 = tucked in flight, 1 = extended to land/stand on flower */
  legExtend: number;
  /** 0 = resting/folded, 1 = full high-speed flight buzz */
  wingActivity: number;
  /** 0..1 pollen grains clinging to fuzzy thorax & abdomen */
  pollenLoad: number;
  /** 0..1 packed pollen basket (corbicula) on hind leg */
  pollenBasketLoad?: number;
  /** 0..1 proboscis extension when sipping nectar */
  proboscisExtend?: number;
  /** 0..1 hind-leg grooming sweep */
  groomingActive?: number;
  /** Expressive eye look offset */
  eyeLookX: number;
  eyeLookY: number;
  /** Antennae perk/curiosity (-1..+1) */
  antennaAlert: number;
  /** 1 = facing right, -1 = facing left */
  facing?: 1 | -1;
  scale?: number;
}

function lerpView(yaw: number, front: number, threeQ: number, profile: number): number {
  const y = Math.max(0, Math.min(1, yaw));
  if (y <= 0.5) return front + (threeQ - front) * (y / 0.5);
  return threeQ + (profile - threeQ) * ((y - 0.5) / 0.5);
}

/**
 * Studio-grade multi-view articulated Hero Honeybee (Front -> 3/4 -> Side Profile)
 * with curved abdomen, fuzzy thorax, 6 jointed legs, articulated antennae,
 * veined translucent wings with motion blur, and pollen grains.
 */
export const HeroBeeRig: React.FC<{ frame: number; pose: HeroBeePose }> = ({
  frame,
  pose,
}) => {
  const {
    yaw,
    pitchDeg,
    rollDeg,
    legExtend,
    wingActivity,
    pollenLoad,
    pollenBasketLoad = pollenLoad,
    proboscisExtend = 0,
    groomingActive = 0,
    eyeLookX,
    eyeLookY,
    antennaAlert,
    facing = 1,
    scale = 1,
  } = pose;

  // High-frequency wing beat + subtle secondary phase
  const flapAngleA =
    wingActivity > 0.05
      ? Math.sin(frame * 1.85) * 34 * wingActivity - 24
      : -12;
  const flapAngleB =
    wingActivity > 0.05
      ? Math.cos(frame * 1.85 + 0.5) * 26 * wingActivity - 38
      : -18;
  const wingBlurOpacity = Math.min(0.45, wingActivity * 0.42);

  // Multi-view body geometry
  const headX = lerpView(yaw, 0, 14, 24);
  const headY = lerpView(yaw, -2, -2, -2);
  const thoraxX = lerpView(yaw, 0, 2, 4);
  const abdX = lerpView(yaw, 0, -14, -24);
  const abdY = lerpView(yaw, 8, 5, 3);
  const abdRx = lerpView(yaw, 14, 18, 22);
  const abdRy = lerpView(yaw, 15, 13.5, 12.5);

  const farEyeOpacity = Math.max(0, Math.min(1, 1 - (yaw - 0.72) / 0.2));
  const nearEyeX = headX + lerpView(yaw, -6.5, -2, 3.5);
  const farEyeX = headX + lerpView(yaw, 6.5, 8.5, 9.5);
  const antennaBob = Math.sin(frame * 0.18) * 3 + antennaAlert * 6;

  // Leg reach interpolation (tucked in flight -> extended downward on landing)
  const legReachY = 12 + legExtend * 14;
  const legSpread = 5 + legExtend * 6;
  const groomSweep = groomingActive > 0.02 ? Math.sin(frame * 0.55) * 7 * groomingActive : 0;
  const groomLift = groomingActive > 0.02 ? (0.5 + 0.5 * Math.cos(frame * 0.55)) * 6 * groomingActive : 0;
  const abdBreath = Math.sin(frame * 0.14) * 1.3;

  return (
    <svg
      width={220}
      height={180}
      viewBox="-110 -90 220 180"
      style={{
        position: 'absolute',
        left: -110,
        top: -90,
        overflow: 'visible',
        transform: `scale(${facing * scale}, ${scale}) rotate(${(pitchDeg + rollDeg * 0.3).toFixed(2)}deg)`,
      }}
    >
      <defs>
        <radialGradient id="beeThoraxGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#7C562C" />
          <stop offset="55%" stopColor="#4A3219" />
          <stop offset="100%" stopColor="#26180B" />
        </radialGradient>
        <linearGradient id="beeAbdGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD25A" />
          <stop offset="55%" stopColor="#E89A1E" />
          <stop offset="100%" stopColor="#A65E0B" />
        </linearGradient>
        <linearGradient id="wingMembrane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#E6F2EE" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* BACK WING PAIR (with subtle motion blur ghost when buzzing) */}
      <g transform={`translate(${(thoraxX - 2).toFixed(1)}, -11) rotate(${flapAngleB.toFixed(1)})`}>
        {wingBlurOpacity > 0.08 && (
          <ellipse
            cx="-10"
            cy="-24"
            rx="13"
            ry="28"
            fill="#FFFDF5"
            opacity={wingBlurOpacity * 0.55}
            transform="rotate(-14)"
          />
        )}
        <path
          d="M0 0 Q-18 -26 -14 -44 Q-4 -52 6 -38 Q12 -20 0 0 Z"
          fill="url(#wingMembrane)"
          stroke="#C8D6CE"
          strokeWidth="1.1"
        />
        <path d="M-1 -4 Q-8 -24 -5 -38 M0 -6 Q3 -22 2 -32" stroke="#D5E0D8" strokeWidth="0.9" fill="none" />
      </g>

      {/* SIX JOINTED LEGS (3 far/back + 3 near/front) */}
      <g stroke="#291A0C" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Far legs */}
        <path
          d={`M${(thoraxX - 4).toFixed(1)} 8 L${(thoraxX - 10 - legSpread * 0.4).toFixed(1)} ${(legReachY * 0.65).toFixed(1)} L${(thoraxX - 16 - legSpread * 0.5).toFixed(1)} ${legReachY.toFixed(1)}`}
          strokeWidth="2.1"
          opacity="0.72"
        />
        <path
          d={`M${(thoraxX + 3).toFixed(1)} 9 L${(thoraxX + 2).toFixed(1)} ${(legReachY * 0.7).toFixed(1)} L${(thoraxX - 2).toFixed(1)} ${legReachY.toFixed(1)}`}
          strokeWidth="2.1"
          opacity="0.72"
        />
        <path
          d={`M${(thoraxX + 10).toFixed(1)} 8 L${(thoraxX + 15 + legSpread * 0.4).toFixed(1)} ${(legReachY * 0.65).toFixed(1)} L${(thoraxX + 19 + legSpread * 0.5).toFixed(1)} ${legReachY.toFixed(1)}`}
          strokeWidth="2.1"
          opacity="0.72"
        />
      </g>

      {/* CURVED STRIPED ABDOMEN */}
      <g transform={`translate(${abdX.toFixed(1)}, ${(abdY + abdBreath * 0.4).toFixed(1)}) rotate(${(lerpView(yaw, 0, -6, -9) + abdBreath * 1.6).toFixed(1)})`}>
        <ellipse cx="0" cy="0" rx={abdRx.toFixed(1)} ry={abdRy.toFixed(1)} fill="url(#beeAbdGrad)" />
        {/* Organic golden-brown bands */}
        {yaw > 0.25 ? (
          <>
            <path d={`M${(-abdRx * 0.52).toFixed(1)} ${(-abdRy * 0.8).toFixed(1)} Q${(-abdRx * 0.35).toFixed(1)} 0 ${(-abdRx * 0.52).toFixed(1)} ${(abdRy * 0.82).toFixed(1)}`} stroke="#2B1C0E" strokeWidth="4.6" fill="none" />
            <path d={`M${(-abdRx * 0.08).toFixed(1)} ${(-abdRy * 0.94).toFixed(1)} Q${(abdRx * 0.06).toFixed(1)} 0 ${(-abdRx * 0.08).toFixed(1)} ${(abdRy * 0.94).toFixed(1)}`} stroke="#2B1C0E" strokeWidth="4.8" fill="none" />
            <path d={`M${(abdRx * 0.38).toFixed(1)} ${(-abdRy * 0.85).toFixed(1)} Q${(abdRx * 0.48).toFixed(1)} 0 ${(abdRx * 0.38).toFixed(1)} ${(abdRy * 0.85).toFixed(1)}`} stroke="#2B1C0E" strokeWidth="4.2" fill="none" />
          </>
        ) : (
          <>
            <path d={`M${(-abdRx * 0.85).toFixed(1)} -4 Q0 0 ${(abdRx * 0.85).toFixed(1)} -4`} stroke="#2B1C0E" strokeWidth="4" fill="none" />
            <path d={`M${(-abdRx * 0.9).toFixed(1)} 5 Q0 9 ${(abdRx * 0.9).toFixed(1)} 5`} stroke="#2B1C0E" strokeWidth="4" fill="none" />
          </>
        )}
        {/* Subtle top rim highlight */}
        <ellipse cx="0" cy={(-abdRy * 0.45).toFixed(1)} rx={(abdRx * 0.6).toFixed(1)} ry={(abdRy * 0.25).toFixed(1)} fill="#FFF3B8" opacity="0.32" />
      </g>

      {/* FUZZY THORAX */}
      <g transform={`translate(${thoraxX.toFixed(1)}, 0)`}>
        <ellipse cx="0" cy="0" rx={lerpView(yaw, 14, 13.5, 13).toFixed(1)} ry="12.5" fill="url(#beeThoraxGrad)" />
        {/* Golden fuzzy collar tufts */}
        <path d="M-8 -10 Q0 -15 8 -10 Q11 -4 8 2 Q0 -2 -8 2 Q-11 -4 -8 -10 Z" fill="#C98A32" opacity="0.55" />
      </g>

      {/* NEAR LEGS + POLLEN BASKETS */}
      <g stroke="#211409" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Hind leg with pollen corbicula + grooming sweep */}
        <path
          d={`M${(thoraxX - 5).toFixed(1)} 9 L${(thoraxX - 13 - legSpread * 0.6 + groomSweep).toFixed(1)} ${(legReachY * 0.72 - groomLift).toFixed(1)} L${(thoraxX - 18 - legSpread * 0.8 + groomSweep * 1.2).toFixed(1)} ${(legReachY + 2 - groomLift * 1.1).toFixed(1)}`}
          strokeWidth="2.5"
        />
        {/* Middle leg */}
        <path
          d={`M${(thoraxX + 2).toFixed(1)} 10 L${(thoraxX + groomSweep * 0.4).toFixed(1)} ${(legReachY * 0.76).toFixed(1)} L${(thoraxX - 3 + groomSweep * 0.5).toFixed(1)} ${(legReachY + 2).toFixed(1)}`}
          strokeWidth="2.5"
        />
        {/* Fore leg */}
        <path
          d={`M${(thoraxX + 9).toFixed(1)} 8 L${(thoraxX + 16 + legSpread * 0.5).toFixed(1)} ${(legReachY * 0.72).toFixed(1)} L${(thoraxX + 22 + legSpread * 0.7).toFixed(1)} ${(legReachY + 1).toFixed(1)}`}
          strokeWidth="2.4"
        />
      </g>

      {/* Dusty pollen grains on fuzzy thorax & abdomen */}
      {pollenLoad > 0.05 && (
        <g opacity={Math.min(1, pollenLoad * 1.15)}>
          <circle cx={(thoraxX - 4).toFixed(1)} cy="6" r={1.6 + pollenLoad * 1.1} fill="#FFE970" />
          <circle cx={(thoraxX + 5).toFixed(1)} cy="8" r={1.5 + pollenLoad * 1.0} fill="#FFE970" />
          <circle cx={(thoraxX + 1).toFixed(1)} cy="10" r={1.3 + pollenLoad * 0.9} fill="#FFD54F" />
          <circle cx={(abdX + 6).toFixed(1)} cy="7" r={1.4 + pollenLoad * 1.0} fill="#FFE970" />
          <circle cx={(abdX + 1).toFixed(1)} cy="9" r={1.2 + pollenLoad * 0.9} fill="#FFD54F" />
        </g>
      )}

      {/* Packed Golden Pollen Basket (Corbicula) on Hind Leg */}
      {pollenBasketLoad > 0.05 && (
        <g opacity={Math.min(1, pollenBasketLoad * 1.2)}>
          <ellipse
            cx={(thoraxX - 13 - legSpread * 0.55 + groomSweep).toFixed(1)}
            cy={(legReachY * 0.72 - groomLift).toFixed(1)}
            rx={2.8 + pollenBasketLoad * 3.6}
            ry={2.4 + pollenBasketLoad * 3.0}
            fill="#FFE14D"
            stroke="#D68910"
            strokeWidth="1"
          />
          <circle
            cx={(thoraxX - 14 - legSpread * 0.55 + groomSweep).toFixed(1)}
            cy={(legReachY * 0.72 - groomLift - 1).toFixed(1)}
            r={1.1 + pollenBasketLoad * 1.0}
            fill="#FFF7B2"
            opacity="0.7"
          />
        </g>
      )}

      {/* HEAD + PROBOSCIS + EXPRESSIVE EYES + ARTICULATED ANTENNAE */}
      <g transform={`translate(${headX.toFixed(1)}, ${headY.toFixed(1)})`}>
        {/* Slender articulated Proboscis unfurling when sipping nectar */}
        {proboscisExtend > 0.04 && (
          <path
            d={`M4 7 Q${(8 + proboscisExtend * 6).toFixed(1)} ${(12 + proboscisExtend * 7).toFixed(1)} ${(5 + proboscisExtend * 10).toFixed(1)} ${(14 + proboscisExtend * 16).toFixed(1)}`}
            stroke="#5E3516"
            strokeWidth="2.1"
            strokeLinecap="round"
            fill="none"
          />
        )}
        <ellipse cx="0" cy="0" rx={lerpView(yaw, 11.5, 10.5, 9.5).toFixed(1)} ry="10.2" fill="#2A1B0E" />
        {/* Far Eye */}
        {farEyeOpacity > 0.05 && (
          <g transform={`translate(${(farEyeX - headX).toFixed(1)}, -1)`} opacity={farEyeOpacity}>
            <ellipse cx="0" cy="0" rx="3.4" ry="4.5" fill="#171009" />
            <circle cx={0.8 + eyeLookX * 0.4} cy={-1.2 + eyeLookY * 0.4} r="1.4" fill="#FFFDF7" opacity="0.9" />
          </g>
        )}
        {/* Near Eye */}
        <g transform={`translate(${(nearEyeX - headX).toFixed(1)}, -1)`}>
          <ellipse cx="0" cy="0" rx="4.0" ry="5.1" fill="#171009" />
          <ellipse cx="0.3" cy="-0.4" rx="2.6" ry="3.4" fill="#3B291B" />
          <circle cx={1.0 + eyeLookX * 0.5} cy={-1.5 + eyeLookY * 0.5} r="1.7" fill="#FFFFFF" opacity="0.95" />
          <circle cx={-0.6 + eyeLookX * 0.3} cy={1.2 + eyeLookY * 0.3} r="0.7" fill="#FFFFFF" opacity="0.55" />
        </g>
        {/* Jointed Antennae */}
        <path
          d={`M2 -8 L7 ${(-17 - antennaBob * 0.4).toFixed(1)} Q13 ${(-20 - antennaBob).toFixed(1)} 17 ${(-15 - antennaBob * 0.6).toFixed(1)}`}
          stroke="#23160B"
          strokeWidth="2.0"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M-1 -8 L3 ${(-18 - antennaBob * 0.3).toFixed(1)} Q9 ${(-22 - antennaBob * 0.8).toFixed(1)} 13 ${(-18 - antennaBob * 0.5).toFixed(1)}`}
          stroke="#23160B"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      </g>

      {/* FRONT WING PAIR (with translucent veins + motion blur) */}
      <g transform={`translate(${(thoraxX + 3).toFixed(1)}, -10) rotate(${flapAngleA.toFixed(1)})`}>
        {wingBlurOpacity > 0.08 && (
          <>
            <ellipse
              cx="-4"
              cy="-28"
              rx="14"
              ry="31"
              fill="#FFFFFF"
              opacity={wingBlurOpacity * 0.5}
              transform="rotate(14)"
            />
            <ellipse
              cx="-8"
              cy="-26"
              rx="14"
              ry="31"
              fill="#FFFFFF"
              opacity={wingBlurOpacity * 0.4}
              transform="rotate(-12)"
            />
          </>
        )}
        <path
          d="M0 0 Q-14 -30 -8 -52 Q4 -60 14 -42 Q18 -20 0 0 Z"
          fill="url(#wingMembrane)"
          stroke="#C2D4CA"
          strokeWidth="1.2"
        />
        <path
          d="M0 -4 Q-3 -28 2 -48 M1 -8 Q8 -24 9 -38 M-1 -12 Q-7 -28 -6 -40"
          stroke="#CFDCD5"
          strokeWidth="0.95"
          fill="none"
        />
      </g>
    </svg>
  );
};
