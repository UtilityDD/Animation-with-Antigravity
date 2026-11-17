import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { DustMotes, EASE_INOUT, EASE_OUT, FilmGrade, ci } from './scene1/Scene1Shared';

/**
 * Scene 03: Ancient to Modern Morph + Core Question Hook (740 frames / 9.84s)
 * Synced to scene3.mp3:
 * - 0..255f: Modern switch snap + glowing lamp & smartphone fast-charge
 * - 250..490f: Particle morph from Voltaic pile -> modern Li-Ion core & power grid
 * - 490..740f: Full-screen centered Hero Question ("আসলে বিদ্যুৎ কী?")
 */
export const MorphTransition: React.FC = () => {
  const frame = useCurrentFrame();

  const isBeat1 = frame < 265;
  const isBeat2 = frame >= 245 && frame < 500;
  const isBeat3 = frame >= 480;

  // Beat 1 switch snap at frame 75
  const switchOn = ci(frame, [68, 82], [0, 1], EASE_OUT);
  const chargePct = ci(frame, [95, 240], [0.18, 0.96], EASE_OUT);

  // Beat 2 morph progress
  const morphT = ci(frame, [285, 435], [0, 1], EASE_INOUT);
  const gridFlow = (frame * 3) % 40;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: isBeat3
          ? 'radial-gradient(ellipse at 50% 50%, #101E38 0%, #050811 75%)'
          : isBeat2
            ? 'radial-gradient(ellipse at 32% 50%, #091B2C 0%, #050811 78%)'
            : 'radial-gradient(ellipse at 68% 50%, #17160B 0%, #050811 78%)',
        overflow: 'hidden',
      }}
    >
      {/* Beat 1 (0..265f): Modern Wall Switch Snap + Glowing Lamp & Phone Charge (Right Stage) */}
      {isBeat1 && (
        <div
          style={{
            position: 'absolute',
            left: 1260,
            top: 520,
            transform: `translate(-50%, -50%) scale(${ci(frame, [0, 260], [0.94, 1.04]).toFixed(4)})`,
            opacity: ci(frame, [0, 18, 240, 265], [0, 1, 1, 0]),
          }}
        >
          <svg width="760" height="540" viewBox="-380 -270 760 540" style={{ overflow: 'visible' }}>
            {/* Warm Light Cone when switch snaps ON */}
            <circle cx="-130" cy="-90" r={180 * switchOn} fill="#FBBF24" opacity={0.18 * switchOn} />

            {/* Tactile Wall Switch */}
            <g transform="translate(-140, 30)">
              <rect x="-62" y="-92" width="124" height="184" rx="18" fill="#1E293B" stroke="#475569" strokeWidth="3" />
              <rect
                x="-28"
                y={switchOn > 0.5 ? -44 : -12}
                width="56"
                height="62"
                rx="8"
                fill={switchOn > 0.5 ? '#FBBF24' : '#64748B'}
              />
              <circle cx="0" cy="-66" r="6" fill={switchOn > 0.5 ? '#34D399' : '#475569'} />
            </g>

            {/* Connecting Power Cable */}
            <path
              d="M -78,30 L 40,30"
              fill="none"
              stroke={switchOn > 0.5 ? '#FBBF24' : '#334155'}
              strokeWidth="5"
              strokeDasharray="10 8"
              strokeDashoffset={-(frame * 2.5)}
            />

            {/* Smartphone Fast-Charging */}
            <g transform="translate(150, 0)">
              <rect x="-85" y="-155" width="170" height="310" rx="26" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
              <rect x="-68" y="-130" width="136" height="260" rx="14" fill="#020617" />
              {/* Battery Fill Bar */}
              <rect x="-36" y="-65" width="72" height="130" rx="10" fill="none" stroke="#64748B" strokeWidth="3" />
              <rect x="-14" y="-75" width="28" height="10" rx="3" fill="#64748B" />
              <rect
                x="-30"
                y={60 - chargePct * 118}
                width="60"
                height={chargePct * 118}
                rx="6"
                fill="#34D399"
                opacity={0.3 + 0.7 * switchOn}
              />
              {/* Lightning Bolt Icon */}
              <polygon
                points="6,-24 -14,6 0,6 -6,28 16,-4 2,-4"
                fill="#FEF08A"
                opacity={switchOn}
              />
            </g>
          </svg>
        </div>
      )}

      {/* Beat 2 (245..500f): Flipped Left Visual — Morphing from Ancient Pile to Power Grid */}
      {isBeat2 && (
        <div
          style={{
            position: 'absolute',
            left: 590,
            top: 520,
            transform: `translate(-50%, -50%) scale(${ci(frame, [245, 500], [0.95, 1.05]).toFixed(4)})`,
            opacity: ci(frame, [245, 270, 475, 500], [0, 1, 1, 0]),
          }}
        >
          <svg width="740" height="540" viewBox="-370 -270 740 540" style={{ overflow: 'visible' }}>
            {/* Ancient Voltaic Stack fading out */}
            <g opacity={1 - morphT} transform={`scale(${1 - morphT * 0.25})`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy={100 - i * 36}
                  rx="82"
                  ry="16"
                  fill={i % 2 === 0 ? '#D97706' : '#94A3B8'}
                  stroke="#FEF3C7"
                  strokeWidth="1.2"
                />
              ))}
            </g>

            {/* Modern High-Voltage Transmission Tower & Glowing Grid Lines morphing in */}
            <g opacity={morphT} transform={`scale(${0.8 + morphT * 0.2})`}>
              <polygon points="0,-195 -85,170 85,170" fill="none" stroke="#38BDF8" strokeWidth="4" />
              <line x1="-145" y1="-105" x2="145" y2="-105" stroke="#38BDF8" strokeWidth="4.5" />
              <line x1="-115" y1="-25" x2="115" y2="-25" stroke="#38BDF8" strokeWidth="4" />
              <line x1="-58" y1="60" x2="58" y2="60" stroke="#38BDF8" strokeWidth="3" />
              {/* Glowing Power Transmission Lines */}
              <path
                d="M -290,-65 Q -220,-20 -145,-105 M 145,-105 Q 220,-20 290,-65"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="3.5"
                strokeDasharray="14 10"
                strokeDashoffset={-gridFlow}
                filter="drop-shadow(0 0 10px #F59E0B)"
              />
            </g>
          </svg>
        </div>
      )}

      {/* Beat 3 (480..740f): Full-Screen Centered Hero Question ("আসলে বিদ্যুৎ কী?") */}
      {isBeat3 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [480, 505], [0, 1], EASE_OUT),
            pointerEvents: 'none',
          }}
        >
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            {[170, 270, 370].map((r, i) => {
              const pulse = ((frame - 480) * 1.6 + i * 45) % 140;
              return (
                <circle
                  key={r}
                  cx="960"
                  cy="515"
                  r={r + pulse}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1.8"
                  opacity={Math.max(0, 0.28 - pulse * 0.002)}
                />
              );
            })}
            <text
              x="960"
              y="665"
              textAnchor="middle"
              fill="#38BDF8"
              opacity={0.07 + Math.sin(frame * 0.08) * 0.02}
              fontSize="500"
              fontWeight="700"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ?
            </text>
          </svg>
        </div>
      )}

      <DustMotes
        frame={frame}
        cx={isBeat3 ? 960 : isBeat2 ? 590 : 1260}
        cy={520}
        radius={360}
        count={24}
        opacity={0.55}
        color={isBeat1 ? '#FBBF24' : '#38BDF8'}
        seed={103}
      />

      <FilmGrade frame={frame} vignette={0.52} />

      {/* Synced Snap SFX when switch clicks */}
      <Sequence from={65} durationInFrames={80}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_feather_snap.mp3')} volume={0.28} />
      </Sequence>

      {/* Voice-Synced Alternating Kinetic Typography */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={10}
        endFrame={250}
        lines={[{ text: 'প্রতিদিনের বিদ্যুৎ', highlight: 'বিদ্যুৎ', sizePx: 82 }]}
        x={100}
        y={420}
        accentColor="#FBBF24"
        variant="spark"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={262}
        endFrame={482}
        lines={[{ text: '২,৫০০ বছরের বিজ্ঞান', highlight: 'বিজ্ঞান', sizePx: 78 }]}
        x={1040}
        y={420}
        accentColor="#38BDF8"
        variant="slide"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={494}
        endFrame={735}
        lines={[{ text: 'আসলে বিদ্যুৎ কী?', highlight: 'কী?', sizePx: 102 }]}
        align="center"
        x={960}
        y={415}
        accentColor="#38BDF8"
        variant="spring"
      />
    </div>
  );
};
