import React from 'react';
import { Audio, Loop, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FontInjector } from '../../kinetic-master/FontInjector';
import { FilmGrade } from '../historical/scene1/Scene1Shared';
import { Ep03SeriesIntro } from './Ep03SeriesIntro';
import { Stage1VoltaicShot } from './Stage1VoltaicShot';
import { Stage2CopperRailTimeline } from './Stage2CopperRailTimeline';
import { Stage3WireCrashZoomShot } from './Stage3WireCrashZoomShot';
import { Stage4APondVsCopper } from './Stage4APondVsCopper';
import { Stage4BMarbleAndAmmeter } from './Stage4BMarbleAndAmmeter';
import { Stage4CRecapVoltageTeaser } from './Stage4CRecapVoltageTeaser';

export const EP03_DURATIONS = {
  intro: 180,          // 3.00s
  stage1: 2116,        // 34.96s (2098f) + 18f
  stage2: 1943,        // 32.08s (1925f) + 18f
  stage3: 944,         // 15.44s (926f) + 18f
  stage4a: 1516,       // 24.96s (1498f) + 18f
  stage4b: 2144,       // 35.44s (2126f) + 18f
  stage4c: 1045,       // 17.12s (1027f) + 18f
};

export const EP03_TOTAL_FRAMES =
  EP03_DURATIONS.intro +
  EP03_DURATIONS.stage1 +
  EP03_DURATIONS.stage2 +
  EP03_DURATIONS.stage3 +
  EP03_DURATIONS.stage4a +
  EP03_DURATIONS.stage4b +
  EP03_DURATIONS.stage4c; // 9,888 frames (~164.80s @ 60fps)

export const VidyuterPathshalaEP03: React.FC = () => {
  const frame = useCurrentFrame();

  const f0 = 0;
  const f1 = f0 + EP03_DURATIONS.intro;
  const f2 = f1 + EP03_DURATIONS.stage1;
  const f3 = f2 + EP03_DURATIONS.stage2;
  const f4a = f3 + EP03_DURATIONS.stage3;
  const f4b = f4a + EP03_DURATIONS.stage4a;
  const f4c = f4b + EP03_DURATIONS.stage4b;

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, backgroundColor: '#050811', overflow: 'hidden' }}>
      <FontInjector />

      <Loop durationInFrames={1920}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/ep01_ambient_bed.mp3')} volume={0.11} />
      </Loop>

      {/* INTRO: SERIES & EPISODE 03 */}
      <Sequence from={f0} durationInFrames={EP03_DURATIONS.intro}>
        <Ep03SeriesIntro frame={frame} />
        <Sequence from={20} durationInFrames={80}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep03/sfx_whoosh_zoom.mp3')} volume={0.32} />
        </Sequence>
      </Sequence>

      {/* STAGE 1: 1800 ITALY — LEYDEN SPARK -> VOLTAIC PILE -> ELECTROLYSIS */}
      <Sequence from={f1} durationInFrames={EP03_DURATIONS.stage1}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep03/stage1_volta.mp3')} volume={1.0} />
        <Sequence from={420} durationInFrames={30}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep03/sfx_leyden_crack.mp3')} volume={0.38} />
        </Sequence>
        <Stage1VoltaicShot frame={frame} local={frame - f1} duration={EP03_DURATIONS.stage1} />
      </Sequence>

      {/* STAGE 2: CONTINUOUS COPPER RAIL TIMELINE */}
      <Sequence from={f2} durationInFrames={EP03_DURATIONS.stage2}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep03/stage2_timeline.mp3')} volume={1.0} />
        <Stage2CopperRailTimeline frame={frame} local={frame - f2} duration={EP03_DURATIONS.stage2} />
      </Sequence>

      {/* STAGE 3: MACRO CRASH-ZOOM INTO COPPER CABLE */}
      <Sequence from={f3} durationInFrames={EP03_DURATIONS.stage3}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep03/stage3_crashzoom.mp3')} volume={1.0} />
        <Sequence from={460} durationInFrames={80}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep03/sfx_whoosh_zoom.mp3')} volume={0.35} />
        </Sequence>
        <Stage3WireCrashZoomShot frame={frame} local={frame - f3} duration={EP03_DURATIONS.stage3} />
      </Sequence>

      {/* STAGE 4A: STANDING POND VS FLOWING RIVER -> COPPER CRYSTAL LATTICE */}
      <Sequence from={f4a} durationInFrames={EP03_DURATIONS.stage4a}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep03/stage4a_copper.mp3')} volume={1.0} />
        <Stage4APondVsCopper frame={frame} local={frame - f4a} duration={EP03_DURATIONS.stage4a} />
      </Sequence>

      {/* STAGE 4B: MARBLE PIPE -> CHECKPOINT GATE & AMMETER -> CIRCUIT DIRECTION */}
      <Sequence from={f4b} durationInFrames={EP03_DURATIONS.stage4b}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep03/stage4b_marble_ammeter.mp3')} volume={1.0} />
        <Sequence from={390} durationInFrames={60}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep03/sfx_bell_ding.mp3')} volume={0.36} />
        </Sequence>
        <Stage4BMarbleAndAmmeter frame={frame} local={frame - f4b} duration={EP03_DURATIONS.stage4b} />
      </Sequence>

      {/* STAGE 4C: 3-ICON RECAP & EP04 VOLTAGE TEASER */}
      <Sequence from={f4c} durationInFrames={EP03_DURATIONS.stage4c}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep03/stage4c_recap_teaser.mp3')} volume={1.0} />
        <Stage4CRecapVoltageTeaser frame={frame} local={frame - f4c} duration={EP03_DURATIONS.stage4c} />
      </Sequence>

      <FilmGrade frame={frame} vignette={0.5} />
    </div>
  );
};
