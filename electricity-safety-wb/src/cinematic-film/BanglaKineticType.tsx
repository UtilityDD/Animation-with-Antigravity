import React from 'react';
import { Easing, interpolate } from 'remotion';

export interface BanglaBeatLine {
  text: string;
  accent?: boolean;
  sizePx?: number;
}

export interface BanglaTitleBeatProps {
  frame: number;
  startFrame: number;
  endFrame: number;
  lines: BanglaBeatLine[];
  subCaption?: string;
  x: number;
  y: number;
  align?: 'left' | 'right' | 'center';
  accentColor?: string;
}

const EASE_REVEAL = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_EXIT = Easing.bezier(0.5, 0, 0.75, 0);

/**
 * Collision-free Bengali kinetic typography beat:
 * - Complete headline group directional entrance
 * - Subtle emphasis pulse on the key accented phrase
 * - Separate delayed entrance for the supporting line
 */
export const BanglaTitleBeat: React.FC<BanglaTitleBeatProps> = ({
  frame,
  startFrame,
  endFrame,
  lines,
  subCaption,
  x,
  y,
  align = 'left',
  accentColor = '#E89B45',
}) => {
  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const exitStart = endFrame - 16;

  // Complete headline group directional entrance & clean exit
  const groupEnter = interpolate(frame, [startFrame, startFrame + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_REVEAL,
  });

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

  const dirOffset = (1 - groupEnter) * (align === 'right' ? 28 : -28);

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
        transform: `${containerTransform} translate3d(${dirOffset.toFixed(1)}px, ${(-exitProgress * 14).toFixed(1)}px, 0)`,
        opacity: (1 - exitProgress) * interpolate(groupEnter, [0, 0.35], [0, 1], { extrapolateRight: 'clamp' }),
        textAlign: align,
        pointerEvents: 'none',
        zIndex: 9000,
        maxWidth: 780,
      }}
    >
      {/* Editorial accent rule */}
      <div
        style={{
          display: 'flex',
          justifyContent:
            align === 'right'
              ? 'flex-end'
              : align === 'center'
                ? 'center'
                : 'flex-start',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 58,
            height: 4,
            borderRadius: 2,
            backgroundColor: accentColor,
            transform: `scaleX(${barScale.toFixed(3)})`,
            transformOrigin:
              align === 'right'
                ? 'right center'
                : align === 'center'
                  ? 'center center'
                  : 'left center',
          }}
        />
      </div>

      {/* Headline group */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {lines.map((line, idx) => {
          const lineStart = startFrame + idx * 6;
          const t = interpolate(frame, [lineStart, lineStart + 22], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: EASE_REVEAL,
          });
          const translateY = (1 - t) * 34;
          const fontSize = line.sizePx ?? 56;

          // Brief subtle emphasis settle on key accented phrase
          const emphasisScale = line.accent
            ? interpolate(
                frame,
                [lineStart + 10, lineStart + 22, lineStart + 36],
                [1, 1.032, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
              )
            : 1;

          return (
            <div
              key={idx}
              style={{
                overflow: 'hidden',
                paddingBottom: 6,
                paddingTop: 4,
              }}
            >
              <div
                className="bengali-heading"
                style={{
                  fontSize,
                  lineHeight: 1.24,
                  color: line.accent ? accentColor : '#F2EFE9',
                  letterSpacing: '0.01em',
                  textShadow: '0 4px 18px rgba(8, 12, 18, 0.72)',
                  transform: `translateY(${translateY.toFixed(2)}px) scale(${emphasisScale.toFixed(4)})`,
                  transformOrigin: align === 'right' ? 'right center' : 'left center',
                  opacity: interpolate(t, [0, 0.35], [0, 1], {
                    extrapolateRight: 'clamp',
                  }),
                  whiteSpace: 'nowrap',
                }}
              >
                {line.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Supporting line with separate delayed entrance */}
      {subCaption && (
        <div
          style={{
            overflow: 'hidden',
            marginTop: 10,
            paddingBottom: 4,
          }}
        >
          <div
            className="bengali-body"
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: '#C7D3DF',
              textShadow: '0 2px 12px rgba(8, 12, 18, 0.85)',
              transform: `translateY(${((1 - interpolate(frame, [startFrame + 22, startFrame + 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_REVEAL })) * 26).toFixed(2)}px)`,
              opacity: interpolate(
                frame,
                [startFrame + 22, startFrame + 38],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
              whiteSpace: 'nowrap',
            }}
          >
            {subCaption}
          </div>
        </div>
      )}
    </div>
  );
};
