import React from 'react';
import { Easing, interpolate } from 'remotion';

export interface VidyuterBeatLine {
  text: string;
  accent?: boolean;
  sizePx?: number;
  /** Optional substring/word inside `text` to highlight in `accentColor` with kinetic pop */
  highlight?: string;
}

export interface VidyuterKineticTitleProps {
  frame: number;
  startFrame: number;
  endFrame: number;
  lines: VidyuterBeatLine[];
  subline?: string;
  x?: number;
  y?: number;
  align?: 'left' | 'center' | 'right';
  accentColor?: string;
  badge?: string;
  variant?: 'slide' | 'shadow' | 'spring' | 'spark';
}

const EASE_REVEAL = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_SPRING = Easing.bezier(0.22, 1.38, 0.36, 1);
const EASE_EXIT = Easing.bezier(0.5, 0, 0.75, 0);

/**
 * Studio-Grade Word-by-Word Bengali Kinetic Motion Graphics.
 * Features:
 * - Word-by-word staggered entrance with blur-to-sharp optical focus
 * - Two-tone hero word hierarchy with kinetic scale pop & electric glow
 * - Animated leading spark-tip accent rule
 * - Meaning-matched motion variants: slide | shadow | spring | spark
 */
export const VidyuterKineticTitle: React.FC<VidyuterKineticTitleProps> = ({
  frame,
  startFrame,
  endFrame,
  lines,
  subline,
  x = 100,
  y = 420,
  align = 'left',
  accentColor = '#FFD152',
  badge,
  variant = 'slide',
}) => {
  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const exitStart = endFrame - 16;

  const exitProgress = interpolate(frame, [exitStart, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_EXIT,
  });

  const barScale = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_REVEAL,
  });

  const containerTransform =
    align === 'right'
      ? 'translateX(-100%)'
      : align === 'center'
        ? 'translateX(-50%)'
        : 'none';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `${containerTransform} translate3d(0, ${(-exitProgress * 18).toFixed(1)}px, 0)`,
        opacity: 1 - exitProgress,
        textAlign: align,
        pointerEvents: 'none',
        zIndex: 9000,
        maxWidth: 720,
      }}
    >
      {/* Optional Badge (omitted for clean minimal scenes) */}
      {badge && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 14px',
            borderRadius: 20,
            background: 'rgba(217, 119, 6, 0.18)',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: '#FDE68A',
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Animated Editorial Accent Rule with Leading Glow Tip */}
      <div
        style={{
          display: 'flex',
          justifyContent:
            align === 'right'
              ? 'flex-end'
              : align === 'center'
                ? 'center'
                : 'flex-start',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 84,
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${accentColor}44 0%, ${accentColor} 100%)`,
            boxShadow: `0 0 16px ${accentColor}99`,
            transform: `scaleX(${barScale.toFixed(3)})`,
            transformOrigin:
              align === 'right'
                ? 'right center'
                : align === 'center'
                  ? 'center center'
                  : 'left center',
          }}
        >
          {barScale > 0.05 && barScale < 0.98 && (
            <div
              style={{
                position: 'absolute',
                right: -3,
                top: -3,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: `0 0 12px ${accentColor}`,
              }}
            />
          )}
        </div>
      </div>

      {/* Word-by-Word Kinetic Headline Group */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {lines.map((line, lineIdx) => {
          const words = line.text.split(' ');
          const fontSize = line.sizePx ?? 74;
          const lineBaseStart = startFrame + lineIdx * 8;

          return (
            <div
              key={lineIdx}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                fontSize,
                justifyContent:
                  align === 'right'
                    ? 'flex-end'
                    : align === 'center'
                      ? 'center'
                      : 'flex-start',
                columnGap: '0.28em',
                rowGap: '0.08em',
              }}
            >
              {words.map((word, wIdx) => {
                const wStart = lineBaseStart + wIdx * 5;
                const wEnd = wStart + (variant === 'shadow' ? 26 : 18);

                const t = interpolate(frame, [wStart, wEnd], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: variant === 'spring' ? EASE_SPRING : EASE_REVEAL,
                });

                const isHero =
                  line.highlight
                    ? word.includes(line.highlight)
                    : line.accent && wIdx === words.length - 1;

                // Variant-specific kinetic displacement & optical focus
                const ty =
                  variant === 'spring'
                    ? (1 - t) * 44
                    : variant === 'shadow'
                      ? (1 - t) * 14
                      : (1 - t) * 30;
                const tx =
                  variant === 'slide' ? (1 - t) * -18 : 0;
                const blurPx =
                  variant === 'shadow'
                    ? (1 - t) * 7
                    : (1 - t) * 3.5;

                // Hero word kinetic pop & electric spark flash
                const heroPop = isHero
                  ? interpolate(
                      frame,
                      [wStart + 6, wStart + 15, wStart + 28],
                      [1, 1.09, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_REVEAL }
                    )
                  : variant === 'shadow'
                    ? interpolate(t, [0, 1], [0.92, 1])
                    : 1;

                const sparkFlash =
                  variant === 'spark' && frame >= wStart + 8 && frame <= wStart + 12
                    ? 1.35
                    : 1;

                // Crisp energy underline sweep on hero word
                const underlineScale = isHero
                  ? interpolate(frame, [wStart + 8, wStart + 24], [0, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                      easing: EASE_REVEAL,
                    })
                  : 0;

                const wordColor = line.highlight
                  ? isHero
                    ? accentColor
                    : '#F8FAFC'
                  : line.accent
                    ? accentColor
                    : '#F8FAFC';

                return (
                  <span
                    key={wIdx}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                      fontWeight: 700,
                      fontSize,
                      lineHeight: 1.2,
                      color: wordColor,
                      textShadow: isHero
                        ? `0 4px 26px ${accentColor}55, 0 4px 18px rgba(2, 6, 23, 0.92)`
                        : '0 4px 20px rgba(2, 6, 23, 0.92)',
                      transform: `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${heroPop.toFixed(4)})`,
                      transformOrigin: 'center bottom',
                      opacity: interpolate(t, [0, 0.28], [0, 1], { extrapolateRight: 'clamp' }),
                      filter: `blur(${blurPx.toFixed(2)}px) brightness(${sparkFlash})`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {word}
                    {isHero && underlineScale > 0.01 && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: -4,
                          height: 4,
                          borderRadius: 2,
                          background: `linear-gradient(90deg, ${accentColor}00 0%, ${accentColor} 50%, ${accentColor}00 100%)`,
                          transform: `scaleX(${underlineScale.toFixed(3)})`,
                          transformOrigin: 'center center',
                          opacity: 0.75,
                        }}
                      />
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Optional Subline */}
      {subline && (
        <div
          style={{
            marginTop: 8,
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
            fontWeight: 600,
            fontSize: 26,
            color: '#CBD5E1',
          }}
        >
          {subline}
        </div>
      )}
    </div>
  );
};
