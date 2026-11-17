import React from 'react';
import { interpolate, spring, useCurrentFrame } from 'remotion';
import { KurzgesagtSafetyParallax } from '../KurzgesagtSafetyParallax';
import { GeometricBidyutBondhu, GeometricBishu, GeometricMitu } from '../KurzgesagtCharacterRigs';

export const KSScene7Emergency19121: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 300], [1.0, 1.05]);

  // Entrance spring for central emergency dial card
  const cardSpring = spring({
    frame,
    fps: 60,
    config: { damping: 13, stiffness: 100 },
  });

  const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1.0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Pulsing emergency waves
  const wave1 = (frame * 3) % 120;
  const wave2 = (frame * 3 + 60) % 120;

  // Mascot celebratory float
  const cheerBounce = Math.sin(frame * 0.15) * 6;

  return (
    <KurzgesagtSafetyParallax
      camX={0}
      camY={0}
      camScale={camScale}
      bgGradient="radial-gradient(ellipse at 50% 40%, #FF851D 0%, #243CDB 50%, #09134B 85%, #030712 100%)"
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Ambient Celebratory Sparkles */}
          {Array.from({ length: 18 }).map((_, i) => {
            const sparkY = (1200 - ((frame * 2.5 + i * 80) % 1200));
            const sparkX = 300 + ((i * 123) % 1600);
            const sparkSize = 4 + (i % 5);
            return (
              <circle
                key={i}
                cx={sparkX}
                cy={sparkY}
                r={sparkSize}
                fill={i % 2 === 0 ? '#FFD244' : '#22D7DA'}
                opacity={0.7}
              />
            );
          })}

          {/* Central Hero Emergency Hotline Hub */}
          <g
            transform={`translate(1100, 480) scale(${cardScale})`}
            opacity={cardOpacity}
            style={{ filter: 'drop-shadow(0px 18px 30px rgba(0,0,0,0.5))' }}
          >
            {/* Pulsing Radar Rings from Telephone Emblem */}
            <circle cx="0" cy="-140" r={60 + wave1} fill="none" stroke="#FFD244" strokeWidth="3" opacity={Math.max(0, 1 - wave1 / 120)} />
            <circle cx="0" cy="-140" r={60 + wave2} fill="none" stroke="#22D7DA" strokeWidth="2.5" opacity={Math.max(0, 1 - wave2 / 120)} />

            {/* Main Container Card */}
            <rect x="-420" y="-220" width="840" height="420" rx="28" fill="#09134B" stroke="#FFD244" strokeWidth="4.5" />

            {/* Glowing Telephone Icon Badge */}
            <g transform="translate(0, -140)">
              <circle cx="0" cy="0" r="54" fill="#FF851D" stroke="#FFD244" strokeWidth="3.5" />
              {/* Telephone Receiver Silhouette */}
              <path
                d="M -22 -14 C -18 -26, -6 -26, -2 -18 L 4 -7 C 8 -1, 6 6, -2 14 C -10 22, -17 24, -23 20 L -34 14 C -42 10, -42 -2, -30 -6 Z"
                fill="#FFFFFF"
                transform="translate(18, -4)"
              />
            </g>

            {/* Sub-header */}
            <text x="0" y="-45" textAnchor="middle" fill="#22D7DA" fontSize="20" fontWeight="bold" letterSpacing="0.1em">
              WBSEDCL 24x7 জরুরি হেল্পলাইন (EMERGENCY HELPLINE)
            </text>

            {/* Giant Hotline Number */}
            <text x="0" y="45" textAnchor="middle" fill="#FFD244" fontSize="80" fontWeight="900" letterSpacing="0.06em">
              ১৯১২১ / 19121
            </text>

            {/* Dual Emergency Medical Sub-Card */}
            <g transform="translate(0, 125)">
              <rect x="-320" y="-35" width="640" height="70" rx="16" fill="#180A59" stroke="#243CDB" strokeWidth="2.5" />
              <text x="0" y="8" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="700">
                অ্যাম্বুলেন্স ও চিকিৎসা সহায়তা: <tspan fill="#EF4444" fontWeight="900">১০২</tspan> / <tspan fill="#EF4444" fontWeight="900">১০৮</tspan>
              </text>
            </g>
          </g>

          {/* Celebratory Characters Formation at the Bottom */}
          {/* Left: Bishu Happy & Safe */}
          <g transform="translate(560, 930)">
            <GeometricBishu
              x={0}
              y={cheerBounce}
              scale={1.35}
              frame={frame}
              leftArmAngle={-35}
              rightArmAngle={-50}
              expression="normal"
              lookAtX={0.4}
              lookAtY={-0.3}
            />
          </g>

          {/* Center Mascot: Bidyut Bondhu Floating Proudly */}
          <GeometricBidyutBondhu
            x={1100}
            y={820}
            scale={1.6}
            frame={frame}
            holdingStopSign={false}
          />

          {/* Right: Mitu Smiling & Waving */}
          <g transform="translate(1640, 930)">
            <GeometricMitu
              x={0}
              y={-cheerBounce}
              scale={1.35}
              frame={frame}
              leftArmAngle={-50}
              rightArmAngle={-35}
              expression="happy"
              lookAtX={-0.4}
              lookAtY={-0.3}
            />
          </g>

          {/* Bottom Official Sign-off Banner */}
          <g transform="translate(1100, 1180)">
            <rect x="-480" y="-38" width="960" height="76" rx="20" fill="#09134B" stroke="#22D7DA" strokeWidth="3" />
            <text x="0" y="8" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="800" letterSpacing="0.03em">
              শুকতারা বিদ্যুৎ সুরক্ষা অভিযান • জনস্বার্থে WBSEDCL ও পশ্চিমবঙ্গ সরকার
            </text>
          </g>
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#FFD244', letterSpacing: '0.12em' }}>
            PUBLIC SAFETY CAMPAIGN // 24x7 ASSISTANCE WBSEDCL 19121
          </span>
        </div>
      }
    />
  );
};
