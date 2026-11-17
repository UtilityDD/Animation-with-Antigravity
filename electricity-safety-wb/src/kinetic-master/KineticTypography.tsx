import React from 'react';
import { interpolate } from 'remotion';

// Mathematical cubic bezier solver (zero external dependencies)
export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    let u = t;
    for (let i = 0; i < 6; i++) {
      const currentX =
        3 * (1 - u) * (1 - u) * u * p1x +
        3 * (1 - u) * u * u * p2x +
        u * u * u;
      const dx =
        3 * (1 - u) * (1 - u) * p1x +
        6 * (1 - u) * u * (p2x - p1x) +
        3 * u * u * (1 - p2x);
      if (Math.abs(dx) < 1e-6) break;
      u -= (currentX - t) / dx;
      u = Math.max(0, Math.min(1, u));
    }

    return (
      3 * (1 - u) * (1 - u) * u * p1y +
      3 * (1 - u) * u * u * p2y +
      u * u * u
    );
  };
}

// Snappy kinetic curves
export const punchyEase = cubicBezier(0.12, 1, 0.2, 1);
export const popOvershoot = cubicBezier(0.34, 1.56, 0.64, 1);
export const anticipatory = cubicBezier(0.65, -0.35, 0.25, 1.25);
export const cameraSmooth = cubicBezier(0.35, 0, 0.15, 1);

// Damped harmonic oscillator for organic settling
export function dampedSpring(frame: number, startFrame: number, amp = 10, decay = 0.14, freq = 0.4): number {
  const t = frame - startFrame;
  if (t < 0) return 0;
  return amp * Math.exp(-decay * t) * Math.sin(freq * t);
}

interface KineticTitleProps {
  words: {
    text: string;
    color?: string;
    highlight?: boolean;
    scale?: number;
  }[];
  startFrame: number;
  currentFrame: number;
  stagger?: number; // frame delay between words
  x: number;
  y: number;
  align?: 'left' | 'center' | 'right';
  badgeText?: string;
}

/**
 * High-Impact Kinetic Bengali Typography:
 * Words enter individually with controlled spring overshoot, scale pop, and dynamic underline draw.
 * Preserves native Unicode conjuncts and shaping by operating on full word tokens.
 */
export const KineticTitle: React.FC<KineticTitleProps> = ({
  words,
  startFrame,
  currentFrame,
  stagger = 6,
  x,
  y,
  align = 'center',
  badgeText,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Optional Top Category Marker Tag */}
      {badgeText && (
        <g transform="translate(0, -56)">
          {(() => {
            const badgeT = Math.min(1, Math.max(0, (currentFrame - startFrame) / 14));
            const eased = punchyEase(badgeT);
            return (
              <g opacity={eased} transform={`scale(${eased})`}>
                <rect x="-140" y="-18" width="280" height="36" rx="8" fill="#131B4D" stroke="#FFD152" strokeWidth="1.5" />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="#FFD152"
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.12em"
                >
                  {badgeText}
                </text>
              </g>
            );
          })()}
        </g>
      )}

      {/* Word Group with Staggered Kinetic Pops */}
      <g>
        {words.map((item, index) => {
          const wordStart = startFrame + index * stagger;
          const progress = Math.min(1, Math.max(0, (currentFrame - wordStart) / 18));
          if (progress <= 0) return null;

          const easedScale = popOvershoot(progress);
          const opacity = Math.min(1, progress * 1.5);
          const wordXOffset = (index - (words.length - 1) / 2) * 160;

          return (
            <g
              key={index}
              transform={`translate(${align === 'center' ? wordXOffset : index * 160}, 0) scale(${easedScale})`}
              opacity={opacity}
            >
              {/* Highlight Background Glow Pill */}
              {item.highlight && (
                <rect
                  x="-85"
                  y="-42"
                  width="170"
                  height="64"
                  rx="12"
                  fill="rgba(255, 94, 87, 0.22)"
                  stroke="#FF5E57"
                  strokeWidth="2"
                />
              )}

              <text
                x="0"
                y="6"
                textAnchor="middle"
                className="bengali-heading"
                fontSize={item.scale ? 48 * item.scale : 48}
                fill={item.color || (item.highlight ? '#FF5E57' : '#FFFFFF')}
                style={{
                  filter: item.highlight ? 'drop-shadow(0 4px 12px rgba(255, 94, 87, 0.45))' : 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))',
                }}
              >
                {item.text}
              </text>
            </g>
          );
        })}
      </g>
    </g>
  );
};
