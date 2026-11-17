import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import {
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  FilmGrade,
  ci,
  rnd,
} from './scene1/Scene1Shared';
import {
  FaradayInductionSVG,
  FranklinKiteSVG,
  GilbertVersoriumSVG,
  LeydenJarSVG,
  OerstedCompassSVG,
  ThomsonCathodeSVG,
  VoltaicPileSVG,
} from './scene2/Scene2Apparatus';

interface BeatDef {
  id: string;
  start: number;
  end: number;
  year: string;
  title: string;
  highlight: string;
  accent: string;
  bgTint: string;
  variant: 'slide' | 'shadow' | 'spring' | 'spark';
  // Dynamic asymmetric composition per beat (no PPT monotony!)
  textX: number;
  textY: number;
  textAlign: 'left' | 'center' | 'right';
  textSize: number;
  appX: number;
  appY: number;
  enterFromX: number; // Whip-pan entrance offset
}

// Synced directly to scene2.mp3 speech segments @ 60 FPS
const BEATS: BeatDef[] = [
  {
    id: 'intro',
    start: 0,
    end: 130,
    year: '',
    title: 'কী ছিল এই আকর্ষণ?',
    highlight: 'আকর্ষণ?',
    accent: '#FBBF24',
    bgTint: '#171108',
    variant: 'spring',
    textX: 960,
    textY: 410,
    textAlign: 'center',
    textSize: 102,
    appX: 960,
    appY: 540,
    enterFromX: 0,
  },
  {
    id: 'gilbert',
    start: 135,
    end: 505,
    year: '১৬০০',
    title: 'ইলেকট্রিকাস • ১৬০০',
    highlight: 'ইলেকট্রিকাস',
    accent: '#F59E0B',
    bgTint: '#19120A',
    variant: 'slide',
    textX: 100,
    textY: 400,
    textAlign: 'left',
    textSize: 76,
    appX: 1280,
    appY: 495,
    enterFromX: 120,
  },
  {
    id: 'leyden',
    start: 515,
    end: 830,
    year: '১৭৪৫',
    title: 'লেইডেন জার • ১৭৪৫',
    highlight: 'লেইডেন',
    accent: '#38BDF8',
    bgTint: '#071726',
    variant: 'spark',
    textX: 1040,
    textY: 400,
    textAlign: 'left',
    textSize: 76,
    appX: 580,
    appY: 500,
    enterFromX: -120,
  },
  {
    id: 'franklin',
    start: 840,
    end: 1280,
    year: '১৭৫২',
    title: 'মেঘের বজ্রপাত • ১৭৫২',
    highlight: 'বজ্রপাত',
    accent: '#FDE047',
    bgTint: '#0B1222',
    variant: 'spark',
    textX: 110,
    textY: 660,
    textAlign: 'left',
    textSize: 76,
    appX: 1200,
    appY: 465,
    enterFromX: 90,
  },
  {
    id: 'volta',
    start: 1295,
    end: 1555,
    year: '১৮০০',
    title: 'ভোল্টার ব্যাটারি • ১৮০০',
    highlight: 'ভোল্টার',
    accent: '#34D399',
    bgTint: '#071A15',
    variant: 'slide',
    textX: 1040,
    textY: 390,
    textAlign: 'left',
    textSize: 74,
    appX: 580,
    appY: 500,
    enterFromX: -120,
  },
  {
    id: 'oersted',
    start: 1565,
    end: 1825,
    year: '১৮২০',
    title: 'বিদ্যুৎ ও চুম্বক • ১৮২০',
    highlight: 'চুম্বক',
    accent: '#F472B6',
    bgTint: '#160C24',
    variant: 'slide',
    textX: 100,
    textY: 390,
    textAlign: 'left',
    textSize: 74,
    appX: 1280,
    appY: 500,
    enterFromX: 120,
  },
  {
    id: 'faraday',
    start: 1835,
    end: 2105,
    year: '১৮৩১',
    title: 'তড়িচ্চৌম্বকীয় আবেশ • ১৮৩১',
    highlight: 'আবেশ',
    accent: '#A78BFA',
    bgTint: '#130F26',
    variant: 'spring',
    textX: 1040,
    textY: 390,
    textAlign: 'left',
    textSize: 70,
    appX: 600,
    appY: 500,
    enterFromX: -120,
  },
  {
    id: 'thomson',
    start: 2115,
    end: 2530,
    year: '১৮৯৭',
    title: 'ইলেকট্রন • ১৮৯৭',
    highlight: 'ইলেকট্রন',
    accent: '#2DD4BF',
    bgTint: '#061A1C',
    variant: 'spark',
    textX: 110,
    textY: 165,
    textAlign: 'left',
    textSize: 82,
    appX: 1180,
    appY: 560,
    enterFromX: 140,
  },
];

export const BrokenAxisTimeline: React.FC = () => {
  const frame = useCurrentFrame();

  const activeIdx = BEATS.findIndex((b) => frame >= b.start && frame < b.end);
  const currentBeat = BEATS[activeIdx === -1 ? BEATS.length - 1 : activeIdx];

  // Full-screen lightning flash during Franklin strike
  const franklinLocal = frame - 840;
  const skyFlash =
    franklinLocal >= 0 &&
    franklinLocal < 440 &&
    ((franklinLocal > 105 && franklinLocal < 120) || (franklinLocal > 225 && franklinLocal < 240))
      ? 0.16
      : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: `radial-gradient(ellipse at ${currentBeat.appX > 960 ? '68%' : currentBeat.appX < 960 ? '32%' : '50%'} 50%, ${currentBeat.bgTint} 0%, #050811 78%)`,
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Atmospheric Spotlight anchored to each beat's apparatus */}
      <div
        style={{
          position: 'absolute',
          left: currentBeat.appX,
          top: currentBeat.appY,
          width: 980,
          height: 820,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${currentBeat.accent}24 0%, rgba(5,8,17,0) 68%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ============================================================== */}
      {/* BEAT 0 (0..130f): FULL-SCREEN CENTERED QUESTION HOOK           */}
      {/* Bridges seamlessly from Scene 1's dipole into the 300yr epic   */}
      {/* ============================================================== */}
      {frame < 145 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [0, 18, 112, 138], [0, 1, 1, 0], EASE_OUT),
            pointerEvents: 'none',
          }}
        >
          {/* Expanding Pulsing Electrostatic Rings centered behind the Question */}
          <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
            {[160, 260, 360].map((r, i) => {
              const pulse = ((frame * 1.4 + i * 45) % 130);
              return (
                <circle
                  key={r}
                  cx="960"
                  cy="510"
                  r={r + pulse}
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                  opacity={Math.max(0, 0.25 - pulse * 0.0018)}
                />
              );
            })}
            {/* Giant Translucent Watermark Question Mark */}
            <text
              x="960"
              y="660"
              textAnchor="middle"
              fill="#FBBF24"
              opacity={0.07 + Math.sin(frame * 0.08) * 0.02}
              fontSize="520"
              fontWeight="700"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ?
            </text>
          </svg>
        </div>
      )}

      {/* Full-bleed Storm Rain Backdrop for Beat 3 (Franklin 1752) */}
      {frame >= 835 && frame < 1285 && (
        <svg
          width="1920"
          height="1080"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: ci(frame, [835, 865, 1255, 1285], [0, 0.45, 0.45, 0]),
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: 42 }).map((_, i) => {
            const rx = rnd(i * 11) * 1920;
            const ry = (frame * 14 + rnd(i * 17) * 1080) % 1080;
            return (
              <line
                key={i}
                x1={rx}
                y1={ry}
                x2={rx - 14}
                y2={ry + 36}
                stroke="#64748B"
                strokeWidth="1.4"
                opacity="0.45"
              />
            );
          })}
        </svg>
      )}

      {/* Beat 1: 1600 Gilbert */}
      {frame >= 125 && frame < 520 && (
        <StageCard frame={frame} beat={BEATS[1]}>
          <GilbertVersoriumSVG frame={frame} local={Math.max(0, frame - 135)} />
        </StageCard>
      )}

      {/* Beat 2: 1745 Leyden Jar */}
      {frame >= 505 && frame < 845 && (
        <StageCard frame={frame} beat={BEATS[2]}>
          <LeydenJarSVG frame={frame} local={Math.max(0, frame - 515)} />
        </StageCard>
      )}

      {/* Beat 3: 1752 Benjamin Franklin */}
      {frame >= 830 && frame < 1295 && (
        <StageCard frame={frame} beat={BEATS[3]} baseScale={1.08}>
          <FranklinKiteSVG frame={frame} local={Math.max(0, frame - 840)} />
        </StageCard>
      )}

      {/* Beat 4: 1800 Voltaic Pile */}
      {frame >= 1285 && frame < 1570 && (
        <StageCard frame={frame} beat={BEATS[4]}>
          <VoltaicPileSVG frame={frame} />
        </StageCard>
      )}

      {/* Beat 5: 1820 Oersted */}
      {frame >= 1555 && frame < 1840 && (
        <StageCard frame={frame} beat={BEATS[5]}>
          <OerstedCompassSVG frame={frame} local={Math.max(0, frame - 1565)} />
        </StageCard>
      )}

      {/* Beat 6: 1831 Faraday */}
      {frame >= 1825 && frame < 2120 && (
        <StageCard frame={frame} beat={BEATS[6]}>
          <FaradayInductionSVG frame={frame} />
        </StageCard>
      )}

      {/* Beat 7: 1897 J.J. Thomson (Wide Finale) */}
      {frame >= 2105 && (
        <StageCard frame={frame} beat={BEATS[7]} baseScale={1.16}>
          <ThomsonCathodeSVG frame={frame} local={Math.max(0, frame - 2115)} />
        </StageCard>
      )}

      {/* Floating Ambient Dust Motes tracking active apparatus */}
      <DustMotes
        frame={frame}
        cx={currentBeat.appX}
        cy={currentBeat.appY}
        radius={390}
        count={28}
        opacity={0.6}
        color={currentBeat.accent}
        seed={99}
      />

      {/* Lightning Strike Full-Screen Exposure Flash */}
      {skyFlash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FEF9C3',
            opacity: skyFlash,
            pointerEvents: 'none',
            zIndex: 7500,
          }}
        />
      )}

      {/* Minimalist Timeline Progress Dots along Bottom */}
      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          bottom: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          zIndex: 60,
          opacity: ci(frame, [120, 155], [0, 1], EASE_OUT),
        }}
      >
        {BEATS.filter((b) => b.year).map((b) => {
          const isActive = currentBeat.id === b.id;
          const isPast = frame >= b.end;
          return (
            <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: isActive ? 1 : isPast ? 0.55 : 0.25 }}>
              <div
                style={{
                  width: isActive ? 14 : 9,
                  height: isActive ? 14 : 9,
                  borderRadius: '50%',
                  backgroundColor: isActive ? b.accent : '#94A3B8',
                  boxShadow: isActive ? `0 0 14px ${b.accent}` : 'none',
                }}
              />
              <span
                style={{
                  fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
                  fontSize: isActive ? 22 : 18,
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                }}
              >
                {b.year}
              </span>
            </div>
          );
        })}
      </div>

      {/* Unified Film Grade */}
      <FilmGrade frame={frame} vignette={0.52} />

      {/* Synced Subtle SFX */}
      <Sequence from={670} durationInFrames={160}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_spark_crackle.mp3')} volume={0.2} />
      </Sequence>
      <Sequence from={950} durationInFrames={90}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_feather_snap.mp3')} volume={0.28} />
      </Sequence>
      <Sequence from={2130} durationInFrames={90}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_feather_snap.mp3')} volume={0.26} />
      </Sequence>

      {/* Dynamic Asymmetric Kinetic Typography */}
      {BEATS.map((b) => (
        <VidyuterKineticTitle
          key={b.id}
          frame={frame}
          startFrame={b.start + 6}
          endFrame={b.end - 10}
          lines={[{ text: b.title, highlight: b.highlight, sizePx: b.textSize }]}
          x={b.textX}
          y={b.textY}
          align={b.textAlign}
          accentColor={b.accent}
          variant={b.variant}
        />
      ))}
    </div>
  );
};

const StageCard: React.FC<{
  frame: number;
  beat: BeatDef;
  baseScale?: number;
  children: React.ReactNode;
}> = ({ frame, beat, baseScale = 1.0, children }) => {
  const local = Math.max(0, frame - beat.start);
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(frame, [beat.end - 20, beat.end], [1, 0], EASE_INOUT);
  const whipX = ci(local, [0, 24], [beat.enterFromX, 0], EASE_OUT);
  const scale =
    baseScale * (ci(local, [0, 26], [0.92, 1.0], EASE_OUT) + ci(frame, [beat.start, beat.end], [0, 0.07]));

  return (
    <div
      style={{
        position: 'absolute',
        left: beat.appX,
        top: beat.appY,
        transform: `translate(-50%, -50%) translateX(${whipX.toFixed(1)}px) scale(${scale.toFixed(4)})`,
        opacity: fadeIn * fadeOut,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
};
