import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { VidyuterKineticTitle } from './VidyuterBanglaKinetic';
import { CalendarShot } from './scene1/CalendarShot';
import { ChamberIntroShot } from './scene1/ChamberIntroShot';
import { FeatherLevitationShot } from './scene1/FeatherLevitationShot';
import { ForceFieldShot } from './scene1/ForceFieldShot';
import { GlobeDiveShot } from './scene1/GlobeDiveShot';
import { FilmGrade } from './scene1/Scene1Shared';
import { ThalesRubbingShot } from './scene1/ThalesRubbingShot';

/**
 * Scene 01 Master Orchestrator (Frames 0 to 1882)
 * Synced directly to Cartesia AI Bengali voiceover (scene1.mp3) speech boundaries.
 * Multi-shot continuous film structure with 2.5D parallax, macro insert shots,
 * full-frame character acting, and film-grade lighting.
 */
export const AmberFeatherVignette: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050811',
        overflow: 'hidden',
      }}
    >
      {/* Beat 1 (0..195f): 3D Calendar Time Rewind (২০২৬ -> খ্রিস্টপূর্ব ৬০০) */}
      {frame < 195 && <CalendarShot frame={frame} />}

      {/* Beat 2 (170..385f): 3D Earth Globe Dive into Greece & Miletus */}
      {frame >= 170 && frame < 385 && <GlobeDiveShot frame={frame} />}

      {/* Beat 3 (360..545f): 2.5D Parallax Ancient Chamber & Oil Lamp */}
      {frame >= 360 && frame < 545 && <ChamberIntroShot frame={frame} />}

      {/* Beat 4 (510..905f): Thales Seated + Close-up Insert Shot of Rubbing Amber */}
      {frame >= 510 && frame < 905 && <ThalesRubbingShot frame={frame} />}

      {/* Beat 5 (880..1265f): Feather Levitation Snap & Thales Astonished Reaction */}
      {frame >= 880 && frame < 1265 && <FeatherLevitationShot frame={frame} />}

      {/* Beat 6 (1230..1882f): Invisible Electrostatic Dipole Field Lines */}
      {frame >= 1230 && <ForceFieldShot frame={frame} />}

      {/* Unified Film Vignette & Subtle Grain */}
      <FilmGrade frame={frame} vignette={0.55} />

      {/* Synced Subtle Tutorial Sound FX (sitting cleanly under voiceover) */}
      <Sequence from={12} durationInFrames={130}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_page_flip.mp3')} volume={0.28} />
      </Sequence>
      <Sequence from={215} durationInFrames={140}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_whoosh_dive.mp3')} volume={0.25} />
      </Sequence>
      <Sequence from={680} durationInFrames={195}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_spark_crackle.mp3')} volume={0.24} />
      </Sequence>
      <Sequence from={1030} durationInFrames={90}>
        <Audio src={staticFile('vidyuter-pathshala/audio/ep01_doc/sfx/sfx_feather_snap.mp3')} volume={0.35} />
      </Sequence>

      {/* ============================================================== */}
      {/* VOICE-SYNCED MINIMALIST KINETIC TYPOGRAPHY (LEFT STAGE)        */}
      {/* Zero badges, zero sublines, zero visual overlap.                */}
      {/* ============================================================== */}

      {/* 0.00s - 2.33s: "আজ থেকে প্রায় আড়াই হাজার বছর আগে" */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={10}
        endFrame={168}
        lines={[{ text: '২,৫০০ বছর আগে', highlight: '২,৫০০', sizePx: 92 }]}
        x={100}
        y={420}
        accentColor="#FBBF24"
        variant="slide"
      />

      {/* 2.91s - 4.74s: "প্রাচীন গ্রিসের মিলেটাস নগরী" */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={180}
        endFrame={350}
        lines={[{ text: 'প্রাচীন গ্রিস', highlight: 'গ্রিস', sizePx: 92 }]}
        x={100}
        y={420}
        accentColor="#38BDF8"
        variant="slide"
      />

      {/* 5.35s - 7.65s: "তখন পৃথিবী আজকের মতো আলোয় ভরা ছিল না" */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={365}
        endFrame={515}
        lines={[{ text: 'অন্ধকার যুগ', highlight: 'অন্ধকার', sizePx: 92 }]}
        x={100}
        y={420}
        accentColor="#F59E0B"
        variant="shadow"
      />

      {/* 11.51s - 14.53s: "অ্যাম্বার—পশমের সঙ্গে ঘষলে" */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={685}
        endFrame={885}
        lines={[{ text: 'অ্যাম্বার ও ঘর্ষণ', highlight: 'ঘর্ষণ', sizePx: 88 }]}
        x={100}
        y={420}
        accentColor="#FBBF24"
        variant="spark"
      />

      {/* 14.53s - 18.60s: "ছোট ছোট পালক নিজের দিকে টেনে নেয়!" */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={935}
        endFrame={1210}
        lines={[{ text: 'লাফিয়ে ওঠা পালক!', highlight: 'পালক!', sizePx: 84 }]}
        x={100}
        y={420}
        accentColor="#34D399"
        variant="spring"
      />

      {/* 19.38s - 28.88s: "অদৃশ্য এক বলে আকর্ষণ করছে" */}
      <VidyuterKineticTitle
        frame={frame}
        startFrame={1245}
        endFrame={1840}
        lines={[{ text: 'অদৃশ্য আকর্ষণ বল', highlight: 'আকর্ষণ', sizePx: 84 }]}
        x={100}
        y={420}
        accentColor="#818CF8"
        variant="slide"
      />
    </div>
  );
};
