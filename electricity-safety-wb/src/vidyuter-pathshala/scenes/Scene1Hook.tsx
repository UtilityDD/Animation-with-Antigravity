import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';
import { PhenomenaHook } from '../components/PhenomenaHook';

export const Scene1Hook: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
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
      <HeaderBanner sceneTitle="দৃশ্য ০১: সূচনা ও কৌতূহল (The Hook)" sceneNumber={1} />
      
      {/* Central Visual Showcase */}
      <PhenomenaHook />

      <SubtitleCard
        text="সুইচ চাপলে আলো জ্বলে, চিরুনিতে কাগজ লাফায়, মেঘে চমকায় বজ্রপাত—এই সবকিছুর মূলে বিদ্যুৎ!"
        subtextEnglish="Light, static attraction, and lightning—unified by the phenomenon of electricity."
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
