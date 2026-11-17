import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';

/**
 * Stage 4D (0..1856 local frames):
 * - 0..760f: Copper shared-pool roaming electrons vs Plastic tightly gripped electrons
 * - 760..1460f: 4-second Pause-and-Think Question with ring timer
 * - 1460..1856f: Episode 03 Teaser ("চার্জের গতি ও তড়িৎ প্রবাহ")
 */
export const Stage4DConductorTeaserShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);

  const phase1 = ci(local, [0, 24, 730, 770], [0, 1, 1, 0], EASE_INOUT);
  const phase2 = ci(local, [745, 785, 1430, 1470], [0, 1, 1, 0], EASE_INOUT);
  const phase3 = ci(local, [1445, 1485], [0, 1], EASE_OUT);

  const timerProgress = ci(local, [860, 1280], [0, 1]);
  const circumference = 2 * Math.PI * 52;
  const riverFlow = (frame * 5.2) % 80;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #0F1D38 0%, #050811 78%)',
        opacity: fadeIn,
        overflow: 'hidden',
      }}
    >
      {/* PHASE 1: Copper Shared Community Pool vs Plastic Tightly Bound */}
      {phase1 > 0.01 && (
        <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: phase1 }}>
          {/* Copper Atom Lattice + Shared Free Electron Pool */}
          <g transform="translate(540, 550)">
            <rect x="-250" y="-155" width="500" height="310" rx="34" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" strokeWidth="3" strokeDasharray="10 8" />
            {[-130, 0, 130].map((cx) => (
              <circle key={cx} cx={cx} cy="0" r="26" fill="#D97706" stroke="#FDE68A" strokeWidth="2" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const ex = -215 + ((frame * 2.8 + i * 68) % 430);
              const ey = Math.sin(frame * 0.08 + i * 1.7) * 95;
              return <circle key={i} cx={ex} cy={ey} r="9" fill="#38BDF8" filter="drop-shadow(0 0 8px #38BDF8)" />;
            })}
            <text x="0" y="235" textAnchor="middle" fill="#FDE68A" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              তামার পরমাণু: খোলা পুকুরের মতো মুক্ত ইলেকট্রন
            </text>
          </g>

          {/* Plastic Atoms: Tightly Held */}
          <g transform="translate(1380, 550)">
            <circle cx="0" cy="0" r="165" fill="rgba(244, 63, 94, 0.08)" stroke="#F43F5E" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="24" fill="#334155" stroke="#94A3B8" strokeWidth="3" />
            {[0, 1, 2, 3].map((i) => {
              const ang = i * 1.57 + Math.sin(frame * 0.05) * 0.08;
              return <circle key={i} cx={Math.cos(ang) * 72} cy={Math.sin(ang) * 72} r="8" fill="#38BDF8" opacity="0.85" />;
            })}
            <text x="0" y="235" textAnchor="middle" fill="#FDA4AF" fontSize="30" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              প্লাস্টিক/রাবার: শক্ত বন্ধন (অপরিবাহী)
            </text>
          </g>
        </svg>
      )}

      {/* PHASE 2: Pause-and-Think Question with 4s Timer Ring */}
      {local >= 745 && phase2 > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: phase2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 180px',
            textAlign: 'center',
            fontFamily: "'Hind Siliguri', sans-serif",
          }}
        >
          <svg width="130" height="130" viewBox="0 0 130 130" style={{ marginBottom: 30 }}>
            <circle cx="65" cy="65" r="52" fill="none" stroke="#1E293B" strokeWidth="8" />
            <circle
              cx="65"
              cy="65"
              r="52"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - timerProgress)}
              transform="rotate(-90 65 65)"
            />
            <text x="65" y="75" textAnchor="middle" fill="#F8FAFC" fontSize="34" fontWeight="700">?</text>
          </svg>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#FDE68A', lineHeight: 1.45 }}>
            ভেবে বলো তো—একটি চিরুনি ঋণাত্মক চার্জ পেলে, তবে চুলে ঠিক কী ধরনের চার্জ তৈরি হবে—এবং কেন চিরুনি ও চুল একে অপরকে টানবে?
          </div>
        </div>
      )}

      {/* PHASE 3: Episode 03 Teaser ("চার্জের গতি ও তড়িৎ প্রবাহ") */}
      {local >= 1445 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: phase3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: "'Hind Siliguri', sans-serif",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 600, color: '#BAE6FD', marginBottom: 18 }}>
            পরবর্তী পর্ব ০৩
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, color: '#F8FAFC', marginBottom: 38 }}>
            চার্জের গতি ও <span style={{ color: '#38BDF8' }}>তড়িৎ প্রবাহ</span>
          </div>
          <svg width="900" height="110" viewBox="0 0 900 110">
            <rect x="40" y="25" width="820" height="60" rx="30" fill="rgba(217, 119, 6, 0.22)" stroke="#F59E0B" strokeWidth="3" />
            {Array.from({ length: 11 }).map((_, i) => (
              <circle key={i} cx={((i * 80 + riverFlow) % 780) + 60} cy="55" r="10" fill="#38BDF8" filter="drop-shadow(0 0 8px #38BDF8)" />
            ))}
          </svg>
        </div>
      )}

      <DustMotes frame={frame} cx={960} cy={520} radius={460} count={28} opacity={0.45} seed={44} />
    </div>
  );
};
