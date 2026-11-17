import React from 'react';
import { Easing, interpolate } from 'remotion';

export type MeeraExpression =
  | 'neutral'
  | 'curious'
  | 'confused'
  | 'excited'
  | 'surprised'
  | 'concerned'
  | 'determined'
  | 'relieved';

export type MeeraViewPreset = 'front' | 'threeQuarter' | 'profile' | 'back';

export interface MeeraPose {
  worldX: number;
  worldY: number;

  // Pelvis (Root child)
  pelvisY: number;
  pelvisTiltDeg: number;
  pelvisYaw: number; // 0 = front, 0.5 = 3/4 right, 1.0 = profile right

  // Spine & Chest (Pelvis child)
  spineLeanDeg: number;
  chestBendDeg: number;
  torsoYaw: number;
  shoulderElevateY: number;
  shoulderTwistDeg: number;
  kurtiSwayDeg: number;

  // Neck & Head (Chest child)
  neckPitchDeg: number;
  headRollDeg: number;
  headYaw: number;
  headPitch: number; // -0.4 (up) to +0.8 (down)
  isBackView?: boolean;

  // Facial Acting
  eyeLookX: number;
  eyeLookY: number;
  blinkAmount: number;
  eyeWiden: number;
  browLiftL: number;
  browLiftR: number;
  browFurrow: number;
  mouthCurve: number; // -1 (concerned/frown) to +1 (warm smile)
  mouthOpen: number; // 0..1

  // Arms (Chest -> Left/Right Shoulder -> Elbow -> Wrist -> Hand)
  leftShoulderDeg: number;
  leftElbowDeg: number;
  leftWristDeg: number;
  rightShoulderDeg: number;
  rightElbowDeg: number;
  rightWristDeg: number;
  heldProp?: 'none' | 'lens' | 'jar';

  // Legs (Pelvis -> Left/Right Hip -> Knee -> Ankle -> Foot)
  leftHipDeg: number;
  leftKneeDeg: number;
  leftAnkleDeg: number;
  rightHipDeg: number;
  rightKneeDeg: number;
  rightAnkleDeg: number;
}

export function getExpressionParams(expr: MeeraExpression): {
  eyeWiden: number;
  browLiftL: number;
  browLiftR: number;
  browFurrow: number;
  mouthCurve: number;
  mouthOpen: number;
} {
  switch (expr) {
    case 'curious':
      return { eyeWiden: 0.25, browLiftL: 2.2, browLiftR: 3.4, browFurrow: 0.1, mouthCurve: 0.35, mouthOpen: 0.08 };
    case 'confused':
      return { eyeWiden: 0.1, browLiftL: 2.8, browLiftR: -1.0, browFurrow: 0.65, mouthCurve: -0.25, mouthOpen: 0.05 };
    case 'excited':
      return { eyeWiden: 0.45, browLiftL: 3.5, browLiftR: 3.5, browFurrow: 0, mouthCurve: 0.95, mouthOpen: 0.45 };
    case 'surprised':
      return { eyeWiden: 0.75, browLiftL: 4.5, browLiftR: 4.5, browFurrow: 0, mouthCurve: -0.1, mouthOpen: 0.65 };
    case 'concerned':
      return { eyeWiden: 0.2, browLiftL: 1.2, browLiftR: 1.2, browFurrow: 0.85, mouthCurve: -0.65, mouthOpen: 0.1 };
    case 'determined':
      return { eyeWiden: -0.05, browLiftL: -0.6, browLiftR: -0.6, browFurrow: 0.72, mouthCurve: 0.15, mouthOpen: 0 };
    case 'relieved':
      return { eyeWiden: -0.15, browLiftL: 1.4, browLiftR: 1.4, browFurrow: 0, mouthCurve: 0.85, mouthOpen: 0.12 };
    case 'neutral':
    default:
      return { eyeWiden: 0, browLiftL: 0, browLiftR: 0, browFurrow: 0, mouthCurve: 0.28, mouthOpen: 0 };
  }
}

export function createStaticPose(
  view: MeeraViewPreset,
  expr: MeeraExpression = 'neutral',
  heldProp: 'none' | 'lens' | 'jar' = 'none'
): MeeraPose {
  const yaw = view === 'front' || view === 'back' ? 0 : view === 'threeQuarter' ? 0.5 : 1.0;
  const e = getExpressionParams(expr);
  return {
    worldX: 0,
    worldY: 0,
    pelvisY: -124,
    pelvisTiltDeg: view === 'threeQuarter' ? -1.5 : 0,
    pelvisYaw: yaw,
    spineLeanDeg: view === 'threeQuarter' ? 2 : 0,
    chestBendDeg: 0,
    torsoYaw: yaw,
    shoulderElevateY: 0,
    shoulderTwistDeg: 0,
    kurtiSwayDeg: 0,
    neckPitchDeg: 0,
    headRollDeg: expr === 'curious' ? 5 : expr === 'confused' ? -6 : 0,
    headYaw: yaw,
    headPitch: 0,
    isBackView: view === 'back',
    eyeLookX: view === 'profile' ? 1.8 : 0.6,
    eyeLookY: 0,
    blinkAmount: 0,
    ...e,
    leftShoulderDeg: 7,
    leftElbowDeg: -12,
    leftWristDeg: 4,
    rightShoulderDeg: -7,
    rightElbowDeg: -16,
    rightWristDeg: -4,
    heldProp,
    leftHipDeg: 2,
    leftKneeDeg: 3,
    leftAnkleDeg: -2,
    rightHipDeg: -2,
    rightKneeDeg: 3,
    rightAnkleDeg: -2,
  };
}

function lerpView(yaw: number, front: number, threeQ: number, profile: number): number {
  const y = Math.max(0, Math.min(1, yaw));
  if (y <= 0.5) {
    return front + (threeQ - front) * (y / 0.5);
  }
  return threeQ + (profile - threeQ) * ((y - 0.5) / 0.5);
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);
const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1);

/**
 * Computes Meera's coordinated performance for either the 4s test or the 50s film.
 * Acts:
 * 1) 0-480f (0-8s): Walks along sunlit meadow path, pauses as bee buzzes past, turns curiously
 * 2) 480-1080f (8-18s): Kneels/leans forward with magnifying lens to observe bee pollinating flower
 * 3) 1800-2520f (30-42s): Watches hive observation window with delighted/relieved wonder
 * 4) 2520-3000f (42-50s): Holds golden honey jar in golden-hour orchard
 */
export function useMeeraFilmPerformance(frame: number, isTestMode = false): MeeraPose {
  const walkStart = isTestMode ? 0 : 40;
  const walkEnd = isTestMode ? 96 : 240;
  const noticeFrame = isTestMode ? 96 : 242;
  const turnFrame = isTestMode ? 112 : 265;
  const inspectFrame = isTestMode ? 160 : 340;

  const startX = isTestMode ? -210 : -360;
  const stopX = isTestMode ? -45 : -90;

  // 1. Grounded stride-locked walk
  const walkDur = Math.max(1, walkEnd - walkStart);
  const walkProg = clamp((frame - walkStart) / walkDur, 0, 1);
  const easedWalk = Easing.bezier(0.28, 0.05, 0.72, 0.95)(walkProg);
  const walkBlend =
    frame <= walkStart
      ? 0
      : interpolate(frame, [walkStart, walkStart + 14, walkEnd - 20, walkEnd], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: EASE_IN_OUT,
        });

  const walkDist = stopX - startX;
  const strideLen = 104;
  const walkPhase = easedWalk * (walkDist / strideLen) * Math.PI * 2;
  const strideSin = Math.sin(walkPhase) * walkBlend;
  const strideCos = Math.cos(walkPhase) * walkBlend;

  const worldX = frame < walkEnd ? startX + walkDist * easedWalk : stopX;

  // 2. Legs (stride + lean-in stance)
  const rightLift = Math.max(0, strideCos) * walkBlend;
  const leftLift = Math.max(0, -strideCos) * walkBlend;

  let leftHipDeg = strideSin * 25;
  let leftKneeDeg = leftLift * 44 + Math.max(0, -strideSin) * 8 * walkBlend;
  let leftAnkleDeg = -strideSin * 9 + leftLift * 14 - Math.max(0, -strideSin) * 12 * walkBlend;

  let rightHipDeg = -strideSin * 25;
  let rightKneeDeg = rightLift * 44 + Math.max(0, strideSin) * 8 * walkBlend;
  let rightAnkleDeg = strideSin * 9 + rightLift * 14 - Math.max(0, strideSin) * 12 * walkBlend;

  // Curious lean-in crouch around inspectFrame (and Act 2)
  const inspectBlend = interpolate(
    frame,
    [inspectFrame, inspectFrame + 36, isTestMode ? 240 : 600, isTestMode ? 260 : 660],
    [0, 1, 1, 0.25],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  if (frame >= walkEnd) {
    leftHipDeg += -10 * inspectBlend;
    leftKneeDeg += 18 * inspectBlend;
    leftAnkleDeg += -8 * inspectBlend;
    rightHipDeg += 12 * inspectBlend;
    rightKneeDeg += 14 * inspectBlend;
    rightAnkleDeg += -10 * inspectBlend;
  }

  // 3. Pelvis & Torso counter-rotation + S-spine curvature
  const idleWeight = 1 - walkBlend;
  const breath = Math.sin(frame * 0.055) * idleWeight;
  const pelvisBob = -Math.abs(strideCos) * 6 * walkBlend + Math.abs(strideSin) * 2.2 * walkBlend;
  const pelvisY = -124 + pelvisBob + inspectBlend * 8 + breath * 1.1;
  const pelvisTiltDeg = strideSin * 3.5 + inspectBlend * -2.5;

  const baseYaw = 0.85;
  const pelvisReactionYaw = interpolate(
    frame,
    [turnFrame + 10, turnFrame + 44, isTestMode ? 240 : 2520, isTestMode ? 260 : 2600],
    [baseYaw, 0.52, 0.52, 0.32],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const pelvisYaw = clamp(pelvisReactionYaw - strideSin * 0.14, 0.05, 1.0);

  const torsoReactionYaw = interpolate(
    frame,
    [turnFrame + 5, turnFrame + 38, isTestMode ? 240 : 2520, isTestMode ? 260 : 2600],
    [baseYaw, 0.42, 0.42, 0.22],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const torsoYaw = clamp(torsoReactionYaw + strideSin * 0.16, 0.05, 1.0);

  const spineLeanDeg = 3.8 * walkBlend + inspectBlend * 14.0 - (frame >= 2520 ? 11 : 0);
  const chestBendDeg = breath * 1.0 - strideCos * 1.5 * walkBlend + inspectBlend * 4.0;
  const shoulderElevateY = -breath * 0.6 - inspectBlend * 1.5;
  const shoulderTwistDeg = strideSin * 4.5;
  const kurtiSwayDeg = -strideSin * 3.5 + inspectBlend * -4;

  // 4. Eyes lead -> Head turn -> Neck follow
  const eyeLookX = interpolate(
    frame,
    [noticeFrame, noticeFrame + 14, inspectFrame + 20],
    [0.5, 3.2, 2.8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const eyeLookY = interpolate(
    frame,
    [noticeFrame, noticeFrame + 16, inspectFrame + 20],
    [0, -1.8, 2.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );

  const headYaw = interpolate(
    frame,
    [turnFrame, turnFrame + 28, isTestMode ? 240 : 2520, isTestMode ? 260 : 2590],
    [0.86, 0.36, 0.36, 0.18],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const headPitch = interpolate(
    frame,
    [noticeFrame, noticeFrame + 20, inspectFrame, inspectFrame + 32, isTestMode ? 240 : 2520, isTestMode ? 260 : 2600],
    [0, -0.18, 0.05, 0.38, 0.38, 0.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
  );
  const headRollDeg =
    -walkLeanCounter(walkBlend, 3.8) +
    interpolate(
      frame,
      [turnFrame + 6, turnFrame + 32, inspectFrame + 30],
      [0, 6.5, 4.0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT }
    );
  const neckPitchDeg = headPitch * 12 - spineLeanDeg * 0.35;

  // Blinks
  const blinkFrames = [48, 124, 210, 315, 450, 620, 2620, 2810];
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

  // Facial expressions evolving across story beats
  const curiousAmount = interpolate(frame, [noticeFrame, turnFrame + 22, inspectFrame + 40], [0, 0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_OUT,
  });
  const happyFinale = isTestMode
    ? 0
    : interpolate(frame, [2520, 2600], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: EASE_OUT,
      });

  const eyeWiden = curiousAmount * 0.32 - happyFinale * 0.15;
  const browLiftL = curiousAmount * 2.0 + happyFinale * 1.2;
  const browLiftR = curiousAmount * 3.2 + happyFinale * 1.2;
  const browFurrow = curiousAmount * 0.08;
  const mouthCurve = 0.28 + curiousAmount * 0.25 + happyFinale * 0.55;
  const mouthOpen = interpolate(frame, [turnFrame + 10, turnFrame + 24, turnFrame + 44], [0, 0.28, 0.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT,
  });

  // 5. Arms (natural swing -> raising magnifying lens -> holding honey jar in Act 5)
  const armLag = Math.sin(walkPhase - 0.35) * walkBlend;
  const wristLag = Math.sin(walkPhase - 0.75) * walkBlend;

  const heldProp: 'none' | 'lens' | 'jar' =
    !isTestMode && frame >= 2500 ? 'jar' : frame >= inspectFrame - 10 ? 'lens' : 'none';

  const leftShoulderDeg = -strideSin * 18 + inspectBlend * 14 + happyFinale * -12;
  const leftElbowDeg = -14 - Math.max(0, armLag * 14) - inspectBlend * 22;
  const leftWristDeg = -wristLag * 8;

  const rightShoulderDeg = strideSin * 18 - inspectBlend * 38 - happyFinale * 24;
  const rightElbowDeg = -16 - Math.max(0, -armLag * 14) - inspectBlend * 52 - happyFinale * 46;
  const rightWristDeg = wristLag * 8 + inspectBlend * 12;

  return {
    worldX,
    worldY: 254,
    pelvisY,
    pelvisTiltDeg,
    pelvisYaw,
    spineLeanDeg,
    chestBendDeg,
    torsoYaw,
    shoulderElevateY,
    shoulderTwistDeg,
    kurtiSwayDeg,
    neckPitchDeg,
    headRollDeg,
    headYaw,
    headPitch,
    eyeLookX,
    eyeLookY,
    blinkAmount,
    eyeWiden,
    browLiftL,
    browLiftR,
    browFurrow,
    mouthCurve,
    mouthOpen,
    leftShoulderDeg,
    leftElbowDeg,
    leftWristDeg,
    rightShoulderDeg,
    rightElbowDeg,
    rightWristDeg,
    heldProp,
    leftHipDeg,
    leftKneeDeg,
    leftAnkleDeg,
    rightHipDeg,
    rightKneeDeg,
    rightAnkleDeg,
  };
}

function walkLeanCounter(walkBlend: number, lean: number): number {
  return walkBlend * lean * 0.5;
}

/**
 * Organically proportioned hierarchical SVG character rig ("Meera").
 * Supports Front (0.0), Three-Quarter (0.5), Side Profile (1.0), and Back views
 * with sloping shoulders, sculpted ribcage/waist/pelvis, S-spine, tapered limbs,
 * and expressive facial acting.
 */
export const MeeraRig: React.FC<{ pose: MeeraPose }> = ({ pose }) => {
  const {
    pelvisY,
    pelvisTiltDeg,
    pelvisYaw,
    spineLeanDeg,
    chestBendDeg,
    torsoYaw,
    shoulderElevateY,
    shoulderTwistDeg,
    kurtiSwayDeg,
    neckPitchDeg,
    headRollDeg,
    headYaw,
    headPitch,
    isBackView = false,
    eyeLookX,
    eyeLookY,
    blinkAmount,
    eyeWiden,
    browLiftL,
    browLiftR,
    browFurrow,
    mouthCurve,
    mouthOpen,
    leftShoulderDeg,
    leftElbowDeg,
    leftWristDeg,
    rightShoulderDeg,
    rightElbowDeg,
    rightWristDeg,
    heldProp = 'none',
    leftHipDeg,
    leftKneeDeg,
    leftAnkleDeg,
    rightHipDeg,
    rightKneeDeg,
    rightAnkleDeg,
  } = pose;

  // Pelvis hip sockets
  const leftHipX = lerpView(pelvisYaw, -10.5, -6.5, -3);
  const rightHipX = lerpView(pelvisYaw, 10.5, 6.5, 3);

  // Organic sloping shoulders, ribcage, tapered waist, and flared kurti hem
  const shoulderLeftX = lerpView(torsoYaw, -22, -14, -2);
  const shoulderRightX = lerpView(torsoYaw, 22, 14, 2);
  const bustLeftX = lerpView(torsoYaw, -20, -17, -13);
  const bustRightX = lerpView(torsoYaw, 20, 19, 15);
  const waistLeftX = lerpView(torsoYaw, -14.5, -13, -10.5);
  const waistRightX = lerpView(torsoYaw, 14.5, 13.5, 10.5);
  const hipHemLeftX = lerpView(torsoYaw, -21, -18, -14);
  const hipHemRightX = lerpView(torsoYaw, 21, 18.5, 14.5);
  const vestCenterX = lerpView(torsoYaw, 0, 8, 12);

  // Head multi-view contours (Front 0.0 -> 3/4 0.5 -> Profile 1.0)
  const pitchY = headPitch * 9.0;
  const backSkullX = lerpView(headYaw, -20, -21, -22);
  const foreheadX = lerpView(headYaw, 20, 19.5, 18);
  const browRidgeX = lerpView(headYaw, 20, 19, 19.5);
  const chinX = lerpView(headYaw, 0, 9.5, 15);
  const jawBackX = lerpView(headYaw, -16, -15, -12.5);

  const headPath = [
    `M ${backSkullX.toFixed(1)} -27`,
    `Q ${(backSkullX - 1.5).toFixed(1)} -56 ${lerpView(headYaw, 0, -2, -4).toFixed(1)} -58`,
    `Q ${browRidgeX.toFixed(1)} -58 ${foreheadX.toFixed(1)} ${(-37 + pitchY * 0.2).toFixed(1)}`,
    `L ${lerpView(headYaw, foreheadX, 19.5, 24.5).toFixed(1)} ${(-27 + pitchY * 0.55).toFixed(1)}`,
    `Q ${lerpView(headYaw, foreheadX, 18, 19.5).toFixed(1)} ${(-21 + pitchY * 0.6).toFixed(1)} ${lerpView(
      headYaw,
      18,
      16,
      17.5
    ).toFixed(1)} ${(-13 + pitchY * 0.65).toFixed(1)}`,
    `Q ${chinX.toFixed(1)} ${(3 + pitchY * 0.45).toFixed(1)} ${lerpView(headYaw, 0, 1.5, 0).toFixed(
      1
    )} ${(5 + pitchY * 0.35).toFixed(1)}`,
    `Q ${jawBackX.toFixed(1)} 3 ${backSkullX.toFixed(1)} -27 Z`,
  ].join(' ');

  // Flowing hair & side-swept bangs
  const hairCrownPath = [
    `M ${(backSkullX - 3).toFixed(1)} -15`,
    `Q ${(backSkullX - 5).toFixed(1)} -61 ${lerpView(headYaw, 0, -2, -4).toFixed(1)} -63`,
    `Q ${(foreheadX + 3.5).toFixed(1)} -62 ${(foreheadX + 1.5).toFixed(1)} -39`,
    `Q ${lerpView(headYaw, 10, 11, 9).toFixed(1)} -47 ${lerpView(headYaw, 0, 1, -2).toFixed(1)} -43`,
    `Q ${lerpView(headYaw, -13, -12, -13).toFixed(1)} -40 ${lerpView(headYaw, -16, -15, -14).toFixed(
      1
    )} -23`,
    `Q ${(backSkullX - 1).toFixed(1)} -10 ${(backSkullX - 3).toFixed(1)} -15 Z`,
  ].join(' ');

  // Braid resting behind neck/shoulder
  const braidX = isBackView ? 0 : lerpView(headYaw, -14, -18, -20);

  // Eyes (strictly non-crossing across Front -> 3/4 -> Profile)
  const eyeY = -35 + pitchY * 0.85;
  const nearEyeX = lerpView(headYaw, -8.5, 1.5, 9.5);
  const farEyeX = lerpView(headYaw, 8.5, 13.5, 16.5);
  const farEyeOpacity = isBackView ? 0 : clamp(1 - (headYaw - 0.68) / 0.18, 0, 1);
  const nearEyeRx = lerpView(headYaw, 4.4, 4.2, 3.3);
  const farEyeRx = lerpView(headYaw, 4.4, 3.2, 1.9);
  const eyeRy = Math.max(0.6, (3.6 + eyeWiden * 1.1) * (1 - blinkAmount * 0.92));

  const noseBridgeX = lerpView(headYaw, 0, 8.5, 19.5);
  const noseTipX = lerpView(headYaw, 0, 11.5, 25);

  const mouthX = lerpView(headYaw, 0, 9, 15.5);
  const mouthY = eyeY + 18.5;
  const mouthHalfW = lerpView(headYaw, 5.8, 4.8, 3.2);
  const earX = lerpView(headYaw, -19.5, -15, -8.5);

  return (
    <svg
      width={360}
      height={420}
      viewBox="-180 -340 360 420"
      style={{ position: 'absolute', left: -180, top: -340, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="meeraKurti" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E67D55" />
          <stop offset="65%" stopColor="#CC5E37" />
          <stop offset="100%" stopColor="#A64624" />
        </linearGradient>
        <linearGradient id="meeraVest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6D825D" />
          <stop offset="100%" stopColor="#4B5C3F" />
        </linearGradient>
        <linearGradient id="meeraTrouser" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F0E8D8" />
          <stop offset="100%" stopColor="#D6CBB8" />
        </linearGradient>
      </defs>

      {/* Soft sunlit ground contact shadow */}
      <ellipse cx="0" cy="4" rx="40" ry="7" fill="#3B2E1E" opacity="0.34" />

      {/* ROOT -> PELVIS */}
      <g transform={`translate(0, ${pelvisY.toFixed(2)}) rotate(${pelvisTiltDeg.toFixed(2)})`}>
        {/* LEFT LEG (Back) */}
        <g transform={`translate(${leftHipX.toFixed(1)}, 0) rotate(${leftHipDeg.toFixed(2)})`}>
          <circle cx="0" cy="0" r="9.5" fill="#CEC3B0" />
          {/* Curved thigh (quad + hamstring) */}
          <path d="M-9.5 0 Q-11.5 26 -7 54 L7 54 Q10.5 26 9.5 0 Z" fill="#CEC3B0" />
          {/* Knee */}
          <g transform={`translate(0, 54) rotate(${leftKneeDeg.toFixed(2)})`}>
            <circle cx="0" cy="0" r="7" fill="#C6BA9F" />
            {/* Curved calf */}
            <path d="M-7 0 Q-9.5 18 -5.2 54 L4.8 54 Q8.5 20 7 0 Z" fill="#C6BA9F" />
            {/* Ankle -> Sandal */}
            <g transform={`translate(0, 54) rotate(${leftAnkleDeg.toFixed(2)})`}>
              <circle cx="0" cy="0" r="4.5" fill="#B88362" />
              <path d="M-7.5 2 Q0 0 10 3 L19 7 Q21 10 18 11.5 L-8 11.5 Z" fill="#6E472D" />
              <path d="M-4 1 L4 1 L9 6 L-4 6 Z" fill="#B88362" opacity="0.85" />
            </g>
          </g>
        </g>

        {/* RIGHT LEG (Front) */}
        <g transform={`translate(${rightHipX.toFixed(1)}, 0) rotate(${rightHipDeg.toFixed(2)})`}>
          <circle cx="0" cy="0" r="10.2" fill="#E6DCCB" />
          <path d="M-10.2 0 Q-12 26 -7.5 54 L7.5 54 Q11.5 26 10.2 0 Z" fill="url(#meeraTrouser)" />
          {/* Knee */}
          <g transform={`translate(0, 54) rotate(${rightKneeDeg.toFixed(2)})`}>
            <circle cx="0" cy="0" r="7.5" fill="#E3D9C7" />
            <path d="M-7.5 0 Q-10 18 -5.5 54 L5 54 Q9 20 7.5 0 Z" fill="#E3D9C7" />
            {/* Ankle -> Sandal */}
            <g transform={`translate(0, 54) rotate(${rightAnkleDeg.toFixed(2)})`}>
              <circle cx="0" cy="0" r="4.8" fill="#C8916F" />
              <path d="M-8 2 Q0 0 11 3 L20.5 7 Q22.5 10 19.5 11.5 L-8.5 11.5 Z" fill="#7D5235" />
              <path d="M-4 1 L5 1 L10 6 L-4 6 Z" fill="#C8916F" opacity="0.9" />
            </g>
          </g>
        </g>

        {/* KURTI LOWER SKIRT HEM (organic flare swaying with hip) */}
        <g transform={`rotate(${kurtiSwayDeg.toFixed(2)})`}>
          <path
            d={`M ${waistLeftX.toFixed(1)} -22 Q ${(hipHemLeftX - 2).toFixed(1)} -4 ${hipHemLeftX.toFixed(
              1
            )} 18 Q 0 22 ${hipHemRightX.toFixed(1)} 18 Q ${(hipHemRightX + 2).toFixed(
              1
            )} -4 ${waistRightX.toFixed(1)} -22 Z`}
            fill="url(#meeraKurti)"
          />
          <path
            d={`M ${hipHemLeftX.toFixed(1)} 15 Q 0 19 ${hipHemRightX.toFixed(1)} 15`}
            stroke="#F2C679"
            strokeWidth="2.0"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* TORSO / SPINE (Pelvis child) */}
        <g transform={`translate(0, -10) rotate(${spineLeanDeg.toFixed(2)})`}>
          {/* CHEST / RIBCAGE */}
          <g transform={`translate(0, ${shoulderElevateY.toFixed(2)}) rotate(${chestBendDeg.toFixed(2)})`}>
            {/* LEFT ARM (Back) */}
            <g
              transform={`translate(${shoulderLeftX.toFixed(1)}, -68) rotate(${(
                leftShoulderDeg + shoulderTwistDeg
              ).toFixed(2)})`}
            >
              <circle cx="0" cy="0" r="6.8" fill="#B54F2B" />
              <path d="M-6.8 0 Q-8 20 -5.2 40 L5.2 40 Q6.8 20 6.8 0 Z" fill="#B54F2B" />
              {/* Elbow */}
              <g transform={`translate(0, 39) rotate(${leftElbowDeg.toFixed(2)})`}>
                <circle cx="0" cy="0" r="5.0" fill="#BC8664" />
                <path d="M-5 0 Q-5.5 16 -3.8 32 L3.8 32 Q5 16 5 0 Z" fill="#BC8664" />
                {/* Wrist -> Hand */}
                <g transform={`translate(0, 32) rotate(${leftWristDeg.toFixed(2)})`}>
                  <circle cx="0" cy="0" r="3.2" fill="#BC8664" />
                  <path d="M-3.5 0 L3.5 0 L4.8 7 Q2 12 -3 10 Q-4.5 6 -3.5 0 Z" fill="#BC8664" />
                </g>
              </g>
            </g>

            {/* SCULPTED RIBCAGE + SLOPING SHOULDERS + WAIST */}
            <path
              d={`M ${lerpView(torsoYaw, -9, -7, -5).toFixed(1)} -78 Q ${(
                shoulderLeftX - 2
              ).toFixed(1)} -76 ${bustLeftX.toFixed(1)} -56 Q ${(waistLeftX - 1).toFixed(
                1
              )} -32 ${waistLeftX.toFixed(1)} -10 L ${waistRightX.toFixed(1)} -10 Q ${(
                waistRightX + 1
              ).toFixed(1)} -32 ${bustRightX.toFixed(1)} -56 Q ${(shoulderRightX + 2).toFixed(
                1
              )} -76 ${lerpView(torsoYaw, 9, 8, 6).toFixed(1)} -78 Z`}
              fill="url(#meeraKurti)"
            />

            {/* OLIVE UTILITY VEST (wraps ribcage, changes across front/3/4/profile/back) */}
            <path
              d={`M ${lerpView(torsoYaw, -12, -10, -7).toFixed(1)} -75 L ${bustLeftX.toFixed(
                1
              )} -54 L ${waistLeftX.toFixed(1)} -14 L ${waistRightX.toFixed(
                1
              )} -14 L ${bustRightX.toFixed(1)} -54 L ${lerpView(torsoYaw, 12, 10, 7).toFixed(
                1
              )} -75 Q ${vestCenterX.toFixed(1)} ${isBackView ? -72 : -52} ${lerpView(
                torsoYaw,
                -12,
                -10,
                -7
              ).toFixed(1)} -75 Z`}
              fill="url(#meeraVest)"
              opacity="0.94"
            />
            {!isBackView && (
              <line
                x1={vestCenterX.toFixed(1)}
                y1="-52"
                x2={vestCenterX.toFixed(1)}
                y2="-14"
                stroke="#3A4730"
                strokeWidth="1.8"
              />
            )}

            {/* NECK PIVOT */}
            <g
              transform={`translate(${lerpView(torsoYaw, 0, 1.5, 2).toFixed(1)}, -77) rotate(${neckPitchDeg.toFixed(
                2
              )})`}
            >
              <path d="M-6.5 -18 L6.5 -18 L7.5 3 L-7.5 3 Z" fill="#BC8664" />

              {/* HEAD PIVOT */}
              <g transform={`translate(0, -14) rotate(${headRollDeg.toFixed(2)})`}>
                {/* Braided Hair (falls behind head/neck, or centered in back view) */}
                <path
                  d={`M ${braidX.toFixed(1)} -22 Q ${(braidX - 7).toFixed(1)} -4 ${(braidX - 5).toFixed(
                    1
                  )} 18 Q ${(braidX - 2).toFixed(1)} 28 ${(braidX + 1).toFixed(1)} 34 Q ${(
                    braidX + 4
                  ).toFixed(1)} 22 ${(braidX + 3).toFixed(1)} -2 Z`}
                  fill="#1C1B22"
                />
                {/* Wooden hair tie */}
                <ellipse
                  cx={(braidX - 2).toFixed(1)}
                  cy="24"
                  rx="3.2"
                  ry="2.2"
                  fill="#D99B52"
                />

                {!isBackView && (
                  <>
                    {/* Cranium & jaw */}
                    <path d={headPath} fill="#CE9673" />
                    {/* Subtle warm cheek/jaw shadow */}
                    <path
                      d={`M ${jawBackX.toFixed(1)} -9 Q ${lerpView(headYaw, 0, 4, 5).toFixed(1)} ${(
                        2 +
                        pitchY * 0.35
                      ).toFixed(1)} ${chinX.toFixed(1)} ${(0 + pitchY * 0.35).toFixed(1)} Q 0 6 ${jawBackX.toFixed(
                        1
                      )} -2 Z`}
                      fill="#B67B5A"
                      opacity="0.38"
                    />
                    {/* Ear */}
                    <ellipse
                      cx={earX.toFixed(1)}
                      cy={(-20 + pitchY * 0.35).toFixed(1)}
                      rx="4"
                      ry="6.5"
                      fill="#BE8462"
                    />
                  </>
                )}

                {/* Hair Crown (or full back of head if isBackView) */}
                {isBackView ? (
                  <path
                    d="M-21 -26 Q-22 -61 0 -62 Q22 -61 21 -26 Q18 -6 0 -5 Q-18 -6 -21 -26 Z"
                    fill="#1C1B22"
                  />
                ) : (
                  <path d={hairCrownPath} fill="#1C1B22" />
                )}

                {/* Wooden hairpin accent */}
                <line
                  x1={(isBackView ? -10 : backSkullX + 6).toFixed(1)}
                  y1="-44"
                  x2={(isBackView ? 12 : backSkullX + 14).toFixed(1)}
                  y2="-52"
                  stroke="#DDA15E"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />

                {!isBackView && (
                  <>
                    {/* Far Eye */}
                    {farEyeOpacity > 0.04 && (
                      <g
                        transform={`translate(${farEyeX.toFixed(1)}, ${eyeY.toFixed(1)})`}
                        opacity={farEyeOpacity}
                      >
                        <ellipse cx="0" cy="0" rx={farEyeRx.toFixed(2)} ry={eyeRy} fill="#FAF7F2" />
                        {blinkAmount < 0.8 && (
                          <circle
                            cx={clamp(eyeLookX * 0.42, -1.2, 1.8)}
                            cy={clamp(eyeLookY * 0.42, -1.2, 1.6)}
                            r="1.9"
                            fill="#2B211B"
                          />
                        )}
                        <path
                          d={`M ${(-farEyeRx).toFixed(1)} ${(-eyeRy * 0.85).toFixed(1)} Q 0 ${(
                            -eyeRy * 1.25
                          ).toFixed(1)} ${farEyeRx.toFixed(1)} ${(-eyeRy * 0.7).toFixed(1)}`}
                          stroke="#261C16"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </g>
                    )}

                    {/* Near Eye */}
                    <g transform={`translate(${nearEyeX.toFixed(1)}, ${eyeY.toFixed(1)})`}>
                      <ellipse cx="0" cy="0" rx={nearEyeRx.toFixed(2)} ry={eyeRy} fill="#FAF7F2" />
                      {blinkAmount < 0.8 && (
                        <>
                          <circle
                            cx={clamp(eyeLookX * 0.5, -1.5, 2.0)}
                            cy={clamp(eyeLookY * 0.5, -1.4, 1.8)}
                            r="2.2"
                            fill="#2B211B"
                          />
                          <circle
                            cx={clamp(eyeLookX * 0.5, -1.5, 2.0) + 0.7}
                            cy={clamp(eyeLookY * 0.5, -1.4, 1.8) - 0.7}
                            r="0.7"
                            fill="#FFFFFF"
                            opacity="0.9"
                          />
                        </>
                      )}
                      <path
                        d={`M ${(-nearEyeRx - 0.3).toFixed(1)} ${(-eyeRy * 0.85).toFixed(1)} Q 0 ${(
                          -eyeRy * 1.25
                        ).toFixed(1)} ${(nearEyeRx + 0.4).toFixed(1)} ${(-eyeRy * 0.7).toFixed(1)}`}
                        stroke="#261C16"
                        strokeWidth="1.7"
                        fill="none"
                      />
                    </g>

                    {/* Expressive Eyebrows */}
                    <path
                      d={`M ${(nearEyeX - 4.3).toFixed(1)} ${(
                        eyeY -
                        7 -
                        browLiftL +
                        browFurrow * 1.1
                      ).toFixed(1)} Q ${nearEyeX.toFixed(1)} ${(eyeY - 10 - browLiftL).toFixed(1)} ${(
                        nearEyeX + 4.5
                      ).toFixed(1)} ${(eyeY - 7 - browLiftL + browFurrow * 2.4).toFixed(1)}`}
                      stroke="#1E1818"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {farEyeOpacity > 0.04 && (
                      <path
                        d={`M ${(farEyeX - 3.4).toFixed(1)} ${(
                          eyeY -
                          7 -
                          browLiftR +
                          browFurrow * 2.3
                        ).toFixed(1)} Q ${farEyeX.toFixed(1)} ${(eyeY - 10 - browLiftR).toFixed(
                          1
                        )} ${(farEyeX + 3.4).toFixed(1)} ${(
                          eyeY -
                          7 -
                          browLiftR +
                          browFurrow * 0.9
                        ).toFixed(1)}`}
                        stroke="#1E1818"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        fill="none"
                        opacity={farEyeOpacity}
                      />
                    )}

                    {/* Nose */}
                    {headYaw < 0.85 && (
                      <path
                        d={`M ${(noseBridgeX - 1.2).toFixed(1)} ${(eyeY + 1.5).toFixed(1)} L ${noseTipX.toFixed(
                          1
                        )} ${(eyeY + 9.5).toFixed(1)} L ${(noseTipX - 3).toFixed(1)} ${(
                          eyeY + 11.2
                        ).toFixed(1)}`}
                        stroke="#A86D4E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        opacity={clamp(1 - (headYaw - 0.5) / 0.4, 0.25, 1)}
                      />
                    )}

                    {/* Expressive Mouth */}
                    {mouthOpen > 0.22 ? (
                      <ellipse
                        cx={mouthX.toFixed(1)}
                        cy={mouthY.toFixed(1)}
                        rx={(mouthHalfW * 0.55 + mouthOpen * 1.1).toFixed(2)}
                        ry={(1.1 + mouthOpen * 2.3).toFixed(2)}
                        fill="#7A3832"
                      />
                    ) : (
                      <path
                        d={`M ${(mouthX - mouthHalfW).toFixed(1)} ${mouthY.toFixed(1)} Q ${mouthX.toFixed(
                          1
                        )} ${(mouthY + mouthCurve * 4.0).toFixed(1)} ${(mouthX + mouthHalfW).toFixed(
                          1
                        )} ${mouthY.toFixed(1)}`}
                        stroke="#7E3D35"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        fill="none"
                      />
                    )}
                  </>
                )}
              </g>
            </g>

            {/* RIGHT ARM (Front) */}
            <g
              transform={`translate(${shoulderRightX.toFixed(1)}, -68) rotate(${(
                rightShoulderDeg - shoulderTwistDeg
              ).toFixed(2)})`}
            >
              <circle cx="0" cy="0" r="7.5" fill="#DF724B" />
              <path d="M-7.5 0 Q-8.8 20 -5.8 40 L5.8 40 Q7.5 20 7.5 0 Z" fill="#DF724B" />
              {/* Rolled linen cuff */}
              <rect x="-6.2" y="36" width="12.4" height="4.5" rx="1.6" fill="#B54F2B" />
              {/* Elbow */}
              <g transform={`translate(0, 40) rotate(${rightElbowDeg.toFixed(2)})`}>
                <circle cx="0" cy="0" r="5.5" fill="#CE9673" />
                <path d="M-5.5 0 Q-6 16 -4.2 32 L4.2 32 Q5.5 16 5.5 0 Z" fill="#CE9673" />
                {/* Wrist -> Articulated Hand + Optional Prop */}
                <g transform={`translate(0, 32) rotate(${rightWristDeg.toFixed(2)})`}>
                  <circle cx="0" cy="0" r="3.4" fill="#CE9673" />
                  <path
                    d="M-3.8 0 L3.8 0 L5.2 6.5 Q5.8 10.5 1.8 12 Q-2.8 12 -4 8.5 Q-6.2 6.5 -3.8 0 Z"
                    fill="#CE9673"
                  />
                  {heldProp === 'lens' && (
                    <g transform="translate(4, 8) rotate(-30)">
                      <rect x="-2" y="0" width="4" height="16" rx="1.5" fill="#6E472B" />
                      <circle cx="0" cy="-11" r="11" fill="#DDF4F7" fillOpacity="0.45" stroke="#8C5E3C" strokeWidth="2.8" />
                      <path d="M-5 -15 Q-2 -18 3 -16" stroke="#FFFFFF" strokeWidth="1.6" fill="none" opacity="0.8" />
                    </g>
                  )}
                  {heldProp === 'jar' && (
                    <g transform="translate(2, 6) rotate(12)">
                      <rect x="-11" y="-22" width="22" height="26" rx="6" fill="#F2A92C" fillOpacity="0.88" stroke="#FCE5B0" strokeWidth="1.8" />
                      <rect x="-9" y="-27" width="18" height="6" rx="2" fill="#8C5E3C" />
                      <path d="M-6 -16 L-6 0" stroke="#FFF4D1" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
                    </g>
                  )}
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
