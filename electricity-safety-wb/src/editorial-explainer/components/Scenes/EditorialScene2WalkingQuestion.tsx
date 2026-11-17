import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { EditorialDefs } from '../EditorialDefs';
import { EditorialBishu } from '../EditorialCharacters';
import { editorialSnappy } from '../../motionCurves';

/**
 * Scene 2: The Walking Question
 * Duration: 480 frames (0:04 - 0:12)
 * Narrative: Bishu walks toward the flooded area; sudden camera reframing poses the scientific dilemma:
 * "Why is an ordinary walking stride lethal near a fallen wire?"
 */
export const EditorialScene2WalkingQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  // Dramatic cinematic camera push-in focusing from wide walk to medium hazard interrogation
  const camProgress = Math.min(1, Math.max(0, (frame - 60) / 100));
  const easedCam = editorialSnappy(camProgress);
  const camScale = interpolate(easedCam, [0, 1], [1.0, 1.25]);
  const camX = interpolate(easedCam, [0, 1], [0, -120]);
  const camY = interpolate(easedCam, [0, 1], [0, 40]);

  // Bishu walks into frame (frames 0-100), then freezes in realization (frames 100+)
  let bishuX = 420;
  let leftLeg = 0;
  let rightLeg = 0;
  let leftArm = 10;
  let rightArm = -12;
  let kneeBend = 0;
  let expression: 'focused' | 'shocked' = 'focused';
  let lookAtX = 0.8;
  let lookAtY = 0.1;

  if (frame < 100) {
    // Natural walking gait
    const walkCycle = (frame * 0.16) % (Math.PI * 2);
    bishuX = interpolate(frame, [0, 100], [240, 560]);
    leftLeg = Math.sin(walkCycle) * 26;
    rightLeg = -Math.sin(walkCycle) * 26;
    leftArm = -Math.sin(walkCycle) * 22;
    rightArm = Math.sin(walkCycle) * 22;
    kneeBend = Math.max(0, Math.cos(walkCycle) * 12);
  } else {
    // Freezes in abrupt caution
    bishuX = 560;
    expression = 'shocked';
    lookAtX = 0.95;
    lookAtY = 0.25;
    leftLeg = 14; // legs separated in a normal walking stride!
    rightLeg = -14;
    kneeBend = 2;
  }

  // Question mark callout revealing the scientific mystery (Frame 120+)
  const calloutProgress = Math.min(1, Math.max(0, (frame - 120) / 40));
  const easedCallout = editorialSnappy(calloutProgress);

  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        transform: `translate(${camX}px, ${camY}px) scale(${camScale})`,
        transformOrigin: '960px 540px',
      }}
    >
      <EditorialDefs />

      {/* Atmospheric Background */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#sky-storm)" />

      {/* Wet Roadway & Puddle Reflections */}
      <path
        d="M 0 720 Q 560 690 1100 710 T 1920 700 L 1920 1080 L 0 1080 Z"
        fill="url(#wet-ground)"
      />

      {/* Road Puddle Sheen */}
      <ellipse cx="640" cy="800" rx="280" ry="45" fill="#131F6D" opacity="0.4" />
      <ellipse cx="1400" cy="780" rx="360" ry="55" fill="#131F6D" opacity="0.4" />

      {/* Fallen Live Cable in Right Midground */}
      <g transform="translate(1380, 720)">
        <path d="M 380 -400 Q 180 -100 0 0" fill="none" stroke="#64748B" strokeWidth="6" />
        <ellipse cx="0" cy="0" rx="40" ry="12" fill="#FFD152" opacity={0.35} />
        <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
        {/* Voltage ripple indicator */}
        <circle
          cx="0"
          cy="0"
          r={50 + (frame * 1.5) % 60}
          fill="none"
          stroke="#FF5E57"
          strokeWidth="2"
          opacity={Math.max(0, 1 - ((frame * 1.5) % 60) / 60)}
        />
      </g>

      {/* Character: Bishu Walking Toward Danger */}
      <EditorialBishu
        x={bishuX}
        y={680}
        scale={1.32}
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

      {/* Visual Question Callout: The Danger of the Two-Foot Stride */}
      {calloutProgress > 0 && (
        <g
          transform={`translate(680, 430) scale(${easedCallout})`}
          opacity={calloutProgress}
          filter="url(#ambient-ground-shadow)"
        >
          {/* Glass Card */}
          <rect
            x="-20"
            y="-30"
            width="380"
            height="150"
            rx="14"
            fill="rgba(6, 9, 31, 0.92)"
            stroke="#FF5E57"
            strokeWidth="2"
          />

          {/* Warning Icon Tag */}
          <circle cx="15" cy="0" r="12" fill="#FF5E57" />
          <text x="15" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">
            !
          </text>

          <text
            x="40"
            y="4"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="800"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.08em"
          >
            HAZARD HYPOTHESIS
          </text>

          <text
            x="10"
            y="42"
            fill="#FFD152"
            fontSize="22"
            fontWeight="700"
            fontFamily="'Hind Siliguri', sans-serif"
          >
            কেন সাধারণ হাঁটা এখানে প্রাণঘাতী?
          </text>

          <text
            x="10"
            y="72"
            fill="#CBD5E1"
            fontSize="13.5"
            fontFamily="sans-serif"
          >
            Two feet touching wet soil at different distances
          </text>
          <text
            x="10"
            y="92"
            fill="#94A3B8"
            fontSize="13"
            fontFamily="sans-serif"
          >
            creates a deadly closed electrical circuit.
          </text>
        </g>
      )}

      {/* Distance Measurement Bracket between Bishu's Feet */}
      {frame >= 110 && (
        <g transform="translate(560, 805)" opacity={Math.min(1, (frame - 110) / 25)}>
          <line x1="-24" y1="0" x2="24" y2="0" stroke="#FF5E57" strokeWidth="2.5" />
          <line x1="-24" y1="-8" x2="-24" y2="8" stroke="#FF5E57" strokeWidth="2.5" />
          <line x1="24" y1="-8" x2="24" y2="8" stroke="#FF5E57" strokeWidth="2.5" />
          <text x="0" y="24" textAnchor="middle" fill="#FF5E57" fontSize="12" fontWeight="bold" fontFamily="monospace">
            STRIDE GAP: &Delta;d
          </text>
        </g>
      )}
    </svg>
  );
};

