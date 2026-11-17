import React from 'react';
import { Composition } from 'remotion';
import {
  VidyuterPathshalaEP01,
  VidyuterPathshalaEP01Preview,
  EP01_TOTAL_FRAMES_60FPS,
} from './vidyuter-pathshala/VidyuterPathshalaEP01';
import {
  VidyuterPathshalaHistoricalMaster,
  EP01_HISTORICAL_MASTER_FRAMES,
} from './vidyuter-pathshala/historical/VidyuterPathshalaHistoricalMaster';
import {
  VidyuterKineticDemo,
  KINETIC_DEMO_FRAMES,
} from './vidyuter-pathshala/kinetic/VidyuterKineticDemo';
import {
  FranklinKite1752,
  FRANKLIN_1752_TOTAL_FRAMES,
} from './vidyuter-pathshala/franklin_1752/FranklinKite1752';
import {
  VidyuterPathshalaEP02,
  EP02_TOTAL_FRAMES,
} from './vidyuter-pathshala/ep02/VidyuterPathshalaEP02';
import {
  VidyuterPathshalaEP03,
  EP03_TOTAL_FRAMES,
} from './vidyuter-pathshala/ep03/VidyuterPathshalaEP03';
import {
  VidyuterPathshalaEP01V2,
  EP01_V2_TOTAL_FRAMES,
} from './vidyuter-pathshala/ep01_v2/VidyuterPathshalaEP01V2';
import { SceneManager } from './SceneManager';
import { RoguePlanetsSceneManager } from './rogue-planets/RoguePlanetsSceneManager';
import { KurzgesagtSafetySceneManager } from './kurzgesagt-safety/KurzgesagtSafetySceneManager';
import { ProAnimationDemo } from './pro-demo/ProAnimationDemo';
import { EditorialSceneManager } from './editorial-explainer/EditorialSceneManager';
import { KineticSceneManager } from './kinetic-master/KineticSceneManager';
import { CinematicPilotFilm } from './cinematic-film/CinematicPilotFilm';
import { MasterCinematicFilm } from './cinematic-film/MasterCinematicFilm';
import { CharacterAnimationTest } from './cinematic-film/CharacterAnimationTest';
import { MeeraModelSheet } from './honeybee-film/MeeraModelSheet';
import { MeeraAnimationTest } from './honeybee-film/MeeraAnimationTest';
import { HoneybeeExplainerFilm } from './honeybee-film/HoneybeeExplainerFilm';
import { SecretLifeBeePilot } from './secret-life-bee/SecretLifeBeePilot';
import { SecretLifeBeePilotV2 } from './secret-life-bee/SecretLifeBeePilotV2';
import { SecretLifeBeeFilm } from './secret-life-bee/SecretLifeBeeFilm';
import { SecretLifeBeeFilmV2 } from './secret-life-bee/SecretLifeBeeFilmV2';
import { DpStructurePreview } from './dp-structure-preview/DpStructurePreview';
import { DpStructurePreviewV2 } from './dp-structure-preview/DpStructurePreviewV2';
import { DpElevationSheets } from './dp-structure-preview/DpElevationSheets';
import { DpStructureTrainingFilm } from './dp-structure-training/DpStructureTrainingFilm';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ============================================================== */}
      {/* VIDYUTER PATHSHALA (বিদ্যুতের পাঠশালা) — MASTER SERIES         */}
      {/* ============================================================== */}
      {/* Episode 01: Master Historical-Scientific Explainer (178s / 10,709 frames @ 60fps) */}
      <Composition
        id="VidyuterPathshalaHistoricalMaster"
        component={VidyuterPathshalaHistoricalMaster}
        durationInFrames={EP01_HISTORICAL_MASTER_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 1752 Historical Documentary: Benjamin Franklin Kite & Key (102.90s / 6,174 frames @ 60fps) */}
      <Composition
        id="FranklinKite1752"
        component={FranklinKite1752}
        durationInFrames={FRANKLIN_1752_TOTAL_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Episode 01 v2.0: What Exactly Is Electricity? (বিদ্যুৎ আসলে কী?) */}
      <Composition
        id="VidyuterPathshalaEP01V2"
        component={VidyuterPathshalaEP01V2}
        durationInFrames={EP01_V2_TOTAL_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Episode 02: Atoms and Electric Charge (পরমাণু ও বৈদ্যুতিক চার্জ) */}
      <Composition
        id="VidyuterPathshalaEP02"
        component={VidyuterPathshalaEP02}
        durationInFrames={EP02_TOTAL_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Episode 03: Charge in Motion & Electric Current (চার্জের গতি ও তড়িৎ প্রবাহ) */}
      <Composition
        id="VidyuterPathshalaEP03"
        component={VidyuterPathshalaEP03}
        durationInFrames={EP03_TOTAL_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 15s High-Energy Kinetic Typography Demo (Cartesia AI Bengali Voice) */}
      <Composition
        id="VidyuterKineticDemo"
        component={VidyuterKineticDemo}
        durationInFrames={KINETIC_DEMO_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Episode 01: বিদ্যুৎ আসলে কী? — What Exactly Is Electricity?    */}
      <Composition
        id="VidyuterPathshalaEP01"
        component={VidyuterPathshalaEP01}
        durationInFrames={EP01_TOTAL_FRAMES_60FPS}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Episode 01: 15s Rapid Verification Preview                      */}
      <Composition
        id="VidyuterPathshalaEP01-Preview"
        component={VidyuterPathshalaEP01Preview}
        durationInFrames={900}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 98s Full Training Video: DP Structure Dressing (11 kV / 433 V) */}
      <Composition
        id="DpStructureTrainingFilm"
        component={DpStructureTrainingFilm}
        durationInFrames={5880}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 20s Cinematic Promotional Preview V2: DP Structure Dressing (11 kV / 433 V) */}
      <Composition
        id="DpStructurePreviewV2"
        component={DpStructurePreviewV2}
        durationInFrames={1200}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Elevation Stills (Frame 0 = Front, Frame 1 = Side) */}
      <Composition
        id="DpElevationSheets"
        component={DpElevationSheets}
        durationInFrames={2}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 20s Cinematic Promotional Preview: DP Structure Dressing (11 kV / 433 V) */}
      <Composition
        id="DpStructurePreview"
        component={DpStructurePreview}
        durationInFrames={1200}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Secret Life of a Honeybee: Upgraded 50.0s Cinematic Film V2 (3,000 frames @ 60fps) */}
      <Composition
        id="SecretLifeBeeFilmV2"
        component={SecretLifeBeeFilmV2}
        durationInFrames={3000}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Secret Life of a Honeybee: Upgraded 12.0s Pilot V2 (720 frames @ 60fps) */}
      <Composition
        id="SecretLifeBeePilotV2"
        component={SecretLifeBeePilotV2}
        durationInFrames={720}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Secret Life of a Honeybee: Complete 50.0s Cinematic Film (3,000 frames @ 60fps) */}
      <Composition
        id="SecretLifeBeeFilm"
        component={SecretLifeBeeFilm}
        durationInFrames={3000}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Secret Life of a Honeybee: 12.0s Pilot (720 frames @ 60fps) */}
      <Composition
        id="SecretLifeBeePilot"
        component={SecretLifeBeePilot}
        durationInFrames={720}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Honeybee Film: Complete 50.0s Bengali Cinematic Explainer (3,000 frames @ 60fps) */}
      <Composition
        id="HoneybeeExplainerFilm"
        component={HoneybeeExplainerFilm}
        durationInFrames={3000}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Honeybee Film: Meera 4.0s Animation Test (240 frames @ 60fps) */}
      <Composition
        id="MeeraAnimationTest"
        component={MeeraAnimationTest}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Honeybee Film: Meera Model & Expression Sheet */}
      <Composition
        id="MeeraModelSheet"
        component={MeeraModelSheet}
        durationInFrames={1}
        fps={60}
        width={1920}
        height={1080}
      />
      {/* 60 FPS Character Animation Test (4.50s / 270 frames) */}
      <Composition
        id="CharacterAnimationTest"
        component={CharacterAnimationTest}
        durationInFrames={270}
        fps={60}
        width={1920}
        height={1080}
      />
      {/* 60 FPS Master Cinematic 2.5D Animated Film (60.00s / 3,600 frames) */}
      <Composition
        id="MasterCinematicFilm60"
        component={MasterCinematicFilm}
        durationInFrames={3600}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 60 FPS Cinematic 2.5D Pilot Film (12.00s / 720 frames) */}
      <Composition
        id="CinematicPilotFilm"
        component={CinematicPilotFilm}
        durationInFrames={720}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 60 FPS Phase 2 Kinetic Motion-Graphics Master (60.00s / 3,600 frames) */}
      <Composition
        id="KineticSafetyMaster60"
        component={KineticSceneManager}
        durationInFrames={3600}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 60 FPS Editorial Master 2D Science Explainer (60.00s / 3,600 frames) */}
      <Composition
        id="EditorialSafety60"
        component={EditorialSceneManager}
        durationInFrames={3600}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 60 FPS Professional Studio Animation Demo: Kurzgesagt Standard (3.0s / 180 frames) */}
      <Composition
        id="ProAnimationDemo"
        component={ProAnimationDemo}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 60 FPS Kurzgesagt-Style Electrical Safety & Monsoon Precautions: WBSEDCL */}
      <Composition
        id="KurzgesagtSafety60"
        component={KurzgesagtSafetySceneManager}
        durationInFrames={3600}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 60 FPS Kurzgesagt-Style 2D Science Animation: Rogue Planets */}
      <Composition
        id="RoguePlanetsExplainer"
        component={RoguePlanetsSceneManager}
        durationInFrames={3600}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 30 FPS Rural Electrical Safety Film: WBSEDCL */}
      <Composition
        id="ElectricitySafetyWB"
        component={SceneManager}
        durationInFrames={5400}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

