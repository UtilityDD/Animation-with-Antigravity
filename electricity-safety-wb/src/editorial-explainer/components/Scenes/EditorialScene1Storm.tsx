import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { EditorialDefs } from '../EditorialDefs';
import { editorialSnappy } from '../../motionCurves';

/**
 * Scene 1: The Severed Conductor (Monsoon Storm Incident)
 * Duration: 240 frames (0:00 - 0:04)
 * Narrative: A violent storm snaps an 11kV conductor, striking wet soil.
 * Focal Point: The dynamic snapping wire with mechanical tension release and arcing ground strike.
 */
export const EditorialScene1Storm: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera pan & gentle zoom (establishes scope without jarring motion)
  const camScale = interpolate(frame, [0, 240], [1.0, 1.08]);
  const camY = interpolate(frame, [0, 240], [0, 15]);

  // Wire snap trigger at frame 50
  const snapT = Math.min(1, Math.max(0, (frame - 50) / 45));
  const easedSnap = editorialSnappy(snapT);

  // Severe whip & recoil on snapped cable
  const wireEndGroundX = interpolate(easedSnap, [0, 1], [720, 1020]);
  const wireEndGroundY = interpolate(easedSnap, [0, 1], [240, 780]);
  const whipBounce = frame > 95 ? Math.exp(-0.08 * (frame - 95)) * Math.sin(0.4 * (frame - 95)) * 25 : 0;

  // Lightning flashes at key dramatic beats (frames 45, 95)
  const flash1 = interpolate(frame, [45, 48, 55], [0, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flash2 = interpolate(frame, [95, 98, 108], [0, 0.85, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flashOpacity = Math.max(flash1, flash2);

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        transform: `translate(0px, ${camY}px) scale(${camScale})`,
        transformOrigin: '960px 600px',
      }}
    >
      <EditorialDefs />

      {/* Atmospheric Storm Sky */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-storm)" />

      {/* Dynamic Lightning Flash Plane */}
      {flashOpacity > 0 && (
        <rect x="0" y="0" width="1920" height="1080" fill="#3858E9" opacity={flashOpacity * 0.4} />
      )}

      {/* Distant Layer (0.3x Parallax): Rolling Monsoon Clouds & Foliage */}
      <g opacity="0.4">
        <path
          d="M 0 540 Q 320 480 680 520 T 1400 500 T 1920 530 L 1920 1080 L 0 1080 Z"
          fill="#0A102E"
        />
        {/* Palm tree silhouettes swaying in storm winds */}
        {[-20, 240, 1680].map((tx, idx) => {
          const sway = Math.sin(frame * 0.12 + idx) * 8;
          return (
            <g key={idx} transform={`translate(${tx}, 440) rotate(${sway})`}>
              <path d="M 0 120 Q -10 60 -15 0" stroke="#0D1333" strokeWidth="12" fill="none" strokeLinecap="round" />
              <path d="M -15 0 Q -60 -20 -90 -10 M -15 0 Q -40 -50 -50 -80 M -15 0 Q 20 -60 40 -80 M -15 0 Q 50 -30 80 -20" stroke="#0D1333" strokeWidth="6" fill="none" />
            </g>
          );
        })}
      </g>

      {/* Midground Layer (0.6x Parallax): Heavy Rain Vector Streaks */}
      <g opacity="0.55">
        {Array.from({ length: 36 }).map((_, i) => {
          const rx = (i * 55 + frame * 16) % 1920;
          const ry = (i * 32 + frame * 28) % 1080;
          return (
            <line
              key={i}
              x1={rx}
              y1={ry}
              x2={rx - 22}
              y2={ry + 48}
              stroke="#8EA3E8"
              strokeWidth={i % 3 === 0 ? 2 : 1.2}
              opacity={0.35}
            />
          );
        })}
      </g>

      {/* Concrete Utility Pole & Cross-arm Structure */}
      <g transform="translate(420, 220)">
        {/* Pole Pillar */}
        <polygon points="-22,0 22,0 28,620 -28,620" fill="#1A224D" />
        <line x1="0" y1="0" x2="0" y2="620" stroke="#253CB8" strokeWidth="2" opacity="0.4" />
        
        {/* Steel Crossarm */}
        <rect x="-160" y="40" width="320" height="24" rx="4" fill="#2E3870" />
        
        {/* Ceramic Insulators */}
        {[-130, 0, 130].map((ix, idx) => (
          <g key={idx} transform={`translate(${ix}, 18)`}>
            <rect x="-12" y="0" width="24" height="24" rx="4" fill="#6B7280" />
            <circle cx="0" cy="22" r="8" fill="#475569" />
          </g>
        ))}

        {/* Intact Transmission Conductors running to left */}
        <path d="M -130 18 Q -300 80 -450 140" fill="none" stroke="#64748B" strokeWidth="5" />
        <path d="M 0 18 Q -200 70 -450 120" fill="none" stroke="#64748B" strokeWidth="5" />
      </g>

      {/* Focal Point: The Severed 11kV Conductor Snapping & Striking Soil */}
      <g>
        {/* Intact right wire segment snapping down */}
        <path
          d={`M 550 238 Q ${680 + whipBounce * 1.5} ${400 + whipBounce} ${wireEndGroundX} ${wireEndGroundY + whipBounce}`}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Ground impact arcs & high-voltage sparks */}
        {frame >= 95 && (
          <g transform={`translate(${wireEndGroundX}, ${wireEndGroundY})`} filter="url(#editorial-soft-glow)">
            {/* Conductive soil flash */}
            <ellipse cx="0" cy="0" rx="65" ry="18" fill="#FFD152" opacity={0.3} />
            <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="28" fill="none" stroke="#FF5E57" strokeWidth="2.5" />
            
            {/* Crackling high-voltage sparks */}
            {[-60, -20, 25, 70, 130, 210].map((ang, i) => {
              const sparkLen = 22 + Math.sin(frame * 0.4 + i) * 14;
              const rad = (ang * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={Math.cos(rad) * sparkLen}
                  y2={Math.sin(rad) * sparkLen * 0.6}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}
      </g>

      {/* Foreground Terrain with Wet Reflections */}
      <path
        d="M 0 740 Q 480 720 960 745 T 1920 730 L 1920 1080 L 0 1080 Z"
        fill="url(#wet-ground)"
      />
      {/* Specular sheen on waterlogged ground */}
      <path
        d="M 0 740 Q 480 720 960 745 T 1920 730"
        fill="none"
        stroke="#3858E9"
        strokeWidth="2"
        opacity="0.45"
      />
    </svg>
  );
};
