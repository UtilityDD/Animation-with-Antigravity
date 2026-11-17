import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';
import { WindAnalogy } from '../components/WindAnalogy';

export const Scene2Invisible: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
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
      <HeaderBanner sceneTitle="দৃশ্য ০২: এক অদৃশ্য শক্তি ও তার প্রকাশ (Invisible Force)" sceneNumber={2} />

      <WindAnalogy />

      <SubtitleCard
        text="বাতাস যেমন চোখে দেখা যায় না কিন্তু পাতার গতিতে বোঝা যায়, তেমনই বিদ্যুৎকে আমরা বুঝি তার কাজের মাধ্যমে।"
        subtextEnglish="Electricity is an invisible phenomenon observed purely through its physical effects."
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
