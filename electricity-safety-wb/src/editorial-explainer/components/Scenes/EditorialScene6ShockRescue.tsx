import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { EditorialDefs } from '../EditorialDefs';
import { EditorialMitu } from '../EditorialCharacters';
import { editorialSnappy } from '../../motionCurves';

/**
 * Scene 6: Shock Rescue Protocol
 * Duration: 420 frames (0:48 - 0:55)
 * Narrative: The two life-saving intervention rules when someone suffers an electric shock:
 * Step 1: Disconnect the Main Switch immediately.
 * Step 2: If unreachable, separate contact safely using dry, non-conductive wood or bamboo.
 * Danger: NEVER touch bare-handed.
 */
export const EditorialScene6ShockRescue: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 420], [1.0, 1.05]);

  // Main switch trip down animation (frames 70-110)
  const tripProgress = Math.min(1, Math.max(0, (frame - 70) / 35));
  const easedTrip = editorialSnappy(tripProgress);
  const switchAngle = interpolate(easedTrip, [0, 1], [-45, 45]);
  const isCircuitBroken = frame >= 105;

  // Bamboo rescue separation extension (frames 140-200)
  const rescueProgress = Math.min(1, Math.max(0, (frame - 140) / 45));
  const easedRescue = editorialSnappy(rescueProgress);
  const bambooReachX = interpolate(easedRescue, [0, 1], [-30, 25]);

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

      {/* Top Banner Heading */}
      <g transform="translate(960, 120)">
        <text x="0" y="0" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="900" letterSpacing="0.05em">
          জরুরি উদ্ধার বিধি // SHOCK INTERVENTION PROTOCOL
        </text>
        <line x1="-300" y1="20" x2="300" y2="20" stroke="#3858E9" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Left Action: Main Switch Disconnect (Primary Intervention) */}
      <g transform="translate(560, 560)">
        <rect
          x="-280"
          y="-300"
          width="560"
          height="600"
          rx="20"
          fill="rgba(13, 19, 51, 0.95)"
          stroke={isCircuitBroken ? "#1DD1A1" : "#FF5E57"}
          strokeWidth="2.5"
          filter="url(#ambient-ground-shadow)"
        />

        <rect x="-240" y="-260" width="140" height="34" rx="6" fill="#253CB8" />
        <text x="-170" y="-238" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="monospace">
          STEP 1 // ধাপ ১
        </text>

        <text x="0" y="-190" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="800" fontFamily="'Hind Siliguri', sans-serif">
          মেইন সুইচ অবিলম্বে অফ করুন
        </text>
        <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
          Cutting source power terminates all current paths instantly
        </text>

        {/* Industrial Isolator Breaker Box */}
        <g transform="translate(0, 25)">
          <rect x="-120" y="-130" width="240" height="260" rx="14" fill="#1A224D" stroke="#3858E9" strokeWidth="2.5" />
          <rect x="-100" y="-110" width="200" height="220" rx="10" fill="#0D1333" />

          {/* Indicator Lamp */}
          <circle cx="65" cy="-75" r="12" fill={isCircuitBroken ? "#1DD1A1" : "#FF5E57"} />
          <text x="65" y="-50" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold">
            {isCircuitBroken ? "OFF (SAFE)" : "LIVE (230V)"}
          </text>

          {/* Heavy Pivot Lever */}
          <g transform="translate(-20, 10)">
            <circle cx="0" cy="0" r="22" fill="#3858E9" />
            <g transform={`rotate(${switchAngle})`}>
              <rect x="-10" y="-95" width="20" height="95" rx="8" fill={isCircuitBroken ? "#1DD1A1" : "#FF5E57"} />
              <circle cx="0" cy="-95" r="16" fill="#FFFFFF" />
            </g>
          </g>

          {/* Spark Dissipation Effect */}
          {frame >= 95 && frame <= 115 && (
            <g transform="translate(-20, -70)" filter="url(#editorial-soft-glow)">
              <circle cx="0" cy="0" r="18" fill="#FFD152" opacity={0.7} />
              <line x1="-20" y1="-10" x2="20" y2="10" stroke="#FFFFFF" strokeWidth="2.5" />
              <line x1="20" y1="-10" x2="-20" y2="10" stroke="#FFFFFF" strokeWidth="2.5" />
            </g>
          )}
        </g>

        {/* Prohibited Action Warning */}
        <g transform="translate(0, 220)">
          <rect x="-240" y="-24" width="480" height="48" rx="10" fill="#06091F" stroke="#FF5E57" strokeWidth="1.5" />
          <text x="0" y="6" textAnchor="middle" fill="#FF5E57" fontSize="14" fontWeight="bold">
            ❌ ভুলেও খালি হাতে স্পর্শ করবেন না (Severe Secondary Shock)
          </text>
        </g>
      </g>

      {/* Right Action: Insulated Bamboo/Wood Separation (Secondary Protocol) */}
      <g transform="translate(1360, 560)">
        <rect
          x="-280"
          y="-300"
          width="560"
          height="600"
          rx="20"
          fill="rgba(13, 19, 51, 0.95)"
          stroke="#1DD1A1"
          strokeWidth="2.5"
          filter="url(#ambient-ground-shadow)"
        />

        <rect x="-240" y="-260" width="140" height="34" rx="6" fill="#253CB8" />
        <text x="-170" y="-238" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="monospace">
          STEP 2 // ধাপ ২
        </text>

        <text x="0" y="-190" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="800" fontFamily="'Hind Siliguri', sans-serif">
          শুকনো বাঁশ বা কাঠ দিয়ে আলাদা করুন
        </text>
        <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
          Use non-conductive insulators to push contact wire away
        </text>

        {/* Rescuer (Mitu) using dry bamboo pole */}
        <g transform={`translate(${-120 + bambooReachX}, 20)`}>
          <EditorialMitu
            x={0}
            y={0}
            scale={1.2}
            frame={frame}
            rightArmAngle={-42}
            expression="cautious"
            lookAtX={0.9}
            lookAtY={0.2}
            showBambooPole={true}
          />
        </g>

        {/* Live Cable Dislodged from Ground */}
        <g transform="translate(140, 60)">
          <path d="M 60 -120 Q 20 -20 -40 20" fill="none" stroke="#64748B" strokeWidth="6" />
          <circle cx="-40" cy="20" r="8" fill="#FF5E57" />
          {/* Safe insulation gap tag */}
          <rect x="-20" y="38" width="90" height="22" rx="4" fill="#06091F" stroke="#1DD1A1" strokeWidth="1.2" />
          <text x="25" y="53" textAnchor="middle" fill="#1DD1A1" fontSize="11" fontWeight="bold">
            SEPARATION
          </text>
        </g>

        {/* Advisory Inset */}
        <g transform="translate(0, 220)">
          <rect x="-240" y="-24" width="480" height="48" rx="10" fill="#06091F" stroke="#1DD1A1" strokeWidth="1.5" />
          <text x="0" y="6" textAnchor="middle" fill="#1DD1A1" fontSize="14" fontWeight="bold">
            ✔️ অপরিবাহী শুকনো বস্তু দিয়ে নিরাপদ দূরত্ব বজায় রেখে উদ্ধার
          </text>
        </g>
      </g>
    </svg>
  );
};

