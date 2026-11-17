import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { KSScene1SnappedWire } from './components/Scenes/KSScene1SnappedWire';
import { KSScene2WalkingQuestion } from './components/Scenes/KSScene2WalkingQuestion';
import { KSScene3StepPotential } from './components/Scenes/KSScene3StepPotential';
import { KSScene4BunnyHop } from './components/Scenes/KSScene4BunnyHop';
import { KSScene5WetSwitches } from './components/Scenes/KSScene5WetSwitches';
import { KSScene6ShockRescue } from './components/Scenes/KSScene6ShockRescue';
import { KSScene7Emergency19121 } from './components/Scenes/KSScene7Emergency19121';
import { KurzgesagtSafetyHUD } from './components/KurzgesagtSafetyHUD';

/**
 * SHUKTARA ELECTRICAL SAFETY: KURZGESAGT VECTOR EDITION
 * 60.00-Second High-Precision Scientific Explainer (3,600 Frames @ 60 FPS):
 * - Scene 1 (0:00 - 0:04 | Frames 0 - 240): Monsoon Storm & Snapped Live Wire
 * - Scene 2 (0:04 - 0:12 | Frames 240 - 720): The Fatal Walking Question
 * - Scene 3 (0:12 - 0:25 | Frames 720 - 1500): The Physics of Step Potential (ধাপ বিভব)
 * - Scene 4 (0:25 - 0:38 | Frames 1500 - 2280): The Bunny Hop Solution (খরগোশ লাফ)
 * - Scene 5 (0:38 - 0:48 | Frames 2280 - 2880): Liquid Conductivity & Stay-Wire Hazards
 * - Scene 6 (0:48 - 0:55 | Frames 2880 - 3300): Shock Rescue Protocol & Main Switch Isolation
 * - Scene 7 (0:55 - 1:00 | Frames 3300 - 3600): WBSEDCL 19121 Emergency Call Hub & Finale
 */
export const KurzgesagtSafetySceneManager: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#09134B' }}>
      {/* 60.00s Bengali Narration + Scientific Sound Design */}
      <Audio src={staticFile('audio/kurzgesagt_safety_soundtrack.mp3')} volume={1.0} />

      {/* Scene 1: Snapped Wire (240 frames) */}
      <Sequence from={0} durationInFrames={240} name="Scene 1: Snapped Live Wire">
        <KSScene1SnappedWire />
      </Sequence>

      {/* Scene 2: Walking Question (480 frames) */}
      <Sequence from={240} durationInFrames={480} name="Scene 2: Walking Question">
        <KSScene2WalkingQuestion />
      </Sequence>

      {/* Scene 3: Step Potential Physics (780 frames) */}
      <Sequence from={720} durationInFrames={780} name="Scene 3: Step Potential Physics">
        <KSScene3StepPotential />
      </Sequence>

      {/* Scene 4: Bunny Hop Escape (780 frames) */}
      <Sequence from={1500} durationInFrames={780} name="Scene 4: Bunny Hop Escape">
        <KSScene4BunnyHop />
      </Sequence>

      {/* Scene 5: Wet Switches & Stay-Wires (600 frames) */}
      <Sequence from={2280} durationInFrames={600} name="Scene 5: Insulation Safety">
        <KSScene5WetSwitches />
      </Sequence>

      {/* Scene 6: Shock Rescue Protocol (420 frames) */}
      <Sequence from={2880} durationInFrames={420} name="Scene 6: Shock Rescue Protocol">
        <KSScene6ShockRescue />
      </Sequence>

      {/* Scene 7: Emergency 19121 Finale (300 frames) */}
      <Sequence from={3300} durationInFrames={300} name="Scene 7: WBSEDCL 19121 Finale">
        <KSScene7Emergency19121 />
      </Sequence>

      {/* Frame-Accurate Dual Subtitle HUD */}
      <KurzgesagtSafetyHUD />
    </AbsoluteFill>
  );
};

