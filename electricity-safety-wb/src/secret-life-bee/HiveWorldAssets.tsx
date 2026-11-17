import React from 'react';

/**
 * Warm organic interior hive backdrop with soft candle-amber volumetric glow
 * and subtle floating golden wax/pollen dust.
 */
export const HiveInteriorBackdrop: React.FC<{ frame: number; warmth?: number }> = ({
  frame,
  warmth = 1,
}) => {
  const pulse = 0.94 + 0.06 * Math.sin(frame * 0.035);
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        <radialGradient id="hiveCoreGlow" cx="54%" cy="46%" r="68%">
          <stop offset="0%" stopColor={`rgba(255, 214, 112, ${0.95 * warmth})`} />
          <stop offset="32%" stopColor="#D97E18" />
          <stop offset="68%" stopColor="#7C3A0C" />
          <stop offset="100%" stopColor="#3B1805" />
        </radialGradient>
        <linearGradient id="hiveBeam" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFE9A3" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#F5A623" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={1920} height={1080} fill="url(#hiveCoreGlow)" />

      {/* Organic carved hive cavity framing silhouettes */}
      <path
        d="M0,0 L1920,0 L1920,180 C1620,120 1320,210 980,150 C640,95 310,190 0,140 Z"
        fill="#2E1204"
        opacity={0.62}
      />
      <path
        d="M0,1080 L1920,1080 L1920,910 C1580,985 1280,880 960,940 C640,995 310,895 0,945 Z"
        fill="#2A1003"
        opacity={0.74}
      />

      {/* Soft entrance light shafts */}
      <g opacity={pulse}>
        <polygon points="150,0 520,0 1080,1080 560,1080" fill="url(#hiveBeam)" />
        <polygon points="620,0 880,0 1420,1080 1020,1080" fill="url(#hiveBeam)" opacity={0.65} />
      </g>
    </svg>
  );
};

interface HexCellData {
  col: number;
  row: number;
  cx: number;
  cy: number;
  baseFill: number; // 0..1
  cappedBase: boolean;
  delay: number;
}

/**
 * 2.5D Shaded Honeycomb Wall with dynamic honey filling, specular liquid meniscus,
 * and progressive beeswax capping.
 */
export const HoneycombWallLayer: React.FC<{
  frame: number;
  cols?: number;
  rows?: number;
  radius?: number;
  fillProgress?: number; // 0..1 animates cells filling with golden honey
  capProgress?: number; // 0..1 animates cells sealing with cream wax caps
  shimmer?: boolean;
}> = ({
  frame,
  cols = 11,
  rows = 6,
  radius = 56,
  fillProgress = 0.5,
  capProgress = 0,
  shimmer = true,
}) => {
  const dx = radius * 1.76;
  const dy = radius * 1.52;

  const cells: HexCellData[] = React.useMemo(() => {
    const arr: HexCellData[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * dx + (r % 2 === 1 ? dx * 0.5 : 0) + radius + 20;
        const cy = r * dy + radius + 20;
        const seed = (r * 13 + c * 7) % 17;
        arr.push({
          col: c,
          row: r,
          cx,
          cy,
          baseFill: seed > 11 ? 0.85 : seed > 5 ? 0.35 : 0.1,
          cappedBase: seed >= 14,
          delay: ((r * cols + c) % 9) * 0.08,
        });
      }
    }
    return arr;
  }, [cols, rows, dx, dy, radius]);

  const width = cols * dx + dx + 40;
  const height = rows * dy + radius * 2 + 40;

  const hexPoints = (cx: number, cy: number, rad: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i - 30);
      pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="waxRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8CF6D" />
          <stop offset="50%" stopColor="#D78B22" />
          <stop offset="100%" stopColor="#8E470C" />
        </linearGradient>
        <radialGradient id="cellEmptyGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#5C2B08" />
          <stop offset="75%" stopColor="#3B1804" />
          <stop offset="100%" stopColor="#260E02" />
        </radialGradient>
        <linearGradient id="honeyLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="35%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#B8560A" />
        </linearGradient>
        <linearGradient id="waxCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF6D6" />
          <stop offset="60%" stopColor="#F0D28A" />
          <stop offset="100%" stopColor="#C99A45" />
        </linearGradient>
      </defs>

      {cells.map((cell) => {
        const localFill = Math.max(
          cell.baseFill,
          Math.min(1, (fillProgress - cell.delay * 0.45) / 0.65)
        );
        const localCap = cell.cappedBase
          ? 1
          : Math.max(0, Math.min(1, (capProgress - cell.delay * 0.5) / 0.5));
        const shimmerAlpha = shimmer
          ? 0.28 + 0.16 * Math.sin(frame * 0.08 + cell.col * 0.9 + cell.row)
          : 0.25;

        const innerR = radius * 0.86;
        const fillH = innerR * 1.95 * localFill;
        const fillY = cell.cy + innerR - fillH;

        return (
          <g key={`${cell.row}-${cell.col}`}>
            {/* Outer beveled wax wall */}
            <polygon
              points={hexPoints(cell.cx, cell.cy, radius)}
              fill="url(#waxRimGrad)"
              stroke="#6B3107"
              strokeWidth={2.5}
            />
            {/* Deep shaded inner cavity */}
            <polygon
              points={hexPoints(cell.cx, cell.cy, innerR)}
              fill="url(#cellEmptyGrad)"
            />
            {/* Clipped liquid honey inside cell */}
            {localFill > 0.03 && (
              <g>
                <clipPath id={`clip-${cell.row}-${cell.col}`}>
                  <polygon points={hexPoints(cell.cx, cell.cy, innerR - 1)} />
                </clipPath>
                <g clipPath={`url(#clip-${cell.row}-${cell.col})`}>
                  <rect
                    x={cell.cx - innerR}
                    y={fillY}
                    width={innerR * 2}
                    height={fillH + 4}
                    fill="url(#honeyLiquidGrad)"
                  />
                  {/* Curved specular meniscus highlight */}
                  <ellipse
                    cx={cell.cx - innerR * 0.15}
                    cy={fillY + 5}
                    rx={innerR * 0.55}
                    ry={5}
                    fill="#FFF7C8"
                    opacity={shimmerAlpha}
                  />
                </g>
              </g>
            )}

            {/* Progressive cream beeswax cap */}
            {localCap > 0.02 && (
              <g
                transform={`translate(${cell.cx}, ${cell.cy}) scale(${0.2 + 0.8 * localCap}) translate(${-cell.cx}, ${-cell.cy})`}
                opacity={localCap}
              >
                <polygon
                  points={hexPoints(cell.cx, cell.cy, innerR * 0.96)}
                  fill="url(#waxCapGrad)"
                  stroke="#D9B05B"
                  strokeWidth={1.8}
                />
                <circle
                  cx={cell.cx - innerR * 0.22}
                  cy={cell.cy - innerR * 0.22}
                  r={innerR * 0.22}
                  fill="#FFFFFF"
                  opacity={0.28}
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Glossy, viscous golden honey drip & pour with falling droplets.
 */
export const ViscousHoneyPour: React.FC<{
  frame: number;
  flowIntensity?: number; // 0..1
}> = ({ frame, flowIntensity = 1 }) => {
  const stretch = 1 + 0.08 * Math.sin(frame * 0.12);
  const dropY = ((frame * 3.8) % 150) * flowIntensity;
  const dropOpacity = flowIntensity * Math.max(0, 1 - dropY / 150);

  return (
    <svg width={180} height={280} viewBox="0 0 180 280" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="viscousHoney" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE87C" />
          <stop offset="45%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#C45E08" />
        </linearGradient>
      </defs>
      <g opacity={flowIntensity}>
        {/* Thick viscous ribbon */}
        <path
          d={`M76,0 C74,40 84,80 86,${120 * stretch} C88,${148 * stretch} 98,${158 * stretch} 90,${172 * stretch} C82,${158 * stretch} 74,${144 * stretch} 72,${110 * stretch} C70,70 62,38 64,0 Z`}
          fill="url(#viscousHoney)"
        />
        {/* Specular highlight streak */}
        <path
          d={`M71,12 C70,45 77,82 79,${118 * stretch}`}
          stroke="#FFF9D6"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          opacity={0.75}
        />
        {/* Falling honey droplet */}
        <g transform={`translate(84, ${165 + dropY})`} opacity={dropOpacity}>
          <path
            d="M0,-14 C6,-4 10,4 10,10 C10,16 5.5,20 0,20 C-5.5,20 -10,16 -10,10 C-10,4 -6,-4 0,-14 Z"
            fill="url(#viscousHoney)"
          />
          <ellipse cx={-3} cy={8} rx={2.5} ry={4.5} fill="#FFF8D2" opacity={0.85} />
        </g>
      </g>
    </svg>
  );
};

/**
 * Translucent warm airflow ribbons & rising moisture shimmer during wing-fanning evaporation.
 */
export const EvaporationAirflow: React.FC<{ frame: number; intensity?: number }> = ({
  frame,
  intensity = 1,
}) => {
  const shift = (frame * 4.5) % 120;
  return (
    <svg width={520} height={260} viewBox="0 0 520 260" style={{ overflow: 'visible' }}>
      <g opacity={intensity * 0.72}>
        {[0, 1, 2].map((i) => {
          const yOff = 60 + i * 52;
          const phase = (shift + i * 38) % 120;
          return (
            <g key={i} transform={`translate(${phase * 0.8}, 0)`}>
              <path
                d={`M20,${yOff} Q140,${yOff - 24} 260,${yOff + 4} T460,${yOff - 10}`}
                fill="none"
                stroke="#FFF4CC"
                strokeWidth={3.5 - i * 0.5}
                strokeLinecap="round"
                strokeDasharray="36 22"
                opacity={0.55}
              />
            </g>
          );
        })}
        {/* Rising water-vapor shimmer droplets */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = 110 + i * 34;
          const y = 210 - ((frame * 2.1 + i * 27) % 180);
          const alpha = Math.sin(((210 - y) / 180) * Math.PI) * 0.7;
          return (
            <circle
              key={i}
              cx={x + Math.sin(frame * 0.08 + i) * 8}
              cy={y}
              r={3 + (i % 2) * 1.5}
              fill="#E6FAFF"
              opacity={alpha * intensity}
            />
          );
        })}
      </g>
    </svg>
  );
};

