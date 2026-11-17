import React from 'react';
import { interpolate, spring, useCurrentFrame } from 'remotion';
import { KurzgesagtSafetyParallax } from '../KurzgesagtSafetyParallax';
import { GeometricBidyutBondhu, GeometricMitu } from '../KurzgesagtCharacterRigs';

export const KSScene6ShockRescue: React.FC = () => {
  const frame = useCurrentFrame();

  const camScale = interpolate(frame, [0, 420], [1.0, 1.06]);

  // Main Switch Lever animation: trips down from ON to OFF around frame 90
  const switchLeverAngle = interpolate(frame, [80, 120], [-45, 45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isSwitchOff = frame >= 110;
  const switchSparkOpacity = interpolate(frame, [95, 110, 130], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bamboo rescue push animation
  const bambooReach = spring({
    frame: frame - 160,
    fps: 60,
    config: { damping: 14, stiffness: 90 },
  });

  const bambooX = interpolate(bambooReach, [0, 1], [-40, 20]);
  const bambooAngle = interpolate(bambooReach, [0, 1], [-12, -2]);

  return (
    <KurzgesagtSafetyParallax
      camX={0}
      camY={0}
      camScale={camScale}
      bgGradient="radial-gradient(ellipse at 50% 50%, #180A59 0%, #09134B 65%, #030712 100%)"
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Top Section Title Banner */}
          <g transform="translate(1100, 150)">
            <rect x="-380" y="-35" width="760" height="70" rx="18" fill="#09134B" stroke="#22D7DA" strokeWidth="3" />
            <text x="0" y="9" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900" letterSpacing="0.04em">
              জরুরি উদ্ধার বিধি // PROTOCOL FOR SHOCK RESCUE
            </text>
          </g>

          {/* Left Panel: Primary Rule - Turn OFF Main Switch */}
          <g transform="translate(600, 680)">
            <rect x="-260" y="-300" width="520" height="600" rx="24" fill="#09134B" stroke={isSwitchOff ? '#22C55E' : '#EF4444'} strokeWidth="4" />
            
            {/* Step 1 Pill */}
            <rect x="-220" y="-270" width="140" height="42" rx="10" fill="#243CDB" />
            <text x="-150" y="-243" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="bold">
              ধাপ ১ (STEP 1)
            </text>
            <text x="0" y="-210" textAnchor="middle" fill="#FFD244" fontSize="22" fontWeight="800">
              মেইন সুইচ অবিলম্বে অফ করুন
            </text>

            {/* Industrial Switchbox Housing */}
            <rect x="-120" y="-130" width="240" height="280" rx="16" fill="#1E293B" stroke="#64748B" strokeWidth="4" />
            <rect x="-100" y="-110" width="200" height="240" rx="10" fill="#0F172A" />
            
            {/* Status Indicator LED */}
            <circle cx="65" cy="-80" r="12" fill={isSwitchOff ? '#22C55E' : '#EF4444'} />
            <circle cx="65" cy="-80" r={isSwitchOff ? 6 : 18} fill="none" stroke={isSwitchOff ? '#22C55E' : '#EF4444'} strokeWidth="2.5" opacity={0.6} />
            <text x="65" y="-55" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">
              {isSwitchOff ? 'OFF (নিরাপদ)' : 'LIVE (বিপদ)'}
            </text>

            {/* Switch Lever Pivot & Handle */}
            <g transform="translate(-25, 10)">
              <circle cx="0" cy="0" r="22" fill="#334155" stroke="#94A3B8" strokeWidth="3" />
              <g transform={`rotate(${switchLeverAngle})`}>
                <rect x="-10" y="-90" width="20" height="90" rx="8" fill={isSwitchOff ? '#22C55E' : '#EF4444'} stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="0" cy="-90" r="16" fill="#FFFFFF" />
              </g>
            </g>

            {/* Spark Dissipation Effect when tripped */}
            {switchSparkOpacity > 0 && (
              <g transform="translate(-25, -60)" opacity={switchSparkOpacity}>
                <line x1="-30" y1="-20" x2="30" y2="20" stroke="#22D7DA" strokeWidth="4" />
                <line x1="30" y1="-20" x2="-30" y2="20" stroke="#FFD244" strokeWidth="4" />
                <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
              </g>
            )}

            {/* Bottom Caution Pill */}
            <rect x="-220" y="195" width="440" height="70" rx="14" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" strokeWidth="2" />
            <text x="0" y="228" textAnchor="middle" fill="#EF4444" fontSize="18" fontWeight="bold">
              ❌ ভুলেও খালি হাতে স্পর্শ করবেন না!
            </text>
            <text x="0" y="250" textAnchor="middle" fill="#94A3B8" fontSize="13">
              (Direct bare-hand contact passes deadly secondary shock)
            </text>
          </g>

          {/* Right Panel: Step 2 - Insulated Bamboo/Wood Separation */}
          <g transform="translate(1600, 680)">
            <rect x="-260" y="-300" width="520" height="600" rx="24" fill="#09134B" stroke="#22D7DA" strokeWidth="4" />
            
            {/* Step 2 Pill */}
            <rect x="-220" y="-270" width="140" height="42" rx="10" fill="#243CDB" />
            <text x="-150" y="-243" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="bold">
              ধাপ ২ (STEP 2)
            </text>
            <text x="0" y="-210" textAnchor="middle" fill="#22D7DA" fontSize="22" fontWeight="800">
              শুকনো কাঠ বা বাঁশের লাঠি ব্যবহার করুন
            </text>

            {/* Fallen Wire & Contact Target on Ground */}
            <g transform="translate(100, 100)">
              {/* Fallen live wire */}
              <path d="M 90 -90 Q 30 10 -40 25" fill="none" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />
              {/* Safe insulated separation gap */}
              <circle cx="-40" cy="25" r="8" fill="#FF851D" />
            </g>

            {/* Mitu Rescuer with Long Dry Bamboo Pole */}
            <g transform={`translate(${-120 + bambooX}, 40)`}>
              <GeometricMitu
                x={0}
                y={0}
                scale={1.2}
                frame={frame}
                rightArmAngle={-45}
                expression="alert"
                lookAtX={0.9}
                lookAtY={0.3}
              />

              {/* Long Dry Bamboo Stick held firmly in hands */}
              <g transform={`translate(28, -25) rotate(${bambooAngle})`}>
                {/* Bamboo Segments with joint rings */}
                <rect x="0" y="-8" width="270" height="16" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                <line x1="70" y1="-8" x2="70" y2="8" stroke="#78350F" strokeWidth="3" />
                <line x1="140" y1="-8" x2="140" y2="8" stroke="#78350F" strokeWidth="3" />
                <line x1="210" y1="-8" x2="210" y2="8" stroke="#78350F" strokeWidth="3" />
                
                {/* Bamboo Label Tag */}
                <rect x="80" y="-34" width="110" height="22" rx="4" fill="#09134B" stroke="#FFD244" strokeWidth="1.5" />
                <text x="135" y="-19" textAnchor="middle" fill="#FFD244" fontSize="11" fontWeight="bold">
                  শুকনো বাঁশের লাঠি
                </text>
              </g>
            </g>

            {/* Non-Conductive Physics Badge */}
            <g transform="translate(0, 230)">
              <rect x="-220" y="-32" width="440" height="64" rx="14" fill="rgba(34, 215, 218, 0.16)" stroke="#22D7DA" strokeWidth="2" />
              <text x="0" y="-5" textAnchor="middle" fill="#22D7DA" fontSize="16" fontWeight="bold">
                ✔️ বিদ্যুৎ অপরিবাহী শুকনো বস্তু (Non-Conductive)
              </text>
              <text x="0" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="13">
                তুলে ধরুন বা দূরে সরিয়ে দিন নিরাপদে
              </text>
            </g>
          </g>

          {/* Central Overseeing Bidyut Bondhu Mascot */}
          <GeometricBidyutBondhu
            x={1100}
            y={760}
            scale={1.35}
            frame={frame}
            holdingStopSign={false}
          />
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#22D7DA', letterSpacing: '0.12em' }}>
            EMERGENCY PROTOCOL // MAIN SWITCH ISOLATION & NON-CONDUCTIVE RESCUE
          </span>
        </div>
      }
    />
  );
};
