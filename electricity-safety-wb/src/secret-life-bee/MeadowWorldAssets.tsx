import React from 'react';
import { Easing, interpolate } from 'remotion';

/**
 * 1. Sunrise Meadow Sky with Volumetric Sunbeams & Atmospheric Haze
 */
export const SunriseMeadowBackdrop: React.FC<{
  frame: number;
  warmth?: number;
}> = ({ frame, warmth = 0.25 }) => {
  const top = warmth > 0.6 ? '#D98E54' : '#7AA8A1';
  const mid = warmth > 0.6 ? '#F5C47C' : '#E9D1A5';

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        <linearGradient id="sunriseSkyV3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="52%" stopColor={mid} />
          <stop offset="100%" stopColor="#FBE8BE" />
        </linearGradient>
        <radialGradient id="sunriseSun" cx="74%" cy="28%" r="52%">
          <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.95" />
          <stop offset="28%" stopColor="#FFE196" stopOpacity="0.52" />
          <stop offset="100%" stopColor="#FFE196" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sunRayGrad" x1="0.85" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor="#FFF7D4" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#FFF7D4" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#FFF7D4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#sunriseSkyV3)" />
      <rect width="1920" height="1080" fill="url(#sunriseSun)" />

      {/* Soft diagonal morning sunbeams extending smoothly off-frame */}
      <g opacity="0.8">
        <polygon points="1540,-60 1860,-60 760,1140 280,1140" fill="url(#sunRayGrad)" />
        <polygon points="1720,-60 2060,-60 1280,1140 860,1140" fill="url(#sunRayGrad)" opacity="0.7" />
      </g>

      {/* Atmospheric drifting pollen motes */}
      {Array.from({ length: 22 }).map((_, i) => {
        const px = ((i * 151 + frame * (0.35 + (i % 4) * 0.16)) % 1980) - 30;
        const py = 120 + ((i * 97) % 720) + Math.sin(frame * 0.028 + i) * 18;
        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={1.4 + (i % 3) * 0.8}
            fill="#FFF6CC"
            opacity={0.28 + Math.sin(frame * 0.04 + i) * 0.18}
          />
        );
      })}
    </svg>
  );
};

/**
 * 2. Distant Misty Hills & Organic Treeline (z = 1600)
 */
export const DistantBotanicalHills: React.FC = () => (
  <svg
    width={4200}
    height={650}
    viewBox="-2100 -380 4200 650"
    style={{ position: 'absolute', left: -2100, top: -380, overflow: 'visible' }}
  >
    <path
      d="M-2100 200 L-2100 -60 Q-1550 -195 -980 -75 Q-420 35 120 -130 Q680 -245 1280 -85 Q1760 -155 2100 -45 L2100 200 Z"
      fill="#8FA68B"
      opacity="0.54"
    />
    <path
      d="M-2100 220 L-2100 0 Q-1400 -115 -820 -25 Q-250 55 280 -65 Q860 -155 1420 -35 Q1820 -85 2100 15 L2100 220 Z"
      fill="#6B8B65"
      opacity="0.72"
    />
  </svg>
);

/**
 * 3. Midground Meadow Ridge & Natural Wooden Apiary Hive (z = 950)
 */
export const MidgroundMeadowRidge: React.FC = () => (
  <svg
    width={5600}
    height={920}
    viewBox="-2800 -420 5600 920"
    style={{ position: 'absolute', left: -2800, top: -420, overflow: 'visible' }}
  >
    <path
      d="M-2800 480 L-2800 20 Q-1800 -55 -1150 -25 Q-520 35 120 55 Q720 -18 1340 -48 Q2050 15 2800 35 L2800 480 Z"
      fill="#597A49"
    />
    {/* Organic layered tree canopies (irregular multi-lobe, not round balls) */}
    {[-920, -480, 680, 1140].map((tx, idx) => (
      <g key={tx} transform={`translate(${tx}, ${idx % 2 === 0 ? -12 : 8})`}>
        <path d="M-10 15 Q-6 -45 -14 -85 L12 -85 Q6 -45 14 15 Z" fill="#523C28" />
        <path
          d="M-95 -75 Q-115 -125 -55 -148 Q-10 -178 48 -145 Q112 -130 92 -78 Q62 -52 0 -58 Q-65 -50 -95 -75 Z"
          fill="#41623B"
        />
        <path
          d="M-70 -92 Q-85 -132 -30 -148 Q15 -162 55 -132 Q80 -105 45 -85 Q-10 -78 -70 -92 Z"
          fill="#557A4B"
          opacity="0.82"
        />
      </g>
    ))}
    {/* Wooden Hive Box nestled in sunlit clearing */}
    <g transform="translate(260, 14)">
      <rect x="-46" y="-82" width="92" height="82" rx="4" fill="#D9BD8B" stroke="#9B7544" strokeWidth="2.5" />
      <rect x="-46" y="-44" width="92" height="3" fill="#B28A56" />
      <path d="M-54 -82 L54 -82 L48 -98 L-48 -98 Z" fill="#A96E35" />
      {/* Dark hive entrance slot */}
      <rect x="-24" y="-14" width="48" height="7" rx="2" fill="#2A1708" />
      <rect x="-32" y="-7" width="64" height="5" rx="1.5" fill="#B58952" />
    </g>
  </svg>
);

/**
 * 4. Meadow Ground Layer with Swaying Grass Blades (z = 40)
 */
export const MeadowGroundLayer: React.FC<{ frame: number }> = ({ frame }) => {
  const breeze = Math.sin(frame * 0.036) * 6;
  return (
    <svg
      width={4800}
      height={820}
      viewBox="-2400 -160 4800 820"
      style={{ position: 'absolute', left: -2400, top: -160, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="meadowRichGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#628543" />
          <stop offset="45%" stopColor="#486830" />
          <stop offset="100%" stopColor="#2F461E" />
        </linearGradient>
      </defs>
      <path
        d="M-2400 660 L-2400 -8 Q-1400 -28 -600 -4 Q200 14 1000 -18 Q1800 -32 2400 -6 L2400 660 Z"
        fill="url(#meadowRichGrad)"
      />
      {/* Organic curved sunlit grass tufts */}
      {Array.from({ length: 40 }).map((_, i) => {
        const gx = -1600 + i * 82;
        const h = 34 + (i % 4) * 12;
        const bend = breeze * (0.8 + (i % 3) * 0.25) + (i % 2 === 0 ? 7 : -6);
        return (
          <path
            key={i}
            d={`M${gx - 4} 6 Q${gx + bend * 0.4} ${-h * 0.6} ${gx + bend} ${-h} Q${gx + bend * 0.35 + 6} ${-h * 0.5} ${gx + 4} 8 Z`}
            fill={i % 2 === 0 ? '#789E52' : '#537737'}
          />
        );
      })}
    </svg>
  );
};

/**
 * 5. Botanical Multi-Petal Flower with Dewdrops, Anthers, Stigma & Weight-Dip Physics
 */
export const BotanicalFlower: React.FC<{
  frame: number;
  variant?: 'cosmos-gold' | 'hibiscus-coral';
  weightDip?: number;
  pollenRemain?: number;
  stigmaPollinated?: number;
  scale?: number;
}> = ({
  frame,
  variant = 'cosmos-gold',
  weightDip = 0,
  pollenRemain = 1,
  stigmaPollinated = 0,
  scale = 1,
}) => {
  const breeze = Math.sin(frame * 0.042) * 3.5;
  const dipY = weightDip * 14;
  const dipAngle = weightDip * 5.5;

  const petalMain = variant === 'cosmos-gold' ? '#F6BC38' : '#E86A4A';
  const petalShade = variant === 'cosmos-gold' ? '#D98E1C' : '#BE462B';
  const petalHigh = variant === 'cosmos-gold' ? '#FFE27A' : '#FA9779';

  return (
    <svg
      width={300}
      height={380}
      viewBox="-150 -280 300 380"
      style={{
        position: 'absolute',
        left: -150,
        top: -280,
        overflow: 'visible',
        transform: `scale(${scale})`,
      }}
    >
      {/* Curved botanical stem */}
      <path
        d={`M0 80 Q${-12 + breeze * 0.4} -60 ${(breeze + dipAngle * 0.8).toFixed(1)} ${(-165 + dipY).toFixed(1)}`}
        stroke="#466B2D"
        strokeWidth="7.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Serrated/organic leaves */}
      <path d="M-4 -20 Q-62 -46 -56 -72 Q-22 -64 -4 -20 Z" fill="#5A833B" />
      <path d="M-4 -20 Q-34 -48 -52 -68" stroke="#76A152" strokeWidth="1.5" fill="none" />
      <path d="M2 -68 Q58 -92 54 -116 Q22 -106 2 -68 Z" fill="#4D7331" />
      {/* Morning Dewdrop on leaf */}
      <ellipse cx="-38" cy="-54" rx="4.5" ry="3.2" fill="#EBF9FA" opacity="0.88" />
      <circle cx="-39.5" cy="-55" r="1.4" fill="#FFFFFF" />

      {/* Flower Head (responds to bee landing weight) */}
      <g
        transform={`translate(${(breeze + dipAngle * 0.8).toFixed(1)}, ${(-170 + dipY).toFixed(
          1
        )}) rotate(${(breeze * 0.4 + dipAngle).toFixed(2)})`}
      >
        {/* Outer veined petals */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang, i) => (
          <g key={ang} transform={`rotate(${ang})`}>
            <path
              d="M0 0 Q-13 -32 -7 -54 Q0 -62 7 -54 Q13 -32 0 0 Z"
              fill={i % 2 === 0 ? petalMain : petalShade}
            />
            <path d="M0 -8 Q-3 -32 0 -48" stroke={petalHigh} strokeWidth="1.2" opacity="0.55" fill="none" />
          </g>
        ))}
        {/* Receptacle & Disk */}
        <circle cx="0" cy="0" r="18" fill="#8C3D12" />
        <circle cx="0" cy="0" r="14" fill="#B5561B" opacity="0.7" />

        {/* Stamens + Anthers with individual pollen grains */}
        {[-11, -6, -2, 3, 7, 11].map((ax, idx) => (
          <g key={idx}>
            <path d={`M${ax * 0.3} 2 Q${ax * 0.7} -8 ${ax} -15`} stroke="#F5D376" strokeWidth="1.6" fill="none" />
            <circle
              cx={ax}
              cy="-16"
              r={2.8 * (0.4 + pollenRemain * 0.6)}
              fill="#FFE45E"
              opacity={0.45 + pollenRemain * 0.55}
            />
          </g>
        ))}

        {/* Receptive Stigma (lights up warmly when pollinated in Scene 3) */}
        <path d="M0 2 L0 -12 M-4 -14 Q0 -10 4 -14" stroke="#99CA64" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        {stigmaPollinated > 0.05 && (
          <g opacity={stigmaPollinated}>
            <circle cx="-2" cy="-13" r="2.2" fill="#FFE666" />
            <circle cx="2" cy="-14" r="2.0" fill="#FFE666" />
            <circle cx="0" cy="-11" r="2.1" fill="#FFE666" />
          </g>
        )}
      </g>
    </svg>
  );
};

/**
 * 6. Foreground Out-of-Focus Grasses & Blossoms (z = -280 / -420)
 */
export const ForegroundBlurredFlora: React.FC<{
  frame: number;
  side: 'left' | 'right';
}> = ({ frame, side }) => {
  const sway = Math.sin(frame * 0.04 + (side === 'left' ? 0 : 1.5)) * 10;
  return (
    <svg
      width={340}
      height={380}
      viewBox="-170 -260 340 380"
      style={{ position: 'absolute', left: -170, top: -260, overflow: 'visible' }}
    >
      {[-55, -5, 52].map((bx, i) => {
        const curve = (i - 1) * 28 + sway;
        const tipX = bx + curve;
        const tipY = -170 - i * 18;
        return (
          <g key={bx}>
            <path
              d={`M${bx} 120 Q${bx + curve * 0.35} -30 ${tipX} ${tipY}`}
              stroke="#365322"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M${bx + curve * 0.28} -20 Q${bx + curve * 0.28 + (i % 2 === 0 ? 34 : -34)} -55 ${bx + curve * 0.28 + (i % 2 === 0 ? 52 : -52)} -28 Q${bx + curve * 0.28 + (i % 2 === 0 ? 22 : -18)} -5 ${bx + curve * 0.28} -20 Z`}
              fill="#4D7333"
            />
            <g transform={`translate(${tipX}, ${tipY})`}>
              {[0, 60, 120, 180, 240, 300].map((ang) => (
                <ellipse
                  key={ang}
                  cx={0}
                  cy={-16}
                  rx={8}
                  ry={15}
                  transform={`rotate(${ang})`}
                  fill={i === 1 ? '#F4BA3A' : '#E57444'}
                />
              ))}
              <circle cx={0} cy={0} r={9} fill="#804314" />
            </g>
          </g>
        );
      })}
    </svg>
  );
};

/**
 * 7. Minimal Bengali Kinetic Title (1-3 words max, Hind Siliguri + Noto Sans Bengali)
 */
export const MinimalBanglaTitle: React.FC<{
  frame: number;
  startFrame: number;
  endFrame: number;
  text: string;
  theme?: 'meadow' | 'hive';
  align?: 'left' | 'center' | 'right';
  size?: number;
}> = ({
  frame,
  startFrame,
  endFrame,
  text,
  theme = 'meadow',
  align = 'left',
  size = 64,
}) => {
  if (frame < startFrame || frame > endFrame) return null;

  const ease = Easing.bezier(0.22, 1, 0.36, 1);
  const fadeOut = interpolate(frame, [endFrame - 20, endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

  const words = text.split(' ');
  const color = theme === 'hive' ? '#FFF5DC' : '#261B10';
  const shadow =
    theme === 'hive'
      ? '0 4px 24px rgba(20,8,0,0.85)'
      : '0 3px 20px rgba(255,248,232,0.85)';

  return (
    <div
      style={{
        position: 'absolute',
        top: align === 'center' ? undefined : 74,
        bottom: align === 'center' ? 110 : undefined,
        left: align === 'left' ? 92 : align === 'center' ? 120 : undefined,
        right: align === 'right' ? 92 : align === 'center' ? 120 : undefined,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:
          align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        gap: '0 18px',
        opacity: fadeOut,
        pointerEvents: 'none',
      }}
    >
      {words.map((w, idx) => {
        const wStart = startFrame + idx * 6;
        const t = interpolate(frame, [wStart, wStart + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: ease,
        });
        return (
          <span
            key={`${w}-${idx}`}
            style={{
              fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
              fontSize: size,
              fontWeight: 700,
              color,
              textShadow: shadow,
              opacity: t,
              transform: `translateY(${((1 - t) * 20).toFixed(1)}px)`,
              display: 'inline-block',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
