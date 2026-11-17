import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, camAt, camTransform, ci } from '../historical/scene1/Scene1Shared';

/**
 * Stage 4B (0..2360 local frames): Analogy 2 — Charge Ledger (+1 Proton, -1 Electron, 0 Neutron) + Animated Field-Line Law
 */
export const Stage4BChargeLedgerShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [2325, 2360], [1, 0], EASE_INOUT);

  const cam = camAt(local, [
    { f: 0, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 1320, x: 960, y: 540, z: 1.04, sx: 960, sy: 540 },
    { f: 1350, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 2360, x: 960, y: 540, z: 1.05, sx: 960, sy: 540 },
  ]);

  const ledgerAlpha = ci(local, [0, 24, 1310, 1360], [0, 1, 1, 0], EASE_INOUT);
  const lawAlpha = ci(local, [1335, 1385], [0, 1], EASE_OUT);

  const extraE = local > 660 && local <= 980 ? 1 : 0;
  const missingE = local > 980 ? 1 : 0;
  const eCount = 6 + extraE - missingE;
  const netLabel = eCount === 6 ? '০ (নিরপেক্ষ)' : eCount === 7 ? '-১ (ঋণাত্মক আয়ন)' : '+১ (ধনাত্মক আয়ন)';
  const netColor = eCount === 6 ? '#10B981' : eCount === 7 ? '#38BDF8' : '#F43F5E';

  const repelShift = Math.sin(frame * 0.08) * 16;
  const fieldFlow = (frame * 2.2) % 24;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #111D36 0%, #050811 78%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: camTransform(cam),
          transformOrigin: '0 0',
        }}
      >
        {/* PART 1: Quantized Charge Ledger (+1 Proton, -1 Electron, 0 Neutron) */}
        {ledgerAlpha > 0.01 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: ledgerAlpha }}>
            <rect x="200" y="210" width="1520" height="710" rx="22" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" strokeWidth="3" />
            <line x1="960" y1="235" x2="960" y2="670" stroke="#334155" strokeWidth="2.5" strokeDasharray="8 8" />

            {/* Left Column: +1 Proton Coins */}
            <text x="580" y="275" textAnchor="middle" fill="#FDA4AF" fontSize="32" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              প্রোটন (+১ কয়েন) × ৬
            </text>
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={`p${i}`} transform={`translate(${380 + (i % 3) * 200}, ${365 + Math.floor(i / 3) * 115})`}>
                <circle cx="0" cy="0" r="38" fill="#9F1239" stroke="#F43F5E" strokeWidth="4" />
                <text x="0" y="12" textAnchor="middle" fill="#FFF1F2" fontSize="32" fontWeight="800">+1</text>
              </g>
            ))}

            {/* Right Column: -1 Electron Coins */}
            <text x="1340" y="275" textAnchor="middle" fill="#BAE6FD" fontSize="32" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              ইলেকট্রন (-১ কয়েন) × {eCount === 7 ? '৭' : eCount === 5 ? '৫' : '৬'}
            </text>
            {Array.from({ length: eCount }).map((_, i) => (
              <g key={`e${i}`} transform={`translate(${1140 + (i % 3) * 200}, ${365 + Math.floor(i / 3) * 115})`}>
                <circle cx="0" cy="0" r="38" fill="#075985" stroke="#38BDF8" strokeWidth="4" />
                <text x="0" y="12" textAnchor="middle" fill="#E0F2FE" fontSize="32" fontWeight="800">-1</text>
              </g>
            ))}

            {/* Neutron (0) Nuclear Glue Row */}
            <g transform="translate(960, 720)">
              <rect x="-560" y="-42" width="1120" height="72" rx="14" fill="rgba(51, 65, 85, 0.45)" stroke="#64748B" strokeWidth="2" />
              {[-440, -370, -300].map((nx) => (
                <g key={nx} transform={`translate(${nx}, -6)`}>
                  <circle cx="0" cy="0" r="22" fill="#475569" stroke="#94A3B8" strokeWidth="2.5" />
                  <text x="0" y="7" textAnchor="middle" fill="#F8FAFC" fontSize="20" fontWeight="800">0</text>
                </g>
              ))}
              <text x="130" y="3" textAnchor="middle" fill="#E2E8F0" fontSize="26" fontWeight="600" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                নিউট্রন (চার্জ ০) × ৬: নিউক্লিয়াসে প্রোটনগুলোকে একসাথে ধরে রাখে
              </text>
            </g>

            {/* Bottom Net Charge Balance */}
            <rect x="340" y="810" width="1240" height="72" rx="14" fill="#0B1324" stroke={netColor} strokeWidth="2.5" />
            <text x="960" y="858" textAnchor="middle" fill={netColor} fontSize="34" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              মোট চার্জ: +৬ {eCount === 7 ? '- ৭' : eCount === 5 ? '- ৫' : '- ৬'} = {netLabel}
            </text>
          </svg>
        )}

        {/* PART 2: Animated Field-Line Law of Charge Interaction + 1909 Gold Nucleus Link */}
        {local >= 1335 && (
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: lawAlpha }}>
            {/* Top-Left: Like Charges Repel (+ <-> +) with Animated Repulsive Field Curves */}
            <g transform="translate(540, 405)">
              {[-60, 0, 60].map((fy) => (
                <path
                  key={fy}
                  d={`M ${-95 - repelShift},${fy * 0.3} Q -25,${fy * 1.4} -12,${fy * 2.1} M ${95 + repelShift},${fy * 0.3} Q 25,${fy * 1.4} 12,${fy * 2.1}`}
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                  strokeDasharray="7 6"
                  strokeDashoffset={-fieldFlow}
                  opacity="0.7"
                />
              ))}
              <circle cx={-135 - repelShift} cy="0" r="46" fill="#9F1239" stroke="#F43F5E" strokeWidth="4" />
              <text x={-135 - repelShift} y="14" textAnchor="middle" fill="#FFF" fontSize="42" fontWeight="800">+</text>
              <circle cx={135 + repelShift} cy="0" r="46" fill="#9F1239" stroke="#F43F5E" strokeWidth="4" />
              <text x={135 + repelShift} y="14" textAnchor="middle" fill="#FFF" fontSize="42" fontWeight="800">+</text>
              <text x="0" y="145" textAnchor="middle" fill="#FDA4AF" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                সমধর্মী চার্জ: বিকর্ষণ (← →)
              </text>
            </g>

            {/* Top-Right: Opposite Charges Attract (+ -> <- -) with Animated Connecting Field Lines */}
            <g transform="translate(1380, 405)">
              {[-45, 0, 45].map((fy) => (
                <path
                  key={fy}
                  d={`M ${-80 + repelShift * 0.6},0 Q 0,${fy * 1.5} ${80 - repelShift * 0.6},0`}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.8"
                  strokeDasharray="7 6"
                  strokeDashoffset={-fieldFlow}
                  opacity="0.78"
                />
              ))}
              <circle cx={-120 + repelShift * 0.6} cy="0" r="46" fill="#9F1239" stroke="#F43F5E" strokeWidth="4" />
              <text x={-120 + repelShift * 0.6} y="14" textAnchor="middle" fill="#FFF" fontSize="42" fontWeight="800">+</text>
              <circle cx={120 - repelShift * 0.6} cy="0" r="46" fill="#075985" stroke="#38BDF8" strokeWidth="4" />
              <text x={120 - repelShift * 0.6} y="14" textAnchor="middle" fill="#FFF" fontSize="42" fontWeight="800">-</text>
              <text x="0" y="145" textAnchor="middle" fill="#BAE6FD" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                বিপরীত চার্জ: আকর্ষণ (→ ←)
              </text>
            </g>

            {/* Bottom Callback: 1909 Positive Gold Nucleus Repelling Positive Alpha Bullet */}
            <g transform="translate(960, 770)">
              <rect x="-540" y="-95" width="1080" height="185" rx="18" fill="rgba(15, 23, 42, 0.8)" stroke="#FBBF24" strokeWidth="2.5" />
              <circle cx="140" cy="-12" r="34" fill="#9F1239" stroke="#FBBF24" strokeWidth="3.5" />
              <text x="140" y="-2" textAnchor="middle" fill="#FEF08A" fontSize="26" fontWeight="800">+79</text>
              <path d="M -280,-12 Q 20,-12 -140,-75" fill="none" stroke="#10B981" strokeWidth="4.5" strokeDasharray="10 6" />
              <circle cx="-140" cy="-75" r="14" fill="#10B981" />
              <text x="0" y="62" textAnchor="middle" fill="#FDE68A" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                এই বিকর্ষণেই ১৯০৯-এ ধনাত্মক সোনার নিউক্লিয়াস আলফা কণাকে ঠেলে দিয়েছিল!
              </text>
            </g>
          </svg>
        )}

        <DustMotes frame={frame} cx={960} cy={520} radius={460} count={28} opacity={0.45} seed={42} />
      </div>
    </div>
  );
};
