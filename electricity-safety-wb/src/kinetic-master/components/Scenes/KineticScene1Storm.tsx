import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraRig } from '../../CameraRig';
import { KineticTitle, punchyEase } from '../../KineticTypography';
import { EditorialDefs } from '../../../editorial-explainer/components/EditorialDefs';

/**
 * Scene 1: The Severed Conductor & Kinetic Hook
 * Duration: 240 frames (0:00 - 0:04)
 * Narrative: Storm deluge -> Snapped 11kV conductor strikes soil -> Kinetic title: "অদৃশ্য মারণফাঁদ"
 * Camera Movement: Starts at ground level (Macro 1.25x), tracks upward along the falling cable, then rapidly pushes in on impact.
 */
export const KineticScene1Storm: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraKeyframes = [
    { frame: 0, scale: 1.0, x: 0, y: 0 },
    { frame: 50, scale: 1.05, x: -30, y: 15 },
    { frame: 110, scale: 1.28, x: -140, y: -60, rotation: -1.2 }, // Crash zoom on spark impact
    { frame: 240, scale: 1.2, x: -100, y: -40, rotation: 0 },
  ];

  // Wire snap physics
  const snapProgress = Math.min(1, Math.max(0, (frame - 45) / 45));
  const easedSnap = punchyEase(snapProgress);
  const wireGroundX = interpolate(easedSnap, [0, 1], [680, 1080]);
  const wireGroundY = interpolate(easedSnap, [0, 1], [220, 800]);
  const whipShake = frame > 90 ? Math.exp(-0.09 * (frame - 90)) * Math.sin(0.45 * (frame - 90)) * 26 : 0;

  return (
    <CameraRig currentFrame={frame} keyframes={cameraKeyframes}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <EditorialDefs />

        {/* Storm Atmosphere */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-storm)" />

        {/* Wind-whipped Storm Clouds */}
        <g opacity="0.35">
          <ellipse cx="380" cy="220" rx="460" ry="120" fill="#0B0E38" />
          <ellipse cx="1100" cy="180" rx="580" ry="140" fill="#0E1248" />
          <ellipse cx="1700" cy="240" rx="480" ry="130" fill="#0B0E38" />
        </g>

        {/* Rain Streaks */}
        <g opacity="0.5">
          {Array.from({ length: 36 }).map((_, i) => {
            const rx = (i * 55 + frame * 18) % 1920;
            const ry = (i * 32 + frame * 30) % 1080;
            return (
              <line
                key={i}
                x1={rx}
                y1={ry}
                x2={rx - 24}
                y2={ry + 52}
                stroke="#8EA3E8"
                strokeWidth={i % 3 === 0 ? 2.2 : 1.2}
                opacity={0.4}
              />
            );
          })}
        </g>

        {/* Utility Pole Structure */}
        <g transform="translate(380, 200)">
          <polygon points="-24,0 24,0 30,640 -30,640" fill="#1A224D" />
          <rect x="-180" y="40" width="360" height="26" rx="4" fill="#2E3870" />
          {[-140, 0, 140].map((ix, idx) => (
            <circle key={idx} cx={ix} cy={53} r="10" fill="#6B7280" />
          ))}
        </g>

        {/* Snapping 11kV Conductor Cable */}
        <path
          d={`M 520 253 Q ${700 + whipShake * 1.5} ${420 + whipShake} ${wireGroundX} ${wireGroundY + whipShake}`}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* High-Voltage Ground Strike Sparks */}
        {frame >= 90 && (
          <g transform={`translate(${wireGroundX}, ${wireGroundY})`} filter="url(#editorial-soft-glow)">
            <ellipse cx="0" cy="0" rx="80" ry="22" fill="#FFD152" opacity={0.35} />
            <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="34" fill="none" stroke="#FF5E57" strokeWidth="3" />
            {[-70, -20, 25, 80, 140, 210].map((deg, idx) => {
              const sparkLen = 28 + Math.sin(frame * 0.45 + idx) * 16;
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={idx}
                  x1="0"
                  y1="0"
                  x2={Math.cos(rad) * sparkLen}
                  y2={Math.sin(rad) * sparkLen * 0.6}
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* Wet Conductive Ground Terrain */}
        <path
          d="M 0 740 Q 480 720 960 745 T 1920 730 L 1920 1080 L 0 1080 Z"
          fill="url(#wet-ground)"
        />

        {/* High-Impact Kinetic Headline Hook */}
        <KineticTitle
          x={960}
          y={440}
          startFrame={95}
          currentFrame={frame}
          badgeText="STORM HAZARD // সতর্কতা"
          words={[
            { text: 'ছেঁড়া তার' },
            { text: 'এক অদৃশ্য', color: '#CBD5E1' },
            { text: 'মারণফাঁদ!', highlight: true, scale: 1.15 },
          ]}
        />
      </svg>
    </CameraRig>
  );
};
