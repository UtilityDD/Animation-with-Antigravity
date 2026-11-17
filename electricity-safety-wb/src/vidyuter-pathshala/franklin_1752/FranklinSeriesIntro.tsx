import React from 'react';
import { EASE_INOUT, EASE_OUT, DustMotes, ci } from '../historical/scene1/Scene1Shared';

/**
 * 3.0s (180f) Series & Experiment Intro Card:
 * - Animated kite-and-key emblem draw-in with electric cyan charge pulse
 * - Series Name: «বিদ্যুতের পাঠশালা» with kinetic scale/glow intro effect
 * - Popular Experiment Name: «ফ্র্যাঙ্কলিনের ঘুড়ি ও চাবির পরীক্ষা»
 */
export const FranklinSeriesIntro: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = ci(frame, [0, 18], [0, 1], EASE_OUT);
  const fadeOut = ci(frame, [148, 180], [1, 0], EASE_INOUT);
  const masterAlpha = fadeIn * fadeOut;

  // Animated emblem & electric ring pulse
  const ringScale = ci(frame, [8, 65], [0.45, 1.15], EASE_OUT);
  const ringAlpha = ci(frame, [8, 28], [0, 0.55], EASE_OUT) * ci(frame, [55, 110], [1, 0.25], EASE_INOUT);
  const emblemDraw = ci(frame, [10, 58], [1, 0], EASE_OUT);

  // Series title kinetic entrance
  const seriesY = ci(frame, [20, 54], [34, 0], EASE_OUT);
  const seriesScale = ci(frame, [20, 56], [0.9, 1], EASE_OUT);
  const seriesAlpha = ci(frame, [20, 44], [0, 1], EASE_OUT);
  const ruleWidth = ci(frame, [38, 78], [0, 520], EASE_OUT);

  // Popular experiment name entrance
  const expY = ci(frame, [52, 86], [26, 0], EASE_OUT);
  const expAlpha = ci(frame, [52, 78], [0, 1], EASE_OUT);

  // Subtle historical tag entrance
  const tagAlpha = ci(frame, [70, 98], [0, 0.9], EASE_OUT);

  // Electric spark sweep across the divider
  const sweepX = ci(frame, [36, 92], [-280, 280], EASE_INOUT);
  const sweepAlpha = ci(frame, [36, 54], [0, 1], EASE_OUT) * ci(frame, [74, 94], [1, 0], EASE_INOUT);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 44%, #131D33 0%, #070B14 62%, #03050A 100%)',
        opacity: masterAlpha,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DustMotes frame={frame} cx={960} cy={500} radius={520} count={34} opacity={0.55} seed={1752} />

      {/* Center Stage SVG: Electric Halo + Kite-and-Key Emblem + Expanding Rule */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id="introGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="960" cy="430" r="360" fill="url(#introGlow)" opacity={0.75} />

        {/* Expanding Electric Pulse Ring */}
        <circle
          cx="960"
          cy="300"
          r={110 * ringScale}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2.5"
          opacity={ringAlpha}
        />

        {/* Minimalist Kite & Key Emblem */}
        <g transform="translate(960, 290)">
          {/* Diamond Silk Kite + Cross */}
          <polygon
            points="0,-58 44,0 0,68 -44,0"
            fill="rgba(56, 189, 248, 0.08)"
            stroke="#BAE6FD"
            strokeWidth="2.8"
            strokeDasharray="340"
            strokeDashoffset={340 * emblemDraw}
          />
          <line x1="0" y1="-78" x2="0" y2="68" stroke="#FBBF24" strokeWidth="2.6" opacity={1 - emblemDraw} />
          <line x1="-44" y1="0" x2="44" y2="0" stroke="#FBBF24" strokeWidth="2.6" opacity={1 - emblemDraw} />
          {/* Tiny Brass Key hanging below */}
          <g transform="translate(0, 88)" opacity={1 - emblemDraw}>
            <circle cx="0" cy="0" r="9" fill="none" stroke="#FBBF24" strokeWidth="2.6" />
            <line x1="0" y1="9" x2="0" y2="30" stroke="#FBBF24" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="0" y1="22" x2="7" y2="22" stroke="#FBBF24" strokeWidth="2.4" />
          </g>
        </g>

        {/* Expanding Golden-Cyan Divider Rule */}
        <line
          x1={960 - ruleWidth / 2}
          y1="610"
          x2={960 + ruleWidth / 2}
          y2="610"
          stroke="#38BDF8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Moving Spark Glint along Rule */}
        <circle cx={960 + sweepX} cy="610" r="7" fill="#E0F2FE" opacity={sweepAlpha} />
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
          paddingTop: 185,
          fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
          textAlign: 'center',
        }}
      >
        {/* Series Name with Kinetic Intro Effect */}
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            color: '#F8FAFC',
            letterSpacing: '0.01em',
            textShadow: '0 0 36px rgba(56, 189, 248, 0.45), 0 6px 24px rgba(0, 0, 0, 0.7)',
            transform: `translateY(${seriesY}px) scale(${seriesScale})`,
            opacity: seriesAlpha,
            lineHeight: 1.15,
          }}
        >
          বিদ্যুতের <span style={{ color: '#38BDF8' }}>পাঠশালা</span>
        </div>

        {/* Popular Name of the Experiment */}
        <div
          style={{
            marginTop: 46,
            fontSize: 50,
            fontWeight: 700,
            color: '#FDE68A',
            textShadow: '0 4px 18px rgba(0, 0, 0, 0.75)',
            transform: `translateY(${expY}px)`,
            opacity: expAlpha,
            lineHeight: 1.25,
          }}
        >
          ফ্র্যাঙ্কলিনের ঘুড়ি ও চাবির পরীক্ষা
        </div>

        {/* Historical Context Pill */}
        <div
          style={{
            marginTop: 18,
            padding: '6px 22px',
            borderRadius: 999,
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'rgba(15, 23, 42, 0.65)',
            color: '#BAE6FD',
            fontSize: 26,
            fontWeight: 600,
            opacity: tagAlpha,
          }}
        >
          ঐতিহাসিক বিজ্ঞান অধ্যায় • ফিলাডেলফিয়া, ১৭৫২
        </div>
      </div>
    </div>
  );
};
