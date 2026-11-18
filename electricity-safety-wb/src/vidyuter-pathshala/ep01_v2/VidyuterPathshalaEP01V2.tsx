import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FontInjector } from '../../kinetic-master/FontInjector';
import { FilmGrade } from '../historical/scene1/Scene1Shared';
import { Ep01V2Intro } from './Ep01V2Intro';
import { Ep01WinterHookScene } from './Ep01WinterHookScene';
import { Ep01BrokenTimelineScene, Ep01MiletusScene } from './Ep01MiletusAndTimelineScene';
import { Ep01MicroPhysicsScene, Ep01SwitchBulbScene } from './Ep01MicroPhysicsScene';
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

/**
 * One beat's sound: narration + score + ambience/foley. Score and fx stems are rendered to the exact
 * beat length by scripts/synthesize_ep01v2_sound.py with levels and VO ducking baked in — keep volume 1.
 * Re-run that script whenever a beat's duration or a cue frame changes.
 */
const BeatAudio: React.FC<{ vo: string; act: string }> = ({ vo, act }) => (
  <>
    <Audio src={staticFile(`vidyuter-pathshala/audio/ep01_v2/${vo}.mp3`)} volume={1.0} />
    <Audio src={staticFile(`vidyuter-pathshala/audio/ep01_v2/music/music_${act}.mp3`)} volume={1.0} />
    <Audio src={staticFile(`vidyuter-pathshala/audio/ep01_v2/fx/fx_${act}.mp3`)} volume={1.0} />
  </>
);

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

      <Sequence from={f0} durationInFrames={EP01_V2_DURATIONS.intro}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_v2/music/intro_sting.mp3')} volume={1.0} />
        <Ep01V2Intro frame={frame} />
      </Sequence>

      <Sequence from={f1} durationInFrames={EP01_V2_DURATIONS.act1}>
        <BeatAudio vo="act1_hook" act="act1" />
        <Ep01WinterHookScene frame={frame} local={frame - f1} duration={EP01_V2_DURATIONS.act1} />
      </Sequence>

      <Sequence from={f2a} durationInFrames={EP01_V2_DURATIONS.act2a}>
        <BeatAudio vo="act2a_miletus" act="act2a" />
        <Ep01MiletusScene frame={frame} local={frame - f2a} duration={EP01_V2_DURATIONS.act2a} />
      </Sequence>

      <Sequence from={f2b} durationInFrames={EP01_V2_DURATIONS.act2b}>
        <BeatAudio vo="act2b_timeline" act="act2b" />
        <Ep01BrokenTimelineScene frame={frame} local={frame - f2b} duration={EP01_V2_DURATIONS.act2b} />
      </Sequence>

      <Sequence from={f3} durationInFrames={EP01_V2_DURATIONS.act3}>
        <BeatAudio vo="act3_physics" act="act3" />
        <Ep01MicroPhysicsScene frame={frame} local={frame - f3} duration={EP01_V2_DURATIONS.act3} />
      </Sequence>

      <Sequence from={f3e} durationInFrames={EP01_V2_DURATIONS.act3e}>
        <BeatAudio vo="act3e_switch_bulb" act="act3e" />
        <Ep01SwitchBulbScene frame={frame} local={frame - f3e} duration={EP01_V2_DURATIONS.act3e} />
      </Sequence>

      <Sequence from={f4} durationInFrames={EP01_V2_DURATIONS.act4}>
        <BeatAudio vo="act4_confusion" act="act4" />
        <Ep01ConfusionOutroScene frame={frame} local={frame - f4} duration={EP01_V2_DURATIONS.act4} />
      </Sequence>

      <FilmGrade frame={frame} vignette={0.5} />
    </div>
  );
};
