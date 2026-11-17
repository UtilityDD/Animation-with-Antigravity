import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Beat1ElectricHook } from './Beat1ElectricHook';
import { Beat2NoMagic } from './Beat2NoMagic';
import { Beat3AtomicFury } from './Beat3AtomicFury';
import { Beat4LightExplosion } from './Beat4LightExplosion';
import { Beat5SeriesIdentity } from './Beat5SeriesIdentity';

export const KINETIC_DEMO_FRAMES = 900; // 15.00s @ 60 FPS

export const VidyuterKineticDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14' }}>
      {/* Background High-Energy Cinematic Ambient Bed */}
      <Audio
        src={staticFile('vidyuter-pathshala/audio/bg_music.mp3')}
        volume={0.12}
        loop
      />

      {/* BEAT 1: বিদ্যুৎ আসলে কী? (0.00s - 2.67s / Frames 0 - 160) */}
      <Sequence from={0} durationInFrames={160}>
        <Sequence from={14}>
          <Audio
            src={staticFile('vidyuter-pathshala/audio/kinetic_demo/beat1.wav')}
            volume={1.0}
          />
        </Sequence>
        <Beat1ElectricHook />
      </Sequence>

      {/* BEAT 2: এটা কোনো জাদু নয়! (2.67s - 5.50s / Frames 160 - 330) */}
      <Sequence from={160} durationInFrames={170}>
        <Sequence from={10}>
          <Audio
            src={staticFile('vidyuter-pathshala/audio/kinetic_demo/beat2.wav')}
            volume={1.0}
          />
        </Sequence>
        <Beat2NoMagic />
      </Sequence>

      {/* BEAT 3: পদার্থের গভীরে ইলেকট্রনের তাণ্ডব! (5.50s - 9.17s / Frames 330 - 550) */}
      <Sequence from={330} durationInFrames={220}>
        <Sequence from={12}>
          <Audio
            src={staticFile('vidyuter-pathshala/audio/kinetic_demo/beat3.wav')}
            volume={1.0}
          />
        </Sequence>
        <Beat3AtomicFury />
      </Sequence>

      {/* BEAT 4: সুইচ অন! আলোর বিস্ফোরণ! (9.17s - 12.33s / Frames 550 - 740) */}
      <Sequence from={550} durationInFrames={190}>
        <Sequence from={10}>
          <Audio
            src={staticFile('vidyuter-pathshala/audio/kinetic_demo/beat4.wav')}
            volume={1.0}
          />
        </Sequence>
        <Beat4LightExplosion />
      </Sequence>

      {/* BEAT 5: বিদ্যুতের পাঠশালা! শূন্য থেকে শিখুন। (12.33s - 15.00s / Frames 740 - 900) */}
      <Sequence from={740} durationInFrames={160}>
        <Sequence from={10}>
          <Audio
            src={staticFile('vidyuter-pathshala/audio/kinetic_demo/beat5.wav')}
            volume={1.0}
          />
        </Sequence>
        <Beat5SeriesIdentity />
      </Sequence>
    </AbsoluteFill>
  );
};
