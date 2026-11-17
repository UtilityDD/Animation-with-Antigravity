import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export interface SubtitleCue {
  id: number;
  startFrame: number;
  endFrame: number;
  actBadge: string;
  bengali: string;
  english: string;
}

export const SUBTITLE_CUES: SubtitleCue[] = [
  {
    id: 1,
    startFrame: 30, // 0:01
    endFrame: 435, // 0:14.5
    actBadge: 'পর্ব ১ • বর্ষার আগমন (Act 1: Monsoon Arrival)',
    bengali: 'বর্ষার মেঘ ডাকলেই বদলে যায় আমাদের চেনা গাঁয়ের পথঘাট। কালবৈশাখী আর বৃষ্টির পর স্কুল থেকে ফেরার পথে লুকিয়ে থাকতে পারে বিপদ।',
    english: 'When monsoon clouds rumble, familiar village paths change. After a storm, unseen hazards can lurk on the walk home from school.',
  },
  {
    id: 2,
    startFrame: 450, // 0:15
    endFrame: 885, // 0:29.5
    actBadge: 'পর্ব ১ • ছেঁড়া বিদ্যুতের তার (Act 1: Snapped Live Wire)',
    bengali: 'কিন্তু ঝড়ের পর মাটির রাস্তায় লুকিয়ে থাকে এক মারাত্মক বিপদ—ছেঁড়া বিদ্যুতের তার! জমা জলে এই তার পড়লে পুরো জলেই ছড়িয়ে পড়ে মারণ বিদ্যুৎ।',
    english: 'After a storm, a deadly danger hides on dirt roads—a snapped live wire! In standing water, lethal electricity spreads across the puddle.',
  },
  {
    id: 3,
    startFrame: 915, // 0:30.5
    endFrame: 1335, // 0:44.5
    actBadge: 'পর্ব ২ • ধাপ বিভব (Act 2: Step Potential Hazard)',
    bengali: 'সাবধান বিশু, ওদিকে যেও না! খেলার বলের চেয়ে জীবনের দাম অনেক বেশি। জমা জলে বিদ্যুতের তার থেকে চারপাশের মাটিতে তৈরি হয় ধাপ বিভব।',
    english: 'Careful Bishu, do not go there! Life is far more precious than a football. A live wire in water creates Step Potential across the wet ground.',
  },
  {
    id: 4,
    startFrame: 1350, // 0:45
    endFrame: 1935, // 1:04.5
    actBadge: 'পর্ব ২ • খরগোশ লাফ বা পা ঘষে চলা (Act 2: Bunny Hop Protocol)',
    bengali: 'থামো! ভেজা মাটিতে বা জমা জলে ছেঁড়া তার দেখলে ভুলেও এগোবে না। দুই পা একসাথে জোড়া রেখে খরগোশের মতো লাফিয়ে দূরে যাও, নয়তো পা না তুলে ঘষে ঘষে পিছাও!',
    english: 'Stop! Never walk normally near a fallen wire on wet ground. Keep both feet joined together and bunny-hop at least 10m (30ft) away, or shuffle without lifting your feet!',
  },
  {
    id: 5,
    startFrame: 1965, // 1:05.5
    endFrame: 2385, // 1:19.5
    actBadge: 'পর্ব ৩ • ভেজা হাত ও সুইচবোর্ড (Act 3: Wet Hands & Switches)',
    bengali: 'বৃষ্টির দিনে ঘরের বারান্দা বা রান্নাঘরেও চাই বাড়তি সতর্কতা। বৃষ্টির জলে ভেজা হাতে কখনও সুইচবোর্ডে হাত দেবে না।',
    english: 'On rainy days, take extra care on verandas and kitchens. Never touch an electrical switchboard with rainwater-soaked hands.',
  },
  {
    id: 6,
    startFrame: 2400, // 1:20
    endFrame: 2985, // 1:39.5
    actBadge: 'পর্ব ৩ • বিদ্যুতের খুঁটি ও টানা তার (Act 3: Submerged Poles & Stay-Wires)',
    bengali: 'ভেজা হাতে বা খালি পায়ে কখনও সুইচবোর্ড, প্লাগ বা মোটর স্পর্শ করবে না। আর জমা জলে দাঁড়িয়ে বিদ্যুতের খুঁটি বা তারের টানা তার (Stay Wire) হাত দিয়ে ধরা বিপজ্জনক!',
    english: 'Never touch switches, plugs, or motors barefoot or with wet hands. Never touch iron/concrete poles or stay-wires in waterlogged areas!',
  },
  {
    id: 7,
    startFrame: 3015, // 1:40.5
    endFrame: 3435, // 1:54.5
    actBadge: 'পর্ব ৪ • ঘুড়ি ওড়ানোর সতর্কতা (Act 4: Kite Flying Safety)',
    bengali: 'শরৎ বা বর্ষার বিকেলে খোলা মাঠে ঘুড়ি ওড়াতে সবারই ভালো লাগে। কিন্তু মাঞ্জা বা ভেজা সুতোয় উচ্চ ভোল্টেজের তড়িৎ প্রবাহিত হতে পারে।',
    english: 'Everyone loves flying kites in open fields, but wet or coated manja string can conduct lethal high-voltage electricity.',
  },
  {
    id: 8,
    startFrame: 3450, // 1:55
    endFrame: 4035, // 2:14.5
    actBadge: 'পর্ব ৪ • ট্রান্সফরমার ও ১১ কেভি লাইন (Act 4: Transformer DTR Fence)',
    bengali: 'বিদ্যুতের লাইনের কাছে বা ট্রান্সফরমারের পাশে ভুলেও ঘুড়ি ওড়াবে না। তারে ঘুড়ি আটকে গেলে কখনও বাঁশ বা লাঠি দিয়ে নামানোর চেষ্টা করবে না!',
    english: 'Never fly kites near power lines or transformers. If a kite gets tangled, never try to retrieve it with a green bamboo pole or stick!',
  },
  {
    id: 9,
    startFrame: 4065, // 2:15.5
    endFrame: 4485, // 2:29.5
    actBadge: 'পর্ব ৫ • প্রাথমিক চিকিৎসা ও উদ্ধার (Act 5: Shock Rescue Protocol)',
    bengali: 'দুর্ঘটনাবশত কাউকে কারেন্ট স্পর্শ করলে আতঙ্কিত হয়ে খালি হাতে তাকে ধরতে যাবে না—তাতে তুমিও বিদ্যুৎস্পৃষ্ট হতে পারো!',
    english: 'If someone suffers an electric shock, never grab them with bare hands—you will also get electrocuted!',
  },
  {
    id: 10,
    startFrame: 4500, // 2:30
    endFrame: 4935, // 2:44.5
    actBadge: 'পর্ব ৫ • মেন সুইচ ও শুকনো বাঁশ (Act 5: Golden Rules of First Aid)',
    bengali: 'কাউকে কারেন্ট স্পর্শ করলে খালি গায়ে স্পর্শ করবে না! মেন সুইচ বন্ধ করো এবং শুকনো কাঠ বা বাঁশ দিয়ে তার আলাদা করো ও বড়দের ডাকো।',
    english: 'Turn off the Main Switch immediately! Use a completely dry wooden stick or dry bamboo pole to separate the person, and call adults for medical aid.',
  },
  {
    id: 11,
    startFrame: 4965, // 2:45.5
    endFrame: 5385, // 2:59.5
    actBadge: 'পর্ব ৬ • জরুরি সহায়তা ১৯১২১ (Act 6: Emergency Helpline 19121)',
    bengali: 'ছেঁড়া তার বা বিপদ দেখলেই বড়দের জানাও এবং ফোন করো পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বন্টন নিগমের টোল-ফ্রি নম্বর ১৯১২১-এ। সতর্কতাতেই লুকিয়ে আছে জীবন সুরক্ষা!',
    english: 'Report snapped wires immediately to adults and dial WBSEDCL Toll-Free Helpline 19121 or Ambulance 102/108. Safety saves lives!',
  },
];

export const SubtitleHUD: React.FC = () => {
  const frame = useCurrentFrame();

  const activeCue = SUBTITLE_CUES.find((c) => frame >= c.startFrame && frame <= c.endFrame);
  const progressPct = (frame / 5400) * 100;
  const totalSeconds = Math.floor(frame / 30);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 25 }}>
      {/* Top-Right WBSEDCL Safety Broadcast Watermark & Timecode */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          right: 34,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(15, 23, 42, 0.85)',
          border: '2px solid #FFD600',
          borderRadius: 999,
          padding: '8px 18px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#00F2FE',
            boxShadow: '0 0 10px #00F2FE',
          }}
        />
        <span style={{ color: '#FFD600', fontWeight: 800, fontSize: 15 }}>
          বিদ্যুৎ ও বর্ষার সতর্কতা • WBSEDCL 19121
        </span>
        <span
          style={{
            color: '#BAE6FD',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: 14,
            borderLeft: '1px solid rgba(255,255,255,0.25)',
            paddingLeft: 10,
          }}
        >
          {mm}:{ss} / 03:00
        </span>
      </div>

      {/* Synchronized Bengali + English Subtitle Lower-Third */}
      {activeCue && (
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1560,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.92) 0%, rgba(9, 14, 28, 0.97) 100%)',
            border: '2.5px solid rgba(255, 214, 0, 0.85)',
            borderRadius: 18,
            padding: '14px 28px',
            boxShadow: '0 14px 36px rgba(0, 0, 0, 0.65)',
            opacity: interpolate(
              frame,
              [activeCue.startFrame, activeCue.startFrame + 10, activeCue.endFrame - 10, activeCue.endFrame],
              [0, 1, 1, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            ),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span
              style={{
                background: '#FFD600',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: 13,
                padding: '2px 12px',
                borderRadius: 999,
              }}
            >
              {activeCue.actBadge}
            </span>
            <span style={{ color: '#00F2FE', fontSize: 13, fontWeight: 700 }}>
              🎙️ বাংলা ভয়েসওভার (Bengali Narration)
            </span>
          </div>

          <div
            style={{
              color: '#FFF8E7',
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.35,
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            {activeCue.bengali}
          </div>
          <div
            style={{
              color: '#BAE6FD',
              fontSize: 15,
              fontWeight: 500,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            {activeCue.english}
          </div>
        </div>
      )}

      {/* Subtle Timeline Progress Bar along bottom border */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 18,
          right: 18,
          height: 4,
          background: 'rgba(255,255,255,0.15)',
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FFD600, #00F2FE)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

