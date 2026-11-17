import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';
import { StaticAttraction } from '../components/StaticAttraction';

export const Scene4Static: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
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
      <HeaderBanner sceneTitle="দৃশ্য ০৪: স্থির তড়িৎ: ভারসাম্যের পরিবর্তন (Static Electricity)" sceneNumber={4} />

      <StaticAttraction />

      <SubtitleCard
        text="ঘর্ষণে চুল থেকে ইলেকট্রন চিরুনিতে স্থানান্তর ঘটে—তৈরি হয় ঋণাত্মক চার্জের আধিক্য বা স্থির তড়িৎ!"
        subtextEnglish="Friction transfers electrons, creating electrostatic charge imbalance that attracts paper scraps."
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
