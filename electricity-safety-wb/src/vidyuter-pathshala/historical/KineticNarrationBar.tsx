import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface KineticNarrationBarProps {
  text: string;
  totalDurationFrames: number;
  highlightColor?: string;
}

export const KineticNarrationBar: React.FC<KineticNarrationBarProps> = ({
  text,
  totalDurationFrames,
  highlightColor = '#FBBF24',
}) => {
  const frame = useCurrentFrame();

  // Split words
  const words = text.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  if (totalWords === 0) return null;

  // Calculate current active word index based on linear narration pace
  // Small lead-in (10 frames) and tail (20 frames)
  const activeWordFloat = interpolate(
    frame,
    [15, Math.max(20, totalDurationFrames - 25)],
    [0, totalWords - 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const activeWordIdx = Math.floor(activeWordFloat);

  // Show a rolling window of ~8-10 words around active word for clean TV presentation
  const windowSize = 8;
  const startIdx = Math.max(0, Math.min(activeWordIdx - 3, totalWords - windowSize));
  const visibleWords = words.slice(startIdx, startIdx + windowSize);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '12px 32px',
        borderRadius: 40,
        background: 'rgba(11, 17, 32, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        maxWidth: 1600,
        overflow: 'hidden',
      }}
    >
      {/* Audio Waveform icon indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          marginRight: 8,
        }}
      >
        {[8, 16, 24, 14, 20, 10].map((h, i) => {
          const barHeight = Math.max(4, h * (0.4 + Math.sin(frame * 0.3 + i) * 0.6));
          return (
            <div
              key={i}
              style={{
                width: 3,
                height: barHeight,
                backgroundColor: highlightColor,
                borderRadius: 2,
                transition: 'height 0.1s ease',
              }}
            />
          );
        })}
      </div>

      {/* Stream of rolling words */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          whiteSpace: 'nowrap',
        }}
      >
        {visibleWords.map((word, relIdx) => {
          const actualIdx = startIdx + relIdx;
          const isActive = actualIdx === activeWordIdx;
          const isPast = actualIdx < activeWordIdx;

          return (
            <span
              key={`${actualIdx}-${word}`}
              style={{
                fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif",
                fontSize: isActive ? 28 : 22,
                fontWeight: isActive ? 800 : isPast ? 600 : 400,
                color: isActive ? highlightColor : isPast ? '#F8FAFC' : 'rgba(148, 163, 184, 0.45)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                textShadow: isActive ? `0 0 16px ${highlightColor}88` : 'none',
                transition: 'all 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
