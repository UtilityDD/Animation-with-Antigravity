import React from 'react';
import { DustMotes, camAt, camTransform } from '../historical/scene1/Scene1Shared';

export interface CameraKeyframe {
  f: number;
  x: number;
  y: number;
  z: number;
  sx?: number;
  sy?: number;
  blur?: number;
}

/**
 * Continuous 2.5D Virtual Camera Rig with organic handheld/optical micro-drift
 * (+-3px X/Y, +-0.15 deg rotation) + optional rack-focus blur.
 */
export const CameraRig: React.FC<{
  local: number;
  frame: number;
  keys: CameraKeyframe[];
  children: React.ReactNode;
}> = ({ local, frame, keys, children }) => {
  const cam = camAt(
    local,
    keys.map((k) => ({
      f: k.f,
      x: k.x,
      y: k.y,
      z: k.z,
      sx: k.sx ?? 960,
      sy: k.sy ?? 540,
    }))
  );

  // Subtle organic optical breathing so zero frames ever look dead
  const driftX = Math.sin(frame * 0.025) * 3;
  const driftY = Math.cos(frame * 0.021) * 2.5;
  const driftRot = Math.sin(frame * 0.017) * 0.14;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        transform: `${camTransform({ ...cam, x: cam.x + driftX, y: cam.y + driftY })} rotate(${driftRot.toFixed(3)}deg)`,
        transformOrigin: '0 0',
      }}
    >
      {children}
    </div>
  );
};

/**
 * 3-Layer Depth-of-Field "Living Lab" Architecture:
 * - Z-Layer 0 (blur 7px, opacity 0.28, 0.25x parallax): Italian 1800s stone arch window OR Modern lab oscilloscope
 * - Z-Layer 1 (blur 3px, opacity 0.48, 0.65x parallax): Unfocused workbench props
 * - Z-Layer 3 (blur 10px, opacity 0.22, 1.45x parallax): Foreground corner flask rim bokeh + fast dust motes
 */
export const LivingLabBackdrop: React.FC<{
  mode: 'italian1800' | 'modern';
  frame: number;
  panX?: number;
  z1Blur?: number;
}> = ({ mode, frame, panX = 0, z1Blur = 3 }) => {
  const scopePhase = (frame * 0.08) % (Math.PI * 2);

  return (
    <>
      {/* Z-LAYER 0: Atmospheric Room Backdrop (blur 7px, opacity 0.28, 0.25x parallax) */}
      <div
        style={{
          position: 'absolute',
          inset: -120,
          filter: 'blur(7px)',
          opacity: 0.28,
          transform: `translateX(${(panX * 0.25).toFixed(1)}px)`,
          pointerEvents: 'none',
        }}
      >
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          {mode === 'italian1800' ? (
            <>
              {/* Stone Arch Window + Moonlit Sky */}
              <path d="M 320,820 L 320,380 A 210,210 0 0,1 740,380 L 740,820 Z" fill="#1E3A5F" opacity="0.55" />
              <line x1="530" y1="170" x2="530" y2="820" stroke="#0F172A" strokeWidth="14" />
              {/* Wooden Lab Shelving Silhouettes */}
              <rect x="1280" y="260" width="620" height="22" fill="#291D14" />
              <rect x="1280" y="480" width="620" height="22" fill="#291D14" />
              {[1340, 1460, 1600, 1740].map((jx) => (
                <rect key={jx} x={jx} y="165" width="65" height="95" rx="14" fill="#334155" opacity="0.7" />
              ))}
              {/* Hanging Brass Oil Lamp Glow */}
              <circle cx="1060" cy="210" r="140" fill="#F59E0B" opacity="0.28" />
            </>
          ) : (
            <>
              {/* Modern Lab Out-of-Focus Oscilloscope + Status LEDs */}
              <rect x="260" y="210" width="460" height="310" rx="18" fill="#0F172A" stroke="#334155" strokeWidth="8" />
              <rect x="295" y="245" width="320" height="210" rx="10" fill="#022C22" />
              <path
                d={`M 310,350 Q 385,${280 + Math.sin(scopePhase) * 45} 455,350 T 600,350`}
                fill="none"
                stroke="#10B981"
                strokeWidth="5"
              />
              <circle cx="660" cy="280" r="8" fill="#38BDF8" opacity={frame % 30 < 15 ? 0.9 : 0.25} />
              <circle cx="660" cy="320" r="8" fill="#F43F5E" opacity="0.7" />
            </>
          )}
        </svg>
      </div>

      {/* Z-LAYER 1: Midground Workbench Props (blur 3px, opacity 0.48, 0.65x parallax) */}
      <div
        style={{
          position: 'absolute',
          inset: -60,
          filter: `blur(${z1Blur}px)`,
          opacity: 0.48,
          transform: `translateX(${(panX * 0.65).toFixed(1)}px)`,
          pointerEvents: 'none',
        }}
      >
        <svg width="2040" height="1200" viewBox="0 0 2040 1200">
          {mode === 'italian1800' ? (
            <>
              {/* Left: Galvani Frog-Leg Sketch Parchment */}
              <g transform="translate(220, 740) rotate(-8)">
                <rect x="-110" y="-70" width="220" height="140" rx="4" fill="#E7D8BE" />
                <path d="M -50,-10 Q 0,-40 50,-10 M -20,-10 L -35,35 M 20,-10 L 35,35" fill="none" stroke="#451A03" strokeWidth="3.5" />
              </g>
              {/* Right: Coiled Copper Wire + Brass Weights */}
              <circle cx="1760" cy="760" r="56" fill="none" stroke="#D97706" strokeWidth="10" />
              <rect x="1580" y="740" width="44" height="58" rx="4" fill="#B45309" />
            </>
          ) : (
            <>
              {/* Modern Lab: Solder Spool + Resistor Tray + Coffee Mug */}
              <rect x="180" y="750" width="90" height="105" rx="10" fill="#334155" />
              <ellipse cx="1760" cy="780" rx="58" ry="26" fill="none" stroke="#94A3B8" strokeWidth="12" />
              <rect x="1580" y="745" width="74" height="84" rx="12" fill="#1E293B" />
            </>
          )}
        </svg>
      </div>

      {/* Z-LAYER 3: Foreground Bokeh & Lens Framing (blur 10px, opacity 0.22, 1.45x parallax) */}
      <div
        style={{
          position: 'absolute',
          inset: -80,
          filter: 'blur(10px)',
          opacity: 0.22,
          transform: `translateX(${(panX * 1.45).toFixed(1)}px)`,
          pointerEvents: 'none',
        }}
      >
        <svg width="2080" height="1240" viewBox="0 0 2080 1240">
          <ellipse cx="110" cy="1080" rx="165" ry="240" fill="#0F172A" stroke="#38BDF8" strokeWidth="8" />
          <ellipse cx="1980" cy="1090" rx="140" ry="210" fill="#0F172A" stroke="#F59E0B" strokeWidth="6" />
        </svg>
        <DustMotes frame={frame} cx={960} cy={520} radius={620} count={24} opacity={0.85} seed={303} />
      </div>
    </>
  );
};
