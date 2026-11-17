import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraRig } from '../../CameraRig';
import { KineticTitle, punchyEase } from '../../KineticTypography';
import { ExpressiveBishu, ExpressiveMitu } from '../ExpressiveActors';
import { EditorialDefs } from '../../../editorial-explainer/components/EditorialDefs';

/**
 * Scene 7: Emergency Dispatch & Hotline 19121 Finale
 * Duration: 300 frames (0:55 - 1:00)
 * Narrative: Dawn horizon -> Pulsing WBSEDCL 19121 Hotline command center -> Both characters celebrating safely -> Civic signoff.
 * Camera: Starts focused on the giant 19121 numbers (Scale 1.35x), then executes a majestic pull-back revealing the full dawn composition.
 */
export const KineticScene7Emergency19121: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraKeyframes = [
    { frame: 0, scale: 1.32, x: 0, y: -40 }, // Extreme macro focus on 19121
    { frame: 110, scale: 1.15, x: 0, y: -20 },
    { frame: 300, scale: 1.0, x: 0, y: 0 }, // Full cinematic wide establishing shot
  ];

  // Card scale entrance
  const cardT = Math.min(1, frame / 30);
  const easedCard = punchyEase(cardT);

  // Radar ring pulses
  const wave1 = (frame * 2.8) % 110;
  const wave2 = (frame * 2.8 + 55) % 110;

  return (
    <CameraRig currentFrame={frame} keyframes={cameraKeyframes}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <EditorialDefs />

        {/* Warm Dawn Atmosphere */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-warm-sunset)" />

        {/* Rolling Hills Silhouette */}
        <path d="M 0 660 Q 480 620 960 645 T 1920 630 L 1920 1080 L 0 1080 Z" fill="#0E163B" />
        <path d="M 0 720 Q 560 690 1200 705 T 2120 700 L 2120 1080 L 0 1080 Z" fill="#080D26" />

        {/* Floating Golden Sparks */}
        {Array.from({ length: 22 }).map((_, i) => {
          const py = 1000 - ((frame * 2.5 + i * 55) % 1000);
          const px = 180 + ((i * 95) % 1560);
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={3 + (i % 3)}
              fill={i % 2 === 0 ? "#FFD152" : "#FFFFFF"}
              opacity={0.5}
            />
          );
        })}

        {/* Central WBSEDCL 19121 Command Hub */}
        <g transform={`translate(960, 420) scale(${easedCard})`} filter="url(#ambient-ground-shadow)">
          <circle cx="0" cy="-120" r={50 + wave1} fill="none" stroke="#FFD152" strokeWidth="2.5" opacity={Math.max(0, 1 - wave1 / 110)} />
          <circle cx="0" cy="-120" r={50 + wave2} fill="none" stroke="#3858E9" strokeWidth="2" opacity={Math.max(0, 1 - wave2 / 110)} />

          <rect
            x="-380"
            y="-200"
            width="760"
            height="390"
            rx="24"
            fill="rgba(8, 13, 38, 0.94)"
            stroke="#FFD152"
            strokeWidth="3.5"
          />

          {/* Telephone Crest */}
          <g transform="translate(0, -120)">
            <circle cx="0" cy="0" r="46" fill="#FF9F43" />
            <path
              d="M -18 -12 C -14 -22, -4 -22, 0 -15 L 4 -5 C 7 0, 5 6, -2 12 C -8 18, -14 20, -19 17 L -28 12 C -35 8, -35 -2, -25 -5 Z"
              fill="#FFFFFF"
              transform="translate(15, -3)"
            />
          </g>

          <text
            x="0"
            y="-35"
            textAnchor="middle"
            fill="#CBD5E1"
            fontSize="16"
            fontWeight="700"
            letterSpacing="0.12em"
            fontFamily="ui-monospace, monospace"
          >
            WBSEDCL 24x7 EMERGENCY DISPATCH
          </text>

          {/* Giant Hotline Numbers */}
          <text
            x="0"
            y="42"
            textAnchor="middle"
            className="bengali-heading"
            fill="#FFD152"
            fontSize="78"
            fontWeight="900"
            letterSpacing="0.06em"
          >
            ১৯১২১ / 19121
          </text>

          {/* Medical Ambulance Sub-Band */}
          <g transform="translate(0, 115)">
            <rect x="-280" y="-30" width="560" height="58" rx="12" fill="#131F52" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="0" y="6" textAnchor="middle" className="bengali-body" fill="#FFFFFF" fontSize="18" fontWeight="600">
              জরুরি চিকিৎসা ও অ্যাম্বুলেন্স: <tspan fill="#FF5E57" fontWeight="900">১০২</tspan> বা <tspan fill="#FF5E57" fontWeight="900">১০৮</tspan>
            </text>
          </g>
        </g>

        {/* Characters Flanking Left & Right */}
        <g transform="translate(480, 840)">
          <ExpressiveBishu
            x={0}
            y={0}
            scale={1.3}
            frame={frame}
            leftArmAngle={-35}
            rightArmAngle={-30}
            expression="alert"
            lookAtX={0.6}
            lookAtY={-0.3}
          />
        </g>

        <g transform="translate(1440, 840)">
          <ExpressiveMitu
            x={0}
            y={0}
            scale={1.3}
            frame={frame}
            leftArmAngle={-30}
            rightArmAngle={-35}
            expression="happy"
            lookAtX={-0.6}
            lookAtY={-0.3}
          />
        </g>

        {/* Official Civic Signoff Banner */}
        <g transform="translate(960, 1010)">
          <rect x="-420" y="-25" width="840" height="50" rx="14" fill="rgba(8, 13, 38, 0.88)" stroke="rgba(255, 255, 255, 0.15)" />
          <text x="0" y="7" textAnchor="middle" className="bengali-body" fill="#CBD5E1" fontSize="16" fontWeight="700">
            শুকতারা বিদ্যুৎ সুরক্ষা অভিযান • জনস্বার্থে WBSEDCL ও পশ্চিমবঙ্গ সরকার
          </text>
        </g>
      </svg>
    </CameraRig>
  );
};
