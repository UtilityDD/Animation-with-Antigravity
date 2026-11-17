import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Scene1DarkEclipse } from './components/Scenes/Scene1DarkEclipse';
import { Scene2CosmicQuestion } from './components/Scenes/Scene2CosmicQuestion';
import { Scene3GravitationalBilliards } from './components/Scenes/Scene3GravitationalBilliards';
import { Scene4FrozenOcean } from './components/Scenes/Scene4FrozenOcean';
import { Scene5BioluminescentArk } from './components/Scenes/Scene5BioluminescentArk';
import { Scene6TrillionsOfWanderers } from './components/Scenes/Scene6TrillionsOfWanderers';
import { Scene7CosmicCallback } from './components/Scenes/Scene7CosmicCallback';
import { RogueSubtitleHUD } from './components/RogueSubtitleHUD';

/**
 * ROGUE PLANETS: THE DARK WANDERERS OF THE MILKY WAY
 * Master 60.00-Second Timeline Sequencer (3,600 Frames @ 60 FPS):
 * - Scene 1 (0:00 - 0:04 | Frames 0 - 240): The Dark Eclipse
 * - Scene 2 (0:04 - 0:11 | Frames 240 - 660): The Cosmic Question
 * - Scene 3 (0:11 - 0:20 | Frames 660 - 1200): Gravitational Billiards
 * - Scene 4 (0:20 - 0:35 | Frames 1200 - 2100): The Frozen Shell & Ocean
 * - Scene 5 (0:35 - 0:47 | Frames 2100 - 2820): The Bioluminescent Ark
 * - Scene 6 (0:47 - 0:57 | Frames 2820 - 3420): Trillions of Wanderers
 * - Scene 7 (0:57 - 1:00 | Frames 3420 - 3600): The Cosmic Callback
 */
export const RoguePlanetsSceneManager: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#05071A' }}>
      {/* Synchronized 60.00s Documentary Narration + Ambient Cosmic Score */}
      <Audio src={staticFile('audio/rogue_planets_soundtrack.mp3')} volume={1.0} />

      {/* Scene 1: 0:00 - 0:04 (240 frames) */}
      <Sequence from={0} durationInFrames={240} name="Scene 1: The Dark Eclipse">
        <Scene1DarkEclipse />
      </Sequence>

      {/* Scene 2: 0:04 - 0:11 (420 frames) */}
      <Sequence from={240} durationInFrames={420} name="Scene 2: The Cosmic Question">
        <Scene2CosmicQuestion />
      </Sequence>

      {/* Scene 3: 0:11 - 0:20 (540 frames) */}
      <Sequence from={660} durationInFrames={540} name="Scene 3: Gravitational Billiards">
        <Scene3GravitationalBilliards />
      </Sequence>

      {/* Scene 4: 0:20 - 0:35 (900 frames) */}
      <Sequence from={1200} durationInFrames={900} name="Scene 4: The Frozen Ocean">
        <Scene4FrozenOcean />
      </Sequence>

      {/* Scene 5: 0:35 - 0:47 (720 frames) */}
      <Sequence from={2100} durationInFrames={720} name="Scene 5: The Bioluminescent Ark">
        <Scene5BioluminescentArk />
      </Sequence>

      {/* Scene 6: 0:47 - 0:57 (600 frames) */}
      <Sequence from={2820} durationInFrames={600} name="Scene 6: Trillions of Wanderers">
        <Scene6TrillionsOfWanderers />
      </Sequence>

      {/* Scene 7: 0:57 - 1:00 (180 frames) */}
      <Sequence from={3420} durationInFrames={180} name="Scene 7: The Cosmic Callback">
        <Scene7CosmicCallback />
      </Sequence>

      {/* Synchronized Dynamic Subtitle HUD */}
      <RogueSubtitleHUD />
    </AbsoluteFill>
  );
};

