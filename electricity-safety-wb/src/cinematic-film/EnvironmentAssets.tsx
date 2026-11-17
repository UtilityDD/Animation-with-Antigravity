import React from 'react';

/**
 * 1. MONSOON TWILIGHT SKY BACKDROP (Screen-locked far infinity)
 * Balanced cool storm-indigo zenith, slate-teal mid-sky, and warm amber-ochre cloud break.
 */
export const MonsoonSkyBackdrop: React.FC<{
  lightningIntensity?: number;
}> = ({ lightningIntensity = 0 }) => {
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        <linearGradient id="monsoonSkyGrad" x1="0" y1="0" x2="0.16" y2="1">
          <stop offset="0%" stopColor="#121C2B" />
          <stop offset="34%" stopColor="#21354B" />
          <stop offset="64%" stopColor="#375469" />
          <stop offset="86%" stopColor="#566970" />
          <stop offset="100%" stopColor="#263038" />
        </linearGradient>
        <radialGradient id="horizonWarmGlow" cx="0.60" cy="0.62" r="0.54">
          <stop offset="0%" stopColor="#F2AF63" stopOpacity="0.34" />
          <stop offset="44%" stopColor="#B57E52" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#21354B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cloudLightning" cx="0.26" cy="0.20" r="0.45">
          <stop
            offset="0%"
            stopColor="#CFE4FF"
            stopOpacity={0.34 * lightningIntensity}
          />
          <stop offset="100%" stopColor="#21354B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={1920} height={1080} fill="url(#monsoonSkyGrad)" />
      <rect width={1920} height={1080} fill="url(#horizonWarmGlow)" />
      {lightningIntensity > 0.01 && (
        <rect width={1920} height={1080} fill="url(#cloudLightning)" />
      )}

      {/* Layered painterly storm cloud banks */}
      <path
        d="M-80 235 Q180 150 440 210 Q720 120 1020 190 Q1320 135 1620 205 Q1810 165 2000 220 L2000 0 L-80 0 Z"
        fill="#162333"
        opacity="0.68"
      />
      <path
        d="M-60 350 Q230 280 520 330 Q850 250 1170 315 Q1490 260 1790 325 L2000 305 L2000 170 Q1680 220 1320 180 Q920 240 560 185 Q240 240 -60 200 Z"
        fill="#273E54"
        opacity="0.52"
      />
    </svg>
  );
};

/**
 * 1B. DISTANT MISTY HILLS & ATMOSPHERIC RIDGE (worldZ = 1650)
 * Provides deep horizon parallax behind the village skyline.
 */
export const DistantMistyHills: React.FC = () => {
  return (
    <svg
      width={4000}
      height={420}
      viewBox="-2000 -340 4000 420"
      style={{ position: 'absolute', left: -2000, top: -340, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="hillHazeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#354D62" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#4B6272" stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <path
        d="M-2000 80 L-2000 -110 Q-1650 -195 -1280 -125 Q-900 -210 -520 -130 Q-120 -205 260 -120 Q680 -215 1080 -130 Q1480 -195 2000 -115 L2000 80 Z"
        fill="url(#hillHazeGrad)"
      />
    </svg>
  );
};

/**
 * 2. DISTANT VILLAGE & TOWN SKYLINE (worldZ = 1350)
 * Houses with warm lit windows, pitched roofs, water tower, layered tree canopies.
 */
export const DistantVillageSkyline: React.FC = () => {
  return (
    <svg
      width={3800}
      height={540}
      viewBox="-1900 -430 3800 540"
      style={{ position: 'absolute', left: -1900, top: -430, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="farHazeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#263B4C" stopOpacity="0.94" />
          <stop offset="100%" stopColor="#3D5566" stopOpacity="0.98" />
        </linearGradient>
      </defs>

      {/* Distant tree canopy silhouette */}
      <path
        d="M-1900 45 L-1900 -95 Q-1760 -160 -1610 -100 Q-1450 -175 -1290 -90 Q-1120 -155 -960 -90 Q-800 -180 -630 -95 Q-470 -150 -310 -88 Q-150 -185 20 -95 Q180 -155 340 -88 Q520 -185 710 -95 Q890 -160 1070 -90 Q1260 -170 1450 -90 Q1650 -165 1900 -95 L1900 110 L-1900 110 Z"
        fill="url(#farHazeGrad)"
      />

      {/* Distant two-story & pitched-roof houses with warm lit windows */}
      {[
        { x: -1180, w: 125, h: 72, win: true },
        { x: -420, w: 105, h: 64, win: true },
        { x: 140, w: 130, h: 78, win: true },
        { x: 960, w: 115, h: 68, win: true },
      ].map((h, i) => (
        <g key={i} transform={`translate(${h.x}, ${-h.h - 20})`}>
          <rect x="0" y="16" width={h.w} height={h.h} fill="#283C4D" />
          <polygon points={`-10,18 ${h.w / 2},-8 ${h.w + 10},18`} fill="#1E2E3D" />
          {h.win && (
            <>
              <rect x="20" y="32" width="16" height="18" rx="1" fill="#F0B362" opacity="0.66" />
              <rect x={h.w - 38} y="32" width="16" height="18" rx="1" fill="#F0B362" opacity="0.48" />
            </>
          )}
        </g>
      ))}

      {/* Overhead municipal water tank */}
      <g transform="translate(-620, -255)" fill="#243749" opacity="0.9">
        <rect x="-40" y="0" width="80" height="50" rx="6" />
        <path d="M-44 0 L44 0 L34 -14 L-34 -14 Z" />
        <rect x="-30" y="50" width="6" height="125" />
        <rect x="24" y="50" width="6" height="125" />
        <rect x="-3" y="50" width="6" height="125" />
        <line x1="-28" y1="90" x2="28" y2="90" stroke="#243749" strokeWidth="4" />
        <line x1="-28" y1="132" x2="28" y2="132" stroke="#243749" strokeWidth="4" />
      </g>

      {/* Distant coconut palms */}
      {[-1340, -760, -240, 460, 1140].map((px, i) => (
        <g key={i} transform={`translate(${px}, -112)`} fill="#223545" opacity="0.86">
          <path d="M-4 42 Q2 -20 -3 -80 L3 -80 Q8 -20 4 42 Z" />
          <path d="M0 -80 Q-36 -98 -58 -74 Q-28 -82 0 -76 Z" />
          <path d="M0 -80 Q-20 -118 -46 -114 Q-18 -104 0 -76 Z" />
          <path d="M0 -80 Q28 -116 54 -106 Q24 -100 0 -76 Z" />
          <path d="M0 -80 Q42 -94 60 -70 Q28 -80 0 -76 Z" />
        </g>
      ))}
    </svg>
  );
};

/**
 * 3. FAR-MIDGROUND ROADSIDE STRUCTURES (worldZ = 620)
 * Nuanced olive-green monsoon foliage, weathered terracotta-tinted brick wall, warm tungsten tea-stall, secondary pole.
 */
export const FarMidgroundStreet: React.FC = () => {
  return (
    <svg
      width={3600}
      height={780}
      viewBox="-1800 -560 3600 780"
      style={{ position: 'absolute', left: -1800, top: -560, overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="stallTungstenGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFE9B8" stopOpacity="0.98" />
          <stop offset="30%" stopColor="#EDA147" stopOpacity="0.54" />
          <stop offset="100%" stopColor="#EDA147" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="brickWallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#47464A" />
          <stop offset="100%" stopColor="#2B2E35" />
        </linearGradient>
      </defs>

      {/* Nuanced olive-green monsoon trees behind wall & stall */}
      <path
        d="M-1700 10 Q-1550 -220 -1370 -125 Q-1210 -255 -1010 -140 Q-840 -215 -680 -105 L-680 40 L-1700 40 Z"
        fill="#1E352E"
      />
      <path
        d="M420 10 Q560 -225 750 -130 Q920 -250 1140 -135 Q1320 -215 1540 -115 L1540 40 L420 40 Z"
        fill="#213A31"
      />

      {/* Weathered brick compound wall on left with warm mortar tint */}
      <g transform="translate(-1020, -96)">
        <rect x="0" y="0" width="800" height="116" fill="url(#brickWallGrad)" />
        <rect x="-4" y="-10" width="808" height="14" fill="#54565C" />
        {[24, 48, 72, 96].map((by, idx) => (
          <line
            key={idx}
            x1="0"
            y1={by}
            x2="800"
            y2={by}
            stroke="#222328"
            strokeWidth="1.2"
            opacity="0.45"
          />
        ))}
        {[0, 260, 520, 780].map((bx, idx) => (
          <g key={idx} transform={`translate(${bx}, -20)`}>
            <rect x="-13" y="0" width="26" height="136" fill="#4C4F57" />
            <rect x="-17" y="-7" width="34" height="9" fill="#5D626B" />
          </g>
        ))}
        <path d="M90 12 L130 12 L120 75 L96 64 Z" fill="#234033" opacity="0.58" />
        <path d="M380 10 L430 10 L414 88 L392 78 Z" fill="#234033" opacity="0.52" />
      </g>

      {/* Detailed Roadside Tea Stall (warm narrative light source) */}
      <g transform="translate(-155, -186)">
        <rect x="0" y="26" width="286" height="180" fill="#2D343D" />
        <path d="M-26 32 L310 8 L318 28 L-22 48 Z" fill="#46515E" />
        <path d="M-26 32 L310 8 L312 13 L-24 37 Z" fill="#677585" opacity="0.72" />
        <rect x="28" y="64" width="170" height="86" fill="#664024" />
        <rect x="28" y="64" width="170" height="86" fill="#ED9E45" opacity="0.38" />
        <rect x="52" y="120" width="16" height="22" rx="3" fill="#3D2616" opacity="0.82" />
        <rect x="76" y="114" width="14" height="28" rx="2" fill="#3D2616" opacity="0.78" />
        <ellipse cx="145" cy="134" rx="14" ry="10" fill="#321F13" opacity="0.86" />
        <rect x="16" y="146" width="194" height="11" fill="#5E4330" />
        <line x1="114" y1="36" x2="114" y2="66" stroke="#181C22" strokeWidth="2.5" />
        <path d="M98 72 L130 72 L120 63 L108 63 Z" fill="#323B46" />
        <circle cx="114" cy="78" r="115" fill="url(#stallTungstenGlow)" />
        <circle cx="114" cy="76" r="6" fill="#FFF4D4" />
        <rect x="26" y="178" width="120" height="7" fill="#453428" />
        <rect x="36" y="185" width="7" height="20" fill="#2D221A" />
        <rect x="128" y="185" width="7" height="20" fill="#2D221A" />
      </g>

      {/* Secondary distant concrete pole receding down the road */}
      <g transform="translate(710, -400)">
        <path d="M-8 0 L8 0 L15 425 L-15 425 Z" fill="#475361" />
        <rect x="-44" y="34" width="88" height="7" fill="#343E4A" />
        <circle cx="-34" cy="28" r="4" fill="#8291A0" />
        <circle cx="0" cy="28" r="4" fill="#8291A0" />
        <circle cx="34" cy="28" r="4" fill="#8291A0" />
        <path d="M-34 28 Q260 65 560 32" fill="none" stroke="#252F3A" strokeWidth="1.8" opacity="0.65" />
      </g>
    </svg>
  );
};

/**
 * 4. WET ROADWAY, NATURAL PUDDLES & REFLECTIONS (worldZ = 40)
 * NO concentric radar rings in the puddle! Uses organic wet sheen, sky/lamp reflections, and secondary puddles.
 */
export const WetRoadwayPlane: React.FC<{
  arcIntensity?: number;
  showHazardZone?: number;
}> = ({ arcIntensity = 0, showHazardZone = 0 }) => {
  return (
    <svg
      width={3800}
      height={540}
      viewBox="-1900 -60 3800 540"
      style={{ position: 'absolute', left: -1900, top: -60, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="wetAsphaltGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232E3B" />
          <stop offset="32%" stopColor="#1A2430" />
          <stop offset="100%" stopColor="#101720" />
        </linearGradient>
        <linearGradient id="vergeGrassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22382F" />
          <stop offset="100%" stopColor="#182923" />
        </linearGradient>
        <radialGradient id="puddleSkyReflect" cx="0.48" cy="0.5" r="0.52">
          <stop offset="0%" stopColor="#5D829E" stopOpacity="0.56" />
          <stop offset="60%" stopColor="#2F4659" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#151E28" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="puddleArcReflect" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#EEF8FF" stopOpacity={0.85 * arcIntensity} />
          <stop offset="38%" stopColor="#72C4FF" stopOpacity={0.45 * arcIntensity} />
          <stop offset="100%" stopColor="#72C4FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="warmRoadReflect" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F2A84B" stopOpacity="0.30" />
          <stop offset="55%" stopColor="#C97B2E" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#C97B2E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="naturalHazardWash" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FF7A59" stopOpacity={0.32 * showHazardZone} />
          <stop offset="48%" stopColor="#F09D48" stopOpacity={0.18 * showHazardZone} />
          <stop offset="82%" stopColor="#E8C55A" stopOpacity={0.06 * showHazardZone} />
          <stop offset="100%" stopColor="#E8C55A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grassy/muddy roadside verge */}
      <rect x="-1900" y="-45" width="3800" height="75" fill="url(#vergeGrassGrad)" />

      {/* Concrete curb blocks */}
      <rect x="-1900" y="18" width="3800" height="15" fill="#46515E" />
      <rect x="-1900" y="31" width="3800" height="4" fill="#151C24" />
      {[-1400, -1000, -600, -200, 200, 600, 1000, 1400].map((cx, i) => (
        <line key={i} x1={cx} y1="18" x2={cx} y2="33" stroke="#222B36" strokeWidth="2" />
      ))}

      {/* Wet asphalt road surface */}
      <rect x="-1900" y="35" width="3800" height="445" fill="url(#wetAsphaltGrad)" />

      {/* Natural wet sheen bands & irregular secondary roadside puddles */}
      <ellipse cx="-260" cy="145" rx="540" ry="24" fill="#2F455C" opacity="0.22" />
      <ellipse cx="440" cy="195" rx="500" ry="20" fill="#2A3E52" opacity="0.20" />
      <path
        d="M-470 96 Q-435 79 -375 82 Q-310 78 -282 95 Q-305 113 -390 112 Q-452 110 -470 96 Z"
        fill="#111A23"
        opacity="0.76"
      />
      <path
        d="M-458 96 Q-426 82 -375 85 Q-320 82 -294 95 Q-316 109 -388 108 Q-442 106 -458 96 Z"
        fill="url(#puddleSkyReflect)"
        opacity="0.52"
      />
      <path
        d="M540 120 Q585 101 660 105 Q730 102 755 120 Q725 138 640 137 Q565 135 540 120 Z"
        fill="#111A23"
        opacity="0.68"
      />

      {/* Warm tea-stall reflection streak on wet road */}
      <ellipse cx="-80" cy="82" rx="135" ry="24" fill="url(#warmRoadReflect)" />

      {/* Faded wet road center markings */}
      {[-1100, -760, -420, -80, 260, 600, 940].map((mx, i) => (
        <polygon
          key={i}
          points={`${mx},176 ${mx + 150},176 ${mx + 142},185 ${mx - 8},185`}
          fill="#556270"
          opacity="0.34"
        />
      ))}

      {/* HERO RAINWATER PUDDLE (Irregular multi-lobed organic water pooling & environmental reflections) */}
      <g transform="translate(240, 58)">
        <path
          d="M-174 -4 Q-148 -32 -75 -31 Q-10 -40 65 -31 Q145 -34 176 -5 Q186 16 125 27 Q45 38 -35 31 Q-115 36 -160 18 Q-184 7 -174 -4 Z"
          fill="#0F1821"
        />
        <path
          d="M-160 -3 Q-138 -27 -72 -26 Q-10 -34 62 -26 Q134 -28 162 -4 Q170 13 118 22 Q45 31 -32 25 Q-108 30 -148 14 Q-168 6 -160 -3 Z"
          fill="url(#puddleSkyReflect)"
        />
        {/* Soft water-edge meniscus highlight */}
        <path
          d="M-142 13 Q-102 27 -30 23 Q48 29 122 20"
          fill="none"
          stroke="#6A8CA8"
          strokeWidth="1.2"
          opacity="0.28"
        />
        {/* Reflected utility pole silhouette & warm tea-stall light in water */}
        <rect x="78" y="-22" width="12" height="42" fill="#233342" opacity="0.45" />
        <ellipse cx="-68" cy="-3" rx="48" ry="9" fill="#E69B45" opacity="0.16" />
        {/* Dynamic electrical arc reflection in water */}
        {arcIntensity > 0.02 && (
          <ellipse cx="16" cy="-2" rx="128" ry="24" fill="url(#puddleArcReflect)" />
        )}
      </g>

      {/* Perspective-grounded safety boundary anchored to road plane (Shot 6) */}
      {showHazardZone > 0.02 && (
        <g transform="translate(270, 62)">
          <ellipse cx="0" cy="0" rx="400" ry="74" fill="url(#naturalHazardWash)" />
          <ellipse
            cx="0"
            cy="0"
            rx="402"
            ry="75"
            fill="none"
            stroke="#58C49E"
            strokeWidth="2.6"
            strokeDasharray="14 9"
            strokeDashoffset={((1 - showHazardZone) * 900).toFixed(1)}
            opacity={0.85 * Math.min(1, showHazardZone * 1.6)}
          />
        </g>
      )}
    </svg>
  );
};

/**
 * 5. HERO CONCRETE UTILITY POLE, TRANSFORMER & SNAPPED CONDUCTOR (worldZ = 80)
 */
export const HeroUtilityPole: React.FC<{
  frame: number;
}> = ({ frame }) => {
  const sway = Math.sin(frame * 0.055) * 6.5 + Math.cos(frame * 0.09) * 3;

  return (
    <svg
      width={1200}
      height={820}
      viewBox="-600 -680 1200 820"
      style={{ position: 'absolute', left: -600, top: -680, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="poleConcreteGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C8996" />
          <stop offset="42%" stopColor="#535F6C" />
          <stop offset="100%" stopColor="#2A323C" />
        </linearGradient>
        <linearGradient id="transformerBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5E6D7D" />
          <stop offset="52%" stopColor="#3E4B59" />
          <stop offset="100%" stopColor="#222A33" />
        </linearGradient>
      </defs>

      {/* Stay-wire / Guy wire */}
      <line x1="12" y1="-480" x2="215" y2="18" stroke="#3D4957" strokeWidth="3.5" />
      <rect
        x="85"
        y="-280"
        width="10"
        height="22"
        rx="4"
        transform="rotate(-22 90 -269)"
        fill="#7E5542"
      />
      <polygon points="200,22 232,22 226,4 206,4" fill="#4C5663" />

      {/* Main tapering concrete pole */}
      <polygon points="-10,-620 10,-620 22,12 -22,12" fill="url(#poleConcreteGrad)" />
      <rect x="-26" y="4" width="52" height="16" rx="2" fill="#404B59" />
      {[-520, -455, -390, -240, -175].map((sy, i) => (
        <rect
          key={i}
          x={i % 2 === 0 ? -24 : 11}
          y={sy}
          width="14"
          height="4"
          rx="1.5"
          fill="#262E37"
        />
      ))}

      {/* Upper steel cross-arm & porcelain insulators */}
      <g transform="translate(0, -545)">
        <line x1="-88" y1="8" x2="0" y2="62" stroke="#2D3742" strokeWidth="4.5" />
        <line x1="88" y1="8" x2="0" y2="62" stroke="#2D3742" strokeWidth="4.5" />
        <rect x="-118" y="-6" width="236" height="14" rx="2" fill="#42505E" />
        {[-95, 0, 95].map((ix, idx) => (
          <g key={idx} transform={`translate(${ix}, -6)`}>
            <rect x="-3" y="-22" width="6" height="22" fill="#2A323B" />
            <ellipse cx="0" cy="-18" rx="11" ry="4.5" fill="#875A47" />
            <ellipse cx="0" cy="-24" rx="9" ry="4" fill="#996953" />
            <ellipse cx="0" cy="-29" rx="6" ry="3.5" fill="#AD7860" />
          </g>
        ))}
      </g>

      {/* Pole-mounted Distribution Transformer */}
      <g transform="translate(-52, -370)">
        <rect x="-6" y="16" width="112" height="9" fill="#28313B" />
        <rect x="-6" y="88" width="112" height="9" fill="#28313B" />
        <rect x="6" y="0" width="88" height="114" rx="4" fill="url(#transformerBody)" />
        {[16, 28, 40, 52, 64, 76].map((fx, i) => (
          <rect key={i} x={fx} y="14" width="5" height="86" fill="#222B34" />
        ))}
        <rect x="2" y="-6" width="96" height="8" rx="2" fill="#6B7A8A" />
        {[24, 50, 76].map((bx, i) => (
          <g key={i} transform={`translate(${bx}, -6)`}>
            <rect x="-4" y="-20" width="8" height="20" fill="#855A47" />
            <circle cx="0" cy="-22" r="3.5" fill="#B2BFCC" />
          </g>
        ))}
        <rect x="34" y="42" width="32" height="22" rx="2" fill="#CF8C34" opacity="0.92" />
        <polygon points="50,46 57,59 43,59" fill="#1C2229" />
      </g>

      {/* Intact Overhead Conductors */}
      <path d="M0 -580 Q190 -530 375 -565" fill="none" stroke="#222B35" strokeWidth="3" />
      <path d="M95 -580 Q285 -520 480 -555" fill="none" stroke="#222B35" strokeWidth="3" />
      <path d="M0 -580 Q-260 -520 -580 -555" fill="none" stroke="#222B35" strokeWidth="3" />

      {/* SNAPPED LIVE CONDUCTOR dangling from left insulator down to curb */}
      <path
        d={`M-95 -580 C-145 -410, ${-132 + sway * 0.4} -210, ${-98 + sway * 0.5} -65 C${-84 + sway * 0.3} -10, -86 14, -82 26`}
        fill="none"
        stroke="#1C242D"
        strokeWidth="4.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * 5B. REALISTIC FALLEN POWER CABLE & SUBTLE PUDDLE ARC (worldZ = 38)
 * Recognisable long insulated conductor snaking across wet asphalt & puddle, frayed sheath,
 * twisted metallic core strands, and subtle organic electrical reflection (NO cartoon star icon).
 */
export const SnappedWirePuddleArc: React.FC<{
  frame: number;
  arcIntensity: number;
}> = ({ frame, arcIntensity }) => {
  const microArc = Math.sin(frame * 1.9) * 3.5;

  return (
    <svg
      width={320}
      height={200}
      viewBox="-100 -100 320 200"
      style={{ position: 'absolute', left: -100, top: -100, overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="puddleContactArcGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#D6F0FF" stopOpacity={0.78 * arcIntensity} />
          <stop offset="40%" stopColor="#5EB8FF" stopOpacity={0.34 * arcIntensity} />
          <stop offset="100%" stopColor="#2B8CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Contact shadow of fallen cable resting on wet asphalt & puddle */}
      <path
        d="M-6 -26 C-2 -6, 8 7, 32 6 C60 5, 80 16, 112 12"
        fill="none"
        stroke="#0B1118"
        strokeWidth="8.5"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Main heavy black insulated overhead conductor snaking naturally across road */}
      <path
        d="M-6 -28 C-2 -8, 8 4, 32 3 C60 2, 80 13, 112 9"
        fill="none"
        stroke="#1A222B"
        strokeWidth="5.8"
        strokeLinecap="round"
      />
      {/* Wet specular highlight along top ridge of cable */}
      <path
        d="M-5 -27 C-1 -8, 8 3, 32 2 C60 1, 80 12, 110 8"
        fill="none"
        stroke="#4D6073"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Frayed PVC insulation collar at snapped end */}
      <path d="M106 6 L114 7 L112 13 L104 12 Z" fill="#28313C" />

      {/* Exposed twisted metallic conductor strands resting in water */}
      <path d="M112 9 L126 11 L136 9" fill="none" stroke="#DF9248" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M113 11 L128 15 L139 14" fill="none" stroke="#B46825" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M114 7 L125 6" fill="none" stroke="#F2B46E" strokeWidth="1.4" strokeLinecap="round" />

      {/* Subtle realistic electrical illumination & micro-filament on water surface */}
      {arcIntensity > 0.04 && (
        <g transform="translate(126, 11)">
          <ellipse cx="0" cy="2" rx="44" ry="14" fill="url(#puddleContactArcGlow)" />
          <path
            d={`M-4 0 L${4 + microArc * 0.5} -5 L${11 - microArc * 0.4} 2`}
            fill="none"
            stroke="#E3F5FF"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity={arcIntensity * 0.9}
          />
          <circle cx="2" cy="0" r={2.4 + arcIntensity * 1.6} fill="#FFFFFF" opacity={arcIntensity * 0.92} />
        </g>
      )}
    </svg>
  );
};

/**
 * 6B. EXTREME FOREGROUND PLANE (worldZ = -460)
 * Moves ~4x faster than distant background during camera tracking for unmistakable 3D parallax.
 */
export const ExtremeForegroundEdge: React.FC<{
  frame: number;
}> = ({ frame }) => {
  const sway = Math.sin(frame * 0.052) * 1.8;
  return (
    <svg
      width={1800}
      height={220}
      viewBox="-900 -120 1800 220"
      style={{ position: 'absolute', left: -900, top: -120, overflow: 'visible' }}
    >
      {/* Low roadside verge grass tufts & weathered kerb stones passing fast across bottom edge */}
      <g transform={`translate(-380, 0) rotate(${sway.toFixed(2)} 0 80)`} fill="#14231E">
        <path d="M-32 80 Q-42 20 -58 -15 Q-26 24 -16 80 Z" />
        <path d="M-12 80 Q-8 10 -14 -32 Q6 18 4 80 Z" />
        <path d="M6 80 Q24 22 44 -10 Q28 36 22 80 Z" />
      </g>
      <g transform={`translate(240, 10) rotate(${(-sway * 0.8).toFixed(2)} 0 80)`} fill="#12201B">
        <path d="M-24 80 Q-30 28 -44 -5 Q-18 32 -8 80 Z" />
        <path d="M0 80 Q14 18 28 -18 Q20 34 16 80 Z" />
      </g>
    </svg>
  );
};

/**
 * 6. NEAR-CAMERA FOREGROUND ELEMENTS (worldZ = -295 to -330)
 * Detailed roadside wild fern/shrub cluster & striped concrete bollard with natural olive-moss shading.
 */
export const ForegroundFoliageAndCulvert: React.FC<{
  frame: number;
  variant: 'left-shrub' | 'right-bollard';
}> = ({ frame, variant }) => {
  const wind = Math.sin(frame * 0.048) * 2.2;

  if (variant === 'right-bollard') {
    return (
      <svg
        width={240}
        height={360}
        viewBox="-120 -260 240 360"
        style={{ position: 'absolute', left: -120, top: -260, overflow: 'visible' }}
      >
        <path d="M-32 100 L-28 -125 Q0 -152 28 -125 L32 100 Z" fill="#202A36" />
        <path d="M-28 -125 Q0 -150 0 -150 L0 100 L-32 100 Z" fill="#324050" opacity="0.55" />
        <rect x="-29" y="-92" width="58" height="16" fill="#D4933D" opacity="0.72" />
        <rect x="-29" y="-76" width="58" height="14" fill="#141B24" opacity="0.82" />
        <path d="M-58 100 Q-48 30 -68 -10 Q-34 38 -30 100 Z" fill="#192D25" />
        <path d="M24 100 Q42 35 64 0 Q44 52 40 100 Z" fill="#192D25" />
      </svg>
    );
  }

  return (
    <svg
      width={360}
      height={320}
      viewBox="-180 -220 360 320"
      style={{ position: 'absolute', left: -180, top: -220, overflow: 'visible' }}
    >
      {/* Low concrete drainage curb stone at base */}
      <polygon points="-95,100 -80,55 85,55 95,100" fill="#222C36" />
      <polygon points="-80,55 85,55 80,64 -76,64" fill="#384757" />

      {/* Multi-layered wild roadside fern/grass blades (nuanced olive-green, NOT oversized flat circles) */}
      <g transform={`rotate(${wind.toFixed(2)} 0 70)`}>
        <path d="M-55 72 Q-72 -15 -105 -85 Q-56 -22 -36 72 Z" fill="#1B3228" />
        <path d="M-32 72 Q-35 -35 -52 -118 Q-14 -40 -14 72 Z" fill="#244235" />
        <path d="M-10 72 Q8 -28 24 -102 Q24 -22 10 72 Z" fill="#2A4D3E" />
        <path d="M14 72 Q46 -5 84 -68 Q52 8 30 72 Z" fill="#1E382D" />
        <path d="M32 72 Q78 20 112 -18 Q76 38 48 72 Z" fill="#172B23" />
      </g>
    </svg>
  );
};

/**
 * 7. MONSOON RAIN OVERLAY
 */
export const MonsoonRainOverlay: React.FC<{
  frame: number;
  density?: number;
}> = ({ frame, density = 26 }) => {
  const drops = React.useMemo(() => {
    return Array.from({ length: density }, (_, i) => ({
      x: ((i * 173) % 1980) - 30,
      yOffset: (i * 251) % 1180,
      speed: 22 + (i % 5) * 5,
      len: 26 + (i % 4) * 14,
      opacity: 0.1 + (i % 3) * 0.05,
    }));
  }, [density]);

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {drops.map((d, i) => {
        const y = ((d.yOffset + frame * d.speed) % 1200) - 80;
        const x = ((d.x - frame * (d.speed * 0.22)) % 2000 + 2000) % 2000 - 40;
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x - d.len * 0.22}
            y2={y + d.len}
            stroke="#A8C6DF"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={d.opacity}
          />
        );
      })}
    </svg>
  );
};
