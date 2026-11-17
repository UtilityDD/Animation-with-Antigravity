import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';
import { CircuitDiagram } from '../components/CircuitDiagram';

export const Scene5Current: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // Switch is open for the first 120 frames (2 seconds), then snaps closed
  const isSwitchClosed = frame > 120;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <HeaderBanner sceneTitle="দৃশ্য ০৫: চল তড়িৎ: সার্কিটের ভেতরে স্রোত (Current Electricity)" sceneNumber={5} />

      <CircuitDiagram
        isSwitchClosed={isSwitchClosed}
        showElectronDrift={true}
        showCurrentArrows={true}
        highlightBulb={true}
      />

      <SubtitleCard
        text={
          isSwitchClosed
            ? 'সুইচ বন্ধ হতেই ব্যাটারির চাপে তারের মুক্ত ইলেকট্রনগুলো ধাবিত হয়—বাল্ব জ্বলে ওঠে, কিন্তু ইলেকট্রন কখনো নষ্ট হয় না!'
            : 'সুইচ খোলা থাকলে তারের ইলেকট্রনগুলো বিশৃঙ্খলভাবে ঘুরে বেড়ায়, ফলে কোনো বিদ্যুৎ প্রবাহিত হয় না।'
        }
        subtextEnglish="A closed conducting loop allows steady charge drift. The bulb converts energy without consuming charge."
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
