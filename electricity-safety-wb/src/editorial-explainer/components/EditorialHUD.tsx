import React from 'react';
import { interpolate } from 'remotion';

interface EditorialHUDProps {
  frame: number;
}

interface SubtitleTrack {
  startFrame: number;
  endFrame: number;
  bn: string;
  en: string;
  category: string;
}

const EDITORIAL_SUBTITLES: SubtitleTrack[] = [
  {
    startFrame: 30,
    endFrame: 230,
    category: 'INCIDENT ESTABLISHMENT // তার বিভ্রাট',
    bn: 'বর্ষার ঝড়ে ছেঁড়া বিদ্যুতের তারে লুকিয়ে থাকে এক অদৃশ্য মারণফাঁদ।',
    en: 'In a monsoon storm, a severed high-voltage line creates an invisible electrical trap.',
  },
  {
    startFrame: 250,
    endFrame: 700,
    category: 'THE FATAL STEP // মারাত্মক ভুল পদক্ষেপ',
    bn: 'ভেজা মাটিতে পা ফেলা মাত্রই তৈরি হতে পারে মারাত্মক বিপদ। কেন সাধারণ হাঁটা এখানে প্রাণঘাতী?',
    en: 'Walking normally across energized soil can be fatal. Why does an ordinary stride turn deadly?',
  },
  {
    startFrame: 720,
    endFrame: 1470,
    category: 'PHYSICS PRINCIPLE // ধাপ বিভব (STEP POTENTIAL)',
    bn: 'এর বৈজ্ঞানিক কারণ—ধাপ বিভব বা স্টেপ পটেনশিয়াল। তারের চারপাশের মাটিতে ভোল্টেজের বলয় ছড়িয়ে পড়ে। দুই পা ফাঁক করে হাঁটলে দুই পায়ের বিভব পার্থক্যে শরীরের ভেতর দিয়ে বিদ্যুৎ প্রবাহিত হয়।',
    en: 'The mechanism is Step Potential: concentric voltage gradients spread through wet earth. Stepping wide creates a severe potential difference (ΔV), forcing current through the body.',
  },
  {
    startFrame: 1500,
    endFrame: 2260,
    category: 'ESCAPE PROTOCOL // খরগোশ লাফ বা শাফলিং',
    bn: 'বাঁচার একমাত্র উপায়—খরগোশ লাফ বা পা ঘষে চলা! দুই পা একসাথে জোড়া রাখলে বিভব পার্থক্য থাকে শূন্য। পা জোড়া রেখে লাফিয়ে অন্তত ত্রিশ ফুট বা দশ মিটার দূরে যাও।',
    en: 'The verified survival technique is the Bunny Hop or shuffling: keeping feet tightly locked eliminates voltage delta (ΔV = 0). Hop at least 30 feet / 10 meters away.',
  },
  {
    startFrame: 2280,
    endFrame: 2860,
    category: 'CONDUCTIVITY RULES // ভেজা সুইচ ও টানা তার',
    bn: 'ভেজা হাতে কখনও সুইচ স্পর্শ করবে না। আর জমা জলে দাঁড়িয়ে বিদ্যুতের খুঁটি বা টানা তার হাত দিয়ে ধরা চরম বিপজ্জনক।',
    en: 'Never operate switches with wet hands, and avoid flooded utility poles or stay-wires where water provides an immediate conductive path.',
  },
  {
    startFrame: 2880,
    endFrame: 3290,
    category: 'RESCUE INTERVENTION // মেইন সুইচ ও শুকনো বাঁশ',
    bn: 'কাউকে কারেন্ট স্পর্শ করলে খালি হাতে ধরবে না! দ্রুত মেন সুইচ বন্ধ করো এবং শুকনো বাঁশ দিয়ে তাকে আলাদা করো।',
    en: 'Never grasp a shock victim bare-handed! Cut the Main Switch immediately, or safely separate contact using a dry, non-conductive wooden or bamboo pole.',
  },
  {
    startFrame: 3330,
    endFrame: 3580,
    category: 'EMERGENCY HOTLINE // হেল্পলাইন ১৯১২১',
    bn: 'বিপদ দেখলেই ফোন করো পশ্চিমবঙ্গ বিদ্যুৎ বন্টন নিগমের টোল-ফ্রি নম্বর ১৯১২১-এ। সতর্কতাই জীবন রক্ষা!',
    en: 'Report immediate electrical hazards to the WBSEDCL 24x7 Helpline at 19121. Vigilance preserves life.',
  },
];

/**
 * Editorial Subtitle & Informational HUD
 * Clean, restrained typography with high editorial legibility.
 * No cheap distracting glows; pure high-contrast typographical hierarchy.
 */
export const EditorialHUD: React.FC<EditorialHUDProps> = ({ frame }) => {
  const activeCue = EDITORIAL_SUBTITLES.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  let opacity = 0;
  let translateY = 8;

  if (activeCue) {
    const fadeIn = interpolate(frame, [activeCue.startFrame, activeCue.startFrame + 18], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const fadeOut = interpolate(frame, [activeCue.endFrame - 16, activeCue.endFrame], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    opacity = Math.min(fadeIn, fadeOut);
    translateY = interpolate(fadeIn, [0, 1], [10, 0]);
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
        zIndex: 100,
      }}
    >
      {/* Top Editorial Anchor Badge */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#FFD152',
            boxShadow: '0 0 10px rgba(255, 209, 82, 0.6)',
          }}
        />
        <div
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 12,
            letterSpacing: '0.14em',
            color: '#CBD5E1',
            textTransform: 'uppercase',
          }}
        >
          {activeCue ? activeCue.category : 'WBSEDCL // PUBLIC SAFETY EDUCATION'}
        </div>
      </div>

      {/* Top Right Broadcast Marker */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 56,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: 'rgba(255, 255, 255, 0.45)',
        }}
      >
        60 FPS • 1080P MASTER
      </div>

      {/* Primary Lower-Third Subtitle Bar */}
      {activeCue && opacity > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: '50%',
            transform: `translateX(-50%) translateY(${translateY}px)`,
            opacity,
            width: '84%',
            maxWidth: 1400,
            background: 'rgba(6, 9, 31, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderLeft: '4px solid #FFD152',
            borderRadius: 14,
            padding: '18px 36px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.55)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {/* Bengali Line */}
          <div
            style={{
              fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', -apple-system, sans-serif",
              fontSize: 25,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.015em',
              lineHeight: 1.35,
            }}
          >
            {activeCue.bn}
          </div>

          {/* English Academic Translation */}
          <div
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 15,
              fontWeight: 500,
              color: '#94A3B8',
              letterSpacing: '0.01em',
              lineHeight: 1.3,
            }}
          >
            {activeCue.en}
          </div>
        </div>
      )}
    </div>
  );
};
