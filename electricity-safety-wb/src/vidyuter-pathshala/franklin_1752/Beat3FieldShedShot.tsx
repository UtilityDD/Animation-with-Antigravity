import React from 'react';
import {
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  camAt,
  camTransform,
  ci,
  rnd,
} from '../historical/scene1/Scene1Shared';
import { FranklinRig } from './FranklinRig';

/**
 * Beat 3 (0..1166 local): Full-Bleed Stormy Field & Dry Timber Shed
 * - Uses grounded FranklinRig (poseMode="holdingSilk") + William silhouette
 * - Exact Collinson-letter kite (with bridle loop, tail & 1-ft wire) + crystal-clear Y-junction
 * - Snappy 24-28f camera focus pushes onto kite -> dry shed doorway & silk ribbon!
 */
export const Beat3FieldShedShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [1082, 1112], [1, 0], EASE_INOUT);

  // Snappy 26f camera moves: wide field -> kite zoom -> whip down to sheltered Y-junction & Franklin!
  const cam = camAt(local, [
    { f: 0, x: 960, y: 500, z: 0.96, sx: 960, sy: 540 },
    { f: 270, x: 980, y: 505, z: 1.0, sx: 960, sy: 540 },
    // Snappy 26f zoom-in on high silk kite + 1-ft pointed wire!
    { f: 296, x: 740, y: 270, z: 1.72, sx: 1120, sy: 500 },
    { f: 530, x: 755, y: 275, z: 1.76, sx: 1120, sy: 500 },
    // Snappy 28f whip-pan & zoom onto sheltered Franklin & Y-junction (key + dry crimson silk ribbon)!
    { f: 558, x: 1275, y: 615, z: 1.46, sx: 1120, sy: 540 },
    { f: 1112, x: 1285, y: 620, z: 1.52, sx: 1120, sy: 540 },
  ]);

  const kiteSway = Math.sin(frame * 0.055) * 14;
  const kiteBob = Math.cos(frame * 0.07) * 6;
  const tailWave = Math.sin(frame * 0.14) * 12;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, #0D1629 0%, #172338 48%, #0A0E17 100%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Distant 0.3x Storm Sky & Hills */}
      <div
        style={{
          position: 'absolute',
          inset: -140,
          transform: camTransform({
            ...cam,
            x: 960 + (cam.x - 960) * 0.3,
            y: 540 + (cam.y - 540) * 0.3,
            z: 1 + (cam.z - 1) * 0.3,
          }),
          transformOrigin: '0 0',
        }}
      >
        <svg width="2200" height="1280" viewBox="0 0 2200 1280">
          <path d="M 0,0 L 2200,0 L 2200,380 Q 1850,430 1520,370 Q 1120,440 760,360 Q 380,420 0,365 Z" fill="#1A2438" opacity="0.92" />
          <path d="M 0,0 L 2200,0 L 2200,260 Q 1700,320 1280,250 Q 820,330 420,245 Q 180,295 0,250 Z" fill="#0F172A" opacity="0.9" />
          <path d="M 0,1280 L 0,820 Q 540,740 1120,810 Q 1680,750 2200,825 L 2200,1280 Z" fill="#0B111E" />
          <path d="M 0,1280 L 0,900 Q 620,845 1280,895 Q 1800,855 2200,910 L 2200,1280 Z" fill="#070A12" />
        </svg>
      </div>

      {/* Main 1.0x Field & Shed Stage */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: camTransform(cam),
          transformOrigin: '0 0',
        }}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ overflow: 'visible' }}>
          <defs>
            <radialGradient id="shedGlow3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Full-screen diagonal rain */}
          {Array.from({ length: 48 }).map((_, i) => {
            const rx = rnd(i * 11) * 2100;
            const ry = (frame * 13 + rnd(i * 17) * 1100) % 1100;
            return <line key={i} x1={rx} y1={ry} x2={rx - 14} y2={ry + 34} stroke="#94A3B8" strokeWidth="1.4" opacity="0.28" />;
          })}

          <rect x="-200" y="880" width="2320" height="320" fill="#070A11" />

          {/* Exact Collinson Silk Handkerchief Kite with 1-ft Wire + Bridle + Flowing Tail (ZERO lightning!) */}
          <g transform={`translate(${730 + kiteSway}, ${240 + kiteBob}) rotate(-16)`}>
            <polygon points="0,-54 44,0 0,64 -44,0" fill="rgba(242, 229, 206, 0.28)" stroke="#F2E5CE" strokeWidth="2.5" />
            <line x1="0" y1="-54" x2="0" y2="64" stroke="#B45309" strokeWidth="3.5" />
            <line x1="-44" y1="0" x2="44" y2="0" stroke="#B45309" strokeWidth="3.5" />
            {/* 1-ft Pointed Wire */}
            <line x1="0" y1="-54" x2="0" y2="-88" stroke="#38BDF8" strokeWidth="3" />
            {/* Flowing Kite Tail */}
            <path d={`M 0,64 Q ${-14 + tailWave},96 ${10 - tailWave},124`} fill="none" stroke="#F2E5CE" strokeWidth="2.5" />
          </g>

          {/* Wet Hemp Twine leading down to Y-junction knot at x=1135, y=715 (strictly clear of doorframe) */}
          <path d={`M ${730 + kiteSway},${300 + kiteBob} Q 930,545 1135,715`} fill="none" stroke="#8C7355" strokeWidth="3.5" />

          {/* Dry Timber Shed Backdrop */}
          <g transform="translate(1150, 260)">
            <rect x="40" y="110" width="580" height="530" fill="#120E0B" stroke="#2B1B12" strokeWidth="6" />
            <circle cx="310" cy="360" r="260" fill="url(#shedGlow3)" />
            <polygon points="-45,115 340,-35 660,115 620,145 -25,145" fill="#2A1A10" stroke="#451A03" strokeWidth="3" />
            <rect x="20" y="135" width="38" height="510" fill="#3B2316" />
            <g transform="translate(460, 185)">
              <line x1="0" y1="-45" x2="0" y2="0" stroke="#94A3B8" strokeWidth="3" />
              <rect x="-14" y="0" width="28" height="36" rx="4" fill="#FBBF24" opacity="0.85" />
            </g>
            {/* William Franklin silhouette assisting */}
            <g transform="translate(380, 415)" opacity="0.55">
              <circle cx="0" cy="-78" r="28" fill="#1E293B" />
              <path d="M -52,225 L -38,-40 Q 0,-54 38,-40 L 52,225 Z" fill="#1E293B" />
            </g>
          </g>
        </svg>

        {/* Grounded Expressive FranklinRig strictly sheltered inside dry doorway */}
        <FranklinRig
          pose={{
            worldX: 1190,
            worldY: 96,
            chestLeanDeg: 2,
            breathY: Math.sin(frame * 0.05) * 2,
            headRollDeg: -3,
            neckPitchDeg: -8,
            eyeLookX: -0.65,
            eyeLookY: -0.4,
            blinkAmount: frame % 160 > 153 ? 1 : 0,
            expression: 'curious',
            poseMode: 'holdingSilk',
          }}
          scale={0.62}
        />

        {/* Shed Timber Floor Threshold + Crystal-Clear Y-Junction outside Doorway */}
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <rect x="1150" y="870" width="640" height="44" rx="4" fill="#23150D" stroke="#3B2316" strokeWidth="3" />
          <g transform="translate(1135, 715)">
            <circle cx="0" cy="0" r="5" fill="#FDE68A" />
            {/* Brass Key hanging vertically down */}
            <circle cx="0" cy="14" r="10" fill="none" stroke="#FBBF24" strokeWidth="3.5" />
            <line x1="0" y1="24" x2="0" y2="54" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="42" x2="10" y2="42" stroke="#FBBF24" strokeWidth="3.5" />
            {/* Dry Crimson Silk Ribbon extending cleanly horizontally into Franklin's sheltered hand */}
            <path d="M 0,0 L 142,0" fill="none" stroke="#9E2A2B" strokeWidth="6" strokeLinecap="round" />
          </g>
        </svg>

        <DustMotes frame={frame} cx={1420} cy={580} radius={260} count={20} opacity={0.5} seed={73} />
      </div>
    </div>
  );
};
