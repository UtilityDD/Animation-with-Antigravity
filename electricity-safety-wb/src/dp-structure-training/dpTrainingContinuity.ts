import * as THREE from 'three';

export type Vec3 = [number, number, number];
export type StructureDefectMode = 'dressed' | 'untidy' | 'abrasion';

export interface TerminalNode {
  id: string;
  component: string;
  phase: 'R' | 'Y' | 'B' | 'N' | 'EARTH' | 'STRUCT';
  position: Vec3;
}

export interface ConductorSegment {
  id: string;
  system: 'HT' | 'LT' | 'EARTHING';
  phase: 'R' | 'Y' | 'B' | 'N' | 'EARTH';
  fromTerminal: string;
  toTerminal: string;
  waypoints: Vec3[];
  color: string;
  radius: number;
}

const PHASE_X: Record<'R' | 'Y' | 'B', number> = {
  R: -1.05,
  Y: 0.0,
  B: 1.05,
};

const HV_BUSH_X: Record<'R' | 'Y' | 'B', number> = {
  R: -0.34,
  Y: 0.0,
  B: 0.34,
};

/**
 * Master 3D Terminal Registry (Provisional Geometry — pending WBSEDCL drawing confirmation)
 */
export const DP_TRAINING_TERMINALS: Record<string, TerminalNode> = {
  // Incoming 11 kV Line Spans
  'LINE-IN-R': { id: 'LINE-IN-R', component: 'Incoming 11 kV Line', phase: 'R', position: [-1.05, 8.22, -4.8] },
  'LINE-IN-Y': { id: 'LINE-IN-Y', component: 'Incoming 11 kV Line', phase: 'Y', position: [0.0, 8.22, -4.8] },
  'LINE-IN-B': { id: 'LINE-IN-B', component: 'Incoming 11 kV Line', phase: 'B', position: [1.05, 8.22, -4.8] },

  // Top Pin Insulators (y=7.88)
  'PIN-INS-R': { id: 'PIN-INS-R', component: 'Top Pin Insulator', phase: 'R', position: [-1.05, 7.98, 0.0] },
  'PIN-INS-Y': { id: 'PIN-INS-Y', component: 'Top Pin Insulator', phase: 'Y', position: [0.0, 7.98, 0.0] },
  'PIN-INS-B': { id: 'PIN-INS-B', component: 'Top Pin Insulator', phase: 'B', position: [1.05, 7.98, 0.0] },

  // AB Switch / Isolator (y=6.88)
  'ISO-IN-R': { id: 'ISO-IN-R', component: 'AB Switch Isolator In', phase: 'R', position: [-1.05, 7.05, -0.14] },
  'ISO-IN-Y': { id: 'ISO-IN-Y', component: 'AB Switch Isolator In', phase: 'Y', position: [0.0, 7.05, -0.14] },
  'ISO-IN-B': { id: 'ISO-IN-B', component: 'AB Switch Isolator In', phase: 'B', position: [1.05, 7.05, -0.14] },
  'ISO-OUT-R': { id: 'ISO-OUT-R', component: 'AB Switch Isolator Out', phase: 'R', position: [-1.05, 7.05, 0.24] },
  'ISO-OUT-Y': { id: 'ISO-OUT-Y', component: 'AB Switch Isolator Out', phase: 'Y', position: [0.0, 7.05, 0.24] },
  'ISO-OUT-B': { id: 'ISO-OUT-B', component: 'AB Switch Isolator Out', phase: 'B', position: [1.05, 7.05, 0.24] },

  // Drop-Out (DO) Fuse Units (y=5.95)
  'DO-TOP-R': { id: 'DO-TOP-R', component: '11 kV DO Fuse Top', phase: 'R', position: [-1.05, 6.24, 0.26] },
  'DO-TOP-Y': { id: 'DO-TOP-Y', component: '11 kV DO Fuse Top', phase: 'Y', position: [0.0, 6.24, 0.26] },
  'DO-TOP-B': { id: 'DO-TOP-B', component: '11 kV DO Fuse Top', phase: 'B', position: [1.05, 6.24, 0.26] },
  'DO-BOT-R': { id: 'DO-BOT-R', component: '11 kV DO Fuse Bottom', phase: 'R', position: [-1.05, 5.82, 0.34] },
  'DO-BOT-Y': { id: 'DO-BOT-Y', component: '11 kV DO Fuse Bottom', phase: 'Y', position: [0.0, 5.82, 0.34] },
  'DO-BOT-B': { id: 'DO-BOT-B', component: '11 kV DO Fuse Bottom', phase: 'B', position: [1.05, 5.82, 0.34] },

  // Lightning Arresters (rear of y=5.95 cross-arm, phase-to-earth)
  'LA-TOP-R': { id: 'LA-TOP-R', component: 'Lightning Arrester Top', phase: 'R', position: [-1.05, 6.32, -0.32] },
  'LA-TOP-Y': { id: 'LA-TOP-Y', component: 'Lightning Arrester Top', phase: 'Y', position: [0.0, 6.32, -0.32] },
  'LA-TOP-B': { id: 'LA-TOP-B', component: 'Lightning Arrester Top', phase: 'B', position: [1.05, 6.32, -0.32] },
  'LA-GND-R': { id: 'LA-GND-R', component: 'Lightning Arrester Ground', phase: 'EARTH', position: [-1.05, 5.88, -0.32] },
  'LA-GND-Y': { id: 'LA-GND-Y', component: 'Lightning Arrester Ground', phase: 'EARTH', position: [0.0, 5.88, -0.32] },
  'LA-GND-B': { id: 'LA-GND-B', component: 'Lightning Arrester Ground', phase: 'EARTH', position: [1.05, 5.88, -0.32] },

  // Transformer HV Bushings (y=4.58)
  'TX-HV-R': { id: 'TX-HV-R', component: 'Transformer HV Bushing', phase: 'R', position: [-0.34, 4.62, 0.16] },
  'TX-HV-Y': { id: 'TX-HV-Y', component: 'Transformer HV Bushing', phase: 'Y', position: [0.0, 4.62, 0.16] },
  'TX-HV-B': { id: 'TX-HV-B', component: 'Transformer HV Bushing', phase: 'B', position: [0.34, 4.62, 0.16] },

  // Transformer LV Bushings (front tank wall y=4.02, z=0.56)
  'TX-LV-R': { id: 'TX-LV-R', component: 'Transformer LV Bushing R', phase: 'R', position: [-0.30, 4.02, 0.56] },
  'TX-LV-Y': { id: 'TX-LV-Y', component: 'Transformer LV Bushing Y', phase: 'Y', position: [-0.10, 4.02, 0.56] },
  'TX-LV-B': { id: 'TX-LV-B', component: 'Transformer LV Bushing B', phase: 'B', position: [0.10, 4.02, 0.56] },
  'TX-LV-N': { id: 'TX-LV-N', component: 'Transformer LV Neutral', phase: 'N', position: [0.30, 4.02, 0.56] },

  // LT Distribution Box Top Entry (right pole y=1.98)
  'LT-BOX-R': { id: 'LT-BOX-R', component: 'LT Box Terminal R', phase: 'R', position: [1.02, 1.98, 0.24] },
  'LT-BOX-Y': { id: 'LT-BOX-Y', component: 'LT Box Terminal Y', phase: 'Y', position: [1.06, 1.98, 0.24] },
  'LT-BOX-B': { id: 'LT-BOX-B', component: 'LT Box Terminal B', phase: 'B', position: [1.10, 1.98, 0.24] },
  'LT-BOX-N': { id: 'LT-BOX-N', component: 'LT Box Neutral', phase: 'N', position: [1.14, 1.98, 0.24] },

  // Earthing Nodes & Hardware Anchors
  'TX-BODY-LUG': { id: 'TX-BODY-LUG', component: 'Transformer Body Earth Lug', phase: 'EARTH', position: [-0.56, 3.45, 0.0] },
  'EARTH-PIT-L': { id: 'EARTH-PIT-L', component: 'Earth Pit Left (LA + Body)', phase: 'EARTH', position: [-1.44, 0.10, 0.0] },
  'EARTH-PIT-R': { id: 'EARTH-PIT-R', component: 'Earth Pit Right (Neutral)', phase: 'EARTH', position: [1.44, 0.10, 0.0] },

  // Structural / Lesson Feature Anchors (for 3D-projected callouts & pinpoint marks)
  'FASTEN-BOLT-R': { id: 'FASTEN-BOLT-R', component: 'Cross-arm Clamp Bolt', phase: 'STRUCT', position: [-0.94, 5.95, 0.14] },
  'ABRASION-PT': { id: 'ABRASION-PT', component: 'Channel Edge Abrasion Point', phase: 'STRUCT', position: [0.58, 3.22, 0.32] },
  'FUTURE-RESERVE': { id: 'FUTURE-RESERVE', component: 'Future Connection Reserve', phase: 'STRUCT', position: [1.08, 1.15, 0.22] },
};

export function buildTrainingConductorPaths(mode: StructureDefectMode): ConductorSegment[] {
  const segments: ConductorSegment[] = [];
  const phases: Array<'R' | 'Y' | 'B'> = ['R', 'Y', 'B'];
  const isUntidy = mode === 'untidy';

  for (const ph of phases) {
    const px = PHASE_X[ph];
    const hvx = HV_BUSH_X[ph];

    // 1. Incoming 11 kV Line -> Top Pin Insulator
    segments.push({
      id: `HT-IN-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `LINE-IN-${ph}`,
      toTerminal: `PIN-INS-${ph}`,
      waypoints: [
        DP_TRAINING_TERMINALS[`LINE-IN-${ph}`].position,
        [px, 7.98, -2.4],
        DP_TRAINING_TERMINALS[`PIN-INS-${ph}`].position,
      ],
      color: '#D4DBE2',
      radius: 0.015,
    });

    // 2. Top Pin Insulator -> AB Switch Isolator Incoming
    segments.push({
      id: `HT-PIN-ISO-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `PIN-INS-${ph}`,
      toTerminal: `ISO-IN-${ph}`,
      waypoints: [
        DP_TRAINING_TERMINALS[`PIN-INS-${ph}`].position,
        [px, 7.52, isUntidy ? -0.38 : -0.18],
        DP_TRAINING_TERMINALS[`ISO-IN-${ph}`].position,
      ],
      color: '#D4DBE2',
      radius: 0.013,
    });

    // 3. AB Switch Outgoing -> DO Fuse Top Terminal (Smooth C-curve when dressed)
    segments.push({
      id: `HT-ISO-DO-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `ISO-OUT-${ph}`,
      toTerminal: `DO-TOP-${ph}`,
      waypoints: isUntidy
        ? [
            DP_TRAINING_TERMINALS[`ISO-OUT-${ph}`].position,
            [px + (ph === 'R' ? 0.24 : -0.19), 6.66, 0.52],
            DP_TRAINING_TERMINALS[`DO-TOP-${ph}`].position,
          ]
        : [
            DP_TRAINING_TERMINALS[`ISO-OUT-${ph}`].position,
            [px, 6.66, 0.34],
            DP_TRAINING_TERMINALS[`DO-TOP-${ph}`].position,
          ],
      color: '#D4DBE2',
      radius: 0.013,
    });

    // 4. DO Fuse Top -> Lightning Arrester Top (Phase-to-earth tee)
    segments.push({
      id: `HT-DO-LA-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `DO-TOP-${ph}`,
      toTerminal: `LA-TOP-${ph}`,
      waypoints: [
        DP_TRAINING_TERMINALS[`DO-TOP-${ph}`].position,
        [px, 6.46, 0.0],
        DP_TRAINING_TERMINALS[`LA-TOP-${ph}`].position,
      ],
      color: '#D4DBE2',
      radius: 0.012,
    });

    // 5. DO Fuse Bottom -> Transformer HV Bushing (Smooth U/C jumper when dressed)
    const untidyOffset = ph === 'R' ? 0.34 : ph === 'Y' ? -0.30 : -0.24;
    segments.push({
      id: `HT-DO-TX-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `DO-BOT-${ph}`,
      toTerminal: `TX-HV-${ph}`,
      waypoints: isUntidy
        ? [
            DP_TRAINING_TERMINALS[`DO-BOT-${ph}`].position,
            [px + untidyOffset, 5.42, 0.62],
            [hvx - untidyOffset * 0.4, 4.92, 0.06],
            DP_TRAINING_TERMINALS[`TX-HV-${ph}`].position,
          ]
        : [
            DP_TRAINING_TERMINALS[`DO-BOT-${ph}`].position,
            [px * 0.72 + hvx * 0.28, 5.14, 0.44],
            [(px + hvx) * 0.5, 4.86, 0.32],
            DP_TRAINING_TERMINALS[`TX-HV-${ph}`].position,
          ],
      color: '#D4DBE2',
      radius: 0.013,
    });
  }

  // LT Cables (Transformer LV Bushings -> LT Distribution Box)
  const ltSpecs: Array<{ ph: 'R' | 'Y' | 'B' | 'N'; color: string; xOff: number }> = [
    { ph: 'R', color: '#B8332A', xOff: 0.18 },
    { ph: 'Y', color: '#D6A11E', xOff: -0.18 },
    { ph: 'B', color: '#2963A8', xOff: 0.22 },
    { ph: 'N', color: '#22262A', xOff: -0.14 },
  ];

  ltSpecs.forEach((lt, idx) => {
    const start = DP_TRAINING_TERMINALS[`TX-LV-${lt.ph}`].position;
    const end = DP_TRAINING_TERMINALS[`LT-BOX-${lt.ph}`].position;
    let waypoints: Vec3[];

    if (mode === 'untidy') {
      waypoints = [
        start,
        [start[0] + lt.xOff, 3.35, 0.84],
        [0.62 + lt.xOff, 2.55, 0.54],
        end,
      ];
    } else if (mode === 'abrasion' && (lt.ph === 'R' || lt.ph === 'Y')) {
      // Poorly supported R/Y cable sags directly onto the sharp steel channel corner at [0.58, 3.22, 0.32]
      waypoints = [
        start,
        [0.25 + idx * 0.04, 3.50, 0.48],
        [0.58, 3.22, 0.32],
        [1.02 + idx * 0.04, 2.75, 0.24],
        end,
      ];
    } else {
      // Cleanly supported, elevated clear of channel corner & cleated down the pole
      waypoints = [
        start,
        [0.48 + idx * 0.025, 3.72, 0.50],
        [1.02 + idx * 0.04, 3.22, 0.26],
        [1.02 + idx * 0.04, 2.55, 0.24],
        end,
      ];
    }

    segments.push({
      id: `LT-TX-BOX-${lt.ph}`,
      system: 'LT',
      phase: lt.ph,
      fromTerminal: `TX-LV-${lt.ph}`,
      toTerminal: `LT-BOX-${lt.ph}`,
      waypoints,
      color: lt.color,
      radius: 0.016,
    });
  });

  // Earthing Continuity Paths (Distinct & 100% Traceable)
  // 1. LA Ground Bus -> Left Earth Flat -> Left Earth Pit
  segments.push({
    id: 'EARTH-LA-BUS',
    system: 'EARTHING',
    phase: 'EARTH',
    fromTerminal: 'LA-GND-B',
    toTerminal: 'LA-GND-R',
    waypoints: [
      DP_TRAINING_TERMINALS['LA-GND-B'].position,
      DP_TRAINING_TERMINALS['LA-GND-Y'].position,
      DP_TRAINING_TERMINALS['LA-GND-R'].position,
    ],
    color: '#B8C4CE',
    radius: 0.011,
  });

  segments.push({
    id: 'EARTH-LA-DOWN',
    system: 'EARTHING',
    phase: 'EARTH',
    fromTerminal: 'LA-GND-R',
    toTerminal: 'EARTH-PIT-L',
    waypoints: [
      DP_TRAINING_TERMINALS['LA-GND-R'].position,
      [-1.38, 5.72, -0.15],
      [-1.40, 3.2, 0.0],
      DP_TRAINING_TERMINALS['EARTH-PIT-L'].position,
    ],
    color: '#B8C4CE',
    radius: 0.012,
  });

  // 2. Transformer Body Lug -> Left Earth Flat -> Left Earth Pit
  segments.push({
    id: 'EARTH-TX-BODY',
    system: 'EARTHING',
    phase: 'EARTH',
    fromTerminal: 'TX-BODY-LUG',
    toTerminal: 'EARTH-PIT-L',
    waypoints: [
      DP_TRAINING_TERMINALS['TX-BODY-LUG'].position,
      [-1.12, 3.35, 0.0],
      [-1.40, 3.2, 0.0],
      DP_TRAINING_TERMINALS['EARTH-PIT-L'].position,
    ],
    color: '#B8C4CE',
    radius: 0.011,
  });

  // 3. Dedicated Neutral Earthing Path -> Outer Right Pole Cleated Route -> Right Earth Pit
  // Resolved so destination is 100% visible and never occluded behind the right pole
  segments.push({
    id: 'EARTH-NEUTRAL',
    system: 'EARTHING',
    phase: 'EARTH',
    fromTerminal: 'TX-LV-N',
    toTerminal: 'EARTH-PIT-R',
    waypoints: [
      DP_TRAINING_TERMINALS['TX-LV-N'].position,
      [0.72, 3.92, 0.42],
      [1.26, 3.74, 0.16],
      [1.38, 2.60, 0.06],
      [1.42, 1.25, 0.02],
      DP_TRAINING_TERMINALS['EARTH-PIT-R'].position,
    ],
    color: '#B8C4CE',
    radius: 0.012,
  });

  return segments;
}

/**
 * Projects a 3D world point to 2D screen coordinates using the exact ThreeCanvas camera.
 */
export function project3DTo2D(
  worldPos: Vec3,
  camPos: Vec3,
  camLook: Vec3,
  fovDeg = 45,
  width = 1920,
  height = 1080
): { x: number; y: number; visible: boolean } {
  const cam = new THREE.PerspectiveCamera(fovDeg, width / height, 0.1, 100);
  cam.position.set(camPos[0], camPos[1], camPos[2]);
  cam.lookAt(camLook[0], camLook[1], camLook[2]);
  cam.updateMatrixWorld();

  const v = new THREE.Vector3(worldPos[0], worldPos[1], worldPos[2]).project(cam);
  const visible = v.z >= -1 && v.z <= 1;
  return {
    x: (v.x * 0.5 + 0.5) * width,
    y: (-v.y * 0.5 + 0.5) * height,
    visible,
  };
}

export function projectPolylineTo2D(
  points: Vec3[],
  camPos: Vec3,
  camLook: Vec3,
  fovDeg = 45,
  width = 1920,
  height = 1080
): Array<{ x: number; y: number }> {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  const sampled = curve.getPoints(18);
  const out: Array<{ x: number; y: number }> = [];
  for (const pt of sampled) {
    const p2 = project3DTo2D([pt.x, pt.y, pt.z], camPos, camLook, fovDeg, width, height);
    if (p2.visible) out.push({ x: p2.x, y: p2.y });
  }
  return out;
}
