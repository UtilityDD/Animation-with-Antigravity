import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  ConductorSegment,
  buildConductorPaths,
  validateContinuity,
} from './dpContinuityGraph';

export type DpHighlightV2 = 'none' | 'ht' | 'lt-earth' | 'bad' | 'good';

const CableTube: React.FC<{
  segment: ConductorSegment;
  emissive?: string;
  emissiveIntensity?: number;
}> = ({ segment, emissive = '#000000', emissiveIntensity = 0 }) => {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      segment.waypoints.map((p) => new THREE.Vector3(...p))
    );
    return new THREE.TubeGeometry(curve, 36, segment.radius, 10, false);
  }, [segment.waypoints, segment.radius]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={segment.color}
        metalness={segment.system === 'LT' ? 0.2 : 0.78}
        roughness={segment.system === 'LT' ? 0.52 : 0.26}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
};

const RibbedInsulator: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  sheds?: number;
  scale?: number;
  color?: string;
  emissive?: string;
  emissiveIntensity?: number;
}> = ({
  position,
  rotation = [0, 0, 0],
  sheds = 4,
  scale = 1,
  color = '#5C2614',
  emissive = '#000000',
  emissiveIntensity = 0,
}) => (
  <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
    <mesh position={[0, -0.05, 0]} castShadow>
      <cylinderGeometry args={[0.022, 0.026, 0.12, 12]} />
      <meshStandardMaterial color="#8E9AA3" metalness={0.82} roughness={0.3} />
    </mesh>
    <mesh position={[0, sheds * 0.03, 0]} castShadow>
      <cylinderGeometry args={[0.04, 0.044, sheds * 0.064, 16]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.18}
        metalness={0.05}
        clearcoat={0.9}
        clearcoatRoughness={0.12}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
    {Array.from({ length: sheds }).map((_, i) => (
      <mesh key={i} position={[0, 0.02 + i * 0.054, 0]} castShadow>
        <cylinderGeometry args={[0.072 - i * 0.004, 0.092 - i * 0.004, 0.022, 20]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.16}
          metalness={0.05}
          clearcoat={0.92}
          clearcoatRoughness={0.1}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    ))}
    <mesh position={[0, sheds * 0.056 + 0.02, 0]} castShadow>
      <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} />
      <meshStandardMaterial color="#B5C0C9" metalness={0.85} roughness={0.25} />
    </mesh>
  </group>
);

/**
 * Distinct 11 kV Drop-Out (DO) Fuse Unit:
 * Porcelain support body + upper latch hood + lower hinge trunnion + angled fiberglass fuse barrel.
 */
const DropOutFuseUnit: React.FC<{
  position: [number, number, number];
  emissive?: string;
  emissiveIntensity?: number;
}> = ({ position, emissive = '#000000', emissiveIntensity = 0 }) => (
  <group position={position}>
    {/* Back porcelain mounting insulator */}
    <RibbedInsulator
      position={[0, 0, -0.06]}
      rotation={[Math.PI / 2, 0, 0]}
      sheds={4}
      scale={0.78}
      color="#632917"
      emissive={emissive}
      emissiveIntensity={emissiveIntensity * 0.6}
    />
    {/* Upper brass/galvanized contact latch hood */}
    <mesh position={[0, 0.22, 0.14]} castShadow>
      <boxGeometry args={[0.08, 0.06, 0.1]} />
      <meshStandardMaterial color="#B98A42" metalness={0.85} roughness={0.28} />
    </mesh>
    {/* Lower hinge trunnion */}
    <mesh position={[0, -0.2, 0.22]} castShadow>
      <boxGeometry args={[0.07, 0.05, 0.08]} />
      <meshStandardMaterial color="#9BA6AF" metalness={0.85} roughness={0.28} />
    </mesh>
    {/* Recognisable tilted brown/amber fiberglass Fuse Barrel Tube */}
    <mesh position={[0, 0.01, 0.18]} rotation={[0.2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.026, 0.026, 0.44, 14]} />
      <meshStandardMaterial
        color="#8A4824"
        roughness={0.38}
        metalness={0.18}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  </group>
);

/**
 * Distinct 11 kV Gang-Operated AB Switch / Isolator Pole Unit:
 * Twin post insulators + fixed/hinge contacts + copper-clad moving blade.
 */
const IsolatorPoleUnit: React.FC<{
  position: [number, number, number];
  emissive?: string;
  emissiveIntensity?: number;
}> = ({ position, emissive = '#000000', emissiveIntensity = 0 }) => (
  <group position={position}>
    {/* Steel mounting base channel */}
    <mesh position={[0, -0.02, 0]} castShadow>
      <boxGeometry args={[0.1, 0.04, 0.48]} />
      <meshStandardMaterial color="#8A959E" metalness={0.82} roughness={0.3} />
    </mesh>
    {/* Rear & Front Post Insulators */}
    <RibbedInsulator
      position={[0, 0.02, -0.16]}
      sheds={4}
      scale={0.8}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity * 0.5}
    />
    <RibbedInsulator
      position={[0, 0.02, 0.18]}
      sheds={4}
      scale={0.8}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity * 0.5}
    />
    {/* Horizontal Moving Copper/Brass Switch Blade (closed position) */}
    <mesh position={[0, 0.24, 0.01]} castShadow>
      <boxGeometry args={[0.024, 0.032, 0.38]} />
      <meshStandardMaterial
        color="#C9863C"
        metalness={0.88}
        roughness={0.22}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  </group>
);

export const DpStructure3DModelV2: React.FC<{
  mode: 'dressed' | 'untidy';
  highlight?: DpHighlightV2;
  pulse?: number;
}> = ({ mode, highlight = 'none', pulse = 0 }) => {
  const poleX = 1.2;
  const phaseX = [-1.05, 0, 1.05];

  const segments = useMemo(() => {
    const list = buildConductorPaths(mode);
    if (!validateContinuity(list)) {
      throw new Error('DP Conductor continuity validation failed');
    }
    return list;
  }, [mode]);

  const htEmissive = highlight === 'ht' ? '#FFB340' : '#000000';
  const htInt = highlight === 'ht' ? 0.34 * pulse : 0;

  return (
    <group>
      {/* ================================================================= */}
      {/* 1. PCC POLES, FOOTINGS, POLE BANDS & IDENTIFICATION PLATES        */}
      {/* ================================================================= */}
      {[-poleX, poleX].map((px, idx) => (
        <group key={idx} position={[px, 0, 0]}>
          <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.32, 0.5]} />
            <meshStandardMaterial color="#8A8E89" roughness={0.92} />
          </mesh>
          <mesh position={[0, 4.25, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.105, 0.165, 8.5, 8]} />
            <meshStandardMaterial color="#B2B6B0" roughness={0.85} metalness={0.05} />
          </mesh>
          <mesh position={[0, 8.52, 0]} castShadow>
            <cylinderGeometry args={[0.115, 0.115, 0.05, 8]} />
            <meshStandardMaterial color="#7C8791" metalness={0.78} roughness={0.32} />
          </mesh>
          {/* Pole Clamp Bands + Bolt Heads */}
          {[7.75, 6.78, 5.95, 3.25, 1.95].map((cy) => (
            <group key={cy} position={[0, cy, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.148, 0.148, 0.065, 12]} />
                <meshStandardMaterial color="#7F8A94" metalness={0.82} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0, 0.16]} castShadow>
                <boxGeometry args={[0.04, 0.04, 0.05]} />
                <meshStandardMaterial color="#AAB4BC" metalness={0.88} roughness={0.25} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Danger / Identification Plate on Left Pole */}
      <mesh position={[-poleX, 2.55, 0.155]} castShadow>
        <boxGeometry args={[0.22, 0.28, 0.015]} />
        <meshStandardMaterial color="#C83E2B" roughness={0.45} metalness={0.2} />
      </mesh>

      {/* ================================================================= */}
      {/* 2. GALVANIZED STEEL CROSS-ARMS, BRACING & STAY WIRE ASSEMBLY      */}
      {/* ================================================================= */}
      {/* Top 11 kV Pin Insulator Cross-Arm (y=7.75) */}
      <mesh position={[0, 7.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.1, 0.12, 0.14]} />
        <meshStandardMaterial color="#96A1AA" metalness={0.82} roughness={0.28} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={`kb-${side}`} position={[side * 0.85, 7.42, 0]} rotation={[0, 0, side * 0.62]} castShadow>
          <boxGeometry args={[0.045, 0.72, 0.045]} />
          <meshStandardMaterial color="#8A96A0" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* AB Switch / Isolator Cross-Arm (y=6.78) */}
      <mesh position={[0, 6.78, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[3.05, 0.1, 0.14]} />
        <meshStandardMaterial color="#929DA6" metalness={0.82} roughness={0.3} />
      </mesh>
      {/* AB Switch Horizontal Rotating Shaft + Vertical Operating Pipe down Left Pole */}
      <mesh position={[0, 6.84, 0.12]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 2.7, 10]} />
        <meshStandardMaterial color="#B5C0C8" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[-poleX - 0.19, 4.1, 0.12]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, 5.45, 10]} />
        <meshStandardMaterial color="#A8B3BC" metalness={0.84} roughness={0.28} />
      </mesh>
      {/* Operating Handle Bracket at y=1.35 */}
      <mesh position={[-poleX - 0.19, 1.35, 0.16]} castShadow>
        <boxGeometry args={[0.08, 0.18, 0.1]} />
        <meshStandardMaterial color="#6D7882" metalness={0.82} roughness={0.32} />
      </mesh>

      {/* DO Fuse & LA Cross-Arm (y=5.95) */}
      <mesh position={[0, 5.95, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.1, 0.12]} />
        <meshStandardMaterial color="#929DA6" metalness={0.82} roughness={0.3} />
      </mesh>
      {/* Rear LA Mounting Channel */}
      <mesh position={[0, 5.9, -0.32]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.08, 0.1]} />
        <meshStandardMaterial color="#87929B" metalness={0.8} roughness={0.32} />
      </mesh>

      {/* Transformer Plinth Channels + Diagonal Support Struts */}
      <mesh position={[0, 3.25, 0.14]} castShadow receiveShadow>
        <boxGeometry args={[2.95, 0.16, 0.2]} />
        <meshStandardMaterial color="#7C8790" metalness={0.78} roughness={0.34} />
      </mesh>
      <mesh position={[0, 3.25, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[2.95, 0.16, 0.2]} />
        <meshStandardMaterial color="#7C8790" metalness={0.78} roughness={0.34} />
      </mesh>

      {/* Side Guy / Stay Wire Assembly on Right Pole */}
      <mesh position={[2.25, 3.3, 0]} rotation={[0, 0, 0.31]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 6.95, 8]} />
        <meshStandardMaterial color="#9BA6AF" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[2.0, 4.1, 0]} rotation={[0, 0, 0.31]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.12, 12]} />
        <meshStandardMaterial color="#5C2614" roughness={0.2} />
      </mesh>
      <mesh position={[3.35, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.24, 10]} />
        <meshStandardMaterial color="#7E827D" roughness={0.9} />
      </mesh>

      {/* ================================================================= */}
      {/* 3. HT EQUIPMENT: PIN INSULATORS, AB SWITCH, DO FUSES & LAs        */}
      {/* ================================================================= */}
      {phaseX.map((px, i) => (
        <group key={`ht-eq-${i}`}>
          <RibbedInsulator
            position={[px, 7.86, 0]}
            sheds={4}
            scale={1.08}
            emissive={htEmissive}
            emissiveIntensity={htInt}
          />
          <IsolatorPoleUnit
            position={[px, 6.84, 0.04]}
            emissive={htEmissive}
            emissiveIntensity={htInt}
          />
          <DropOutFuseUnit
            position={[px, 6.02, 0.12]}
            emissive={htEmissive}
            emissiveIntensity={htInt}
          />
          <RibbedInsulator
            position={[px, 5.95, -0.32]}
            sheds={5}
            scale={0.88}
            color="#6E3524"
            emissive={htEmissive}
            emissiveIntensity={htInt * 0.7}
          />
        </group>
      ))}

      {/* ================================================================= */}
      {/* 4. DETAILED 11 kV / 433 V DISTRIBUTION TRANSFORMER                */}
      {/* ================================================================= */}
      <group position={[0, 3.33, 0]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.12, 1.0, 0.78]} />
          <meshStandardMaterial color="#4A5E6D" metalness={0.44} roughness={0.42} />
        </mesh>
        <mesh position={[0, 1.02, 0]} castShadow>
          <boxGeometry args={[1.2, 0.06, 0.86]} />
          <meshStandardMaterial color="#3B4C59" metalness={0.52} roughness={0.38} />
        </mesh>
        {/* Lifting Lugs */}
        {[-0.48, 0.48].map((lx) => (
          <mesh key={lx} position={[lx, 1.09, 0]} castShadow>
            <boxGeometry args={[0.05, 0.1, 0.08]} />
            <meshStandardMaterial color="#3B4C59" metalness={0.65} roughness={0.35} />
          </mesh>
        ))}
        {/* Cooling Radiator Fin Banks */}
        {[-0.66, 0.66].map((rx, sIdx) => (
          <group key={sIdx} position={[rx, 0.48, 0]}>
            {[-0.24, -0.14, -0.04, 0.06, 0.16, 0.26].map((fz, fi) => (
              <mesh key={fi} position={[0, 0, fz]} castShadow receiveShadow>
                <boxGeometry args={[0.18, 0.76, 0.024]} />
                <meshStandardMaterial color="#425563" metalness={0.48} roughness={0.42} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Conservator Tank + Silica-Gel Breather */}
        <mesh position={[-0.2, 1.28, -0.18]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.68, 20]} />
          <meshStandardMaterial color="#516675" metalness={0.46} roughness={0.36} />
        </mesh>
        <mesh position={[-0.58, 1.12, -0.18]} castShadow>
          <cylinderGeometry args={[0.032, 0.032, 0.14, 12]} />
          <meshStandardMaterial color="#3D78B2" roughness={0.25} metalness={0.2} />
        </mesh>
        {/* Rating Plate */}
        <mesh position={[0.26, 0.56, 0.4]} castShadow>
          <boxGeometry args={[0.26, 0.16, 0.015]} />
          <meshStandardMaterial color="#CBD4DC" metalness={0.85} roughness={0.28} />
        </mesh>
        {/* 3x HV Bushings */}
        {[-0.34, 0, 0.34].map((bx, bi) => (
          <RibbedInsulator
            key={`hv-${bi}`}
            position={[bx, 1.07, 0.16]}
            rotation={[0.12, 0, 0]}
            sheds={3}
            scale={0.88}
          />
        ))}
        {/* 4x LV Bushings (3 Phases + Distinct Neutral) */}
        {[-0.3, -0.1, 0.1, 0.3].map((lx, li) => (
          <RibbedInsulator
            key={`lv-${li}`}
            position={[lx, 0.72, 0.42]}
            rotation={[1.18, 0, 0]}
            sheds={2}
            scale={0.55}
            color={li === 3 ? '#3A3A3A' : '#6C3320'}
          />
        ))}
      </group>

      {/* LT Distribution Box + Cleats (cleats only visible when dressed!) */}
      <mesh position={[1.15, 1.7, 0.24]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.54, 0.26]} />
        <meshStandardMaterial color="#677682" metalness={0.55} roughness={0.38} />
      </mesh>
      {mode === 'dressed' &&
        [3.05, 2.55, 2.15].map((cy) => (
          <mesh key={`cleat-${cy}`} position={[1.08, cy, 0.24]} castShadow>
            <boxGeometry args={[0.24, 0.045, 0.08]} />
            <meshStandardMaterial color="#9BA6AF" metalness={0.85} roughness={0.25} />
          </mesh>
        ))}

      {/* Two Distinct Earth Pits */}
      {[-1.36, 1.36].map((ex, idx) => (
        <mesh key={`pit-${idx}`} position={[ex, 0.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.14, 0.16, 0.1, 14]} />
          <meshStandardMaterial color="#4C5852" roughness={0.8} metalness={0.25} />
        </mesh>
      ))}

      {/* ================================================================= */}
      {/* 5. PROGRAMMATIC CONDUCTOR CONTINUITY TUBES                        */}
      {/* ================================================================= */}
      {segments.map((seg) => {
        let em = '#000000';
        let emInt = 0;

        if (highlight === 'bad' && (seg.id.startsWith('HT-DO-TX') || seg.id.startsWith('LT-TX-BOX'))) {
          em = '#FF3B30';
          emInt = 0.55 * pulse;
        } else if (highlight === 'good' && (seg.id.startsWith('HT-DO-TX') || seg.id.startsWith('LT-TX-BOX'))) {
          em = '#22C55E';
          emInt = 0.55 * pulse;
        } else if (highlight === 'lt-earth' && (seg.system === 'LT' || seg.system === 'EARTHING')) {
          em = '#38BDF8';
          emInt = 0.4 * pulse;
        }

        return <CableTube key={seg.id} segment={seg} emissive={em} emissiveIntensity={emInt} />;
      })}
    </group>
  );
};
