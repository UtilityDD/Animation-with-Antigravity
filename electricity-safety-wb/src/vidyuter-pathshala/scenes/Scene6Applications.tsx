import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';
import { EnergyConversionMatrix } from '../components/EnergyConversionMatrix';

export const Scene6Applications: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
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
      <HeaderBanner sceneTitle="দৃশ্য ০৬: আমাদের চারপাশের বিদ্যুৎ (Electricity Around Us)" sceneNumber={6} />

      <EnergyConversionMatrix />

      <SubtitleCard
        text="বিদ্যুতের সবচেয়ে বড় শক্তি হলো রূপান্তরের ক্ষমতা—ইস্ত্রিতে তাপ, পাখায় গতি, বাল্বে আলো এবং বেল-এ শব্দ।"
        subtextEnglish="Electrical potential energy readily converts to thermal, mechanical, optical, and acoustic outputs."
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
