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

const PILOT_CAMERA_KEYFRAMES: Camera25DKeyframe[] = [
  // 0s: Wide sunrise meadow establish, gliding forward through foreground flora
  { frame: 0, state: { x: -200, y: 95, z: -220, zoom: 0.98, roll: 0 } },
  // 3.5s: Glide right & forward toward flower cluster as Hero Bee enters
  { frame: 210, state: { x: 40, y: 75, z: -20, zoom: 1.08, roll: 0 }, easing: EASE_SMOOTH },
  // 5.5s: Tracking aerial bee curving toward the hero flower
  { frame: 330, state: { x: 250, y: 20, z: 80, zoom: 1.28, roll: 0.5 }, easing: EASE_FILM },
  // 7.5s: Macro push-in as bee touches down right on the golden blossom center
  { frame: 450, state: { x: 365, y: -42, z: 205, zoom: 1.95, roll: 0 }, easing: EASE_ENERGETIC },
  // 10.5s: Deep macro close-up on pollen grains clinging to the bee
  { frame: 630, state: { x: 374, y: -56, z: 245, zoom: 2.38, roll: 0 }, easing: EASE_FILM },
  // 12.0s: Gentle settle hold
  { frame: 720, state: { x: 376, y: -58, z: 250, zoom: 2.42, roll: 0 }, easing: EASE_SMOOTH },
];

export const SecretLifeBeePilot: React.FC = () => {
  const frame = useCurrentFrame();
  const camera = interpolateCamera25D(frame, PILOT_CAMERA_KEYFRAMES);

  // Subtle ambient camera breathing
  const camBreathY = Math.sin(frame * 0.04) * 2.5;
  const effectiveCamera = { ...camera, y: camera.y + camBreathY };

  // Hero Bee world trajectory (worldZ around 280..320, hero flower at x=375, y=128, z=300)
  const beeX = interpolate(
    frame,
    [0, 150, 240, 330, 420, 452, 540, 720],
    [-460, -320, -40, 190, 335, 368, 376, 382],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Arcing flight path with gentle bobbing before landing at frame 452
  const flightBob =
    frame < 452
      ? Math.sin(frame * 0.14) *
        14 *
        interpolate(frame, [410, 452], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
      : 0;

  // Flower weight dip physics after landing (frame 450 -> settles)
  const landProgress = interpolate(frame, [446, 464, 495, 530], [0, 1.0, 0.55, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flowerDipPx = landProgress * 18;

  const beeY =
    interpolate(
      frame,
      [0, 180, 270, 360, 430, 452, 720],
      [-70, -55, -20, -45, -72, -70, -68],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ) +
    flightBob +
    flowerDipPx * 0.65;

  const beeZ = interpolate(
    frame,
    [0, 210, 330, 452, 720],
    [180, 220, 270, 300, 300],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Multi-view rotation: 0.5 (three-quarter) -> 0.92 (side profile) -> 0.58 (3/4 foraging)
  const yaw = interpolate(
    frame,
    [0, 240, 360, 452, 560, 720],
    [0.55, 0.75, 0.92, 0.78, 0.48, 0.58],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const pitchDeg = interpolate(
    frame,
    [150, 260, 360, 435, 455, 520, 720],
    [-10, -14, -8, 12, 4, 14, 10],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const rollDeg = interpolate(
    frame,
    [150, 270, 380, 452, 720],
    [4, -6, 5, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const wingActivity = interpolate(
    frame,
    [0, 435, 465, 520, 720],
    [1, 1, 0.15, 0.08, 0.08],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const legExtend = interpolate(
    frame,
    [390, 445, 460, 720],
    [0.15, 0.95, 0.85, 0.8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const pollenLoad = interpolate(
    frame,
    [455, 510, 620, 720],
    [0, 0.35, 0.95, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const pollenRemain = interpolate(
    frame,
    [455, 620],
    [1.0, 0.45],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const beeScale = interpolate(
    frame,
    [0, 330, 452],
    [0.65, 0.72, 0.78],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

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
    eyeLookX: interpolate(frame, [300, 430, 500, 620], [1.5, 2.0, 0.5, 1.2], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    eyeLookY: interpolate(frame, [300, 430, 500, 620], [0.5, 1.8, 1.2, 0.8], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    antennaAlert: interpolate(frame, [200, 360, 455, 580], [0.2, 0.6, 0.9, 0.5], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    facing: 1,
    scale: beeScale,
  };

  // Ambient floating golden pollen & morning sun dust motes
  const motes = React.useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: ((i * 173) % 1800) - 900,
        y: ((i * 97) % 620) - 340,
        z: 80 + ((i * 61) % 620),
        r: 2.2 + (i % 3) * 1.4,
        speed: 0.018 + (i % 4) * 0.007,
      })),
    []
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFF3D6', overflow: 'hidden' }}>
      <FontInjector />
      <Audio src={staticFile('audio/bee_pilot_sfx_music.mp3')} />

      {/* Far Sky & Sunrise Sunbeams */}
      <SunriseMeadowBackdrop frame={frame} warmth={0.95} />

      <StageViewport camera={effectiveCamera}>
        {/* Layer 1: Distant Botanical Hills (z = 1600) */}
        <DepthLayer worldX={0} worldY={160} worldZ={1600} camera={effectiveCamera} blurPx={1.2}>
          <DistantBotanicalHills />
        </DepthLayer>

        {/* Layer 2: Midground Meadow Ridge & Distant Wooden Hive (z = 950) */}
        <DepthLayer worldX={0} worldY={155} worldZ={950} camera={effectiveCamera} blurPx={0.4}>
          <MidgroundMeadowRidge />
        </DepthLayer>

        {/* Layer 3: Meadow Grass Ground (z = 420) */}
        <DepthLayer worldX={0} worldY={255} worldZ={420} camera={effectiveCamera}>
          <MeadowGroundLayer frame={frame} />
        </DepthLayer>

        {/* Layer 4: Secondary Background Flowers (z = 480..540) */}
        <DepthLayer worldX={-340} worldY={125} worldZ={500} camera={effectiveCamera} blurPx={0.6}>
          <BotanicalFlower frame={frame + 20} variant="hibiscus-coral" scale={0.9} />
        </DepthLayer>
        <DepthLayer worldX={110} worldY={135} worldZ={540} camera={effectiveCamera} blurPx={0.7}>
          <BotanicalFlower frame={frame + 45} variant="cosmos-gold" scale={0.85} />
        </DepthLayer>
        <DepthLayer worldX={620} worldY={118} worldZ={470} camera={effectiveCamera} blurPx={0.5}>
          <BotanicalFlower frame={frame + 12} variant="hibiscus-coral" scale={0.95} />
        </DepthLayer>

        {/* Layer 5: Hero Flower (z = 300) */}
        <DepthLayer worldX={375} worldY={128} worldZ={300} camera={effectiveCamera}>
          <BotanicalFlower
            frame={frame}
            variant="cosmos-gold"
            weightDip={landProgress}
            pollenRemain={pollenRemain}
            stigmaPollinated={interpolate(frame, [520, 660], [0, 0.8], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
            scale={1.32}
          />
        </DepthLayer>

        {/* Layer 6: Hero Honeybee */}
        {frame >= 90 && (
          <DepthLayer worldX={beeX} worldY={beeY} worldZ={beeZ} camera={effectiveCamera}>
            <HeroBeeRig frame={frame} pose={beePose} />
          </DepthLayer>
        )}

        {/* Layer 7: Ambient Sun Motes */}
        {motes.map((m) => {
          const mx = m.x + Math.sin(frame * m.speed + m.id) * 24;
          const my = m.y + Math.cos(frame * m.speed * 0.8 + m.id) * 16;
          return (
            <DepthLayer
              key={m.id}
              worldX={mx}
              worldY={my}
              worldZ={m.z}
              camera={effectiveCamera}
              opacity={0.55 + 0.35 * Math.sin(frame * 0.05 + m.id)}
            >
              <div
                style={{
                  width: m.r * 2.4,
                  height: m.r * 2.4,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #FFF9D2 0%, rgba(255,210,90,0) 72%)',
                }}
              />
            </DepthLayer>
          );
        })}

        {/* Layer 8: Extreme Foreground Blurred Flora (z = -180..-240) */}
        <DepthLayer worldX={-520} worldY={230} worldZ={-180} camera={effectiveCamera} blurPx={4.5}>
          <ForegroundBlurredFlora frame={frame} side="left" />
        </DepthLayer>
        <DepthLayer worldX={680} worldY={250} worldZ={-210} camera={effectiveCamera} blurPx={5.0}>
          <ForegroundBlurredFlora frame={frame} side="right" />
        </DepthLayer>
      </StageViewport>

      {/* Minimal Bengali Kinetic Title */}
      <MinimalBanglaTitle
        frame={frame}
        startFrame={35}
        endFrame={210}
        text="ফুল থেকে মধু"
        theme="meadow"
        align="left"
        size={72}
      />

      {/* Subtle warm cinematic vignette */}
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
