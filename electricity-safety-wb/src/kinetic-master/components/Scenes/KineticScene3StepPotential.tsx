import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraRig } from '../../CameraRig';
import { KineticTitle, punchyEase } from '../../KineticTypography';
import { EditorialDefs } from '../../../editorial-explainer/components/EditorialDefs';

/**
 * Scene 3: The Physics of Step Potential (ধাপ বিভব)
 * Duration: 780 frames (0:12 - 0:25)
 * Narrative: Progressive transformation from isometric soil field to glowing concentric isobars,
 * then tracking over to the anatomical current loop showing current through the groin/heart.
 * Camera: Starts on the ground equipotential epicenter -> pans right to anatomical human circuit -> zooms out to view the entire closed-loop system.
 */
export const KineticScene3StepPotential: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraKeyframes = [
    { frame: 0, scale: 1.15, x: 180, y: 30 }, // Focused on the soil epicenter
    { frame: 220, scale: 1.1, x: 80, y: 10 },
    { frame: 450, scale: 1.35, x: -360, y: -60 }, // Macro zoom into the anatomical heart/pelvic loop
    { frame: 780, scale: 1.0, x: 0, y: 0 }, // Resolves to wide perspective
  ];

  // Progressive isobar reveals
  const ring1Prog = Math.min(1, Math.max(0, (frame - 30) / 40));
  const ring2Prog = Math.min(1, Math.max(0, (frame - 80) / 40));
  const ring3Prog = Math.min(1, Math.max(0, (frame - 130) / 40));
  const dashTravel = -frame * 2.5;

  // Real-time ticking mathematical readout
  const liveDeltaV = Math.round(interpolate(Math.sin(frame * 0.1), [-1, 1], [3600, 4200]));

  return (
    <CameraRig currentFrame={frame} keyframes={cameraKeyframes}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <EditorialDefs />

        {/* Technical Blueprint Ground */}
        <rect x="0" y="0" width="1920" height="1080" fill="#06091F" />

        {/* Isometric Grid Underlay */}
        <g opacity="0.12">
          {Array.from({ length: 19 }).map((_, i) => (
            <line key={`x-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="1080" stroke="#3858E9" strokeWidth="1" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`y-${i}`} x1="0" y1={i * 100} x2="1920" y2={i * 100} stroke="#3858E9" strokeWidth="1" />
          ))}
        </g>

        {/* 1. Left Feature: Concentric Ground Isobars */}
        <g transform="translate(680, 560)">
          <circle cx="0" cy="0" r="420" fill="url(#potential-field)" opacity="0.65" />

          {/* Wire Epicenter */}
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="32" fill="none" stroke="#FF5E57" strokeWidth="3" opacity="0.8" />
          <text x="0" y="-45" textAnchor="middle" fill="#FF5E57" fontSize="15" fontWeight="900" fontFamily="monospace">
            11 kV LIVE CABLE
          </text>

          {/* Isobar Ring 1 */}
          {ring1Prog > 0 && (
            <g opacity={ring1Prog}>
              <circle cx="0" cy="0" r="140" fill="none" stroke="#FF5E57" strokeWidth="3" strokeDasharray="14 8" strokeDashoffset={dashTravel} />
              <rect x="110" y="-14" width="75" height="22" rx="4" fill="#0D1333" stroke="#FF5E57" strokeWidth="1.2" />
              <text x="147" y="2" textAnchor="middle" fill="#FF5E57" fontSize="12" fontWeight="bold" fontFamily="monospace">
                8,400 V
              </text>
            </g>
          )}

          {/* Isobar Ring 2 */}
          {ring2Prog > 0 && (
            <g opacity={ring2Prog}>
              <circle cx="0" cy="0" r="260" fill="none" stroke="#FFD152" strokeWidth="3" strokeDasharray="16 10" strokeDashoffset={dashTravel * 0.8} />
              <rect x="220" y="-14" width="75" height="22" rx="4" fill="#0D1333" stroke="#FFD152" strokeWidth="1.2" />
              <text x="257" y="2" textAnchor="middle" fill="#FFD152" fontSize="12" fontWeight="bold" fontFamily="monospace">
                4,600 V
              </text>
            </g>
          )}

          {/* Isobar Ring 3 */}
          {ring3Prog > 0 && (
            <g opacity={ring3Prog}>
              <circle cx="0" cy="0" r="380" fill="none" stroke="#1DD1A1" strokeWidth="2.5" strokeDasharray="18 12" strokeDashoffset={dashTravel * 0.6} />
              <rect x="330" y="-14" width="75" height="22" rx="4" fill="#0D1333" stroke="#1DD1A1" strokeWidth="1.2" />
              <text x="367" y="2" textAnchor="middle" fill="#1DD1A1" fontSize="12" fontWeight="bold" fontFamily="monospace">
                1,200 V
              </text>
            </g>
          )}

          {/* Foot Stride Across Isobars */}
          <g transform="translate(140, 90)">
            <ellipse cx="0" cy="0" rx="16" ry="32" fill="#FF5E57" />
            <g transform="translate(120, 80)">
              <ellipse cx="0" cy="0" rx="16" ry="32" fill="#FFD152" />
            </g>
            <path d="M 0 0 Q 60 80 120 80" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="8 6" />
          </g>
        </g>

        {/* 2. Right Feature: Anatomical Circuit Loop */}
        <g transform="translate(1500, 520)">
          <rect x="-240" y="-300" width="480" height="620" rx="20" fill="rgba(13, 19, 51, 0.95)" stroke="rgba(255, 255, 255, 0.15)" filter="url(#ambient-ground-shadow)" />

          <text x="0" y="-245" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800" letterSpacing="0.06em">
            THE ANATOMICAL CIRCUIT
          </text>

          {/* Anatomical Body Silhouette */}
          <g transform="translate(0, 40)">
            <circle cx="0" cy="-140" r="26" fill="#1E2958" stroke="#3858E9" strokeWidth="2" />
            <path d="M -24 -110 L 24 -110 L 18 10 L -18 10 Z" fill="#1E2958" stroke="#3858E9" strokeWidth="2" />
            <path d="M -14 10 L -50 140" fill="none" stroke="#FF5E57" strokeWidth="8" strokeLinecap="round" />
            <path d="M 14 10 L 50 140" fill="none" stroke="#FFD152" strokeWidth="8" strokeLinecap="round" />

            {/* Current Pulse Through Heart */}
            <path
              d="M -50 140 L -14 10 Q 0 -20 14 10 L 50 140"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="16 12"
              strokeDashoffset={-frame * 6}
              strokeLinecap="round"
            />
            <g transform="translate(0, -60)">
              <circle cx="0" cy="0" r="16" fill="rgba(239, 68, 68, 0.3)" stroke="#EF4444" strokeWidth="2" />
              <path d="M -8 -4 C -8 -12, 0 -12, 0 -4 C 0 -12, 8 -12, 8 -4 C 8 4, 0 10, 0 12 C 0 10, -8 4, -8 -4 Z" fill="#EF4444" />
            </g>
          </g>

          {/* Dynamic Voltage Delta HUD Tag */}
          <g transform="translate(0, 240)">
            <rect x="-180" y="-30" width="360" height="60" rx="12" fill="#06091F" stroke="#FF5E57" strokeWidth="1.8" />
            <text x="-160" y="6" fill="#94A3B8" fontSize="12" fontFamily="monospace">
              LETHAL VOLTAGE DELTA:
            </text>
            <text x="160" y="9" textAnchor="end" fill="#FF5E57" fontSize="26" fontWeight="900" fontFamily="monospace">
              &Delta;V = {liveDeltaV} V
            </text>
          </g>
        </g>

        {/* Kinetic Title */}
        <KineticTitle
          x={960}
          y={150}
          startFrame={40}
          currentFrame={frame}
          badgeText="ELECTRODYNAMICS // বৈজ্ঞানিক কারণ"
          words={[
            { text: 'ধাপ বিভব' },
            { text: '(STEP POTENTIAL)', color: '#FFD152' },
          ]}
        />
      </svg>
    </CameraRig>
  );
};
