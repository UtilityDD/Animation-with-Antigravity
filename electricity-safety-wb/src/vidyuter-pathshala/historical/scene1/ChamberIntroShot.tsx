import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from './Scene1Shared';

/**
 * Beat 3: Chiaroscuro Ancient Greek Study Chamber (Frames 360 to 540)
 * Multi-plane 2.5D parallax: distant moonlight window & temple, stone table with
 * flickering terracotta oil lamp, floating dust motes, and blurred foreground column sweep.
 */
export const ChamberIntroShot: React.FC<{ frame: number }> = ({ frame }) => {
  const local = Math.max(0, frame - 360);

  const fadeIn = ci(local, [0, 30], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [155, 185], [1, 0], EASE_INOUT);

  // Camera glides smoothly from left to right & pushes in toward the oil lamp
  const camProgress = ci(local, [0, 180], [0, 1], EASE_INOUT);
  const bgX = -camProgress * 35; // slow distant parallax
  const midX = -camProgress * 95; // midground speed
  const fgX = -camProgress * 220; // fast foreground column sweep
  const zoom = 1 + camProgress * 0.14;

  const flicker = Math.sin(frame * 0.42) * 3.5 + Math.cos(frame * 0.85) * 2.2;
  const lightPulse = 1 + Math.sin(frame * 0.36) * 0.045;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#050811',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom.toFixed(4)})`,
          transformOrigin: '65% 58%',
        }}
      >
        {/* ============================================================== */}
        {/* LAYER 1: DISTANT NIGHT SKY & AEGEAN TEMPLE SILHOUETTE (0.35x)  */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: -60,
            transform: `translateX(${bgX.toFixed(1)}px)`,
          }}
        >
          {/* Arched Window Opening on Right-Center */}
          <div
            style={{
              position: 'absolute',
              left: 1120,
              top: 110,
              width: 440,
              height: 520,
              borderRadius: '220px 220px 0 0',
              background: 'linear-gradient(180deg, #0B1633 0%, #172554 65%, #1E293B 100%)',
              boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)',
              overflow: 'hidden',
            }}
          >
            {/* Crescent Moon & Moonlight Glow */}
            <div
              style={{
                position: 'absolute',
                right: 75,
                top: 65,
                width: 44,
                height: 44,
                borderRadius: '50%',
                boxShadow: '-12px 6px 0 0 #E2E8F0, 0 0 40px rgba(226,232,240,0.25)',
                opacity: 0.75,
              }}
            />
            {/* Distant Greek Temple Silhouette on Hill */}
            <svg width="440" height="240" viewBox="0 0 440 240" style={{ position: 'absolute', bottom: 0, left: 0 }}>
              <path d="M 0,240 L 0,180 Q 120,130 260,165 Q 360,150 440,185 L 440,240 Z" fill="#070B19" />
              {/* Acropolis Temple */}
              <g transform="translate(150, 118)" fill="#0D1326">
                <polygon points="0,12 70,0 140,12" />
                <rect x="10" y="12" width="120" height="6" />
                {[18, 38, 58, 78, 98, 118].map((cx) => (
                  <rect key={cx} x={cx} y="18" width="6" height="32" />
                ))}
                <rect x="6" y="50" width="128" height="8" />
              </g>
            </svg>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 2: MIDGROUND STUDY CHAMBER, SCROLLS & OIL LAMP (1.0x)    */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${midX.toFixed(1)}px)`,
          }}
        >
          {/* Stone Wall & Columns */}
          <div
            style={{
              position: 'absolute',
              left: 880,
              top: 0,
              bottom: 340,
              width: 110,
              background: 'linear-gradient(90deg, #090D18 0%, #1B2436 45%, #0B101D 100%)',
              boxShadow: '12px 0 40px rgba(0,0,0,0.85)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 1620,
              top: 0,
              bottom: 340,
              width: 130,
              background: 'linear-gradient(90deg, #0B101D 0%, #1B2436 50%, #070A12 100%)',
              boxShadow: '-12px 0 40px rgba(0,0,0,0.85)',
            }}
          />

          {/* Stone Study Table */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: -200,
              bottom: 0,
              height: 360,
              background: 'linear-gradient(180deg, #1E2534 0%, #0D111A 35%, #05070B 100%)',
              borderTop: '3px solid #334155',
            }}
          />

          {/* Rolled Papyrus Scrolls on Table */}
          <svg width="260" height="100" viewBox="0 0 260 100" style={{ position: 'absolute', left: 1020, bottom: 295 }}>
            <defs>
              <linearGradient id="papyrusG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D6B98C" />
                <stop offset="50%" stopColor="#A68757" />
                <stop offset="100%" stopColor="#5C4727" />
              </linearGradient>
            </defs>
            <rect x="20" y="36" width="160" height="26" rx="13" fill="url(#papyrusG)" />
            <ellipse cx="180" cy="49" rx="7" ry="13" fill="#42321A" />
            <rect x="45" y="16" width="150" height="24" rx="12" fill="url(#papyrusG)" transform="rotate(-6, 120, 28)" />
          </svg>

          {/* Warm Radial Chiaroscuro Light Pool */}
          <div
            style={{
              position: 'absolute',
              left: 1340,
              top: 640,
              width: 980,
              height: 980,
              transform: `translate(-50%, -50%) scale(${lightPulse.toFixed(4)})`,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(245, 158, 11, 0.38) 0%, rgba(217, 119, 6, 0.14) 38%, rgba(5, 8, 17, 0) 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Floating Dust Motes inside the Lamp Glow */}
          <DustMotes frame={frame} cx={1340} cy={620} radius={340} count={36} seed={7} />

          {/* Solitary Terracotta Oil Lamp */}
          <svg width="260" height="180" viewBox="0 0 260 180" style={{ position: 'absolute', left: 1210, bottom: 300, overflow: 'visible' }}>
            <defs>
              <linearGradient id="lampClay" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C25912" />
                <stop offset="55%" stopColor="#7C2D12" />
                <stop offset="100%" stopColor="#431407" />
              </linearGradient>
              <radialGradient id="lampFlame" cx="50%" cy="78%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FEF08A" />
                <stop offset="70%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Contact Shadow */}
            <ellipse cx="120" cy="156" rx="88" ry="14" fill="#000000" opacity="0.65" />

            {/* Handle & Spout */}
            <path d="M 48,132 C 20,132 18,95 45,98" fill="none" stroke="url(#lampClay)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 165,126 L 218,112 L 216,132 L 155,146 Z" fill="url(#lampClay)" />

            {/* Clay Body */}
            <ellipse cx="115" cy="134" rx="68" ry="26" fill="url(#lampClay)" />
            <ellipse cx="115" cy="122" rx="36" ry="12" fill="#431407" stroke="#9A3412" strokeWidth="2" />

            {/* Organic Flickering Flame */}
            <g transform={`translate(${216 + flicker * 0.3}, ${108})`}>
              <path
                d={`M 0,0 Q ${-14 + flicker},-26 0,-56 Q ${14 - flicker},-26 0,0 Z`}
                fill="url(#lampFlame)"
                filter="drop-shadow(0 0 18px #F59E0B)"
              />
              <ellipse cx="0" cy="-14" rx="3.8" ry="10" fill="#FFFFFF" opacity="0.95" />
            </g>
          </svg>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3: FOREGROUND OUT-OF-FOCUS COLUMN SWEEP (1.8x)           */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            left: 1840,
            top: -40,
            bottom: -40,
            width: 240,
            background: 'linear-gradient(90deg, #020306 0%, #090D16 50%, #020306 100%)',
            transform: `translateX(${fgX.toFixed(1)}px)`,
            filter: 'blur(7px)',
            opacity: 0.88,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
