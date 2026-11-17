import React from 'react';

/**
 * Massive Rogue Planet with Nitrogen Ice Sheets & Atmospheric Rim
 */
export const RoguePlanetSphere: React.FC<{
  x: number;
  y: number;
  radius?: number;
  glowColor?: string;
  rotation?: number;
}> = ({ x, y, radius = 240, glowColor = '#22D7DA', rotation = 0 }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Outer Atmospheric Haze */}
      <circle cx="0" cy="0" r={radius + 18} fill="none" stroke={glowColor} strokeWidth="3" opacity="0.35" />
      <circle cx="0" cy="0" r={radius + 8} fill="none" stroke={glowColor} strokeWidth="6" opacity="0.6" />

      {/* Main Dark Planetary Body */}
      <circle cx="0" cy="0" r={radius} fill="#09134B" />

      {/* Nitrogen Ice Continents & Craters rotating */}
      <g transform={`rotate(${rotation})`}>
        <path
          d={`M ${-radius * 0.7} ${-radius * 0.3} Q ${-radius * 0.2} ${-radius * 0.6} ${radius * 0.4} ${-radius * 0.5} Q ${radius * 0.7} 0 ${radius * 0.2} ${radius * 0.6} Q ${-radius * 0.4} ${radius * 0.5} ${-radius * 0.7} ${-radius * 0.3} Z`}
          fill="#8CAAF7"
          opacity="0.32"
        />
        <circle cx={-radius * 0.35} cy={radius * 0.2} r={radius * 0.14} fill="#180A59" stroke="#8CAAF7" strokeWidth="2" opacity="0.4" />
        <circle cx={radius * 0.3} cy={-radius * 0.25} r={radius * 0.09} fill="#180A59" stroke="#8CAAF7" strokeWidth="1.5" opacity="0.4" />
      </g>

      {/* Right Shadow Crescent (Unlit Interstellar Darkness) */}
      <path
        d={`M 0 ${-radius} A ${radius} ${radius} 0 0 1 0 ${radius} A ${radius * 0.4} ${radius} 0 0 0 0 ${-radius} Z`}
        fill="#05071A"
        opacity="0.75"
      />
    </g>
  );
};

/**
 * Solar System Clockwork Orbits with Glowing Sun
 */
export const SolarClockworkRings: React.FC<{
  x: number;
  y: number;
  scale?: number;
  time?: number;
}> = ({ x, y, scale = 1, time = 0 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Sun */}
      <circle cx="0" cy="0" r="48" fill="#FFD244" />
      <circle cx="0" cy="0" r="62" fill="rgba(255, 210, 68, 0.25)" />

      {/* Concentric Orbits & Miniature Planets */}
      {[
        { r: 110, pSize: 7, pColor: '#8CAAF7', speed: 1.2 },
        { r: 175, pSize: 11, pColor: '#FF851D', speed: 0.9 },
        { r: 245, pSize: 12, pColor: '#22D7DA', speed: 0.65 },
        { r: 330, pSize: 22, pColor: '#ED4BA4', speed: 0.4 },
        { r: 420, pSize: 18, pColor: '#F59E0B', speed: 0.28 },
      ].map((orbit, i) => {
        const ang = (time * orbit.speed + i * 55) * (Math.PI / 180);
        const px = Math.cos(ang) * orbit.r;
        const py = Math.sin(ang) * (orbit.r * 0.42); // perspective ellipse
        return (
          <g key={i}>
            <ellipse cx="0" cy="0" rx={orbit.r} ry={orbit.r * 0.42} fill="none" stroke="#243CDB" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />
            <circle cx={px} cy={py} r={orbit.pSize} fill={orbit.pColor} stroke="#09134B" strokeWidth="2" />
          </g>
        );
      })}
    </g>
  );
};

/**
 * Cross-Section Cutaway: Ice Crust, Liquid Ocean & Glowing Radioactive Core
 */
export const PlanetCrossSection: React.FC<{
  x: number;
  y: number;
  scale?: number;
  corePulse?: number;
}> = ({ x, y, scale = 1, corePulse = 0 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Outer Shell */}
      <circle cx="0" cy="0" r="320" fill="#09134B" stroke="#243CDB" strokeWidth="4" />

      {/* Nitrogen Ice Crust Layer (15-30 miles deep) */}
      <circle cx="0" cy="0" r="320" fill="none" stroke="#8CAAF7" strokeWidth="42" opacity="0.85" />
      {/* Ice Fractures & Fissures */}
      {[-80, -30, 20, 75, 140].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = Math.cos(rad) * 299;
        const y1 = Math.sin(rad) * 299;
        const x2 = Math.cos(rad) * 341;
        const y2 = Math.sin(rad) * 341;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#09134B" strokeWidth="3" />;
      })}

      {/* Liquid Water / Hydrocarbon Ocean Layer */}
      <circle cx="0" cy="0" r="278" fill="#180A59" />
      {/* Ocean Convection Currents */}
      <circle cx="0" cy="0" r="220" fill="none" stroke="#22D7DA" strokeWidth="18" strokeDasharray="22 14" opacity="0.45" />

      {/* Molten Silicate Mantle & Iron Core */}
      <circle cx="0" cy="0" r="140" fill="#7C2D12" stroke="#FF851D" strokeWidth="4" />
      {/* Glowing Radioactive Iron Core */}
      <circle cx="0" cy="0" r={80 + Math.sin(corePulse) * 8} fill="rgba(255, 133, 29, 0.4)" />
      <circle cx="0" cy="0" r="72" fill="#FF851D" stroke="#FFD244" strokeWidth="3" />
      <circle cx="0" cy="0" r="38" fill="#FFD244" />

      {/* Thermal Convection Plumes Rising to Ice */}
      {[0, 60, 120, 180, 240, 300].map((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <g key={idx} transform={`rotate(${deg})`}>
            <path
              d="M 0 -80 Q -18 -160 0 -240 Q 18 -160 0 -80"
              fill="rgba(255, 133, 29, 0.35)"
            />
            <circle cx="0" cy={-160 - (corePulse * 30) % 80} r="5" fill="#FFD244" />
          </g>
        );
      })}
    </g>
  );
};

/**
 * Deep-Sea Hydrothermal Vent Chimney ("Black Smoker")
 */
export const HydrothermalVent: React.FC<{
  x: number;
  y: number;
  scale?: number;
  frame?: number;
}> = ({ x, y, scale = 1, frame = 0 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Basalt Chimney */}
      <polygon points="-35,160 -18,-90 18,-90 35,160" fill="#180A59" stroke="#243CDB" strokeWidth="3" />
      <line x1="-8" y1="-90" x2="-14" y2="160" stroke="#09134B" strokeWidth="4" />
      <line x1="8" y1="-90" x2="14" y2="160" stroke="#33B9D7" strokeWidth="2.5" opacity="0.6" />

      {/* Vent Orifice Heat Glow */}
      <ellipse cx="0" cy="-90" rx="22" ry="8" fill="#FF851D" stroke="#FFD244" strokeWidth="2.5" />

      {/* Erupting Mineral Thermal Plume & Bubbles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const bubbleY = -90 - ((frame * 2.2 + i * 28) % 180);
        const swayX = Math.sin((frame * 0.15 + i)) * 14;
        const bSize = 4 + (i % 3) * 3;
        return (
          <circle
            key={i}
            cx={swayX}
            cy={bubbleY}
            r={bSize}
            fill={i % 2 === 0 ? '#22D7DA' : '#FFD244'}
            opacity={0.75 - Math.abs(bubbleY + 90) / 240}
          />
        );
      })}
    </g>
  );
};

/**
 * Bioluminescent Extremophile Jellyfish Creature
 */
export const BioluminescentJellyfish: React.FC<{
  x: number;
  y: number;
  scale?: number;
  frame?: number;
}> = ({ x, y, scale = 1, frame = 0 }) => {
  const pulse = Math.sin(frame * 0.14) * 0.12;
  const tentacleWave = Math.sin(frame * 0.22) * 12;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale * (1 + pulse)}, ${scale * (1 - pulse)})`}>
      {/* Bioluminescent Outer Halo */}
      <circle cx="0" cy="0" r="38" fill="rgba(34, 215, 218, 0.25)" />

      {/* Translucent Cyan Bell */}
      <path
        d="M -26 12 C -28 -28, 28 -28, 26 12 Q 0 4 -26 12 Z"
        fill="#22D7DA"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        opacity="0.85"
      />
      {/* Bell Core Organ */}
      <ellipse cx="0" cy="-6" rx="10" ry="12" fill="#FF851D" opacity="0.9" />

      {/* Trailing Tendrils / Tentacles */}
      {[-16, -6, 6, 16].map((tx, idx) => (
        <path
          key={idx}
          d={`M ${tx} 12 Q ${tx + tentacleWave * (idx % 2 === 0 ? 1 : -1)} 45 ${tx} 85`}
          fill="none"
          stroke="#22D7DA"
          strokeWidth="2"
          opacity="0.75"
        />
      ))}
    </g>
  );
};

