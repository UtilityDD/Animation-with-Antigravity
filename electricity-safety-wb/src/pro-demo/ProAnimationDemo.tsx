import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { StudioDefs } from './StudioDefs';
import { ProCharacterMitu } from './ProCharacterMitu';
import { ProStepPotentialHUD } from './ProStepPotentialHUD';
import { anticipateEase, snappyEase } from './easing';

/**
 * 60 FPS Professional Studio Animation Demo:
 * "The Physics of Step Potential: Why Running is Fatal"
 * Demonstrates:
 * 1. Snappy custom cubic bezier interpolation (anticipation -> jump -> dynamic landing)
 * 2. Organic curved spline limbs (no rigid rectangular boxes)
 * 3. Volume-conserving squash & stretch physics
 * 4. Multi-pass glow bloom and SVG volumetric lighting gradients
 * 5. Dynamic scientific HUD telemetry with animated voltage field lines
 * 6. Cinematic virtual camera with macro push-in and framing
 */
export const ProAnimationDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Cinematic Virtual Camera Movement:
  // Starts wide establishing shot (scale 1.0) -> snappily pushes into macro science view (scale 1.35)
  const camProgress = Math.min(1, Math.max(0, (frame - 40) / 70));
  const easedCam = snappyEase(camProgress);
  const camScale = interpolate(easedCam, [0, 1], [1.0, 1.32]);
  const camX = interpolate(easedCam, [0, 1], [0, -140]);
  const camY = interpolate(easedCam, [0, 1], [0, 40]);

  // 2. Character Locomotion & Bunny Hop Mechanics:
  // Phase A (Frames 0-50): Bishu/Mitu pauses in shock, gazing at snapped wire with micro-saccades
  // Phase B (Frames 50-80): Deep anticipation crouch (Squash: Y=0.75, X=1.33)
  // Phase C (Frames 80-130): High Bunny-Hop through air with tight feet (Stretch: Y=1.28, X=0.78)
  // Phase D (Frames 130-180): Dynamic cushioned landing with secondary hair recoil

  let charX = 480;
  let charY = 720;
  let charSquashX = 1;
  let charSquashY = 1;
  let charBodyAngle = 0;
  let charLeftArm = 15;
  let charRightArm = -20;
  let charLeftLeg = 0;
  let charRightLeg = 0;
  let kneeBend = 0;
  let lookAtX = 0.8;
  let lookAtY = 0.2;
  const lastLandFrame = 135;

  if (frame < 50) {
    // Phase A: Hesitant alert stance, breathing and eye tracking the wire
    charX = 480;
    charY = 720;
    charSquashY = 1 + Math.sin(frame * 0.1) * 0.03;
    charSquashX = 1 / charSquashY;
    lookAtX = 0.85;
    lookAtY = 0.3;
    charLeftArm = 20 + Math.sin(frame * 0.08) * 4;
    charRightArm = -25 - Math.sin(frame * 0.08) * 4;
  } else if (frame >= 50 && frame < 80) {
    // Phase B: Anticipation Crouch before launching
    const crouchT = (frame - 50) / 30;
    const easedCrouch = anticipateEase(crouchT);
    charY = interpolate(easedCrouch, [0, 1], [720, 755]);
    charSquashY = interpolate(easedCrouch, [0, 1], [1, 0.74]);
    charSquashX = 1 / charSquashY; // volume conservation!
    charBodyAngle = interpolate(easedCrouch, [0, 1], [0, -8]);
    kneeBend = interpolate(easedCrouch, [0, 1], [0, 24]);
    charLeftArm = interpolate(easedCrouch, [0, 1], [20, 55]);
    charRightArm = interpolate(easedCrouch, [0, 1], [-25, -60]);
    lookAtX = -0.5; // looking back to safety direction
    lookAtY = -0.3;
  } else if (frame >= 80 && frame < 135) {
    // Phase C: High Explosive Bunny-Hop through the air
    const hopT = (frame - 80) / 55;
    const arcT = Math.sin(hopT * Math.PI); // parabolic elevation arc
    charX = interpolate(hopT, [0, 1], [480, 260]); // retreating away from danger
    charY = 755 - arcT * 260; // flies high into air
    // In air: stretched vertically
    charSquashY = 1 + arcT * 0.32;
    charSquashX = 1 / charSquashY;
    charBodyAngle = interpolate(hopT, [0, 1], [-12, 10]);
    kneeBend = 4; // feet tightly joined together!
    charLeftArm = -45;
    charRightArm = 45;
    lookAtX = -0.9;
    lookAtY = 0.2;
  } else {
    // Phase D: Cushion Landing & Damped Follow-Through
    const landT = Math.min(1, (frame - 135) / 25);
    const easedLand = snappyEase(landT);
    charX = 260;
    // Damped squash on impact
    const impactSquash = Math.exp(-0.15 * (frame - 135)) * Math.cos(0.4 * (frame - 135));
    charSquashY = 1 - impactSquash * 0.35;
    charSquashX = 1 / charSquashY;
    charY = interpolate(easedLand, [0, 1], [745, 720]);
    kneeBend = Math.max(0, impactSquash * 15);
    charBodyAngle = interpolate(easedLand, [0, 1], [6, 0]);
    charLeftArm = 15;
    charRightArm = -18;
    lookAtX = 0.6; // looks back at the hazard from safe distance
    lookAtY = 0.2;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#030414', overflow: 'hidden' }}>
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          transform: `translate(${camX}px, ${camY}px) scale(${camScale})`,
          transformOrigin: '960px 540px',
        }}
      >
        {/* Studio Lighting Gradients, Multi-Stage Glow & Shading Defs */}
        <StudioDefs />

        {/* 1. Environment Background (Volumetric Radial Sky) */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-radial)" />

        {/* Atmospheric Distant Cloud Silhouettes */}
        <g opacity="0.35">
          <ellipse cx="400" cy="220" rx="420" ry="110" fill="#0B0E38" />
          <ellipse cx="980" cy="180" rx="540" ry="130" fill="#0E1248" />
          <ellipse cx="1600" cy="240" rx="460" ry="120" fill="#0B0E38" />
        </g>

        {/* Distant Electric Transmission Tower Silhouette */}
        <g transform="translate(1540, 260)" opacity="0.25">
          <line x1="0" y1="0" x2="0" y2="420" stroke="#243CDB" strokeWidth="6" />
          <line x1="-80" y1="80" x2="80" y2="80" stroke="#243CDB" strokeWidth="4" />
          <line x1="-120" y1="160" x2="120" y2="160" stroke="#243CDB" strokeWidth="5" />
          <line x1="-70" y1="0" x2="70" y2="420" stroke="#243CDB" strokeWidth="2.5" />
          <line x1="70" y1="0" x2="-70" y2="420" stroke="#243CDB" strokeWidth="2.5" />
        </g>

        {/* Ground Terrain Plane (Wet Conductive Soil) */}
        <path
          d="M 0 680 Q 480 660 960 675 T 1920 670 L 1920 1080 L 0 1080 Z"
          fill="#060924"
        />
        {/* Ground Horizon Specular Rim */}
        <path
          d="M 0 680 Q 480 660 960 675 T 1920 670"
          fill="none"
          stroke="#22D7DA"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* 2. Scientific HUD & Voltage Isobar Field Lines */}
        <ProStepPotentialHUD x={1260} y={700} frame={frame} />

        {/* 3. High-Fidelity Rigged 2D Character (Mitu executing Bunny Hop) */}
        <ProCharacterMitu
          x={charX}
          y={charY}
          scale={1.3}
          frame={frame}
          squashX={charSquashX}
          squashY={charSquashY}
          bodyAngle={charBodyAngle}
          leftArmAngle={charLeftArm}
          rightArmAngle={charRightArm}
          kneeBend={kneeBend}
          lookAtX={lookAtX}
          lookAtY={lookAtY}
          lastLandFrame={lastLandFrame}
        />

        {/* 4. Cinematic Foreground Atmospheric Rain & Glow Particles */}
        <g opacity="0.6">
          {Array.from({ length: 24 }).map((_, i) => {
            const rx = (i * 84 + frame * 9) % 1920;
            const ry = (i * 47 + frame * 18) % 1080;
            return (
              <line
                key={i}
                x1={rx}
                y1={ry}
                x2={rx - 14}
                y2={ry + 32}
                stroke="#22D7DA"
                strokeWidth={i % 2 === 0 ? 2 : 1.2}
                opacity={0.4}
              />
            );
          })}
        </g>
      </svg>

      {/* Modern Broadcast Lower-Third Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 48,
          background: 'rgba(6, 9, 36, 0.92)',
          border: '1.5px solid #22D7DA',
          borderRadius: 16,
          padding: '14px 28px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#22D7DA',
            boxShadow: '0 0 12px #22D7DA',
          }}
        />
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#22D7DA', letterSpacing: '0.14em' }}>
            TECHNICAL SHOWCASE // STUDIO-GRADE VECTOR KINEMATICS
          </div>
          <div style={{ fontFamily: 'sans-serif', fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>
            Curved Spline Limbs • Volume Squash/Stretch • Multi-Stage Bloom • Cubic Easing
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

