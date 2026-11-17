import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { EditorialDefs } from '../EditorialDefs';
import { EditorialMitu } from '../EditorialCharacters';
import { editorialSnappy } from '../../motionCurves';

/**
 * Scene 5: Insulation Rules (Wet Switches & Submerged Stay-Wires)
 * Duration: 600 frames (0:38 - 0:48)
 * Narrative: Why operating switches with wet hands or grasping flooded utility stay-wires causes instant conduction.
 * Editorial Layout: Asymmetric dual-panel architectural comparison with clear red hazard vs yellow caution markers.
 */
export const EditorialScene5Insulation: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 600], [1.0, 1.05]);

  // Animated water droplet trickling across switchplate
  const dropY = (frame * 3.5) % 180;
  const isSparking = dropY > 90 && dropY < 130;

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        transform: `scale(${camScale})`,
        transformOrigin: '960px 540px',
      }}
    >
      <EditorialDefs />

      {/* Dark Technical Background */}
      <rect x="0" y="0" width="1920" height="1080" fill="#06091F" />

      {/* Left Feature Card: Wet Hand Switchboard Hazard */}
      <g transform="translate(560, 520)">
        <rect
          x="-280"
          y="-300"
          width="560"
          height="600"
          rx="20"
          fill="rgba(13, 19, 51, 0.95)"
          stroke="#FF5E57"
          strokeWidth="2.5"
          filter="url(#ambient-ground-shadow)"
        />

        {/* Hazard Badge */}
        <rect x="-240" y="-260" width="160" height="34" rx="6" fill="#FF5E57" />
        <text x="-160" y="-238" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="monospace">
          PROHIBITED ❌
        </text>

        <text x="0" y="-190" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="800" fontFamily="'Hind Siliguri', sans-serif">
          ভেজা হাতে সুইচবোর্ড ছোঁবেন না
        </text>
        <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
          Water provides an immediate low-resistance path to 230V mains
        </text>

        {/* Large Detailed Industrial Switchboard Plate */}
        <g transform="translate(0, 20)">
          {/* Switch Plate Base */}
          <rect x="-110" y="-120" width="220" height="240" rx="14" fill="#1A224D" stroke="#3858E9" strokeWidth="2.5" />
          
          {/* Screw fasteners */}
          <circle cx="-85" cy="-95" r="5" fill="#4B5563" />
          <circle cx="85" cy="-95" r="5" fill="#4B5563" />
          <circle cx="-85" cy="95" r="5" fill="#4B5563" />
          <circle cx="85" cy="95" r="5" fill="#4B5563" />

          {/* Toggle Switches */}
          {[-50, 50].map((swX, idx) => (
            <g key={idx} transform={`translate(${swX}, -20)`}>
              <rect x="-26" y="-35" width="52" height="70" rx="8" fill="#0D1333" stroke="#4B5563" strokeWidth="2" />
              <rect x="-20" y="-28" width="40" height="30" rx="4" fill="#3858E9" />
              <line x1="-20" y1="2" x2="20" y2="2" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          ))}

          {/* Trickling Water Droplet Across Faceplate */}
          <g transform={`translate(40, ${-90 + dropY})`}>
            <ellipse cx="0" cy="0" rx="6" ry="10" fill="#22D7DA" opacity="0.85" />
            {isSparking && (
              <g filter="url(#editorial-soft-glow)">
                <circle cx="0" cy="0" r="14" fill="#FFD152" opacity="0.6" />
                <line x1="-12" y1="-8" x2="12" y2="8" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="12" y1="-8" x2="-12" y2="8" stroke="#FFFFFF" strokeWidth="2" />
              </g>
            )}
          </g>
        </g>

        {/* Rubber Footwear Rule Inset */}
        <g transform="translate(0, 220)">
          <rect x="-220" y="-24" width="440" height="48" rx="10" fill="#06091F" stroke="#1DD1A1" strokeWidth="1.5" />
          <text x="0" y="6" textAnchor="middle" fill="#1DD1A1" fontSize="14" fontWeight="bold">
            ✔️ সর্বদা শুকনো রাবারের চটি বা জুতো ব্যবহার করুন
          </text>
        </g>
      </g>

      {/* Right Feature Card: Submerged Utility Pole & Stay-Wire Hazard */}
      <g transform="translate(1360, 520)">
        <rect
          x="-280"
          y="-300"
          width="560"
          height="600"
          rx="20"
          fill="rgba(13, 19, 51, 0.95)"
          stroke="#FFD152"
          strokeWidth="2.5"
          filter="url(#ambient-ground-shadow)"
        />

        <rect x="-240" y="-260" width="160" height="34" rx="6" fill="#FFD152" />
        <text x="-160" y="-238" textAnchor="middle" fill="#0D1333" fontSize="13" fontWeight="900" fontFamily="monospace">
          WARNING ⚠️
        </text>

        <text x="0" y="-190" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="800" fontFamily="'Hind Siliguri', sans-serif">
          জমা জলে টানা তার (Stay Wire) ধরা নিষেধ
        </text>
        <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
          Defective earthing or leakage charges the steel stay cable
        </text>

        {/* Detailed Utility Pole & Submerged Guy Wire Illustration */}
        <g transform="translate(0, 40)">
          {/* Concrete Pole */}
          <polygon points="-16,-140 16,-140 22,120 -22,120" fill="#1E2958" />
          
          {/* Diagonal Steel Stay Cable */}
          <line x1="-8" y1="-80" x2="-180" y2="120" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          
          {/* Egg Strain Insulator on Stay Wire */}
          <g transform="translate(-80, 0) rotate(42)">
            <rect x="-12" y="-18" width="24" height="36" rx="6" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1.5" />
          </g>

          {/* Flooded Water Surface */}
          <path d="M -240 80 Q -120 70 0 80 T 240 75 L 240 150 L -240 150 Z" fill="#0A102E" opacity="0.8" />
          <line x1="-240" y1="80" x2="240" y2="80" stroke="#3858E9" strokeWidth="2" opacity="0.6" />

          {/* Hazard Ring Callout on Flooded Cable Base */}
          <g transform="translate(-150, 95)">
            <circle cx="0" cy="0" r="32" fill="none" stroke="#FF5E57" strokeWidth="2.5" strokeDasharray="6 4" />
            <text x="0" y="4" textAnchor="middle" fill="#FF5E57" fontSize="11" fontWeight="bold">
              LEAKAGE
            </text>
          </g>
        </g>

        {/* Advisory Inset */}
        <g transform="translate(0, 220)">
          <rect x="-220" y="-24" width="440" height="48" rx="10" fill="#06091F" stroke="#FFD152" strokeWidth="1.5" />
          <text x="0" y="6" textAnchor="middle" fill="#FFD152" fontSize="14" fontWeight="bold">
            বিদ্যুতের খুঁটি বা তার থেকে অন্তত ৫ মিটার দূরে থাকুন
          </text>
        </g>
      </g>
    </svg>
  );
};

