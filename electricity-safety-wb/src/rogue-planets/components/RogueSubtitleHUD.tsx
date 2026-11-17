import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export interface RogueCue {
  id: number;
  startFrame: number;
  endFrame: number;
  chapter: string;
  text: string;
}

export const ROGUE_CUES: RogueCue[] = [
  {
    id: 1,
    startFrame: 30, // 0.5s
    endFrame: 230, // 3.8s
    chapter: '01 // THE ANOMALY',
    text: 'Deep in the pitch-black void between stars, something massive is moving.',
  },
  {
    id: 2,
    startFrame: 270, // 4.5s
    endFrame: 640, // 10.6s
    chapter: '02 // THE STELLAR ORTHODOXY',
    text: 'We grow up learning that planets orbit stars. But what if trillions of worlds are completely alone?',
  },
  {
    id: 3,
    startFrame: 690, // 11.5s
    endFrame: 1180, // 19.6s
    chapter: '03 // GRAVITATIONAL BILLIARDS',
    text: 'Billions of years ago, chaotic planetary nurseries played gravitational billiards—hurling newborn worlds forever out into the icy interstellar dark.',
  },
  {
    id: 4,
    startFrame: 1230, // 20.5s
    endFrame: 2080, // 34.6s
    chapter: '04 // THE HYDROSPHERIC SHIELD',
    text: 'Without a sun, their skies freeze to minus two hundred degrees. But peel back miles of nitrogen ice, and radioactive cores keep colossal liquid oceans churning in total darkness.',
  },
  {
    id: 5,
    startFrame: 2130, // 35.5s
    endFrame: 2800, // 46.6s
    chapter: '05 // THE INTERSTELLAR ARK',
    text: 'Powered by geothermal vents, warm abyssal seas could harbor bizarre bioluminescent ecosystems—drifting through the galaxy as self-contained cosmic arks.',
  },
  {
    id: 6,
    startFrame: 2850, // 47.5s
    endFrame: 3400, // 56.6s
    chapter: '06 // MACRO SURVEY',
    text: 'In fact, rogue planets may outnumber all stars in the Milky Way. Dark, invisible wanderers... quietly filling the void.',
  },
  {
    id: 7,
    startFrame: 3430, // 57.2s
    endFrame: 3580, // 59.6s
    chapter: '07 // CODA',
    text: "The universe isn't empty. It's waiting.",
  },
];

export const RogueSubtitleHUD: React.FC = () => {
  const frame = useCurrentFrame();

  const activeCue = ROGUE_CUES.find((c) => frame >= c.startFrame && frame <= c.endFrame);
  const totalSeconds = Math.floor(frame / 60);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  const progressPct = (frame / 3600) * 100;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 30 }}>
      {/* Top Telemetry Watermark & Timecode */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          right: 34,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(9, 19, 75, 0.88)',
          border: '1.8px solid #22D7DA',
          borderRadius: 999,
          padding: '7px 18px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#22D7DA',
            boxShadow: '0 0 10px #22D7DA',
          }}
        />
        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em' }}>
          ROGUE PLANETS // DEEP COSMOS
        </span>
        <span
          style={{
            color: '#FFD244',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: 13,
            borderLeft: '1px solid rgba(255,255,255,0.2)',
            paddingLeft: 10,
          }}
        >
          {mm}:{ss} / 01:00 (60 FPS)
        </span>
      </div>

      {/* Synchronized Clean Lower-Third Subtitle */}
      {activeCue && (
        <div
          style={{
            position: 'absolute',
            bottom: 34,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 1360,
            background: 'linear-gradient(180deg, rgba(9, 19, 75, 0.94) 0%, rgba(5, 7, 26, 0.98) 100%)',
            border: '2px solid rgba(34, 215, 218, 0.75)',
            borderRadius: 16,
            padding: '12px 28px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.75)',
            opacity: interpolate(
              frame,
              [activeCue.startFrame, activeCue.startFrame + 12, activeCue.endFrame - 12, activeCue.endFrame],
              [0, 1, 1, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            ),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span
              style={{
                color: '#22D7DA',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {activeCue.chapter}
            </span>
          </div>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.35,
              textAlign: 'center',
              letterSpacing: '0.02em',
              textShadow: '0 2px 6px rgba(0,0,0,0.85)',
            }}
          >
            {activeCue.text}
          </div>
        </div>
      )}

      {/* Progress Bar along Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 24,
          right: 24,
          height: 3,
          background: 'rgba(255,255,255,0.12)',
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #243CDB, #22D7DA)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

