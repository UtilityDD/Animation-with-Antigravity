import React from 'react';
import { EASE_INOUT, EASE_OUT, DustMotes, ci } from '../historical/scene1/Scene1Shared';

/**
 * 3.0s (180f) Episode 02 Series & Topic Intro Card:
 * - Minimalist diffuse electron-cloud & nucleus emblem (NOT rigid circular planetary rings!)
 * - Series Name: «বিদ্যুতের পাঠশালা» with kinetic glow sweep
 * - Episode 02 Title: «পরমাণু ও বৈদ্যুতিক চার্জ»
 */
export const Ep02SeriesIntro: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = ci(frame, [0, 18], [0, 1], EASE_OUT);
  const fadeOut = ci(frame, [148, 180], [1, 0], EASE_INOUT);
  const masterAlpha = fadeIn * fadeOut;

  const ringScale = ci(frame, [8, 65], [0.45, 1.15], EASE_OUT);
  const ringAlpha = ci(frame, [8, 28], [0, 0.55], EASE_OUT) * ci(frame, [55, 110], [1, 0.28], EASE_INOUT);
  const emblemIn = ci(frame, [10, 56], [0, 1], EASE_OUT);

  const seriesY = ci(frame, [20, 54], [34, 0], EASE_OUT);
  const seriesScale = ci(frame, [20, 56], [0.9, 1], EASE_OUT);
  const seriesAlpha = ci(frame, [20, 44], [0, 1], EASE_OUT);
  const ruleWidth = ci(frame, [38, 78], [0, 540], EASE_OUT);

  const epY = ci(frame, [52, 86], [26, 0], EASE_OUT);
  const epAlpha = ci(frame, [52, 78], [0, 1], EASE_OUT);
  const tagAlpha = ci(frame, [70, 98], [0, 0.9], EASE_OUT);

  const sweepX = ci(frame, [36, 92], [-280, 280], EASE_INOUT);
  const sweepAlpha = ci(frame, [36, 54], [0, 1], EASE_OUT) * ci(frame, [74, 94], [1, 0], EASE_INOUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 44%, #101E36 0%, #060A14 64%, #03050A 100%)',
        opacity: masterAlpha,
        overflow: 'hidden',
      }}
    >
      <DustMotes frame={frame} cx={960} cy={500} radius={520} count={34} opacity={0.55} seed={202} />

      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="ep2IntroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#F43F5E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#060A14" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ep2Cloud" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="960" cy="420" r="370" fill="url(#ep2IntroGlow)" opacity={0.75} />

        {/* Expanding Electric Pulse Ring */}
        <circle cx="960" cy="285" r={112 * ringScale} fill="none" stroke="#38BDF8" strokeWidth="2.5" opacity={ringAlpha} />

        {/* Diffuse Probability Cloud & Nucleus Emblem */}
        <g transform="translate(960, 285)" opacity={emblemIn}>
          <circle cx="0" cy="0" r="78" fill="url(#ep2Cloud)" />
          <circle cx="0" cy="0" r="56" fill="none" stroke="#38BDF8" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="4 6" />
          {/* Tiny Central Nucleus (Coral Protons + Slate Neutrons) */}
          <circle cx="-5" cy="-4" r="6" fill="#F43F5E" />
          <circle cx="5" cy="4" r="6" fill="#F43F5E" />
          <circle cx="5" cy="-4" r="5.5" fill="#94A3B8" />
          <circle cx="-5" cy="5" r="5.5" fill="#94A3B8" />
          {/* Darting Electron Fireflies in Outer Cloud */}
          {[0, 1, 2, 3].map((i) => {
            const ang = frame * 0.06 + i * 1.57;
            const rad = 52 + Math.sin(frame * 0.09 + i * 2) * 14;
            return (
              <circle
                key={i}
                cx={Math.cos(ang) * rad}
                cy={Math.sin(ang * 1.15) * rad * 0.72}
                r="4.2"
                fill="#E0F2FE"
              />
            );
          })}
        </g>

        {/* Expanding Cyan Divider Rule */}
        <line
          x1={960 - ruleWidth / 2}
          y1="605"
          x2={960 + ruleWidth / 2}
          y2="605"
          stroke="#38BDF8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx={960 + sweepX} cy="605" r="7" fill="#E0F2FE" opacity={sweepAlpha} />
      </svg>

      {/* Typography Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 180,
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            color: '#F8FAFC',
            textShadow: '0 0 36px rgba(56, 189, 248, 0.45), 0 6px 24px rgba(0, 0, 0, 0.7)',
            transform: `translateY(${seriesY}px) scale(${seriesScale})`,
            opacity: seriesAlpha,
            lineHeight: 1.15,
          }}
        >
          বিদ্যুতের <span style={{ color: '#38BDF8' }}>পাঠশালা</span>
        </div>

        <div
          style={{
            marginTop: 46,
            fontSize: 52,
            fontWeight: 700,
            color: '#FDE68A',
            textShadow: '0 4px 18px rgba(0, 0, 0, 0.75)',
            transform: `translateY(${epY}px)`,
            opacity: epAlpha,
            lineHeight: 1.25,
          }}
        >
          অধ্যায় ০২ • পরমাণু ও বৈদ্যুতিক চার্জ
        </div>

        <div
          style={{
            marginTop: 16,
            padding: '6px 24px',
            borderRadius: 999,
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'rgba(15, 23, 42, 0.65)',
            color: '#BAE6FD',
            fontSize: 26,
            fontWeight: 600,
            opacity: tagAlpha,
          }}
        >
          অদৃশ্য কণার ভেতরে লুকিয়ে থাকা শক্তির গল্প
        </div>
      </div>
    </div>
  );
};
