import React from 'react';
import { Easing, interpolate } from 'remotion';

export interface BanglaBeatProps {
  frame: number;
  startFrame: number;
  endFrame: number;
  eyebrow?: string;
  headline: string;
  accentWord?: string;
  subline?: string;
  accentColor?: string;
  align?: 'left' | 'right';
  theme?: 'sunlit' | 'hive';
}

const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1);

/**
 * Word-staggered Bengali kinetic typography using locally bundled Hind Siliguri & Noto Sans Bengali.
 */
export const BanglaKineticBeat: React.FC<BanglaBeatProps> = ({
  frame,
  startFrame,
  endFrame,
  eyebrow,
  headline,
  accentWord,
  subline,
  accentColor = '#C85A17',
  align = 'left',
  theme = 'sunlit',
}) => {
  if (frame < startFrame || frame > endFrame) return null;

  const isHive = theme === 'hive';
  const mainColor = isHive ? '#FFF6E3' : '#2A1E12';
  const subColor = isHive ? '#F5DEC0' : '#4D3A27';
  const shadow = isHive
    ? '0 3px 20px rgba(24,10,2,0.85)'
    : '0 2px 18px rgba(255,248,235,0.78)';

  const fadeOut = interpolate(frame, [endFrame - 18, endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_OUT,
  });

  const words = headline.split(' ');
  const accentWords = accentWord ? accentWord.split(' ') : [];

  return (
    <div
      style={{
        position: 'absolute',
        top: 68,
        left: align === 'left' ? 88 : undefined,
        right: align === 'right' ? 88 : undefined,
        maxWidth: 680,
        textAlign: align,
        opacity: fadeOut,
        pointerEvents: 'none',
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
            fontSize: 21,
            fontWeight: 600,
            color: accentColor,
            letterSpacing: 0.4,
            marginBottom: 8,
            opacity: interpolate(frame, [startFrame, startFrame + 14], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: EASE_OUT,
            }),
            transform: `translateY(${interpolate(frame, [startFrame, startFrame + 16], [12, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: EASE_OUT,
            }).toFixed(1)}px)`,
          }}
        >
          {eyebrow}
        </div>
      )}

      {/* Staggered word reveal */}
      <div
        style={{
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
          fontSize: 54,
          fontWeight: 700,
          lineHeight: 1.24,
          color: mainColor,
          textShadow: shadow,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
          gap: '0 14px',
        }}
      >
        {words.map((w, idx) => {
          const wStart = startFrame + idx * 5;
          const t = interpolate(frame, [wStart, wStart + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: EASE_OUT,
          });
          const isAccent = accentWords.includes(w);
          const popScale = isAccent
            ? interpolate(frame, [wStart + 10, wStart + 20, wStart + 32], [1, 1.07, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: EASE_OUT,
              })
            : 1;

          return (
            <span
              key={`${w}-${idx}`}
              style={{
                display: 'inline-block',
                color: isAccent ? accentColor : mainColor,
                opacity: t,
                transform: `translateY(${((1 - t) * 18).toFixed(1)}px) scale(${popScale.toFixed(3)})`,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>

      {subline && (
        <div
          style={{
            fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
            fontSize: 25,
            fontWeight: 500,
            lineHeight: 1.4,
            color: subColor,
            marginTop: 12,
            textShadow: shadow,
            opacity: interpolate(frame, [startFrame + 20, startFrame + 38], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: EASE_OUT,
            }),
            transform: `translateY(${interpolate(frame, [startFrame + 20, startFrame + 38], [10, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: EASE_OUT,
            }).toFixed(1)}px)`,
          }}
        >
          {subline}
        </div>
      )}
    </div>
  );
};
