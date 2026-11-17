import React from 'react';
import { EASE_INOUT, EASE_OUT, DustMotes, ci } from '../historical/scene1/Scene1Shared';

/**
 * 3.0s (180f) Episode 03 Series & Topic Intro Card:
 * - Animated Copper Wire & Flowing Cyan Electron Emblem
 * - Series Name: «বিদ্যুতের পাঠশালা»
 * - Episode 03 Title: «অধ্যায় ০৩ • চার্জের গতি ও তড়িৎ প্রবাহ»
 */
export const Ep03SeriesIntro: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = ci(frame, [0, 18], [0, 1], EASE_OUT);
  const fadeOut = ci(frame, [148, 180], [1, 0], EASE_INOUT);
  const masterAlpha = fadeIn * fadeOut;

  const seriesY = ci(frame, [20, 54], [34, 0], EASE_OUT);
  const seriesScale = ci(frame, [20, 56], [0.9, 1], EASE_OUT);
  const seriesAlpha = ci(frame, [20, 44], [0, 1], EASE_OUT);
  const ruleWidth = ci(frame, [38, 78], [0, 540], EASE_OUT);
  const epY = ci(frame, [52, 86], [26, 0], EASE_OUT);
  const epAlpha = ci(frame, [52, 78], [0, 1], EASE_OUT);
  const tagAlpha = ci(frame, [70, 98], [0, 0.9], EASE_OUT);
  const flow = (frame * 4.5) % 60;

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
      <DustMotes frame={frame} cx={960} cy={500} radius={520} count={32} opacity={0.55} seed={300} />

      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Copper Wire Emblem with Flowing Cyan Electrons */}
        <g transform="translate(960, 290)">
          <rect x="-130" y="-26" width="260" height="52" rx="26" fill="rgba(217, 119, 6, 0.22)" stroke="#F59E0B" strokeWidth="3" />
          {Array.from({ length: 5 }).map((_, i) => (
            <circle
              key={i}
              cx={((i * 55 + flow) % 230) - 115}
              cy="0"
              r="7.5"
              fill="#38BDF8"
              filter="drop-shadow(0 0 8px #38BDF8)"
            />
          ))}
        </g>

        <line x1={960 - ruleWidth / 2} y1="605" x2={960 + ruleWidth / 2} y2="605" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      </svg>

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
          অধ্যায় ০৩ • চার্জের গতি ও তড়িৎ প্রবাহ
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
          স্থির চার্জ থেকে নিরবচ্ছিন্ন প্রবাহের গল্প
        </div>
      </div>
    </div>
  );
};
