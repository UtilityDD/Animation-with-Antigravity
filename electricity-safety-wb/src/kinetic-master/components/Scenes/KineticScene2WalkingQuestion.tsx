import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraRig } from '../../CameraRig';
import { KineticTitle, punchyEase } from '../../KineticTypography';
import { ExpressiveBishu } from '../ExpressiveActors';
import { EditorialDefs } from '../../../editorial-explainer/components/EditorialDefs';

/**
 * Scene 2: The Stride Dilemma (Walking Question)
 * Duration: 480 frames (0:04 - 0:12)
 * Narrative: Bishu walks toward danger -> Camera executes sudden dramatic push-in directly onto his boots ->
 * Kinetic typography pops: "কেন সাধারণ হাঁটা প্রাণঘাতী?" -> Visual bracket measures the lethal stride gap (Δd).
 */
export const KineticScene2WalkingQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraKeyframes = [
    { frame: 0, scale: 1.0, x: 0, y: 0 },
    { frame: 90, scale: 1.06, x: -40, y: 10 },
    { frame: 160, scale: 1.48, x: -280, y: -140 }, // Extreme macro push-in directly onto boots
    { frame: 320, scale: 1.42, x: -260, y: -120 },
    { frame: 480, scale: 1.15, x: -100, y: -20 }, // Pans back out to prepare for physics explanation
  ];

  // Walking gait -> sudden freeze
  let bishuX = 420;
  let leftLeg = 0;
  let rightLeg = 0;
  let leftArm = 10;
  let rightArm = -12;
  let kneeBend = 0;
  let expression: 'alert' | 'shocked' = 'alert';
  let lookAtX = 0.8;
  let lookAtY = 0.1;

  if (frame < 110) {
    const walkCycle = (frame * 0.16) % (Math.PI * 2);
    bishuX = interpolate(frame, [0, 110], [220, 580]);
    leftLeg = Math.sin(walkCycle) * 26;
    rightLeg = -Math.sin(walkCycle) * 26;
    leftArm = -Math.sin(walkCycle) * 22;
    rightArm = Math.sin(walkCycle) * 22;
    kneeBend = Math.max(0, Math.cos(walkCycle) * 12);
  } else {
    bishuX = 580;
    expression = 'shocked';
    lookAtX = 0.95;
    lookAtY = 0.25;
    leftLeg = 16; // Feet wide apart!
    rightLeg = -16;
    kneeBend = 2;
  }

  return (
    <CameraRig currentFrame={frame} keyframes={cameraKeyframes}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <EditorialDefs />

        {/* Atmosphere */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-storm)" />

        {/* Wet Roadway */}
        <path
          d="M 0 720 Q 560 690 1100 710 T 1920 700 L 1920 1080 L 0 1080 Z"
          fill="url(#wet-ground)"
        />

        {/* Live Cable on Right */}
        <g transform="translate(1420, 715)">
          <path d="M 380 -400 Q 180 -100 0 0" fill="none" stroke="#64748B" strokeWidth="6" />
          <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
          <circle cx="0" cy="0" r={40 + (frame * 2) % 60} fill="none" stroke="#FF5E57" strokeWidth="2" opacity={Math.max(0, 1 - ((frame * 2) % 60) / 60)} />
        </g>

        {/* Character: Bishu Walking into Trap */}
        <ExpressiveBishu
          x={bishuX}
          y={680}
          scale={1.35}
          frame={frame}
          leftLegAngle={leftLeg}
          rightLegAngle={rightLeg}
          leftArmAngle={leftArm}
          rightArmAngle={rightArm}
          kneeBend={kneeBend}
          lookAtX={lookAtX}
          lookAtY={lookAtY}
          expression={expression}
        />

        {/* Stride Gap Dynamic Dimensioning Bracket */}
        {frame >= 120 && (
          <g transform={`translate(${bishuX}, 805)`} opacity={Math.min(1, (frame - 120) / 20)}>
            <line x1="-26" y1="0" x2="26" y2="0" stroke="#FF5E57" strokeWidth="3" />
            <line x1="-26" y1="-10" x2="-26" y2="10" stroke="#FF5E57" strokeWidth="3" />
            <line x1="26" y1="-10" x2="26" y2="10" stroke="#FF5E57" strokeWidth="3" />
            <text x="0" y="24" textAnchor="middle" fill="#FF5E57" fontSize="13" fontWeight="900" fontFamily="monospace">
              STRIDE &Delta;d
            </text>
          </g>
        )}

        {/* Kinetic Title Question Reveal */}
        <KineticTitle
          x={1160}
          y={360}
          startFrame={140}
          currentFrame={frame}
          badgeText="FATAL MECHANISM // জীবনঘাতী ভুল"
          words={[
            { text: 'কেন সাধারণ' },
            { text: 'হাঁটা এখানে' },
            { text: 'প্রাণঘাতী?', highlight: true, scale: 1.18 },
          ]}
        />
      </svg>
    </CameraRig>
  );
};
