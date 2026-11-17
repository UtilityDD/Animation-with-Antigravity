import React from 'react';

export interface PuppetRigProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  /** Current animation frame for organic blinks, lip-sync, and secondary physics */
  frame?: number;
  /** 2.5D head turn (-1 = left, 0 = center, 1 = right) */
  headTurn?: number;
  /** Head nod angle in degrees */
  headTilt?: number;
  /** Torso lean angle in degrees */
  torsoLean?: number;
  /** Squash & stretch horizontal factor (1.0 = default) */
  squashX?: number;
  /** Squash & stretch vertical factor (1.0 = default) */
  squashY?: number;
  /** Left arm shoulder rotation in degrees */
  leftArmAngle?: number;
  /** Left forearm elbow bend in degrees */
  leftForearmAngle?: number;
  /** Right arm shoulder rotation in degrees */
  rightArmAngle?: number;
  /** Right forearm elbow bend in degrees */
  rightForearmAngle?: number;
  /** Left leg hip rotation in degrees */
  leftLegAngle?: number;
  /** Right leg hip rotation in degrees */
  rightLegAngle?: number;
  /** Facial expression */
  expression?: 'happy' | 'alert' | 'shocked' | 'speaking';
  /** Hand gesture pose */
  handGesture?: 'fist' | 'open_palm' | 'pointing' | 'caution';
  /** Pupil look target offset (-1 to 1) */
  pupilOffsetX?: number;
  pupilOffsetY?: number;
  /** Optional prop in hand or footwear state */
  wearingRubberSlippers?: boolean;
  wetHandsDrops?: boolean;
}

/**
 * Organic 4-Frame Eye Blink Cycle (Every 75–85 frames, with offset)
 * Replicates broadcast cartoon eye acting (Chhota Bheem / TV standard)
 */
export const getEyeBlinkScale = (frame: number, offset = 0): number => {
  const cycle = (frame + offset) % 85;
  if (cycle >= 0 && cycle < 2) return 0.5;   // half closed
  if (cycle >= 2 && cycle < 4) return 0.04;  // fully shut
  if (cycle >= 4 && cycle < 6) return 0.65;  // opening back up
  return 1.0;                                // wide open
};

/**
 * 5-Phoneme Bengali Mouth Chart for Speech & Emotion
 */
export const ExpressiveMouth: React.FC<{
  frame: number;
  expression: string;
}> = ({ frame, expression }) => {
  if (expression === 'shocked') {
    return (
      <g>
        <ellipse cx="0" cy="-11" rx="6.5" ry="8" fill="#581C87" stroke="#3E1A04" strokeWidth="2" />
        <ellipse cx="0" cy="-7" rx="4" ry="2.5" fill="#EF4444" />
      </g>
    );
  }

  if (expression === 'alert') {
    return (
      <g>
        <ellipse cx="0" cy="-11" rx="5.5" ry="5.5" fill="#7F1D1D" stroke="#3E1A04" strokeWidth="2" />
        <line x1="-4" y1="-12" x2="4" y2="-12" stroke="#FFF8E7" strokeWidth="1.5" />
      </g>
    );
  }

  if (expression === 'speaking') {
    // 4-frame phoneme cadence matching Bengali speech rhythms
    const phonemeIndex = Math.floor((frame % 16) / 4);
    switch (phonemeIndex) {
      case 0: // 'Ah' / Wide Open
        return (
          <g>
            <ellipse cx="0" cy="-10" rx="7.5" ry="6.5" fill="#991B1B" stroke="#451A03" strokeWidth="1.8" />
            <path d="M -5 -8 Q 0 -4 5 -8" fill="#F87171" />
          </g>
        );
      case 1: // 'O' / Round Mouth ('বলো', 'ওড়াবে')
        return <ellipse cx="0" cy="-10.5" rx="5" ry="6" fill="#991B1B" stroke="#451A03" strokeWidth="2" />;
      case 2: // 'Ee' / Wide Grin ('বিদ্যুৎ', 'বিপদ')
        return (
          <g>
            <rect x="-7.5" y="-12.5" width="15" height="5.5" rx="2.5" fill="#FFFFFF" stroke="#451A03" strokeWidth="1.8" />
            <line x1="-7.5" y1="-10" x2="7.5" y2="-10" stroke="#451A03" strokeWidth="1" />
          </g>
        );
      default: // 'M / B' Closed Contact ('বন্ধু', 'বিশু')
        return <line x1="-7.5" y1="-10" x2="7.5" y2="-10" stroke="#451A03" strokeWidth="3.2" strokeLinecap="round" />;
    }
  }

  // Default Happy Smile
  return (
    <g>
      <path d="M -8 -13 Q 0 -5 8 -13" stroke="#7C2D12" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M -8 -13 L -6 -14 M 8 -13 L 6 -14" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
};

/**
 * MITU (10yo Girl) - Broadcast-Quality 2.5D Articulated Puppet Rig
 * Enhanced with Squash & Stretch, 2-Tone Cel-Shading, Secondary Ribbon Physics, and Alive Eyes
 */
export const MituRig: React.FC<PuppetRigProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  frame = 0,
  headTurn = 0.2,
  headTilt = 0,
  torsoLean = 0,
  squashX = 1,
  squashY = 1,
  leftArmAngle = 15,
  leftForearmAngle = -10,
  rightArmAngle = -20,
  rightForearmAngle = -25,
  leftLegAngle = 0,
  rightLegAngle = 0,
  expression = 'happy',
  pupilOffsetX = 0,
  pupilOffsetY = 0,
  wearingRubberSlippers = false,
}) => {
  const faceOffsetX = headTurn * 9;
  const blinkScale = getEyeBlinkScale(frame, 15);

  // Secondary motion lag for Mitu's braided pigtails & ribbons
  const hairLagSwing = Math.sin((frame - 3) * 0.24) * 9;
  const leftBraidRot = 12 + headTilt * 0.5 + hairLagSwing;
  const rightBraidRot = -12 + headTilt * 0.5 - hairLagSwing;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale}) scale(${squashX}, ${squashY})`}
      style={{ filter: 'drop-shadow(0px 7px 7px rgba(0,0,0,0.35))' }}
    >
      {/* Dynamic Ground Shadow that expands on squash */}
      <ellipse
        cx="0"
        cy="145"
        rx={38 * squashX}
        ry={10 * (2 - squashY)}
        fill="rgba(15, 23, 42, 0.45)"
      />

      {/* Torso Pivot Group */}
      <g transform={`rotate(${torsoLean}, 0, 40)`}>
        {/* Back Arm (Left Arm) */}
        <g transform={`translate(-18, -28) rotate(${leftArmAngle})`}>
          {/* Upper Arm with 2-Tone Shadow */}
          <rect x="-7" y="0" width="14" height="36" rx="7" fill="#C47A53" stroke="#451A03" strokeWidth="2.4" />
          <path d="M 0 0 L 7 0 L 7 36 L 0 36 Z" fill="#9A3412" opacity="0.3" />
          <rect x="-8" y="0" width="16" height="18" rx="5" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="2.2" />
          
          {/* Lower Arm / Elbow Pivot */}
          <g transform={`translate(0, 32) rotate(${leftForearmAngle})`}>
            <rect x="-6" y="0" width="12" height="34" rx="6" fill="#D97742" stroke="#451A03" strokeWidth="2.2" />
            <path d="M 0 0 L 6 0 L 6 34 L 0 34 Z" fill="#9A3412" opacity="0.25" />
            <circle cx="0" cy="36" r="7" fill="#D97742" stroke="#451A03" strokeWidth="2" />
          </g>
        </g>

        {/* School Bag on Back with Cel-Shade Highlights */}
        <rect x="-32" y="-30" width="24" height="58" rx="8" fill="#B45309" stroke="#451A03" strokeWidth="2.6" />
        <rect x="-30" y="-28" width="10" height="54" rx="4" fill="#D97706" opacity="0.5" />
        <path d="M -30 -12 L -10 -12" stroke="#FDE047" strokeWidth="3" />

        {/* Left Leg */}
        <g transform={`translate(-11, 52) rotate(${leftLegAngle})`}>
          <rect x="-7" y="0" width="14" height="78" rx="6" fill="#D97742" stroke="#451A03" strokeWidth="2.4" />
          <path d="M 0 0 L 7 0 L 7 78 L 0 78 Z" fill="#9A3412" opacity="0.25" />
          <rect x="-8" y="54" width="16" height="22" rx="3" fill="#FFF8E7" stroke="#1E3A8A" strokeWidth="2" />
          {/* Footwear */}
          <path
            d="M -10 74 Q 4 72 18 78 L 18 86 L -10 86 Z"
            fill={wearingRubberSlippers ? '#F59E0B' : '#1E293B'}
            stroke="#0F172A"
            strokeWidth="2.4"
          />
        </g>

        {/* Right Leg */}
        <g transform={`translate(11, 52) rotate(${rightLegAngle})`}>
          <rect x="-7" y="0" width="14" height="78" rx="6" fill="#D97742" stroke="#451A03" strokeWidth="2.4" />
          <path d="M 0 0 L 7 0 L 7 78 L 0 78 Z" fill="#9A3412" opacity="0.25" />
          <rect x="-8" y="54" width="16" height="22" rx="3" fill="#FFF8E7" stroke="#1E3A8A" strokeWidth="2" />
          <path
            d="M -10 74 Q 4 72 18 78 L 18 86 L -10 86 Z"
            fill={wearingRubberSlippers ? '#F59E0B' : '#1E293B'}
            stroke="#0F172A"
            strokeWidth="2.4"
          />
        </g>

        {/* Torso & Uniform Shirt with 2-Tone Shading */}
        <path
          d="M -22 -36 L 22 -36 L 28 18 L -28 18 Z"
          fill="#F8FAFC"
          stroke="#1E3A8A"
          strokeWidth="2.6"
        />
        <path d="M 8 -36 L 22 -36 L 28 18 L 12 18 Z" fill="#E2E8F0" opacity="0.6" />

        {/* Blue Pinafore / Skirt with Pleats */}
        <path
          d="M -26 6 L 26 6 L 38 64 L -38 64 Z"
          fill="#1D4ED8"
          stroke="#1E3A8A"
          strokeWidth="2.6"
        />
        {/* Pinafore Pleat Shadows */}
        <path d="M -14 6 L -20 64 M 0 6 L 0 64 M 14 6 L 20 64" stroke="#1E3A8A" strokeWidth="2" opacity="0.4" />
        <path d="M 12 6 L 26 6 L 38 64 L 20 64 Z" fill="#172554" opacity="0.25" />

        {/* Pinafore Straps & School Badge */}
        <path d="M -15 -35 L -18 8 M 15 -35 L 18 8" stroke="#1D4ED8" strokeWidth="7" />
        <circle cx="14" cy="-12" r="5" fill="#FFD600" stroke="#1E3A8A" strokeWidth="1.6" />

        {/* Head & Neck Pivot Group */}
        <g transform={`translate(0, -44) rotate(${headTilt})`}>
          {/* Neck */}
          <rect x="-6" y="-6" width="12" height="14" rx="4" fill="#D97742" stroke="#451A03" strokeWidth="2.2" />
          <path d="M 0 -6 L 6 -6 L 6 8 L 0 8 Z" fill="#9A3412" opacity="0.3" />

          {/* Two Braided Pigtails with Organic Secondary Physics */}
          <g transform={`translate(${-24 - faceOffsetX * 0.3}, -10) rotate(${leftBraidRot})`}>
            <path d="M 0 0 Q -14 18 -10 38" stroke="#0F172A" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M -14 36 L -4 42 L -16 44 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          </g>
          <g transform={`translate(${24 - faceOffsetX * 0.3}, -10) rotate(${rightBraidRot})`}>
            <path d="M 0 0 Q 14 18 10 38" stroke="#0F172A" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M 14 36 L 4 42 L 16 44 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          </g>

          {/* Head Base with 2-Tone Cel-Shading */}
          <ellipse cx="0" cy="-26" rx="26" ry="28" fill="#D97742" stroke="#451A03" strokeWidth="2.8" />
          {/* Volumetric Cheek Shadow */}
          <path
            d="M 10 -52 C 22 -40, 24 -12, 12 -2 C 20 -8, 24 -36, 10 -52 Z"
            fill="#B45309"
            opacity="0.32"
          />

          {/* Black Hair Crown */}
          <path
            d="M -26 -28 C -26 -56, 26 -56, 26 -28 C 18 -40, -14 -40, -26 -28 Z"
            fill="#0F172A"
          />
          {/* Hair Gloss Highlight */}
          <path d="M -18 -44 Q -6 -50 4 -46" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* 2.5D Facial Features */}
          <g transform={`translate(${faceOffsetX}, 0)`}>
            {/* Red Bindi */}
            <circle cx="0" cy="-35" r="2.4" fill="#DC2626" />

            {/* Left Eye with Organic 4-Frame Blink */}
            <g transform={`translate(-9, -27) scale(1, ${blinkScale})`}>
              <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              {/* Pupil tracking danger coordinate */}
              <circle cx={pupilOffsetX * 2.2} cy={pupilOffsetY * 1.5} r="2.6" fill="#0F172A" />
              <circle cx={pupilOffsetX * 2.2 - 0.9} cy={pupilOffsetY * 1.5 - 0.9} r="0.9" fill="#FFFFFF" />
            </g>

            {/* Right Eye with Organic 4-Frame Blink */}
            <g transform={`translate(9, -27) scale(1, ${blinkScale})`}>
              <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx={pupilOffsetX * 2.2} cy={pupilOffsetY * 1.5} r="2.6" fill="#0F172A" />
              <circle cx={pupilOffsetX * 2.2 - 0.9} cy={pupilOffsetY * 1.5 - 0.9} r="0.9" fill="#FFFFFF" />
            </g>

            {/* Expressive Eyebrows */}
            <path
              d={
                expression === 'alert' || expression === 'shocked'
                  ? 'M -16 -35 Q -10 -41 -4 -35 M 4 -35 Q 10 -41 16 -35'
                  : 'M -16 -33 Q -10 -37 -4 -33 M 4 -37 Q 10 -34 16 -37'
              }
              stroke="#0F172A"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Cute Cartoon Nose */}
            <path d="M 1 -25 L 4 -19 L 0 -18" stroke="#451A03" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Dynamic Lip-Sync Mouth */}
            <ExpressiveMouth frame={frame} expression={expression} />
          </g>
        </g>

        {/* Front Arm (Right Arm) */}
        <g transform={`translate(18, -28) rotate(${rightArmAngle})`}>
          <rect x="-7" y="0" width="14" height="36" rx="7" fill="#D97742" stroke="#451A03" strokeWidth="2.4" />
          <rect x="-8" y="0" width="16" height="18" rx="5" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="2.2" />
          <g transform={`translate(0, 32) rotate(${rightForearmAngle})`}>
            <rect x="-6" y="0" width="12" height="34" rx="6" fill="#D97742" stroke="#451A03" strokeWidth="2.2" />
            <circle cx="0" cy="36" r="7.5" fill="#D97742" stroke="#451A03" strokeWidth="2" />
          </g>
        </g>
      </g>
    </g>
  );
};

/**
 * BISHU (14yo Elder Brother) - Broadcast-Quality 2.5D Articulated Puppet Rig
 * Equipped with Squash & Stretch, 2-Tone Cel-Shading, Living Eyes, and Expressive Bengali Speech Mouth
 */
export const BishuRig: React.FC<PuppetRigProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  frame = 0,
  headTurn = 0.2,
  headTilt = 0,
  torsoLean = 0,
  squashX = 1,
  squashY = 1,
  leftArmAngle = 10,
  leftForearmAngle = -15,
  rightArmAngle = -15,
  rightForearmAngle = -20,
  leftLegAngle = 0,
  rightLegAngle = 0,
  expression = 'happy',
  pupilOffsetX = 0,
  pupilOffsetY = 0,
  wearingRubberSlippers = false,
  wetHandsDrops = false,
}) => {
  const faceOffsetX = headTurn * 10;
  const blinkScale = getEyeBlinkScale(frame, 35); // offset so Mitu and Bishu don't blink in unison

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale}) scale(${squashX}, ${squashY})`}
      style={{ filter: 'drop-shadow(0px 8px 8px rgba(0,0,0,0.38))' }}
    >
      {/* Ground Shadow responding to vertical squash */}
      <ellipse cx="0" cy="162" rx={42 * squashX} ry={11 * (2 - squashY)} fill="rgba(15, 23, 42, 0.45)" />

      <g transform={`rotate(${torsoLean}, 0, 45)`}>
        {/* Back Arm */}
        <g transform={`translate(-22, -36) rotate(${leftArmAngle})`}>
          <rect x="-8" y="0" width="16" height="42" rx="7" fill="#C47A53" stroke="#451A03" strokeWidth="2.4" />
          <path d="M 0 0 L 8 0 L 8 42 L 0 42 Z" fill="#9A3412" opacity="0.3" />
          <rect x="-9" y="0" width="18" height="20" rx="5" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2.2" />
          <g transform={`translate(0, 38) rotate(${leftForearmAngle})`}>
            <rect x="-7" y="0" width="14" height="38" rx="6" fill="#C47A53" stroke="#451A03" strokeWidth="2.2" />
            <circle cx="0" cy="40" r="8" fill="#C47A53" stroke="#451A03" strokeWidth="2" />
          </g>
        </g>

        {/* Left Leg */}
        <g transform={`translate(-10, 56) rotate(${leftLegAngle})`}>
          <rect x="-9" y="0" width="18" height="46" rx="6" fill="#1E3A8A" stroke="#0F172A" strokeWidth="2.6" />
          <path d="M 0 0 L 9 0 L 9 46 L 0 46 Z" fill="#0F172A" opacity="0.35" />
          <rect x="-7" y="42" width="14" height="54" rx="5" fill="#C47A53" stroke="#451A03" strokeWidth="2.4" />
          <path
            d="M -10 92 Q 6 90 20 96 L 20 104 L -10 104 Z"
            fill={wearingRubberSlippers ? '#FFD600' : '#334155'}
            stroke="#0F172A"
            strokeWidth="2.4"
          />
        </g>

        {/* Right Leg */}
        <g transform={`translate(10, 56) rotate(${rightLegAngle})`}>
          <rect x="-9" y="0" width="18" height="46" rx="6" fill="#1E3A8A" stroke="#0F172A" strokeWidth="2.6" />
          <path d="M 0 0 L 9 0 L 9 46 L 0 46 Z" fill="#0F172A" opacity="0.35" />
          <rect x="-7" y="42" width="14" height="54" rx="5" fill="#C47A53" stroke="#451A03" strokeWidth="2.4" />
          <path
            d="M -10 92 Q 6 90 20 96 L 20 104 L -10 104 Z"
            fill={wearingRubberSlippers ? '#FFD600' : '#334155'}
            stroke="#0F172A"
            strokeWidth="2.4"
          />
        </g>

        {/* Torso Shirt with Cel-Shaded Volume */}
        <path
          d="M -25 -42 L 25 -42 L 22 60 L -22 60 Z"
          fill="#E0F2FE"
          stroke="#0369A1"
          strokeWidth="2.8"
        />
        <path d="M 8 -42 L 25 -42 L 22 60 L 6 60 Z" fill="#BAE6FD" opacity="0.5" />
        <path d="M -10 -42 L 0 -28 L 10 -42" fill="none" stroke="#0369A1" strokeWidth="2.5" />
        <circle cx="0" cy="-12" r="2.5" fill="#0369A1" />
        <circle cx="0" cy="8" r="2.5" fill="#0369A1" />

        {/* Head Pivot */}
        <g transform={`translate(0, -50) rotate(${headTilt})`}>
          <rect x="-7" y="-8" width="14" height="16" rx="4" fill="#C47A53" stroke="#451A03" strokeWidth="2.4" />
          <ellipse cx="0" cy="-30" rx="28" ry="30" fill="#C47A53" stroke="#451A03" strokeWidth="2.8" />
          <path
            d="M 12 -58 C 24 -46, 26 -16, 12 -2 C 22 -8, 26 -42, 12 -58 Z"
            fill="#9A3412"
            opacity="0.32"
          />

          {/* Wavy Hair */}
          <path
            d="M -28 -30 C -30 -64, 30 -64, 28 -30 C 20 -46, -15 -44, -28 -30 Z"
            fill="#0F172A"
          />
          <path d="M -16 -48 Q -4 -56 8 -50" stroke="#475569" strokeWidth="2.6" fill="none" strokeLinecap="round" />

          {/* 2.5D Facial Features */}
          <g transform={`translate(${faceOffsetX}, 0)`}>
            {/* Left Eye */}
            <g transform={`translate(-10, -30) scale(1, ${blinkScale})`}>
              <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx={pupilOffsetX * 2.2} cy={pupilOffsetY * 1.5} r="2.7" fill="#0F172A" />
              <circle cx={pupilOffsetX * 2.2 - 0.9} cy={pupilOffsetY * 1.5 - 0.9} r="0.9" fill="#FFFFFF" />
            </g>

            {/* Right Eye */}
            <g transform={`translate(10, -30) scale(1, ${blinkScale})`}>
              <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx={pupilOffsetX * 2.2} cy={pupilOffsetY * 1.5} r="2.7" fill="#0F172A" />
              <circle cx={pupilOffsetX * 2.2 - 0.9} cy={pupilOffsetY * 1.5 - 0.9} r="0.9" fill="#FFFFFF" />
            </g>

            <path
              d={
                expression === 'alert' || expression === 'shocked'
                  ? 'M -17 -39 Q -11 -46 -4 -39 M 4 -39 Q 11 -46 17 -39'
                  : 'M -17 -37 Q -11 -41 -4 -37 M 4 -41 Q 11 -37 17 -40'
              }
              stroke="#0F172A"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M 1 -28 L 5 -21 L 0 -20" stroke="#451A03" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            
            {/* Expressive Mouth */}
            <ExpressiveMouth frame={frame} expression={expression} />
          </g>
        </g>

        {/* Front Arm */}
        <g transform={`translate(22, -36) rotate(${rightArmAngle})`}>
          <rect x="-8" y="0" width="16" height="42" rx="7" fill="#C47A53" stroke="#451A03" strokeWidth="2.4" />
          <rect x="-9" y="0" width="18" height="20" rx="5" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2.2" />
          <g transform={`translate(0, 38) rotate(${rightForearmAngle})`}>
            <rect x="-7" y="0" width="14" height="38" rx="6" fill="#C47A53" stroke="#451A03" strokeWidth="2.2" />
            <circle cx="0" cy="40" r="8.5" fill="#C47A53" stroke="#451A03" strokeWidth="2.2" />
            {wetHandsDrops && (
              <g>
                <circle cx="-4" cy={52 + Math.sin(frame * 0.4) * 6} r="3.5" fill="#00F2FE" />
                <circle cx="5" cy={58 + Math.cos(frame * 0.4) * 6} r="3" fill="#00F2FE" />
                <circle cx="0" cy={65 + Math.sin(frame * 0.5) * 8} r="2.5" fill="#38BDF8" />
              </g>
            )}
          </g>
        </g>
      </g>
    </g>
  );
};

/**
 * BIDYUT BONDHU (বিদ্যুৎ বন্ধু) - Animated Mascot
 * Enhanced with gentle breathing idle hover, bobbing lantern tassel, and warm rotating aura rays
 */
export const BidyutBondhuMascot: React.FC<{
  x: number;
  y: number;
  scale?: number;
  frame?: number;
  pulse?: number;
  holdingStopSign?: boolean;
}> = ({ x, y, scale = 1, frame = 0, pulse = 0, holdingStopSign = false }) => {
  const hoverY = Math.sin((frame || pulse) * 0.12) * 8;
  const glowRadius = 70 + Math.sin((frame || pulse) * 0.15) * 10;
  const blinkScale = getEyeBlinkScale(frame || 0, 50);

  return (
    <g transform={`translate(${x}, ${y + hoverY}) scale(${scale})`}>
      {/* Warm Protective Aura Rays */}
      <circle cx="0" cy="0" r={glowRadius} fill="rgba(255, 214, 0, 0.24)" />
      <circle cx="0" cy="0" r={glowRadius * 0.7} fill="rgba(0, 242, 254, 0.18)" />

      {/* Lantern Handle & Top Cap */}
      <path d="M -28 -55 Q 0 -85 28 -55" fill="none" stroke="#F59E0B" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M -34 -42 L 34 -42 L 24 -58 L -24 -58 Z" fill="#B45309" stroke="#FFD600" strokeWidth="2.6" />

      {/* Glass Globe Body with Internal Golden Glow */}
      <rect
        x="-32"
        y="-42"
        width="64"
        height="76"
        rx="24"
        fill="#FEF08A"
        stroke="#F59E0B"
        strokeWidth="4"
      />
      {/* Inner Flame Glow */}
      <ellipse cx="0" cy="4" rx="18" ry="24" fill="#FDE047" opacity="0.6" />

      {/* Expressive Living Eyes */}
      <g transform={`scale(1, ${blinkScale})`}>
        <circle cx="-12" cy="-12" r="6" fill="#0F172A" />
        <circle cx="-10" cy="-14" r="2.2" fill="#FFFFFF" />
        <circle cx="12" cy="-12" r="6" fill="#0F172A" />
        <circle cx="14" cy="-14" r="2.2" fill="#FFFFFF" />
      </g>
      <path d="M -12 8 Q 0 20 12 8" fill="none" stroke="#7C2D12" strokeWidth="3.8" strokeLinecap="round" />

      {/* Lantern Base with Name */}
      <rect x="-36" y="34" width="72" height="22" rx="6" fill="#B45309" stroke="#FFD600" strokeWidth="2.6" />
      <text
        x="0"
        y="49"
        textAnchor="middle"
        fill="#FFF8E7"
        fontSize="11.5"
        fontWeight="bold"
      >
        বিদ্যুৎ বন্ধু
      </text>

      {/* Stop Sign / Safety Shield */}
      {holdingStopSign && (
        <g transform="translate(64, -10)">
          <circle cx="0" cy="0" r="28" fill="#DC2626" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M -12 -12 L 12 12 M 12 -12 L -12 12" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};
