import React, { useMemo } from 'react';
import * as THREE from 'three';

export type DpHighlightTarget = 'none' | 'ht-assembly' | 'jumpers-lt';

interface TubeProps {
  points: [number, number, number][];
  radius: number;
  color: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}

const CableTube: React.FC<TubeProps> = ({
  points,
  radius,
  color,
  metalness = 0.65,
  roughness = 0.35,
  emissive = '#000000',
  emissiveIntensity = 0,
}) => {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 36, radius, 10, false);
  }, [points, radius]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
};

/**
 * Glazed ribbed porcelain insulator stack (pin/bushing/arrester)
 */
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
}) => {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Galvanized mounting pin */}
      <mesh position={[0, -0.06, 0]} castShadow>
        <cylinderGeometry args={[0.024, 0.028, 0.14, 12]} />
        <meshStandardMaterial color="#8E9AA3" metalness={0.8} roughness={0.32} />
      </mesh>
      {/* Porcelain core */}
      <mesh position={[0, sheds * 0.032, 0]} castShadow>
        <cylinderGeometry args={[0.042, 0.046, sheds * 0.068, 16]} />
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
      {/* Alternating porcelain sheds */}
      {Array.from({ length: sheds }).map((_, i) => (
        <mesh key={i} position={[0, 0.02 + i * 0.058, 0]} castShadow>
          <cylinderGeometry args={[0.075 - i * 0.005, 0.095 - i * 0.005, 0.024, 20]} />
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
      {/* Top metallic clamp / terminal */}
      <mesh position={[0, sheds * 0.06 + 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.032, 0.045, 12]} />
        <meshStandardMaterial color="#B5C0C9" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  );
};

export interface DpStructure3DProps {
  mode?: 'dressed' | 'untidy';
  highlight?: DpHighlightTarget;
  highlightPulse?: number; // 0..1
  position?: [number, number, number];
  rotationY?: number;
}

/**
 * Provisional 3D 11 kV / 433 V Double-Pole Distribution Transformer Structure.
 * Geometry and arrangement are provisional pending exact WBSEDCL drawing verification.
 */
export const DpStructure3DModel: React.FC<DpStructure3DProps> = ({
  mode = 'dressed',
  highlight = 'none',
  highlightPulse = 0,
  position = [0, 0, 0],
  rotationY = 0,
}) => {
  const poleX = 1.15;
  const htGlow = highlight === 'ht-assembly' ? 0.28 * highlightPulse : 0;
  const jumperGlow = highlight === 'jumpers-lt' ? 0.34 * highlightPulse : 0;

  const phaseX = [-1.05, 0, 1.05];

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* ================================================================= */}
      {/* 1. TWO TAPERED PCC POLES + CONCRETE PLINTH FOOTINGS               */}
      {/* ================================================================= */}
      {[-poleX, poleX].map((px, idx) => (
        <group key={idx} position={[px, 0, 0]}>
          {/* Ground concrete plinth */}
          <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.32, 0.48]} />
            <meshStandardMaterial color="#8E928E" roughness={0.92} metalness={0.04} />
          </mesh>
          {/* Tapered PCC Pole (Provisional) */}
          <mesh position={[0, 4.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.105, 0.165, 8.2, 8]} />
            <meshStandardMaterial color="#B4B8B2" roughness={0.86} metalness={0.05} />
          </mesh>
          {/* Pole-top galvanized cap */}
          <mesh position={[0, 8.22, 0]} castShadow>
            <cylinderGeometry args={[0.115, 0.115, 0.05, 8]} />
            <meshStandardMaterial color="#7C8791" metalness={0.75} roughness={0.35} />
          </mesh>
          {/* Pole clamp collars at cross-arm levels */}
          {[7.55, 6.35, 3.25, 2.0].map((cy) => (
            <mesh key={cy} position={[0, cy, 0]} castShadow>
              <cylinderGeometry args={[0.145, 0.145, 0.07, 12]} />
              <meshStandardMaterial color="#7F8A94" metalness={0.8} roughness={0.32} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ================================================================= */}
      {/* 2. GALVANIZED STEEL CROSS-ARMS & DIAGONAL BRACING                 */}
      {/* ================================================================= */}
      {/* Top 11 kV HT Cross-Arm Channel */}
      <mesh position={[0, 7.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.12, 0.14]} />
        <meshStandardMaterial
          color="#9AA5AE"
          metalness={0.82}
          roughness={0.28}
          emissive="#F5A623"
          emissiveIntensity={htGlow * 0.5}
        />
      </mesh>
      {/* Diagonal Knee Braces under Top Cross-Arm */}
      {[-1, 1].map((side) => (
        <mesh
          key={`brace-${side}`}
          position={[side * 0.85, 7.22, 0]}
          rotation={[0, 0, side * 0.62]}
          castShadow
        >
          <boxGeometry args={[0.045, 0.72, 0.045]} />
          <meshStandardMaterial color="#8A96A0" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Middle LA / DO Fuse Cross-Arm (Provisional) */}
      <mesh position={[0, 6.35, 0.12]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.1, 0.12]} />
        <meshStandardMaterial color="#95A0A9" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Transformer Mounting Plinth Channels */}
      <mesh position={[0, 3.25, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[2.85, 0.16, 0.22]} />
        <meshStandardMaterial color="#7C8790" metalness={0.78} roughness={0.34} />
      </mesh>
      <mesh position={[0, 3.25, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[2.85, 0.16, 0.22]} />
        <meshStandardMaterial color="#7C8790" metalness={0.78} roughness={0.34} />
      </mesh>

      {/* ================================================================= */}
      {/* 3. 11 kV HT INSULATORS, LIGHTNING ARRESTERS & DO FUSES (PROV.)    */}
      {/* ================================================================= */}
      {phaseX.map((px, i) => (
        <group key={`ht-${i}`}>
          {/* Top Pin Insulator */}
          <RibbedInsulator
            position={[px, 7.66, 0]}
            sheds={4}
            scale={1.15}
            emissive="#FFB340"
            emissiveIntensity={htGlow}
          />
          {/* Lightning Arrester / DO Fuse Stack on middle cross-arm */}
          <RibbedInsulator
            position={[px, 6.45, 0.22]}
            rotation={[0.25, 0, 0]}
            sheds={5}
            scale={0.95}
            color="#6A3422"
            emissive="#FFB340"
            emissiveIntensity={htGlow * 0.7}
          />
          {/* Incoming 11 kV HT Line Conductor */}
          <CableTube
            points={[
              [px, 8.05, -5.5],
              [px, 7.92, -2.5],
              [px, 7.93, 0],
            ]}
            radius={0.016}
            color="#D0D7DE"
            metalness={0.82}
            roughness={0.25}
          />
        </group>
      ))}

      {/* ================================================================= */}
      {/* 4. 11 kV / 433 V DISTRIBUTION TRANSFORMER (PROVISIONAL)           */}
      {/* ================================================================= */}
      <group position={[0, 3.33, 0]}>
        {/* Main Painted Steel Tank */}
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.08, 0.96, 0.76]} />
          <meshStandardMaterial color="#4A5E6D" metalness={0.42} roughness={0.44} />
        </mesh>
        {/* Top Bolted Flange Cover */}
        <mesh position={[0, 0.98, 0]} castShadow>
          <boxGeometry args={[1.16, 0.06, 0.84]} />
          <meshStandardMaterial color="#3B4C59" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Cooling Radiator Fin Banks (Left & Right) */}
        {[-0.64, 0.64].map((rx, sideIdx) => (
          <group key={sideIdx} position={[rx, 0.46, 0]}>
            {[-0.24, -0.14, -0.04, 0.06, 0.16, 0.26].map((fz, fi) => (
              <mesh key={fi} position={[0, 0, fz]} castShadow receiveShadow>
                <boxGeometry args={[0.18, 0.74, 0.025]} />
                <meshStandardMaterial color="#425563" metalness={0.48} roughness={0.42} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Cylindrical Conservator Tank + Support Brackets */}
        <mesh position={[-0.22, 1.24, -0.18]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.68, 20]} />
          <meshStandardMaterial color="#516675" metalness={0.45} roughness={0.38} />
        </mesh>
        <mesh position={[-0.36, 1.09, -0.18]} castShadow>
          <boxGeometry args={[0.04, 0.24, 0.04]} />
          <meshStandardMaterial color="#3B4C59" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[-0.08, 1.09, -0.18]} castShadow>
          <boxGeometry args={[0.04, 0.24, 0.04]} />
          <meshStandardMaterial color="#3B4C59" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* Metallic Rating Plate on Front */}
        <mesh position={[0.24, 0.56, 0.39]} castShadow>
          <boxGeometry args={[0.26, 0.16, 0.015]} />
          <meshStandardMaterial color="#CBD4DC" metalness={0.85} roughness={0.28} />
        </mesh>

        {/* 3x HT Bushings on Transformer Top */}
        {[-0.32, 0, 0.32].map((bx, bi) => (
          <RibbedInsulator
            key={`hv-bush-${bi}`}
            position={[bx, 1.03, 0.16]}
            rotation={[0.14, 0, 0]}
            sheds={3}
            scale={0.85}
          />
        ))}

        {/* 4x LT Bushings on Front Tank Face */}
        {[-0.3, -0.1, 0.1, 0.3].map((lx, li) => (
          <RibbedInsulator
            key={`lv-bush-${li}`}
            position={[lx, 0.78, 0.42]}
            rotation={[1.15, 0, 0]}
            sheds={2}
            scale={0.55}
            color="#6C3320"
          />
        ))}
      </group>

      {/* ================================================================= */}
      {/* 5. HT JUMPERS & LT CABLE DRESSING (DRESSED VS UNTIDY COMPARISON)  */}
      {/* ================================================================= */}
      {mode === 'dressed' ? (
        <group>
          {/* Uniform, strain-relieved HT Jumpers: Top Insulator -> LA/DO -> Transformer HV Bushing */}
          {phaseX.map((px, i) => {
            const hvX = (i - 1) * 0.32;
            return (
              <group key={`dressed-ht-${i}`}>
                <CableTube
                  points={[
                    [px, 7.93, 0],
                    [px, 7.35, 0.26],
                    [px, 6.72, 0.34],
                  ]}
                  radius={0.014}
                  color="#D2D9DF"
                  emissive="#4BE3C1"
                  emissiveIntensity={jumperGlow}
                />
                <CableTube
                  points={[
                    [px, 6.52, 0.3],
                    [(px + hvX) * 0.5, 5.45, 0.48],
                    [hvX, 4.58, 0.22],
                  ]}
                  radius={0.013}
                  color="#D2D9DF"
                  emissive="#4BE3C1"
                  emissiveIntensity={jumperGlow}
                />
              </group>
            );
          })}

          {/* Neatly Dressed & Cleated 4-Core LT Cables (R, Y, B, N) */}
          {[
            { x: -0.3, c: '#B8332A' },
            { x: -0.1, c: '#D6A11E' },
            { x: 0.1, c: '#2963A8' },
            { x: 0.3, c: '#23272B' },
          ].map((lt, li) => (
            <CableTube
              key={`dressed-lt-${li}`}
              points={[
                [lt.x, 4.02, 0.58],
                [lt.x * 0.6 + 0.5, 3.65, 0.55],
                [0.92 + li * 0.032, 3.18, 0.25],
                [0.96 + li * 0.032, 2.05, 0.22],
              ]}
              radius={0.016}
              color={lt.c}
              metalness={0.18}
              roughness={0.55}
              emissive="#4BE3C1"
              emissiveIntensity={jumperGlow * 0.75}
            />
          ))}

          {/* Galvanized LT Cable Cleats along Right Pole */}
          {[3.05, 2.55, 2.15].map((cy) => (
            <mesh key={`cleat-${cy}`} position={[1.0, cy, 0.22]} castShadow>
              <boxGeometry args={[0.24, 0.045, 0.09]} />
              <meshStandardMaterial color="#9BA6AF" metalness={0.85} roughness={0.25} />
            </mesh>
          ))}

          {/* LT Distribution / Switch Box on Right Pole (Provisional) */}
          <mesh position={[1.15, 1.72, 0.25]} castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.52, 0.26]} />
            <meshStandardMaterial color="#677682" metalness={0.55} roughness={0.38} />
          </mesh>
        </group>
      ) : (
        <group>
          {/* UNTIDY MODE: Slack, crossing HT jumpers & un-cleated hanging LT cables */}
          <CableTube
            points={[
              [-1.05, 7.93, 0],
              [-0.45, 6.85, 0.55],
              [0.15, 5.8, 0.2],
              [-0.32, 4.58, 0.22],
            ]}
            radius={0.014}
            color="#C2C8CE"
            emissive="#FF6B4A"
            emissiveIntensity={0.22}
          />
          <CableTube
            points={[
              [0, 7.93, 0],
              [-0.55, 6.6, -0.18],
              [0.35, 5.5, 0.45],
              [0, 4.58, 0.22],
            ]}
            radius={0.014}
            color="#C2C8CE"
            emissive="#FF6B4A"
            emissiveIntensity={0.22}
          />
          <CableTube
            points={[
              [1.05, 7.93, 0],
              [0.35, 6.45, 0.48],
              [0.85, 5.3, -0.1],
              [0.32, 4.58, 0.22],
            ]}
            radius={0.014}
            color="#C2C8CE"
            emissive="#FF6B4A"
            emissiveIntensity={0.22}
          />
          {/* Tangled, unsupported LT cables */}
          {[
            { x: -0.3, c: '#B8332A', dx: 0.2 },
            { x: -0.1, c: '#D6A11E', dx: -0.25 },
            { x: 0.1, c: '#2963A8', dx: 0.3 },
            { x: 0.3, c: '#23272B', dx: -0.18 },
          ].map((lt, li) => (
            <CableTube
              key={`untidy-lt-${li}`}
              points={[
                [lt.x, 4.02, 0.58],
                [lt.x + lt.dx, 3.3, 0.78],
                [0.55 + lt.dx, 2.55, 0.52],
                [0.98 + li * 0.04, 1.95, 0.25],
              ]}
              radius={0.016}
              color={lt.c}
              metalness={0.18}
              roughness={0.55}
              emissive="#FF6B4A"
              emissiveIntensity={0.15}
            />
          ))}
        </group>
      )}

      {/* ================================================================= */}
      {/* 6. EARTHING FLAT DOWN LEFT POLE (PROVISIONAL)                      */}
      {/* ================================================================= */}
      <mesh position={[-poleX - 0.14, 2.2, 0]} castShadow>
        <boxGeometry args={[0.025, 4.4, 0.04]} />
        <meshStandardMaterial color="#B5BFC7" metalness={0.85} roughness={0.28} />
      </mesh>
    </group>
  );
};
