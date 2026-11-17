import React from 'react';
import { THEME } from '../styles/constants';

interface HeaderBannerProps {
  sceneTitle: string;
  sceneNumber: number;
  totalScenes?: number;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  sceneTitle,
  sceneNumber,
  totalScenes = 8,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 36,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      {/* Brand logo / tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${THEME.colors.brandCyan}, #2563EB)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 20px ${THEME.colors.glowCyan}`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: THEME.fonts.bengali,
              fontSize: 26,
              fontWeight: 700,
              color: THEME.colors.textPure,
              letterSpacing: 0.5,
              lineHeight: 1.1,
            }}
          >
            বিদ্যুতের পাঠশালা
          </div>
          <div
            style={{
              fontFamily: THEME.fonts.english,
              fontSize: 13,
              fontWeight: 500,
              color: THEME.colors.brandCyan,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Electricity Explained • EP 01
          </div>
        </div>
      </div>

      {/* Current Scene Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: 'rgba(19, 27, 46, 0.85)',
          padding: '8px 20px',
          borderRadius: 30,
          border: `1px solid ${THEME.colors.bgCardBorder}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.english,
            fontSize: 13,
            fontWeight: 700,
            color: THEME.colors.currentAmber,
            background: 'rgba(251, 191, 36, 0.15)',
            padding: '4px 10px',
            borderRadius: 16,
          }}
        >
          SCENE {sceneNumber}/{totalScenes}
        </span>
        <span
          style={{
            fontFamily: THEME.fonts.bengali,
            fontSize: 20,
            fontWeight: 600,
            color: THEME.colors.textPure,
          }}
        >
          {sceneTitle}
        </span>
      </div>
    </div>
  );
};
