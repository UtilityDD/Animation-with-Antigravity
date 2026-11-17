import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { KurzgesagtSafetyParallax } from '../KurzgesagtSafetyParallax';
import { GeometricBidyutBondhu } from '../KurzgesagtCharacterRigs';

export const KSScene5WetSwitches: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 600], [1.0, 1.08]);

  return (
    <KurzgesagtSafetyParallax
      camX={0}
      camY={0}
      camScale={camScale}
      bgGradient="radial-gradient(ellipse at 50% 50%, #243CDB 0%, #09134B 60%, #05071A 100%)"
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Left Panel: Wet Switchboard Hazard ❌ */}
          <g transform="translate(620, 640)">
            <rect x="-240" y="-220" width="480" height="440" rx="22" fill="#09134B" stroke="#EF4444" strokeWidth="3.5" />
            <text x="0" y="-170" textAnchor="middle" fill="#EF4444" fontSize="22" fontWeight="800">
              ❌ ভেজা হাতে সুইচবোর্ড ছোঁবেন না
            </text>

            {/* Glowing Wall Switchboard */}
            <rect x="-80" y="-100" width="160" height="180" rx="14" fill="#180A59" stroke="#64748B" strokeWidth="3" />
            <circle cx="0" cy="-60" r="10" fill="#EF4444" />
            <rect x="-35" y="-20" width="70" height="40" rx="6" fill="#334155" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="3" />

            {/* Water Droplets Conducting Sparks */}
            <circle cx="25" cy="-10" r="4" fill="#22D7DA" />
            <circle cx="32" cy="15" r="5" fill="#22D7DA" />
            <circle cx="28" cy="40" r="4" fill="#22D7DA" />

            {/* Rubber Slippers Inset */}
            <g transform="translate(0, 140)">
              <rect x="-140" y="-25" width="280" height="50" rx="10" fill="rgba(34, 215, 218, 0.2)" stroke="#22D7DA" strokeWidth="2" />
              <text x="0" y="6" textAnchor="middle" fill="#FFD244" fontSize="14" fontWeight="bold">
                পায়ে শুকনো রাবারের জুতো পরো ✔️
              </text>
            </g>
          </g>

          {/* Right Panel: Submerged Utility Pole & Stay-Wire ❌ */}
          <g transform="translate(1580, 640)">
            <rect x="-240" y="-220" width="480" height="440" rx="22" fill="#09134B" stroke="#FF851D" strokeWidth="3.5" />
            <text x="0" y="-170" textAnchor="middle" fill="#FF851D" fontSize="22" fontWeight="800">
              ⚠️ জমা জলে টানা তার (Stay Wire) ধরা নিষেধ
            </text>

            {/* Waterlogged Concrete Pole & Diagonal Stay-Wire */}
            <rect x="-20" y="-110" width="40" height="240" fill="#64748B" />
            <line x1="-10" y1="-90" x2="-140" y2="130" stroke="#22D7DA" strokeWidth="6" strokeLinecap="round" />
            {/* Water Surface Line */}
            <rect x="-210" y="90" width="420" height="80" fill="rgba(34, 215, 218, 0.3)" />

            {/* Warning Ring */}
            <circle cx="-75" cy="20" r="42" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="8 6" />
            <text x="-75" y="26" textAnchor="middle" fill="#EF4444" fontSize="16" fontWeight="bold">
              বিপদ!
            </text>
          </g>

          {/* Center Guardian Mascot Halting Hazard */}
          <GeometricBidyutBondhu
            x={1100}
            y={620}
            scale={1.3}
            frame={frame}
            holdingStopSign={true}
          />
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#FF851D', letterSpacing: '0.12em' }}>
            INSULATION SAFETY // LIQUID CONDUCTIVITY & STAY-WIRE HAZARDS
          </span>
        </div>
      }
    />
  );
};
