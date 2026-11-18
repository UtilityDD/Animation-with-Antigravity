import React from 'react';
import { EASE_INOUT, EASE_OUT, DustMotes, ci } from '../historical/scene1/Scene1Shared';
import { ScreenFlash, ShockRing, SparkBurst, pulseAt } from './Ep01Fx';

/**
 * 3.0s (180f) Episode 01 v2 Series & Topic Intro Card:
 * - «বিদ্যুতের পাঠশালা» • অধ্যায় ০১ • বিদ্যুৎ আসলে কী?
 */
export const Ep01V2Intro: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = ci(frame, [0, 18], [0, 1], EASE_OUT);
  const fadeOut = ci(frame, [148, 180], [1, 0], EASE_INOUT);
  const seriesY = ci(frame, [20, 54], [34, 0], EASE_OUT);
  const seriesAlpha = ci(frame, [20, 44], [0, 1], EASE_OUT);
  const ruleWidth = ci(frame, [38, 78], [0, 520], EASE_OUT);
  const epY = ci(frame, [52, 86], [26, 0], EASE_OUT);
  const epAlpha = ci(frame, [52, 78], [0, 1], EASE_OUT);
  const spark = Math.sin(frame * 0.45) > 0.25;
  // glow follows the same gate as the spark (and the gated buzz in the sound design)
  const sparkGlow = spark ? 0.55 + 0.45 * Math.sin(frame * 1.7) ** 2 : 0;
  const ruleSweep = ci(frame, [38, 78], [0, 1]);
  const sweepAlpha = ci(frame, [38, 44, 74, 90], [0, 1, 1, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 44%, #101E36 0%, #060A14 64%, #03050A 100%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <DustMotes frame={frame} cx={960} cy={500} radius={520} count={32} opacity={0.55} seed={101} />
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g transform="translate(960, 290)">
          <circle cx="0" cy="0" r={90 + sparkGlow * 40} fill="rgba(56, 189, 248, 0.10)" opacity={sparkGlow} />
          <circle cx="0" cy="0" r="64" fill="rgba(56, 189, 248, 0.09)" stroke="#38BDF8" strokeWidth={2.5 + sparkGlow * 1.5} />
          <ShockRing local={frame} at={20} x={0} y={0} r={150} color="#38BDF8" life={34} />
          <SparkBurst local={frame} at={20} x={0} y={0} count={16} speed={10} gravity={0.05} color="#38BDF8" seed={3} />
          {spark && (
            <path d="M -18,-6 L -4,-18 L 4,4 L 18,-8" fill="none" stroke="#E0F2FE" strokeWidth="4" filter="drop-shadow(0 0 10px #38BDF8)" />
          )}
        </g>
        <line x1={960 - ruleWidth / 2} y1="605" x2={960 + ruleWidth / 2} y2="605" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        {/* light sweeping out along the rule as it draws */}
        {sweepAlpha > 0.01 &&
          [-1, 1].map((d) => (
            <g key={d} opacity={sweepAlpha}>
              <ellipse cx={960 + (d * ruleWidth) / 2} cy="605" rx={46 - ruleSweep * 14} ry="7" fill="rgba(224, 242, 254, 0.55)" />
              <circle cx={960 + (d * ruleWidth) / 2} cy="605" r="5" fill="#F0F9FF" filter="drop-shadow(0 0 10px #38BDF8)" />
            </g>
          ))}
      </svg>

      <ScreenFlash amount={sparkGlow * 0.12 + pulseAt(frame, [20], 8, 0.35)} color="125, 211, 252" at={[50, 27]} />
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
