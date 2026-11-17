import React from 'react';
import { ThalesPose, ThalesRig, getThalesExpressionParams } from '../ThalesRig';
import {
  AmberGem,
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  Feather,
  camAt,
  camTransform,
  ci,
} from './Scene1Shared';

/**
 * Beat 5: Anti-Gravity Feather Levitation & Thales Astonishment (Frames 880 to 1260)
 * - 880..1030: Macro close-up of the feather quivering on the table as the charged amber approaches.
 * - 1030..1080: Feather snaps violently upward onto the amber with crisp multi-layered shockwaves.
 * - 1080..1260: Camera pulls back to reveal Thales completely inside the frame, astonished.
 */
export const FeatherLevitationShot: React.FC<{ frame: number }> = ({ frame }) => {
  const local = Math.max(0, frame - 880);

  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [350, 380], [1, 0], EASE_INOUT);

  // Camera: tight macro on the feather & amber -> smooth pull-back to show Thales reacting
  const cam = camAt(local, [
    { f: 0, x: 1120, y: 610, z: 1.48, sx: 1240, sy: 540 },
    { f: 145, x: 1120, y: 575, z: 1.56, sx: 1240, sy: 540 },
    { f: 225, x: 1220, y: 495, z: 1.0, sx: 1260, sy: 540 },
    { f: 380, x: 1225, y: 490, z: 0.96, sx: 1260, sy: 540 },
  ]);

  // Amber descends slightly toward feather, then lifts slightly with feather clinging
  const amberX = 1090;
  const amberY = ci(local, [0, 130, 210, 320], [450, 480, 445, 435], EASE_INOUT);

  // Feather physics:
  // 0..145: lies on table (y=720, rot=84deg horizontal), quivers stronger as amber nears
  // 145..175: leaps up fast! (y: 720 -> 535, rot: 84 -> 18deg)
  const flutter = ci(local, [30, 145, 185], [0.1, 1.0, 0.25]);
  const quiverY = local < 150 ? Math.sin(local * 0.95) * (1.5 + flutter * 4.5) : 0;
  const featherX = ci(local, [145, 178], [1120, 1086], EASE_OUT);
  const featherY = ci(local, [145, 178], [725, 540], EASE_OUT) + quiverY;
  const featherRot = ci(local, [0, 140, 178], [84, 68, 16], EASE_OUT);

  // Multi-layered crisp golden shockwave burst right at contact (local 172..230)
  const burstT = ci(local, [170, 222], [0, 1], EASE_OUT);
  const burstOpacity = ci(local, [170, 180, 222], [0, 0.95, 0]);

  // Subtle camera impact shake on snap
  const shakeAmt = ci(local, [170, 175, 195], [0, 5, 0]);
  const shakeX = Math.sin(local * 2.4) * shakeAmt;
  const shakeY = Math.cos(local * 3.1) * shakeAmt;

  // Thales Rig appearing smoothly as camera pulls back (100% inside right frame)
  // Animated progressive astonishment: leans back, brows shoot up, jaw drops, hands raise in wonder!
  const thalesOpacity = ci(local, [165, 215], [0, 1], EASE_OUT);
  const amazeT = ci(local, [170, 205], [0, 1], EASE_OUT);
  const expr = getThalesExpressionParams('astonished');
  const thalesPose: ThalesPose = {
    worldX: 1295,
    worldY: 165,
    chestLeanDeg: -9 * amazeT + Math.sin(local * 0.05) * 1.2,
    torsoYaw: 0.1,
    breathY: Math.sin(local * 0.06) * 2.5,
    shoulderElevateY: -10 * amazeT,
    neckPitchDeg: -6 * amazeT,
    headRollDeg: 4 * amazeT + Math.sin(local * 0.04) * 1.5,
    headPitch: -0.15,
    eyeLookX: -0.5, // Looking left directly at the floating feather
    eyeLookY: 0.15 + Math.sin(local * 0.12) * 0.06,
    blinkAmount: local % 180 > 173 ? 1 : 0,
    eyeWiden: expr.eyeWiden * amazeT,
    browFurrow: 0,
    browLift: expr.browLift * amazeT,
    mouthOpen: expr.mouthOpen * amazeT,
    mouthState: expr.mouthState,
    rubProgress: 0,
    leftArmState: 'raisedWonder',
    rightArmState: 'astonished',
    amberGlow: 0.9,
    beardSwayDeg: Math.sin(local * 0.07) * 2.5 - amazeT * 3,
    amazeBlend: amazeT,
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 65% 50%, #151E32 0%, #050811 75%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: camTransform(cam, shakeX, shakeY),
          transformOrigin: '0 0',
        }}
      >
        {/* Thales Reacting in Astonishment Behind Table (100% grounded, no floating!) */}
        {thalesOpacity > 0.01 && (
          <ThalesRig pose={thalesPose} scale={0.9} opacity={thalesOpacity} />
        )}

        {/* Warm Study Table in Front of Thales's Lower Torso */}
        <div
          style={{
            position: 'absolute',
            left: 350,
            right: -400,
            top: 720,
            bottom: -500,
            background: 'linear-gradient(180deg, #273247 0%, #141B2B 28%, #070B14 100%)',
            borderTop: '4px solid #475569',
            boxShadow: '0 -12px 36px rgba(0,0,0,0.72), inset 0 18px 40px rgba(255, 255, 255, 0.04)',
          }}
        >
          {/* Warm Amber Specular Reflection on Tabletop */}
          <div
            style={{
              position: 'absolute',
              left: 560,
              top: -20,
              width: 420,
              height: 110,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.16) 0%, rgba(245, 158, 11, 0) 72%)',
              pointerEvents: 'none',
            }}
          />
          {/* Subtle Carved Stone Grain & Rolled Scroll Prop on Left Tabletop */}
          <svg width="700" height="140" viewBox="0 0 700 140" style={{ position: 'absolute', left: 160, top: 18 }}>
            <line x1="20" y1="36" x2="620" y2="36" stroke="#334155" strokeWidth="1" strokeOpacity="0.45" />
            <line x1="90" y1="78" x2="540" y2="78" stroke="#1E293B" strokeWidth="1.2" strokeOpacity="0.6" />
            <g transform="translate(80, 12)">
              <rect x="0" y="6" width="130" height="22" rx="11" fill="#A68757" opacity="0.72" />
              <ellipse cx="130" cy="17" rx="6" ry="11" fill="#5C4727" opacity="0.8" />
            </g>
          </svg>
        </div>

        {/* Electrostatic Amber & Levitating Feather Scene */}
        <svg
          width="1920"
          height="1080"
          style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
        >
          {/* Subtle Attraction Glow between Amber and Feather */}
          <ellipse
            cx={amberX}
            cy={amberY + 45}
            rx={65}
            ry={90}
            fill="rgba(96, 165, 250, 0.12)"
            filter="blur(14px)"
          />

          {/* The Detailed Feather (quivering, leaping, clinging) */}
          <g transform={`translate(${featherX}, ${featherY}) rotate(${featherRot})`}>
            <Feather length={190} flutter={flutter} frame={frame} />
          </g>

          {/* The Charged Amber Gemstone */}
          <g transform={`translate(${amberX}, ${amberY})`}>
            <AmberGem id="levAmber" size={110} glow={0.85} charge={0.95} />
          </g>

          {/* Multi-layered Crisp Shockwave Burst (small, rapid, layered) */}
          {burstOpacity > 0.01 && (
            <g transform={`translate(${amberX}, ${amberY + 35})`} opacity={burstOpacity}>
              <circle
                cx="0"
                cy="0"
                r={14 + burstT * 115}
                fill="rgba(253, 224, 71, 0.08)"
                stroke="#FDE047"
                strokeWidth={3.2 * (1 - burstT * 0.6)}
              />
              <circle
                cx="0"
                cy="0"
                r={8 + burstT * 72}
                fill="none"
                stroke="#93C5FD"
                strokeWidth={2 * (1 - burstT * 0.5)}
              />
              {/* Radial Micro Sparks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const r1 = 18 + burstT * 60;
                const r2 = 28 + burstT * 88;
                return (
                  <line
                    key={deg}
                    x1={Math.cos(rad) * r1}
                    y1={Math.sin(rad) * r1}
                    x2={Math.cos(rad) * r2}
                    y2={Math.sin(rad) * r2}
                    stroke="#FEF08A"
                    strokeWidth={2.2 * (1 - burstT)}
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          )}
        </svg>

        <DustMotes frame={frame} cx={1120} cy={550} radius={280} count={26} opacity={0.75} seed={31} />
      </div>
    </div>
  );
};
