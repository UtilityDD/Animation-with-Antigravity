import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  buildTrainingConductorPaths,
  ConductorSegment,
  StructureDefectMode,
} from './dpTrainingContinuity';

export type TrainingHighlight =
  | 'none'
  | 'ht'
  | 'lt'
  | 'earth'
  | 'fasten'
  | 'abrasion'
  | 'future';

interface DpStructure3DModelV3Props {
  defectMode?: StructureDefectMode;
  highlight?: TrainingHighlight;
  pulse?: number;
  showUntidyBindingTail?: boolean;
  torqueWrenchProgress?: number | null; // 0..1 when visible
  showClearanceGuides?: boolean;
  showFutureReserve?: boolean;
}

const CableTube: React.FC<{
  segment: ConductorSegment;
  emissive?: string;
  emissiveIntensity?: number;
}> = ({ segment, emissive = '#000000', emissiveIntensity = 0 }) => {
  const geo = useMemo(() => {
    const pts = segment.waypoints.map((w) => new THREE.Vector3(w[0], w[1], w[2]));
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 32, segment.radius, 10, false);
  }, [segment.waypoints, segment.radius]);

  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshStandardMaterial
        color={segment.color}
        roughness={0.38}
        metalness={segment.system === 'LT' ? 0.15 : 0.72}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
};

const RibbedInsulator: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  shedCount?: number;
}> = ({ position, rotation = [0, 0, 0], scale = 1, shedCount = 4 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh castShadow>
      <cylinderGeometry args={[0.032, 0.038, 0.24, 14]} />
      <meshStandardMaterial color="#6D3326" roughness={0.25} metalness={0.08} />
    </mesh>
    {Array.from({ length: shedCount }).map((_, i) => (
      <mesh key={i} position={[0, -0.075 + i * 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.056, 0.068, 0.022, 16]} />
        <meshStandardMaterial color="#7C3A2B" roughness={0.22} metalness={0.08} />
      </mesh>
    ))}
    <mesh position={[0, 0.135, 0]}>
      <cylinderGeometry args={[0.018, 0.024, 0.03, 12]} />
      <meshStandardMaterial color="#B8C4CE" roughness={0.32} metalness={0.8} />
    </mesh>
  </group>
);

const CrossArmAssembly: React.FC<{
  y: number;
  width?: number;
  showBolts?: boolean;
  highlightBolts?: boolean;
  pulse?: number;
}> = ({ y, width = 2.75, showBolts = true, highlightBolts = false, pulse = 0 }) => (
  <group position={[0, y, 0]}>
    {/* Front & Rear Galvanized Steel C-Channels */}
    <mesh position={[0, 0, 0.095]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.1, 0.055]} />
      <meshStandardMaterial color="#475569" roughness={0.42} metalness={0.72} />
    </mesh>
    <mesh position={[0, 0, -0.095]} castShadow receiveShadow>
      <boxGeometry args={[width, 0.1, 0.055]} />
      <meshStandardMaterial color="#475569" roughness={0.42} metalness={0.72} />
    </mesh>
    {/* Pole Clamp Straps + Fastening Bolts/Nuts */}
    {[-0.95, 0.95].map((px, idx) => (
      <group key={idx} position={[px, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.125, 0.25]} />
          <meshStandardMaterial color="#334155" roughness={0.48} metalness={0.76} />
        </mesh>
        {showBolts && (
          <>
            <mesh position={[0.08, 0.02, 0.138]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.018, 0.018, 0.04, 6]} />
              <meshStandardMaterial
                color="#E2E8F0"
                roughness={0.25}
                metalness={0.88}
                emissive={highlightBolts ? '#22C55E' : '#000000'}
                emissiveIntensity={highlightBolts ? 0.35 + pulse * 0.35 : 0}
              />
            </mesh>
            <mesh position={[-0.08, -0.02, 0.138]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.018, 0.018, 0.04, 6]} />
              <meshStandardMaterial color="#E2E8F0" roughness={0.25} metalness={0.88} />
            </mesh>
          </>
        )}
      </group>
    ))}
  </group>
);

const EarthPitChamber: React.FC<{
  position: [number, number, number];
  highlight?: boolean;
  pulse?: number;
}> = ({ position, highlight = false, pulse = 0 }) => (
  <group position={position}>
    {/* Concrete inspection collar */}
    <mesh position={[0, 0.04, 0]} receiveShadow castShadow>
      <cylinderGeometry args={[0.16, 0.18, 0.08, 16]} />
      <meshStandardMaterial color="#94A3B8" roughness={0.85} metalness={0.05} />
    </mesh>
    {/* Inner dark pit */}
    <mesh position={[0, 0.082, 0]}>
      <cylinderGeometry args={[0.11, 0.11, 0.01, 16]} />
      <meshStandardMaterial color="#1E293B" roughness={0.9} />
    </mesh>
    {/* Copper/GI earth electrode & lug */}
    <mesh position={[0, 0.11, 0]} castShadow>
      <cylinderGeometry args={[0.022, 0.022, 0.09, 12]} />
      <meshStandardMaterial
        color="#D97706"
        roughness={0.3}
        metalness={0.85}
        emissive={highlight ? '#10B981' : '#000000'}
        emissiveIntensity={highlight ? 0.4 + pulse * 0.4 : 0}
      />
    </mesh>
  </group>
);

export const DpStructure3DModelV3: React.FC<DpStructure3DModelV3Props> = ({
  defectMode = 'dressed',
  highlight = 'none',
  pulse = 0,
  showUntidyBindingTail = false,
  torqueWrenchProgress = null,
  showClearanceGuides = false,
  showFutureReserve = false,
}) => {
  const segments = useMemo(() => buildTrainingConductorPaths(defectMode), [defectMode]);
  const phaseX = [-1.05, 0.0, 1.05];

  return (
    <group>
      {/* Ground Pad & Gravel Yard */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[8.5, 8.5, 0.04, 40]} />
        <meshStandardMaterial color="#1E293B" roughness={0.94} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.015, 2.2]} />
        <meshStandardMaterial color="#334155" roughness={0.92} />
      </mesh>

      {/* Twin Prestressed Concrete Poles & Foundation Plinths */}
      {[-0.95, 0.95].map((px, idx) => (
        <group key={idx} position={[px, 0, 0]}>
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.4, 0.42]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.86} metalness={0.05} />
          </mesh>
          <mesh position={[0, 4.35, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.105, 0.142, 8.4, 18]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.78} metalness={0.08} />
          </mesh>
          <mesh position={[0, 8.58, 0]}>
            <cylinderGeometry args={[0.108, 0.108, 0.06, 18]} />
            <meshStandardMaterial color="#64748B" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* Anti-climbing band */}
          <mesh position={[0, 2.25, 0]}>
            <cylinderGeometry args={[0.135, 0.135, 0.055, 16]} />
            <meshStandardMaterial color="#1E293B" roughness={0.6} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Danger Plate on Left Pole (neutralized graphic, no invented text) */}
      <mesh position={[-0.95, 2.75, 0.142]} castShadow>
        <boxGeometry args={[0.18, 0.24, 0.012]} />
        <meshStandardMaterial color="#B91C1C" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Top Cross-Arm (y=7.78) + Diagonal Bracing + 3 Pin Insulators */}
      <CrossArmAssembly y={7.78} width={2.8} />
      {[-0.58, 0.58].map((bx, i) => (
        <mesh
          key={i}
          position={[bx, 7.42, 0.09]}
          rotation={[0, 0, bx < 0 ? 0.62 : -0.62]}
          castShadow
        >
          <boxGeometry args={[0.04, 0.86, 0.03]} />
          <meshStandardMaterial color="#475569" roughness={0.45} metalness={0.72} />
        </mesh>
      ))}
      {phaseX.map((px, i) => (
        <group key={i}>
          <RibbedInsulator position={[px, 7.9, 0.0]} scale={0.9} />
          {/* Optional Untidy Binding Tail on middle insulator (Section 3B) */}
          {i === 1 && showUntidyBindingTail && (
            <group position={[px + 0.05, 8.02, 0.06]}>
              <mesh rotation={[0.4, 0.3, 0.7]} castShadow>
                <torusGeometry args={[0.065, 0.008, 8, 18, Math.PI * 1.4]} />
                <meshStandardMaterial color="#EF4444" roughness={0.3} metalness={0.6} />
              </mesh>
              <mesh position={[0.06, -0.08, 0.04]} rotation={[0.2, 0.1, -0.4]}>
                <cylinderGeometry args={[0.007, 0.007, 0.22, 8]} />
                <meshStandardMaterial color="#EF4444" roughness={0.3} metalness={0.6} />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* AB Switch / Isolator Assembly (y=6.88) */}
      <CrossArmAssembly y={6.88} width={2.8} />
      <mesh position={[-0.1, 6.86, 0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 2.55, 12]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.35} metalness={0.82} />
      </mesh>
      {/* Vertical Operating Pipe + Padlockable Handle */}
      <mesh position={[-1.22, 4.3, 0.02]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, 5.15, 10]} />
        <meshStandardMaterial color="#64748B" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[-1.22, 1.72, 0.05]} castShadow>
        <boxGeometry args={[0.07, 0.2, 0.07]} />
        <meshStandardMaterial color="#1E293B" roughness={0.5} metalness={0.7} />
      </mesh>
      {phaseX.map((px, i) => (
        <group key={i} position={[px, 6.94, 0]}>
          <RibbedInsulator position={[0, 0.08, -0.14]} scale={0.72} shedCount={3} />
          <RibbedInsulator position={[0, 0.08, 0.24]} scale={0.72} shedCount={3} />
          <mesh position={[0, 0.22, 0.05]} castShadow>
            <boxGeometry args={[0.032, 0.028, 0.4]} />
            <meshStandardMaterial color="#B45309" roughness={0.28} metalness={0.86} />
          </mesh>
        </group>
      ))}

      {/* Lower HT Cross-Arm (y=5.95): DO Fuse Units (front) + Lightning Arresters (rear) */}
      <CrossArmAssembly
        y={5.95}
        width={2.8}
        showBolts
        highlightBolts={highlight === 'fasten'}
        pulse={pulse}
      />
      {phaseX.map((px, i) => (
        <group key={i}>
          {/* DO Fuse Unit */}
          <group position={[px, 6.02, 0.24]}>
            <RibbedInsulator
              position={[0, 0.06, -0.08]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.62}
              shedCount={3}
            />
            <mesh position={[0, 0.02, 0.06]} rotation={[-0.18, 0, 0]} castShadow>
              <cylinderGeometry args={[0.026, 0.026, 0.44, 12]} />
              <meshStandardMaterial color="#9A3412" roughness={0.35} metalness={0.25} />
            </mesh>
            <mesh position={[0, 0.21, 0.02]} castShadow>
              <boxGeometry args={[0.065, 0.05, 0.075]} />
              <meshStandardMaterial color="#B45309" roughness={0.3} metalness={0.85} />
            </mesh>
            <mesh position={[0, -0.19, 0.1]} castShadow>
              <boxGeometry args={[0.06, 0.045, 0.07]} />
              <meshStandardMaterial color="#64748B" roughness={0.35} metalness={0.8} />
            </mesh>
          </group>
          {/* Lightning Arrester (phase-to-earth) */}
          <RibbedInsulator position={[px, 6.1, -0.32]} scale={0.78} shedCount={4} />
        </group>
      ))}

      {/* Animated 3D Torque Wrench for Section 3C Fastening */}
      {torqueWrenchProgress !== null && (
        <group
          position={[-0.87, 5.97, 0.18]}
          rotation={[0, 0, -0.35 + Math.sin(torqueWrenchProgress * Math.PI * 2) * 0.45]}
        >
          {/* Socket head */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.028, 0.028, 0.06, 12]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.92} />
          </mesh>
          {/* Wrench arm */}
          <mesh position={[0.24, 0, 0.02]} castShadow>
            <boxGeometry args={[0.48, 0.032, 0.022]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.22} metalness={0.9} />
          </mesh>
          {/* Grip handle */}
          <mesh position={[0.44, 0, 0.02]} castShadow>
            <boxGeometry args={[0.14, 0.045, 0.035]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.5} metalness={0.2} />
          </mesh>
        </group>
      )}

      {/* Subtle 3D Clearance Guides (Section 3A — No invented numbers) */}
      {showClearanceGuides && (
        <group>
          {/* Phase-to-Phase translucent guide planes */}
          {[-0.525, 0.525].map((cx, i) => (
            <mesh key={i} position={[cx, 5.35, 0.35]}>
              <boxGeometry args={[0.72, 0.012, 0.012]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.85} />
            </mesh>
          ))}
          {/* Phase-to-Body vertical clearance indicator */}
          <mesh position={[0.0, 5.55, 0.25]}>
            <boxGeometry args={[0.012, 0.52, 0.012]} />
            <meshBasicMaterial color="#22C55E" transparent opacity={0.85} />
          </mesh>
        </group>
      )}

      {/* Transformer Mounting Channels (y=3.20) */}
      <CrossArmAssembly y={3.2} width={2.55} />

      {/* Distribution Transformer (Clean, neutral tank without fabricated nameplate/conservator) */}
      <group position={[0, 3.85, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.08, 1.18, 0.86]} />
          <meshStandardMaterial color="#334155" roughness={0.48} metalness={0.58} />
        </mesh>
        {/* Top Cover + Lifting Lugs */}
        <mesh position={[0, 0.61, 0]} castShadow>
          <boxGeometry args={[1.16, 0.06, 0.94]} />
          <meshStandardMaterial color="#1E293B" roughness={0.44} metalness={0.65} />
        </mesh>
        {[-0.46, 0.46].map((lx, i) => (
          <mesh key={i} position={[lx, 0.67, 0]} castShadow>
            <boxGeometry args={[0.06, 0.09, 0.08]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.75} />
          </mesh>
        ))}
        {/* Cooling Radiator Fins */}
        {[-0.6, 0.6].map((rx, s) =>
          [-0.28, -0.14, 0, 0.14, 0.28].map((rz, f) => (
            <mesh key={`${s}-${f}`} position={[rx, -0.04, rz]} castShadow>
              <boxGeometry args={[0.14, 0.92, 0.026]} />
              <meshStandardMaterial color="#475569" roughness={0.48} metalness={0.62} />
            </mesh>
          ))
        )}
        {/* Neutral blank metallic plate */}
        <mesh position={[0.3, -0.08, 0.435]}>
          <boxGeometry args={[0.2, 0.13, 0.01]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* 3 HV Bushings */}
        {[-0.34, 0.0, 0.34].map((bx, i) => (
          <RibbedInsulator key={i} position={[bx, 0.72, 0.16]} scale={0.68} shedCount={3} />
        ))}
        {/* 3 LV Phase Bushings + Distinct Neutral Bushing */}
        {[-0.3, -0.1, 0.1, 0.3].map((lx, i) => (
          <group key={i} position={[lx, 0.17, 0.48]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.028, 0.034, 0.12, 12]} />
              <meshStandardMaterial
                color={i === 3 ? '#1E293B' : '#7C3A2B'}
                roughness={0.28}
                metalness={0.12}
              />
            </mesh>
            <mesh position={[0, 0, 0.075]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.04, 10]} />
              <meshStandardMaterial color="#D97706" roughness={0.3} metalness={0.85} />
            </mesh>
          </group>
        ))}
      </group>

      {/* LT Distribution Box + Cable Cleats */}
      <group position={[1.08, 1.72, 0.22]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.52, 0.26]} />
          <meshStandardMaterial color="#475569" roughness={0.44} metalness={0.62} />
        </mesh>
        <mesh position={[-0.22, 0.18, -0.12]}>
          <boxGeometry args={[0.26, 0.045, 0.24]} />
          <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
        </mesh>
      </group>
      {defectMode === 'dressed' &&
        [2.95, 2.52, 2.12].map((cy, i) => (
          <mesh key={i} position={[1.06, cy, 0.23]} castShadow>
            <boxGeometry args={[0.24, 0.04, 0.09]} />
            <meshStandardMaterial color="#1E293B" roughness={0.5} metalness={0.6} />
          </mesh>
        ))}

      {/* Future Connection Reserve Space (Section 5 Tip 2) */}
      {showFutureReserve && (
        <group position={[1.08, 1.15, 0.2]}>
          <mesh>
            <boxGeometry args={[0.26, 0.24, 0.12]} />
            <meshBasicMaterial color="#38BDF8" wireframe />
          </mesh>
        </group>
      )}

      {/* Stay Wire + Guy Insulator + Ground Anchor */}
      <group>
        <CableTube
          segment={{
            id: 'STAY-WIRE',
            system: 'EARTHING',
            phase: 'EARTH',
            fromTerminal: 'POLE-STAY',
            toTerminal: 'ANCHOR',
            waypoints: [
              [1.06, 5.95, 0.0],
              [1.82, 3.6, 0.0],
              [2.6, 0.12, 0.0],
            ],
            color: '#94A3B8',
            radius: 0.011,
          }}
        />
        <mesh position={[1.76, 3.8, 0]} rotation={[0, 0, 0.38]}>
          <cylinderGeometry args={[0.042, 0.042, 0.16, 12]} />
          <meshStandardMaterial color="#7C3A2B" roughness={0.3} />
        </mesh>
        <mesh position={[2.6, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.11, 0.24, 12]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.8} />
        </mesh>
      </group>

      {/* Dual Visible Earth Pit Inspection Chambers */}
      <EarthPitChamber
        position={[-1.44, 0.0, 0.0]}
        highlight={highlight === 'earth'}
        pulse={pulse}
      />
      <EarthPitChamber
        position={[1.44, 0.0, 0.0]}
        highlight={highlight === 'earth'}
        pulse={pulse}
      />

      {/* Programmatic Continuous Conductors */}
      {segments.map((seg) => {
        let emissive = '#000000';
        let emissiveIntensity = 0;

        if (highlight === 'ht' && seg.system === 'HT') {
          emissive = '#38BDF8';
          emissiveIntensity = 0.22 + pulse * 0.2;
        } else if (highlight === 'lt' && seg.system === 'LT') {
          emissive = '#38BDF8';
          emissiveIntensity = 0.22 + pulse * 0.2;
        } else if (highlight === 'earth' && seg.system === 'EARTHING') {
          emissive = '#10B981';
          emissiveIntensity = 0.3 + pulse * 0.25;
        } else if (
          highlight === 'abrasion' &&
          seg.system === 'LT' &&
          (seg.phase === 'R' || seg.phase === 'Y')
        ) {
          emissive = '#EF4444';
          emissiveIntensity = 0.35 + pulse * 0.3;
        }

        return (
          <CableTube
            key={seg.id}
            segment={seg}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        );
      })}
    </group>
  );
};
