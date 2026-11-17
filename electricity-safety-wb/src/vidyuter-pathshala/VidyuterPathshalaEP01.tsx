import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Invisible } from './scenes/Scene2Invisible';
import { Scene3Atoms } from './scenes/Scene3Atoms';
import { Scene4Static } from './scenes/Scene4Static';
import { Scene5Current } from './scenes/Scene5Current';
import { Scene6Applications } from './scenes/Scene6Applications';
import { Scene7Takeaways } from './scenes/Scene7Takeaways';
import { Scene8Outro } from './scenes/Scene8Outro';

export interface SceneTiming {
  id: string;
  durationInFrames: number;
}

export const EP01_SCENES_60FPS: SceneTiming[] = [
  { id: 'scene_1', durationInFrames: 1549 },
  { id: 'scene_2', durationInFrames: 1737 },
  { id: 'scene_3', durationInFrames: 2553 },
  { id: 'scene_4', durationInFrames: 2301 },
  { id: 'scene_5', durationInFrames: 3426 },
  { id: 'scene_6', durationInFrames: 1613 },
  { id: 'scene_7', durationInFrames: 1554 },
  { id: 'scene_8', durationInFrames: 1960 },
];

export const EP01_TOTAL_FRAMES_60FPS = EP01_SCENES_60FPS.reduce(
  (acc, s) => acc + s.durationInFrames,
  0
); // 16693 frames

export const VidyuterPathshalaEP01: React.FC = () => {
  let accumulatedFrames = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0F19' }}>
      {/* Background Ambient Music (Low volume ducked bed) */}
      <Audio
        src={staticFile('vidyuter-pathshala/audio/bg_music.mp3')}
        volume={0.12}
        loop
      />

      {/* Scene 1: The Hook */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[0].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_1.mp3')}
          volume={1.0}
        />
        <Scene1Hook durationInFrames={EP01_SCENES_60FPS[0].durationInFrames} />
      </Sequence>
      {(() => {
        accumulatedFrames += EP01_SCENES_60FPS[0].durationInFrames;
        return null;
      })()}

      {/* Scene 2: Invisible Phenomenon */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[1].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_2.mp3')}
          volume={1.0}
        />
        <Scene2Invisible durationInFrames={EP01_SCENES_60FPS[1].durationInFrames} />
      </Sequence>
      {(() => {
        accumulatedFrames += EP01_SCENES_60FPS[1].durationInFrames;
        return null;
      })()}

      {/* Scene 3: Atoms & Electric Charge */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[2].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_3.mp3')}
          volume={1.0}
        />
        <Scene3Atoms durationInFrames={EP01_SCENES_60FPS[2].durationInFrames} />
      </Sequence>
      {(() => {
        accumulatedFrames += EP01_SCENES_60FPS[2].durationInFrames;
        return null;
      })()}

      {/* Scene 4: Static Electricity */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[3].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_4.mp3')}
          volume={1.0}
        />
        <Scene4Static durationInFrames={EP01_SCENES_60FPS[3].durationInFrames} />
      </Sequence>
      {(() => {
        accumulatedFrames += EP01_SCENES_60FPS[3].durationInFrames;
        return null;
      })()}

      {/* Scene 5: Current Electricity */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[4].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_5.mp3')}
          volume={1.0}
        />
        <Scene5Current durationInFrames={EP01_SCENES_60FPS[4].durationInFrames} />
      </Sequence>
      {(() => {
        accumulatedFrames += EP01_SCENES_60FPS[4].durationInFrames;
        return null;
      })()}

      {/* Scene 6: Electricity Around Us */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[5].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_6.mp3')}
          volume={1.0}
        />
        <Scene6Applications durationInFrames={EP01_SCENES_60FPS[5].durationInFrames} />
      </Sequence>
      {(() => {
        accumulatedFrames += EP01_SCENES_60FPS[5].durationInFrames;
        return null;
      })()}

      {/* Scene 7: The Big Takeaway */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[6].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_7.mp3')}
          volume={1.0}
        />
        <Scene7Takeaways durationInFrames={EP01_SCENES_60FPS[6].durationInFrames} />
      </Sequence>
      {(() => {
        accumulatedFrames += EP01_SCENES_60FPS[6].durationInFrames;
        return null;
      })()}

      {/* Scene 8: Recap & Next Teaser */}
      <Sequence
        from={accumulatedFrames}
        durationInFrames={EP01_SCENES_60FPS[7].durationInFrames}
      >
        <Audio
          src={staticFile('vidyuter-pathshala/audio/scene_8.mp3')}
          volume={1.0}
        />
        <Scene8Outro durationInFrames={EP01_SCENES_60FPS[7].durationInFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Also export a concise 30-second preview version for rapid testing
export const VidyuterPathshalaEP01Preview: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0F19' }}>
      <Audio
        src={staticFile('vidyuter-pathshala/audio/scene_1.mp3')}
        volume={1.0}
      />
      <Scene1Hook durationInFrames={900} />
    </AbsoluteFill>
  );
};
