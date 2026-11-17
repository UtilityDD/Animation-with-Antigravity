import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { EditorialDefs } from '../EditorialDefs';
import { EditorialBishu, EditorialMitu } from '../EditorialCharacters';
import { editorialSnappy } from '../../motionCurves';

/**
 * Scene 7: Emergency Response & WBSEDCL Hotline 19121
 * Duration: 300 frames (0:55 - 1:00)
 * Narrative: Warm celebratory resolution. Safe students and prominent emergency telecommunication hub:
 * WBSEDCL 24x7 Helpline 19121 & Medical Ambulance 102/108.
 */
export const EditorialScene7Emergency19121: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 300], [1.0, 1.05]);

  // Central Card entrance
  const cardProgress = Math.min(1, frame / 35);
  const easedCard = editorialSnappy(cardProgress);

  // Radar ring waves from telephone
  const wave1 = (frame * 2.5) % 100;
  const wave2 = (frame * 2.5 + 50) % 100;

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

      {/* Atmospheric Dawn Background (Warm Relief after Monsoon) */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-warm-sunset)" />

      {/* Rolling Hills in Horizon */}
      <path
        d="M 0 660 Q 480 620 960 645 T 1920 630 L 1920 1080 L 0 1080 Z"
        fill="#0E163B"
      />
      <path
        d="M 0 720 Q 560 690 1200 705 T 2120 700 L 2120 1080 L 0 1080 Z"
        fill="#080D26"
      />

      {/* Ambient Rising Light Particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const py = 1000 - ((frame * 2.2 + i * 65) % 1000);
        const px = 240 + ((i * 105) % 1440);
        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={3 + (i % 3)}
            fill={i % 2 === 0 ? "#FFD152" : "#FFFFFF"}
            opacity={0.4}
          />
        );
      })}

      {/* Centerpiece: WBSEDCL 19121 Hotline Command Card */}
      <g
        transform={`translate(960, 430) scale(${easedCard})`}
        filter="url(#ambient-ground-shadow)"
      >
        {/* Pulsing Radar Ring Waves */}
        <circle cx="0" cy="-120" r={50 + wave1} fill="none" stroke="#FFD152" strokeWidth="2.5" opacity={Math.max(0, 1 - wave1 / 100)} />
        <circle cx="0" cy="-120" r={50 + wave2} fill="none" stroke="#3858E9" strokeWidth="2" opacity={Math.max(0, 1 - wave2 / 100)} />

        {/* Primary Glass Card */}
        <rect
          x="-380"
          y="-200"
          width="760"
          height="390"
          rx="24"
          fill="rgba(8, 13, 38, 0.94)"
          stroke="#FFD152"
          strokeWidth="3"
        />

        {/* Telephone Receiver Icon Crest */}
        <g transform="translate(0, -120)">
          <circle cx="0" cy="0" r="46" fill="#FF9F43" />
          <path
            d="M -18 -12 C -14 -22, -4 -22, 0 -15 L 4 -5 C 7 0, 5 6, -2 12 C -8 18, -14 20, -19 17 L -28 12 C -35 8, -35 -2, -25 -5 Z"
            fill="#FFFFFF"
            transform="translate(15, -3)"
          />
        </g>

        {/* Card Header */}
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

        {/* Massive 19121 Hotline Number */}
        <text
          x="0"
          y="42"
          textAnchor="middle"
          fill="#FFD152"
          fontSize="76"
          fontWeight="900"
          letterSpacing="0.06em"
          fontFamily="ui-monospace, monospace"
        >
          ১৯১২১ / 19121
        </text>

        {/* Dual Medical Ambulance Sub-Band */}
        <g transform="translate(0, 115)">
          <rect x="-280" y="-30" width="560" height="58" rx="12" fill="#131F52" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="600">
            জরুরি চিকিৎসা ও অ্যাম্বুলেন্স: <tspan fill="#FF5E57" fontWeight="900">১০২</tspan> বা <tspan fill="#FF5E57" fontWeight="900">১০৮</tspan>
          </text>
        </g>
      </g>

      {/* Characters Flanking Bottom: Safe and Informed */}
      {/* Left: Bishu Safe & Relieved */}
      <g transform="translate(480, 840)">
        <EditorialBishu
          x={0}
          y={0}
          scale={1.3}
          frame={frame}
          leftArmAngle={-35}
          rightArmAngle={-30}
          expression="focused"
          lookAtX={0.6}
          lookAtY={-0.3}
        />
      </g>

      {/* Right: Mitu Proud Presenter */}
      <g transform="translate(1440, 840)">
        <EditorialMitu
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

      {/* Bottom Official Sign-off Bar */}
      <g transform="translate(960, 1010)">
        <rect x="-420" y="-25" width="840" height="50" rx="14" fill="rgba(8, 13, 38, 0.88)" stroke="rgba(255, 255, 255, 0.15)" />
        <text x="0" y="7" textAnchor="middle" fill="#CBD5E1" fontSize="16" fontWeight="700">
          শুকতারা বিদ্যুৎ সুরক্ষা অভিযান • জনস্বার্থে WBSEDCL ও পশ্চিমবঙ্গ সরকার
        </text>
      </g>
    </svg>
  );
};

