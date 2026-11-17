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
  Camera25DKeyframe,
  DepthLayer,
  EASE_FILM,
  EASE_SMOOTH,
  StageViewport,
  interpolateCamera25D,
} from './DepthStage25D';
import {
  ApiaryShedAndTrees,
  DistantGreenHills,
  ForegroundWildflowers,
  HeroFlowerCluster,
  HiveInteriorScene,
  HoneybeeRig,
  MeadowPathPlane,
  SunlitMeadowSky,
} from './BeeAndHiveAssets';
import { MeeraRig, useMeeraFilmPerformance } from './MeeraRig';
import { BanglaKineticBeat } from './BanglaTypeSystem';

const FILM_CAMERA_KEYFRAMES: Camera25DKeyframe[] = [
  // Act 1 (0-480f): Low-angle meadow glide -> follow Meera's walk & discovery
  { frame: 0, state: { x: -340, y: 155, z: -140, zoom: 1.05, roll: -0.4 } },
  { frame: 140, state: { x: -165, y: 126, z: 240, zoom: 1.28, roll: 0 }, easing: EASE_FILM },
  { frame: 320, state: { x: -55, y: 124, z: 320, zoom: 1.38, roll: 0 }, easing: EASE_SMOOTH },
  // Act 2 (480-1080f): Macro push-in to Meera + blooming flowers + bee pollination
  { frame: 520, state: { x: 25, y: 138, z: 430, zoom: 1.56, roll: 0.2 }, easing: EASE_FILM },
  { frame: 820, state: { x: 75, y: 150, z: 490, zoom: 1.66, roll: 0 }, easing: EASE_SMOOTH },
  { frame: 1080, state: { x: 110, y: 142, z: 540, zoom: 1.72, roll: 0 }, easing: EASE_SMOOTH },
  // Act 5 (2520-3000f): Golden-hour wide orchard pull-back
  { frame: 2520, state: { x: -40, y: 120, z: 360, zoom: 1.4, roll: 0 }, easing: Easing.step0 },
  { frame: 2720, state: { x: -10, y: 118, z: 90, zoom: 1.08, roll: 0 }, easing: EASE_FILM },
  { frame: 3000, state: { x: 0, y: 112, z: 40, zoom: 1.02, roll: 0 }, easing: EASE_SMOOTH },
];

export const HoneybeeExplainerFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const camera = interpolateCamera25D(frame, FILM_CAMERA_KEYFRAMES);
  const meeraPose = useMeeraFilmPerformance(frame, false);

  // Hive interior crossfade (Acts 3 & 4: frames 1040-2550)
  const hiveOpacity =
    frame < 1040 || frame > 2550
      ? 0
      : interpolate(frame, [1040, 1100, 2490, 2550], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: EASE_SMOOTH,
        });

  const honeyFill = interpolate(frame, [1220, 2150], [0.1, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_SMOOTH,
  });

  const evaporationIntensity =
    frame < 1800 || frame > 2460
      ? 0
      : interpolate(frame, [1800, 1900, 2320, 2460], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: EASE_SMOOTH,
        });

  const capProgress = interpolate(frame, [2180, 2460], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_SMOOTH,
  });

  const goldenHour = interpolate(frame, [2480, 2600], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Hero Bee flight path across Meadow & Flowers (Acts 1, 2, 5)
  const beeX = interpolate(
    frame,
    [40, 250, 480, 740, 960, 1080, 2520, 3000],
    [-420, -20, 125, 42, 130, 260, 40, 210],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_SMOOTH }
  );
  const beeY =
    interpolate(
      frame,
      [40, 250, 480, 740, 960, 1080, 2520, 3000],
      [90, 115, 148, 170, 145, 110, 130, 100],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_SMOOTH }
    ) +
    Math.sin(frame * 0.13) * 11;

  const pollenLoad = interpolate(frame, [500, 780, 980], [0.1, 0.95, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Enzyme-to-sugar integrated visual metaphor inside Act 3 (1260-1760f)
  const chemOpacity =
    frame < 1260 || frame > 1760
      ? 0
      : interpolate(frame, [1260, 1310, 1700, 1760], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FCE7BC', overflow: 'hidden' }}>
      <FontInjector />

      <Audio
        src={staticFile('audio/honeybee_soundtrack.mp3')}
        volume={(f) =>
          interpolate(f, [0, 20, 2940, 3000], [0, 0.92, 0.92, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />

      {/* OUTDOOR MEADOW WORLD (Acts 1, 2, 5) */}
      {hiveOpacity < 0.99 && (
        <AbsoluteFill style={{ opacity: 1 - hiveOpacity }}>
          <SunlitMeadowSky frame={frame} goldenHour={goldenHour} />
          <StageViewport camera={camera}>
            <DepthLayer worldX={0} worldY={220} worldZ={1600} camera={camera}>
              <DistantGreenHills />
            </DepthLayer>
            <DepthLayer worldX={0} worldY={228} worldZ={1150} camera={camera}>
              <ApiaryShedAndTrees />
            </DepthLayer>
            <DepthLayer worldX={0} worldY={252} worldZ={40} camera={camera}>
              <MeadowPathPlane frame={frame} />
            </DepthLayer>

            {/* Hero Flower Cluster */}
            <DepthLayer worldX={95} worldY={268} worldZ={12} camera={camera}>
              <HeroFlowerCluster frame={frame} pollenGlow={pollenLoad} />
            </DepthLayer>

            {/* Hero Character: Meera */}
            <DepthLayer worldX={meeraPose.worldX} worldY={meeraPose.worldY} worldZ={0} camera={camera}>
              <MeeraRig pose={meeraPose} />
            </DepthLayer>

            {/* Hero Honeybee */}
            <DepthLayer worldX={beeX} worldY={beeY} worldZ={-8} camera={camera}>
              <HoneybeeRig frame={frame} scale={0.82} facing={1} pollenLoad={pollenLoad} />
            </DepthLayer>

            {/* Foreground Swaying Wildflowers (4x faster parallax) */}
            <DepthLayer worldX={-540} worldY={370} worldZ={-280} camera={camera} blurPx={1.3}>
              <ForegroundWildflowers frame={frame} side="left" />
            </DepthLayer>
            <DepthLayer worldX={560} worldY={375} worldZ={-310} camera={camera} blurPx={1.4}>
              <ForegroundWildflowers frame={frame} side="right" />
            </DepthLayer>
          </StageViewport>
        </AbsoluteFill>
      )}

      {/* LIVING HIVE INTERIOR WORLD (Acts 3 & 4) */}
      <HiveInteriorScene
        frame={frame}
        opacity={hiveOpacity}
        honeyFill={honeyFill}
        evaporationIntensity={evaporationIntensity}
        capProgress={capProgress}
      />

      {/* Integrated Nectar -> Enzyme -> Simple Sugars Visual Metaphor (Act 3) */}
      {chemOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 110,
            bottom: 130,
            opacity: chemOpacity,
            pointerEvents: 'none',
          }}
        >
          <svg width={760} height={190} viewBox="0 0 760 190">
            <rect x="0" y="0" width="760" height="190" rx="22" fill="#2A1304" fillOpacity="0.74" stroke="#E8A23A" strokeWidth="2" />
            {/* Nectar Droplet */}
            <path d="M95 52 Q125 96 125 118 A30 30 0 1 1 65 118 Q65 96 95 52 Z" fill="#F6C85F" />
            <text x="95" y="168" textAnchor="middle" fill="#FFF2D6" fontSize="19" fontFamily="Hind Siliguri, sans-serif">
              ফুলের রস (নেক্টার)
            </text>
            {/* Arrow 1 + Enzyme */}
            <path d="M165 102 L275 102" stroke="#FFD67A" strokeWidth="3.5" strokeDasharray="8 6" />
            <circle cx="220" cy="72" r="18" fill="#D96B27" />
            <text x="220" y="42" textAnchor="middle" fill="#FFD67A" fontSize="18" fontFamily="Hind Siliguri, sans-serif">
              ইনভার্টেজ এনজাইম
            </text>
            {/* Split into Glucose + Fructose */}
            <circle cx="355" cy="78" r="24" fill="#F9B83C" />
            <circle cx="355" cy="128" r="24" fill="#E88928" />
            <text x="410" y="84" fill="#FFF2D6" fontSize="22" fontWeight="700" fontFamily="Hind Siliguri, sans-serif">
              গ্লুকোজ
            </text>
            <text x="410" y="135" fill="#FFF2D6" fontSize="22" fontWeight="700" fontFamily="Hind Siliguri, sans-serif">
              ফ্রুক্টোজ (সরল শর্করা)
            </text>
          </svg>
        </div>
      )}

      {/* BENGALI KINETIC TYPOGRAPHY ACROSS ALL 5 ACTS */}
      <BanglaKineticBeat
        frame={frame}
        startFrame={120}
        endFrame={455}
        eyebrow="ভোরের বাগান"
        headline="ফুল থেকে ফোঁটা প্রকৃতির মিষ্টি জাদু"
        accentWord="মিষ্টি জাদু"
        subline="একটি ছোট্ট মৌমাছির যাত্রা শুরু"
      />
      <BanglaKineticBeat
        frame={frame}
        startFrame={530}
        endFrame={1040}
        align="right"
        eyebrow="পরাগায়ন"
        headline="এক ফুলে মধু অন্য ফুলে পরাগরেণু"
        accentWord="পরাগরেণু"
        subline="এই আদান-প্রদানেই জন্ম নেয় নতুন ফল ও বীজ"
      />
      <BanglaKineticBeat
        frame={frame}
        startFrame={1130}
        endFrame={1760}
        theme="hive"
        accentColor="#FFD166"
        eyebrow="মৌচাকের রসায়ন"
        headline="এনজাইমের স্পর্শে নেক্টার হয় সরল শর্করা"
        accentWord="সরল শর্করা"
        subline="মৌমাছির মুখ থেকে মৌচাকের ষড়ভুজ কোষে"
      />
      <BanglaKineticBeat
        frame={frame}
        startFrame={1840}
        endFrame={2470}
        theme="hive"
        accentColor="#FFD166"
        eyebrow="ডানার বাতাস ও সংরক্ষণ"
        headline="জল উড়ে গিয়ে তৈরি হয় খাঁটি মধু"
        accentWord="খাঁটি মধু"
        subline="শেষে মোমের ঢাকনায় সিল হয়ে থাকে দীর্ঘদিন"
      />
      <BanglaKineticBeat
        frame={frame}
        startFrame={2560}
        endFrame={2980}
        eyebrow="প্রকৃতির বন্ধন"
        headline="মৌমাছি বাঁচায় আমাদের সবুজ পৃথিবী"
        accentWord="সবুজ পৃথিবী"
        subline="পরাগায়নেই সমৃদ্ধ হয় ফসল, ফুল ও জীবন"
      />
    </AbsoluteFill>
  );
};

