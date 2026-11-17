import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DpHighlightV2, DpStructure3DModelV2 } from './DpStructure3DModelV2';
import { DP_TERMINALS, project3DTo2D } from './dpContinuityGraph';

const FONT_BN = "'Hind Siliguri', 'Noto Sans Bengali', 'Nirmala UI', sans-serif";

interface CameraRigProps {
  pos: [number, number, number];
  lookAt: [number, number, number];
}

const CameraRig: React.FC<CameraRigProps> = ({ pos, lookAt }) => {
  const { camera } = useThree();
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  camera.updateMatrixWorld();
  return null;
};

interface KeyframeCam {
  f: number;
  pos: [number, number, number];
  look: [number, number, number];
}

/**
 * Smooth Catmull-like / cubic eased camera interpolation across keyframe beats:
 * 0–210:   Low-angle cinematic equipment reveal
 * 210–450: HT assembly, AB switch isolator, DO fuse, LA close-up
 * 450–660: Transformer HV/LV terminals, LT cable dressing & earthing close-up
 * 660–825: Same-camera Defect / Untidy state (red ✕ + ভুল বিন্যাস)
 * 825–990: Same-camera Corrected / Dressed state (green ✓ + সঠিক বিন্যাস)
 * 990–1200: Final heroic pull-back reveal
 */
const CAM_KEYS: KeyframeCam[] = [
  // Beat 1: Low-angle reveal (0–210)
  { f: 0, pos: [2.8, 1.35, 7.6], look: [0.0, 4.1, 0.0] },
  { f: 210, pos: [2.1, 3.6, 6.2], look: [0.0, 5.2, 0.0] },

  // Beat 2: HT assembly, Isolator & DO Fuse close-up (210–450)
  { f: 255, pos: [1.85, 6.45, 3.6], look: [0.0, 6.45, 0.05] },
  { f: 360, pos: [-1.45, 6.15, 3.25], look: [0.0, 6.15, 0.05] },
  { f: 450, pos: [-1.65, 5.35, 3.35], look: [0.0, 5.15, 0.1] },

  // Beat 3: Transformer terminals, LT cable & earthing close-up (450–660)
  { f: 500, pos: [1.35, 3.95, 2.75], look: [0.0, 3.85, 0.35] },
  { f: 590, pos: [1.75, 2.35, 3.25], look: [0.65, 2.15, 0.18] },
  { f: 660, pos: [2.6, 4.1, 5.15], look: [0.0, 4.15, 0.12] },

  // Beat 4 & 5: Locked Same-Camera Before/After (660–990)
  { f: 825, pos: [2.6, 4.1, 5.15], look: [0.0, 4.15, 0.12] },
  { f: 990, pos: [2.6, 4.1, 5.15], look: [0.0, 4.15, 0.12] },

  // Beat 6: Heroic pull-back reveal (990–1200)
  { f: 1110, pos: [-2.4, 3.4, 8.8], look: [0.0, 4.15, 0.0] },
  { f: 1200, pos: [0.0, 3.85, 9.6], look: [0.0, 4.2, 0.0] },
];

function sampleCamera(frame: number): { pos: [number, number, number]; look: [number, number, number] } {
  const clamped = Math.max(0, Math.min(1200, frame));
  for (let i = 0; i < CAM_KEYS.length - 1; i++) {
    const a = CAM_KEYS[i];
    const b = CAM_KEYS[i + 1];
    if (clamped >= a.f && clamped <= b.f) {
      const span = Math.max(1, b.f - a.f);
      const rawT = (clamped - a.f) / span;
      // Smoothstep easing
      const t = rawT * rawT * (3 - 2 * rawT);
      return {
        pos: [
          a.pos[0] + (b.pos[0] - a.pos[0]) * t,
          a.pos[1] + (b.pos[1] - a.pos[1]) * t,
          a.pos[2] + (b.pos[2] - a.pos[2]) * t,
        ],
        look: [
          a.look[0] + (b.look[0] - a.look[0]) * t,
          a.look[1] + (b.look[1] - a.look[1]) * t,
          a.look[2] + (b.look[2] - a.look[2]) * t,
        ],
      };
    }
  }
  const last = CAM_KEYS[CAM_KEYS.length - 1];
  return { pos: last.pos, look: last.look };
}

interface ProjectedCalloutDef {
  id: string;
  label: string;
  terminalKey: string;
  offsetX: number;
  offsetY: number;
  startFrame: number;
  endFrame: number;
  accent?: string;
}

const CALLOUTS: ProjectedCalloutDef[] = [
  // Beat 1: Establishing
  {
    id: 'c-tx',
    label: 'ডিস্ট্রিবিউশন ট্রান্সফরমার',
    terminalKey: 'TX-HV-Y',
    offsetX: -280,
    offsetY: -70,
    startFrame: 45,
    endFrame: 195,
    accent: '#38BDF8',
  },
  {
    id: 'c-pin',
    label: '১১ কেভি পিন ইনসুলেটর',
    terminalKey: 'PIN-INS-R',
    offsetX: -260,
    offsetY: -55,
    startFrame: 85,
    endFrame: 215,
    accent: '#F59E0B',
  },
  // Beat 2: HT Assembly, AB Switch, DO Fuse, LA
  {
    id: 'c-iso',
    label: 'এবি সুইচ আইসোলেটর',
    terminalKey: 'ISO-OUT-B',
    offsetX: 165,
    offsetY: -80,
    startFrame: 230,
    endFrame: 375,
    accent: '#38BDF8',
  },
  {
    id: 'c-do',
    label: 'ড্রপ-আউট ফিউজ ইউনিট',
    terminalKey: 'DO-TOP-Y',
    offsetX: -275,
    offsetY: 35,
    startFrame: 260,
    endFrame: 435,
    accent: '#F59E0B',
  },
  {
    id: 'c-la',
    label: 'লাইটনিং অ্যারেস্টার',
    terminalKey: 'LA-TOP-R',
    offsetX: -265,
    offsetY: -70,
    startFrame: 315,
    endFrame: 445,
    accent: '#38BDF8',
  },
  // Beat 3: Transformer LV, LT Cable & Earthing
  {
    id: 'c-lv',
    label: 'এলটি বুশিং ও নিউট্রাল',
    terminalKey: 'TX-LV-N',
    offsetX: 155,
    offsetY: -65,
    startFrame: 470,
    endFrame: 585,
    accent: '#38BDF8',
  },
  {
    id: 'c-ltbox',
    label: 'এলটি ডিস্ট্রিবিউশন বক্স',
    terminalKey: 'LT-BOX-R',
    offsetX: -285,
    offsetY: -55,
    startFrame: 530,
    endFrame: 645,
    accent: '#10B981',
  },
  {
    id: 'c-earth',
    label: 'নিরাপদ আর্থিং সংযোগ',
    terminalKey: 'TX-BODY-LUG',
    offsetX: -275,
    offsetY: 45,
    startFrame: 545,
    endFrame: 650,
    accent: '#10B981',
  },
];

const ProjectedCalloutsLayer: React.FC<{
  frame: number;
  fps: number;
  camPos: [number, number, number];
  camLook: [number, number, number];
}> = ({ frame, fps, camPos, camLook }) => {
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter id="calloutShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#020617" floodOpacity="0.65" />
        </filter>
      </defs>
      {CALLOUTS.map((c) => {
        if (frame < c.startFrame || frame > c.endFrame) return null;
        const term = DP_TERMINALS[c.terminalKey];
        if (!term) return null;
        const proj = project3DTo2D(term.position, camPos, camLook, 45, 1920, 1080);
        if (!proj.visible || proj.x < 40 || proj.x > 1880 || proj.y < 40 || proj.y > 1040) {
          return null;
        }

        const enter = spring({
          frame: frame - c.startFrame,
          fps,
          config: { damping: 18, stiffness: 150, mass: 0.7 },
        });
        const exit = interpolate(frame, [c.endFrame - 16, c.endFrame], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = Math.min(enter, exit);
        if (opacity <= 0.02) return null;

        const accent = c.accent ?? '#38BDF8';
        const boxW = Math.max(210, c.label.length * 13 + 38);
        const boxH = 44;

        // Clamp target label box inside safe viewport margins
        const rawLabelX = proj.x + c.offsetX;
        const rawLabelY = proj.y + c.offsetY;
        const labelX = Math.max(54, Math.min(1920 - boxW - 54, rawLabelX));
        const labelY = Math.max(70, Math.min(1080 - boxH - 110, rawLabelY));

        const attachX = labelX + (proj.x < labelX ? 0 : boxW);
        const attachY = labelY + boxH / 2;
        const elbowX = proj.x + (attachX - proj.x) * 0.45;

        return (
          <g key={c.id} opacity={opacity}>
            {/* Leader polyline */}
            <polyline
              points={`${proj.x},${proj.y} ${elbowX},${attachY} ${attachX},${attachY}`}
              fill="none"
              stroke={accent}
              strokeWidth={2.2}
              strokeDasharray="6 4"
            />
            {/* Exact 3D anchor pulse dot */}
            <circle cx={proj.x} cy={proj.y} r={9} fill={accent} fillOpacity={0.22} />
            <circle cx={proj.x} cy={proj.y} r={4.8} fill={accent} stroke="#F8FAFC" strokeWidth={1.6} />

            {/* Bengali Label Pill */}
            <g filter="url(#calloutShadow)">
              <rect
                x={labelX}
                y={labelY}
                width={boxW}
                height={boxH}
                rx={8}
                fill="rgba(15, 23, 42, 0.88)"
                stroke={accent}
                strokeWidth={1.6}
              />
              <rect x={labelX} y={labelY} width={6} height={boxH} rx={3} fill={accent} />
              <text
                x={labelX + 20}
                y={labelY + 29}
                fill="#F8FAFC"
                fontFamily={FONT_BN}
                fontSize={22}
                fontWeight={700}
              >
                {c.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

const ComparisonOverlay: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const isBadWindow = frame >= 660 && frame < 825;
  const isGoodWindow = frame >= 825 && frame < 995;
  if (!isBadWindow && !isGoodWindow) return null;

  const localFrame = isBadWindow ? frame - 660 : frame - 825;
  const windowLen = isBadWindow ? 165 : 170;

  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.7 },
  });
  const fadeOut = interpolate(localFrame, [windowLen - 14, windowLen], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const alpha = Math.min(pop, fadeOut);
  const pulse = 0.5 + 0.5 * Math.sin(localFrame * 0.22);

  const color = isBadWindow ? '#EF4444' : '#22C55E';
  const bgTint = isBadWindow ? 'rgba(127, 29, 29, 0.34)' : 'rgba(20, 83, 45, 0.32)';
  const headline = isBadWindow ? 'ভুল বিন্যাস' : 'সঠিক বিন্যাস';
  const subline = isBadWindow ? 'ত্রুটিপূর্ণ সংযোগ ও অগোছালো তার' : 'পরিচ্ছন্ন সংযোগ ও সুবিন্যস্ত ড্রেসিং';

  // Animated stroke draw for X or Checkmark
  const drawProg = interpolate(localFrame, [6, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity: alpha }}>
      {/* Animated Glowing Frame Outline around the structure area */}
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <rect
          x={380}
          y={110}
          width={1160}
          height={840}
          rx={24}
          fill={bgTint}
          fillOpacity={0.28 + pulse * 0.14}
          stroke={color}
          strokeWidth={4 + pulse * 2}
          strokeDasharray="24 12"
          strokeDashoffset={-localFrame * 2}
        />

        {/* Animated Large Status Badge (Top-Left of Inspection Frame) */}
        <g transform={`translate(430, 155) scale(${0.88 + pop * 0.12})`}>
          <rect
            x={0}
            y={0}
            width={480}
            height={112}
            rx={16}
            fill="rgba(15, 23, 42, 0.92)"
            stroke={color}
            strokeWidth={3}
          />
          <circle cx={58} cy={56} r={34} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={3} />
          {isBadWindow ? (
            <g stroke={color} strokeWidth={6} strokeLinecap="round">
              <line
                x1={43}
                y1={41}
                x2={43 + 30 * Math.min(1, drawProg * 2)}
                y2={41 + 30 * Math.min(1, drawProg * 2)}
              />
              {drawProg > 0.5 && (
                <line
                  x1={73}
                  y1={41}
                  x2={73 - 30 * ((drawProg - 0.5) * 2)}
                  y2={41 + 30 * ((drawProg - 0.5) * 2)}
                />
              )}
            </g>
          ) : (
            <polyline
              points="41,57 53,69 76,43"
              fill="none"
              stroke={color}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={60}
              strokeDashoffset={60 * (1 - drawProg)}
            />
          )}
          <text x={112} y={52} fill={color} fontFamily={FONT_BN} fontSize={36} fontWeight={800}>
            {headline}
          </text>
          <text x={112} y={86} fill="#E2E8F0" fontFamily={FONT_BN} fontSize={21} fontWeight={600}>
            {subline}
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

interface ChapterCaption {
  start: number;
  end: number;
  title: string;
  subtitle: string;
}

const CHAPTERS: ChapterCaption[] = [
  { start: 15, end: 205, title: 'ডিপি স্ট্রাকচার ড্রেসিং', subtitle: '১১ কেভি / ৪৩৩ ভোল্ট বিতরণ ব্যবস্থা' },
  { start: 220, end: 445, title: 'এইচটি অ্যাসেম্বলি ও সুরক্ষা সরঞ্জাম', subtitle: 'এবি সুইচ, ড্রপ-আউট ফিউজ ও লাইটনিং অ্যারেস্টার' },
  { start: 460, end: 655, title: 'এলটি কেবল ড্রেসিং ও আর্থিং', subtitle: 'ট্রান্সফরমার টার্মিনাল ও দ্বৈত আর্থ পিট সংযোগ' },
  { start: 660, end: 825, title: 'অগোছালো ও ত্রুটিপূর্ণ ড্রেসিং', subtitle: 'ঢিলেঢালা জাম্পার ও অসুরক্ষিত সংযোগের ঝুঁকি' },
  { start: 825, end: 990, title: 'আদর্শ ও পরিচ্ছন্ন ড্রেসিং', subtitle: 'সুবিন্যস্ত পরিবাহী পথ ও নির্ভরযোগ্য সংযোগ' },
  { start: 1005, end: 1190, title: 'ডিপি স্ট্রাকচার ড্রেসিং', subtitle: 'কাজের কারিগর — কারিগরি প্রশিক্ষণ প্রদর্শনী' },
];

export const DpStructurePreviewV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cam = sampleCamera(frame);

  // Determine structural mode & highlight
  const isUntidy = frame >= 660 && frame < 825;
  const mode: 'dressed' | 'untidy' = isUntidy ? 'untidy' : 'dressed';

  let highlight: DpHighlightV2 = 'none';
  if (frame >= 220 && frame < 455) highlight = 'ht';
  else if (frame >= 460 && frame < 655) highlight = 'lt-earth';
  else if (frame >= 660 && frame < 825) highlight = 'bad';
  else if (frame >= 825 && frame < 995) highlight = 'good';

  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.18);

  // Active bottom Bengali chapter banner
  const activeChapter = CHAPTERS.find((c) => frame >= c.start && frame <= c.end);
  const chapterAlpha = activeChapter
    ? Math.min(
        interpolate(frame, [activeChapter.start, activeChapter.start + 16], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        interpolate(frame, [activeChapter.end - 16, activeChapter.end], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      )
    : 0;

  // Brief white flash transition at before->after switch (frame 825)
  const switchFlash = interpolate(frame, [821, 825, 833], [0, 0.42, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B132B' }}>
      <Audio src={staticFile('audio/dp_preview_20s.mp3')} volume={0.85} />

      {/* 3D Engineering Scene */}
      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ fov: 45, near: 0.1, far: 100 }}
        shadows
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#101D38']} />
        <fog attach="fog" args={['#101D38', 18, 42]} />

        <CameraRig pos={cam.pos} lookAt={cam.look} />

        {/* Industrial Golden-Hour + Sky Lighting */}
        <ambientLight intensity={0.48} color="#CBD5E1" />
        <hemisphereLight args={['#7DD3FC', '#334155', 0.65]} />
        <directionalLight
          position={[8, 14, 9]}
          intensity={2.2}
          color="#FFF7ED"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={35}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={11}
          shadow-camera-bottom={-2}
        />
        <directionalLight position={[-7, 6, -6]} intensity={0.85} color="#38BDF8" />

        <DpStructure3DModelV2 mode={mode} highlight={highlight} pulse={pulse} />
      </ThreeCanvas>

      {/* Subtle Cinematic Vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 58%, rgba(2,6,23,0.52) 100%)',
        }}
      />

      {/* True 3D-to-2D Projected Bengali Callouts */}
      <ProjectedCalloutsLayer frame={frame} fps={fps} camPos={cam.pos} camLook={cam.look} />

      {/* Same-Camera Good vs Bad Animated Overlay */}
      <ComparisonOverlay frame={frame} fps={fps} />

      {/* Switch Flash */}
      {switchFlash > 0.01 && (
        <AbsoluteFill style={{ backgroundColor: `rgba(255,255,255,${switchFlash})`, pointerEvents: 'none' }} />
      )}

      {/* Pure Bengali Bottom Lower-Third Chapter Strip */}
      {activeChapter && chapterAlpha > 0.02 && (
        <div
          style={{
            position: 'absolute',
            left: 72,
            bottom: 54,
            opacity: chapterAlpha,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            backgroundColor: 'rgba(15, 23, 42, 0.86)',
            borderLeft: `6px solid ${isUntidy ? '#EF4444' : frame >= 825 && frame < 995 ? '#22C55E' : '#F59E0B'}`,
            borderRadius: '0 12px 12px 0',
            padding: '14px 28px 14px 22px',
            boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
            fontFamily: FONT_BN,
          }}
        >
          <div>
            <div style={{ color: '#F8FAFC', fontSize: 32, fontWeight: 800, lineHeight: 1.15 }}>
              {activeChapter.title}
            </div>
            <div style={{ color: '#CBD5E1', fontSize: 20, fontWeight: 500, marginTop: 4 }}>
              {activeChapter.subtitle}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
