import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { DustMotes, EASE_INOUT, EASE_OUT, FilmGrade, ci, rnd } from './scene1/Scene1Shared';

/**
 * Scene 05: Quantum Probability Electron Cloud Atom + Attraction/Repulsion (1292 frames / 19.04s)
 * Strictly follows VISUAL_STYLE_GUIDE.md:
 * - NO planetary Bohr rings; renders volumetric quantum probability electron cloud.
 * - Voice-synced to scene5.mp3: matter zoom -> nucleus -> electron cloud -> attraction vs repulsion.
 */
export const ElectronCloudAtom: React.FC = () => {
  const frame = useCurrentFrame();

  const isAtomPhase = frame < 825;
  const isForcePhase = frame >= 805;

  // Camera zoom progression in Atom Phase:
  // 0..175: matter lattice -> atom
  // 175..450: tight push-in on vibrating nucleus
  // 450..815: pull-back to reveal full quantum probability cloud (atom shifted left so text sits right!)
  const atomZoom = ci(frame, [0, 175, 430, 520, 810], [0.55, 1.1, 1.95, 1.0, 1.08], EASE_INOUT);
  const atomX = ci(frame, [430, 520], [1260, 580], EASE_INOUT);
  const cloudOpacity = ci(frame, [0, 140, 445, 525], [0.25, 0.45, 0.25, 1.0], EASE_OUT);

  // Force Phase (805..1292): Attraction (+ / -) vs Repulsion (+ / +)
  const forceLocal = Math.max(0, frame - 805);
  const attractCycle = (Math.sin(forceLocal * 0.065) + 1) * 0.5;
  const attractDist = ci(attractCycle, [0, 1], [155, 54]);
  const repelDist = ci(attractCycle, [0, 1], [54, 175]);

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: isForcePhase
          ? 'radial-gradient(ellipse at 50% 55%, #12152E 0%, #050811 76%)'
          : frame >= 460
            ? 'radial-gradient(ellipse at 32% 50%, #081A2E 0%, #050811 76%)'
            : 'radial-gradient(ellipse at 65% 50%, #1B1024 0%, #050811 76%)',
        overflow: 'hidden',
      }}
    >
      {/* Atom & Quantum Cloud Phase (0..825f) */}
      {isAtomPhase && (
        <div
          style={{
            position: 'absolute',
            left: atomX,
            top: 520,
            transform: `translate(-50%, -50%) scale(${atomZoom.toFixed(4)})`,
            opacity: ci(frame, [0, 24, 795, 825], [0, 1, 1, 0], EASE_INOUT),
          }}
        >
          <svg width="720" height="720" viewBox="-360 -360 720 720" style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="qCloudOuter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#0284C7" stopOpacity="0.22" />
                <stop offset="80%" stopColor="#0369A1" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="qCloudInner" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Volumetric Quantum Probability Electron Cloud (NO Bohr tracks!) */}
            <g opacity={cloudOpacity}>
              <circle cx="0" cy="0" r={275 + Math.sin(frame * 0.06) * 14} fill="url(#qCloudOuter)" />
              <ellipse
                cx="0"
                cy="0"
                rx={210 + Math.cos(frame * 0.08) * 12}
                ry={150 + Math.sin(frame * 0.08) * 12}
                transform={`rotate(${frame * 0.7})`}
                fill="url(#qCloudInner)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx={195 + Math.sin(frame * 0.07) * 10}
                ry={135 + Math.cos(frame * 0.07) * 10}
                transform={`rotate(${-frame * 0.55 + 60})`}
                fill="url(#qCloudInner)"
              />
              {/* Quantum Probability Density Dots shimmering inside cloud */}
              {Array.from({ length: 42 }).map((_, i) => {
                const a = rnd(i * 7) * Math.PI * 2 + frame * 0.015 * (i % 2 ? 1 : -1);
                const r = 75 + rnd(i * 11) * 175;
                const twinkle = 0.25 + 0.75 * Math.abs(Math.sin(frame * 0.1 + i));
                return (
                  <circle
                    key={i}
                    cx={Math.cos(a) * r}
                    cy={Math.sin(a) * r}
                    r={2.2 + rnd(i * 3) * 2.5}
                    fill="#E0F2FE"
                    opacity={twinkle * 0.85}
                  />
                );
              })}
            </g>

            {/* Tightly Bound Nucleus (Protons #F43F5E + Neutrons #94A3B8) */}
            <g transform={`translate(${Math.sin(frame * 0.35) * 1.6}, ${Math.cos(frame * 0.4) * 1.6})`}>
              {[
                { x: -16, y: -12, p: true },
                { x: 16, y: -14, p: false },
                { x: 0, y: 18, p: true },
                { x: -18, y: 12, p: false },
                { x: 18, y: 12, p: true },
                { x: 0, y: -2, p: false },
              ].map((n, idx) => (
                <g key={idx} transform={`translate(${n.x}, ${n.y})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r="17"
                    fill={n.p ? '#F43F5E' : '#64748B'}
                    stroke={n.p ? '#FDA4AF' : '#CBD5E1'}
                    strokeWidth="2"
                  />
                  {n.p && (
                    <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="700">+</text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>
      )}

      {/* Attraction vs Repulsion Phase (805..1292f) */}
      {isForcePhase && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [805, 835], [0, 1], EASE_OUT),
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 140,
              right: 140,
              top: 380,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {/* Card 1: Opposite Charges Attract (+ and -) */}
            <div
              style={{
                width: 720,
                height: 460,
                borderRadius: 28,
                background: 'rgba(15, 23, 42, 0.72)',
                border: '2px solid rgba(52, 211, 153, 0.45)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
              }}
            >
              <svg width="500" height="240" viewBox="-250 -120 500 240" style={{ overflow: 'visible' }}>
                <line x1={-attractDist} y1="0" x2={attractDist} y2="0" stroke="#34D399" strokeWidth="3" strokeDasharray="8 6" />
                <g transform={`translate(${-attractDist}, 0)`}>
                  <circle cx="0" cy="0" r="44" fill="#E11D48" stroke="#FDA4AF" strokeWidth="3" />
                  <text x="0" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="42" fontWeight="700">+</text>
                </g>
                <g transform={`translate(${attractDist}, 0)`}>
                  <circle cx="0" cy="0" r="44" fill="#0284C7" stroke="#BAE6FD" strokeWidth="3" />
                  <text x="0" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="46" fontWeight="700">−</text>
                </g>
              </svg>
              <span
                style={{
                  fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                  fontSize: 40,
                  fontWeight: 700,
                  color: '#34D399',
                }}
              >
                বিপরীত চার্জ → আকর্ষণ
              </span>
            </div>

            {/* Card 2: Like Charges Repel (+ and +) */}
            <div
              style={{
                width: 720,
                height: 460,
                borderRadius: 28,
                background: 'rgba(15, 23, 42, 0.72)',
                border: '2px solid rgba(244, 63, 94, 0.45)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
              }}
            >
              <svg width="500" height="240" viewBox="-250 -120 500 240" style={{ overflow: 'visible' }}>
                <g transform={`translate(${-repelDist}, 0)`}>
                  <circle cx="0" cy="0" r="44" fill="#E11D48" stroke="#FDA4AF" strokeWidth="3" />
                  <text x="0" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="42" fontWeight="700">+</text>
                </g>
                <g transform={`translate(${repelDist}, 0)`}>
                  <circle cx="0" cy="0" r="44" fill="#E11D48" stroke="#FDA4AF" strokeWidth="3" />
                  <text x="0" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="42" fontWeight="700">+</text>
                </g>
              </svg>
              <span
                style={{
                  fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                  fontSize: 40,
                  fontWeight: 700,
                  color: '#FB7185',
                }}
              >
                সমচার্জ → বিকর্ষণ
              </span>
            </div>
          </div>
        </div>
      )}

      <DustMotes
        frame={frame}
        cx={isForcePhase ? 960 : atomX}
        cy={520}
        radius={400}
        count={28}
        opacity={0.5}
        color="#38BDF8"
        seed={105}
      />

      <FilmGrade frame={frame} vignette={0.52} />

      <Sequence from={465} durationInFrames={90}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_feather_snap.mp3')} volume={0.25} />
      </Sequence>

      {/* Voice-Synced Alternating Kinetic Typography */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={10}
        endFrame={175}
        lines={[{ text: 'পরমাণুর জগৎ', highlight: 'পরমাণুর', sizePx: 86 }]}
        x={100}
        y={410}
        accentColor="#A78BFA"
        variant="spring"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={192}
        endFrame={445}
        lines={[{ text: 'ধনাত্মক প্রোটন (+)', highlight: 'প্রোটন', sizePx: 78 }]}
        x={100}
        y={410}
        accentColor="#F43F5E"
        variant="slide"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={468}
        endFrame={790}
        lines={[{ text: 'ইলেকট্রন মেঘ (e⁻)', highlight: 'মেঘ', sizePx: 78 }]}
        x={1040}
        y={410}
        accentColor="#38BDF8"
        variant="shadow"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={818}
        endFrame={1280}
        lines={[{ text: 'আকর্ষণ ও বিকর্ষণ', highlight: 'আকর্ষণ', sizePx: 84 }]}
        align="center"
        x={960}
        y={150}
        accentColor="#34D399"
        variant="spark"
      />
    </div>
  );
};
