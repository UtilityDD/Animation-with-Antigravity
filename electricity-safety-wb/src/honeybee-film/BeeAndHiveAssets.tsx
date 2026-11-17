import React from 'react';
import { Easing, interpolate } from 'remotion';

/**
 * 1. Sunlit Morning-to-Golden-Hour Sky Backdrop with drifting pollen motes
 */
export const SunlitMeadowSky: React.FC<{ frame: number; goldenHour?: number }> = ({
  frame,
  goldenHour = 0,
}) => {
  const topSky = goldenHour > 0.5 ? '#E39B62' : '#95C2B4';
  const midSky = goldenHour > 0.5 ? '#F6C782' : '#E8D6B3';
  const botSky = '#FCE7BC';

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        <linearGradient id="meadowSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={topSky} />
          <stop offset="55%" stopColor={midSky} />
          <stop offset="100%" stopColor={botSky} />
        </linearGradient>
        <radialGradient id="sunGlow" cx="76%" cy="24%" r="48%">
          <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.88" />
          <stop offset="35%" stopColor="#FBE09C" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#FBE09C" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#meadowSkyGrad)" />
      <rect width="1920" height="1080" fill="url(#sunGlow)" />

      {/* Soft distant sunlit clouds */}
      <g opacity="0.45" transform={`translate(${(frame * 0.14) % 120}, 0)`}>
        <path
          d="M180 180 Q240 135 320 155 Q390 120 460 160 Q520 155 540 185 Z"
          fill="#FFF8EB"
        />
        <path
          d="M1080 140 Q1140 102 1220 120 Q1290 95 1350 130 Q1410 128 1430 152 Z"
          fill="#FFF8EB"
        />
      </g>

      {/* Subtle sunlit pollen motes floating in breeze */}
      {Array.from({ length: 18 }).map((_, i) => {
        const px = ((i * 137 + frame * (0.45 + (i % 3) * 0.2)) % 1980) - 30;
        const py = 160 + ((i * 89) % 620) + Math.sin(frame * 0.03 + i) * 16;
        const r = 1.6 + (i % 3) * 0.9;
        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={r}
            fill="#FFF3C4"
            opacity={0.35 + Math.sin(frame * 0.05 + i) * 0.2}
          />
        );
      })}
    </svg>
  );
};

/**
 * 2. Distant Misty Sage Hills (z = 1600)
 */
export const DistantGreenHills: React.FC = () => (
  <svg
    width={4200}
    height={600}
    viewBox="-2100 -360 4200 600"
    style={{ position: 'absolute', left: -2100, top: -360, overflow: 'visible' }}
  >
    <path
      d="M-2100 180 L-2100 -80 Q-1600 -210 -1100 -95 Q-550 10 -80 -145 Q480 -260 1020 -110 Q1580 -180 2100 -60 L2100 180 Z"
      fill="#8FA889"
      opacity="0.58"
    />
    <path
      d="M-2100 200 L-2100 -20 Q-1450 -130 -920 -35 Q-350 55 180 -75 Q740 -175 1320 -45 Q1760 -95 2100 10 L2100 200 Z"
      fill="#6F8F6B"
      opacity="0.72"
    />
  </svg>
);

/**
 * 3. Mid-Distant Bengal Apiary Shed, Trees & Wooden Beehives (z = 1150)
 */
export const ApiaryShedAndTrees: React.FC = () => (
  <svg
    width={3800}
    height={700}
    viewBox="-1900 -420 3800 700"
    style={{ position: 'absolute', left: -1900, top: -420, overflow: 'visible' }}
  >
    {/* Soft rolling meadow ridge */}
    <path
      d="M-1900 220 L-1900 10 Q-1200 -55 -600 15 Q0 55 580 -25 Q1220 -65 1900 20 L1900 220 Z"
      fill="#6B8B59"
    />
    {/* Mango / banyan canopy silhouettes */}
    {[-860, -520, 640, 1080].map((tx, idx) => (
      <g key={tx} transform={`translate(${tx}, ${idx % 2 === 0 ? -15 : 5})`}>
        <rect x="-12" y="-75" width="24" height="95" rx="6" fill="#5D4732" />
        <ellipse cx="0" cy="-115" rx="95" ry="62" fill="#4D6F46" />
        <ellipse cx="-48" cy="-95" rx="58" ry="44" fill="#5B7E52" />
        <ellipse cx="52" cy="-98" rx="60" ry="42" fill="#44643E" />
      </g>
    ))}
    {/* Thatched rural apiary shed */}
    <g transform="translate(-140, 10)">
      <rect x="-125" y="-110" width="250" height="125" rx="6" fill="#D4BE9B" />
      <rect x="-105" y="-85" width="75" height="65" rx="4" fill="#7D5A3C" />
      <path d="M-155 -105 L0 -185 L155 -105 Z" fill="#8E6235" />
      <path d="M-142 -105 L0 -174 L142 -105 Z" fill="#A67642" />
    </g>
    {/* Distant wooden Langstroth beehives */}
    {[240, 345, 450].map((hx, i) => (
      <g key={hx} transform={`translate(${hx}, ${22 + i * 3})`}>
        <rect x="-26" y="-42" width="52" height="42" rx="3" fill="#E8D2A6" stroke="#A68253" strokeWidth="2" />
        <rect x="-30" y="-50" width="60" height="10" rx="2" fill="#C48744" />
        <rect x="-16" y="-10" width="32" height="4" fill="#4A3421" />
      </g>
    ))}
  </svg>
);

/**
 * 4. Midground Meadow Path, Grass & Wildflower Clusters (z = 40)
 */
export const MeadowPathPlane: React.FC<{ frame: number }> = ({ frame }) => {
  const sway = Math.sin(frame * 0.04) * 3;
  return (
    <svg
      width={3600}
      height={700}
      viewBox="-1800 -180 3600 700"
      style={{ position: 'absolute', left: -1800, top: -180, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="meadowGrassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E8F4E" />
          <stop offset="45%" stopColor="#53723A" />
          <stop offset="100%" stopColor="#3B5329" />
        </linearGradient>
        <linearGradient id="earthPathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A273" />
          <stop offset="100%" stopColor="#A67E4F" />
        </linearGradient>
      </defs>

      {/* Rolling lush meadow ground */}
      <rect x="-1800" y="-15" width="3600" height="520" fill="url(#meadowGrassGrad)" />
      {/* Sunlit earthen footpath */}
      <path
        d="M-1800 50 Q-600 28 0 42 Q650 58 1800 32 L1800 135 Q650 160 0 142 Q-600 128 -1800 155 Z"
        fill="url(#earthPathGrad)"
        opacity="0.92"
      />

      {/* Mustard & marigold patches along path border */}
      {[-620, -410, -210, 380, 590, 820].map((fx, idx) => (
        <g key={fx} transform={`translate(${fx}, ${idx % 2 === 0 ? 12 : 24})`}>
          <path
            d={`M0 24 Q${sway} -18 ${sway * 1.3} -42`}
            stroke="#4A6B33"
            strokeWidth="3.2"
            fill="none"
          />
          <circle cx={sway * 1.3} cy="-46" r="10" fill={idx % 2 === 0 ? '#F2B73B' : '#E87E35'} />
          <circle cx={sway * 1.3} cy="-46" r="4" fill="#9E4A16" />
          <circle cx={sway * 1.1 - 12} cy="-34" r="7" fill="#F5C74C" />
        </g>
      ))}
    </svg>
  );
};

/**
 * 5. Hero Blooming Marigold & Mustard Cluster for Macro Pollination (z = 12)
 */
export const HeroFlowerCluster: React.FC<{ frame: number; pollenGlow?: number }> = ({
  frame,
  pollenGlow = 0.6,
}) => {
  const sway = Math.sin(frame * 0.045) * 2.5;
  return (
    <svg
      width={340}
      height={320}
      viewBox="-170 -220 340 320"
      style={{ position: 'absolute', left: -170, top: -220, overflow: 'visible' }}
    >
      {/* Left stem + blossom */}
      <path d={`M-45 60 Q-65 -20 ${-55 + sway} -95`} stroke="#4A6E31" strokeWidth="6" fill="none" />
      <path d="M-56 -20 Q-92 -35 -82 -58 Q-60 -52 -56 -20 Z" fill="#5D8440" />

      {/* Right stem + hero blossom */}
      <path d={`M35 60 Q55 -30 ${48 + sway} -118`} stroke="#4A6E31" strokeWidth="7" fill="none" />
      <path d="M48 -30 Q90 -48 82 -72 Q56 -64 48 -30 Z" fill="#5D8440" />

      {/* Flower 1 (Left, warm coral-orange marigold) */}
      <g transform={`translate(${(-55 + sway).toFixed(1)}, -98)`}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
          <ellipse
            key={ang}
            cx="0"
            cy="-20"
            rx="11"
            ry="18"
            fill="#EC7F37"
            transform={`rotate(${ang})`}
          />
        ))}
        <circle cx="0" cy="0" r="13" fill="#FFD24C" />
        <circle cx="0" cy="0" r="6" fill="#B55417" />
      </g>

      {/* Flower 2 (Right Hero Blossom, bright golden-amber with visible anthers & stigma) */}
      <g transform={`translate(${(48 + sway).toFixed(1)}, -122)`}>
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((ang) => (
          <ellipse
            key={ang}
            cx="0"
            cy="-25"
            rx="12"
            ry="22"
            fill="#F4BA3A"
            stroke="#DF8E20"
            strokeWidth="1"
            transform={`rotate(${ang})`}
          />
        ))}
        <circle cx="0" cy="0" r="16" fill="#A64B14" />
        {/* Pollen anthers */}
        {[-8, -3, 3, 8].map((ax, i) => (
          <g key={i}>
            <line x1={ax * 0.4} y1="0" x2={ax} y2="-11" stroke="#F7D774" strokeWidth="1.6" />
            <circle cx={ax} cy="-12" r="2.8" fill="#FFE66D" opacity={0.7 + pollenGlow * 0.3} />
          </g>
        ))}
        {/* Stigma center */}
        <circle cx="0" cy="-6" r="4.2" fill="#82B352" />
      </g>
    </svg>
  );
};

/**
 * 6. Articulated Golden Honeybee (Apis cerana) with translucent wings & pollen baskets
 */
export const HoneybeeRig: React.FC<{
  frame: number;
  scale?: number;
  facing?: 1 | -1;
  pollenLoad?: number;
}> = ({ frame, scale = 1, facing = 1, pollenLoad = 0.5 }) => {
  const wingFlapA = Math.sin(frame * 1.45) * 26;
  const wingFlapB = Math.cos(frame * 1.45) * 18;
  const bob = Math.sin(frame * 0.25) * 2.5;

  return (
    <svg
      width={120}
      height={100}
      viewBox="-60 -50 120 100"
      style={{
        position: 'absolute',
        left: -60,
        top: -50,
        overflow: 'visible',
        transform: `scale(${facing * scale}, ${scale}) translateY(${bob.toFixed(1)}px)`,
      }}
    >
      {/* Back Wing */}
      <g transform={`translate(-4, -10) rotate(${(-32 + wingFlapB).toFixed(1)})`}>
        <ellipse cx="-8" cy="-16" rx="8" ry="18" fill="#FFFDF6" fillOpacity="0.62" stroke="#D8CEBC" strokeWidth="1" />
      </g>
      {/* Abdomen with golden-amber & dark bands */}
      <ellipse cx="-16" cy="2" rx="16" ry="11" fill="#F2AE2E" />
      <path d="M-24 -7 Q-22 2 -24 11" stroke="#2D2014" strokeWidth="4.2" fill="none" />
      <path d="M-15 -8.5 Q-13 2 -15 12" stroke="#2D2014" strokeWidth="4.2" fill="none" />
      <path d="M-7 -6 Q-6 2 -7 10" stroke="#2D2014" strokeWidth="3.5" fill="none" />
      {/* Fuzzy Thorax */}
      <ellipse cx="4" cy="0" rx="10.5" ry="9.5" fill="#4A331C" />
      <ellipse cx="4" cy="-2" rx="8" ry="6" fill="#704E2A" opacity="0.65" />
      {/* Pollen Basket on hind leg */}
      {pollenLoad > 0.05 && (
        <circle
          cx="-8"
          cy="11"
          r={2.5 + pollenLoad * 3.0}
          fill="#FFE052"
          stroke="#E59F1A"
          strokeWidth="1"
        />
      )}
      {/* Legs */}
      <path d="M-4 8 L-9 16 M2 8 L0 16 M8 7 L11 14" stroke="#2B1D11" strokeWidth="1.8" strokeLinecap="round" />
      {/* Head + Eye + Antennae + Proboscis */}
      <circle cx="15" cy="-1" r="6.8" fill="#2E2013" />
      <ellipse cx="16.5" cy="-2" rx="2.6" ry="3.6" fill="#4D3928" />
      <path d="M18 -6 Q24 -13 28 -11 M16 -7 Q20 -15 24 -15" stroke="#2E2013" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Front Wing */}
      <g transform={`translate(2, -10) rotate(${(-18 + wingFlapA).toFixed(1)})`}>
        <ellipse cx="-4" cy="-19" rx="9" ry="21" fill="#FFFFFF" fillOpacity="0.76" stroke="#DED2BC" strokeWidth="1.1" />
      </g>
    </svg>
  );
};

/**
 * 7. Hive Interior World (Acts 3 & 4): Glowing hexagonal honeycomb, enzyme conversion,
 * wing-fanning evaporation airflow ribbons, and beeswax capping.
 */
export const HiveInteriorScene: React.FC<{
  frame: number;
  opacity: number;
  honeyFill: number;
  evaporationIntensity: number;
  capProgress: number;
}> = ({ frame, opacity, honeyFill, evaporationIntensity, capProgress }) => {
  if (opacity <= 0.01) return null;

  const hexRadius = 46;
  const dx = hexRadius * 1.76;
  const dy = hexRadius * 1.54;
  const cols = 15;
  const rows = 8;

  const hexPoints = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 })
      .map((_, k) => {
        const a = (Math.PI / 3) * k + Math.PI / 6;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      })
      .join(' ');

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <defs>
          <radialGradient id="hiveBacklight" cx="56%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#B86214" />
            <stop offset="55%" stopColor="#69330B" />
            <stop offset="100%" stopColor="#2D1404" />
          </radialGradient>
          <linearGradient id="honeyLiquidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD966" />
            <stop offset="100%" stopColor="#D97B12" />
          </linearGradient>
        </defs>

        <rect width="1920" height="1080" fill="url(#hiveBacklight)" />

        {/* Hexagonal Beeswax Comb Wall */}
        <g transform="translate(470, 275) scale(0.9)">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const cx = c * dx + (r % 2 === 1 ? dx * 0.5 : 0);
              const cy = r * dy;
              const cellDelay = (r * 0.04 + c * 0.03) % 0.45;
              const localFill = Math.max(0, Math.min(1, (honeyFill - cellDelay) / 0.55));
              const localCap = Math.max(0, Math.min(1, (capProgress - cellDelay) / 0.5));

              return (
                <g key={`${r}-${c}`}>
                  <polygon
                    points={hexPoints(cx, cy, hexRadius)}
                    fill="#5C2D09"
                    stroke="#E29A33"
                    strokeWidth="4.5"
                    opacity="0.92"
                  />
                  {localFill > 0.02 && (
                    <polygon
                      points={hexPoints(cx, cy, hexRadius * (0.28 + localFill * 0.64))}
                      fill="url(#honeyLiquidGrad)"
                      opacity={0.75 + localFill * 0.25}
                    />
                  )}
                  {localCap > 0.05 && (
                    <polygon
                      points={hexPoints(cx, cy, hexRadius * 0.91 * localCap)}
                      fill="#F6E5B8"
                      stroke="#E0C47C"
                      strokeWidth="2"
                      opacity={localCap * 0.92}
                    />
                  )}
                </g>
              );
            })
          )}
        </g>

        {/* Evaporating Golden Airflow Ribbons (Act 4) */}
        {evaporationIntensity > 0.05 && (
          <g opacity={evaporationIntensity * 0.82}>
            {[0, 1, 2, 3].map((idx) => {
              const yBase = 300 + idx * 145;
              const phase = frame * 0.14 + idx * 1.3;
              const dashOffset = -(frame * 9 + idx * 40);
              return (
                <path
                  key={idx}
                  d={`M180 ${yBase} Q640 ${yBase - 42 + Math.sin(phase) * 18} 1120 ${yBase + 15} T1820 ${yBase - 28}`}
                  stroke="#FFF1B8"
                  strokeWidth={4.5 - idx * 0.4}
                  strokeDasharray="64 38"
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* Animated Worker Bees inside the hive */}
      <div style={{ position: 'absolute', left: 1080, top: 540 }}>
        <HoneybeeRig frame={frame} scale={2.1} facing={1} pollenLoad={0} />
      </div>
      <div style={{ position: 'absolute', left: 1290, top: 560 }}>
        <HoneybeeRig frame={frame + 12} scale={2.0} facing={-1} pollenLoad={0} />
      </div>
      {evaporationIntensity > 0.1 && (
        <div style={{ position: 'absolute', left: 820, top: 380, opacity: evaporationIntensity }}>
          <HoneybeeRig frame={frame * 1.4} scale={1.75} facing={1} pollenLoad={0} />
        </div>
      )}
    </div>
  );
};

/**
 * 8. Foreground Swaying Wildflowers & Mustard Stalks (z = -280 / -430)
 */
export const ForegroundWildflowers: React.FC<{
  frame: number;
  side: 'left' | 'right';
}> = ({ frame, side }) => {
  const sway = Math.sin(frame * 0.038 + (side === 'left' ? 0 : 1.7)) * 8;
  return (
    <svg
      width={300}
      height={340}
      viewBox="-150 -240 300 340"
      style={{ position: 'absolute', left: -150, top: -240, overflow: 'visible' }}
    >
      {[-35, 0, 38].map((bx, i) => (
        <g key={bx}>
          <path
            d={`M${bx} 80 Q${bx + sway * 0.5} -40 ${bx + sway} ${-150 - i * 18}`}
            stroke="#3C5A27"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx={bx + sway}
            cy={-156 - i * 18}
            r={14 - i * 1.5}
            fill={i === 1 ? '#F4BA3A' : '#E8833A'}
          />
          <circle cx={bx + sway} cy={-156 - i * 18} r="5" fill="#9E4A16" />
        </g>
      ))}
    </svg>
  );
};

