import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { DustMotes, EASE_INOUT, EASE_OUT, FilmGrade, ci } from './scene1/Scene1Shared';

/**
 * Scene 06: Friction, Static Charge & Conservation (1052 frames / 15.04s)
 * Synced to scene6.mp3:
 * - 0..320f: Plastic comb sweeping dry hair -> electrons transfer from hair to comb
 * - 320..560f: Hair strands stand on end (repulsion) + comb attracts paper bits (Static Electricity)
 * - 560..1052f: Charge Conservation Balance (No new charge created, only transferred!)
 */
export const StaticElectricityComb: React.FC = () => {
  const frame = useCurrentFrame();

  const isRubPhase = frame < 565;
  const isBalancePhase = frame >= 545;

  // Comb sweeps smoothly back & forth across hair (frames 25..280), then lifts away (280..360)
  const combX = ci(frame, [20, 95, 175, 255, 340], [180, -40, 120, -40, 210], EASE_INOUT);
  const combY = ci(frame, [20, 255, 355], [-55, -55, -135], EASE_OUT);
  const transferAmt = ci(frame, [85, 290], [0, 1], EASE_OUT);
  const hairStand = ci(frame, [260, 390], [0, 1], EASE_OUT);

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: isBalancePhase
          ? 'radial-gradient(ellipse at 50% 55%, #0D1E2E 0%, #050811 76%)'
          : frame >= 325
            ? 'radial-gradient(ellipse at 35% 50%, #1A132B 0%, #050811 76%)'
            : 'radial-gradient(ellipse at 68% 50%, #1C140D 0%, #050811 76%)',
        overflow: 'hidden',
      }}
    >
      {/* Phase 1 (0..565f): Dry Hair + Comb Friction + Electron Transfer */}
      {isRubPhase && (
        <div
          style={{
            position: 'absolute',
            left: frame < 325 ? 1260 : 580,
            top: 520,
            transform: `translate(-50%, -50%) scale(${ci(frame, [0, 550], [0.96, 1.06]).toFixed(4)})`,
            opacity: ci(frame, [0, 20, 535, 565], [0, 1, 1, 0], EASE_INOUT),
          }}
        >
          <svg width="720" height="540" viewBox="-360 -270 720 540" style={{ overflow: 'visible' }}>
            {/* Head Crown Silhouette */}
            <path d="M -180,145 Q -60,30 60,145 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />

            {/* Individual Hair Strands that Stand Up & Repel when positively charged! */}
            {[-95, -60, -25, 10, 45, 80].map((hx, idx) => {
              const spread = (idx - 2.5) * 18 * hairStand;
              const lift = 95 * hairStand;
              return (
                <g key={hx}>
                  <path
                    d={`M ${hx - 60},85 Q ${hx - 60 + spread * 0.5},${45 - lift * 0.5} ${hx - 60 + spread},${55 - lift}`}
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {transferAmt > 0.35 && (
                    <circle
                      cx={hx - 60 + spread * 0.7}
                      cy={65 - lift * 0.6}
                      r="10"
                      fill="rgba(244, 63, 94, 0.28)"
                      stroke="#F43F5E"
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })}

            {/* Plastic Comb with Negative Electrons accumulating on teeth */}
            <g transform={`translate(${combX}, ${combY}) rotate(-12)`}>
              <rect x="-130" y="-28" width="260" height="32" rx="10" fill="#F59E0B" stroke="#FDE68A" strokeWidth="2" />
              {Array.from({ length: 11 }).map((_, i) => (
                <rect key={i} x={-114 + i * 22} y="4" width="8" height="44" rx="4" fill="#F59E0B" />
              ))}
              {/* Transferred Electrons glowing on comb */}
              {transferAmt > 0.25 &&
                [-80, -25, 30, 85].map((ex, i) => (
                  <g key={ex} transform={`translate(${ex}, 28)`} opacity={transferAmt}>
                    <circle cx="0" cy="0" r="11" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1.5" />
                    <text x="0" y="4.5" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="700">−</text>
                  </g>
                ))}
            </g>

            {/* Jumping Electron Particles flying from Hair -> Comb during rubbing */}
            {frame >= 60 && frame < 280 &&
              [0, 1, 2, 3].map((i) => {
                const t = ((frame * 0.045 + i * 0.25) % 1);
                const px = -70 + i * 45 + t * (combX + 20);
                const py = 55 - t * 110;
                return (
                  <circle
                    key={i}
                    cx={px}
                    cy={py}
                    r="6"
                    fill="#38BDF8"
                    filter="drop-shadow(0 0 8px #38BDF8)"
                  />
                );
              })}
          </svg>
        </div>
      )}

      {/* Phase 2 (545..1052f): Conservation of Charge Balance Diagram */}
      {isBalancePhase && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [545, 580], [0, 1], EASE_OUT),
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 160,
              right: 160,
              top: 390,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {/* Hair: +4 */}
            <div
              style={{
                width: 420,
                height: 360,
                borderRadius: 26,
                background: 'rgba(15, 23, 42, 0.75)',
                border: '2px solid rgba(244, 63, 94, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 18,
              }}
            >
              <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 82, fontWeight: 700, color: '#F43F5E' }}>+৪</span>
              <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 34, fontWeight: 600, color: '#E2E8F0' }}>চুল (ইলেকট্রন হারাল)</span>
            </div>

            <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 72, fontWeight: 700, color: '#94A3B8' }}>+</span>

            {/* Comb: -4 */}
            <div
              style={{
                width: 420,
                height: 360,
                borderRadius: 26,
                background: 'rgba(15, 23, 42, 0.75)',
                border: '2px solid rgba(56, 189, 248, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 18,
              }}
            >
              <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 82, fontWeight: 700, color: '#38BDF8' }}>−৪</span>
              <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 34, fontWeight: 600, color: '#E2E8F0' }}>চিরুনি (ইলেকট্রন পেল)</span>
            </div>

            <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 72, fontWeight: 700, color: '#94A3B8' }}>=</span>

            {/* Total: 0 (Conserved!) */}
            <div
              style={{
                width: 360,
                height: 360,
                borderRadius: 26,
                background: 'rgba(6, 78, 59, 0.35)',
                border: '2px solid #34D399',
                boxShadow: '0 0 36px rgba(52, 211, 153, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 18,
              }}
            >
              <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 88, fontWeight: 700, color: '#34D399' }}>০</span>
              <span style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 34, fontWeight: 600, color: '#A7F3D0' }}>মোট চার্জ অপরিবর্তিত</span>
            </div>
          </div>
        </div>
      )}

      <DustMotes
        frame={frame}
        cx={isBalancePhase ? 960 : frame < 325 ? 1260 : 580}
        cy={520}
        radius={380}
        count={24}
        opacity={0.5}
        color="#38BDF8"
        seed={106}
      />

      <FilmGrade frame={frame} vignette={0.52} />

      <Sequence from={80} durationInFrames={180}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_spark_crackle.mp3')} volume={0.2} />
      </Sequence>

      <VidyuterKineticTitle
        frame={frame}
        startFrame={12}
        endFrame={310}
        lines={[{ text: 'ইলেকট্রন স্থানান্তর', highlight: 'স্থানান্তর', sizePx: 80 }]}
        x={100}
        y={400}
        accentColor="#38BDF8"
        variant="spark"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={330}
        endFrame={545}
        lines={[{ text: 'স্থির তড়িৎ', highlight: 'স্থির', sizePx: 90 }]}
        x={1040}
        y={400}
        accentColor="#FBBF24"
        variant="spring"
      />
      <VidyuterKineticTitle
        frame={frame}
        startFrame={565}
        endFrame={1040}
        lines={[{ text: 'চার্জ তৈরি হয় না!', highlight: 'না!', sizePx: 86 }]}
        align="center"
        x={960}
        y={150}
        accentColor="#34D399"
        variant="spring"
      />
    </div>
  );
};
