import * as THREE from 'three';

export type Vec3 = [number, number, number];

export interface TerminalNode {
  id: string;
  component: string;
  phase: 'R' | 'Y' | 'B' | 'N' | 'EARTH' | 'STRUCT';
  position: [number, number, number];
}

export interface ConductorSegment {
  id: string;
  system: 'HT' | 'LT' | 'EARTHING';
  phase: 'R' | 'Y' | 'B' | 'N' | 'EARTH';
  fromTerminal: string;
  toTerminal: string;
  waypoints: [number, number, number][];
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
 * Exact 3D Terminal Anchor Registry (Provisional Geometry)
 */
export const DP_TERMINALS: Record<string, TerminalNode> = {
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

  // Lightning Arresters (rear of y=5.95 cross-arm)
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

  // Transformer LV Bushings (front tank wall y=4.05, z=0.56)
  'TX-LV-R': { id: 'TX-LV-R', component: 'Transformer LV Bushing R', phase: 'R', position: [-0.30, 4.02, 0.56] },
  'TX-LV-Y': { id: 'TX-LV-Y', component: 'Transformer LV Bushing Y', phase: 'Y', position: [-0.10, 4.02, 0.56] },
  'TX-LV-B': { id: 'TX-LV-B', component: 'Transformer LV Bushing B', phase: 'B', position: [0.10, 4.02, 0.56] },
  'TX-LV-N': { id: 'TX-LV-N', component: 'Transformer LV Neutral', phase: 'N', position: [0.30, 4.02, 0.56] },

  // LT Distribution Box Top Entry (right pole y=1.98)
  'LT-BOX-R': { id: 'LT-BOX-R', component: 'LT Box Terminal R', phase: 'R', position: [1.02, 1.98, 0.24] },
  'LT-BOX-Y': { id: 'LT-BOX-Y', component: 'LT Box Terminal Y', phase: 'Y', position: [1.06, 1.98, 0.24] },
  'LT-BOX-B': { id: 'LT-BOX-B', component: 'LT Box Terminal B', phase: 'B', position: [1.10, 1.98, 0.24] },
  'LT-BOX-N': { id: 'LT-BOX-N', component: 'LT Box Neutral', phase: 'N', position: [1.14, 1.98, 0.24] },

  // Earthing Nodes
  'TX-BODY-LUG': { id: 'TX-BODY-LUG', component: 'Transformer Body Earth Lug', phase: 'EARTH', position: [-0.56, 3.45, 0.0] },
  'EARTH-PIT-L': { id: 'EARTH-PIT-L', component: 'Earth Pit Left (LA + Body)', phase: 'EARTH', position: [-1.36, 0.05, 0.0] },
  'EARTH-PIT-R': { id: 'EARTH-PIT-R', component: 'Earth Pit Right (Neutral)', phase: 'EARTH', position: [1.36, 0.05, 0.0] },
};

export function buildConductorPaths(mode: 'dressed' | 'untidy'): ConductorSegment[] {
  const segments: ConductorSegment[] = [];
  const phases: Array<'R' | 'Y' | 'B'> = ['R', 'Y', 'B'];

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
        DP_TERMINALS[`LINE-IN-${ph}`].position,
        [px, 7.98, -2.4],
        DP_TERMINALS[`PIN-INS-${ph}`].position,
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
        DP_TERMINALS[`PIN-INS-${ph}`].position,
        [px, 7.52, mode === 'untidy' ? -0.35 : -0.18],
        DP_TERMINALS[`ISO-IN-${ph}`].position,
      ],
      color: '#D4DBE2',
      radius: 0.013,
    });

    // 3. AB Switch Outgoing -> DO Fuse Top Terminal
    segments.push({
      id: `HT-ISO-DO-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `ISO-OUT-${ph}`,
      toTerminal: `DO-TOP-${ph}`,
      waypoints: [
        DP_TERMINALS[`ISO-OUT-${ph}`].position,
        [px + (mode === 'untidy' ? (ph === 'R' ? 0.25 : -0.18) : 0), 6.65, mode === 'untidy' ? 0.48 : 0.30],
        DP_TERMINALS[`DO-TOP-${ph}`].position,
      ],
      color: '#D4DBE2',
      radius: 0.013,
    });

    // 4. DO Fuse Top -> Lightning Arrester Top (Surge protection tee)
    segments.push({
      id: `HT-DO-LA-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `DO-TOP-${ph}`,
      toTerminal: `LA-TOP-${ph}`,
      waypoints: [
        DP_TERMINALS[`DO-TOP-${ph}`].position,
        [px, 6.46, 0.0],
        DP_TERMINALS[`LA-TOP-${ph}`].position,
      ],
      color: '#D4DBE2',
      radius: 0.012,
    });

    // 5. DO Fuse Bottom -> Transformer HV Bushing
    const untidyOffset = ph === 'R' ? 0.35 : ph === 'Y' ? -0.32 : -0.25;
    segments.push({
      id: `HT-DO-TX-${ph}`,
      system: 'HT',
      phase: ph,
      fromTerminal: `DO-BOT-${ph}`,
      toTerminal: `TX-HV-${ph}`,
      waypoints:
        mode === 'dressed'
          ? [
              DP_TERMINALS[`DO-BOT-${ph}`].position,
              [(px + hvx) * 0.5, 5.18, 0.38],
              DP_TERMINALS[`TX-HV-${ph}`].position,
            ]
          : [
              DP_TERMINALS[`DO-BOT-${ph}`].position,
              [px + untidyOffset, 5.45, 0.58],
              [hvx - untidyOffset * 0.4, 4.95, 0.05],
              DP_TERMINALS[`TX-HV-${ph}`].position,
            ],
      color: '#D4DBE2',
      radius: 0.013,
    });
  }

  // LT Cables (Transformer LV Bushings -> LT Distribution Box)
  const ltSpecs: Array<{ ph: 'R' | 'Y' | 'B' | 'N'; color: string; xOff: number }> = [
    { ph: 'R', color: '#B8332A', xOff: 0.16 },
    { ph: 'Y', color: '#D6A11E', xOff: -0.18 },
    { ph: 'B', color: '#2963A8', xOff: 0.22 },
    { ph: 'N', color: '#22262A', xOff: -0.14 },
  ];

  ltSpecs.forEach((lt, idx) => {
    const start = DP_TERMINALS[`TX-LV-${lt.ph}`].position;
    const end = DP_TERMINALS[`LT-BOX-${lt.ph}`].position;
    segments.push({
      id: `LT-TX-BOX-${lt.ph}`,
      system: 'LT',
      phase: lt.ph,
      fromTerminal: `TX-LV-${lt.ph}`,
      toTerminal: `LT-BOX-${lt.ph}`,
      waypoints:
        mode === 'dressed'
          ? [
              start,
              [0.52 + idx * 0.02, 3.65, 0.48],
              [1.02 + idx * 0.04, 3.12, 0.24],
              end,
            ]
          : [
              start,
              [start[0] + lt.xOff, 3.35, 0.82],
              [0.62 + lt.xOff, 2.55, 0.54],
              end,
            ],
      color: lt.color,
      radius: 0.016,
    });
  });

  // Earthing Continuity Paths (Distinct & Traceable)
  // LA Ground Bus -> Left Earth Flat -> Earth Pit Left
  segments.push({
    id: 'EARTH-LA-BUS',
    system: 'EARTHING',
    phase: 'EARTH',
    fromTerminal: 'LA-GND-B',
    toTerminal: 'LA-GND-R',
    waypoints: [
      DP_TERMINALS['LA-GND-B'].position,
      DP_TERMINALS['LA-GND-Y'].position,
      DP_TERMINALS['LA-GND-R'].position,
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
      DP_TERMINALS['LA-GND-R'].position,
      [-1.36, 5.72, -0.15],
      [-1.36, 3.2, 0.0],
      DP_TERMINALS['EARTH-PIT-L'].position,
    ],
    color: '#B8C4CE',
    radius: 0.012,
  });

  // Transformer Body Lug -> Left Earth Flat
  segments.push({
    id: 'EARTH-TX-BODY',
    system: 'EARTHING',
    phase: 'EARTH',
    fromTerminal: 'TX-BODY-LUG',
    toTerminal: 'EARTH-PIT-L',
    waypoints: [
      DP_TERMINALS['TX-BODY-LUG'].position,
      [-1.12, 3.35, 0.0],
      [-1.36, 3.2, 0.0],
      DP_TERMINALS['EARTH-PIT-L'].position,
    ],
    color: '#B8C4CE',
    radius: 0.011,
  });

  // Dedicated Neutral Earthing Path -> Right Earth Pit
  segments.push({
    id: 'EARTH-NEUTRAL',
    system: 'EARTHING',
    phase: 'EARTH',
    fromTerminal: 'TX-LV-N',
    toTerminal: 'EARTH-PIT-R',
    waypoints: [
      DP_TERMINALS['TX-LV-N'].position,
      [0.85, 3.82, 0.35],
      [1.36, 3.45, 0.0],
      DP_TERMINALS['EARTH-PIT-R'].position,
    ],
    color: '#B8C4CE',
    radius: 0.011,
  });

  return segments;
}

/**
 * Validates that every conductor segment begins and ends at a registered terminal.
 */
export function validateContinuity(segments: ConductorSegment[]): boolean {
  return segments.every(
    (s) => Boolean(DP_TERMINALS[s.fromTerminal]) && Boolean(DP_TERMINALS[s.toTerminal])
  );
}

/**
 * Exact 3D-to-2D projection matching ThreeCanvas PerspectiveCamera(fov=45, 1920x1080)
 */
export function project3DTo2D(
  worldPos: [number, number, number],
  camPos: [number, number, number],
  camLook: [number, number, number],
  fovDeg = 45,
  width = 1920,
  height = 1080
): { x: number; y: number; visible: boolean } {
  const cam = new THREE.PerspectiveCamera(fovDeg, width / height, 0.1, 100);
  cam.position.set(...camPos);
  cam.lookAt(...camLook);
  cam.updateMatrixWorld(true);

  const v = new THREE.Vector3(...worldPos).project(cam);
  const visible = v.z >= -1 && v.z <= 1;
  return {
    x: (v.x * 0.5 + 0.5) * width,
    y: (-v.y * 0.5 + 0.5) * height,
    visible,
  };
}
