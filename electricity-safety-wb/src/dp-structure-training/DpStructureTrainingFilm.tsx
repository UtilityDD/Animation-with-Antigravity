import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { DpStructure3DModelV3, TrainingHighlight } from './DpStructure3DModelV3';
import { StructureDefectMode, Vec3 } from './dpTrainingContinuity';
import {
  CalloutItem,
  DocumentationRecordCard,
  FinalBadgeReveal,
  FONT_BN,
  PinpointAnnotation,
  PinpointMarksOverlay,
  ProjectedCalloutsOverlay,
  SafetyPrerequisiteStrip,
} from './DpTrainingOverlays';

const CameraRig: React.FC<{ pos: Vec3; lookAt: Vec3 }> = ({ pos, lookAt }) => {
  const { camera } = useThree();
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  camera.updateMatrixWorld();
  return null;
};

interface KeyCam {
  f: number;
  pos: Vec3;
  look: Vec3;
}

/**
 * 98.0s (5880 frames @ 60fps) Smooth Camera Choreography
 * Sec 1 (0–720):     Low-angle push-in + brief untidy contrast
 * Sec 2 (720–2040):  Elevated HT->LT top-to-bottom sequence
 * Sec 3 (2040–3240): Clearance, Binding before/after, Torque wrench fastening
 * Sec 4 (3240–4320): Myth vs Reality + Abrasion before/after
 * Sec 5 (4320–5280): Three Professional Habits (Alignment, Future provision, Documentation)
 * Sec 6 (5280–5880): Close-up -> Pullback heroic reveal + Final Badge
 */
const CAM_KEYS: KeyCam[] = [
  // Sec 1
  { f: 0, pos: [2.9, 1.4, 8.2], look: [0.0, 4.1, 0.0] },
  { f: 340, pos: [1.9, 3.3, 6.2], look: [0.0, 4.5, 0.0] },
  { f: 560, pos: [2.3, 3.8, 5.4], look: [0.0, 4.1, 0.1] },
  { f: 720, pos: [2.2, 7.6, 5.6], look: [0.0, 6.8, 0.0] },

  // Sec 2: HT to LT top-to-bottom
  { f: 980, pos: [1.7, 7.1, 3.9], look: [0.0, 6.9, 0.0] },
  { f: 1320, pos: [-1.6, 5.9, 3.4], look: [0.0, 5.7, 0.1] },
  { f: 1620, pos: [1.4, 4.0, 3.1], look: [0.2, 3.7, 0.3] },
  { f: 2040, pos: [1.9, 2.3, 3.4], look: [0.7, 2.1, 0.15] },

  // Sec 3: Clearance (2040-2440), Binding (2440-2840), Fastening (2840-3240)
  { f: 2240, pos: [0.2, 5.6, 3.3], look: [0.0, 5.3, 0.15] },
  { f: 2440, pos: [0.45, 8.15, 1.55], look: [0.0, 7.98, 0.0] },
  { f: 2840, pos: [0.45, 8.15, 1.55], look: [0.0, 7.98, 0.0] },
  { f: 2940, pos: [-0.95, 6.05, 1.55], look: [-0.88, 5.96, 0.12] },
  { f: 3240, pos: [-0.95, 6.05, 1.55], look: [-0.88, 5.96, 0.12] },

  // Sec 4: Myth vs Reality (3240-3940), Abrasion (3940-4320)
  { f: 3340, pos: [2.4, 4.0, 5.2], look: [0.0, 4.1, 0.1] },
  { f: 3940, pos: [2.4, 4.0, 5.2], look: [0.0, 4.1, 0.1] },
  { f: 4010, pos: [1.25, 3.35, 1.95], look: [0.58, 3.22, 0.32] },
  { f: 4320, pos: [1.25, 3.35, 1.95], look: [0.58, 3.22, 0.32] },

  // Sec 5: Three Tips
  { f: 4440, pos: [0.0, 4.4, 8.6], look: [0.0, 4.3, 0.0] },
  { f: 4680, pos: [1.65, 1.45, 2.75], look: [1.08, 1.25, 0.2] },
  { f: 4960, pos: [-2.6, 2.6, 8.4], look: [0.0, 4.2, 0.0] },
  { f: 5280, pos: [-2.2, 3.0, 8.2], look: [0.0, 4.2, 0.0] },

  // Sec 6: Close-up -> Heroic pullback
  { f: 5360, pos: [1.2, 5.4, 2.8], look: [0.0, 5.2, 0.15] },
  { f: 5620, pos: [0.0, 3.9, 9.6], look: [0.0, 4.25, 0.0] },
  { f: 5880, pos: [0.0, 4.0, 10.2], look: [0.0, 4.25, 0.0] },
];

function sampleCam(frame: number): { pos: Vec3; look: Vec3 } {
  const f = Math.max(0, Math.min(5880, frame));
  for (let i = 0; i < CAM_KEYS.length - 1; i++) {
    const a = CAM_KEYS[i];
    const b = CAM_KEYS[i + 1];
    if (f >= a.f && f <= b.f) {
      const span = Math.max(1, b.f - a.f);
      const u = (f - a.f) / span;
      const t = u * u * (3 - 2 * u);
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

const CALLOUTS: CalloutItem[] = [
  // Sec 2A: HT side
  { id: 's2-ins', label: 'ইনসুলেটর', terminalKey: 'PIN-INS-R', offsetX: -220, offsetY: -40, start: 780, end: 1020, accent: '#38BDF8' },
  { id: 's2-ab', label: 'এবি সুইচ', terminalKey: 'ISO-OUT-B', offsetX: 140, offsetY: -65, start: 930, end: 1180, accent: '#38BDF8' },
  { id: 's2-do', label: 'ড্রপ-আউট ফিউজ', terminalKey: 'DO-TOP-Y', offsetX: -245, offsetY: 30, start: 1120, end: 1380, accent: '#F59E0B' },
  { id: 's2-la', label: 'লাইটনিং অ্যারেস্টার', terminalKey: 'LA-TOP-R', offsetX: -250, offsetY: -60, start: 1220, end: 1460, accent: '#38BDF8' },
  { id: 's2-tx', label: 'ট্রান্সফরমার', terminalKey: 'TX-HV-Y', offsetX: -240, offsetY: -60, start: 1480, end: 1720, accent: '#38BDF8' },
  // Sec 2B: LT & Earthing
  { id: 's2-lt', label: 'এলটি কেবল', terminalKey: 'LT-BOX-R', offsetX: -230, offsetY: -65, start: 1740, end: 2010, accent: '#38BDF8' },
  { id: 's2-n', label: 'নিউট্রাল', terminalKey: 'TX-LV-N', offsetX: 135, offsetY: -50, start: 1640, end: 1920, accent: '#F59E0B' },
  { id: 's2-e', label: 'আর্থিং', terminalKey: 'EARTH-PIT-R', offsetX: 110, offsetY: -75, start: 1840, end: 2040, accent: '#10B981' },
  // Sec 3A: Clearance
  { id: 's3-c1', label: 'ফেজ-টু-ফেজ ক্লিয়ারেন্স', terminalKey: 'DO-BOT-Y', offsetX: 140, offsetY: 40, start: 2100, end: 2420, accent: '#38BDF8' },
  // Sec 3C: Fastening
  { id: 's3-t', label: 'নির্মাতার নির্ধারিত টর্ক', terminalKey: 'FASTEN-BOLT-R', offsetX: 120, offsetY: -80, start: 2920, end: 3220, accent: '#22C55E' },
  // Sec 5 Tip 2: Future provision
  { id: 's5-fut', label: 'ভবিষ্যৎ সংযোগের জন্য নির্ধারিত ব্যবস্থা', terminalKey: 'FUTURE-RESERVE', offsetX: -390, offsetY: -70, start: 4680, end: 4940, accent: '#38BDF8' },
];

const PINPOINTS: PinpointAnnotation[] = [
  // Sec 1 brief untidy contrast
  {
    id: 'p-s1-bad',
    kind: 'bad',
    label: 'ভুল বিন্যাস',
    anchorPos: [0.0, 5.3, 0.48],
    traceWorldPoints: [
      [-1.05, 5.82, 0.34],
      [-0.71, 5.42, 0.62],
      [-0.45, 4.92, 0.06],
      [-0.34, 4.62, 0.16],
    ],
    offsetX: -280,
    offsetY: -50,
    start: 420,
    end: 640,
  },
  // Sec 3B Binding before -> after (same camera)
  {
    id: 'p-s3-bind-bad',
    kind: 'bad',
    label: 'অতিরিক্ত বাইন্ডিং লেজ',
    anchorPos: [0.08, 8.0, 0.08],
    offsetX: 90,
    offsetY: -70,
    start: 2470,
    end: 2645,
  },
  {
    id: 'p-s3-bind-good',
    kind: 'good',
    label: 'পরিচ্ছন্ন ফিনিশিং',
    anchorPos: [0.0, 7.98, 0.02],
    offsetX: 90,
    offsetY: -70,
    start: 2660,
    end: 2835,
  },
  // Sec 4 Myth vs Reality (component-level traces, NO large box)
  {
    id: 'p-s4-myth',
    kind: 'bad',
    label: 'অগোছালো জাম্পার ও কেবল',
    anchorPos: [-0.65, 5.4, 0.55],
    traceWorldPoints: [
      [-1.05, 5.82, 0.34],
      [-0.71, 5.42, 0.62],
      [-0.34, 4.62, 0.16],
    ],
    offsetX: -320,
    offsetY: -65,
    start: 3320,
    end: 3615,
  },
  {
    id: 'p-s4-real',
    kind: 'good',
    label: 'সুবিন্যস্ত জাম্পার ও কেবল',
    anchorPos: [0.0, 5.1, 0.42],
    traceWorldPoints: [
      [0.0, 5.82, 0.34],
      [0.0, 5.14, 0.44],
      [0.0, 4.62, 0.16],
    ],
    offsetX: 110,
    offsetY: -55,
    start: 3630,
    end: 3935,
  },
  // Sec 4 Abrasion defect -> fix (same camera)
  {
    id: 'p-s4-abr-bad',
    kind: 'bad',
    label: 'ধারালো প্রান্তে ঘষা',
    anchorPos: [0.58, 3.22, 0.32],
    traceWorldPoints: [
      [-0.3, 4.02, 0.56],
      [0.25, 3.5, 0.48],
      [0.58, 3.22, 0.32],
      [1.02, 2.75, 0.24],
    ],
    offsetX: 90,
    offsetY: -80,
    start: 3990,
    end: 4145,
  },
  {
    id: 'p-s4-abr-good',
    kind: 'good',
    label: 'সাপোর্টসহ নিরাপদ রুট',
    anchorPos: [0.65, 3.52, 0.42],
    traceWorldPoints: [
      [-0.3, 4.02, 0.56],
      [0.48, 3.72, 0.5],
      [1.02, 3.22, 0.26],
      [1.02, 2.55, 0.24],
    ],
    offsetX: 90,
    offsetY: -80,
    start: 4160,
    end: 4315,
  },
  // Sec 6 Final attached component checkmarks
  {
    id: 'p-s6-ht',
    kind: 'good',
    label: 'উচ্চচাপ অংশ',
    anchorPos: [0.0, 6.24, 0.26],
    offsetX: -260,
    offsetY: -35,
    start: 5540,
    end: 5860,
  },
  {
    id: 'p-s6-tx',
    kind: 'good',
    label: 'ট্রান্সফরমার',
    anchorPos: [0.0, 4.1, 0.45],
    offsetX: -260,
    offsetY: -20,
    start: 5570,
    end: 5860,
  },
  {
    id: 'p-s6-lt',
    kind: 'good',
    label: 'এলটি কেবল ও আর্থিং',
    anchorPos: [1.06, 2.5, 0.24],
    offsetX: 110,
    offsetY: -30,
    start: 5600,
    end: 5860,
  },
];

interface SectionBanner {
  start: number;
  end: number;
  title: string;
  subtitle: string;
  accent: string;
}

const BANNERS: SectionBanner[] = [
  { start: 3250, end: 3615, title: 'ভুল ধারণা', subtitle: 'ড্রেসিং শুধু সৌন্দর্যের জন্য', accent: '#EF4444' },
  { start: 3625, end: 3935, title: 'বাস্তবতা', subtitle: 'পরিচ্ছন্ন ড্রেসিং সহজ করে পরিদর্শন', accent: '#22C55E' },
  { start: 4340, end: 4650, title: 'দক্ষ কর্মীর অভ্যাস ১', subtitle: 'সুশৃঙ্খল ও সামঞ্জস্যপূর্ণ বিন্যাস', accent: '#38BDF8' },
  { start: 4660, end: 4950, title: 'দক্ষ কর্মীর অভ্যাস ২', subtitle: 'ভবিষ্যৎ সংযোগের জন্য নির্ধারিত ব্যবস্থা', accent: '#38BDF8' },
  { start: 4960, end: 5270, title: 'দক্ষ কর্মীর অভ্যাস ৩', subtitle: 'কাজ শেষে ছবি ও রেকর্ড সংরক্ষণ', accent: '#22C55E' },
];

export const DpStructureTrainingFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = sampleCam(frame);

  // Determine structural state
  let defectMode: StructureDefectMode = 'dressed';
  if ((frame >= 410 && frame < 640) || (frame >= 3260 && frame < 3620)) {
    defectMode = 'untidy';
  } else if (frame >= 3950 && frame < 4150) {
    defectMode = 'abrasion';
  }

  let highlight: TrainingHighlight = 'none';
  if (frame >= 760 && frame < 1480) highlight = 'ht';
  else if (frame >= 1500 && frame < 1850) highlight = 'lt';
  else if (frame >= 1850 && frame < 2040) highlight = 'earth';
  else if (frame >= 2850 && frame < 3240) highlight = 'fasten';
  else if (frame >= 3950 && frame < 4150) highlight = 'abrasion';
  else if (frame >= 4660 && frame < 4950) highlight = 'future';

  const showUntidyBindingTail = frame >= 2440 && frame < 2650;
  const torqueWrenchProgress =
    frame >= 2870 && frame < 3230 ? ((frame - 2870) % 120) / 120 : null;
  const showClearanceGuides = frame >= 2060 && frame < 2430;
  const showFutureReserve = frame >= 4660 && frame < 4950;
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.16);

  const activeBanner = BANNERS.find((b) => frame >= b.start && frame <= b.end);
  const bannerAlpha = activeBanner
    ? Math.min(
        interpolate(frame, [activeBanner.start, activeBanner.start + 16], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        interpolate(frame, [activeBanner.end - 16, activeBanner.end], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      )
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0E1930' }}>
      <Audio src={staticFile('audio/dp_full_98s.mp3')} volume={0.95} />

      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ fov: 45, near: 0.1, far: 100 }}
        shadows
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#132240']} />
        <fog attach="fog" args={['#132240', 20, 48]} />

        <CameraRig pos={cam.pos} lookAt={cam.look} />

        {/* Brighter Industrial Training Studio Lighting */}
        <ambientLight intensity={0.62} color="#E2E8F0" />
        <hemisphereLight args={['#93C5FD', '#334155', 0.78]} />
        <directionalLight
          position={[8, 14, 9]}
          intensity={2.4}
          color="#FFFBEB"
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
        <directionalLight position={[-7, 7, -5]} intensity={1.0} color="#60A5FA" />

        <DpStructure3DModelV3
          defectMode={defectMode}
          highlight={highlight}
          pulse={pulse}
          showUntidyBindingTail={showUntidyBindingTail}
          torqueWrenchProgress={torqueWrenchProgress}
          showClearanceGuides={showClearanceGuides}
          showFutureReserve={showFutureReserve}
        />
      </ThreeCanvas>

      {/* Subtle Vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 62%, rgba(2,6,23,0.42) 100%)',
        }}
      />

      {/* Section 1 Safety Prerequisite Strip */}
      <SafetyPrerequisiteStrip frame={frame} />

      {/* 3D-Projected Bengali Component Callouts */}
      <ProjectedCalloutsOverlay
        frame={frame}
        fps={fps}
        camPos={cam.pos}
        camLook={cam.look}
        items={CALLOUTS}
      />

      {/* Component-Level Animated Pinpoint Good/Bad Markings */}
      <PinpointMarksOverlay
        frame={frame}
        fps={fps}
        camPos={cam.pos}
        camLook={cam.look}
        marks={PINPOINTS}
      />

      {/* Section 5 Tip 3 Documentation Card */}
      <DocumentationRecordCard frame={frame} fps={fps} />

      {/* Section 6 Final Reveal & Badge */}
      <FinalBadgeReveal frame={frame} fps={fps} />

      {/* Section Banner (Myth/Reality & 3 Habits) */}
      {activeBanner && bannerAlpha > 0.02 && (
        <div
          style={{
            position: 'absolute',
            left: 68,
            bottom: 54,
            opacity: bannerAlpha,
            backgroundColor: 'rgba(15, 23, 42, 0.90)',
            borderLeft: `6px solid ${activeBanner.accent}`,
            borderRadius: '0 12px 12px 0',
            padding: '14px 28px 14px 22px',
            boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
            fontFamily: FONT_BN,
          }}
        >
          <div style={{ color: activeBanner.accent, fontSize: 21, fontWeight: 700 }}>
            {activeBanner.title}
          </div>
          <div style={{ color: '#F8FAFC', fontSize: 30, fontWeight: 800, marginTop: 2 }}>
            {activeBanner.subtitle}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
