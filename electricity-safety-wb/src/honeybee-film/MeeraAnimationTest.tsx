import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import {
  Camera25DKeyframe,
  DepthLayer,
  EASE_FILM,
  StageViewport,
  interpolateCamera25D,
} from './DepthStage25D';
import {
  ApiaryShedAndTrees,
  DistantGreenHills,
  ForegroundWildflowers,
  HeroFlowerCluster,
  HoneybeeRig,
  MeadowPathPlane,
  SunlitMeadowSky,
} from './BeeAndHiveAssets';
import { MeeraRig, useMeeraFilmPerformance } from './MeeraRig';

export const MeeraAnimationTest: React.FC = () => {
  const frame = useCurrentFrame();
  const pose = useMeeraFilmPerformance(frame, true);

  const cameraKeyframes: Camera25DKeyframe[] = [
    { frame: 0, state: { x: -195, y: 120, z: 360, zoom: 1.46, roll: 0 } },
    {
      frame: 100,
      state: { x: -30, y: 120, z: 360, zoom: 1.46, roll: 0 },
      easing: EASE_FILM,
    },
    {
      frame: 240,
      state: { x: 0, y: 132, z: 410, zoom: 1.54, roll: 0 },
      easing: EASE_FILM,
    },
  ];
  const camera = interpolateCamera25D(frame, cameraKeyframes);

  const beeX = interpolate(frame, [0, 96, 155, 240], [-360, 40, 88, 92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const beeY =
    interpolate(frame, [0, 96, 155, 240], [95, 110, 148, 152], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }) +
    Math.sin(frame * 0.12) * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: '#FCE7BC', overflow: 'hidden' }}>
      <SunlitMeadowSky frame={frame} />

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

        {/* Hero Blooming Flower Cluster */}
        <DepthLayer worldX={85} worldY={268} worldZ={12} camera={camera}>
          <HeroFlowerCluster frame={frame} />
        </DepthLayer>

        {/* Hero Character: Meera */}
        <DepthLayer worldX={pose.worldX} worldY={pose.worldY} worldZ={0} camera={camera}>
          <MeeraRig pose={pose} />
        </DepthLayer>

        {/* Articulated Honeybee */}
        <DepthLayer worldX={beeX} worldY={beeY} worldZ={-8} camera={camera}>
          <HoneybeeRig frame={frame} scale={0.78} facing={1} pollenLoad={0.6} />
        </DepthLayer>

        <DepthLayer worldX={-520} worldY={365} worldZ={-280} camera={camera} blurPx={1.3}>
          <ForegroundWildflowers frame={frame} side="left" />
        </DepthLayer>
        <DepthLayer worldX={540} worldY={370} worldZ={-310} camera={camera} blurPx={1.4}>
          <ForegroundWildflowers frame={frame} side="right" />
        </DepthLayer>
      </StageViewport>
    </AbsoluteFill>
  );
};

