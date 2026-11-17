import React from 'react';
import { EASE_INOUT, EASE_OUT, DustMotes, ci } from '../historical/scene1/Scene1Shared';

/**
 * 3.0s (180f) Episode 01 v2 Series & Topic Intro Card:
 * - «বিদ্যুতের পাঠশালা» • অধ্যায় ০১ • বিদ্যুৎ আসলে কী?
 */
export const Ep01V2Intro: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = ci(frame, [0, 18], [0, 1], EASE_OUT);
  const fadeOut = ci(frame, [148, 180], [1, 0], EASE_INOUT);
  const camScale = ci(frame, [0, 148, 180], [1.0, 1.07, 1.28], EASE_INOUT);
  const seriesY = ci(frame, [20, 54], [34, 0], EASE_OUT);
  const seriesAlpha = ci(frame, [20, 44], [0, 1], EASE_OUT);
  const ruleWidth = ci(frame, [38, 78], [0, 520], EASE_OUT);
  const epY = ci(frame, [52, 86], [26, 0], EASE_OUT);
  const epAlpha = ci(frame, [52, 78], [0, 1], EASE_OUT);
  const sparkDraw = ci(frame, [8, 42], [75, 0], EASE_OUT);
  const ringPulse = 1 + Math.sin(frame * 0.14) * 0.05;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 44%, #101E36 0%, #060A14 64%, #03050A 100%)',
        opacity: fadeIn * fadeOut,
        transform: `scale(${camScale})`,
        overflow: 'hidden',
      }}
    >
      <DustMotes frame={frame} cx={960} cy={500} radius={520} count={32} opacity={0.55} seed={101} />
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g transform={`translate(960, 290) scale(${ringPulse})`}>
          <circle cx="0" cy="0" r="64" fill="rgba(56, 189, 248, 0.12)" stroke="#38BDF8" strokeWidth="2.5" />
          <path
            d="M -20,-8 L -5,-22 L 4,6 L 20,-10"
            fill="none"
            stroke="#E0F2FE"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="75"
            strokeDashoffset={sparkDraw}
            filter="drop-shadow(0 0 12px #38BDF8)"
          />
        </g>
        <line x1={960 - ruleWidth / 2} y1="605" x2={960 + ruleWidth / 2} y2="605" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
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
        <div style={{ fontSize: 92, fontWeight: 700, color: '#F8FAFC', transform: `translateY(${seriesY}px)`, opacity: seriesAlpha }}>
          বিদ্যুতের <span style={{ color: '#38BDF8' }}>পাঠশালা</span>
        </div>
        <div style={{ marginTop: 46, fontSize: 52, fontWeight: 700, color: '#FDE68A', transform: `translateY(${epY}px)`, opacity: epAlpha }}>
          অধ্যায় 01 • বিদ্যুৎ আসলে কী?
        </div>
      </div>
    </div>
  );
};
