import React from 'react';
import { Easing, interpolate } from 'remotion';

/**
 * Extreme Macro Dew-Drop Opening:
 * Starts filling the frame with a crystalline dewdrop reflecting the sunrise meadow,
 * then smoothly pulls back to reveal the leaf, flower, and wide landscape.
 */
export const DewDropMacroOpening: React.FC<{
  frame: number;
  revealEndFrame?: number;
}> = ({ frame, revealEndFrame = 220 }) => {
  if (frame > revealEndFrame + 30) return null;

  const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
  // Camera pull-back: starts zoomed into the dewdrop (scale 3.6) -> settles to 0.45 and fades out seamlessly
  const scale = interpolate(frame, [0, 70, 175, revealEndFrame], [3.6, 3.1, 1.0, 0.38], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const translateX = interpolate(frame, [0, 175, revealEndFrame], [0, -140, -320], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const translateY = interpolate(frame, [0, 175, revealEndFrame], [0, 75, 190], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  const opacity = interpolate(frame, [revealEndFrame - 45, revealEndFrame + 15], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shimmer = Math.sin(frame * 0.08) * 4;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transformOrigin: '50% 50%',
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="dewOrbGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#FFF6D8" stopOpacity="0.45" />
            <stop offset="68%" stopColor="#9ED4C6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2F593A" stopOpacity="0.88" />
          </radialGradient>
          <linearGradient id="macroLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#85B85A" />
            <stop offset="55%" stopColor="#4F7E34" />
            <stop offset="100%" stopColor="#284718" />
          </linearGradient>
          <linearGradient id="macroPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE98A" />
            <stop offset="65%" stopColor="#F5B429" />
            <stop offset="100%" stopColor="#C97810" />
          </linearGradient>
          <clipPath id="dewClip">
            <path d="M960,340 C1070,340 1150,435 1150,535 C1150,645 1065,725 960,725 C855,725 770,645 770,535 C770,435 850,340 960,340 Z" />
          </clipPath>
        </defs>

        {/* Soft blurred foreground petal & veined leaf supporting the dewdrop */}
        <path
          d="M520,1080 C680,790 880,680 1240,650 C1480,630 1750,740 1920,920 L1920,1080 Z"
          fill="url(#macroLeafGrad)"
        />
        {/* Leaf veins */}
        <path
          d="M640,1040 Q940,780 1420,695 M840,860 Q980,820 1120,835 M980,775 Q1120,730 1260,750"
          stroke="#A5D176"
          strokeWidth="3.5"
          fill="none"
          opacity="0.45"
        />
        {/* Warm golden cosmos petal peeking behind the leaf */}
        <path
          d="M990,670 C1140,420 1390,340 1580,460 C1660,515 1590,670 1320,715 Z"
          fill="url(#macroPetalGrad)"
          opacity="0.92"
        />

        {/* Contact shadow under dewdrop */}
        <ellipse cx="965" cy="726" rx="165" ry="26" fill="#1E3814" opacity="0.48" />

        {/* Refracted / Reflected Sunrise Meadow INSIDE the Dewdrop */}
        <g clipPath="url(#dewClip)">
          {/* Inverted/curved golden sunrise sky inside lens */}
          <rect x="750" y="330" width="420" height="410" fill="#F6C87A" />
          <circle cx={990 + shimmer * 0.5} cy="595" r="78" fill="#FFF9D6" opacity="0.85" />
          {/* Curved distant hills */}
          <path d="M750,515 Q960,440 1170,515 L1170,330 L750,330 Z" fill="#4E7340" opacity="0.82" />
          <path d="M750,545 Q955,485 1170,540 L1170,455 Q960,400 750,460 Z" fill="#6F9459" opacity="0.7" />
          {/* Tiny silhouette wildflowers & bee silhouette glimpsed in reflection */}
          <circle cx="885" cy="488" r="14" fill="#F29E38" opacity="0.85" />
          <circle cx="1035" cy="472" r="12" fill="#E66949" opacity="0.85" />
          {/* Glassy lens overlay */}
          <rect x="750" y="330" width="420" height="410" fill="url(#dewOrbGrad)" opacity="0.62" />
        </g>

        {/* Crisp specular rim & window-like sky highlight on dewdrop */}
        <path
          d="M960,340 C1070,340 1150,435 1150,535 C1150,645 1065,725 960,725 C855,725 770,645 770,535 C770,435 850,340 960,340 Z"
          fill="none"
          stroke="#FFFDF2"
          strokeWidth="4"
          opacity="0.72"
        />
        <ellipse
          cx={885 + shimmer * 0.4}
          cy="430"
          rx="48"
          ry="24"
          transform="rotate(-28 885 430)"
          fill="#FFFFFF"
          opacity="0.88"
        />
        <circle cx="1065" cy="635" r="14" fill="#FFF8D2" opacity="0.58" />
      </svg>
    </div>
  );
};

export type FlowerVariety = 'cosmos-gold' | 'hibiscus-coral' | 'wild-lavender' | 'daisy-cream';

/**
 * Multi-variety living botanical flower with individual petal movement,
 * stem bending under bee weight, textured anthers, and stigma pollination.
 */
export const BotanicalFlowerV2: React.FC<{
  frame: number;
  variety?: FlowerVariety;
  weightDip?: number; // 0..1
  pollenRemain?: number; // 0..1
  stigmaPollinated?: number; // 0..1
  scale?: number;
}> = ({
  frame,
  variety = 'cosmos-gold',
  weightDip = 0,
  pollenRemain = 1,
  stigmaPollinated = 0,
  scale = 1,
}) => {
  const breeze = Math.sin(frame * 0.042) * 3.8;
  const dipY = weightDip * 15;
  const dipAngle = weightDip * 5.8;

  const palette = {
    'cosmos-gold': { main: '#F6BC38', shade: '#D48715', high: '#FFE582', core: '#7E3F0D', petals: 10 },
    'hibiscus-coral': { main: '#E8684A', shade: '#BD4228', high: '#FC9B7E', core: '#682114', petals: 8 },
    'wild-lavender': { main: '#9F7CD1', shade: '#7451A8', high: '#C7AEEC', core: '#52347A', petals: 9 },
    'daisy-cream': { main: '#FFF6DE', shade: '#E8D5AC', high: '#FFFFFF', core: '#E69C1E', petals: 12 },
  }[variety];

  return (
    <svg
      width={320}
      height={400}
      viewBox="-160 -290 320 400"
      style={{
        position: 'absolute',
        left: -160,
        top: -290,
        overflow: 'visible',
        transform: `scale(${scale})`,
      }}
    >
      {/* Curved organic stem */}
      <path
        d={`M0 105 Q${(breeze * 0.45 - dipAngle * 0.6).toFixed(1)} -40 ${(breeze + dipAngle * 0.4).toFixed(1)} ${(-155 + dipY).toFixed(1)}`}
        stroke="#456D29"
        strokeWidth="9.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Stem highlight */}
      <path
        d={`M-1.5 100 Q${(breeze * 0.45 - dipAngle * 0.6 - 1.5).toFixed(1)} -40 ${(breeze + dipAngle * 0.4 - 1.5).toFixed(1)} ${(-155 + dipY).toFixed(1)}`}
        stroke="#6B9944"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />

      {/* Leaves with dewdrops */}
      <g transform={`translate(${(breeze * 0.3).toFixed(1)}, ${(-55 + dipY * 0.35).toFixed(1)}) rotate(${(-24 + breeze * 0.8).toFixed(1)})`}>
        <path d="M0 0 Q38 -22 66 -6 Q38 20 0 0 Z" fill="#5D8A38" />
        <path d="M4 0 Q34 -6 56 -5" stroke="#85B55A" strokeWidth="1.5" fill="none" opacity="0.65" />
      </g>
      <g transform={`translate(${(breeze * 0.55).toFixed(1)}, ${(-98 + dipY * 0.55).toFixed(1)}) rotate(${(28 - breeze * 0.7).toFixed(1)})`}>
        <path d="M0 0 Q-36 -24 -64 -6 Q-36 18 0 0 Z" fill="#4D752D" />
        <ellipse cx="-26" cy="-5" rx="5.5" ry="3.8" fill="#E8FBFF" opacity="0.88" />
      </g>

      {/* Blossom Head */}
      <g transform={`translate(${(breeze + dipAngle * 0.4).toFixed(1)}, ${(-160 + dipY).toFixed(1)}) rotate(${(dipAngle + breeze * 0.6).toFixed(1)})`}>
        {/* Back/lower petals */}
        {Array.from({ length: palette.petals }).map((_, i) => {
          const baseAng = (360 / palette.petals) * i;
          // Individual petal micro-flex when bee lands
          const flex = weightDip * Math.sin(i * 1.4) * 3.5 + Math.sin(frame * 0.06 + i) * 1.1;
          const isFront = i % 2 === 0;
          return (
            <g key={i} transform={`rotate(${(baseAng + flex).toFixed(1)})`}>
              <path
                d={
                  variety === 'hibiscus-coral'
                    ? 'M0 -10 C-22 -40 -24 -74 0 -80 C24 -74 22 -40 0 -10 Z'
                    : 'M0 -10 C-14 -38 -15 -70 0 -76 C15 -70 14 -38 0 -10 Z'
                }
                fill={isFront ? palette.main : palette.shade}
              />
              {/* Petal veins & highlight */}
              <path
                d="M0 -18 L0 -66"
                stroke={palette.high}
                strokeWidth="2.0"
                strokeLinecap="round"
                opacity="0.45"
              />
            </g>
          );
        })}

        {/* Textured floral receptacle */}
        <circle cx="0" cy="0" r="24" fill={palette.core} />
        <circle cx="0" cy="0" r="18" fill="#5A2B0A" opacity="0.42" />

        {/* Anthers with individual golden pollen grains */}
        {[-12, -5, 2, 9].map((ax, idx) => (
          <g key={idx}>
            <line x1={ax * 0.5} y1="4" x2={ax} y2="-16" stroke="#C8DF84" strokeWidth="1.9" strokeLinecap="round" />
            <ellipse
              cx={ax}
              cy="-18"
              rx={3.6 * (0.45 + 0.55 * pollenRemain)}
              ry={2.6 * (0.45 + 0.55 * pollenRemain)}
              fill="#FFE459"
              opacity={0.4 + 0.6 * pollenRemain}
            />
            {pollenRemain > 0.3 && (
              <circle cx={ax + 2} cy="-20" r="1.4" fill="#FFF59E" opacity={pollenRemain} />
            )}
          </g>
        ))}

        {/* Central Stigma — receives golden pollen upon pollination */}
        <path d="M0 6 L0 -22 M-4 -22 Q0 -26 4 -22" stroke="#9CCB5C" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        {stigmaPollinated > 0.05 && (
          <g opacity={stigmaPollinated}>
            <circle cx="-2.5" cy="-23" r="2.8" fill="#FFE654" />
            <circle cx="2.5" cy="-22" r="2.5" fill="#FFD43B" />
            <circle cx="0" cy="-25" r="2.2" fill="#FFF394" />
          </g>
        )}
      </g>
    </svg>
  );
};

/**
 * Rich multi-layered dappled sunlight & organic grass tufts for the meadow floor.
 */
export const RichMeadowFoliageLayer: React.FC<{ frame: number }> = ({ frame }) => {
  const breeze = Math.sin(frame * 0.036) * 7;
  return (
    <svg
      width={5200}
      height={980}
      viewBox="-2600 -180 5200 980"
      style={{ position: 'absolute', left: -2600, top: -180, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="meadowV2Grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#698D47" />
          <stop offset="35%" stopColor="#4A6B30" />
          <stop offset="100%" stopColor="#273D18" />
        </linearGradient>
      </defs>
      <path
        d="M-2600 800 L-2600 -12 Q-1500 -36 -600 -6 Q250 18 1100 -20 Q1950 -38 2600 -8 L2600 800 Z"
        fill="url(#meadowV2Grad)"
      />
      {/* Warm dappled sunlight patches on grass */}
      {[-1100, -480, 120, 680, 1320].map((px, idx) => (
        <ellipse
          key={px}
          cx={px}
          cy={95 + (idx % 2) * 55}
          rx={190 + (idx % 3) * 45}
          ry={38}
          fill="#94B861"
          opacity="0.22"
        />
      ))}
      {/* Multi-blade organic grass tufts */}
      {Array.from({ length: 48 }).map((_, i) => {
        const gx = -1800 + i * 78;
        const h = 38 + (i % 4) * 14;
        const bend = breeze * (0.75 + (i % 3) * 0.22) + (i % 2 === 0 ? 8 : -7);
        return (
          <g key={i}>
            <path
              d={`M${gx - 5} 12 Q${gx + bend * 0.4} ${-h * 0.55} ${gx + bend} ${-h} Q${gx + bend * 0.35 + 7} ${-h * 0.5} ${gx + 4} 14 Z`}
              fill={i % 2 === 0 ? '#7CA354' : '#567B39'}
            />
            <path
              d={`M${gx + 8} 14 Q${gx + 8 + bend * 0.5} ${-h * 0.4} ${gx + 14 + bend * 0.8} ${-h * 0.72} Q${gx + 14 + bend * 0.3} ${-h * 0.35} ${gx + 14} 14 Z`}
              fill="#688F44"
              opacity="0.85"
            />
          </g>
        );
      })}
    </svg>
  );
};
