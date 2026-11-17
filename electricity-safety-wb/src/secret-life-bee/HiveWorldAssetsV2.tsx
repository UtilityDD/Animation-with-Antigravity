import React from 'react';
import { interpolate } from 'remotion';

/**
 * Continuous Hive Entrance Tunnel:
 * Creates the sensation of flying right through the narrow wooden hive entrance
 * into the warm amber interior.
 */
export const HiveEntranceTunnel: React.FC<{
  progress: number; // 0 = outside entrance, 1 = inside hive
}> = ({ progress }) => {
  if (progress <= 0.01 || progress >= 0.99) return null;

  const scale = interpolate(progress, [0, 0.5, 1], [0.55, 1.45, 3.8]);
  const alpha = interpolate(progress, [0, 0.15, 0.8, 1], [0, 0.96, 0.9, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: alpha,
        transform: `scale(${scale})`,
        transformOrigin: '50% 50%',
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="entranceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE184" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#B85E12" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#1D0B02" stopOpacity="0.98" />
          </radialGradient>
        </defs>
        {/* Dark timber hive entrance frame surrounding a glowing amber slot */}
        <path
          d="M0,0 L1920,0 L1920,1080 L0,1080 Z M540,420 C540,380 1380,380 1380,420 L1380,660 C1380,700 540,700 540,660 Z"
          fill="#261104"
          fillRule="evenodd"
        />
        <rect x="540" y="395" width="840" height="290" rx="28" fill="url(#entranceGlow)" opacity="0.55" />
      </svg>
    </div>
  );
};

/**
 * Multi-layered 2.5D Honeycomb Wall V2 with unique clipPath IDs per layer,
 * organic wax color variation, translucent nectar/honey meniscus, and progressive wax capping.
 */
export const HoneycombWallLayerV2: React.FC<{
  layerId: string;
  frame: number;
  cols?: number;
  rows?: number;
  radius?: number;
  fillProgress?: number; // 0..1
  capProgress?: number; // 0..1
}> = ({
  layerId,
  frame,
  cols = 11,
  rows = 6,
  radius = 54,
  fillProgress = 0.45,
  capProgress = 0,
}) => {
  const dx = radius * 1.76;
  const dy = radius * 1.52;

  const cells = React.useMemo(() => {
    const arr: Array<{
      col: number;
      row: number;
      cx: number;
      cy: number;
      baseFill: number;
      cappedBase: boolean;
      delay: number;
      tint: number;
    }> = [];
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
          baseFill: seed > 11 ? 0.78 : seed > 5 ? 0.32 : 0.08,
          cappedBase: seed >= 15,
          delay: ((r * cols + c) % 9) * 0.08,
          tint: (seed % 5) * 0.04,
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
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${layerId}-waxRim`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAD475" />
          <stop offset="50%" stopColor="#D98D22" />
          <stop offset="100%" stopColor="#8A430B" />
        </linearGradient>
        <radialGradient id={`${layerId}-cellEmpty`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#5C2A07" />
          <stop offset="75%" stopColor="#381604" />
          <stop offset="100%" stopColor="#220C02" />
        </radialGradient>
        <linearGradient id={`${layerId}-honeyLiq`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE46E" />
          <stop offset="35%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#B8560A" />
        </linearGradient>
        <linearGradient id={`${layerId}-waxCap`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7DC" />
          <stop offset="60%" stopColor="#EED086" />
          <stop offset="100%" stopColor="#C49340" />
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
        const shimmerAlpha = 0.28 + 0.16 * Math.sin(frame * 0.08 + cell.col * 0.9 + cell.row);

        const innerR = radius * 0.86;
        const fillH = innerR * 1.95 * localFill;
        const fillY = cell.cy + innerR - fillH;
        const clipId = `${layerId}-clip-${cell.row}-${cell.col}`;

        return (
          <g key={clipId}>
            <polygon
              points={hexPoints(cell.cx, cell.cy, radius)}
              fill={`url(#${layerId}-waxRim)`}
              stroke="#632D06"
              strokeWidth={2.5}
              opacity={1 - cell.tint}
            />
            <polygon points={hexPoints(cell.cx, cell.cy, innerR)} fill={`url(#${layerId}-cellEmpty)`} />

            {localFill > 0.03 && (
              <g>
                <clipPath id={clipId}>
                  <polygon points={hexPoints(cell.cx, cell.cy, innerR - 1)} />
                </clipPath>
                <g clipPath={`url(#${clipId})`}>
                  <rect
                    x={cell.cx - innerR}
                    y={fillY}
                    width={innerR * 2}
                    height={fillH + 4}
                    fill={`url(#${layerId}-honeyLiq)`}
                  />
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

            {localCap > 0.02 && (
              <g
                transform={`translate(${cell.cx}, ${cell.cy}) scale(${0.2 + 0.8 * localCap}) translate(${-cell.cx}, ${-cell.cy})`}
                opacity={localCap}
              >
                <polygon
                  points={hexPoints(cell.cx, cell.cy, innerR * 0.96)}
                  fill={`url(#${layerId}-waxCap)`}
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
