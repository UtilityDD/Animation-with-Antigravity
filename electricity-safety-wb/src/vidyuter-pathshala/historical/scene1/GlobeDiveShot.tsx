import React from 'react';
import { EASE_IN, EASE_INOUT, EASE_OUT, ci, rnd } from './Scene1Shared';

/**
 * Beat 2: 3D Earth Globe Dive into Ancient Greece & Miletus Harbor.
 * Transitions seamlessly from darkness into space, dives toward the Aegean coast,
 * and pushes through clouds into the Greek chamber.
 */
export const GlobeDiveShot: React.FC<{ frame: number }> = ({ frame }) => {
  // Local frame relative to shot start (starts around global frame 170)
  const local = Math.max(0, frame - 170);

  // Camera zoom progression:
  // 0..60: pull into full Earth view (scale 0.85 -> 1.15)
  // 60..170: rapid zoom dive onto Aegean Sea / Miletus (scale 1.15 -> 5.8)
  // 170..220: dive through clouds into warm amber night
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const zoomBase = ci(local, [0, 65], [0.85, 1.15], EASE_OUT);
  const diveZoom = ci(local, [65, 195], [1, 5.2], EASE_INOUT);
  const scale = zoomBase * diveZoom;

  // Target offset as we dive toward Greece/Miletus (slightly right of center on globe)
  const panX = ci(local, [65, 185], [0, -140], EASE_INOUT);
  const panY = ci(local, [65, 185], [0, 45], EASE_INOUT);

  // Crosshair lock animation
  const lockProgress = ci(local, [35, 85], [0, 1], EASE_OUT);
  const cloudFlash = ci(local, [170, 210], [0, 1], EASE_IN);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 55% 50%, #09132B 0%, #02040A 75%)',
        opacity: fadeIn,
        overflow: 'hidden',
      }}
    >
      {/* Subtle Starfield */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 85 }).map((_, i) => {
          const sx = rnd(i * 17) * 1920;
          const sy = rnd(i * 23) * 1080;
          const sr = 0.8 + rnd(i * 31) * 1.6;
          const twinkle = 0.35 + 0.65 * Math.sin(frame * 0.05 + i);
          return <circle key={i} cx={sx} cy={sy} r={sr} fill="#E2E8F0" opacity={twinkle * 0.65} />;
        })}
      </svg>

      {/* Main 3D Globe Container positioned on Right Stage (x=1240, y=540) */}
      <div
        style={{
          position: 'absolute',
          left: 1240,
          top: 540,
          transform: `translate(-50%, -50%) translate(${panX}px, ${panY}px) scale(${scale.toFixed(4)})`,
          transformOrigin: '50% 50%',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 660,
            height: 660,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 32% 28%, #38BDF8 0%, #1D4ED8 42%, #0B194F 80%, #020617 100%)',
            boxShadow:
              '0 0 110px rgba(56, 189, 248, 0.38), inset -48px -48px 100px rgba(0, 0, 0, 0.92)',
            overflow: 'hidden',
          }}
        >
          {/* Atmosphere Rim Glow */}
          <div
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '3px solid rgba(125, 211, 252, 0.55)',
              filter: 'blur(3px)',
            }}
          />

          {/* Geographic Map: Mediterranean, Italy, Balkan Peninsula, Greece, Aegean & Anatolia */}
          <svg
            width="660"
            height="660"
            viewBox="0 0 660 660"
            style={{ position: 'absolute', inset: 0, opacity: 0.9 }}
          >
            <defs>
              <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#166534" />
                <stop offset="60%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#14532D" />
              </linearGradient>
              <linearGradient id="graticule" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* Latitude / Longitude Graticule Lines */}
            {[165, 247, 330, 412, 495].map((y) => (
              <ellipse
                key={`lat-${y}`}
                cx="330"
                cy={y}
                rx={Math.sqrt(Math.max(0, 330 * 330 - (y - 330) * (y - 330)))}
                ry="18"
                fill="none"
                stroke="#7DD3FC"
                strokeOpacity="0.14"
                strokeWidth="1"
              />
            ))}
            {[-120, -60, 0, 60, 120].map((rx) => (
              <ellipse
                key={`lon-${rx}`}
                cx="330"
                cy="330"
                rx={Math.abs(rx) + 40}
                ry="330"
                fill="none"
                stroke="#7DD3FC"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
            ))}

            {/* Continental Europe & Mediterranean Coastlines */}
            {/* Iberian / France / Alps */}
            <path
              d="M 40,210 Q 90,175 150,185 Q 200,195 235,230 L 210,275 Q 160,295 110,285 Q 60,275 40,210 Z"
              fill="url(#landGrad)"
            />
            {/* Italian Peninsula */}
            <path
              d="M 235,230 Q 255,250 275,295 L 295,315 L 285,328 L 250,285 Z"
              fill="url(#landGrad)"
            />
            {/* Balkans & Mainland Greece (organic curved coastline) */}
            <path
              d="M 275,215 Q 322,196 368,216 Q 388,242 382,265 Q 372,285 362,302 Q 352,322 338,308 Q 326,282 296,260 Q 272,242 275,215 Z"
              fill="url(#landGrad)"
            />
            {/* Peloponnese & Crete */}
            <path d="M 336,310 Q 348,308 356,318 Q 354,332 344,336 Q 334,328 336,310 Z" fill="url(#landGrad)" />
            <path d="M 350,356 Q 368,354 386,358 Q 382,366 362,366 Q 348,362 350,356 Z" fill="url(#landGrad)" />

            {/* Anatolia (Asia Minor) with Miletus on the Aegean Coast! */}
            <path
              d="M 402,248 Q 468,232 545,250 Q 592,272 580,318 Q 522,340 445,332 Q 406,324 396,298 Q 394,270 402,248 Z"
              fill="url(#landGrad)"
            />
            {/* Smooth North Africa Coastline */}
            <path
              d="M 65,388 Q 160,368 260,382 Q 350,398 440,394 Q 525,388 595,392 Q 585,445 555,482 Q 340,520 115,472 Q 78,435 65,388 Z"
              fill="#A16207"
              opacity="0.72"
            />

            {/* Drifting Translucent Atmospheric Cloud Wisps */}
            <g transform={`translate(${(local * 0.45) % 80 - 40}, 0)`} opacity="0.24">
              <path d="M 140,170 Q 220,145 310,175 Q 250,192 140,170 Z" fill="#FFFFFF" />
              <path d="M 320,220 Q 420,195 510,230 Q 430,248 320,220 Z" fill="#FFFFFF" />
              <path d="M 180,350 Q 280,330 370,360 Q 290,378 180,350 Z" fill="#FFFFFF" />
            </g>

            {/* Miletus Target Marker (on western Anatolian / Aegean coast: x=402, y=302) */}
            <g transform="translate(402, 302)">
              {/* Pulsing Beacon */}
              <circle
                cx="0"
                cy="0"
                r={10 + Math.sin(frame * 0.18) * 4}
                fill="none"
                stroke="#FDE047"
                strokeWidth="1.5"
                opacity={lockProgress * 0.8}
              />
              <circle
                cx="0"
                cy="0"
                r="4.5"
                fill="#EF4444"
                stroke="#FEF08A"
                strokeWidth="1.5"
              />

              {/* Precision Reticle Locking on Miletus */}
              <g opacity={lockProgress} transform={`scale(${1.6 - lockProgress * 0.6})`}>
                <circle
                  cx="0"
                  cy="0"
                  r="34"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="1.4"
                  strokeDasharray="6 4"
                />
                <line x1="-48" y1="0" x2="-14" y2="0" stroke="#FDE047" strokeWidth="1.2" />
                <line x1="14" y1="0" x2="48" y2="0" stroke="#FDE047" strokeWidth="1.2" />
                <line x1="0" y1="-48" x2="0" y2="-14" stroke="#FDE047" strokeWidth="1.2" />
                <line x1="0" y1="14" x2="0" y2="48" stroke="#FDE047" strokeWidth="1.2" />
              </g>
            </g>
          </svg>

          {/* Soft Specular Highlight & Terminator Shadow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 28% 25%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Atmospheric Cloud Transition Layer at end of dive */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#050814',
          opacity: cloudFlash,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
