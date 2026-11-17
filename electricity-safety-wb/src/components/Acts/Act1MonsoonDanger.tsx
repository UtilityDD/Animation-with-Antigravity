import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ParallaxStage, getCameraShake } from '../ParallaxStage';
import { BishuRig, MituRig } from '../Characters';
import {
  BananaBambooGrove,
  BengalMudHut,
  ConcreteElectricPole,
  VillagePrimarySchool,
} from '../EnvironmentProps';

/**
 * ACT 1: The Village & The Monsoon Danger (0:00 – 0:30 | Frames 0–900)
 * - Scene 1 (Frames 0–450): Sunny village in Purba Bardhaman transitioning to dark Kalbaishakhi monsoon clouds.
 *   Rain begins falling; children leave Shuktara Primary School in blue uniforms with bouncy squash-and-stretch walk.
 * - Scene 2 (Frames 450–900): Lightning strikes near a bamboo grove with high-impact camera shake.
 *   Overhead live wire snaps from a concrete WBSEDCL pole and falls into a rain puddle near the dirt road, crackling with #00F2FE sparks.
 */
export const Act1MonsoonDanger: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Weather transition: Sunny (0-130) -> Kalbaishakhi Storm (130-900)
  const stormProgress = interpolate(frame, [90, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rainIntensity = interpolate(frame, [180, 320], [0, 0.92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera Pan: Slowly pans right from Primary School (Scene 1) to WBSEDCL Pole & Puddle (Scene 2)
  const camX = interpolate(frame, [0, 420, 560, 900], [-140, 20, 210, 260], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camY = interpolate(frame, [0, 450, 900], [0, 12, 24]);
  const camScale = interpolate(frame, [0, 450, 620, 900], [1.0, 1.04, 1.12, 1.08]);

  // High-Impact Camera Shake on Lightning Strike at Frame 465 & Frame 515
  const shake1 = getCameraShake(frame, 465, 18, 22);
  const shake2 = getCameraShake(frame, 515, 12, 14);
  const totalShakeX = shake1.shakeX + shake2.shakeX;
  const totalShakeY = shake1.shakeY + shake2.shakeY;

  // Lightning strike flash around frame 465 and 515
  const lightning1 = interpolate(frame, [460, 466, 478], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lightning2 = interpolate(frame, [510, 515, 530], [0, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lightningFlash = Math.max(lightning1, lightning2);

  // Wire snap physics after lightning bolt at frame 475
  const wireSnapped = frame >= 475;
  const snapProgress = spring({
    frame: Math.max(0, frame - 475),
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Wind sway increases with storm
  const windSway = Math.sin(frame * 0.08) * (2 + stormProgress * 9);

  // Children walking out of school gate with Squash & Stretch Bouncy Walk
  const isWalking = frame < 475;
  const walkX = interpolate(frame, [60, 450, 900], [520, 880, 1020], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const walkPhase = frame * 0.28;
  const walkCycle = Math.sin(walkPhase) * 26;
  const contactBounce = Math.abs(Math.sin(walkPhase));
  const pelvisY = isWalking ? contactBounce * 11 : 0;
  const squashY = isWalking ? 1.0 - contactBounce * 0.08 : wireSnapped ? 0.90 : 1.0;
  const squashX = isWalking ? 1.0 + contactBounce * 0.06 : wireSnapped ? 1.10 : 1.0;

  // Dynamic sky color interpolation
  const skyTop = stormProgress < 0.5 ? '#0284C7' : '#0F172A';
  const skyMid = stormProgress < 0.5 ? '#38BDF8' : '#1E293B';
  const skyBot = stormProgress < 0.5 ? '#BAE6FD' : '#334155';

  return (
    <ParallaxStage
      camX={camX}
      camY={camY}
      camScale={camScale}
      camTiltY={interpolate(frame, [0, 900], [-2, 3])}
      shakeX={totalShakeX}
      shakeY={totalShakeY}
      rainIntensity={rainIntensity}
      lightningFlash={lightningFlash}
      skyGradient={`linear-gradient(180deg, ${skyTop} 0%, ${skyMid} 52%, ${skyBot} 100%)`}
      layer0={
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          {/* Sun fading behind dark Kalbaishakhi clouds */}
          <circle
            cx={480}
            cy={240 + stormProgress * 60}
            r={72}
            fill="#FFD600"
            opacity={1 - stormProgress * 0.88}
          />

          {/* Rolling Monsoon Clouds (কালবৈশাখীর মেঘ) */}
          <g
            transform={`translate(${interpolate(frame, [0, 900], [180, -140])}, 0)`}
            opacity={0.25 + stormProgress * 0.75}
          >
            {[220, 620, 1050, 1480, 1850].map((cx, idx) => (
              <g key={idx} transform={`translate(${cx}, ${160 + (idx % 2) * 45})`}>
                <ellipse cx="0" cy="0" rx="210" ry="68" fill="#1E293B" />
                <ellipse cx="-80" cy="-25" rx="130" ry="55" fill="#334155" />
                <ellipse cx="90" cy="-20" rx="140" ry="60" fill="#0F172A" />
              </g>
            ))}
          </g>

          {/* White Cranes (সাদা বক) flying across monsoon sky */}
          {Array.from({ length: 6 }).map((_, i) => {
            const birdX = 1900 - ((frame * 3.2 + i * 75) % 2000);
            const birdY = 230 + Math.sin(frame * 0.15 + i) * 18 + i * 16;
            const wingY = Math.sin(frame * 0.35 + i) * 12;
            return (
              <path
                key={i}
                d={`M ${birdX - 16} ${birdY + wingY} Q ${birdX - 6} ${birdY - 8} ${birdX} ${birdY} Q ${birdX + 6} ${birdY - 8} ${birdX + 16} ${birdY + wingY}`}
                fill="none"
                stroke="#FFF8E7"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}

          {/* Distant Horizon Lush Monsoon Green Hills & Banana Groves (#2D5A27) */}
          <path
            d="M 0 740 Q 540 650 1080 720 T 2160 700 L 2160 1320 L 0 1320 Z"
            fill="#1E3F1B"
          />
          <BananaBambooGrove x={340} y={620} scale={0.75} windSway={windSway * 0.7} />
          <BananaBambooGrove x={1220} y={610} scale={0.8} windSway={windSway * 0.9} />
          <BananaBambooGrove x={1790} y={625} scale={0.85} windSway={windSway} />
        </svg>
      }
      layer1={
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          {/* Midground Meadow & Village Pond (শাপলা পুকুর) */}
          <rect x="0" y="710" width="2160" height="610" fill="#2D5A27" />
          <ellipse cx="1060" cy="830" rx="280" ry="58" fill="#0369A1" stroke="#451A03" strokeWidth="4" />
          {/* Water Lilies in Pond */}
          {[-140, -40, 75, 160].map((lx, i) => (
            <g key={i} transform={`translate(${1060 + lx}, ${825 + (i % 2) * 14})`}>
              <ellipse cx="0" cy="6" rx="18" ry="6" fill="#15803D" />
              <path d="M -8 4 L 0 -9 L 8 4 Z" fill="#F472B6" />
              <path d="M -12 4 L -4 -6 L 4 4 Z" fill="#FBCFE8" />
            </g>
          ))}

          {/* Mud Huts (মাটির বাড়ি) */}
          <BengalMudHut x={290} y={635} scale={0.88} variant="thatch" />
          <BengalMudHut x={1880} y={645} scale={0.92} variant="tile" />
          <BananaBambooGrove x={1560} y={640} scale={1.05} windSway={windSway * 1.2} />
        </svg>
      }
      layer2={
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          {/* Terracotta Red Laterite Village Dirt Road (রাঙামাটির রাস্তা) */}
          <path
            d="M 0 910 Q 680 870 1350 915 T 2160 900 L 2160 1220 L 0 1220 Z"
            fill="#C47A53"
            stroke="#7C2D12"
            strokeWidth="4"
          />

          {/* Shuktara Primary School on Left */}
          <VillagePrimarySchool
            x={640}
            y={740}
            scale={0.95}
            bellSwing={frame < 160 ? Math.sin(frame * 0.45) * 24 : 0}
          />

          {/* Rainwater Puddle Forming on Dirt Road near Electric Pole */}
          <g transform="translate(1545, 965)">
            <ellipse
              cx="0"
              cy="0"
              rx={interpolate(frame, [200, 500], [45, 185], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              ry={interpolate(frame, [200, 500], [12, 42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              fill={wireSnapped ? '#0284C7' : '#38BDF8'}
              stroke={wireSnapped ? '#00F2FE' : '#0369A1'}
              strokeWidth={wireSnapped ? 3.5 : 2}
              opacity={0.85}
            />
            {/* Electrified Ripples in Puddle once wire snaps */}
            {wireSnapped &&
              [1, 2, 3].map((ring) => {
                const rScale = ((frame * 2 + ring * 30) % 90) / 90;
                return (
                  <ellipse
                    key={ring}
                    cx="15"
                    cy="-4"
                    rx={30 + rScale * 150}
                    ry={8 + rScale * 34}
                    fill="none"
                    stroke={ring % 2 === 0 ? '#00F2FE' : '#FFD600'}
                    strokeWidth={3 - rScale * 2}
                    opacity={1 - rScale}
                  />
                );
              })}
          </g>

          {/* WBSEDCL Concrete Electric Pole */}
          <ConcreteElectricPole
            x={1400}
            y={795}
            scale={1.0}
            wireSnapped={wireSnapped}
            snapProgress={snapProgress}
            sparkFrame={frame}
          />

          {/* Jagged Lightning Bolt Strike (Frames 460–485) */}
          {frame >= 460 && frame <= 490 && (
            <g>
              <polyline
                points="1520,60 1460,210 1530,235 1435,410 1495,430 1455,565"
                fill="none"
                stroke="#00F2FE"
                strokeWidth="14"
                opacity="0.6"
              />
              <polyline
                points="1520,60 1460,210 1530,235 1435,410 1495,430 1455,565"
                fill="none"
                stroke="#FFD600"
                strokeWidth="6"
              />
            </g>
          )}

          {/* Protagonists Mitu & Bishu leaving school with Broadcast-Quality Rigging */}
          <BishuRig
            x={walkX + 95}
            y={820 + pelvisY}
            scale={0.82}
            frame={frame}
            squashX={squashX}
            squashY={squashY}
            headTurn={wireSnapped ? 0.5 : 0.3}
            leftLegAngle={isWalking ? walkCycle : 0}
            rightLegAngle={isWalking ? -walkCycle : 0}
            leftArmAngle={isWalking ? -walkCycle * 0.8 : -35}
            rightArmAngle={isWalking ? walkCycle * 0.8 : 40}
            pupilOffsetX={wireSnapped ? 0.6 : 0.2}
            pupilOffsetY={wireSnapped ? 0.5 : 0}
            expression={wireSnapped ? 'shocked' : 'happy'}
          />
          <MituRig
            x={walkX}
            y={845 + pelvisY}
            scale={0.82}
            frame={frame}
            squashX={squashX}
            squashY={squashY}
            headTurn={wireSnapped ? 0.5 : 0.25}
            leftLegAngle={isWalking ? -walkCycle : 0}
            rightLegAngle={isWalking ? walkCycle : 0}
            leftArmAngle={isWalking ? walkCycle * 0.7 : 20}
            rightArmAngle={isWalking ? -walkCycle * 0.7 : -45}
            pupilOffsetX={wireSnapped ? 0.6 : 0.2}
            pupilOffsetY={wireSnapped ? 0.5 : 0}
            expression={wireSnapped ? 'alert' : 'speaking'}
          />

          {/* Scene 2 Danger Callout Badge near Snapped Wire */}
          {frame >= 510 && (
            <g
              transform={`translate(1620, 740) scale(${spring({
                frame: frame - 510,
                fps,
                config: { damping: 12 },
              })})`}
            >
              <rect
                x="-145"
                y="-42"
                width="290"
                height="74"
                rx="14"
                fill="#0F172A"
                stroke="#00F2FE"
                strokeWidth="3.5"
              />
              <text x="0" y="-10" textAnchor="middle" fill="#FFD600" fontSize="20" fontWeight="bold">
                ⚡ বিপদ! ছেঁড়া বিদ্যুতের তার
              </text>
              <text x="0" y="18" textAnchor="middle" fill="#00F2FE" fontSize="14" fontWeight="bold">
                LIVE WIRE IN PUDDLE • DO NOT APPROACH
              </text>
            </g>
          )}
        </svg>
      }
      layer3={
        <svg width="2160" height="1320" viewBox="0 0 2160 1320">
          {/* Foreground Bamboo Fence Posts & Lush Grass Blades for 1.4x Parallax Occlusion */}
          {[180, 560, 1320, 1780, 2040].map((gx, i) => (
            <g key={i} transform={`translate(${gx}, 1160) rotate(${windSway * 1.1})`}>
              <path d="M -25 80 Q -15 -40 -35 -90 Q -5 -30 0 80 Z" fill="#14532D" />
              <path d="M 0 80 Q 15 -55 30 -105 Q 20 -30 15 80 Z" fill="#166534" />
              <path d="M 10 80 Q 35 -30 55 -70 Q 30 -10 25 80 Z" fill="#15803D" />
            </g>
          ))}
        </svg>
      }
    />
  );
};
