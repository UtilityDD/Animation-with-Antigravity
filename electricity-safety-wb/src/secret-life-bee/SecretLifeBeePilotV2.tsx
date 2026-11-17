import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { FontInjector } from '../kinetic-master/FontInjector';
import {
  Camera25DKeyframe,
  DepthLayer,
  EASE_ENERGETIC,
  EASE_FILM,
  EASE_SMOOTH,
  StageViewport,
  interpolateCamera25D,
} from '../honeybee-film/DepthStage25D';
import { HeroBeePose, HeroBeeRig } from './HeroBeeRig';
import {
  DistantBotanicalHills,
  ForegroundBlurredFlora,
  MidgroundMeadowRidge,
  MinimalBanglaTitle,
  SunriseMeadowBackdrop,
} from './MeadowWorldAssets';
import {
  BotanicalFlowerV2,
  DewDropMacroOpening,
  RichMeadowFoliageLayer,
} from './DewDropAndFloraV2';

const PILOT_V2_CAMERA: Camera25DKeyframe[] = [
  // 0.0s - 3.0s: Pulling back from dewdrop macro through foreground flora into wide meadow
  { frame: 0, state: { x: -320, y: 110, z: -260, zoom: 1.06, roll: -1.2 } },
  { frame: 180, state: { x: -110, y: 82, z: -120, zoom: 1.02, roll: 0 }, easing: EASE_FILM },
  // 3.5s - 6.0s: Energetic low-angle tracking alongside Hero Bee swooping across meadow
  { frame: 240, state: { x: 45, y: 45, z: -10, zoom: 1.14, roll: 1.6 }, easing: EASE_ENERGETIC },
  { frame: 360, state: { x: 255, y: 5, z: 95, zoom: 1.38, roll: 0.8 }, easing: EASE_FILM },
  // 7.2s: Decelerate & push-in as bee extends legs to land on cosmos flower
  { frame: 436, state: { x: 365, y: -44, z: 205, zoom: 2.05, roll: 0 }, easing: EASE_ENERGETIC },
  // 9.5s - 12.0s: Deep macro close-up on proboscis nectar sip & hind-leg pollen grooming
  { frame: 570, state: { x: 374, y: -56, z: 245, zoom: 2.45, roll: -0.4 }, easing: EASE_FILM },
  { frame: 720, state: { x: 376, y: -58, z: 252, zoom: 2.50, roll: 0 }, easing: EASE_SMOOTH },
];

export const SecretLifeBeePilotV2: React.FC = () => {
  const frame = useCurrentFrame();
  const camBase = interpolateCamera25D(frame, PILOT_V2_CAMERA);
  const camera = { ...camBase, y: camBase.y + Math.sin(frame * 0.04) * 2.2 };

  // Dynamic Hero Bee swoop: enters from left-foreground at frame 170, banks across meadow, lands at frame 436
  const beeX = interpolate(
    frame,
    [165, 240, 330, 410, 438, 520, 720],
    [-440, -140, 155, 335, 372, 377, 380],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const beeZ = interpolate(
    frame,
    [165, 270, 390, 438, 720],
    [80, 195, 285, 300, 300],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const isFlying = frame < 436;
  const flightBob = isFlying
    ? Math.sin(frame * 0.16) * 14 * interpolate(frame, [395, 436], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  // Stem weight-dip physics with natural overshoot & settle
  const weightDip = interpolate(frame, [432, 452, 485, 520], [0, 1.0, 0.58, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const beeY =
    interpolate(
      frame,
      [165, 240, 330, 415, 438, 720],
      [-25, -85, -35, -72, -70, -68],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ) +
    flightBob +
    weightDip * 11;

  // Multi-view yaw + banking roll + pitch
  const yaw = interpolate(
    frame,
    [165, 250, 350, 438, 560, 720],
    [0.52, 0.85, 0.94, 0.74, 0.56, 0.62],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const pitchDeg = interpolate(
    frame,
    [165, 260, 360, 425, 450, 520, 620, 720],
    [-16, -8, 4, 14, 6, 18, 10, 8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const rollDeg = isFlying
    ? interpolate(frame, [165, 240, 340, 436], [14, -10, 8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  const wingActivity = interpolate(frame, [165, 418, 450, 500, 720], [1, 1, 0.16, 0.08, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const legExtend = interpolate(frame, [385, 432, 448, 720], [0.15, 0.96, 0.86, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Biological sequence:
  // 1) Proboscis extends to sip nectar (frames 455..565)
  const proboscisExtend = interpolate(frame, [450, 485, 540, 575], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2) Loose pollen sticks to fuzzy thorax/abdomen (frames 445..540), then gets groomed into hind-leg basket
  const pollenLoad = interpolate(frame, [445, 515, 620, 700], [0, 0.95, 0.75, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3) Grooming active (frames 565..675) packs pollen into corbicula basket
  const groomingActive = interpolate(frame, [560, 585, 655, 685], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pollenBasketLoad = interpolate(frame, [565, 680, 720], [0.08, 1.0, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const beePose: HeroBeePose = {
    worldX: beeX,
    worldY: beeY,
    worldZ: beeZ,
    yaw,
    pitchDeg,
    rollDeg,
    legExtend,
    wingActivity,
    pollenLoad,
    pollenBasketLoad,
    proboscisExtend,
    groomingActive,
    eyeLookX: 1.5,
    eyeLookY: isFlying ? 0.3 : 1.5,
    antennaAlert: 0.75,
    facing: 1,
    scale: 0.78,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFF3D6', overflow: 'hidden' }}>
      <FontInjector />
      <Audio src={staticFile('audio/bee_pilot_sfx_music.mp3')} />

      {/* Sky & Golden Sunbeams */}
      <SunriseMeadowBackdrop frame={frame} warmth={0.95} />

      <StageViewport camera={camera}>
        <DepthLayer worldX={0} worldY={160} worldZ={1600} camera={camera} blurPx={1.2}>
          <DistantBotanicalHills />
        </DepthLayer>

        <DepthLayer worldX={0} worldY={155} worldZ={950} camera={camera} blurPx={0.4}>
          <MidgroundMeadowRidge />
        </DepthLayer>

        <DepthLayer worldX={0} worldY={245} worldZ={420} camera={camera}>
          <RichMeadowFoliageLayer frame={frame} />
        </DepthLayer>

        {/* Diverse Wildflowers across the Meadow */}
        <DepthLayer worldX={-360} worldY={125} worldZ={500} camera={camera} blurPx={0.6}>
          <BotanicalFlowerV2 frame={frame + 18} variety="hibiscus-coral" scale={0.95} />
        </DepthLayer>
        <DepthLayer worldX={-110} worldY={140} worldZ={580} camera={camera} blurPx={0.8}>
          <BotanicalFlowerV2 frame={frame + 30} variety="wild-lavender" scale={0.85} />
        </DepthLayer>
        <DepthLayer worldX={130} worldY={135} worldZ={540} camera={camera} blurPx={0.7}>
          <BotanicalFlowerV2 frame={frame + 42} variety="daisy-cream" scale={0.88} />
        </DepthLayer>
        <DepthLayer worldX={660} worldY={122} worldZ={470} camera={camera} blurPx={0.5}>
          <BotanicalFlowerV2 frame={frame + 12} variety="wild-lavender" scale={0.96} />
        </DepthLayer>

        {/* Hero Cosmos Flower (z = 300) */}
        <DepthLayer worldX={375} worldY={128} worldZ={300} camera={camera}>
          <BotanicalFlowerV2
            frame={frame}
            variety="cosmos-gold"
            weightDip={weightDip}
            pollenRemain={interpolate(frame, [445, 560], [1.0, 0.35], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
            scale={1.32}
          />
        </DepthLayer>

        {/* Hero Honeybee */}
        {frame >= 165 && (
          <DepthLayer worldX={beeX} worldY={beeY} worldZ={beeZ} camera={camera}>
            <HeroBeeRig frame={frame} pose={beePose} />
          </DepthLayer>
        )}

        {/* Foreground Blurred Flora Passing Close to Camera */}
        <DepthLayer worldX={-480} worldY={220} worldZ={-170} camera={camera} blurPx={4.5}>
          <ForegroundBlurredFlora frame={frame} side="left" />
        </DepthLayer>
        <DepthLayer worldX={690} worldY={245} worldZ={-205} camera={camera} blurPx={5.0}>
          <ForegroundBlurredFlora frame={frame} side="right" />
        </DepthLayer>
      </StageViewport>

      {/* Extreme Macro Dew-Drop Opening Overlay (0..3.6s) */}
      <DewDropMacroOpening frame={frame} revealEndFrame={210} />

      {/* Minimal Bengali Title */}
      <MinimalBanglaTitle
        frame={frame}
        startFrame={140}
        endFrame={310}
        text="ফুল থেকে মধু"
        theme="meadow"
        align="left"
        size={72}
      />

      {/* Soft cinematic vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(255,255,255,0) 64%, rgba(65,40,12,0.22) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
