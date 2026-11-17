import React from 'react';

/**
 * Rural West Bengal Mud & Terracotta Hut (মাটির বাড়ি) with Alpana motifs
 */
export const BengalMudHut: React.FC<{ x: number; y: number; scale?: number; variant?: 'thatch' | 'tile' }> = ({
  x,
  y,
  scale = 1,
  variant = 'thatch',
}) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Mud Plinth Base */}
      <rect x="-150" y="95" width="300" height="32" rx="6" fill="#7C2D12" stroke="#451A03" strokeWidth="3" />
      {/* Terracotta Mud Walls */}
      <rect x="-130" y="-30" width="260" height="128" fill="#C47A53" stroke="#451A03" strokeWidth="3" />

      {/* Traditional White Alpana Decorative Strip */}
      <path
        d="M -125 82 Q -105 70 -85 82 T -45 82 T -5 82 T 35 82 T 75 82 T 115 82"
        fill="none"
        stroke="#FFF8E7"
        strokeWidth="2.5"
        opacity="0.85"
      />

      {/* Wooden Door & Latticed Windows */}
      <rect x="-26" y="12" width="52" height="84" rx="4" fill="#451A03" stroke="#FFD600" strokeWidth="2" />
      <rect x="-95" y="10" width="44" height="44" rx="4" fill="#291509" stroke="#FFF8E7" strokeWidth="2.5" />
      <line x1="-73" y1="10" x2="-73" y2="54" stroke="#FFF8E7" strokeWidth="2" />
      <line x1="-95" y1="32" x2="-51" y2="32" stroke="#FFF8E7" strokeWidth="2" />

      <rect x="51" y="10" width="44" height="44" rx="4" fill="#291509" stroke="#FFF8E7" strokeWidth="2.5" />
      <line x1="73" y1="10" x2="73" y2="54" stroke="#FFF8E7" strokeWidth="2" />
      <line x1="51" y1="32" x2="95" y2="32" stroke="#FFF8E7" strokeWidth="2" />

      {/* Curved Bengal Chala Roof (চারচালা ছাদ) */}
      <path
        d="M -165 -22 Q 0 -135 165 -22 Q 0 -42 -165 -22 Z"
        fill={variant === 'thatch' ? '#CA8A04' : '#9A3412'}
        stroke="#451A03"
        strokeWidth="3.5"
      />
      <path
        d="M -140 -36 Q 0 -115 140 -36"
        fill="none"
        stroke="#FEF08A"
        strokeWidth="2"
        opacity="0.5"
      />
    </g>
  );
};

/**
 * Rural Primary School Building (পূর্ব বর্ধমান প্রাথমিক বিদ্যালয়)
 */
export const VillagePrimarySchool: React.FC<{ x: number; y: number; scale?: number; bellSwing?: number }> = ({
  x,
  y,
  scale = 1,
  bellSwing = 0,
}) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Plinth */}
      <rect x="-260" y="120" width="520" height="30" fill="#78350F" stroke="#451A03" strokeWidth="3" />
      {/* School Main Wall */}
      <rect x="-240" y="-50" width="480" height="170" fill="#FFF8E7" stroke="#1E3A8A" strokeWidth="3.5" />
      {/* Blue Dado Trim (WB Govt School Aesthetic) */}
      <rect x="-240" y="65" width="480" height="55" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="3" />

      {/* Terracotta Roof */}
      <polygon points="-270,-50 0,-130 270,-50" fill="#9A3412" stroke="#451A03" strokeWidth="3.5" />

      {/* School Name Signboard in Bengali */}
      <rect x="-175" y="-36" width="350" height="38" rx="6" fill="#1E3A8A" stroke="#FFD600" strokeWidth="2.5" />
      <text
        x="0"
        y="-11"
        textAnchor="middle"
        fill="#FFD600"
        fontSize="19"
        fontWeight="bold"
      >
        শুকতারা প্রাথমিক বিদ্যালয় • পূর্ব বর্ধমান
      </text>

      {/* Veranda Pillars & Arches */}
      {[-150, 0, 150].map((px, i) => (
        <g key={i} transform={`translate(${px}, 0)`}>
          <rect x="-32" y="15" width="64" height="105" rx="6" fill="#0F172A" />
          <rect x="-120" y="10" width="18" height="110" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="2" />
        </g>
      ))}

      {/* Brass School Bell hanging on Veranda */}
      <g transform={`translate(205, 8) rotate(${bellSwing})`}>
        <line x1="0" y1="0" x2="0" y2="24" stroke="#451A03" strokeWidth="3" />
        <path d="M -14 42 L 14 42 L 8 22 L -8 22 Z" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
        <circle cx="0" cy="44" r="4" fill="#CA8A04" />
      </g>
    </g>
  );
};

/**
 * WBSEDCL Concrete Utility Pole with Porcelain Insulators & Snapped Wire Physics
 */
export const ConcreteElectricPole: React.FC<{
  x: number;
  y: number;
  scale?: number;
  wireSnapped?: boolean;
  snapProgress?: number; // 0 to 1
  sparkFrame?: number;
}> = ({ x, y, scale = 1, wireSnapped = false, snapProgress = 0, sparkFrame = 0 }) => {
  const fallenEndX = 110 + snapProgress * 45;
  const fallenEndY = -210 + snapProgress * 375;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Concrete Pole Column */}
      <polygon
        points="-12,180 -8,-240 8,-240 12,180"
        fill="#94A3B8"
        stroke="#334155"
        strokeWidth="2.8"
      />
      {/* Danger Plate & WBSEDCL Stencil */}
      <rect x="-15" y="-50" width="30" height="48" rx="3" fill="#FFD600" stroke="#0F172A" strokeWidth="2" />
      <text x="0" y="-30" textAnchor="middle" fill="#0F172A" fontSize="8.5" fontWeight="bold">
        440V
      </text>
      <text x="0" y="-14" textAnchor="middle" fill="#DC2626" fontSize="8" fontWeight="bold">
        বিপদ
      </text>

      {/* Steel Cross-Arm */}
      <rect x="-72" y="-215" width="144" height="10" rx="2" fill="#475569" stroke="#1E293B" strokeWidth="2" />

      {/* Brown Porcelain Pin Insulators */}
      {[-55, 0, 55].map((ix, idx) => (
        <g key={idx} transform={`translate(${ix}, -228)`}>
          <ellipse cx="0" cy="0" rx="9" ry="5" fill="#7C2D12" stroke="#451A03" strokeWidth="1.5" />
          <ellipse cx="0" cy="6" rx="11" ry="5" fill="#9A3412" stroke="#451A03" strokeWidth="1.5" />
        </g>
      ))}

      {/* Intact Left Overhead Lines */}
      <path d="M -55 -230 Q -260 -200 -520 -225" fill="none" stroke="#0F172A" strokeWidth="3" />
      <path d="M 0 -230 Q -240 -195 -520 -215" fill="none" stroke="#0F172A" strokeWidth="3" />

      {/* Right Line: Either Intact or Snapped & Sparking in Puddle */}
      {!wireSnapped ? (
        <path d="M 55 -230 Q 260 -195 520 -220" fill="none" stroke="#0F172A" strokeWidth="3.2" />
      ) : (
        <g>
          {/* Snapped Live Wire Whipping Down */}
          <path
            d={`M 55 -230 Q ${85 + Math.sin(sparkFrame * 0.4) * 14} ${-60} ${fallenEndX} ${fallenEndY}`}
            fill="none"
            stroke="#0F172A"
            strokeWidth="3.8"
          />
          <path
            d={`M 55 -230 Q ${85 + Math.sin(sparkFrame * 0.4) * 14} ${-60} ${fallenEndX} ${fallenEndY}`}
            fill="none"
            stroke="#00F2FE"
            strokeWidth="1.8"
            opacity={0.75}
          />

          {/* High-Voltage Cyan & Yellow Sparks at Contact Point */}
          {snapProgress > 0.7 && (
            <g transform={`translate(${fallenEndX}, ${fallenEndY})`}>
              <circle
                cx="0"
                cy="0"
                r={18 + (sparkFrame % 5) * 6}
                fill="rgba(0, 242, 254, 0.35)"
              />
              <circle
                cx="0"
                cy="0"
                r={9 + (sparkFrame % 3) * 4}
                fill="#FFD600"
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
                const rad = ((ang + sparkFrame * 23) * Math.PI) / 180;
                const len = 18 + ((sparkFrame * 7 + i * 11) % 26);
                return (
                  <line
                    key={i}
                    x1="0"
                    y1="0"
                    x2={Math.cos(rad) * len}
                    y2={Math.sin(rad) * len}
                    stroke={i % 2 === 0 ? '#00F2FE' : '#FFD600'}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          )}
        </g>
      )}
    </g>
  );
};

/**
 * Tropical Banana & Bamboo Grove Cluster for Layer 0 / Layer 1
 */
export const BananaBambooGrove: React.FC<{ x: number; y: number; scale?: number; windSway?: number }> = ({
  x,
  y,
  scale = 1,
  windSway = 0,
}) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${windSway}, 0, 120)`}>
      {/* Bamboo Culms */}
      {[-35, -15, 8, 28].map((bx, i) => (
        <g key={i} transform={`translate(${bx}, 0) rotate(${(i - 1.5) * 4 + windSway * 0.4})`}>
          <line x1="0" y1="120" x2="0" y2="-160" stroke="#15803D" strokeWidth="7" strokeLinecap="round" />
          {[-120, -70, -20, 30, 80].map((ny, j) => (
            <line key={j} x1="-5" y1={ny} x2="5" y2={ny} stroke="#DCFCE7" strokeWidth="2" />
          ))}
        </g>
      ))}
      {/* Broad Lush Monsoon Green Banana Fronds (#2D5A27) */}
      {[
        { rot: -45, len: 130 },
        { rot: -15, len: 145 },
        { rot: 20, len: 140 },
        { rot: 52, len: 125 },
      ].map((leaf, idx) => (
        <g key={idx} transform={`translate(0, 20) rotate(${leaf.rot + windSway * 0.6})`}>
          <path
            d={`M 0 0 Q -28 ${-leaf.len * 0.5} 0 ${-leaf.len} Q 28 ${-leaf.len * 0.5} 0 0 Z`}
            fill="#2D5A27"
            stroke="#14532D"
            strokeWidth="2.5"
          />
          <line x1="0" y1="0" x2="0" y2={-leaf.len * 0.92} stroke="#86EFAC" strokeWidth="2" />
        </g>
      ))}
    </g>
  );
};

