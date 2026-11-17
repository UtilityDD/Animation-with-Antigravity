import React from 'react';
import { AmberGem, EASE_OUT, ci, rnd } from '../scene1/Scene1Shared';

/**
 * 1600: William Gilbert — Amber approaches Versorium -> Invisible Field Pulls Needle
 */
export const GilbertVersoriumSVG: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  // Amber glides in from far left (local 15..90), causing needle to swing toward it
  const amberX = ci(local, [10, 85], [-340, -210], EASE_OUT);
  const pull = ci(local, [35, 115], [0, 1], EASE_OUT);
  const needleAngle =
    ci(local, [35, 115, 180], [-58, 24, 20], EASE_OUT) + Math.sin(local * 0.14) * 2.5 * pull;
  const fieldPulse = (0.35 + 0.35 * Math.sin(frame * 0.12)) * pull;

  return (
    <svg width="700" height="540" viewBox="-350 -270 700 540" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="brass3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="75%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="steelNeedle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
      </defs>

      {/* Contact shadow */}
      <ellipse cx="0" cy="175" rx="135" ry="22" fill="#000" opacity="0.55" />

      {/* Engraved Wood & Brass Pedestal */}
      <path d="M -110,170 L -85,135 L 85,135 L 110,170 Z" fill="#451A03" stroke="#92400E" strokeWidth="2" />
      <path d="M -72,135 L -48,105 L 48,105 L 72,135 Z" fill="url(#brass3d)" />
      {/* Degree Dial Ring */}
      <ellipse cx="0" cy="105" rx="56" ry="14" fill="#1E293B" stroke="url(#brass3d)" strokeWidth="2.5" />
      <rect x="-7" y="-25" width="14" height="130" rx="5" fill="url(#brass3d)" />
      {/* Glass Dome Silhouette */}
      <path
        d="M -175,105 C -175,-125 175,-125 175,105"
        fill="rgba(186, 230, 253, 0.04)"
        stroke="rgba(186, 230, 253, 0.22)"
        strokeWidth="2"
      />

      {/* Conceptual Electrostatic Attraction Arcs from Amber to Needle Tip */}
      {[-28, 0, 28].map((dy, i) => (
        <path
          key={i}
          d={`M -175,-85 Q -120,${-75 + dy} -95,${-38 + dy * 0.4}`}
          fill="none"
          stroke="#FBBF24"
          strokeWidth="1.8"
          strokeDasharray="6 6"
          strokeDashoffset={-(frame * 0.8) % 24}
          opacity={fieldPulse}
        />
      ))}

      {/* Pivoting Versorium Needle */}
      <g transform={`translate(0, -25) rotate(${needleAngle})`}>
        <polygon points="-148,0 0,-13 0,13" fill="url(#brass3d)" stroke="#FEF3C7" strokeWidth="1" />
        <polygon points="148,0 0,-13 0,13" fill="url(#steelNeedle)" stroke="#FFFFFF" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="13" fill="url(#brass3d)" stroke="#FEF3C7" strokeWidth="1.5" />
        <circle cx="-3" cy="-3" r="4" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* Charged Amber Approaching & Attracting the Needle */}
      <g transform={`translate(${amberX}, -95)`}>
        <AmberGem id="s2GilbertAmber" size={105} glow={0.9} charge={0.85} />
      </g>
    </svg>
  );
};

/**
 * 1745: Leyden Jar — Jar charges up -> Grounding probe swings in -> Spark discharges!
 */
export const LeydenJarSVG: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const chargeUp = ci(local, [15, 155], [0.15, 0.94], EASE_OUT);
  const dischargeDip = ci(local, [185, 225], [0, 0.28], EASE_OUT);
  const fillLevel = Math.max(0.15, chargeUp - dischargeDip);
  const probeAngle = ci(local, [130, 185], [32, 0], EASE_OUT);
  const sparkOn = local > 180 && local < 235 && Math.sin(frame * 1.1) > -0.2;

  return (
    <svg width="680" height="540" viewBox="-340 -270 680 540" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.42" />
          <stop offset="22%" stopColor="#7DD3FC" stopOpacity="0.12" />
          <stop offset="78%" stopColor="#38BDF8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="foilMetal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="35%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="plasmaCore" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      <ellipse cx="0" cy="192" rx="135" ry="22" fill="#000" opacity="0.6" />

      {/* Inner Stored Charge Plasma */}
      <rect
        x="-92"
        y={170 - fillLevel * 225}
        width="184"
        height={fillLevel * 225}
        rx="14"
        fill="url(#plasmaCore)"
      />

      {/* Brass Conducting Rod & Hanging Chain inside */}
      <rect x="-7" y="-210" width="14" height="310" rx="5" fill="#F59E0B" />
      <path d="M 0,95 Q 16,135 4,172" fill="none" stroke="#FBBF24" strokeWidth="4" strokeDasharray="5 4" />

      {/* Outer Foil Layer (Negative Charges) */}
      <path
        d="M -102,28 L 102,28 L 102,166 Q 102,186 80,186 L -80,186 Q -102,186 -102,166 Z"
        fill="url(#foilMetal)"
        opacity="0.92"
      />
      {/* Glass Jar Silhouette & Specular Glare */}
      <rect
        x="-106"
        y="-115"
        width="212"
        height="304"
        rx="26"
        fill="url(#glassBody)"
        stroke="#BAE6FD"
        strokeWidth="2.5"
      />
      <rect x="-86" y="-92" width="14" height="240" rx="7" fill="#FFFFFF" opacity="0.24" />

      {/* Wooden Insulating Cork */}
      <path d="M -68,-102 L -56,-132 L 56,-132 L 68,-102 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />

      {/* Brass Terminal Sphere */}
      <circle cx="0" cy="-215" r="26" fill="#FBBF24" stroke="#FEF3C7" strokeWidth="2" />
      <circle cx="-8" cy="-224" r="7" fill="#FFFFFF" opacity="0.75" />

      {/* Conceptual Separated Charges (+ inside, - on outer foil) */}
      <g opacity={fillLevel}>
        {[-55, -15, 25].map((cy, idx) => (
          <g key={idx} transform={`translate(${idx % 2 === 0 ? -42 : 42}, ${cy})`}>
            <circle cx="0" cy="0" r="12" fill="rgba(245, 158, 11, 0.28)" stroke="#FBBF24" strokeWidth="1.5" />
            <text x="0" y="5" textAnchor="middle" fill="#FEF08A" fontSize="16" fontWeight="700">+</text>
          </g>
        ))}
        {[-65, 0, 65].map((cx, idx) => (
          <g key={idx} transform={`translate(${cx}, 115)`}>
            <circle cx="0" cy="0" r="12" fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="0" y="5" textAnchor="middle" fill="#E0F2FE" fontSize="18" fontWeight="700">−</text>
          </g>
        ))}
      </g>

      {/* Grounded Discharge Probe swinging in + Crisp Electric Arc */}
      <g transform={`translate(155, -145) rotate(${probeAngle}, 45, 120)`}>
        <line x1="0" y1="0" x2="45" y2="120" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
        <circle cx="0" cy="0" r="14" fill="#CBD5E1" />
      </g>
      {sparkOn && (
        <path
          d="M 26,-212 L 72,-195 L 62,-176 L 108,-168 L 104,-154 L 144,-146"
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="drop-shadow(0 0 14px #38BDF8)"
        />
      )}
    </svg>
  );
};

/**
 * 1752: Benjamin Franklin — Storm Cloud Charge Polarization + Kite + Lightning Bolt
 */
export const FranklinKiteSVG: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const boltFlash = (local > 105 && local < 142) || (local > 225 && local < 262) ? 1 : 0;
  const kiteBob = Math.sin(frame * 0.08) * 9;
  const tailWave = Math.sin(frame * 0.16) * 14;

  return (
    <svg width="760" height="560" viewBox="-380 -280 760 560" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="stormCloudTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="55%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#090D16" />
        </linearGradient>
        <radialGradient id="boltGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric Flash Glow during strike */}
      {boltFlash > 0 && <circle cx="-20" cy="0" r="320" fill="url(#boltGlow)" />}

      {/* Subtle Rain Streaks */}
      {Array.from({ length: 18 }).map((_, i) => {
        const rx = -240 + rnd(i * 5) * 480;
        const ry = -130 + ((frame * 9 + rnd(i * 9) * 340) % 340);
        return (
          <line
            key={i}
            x1={rx}
            y1={ry}
            x2={rx - 10}
            y2={ry + 24}
            stroke="#64748B"
            strokeWidth="1.3"
            opacity="0.35"
          />
        );
      })}

      {/* Layered Cumulonimbus Storm Cloud */}
      <g transform="translate(0, -150)">
        <path
          d="M -210,45 C -235,10 -205,-35 -155,-32 C -135,-82 -60,-98 -5,-68 C 45,-105 135,-85 162,-32 C 215,-28 238,15 205,48 Z"
          fill="url(#stormCloudTop)"
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Conceptual Negative Charges along cloud base */}
        {[-120, -45, 35, 115].map((cx) => (
          <g key={cx} transform={`translate(${cx}, 26)`}>
            <circle cx="0" cy="0" r="11" fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" strokeWidth="1.3" />
            <text x="0" y="4.5" textAnchor="middle" fill="#BAE6FD" fontSize="15" fontWeight="700">−</text>
          </g>
        ))}
      </g>

      {/* Wet Conducting Hemp String */}
      <path
        d={`M 65,${-55 + kiteBob} Q -10,65 -115,175`}
        fill="none"
        stroke={boltFlash > 0 ? '#FEF08A' : '#94A3B8'}
        strokeWidth={boltFlash > 0 ? '3.5' : '2.2'}
        strokeDasharray={boltFlash > 0 ? undefined : '6 4'}
      />

      {/* Detailed Kite with Wooden Spar & Fluttering Tail Ribbons */}
      <g transform={`translate(75, ${-82 + kiteBob}) rotate(-18)`}>
        <polygon points="0,-68 50,0 0,82 -50,0" fill="#B91C1C" stroke="#FDE047" strokeWidth="2.5" />
        <polygon points="0,-68 50,0 0,0" fill="#DC2626" />
        <polygon points="0,82 -50,0 0,0" fill="#991B1B" />
        <line x1="0" y1="-68" x2="0" y2="82" stroke="#FDE68A" strokeWidth="2" />
        <line x1="-50" y1="0" x2="50" y2="0" stroke="#FDE68A" strokeWidth="2" />
        {/* Fluttering Kite Tail */}
        <path
          d={`M 0,82 Q ${-18 + tailWave},115 ${8 - tailWave},145 Q ${22 + tailWave},170 ${-5},195`}
          fill="none"
          stroke="#FBBF24"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Brass Key + Induced Positive Spark */}
      <g transform="translate(-115, 175)">
        <circle cx="0" cy="0" r="15" fill="none" stroke="#FBBF24" strokeWidth="5" />
        <line x1="0" y1="15" x2="0" y2="54" stroke="#FBBF24" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="0" y1="40" x2="14" y2="40" stroke="#FBBF24" strokeWidth="4.5" />
        <circle cx="0" cy="0" r="22" fill="none" stroke="#FEF08A" strokeWidth="1.5" opacity={boltFlash} />
      </g>

      {/* Branching Jagged Lightning Bolt */}
      {boltFlash > 0 && (
        <g filter="drop-shadow(0 0 18px #FACC15)">
          <path
            d="M -55,-118 L -18,-62 L -46,-54 L 10,16 L -22,28 L -110,168"
            fill="none"
            stroke="#FEF9C3"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M -18,-62 L 24,-32 L 16,-14" fill="none" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

/**
 * 1800: Alessandro Volta — Voltaic Pile (Copper/Zinc/Brine Stack + Continuous Electron Flow)
 */
export const VoltaicPileSVG: React.FC<{ frame: number }> = ({ frame }) => {
  const flow = (frame * 2.4) % 44;

  return (
    <svg width="700" height="540" viewBox="-350 -270 700 540" style={{ overflow: 'visible' }}>
      <ellipse cx="0" cy="188" rx="145" ry="22" fill="#000" opacity="0.55" />

      {/* Wooden Base & Glass Support Rods */}
      <rect x="-125" y="155" width="250" height="26" rx="6" fill="#451A03" stroke="#78350F" strokeWidth="2" />
      <rect x="-105" y="-155" width="10" height="310" rx="4" fill="rgba(186,230,253,0.28)" />
      <rect x="95" y="-155" width="10" height="310" rx="4" fill="rgba(186,230,253,0.28)" />

      {/* Alternating Copper, Brine Cloth, and Zinc Discs */}
      {Array.from({ length: 7 }).map((_, i) => {
        const y = 128 - i * 38;
        const isCu = i % 2 === 0;
        return (
          <g key={i} transform={`translate(0, ${y})`}>
            {/* Brine-soaked cloth pad */}
            <ellipse cx="0" cy="12" rx="80" ry="13" fill="#065F46" />
            {/* Metallic Disc */}
            <ellipse cx="0" cy="4" rx="86" ry="15" fill={isCu ? '#92400E' : '#475569'} />
            <rect x="-86" y="-8" width="172" height="12" fill={isCu ? '#D97706' : '#94A3B8'} />
            <ellipse cx="0" cy="-8" rx="86" ry="15" fill={isCu ? '#F59E0B' : '#CBD5E1'} />
          </g>
        );
      })}

      {/* + and - Terminal Badges */}
      <g transform="translate(-135, -108)">
        <circle cx="0" cy="0" r="18" fill="rgba(245, 158, 11, 0.25)" stroke="#FBBF24" strokeWidth="2" />
        <text x="0" y="7" textAnchor="middle" fill="#FEF08A" fontSize="22" fontWeight="700">+</text>
      </g>
      <g transform="translate(-135, 128)">
        <circle cx="0" cy="0" r="18" fill="rgba(52, 211, 153, 0.25)" stroke="#34D399" strokeWidth="2" />
        <text x="0" y="7" textAnchor="middle" fill="#A7F3D0" fontSize="24" fontWeight="700">−</text>
      </g>

      {/* Continuous Closed Circuit Loop with Glowing Electron Dots */}
      <path
        d="M 86,-108 L 210,-108 L 210,128 L 86,128"
        fill="none"
        stroke="#064E3B"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 86,-108 L 210,-108 L 210,128 L 86,128"
        fill="none"
        stroke="#34D399"
        strokeWidth="4"
        strokeDasharray="12 10"
        strokeDashoffset={flow}
        filter="drop-shadow(0 0 10px #10B981)"
      />
    </svg>
  );
};

/**
 * 1820: Oersted — Current OFF (0° North) -> Current switches ON -> Field Rings expand -> Needle deflects!
 */
export const OerstedCompassSVG: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const currentOn = ci(local, [35, 55], [0, 1], EASE_OUT);
  const deflect = ci(local, [48, 115], [0, 76], EASE_OUT) + Math.sin(local * 0.16) * 3.5 * currentOn;
  const flow = (frame * 3) % 36;
  const ringPulse = (frame * 0.6) % 24;

  return (
    <svg width="700" height="540" viewBox="-350 -270 700 540" style={{ overflow: 'visible' }}>
      {/* Brass Compass Case below wire */}
      <ellipse cx="0" cy="182" rx="135" ry="20" fill="#000" opacity="0.55" />
      <circle cx="0" cy="52" r="126" fill="#0F172A" stroke="#D97706" strokeWidth="5" />
      <circle cx="0" cy="52" r="110" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      {/* Cardinal Ticks */}
      {[0, 90, 180, 270].map((a) => (
        <line
          key={a}
          x1="0"
          y1="-54"
          x2="0"
          y2="-42"
          stroke="#94A3B8"
          strokeWidth="2.5"
          transform={`rotate(${a}, 0, 52)`}
        />
      ))}

      {/* Deflecting Magnetic Needle */}
      <g transform={`translate(0, 52) rotate(${deflect})`}>
        <polygon points="0,-92 13,0 -13,0" fill="#EF4444" />
        <polygon points="0,92 13,0 -13,0" fill="#E2E8F0" />
        <circle cx="0" cy="0" r="10" fill="#FBBF24" />
      </g>

      {/* Concentric Circular Magnetic Field Rings (appear when current switches ON) */}
      <g opacity={currentOn}>
        {[-110, 0, 110].map((wx) => (
          <g key={wx} transform={`translate(${wx}, -95)`}>
            <ellipse
              cx="0"
              cy="0"
              rx={22 + ringPulse * 0.3}
              ry={54 + ringPulse * 0.6}
              fill="none"
              stroke="#F472B6"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity={0.75 - ringPulse * 0.02}
            />
          </g>
        ))}
      </g>

      {/* Current-Carrying Copper Wire */}
      <line x1="-265" y1="-95" x2="265" y2="-95" stroke="#B45309" strokeWidth="14" strokeLinecap="round" />
      {currentOn > 0.02 && (
        <line
          x1="-255"
          y1="-95"
          x2="255"
          y2="-95"
          stroke="#F472B6"
          strokeWidth="4.5"
          strokeDasharray="16 14"
          strokeDashoffset={-flow}
          opacity={currentOn}
          filter="drop-shadow(0 0 10px #EC4899)"
        />
      )}
    </svg>
  );
};

/**
 * 1831: Michael Faraday — Moving Magnet Flux Lines Inducing Current in Coil + Bulb
 */
export const FaradayInductionSVG: React.FC<{ frame: number }> = ({ frame }) => {
  const magX = -175 + Math.sin(frame * 0.11) * 95;
  const induced = Math.abs(Math.cos(frame * 0.11));

  return (
    <svg width="720" height="540" viewBox="-360 -270 720 540" style={{ overflow: 'visible' }}>
      {/* Magnetic Flux Loops radiating around Bar Magnet */}
      <g transform={`translate(${magX}, 35)`} opacity="0.55">
        <ellipse cx="0" cy="0" rx="135" ry="62" fill="none" stroke="#60A5FA" strokeWidth="1.6" strokeDasharray="6 6" />
        <ellipse cx="0" cy="0" rx="170" ry="96" fill="none" stroke="#F87171" strokeWidth="1.4" strokeDasharray="6 6" />
      </g>

      {/* Hollow Core & Copper Coil Windings */}
      <rect x="-85" y="-22" width="170" height="114" rx="12" fill="rgba(30, 41, 59, 0.6)" stroke="#475569" strokeWidth="2" />
      {[-60, -30, 0, 30, 60].map((cx) => (
        <ellipse key={cx} cx={cx} cy="35" rx="20" ry="74" fill="none" stroke="#F59E0B" strokeWidth="7.5" />
      ))}

      {/* Moving N/S Bar Magnet */}
      <g transform={`translate(${magX}, 35)`}>
        <rect x="-82" y="-22" width="82" height="44" rx="4" fill="#DC2626" stroke="#FCA5A5" strokeWidth="1.2" />
        <rect x="0" y="-22" width="82" height="44" rx="4" fill="#2563EB" stroke="#93C5FD" strokeWidth="1.2" />
        <text x="-42" y="8" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="700">N</text>
        <text x="42" y="8" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="700">S</text>
      </g>

      {/* Circuit Wires up to Vintage Filament Bulb */}
      <path d="M -60,-39 L -60,-125 L -16,-125" fill="none" stroke="#F59E0B" strokeWidth="4" />
      <path d="M 60,-39 L 60,-125 L 16,-125" fill="none" stroke="#F59E0B" strokeWidth="4" />

      {/* Bulb Glow & Filament */}
      <circle cx="0" cy="-155" r={45 + induced * 45} fill="#A78BFA" opacity={0.28 * induced} />
      <circle cx="0" cy="-155" r="36" fill="#FEF08A" fillOpacity={0.18 + induced * 0.72} stroke="#CBD5E1" strokeWidth="2.5" />
      <path
        d="M -10,-128 L -6,-156 L 0,-148 L 6,-156 L 10,-128"
        fill="none"
        stroke={induced > 0.3 ? '#FFFFFF' : '#64748B'}
        strokeWidth="2.8"
      />
    </svg>
  );
};

/**
 * 1897: J.J. Thomson — Straight beam -> Plates charge ON -> Beam bends toward (+) proving negative charge!
 */
export const ThomsonCathodeSVG: React.FC<{ frame: number; local: number }> = ({ local }) => {
  const voltageOn = ci(local, [45, 110], [0, 1], EASE_OUT);
  const bend = -54 * voltageOn + Math.sin(local * 0.09) * 6 * voltageOn;

  return (
    <svg width="760" height="540" viewBox="-380 -270 760 540" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="tubeGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#99F6E4" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#0F172A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Crookes Glass Tube Silhouette */}
      <path
        d="M -300,-42 L -75,-42 L 90,-124 L 295,-124 Q 328,0 295,124 L 90,124 L -75,42 L -300,42 Z"
        fill="url(#tubeGlass)"
        stroke="#5EEAD4"
        strokeWidth="2.5"
      />
      {/* Specular Glass Highlight */}
      <path d="M -280,-30 L -75,-30 L 90,-108 L 275,-108" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.25" />

      {/* Cathode (-) & Slit Anode (+) Plates */}
      <rect x="-272" y="-24" width="12" height="48" rx="3" fill="#F59E0B" />
      <rect x="-155" y="-34" width="10" height="24" fill="#94A3B8" />
      <rect x="-155" y="10" width="10" height="24" fill="#94A3B8" />

      {/* Parallel Electric Deflection Plates (+ / -) lighting up when voltage turns ON */}
      <rect x="-25" y="-68" width="95" height="12" rx="3" fill="#F87171" opacity={0.45 + 0.55 * voltageOn} />
      <rect x="-25" y="56" width="95" height="12" rx="3" fill="#38BDF8" opacity={0.45 + 0.55 * voltageOn} />
      <text x="22" y="-78" textAnchor="middle" fill="#FCA5A5" fontSize="18" fontWeight="700" opacity={voltageOn}>+</text>
      <text x="22" y="88" textAnchor="middle" fill="#BAE6FD" fontSize="20" fontWeight="700" opacity={voltageOn}>−</text>

      {/* Glowing Phosphor Screen Dot */}
      <ellipse cx="294" cy={bend} rx="8" ry="20" fill="#2DD4BF" opacity="0.65" filter="drop-shadow(0 0 14px #14B8A6)" />

      {/* Continuous Deflected Electron Ray */}
      <path
        d={`M -260,0 L -45,0 Q 115,${bend * 0.45} 290,${bend}`}
        fill="none"
        stroke="#2DD4BF"
        strokeWidth="5"
        filter="drop-shadow(0 0 14px #14B8A6)"
      />

      {/* Racing Electron Particles */}
      {Array.from({ length: 7 }).map((_, i) => {
        const t = (local * 0.03 + i * 0.14) % 1;
        const ex = -255 + t * 540;
        const ey = t < 0.39 ? 0 : Math.pow((t - 0.39) / 0.61, 1.45) * bend;
        return <circle key={i} cx={ex} cy={ey} r="5.5" fill="#FFFFFF" filter="drop-shadow(0 0 8px #2DD4BF)" />;
      })}
    </svg>
  );
};
