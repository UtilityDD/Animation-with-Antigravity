import React from 'react';
import { Audio, Loop, Sequence, staticFile } from 'remotion';
import { HistoricalFrame } from './HistoricalFrame';
import { AmberFeatherVignette } from './AmberFeatherVignette';
import { BrokenAxisTimeline } from './BrokenAxisTimeline';
import { MorphTransition } from './MorphTransition';
import { CoreDefinition } from './CoreDefinition';
import { ElectronCloudAtom } from './ElectronCloudAtom';
import { StaticElectricityComb } from './StaticElectricityComb';
import { PrecisionCircuit } from './PrecisionCircuit';
import { EnergyConversionGrid } from './EnergyConversionGrid';
import { QuizReflectionTeaser } from './QuizReflectionTeaser';
import { KineticNarrationBar } from './KineticNarrationBar';

// Frame counts directly from timings.json @ 60 FPS
export const SCENE_DURATIONS = {
  scene1: 1882, // 28.88s
  scene2: 2530, // 39.68s
  scene3: 740,  // 9.84s
  scene4: 1023, // 14.56s
  scene5: 1292, // 19.04s
  scene6: 1052, // 15.04s
  scene7: 1278, // 18.80s
  scene8: 769,  // 10.32s
  scene9: 1143, // 16.56s
};

export const SCENE_TEXTS = {
  scene1:
    "আজ থেকে প্রায় আড়াই হাজার বছর আগে। প্রাচীন গ্রিসের মিলেটাস নগরী। তখন পৃথিবী আজকের মতো আলোয় ভরা ছিল না। সেই সময় মানুষের নজরে আসে এক অদ্ভুত ঘটনা। একটি বিশেষ প্রাকৃতিক পাথর—অ্যাম্বার—পশমের সঙ্গে ঘষলে তা ছোট ছোট পালক নিজের দিকে টেনে নেয়! কীভাবে সম্ভব? পাথরটি না ছুঁয়েও অদৃশ্য এক বলে আকর্ষণ করছে। বিজ্ঞানের ইতিহাসে এটিই বৈদ্যুতিক আকর্ষণের অন্যতম প্রাচীন লিখিত পর্যবেক্ষণ।",
  scene2:
    "কিন্তু এই টান আসলে কী ছিল? ১৬০০ সালে উইলিয়াম গিলবার্ট অ্যাম্বারের গ্রিক নাম থেকে শব্দ তৈরি করলেন 'ইলেকট্রিকাস'। ১৭৪৫ সালে লেইডেন জারে প্রথম চার্জ জমিয়ে রাখা সম্ভব হলো। ১৭৫২ সালে বেঞ্জামিন ফ্র্যাঙ্কলিন প্রমাণ করলেন মেঘের বজ্রপাতও এক বিশাল বিদ্যুৎ স্ফুলিঙ্গ। ১৮০০ সালে ভোল্টার ব্যাটারি দিল একটানা বিদ্যুৎ প্রবাহ। ১৮২০ সালে ওরস্টেড বিদ্যুৎ ও চুম্বকের সম্পর্ক দেখলেন, ১৮৩১ সালে ফ্যারাডে আবিষ্কার করলেন তড়িচ্চৌম্বকীয় আবেশ, আর ১৮৯৭ সালে জে জে থমসন আবিষ্কার করলেন ইলেকট্রন।",
  scene3:
    "আজ আমরা প্রতিদিন যে সুইচ টিপে আলো জ্বালাই কিংবা ফোন চার্জ করি—তার পেছনে রয়েছে আড়াই হাজার বছরের নিরলস বিজ্ঞান। কিন্তু আসলে এই বিদ্যুৎ কী?",
  scene4:
    "সহজ ও নিখুঁত ভাষায়: বিদ্যুৎ হলো বৈদ্যুতিক চার্জের উপস্থিতি, তাদের মধ্যকার বল এবং তাদের চলাচলের সামগ্রিক রূপ। প্রকৃতিতে এর তিনটি প্রধান প্রকাশ: স্থির তড়িৎ, চল তড়িৎ এবং বৈদ্যুতিক ক্ষেত্র।",
  scene5:
    "সবকিছুই তৈরি কোটি কোটি পরমাণু দিয়ে। পরমাণুর কেন্দ্রে থাকে ধনাত্মক প্রোটন ও চার্জহীন নিউট্রন। আর তাকে ঘিরে এক রহস্যময় মেঘের মতো অবিরাম ঘোরে ঋণাত্মক ইলেকট্রন। বিপরীত চার্জ একে অপরকে আকর্ষণ করে, আর একই চার্জ পরস্পরকে দূরে ঠেলে দেয়।",
  scene6:
    "শুকনো চুলে প্লাস্টিকের চিরুনি ঘষলে চুল থেকে কিছু ইলেকট্রন চিরুনিতে চলে আসে। ফলে চিরুনিতে তৈরি হয় ঋণাত্মক চার্জের ভারসাম্যহীনতা। এটিই হলো স্থির তড়িৎ। কোনো নতুন চার্জ তৈরি হয় না, কেবল ইলেকট্রন স্থানান্তরিত হয়!",
  scene7:
    "আর যখন একটি বদ্ধ তারের মধ্য দিয়ে ইলেকট্রনগুলো নির্দিষ্ট দিকে নিয়মিত প্রবাহিত হয়, তাকে বলে চল তড়িৎ। ব্যাটারি চাপ বা ভোল্টেজ সৃষ্টি করে, আর চার্জের গতি বাল্বে আলো ও তাপে রূপান্তরিত হয়। মনে রাখবেন: বাল্ব কখনো ইলেকট্রন খায় না, কেবল শক্তির রূপান্তর ঘটায়।",
  scene8:
    "পাখায় গতি, ইস্ত্রিতে তাপ, বাল্বে আলো, কলিং বেলে শব্দ আর কারখানায় মোটরের ঘূর্ণন—বিদ্যুতের সবচেয়ে বড় শক্তি হলো তার রূপান্তরের ক্ষমতা।",
  scene9:
    "আজকের চিন্তার প্রশ্ন: চিরুনি দিয়ে চুল ঘষলে কোন কণা স্থানান্তরিত হওয়ার কারণে কাগজের টুকরো আকৃষ্ট হয়? কমেন্টে জানান। পরের পর্বে আমরা পরমাণুর গভীর জগতে প্রবেশ করব: 'পরমাণু ও বৈদ্যুতিক চার্জ'। চোখ রাখুন বিদ্যুতের পাঠশালায়।",
};

export const EP01_HISTORICAL_MASTER_FRAMES =
  SCENE_DURATIONS.scene1 +
  SCENE_DURATIONS.scene2 +
  SCENE_DURATIONS.scene3 +
  SCENE_DURATIONS.scene4 +
  SCENE_DURATIONS.scene5 +
  SCENE_DURATIONS.scene6 +
  SCENE_DURATIONS.scene7 +
  SCENE_DURATIONS.scene8 +
  SCENE_DURATIONS.scene9; // 11,709 frames (~195.15s @ 60 FPS)

export const VidyuterPathshalaHistoricalMaster: React.FC = () => {
  const f1 = 0;
  const f2 = f1 + SCENE_DURATIONS.scene1;
  const f3 = f2 + SCENE_DURATIONS.scene2;
  const f4 = f3 + SCENE_DURATIONS.scene3;
  const f5 = f4 + SCENE_DURATIONS.scene4;
  const f6 = f5 + SCENE_DURATIONS.scene5;
  const f7 = f6 + SCENE_DURATIONS.scene6;
  const f8 = f7 + SCENE_DURATIONS.scene7;
  const f9 = f8 + SCENE_DURATIONS.scene8;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#0B1120',
        overflow: 'hidden',
      }}
    >
      {/* SUBTLE AMBIENT TUTORIAL MUSIC BED (Low volume so voiceover stays 100% clear) */}
      <Loop durationInFrames={1920}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/ep01_ambient_bed.mp3')} volume={0.14} />
      </Loop>

      {/* ============================================================== */}
      {/* SCENE 1: Ancient Miletus, Thales, Amber & Wool (28.88s)        */}
      {/* ============================================================== */}
      <Sequence from={f1} durationInFrames={SCENE_DURATIONS.scene1}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene1.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০১ • প্রাচীন গ্রিসের বিস্ময়"
          eraBadge="খ্রিস্টপূর্ব ৬০০ • মিলেটাস"
          isScienceLab={false}
        >
          <AmberFeatherVignette />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 2: Broken Axis Timeline 600 BCE - 1897 CE (39.68s)       */}
      {/* ============================================================== */}
      <Sequence from={f2} durationInFrames={SCENE_DURATIONS.scene2}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene2.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০২ • আড়াই হাজার বছরের কালপঞ্জি"
          eraBadge="খ্রিস্টপূর্ব ৬০০ – ১৮৯৭ খ্রিষ্টাব্দ"
          isScienceLab={false}
        >
          <BrokenAxisTimeline />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 3: Match-Cut Morphs: Ancient to Modern (9.84s)           */}
      {/* ============================================================== */}
      <Sequence from={f3} durationInFrames={SCENE_DURATIONS.scene3}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene3.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০৩ • রূপান্তর: প্রাচীন থেকে আধুনিক"
          eraBadge="আবিষ্কারের রূপান্তর"
          isScienceLab={true}
        >
          <MorphTransition />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 4: Scientific Definition & 3 Manifestations (14.56s)     */}
      {/* ============================================================== */}
      <Sequence from={f4} durationInFrames={SCENE_DURATIONS.scene4}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene4.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০৪ • বিজ্ঞানের সংজ্ঞা ও প্রকাশ"
          eraBadge="মৌলিক প্রকাশ"
          isScienceLab={true}
        >
          <CoreDefinition />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 5: Quantum Probability Electron Cloud Atom (19.04s)      */}
      {/* ============================================================== */}
      <Sequence from={f5} durationInFrames={SCENE_DURATIONS.scene5}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene5.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০৫ • পরমাণুর কোয়ান্টাম জগৎ"
          eraBadge="কোয়ান্টাম মডেল"
          isScienceLab={true}
        >
          <ElectronCloudAtom />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 6: Friction, Static Charge & Conservation (15.04s)       */}
      {/* ============================================================== */}
      <Sequence from={f6} durationInFrames={SCENE_DURATIONS.scene6}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene6.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০৬ • স্থির তড়িৎ ও চার্জ সংরক্ষণ"
          eraBadge="পরীক্ষা ০১: স্থির তড়িৎ"
          isScienceLab={true}
        >
          <StaticElectricityComb />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 7: Precision Circuit Loop & Electron Drift (18.80s)      */}
      {/* ============================================================== */}
      <Sequence from={f7} durationInFrames={SCENE_DURATIONS.scene7}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene7.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০৭ • বদ্ধ বর্তনী ও চল তড়িৎ"
          eraBadge="পরীক্ষা ০২: চল তড়িৎ"
          isScienceLab={true}
        >
          <PrecisionCircuit />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 8: Energy Conversion 5-Card Matrix (10.32s)              */}
      {/* ============================================================== */}
      <Sequence from={f8} durationInFrames={SCENE_DURATIONS.scene8}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene8.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০৮ • শক্তির সর্বজনীন রূপান্তর"
          eraBadge="শক্তির রূপান্তর"
          isScienceLab={true}
        >
          <EnergyConversionGrid />
        </HistoricalFrame>
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 9: Pause-and-Think Quiz, Teaser & Outro (16.56s)         */}
      {/* ============================================================== */}
      <Sequence from={f9} durationInFrames={SCENE_DURATIONS.scene9}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/scene9.mp3')} volume={1.0} />
        <HistoricalFrame
          chapterTitle="অধ্যায় ০৯ • কুইজ ও পরবর্তী পর্ব"
          eraBadge="চিন্তার প্রশ্ন ও টিজার"
          isScienceLab={true}
        >
          <QuizReflectionTeaser />
        </HistoricalFrame>
      </Sequence>
    </div>
  );
};
