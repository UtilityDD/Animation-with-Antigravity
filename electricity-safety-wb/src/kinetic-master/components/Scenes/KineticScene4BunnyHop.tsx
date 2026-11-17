import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraRig } from '../../CameraRig';
import { KineticTitle, anticipatory, punchyEase } from '../../KineticTypography';
import { ExpressiveBishu } from '../ExpressiveActors';
import { EditorialDefs } from '../../../editorial-explainer/components/EditorialDefs';

/**
 * Scene 4: The Bunny Hop & Shuffling Escape
 * Duration: 780 frames (0:25 - 0:38)
 * Narrative: Dynamic tracking shot following Bishu as he hops across the landscape.
 * Massive bold kinetic headline: "খরগোশ লাফ // ΔV = 0 VOLTS".
 * Camera: Dynamically tracks Bishu's horizontal position, pulling out to reveal the 10-meter safe perimeter marker.
 */
export const KineticScene4BunnyHop: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic tracking camera following Bishu across terrain
  const camX = interpolate(frame, [0, 780], [-100, 160]);
  const camScale = interpolate(frame, [0, 400, 780], [1.15, 1.05, 0.98]);

  const cameraKeyframes = [
    { frame: 0, scale: 1.15, x: -100, y: 0 },
    { frame: 380, scale: 1.05, x: 20, y: -20 },
    { frame: 780, scale: 0.98, x: 160, y: -30 }, // Pulls wide revealing the full 10m safety zone
  ];

  // Consecutive bunny hops (120 frames per cycle)
  const cycle = frame % 125;
  let hopElevation = 0;
  let hopSquashY = 1;
  let hopSquashX = 1;
  let kneeBend = 0;
  let bodyLean = 0;

  if (cycle < 28) {
    const t = cycle / 28;
    const eased = anticipatory(t);
    hopElevation = 0;
    hopSquashY = interpolate(eased, [0, 1], [1, 0.74]);
    hopSquashX = 1 / hopSquashY;
    kneeBend = interpolate(eased, [0, 1], [0, 26]);
    bodyLean = -8;
  } else if (cycle >= 28 && cycle < 85) {
    const t = (cycle - 28) / 57;
    const arc = Math.sin(t * Math.PI);
    hopElevation = arc * 220;
    hopSquashY = 1 + arc * 0.3;
    hopSquashX = 1 / hopSquashY;
    kneeBend = 4; // Locked feet!
    bodyLean = interpolate(t, [0, 1], [-10, 8]);
  } else {
    const t = (cycle - 85) / 40;
    const eased = punchyEase(t);
    const impact = Math.exp(-0.15 * (cycle - 85)) * Math.cos(0.42 * (cycle - 85));
    hopElevation = 0;
    hopSquashY = 1 - impact * 0.35;
    hopSquashX = 1 / hopSquashY;
    kneeBend = Math.max(0, impact * 16);
    bodyLean = interpolate(eased, [0, 1], [6, 0]);
  }

  const bishuX = interpolate(frame, [0, 780], [1280, 460]);
  const safePerimeterX = 700;
  const isSafe = bishuX < safePerimeterX;

  return (
    <CameraRig currentFrame={frame} keyframes={cameraKeyframes}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <EditorialDefs />

        {/* Atmosphere */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-storm)" />

        {/* Rolling Terrain */}
        <path
          d="M -300 710 Q 560 690 1200 705 T 2220 700 L 2220 1080 L -300 1080 Z"
          fill="url(#wet-ground)"
        />

        {/* 10-Meter Safe Perimeter Vertical Boundary Plane */}
        <g transform={`translate(${safePerimeterX}, 0)`}>
          <line x1="0" y1="180" x2="0" y2="720" stroke="#1DD1A1" strokeWidth="3" strokeDasharray="12 8" opacity="0.75" />
          <rect x="-95" y="220" width="190" height="38" rx="8" fill="#0D1333" stroke="#1DD1A1" strokeWidth="2" />
          <text x="0" y="245" textAnchor="middle" fill="#1DD1A1" fontSize="14" fontWeight="900" fontFamily="monospace">
            SAFE PERIMETER (10m)
          </text>
        </g>

        {/* Wire Epicenter on Far Right */}
        <g transform="translate(1720, 705)">
          <path d="M 180 -380 Q 80 -120 0 0" fill="none" stroke="#64748B" strokeWidth="6" />
          <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="32" fill="none" stroke="#FF5E57" strokeWidth="3" opacity="0.8" />
        </g>

        {/* Bishu Executing the Bunny Hop */}
        <ExpressiveBishu
          x={bishuX}
          y={680 - hopElevation}
          scale={1.38}
          frame={frame}
          squashX={hopSquashX}
          squashY={hopSquashY}
          bodyLean={bodyLean}
          leftArmAngle={hopElevation > 0 ? -45 : 15}
          rightArmAngle={hopElevation > 0 ? 45 : -20}
          kneeBend={kneeBend}
          lookAtX={-0.85}
          lookAtY={0.1}
          expression={isSafe ? 'alert' : 'shocked'}
        />

        {/* Floating Kinetic Math Formula Pill */}
        <g transform={`translate(${bishuX}, ${460 - hopElevation * 0.45})`} filter="url(#ambient-ground-shadow)">
          <rect x="-120" y="-30" width="240" height="56" rx="14" fill="rgba(6, 9, 31, 0.95)" stroke="#1DD1A1" strokeWidth="2.5" />
          <text x="0" y="-5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" letterSpacing="0.08em" fontFamily="monospace">
            EQUIPOTENTIAL LAW
          </text>
          <text x="0" y="18" textAnchor="middle" fill="#1DD1A1" fontSize="20" fontWeight="900" fontFamily="monospace">
            &Delta;V = 0 VOLTS ✔️
          </text>
        </g>

        {/* Kinetic Title */}
        <KineticTitle
          x={960}
          y={140}
          startFrame={20}
          currentFrame={frame}
          badgeText="SURVIVAL PROTOCOL // মুক্তির উপায়"
          words={[
            { text: 'খরগোশ লাফ' },
            { text: 'বা পা ঘষে চলা', color: '#1DD1A1', highlight: true, scale: 1.15 },
          ]}
        />
      </svg>
    </CameraRig>
  );
};
