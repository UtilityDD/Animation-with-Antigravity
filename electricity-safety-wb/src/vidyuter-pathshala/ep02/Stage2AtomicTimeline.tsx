import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, camAt, camTransform, ci } from '../historical/scene1/Scene1Shared';

interface TimelineNode {
  x: number;
  year: string;
  name: string;
  desc: string;
  color: string;
  isPhilosophy?: boolean;
}

const NODES: TimelineNode[] = [
  { x: 340, year: 'খ্রি.পূ. ৪০০', name: 'ডেমোক্রিটাস', desc: 'অবিভাজ্য পরমাণু (অ্যাটমোস)', color: '#A855F7', isPhilosophy: true },
  { x: 960, year: '১৮০৩–১৮০৮', name: 'জন ডাল্টন', desc: 'রাসায়নিক প্রমাণ: নিরেট গোলক', color: '#94A3B8' },
  { x: 1480, year: '১৮৩৩', name: 'মাইকেল ফ্যারাডে', desc: 'তড়িৎ বিশ্লেষণে চার্জের সূত্র', color: '#F59E0B' },
  { x: 2000, year: '১৮৯৭', name: 'জে. জে. থমসন', desc: 'ক্যাথোড রশ্মি ও ইলেকট্রন', color: '#38BDF8' },
  { x: 2520, year: '১৯০৯', name: 'মিলিকান ও ফ্লেচার', desc: 'তেলবিন্দু পরীক্ষা: চার্জের একক', color: '#FBBF24' },
  { x: 3040, year: '১৯০৯–১৯১১', name: 'রাদারফোর্ড দল', desc: 'সোনার পাতে নিউক্লিয়াস আবিষ্কার', color: '#10B981' },
  { x: 3560, year: '১৯১৯–১৯৩২', name: 'প্রোটন ও নিউট্রন', desc: 'চ্যাডউইকের নিউট্রনসহ পূর্ণ কেন্দ্র', color: '#F43F5E' },
];

/**
 * Stage 2 (0..2855 local frames): Broken-Axis Timeline of Electrical Building Blocks
 * - "//" axis break between c. 400 BCE and 1803
 * - Smooth camera pan synced to the 7 discoveries
 */
export const Stage2AtomicTimeline: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [2820, 2855], [1, 0], EASE_INOUT);

  const cam = camAt(local, [
    { f: 0, x: 760, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 420, x: 920, y: 540, z: 1.02, sx: 960, sy: 540 },
    { f: 960, x: 1480, y: 540, z: 1.04, sx: 960, sy: 540 },
    { f: 1520, x: 2040, y: 540, z: 1.05, sx: 960, sy: 540 },
    { f: 2080, x: 2680, y: 540, z: 1.04, sx: 960, sy: 540 },
    { f: 2855, x: 3240, y: 540, z: 1.02, sx: 960, sy: 540 },
  ]);

  const pulse = (frame * 0.08) % (Math.PI * 2);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #0F1C34 0%, #050811 78%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 4000,
          height: 1080,
          transform: camTransform(cam),
          transformOrigin: '0 0',
        }}
      >
        <svg width="4000" height="1080" viewBox="0 0 4000 1080" style={{ overflow: 'visible' }}>
          {/* Horizontal Axis Line with "//" Broken-Axis Gap between 400 BCE (340) & 1803 (960) */}
          <line x1="160" y1="610" x2="620" y2="610" stroke="#38BDF8" strokeWidth="4" strokeOpacity="0.55" />
          <line x1="612" y1="636" x2="636" y2="584" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
          <line x1="636" y1="636" x2="660" y2="584" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
          <line x1="652" y1="610" x2="3780" y2="610" stroke="#38BDF8" strokeWidth="4" strokeOpacity="0.65" />

          {NODES.map((n, idx) => {
            const appearAt = idx * 340;
            const op = ci(local, [appearAt, appearAt + 45], [0.22, 1], EASE_OUT);
            const active = local >= appearAt && (idx === NODES.length - 1 || local < (idx + 1) * 340 + 180);
            const yStem = idx % 2 === 0 ? -135 : 135;

            return (
              <g key={n.year} transform={`translate(${n.x}, 610)`} opacity={op}>
                <line x1="0" y1="0" x2="0" y2={yStem} stroke={n.color} strokeWidth="3" strokeDasharray="6 5" />
                <circle
                  cx="0"
                  cy="0"
                  r={active ? 14 + Math.sin(pulse) * 2.5 : 10}
                  fill={n.color}
                  filter={active ? `drop-shadow(0 0 12px ${n.color})` : undefined}
                />

                {/* Conceptual Physics Vignette Icon */}
                <g transform={`translate(0, ${yStem > 0 ? yStem + 75 : yStem - 75})`}>
                  <circle cx="0" cy="0" r="46" fill="rgba(15, 23, 42, 0.85)" stroke={n.color} strokeWidth="2.5" />
                  {idx === 0 && <circle cx="0" cy="0" r="18" fill="none" stroke="#A855F7" strokeWidth="3" strokeDasharray="4 4" />}
                  {idx === 1 && <circle cx="0" cy="0" r="20" fill="#94A3B8" />}
                  {idx === 2 && (
                    <>
                      <rect x="-18" y="-16" width="36" height="34" rx="4" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                      <line x1="-8" y1="-22" x2="-8" y2="8" stroke="#38BDF8" strokeWidth="3" />
                      <line x1="8" y1="-22" x2="8" y2="8" stroke="#F43F5E" strokeWidth="3" />
                    </>
                  )}
                  {idx === 3 && (
                    <path d="M -26,4 Q 0,4 26,-14" fill="none" stroke="#10B981" strokeWidth="4" />
                  )}
                  {idx === 4 && (
                    <>
                      <line x1="-22" y1="-16" x2="22" y2="-16" stroke="#94A3B8" strokeWidth="3" />
                      <circle cx="0" cy="0" r="7" fill="#FBBF24" />
                      <line x1="-22" y1="16" x2="22" y2="16" stroke="#94A3B8" strokeWidth="3" />
                    </>
                  )}
                  {idx === 5 && (
                    <>
                      <circle cx="0" cy="0" r="7" fill="#F43F5E" />
                      <path d="M -26,4 Q -6,2 -22,-18" fill="none" stroke="#10B981" strokeWidth="3" />
                    </>
                  )}
                  {idx === 6 && (
                    <>
                      <circle cx="-7" cy="-5" r="7" fill="#F43F5E" />
                      <circle cx="7" cy="5" r="7" fill="#F43F5E" />
                      <circle cx="7" cy="-5" r="7" fill="#94A3B8" />
                      <circle cx="-7" cy="5" r="7" fill="#94A3B8" />
                    </>
                  )}

                  {/* Flagged Philosophy Badge for Democritus */}
                  {n.isPhilosophy && (
                    <g transform="translate(0, -64)">
                      <rect x="-56" y="-16" width="112" height="28" rx="14" fill="#581C87" stroke="#C084FC" strokeWidth="1.5" />
                      <text x="0" y="4" textAnchor="middle" fill="#F3E8FF" fontSize="18" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                        দর্শন (পরীক্ষা নয়)
                      </text>
                    </g>
                  )}

                  {/* Labels */}
                  <text
                    x="0"
                    y={yStem > 0 ? 78 : -78}
                    textAnchor="middle"
                    fill={n.color}
                    fontSize="26"
                    fontWeight="700"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {n.year} • {n.name}
                  </text>
                  <text
                    x="0"
                    y={yStem > 0 ? 110 : -48}
                    textAnchor="middle"
                    fill="#E2E8F0"
                    fontSize="22"
                    fontWeight="500"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {n.desc}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        <DustMotes frame={frame} cx={1900} cy={520} radius={700} count={36} opacity={0.45} seed={22} />
      </div>
    </div>
  );
};
