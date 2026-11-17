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
import {
  EvaporationAirflow,
  HiveInteriorBackdrop,
  ViscousHoneyPour,
} from './HiveWorldAssets';
import { HiveEntranceTunnel, HoneycombWallLayerV2 } from './HiveWorldAssetsV2';

const MEADOW_V2_CAM: Camera25DKeyframe[] = [
  // Scene 1 (0-4.5s): Pull back from dewdrop macro into sunlit meadow
  { frame: 0, state: { x: -320, y: 110, z: -260, zoom: 1.06, roll: -1.2 } },
  { frame: 240, state: { x: -40, y: 78, z: -90, zoom: 1.04, roll: 0 }, easing: EASE_FILM },
  // Scene 2 (4.5-13.5s): Track Hero Bee swoop -> macro landing on Golden Cosmos (x=375)
  { frame: 360, state: { x: 140, y: 35, z: 20, zoom: 1.18, roll: 1.4 }, easing: EASE_ENERGETIC },
  { frame: 520, state: { x: 365, y: -44, z: 205, zoom: 2.05, roll: 0 }, easing: EASE_FILM },
  { frame: 790, state: { x: 374, y: -56, z: 248, zoom: 2.48, roll: -0.3 }, easing: EASE_SMOOTH },
  // Scene 3 (13.5-22s): Pan & track pollination flight to Coral Hibiscus (x=960)
  { frame: 960, state: { x: 680, y: -10, z: 120, zoom: 1.35, roll: -1.0 }, easing: EASE_ENERGETIC },
  { frame: 1120, state: { x: 948, y: -44, z: 208, zoom: 2.08, roll: 0 }, easing: EASE_FILM },
  { frame: 1320, state: { x: 956, y: -52, z: 232, zoom: 2.24, roll: 0 }, easing: EASE_SMOOTH },
  // Scene 4 (22-26.5s): Follow bee flying toward wooden hive entrance (x=260, z=950)
  { frame: 1480, state: { x: 520, y: 20, z: 180, zoom: 1.25, roll: 0.8 }, easing: EASE_ENERGETIC },
  { frame: 1620, state: { x: 260, y: 120, z: 680, zoom: 2.20, roll: 0 }, easing: EASE_FILM },
  // Scene 6b Sunset Finale (45-50s / frames 2700-3000)
  { frame: 2700, state: { x: 420, y: 55, z: 40, zoom: 1.12, roll: 0 } },
  { frame: 3000, state: { x: 180, y: 88, z: -210, zoom: 0.96, roll: 0 }, easing: EASE_SMOOTH },
];

const HIVE_V2_CAM: Camera25DKeyframe[] = [
  // Emerge from entrance tunnel into warm amber hive
  { frame: 1580, state: { x: -200, y: 0, z: -140, zoom: 0.98, roll: 0 } },
  // Trophallaxis close-up (28-32.5s)
  { frame: 1860, state: { x: -10, y: -12, z: 75, zoom: 1.32, roll: 0 }, easing: EASE_FILM },
  // Wing-fanning & viscous honey drip push-in (33-41s)
  { frame: 2160, state: { x: 85, y: -18, z: 145, zoom: 1.54, roll: 0.4 }, easing: EASE_ENERGETIC },
  { frame: 2440, state: { x: 115, y: -12, z: 175, zoom: 1.66, roll: 0 }, easing: EASE_FILM },
  // Wax capping pull-back (41-45s)
  { frame: 2700, state: { x: 10, y: 0, z: 10, zoom: 1.10, roll: 0 }, easing: EASE_SMOOTH },
];

export const SecretLifeBeeFilmV2: React.FC = () => {
  const frame = useCurrentFrame();

  // Continuous Hive Entrance Tunnel transition (frames 1500..1660)
  const tunnelProgress = interpolate(frame, [1500, 1660], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const hiveOpacity =
    frame < 1540
      ? 0
      : frame < 1620
      ? interpolate(frame, [1540, 1620], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : frame < 2680
      ? 1
      : frame < 2750
      ? interpolate(frame, [2680, 2750], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : 0;

  const meadowOpacity = 1 - hiveOpacity;

  const meadowCamBase = interpolateCamera25D(frame, MEADOW_V2_CAM);
  const meadowCam = { ...meadowCamBase, y: meadowCamBase.y + Math.sin(frame * 0.04) * 2.0 };

  const hiveCamBase = interpolateCamera25D(frame, HIVE_V2_CAM);
  const hiveCam = { ...hiveCamBase, y: hiveCamBase.y + Math.sin(frame * 0.045) * 1.8 };

  // --- OUTDOOR HERO BEE ---
  const flower1Dip = interpolate(frame, [510, 530, 565, 810, 835], [0, 1.0, 0.72, 0.72, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flower2Dip = interpolate(frame, [1110, 1130, 1165, 1340, 1365], [0, 1.0, 0.72, 0.72, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const beeX =
    frame < 2600
      ? interpolate(
          frame,
          [210, 320, 440, 515, 810, 920, 1060, 1115, 1340, 1490, 1620],
          [-430, -80, 260, 372, 378, 620, 890, 955, 962, 540, 260],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      : interpolate(frame, [2700, 2860, 3000], [260, 490, 780], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  const beeZ =
    frame < 1340
      ? 300
      : frame < 2600
      ? interpolate(frame, [1340, 1620], [300, 880], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : 300;

  const isFlyingOutdoors =
    (frame >= 210 && frame < 512) ||
    (frame >= 810 && frame < 1112) ||
    (frame >= 1340 && frame < 1640) ||
    frame >= 2700;

  const outdoorBob = isFlyingOutdoors ? Math.sin(frame * 0.16) * 12 : 0;

  const beeY =
    (frame < 2600
      ? interpolate(
          frame,
          [210, 320, 440, 515, 810, 960, 1115, 1340, 1620],
          [-25, -80, -52, -70, -68, -112, -68, -66, 95],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        ) +
        flower1Dip * 11 +
        flower2Dip * 11
      : interpolate(frame, [2700, 2860, 3000], [-30, -90, -155], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })) + outdoorBob;

  const outdoorBeePose: HeroBeePose = {
    worldX: beeX,
    worldY: beeY,
    worldZ: beeZ,
    yaw:
      frame < 2600
        ? interpolate(
            frame,
            [210, 350, 515, 760, 930, 1115, 1340, 1520],
            [0.54, 0.92, 0.72, 0.56, 0.90, 0.68, 0.55, 0.25],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        : 0.84,
    pitchDeg:
      frame < 2600
        ? interpolate(frame, [210, 460, 520, 810, 960, 1115], [-14, 6, 14, -10, -12, 12], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : -14,
    rollDeg: isFlyingOutdoors ? Math.sin(frame * 0.09) * 8 : 0,
    legExtend: isFlyingOutdoors ? 0.25 : 0.88,
    wingActivity: isFlyingOutdoors ? 1.0 : 0.08,
    pollenLoad: interpolate(frame, [525, 620, 760, 1125, 1280], [0, 0.95, 0.45, 0.45, 0.15], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    pollenBasketLoad: interpolate(frame, [660, 780, 1340, 1620], [0.05, 1.0, 1.0, 0.9], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    proboscisExtend:
      interpolate(frame, [540, 575, 635, 665], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) +
      interpolate(frame, [1140, 1170, 1230, 1260], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    groomingActive: interpolate(frame, [665, 690, 770, 800], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    eyeLookX: 1.5,
    eyeLookY: isFlyingOutdoors ? 0.3 : 1.4,
    antennaAlert: 0.75,
    facing: frame >= 1350 && frame < 1650 ? -1 : 1,
    scale: 0.78,
  };

  // --- HIVE BEES (Multiple active bees in Scenes 5-6a) ---
  const hiveHeroX = interpolate(frame, [1580, 1740, 1980, 2140], [-340, -78, -72, -135], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hiveHeroY = interpolate(frame, [1580, 1740, 2040], [-35, 12, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hiveHeroFlying = frame < 1735;

  const hiveHeroPose: HeroBeePose = {
    worldX: hiveHeroX,
    worldY: hiveHeroY,
    worldZ: 280,
    yaw: 0.85,
    pitchDeg: hiveHeroFlying ? -6 : 6,
    rollDeg: 0,
    legExtend: hiveHeroFlying ? 0.25 : 0.9,
    wingActivity: hiveHeroFlying ? 0.95 : 0.1,
    pollenLoad: 0.15,
    pollenBasketLoad: interpolate(frame, [1580, 1960], [0.85, 0.25], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    proboscisExtend: interpolate(frame, [1755, 1790, 1910, 1950], [0, 0.9, 0.9, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    eyeLookX: 1.3,
    eyeLookY: 0.4,
    antennaAlert: 0.85,
    facing: 1,
    scale: 0.86,
  };

  const hiveWorker1Pose: HeroBeePose = {
    worldX: 78,
    worldY: 16,
    worldZ: 285,
    yaw: 0.82,
    pitchDeg: frame >= 1980 && frame <= 2280 ? -10 : 4,
    rollDeg: 0,
    legExtend: 0.9,
    wingActivity: frame >= 1980 && frame <= 2280 ? 1.0 : 0.1,
    pollenLoad: 0.1,
    proboscisExtend: interpolate(frame, [1755, 1790, 1910, 1950], [0, 0.85, 0.85, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    eyeLookX: -1.4,
    eyeLookY: 0.4,
    antennaAlert: 0.75,
    facing: -1,
    scale: 0.84,
  };

  // Secondary background worker bee tending upper comb cells
  const hiveWorker2Pose: HeroBeePose = {
    worldX: interpolate(frame, [1600, 2100, 2600], [-240, -195, -140], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    worldY: -125,
    worldZ: 340,
    yaw: 0.75,
    pitchDeg: 8,
    rollDeg: 0,
    legExtend: 0.88,
    wingActivity: frame >= 2000 && frame <= 2260 ? 0.92 : 0.08,
    pollenLoad: 0.08,
    eyeLookX: 1.0,
    eyeLookY: 0.8,
    antennaAlert: 0.6,
    facing: 1,
    scale: 0.72,
  };

  const honeyFill = interpolate(frame, [1960, 2440], [0.22, 0.98], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const waxCap = interpolate(frame, [2460, 2680], [0.0, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const honeyPourIntensity = interpolate(frame, [2080, 2160, 2400, 2480], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const evapIntensity = interpolate(frame, [1980, 2050, 2240, 2310], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const skyWarmth =
    frame < 1600
      ? interpolate(frame, [0, 420], [0.65, 0.95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : 1.0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#241003', overflow: 'hidden' }}>
      <FontInjector />
      <Audio src={staticFile('audio/secret_life_bee_50s.mp3')} />

      {/* ================================================================= */}
      {/* OUTDOOR MEADOW WORLD (Scenes 1–4 & Scene 6b Sunset Finale)        */}
      {/* ================================================================= */}
      {meadowOpacity > 0.01 && (
        <AbsoluteFill style={{ opacity: meadowOpacity }}>
          <SunriseMeadowBackdrop frame={frame} warmth={skyWarmth} />
          <StageViewport camera={meadowCam}>
            <DepthLayer worldX={0} worldY={160} worldZ={1600} camera={meadowCam} blurPx={1.2}>
              <DistantBotanicalHills />
            </DepthLayer>
            <DepthLayer worldX={0} worldY={155} worldZ={950} camera={meadowCam} blurPx={0.4}>
              <MidgroundMeadowRidge />
            </DepthLayer>
            <DepthLayer worldX={0} worldY={245} worldZ={420} camera={meadowCam}>
              <RichMeadowFoliageLayer frame={frame} />
            </DepthLayer>

            {/* Diverse Wildflower Meadow */}
            <DepthLayer worldX={-360} worldY={125} worldZ={500} camera={meadowCam} blurPx={0.6}>
              <BotanicalFlowerV2 frame={frame + 18} variety="hibiscus-coral" scale={0.95} />
            </DepthLayer>
            <DepthLayer worldX={-110} worldY={140} worldZ={580} camera={meadowCam} blurPx={0.8}>
              <BotanicalFlowerV2 frame={frame + 30} variety="wild-lavender" scale={0.85} />
            </DepthLayer>
            <DepthLayer worldX={130} worldY={135} worldZ={540} camera={meadowCam} blurPx={0.7}>
              <BotanicalFlowerV2 frame={frame + 42} variety="daisy-cream" scale={0.88} />
            </DepthLayer>
            <DepthLayer worldX={660} worldY={122} worldZ={470} camera={meadowCam} blurPx={0.5}>
              <BotanicalFlowerV2 frame={frame + 12} variety="wild-lavender" scale={0.96} />
            </DepthLayer>

            {/* Hero Flower 1: Golden Cosmos (Scene 2 nectar + pollen grooming) */}
            <DepthLayer worldX={375} worldY={128} worldZ={300} camera={meadowCam}>
              <BotanicalFlowerV2
                frame={frame}
                variety="cosmos-gold"
                weightDip={flower1Dip}
                pollenRemain={interpolate(frame, [520, 680], [1.0, 0.35], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                scale={1.32}
              />
            </DepthLayer>

            {/* Hero Flower 2: Coral Hibiscus (Scene 3 pollination transfer) */}
            <DepthLayer worldX={960} worldY={128} worldZ={300} camera={meadowCam}>
              <BotanicalFlowerV2
                frame={frame + 10}
                variety="hibiscus-coral"
                weightDip={flower2Dip}
                pollenRemain={0.85}
                stigmaPollinated={interpolate(frame, [1135, 1290], [0, 1.0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                scale={1.32}
              />
            </DepthLayer>

            {/* Hero Honeybee Outdoors */}
            {frame >= 210 && (
              <DepthLayer worldX={beeX} worldY={beeY} worldZ={beeZ} camera={meadowCam}>
                <HeroBeeRig frame={frame} pose={outdoorBeePose} />
              </DepthLayer>
            )}

            {/* Foreground Blurred Flora Passing Close to Camera */}
            <DepthLayer worldX={-480} worldY={220} worldZ={-170} camera={meadowCam} blurPx={4.5}>
              <ForegroundBlurredFlora frame={frame} side="left" />
            </DepthLayer>
            <DepthLayer worldX={690} worldY={245} worldZ={-205} camera={meadowCam} blurPx={5.0}>
              <ForegroundBlurredFlora frame={frame} side="right" />
            </DepthLayer>
            <DepthLayer worldX={1260} worldY={235} worldZ={-185} camera={meadowCam} blurPx={4.8}>
              <ForegroundBlurredFlora frame={frame} side="left" />
            </DepthLayer>
          </StageViewport>

          {/* Extreme Macro Dew-Drop Opening (0..3.8s) */}
          <DewDropMacroOpening frame={frame} revealEndFrame={225} />
        </AbsoluteFill>
      )}

      {/* ================================================================= */}
      {/* WARM INTERIOR HIVE WORLD (Scenes 5–6a: Living Beehive)            */}
      {/* ================================================================= */}
      {hiveOpacity > 0.01 && (
        <AbsoluteFill style={{ opacity: hiveOpacity }}>
          <HiveInteriorBackdrop frame={frame} warmth={1.0} />
          <StageViewport camera={hiveCam}>
            <DepthLayer worldX={-580} worldY={-320} worldZ={620} camera={hiveCam} blurPx={2.0} opacity={0.55}>
              <HoneycombWallLayerV2
                layerId="bg-comb"
                frame={frame}
                cols={12}
                rows={7}
                radius={58}
                fillProgress={0.65}
              />
            </DepthLayer>

            <DepthLayer worldX={-440} worldY={-240} worldZ={350} camera={hiveCam}>
              <HoneycombWallLayerV2
                layerId="hero-comb"
                frame={frame}
                cols={10}
                rows={5}
                radius={54}
                fillProgress={honeyFill}
                capProgress={waxCap}
              />
            </DepthLayer>

            {honeyPourIntensity > 0.02 && (
              <DepthLayer worldX={80} worldY={-180} worldZ={295} camera={hiveCam}>
                <ViscousHoneyPour frame={frame} flowIntensity={honeyPourIntensity} />
              </DepthLayer>
            )}

            {evapIntensity > 0.02 && (
              <DepthLayer worldX={-160} worldY={-140} worldZ={275} camera={hiveCam}>
                <EvaporationAirflow frame={frame} intensity={evapIntensity} />
              </DepthLayer>
            )}

            {/* Multiple Active Worker Bees + Hero Forager */}
            <DepthLayer worldX={hiveWorker2Pose.worldX} worldY={hiveWorker2Pose.worldY} worldZ={340} camera={hiveCam}>
              <HeroBeeRig frame={frame} pose={hiveWorker2Pose} />
            </DepthLayer>
            <DepthLayer worldX={hiveHeroX} worldY={hiveHeroY} worldZ={280} camera={hiveCam}>
              <HeroBeeRig frame={frame} pose={hiveHeroPose} />
            </DepthLayer>
            <DepthLayer worldX={78} worldY={16} worldZ={285} camera={hiveCam}>
              <HeroBeeRig frame={frame} pose={hiveWorker1Pose} />
            </DepthLayer>
          </StageViewport>
        </AbsoluteFill>
      )}

      {/* Continuous Hive Entrance Tunnel Transition */}
      <HiveEntranceTunnel progress={tunnelProgress} />

      {/* ================================================================= */}
      {/* MINIMAL BENGALI TYPOGRAPHY (Zero narration, zero subtitles)       */}
      {/* ================================================================= */}
      <MinimalBanglaTitle
        frame={frame}
        startFrame={150}
        endFrame={340}
        text="ফুল থেকে মধু"
        theme="meadow"
        align="left"
        size={72}
      />
      <MinimalBanglaTitle
        frame={frame}
        startFrame={1100}
        endFrame={1310}
        text="পরাগায়ন"
        theme="meadow"
        align="left"
        size={68}
      />
      <MinimalBanglaTitle
        frame={frame}
        startFrame={2040}
        endFrame={2360}
        text="মধু তৈরি"
        theme="hive"
        align="left"
        size={68}
      />
      <MinimalBanglaTitle
        frame={frame}
        startFrame={2760}
        endFrame={2985}
        text="মৌমাছি বাঁচায় আমাদের সবুজ পৃথিবী"
        theme="meadow"
        align="center"
        size={56}
      />

      {/* Soft cinematic vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(255,255,255,0) 62%, rgba(45,24,6,0.28) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
