import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FontInjector } from '../../kinetic-master/FontInjector';

interface HistoricalFrameProps {
  children: React.ReactNode;
  chapterTitle?: string;
  eraBadge?: string;
  isScienceLab?: boolean;
}

export const HistoricalFrame: React.FC<HistoricalFrameProps> = ({
  children,
  chapterTitle,
  eraBadge,
  isScienceLab = false,
}) => {
  const frame = useCurrentFrame();

  // Subtle 2.5D camera drift
  const driftX = Math.sin(frame * 0.02) * 6;
  const driftY = Math.cos(frame * 0.025) * 4;

  const headerOpacity = interpolate(frame, [0, 20, 150, 190], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgGradient = isScienceLab
    ? 'radial-gradient(circle at 50% 40%, #131E36 0%, #0B1120 70%)'
    : 'radial-gradient(circle at 45% 35%, #2C1E16 0%, #161311 75%)';

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: isScienceLab ? '#0B1120' : '#161311',
        backgroundImage: bgGradient,
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
    >
      {/* Professional Local Bengali Font Injector */}
      <FontInjector />
      {/* Historical Oil Lamp Flame Glow (for historical scenes) */}
      {!isScienceLab && (
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(217, 130, 43, 0.22) 0%, rgba(217, 130, 43, 0.04) 50%, transparent 70%)',
            pointerEvents: 'none',
            transform: `scale(${1 + Math.sin(frame * 0.1) * 0.06})`,
            zIndex: 1,
          }}
        />
      )}

      {/* Subtle Blueprint Grid Pattern (for scientific scenes) */}
      {isScienceLab && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage:
              'linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Top Header Bar — shown briefly at scene start, then fades away for a clean frame */}
      {(chapterTitle || eraBadge) && headerOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            right: 60,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 50,
            opacity: headerOpacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: isScienceLab ? '#38BDF8' : '#D9822B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isScienceLab
                  ? '0 0 20px rgba(56, 189, 248, 0.5)'
                  : '0 0 20px rgba(217, 130, 43, 0.5)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
                  fontFamily: "'Hind Siliguri', 'Noto Serif Bengali', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                }}
              >
                বিদ্যুতের পাঠশালা
              </div>
              <div
                style={{
                  fontFamily: "'Noto Sans Bengali', sans-serif",
                  fontSize: 13,
                  color: isScienceLab ? '#38BDF8' : '#D9822B',
                  letterSpacing: '0.5px',
                }}
              >
                পর্ব ০১ • বিজ্ঞান ও আবিষ্কার
              </div>
            </div>
          </div>

          {eraBadge && (
            <div
              style={{
                background: isScienceLab
                  ? 'rgba(30, 41, 59, 0.85)'
                  : 'rgba(44, 30, 22, 0.85)',
                border: isScienceLab
                  ? '1px solid rgba(56, 189, 248, 0.3)'
                  : '1px solid rgba(217, 130, 43, 0.4)',
                borderRadius: 20,
                padding: '8px 20px',
                fontFamily: "'Hind Siliguri', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                color: isScienceLab ? '#38BDF8' : '#F2E5CE',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              }}
            >
              {eraBadge}
            </div>
          )}
        </div>
      )}

      {/* Main Content Area with 2.5D Parallax Drift */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `translate3d(${driftX.toFixed(1)}px, ${driftY.toFixed(1)}px, 0)`,
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
};
