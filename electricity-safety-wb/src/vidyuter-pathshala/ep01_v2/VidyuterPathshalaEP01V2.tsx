import React from 'react';
import { Audio, Loop, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FontInjector } from '../../kinetic-master/FontInjector';
import { FilmGrade } from '../historical/scene1/Scene1Shared';
import { Ep01V2Intro } from './Ep01V2Intro';
import { ACT1_CUES, Ep01WinterHookScene } from './Ep01WinterHookScene';
import { Ep01BrokenTimelineScene, Ep01MiletusScene } from './Ep01MiletusAndTimelineScene';
import { ACT3E_CUES, Ep01MicroPhysicsScene, Ep01SwitchBulbScene } from './Ep01MicroPhysicsScene';
import { Ep01ConfusionOutroScene } from './Ep01ConfusionOutroScene';

export const EP01_V2_DURATIONS = {
  intro: 180,          // 3.00s
  act1: 1218,          // 20.00s (1200f) + 18f
  act2a: 1372,         // 22.56s (1354f) + 18f
  act2b: 2192,         // 36.24s (2174f) + 18f
  act3: 1664,          // 27.44s (1646f) + 18f
  act3e: 1837,         // 30.32s (1819f) + 18f
  act4: 2106,          // 34.80s (2088f) + 18f
};

export const EP01_V2_TOTAL_FRAMES =
  EP01_V2_DURATIONS.intro +
  EP01_V2_DURATIONS.act1 +
  EP01_V2_DURATIONS.act2a +
  EP01_V2_DURATIONS.act2b +
  EP01_V2_DURATIONS.act3 +
  EP01_V2_DURATIONS.act3e +
  EP01_V2_DURATIONS.act4; // 10,569 frames (~176.15s @ 60fps)

export const VidyuterPathshalaEP01V2: React.FC = () => {
  const frame = useCurrentFrame();

  const f0 = 0;
  const f1 = f0 + EP01_V2_DURATIONS.intro;
  const f2a = f1 + EP01_V2_DURATIONS.act1;
  const f2b = f2a + EP01_V2_DURATIONS.act2a;
  const f3 = f2b + EP01_V2_DURATIONS.act2b;
  const f3e = f3 + EP01_V2_DURATIONS.act3;
  const f4 = f3e + EP01_V2_DURATIONS.act3e;

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, backgroundColor: '#050811', overflow: 'hidden' }}>
      <FontInjector />
      {/* SVG <text> otherwise falls back to Times New Roman; tabular figures keep counters from jittering */}
      <style>{`svg text { font-family: 'Hind Siliguri', 'Noto Sans Bengali', sans-serif; font-variant-numeric: tabular-nums; }`}</style>

      <Loop durationInFrames={1920}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/ep01_ambient_bed.mp3')} volume={0.11} />
      </Loop>

      <Sequence from={f0} durationInFrames={EP01_V2_DURATIONS.intro}>
        <Ep01V2Intro frame={frame} />
      </Sequence>

      <Sequence from={f1} durationInFrames={EP01_V2_DURATIONS.act1}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/act1_hook.mp3')} volume={1.0} />
        {/* SFX cued to VO: "চটপট!" @5.57s (334f), whip-pan @470f, switch press @590f */}
        <Sequence from={ACT1_CUES.snap} durationInFrames={30}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/sfx_blanket_snap.mp3')} volume={0.35} />
        </Sequence>
        <Sequence from={ACT1_CUES.snap} durationInFrames={90}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_spark_crackle.mp3')} volume={0.3} />
        </Sequence>
        <Sequence from={ACT1_CUES.whip - 6} durationInFrames={60}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_whoosh_dive.mp3')} volume={0.22} />
        </Sequence>
        <Sequence from={ACT1_CUES.switchPress} durationInFrames={24}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/sfx_switch_click.mp3')} volume={0.38} />
        </Sequence>
        <Ep01WinterHookScene frame={frame} local={frame - f1} duration={EP01_V2_DURATIONS.act1} />
      </Sequence>

      <Sequence from={f2a} durationInFrames={EP01_V2_DURATIONS.act2a}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/act2a_miletus.mp3')} volume={1.0} />
        <Ep01MiletusScene frame={frame} local={frame - f2a} duration={EP01_V2_DURATIONS.act2a} />
      </Sequence>

      <Sequence from={f2b} durationInFrames={EP01_V2_DURATIONS.act2b}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/act2b_timeline.mp3')} volume={1.0} />
        <Ep01BrokenTimelineScene frame={frame} local={frame - f2b} duration={EP01_V2_DURATIONS.act2b} />
      </Sequence>

      <Sequence from={f3} durationInFrames={EP01_V2_DURATIONS.act3}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/act3_physics.mp3')} volume={1.0} />
        <Ep01MicroPhysicsScene frame={frame} local={frame - f3} duration={EP01_V2_DURATIONS.act3} />
      </Sequence>

      <Sequence from={f3e} durationInFrames={EP01_V2_DURATIONS.act3e}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/act3e_switch_bulb.mp3')} volume={1.0} />
        <Sequence from={ACT3E_CUES.press + 8} durationInFrames={24}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/sfx_switch_click.mp3')} volume={0.38} />
        </Sequence>
        <Ep01SwitchBulbScene frame={frame} local={frame - f3e} duration={EP01_V2_DURATIONS.act3e} />
      </Sequence>

      <Sequence from={f4} durationInFrames={EP01_V2_DURATIONS.act4}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/act4_confusion.mp3')} volume={1.0} />
        <Ep01ConfusionOutroScene frame={frame} local={frame - f4} duration={EP01_V2_DURATIONS.act4} />
      </Sequence>

      <FilmGrade frame={frame} vignette={0.5} />
    </div>
  );
};
