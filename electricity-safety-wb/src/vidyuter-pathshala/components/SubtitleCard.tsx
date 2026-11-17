import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';

interface SubtitleCardProps {
  text: string;
  subtextEnglish?: string;
  durationInFrames: number;
}

export const SubtitleCard: React.FC<SubtitleCardProps> = ({
  text,
  subtextEnglish,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const translateY = interpolate(
    frame,
    [0, 15],
    [12, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        maxWidth: 1400,
        width: '90%',
        textAlign: 'center',
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          background: 'rgba(11, 15, 25, 0.90)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: 20,
          padding: '16px 36px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            fontFamily: THEME.fonts.bengali,
            fontSize: 30,
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.4,
            letterSpacing: 0.3,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {text}
        </div>
        {subtextEnglish && (
          <div
            style={{
              fontFamily: THEME.fonts.english,
              fontSize: 15,
              fontWeight: 500,
              color: THEME.colors.brandCyan,
              marginTop: 4,
              letterSpacing: 0.8,
            }}
          >
            {subtextEnglish}
          </div>
        )}
      </div>
    </div>
  );
};
