import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { DustMotes, EASE_INOUT, EASE_OUT, FilmGrade, ci } from './scene1/Scene1Shared';

/**
 * Scene 09: Pause-and-Think Quiz & Episode 02 Teaser (1143 frames / 16.56s)
 * Synced to scene9.mp3:
 * - 0..515f: Interactive Quiz ("কোন কণা স্থানান্তরিত হয়?") + 3 clean option pills
 * - 515..1143f: Episode 02 Quantum Portal Teaser ("পরমাণু ও বৈদ্যুতিক চার্জ")
 */
export const QuizReflectionTeaser: React.FC = () => {
  const frame = useCurrentFrame();

  const isQuiz = frame < 530;
  const isTeaser = frame >= 505;
  const portalZoom = ci(frame, [520, 1143], [0.85, 1.35], EASE_INOUT);

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: isTeaser
          ? 'radial-gradient(ellipse at 50% 50%, #141936 0%, #050811 76%)'
          : 'radial-gradient(ellipse at 50% 50%, #1A140B 0%, #050811 76%)',
        overflow: 'hidden',
      }}
    >
      {/* Quiz Phase (0..530f) */}
      {isQuiz && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [0, 22, 495, 530], [0, 1, 1, 0], EASE_INOUT),
          }}
        >
          {/* 3 Clean Option Cards along Center-Bottom */}
          <div
            style={{
              position: 'absolute',
              left: 240,
              right: 240,
              top: 520,
              display: 'flex',
              justifyContent: 'space-around',
              gap: 36,
            }}
          >
            {[
              { opt: 'ক. প্রোটন', color: '#F43F5E', delay: 120 },
              { opt: 'খ. নিউট্রন', color: '#94A3B8', delay: 155 },
              { opt: 'গ. ইলেকট্রন', color: '#38BDF8', delay: 190 },
            ].map((item) => {
              const pop = ci(frame, [item.delay, item.delay + 24], [0, 1], EASE_OUT);
              return (
                <div
                  key={item.opt}
                  style={{
                    flex: 1,
                    height: 180,
                    borderRadius: 24,
                    background: 'rgba(15, 23, 42, 0.82)',
                    border: `2.5px solid ${item.color}`,
                    boxShadow: `0 0 28px ${item.color}22`,
                    transform: `translateY(${((1 - pop) * 32).toFixed(1)}px)`,
                    opacity: pop,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                      fontSize: 44,
                      fontWeight: 700,
                      color: '#F8FAFC',
                    }}
                  >
                    {item.opt}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Episode 02 Teaser Portal (505..1143f) */}
      {isTeaser && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [505, 545], [0, 1], EASE_OUT),
          }}
        >
          {/* Rotating Quantum Atom Rings behind Teaser Title */}
          <div
            style={{
              position: 'absolute',
              left: 960,
              top: 540,
              transform: `translate(-50%, -50%) scale(${portalZoom.toFixed(4)})`,
              pointerEvents: 'none',
            }}
          >
            <svg width="720" height="720" viewBox="-360 -360 720 720" style={{ overflow: 'visible' }}>
              {[180, 250, 320].map((r, idx) => (
                <ellipse
                  key={r}
                  cx="0"
                  cy="0"
                  rx={r}
                  ry={r * 0.48}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  opacity={0.22 - idx * 0.04}
                  transform={`rotate(${idx * 60 + frame * (0.4 + idx * 0.15)})`}
                />
              ))}
            </svg>
          </div>
        </div>
      )}

      <DustMotes frame={frame} cx={960} cy={540} radius={440} count={26} opacity={0.5} color={isTeaser ? '#38BDF8' : '#FBBF24'} seed={109} />
      <FilmGrade frame={frame} vignette={0.55} />

      <Sequence from={525} durationInFrames={90}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_feather_snap.mp3')} volume={0.28} />
      </Sequence>

      <VidyuterKineticTitle
        frame={frame}
        startFrame={15}
        endFrame={495}
        lines={[
          { text: 'চিন্তার প্রশ্ন', highlight: 'প্রশ্ন', sizePx: 86 },
          { text: 'কোন কণা স্থানান্তরিত হয়?', highlight: 'কোন', sizePx: 64 },
        ]}
        align="center"
        x={960}
        y={210}
        accentColor="#FBBF24"
        variant="spring"
      />

      <VidyuterKineticTitle
        frame={frame}
        startFrame={535}
        endFrame={1135}
        lines={[
          { text: 'পরবর্তী পর্ব', highlight: 'পরবর্তী', sizePx: 54 },
          { text: 'পরমাণু ও বৈদ্যুতিক চার্জ', highlight: 'পরমাণু', sizePx: 86 },
        ]}
        align="center"
        x={960}
        y={390}
        accentColor="#38BDF8"
        variant="shadow"
      />
    </div>
  );
};
