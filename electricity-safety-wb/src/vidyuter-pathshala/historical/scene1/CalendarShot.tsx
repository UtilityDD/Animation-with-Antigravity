import React from 'react';
import { EASE_IN, EASE_INOUT, EASE_OUT, ci, rnd, toBn } from './Scene1Shared';

const YEARS = [2026, 1900, 1757, 1600, 1206, 800, 320, 1, -150, -350, -600];

const eraOf = (y: number) => (y > 0 ? 'খ্রিষ্টাব্দ' : 'খ্রিস্টপূর্ব');

const Page: React.FC<{ year: number; shade?: number; glow?: number }> = ({ year, shade = 0, glow = 0 }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, #FFFDF6 0%, #F7F0DF 100%)',
      borderRadius: '0 0 14px 14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 70px rgba(150, 90, 20, 0.14)',
    }}
  >
    <div
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
        fontWeight: 600,
        fontSize: 34,
        color: year > 0 ? '#64748B' : '#B45309',
        marginBottom: -6,
      }}
    >
      {eraOf(year)}
    </div>
    <div
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
        fontWeight: 700,
        fontSize: 150,
        lineHeight: 1.05,
        color: year > 0 ? '#0F172A' : '#7C2D12',
        letterSpacing: '-0.02em',
        textShadow: glow > 0 ? `0 0 ${30 * glow}px rgba(251,191,36,${0.7 * glow})` : 'none',
      }}
    >
      {toBn(Math.abs(year))}
    </div>
    {shade > 0 && <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: shade }} />}
  </div>
);

export const CalendarShot: React.FC<{ frame: number }> = ({ frame }) => {
  const flips = YEARS.length - 1;
  const p = ci(frame, [14, 128], [0, flips], EASE_INOUT);
  const i = Math.min(Math.floor(p), flips - 1);
  const t = p >= flips ? 1 : p - i;
  const done = p >= flips;

  const glow = ci(frame, [128, 140, 175], [0, 1, 0.6]);

  // camera: gentle drift in, then crash push into the final page
  const intro = ci(frame, [0, 30], [0, 1], EASE_OUT);
  const push = ci(frame, [150, 190], [1, 3.2], EASE_IN);
  const scale = (0.86 + intro * 0.1 + frame * 0.0006) * push;
  const shake = frame > 14 && frame < 128 ? Math.sin(frame * 2.1) * 1.2 : 0;

  const W = 560;
  const H = 520;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 68% 50%, #1B1209 0%, #07090F 65%)' }}>
      {/* warm key light pool behind calendar */}
      <div
        style={{
          position: 'absolute',
          left: 1320 - 520,
          top: 540 - 520,
          width: 1040,
          height: 1040,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,170,60,0.20) 0%, rgba(251,170,60,0.05) 45%, rgba(0,0,0,0) 70%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 1320 - W / 2,
          top: 560 - H / 2,
          width: W,
          height: H,
          transform: `translate(${shake}px, 0) scale(${scale.toFixed(4)}) perspective(1600px) rotateX(10deg) rotateY(-14deg)`,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          opacity: intro,
        }}
      >
        {/* contact shadow */}
        <div
          style={{
            position: 'absolute',
            left: 30,
            right: 30,
            bottom: -40,
            height: 50,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.75)',
            filter: 'blur(18px)',
          }}
        />

        {/* stack thickness (pages below) */}
        {[3, 2, 1].map((k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: k * 2,
              right: -k * 2,
              top: 78 + k * 3,
              bottom: -k * 4,
              background: k % 2 ? '#EDE3CC' : '#F5ECD8',
              borderRadius: '0 0 14px 14px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
            }}
          />
        ))}

        {/* page area */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 78, bottom: 0, transformStyle: 'preserve-3d' }}>
          {/* page underneath (next year) */}
          <Page year={done ? YEARS[flips] : YEARS[i + 1]} shade={done ? 0 : 0.18 * (1 - t)} glow={done ? glow : 0} />

          {/* flipping page */}
          {!done && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: '50% 0%',
                transform: `rotateX(${(t * 178).toFixed(2)}deg)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <Page year={YEARS[i]} shade={Math.sin(t * Math.PI) * 0.35} />
            </div>
          )}
        </div>

        {/* binding header */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 84,
            borderRadius: '14px 14px 0 0',
            background: 'linear-gradient(180deg, #B91C1C 0%, #7F1D1D 100%)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.18)',
          }}
        />
        {/* binder rings */}
        {Array.from({ length: 7 }).map((_, k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: 48 + k * 76,
              top: 52,
              width: 16,
              height: 46,
              borderRadius: 8,
              background: 'linear-gradient(90deg, #64748B 0%, #F8FAFC 45%, #94A3B8 100%)',
              boxShadow: '0 3px 6px rgba(0,0,0,0.45)',
            }}
          />
        ))}
      </div>

      {/* paper dust kicked by flips */}
      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 26 }).map((_, k) => {
          const born = 20 + (k % 10) * 11;
          const age = frame - born;
          if (age < 0 || age > 60) return null;
          const x = 1320 + (rnd(k) - 0.5) * 520 + age * (rnd(k + 5) - 0.5) * 3;
          const y = 330 - age * (0.6 + rnd(k + 9)) + age * age * 0.02;
          return <circle key={k} cx={x} cy={y} r={1.5 + rnd(k + 2) * 2} fill="#FFE9C2" opacity={(1 - age / 60) * 0.6} />;
        })}
      </svg>

      {/* white-out flash as we punch through the page */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: ci(frame, [170, 192], [0, 1]) }} />
    </div>
  );
};
