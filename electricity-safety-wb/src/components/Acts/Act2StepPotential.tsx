import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ParallaxStage } from '../ParallaxStage';
import { BishuRig, MituRig } from '../Characters';
import { BananaBambooGrove, ConcreteElectricPole } from '../EnvironmentProps';

/**
 * ACT 2: Snapped Wire & Step Potential Protocol (0:30 – 1:05 | Frames 900–1950, local 0–1050)
 * - Scene 3 (Frames 0–450): Bishu runs toward puddle for football. Mitu spots the submerged live wire and pulls Bishu back!
 * - Scene 4 (Frames 450–1050): Step Potential (ধাপ বিভব) diagram pops out with TV-style Anticipation crouch
 *   and expressive Squash & Stretch Bunny Hops with both feet joined together!
 */
export const Act2StepPotential: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zooms into the puddle and characters, then frames the Step Potential Diagram
  const camX = interpolate(frame, [0, 350, 520, 1050], [40, 110, 60, -30], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(frame, [0, 300, 500, 1050], [1.05, 1.14, 1.04, 1.0]);

  // Scene 3: Bishu runs right toward football (frames 0–210), Mitu grabs him at frame 210–450
  // Anticipation crouch before bunny-hop at frames 535–560
  const isAnticipating = frame >= 530 && frame < 560;
  const isBunnyHopping = frame >= 560;

  const hopPhase = isBunnyHopping ? ((frame - 560) % 42) / 42 : 0;
  const hopArcY = isBunnyHopping ? -Math.sin(hopPhase * Math.PI) * 64 : isAnticipating ? 12 : 0;
  const hopRetreatX = isBunnyHopping
    ? interpolate(frame, [560, 1000], [0, -360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  // Professional Squash & Stretch physics during Bunny Hops
  let hopSquashY = 1.0;
  let hopSquashX = 1.0;
  if (isAnticipating) {
    hopSquashY = 0.86;
    hopSquashX = 1.14;
  } else if (isBunnyHopping) {
    if (hopPhase < 0.15 || hopPhase > 0.85) {
      // Landing / Launch impact squash
      hopSquashY = 0.82;
      hopSquashX = 1.16;
    } else {
      // Mid-air flight stretch
      hopSquashY = 1.14;
      hopSquashX = 0.88;
    }
  }

  const bishuX =
    frame < 210
      ? interpolate(frame, [0, 210], [820, 1060])
      : frame < 560
      ? interpolate(frame, [210, 320], [1060, 940], { extrapolateRight: 'clamp' })
      : 940 + hopRetreatX;

  const mituX =
    frame < 210
      ? interpolate(frame, [0, 210], [690, 890])
      : frame < 560
      ? interpolate(frame, [210, 320], [890, 800], { extrapolateRight: 'clamp' })
      : 800 + hopRetreatX;

  // Diagram pop-out spring for Scene 4 (starts at local frame 450)
  const diagramScale = spring({
    frame: Math.max(0, frame - 450),
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  return (
    <ParallaxStage
      camX={camX}
      camY={15}
      camScale={camScale}
      rainIntensity={0.45}
      skyGradient="linear-gradient(180deg, #0F172A 0%, #1E293B 55%, #334155 100%)"
      layer0={
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          <path d="M 0 740 Q 600 660 1200 720 T 2160 700 L 2160 1320 L 0 1320 Z" fill="#1E3F1B" />
          <BananaBambooGrove x={420} y={620} scale={0.85} windSway={Math.sin(frame * 0.08) * 5} />
          <BananaBambooGrove x={1650} y={610} scale={0.9} windSway={Math.sin(frame * 0.08) * 6} />
        </svg>
      }
      layer1={
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          <rect x="0" y="720" width="2160" height="600" fill="#2D5A27" />
        </svg>
      }
      layer2={
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          {/* Wet Mud Road */}
          <path d="M 0 880 Q 1080 850 2160 890 L 2160 1260 L 0 1260 Z" fill="#A85E3B" stroke="#7C2D12" strokeWidth="4" />

          {/* Concentric Step Potential Voltage Ripples on Ground (ধাপ বিভব বলয়) */}
          <g transform="translate(1480, 965)">
            {[
              { rx: 380, ry: 95, label: '10m (30ft) নিরাপদ দূরত্ব', color: '#22C55E' },
              { rx: 290, ry: 72, label: '1,200V', color: '#FACC15' },
              { rx: 200, ry: 50, label: '4,500V', color: '#F97316' },
              { rx: 115, ry: 30, label: '11,000V বিপজ্জনক কেন্দ্র', color: '#EF4444' },
            ].map((zone, idx) => {
              const pulse = Math.sin(frame * 0.15 - idx) * 6;
              return (
                <g key={idx}>
                  <ellipse
                    cx="0"
                    cy="0"
                    rx={zone.rx + pulse}
                    ry={zone.ry + pulse * 0.25}
                    fill="none"
                    stroke={zone.color}
                    strokeWidth={idx === 3 ? 4 : 2.8}
                    strokeDasharray={idx === 0 ? '10 6' : 'none'}
                    opacity={0.85}
                  />
                  <text
                    x={-zone.rx + 18}
                    y={-6}
                    fill={zone.color}
                    fontSize="15"
                    fontWeight="bold"
                  >
                    {zone.label}
                  </text>
                </g>
              );
            })}

            {/* Electrified Puddle Core */}
            <ellipse cx="0" cy="0" rx="145" ry="36" fill="#0284C7" stroke="#00F2FE" strokeWidth="4" />

            {/* Lost Football Floating Near Puddle Edge */}
            <g transform={`translate(-95, 8) rotate(${frame * 1.5})`}>
              <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <polygon points="0,-10 9,-3 6,8 -6,8 -9,-3" fill="#0F172A" />
            </g>
          </g>

          {/* WBSEDCL Pole & Sparking Live Wire */}
          <ConcreteElectricPole
            x={1335}
            y={795}
            scale={1.0}
            wireSnapped={true}
            snapProgress={1}
            sparkFrame={frame}
          />

          {/* BISHU: Runs with foot bounce, anticipatory crouch, and expressive Bunny Hop */}
          <BishuRig
            x={bishuX}
            y={820 + hopArcY}
            scale={0.85}
            frame={frame}
            squashX={hopSquashX}
            squashY={hopSquashY}
            flipX={isBunnyHopping || isAnticipating}
            torsoLean={isAnticipating ? 20 : isBunnyHopping ? 12 : frame < 210 ? 15 : -12}
            leftLegAngle={isBunnyHopping || isAnticipating ? 0 : frame < 210 ? Math.sin(frame * 0.35) * 28 : 5}
            rightLegAngle={isBunnyHopping || isAnticipating ? 0 : frame < 210 ? -Math.sin(frame * 0.35) * 28 : -5}
            leftArmAngle={isBunnyHopping ? 35 : isAnticipating ? -40 : -25}
            rightArmAngle={isBunnyHopping ? 35 : isAnticipating ? -40 : -55}
            pupilOffsetX={isBunnyHopping ? -0.5 : 0.6}
            pupilOffsetY={0.4}
            expression={frame < 450 ? 'shocked' : 'alert'}
          />

          {/* MITU: Alerts Bishu and leads the joined-feet Bunny Hop */}
          <MituRig
            x={mituX}
            y={845 + hopArcY}
            scale={0.85}
            frame={frame}
            squashX={hopSquashX}
            squashY={hopSquashY}
            flipX={isBunnyHopping || isAnticipating}
            torsoLean={isAnticipating ? 16 : isBunnyHopping ? 10 : -8}
            leftLegAngle={isBunnyHopping || isAnticipating ? 0 : 0}
            rightLegAngle={isBunnyHopping || isAnticipating ? 0 : 0}
            rightArmAngle={frame >= 190 && frame < 450 ? -75 : isAnticipating ? -40 : 30}
            pupilOffsetX={isBunnyHopping ? -0.5 : 0.6}
            pupilOffsetY={0.3}
            expression={frame < 450 ? 'alert' : 'speaking'}
          />

          {/* Joined-Feet Highlight Ring during Bunny Hop */}
          {isBunnyHopping && (
            <g transform={`translate(${bishuX}, ${955 + hopArcY})`}>
              <ellipse cx="0" cy="0" rx="34" ry="14" fill="none" stroke="#FFD600" strokeWidth="3.5" />
              <text x="0" y="30" textAnchor="middle" fill="#FFD600" fontSize="16" fontWeight="bold">
                দুই পা জোড়া রেখে লাফ (Bunny Hop) ✔️
              </text>
            </g>
          )}
        </svg>
      }
      hudOverlay={
        frame >= 450 ? (
          <div
            style={{
              position: 'absolute',
              top: 52,
              left: 64,
              width: 820,
              transform: `scale(${diagramScale})`,
              transformOrigin: 'top left',
              background: 'rgba(15, 23, 42, 0.94)',
              border: '3px solid #FFD600',
              borderRadius: 20,
              padding: '24px 28px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
              color: '#FFF8E7',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#FFD600' }}>
                ⚡ ধাপ বিভব (STEP POTENTIAL) কী এবং কীভাবে বাঁচবে?
              </span>
              <span
                style={{
                  background: '#00F2FE',
                  color: '#0F172A',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                অন্তত ১০ মিটার (৩০ ফুট) দূরে যাও
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {/* Left Card: Wrong - Normal Walking */}
              <div
                style={{
                  background: 'rgba(220, 38, 38, 0.16)',
                  border: '2px solid #EF4444',
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, color: '#FCA5A5', marginBottom: 8 }}>
                  ❌ সাধারণভাবে হাঁটা (বিপজ্জনক)
                </div>
                <svg width="340" height="150" viewBox="0 0 340 150">
                  {/* Voltage Gradient Ground */}
                  <ellipse cx="170" cy="128" rx="150" ry="16" fill="rgba(239,68,68,0.3)" stroke="#EF4444" strokeWidth="2" />
                  {/* Wide Stride Legs creating Voltage Loop */}
                  <path d="M 130 125 L 170 55 L 215 125" fill="none" stroke="#FFF8E7" strokeWidth="8" strokeLinecap="round" />
                  {/* Electric Current Loop */}
                  <path
                    d="M 130 125 L 170 55 L 215 125"
                    fill="none"
                    stroke="#00F2FE"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                  />
                  <text x="95" y="144" fill="#FFD600" fontSize="13" fontWeight="bold">
                    V₁ = 8,000V
                  </text>
                  <text x="205" y="144" fill="#FFD600" fontSize="13" fontWeight="bold">
                    V₂ = 4,500V
                  </text>
                  <text x="170" y="32" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">
                    ΔV = 3,500V শরীর দিয়ে প্রবাহিত!
                  </text>
                </svg>
                <div style={{ fontSize: 15, color: '#FECACA', lineHeight: 1.4 }}>
                  দুই পা ফাঁক করে হাঁটলে দুই পায়ের ভোল্টেজের পার্থক্যে শরীরের ভেতর দিয়ে মারাত্মক কারেন্ট প্রবাহিত হয়।
                </div>
              </div>

              {/* Right Card: Correct - Bunny Hop / Shuffle */}
              <div
                style={{
                  background: 'rgba(34, 197, 94, 0.16)',
                  border: '2px solid #22C55E',
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  ✔️ খরগোশের মতো লাফ বা পা ঘষে চলা
                </div>
                <svg width="340" height="150" viewBox="0 0 340 150">
                  <ellipse cx="170" cy="128" rx="150" ry="16" fill="rgba(34,197,94,0.25)" stroke="#22C55E" strokeWidth="2" />
                  {/* Joined Legs */}
                  <path d="M 165 122 L 165 55 M 175 122 L 175 55" stroke="#FFF8E7" strokeWidth="8" strokeLinecap="round" />
                  <ellipse cx="170" cy="124" rx="22" ry="8" fill="none" stroke="#FFD600" strokeWidth="3" />
                  {/* Hop Arcs */}
                  <path
                    d="M 110 120 Q 140 70 170 120 Q 200 70 230 120"
                    fill="none"
                    stroke="#FFD600"
                    strokeWidth="3"
                    strokeDasharray="5 5"
                  />
                  <text x="170" y="32" textAnchor="middle" fill="#86EFAC" fontSize="14" fontWeight="bold">
                    V₁ = V₂ → ΔV = 0V (সম্পূর্ণ নিরাপদ!)
                  </text>
                </svg>
                <div style={{ fontSize: 15, color: '#DCFCE7', lineHeight: 1.4 }}>
                  দুই পা একসাথে জোড়া রেখে খরগোশের মতো লাফিয়ে বা পা মাটি থেকে না তুলে ঘষে ঘষে পিছিয়ে যাও।
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    />
  );
};
