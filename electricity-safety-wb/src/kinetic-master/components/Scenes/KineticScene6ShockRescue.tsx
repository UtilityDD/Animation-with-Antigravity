import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraRig } from '../../CameraRig';
import { KineticTitle, punchyEase } from '../../KineticTypography';
import { ExpressiveMitu } from '../ExpressiveActors';
import { EditorialDefs } from '../../../editorial-explainer/components/EditorialDefs';

/**
 * Scene 6: Shock Rescue Protocol
 * Duration: 420 frames (0:48 - 0:55)
 * Narrative: Mechanical main switch isolation trip -> Dry bamboo pole rescue action.
 * Camera: Starts focused on industrial main switchbox -> dynamically pans right to Mitu extending the non-conductive bamboo pole.
 */
export const KineticScene6ShockRescue: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraKeyframes = [
    { frame: 0, scale: 1.15, x: 200, y: -20 }, // Focus on Main Switch trip
    { frame: 120, scale: 1.12, x: 140, y: -20 },
    { frame: 220, scale: 1.25, x: -280, y: -40 }, // Pans and pushes into Mitu's bamboo separation
    { frame: 420, scale: 1.0, x: 0, y: 0 },
  ];

  // Switch trip animation
  const tripT = Math.min(1, Math.max(0, (frame - 60) / 30));
  const easedTrip = punchyEase(tripT);
  const switchAngle = interpolate(easedTrip, [0, 1], [-45, 45]);
  const isCircuitBroken = frame >= 90;

  // Bamboo rescue extension
  const reachT = Math.min(1, Math.max(0, (frame - 130) / 40));
  const easedReach = punchyEase(reachT);
  const bambooReachX = interpolate(easedReach, [0, 1], [-30, 25]);

  return (
    <CameraRig currentFrame={frame} keyframes={cameraKeyframes}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <EditorialDefs />

        {/* Technical Dark Background */}
        <rect x="0" y="0" width="1920" height="1080" fill="#06091F" />

        {/* Left Action: Main Switch Disconnect */}
        <g transform="translate(560, 570)">
          <rect
            x="-280"
            y="-300"
            width="560"
            height="600"
            rx="20"
            fill="rgba(13, 19, 51, 0.95)"
            stroke={isCircuitBroken ? "#1DD1A1" : "#FF5E57"}
            strokeWidth="3"
            filter="url(#ambient-ground-shadow)"
          />

          <rect x="-240" y="-260" width="140" height="34" rx="6" fill="#253CB8" />
          <text x="-170" y="-238" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="monospace">
            STEP 1 // ধাপ ১
          </text>

          <text x="0" y="-190" textAnchor="middle" className="bengali-heading" fill="#FFFFFF" fontSize="24" fontWeight="800">
            মেইন সুইচ অবিলম্বে অফ করুন
          </text>
          <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
            Cutting source power terminates all current paths instantly
          </text>

          {/* Isolator Switchbox */}
          <g transform="translate(0, 25)">
            <rect x="-120" y="-130" width="240" height="260" rx="14" fill="#1A224D" stroke="#3858E9" strokeWidth="2.5" />
            <rect x="-100" y="-110" width="200" height="220" rx="10" fill="#0D1333" />

            <circle cx="65" cy="-75" r="12" fill={isCircuitBroken ? "#1DD1A1" : "#FF5E57"} />
            <text x="65" y="-50" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold">
              {isCircuitBroken ? "OFF (SAFE)" : "LIVE (230V)"}
            </text>

            <g transform="translate(-20, 10)">
              <circle cx="0" cy="0" r="22" fill="#3858E9" />
              <g transform={`rotate(${switchAngle})`}>
                <rect x="-10" y="-95" width="20" height="95" rx="8" fill={isCircuitBroken ? "#1DD1A1" : "#FF5E57"} />
                <circle cx="0" cy="-95" r="16" fill="#FFFFFF" />
              </g>
            </g>

            {/* Spark Dissipation */}
            {frame >= 85 && frame <= 105 && (
              <g transform="translate(-20, -70)" filter="url(#editorial-soft-glow)">
                <circle cx="0" cy="0" r="18" fill="#FFD152" opacity={0.7} />
                <line x1="-20" y1="-10" x2="20" y2="10" stroke="#FFFFFF" strokeWidth="2.5" />
                <line x1="20" y1="-10" x2="-20" y2="10" stroke="#FFFFFF" strokeWidth="2.5" />
              </g>
            )}
          </g>

          <g transform="translate(0, 220)">
            <rect x="-240" y="-24" width="480" height="48" rx="10" fill="#06091F" stroke="#FF5E57" strokeWidth="1.8" />
            <text x="0" y="6" textAnchor="middle" className="bengali-body" fill="#FF5E57" fontSize="15" fontWeight="bold">
              ❌ ভুলেও খালি হাতে স্পর্শ করবেন না (Secondary Shock)
            </text>
          </g>
        </g>

        {/* Right Action: Insulated Bamboo Separation */}
        <g transform="translate(1360, 570)">
          <rect
            x="-280"
            y="-300"
            width="560"
            height="600"
            rx="20"
            fill="rgba(13, 19, 51, 0.95)"
            stroke="#1DD1A1"
            strokeWidth="3"
            filter="url(#ambient-ground-shadow)"
          />

          <rect x="-240" y="-260" width="140" height="34" rx="6" fill="#253CB8" />
          <text x="-170" y="-238" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="monospace">
            STEP 2 // ধাপ ২
          </text>

          <text x="0" y="-190" textAnchor="middle" className="bengali-heading" fill="#FFFFFF" fontSize="24" fontWeight="800">
            শুকনো বাঁশ দিয়ে আলাদা করুন
          </text>
          <text x="0" y="-165" textAnchor="middle" fill="#94A3B8" fontSize="13">
            Use non-conductive insulators to dislodge contact safely
          </text>

          {/* Mitu Rescuer with Bamboo Pole */}
          <g transform={`translate(${-120 + bambooReachX}, 20)`}>
            <ExpressiveMitu
              x={0}
              y={0}
              scale={1.22}
              frame={frame}
              rightArmAngle={-42}
              expression="cautious"
              lookAtX={0.9}
              lookAtY={0.2}
              holdingBamboo={true}
            />
          </g>

          {/* Cable Dislodged */}
          <g transform="translate(140, 60)">
            <path d="M 60 -120 Q 20 -20 -40 20" fill="none" stroke="#64748B" strokeWidth="6" />
            <circle cx="-40" cy="20" r="8" fill="#FF5E57" />
            <rect x="-20" y="38" width="90" height="22" rx="4" fill="#06091F" stroke="#1DD1A1" strokeWidth="1.2" />
            <text x="25" y="53" textAnchor="middle" fill="#1DD1A1" fontSize="11" fontWeight="bold">
              SEPARATION
            </text>
          </g>

          <g transform="translate(0, 220)">
            <rect x="-240" y="-24" width="480" height="48" rx="10" fill="#06091F" stroke="#1DD1A1" strokeWidth="1.8" />
            <text x="0" y="6" textAnchor="middle" className="bengali-body" fill="#1DD1A1" fontSize="15" fontWeight="bold">
              ✔️ অপরিবাহী শুকনো বস্তু দিয়ে নিরাপদ দূরত্ব থেকে উদ্ধার
            </text>
          </g>
        </g>

        {/* Kinetic Title */}
        <KineticTitle
          x={960}
          y={130}
          startFrame={20}
          currentFrame={frame}
          badgeText="EMERGENCY RESCUE // জীবনদায়ী উদ্ধারবিধি"
          words={[
            { text: 'আগে মেইন সুইচ অফ,' },
            { text: 'তারপর শুকনো বাঁশ!', highlight: true, scale: 1.15 },
          ]}
        />
      </svg>
    </CameraRig>
  );
};
