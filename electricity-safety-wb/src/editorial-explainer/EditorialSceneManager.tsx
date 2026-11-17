import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { EditorialScene1Storm } from './components/Scenes/EditorialScene1Storm';
import { EditorialScene2WalkingQuestion } from './components/Scenes/EditorialScene2WalkingQuestion';
import { EditorialScene3StepPotential } from './components/Scenes/EditorialScene3StepPotential';
import { EditorialScene4BunnyHop } from './components/Scenes/EditorialScene4BunnyHop';
import { EditorialScene5Insulation } from './components/Scenes/EditorialScene5Insulation';
import { EditorialScene6ShockRescue } from './components/Scenes/EditorialScene6ShockRescue';
import { EditorialScene7Emergency19121 } from './components/Scenes/EditorialScene7Emergency19121';
import { EditorialHUD } from './components/EditorialHUD';

/**
 * MASTER EDITORIAL 2D SCIENCE EXPLAINER
 * 60.00 Seconds (3,600 Consecutive Frames @ 60 FPS, 1920x1080 Full HD)
 * - Scene 1 (0:00 - 0:04 | Frames 0 - 240): Severed Conductor Storm Incident
 * - Scene 2 (0:04 - 0:12 | Frames 240 - 720): The Fatal Walking Stride Dilemma
 * - Scene 3 (0:12 - 0:25 | Frames 720 - 1500): The Physics of Step Potential (ধাপ বিভব)
 * - Scene 4 (0:25 - 0:38 | Frames 1500 - 2280): Locked Feet Bunny Hop Escape (ΔV = 0)
 * - Scene 5 (0:38 - 0:48 | Frames 2280 - 2880): Insulation & Liquid Conductivity
 * - Scene 6 (0:48 - 0:55 | Frames 2880 - 3300): Main Switch Isolation & Bamboo Rescue
 * - Scene 7 (0:55 - 1:00 | Frames 3300 - 3600): WBSEDCL 19121 Emergency Dispatch Hub
 */
export const EditorialSceneManager: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#040717', overflow: 'hidden' }}>
      {/* 60.000s High-Fidelity Master Bengali Soundtrack */}
      <Audio src={staticFile('audio/kurzgesagt_safety_soundtrack.mp3')} volume={1.0} />

      {/* Scene 1: Severed Conductor (240 frames) */}
      <Sequence from={0} durationInFrames={240} name="Scene 1: Severed Conductor">
        <EditorialScene1Storm />
      </Sequence>

      {/* Scene 2: The Walking Question (480 frames) */}
      <Sequence from={240} durationInFrames={480} name="Scene 2: The Walking Question">
        <EditorialScene2WalkingQuestion />
      </Sequence>

      {/* Scene 3: Step Potential Physics (780 frames) */}
      <Sequence from={720} durationInFrames={780} name="Scene 3: Step Potential Physics">
        <EditorialScene3StepPotential />
      </Sequence>

      {/* Scene 4: Bunny Hop Escape (780 frames) */}
      <Sequence from={1500} durationInFrames={780} name="Scene 4: Bunny Hop Escape">
        <EditorialScene4BunnyHop />
      </Sequence>

      {/* Scene 5: Insulation Rules (600 frames) */}
      <Sequence from={2280} durationInFrames={600} name="Scene 5: Insulation Rules">
        <EditorialScene5Insulation />
      </Sequence>

      {/* Scene 6: Shock Rescue Protocol (420 frames) */}
      <Sequence from={2880} durationInFrames={420} name="Scene 6: Shock Rescue Protocol">
        <EditorialScene6ShockRescue />
      </Sequence>

      {/* Scene 7: Emergency Hotline Finale (300 frames) */}
      <Sequence from={3300} durationInFrames={300} name="Scene 7: Emergency Hotline 19121">
        <EditorialScene7Emergency19121 />
      </Sequence>

      {/* Synchronized Informational HUD */}
      <EditorialHUD frame={frame} />
    </AbsoluteFill>
  );
};

