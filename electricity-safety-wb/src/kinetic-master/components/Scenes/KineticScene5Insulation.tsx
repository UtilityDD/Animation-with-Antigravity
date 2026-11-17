import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraRig } from '../../CameraRig';
import { KineticTitle, punchyEase } from '../../KineticTypography';
import { EditorialDefs } from '../../../editorial-explainer/components/EditorialDefs';

/**
 * Scene 5: Insulation Rules & Stay-Wire Hazards
 * Duration: 600 frames (0:38 - 0:48)
 * Narrative: Dynamic split wipe transition comparing:
 * Panel 1: Wet Hand Switchboard Spark Conduction.
 * Panel 2: Submerged Utility Pole Stay-Wire (টানা তার) Leakage.
 * Camera: Smoothly reframes from Left Panel (Switchboard close-up) across to Right Panel (Stay-wire flooded pole).
 */
export const KineticScene5Insulation: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraKeyframes = [
    { frame: 0, scale: 1.15, x: 220, y: 0 }, // Focus on Left Panel (Switchboard)
    { frame: 240, scale: 1.1, x: 120, y: 0 },
    { frame: 340, scale: 1.18, x: -280, y: -20 }, // Pans and pushes into Right Panel (Stay-Wire)
    { frame: 600, scale: 1.0, x: 0, y: 0 }, // Resolves to wide overview
  ];

  // Water droplet conduction animation
  const dropY = (frame * 3.8) % 170;
  const isSpark = dropY > 80 && dropY < 125;

  return (
    <CameraRig currentFrame={frame} keyframes={cameraKeyframes}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <EditorialDefs />

        {/* Blueprint Dark Background */}
        <rect x="0" y="0" width="1920" height="1080" fill="#06091F" />

        {/* Left Panel: Wet Switchboard Hazard */}
        <g transform="translate(560, 560)">
          <rect
            x="-280"
            y="-300"
            width="560"
            height="600"
            rx="20"
            fill="rgba(13, 19, 51, 0.95)"
            stroke="#FF5E57"
            strokeWidth="3"
            filter="url(#ambient-ground-shadow)"
          />

          <rect x="-240" y="-260" width="160" height="34" rx="6" fill="#FF5E57" />
          <text x="-160" y="-238" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="monospace">
            PROHIBITED ❌
          </text>

          <text x="0" y="-190" textAnchor="middle" className="bengali-heading" fill="#FFFFFF" fontSize="24" fontWeight="800">
            ভেজা হাতে সুইচ ছোঁবেন না
          </text>
          <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
            Water provides low-resistance conduction to 230V mains
          </text>

          {/* Detailed Wall Switchboard */}
          <g transform="translate(0, 25)">
            <rect x="-110" y="-120" width="220" height="240" rx="14" fill="#1A224D" stroke="#3858E9" strokeWidth="2.5" />
            {[-50, 50].map((swX, idx) => (
              <g key={idx} transform={`translate(${swX}, -20)`}>
                <rect x="-26" y="-35" width="52" height="70" rx="8" fill="#0D1333" stroke="#4B5563" strokeWidth="2" />
                <rect x="-20" y="-28" width="40" height="30" rx="4" fill="#3858E9" />
                <line x1="-20" y1="2" x2="20" y2="2" stroke="#FFFFFF" strokeWidth="2" />
              </g>
            ))}

            {/* Trickling Droplet */}
            <g transform={`translate(40, ${-90 + dropY})`}>
              <ellipse cx="0" cy="0" rx="6" ry="10" fill="#22D7DA" opacity="0.85" />
              {isSpark && (
                <g filter="url(#editorial-soft-glow)">
                  <circle cx="0" cy="0" r="14" fill="#FFD152" opacity="0.7" />
                  <line x1="-12" y1="-8" x2="12" y2="8" stroke="#FFFFFF" strokeWidth="2.5" />
                  <line x1="12" y1="-8" x2="-12" y2="8" stroke="#FFFFFF" strokeWidth="2.5" />
                </g>
              )}
            </g>
          </g>

          {/* Rubber Slipper Rule */}
          <g transform="translate(0, 220)">
            <rect x="-220" y="-24" width="440" height="48" rx="10" fill="#06091F" stroke="#1DD1A1" strokeWidth="1.8" />
            <text x="0" y="6" textAnchor="middle" className="bengali-body" fill="#1DD1A1" fontSize="15" fontWeight="bold">
              ✔️ সর্বদা শুকনো রাবারের জুতো ব্যবহার করুন
            </text>
          </g>
        </g>

        {/* Right Panel: Submerged Stay-Wire Hazard */}
        <g transform="translate(1360, 560)">
          <rect
            x="-280"
            y="-300"
            width="560"
            height="600"
            rx="20"
            fill="rgba(13, 19, 51, 0.95)"
            stroke="#FFD152"
            strokeWidth="3"
            filter="url(#ambient-ground-shadow)"
          />

          <rect x="-240" y="-260" width="160" height="34" rx="6" fill="#FFD152" />
          <text x="-160" y="-238" textAnchor="middle" fill="#0D1333" fontSize="13" fontWeight="900" fontFamily="monospace">
            WARNING ⚠️
          </text>

          <text x="0" y="-190" textAnchor="middle" className="bengali-heading" fill="#FFFFFF" fontSize="24" fontWeight="800">
            জমা জলে টানা তার ধরা নিষেধ
          </text>
          <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
            Defective insulation charges steel stay cable
          </text>

          {/* Flooded Utility Pole Illustration */}
          <g transform="translate(0, 45)">
            <polygon points="-16,-140 16,-140 22,120 -22,120" fill="#1E2958" />
            <line x1="-8" y1="-80" x2="-180" y2="120" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
            <g transform="translate(-80, 0) rotate(42)">
              <rect x="-12" y="-18" width="24" height="36" rx="6" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1.5" />
            </g>

            {/* Flooded Water */}
            <path d="M -240 80 Q -120 70 0 80 T 240 75 L 240 150 L -240 150 Z" fill="#0A102E" opacity="0.85" />
            <line x1="-240" y1="80" x2="240" y2="80" stroke="#3858E9" strokeWidth="2.5" opacity="0.6" />

            <g transform="translate(-150, 95)">
              <circle cx="0" cy="0" r="32" fill="none" stroke="#FF5E57" strokeWidth="2.5" strokeDasharray="6 4" />
              <text x="0" y="4" textAnchor="middle" fill="#FF5E57" fontSize="11" fontWeight="bold">
                LEAKAGE
              </text>
            </g>
          </g>

          <g transform="translate(0, 220)">
            <rect x="-220" y="-24" width="440" height="48" rx="10" fill="#06091F" stroke="#FFD152" strokeWidth="1.8" />
            <text x="0" y="6" textAnchor="middle" className="bengali-body" fill="#FFD152" fontSize="15" fontWeight="bold">
              বিদ্যুতের খুঁটি বা টানা তার থেকে দূরে থাকুন
            </text>
          </g>
        </g>

        {/* Kinetic Title */}
        <KineticTitle
          x={960}
          y={130}
          startFrame={25}
          currentFrame={frame}
          badgeText="INSULATION SAFETY // বিদ্যুৎ নিরোধক বিধি"
          words={[
            { text: 'জল ও বিদ্যুৎ' },
            { text: 'মারাত্মক পরিবাহী!', highlight: true, scale: 1.15 },
          ]}
        />
      </svg>
    </CameraRig>
  );
};
