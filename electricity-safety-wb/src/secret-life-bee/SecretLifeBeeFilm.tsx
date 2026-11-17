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
  BotanicalFlower,
  DistantBotanicalHills,
  ForegroundBlurredFlora,
  MeadowGroundLayer,
  MidgroundMeadowRidge,
  MinimalBanglaTitle,
  SunriseMeadowBackdrop,
} from './MeadowWorldAssets';
import {
  EvaporationAirflow,
  HiveInteriorBackdrop,
  HoneycombWallLayer,
  ViscousHoneyPour,
} from './HiveWorldAssets';

const MEADOW_CAMERA_KEYFRAMES: Camera25DKeyframe[] = [
  // Scene 1 (0-8s): Sunrise meadow establish & glide
  { frame: 0, state: { x: -240, y: 95, z: -240, zoom: 0.96, roll: 0 } },
  { frame: 480, state: { x: 20, y: 78, z: -40, zoom: 1.06, roll: 0 }, easing: EASE_SMOOTH },
  // Scene 2 (8-18s): Aerial bee tracking -> macro landing on cosmos flower (x=375, z=300)
  { frame: 690, state: { x: 240, y: 20, z: 75, zoom: 1.28, roll: 0.6 }, easing: EASE_FILM },
  { frame: 810, state: { x: 365, y: -42, z: 205, zoom: 1.95, roll: 0 }, easing: EASE_ENERGETIC },
  { frame: 1050, state: { x: 374, y: -56, z: 245, zoom: 2.38, roll: 0 }, easing: EASE_FILM },
  // Scene 3 (18-26s): Pull back & pan right following bee to coral hibiscus (x=960, z=300)
  { frame: 1180, state: { x: 640, y: 5, z: 110, zoom: 1.32, roll: -0.5 }, easing: EASE_ENERGETIC },
  { frame: 1332, state: { x: 945, y: -40, z: 205, zoom: 1.92, roll: 0 }, easing: EASE_FILM },
  { frame: 1560, state: { x: 955, y: -48, z: 225, zoom: 2.15, roll: 0 }, easing: EASE_SMOOTH },
  // Scene 6 Sunset Finale (45.3s - 50s / 2720-3000)
  { frame: 2720, state: { x: 420, y: 60, z: 40, zoom: 1.12, roll: 0 } },
  { frame: 3000, state: { x: 180, y: 92, z: -220, zoom: 0.94, roll: 0 }, easing: EASE_SMOOTH },
];

const HIVE_CAMERA_KEYFRAMES: Camera25DKeyframe[] = [
  // Scene 4 (26-34s): Enter warm hive interior
  { frame: 1560, state: { x: -160, y: 0, z: -120, zoom: 1.0, roll: 0 } },
  { frame: 1800, state: { x: 0, y: -10, z: 40, zoom: 1.18, roll: 0 }, easing: EASE_FILM },
  { frame: 2040, state: { x: 40, y: -15, z: 80, zoom: 1.24, roll: 0 }, easing: EASE_SMOOTH },
  // Scene 5 (34-42s): Push in on wing-fanning & viscous honey drip
  { frame: 2280, state: { x: 90, y: -20, z: 150, zoom: 1.48, roll: 0 }, easing: EASE_FILM },
  { frame: 2520, state: { x: 110, y: -10, z: 180, zoom: 1.62, roll: 0 }, easing: EASE_SMOOTH },
  // Scene 6 (42-45.3s): Wax capping pull-back
  { frame: 2740, state: { x: 20, y: 0, z: 20, zoom: 1.12, roll: 0 }, easing: EASE_SMOOTH },
];

export const SecretLifeBeeFilm: React.FC = () => {
  const frame = useCurrentFrame();

  // Cross-fade opacity between Outdoor Meadow (0..1560 and 2720..3000) and Hive Interior (1560..2740)
  const hiveOpacity =
    frame < 1530
      ? 0
      : frame < 1590
      ? interpolate(frame, [1530, 1590], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : frame < 2700
      ? 1
      : frame < 2760
      ? interpolate(frame, [2700, 2760], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : 0;

  const meadowOpacity = 1 - hiveOpacity;

  const meadowCamBase = interpolateCamera25D(frame, MEADOW_CAMERA_KEYFRAMES);
  const meadowCam = { ...meadowCamBase, y: meadowCamBase.y + Math.sin(frame * 0.038) * 2.2 };

  const hiveCamBase = interpolateCamera25D(frame, HIVE_CAMERA_KEYFRAMES);
  const hiveCam = { ...hiveCamBase, y: hiveCamBase.y + Math.sin(frame * 0.045) * 1.8 };

  // --- OUTDOOR HERO BEE TRAJECTORY (Scenes 1-3 + Scene 6) ---
  const flower1Dip = interpolate(frame, [805, 824, 860, 1080, 1105], [0, 1.0, 0.72, 0.72, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flower2Dip = interpolate(frame, [1328, 1346, 1380, 1560], [0, 1.0, 0.72, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const beeX =
    frame < 2600
      ? interpolate(
          frame,
          [420, 620, 760, 812, 1080, 1160, 1280, 1332, 1560],
          [-380, 40, 320, 372, 378, 560, 880, 955, 962],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      : interpolate(frame, [2700, 2850, 3000], [260, 480, 760], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  const isFlyingOutdoors =
    (frame >= 420 && frame < 810) ||
    (frame >= 1080 && frame < 1330) ||
    frame >= 2700;

  const outdoorBob = isFlyingOutdoors ? Math.sin(frame * 0.15) * 12 : 0;

  const beeY =
    (frame < 2600
      ? interpolate(
          frame,
          [420, 620, 760, 812, 1080, 1200, 1332, 1560],
          [-65, -35, -62, -70, -68, -110, -68, -66],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        ) +
        flower1Dip * 11 +
        flower2Dip * 11
      : interpolate(frame, [2700, 2860, 3000], [-30, -85, -145], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })) + outdoorBob;

  const outdoorBeePose: HeroBeePose = {
    worldX: beeX,
    worldY: beeY,
    worldZ: 300,
    yaw:
      frame < 2600
        ? interpolate(frame, [420, 680, 812, 1060, 1200, 1332], [0.58, 0.9, 0.72, 0.52, 0.88, 0.68], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : 0.82,
    pitchDeg:
      frame < 2600
        ? interpolate(frame, [420, 760, 820, 1080, 1200, 1332], [-10, 8, 12, -8, -12, 10], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : -14,
    rollDeg: isFlyingOutdoors ? Math.sin(frame * 0.08) * 5 : 0,
    legExtend: isFlyingOutdoors
      ? interpolate(frame, [770, 810], [0.15, 0.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : 0.85,
    wingActivity: isFlyingOutdoors ? 1.0 : 0.1,
    pollenLoad: interpolate(frame, [820, 980, 1340, 1520], [0, 1.0, 1.0, 0.4], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    eyeLookX: 1.5,
    eyeLookY: isFlyingOutdoors ? 0.4 : 1.4,
    antennaAlert: 0.65,
    facing: 1,
    scale: 0.78,
  };

  // --- HIVE BEE ACTING (Scenes 4-5) ---
  const hiveHeroX = interpolate(frame, [1560, 1740, 1960, 2100], [-360, -85, -75, -130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hiveHeroY = interpolate(frame, [1560, 1740, 2040], [-45, 10, 15], {
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
    legExtend: hiveHeroFlying ? 0.3 : 0.9,
    wingActivity: hiveHeroFlying ? 0.95 : 0.12,
    pollenLoad: interpolate(frame, [1560, 1950], [0.5, 0.1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    eyeLookX: 1.2,
    eyeLookY: 0.5,
    antennaAlert: 0.8,
    facing: 1,
    scale: 0.86,
  };

  const hiveWorkerPose: HeroBeePose = {
    worldX: 85,
    worldY: 16,
    worldZ: 285,
    yaw: 0.82,
    pitchDeg: frame >= 2040 && frame <= 2320 ? -8 : 4,
    rollDeg: 0,
    legExtend: 0.9,
    // Rapid wing-fanning evaporation in Scene 5 (frames 2040..2340)
    wingActivity: frame >= 2040 && frame <= 2340 ? 1.0 : 0.12,
    pollenLoad: 0.1,
    eyeLookX: -1.4,
    eyeLookY: 0.4,
    antennaAlert: 0.75,
    facing: -1,
    scale: 0.84,
  };

  // Honey fill & wax cap progression in Scene 5-6
  const honeyFill = interpolate(frame, [2060, 2480], [0.22, 0.98], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const waxCap = interpolate(frame, [2500, 2700], [0.0, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const honeyPourIntensity = interpolate(frame, [2120, 2200, 2440, 2520], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const evapIntensity = interpolate(frame, [2040, 2110, 2300, 2360], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Warmth transitions from cool sunrise (0.45 -> 0.95) to golden sunset (1.0) in Scene 6
  const skyWarmth =
    frame < 1600
      ? interpolate(frame, [0, 480], [0.55, 0.95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : 1.0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#2A1204', overflow: 'hidden' }}>
      <FontInjector />
      <Audio src={staticFile('audio/secret_life_bee_50s.mp3')} />

      {/* ================================================================= */}
      {/* OUTDOOR MEADOW WORLD (Scenes 1–3 & Scene 6 Sunset Finale)         */}
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
            <DepthLayer worldX={0} worldY={255} worldZ={420} camera={meadowCam}>
              <MeadowGroundLayer frame={frame} />
            </DepthLayer>

            {/* Secondary Meadow Flowers */}
            <DepthLayer worldX={-340} worldY={125} worldZ={500} camera={meadowCam} blurPx={0.6}>
              <BotanicalFlower frame={frame + 18} variant="hibiscus-coral" scale={0.9} />
            </DepthLayer>
            <DepthLayer worldX={110} worldY={135} worldZ={540} camera={meadowCam} blurPx={0.7}>
              <BotanicalFlower frame={frame + 42} variant="cosmos-gold" scale={0.85} />
            </DepthLayer>
            <DepthLayer worldX={670} worldY={128} worldZ={480} camera={meadowCam} blurPx={0.5}>
              <BotanicalFlower frame={frame + 8} variant="cosmos-gold" scale={0.92} />
            </DepthLayer>

            {/* Hero Flower 1: Golden Cosmos (Scene 2 nectar & pollen pickup) */}
            <DepthLayer worldX={375} worldY={128} worldZ={300} camera={meadowCam}>
              <BotanicalFlower
                frame={frame}
                variant="cosmos-gold"
                weightDip={flower1Dip}
                pollenRemain={interpolate(frame, [820, 1020], [1.0, 0.35], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                scale={1.32}
              />
            </DepthLayer>

            {/* Hero Flower 2: Coral Hibiscus (Scene 3 pollination transfer) */}
            <DepthLayer worldX={960} worldY={128} worldZ={300} camera={meadowCam}>
              <BotanicalFlower
                frame={frame + 10}
                variant="hibiscus-coral"
                weightDip={flower2Dip}
                pollenRemain={0.85}
                stigmaPollinated={interpolate(frame, [1345, 1490], [0, 1.0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                scale={1.32}
              />
            </DepthLayer>

            {/* Hero Honeybee Outdoors */}
            {frame >= 420 && (
              <DepthLayer worldX={beeX} worldY={beeY} worldZ={300} camera={meadowCam}>
                <HeroBeeRig frame={frame} pose={outdoorBeePose} />
              </DepthLayer>
            )}

            {/* Foreground Blurred Botanical Flora */}
            <DepthLayer worldX={-520} worldY={230} worldZ={-180} camera={meadowCam} blurPx={4.5}>
              <ForegroundBlurredFlora frame={frame} side="left" />
            </DepthLayer>
            <DepthLayer worldX={680} worldY={250} worldZ={-210} camera={meadowCam} blurPx={5.0}>
              <ForegroundBlurredFlora frame={frame} side="right" />
            </DepthLayer>
            <DepthLayer worldX={1260} worldY={240} worldZ={-190} camera={meadowCam} blurPx={4.8}>
              <ForegroundBlurredFlora frame={frame} side="left" />
            </DepthLayer>
          </StageViewport>
        </AbsoluteFill>
      )}

      {/* ================================================================= */}
      {/* WARM INTERIOR HIVE WORLD (Scenes 4–6a: Trophallaxis, Fanning, Honey) */}
      {/* ================================================================= */}
      {hiveOpacity > 0.01 && (
        <AbsoluteFill style={{ opacity: hiveOpacity }}>
          <HiveInteriorBackdrop frame={frame} warmth={1.0} />
          <StageViewport camera={hiveCam}>
            {/* Deep background honeycomb wall */}
            <DepthLayer worldX={-580} worldY={-320} worldZ={620} camera={hiveCam} blurPx={2.0} opacity={0.55}>
              <HoneycombWallLayer frame={frame} cols={12} rows={7} radius={58} fillProgress={0.65} />
            </DepthLayer>

            {/* Main hero honeycomb wall */}
            <DepthLayer worldX={-440} worldY={-240} worldZ={350} camera={hiveCam}>
              <HoneycombWallLayer
                frame={frame}
                cols={10}
                rows={5}
                radius={54}
                fillProgress={honeyFill}
                capProgress={waxCap}
              />
            </DepthLayer>

            {/* Viscous dripping golden honey */}
            {honeyPourIntensity > 0.02 && (
              <DepthLayer worldX={80} worldY={-180} worldZ={295} camera={hiveCam}>
                <ViscousHoneyPour frame={frame} flowIntensity={honeyPourIntensity} />
              </DepthLayer>
            )}

            {/* Wing-fanning airflow ribbons & evaporation shimmer */}
            {evapIntensity > 0.02 && (
              <DepthLayer worldX={-160} worldY={-140} worldZ={275} camera={hiveCam}>
                <EvaporationAirflow frame={frame} intensity={evapIntensity} />
              </DepthLayer>
            )}

            {/* Hero Forager Bee & Hive Worker Bee */}
            <DepthLayer worldX={hiveHeroX} worldY={hiveHeroY} worldZ={280} camera={hiveCam}>
              <HeroBeeRig frame={frame} pose={hiveHeroPose} />
            </DepthLayer>
            <DepthLayer worldX={85} worldY={16} worldZ={285} camera={hiveCam}>
              <HeroBeeRig frame={frame} pose={hiveWorkerPose} />
            </DepthLayer>
          </StageViewport>
        </AbsoluteFill>
      )}

      {/* ================================================================= */}
      {/* MINIMAL BENGALI KINETIC TITLES (1–3 words per beat, zero narration) */}
      {/* ================================================================= */}
      <MinimalBanglaTitle
        frame={frame}
        startFrame={45}
        endFrame={280}
        text="ফুল থেকে মধু"
        theme="meadow"
        align="left"
        size={72}
      />
      <MinimalBanglaTitle
        frame={frame}
        startFrame={1300}
        endFrame={1530}
        text="পরাগায়ন"
        theme="meadow"
        align="left"
        size={68}
      />
      <MinimalBanglaTitle
        frame={frame}
        startFrame={2120}
        endFrame={2440}
        text="মধু তৈরি"
        theme="hive"
        align="left"
        size={68}
      />
      <MinimalBanglaTitle
        frame={frame}
        startFrame={2780}
        endFrame={2985}
        text="মৌমাছি বাঁচায় আমাদের সবুজ পৃথিবী"
        theme="meadow"
        align="center"
        size={56}
      />

      {/* Subtle warm filmic vignette */}
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

