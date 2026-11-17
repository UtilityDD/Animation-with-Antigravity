import React from 'react';

/**
 * Geometric WBSEDCL Utility Pole with Live Wire Snap Physics
 */
export const GeometricUtilityPole: React.FC<{
  x: number;
  y: number;
  wireSnapped?: boolean;
  sparkFrame?: number;
}> = ({ x, y, wireSnapped = false, sparkFrame = 0 }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Concrete Pole */}
      <polygon points="-10,220 -6,-260 6,-260 10,220" fill="#64748B" stroke="#180A59" strokeWidth="2.5" />
      {/* 440V Danger Plate */}
      <rect x="-14" y="-60" width="28" height="42" rx="3" fill="#FFD244" stroke="#09134B" strokeWidth="2" />
      <text x="0" y="-42" textAnchor="middle" fill="#09134B" fontSize="9" fontWeight="bold">440V</text>
      <text x="0" y="-26" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold">বিপদ</text>

      {/* Cross-arm */}
      <rect x="-70" y="-235" width="140" height="12" rx="3" fill="#334155" />
      {[-55, 0, 55].map((ix, i) => (
        <circle key={i} cx={ix} cy="-242" r="8" fill="#B45309" stroke="#78350F" strokeWidth="2" />
      ))}

      {/* Left Intact Line */}
      <path d="M -55 -242 Q -300 -210 -600 -230" fill="none" stroke="#09134B" strokeWidth="3.5" />

      {/* Right Wire */}
      {!wireSnapped ? (
        <path d="M 55 -242 Q 300 -210 600 -230" fill="none" stroke="#09134B" strokeWidth="3.5" />
      ) : (
        <g>
          {/* Snapped Wire Falling into Puddle */}
          <path
            d={`M 55 -242 Q ${90 + Math.sin(sparkFrame * 0.4) * 16} -60 125 180`}
            fill="none"
            stroke="#09134B"
            strokeWidth="4"
          />
          <path
            d={`M 55 -242 Q ${90 + Math.sin(sparkFrame * 0.4) * 16} -60 125 180`}
            fill="none"
            stroke="#22D7DA"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* High-Voltage Electric Arc in Puddle */}
          <g transform="translate(125, 180)">
            <circle cx="0" cy="0" r={22 + (sparkFrame % 5) * 8} fill="rgba(34, 215, 218, 0.35)" />
            <circle cx="0" cy="0" r={10} fill="#FFD244" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
              const rad = ((ang + sparkFrame * 22) * Math.PI) / 180;
              const len = 20 + ((sparkFrame * 6 + i * 10) % 24);
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={Math.cos(rad) * len}
                  y2={Math.sin(rad) * len}
                  stroke={i % 2 === 0 ? '#22D7DA' : '#FFD244'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        </g>
      )}
    </g>
  );
};

/**
 * Step Potential (ধাপ বিভব) Scientific Infographic Diagram Card
 */
export const StepPotentialInfographic: React.FC<{
  x: number;
  y: number;
  scale?: number;
  frame?: number;
}> = ({ x, y, scale = 1, frame = 0 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Container Card */}
      <rect x="-420" y="-170" width="840" height="340" rx="20" fill="#09134B" stroke="#FFD244" strokeWidth="3.5" />

      {/* Header */}
      <text x="0" y="-130" textAnchor="middle" fill="#FFD244" fontSize="24" fontWeight="800">
        ⚡ ধাপ বিভব (STEP POTENTIAL) বৈজ্ঞানিক বিশ্লেষণ
      </text>

      {/* Left Comparison: Wide Stride Walking ❌ */}
      <g transform="translate(-210, -20)">
        <rect x="-180" y="-70" width="360" height="210" rx="14" fill="rgba(239, 68, 68, 0.16)" stroke="#EF4444" strokeWidth="2" />
        <text x="0" y="-45" textAnchor="middle" fill="#FCA5A5" fontSize="16" fontWeight="bold">
          ❌ সাধারণ হাঁটা (বিপজ্জনক লুপ)
        </text>

        {/* Legs spanning voltage gradient */}
        <ellipse cx="0" cy="85" rx="140" ry="16" fill="rgba(239, 68, 68, 0.25)" />
        <path d="M -50 85 L 0 0 L 50 85" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M -50 85 L 0 0 L 50 85"
          fill="none"
          stroke="#22D7DA"
          strokeWidth="3.5"
          strokeDasharray="6 4"
        />
        <text x="-50" y="112" textAnchor="middle" fill="#FFD244" fontSize="12" fontWeight="bold">V₁ = 8,000V</text>
        <text x="50" y="112" textAnchor="middle" fill="#FFD244" fontSize="12" fontWeight="bold">V₂ = 4,500V</text>
        <text x="0" y="38" textAnchor="middle" fill="#EF4444" fontSize="13" fontWeight="bold">
          ΔV = 3,500V শরীর দিয়ে প্রবাহিত!
        </text>
      </g>

      {/* Right Comparison: Joined Feet Bunny Hop ✔️ */}
      <g transform="translate(210, -20)">
        <rect x="-180" y="-70" width="360" height="210" rx="14" fill="rgba(34, 215, 218, 0.16)" stroke="#22D7DA" strokeWidth="2" />
        <text x="0" y="-45" textAnchor="middle" fill="#22D7DA" fontSize="16" fontWeight="bold">
          ✔️ খরগোশ লাফ (Bunny Hop)
        </text>

        {/* Joined Feet at same equipotential ring */}
        <ellipse cx="0" cy="85" rx="140" ry="16" fill="rgba(34, 215, 218, 0.2)" />
        <line x1="-8" y1="85" x2="-8" y2="0" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <line x1="8" y1="85" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="0" cy="85" rx="22" ry="8" fill="none" stroke="#FFD244" strokeWidth="3" />

        <text x="0" y="38" textAnchor="middle" fill="#22D7DA" fontSize="13" fontWeight="bold">
          V₁ = V₂ → ΔV = 0V (নিরাপদ!)
        </text>
        <text x="0" y="112" textAnchor="middle" fill="#8CAAF7" fontSize="11" fontWeight="bold">
          অন্তত ১০ মিটার (৩০ ফুট) দূরে যাও
        </text>
      </g>
    </g>
  );
};
