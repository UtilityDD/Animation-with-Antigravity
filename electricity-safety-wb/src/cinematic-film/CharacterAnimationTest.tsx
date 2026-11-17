import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CameraKeyframe, CameraStage, DepthNode, EASE_CINEMATIC, interpolateCamera } from './Scene25D';
import {
  DistantMistyHills,
  DistantVillageSkyline,
  FarMidgroundStreet,
  ForegroundFoliageAndCulvert,
  HeroUtilityPole,
  MonsoonRainOverlay,
  MonsoonSkyBackdrop,
  SnappedWirePuddleArc,
  WetRoadwayPlane,
} from './EnvironmentAssets';
import { ArjunRig, TEST_TIMELINE, computeArjunPose } from './CharacterRig';

/**
 * Dedicated 4.5-second (270 frames @ 60fps) character animation test
 * inside the actual environment, focused purely on evaluating:
 * - Side-to-three-quarter head turn & pitch
 * - Independent torso rotation & inclination
 * - Shoulder & pelvis counter-rotation
 * - Grounded walking gait & backward step weight transfer
 */
export const CharacterAnimationTest: React.FC = () => {
  const frame = useCurrentFrame();
  const pose = computeArjunPose(frame, TEST_TIMELINE);

  const arcIntensity = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.28));

  const cameraKeyframes: CameraKeyframe[] = [
    { frame: 0, state: { x: -245, y: 128, z: 365, zoom: 1.48, roll: 0 } },
    {
      frame: 95,
      state: { x: -105, y: 128, z: 365, zoom: 1.48, roll: 0 },
      easing: EASE_CINEMATIC,
    },
    {
      frame: 160,
      state: { x: -110, y: 118, z: 395, zoom: 1.54, roll: 0 },
      easing: EASE_CINEMATIC,
    },
    {
      frame: 270,
      state: { x: -175, y: 126, z: 345, zoom: 1.44, roll: 0 },
      easing: EASE_CINEMATIC,
    },
  ];

  const camera = interpolateCamera(frame, cameraKeyframes);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F1826', overflow: 'hidden' }}>
      <MonsoonSkyBackdrop lightningIntensity={0} />

      <CameraStage camera={camera}>
        <DepthNode worldX={0} worldY={230} worldZ={1650} camera={camera}>
          <DistantMistyHills />
        </DepthNode>
        <DepthNode worldX={0} worldY={230} worldZ={1350} camera={camera}>
          <DistantVillageSkyline />
        </DepthNode>
        <DepthNode worldX={0} worldY={252} worldZ={620} camera={camera}>
          <FarMidgroundStreet />
        </DepthNode>
        <DepthNode worldX={330} worldY={265} worldZ={80} camera={camera}>
          <HeroUtilityPole frame={frame} />
        </DepthNode>
        <DepthNode worldX={0} worldY={250} worldZ={40} camera={camera}>
          <WetRoadwayPlane arcIntensity={arcIntensity} showHazardZone={0} />
        </DepthNode>
        <DepthNode worldX={250} worldY={306} worldZ={38} camera={camera}>
          <SnappedWirePuddleArc frame={frame} arcIntensity={arcIntensity} />
        </DepthNode>

        {/* Hero Character: Arjun */}
        <DepthNode worldX={pose.worldX} worldY={286} worldZ={0} camera={camera}>
          <ArjunRig pose={pose} />
        </DepthNode>

        <DepthNode worldX={565} worldY={388} worldZ={-310} camera={camera} blurPx={1.1}>
          <ForegroundFoliageAndCulvert frame={frame} variant="right-bollard" />
        </DepthNode>
        <DepthNode worldX={-585} worldY={392} worldZ={-295} camera={camera} blurPx={1.2}>
          <ForegroundFoliageAndCulvert frame={frame} variant="left-shrub" />
        </DepthNode>
      </CameraStage>

      <MonsoonRainOverlay frame={frame} density={0.8} />
    </AbsoluteFill>
  );
};
