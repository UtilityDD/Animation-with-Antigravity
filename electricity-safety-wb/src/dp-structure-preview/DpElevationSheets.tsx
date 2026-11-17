import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { DpStructure3DModelV2 } from './DpStructure3DModelV2';

const FONT_BN = "'Hind Siliguri', 'Noto Sans Bengali', 'Nirmala UI', sans-serif";

const ElevationCam: React.FC<{ pos: [number, number, number]; look: [number, number, number] }> = ({
  pos,
  look,
}) => {
  const { camera } = useThree();
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(look[0], look[1], look[2]);
  camera.updateMatrixWorld();
  return null;
};

/**
 * Frame 0: Full Front Elevation
 * Frame 1: Full Side Elevation
 */
export const DpElevationSheets: React.FC = () => {
  const frame = useCurrentFrame();
  const isSide = frame >= 1;

  const camPos: [number, number, number] = isSide ? [11.2, 4.3, 0.0] : [0.0, 4.3, 11.4];
  const camLook: [number, number, number] = [0.0, 4.3, 0.0];
  const title = isSide ? 'পার্শ্ব দৃশ্য (সম্পূর্ণ ডিপি স্ট্রাকচার)' : 'সম্মুখ দৃশ্য (সম্পূর্ণ ডিপি স্ট্রাকচার)';

  return (
    <AbsoluteFill style={{ backgroundColor: '#101D38' }}>
      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ fov: 45, near: 0.1, far: 100 }}
        shadows
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#101D38']} />
        <ElevationCam pos={camPos} look={camLook} />
        <ambientLight intensity={0.55} color="#CBD5E1" />
        <hemisphereLight args={['#7DD3FC', '#334155', 0.7]} />
        <directionalLight position={[8, 14, 9]} intensity={2.1} color="#FFF7ED" />
        <directionalLight position={[-8, 6, -6]} intensity={0.9} color="#38BDF8" />
        <DpStructure3DModelV2 mode="dressed" highlight="none" pulse={0} />
      </ThreeCanvas>

      <div
        style={{
          position: 'absolute',
          left: 60,
          bottom: 44,
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          borderLeft: '6px solid #38BDF8',
          borderRadius: '0 10px 10px 0',
          padding: '12px 24px',
          fontFamily: FONT_BN,
          color: '#F8FAFC',
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};
