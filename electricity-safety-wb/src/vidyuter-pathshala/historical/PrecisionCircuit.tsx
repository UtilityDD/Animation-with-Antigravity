import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { DustMotes, EASE_OUT, FilmGrade, ci } from './scene1/Scene1Shared';

/**
 * Scene 07: Precision Closed Circuit, Voltage Push & Electron Conservation (1278 frames / 18.80s)
 * Synced to scene7.mp3:
 * - 0..315f: Knife switch snaps shut -> closed-loop electron drift (চল তড়িৎ)
 * - 325..575f: Battery voltage push + Tungsten filament heating up (ভোল্টেজ ও আলো)
 * - 585..1278f: Equal incoming/outgoing electron counters around bulb ("বাল্ব কখনো ইলেকট্রন খায় না")
 */
export const PrecisionCircuit: React.FC = () => {
  const frame = useCurrentFrame();

  const switchClosed = ci(frame, [45, 68], [0, 1], EASE_OUT);
  const driftSpeed = switchClosed > 0.5 ? frame * 1.8 : 0;
  const filamentHeat = ci(frame, [340, 480], [0, 1], EASE_OUT) * switchClosed;
  const showCounters = ci(frame, [595, 635], [0, 1], EASE_OUT);

  // Circuit loop coordinates on Right Stage (centered at 1280, 520)
  // Loop box: x in [-260, 260], y in [-150, 150]
  const perimeterPos = (tNorm: number) => {
    const p = ((tNorm % 1) + 1) % 1;
    if (p < 0.28) {
      const u = p / 0.28;
      return { x: -260 + u * 520, y: -150 }; // Top wire (left -> right)
    }
    if (p < 0.5) {
      const u = (p - 0.28) / 0.22;
      return { x: 260, y: -150 + u * 300 }; // Right wire (top -> bottom)
    }
    if (p < 0.78) {
      const u = (p - 0.5) / 0.28;
      return { x: 260 - u * 520, y: 150 }; // Bottom wire (right -> left)
    }
    const u = (p - 0.78) / 0.22;
    return { x: -260, y: 150 - u * 300 }; // Left wire (bottom -> top)
  };

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: 'radial-gradient(ellipse at 66% 50%, #0D1C30 0%, #050811 76%)',
        overflow: 'hidden',
      }}
    >
      {/* Circuit Stage on Right (x=1260, y=520) */}
      <div
        style={{
          position: 'absolute',
          left: 1260,
          top: 520,
          transform: `translate(-50%, -50%) scale(${ci(frame, [0, 1270], [0.96, 1.04]).toFixed(4)})`,
        }}
      >
        <svg width="780" height="560" viewBox="-390 -280 780 560" style={{ overflow: 'visible' }}>
          {/* Bulb Light Radiance */}
          <circle
            cx="0"
            cy="-150"
            r={95 + filamentHeat * 140}
            fill="#FBBF24"
            opacity={0.08 + filamentHeat * 0.26}
          />

          {/* Copper Circuit Loop */}
          <rect
            x="-260"
            y="-150"
            width="520"
            height="300"
            rx="16"
            fill="none"
            stroke="#B45309"
            strokeWidth="12"
          />

          {/* Battery / Voltage Pump on Bottom Wire (x=0, y=150) */}
          <g transform="translate(0, 150)">
            <rect x="-78" y="-34" width="156" height="68" rx="12" fill="#0F172A" stroke="#34D399" strokeWidth="3" />
            <text x="-44" y="10" textAnchor="middle" fill="#38BDF8" fontSize="28" fontWeight="700">−</text>
            <text x="44" y="10" textAnchor="middle" fill="#F43F5E" fontSize="28" fontWeight="700">+</text>
            <text x="0" y="64" textAnchor="middle" fill="#6EE7B7" fontSize="22" fontWeight="600" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              ভোল্টেজ (চাপ)
            </text>
          </g>

          {/* Knife Switch on Left Wire */}
          <g transform="translate(-260, 0)">
            <circle cx="0" cy="34" r="8" fill="#FBBF24" />
            <circle cx="0" cy="-34" r="8" fill="#FBBF24" />
            <line
              x1="0"
              y1="34"
              x2={-38 * (1 - switchClosed)}
              y2={-34}
              stroke="#FEF08A"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          {/* Tungsten Filament Bulb on Top Wire (x=0, y=-150) */}
          <g transform="translate(0, -150)">
            <circle
              cx="0"
              cy="-28"
              r="52"
              fill={filamentHeat > 0.2 ? '#FEF08A' : '#1E293B'}
              fillOpacity={0.15 + filamentHeat * 0.65}
              stroke="#CBD5E1"
              strokeWidth="3"
            />
            <path
              d="M -16,0 L -10,-32 L -4,-20 L 0,-36 L 4,-20 L 10,-32 L 16,0"
              fill="none"
              stroke={filamentHeat > 0.3 ? '#FFFFFF' : '#94A3B8'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Drifting Electron Particles along Closed Loop */}
          {Array.from({ length: 14 }).map((_, i) => {
            const pos = perimeterPos(i / 14 + driftSpeed * 0.00055);
            return (
              <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle cx="0" cy="0" r="9" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1.5" />
                <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">−</text>
              </g>
            );
          })}

          {/* Incoming vs Outgoing Electron Conservation Badges (frames 595+) */}
          {showCounters > 0.01 && (
            <g opacity={showCounters}>
              <g transform="translate(-155, -210)">
                <rect x="-82" y="-22" width="164" height="44" rx="10" fill="rgba(15,23,42,0.88)" stroke="#38BDF8" strokeWidth="2" />
                <text x="0" y="7" textAnchor="middle" fill="#BAE6FD" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  প্রবেশ: সমান e⁻
                </text>
              </g>
              <g transform="translate(155, -210)">
                <rect x="-82" y="-22" width="164" height="44" rx="10" fill="rgba(15,23,42,0.88)" stroke="#34D399" strokeWidth="2" />
                <text x="0" y="7" textAnchor="middle" fill="#A7F3D0" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  নির্গমন: সমান e⁻
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      <DustMotes frame={frame} cx={1260} cy={520} radius={380} count={24} opacity={0.5} color="#38BDF8" seed={107} />

      <FilmGrade frame={frame} vignette={0.52} />

      <Sequence from={45} durationInFrames={70}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_feather_snap.mp3')} volume={0.25} />
      </Sequence>

      <VidyuterKineticTitle
        frame={frame}
        startFrame={10}
        endFrame={315}
        lines={[{ text: 'চল তড়িৎ প্রবাহ', highlight: 'চল', sizePx: 82 }]}
        x={100}
        y={410}
        accentColor="#38BDF8"
        variant="slide"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={326}
        endFrame={570}
        lines={[{ text: 'ভোল্টেজ ও আলো', highlight: 'ভোল্টেজ', sizePx: 82 }]}
        x={100}
        y={410}
        accentColor="#FBBF24"
        variant="spark"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={586}
        endFrame={1265}
        lines={[{ text: 'ইলেকট্রন খরচ হয় না!', highlight: 'না!', sizePx: 78 }]}
        x={100}
        y={410}
        accentColor="#34D399"
        variant="spring"
      />
    </div>
  );
};
