import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface SubtitleCue {
  startFrame: number;
  endFrame: number;
  bn: string;
  en: string;
}

const SUBTITLE_CUES: SubtitleCue[] = [
  {
    startFrame: 30,
    endFrame: 230,
    bn: 'বর্ষার ঝড়ে ছেঁড়া বিদ্যুতের তারে লুকিয়ে থাকে এক অদৃশ্য মারণফাঁদ।',
    en: 'In a monsoon storm, a snapped live wire hides an invisible, deadly trap.',
  },
  {
    startFrame: 250,
    endFrame: 700,
    bn: 'ভেজা মাটিতে পা ফেলা মাত্রই তৈরি হতে পারে মারাত্মক বিপদ। কেন সাধারণ হাঁটা এখানে প্রাণঘাতী?',
    en: 'Stepping onto wet ground near a live wire can be fatal. Why is walking normally so dangerous?',
  },
  {
    startFrame: 720,
    endFrame: 1470,
    bn: 'এর বৈজ্ঞানিক কারণ—ধাপ বিভব বা স্টেপ পটেনশিয়াল। তারের চারপাশের মাটিতে ভোল্টেজের বলয় ছড়িয়ে পড়ে। দুই পা ফাঁক করে হাঁটলে দুই পায়ের বিভব পার্থক্যে শরীরের ভেতর দিয়ে বিদ্যুৎ প্রবাহিত হয়।',
    en: 'The science behind this is Step Potential. Voltage spreads in concentric rings across wet ground. Walking wide creates a voltage difference that forces current through your body.',
  },
  {
    startFrame: 1500,
    endFrame: 2260,
    bn: 'বাঁচার একমাত্র উপায়—খরগোশ লাফ বা পা ঘষে চলা! দুই পা একসাথে জোড়া রাখলে বিভব পার্থক্য থাকে শূন্য। পা জোড়া রেখে লাফিয়ে অন্তত ত্রিশ ফুট বা দশ মিটার দূরে যাও।',
    en: 'The only escape is the Bunny Hop or shuffle! Keeping both feet tightly joined keeps the voltage difference at zero. Hop at least 30 feet or 10 meters away.',
  },
  {
    startFrame: 2280,
    endFrame: 2860,
    bn: 'ভেজা হাতে কখনও সুইচ স্পর্শ করবে না। আর জমা জলে দাঁড়িয়ে বিদ্যুতের খুঁটি বা টানা তার হাত দিয়ে ধরা চরম বিপজ্জনক।',
    en: 'Never touch switches with wet hands. And never touch electric poles or stay-wires in waterlogged conditions.',
  },
  {
    startFrame: 2880,
    endFrame: 3290,
    bn: 'কাউকে কারেন্ট স্পর্শ করলে খালি হাতে ধরবে না! দ্রুত মেন সুইচ বন্ধ করো এবং শুকনো বাঁশ দিয়ে তাকে আলাদা করো।',
    en: 'Never touch a shock victim bare-handed! Turn off the Main Switch instantly and separate with dry bamboo.',
  },
  {
    startFrame: 3330,
    endFrame: 3580,
    bn: 'বিপদ দেখলেই ফোন করো পশ্চিমবঙ্গ বিদ্যুৎ বন্টন নিগমের টোল-ফ্রি নম্বর ১৯১২১-এ। সতর্কতাই জীবন রক্ষা!',
    en: 'Report dangers immediately to WBSEDCL Helpline 19121. Safety saves lives!',
  },
];

export const KurzgesagtSafetyHUD: React.FC = () => {
  const frame = useCurrentFrame();

  const currentCue = SUBTITLE_CUES.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame
  );

  let opacity = 0;
  let translateY = 10;

  if (currentCue) {
    const fadeIn = interpolate(frame, [currentCue.startFrame, currentCue.startFrame + 15], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const fadeOut = interpolate(frame, [currentCue.endFrame - 15, currentCue.endFrame], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    opacity = Math.min(fadeIn, fadeOut);
    translateY = interpolate(fadeIn, [0, 1], [15, 0]);
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Top Left Campaign Badge */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          right: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(9, 19, 75, 0.75)',
          padding: '8px 18px',
          borderRadius: 12,
          border: '1.5px solid rgba(34, 215, 218, 0.3)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#22D7DA',
            boxShadow: '0 0 10px #22D7DA',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            color: '#8CAAF7',
            letterSpacing: '0.14em',
          }}
        >
          WBSEDCL 60 FPS • KURZGESAGT VECTOR ENGINE
        </span>
      </div>

      {/* Lower Third Subtitle Capsule */}
      {currentCue && opacity > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: '50%',
            transform: `translateX(-50%) translateY(${translateY}px)`,
            opacity,
            width: '88%',
            maxWidth: 1540,
            background: 'rgba(9, 19, 75, 0.92)',
            borderRadius: 20,
            border: '2px solid #22D7DA',
            padding: '16px 36px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.65), 0 0 20px rgba(34, 215, 218, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            textAlign: 'center',
          }}
        >
          {/* Bengali Line */}
          <div
            style={{
              fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif",
              fontSize: 27,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
              lineHeight: 1.35,
            }}
          >
            {currentCue.bn}
          </div>

          {/* English Line */}
          <div
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 18,
              fontWeight: 600,
              color: '#FFD244',
              letterSpacing: '0.01em',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              lineHeight: 1.25,
            }}
          >
            {currentCue.en}
          </div>
        </div>
      )}
    </div>
  );
};

