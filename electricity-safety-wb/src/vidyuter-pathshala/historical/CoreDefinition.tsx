import React from 'react';
import { useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { DustMotes, EASE_INOUT, EASE_OUT, FilmGrade, ci } from './scene1/Scene1Shared';

/**
 * Scene 04: Scientific Definition & 3 Manifestations (1023 frames / 14.56s)
 * Synced to scene4.mp3:
 * - 0..520f: Electric Charge (Presence -> Force -> Motion)
 * - 520..1023f: 3 Manifestations (Static Charge, Current Flow, Electric Field)
 */
export const CoreDefinition: React.FC = () => {
  const frame = useCurrentFrame();

  const isPart1 = frame < 535;
  const isPart2 = frame >= 515;

  // Part 1 orbital force & motion dynamics
  const orbitAngle = frame * 0.045;
  const forcePulse = 0.5 + 0.5 * Math.sin(frame * 0.14);

  // Part 2 sequential spotlighting across the 3 manifestation spheres
  const activeSphere = frame < 680 ? 0 : frame < 800 ? 1 : 2;
  const flowOffset = (frame * 3.2) % 44;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: isPart1
          ? 'radial-gradient(ellipse at 65% 50%, #0D1B35 0%, #050811 76%)'
          : 'radial-gradient(ellipse at 50% 56%, #0B1930 0%, #050811 78%)',
        overflow: 'hidden',
      }}
    >
      {/* Part 1 (0..535f): Charge Presence + Dipole Force + Flow (Right Stage) */}
      {isPart1 && (
        <div
          style={{
            position: 'absolute',
            left: 1260,
            top: 520,
            transform: `translate(-50%, -50%) scale(${ci(frame, [0, 520], [0.95, 1.06]).toFixed(4)})`,
            opacity: ci(frame, [0, 22, 505, 535], [0, 1, 1, 0], EASE_INOUT),
          }}
        >
          <svg width="740" height="560" viewBox="-370 -280 740 560" style={{ overflow: 'visible' }}>
            {/* Electric Field Loops between + and - */}
            {[-120, -60, 0, 60, 120].map((arcY) => (
              <path
                key={arcY}
                d={`M -140,0 Q 0,${arcY * 1.9} 140,0`}
                fill="none"
                stroke="#A78BFA"
                strokeWidth="2.4"
                strokeDasharray="10 10"
                strokeDashoffset={-flowOffset}
                opacity={0.35 + 0.4 * forcePulse}
              />
            ))}

            {/* Positive Charge Sphere (+) */}
            <g transform={`translate(${-140 + Math.cos(orbitAngle) * 14}, ${Math.sin(orbitAngle) * 18})`}>
              <circle cx="0" cy="0" r="64" fill="rgba(244, 63, 94, 0.22)" />
              <circle cx="0" cy="0" r="46" fill="#E11D48" stroke="#FDA4AF" strokeWidth="3" />
              <text x="0" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="46" fontWeight="700">+</text>
            </g>

            {/* Negative Charge Sphere (-) */}
            <g transform={`translate(${140 - Math.cos(orbitAngle) * 14}, ${-Math.sin(orbitAngle) * 18})`}>
              <circle cx="0" cy="0" r="64" fill="rgba(56, 189, 248, 0.22)" />
              <circle cx="0" cy="0" r="46" fill="#0284C7" stroke="#BAE6FD" strokeWidth="3" />
              <text x="0" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="50" fontWeight="700">−</text>
            </g>
          </svg>
        </div>
      )}

      {/* Part 2 (515..1023f): 3 Conceptual Manifestation Spheres Across Lower Stage */}
      {isPart2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [515, 548], [0, 1], EASE_OUT),
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 120,
              right: 120,
              top: 400,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {[
              { title: 'স্থির তড়িৎ', color: '#FBBF24', idx: 0 },
              { title: 'চল তড়িৎ', color: '#34D399', idx: 1 },
              { title: 'বৈদ্যুতিক ক্ষেত্র', color: '#A78BFA', idx: 2 },
            ].map((item) => {
              const isFocused = activeSphere === item.idx;
              const s = isFocused ? 1.08 : 0.92;
              return (
                <div
                  key={item.idx}
                  style={{
                    width: 440,
                    height: 440,
                    borderRadius: 28,
                    background: isFocused
                      ? `radial-gradient(circle at 50% 42%, ${item.color}22 0%, rgba(15, 23, 42, 0.85) 72%)`
                      : 'rgba(15, 23, 42, 0.55)',
                    border: `2px solid ${isFocused ? item.color : '#1E293B'}`,
                    boxShadow: isFocused ? `0 0 42px ${item.color}33` : 'none',
                    transform: `scale(${s})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 28,
                  }}
                >
                  <svg width="240" height="220" viewBox="-120 -110 240 220" style={{ overflow: 'visible' }}>
                    {item.idx === 0 && (
                      /* Static Charge Plasma Sphere */
                      <g>
                        <circle cx="0" cy="0" r="76" fill="rgba(251, 191, 36, 0.14)" stroke="#FBBF24" strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="24" fill="#F59E0B" />
                        {[0, 60, 120, 180, 240, 300].map((deg) => {
                          const rad = ((deg + frame * 1.4) * Math.PI) / 180;
                          return (
                            <circle
                              key={deg}
                              cx={Math.cos(rad) * 52}
                              cy={Math.sin(rad) * 52}
                              r="7"
                              fill="#FEF08A"
                            />
                          );
                        })}
                      </g>
                    )}
                    {item.idx === 1 && (
                      /* Current Flow River */
                      <g>
                        <rect x="-95" y="-28" width="190" height="56" rx="28" fill="rgba(52, 211, 153, 0.14)" stroke="#34D399" strokeWidth="2.5" />
                        <line
                          x1="-80"
                          y1="0"
                          x2="80"
                          y2="0"
                          stroke="#34D399"
                          strokeWidth="6"
                          strokeDasharray="14 12"
                          strokeDashoffset={-flowOffset}
                        />
                      </g>
                    )}
                    {item.idx === 2 && (
                      /* Electric Field Radial Lines */
                      <g>
                        <circle cx="0" cy="0" r="22" fill="#A78BFA" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                          const rad = (deg * Math.PI) / 180;
                          const rPulse = 32 + ((frame * 0.9) % 45);
                          return (
                            <line
                              key={deg}
                              x1={Math.cos(rad) * 28}
                              y1={Math.sin(rad) * 28}
                              x2={Math.cos(rad) * rPulse}
                              y2={Math.sin(rad) * rPulse}
                              stroke="#C4B5FD"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          );
                        })}
                      </g>
                    )}
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                      fontSize: 38,
                      fontWeight: 700,
                      color: isFocused ? item.color : '#94A3B8',
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <DustMotes
        frame={frame}
        cx={isPart1 ? 1260 : 960}
        cy={520}
        radius={420}
        count={26}
        opacity={0.5}
        color={isPart1 ? '#A78BFA' : '#38BDF8'}
        seed={104}
      />

      <FilmGrade frame={frame} vignette={0.52} />

      {/* Voice-Synced Kinetic Typography */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={10}
        endFrame={515}
        lines={[
          { text: 'চার্জ, বল', highlight: 'চার্জ,', sizePx: 84 },
          { text: 'ও গতির রূপ', highlight: 'গতির', sizePx: 84 },
        ]}
        x={100}
        y={380}
        accentColor="#A78BFA"
        variant="slide"
      />

      <VidyuterKineticTitle
        frame={frame}
        startFrame={535}
        endFrame={1015}
        lines={[{ text: 'বিদ্যুতের তিন প্রকাশ', highlight: 'তিন', sizePx: 84 }]}
        align="center"
        x={960}
        y={150}
        accentColor="#38BDF8"
        variant="spring"
      />
    </div>
  );
};
