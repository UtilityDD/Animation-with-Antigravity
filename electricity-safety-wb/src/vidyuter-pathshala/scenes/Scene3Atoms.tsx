import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';
import { AtomIllustration } from '../components/AtomIllustration';

export const Scene3Atoms: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
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
      <HeaderBanner sceneTitle="দৃশ্য ০৩: পদার্থের গভীরে: পরমাণু ও চার্জ (Atoms & Charge)" sceneNumber={3} />

      <AtomIllustration scale={1.1} showLabels={true} />

      <SubtitleCard
        text="পরমাণুর কেন্দ্রে থাকে ধনাত্মক প্রোটন ও চার্জহীন নিউট্রন, আর চারপাশের কক্ষপথে ঘুরছে ঋণাত্মক ইলেকট্রন।"
        subtextEnglish="Matter is composed of atoms: positive protons, neutral neutrons, and orbiting negative electrons."
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
