import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';
import { SummaryComparison } from '../components/SummaryComparison';

export const Scene7Takeaways: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
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
      <HeaderBanner sceneTitle="দৃশ্য ০৭: মূল উপলব্ধি: স্থির বনাম চল তড়িৎ (The Big Takeaway)" sceneNumber={7} />

      <SummaryComparison />

      <SubtitleCard
        text="স্থির তড়িৎ জমা হয়ে থাকে বস্তুর পৃষ্ঠে, আর চল তড়িৎ বদ্ধ পরিবাহী তারে প্রবাহিত হয়ে আমাদের সভ্যতার চাকা ঘোরায়।"
        subtextEnglish="Static electricity is stationary charge accumulation; current electricity is continuous dynamic flow."
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
