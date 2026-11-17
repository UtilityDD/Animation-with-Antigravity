import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { FontInjector } from '../kinetic-master/FontInjector';
import {
  CameraKeyframe,
  CameraStage,
  DepthNode,
  EASE_CINEMATIC,
  EASE_IN_OUT,
  EASE_WHIP,
  interpolateCamera,
} from './Scene25D';
import {
  DistantMistyHills,
  DistantVillageSkyline,
  ExtremeForegroundEdge,
  FarMidgroundStreet,
  ForegroundFoliageAndCulvert,
  HeroUtilityPole,
  MonsoonRainOverlay,
  MonsoonSkyBackdrop,
  SnappedWirePuddleArc,
  WetRoadwayPlane,
} from './EnvironmentAssets';
import { ArjunRig, useArjunPerformance } from './CharacterRig';
import { BanglaTitleBeat } from './BanglaKineticType';

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 0-2s (0-120): Low-angle tracking glide through roadside environment with foreground depth
  { frame: 0, state: { x: -290, y: 196, z: -165, zoom: 1.04, roll: -0.5 } },
  {
    frame: 120,
    state: { x: 45, y: 166, z: 40, zoom: 1.02, roll: 0 },
    easing: EASE_IN_OUT,
  },
  // 2-4s (120-240): Clean cut to offset tracking shot following Arjun's walk
  {
    frame: 121,
    state: { x: -355, y: 138, z: 240, zoom: 1.24, roll: 0 },
    easing: Easing.step0,
  },
  {
    frame: 240,
    state: { x: -125, y: 138, z: 240, zoom: 1.24, roll: 0 },
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  // 4-6s (240-360): Camera follows Arjun's gaze line as his eyes & head turn toward the cable
  {
    frame: 300,
    state: { x: -65, y: 128, z: 295, zoom: 1.32, roll: 0 },
    easing: EASE_CINEMATIC,
  },
  {
    frame: 360,
    state: { x: -20, y: 132, z: 325, zoom: 1.36, roll: 0 },
    easing: EASE_IN_OUT,
  },
  // 6-8s (360-480): Whip push-in to dramatic close-up of the snaking fallen cable on wet road
  {
    frame: 378,
    state: { x: 295, y: 282, z: 505, zoom: 1.56, roll: 0.6 },
    easing: EASE_WHIP,
  },
  {
    frame: 480,
    state: { x: 308, y: 286, z: 525, zoom: 1.62, roll: 0.2 },
    easing: EASE_IN_OUT,
  },
  // 8-10s (480-600): Intimate medium close-up on Arjun's emotional reaction & cautious step away
  {
    frame: 498,
    state: { x: -138, y: 82, z: 430, zoom: 1.48, roll: -0.35 },
    easing: EASE_WHIP,
  },
  {
    frame: 600,
    state: { x: -202, y: 94, z: 355, zoom: 1.36, roll: 0 },
    easing: EASE_CINEMATIC,
  },
  // 10-12s (600-720): Pull back into balanced wide shot showing hazard, Arjun, and safe distance
  {
    frame: 650,
    state: { x: 55, y: 140, z: -50, zoom: 0.98, roll: 0 },
    easing: EASE_CINEMATIC,
  },
  {
    frame: 720,
    state: { x: 42, y: 134, z: -75, zoom: 0.96, roll: 0 },
    easing: EASE_IN_OUT,
  },
];

export const CinematicPilotFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const camera = interpolateCamera(frame, CAMERA_KEYFRAMES);
  const arjunPose = useArjunPerformance(frame);

  // Controlled directional motion blur ONLY during fast whip transitions (361-377 & 481-497)
  const whipBlurA =
    frame >= 361 && frame <= 377
      ? interpolate(frame, [361, 367, 377], [0, 1.9, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;
  const whipBlurB =
    frame >= 481 && frame <= 497
      ? interpolate(frame, [481, 487, 497], [0, 1.9, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;
  const motionBlurPx = Math.max(whipBlurA, whipBlurB);

  // Periodic realistic electric arc flashes at snapped wire tip
  const arcPulseA = Math.max(0, Math.sin(frame * 0.23) * Math.sin(frame * 0.67));
  const arcBurstShot4 =
    frame >= 378 && frame <= 475
      ? 0.55 + 0.45 * Math.abs(Math.sin(frame * 0.42))
      : 0;
  const arcIntensity = Math.min(1, Math.max(arcPulseA * 0.85, arcBurstShot4));

  // Subtle distant storm lightning
  const lightningIntensity =
    (frame >= 48 && frame <= 74
      ? Math.sin(((frame - 48) / 26) * Math.PI) * 0.65
      : 0) +
    (frame >= 400 && frame <= 424
      ? Math.sin(((frame - 400) / 24) * Math.PI) * 0.5
      : 0);

  // Natural danger-area ground illumination reveal in Shot 6 (10-12s)
  const showHazardZone =
    frame >= 605
      ? interpolate(frame, [608, 650], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: EASE_CINEMATIC,
        })
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F1826', overflow: 'hidden' }}>
      <FontInjector />

      <Audio
        src={staticFile('audio/kurzgesagt_safety_soundtrack.mp3')}
        volume={(f) =>
          interpolate(f, [0, 24, 675, 720], [0, 0.75, 0.75, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />

      {/* 1. Deep Atmospheric Monsoon Sky */}
      <MonsoonSkyBackdrop lightningIntensity={lightningIntensity} />

      {/* 2. True 2.5D Z-Depth Camera Stage */}
      <CameraStage camera={camera} motionBlurPx={motionBlurPx}>
        {/* Distant Misty Hills & Atmospheric Ridge (z = 1650) */}
        <DepthNode worldX={0} worldY={230} worldZ={1650} camera={camera}>
          <DistantMistyHills />
        </DepthNode>

        {/* Distant Houses, Water Tower & Tree Skyline (z = 1350) */}
        <DepthNode worldX={0} worldY={230} worldZ={1350} camera={camera}>
          <DistantVillageSkyline />
        </DepthNode>

        {/* Mid-Foreground Brick Wall, Warm Tea Stall & Secondary Pole (z = 620) */}
        <DepthNode worldX={0} worldY={252} worldZ={620} camera={camera}>
          <FarMidgroundStreet />
        </DepthNode>

        {/* Hero Utility Pole, Transformer & Overhead Lines (z = 80) */}
        <DepthNode worldX={330} worldY={265} worldZ={80} camera={camera}>
          <HeroUtilityPole frame={frame} />
        </DepthNode>

        {/* Wet Roadway, Puddle & Natural Danger-Area Wash (z = 40) */}
        <DepthNode worldX={0} worldY={250} worldZ={40} camera={camera}>
          <WetRoadwayPlane
            arcIntensity={arcIntensity}
            showHazardZone={showHazardZone}
          />
        </DepthNode>

        {/* High-Detail Snapped Wire Puddle Contact & Electric Arc (z = 38) */}
        <DepthNode worldX={250} worldY={306} worldZ={38} camera={camera}>
          <SnappedWirePuddleArc frame={frame} arcIntensity={arcIntensity} />
        </DepthNode>

        {/* Hero Character: Arjun (z = 0) */}
        <DepthNode
          worldX={arjunPose.worldX}
          worldY={286}
          worldZ={0}
          camera={camera}
        >
          <ArjunRig pose={arjunPose} />
        </DepthNode>

        {/* Near-Camera Striped Roadside Bollard (z = -310) */}
        <DepthNode
          worldX={565}
          worldY={388}
          worldZ={-310}
          camera={camera}
          blurPx={1.1}
        >
          <ForegroundFoliageAndCulvert frame={frame} variant="right-bollard" />
        </DepthNode>

        {/* Near-Camera Roadside Fern Shrub & Drainage Curb (z = -295, positioned clear of Arjun) */}
        <DepthNode
          worldX={-585}
          worldY={392}
          worldZ={-295}
          camera={camera}
          blurPx={1.2}
        >
          <ForegroundFoliageAndCulvert frame={frame} variant="left-shrub" />
        </DepthNode>

        {/* Extreme Foreground Verge Grass Edge (z = -460, ~4x faster parallax than far hills) */}
        <DepthNode
          worldX={0}
          worldY={425}
          worldZ={-460}
          camera={camera}
          blurPx={1.8}
        >
          <ExtremeForegroundEdge frame={frame} />
        </DepthNode>
      </CameraStage>

      {/* 3. Subtle Monsoon Rain */}
      <MonsoonRainOverlay frame={frame} density={24} />

      {/* 4. Restrained Filmic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 52% 48%, rgba(10,16,26,0) 58%, rgba(8,12,19,0.44) 100%)',
        }}
      />

      {/* 5. Clean Bengali Kinetic Typography (One Major Message Per Visual Beat) */}
      {/* Beat 1 (0-2s Establishing) */}
      <BanglaTitleBeat
        frame={frame}
        startFrame={18}
        endFrame={112}
        x={110}
        y={88}
        align="left"
        accentColor="#E89B45"
        lines={[
          { text: 'বর্ষার সন্ধ্যায়', sizePx: 52 },
          { text: 'রাস্তায় ছেঁড়া তার', sizePx: 60, accent: true },
        ]}
      />

      {/* Beat 2 (4-6s Discovery Push-In): Top-left open sky, clear of Arjun & pole */}
      <BanglaTitleBeat
        frame={frame}
        startFrame={252}
        endFrame={352}
        x={110}
        y={92}
        align="left"
        accentColor="#F07B56"
        lines={[
          { text: 'চেনা পথেই', sizePx: 50 },
          { text: 'লুকানো বিপদ', sizePx: 60, accent: true },
        ]}
      />

      {/* Beat 3 (6-8s Live Cable Close-Up) */}
      <BanglaTitleBeat
        frame={frame}
        startFrame={386}
        endFrame={472}
        x={110}
        y={96}
        align="left"
        accentColor="#5EC4FF"
        lines={[
          { text: 'ভেজা মাটিতে', sizePx: 50 },
          { text: 'ছড়ায় বিদ্যুৎ', sizePx: 60, accent: true },
        ]}
      />

      {/* Beat 4 (10-12s Wide Safe Distance Explanation) */}
      <BanglaTitleBeat
        frame={frame}
        startFrame={615}
        endFrame={710}
        x={110}
        y={82}
        align="left"
        accentColor="#58C49E"
        lines={[
          { text: 'দূরত্ব বজায় রাখুন', sizePx: 50 },
          { text: 'কমপক্ষে ১০ মিটার', sizePx: 58, accent: true },
        ]}
        subCaption="দুই পা একসাথে রেখে নিরাপদে সরে যান"
      />
    </AbsoluteFill>
  );
};
