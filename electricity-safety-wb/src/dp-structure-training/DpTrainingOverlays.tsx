import React from 'react';
import { AbsoluteFill, interpolate, spring } from 'remotion';
import {
  DP_TRAINING_TERMINALS,
  project3DTo2D,
  projectPolylineTo2D,
  Vec3,
} from './dpTrainingContinuity';

export const FONT_BN = "'Hind Siliguri', 'Noto Sans Bengali', 'Nirmala UI', sans-serif";

export interface CalloutItem {
  id: string;
  label: string;
  terminalKey: string;
  offsetX: number;
  offsetY: number;
  start: number;
  end: number;
  accent?: string;
}

export interface PinpointAnnotation {
  id: string;
  kind: 'bad' | 'good';
  label: string;
  anchorPos: Vec3;
  traceWorldPoints?: Vec3[];
  offsetX: number;
  offsetY: number;
  start: number;
  end: number;
}

export const ProjectedCalloutsOverlay: React.FC<{
  frame: number;
  fps: number;
  camPos: Vec3;
  camLook: Vec3;
  items: CalloutItem[];
}> = ({ frame, fps, camPos, camLook, items }) => {
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter id="trainShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#020617" floodOpacity="0.68" />
        </filter>
      </defs>
      {items.map((c) => {
        if (frame < c.start || frame > c.end) return null;
        const term = DP_TRAINING_TERMINALS[c.terminalKey];
        if (!term) return null;
        const proj = project3DTo2D(term.position, camPos, camLook, 45, 1920, 1080);
        if (!proj.visible || proj.x < 30 || proj.x > 1890 || proj.y < 30 || proj.y > 1050) {
          return null;
        }

        const enter = spring({
          frame: frame - c.start,
          fps,
          config: { damping: 18, stiffness: 155, mass: 0.7 },
        });
        const exit = interpolate(frame, [c.end - 16, c.end], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = Math.min(enter, exit);
        if (opacity <= 0.02) return null;

        const accent = c.accent ?? '#38BDF8';
        const boxW = Math.max(180, c.label.length * 13 + 38);
        const boxH = 44;
        const labelX = Math.max(54, Math.min(1920 - boxW - 54, proj.x + c.offsetX));
        const labelY = Math.max(70, Math.min(1080 - boxH - 120, proj.y + c.offsetY));
        const attachX = labelX + (proj.x < labelX ? 0 : boxW);
        const attachY = labelY + boxH / 2;
        const elbowX = proj.x + (attachX - proj.x) * 0.45;

        return (
          <g key={c.id} opacity={opacity}>
            <polyline
              points={`${proj.x},${proj.y} ${elbowX},${attachY} ${attachX},${attachY}`}
              fill="none"
              stroke={accent}
              strokeWidth={2.2}
              strokeDasharray="6 4"
            />
            <circle cx={proj.x} cy={proj.y} r={9} fill={accent} fillOpacity={0.22} />
            <circle cx={proj.x} cy={proj.y} r={4.8} fill={accent} stroke="#F8FAFC" strokeWidth={1.6} />

            <g filter="url(#trainShadow)">
              <rect
                x={labelX}
                y={labelY}
                width={boxW}
                height={boxH}
                rx={8}
                fill="rgba(15, 23, 42, 0.90)"
                stroke={accent}
                strokeWidth={1.6}
              />
              <rect x={labelX} y={labelY} width={6} height={boxH} rx={3} fill={accent} />
              <text
                x={labelX + 20}
                y={labelY + 29}
                fill="#F8FAFC"
                fontFamily={FONT_BN}
                fontSize={22}
                fontWeight={700}
              >
                {c.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export const PinpointMarksOverlay: React.FC<{
  frame: number;
  fps: number;
  camPos: Vec3;
  camLook: Vec3;
  marks: PinpointAnnotation[];
}> = ({ frame, fps, camPos, camLook, marks }) => {
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {marks.map((m) => {
        if (frame < m.start || frame > m.end) return null;
        const local = frame - m.start;
        const len = m.end - m.start;

        const enter = spring({
          frame: local,
          fps,
          config: { damping: 15, stiffness: 170, mass: 0.65 },
        });
        const exit = interpolate(local, [len - 16, len], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const alpha = Math.min(enter, exit);
        if (alpha <= 0.02) return null;

        const proj = project3DTo2D(m.anchorPos, camPos, camLook, 45, 1920, 1080);
        if (!proj.visible) return null;

        const color = m.kind === 'bad' ? '#EF4444' : '#22C55E';
        const drawProg = interpolate(local, [4, 28], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const pulse = 0.5 + 0.5 * Math.sin(local * 0.22);

        // Optional component/conductor path trace
        let tracePath = '';
        if (m.traceWorldPoints && m.traceWorldPoints.length >= 2) {
          const pts2 = projectPolylineTo2D(m.traceWorldPoints, camPos, camLook, 45, 1920, 1080);
          if (pts2.length >= 2) {
            const count = Math.max(2, Math.round(pts2.length * drawProg));
            tracePath = pts2
              .slice(0, count)
              .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
              .join(' ');
          }
        }

        const boxW = Math.max(230, m.label.length * 13.5 + 72);
        const boxH = 54;
        const labelX = Math.max(54, Math.min(1920 - boxW - 54, proj.x + m.offsetX));
        const labelY = Math.max(70, Math.min(1080 - boxH - 120, proj.y + m.offsetY));
        const attachX = labelX + (proj.x < labelX ? 0 : boxW);
        const attachY = labelY + boxH / 2;

        return (
          <g key={m.id} opacity={alpha}>
            {/* Component-level animated outline trace */}
            {tracePath && (
              <>
                <polyline
                  points={tracePath}
                  fill="none"
                  stroke={color}
                  strokeWidth={10}
                  strokeOpacity={0.22 + pulse * 0.14}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points={tracePath}
                  fill="none"
                  stroke={color}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}

            {/* Leader line to exact 3D anchor */}
            <line
              x1={proj.x}
              y1={proj.y}
              x2={attachX}
              y2={attachY}
              stroke={color}
              strokeWidth={2.4}
              strokeDasharray="6 4"
            />
            <circle cx={proj.x} cy={proj.y} r={14 + pulse * 4} fill={color} fillOpacity={0.18} />
            <circle cx={proj.x} cy={proj.y} r={6} fill={color} stroke="#F8FAFC" strokeWidth={2} />

            {/* Pinpoint Symbol + Bengali Label Pill */}
            <g transform={`translate(${labelX}, ${labelY})`}>
              <rect
                x={0}
                y={0}
                width={boxW}
                height={boxH}
                rx={10}
                fill="rgba(15, 23, 42, 0.92)"
                stroke={color}
                strokeWidth={2.2}
              />
              <circle cx={27} cy={27} r={16} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={2} />
              {m.kind === 'bad' ? (
                <g stroke={color} strokeWidth={3.4} strokeLinecap="round">
                  <line x1={20} y1={20} x2={34} y2={34} />
                  <line x1={34} y1={20} x2={20} y2={34} />
                </g>
              ) : (
                <polyline
                  points="19,28 25,34 36,21"
                  fill="none"
                  stroke={color}
                  strokeWidth={3.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <text
                x={54}
                y={35}
                fill="#F8FAFC"
                fontFamily={FONT_BN}
                fontSize={23}
                fontWeight={700}
              >
                {m.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export const SafetyPrerequisiteStrip: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < 30 || frame > 430) return null;
  const alpha = Math.min(
    interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    interpolate(frame, [400, 430], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const items = [
    'অনুমোদিত কর্মী',
    'কাজের অনুমতিপত্র',
    'বিদ্যুৎ বিচ্ছিন্নকরণ ও যাচাই',
    'নির্ধারিত আর্থিং',
    'সুরক্ষা সরঞ্জাম',
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 44,
        left: 68,
        opacity: alpha,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        backgroundColor: 'rgba(15, 23, 42, 0.88)',
        borderLeft: '5px solid #22C55E',
        borderRadius: '0 10px 10px 0',
        padding: '12px 20px',
        fontFamily: FONT_BN,
      }}
    >
      <div style={{ color: '#22C55E', fontSize: 18, fontWeight: 700 }}>নিরাপদ কাজের পূর্বশর্ত</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.14)',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              color: '#F8FAFC',
              fontSize: 17,
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 6,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export const DocumentationRecordCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < 4960 || frame > 5280) return null;
  const local = frame - 4960;
  const enter = spring({ frame: local, fps, config: { damping: 16, stiffness: 140 } });
  const exit = interpolate(local, [295, 320], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const alpha = Math.min(enter, exit);

  return (
    <div
      style={{
        position: 'absolute',
        right: 76,
        top: 90,
        width: 370,
        opacity: alpha,
        transform: `translateY(${(1 - enter) * 24}px)`,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        border: '2px solid #38BDF8',
        borderRadius: 14,
        padding: 18,
        fontFamily: FONT_BN,
        boxShadow: '0 18px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ color: '#38BDF8', fontSize: 19, fontWeight: 700 }}>ডকুমেন্টেশন রেকর্ড</span>
        <span style={{ color: '#22C55E', fontSize: 18, fontWeight: 700 }}>✓ সংরক্ষিত</span>
      </div>
      {/* Schematic thumbnail of completed DP structure */}
      <svg width="334" height="150" viewBox="0 0 334 150" style={{ background: '#0F172A', borderRadius: 8 }}>
        <line x1="115" y1="20" x2="115" y2="135" stroke="#94A3B8" strokeWidth="7" />
        <line x1="219" y1="20" x2="219" y2="135" stroke="#94A3B8" strokeWidth="7" />
        <line x1="88" y1="36" x2="246" y2="36" stroke="#64748B" strokeWidth="5" />
        <line x1="88" y1="56" x2="246" y2="56" stroke="#64748B" strokeWidth="5" />
        <rect x="135" y="72" width="64" height="42" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M167,114 Q195,122 219,130" fill="none" stroke="#22C55E" strokeWidth="3" />
      </svg>
      <div style={{ color: '#F8FAFC', fontSize: 20, fontWeight: 700, marginTop: 10 }}>
        কাজ শেষে ছবি ও রেকর্ড সংরক্ষণ
      </div>
    </div>
  );
};

export const FinalBadgeReveal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < 5460) return null;
  const local = frame - 5460;
  const pop = spring({ frame: local, fps, config: { damping: 16, stiffness: 135, mass: 0.8 } });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 64,
      }}
    >
      <div
        style={{
          opacity: pop,
          transform: `translateY(${(1 - pop) * 28}px) scale(${0.92 + pop * 0.08})`,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          border: '2px solid #F59E0B',
          borderRadius: 18,
          padding: '18px 36px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.58)',
          fontFamily: FONT_BN,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'rgba(245, 158, 11, 0.16)',
            border: '2.5px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F59E0B',
            fontSize: 34,
            fontWeight: 800,
          }}
        >
          ✓
        </div>
        <div>
          <div style={{ color: '#F8FAFC', fontSize: 36, fontWeight: 800, lineHeight: 1.15 }}>
            ডিপি স্ট্রাকচার ড্রেসিং
          </div>
          <div style={{ color: '#F59E0B', fontSize: 26, fontWeight: 700, marginTop: 4 }}>
            কাজের কারিগর ব্যাজ
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
