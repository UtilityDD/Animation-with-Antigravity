import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { FontInjector } from './FontInjector';
import { KineticScene1Storm } from './components/Scenes/KineticScene1Storm';
import { KineticScene2WalkingQuestion } from './components/Scenes/KineticScene2WalkingQuestion';
import { KineticScene3StepPotential } from './components/Scenes/KineticScene3StepPotential';
import { KineticScene4BunnyHop } from './components/Scenes/KineticScene4BunnyHop';
import { KineticScene5Insulation } from './components/Scenes/KineticScene5Insulation';
import { KineticScene6ShockRescue } from './components/Scenes/KineticScene6ShockRescue';
import { KineticScene7Emergency19121 } from './components/Scenes/KineticScene7Emergency19121';

/**
 * MASTER PHASE 2 KINETIC MOTION GRAPHICS FILM:
 * "Shuktara Bidyut Suraksha"
 * Full 60.00-second sequence (3,600 Frames @ 60 FPS, 1920x1080 Full HD).
 * - Bundled local Noto Sans Bengali & Hind Siliguri fonts
 * - Multi-point dynamic CameraRig with zooms, pans, and rolls
 * - Expressive character rigs with independent facial expressions and pupil saccades
 * - Kinetic typography with staggered pops, scale overshoots, and highlight glows
 * - 0 dropped frames, frame-deterministic Remotion rendering
 */
export const KineticSceneManager: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040717', overflow: 'hidden' }}>
      {/* 1. Bundled Local Bengali Font Engine */}
      <FontInjector />

      {/* 2. 60.000s Master Studio Audio Track */}
      <Audio src={staticFile('audio/kurzgesagt_safety_soundtrack.mp3')} volume={1.0} />

      {/* Scene 1: Severed Conductor & Kinetic Hook (240 frames | 0:00 - 0:04) */}
      <Sequence from={0} durationInFrames={240} name="Scene 1: Severed Conductor Hook">
        <KineticScene1Storm />
      </Sequence>

      {/* Scene 2: The Walking Dilemma (480 frames | 0:04 - 0:12) */}
      <Sequence from={240} durationInFrames={480} name="Scene 2: The Walking Dilemma">
        <KineticScene2WalkingQuestion />
      </Sequence>

      {/* Scene 3: Step Potential Physics (780 frames | 0:12 - 0:25) */}
      <Sequence from={720} durationInFrames={780} name="Scene 3: Step Potential Physics">
        <KineticScene3StepPotential />
      </Sequence>

      {/* Scene 4: Bunny Hop Escape (780 frames | 0:25 - 0:38) */}
      <Sequence from={1500} durationInFrames={780} name="Scene 4: Bunny Hop Escape">
        <KineticScene4BunnyHop />
      </Sequence>

      {/* Scene 5: Insulation Rules & Stay-Wires (600 frames | 0:38 - 0:48) */}
      <Sequence from={2280} durationInFrames={600} name="Scene 5: Insulation Rules">
        <KineticScene5Insulation />
      </Sequence>

      {/* Scene 6: Shock Rescue Protocol (420 frames | 0:48 - 0:55) */}
      <Sequence from={2880} durationInFrames={420} name="Scene 6: Shock Rescue Protocol">
        <KineticScene6ShockRescue />
      </Sequence>

      {/* Scene 7: Emergency Dispatch 19121 Finale (300 frames | 0:55 - 1:00) */}
      <Sequence from={3300} durationInFrames={300} name="Scene 7: Emergency Dispatch 19121">
        <KineticScene7Emergency19121 />
      </Sequence>
    </AbsoluteFill>
  );
};

