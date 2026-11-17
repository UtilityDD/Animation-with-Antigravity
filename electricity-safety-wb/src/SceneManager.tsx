import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Act1MonsoonDanger } from './components/Acts/Act1MonsoonDanger';
import { Act2StepPotential } from './components/Acts/Act2StepPotential';
import { Act3WetHands } from './components/Acts/Act3WetHands';
import { Act4KiteDanger } from './components/Acts/Act4KiteDanger';
import { Act5FirstAid } from './components/Acts/Act5FirstAid';
import { Act6EmergencyCard } from './components/Acts/Act6EmergencyCard';
import { SubtitleHUD } from './components/SubtitleHUD';

/**
 * Master SceneManager orchestrating the strict 180.00-second (5400 frames @ 30fps) timeline:
 * - Act 1 (0:00 – 0:30 | Frames 0–900): The Village & The Monsoon Danger
 * - Act 2 (0:30 – 1:05 | Frames 900–1950): Snapped Wire & Step Potential Protocol
 * - Act 3 (1:05 – 1:40 | Frames 1950–3000): Wet Hands, Switches & Submerged Poles
 * - Act 4 (1:40 – 2:15 | Frames 3000–4050): Flying Kites & Transformer Fences
 * - Act 5 (2:15 – 2:45 | Frames 4050–4950): First Aid & Golden Rules for Shock Victims
 * - Act 6 (2:45 – 3:00 | Frames 4950–5400): Emergency Contacts (19121) & Call to Action
 */
export const SceneManager: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      {/* Synchronized 180s Bengali Narration + Regional Foley + Folk Score Audio Stem */}
      <Audio src={staticFile('audio/master_soundtrack.mp3')} volume={1.0} />

      {/* ACT 1: 0:00 – 0:30 (900 frames) */}
      <Sequence from={0} durationInFrames={900} name="Act 1: Village & Monsoon Danger">
        <Act1MonsoonDanger />
      </Sequence>

      {/* ACT 2: 0:30 – 1:05 (1050 frames) */}
      <Sequence from={900} durationInFrames={1050} name="Act 2: Snapped Wire & Step Potential">
        <Act2StepPotential />
      </Sequence>

      {/* ACT 3: 1:05 – 1:40 (1050 frames) */}
      <Sequence from={1950} durationInFrames={1050} name="Act 3: Wet Hands, Switches & Poles">
        <Act3WetHands />
      </Sequence>

      {/* ACT 4: 1:40 – 2:15 (1050 frames) */}
      <Sequence from={3000} durationInFrames={1050} name="Act 4: Flying Kites & Transformer Fences">
        <Act4KiteDanger />
      </Sequence>

      {/* ACT 5: 2:15 – 2:45 (900 frames) */}
      <Sequence from={4050} durationInFrames={900} name="Act 5: First Aid & Golden Rules">
        <Act5FirstAid />
      </Sequence>

      {/* ACT 6: 2:45 – 3:00 (450 frames) */}
      <Sequence from={4950} durationInFrames={450} name="Act 6: Emergency Contacts 19121 & Finale">
        <Act6EmergencyCard />
      </Sequence>

      {/* Global Frame-Accurate Bengali/English Subtitle & Broadcast HUD */}
      <SubtitleHUD />
    </AbsoluteFill>
  );
};

