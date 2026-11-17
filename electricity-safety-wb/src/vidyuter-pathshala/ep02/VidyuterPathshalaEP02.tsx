import React from 'react';
import { Audio, Loop, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FontInjector } from '../../kinetic-master/FontInjector';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import { FilmGrade } from '../historical/scene1/Scene1Shared';
import { Ep02SeriesIntro } from './Ep02SeriesIntro';
import { Stage1ManchesterShot } from './Stage1ManchesterShot';
import { Stage2AtomicTimeline } from './Stage2AtomicTimeline';
import { Stage3CombZoomShot } from './Stage3CombZoomShot';
import { Stage4ACricketStadiumShot } from './Stage4ACricketStadiumShot';
import { Stage4BChargeLedgerShot } from './Stage4BChargeLedgerShot';
import { Stage4CCombSolvedShot } from './Stage4CCombSolvedShot';
import { Stage4DConductorTeaserShot } from './Stage4DConductorTeaserShot';

export const EP02_DURATIONS = {
  intro: 180,          // 3.00s
  stage1: 2586,        // 42.80s (2568f) + 18f
  stage2: 2855,        // 47.28s (2837f) + 18f
  stage3: 1184,        // 19.44s (1166f) + 18f
  stage4a: 2308,       // 38.16s (2290f) + 18f
  stage4b: 2360,       // 39.04s (2342f) + 18f
  stage4c: 2255,       // 37.28s (2237f) + 18f
  stage4d: 1856,       // 30.64s (1838f) + 18f
};

export const EP02_TOTAL_FRAMES =
  EP02_DURATIONS.intro +
  EP02_DURATIONS.stage1 +
  EP02_DURATIONS.stage2 +
  EP02_DURATIONS.stage3 +
  EP02_DURATIONS.stage4a +
  EP02_DURATIONS.stage4b +
  EP02_DURATIONS.stage4c +
  EP02_DURATIONS.stage4d; // 15,584 frames (~259.73s @ 60fps)

export const VidyuterPathshalaEP02: React.FC = () => {
  const frame = useCurrentFrame();

  const f0 = 0;
  const f1 = f0 + EP02_DURATIONS.intro;
  const f2 = f1 + EP02_DURATIONS.stage1;
  const f3 = f2 + EP02_DURATIONS.stage2;
  const f4a = f3 + EP02_DURATIONS.stage3;
  const f4b = f4a + EP02_DURATIONS.stage4a;
  const f4c = f4b + EP02_DURATIONS.stage4b;
  const f4d = f4c + EP02_DURATIONS.stage4c;

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, backgroundColor: '#050811', overflow: 'hidden' }}>
      <FontInjector />

      <Loop durationInFrames={1920}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/ep01_ambient_bed.mp3')} volume={0.11} />
      </Loop>

      {/* INTRO: SERIES & EPISODE 02 */}
      <Sequence from={f0} durationInFrames={EP02_DURATIONS.intro}>
        <Ep02SeriesIntro frame={frame} />
        <Sequence from={20} durationInFrames={80}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep02/sfx_charge_whoosh.mp3')} volume={0.32} />
        </Sequence>
      </Sequence>

      {/* STAGE 1: 1909 MANCHESTER & GOLD FOIL */}
      <Sequence from={f1} durationInFrames={EP02_DURATIONS.stage1}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep02/stage1_manchester.mp3')} volume={1.0} />
        <Sequence from={1575} durationInFrames={40}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep02/sfx_scint_flash.mp3')} volume={0.35} />
        </Sequence>
        <Sequence from={1860} durationInFrames={90}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep02/sfx_cannon_boom.mp3')} volume={0.35} />
        </Sequence>
        {(() => {
          const loc = frame - f1;
          return (
            <>
              <Stage1ManchesterShot frame={frame} local={loc} />
              <VidyuterKineticTitle frame={loc} startFrame={20} endFrame={760} lines={[{ text: 'ম্যানচেস্টার • ১৯০৯', highlight: '১৯০৯', sizePx: 74 }]} x={90} y={115} accentColor="#FBBF24" variant="slide" />
              <VidyuterKineticTitle frame={loc} startFrame={820} endFrame={1730} lines={[{ text: 'আট হাজারে একটি ফিরে এল!', highlight: 'একটি', sizePx: 74 }]} x={90} y={115} accentColor="#10B981" variant="spark" />
              <VidyuterKineticTitle frame={loc} startFrame={1770} endFrame={2560} lines={[{ text: 'টিস্যু পেপারে কামানের গোলা!', highlight: 'কামানের', sizePx: 72 }]} x={90} y={115} accentColor="#F43F5E" variant="spring" />
            </>
          );
        })()}
      </Sequence>

      {/* STAGE 2: BROKEN-AXIS ATOMIC TIMELINE */}
      <Sequence from={f2} durationInFrames={EP02_DURATIONS.stage2}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep02/stage2_timeline.mp3')} volume={1.0} />
        {(() => {
          const loc = frame - f2;
          return (
            <>
              <Stage2AtomicTimeline frame={frame} local={loc} />
              <VidyuterKineticTitle frame={loc} startFrame={20} endFrame={2830} lines={[{ text: 'পরমাণুর বৈদ্যুতিক উপাদানের ইতিহাস', highlight: 'বৈদ্যুতিক', sizePx: 66 }]} align="center" x={960} y={85} accentColor="#38BDF8" variant="slide" />
            </>
          );
        })()}
      </Sequence>

      {/* STAGE 3: BRIDGE TO COMB */}
      <Sequence from={f3} durationInFrames={EP02_DURATIONS.stage3}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep02/stage3_bridge.mp3')} volume={1.0} />
        <Sequence from={260} durationInFrames={80}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep02/sfx_charge_whoosh.mp3')} volume={0.3} />
        </Sequence>
        {(() => {
          const loc = frame - f3;
          return (
            <>
              <Stage3CombZoomShot frame={frame} local={loc} />
              <VidyuterKineticTitle frame={loc} startFrame={260} endFrame={1160} lines={[{ text: 'চিরুনির ভেতরের অদৃশ্য জগৎ', highlight: 'অদৃশ্য', sizePx: 74 }]} align="center" x={960} y={95} accentColor="#38BDF8" variant="spring" />
            </>
          );
        })()}
      </Sequence>

      {/* STAGE 4A: CRICKET STADIUM & MUSTARD SEED */}
      <Sequence from={f4a} durationInFrames={EP02_DURATIONS.stage4a}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep02/stage4a_stadium.mp3')} volume={1.0} />
        {(() => {
          const loc = frame - f4a;
          return (
            <>
              <Stage4ACricketStadiumShot frame={frame} local={loc} />
              <VidyuterKineticTitle frame={loc} startFrame={20} endFrame={1360} lines={[{ text: 'ক্রিকেট স্টেডিয়াম ও সরিষার দানা', highlight: 'সরিষার', sizePx: 56 }]} align="center" x={960} y={56} accentColor="#F43F5E" variant="slide" />
              <VidyuterKineticTitle frame={loc} startFrame={1400} endFrame={2285} lines={[{ text: 'ফাঁকা পরমাণু তবু কঠিন কেন?', highlight: 'কঠিন', sizePx: 58 }]} align="center" x={960} y={56} accentColor="#38BDF8" variant="spring" />
            </>
          );
        })()}
      </Sequence>

      {/* STAGE 4B: CHARGE LEDGER & INTERACTION LAW */}
      <Sequence from={f4b} durationInFrames={EP02_DURATIONS.stage4b}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep02/stage4b_ledger.mp3')} volume={1.0} />
        {(() => {
          const loc = frame - f4b;
          return (
            <>
              <Stage4BChargeLedgerShot frame={frame} local={loc} />
              <VidyuterKineticTitle frame={loc} startFrame={20} endFrame={1320} lines={[{ text: 'প্রকৃতির নিখুঁত চার্জের হিসাবখাতা', highlight: 'হিসাবখাতা', sizePx: 56 }]} align="center" x={960} y={56} accentColor="#FBBF24" variant="slide" />
              <VidyuterKineticTitle frame={loc} startFrame={1355} endFrame={2335} lines={[{ text: 'সমধর্মী বিকর্ষণ, বিপরীতে আকর্ষণ', highlight: 'আকর্ষণ', sizePx: 56 }]} align="center" x={960} y={56} accentColor="#38BDF8" variant="spark" />
            </>
          );
        })()}
      </Sequence>

      {/* STAGE 4C: SOLVING EP01'S COMB MYSTERY */}
      <Sequence from={f4c} durationInFrames={EP02_DURATIONS.stage4c}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep02/stage4c_comb_solved.mp3')} volume={1.0} />
        {(() => {
          const loc = frame - f4c;
          return (
            <>
              <Stage4CCombSolvedShot frame={frame} local={loc} />
              <VidyuterKineticTitle frame={loc} startFrame={20} endFrame={1280} lines={[{ text: 'কেন শুধু ইলেকট্রনই লাফ দেয়?', highlight: 'ইলেকট্রনই', sizePx: 68 }]} align="center" x={960} y={85} accentColor="#38BDF8" variant="spring" />
              <VidyuterKineticTitle frame={loc} startFrame={1315} endFrame={2235} lines={[{ text: 'আবেশ: চার্জহীন কাগজের আকর্ষণ!', highlight: 'আবেশ:', sizePx: 68 }]} align="center" x={960} y={85} accentColor="#FBBF24" variant="spark" />
            </>
          );
        })()}
      </Sequence>

      {/* STAGE 4D: CONDUCTORS VS INSULATORS + QUIZ + EP03 TEASER */}
      <Sequence from={f4d} durationInFrames={EP02_DURATIONS.stage4d}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep02/stage4d_teaser.mp3')} volume={1.0} />
        <Sequence from={900} durationInFrames={30}>
          <Audio src={staticFile('vidyuter-pathshala/audio/ep02/sfx_timer_tick.mp3')} volume={0.28} />
        </Sequence>
        {(() => {
          const loc = frame - f4d;
          return (
            <>
              <Stage4DConductorTeaserShot frame={frame} local={loc} />
              <VidyuterKineticTitle frame={loc} startFrame={20} endFrame={740} lines={[{ text: 'মুক্ত ইলেকট্রন বনাম শক্ত বন্ধন', highlight: 'মুক্ত', sizePx: 68 }]} align="center" x={960} y={85} accentColor="#F59E0B" variant="slide" />
            </>
          );
        })()}
      </Sequence>

      <FilmGrade frame={frame} vignette={0.5} />
    </div>
  );
};
