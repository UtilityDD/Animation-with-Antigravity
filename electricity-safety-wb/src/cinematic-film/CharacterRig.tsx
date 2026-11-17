import React from 'react';
import { Easing, interpolate } from 'remotion';

export interface HierarchicalPose {
  // Root world grounding
  worldX: number;
  worldY: number;

  // Pelvis (Root child)
  pelvisY: number;
  pelvisTiltDeg: number; // Z-tilt (hip drop)
  pelvisYaw: number; // 0 = front, 0.5 = 3/4 right, 1.0 = full side profile right

  // Torso & Chest (Pelvis child)
  torsoLeanDeg: number; // forward/backward spine pitch
  torsoYaw: number; // 0 = front, 0.5 = 3/4 right, 1.0 = side profile right
  chestBendDeg: number; // upper spine counter-bend
  shoulderElevateY: number;
  shoulderTwistDeg: number; // Z-twist accentuating counter-rotation

  // Neck & Head (Chest child)
  neckPitchDeg: number;
  headRollDeg: number;
  headYaw: number; // 0 = front, 0.5 = 3/4 right, 1.0 = side profile right
  headPitch: number; // -0.5 (up) to +1.0 (down)

  // Facial Acting (Head child)
  eyeLookX: number;
  eyeLookY: number;
  blinkAmount: number;
  eyeWiden: number;
  browFurrow: number;
  browLift: number;
  mouthOpen: number;
  mouthTension: number;

  // Arms (Chest -> Left/Right Shoulder -> Elbow -> Wrist -> Hand)
  leftShoulderDeg: number;
  leftElbowDeg: number;
  leftWristDeg: number;
  rightShoulderDeg: number;
  rightElbowDeg: number;
  rightWristDeg: number;

  // Legs (Pelvis -> Left/Right Hip -> Knee -> Ankle -> Foot)
  leftHipDeg: number;
  leftKneeDeg: number;
  leftAnkleDeg: number;
  rightHipDeg: number;
  rightKneeDeg: number;
  rightAnkleDeg: number;
}

const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1);
const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);

/**
 * Smooth piecewise interpolation across three designed anatomical views:
 * yaw = 0.0 (Front), yaw = 0.5 (Three-Quarter Right), yaw = 1.0 (Side Profile Right).
 */
function lerpView(yaw: number, front: number, threeQ: number, profile: number): number {
  const y = Math.max(0, Math.min(1, yaw));
  if (y <= 0.5) {
    const t = y / 0.5;
    return front + (threeQ - front) * t;
  }
  const t = (y - 0.5) / 0.5;
  return threeQ + (profile - threeQ) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export interface PerformanceTimeline {
  /** Frame when walking starts */
  walkStart: number;
  /** Frame when walking settles to a planted stop */
  walkEnd: number;
  /** Frame when eyes first dart toward the hazard */
  noticeFrame: number;
  /** Frame when head turns & pitches toward the hazard */
  headTurnFrame: number;
  /** Frame when torso/shoulders follow into concern & recoil */
  recoilFrame: number;
  /** Frame when backward step begins */
  stepBackStart: number;
  /** Frame when backward step settles */
  stepBackEnd: number;
  /** Starting X position */
  startX: number;
  /** Stopped X position before stepping back */
  stopX: number;
  /** Final safe X position after stepping back */
  safeX: number;
}

export const PILOT_TIMELINE: PerformanceTimeline = {
  walkStart: 30,
  walkEnd: 266,
  noticeFrame: 266,
  headTurnFrame: 288,
  recoilFrame: 492,
  stepBackStart: 518,
  stepBackEnd: 590,
  startX: -485,
  stopX: -128,
  safeX: -224,
};

export const TEST_TIMELINE: PerformanceTimeline = {
  walkStart: 0,
  walkEnd: 92,
  noticeFrame: 92,
  headTurnFrame: 106,
  recoilFrame: 148,
  stepBackStart: 162,
  stepBackEnd: 224,
  startX: -265,
  stopX: -120,
  safeX: -214,
};

/**
 * Computes a coordinated hierarchical character performance given any timeline.
 * Drives grounded gait, counter-rotating pelvis/shoulders, eye-led head turns,
 * overlapping torso follow-through, and a weight-transferred backward step.
 */
export function computeArjunPose(
  frame: number,
  tl: PerformanceTimeline = PILOT_TIMELINE
): HierarchicalPose {
  const {
    walkStart,
    walkEnd,
    noticeFrame,
    headTurnFrame,
    recoilFrame,
    stepBackStart,
    stepBackEnd,
    startX,
    stopX,
    safeX,
  } = tl;

  // --- 1. WALKING & BACKWARD-STEP LOCOMOTION (GROUNDED) ---
  const walkDuration = Math.max(1, walkEnd - walkStart);
  const walkProgress = clamp((frame - walkStart) / walkDuration, 0, 1);

  // Smooth ease-in and ease-out on walk velocity so stride length matches root travel
  const walkBlend =
    frame <= walkStart
      ? 0
      : interpolate(
          frame,
          [walkStart, walkStart + 14, walkEnd - 22, walkEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_IN_OUT }
        );

  // Number of full stride cycles scaled to distance so feet never moonwalk
  const walkDist = stopX - startX;
  const strideLength = 108; // ~108px per full 2-step cycle at this scale
  const totalCycles = walkDist / strideLength;
  const easedWalkProgress = Easing.bezier(0.28, 0.05, 0.72, 0.95)(walkProgress);
  const walkPhase = easedWalkProgress * totalCycles * Math.PI * 2;

  // Root X during walk + subtle recoil weight shift + articulated backward step
  const walkX = startX + walkDist * easedWalkProgress;

  // Weight shift back during initial alarm/recoil before stepping
  const midReact = Math.round((headTurnFrame + recoilFrame) * 0.5);
  const recoilShiftX = interpolate(
    frame,
    [headTurnFrame + 12, midReact, recoilFrame, recoilFrame + 22],
    [0, -7, -7, -14],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  // Articulated backward step: weight loads back foot -> step -> weight settles
  const stepT = clamp((frame - stepBackStart) / Math.max(1, stepBackEnd - stepBackStart), 0, 1);
  // Two-beat step curve: pause to load weight (0..0.18), step back (0.18..0.68), draw front foot back (0.68..1.0)
  const stepBackTravel = interpolate(
    stepT,
    [0, 0.18, 0.68, 1.0],
    [0, -4, (safeX - stopX) * 0.76, safeX - stopX],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_IN_OUT }
  );

  const worldX = (frame < walkEnd ? walkX : stopX) + recoilShiftX + stepBackTravel;

  // --- 2. GAIT KINEMATICS (ALTERNATING STANCE & SWING) ---
  const strideSin = Math.sin(walkPhase) * walkBlend;
  const strideCos = Math.cos(walkPhase) * walkBlend;

  // Asymmetric knee bend: only bend sharply during forward swing (when cos > 0 for right, < 0 for left)
  const rightSwingLift = Math.max(0, strideCos) * walkBlend;
  const leftSwingLift = Math.max(0, -strideCos) * walkBlend;

  // Walk leg angles
  let leftHipDeg = strideSin * 26;
  let leftKneeDeg = leftSwingLift * 42 + Math.max(0, -strideSin) * 8 * walkBlend;
  let leftAnkleDeg = -strideSin * 10 + leftSwingLift * 14 - Math.max(0, -strideSin) * 12 * walkBlend;

  let rightHipDeg = -strideSin * 26;
  let rightKneeDeg = rightSwingLift * 42 + Math.max(0, strideSin) * 8 * walkBlend;
  let rightAnkleDeg = strideSin * 10 + rightSwingLift * 14 - Math.max(0, strideSin) * 12 * walkBlend;

  // Planted-stance settle + backward-step leg choreography
  const stepWeight =
    frame >= stepBackStart && frame <= stepBackEnd
      ? interpolate(stepT, [0, 0.12, 0.86, 1], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  // During backward step:
  // 0.00-0.20: knees soften to load weight onto right (front) leg
  // 0.20-0.65: left (back) leg lifts & reaches backward (-hip, +knee) to plant behind
  // 0.65-1.00: weight transfers back, right (front) leg draws back into a guarded stance
  const backLegReach = interpolate(stepT, [0.1, 0.38, 0.68, 1.0], [0, -26, -16, -6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT,
  });
  const backLegKnee = interpolate(stepT, [0.05, 0.34, 0.65, 1.0], [0, 36, 12, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT,
  });
  const frontLegSupport = interpolate(stepT, [0.05, 0.25, 0.65, 0.85, 1.0], [0, 14, 22, 14, 6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT,
  });
  const frontLegKnee = interpolate(stepT, [0.05, 0.28, 0.72, 1.0], [0, 16, 28, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT,
  });

  if (stepWeight > 0.001) {
    leftHipDeg = leftHipDeg * (1 - stepWeight) + backLegReach * stepWeight;
    leftKneeDeg = leftKneeDeg * (1 - stepWeight) + backLegKnee * stepWeight;
    leftAnkleDeg = leftAnkleDeg * (1 - stepWeight) + (-backLegReach * 0.45) * stepWeight;

    rightHipDeg = rightHipDeg * (1 - stepWeight) + frontLegSupport * stepWeight;
    rightKneeDeg = rightKneeDeg * (1 - stepWeight) + frontLegKnee * stepWeight;
    rightAnkleDeg = rightAnkleDeg * (1 - stepWeight) + (-frontLegSupport * 0.55) * stepWeight;
  } else if (frame >= walkEnd) {
    // Grounded guarded standing stance after stopping
    const braceStance = interpolate(frame, [recoilFrame, stepBackStart, stepBackEnd + 15], [0, 0.6, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASE_OUT,
    });
    leftHipDeg += -5 * braceStance;
    leftKneeDeg += 8 * braceStance;
    leftAnkleDeg += -3 * braceStance;
    rightHipDeg += 6 * braceStance;
    rightKneeDeg += 6 * braceStance;
    rightAnkleDeg += -4 * braceStance;
  }

  // --- 3. PELVIS, TORSO & SHOULDER COUNTER-ROTATION ---
  const idleWeight = 1 - Math.max(walkBlend, stepWeight);
  const breath = Math.sin(frame * 0.055) * idleWeight;

  // Vertical bob: drops on heel strike (|sin| peak), rises on passing (|cos| peak)
  const pelvisBob = -Math.abs(strideCos) * 6.5 * walkBlend + Math.abs(strideSin) * 2.5 * walkBlend;
  const stepCrouch = Math.sin(stepT * Math.PI) * 7.5 * stepWeight;
  const pelvisY = -126 + pelvisBob + stepCrouch + breath * 1.1;

  // Pelvis Z-tilt (hip drop on swing side)
  const pelvisTiltDeg = strideSin * 3.2 - stepWeight * Math.sin(stepT * Math.PI) * 3.5;

  // Base viewing yaw: walks in near-side-profile (0.86), turns toward 3/4 (0.42..0.52) on reaction
  const baseWalkYaw = 0.86;
  const pelvisReactionYaw = interpolate(
    frame,
    [headTurnFrame + 14, recoilFrame - 4, recoilFrame, stepBackEnd],
    [baseWalkYaw, 0.58, 0.54, 0.50],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  // Pelvis counter-rotates against chest during walk (~6-8 deg equivalent in yaw)
  const pelvisYaw = clamp(pelvisReactionYaw - strideSin * 0.14, 0.05, 1.0);

  // Torso yaw: leads/follows head with ~10f delay, counter-rotates opposite to pelvis during walk
  const torsoReactionYaw = interpolate(
    frame,
    [headTurnFrame + 8, recoilFrame - 6, recoilFrame, stepBackEnd],
    [baseWalkYaw, 0.42, 0.36, 0.44],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const torsoYaw = clamp(torsoReactionYaw + strideSin * 0.16, 0.05, 1.0);

  // Torso lean (pitch): forward walk lean -> curious lean -> alarm recoil lean back
  const walkLean = 4.2 * walkBlend;
  const curiousLean = interpolate(
    frame,
    [headTurnFrame + 6, headTurnFrame + 32, recoilFrame],
    [0, 3.8, 1.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const recoilLean = interpolate(
    frame,
    [recoilFrame, recoilFrame + 24, stepBackEnd],
    [0, -8.5, -2.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const torsoLeanDeg = walkLean + curiousLean + recoilLean;
  const chestBendDeg = breath * 0.9 + recoilLean * 0.35 - strideCos * 1.4 * walkBlend;

  const shoulderElevateY =
    interpolate(frame, [headTurnFrame + 16, headTurnFrame + 34, headTurnFrame + 62], [0, -2.8, -0.8], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASE_OUT,
    }) +
    interpolate(frame, [recoilFrame, recoilFrame + 20, stepBackEnd], [0, -5.2, -1.2], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASE_OUT,
    }) -
    breath * 0.6;

  // Shoulder Z-twist counter-rotating against pelvis during walk
  const shoulderTwistDeg = strideSin * 4.5;

  // --- 4. EYES LEAD -> HEAD YAW/PITCH -> NECK FOLLOW-THROUGH ---
  const eyeLookX = interpolate(
    frame,
    [noticeFrame, noticeFrame + 16, stepBackEnd, stepBackEnd + 30],
    [0.6, 3.8, 3.8, 3.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const eyeLookY = interpolate(
    frame,
    [noticeFrame, noticeFrame + 18, stepBackEnd, stepBackEnd + 30],
    [0.0, 2.8, 2.8, 2.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  // Head turns noticeably from side-profile (0.88) -> 3/4 view (0.34) to inspect hazard & show expression
  const headYaw = interpolate(
    frame,
    [headTurnFrame, headTurnFrame + 28, recoilFrame, stepBackEnd],
    [0.88, 0.36, 0.32, 0.46],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  // Head pitches down to look at the fallen wire in the puddle
  const headPitch = interpolate(
    frame,
    [headTurnFrame + 2, headTurnFrame + 30, recoilFrame, stepBackEnd],
    [0.0, 0.46, 0.42, 0.32],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  // Subtle head stabilization counteracting torso lean during walk + expressive tilt on discovery
  const headRollDeg =
    -walkLean * 0.55 +
    interpolate(
      frame,
      [headTurnFrame + 8, headTurnFrame + 34, recoilFrame, recoilFrame + 26, stepBackEnd],
      [0, 5.5, 5.5, -4.5, 2.0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
    );
  const neckPitchDeg = headPitch * 14 - torsoLeanDeg * 0.4;

  // Natural blinks
  const blinkFrames = [42, 118, 205, noticeFrame + 12, recoilFrame - 6, stepBackEnd + 28];
  let blinkAmount = 0;
  for (const bf of blinkFrames) {
    if (frame >= bf - 4 && frame <= bf + 6) {
      blinkAmount = Math.max(
        blinkAmount,
        interpolate(frame, [bf - 4, bf, bf + 6], [0, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      );
    }
  }

  // Facial acting: alert recognition -> furrowed concern
  const eyeWiden = interpolate(
    frame,
    [noticeFrame + 6, headTurnFrame + 22, recoilFrame, stepBackEnd + 20],
    [0, 0.45, 0.65, 0.25],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const browLift = interpolate(
    frame,
    [noticeFrame + 4, headTurnFrame + 14, headTurnFrame + 36],
    [0, 2.4, 0.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const browFurrow = interpolate(
    frame,
    [headTurnFrame + 14, headTurnFrame + 38, recoilFrame, recoilFrame + 24],
    [0, 0.68, 0.72, 0.95],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const mouthOpen = interpolate(
    frame,
    [headTurnFrame + 16, headTurnFrame + 28, headTurnFrame + 46],
    [0, 0.36, 0.08],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_IN_OUT }
  );
  const mouthTension = interpolate(
    frame,
    [headTurnFrame + 14, recoilFrame - 4, recoilFrame, recoilFrame + 24],
    [0, 0.65, 0.8, 0.95],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  // --- 5. ARM KINEMATICS WITH OVERLAPPING ELBOW & WRIST LAG ---
  const armSwingPhase = walkPhase - 0.35;
  const wristSwingPhase = walkPhase - 0.75;
  const armLag = Math.sin(armSwingPhase) * walkBlend;
  const wristLag = Math.sin(wristSwingPhase) * walkBlend;

  const alertBrace = interpolate(
    frame,
    [headTurnFrame + 14, recoilFrame - 4, recoilFrame, recoilFrame + 22, stepBackEnd, stepBackEnd + 32],
    [0, 0.28, 0.35, 0.92, 0.62, 0.22],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  const leftShoulderDeg = -strideSin * 20 + alertBrace * 16 + stepWeight * 8;
  const leftElbowDeg = -14 - Math.max(0, armLag * 16) - alertBrace * 18;
  const leftWristDeg = -wristLag * 9 + alertBrace * 8;

  const rightShoulderDeg = strideSin * 20 - alertBrace * 14 - stepWeight * 10;
  const rightElbowDeg = -16 - Math.max(0, -armLag * 16) - alertBrace * 42;
  const rightWristDeg = wristLag * 9 - alertBrace * 16;

  return {
    worldX,
    worldY: 250,
    pelvisY,
    pelvisTiltDeg,
    pelvisYaw,
    torsoLeanDeg,
    torsoYaw,
    chestBendDeg,
    shoulderElevateY,
    shoulderTwistDeg,
    neckPitchDeg,
    headRollDeg,
    headYaw,
    headPitch,
    eyeLookX,
    eyeLookY,
    blinkAmount,
    eyeWiden,
    browFurrow,
    browLift,
    mouthOpen,
    mouthTension,
    leftShoulderDeg,
    leftElbowDeg,
    leftWristDeg,
    rightShoulderDeg,
    rightElbowDeg,
    rightWristDeg,
    leftHipDeg,
    leftKneeDeg,
    leftAnkleDeg,
    rightHipDeg,
    rightKneeDeg,
    rightAnkleDeg,
  };
}

/**
 * Default 12-second pilot controller wrapper.
 */
export function useArjunPerformance(frame: number): HierarchicalPose {
  return computeArjunPose(frame, PILOT_TIMELINE);
}

/**
 * True multi-view hierarchical 2.5D character rig ("Arjun"):
 * Root -> Pelvis -> Left/Right Leg (Thigh -> Knee -> LowerLeg -> Ankle -> Foot)
 *               -> Torso -> Chest -> Left/Right Shoulder (UpperArm -> Elbow -> Forearm -> Wrist -> Hand)
 *                                 -> Neck -> Head (Eyes, Eyebrows, Mouth)
 * Morphs seamlessly across Front (0.0), Three-Quarter (0.5), and Side Profile (1.0)
 * anatomical silhouettes without flat rotateY/scaleX distortion.
 */
export const ArjunRig: React.FC<{ pose: HierarchicalPose }> = ({ pose }) => {
  const {
    pelvisY,
    pelvisTiltDeg,
    pelvisYaw,
    torsoLeanDeg,
    torsoYaw,
    chestBendDeg,
    shoulderElevateY,
    shoulderTwistDeg,
    neckPitchDeg,
    headRollDeg,
    headYaw,
    headPitch,
    eyeLookX,
    eyeLookY,
    blinkAmount,
    eyeWiden,
    browFurrow,
    browLift,
    mouthOpen,
    mouthTension,
    leftShoulderDeg,
    leftElbowDeg,
    leftWristDeg,
    rightShoulderDeg,
    rightElbowDeg,
    rightWristDeg,
    leftHipDeg,
    leftKneeDeg,
    leftAnkleDeg,
    rightHipDeg,
    rightKneeDeg,
    rightAnkleDeg,
  } = pose;

  // --- PELVIS MULTI-VIEW PROJECTION ---
  const leftHipX = lerpView(pelvisYaw, -11, -7, -3.5);
  const rightHipX = lerpView(pelvisYaw, 11, 7, 3.5);

  // --- TORSO & SHOULDER MULTI-VIEW PROJECTION ---
  const chestLeftX = lerpView(torsoYaw, -25, -21, -15);
  const chestRightX = lerpView(torsoYaw, 25, 22, 16);
  const waistLeftX = lerpView(torsoYaw, -21, -20, -16);
  const waistRightX = lerpView(torsoYaw, 21, 21, 16);
  const zipperX = lerpView(torsoYaw, 0, 11, 15.5);
  const leftShoulderX = lerpView(torsoYaw, -23, -15, -2);
  const rightShoulderX = lerpView(torsoYaw, 23, 14, 2);
  const pocketX = lerpView(torsoYaw, -17, -14, -7);

  // --- HEAD MULTI-VIEW SILHOUETTE (Front 0.0 -> 3/4 0.5 -> Profile 1.0) ---
  const pitchY = headPitch * 9.5;
  const backSkullX = lerpView(headYaw, -21, -22, -23);
  const foreheadX = lerpView(headYaw, 21, 21, 19);
  const noseBridgeX = lerpView(headYaw, 0, 9.5, 21);
  const noseTipX = lerpView(headYaw, 0, 12.5, 26.5);
  const browRidgeX = lerpView(headYaw, 21, 20, 21);
  const chinX = lerpView(headYaw, 0, 11, 17);
  const jawBackX = lerpView(headYaw, -18, -17, -14);

  // Head silhouette path: transitions from symmetrical front -> 3/4 cheekbone -> true profile with projecting nose & lips
  const headPath = [
    `M ${backSkullX.toFixed(1)} -28`,
    `Q ${(backSkullX - 2).toFixed(1)} -58 ${lerpView(headYaw, 0, -2, -4).toFixed(1)} -60`,
    `Q ${browRidgeX.toFixed(1)} -60 ${foreheadX.toFixed(1)} ${(-38 + pitchY * 0.2).toFixed(1)}`,
    // Nose bridge + tip + upper lip contour in 3/4 & profile
    `L ${lerpView(headYaw, foreheadX, 20.5, 25.5).toFixed(1)} ${(-28 + pitchY * 0.6).toFixed(1)}`,
    `Q ${lerpView(headYaw, foreheadX, 19, 20.5).toFixed(1)} ${(-22 + pitchY * 0.65).toFixed(1)} ${lerpView(headYaw, 19, 17, 19).toFixed(1)} ${(-13 + pitchY * 0.7).toFixed(1)}`,
    // Chin & jaw
    `Q ${chinX.toFixed(1)} ${(4 + pitchY * 0.5).toFixed(1)} ${lerpView(headYaw, 0, 2, 0).toFixed(1)} ${(6 + pitchY * 0.4).toFixed(1)}`,
    `Q ${jawBackX.toFixed(1)} 4 ${backSkullX.toFixed(1)} -28 Z`,
  ].join(' ');

  // Hair silhouette adapts across Front -> 3/4 -> Profile (nape coverage at back, temple sweep in front)
  const hairPath = [
    `M ${(backSkullX - 2.5).toFixed(1)} -18`,
    `Q ${(backSkullX - 4).toFixed(1)} -63 ${lerpView(headYaw, 0, -2, -4).toFixed(1)} -65`,
    `Q ${(foreheadX + 3).toFixed(1)} -64 ${(foreheadX + 1).toFixed(1)} -41`,
    `Q ${lerpView(headYaw, 12, 13, 10).toFixed(1)} -47 ${lerpView(headYaw, 0, 2, -2).toFixed(1)} -44`,
    `Q ${lerpView(headYaw, -14, -12, -13).toFixed(1)} -42 ${lerpView(headYaw, -17, -15, -14).toFixed(1)} -25`,
    `Q ${(backSkullX + 0.5).toFixed(1)} -14 ${(backSkullX - 2.5).toFixed(1)} -18 Z`,
  ].join(' ');

  // Ear shifts backward as head turns to profile
  const earX = lerpView(headYaw, -21, -16, -9);
  const earVisible = headYaw > 0.08 ? 1 : 0.9;
  const farEarVisible = headYaw < 0.28 ? clamp((0.28 - headYaw) / 0.28, 0, 1) : 0;

  // Eyes: Near eye (viewer's left -> center-right in profile) & Far eye (viewer's right -> occludes behind nose bridge)
  const eyeY = -37 + pitchY * 0.85;
  const nearEyeX = lerpView(headYaw, -9.5, 1.5, 10.5);
  const farEyeX = lerpView(headYaw, 9.5, 14.5, 17.5);
  const farEyeOpacity = clamp(1 - (headYaw - 0.68) / 0.18, 0, 1);
  const nearEyeRx = lerpView(headYaw, 4.6, 4.4, 3.5);
  const farEyeRx = lerpView(headYaw, 4.6, 3.3, 2.0);
  const eyeRy = Math.max(0.6, (3.7 + eyeWiden * 1.0) * (1 - blinkAmount * 0.92));

  // Mouth position & width
  const mouthX = lerpView(headYaw, 0, 10, 16.5);
  const mouthY = eyeY + 19.5;
  const mouthHalfW = lerpView(headYaw, 6.2, 5.2, 3.5);

  return (
    <svg
      width={360}
      height={420}
      viewBox="-180 -340 360 420"
      style={{ position: 'absolute', left: -180, top: -340, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="jacketMainV2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E99F4A" />
          <stop offset="62%" stopColor="#CC7D2A" />
          <stop offset="100%" stopColor="#995517" />
        </linearGradient>
        <linearGradient id="jacketBackV2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B86B22" />
          <stop offset="100%" stopColor="#854813" />
        </linearGradient>
        <linearGradient id="trouserFrontV2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38414F" />
          <stop offset="100%" stopColor="#222833" />
        </linearGradient>
      </defs>

      {/* Ground contact shadow */}
      <ellipse cx="0" cy="4" rx="42" ry="7.5" fill="#070C12" opacity="0.58" />

      {/* ROOT -> PELVIS */}
      <g transform={`translate(0, ${pelvisY.toFixed(2)}) rotate(${pelvisTiltDeg.toFixed(2)})`}>
        {/* LEFT LEG (Back) -> Hip Pivot */}
        <g transform={`translate(${leftHipX.toFixed(1)}, 0) rotate(${leftHipDeg.toFixed(2)})`}>
          {/* Thigh with anatomical quad/hamstring curve */}
          <circle cx="0" cy="0" r="9.5" fill="#202630" />
          <path d="M-9.5 0 Q-10.5 28 -7.5 56 L7.5 56 Q10 26 9.5 0 Z" fill="#202630" />
          {/* Knee Pivot */}
          <g transform={`translate(0, 56) rotate(${leftKneeDeg.toFixed(2)})`}>
            <circle cx="0" cy="0" r="7.5" fill="#1C212A" />
            {/* LowerLeg with calf taper */}
            <path d="M-7.5 0 Q-9 20 -6 56 L5.5 56 Q8.5 22 7.5 0 Z" fill="#1C212A" />
            {/* Ankle Pivot */}
            <g transform={`translate(0, 56) rotate(${leftAnkleDeg.toFixed(2)})`}>
              <circle cx="0" cy="0" r="5" fill="#18181A" />
              {/* Articulated Shoe (heel + arch + toe cap + sole) */}
              <path
                d="M-8 -2 L6 -2 Q13 3 22 7 Q24 10 21 12 L-9 12 Q-10 6 -8 -2 Z"
                fill="#171619"
              />
              <path d="M-9 10 L22 10 L21 12.5 L-9 12.5 Z" fill="#0E0F12" />
            </g>
          </g>
        </g>

        {/* RIGHT LEG (Front) -> Hip Pivot */}
        <g transform={`translate(${rightHipX.toFixed(1)}, 0) rotate(${rightHipDeg.toFixed(2)})`}>
          <circle cx="0" cy="0" r="10.5" fill="#2B3340" />
          <path d="M-10.5 0 Q-11.5 28 -8.5 56 L8.5 56 Q11 26 10.5 0 Z" fill="url(#trouserFrontV2)" />
          {/* Knee Pivot */}
          <g transform={`translate(0, 56) rotate(${rightKneeDeg.toFixed(2)})`}>
            <circle cx="0" cy="0" r="8.2" fill="#29303C" />
            <path d="M-8.2 0 Q-9.8 20 -6.5 56 L6 56 Q9.5 22 8.2 0 Z" fill="#29303C" />
            {/* Ankle Pivot */}
            <g transform={`translate(0, 56) rotate(${rightAnkleDeg.toFixed(2)})`}>
              <circle cx="0" cy="0" r="5.5" fill="#222024" />
              <path
                d="M-8.5 -2 L6.5 -2 Q14 3 23.5 7 Q25.5 10 22.5 12 L-9.5 12 Q-10.5 6 -8.5 -2 Z"
                fill="#222024"
              />
              <path d="M-9.5 10 L23.5 10 L22.5 12.5 L-9.5 12.5 Z" fill="#121317" />
            </g>
          </g>
        </g>

        {/* Pelvis hem overlap */}
        <ellipse cx="0" cy="0" rx={lerpView(pelvisYaw, 19, 17, 14).toFixed(1)} ry="9" fill="#272E39" />

        {/* TORSO (Pelvis child) */}
        <g transform={`translate(0, -6) rotate(${torsoLeanDeg.toFixed(2)})`}>
          {/* CHEST (Torso child) */}
          <g transform={`translate(0, ${shoulderElevateY.toFixed(2)}) rotate(${chestBendDeg.toFixed(2)})`}>
            {/* LEFT SHOULDER (Back Arm) */}
            <g
              transform={`translate(${leftShoulderX.toFixed(1)}, -75) rotate(${(
                leftShoulderDeg + shoulderTwistDeg
              ).toFixed(2)})`}
            >
              <circle cx="0" cy="0" r="7.5" fill="#A5601D" />
              <path d="M-7.5 0 Q-8.5 22 -6 43 L6 43 Q7.5 22 7.5 0 Z" fill="url(#jacketBackV2)" />
              {/* Elbow Pivot */}
              <g transform={`translate(0, 42) rotate(${leftElbowDeg.toFixed(2)})`}>
                <circle cx="0" cy="0" r="5.8" fill="#925317" />
                <path d="M-5.8 0 Q-6 18 -4.5 34 L4.5 34 Q5.8 18 5.8 0 Z" fill="#925317" />
                <rect x="-5" y="31" width="10" height="4.5" rx="1.5" fill="#784210" />
                {/* Wrist Pivot -> Hand */}
                <g transform={`translate(0, 35) rotate(${leftWristDeg.toFixed(2)})`}>
                  <circle cx="0" cy="0" r="3.5" fill="#B57A5A" />
                  <path d="M-4 0 L4 0 L5.5 8 Q2 13 -3 11 Q-5 7 -4 0 Z" fill="#B57A5A" />
                </g>
              </g>
            </g>

            {/* RAIN JACKET TORSO (Morphs across Front / 3/4 / Side Profile) */}
            <path
              d={`M ${chestLeftX.toFixed(1)} -86 Q 0 -93 ${chestRightX.toFixed(1)} -86 Q ${(
                chestRightX + 3
              ).toFixed(1)} -45 ${waistRightX.toFixed(1)} -4 Q ${waistRightX.toFixed(1)} 9 ${(
                waistRightX - 8
              ).toFixed(1)} 10 L ${(waistLeftX + 7).toFixed(1)} 10 Q ${waistLeftX.toFixed(1)} 9 ${waistLeftX.toFixed(
                1
              )} -4 Q ${(chestLeftX - 3).toFixed(1)} -45 ${chestLeftX.toFixed(1)} -86 Z`}
              fill="url(#jacketMainV2)"
            />
            {/* Jacket zipper placket */}
            <line
              x1={zipperX.toFixed(1)}
              y1="-82"
              x2={(zipperX + 0.5).toFixed(1)}
              y2="9"
              stroke="#8A4D14"
              strokeWidth="2.3"
            />
            {/* Jacket pocket */}
            <path
              d={`M ${pocketX.toFixed(1)} -30 L ${(pocketX + 12).toFixed(1)} -30 L ${(
                pocketX + 12
              ).toFixed(1)} -14 L ${pocketX.toFixed(1)} -14 Z`}
              fill="#B3671F"
              opacity="0.65"
            />
            {/* Collar */}
            <path
              d={`M ${lerpView(torsoYaw, -15, -13, -10).toFixed(1)} -92 L ${lerpView(
                torsoYaw,
                15,
                14,
                11
              ).toFixed(1)} -92 L ${lerpView(torsoYaw, 17, 16, 13).toFixed(1)} -78 L ${lerpView(
                torsoYaw,
                -14,
                -12,
                -9
              ).toFixed(1)} -78 Z`}
              fill="#B2681F"
            />

            {/* NECK PIVOT */}
            <g transform={`translate(${lerpView(torsoYaw, 0, 2, 2.5).toFixed(1)}, -89) rotate(${neckPitchDeg.toFixed(2)})`}>
              <rect x="-7.5" y="-19" width="15" height="22" rx="6" fill="#AE7253" />

              {/* HEAD PIVOT (Atlas joint) */}
              <g transform={`translate(0, -14) rotate(${headRollDeg.toFixed(2)})`}>
                {/* Far ear (visible only near front view) */}
                {farEarVisible > 0.05 && (
                  <ellipse
                    cx={lerpView(headYaw, 21, 18, 12).toFixed(1)}
                    cy={(-22 + pitchY * 0.4).toFixed(1)}
                    rx="4"
                    ry="7"
                    fill="#B37857"
                    opacity={farEarVisible}
                  />
                )}

                {/* Head cranium & jaw silhouette */}
                <path d={headPath} fill="#C98E6B" />

                {/* Subtle jaw/cheekbone shadow */}
                <path
                  d={`M ${jawBackX.toFixed(1)} -9 Q ${lerpView(headYaw, 0, 4, 6).toFixed(1)} ${(
                    3 + pitchY * 0.35
                  ).toFixed(1)} ${chinX.toFixed(1)} ${(1 + pitchY * 0.35).toFixed(1)} Q ${lerpView(
                    headYaw,
                    0,
                    0,
                    -4
                  ).toFixed(1)} 7 ${jawBackX.toFixed(1)} -2 Z`}
                  fill="#A96F4F"
                  opacity="0.45"
                />

                {/* Near ear */}
                <g opacity={earVisible}>
                  <ellipse
                    cx={earX.toFixed(1)}
                    cy={(-21 + pitchY * 0.35).toFixed(1)}
                    rx="4.4"
                    ry="7.2"
                    fill="#B87C5B"
                  />
                  <path
                    d={`M ${(earX - 1).toFixed(1)} ${(-24 + pitchY * 0.35).toFixed(1)} Q ${(
                      earX + 2
                    ).toFixed(1)} ${(-21 + pitchY * 0.35).toFixed(1)} ${earX.toFixed(1)} ${(
                      -17 + pitchY * 0.35
                    ).toFixed(1)}`}
                    stroke="#8E593D"
                    strokeWidth="1.3"
                    fill="none"
                  />
                </g>

                {/* Hair volume */}
                <path d={hairPath} fill="#1B212C" />
                <path
                  d={`M ${lerpView(headYaw, -10, -11, -13).toFixed(1)} ${(-55 + pitchY * 0.2).toFixed(
                    1
                  )} Q ${lerpView(headYaw, 4, 5, 3).toFixed(1)} ${(-59 + pitchY * 0.2).toFixed(
                    1
                  )} ${lerpView(headYaw, 15, 16, 13).toFixed(1)} ${(-50 + pitchY * 0.2).toFixed(1)}`}
                  stroke="#2E3848"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Far Eye (occludes smoothly in full profile) */}
                {farEyeOpacity > 0.04 && (
                  <g
                    transform={`translate(${farEyeX.toFixed(1)}, ${eyeY.toFixed(1)})`}
                    opacity={farEyeOpacity}
                  >
                    <ellipse cx="0" cy="0" rx={farEyeRx.toFixed(2)} ry={eyeRy} fill="#F4F5F7" />
                    {blinkAmount < 0.8 && (
                      <circle
                        cx={clamp(eyeLookX * 0.42, -1.3, 2.0)}
                        cy={clamp(eyeLookY * 0.42, -1.3, 1.8)}
                        r="1.9"
                        fill="#1E242E"
                      />
                    )}
                    <path
                      d={`M ${(-farEyeRx).toFixed(1)} ${(-eyeRy * 0.85).toFixed(1)} Q 0 ${(
                        -eyeRy * 1.25
                      ).toFixed(1)} ${farEyeRx.toFixed(1)} ${(-eyeRy * 0.7).toFixed(1)}`}
                      stroke="#221D1B"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </g>
                )}

                {/* Near Eye */}
                <g transform={`translate(${nearEyeX.toFixed(1)}, ${eyeY.toFixed(1)})`}>
                  <ellipse cx="0" cy="0" rx={nearEyeRx.toFixed(2)} ry={eyeRy} fill="#F4F5F7" />
                  {blinkAmount < 0.8 && (
                    <>
                      <circle
                        cx={clamp(eyeLookX * 0.52, -1.6, 2.2)}
                        cy={clamp(eyeLookY * 0.52, -1.5, 2.0)}
                        r="2.2"
                        fill="#1E242E"
                      />
                      <circle
                        cx={clamp(eyeLookX * 0.52, -1.6, 2.2) + 0.7}
                        cy={clamp(eyeLookY * 0.52, -1.5, 2.0) - 0.7}
                        r="0.7"
                        fill="#FFFFFF"
                        opacity="0.85"
                      />
                    </>
                  )}
                  <path
                    d={`M ${(-nearEyeRx - 0.4).toFixed(1)} ${(-eyeRy * 0.85).toFixed(1)} Q 0 ${(
                      -eyeRy * 1.25
                    ).toFixed(1)} ${(nearEyeRx + 0.4).toFixed(1)} ${(-eyeRy * 0.7).toFixed(1)}`}
                    stroke="#221D1B"
                    strokeWidth="1.7"
                    fill="none"
                  />
                </g>

                {/* Eyebrows */}
                <path
                  d={`M ${(nearEyeX - 4.5).toFixed(1)} ${(
                    eyeY -
                    7.5 -
                    browLift +
                    browFurrow * 1.3
                  ).toFixed(1)} Q ${nearEyeX.toFixed(1)} ${(eyeY - 10.5 - browLift).toFixed(1)} ${(
                    nearEyeX + 4.8
                  ).toFixed(1)} ${(eyeY - 7.5 - browLift + browFurrow * 2.6).toFixed(1)}`}
                  stroke="#1B212B"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  fill="none"
                />
                {farEyeOpacity > 0.04 && (
                  <path
                    d={`M ${(farEyeX - 3.5).toFixed(1)} ${(
                      eyeY -
                      7.5 -
                      browLift +
                      browFurrow * 2.5
                    ).toFixed(1)} Q ${farEyeX.toFixed(1)} ${(eyeY - 10.5 - browLift).toFixed(
                      1
                    )} ${(farEyeX + 3.5).toFixed(1)} ${(
                      eyeY -
                      7.5 -
                      browLift +
                      browFurrow * 0.9
                    ).toFixed(1)}`}
                    stroke="#1B212B"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    fill="none"
                    opacity={farEyeOpacity}
                  />
                )}

                {/* Nose shadow / nostril accent (subtle in front, merges with profile contour) */}
                {headYaw < 0.85 && (
                  <path
                    d={`M ${(noseBridgeX - 1.5).toFixed(1)} ${(eyeY + 2).toFixed(1)} L ${noseTipX.toFixed(
                      1
                    )} ${(eyeY + 10.5).toFixed(1)} L ${(noseTipX - 3.5).toFixed(1)} ${(
                      eyeY + 12.5
                    ).toFixed(1)}`}
                    stroke="#9B6243"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity={clamp(1 - (headYaw - 0.5) / 0.4, 0.25, 1)}
                  />
                )}

                {/* Mouth */}
                {mouthOpen > 0.14 ? (
                  <ellipse
                    cx={mouthX.toFixed(1)}
                    cy={mouthY.toFixed(1)}
                    rx={(mouthHalfW * 0.6 + mouthOpen * 1.1).toFixed(2)}
                    ry={(1.0 + mouthOpen * 2.0).toFixed(2)}
                    fill="#5E2E27"
                  />
                ) : (
                  <path
                    d={`M ${(mouthX - mouthHalfW).toFixed(1)} ${mouthY.toFixed(1)} Q ${mouthX.toFixed(
                      1
                    )} ${(mouthY + (1 - mouthTension) * 1.5 - mouthTension * 2.2).toFixed(1)} ${(
                      mouthX + mouthHalfW
                    ).toFixed(1)} ${mouthY.toFixed(1)}`}
                    stroke="#6E3B30"
                    strokeWidth="2.0"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>
            </g>

            {/* RIGHT SHOULDER (Front Arm) */}
            <g
              transform={`translate(${rightShoulderX.toFixed(1)}, -74) rotate(${(
                rightShoulderDeg - shoulderTwistDeg
              ).toFixed(2)})`}
            >
              <circle cx="0" cy="0" r="8.5" fill="#DA8D3A" />
              <path d="M-8.5 0 Q-9.5 22 -7 44 L7 44 Q8.5 22 8.5 0 Z" fill="#DA8D3A" />
              {/* Elbow Pivot */}
              <g transform={`translate(0, 43) rotate(${rightElbowDeg.toFixed(2)})`}>
                <circle cx="0" cy="0" r="6.8" fill="#CA7E2C" />
                <path d="M-6.8 0 Q-7 18 -5.5 34 L5.5 34 Q6.8 18 6.8 0 Z" fill="#CA7E2C" />
                <rect x="-5.8" y="31" width="11.6" height="4.8" rx="1.6" fill="#9E5B19" />
                {/* Wrist Pivot -> Hand with thumb */}
                <g transform={`translate(0, 35) rotate(${rightWristDeg.toFixed(2)})`}>
                  <circle cx="0" cy="0" r="3.8" fill="#C98E6B" />
                  <path
                    d="M-4.2 0 L4.2 0 L5.8 7 Q6.5 11 2 13 Q-3 13 -4.5 9 Q-7 7 -4.2 0 Z"
                    fill="#C98E6B"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
