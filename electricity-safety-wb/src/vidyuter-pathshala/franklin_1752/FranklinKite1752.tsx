import React from 'react';
import { Audio, Loop, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FontInjector } from '../../kinetic-master/FontInjector';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import { FilmGrade } from '../historical/scene1/Scene1Shared';
import { Beat1StudyShot } from './Beat1StudyShot';
import { Beat2BlueprintShot } from './Beat2BlueprintShot';
import { Beat3FieldShedShot } from './Beat3FieldShedShot';
import { Beat4RevealShot } from './Beat4RevealShot';
import { Beat5ProofRodShot } from './Beat5ProofRodShot';
import { FranklinSeriesIntro } from './FranklinSeriesIntro';

export const FRANKLIN_DURATIONS = {
  intro: 180, // 3.00s Series & Experiment Intro
  beat1: 1285, // 21.12s audio (1267f) + 18f
  beat2: 1242, // 20.40s audio (1224f) + 18f
  beat3: 1112, // 18.24s audio (1094f) + 18f
  beat4: 1228, // 20.16s audio (1210f) + 18f
  beat5: 1127, // 18.48s audio (1109f) + 18f
};

export const FRANKLIN_1752_TOTAL_FRAMES =
  FRANKLIN_DURATIONS.intro +
  FRANKLIN_DURATIONS.beat1 +
  FRANKLIN_DURATIONS.beat2 +
  FRANKLIN_DURATIONS.beat3 +
  FRANKLIN_DURATIONS.beat4 +
  FRANKLIN_DURATIONS.beat5; // 6174 frames (~102.90s @ 60fps)

/**
 * Full-Bleed 2.5D Parallax Historical Documentary:
 * "1752: The Philadelphia Kite & The Sky's Electric Fire"
 * Zero PPT boxes — every beat is a full-bleed 1920x1080 multi-plane 2.5D world
 * with camAt zoom/pan, thoughtful scientist acting, phrase-by-phrase kinetic Bangla
 * keywords, Cartesia sonic-3.6 voiceover, and synced period SFX.
 */
export const FranklinKite1752: React.FC = () => {
  const frame = useCurrentFrame();

  const f0 = 0;
  const f1 = f0 + FRANKLIN_DURATIONS.intro;
  const f2 = f1 + FRANKLIN_DURATIONS.beat1;
  const f3 = f2 + FRANKLIN_DURATIONS.beat2;
  const f4 = f3 + FRANKLIN_DURATIONS.beat3;
  const f5 = f4 + FRANKLIN_DURATIONS.beat4;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050811',
        overflow: 'hidden',
      }}
    >
      <FontInjector />

      {/* Gentle Ambient Tutorial Bed */}
      <Loop durationInFrames={1920}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/ep01_ambient_bed.mp3')} volume={0.12} />
      </Loop>

      {/* ============================================================== */}
      {/* INTRO: SERIES TITLE & POPULAR EXPERIMENT NAME (0..180f)        */}
      {/* ============================================================== */}
      <Sequence from={f0} durationInFrames={FRANKLIN_DURATIONS.intro}>
        <FranklinSeriesIntro frame={frame} />
        <Sequence from={24} durationInFrames={90}>
          <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/sfx_key_tick_jar.mp3')} volume={0.35} />
        </Sequence>
      </Sequence>

      {/* ============================================================== */}
      {/* BEAT 1: 1752 PHILADELPHIA STUDY (2.5D PARALLAX + ZOOM/TILT)    */}
      {/* ============================================================== */}
      <Sequence from={f1} durationInFrames={FRANKLIN_DURATIONS.beat1}>
        <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/beat1.mp3')} volume={1.0} />
        <Sequence from={420} durationInFrames={240}>
          <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/sfx_thunder_distant.mp3')} volume={0.22} />
        </Sequence>
        {(() => {
          const loc = frame - f1;
          return (
            <>
              <Beat1StudyShot frame={loc} />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={15}
                endFrame={380}
                lines={[{ text: 'ফিলাডেলফিয়া • ১৭৫২', highlight: '১৭৫২', sizePx: 74 }]}
                x={90}
                y={130}
                accentColor="#FBBF24"
                variant="slide"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={410}
                endFrame={760}
                lines={[{ text: 'গবেষণাগারের স্ফুলিঙ্গ', highlight: 'স্ফুলিঙ্গ', sizePx: 72 }]}
                x={90}
                y={130}
                accentColor="#38BDF8"
                variant="spark"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={790}
                endFrame={1265}
                lines={[{ text: 'বজ্রপাত ও স্ফুলিঙ্গ কি এক?', highlight: 'এক?', sizePx: 76 }]}
                x={90}
                y={130}
                accentColor="#FBBF24"
                variant="spring"
              />
            </>
          );
        })()}
      </Sequence>

      {/* ============================================================== */}
      {/* BEAT 2: DRAFTING BENCH & ENGINEERED APPARATUS                  */}
      {/* ============================================================== */}
      <Sequence from={f2} durationInFrames={FRANKLIN_DURATIONS.beat2}>
        <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/beat2.mp3')} volume={1.0} />
        {(() => {
          const loc = frame - f2;
          return (
            <>
              <Beat2BlueprintShot frame={frame} local={loc} />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={20}
                endFrame={420}
                lines={[{ text: 'সিল্কের ঘুড়ি ও ধাতব তার', highlight: 'সিল্কের', sizePx: 72 }]}
                x={1060}
                y={130}
                accentColor="#FBBF24"
                variant="slide"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={450}
                endFrame={860}
                lines={[{ text: 'শণের সুতো ও ধাতব চাবি', highlight: 'চাবি', sizePx: 72 }]}
                x={1060}
                y={130}
                accentColor="#38BDF8"
                variant="slide"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={870}
                endFrame={1220}
                lines={[{ text: 'শুকনো সিল্কে সুরক্ষা', highlight: 'সুরক্ষা', sizePx: 72 }]}
                x={1060}
                y={130}
                accentColor="#F43F5E"
                variant="spark"
              />
            </>
          );
        })()}
      </Sequence>

      {/* ============================================================== */}
      {/* BEAT 3: STORMY FIELD & DRY WOODEN SHED (2.5D PARALLAX)         */}
      {/* ============================================================== */}
      <Sequence from={f3} durationInFrames={FRANKLIN_DURATIONS.beat3}>
        <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/beat3.mp3')} volume={1.0} />
        <Loop durationInFrames={960}>
          <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/sfx_rain_gentle.mp3')} volume={0.18} />
        </Loop>
        {(() => {
          const loc = frame - f3;
          return (
            <>
              <Beat3FieldShedShot frame={frame} local={loc} />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={20}
                endFrame={560}
                lines={[{ text: 'নিরাপদ আশ্রয়', highlight: 'নিরাপদ', sizePx: 78 }]}
                x={90}
                y={130}
                accentColor="#FBBF24"
                variant="shadow"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={555}
                endFrame={1095}
                lines={[{ text: 'মেঘের অদৃশ্য চার্জ', highlight: 'চার্জ', sizePx: 76 }]}
                x={90}
                y={130}
                accentColor="#38BDF8"
                variant="slide"
              />
            </>
          );
        })()}
      </Sequence>

      {/* ============================================================== */}
      {/* BEAT 4: RISING FIBERS -> WET CONDUCTION -> KEY SPARK -> JAR    */}
      {/* ============================================================== */}
      <Sequence from={f4} durationInFrames={FRANKLIN_DURATIONS.beat4}>
        <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/beat4.mp3')} volume={1.0} />
        <Sequence from={835} durationInFrames={72}>
          <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/sfx_key_tick_jar.mp3')} volume={0.34} />
        </Sequence>
        {(() => {
          const loc = frame - f4;
          return (
            <>
              <Beat4RevealShot frame={frame} local={loc} />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={20}
                endFrame={415}
                lines={[{ text: 'শণের আঁশ খাড়া হলো!', highlight: 'খাড়া', sizePx: 76 }]}
                x={1060}
                y={140}
                accentColor="#38BDF8"
                variant="spring"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={435}
                endFrame={775}
                lines={[{ text: 'ভেজা সুতোয় চার্জ প্রবাহ', highlight: 'চার্জ', sizePx: 74 }]}
                x={1060}
                y={140}
                accentColor="#38BDF8"
                variant="slide"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={795}
                endFrame={1205}
                lines={[{ text: 'চাবিতে স্ফুলিঙ্গ ও জার!', highlight: 'স্ফুলিঙ্গ', sizePx: 76 }]}
                x={1060}
                y={140}
                accentColor="#FBBF24"
                variant="spark"
              />
            </>
          );
        })()}
      </Sequence>

      {/* ============================================================== */}
      {/* BEAT 5: COMPARISON & GROUNDED LIGHTNING ROD                    */}
      {/* ============================================================== */}
      <Sequence from={f5} durationInFrames={FRANKLIN_DURATIONS.beat5}>
        <Audio src={staticFile('vidyuter-pathshala/audio/franklin_1752/beat5.mp3')} volume={1.0} />
        {(() => {
          const loc = frame - f5;
          return (
            <>
              <Beat5ProofRodShot frame={frame} local={loc} />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={15}
                endFrame={505}
                lines={[{ text: 'আকাশ ও গবেষণাগার একই!', highlight: 'একই!', sizePx: 80 }]}
                align="center"
                x={960}
                y={110}
                accentColor="#38BDF8"
                variant="spring"
              />
              <VidyuterKineticTitle
                frame={loc}
                startFrame={525}
                endFrame={1110}
                lines={[{ text: 'আধুনিক বজ্রনিরোধক দণ্ড', highlight: 'বজ্রনিরোধক', sizePx: 66 }]}
                align="center"
                x={960}
                y={72}
                accentColor="#FBBF24"
                variant="slide"
              />
            </>
          );
        })()}
      </Sequence>

      <FilmGrade frame={frame} vignette={0.52} />
    </div>
  );
};
