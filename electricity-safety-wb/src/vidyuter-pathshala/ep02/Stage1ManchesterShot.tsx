import React from 'react';
import {
  DustMotes,
  EASE_INOUT,
  EASE_OUT,
  camAt,
  camTransform,
  ci,
} from '../historical/scene1/Scene1Shared';
import { MarsdenRig } from './MarsdenRig';

/**
 * Stage 1 (0..2586 local frames): 1909 Manchester Basement & Gold Foil Scattering
 * - 0..800f: Pitch-dark basement, radium emitter, 0.00004 cm gold foil, Geiger/Rutherford silhouettes & MarsdenRig
 * - 800..1240f: Animated Thought Bubble of Thomson's "Plum Pudding" expectation
 * - 1240..1755f: Macro close-up — microscope physically swings from forward zone to BEHIND foil -> silence -> TWO razor-sharp emerald FLASHES!
 * - 1755..2586f: Vintage sepia-ink engraving cut — 15-inch naval cannon shell violently rebounding off tissue paper!
 */
export const Stage1ManchesterShot: React.FC<{ frame: number; local: number }> = ({ frame, local }) => {
  const fadeIn = ci(local, [0, 22], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [2550, 2586], [1, 0], EASE_INOUT);

  const cam = camAt(local, [
    { f: 0, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 780, x: 960, y: 535, z: 1.04, sx: 960, sy: 540 },
    // Snappy 26f pan onto Marsden + Thought Bubble
    { f: 806, x: 1120, y: 475, z: 1.18, sx: 1020, sy: 520 },
    { f: 1220, x: 1120, y: 475, z: 1.2, sx: 1020, sy: 520 },
    // Snappy 26f macro zoom onto gold foil + rotating scintillation microscope
    { f: 1246, x: 640, y: 530, z: 1.65, sx: 960, sy: 540 },
    { f: 1735, x: 640, y: 530, z: 1.72, sx: 960, sy: 540 },
    // Snappy 24f cut to Vintage Engraving Naval Cannon Analogy
    { f: 1759, x: 960, y: 540, z: 1.0, sx: 960, sy: 540 },
    { f: 2586, x: 960, y: 535, z: 1.06, sx: 960, sy: 540 },
  ]);

  const isCannonCut = local >= 1755;
  // Microscope swings from forward zone (0 deg) behind the foil toward the gun (-142 deg) at 1290..1430f
  const scopeAngle = ci(local, [1290, 1430], [0, -142], EASE_INOUT);
  const flash1 = local >= 1555 && local < 1630 ? Math.sin(((local - 1555) / 75) * Math.PI) : 0;
  const flash2 = local >= 1650 && local < 1725 ? Math.sin(((local - 1650) / 75) * Math.PI) : 0;
  const reboundMoment = local >= 1555;
  const beamDash = (frame * 3.5) % 40;

  // Vintage engraving cannon shell animation (1830..2586)
  const fireOut = ci(local, [1860, 2110], [0, 1], EASE_OUT);
  const reboundBack = ci(local, [2110, 2400], [0, 1], EASE_OUT);
  const shellX = reboundBack > 0 ? 1310 - reboundBack * 860 : 480 + fireOut * 830;
  const shellY = reboundBack > 0 ? 510 - Math.sin(reboundBack * Math.PI) * 75 : 510 - Math.sin(fireOut * Math.PI) * 28;
  const cannonRecoil = fireOut > 0 && fireOut < 0.35 ? Math.sin((fireOut / 0.35) * Math.PI) * 22 : 0;
  const paperRipple = reboundBack > 0 && reboundBack < 0.4 ? Math.sin((reboundBack / 0.4) * Math.PI) * 14 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: isCannonCut
          ? 'radial-gradient(ellipse at 50% 45%, #E7D8BE 0%, #B89F78 82%, #78603E 100%)'
          : 'radial-gradient(ellipse at 42% 52%, #1C160C 0%, #05070C 78%)',
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
          transform: camTransform(cam),
          transformOrigin: '0 0',
        }}
      >
        {!isCannonCut ? (
          <>
            {/* Background Silhouettes of Hans Geiger & Ernest Rutherford observing */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: 0.32, pointerEvents: 'none' }}>
              <g transform="translate(1520, 470)">
                <circle cx="0" cy="-65" r="28" fill="#1E293B" />
                <path d="M -48,230 L -38,-28 Q 0,-42 38,-28 L 48,230 Z" fill="#1E293B" />
              </g>
              <g transform="translate(1660, 455)">
                <circle cx="0" cy="-68" r="30" fill="#0F172A" />
                <path d="M -52,245 L -40,-30 Q 0,-44 40,-30 L 52,245 Z" fill="#0F172A" />
              </g>
            </svg>

            {/* Grounded MarsdenRig behind Lab Bench */}
            <MarsdenRig
              pose={{
                worldX: 1120,
                worldY: 182,
                chestLeanDeg: reboundMoment ? 7 : -9,
                breathY: Math.sin(frame * 0.05) * 2,
                headRollDeg: reboundMoment ? 4 : -4,
                neckPitchDeg: reboundMoment ? -6 : 4,
                eyeLookX: -0.7,
                eyeLookY: 0.1,
                blinkAmount: frame % 160 > 153 ? 1 : 0,
                expression: reboundMoment ? 'shocked' : 'focused',
              }}
              scale={0.74}
            />

            {/* Lab Workbench & 1909 Brass Gold-Foil Apparatus */}
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
              <defs>
                <radialGradient id="amberMicroGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect x="-100" y="700" width="2120" height="440" fill="#1B130B" stroke="#451A03" strokeWidth="4" />
              <circle cx="640" cy="540" r="320" fill="url(#amberMicroGlow)" />

              {/* Brass Radium-Emanation Emitter */}
              <g transform="translate(310, 540)">
                <rect x="-65" y="-46" width="115" height="92" rx="8" fill="#78350F" stroke="#FBBF24" strokeWidth="3" />
                <rect x="46" y="-14" width="36" height="28" fill="#D97706" stroke="#FDE047" strokeWidth="2" />
                <text x="-8" y="88" textAnchor="middle" fill="#FDE68A" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  আলফা উৎস
                </text>
              </g>

              {/* Alpha Particle Beam */}
              <line x1="395" y1="540" x2="646" y2="540" stroke="#38BDF8" strokeWidth="3.5" strokeDasharray="10 10" strokeDashoffset={-beamDash} opacity="0.72" />

              {/* Ultra-thin Hammered Gold Leaf (0.00004 cm) */}
              <g transform="translate(650, 540)">
                <rect x="-4" y="-110" width="8" height="220" fill="#FACC15" filter="drop-shadow(0 0 8px rgba(250,204,21,0.55))" />
                <text x="0" y="-132" textAnchor="middle" fill="#FEF08A" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  সোনার পাত (০.০০০০৪ সেমি)
                </text>
              </g>

              {/* Forward Beam & Quiet Forward Emerald Scintillations (before scope swings behind) */}
              <line x1="654" y1="540" x2="870" y2="540" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="8 10" strokeDashoffset={-beamDash} opacity="0.45" />
              <circle cx="650" cy="540" r="225" fill="none" stroke="#334155" strokeWidth="10" strokeDasharray="18 14" opacity="0.65" />

              {/* Rotating Scintillation Microscope + Zinc-Sulfide Screen */}
              <g transform={`translate(650, 540) rotate(${scopeAngle})`}>
                <path d="M 215,-55 A 222,222 0 0,1 215,55" fill="none" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
                <rect x="218" y="-13" width="120" height="26" rx="5" fill="#B45309" stroke="#FBBF24" strokeWidth="2.5" />
                <circle cx="342" cy="0" r="14" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
                {/* Forward zone quiet sparks */}
                {local < 1290 && frame % 38 < 10 && (
                  <circle cx="212" cy={(frame % 3 - 1) * 18} r="8" fill="#10B981" filter="drop-shadow(0 0 12px #10B981)" />
                )}
              </g>

              {/* Backward Rebound Trajectory + TWO Razor-Sharp Emerald FLASHES! */}
              {reboundMoment && (
                <>
                  <path d="M 646,540 Q 540,470 472,402" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="10 8" strokeDashoffset={beamDash} />
                  {(flash1 > 0 || flash2 > 0) && (
                    <circle
                      cx="472"
                      cy="402"
                      r={10 + Math.max(flash1, flash2) * 18}
                      fill="#10B981"
                      opacity={Math.max(flash1, flash2)}
                      filter="drop-shadow(0 0 24px #10B981)"
                    />
                  )}
                </>
              )}

              {/* Historical Attribution Footer */}
              <text x="960" y="960" textAnchor="middle" fill="#CBD5E1" fontSize="22" fontWeight="600" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                গাইগার ও মার্সডেনের পরীক্ষা (১৯০৯) • রাদারফোর্ডের নিউক্লিয়ার তত্ত্ব (১৯১১)
              </text>
            </svg>

            {/* Animated Thought Bubble (805..1235f): Thomson's Plum Pudding Expectation */}
            {(() => {
              const tbIn = ci(local, [805, 835], [0, 1], EASE_OUT);
              const tbOut = ci(local, [1205, 1235], [1, 0], EASE_INOUT);
              const alpha = tbIn * tbOut;
              if (alpha <= 0.01) return null;
              const floatY = Math.sin(frame * 0.07) * 4;
              return (
                <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, overflow: 'visible', opacity: alpha, pointerEvents: 'none' }}>
                  <circle cx="1340" cy={435 + floatY * 0.3} r="7" fill="#F2E5CE" stroke="#94A3B8" strokeWidth="1.5" />
                  <circle cx="1365" cy={405 + floatY * 0.5} r="11" fill="#F2E5CE" stroke="#94A3B8" strokeWidth="1.8" />
                  <circle cx="1390" cy={370 + floatY * 0.7} r="15" fill="#F2E5CE" stroke="#94A3B8" strokeWidth="2" />
                  <g transform={`translate(1470, ${265 + floatY})`}>
                    <path
                      d="M -115,44 C -150,44 -168,16 -158,-14 C -150,-40 -122,-54 -94,-48 C -80,-84 -36,-98 6,-84 C 30,-104 78,-100 98,-72 C 136,-72 162,-42 152,-8 C 168,18 148,50 110,48 C 88,68 42,70 14,56 C -16,74 -68,70 -90,48 Z"
                      fill="#F8F1E3"
                      stroke="#CBD5E1"
                      strokeWidth="2.8"
                    />
                    <circle cx="0" cy="-12" r="36" fill="rgba(244, 63, 94, 0.25)" stroke="#F43F5E" strokeWidth="2" strokeDasharray="5 4" />
                    <circle cx="-12" cy="-22" r="4" fill="#38BDF8" />
                    <circle cx="14" cy="-6" r="4" fill="#38BDF8" />
                    <circle cx="-6" cy="4" r="4" fill="#38BDF8" />
                    <line x1="-95" y1="-22" x2="95" y2="-22" stroke="#0284C7" strokeWidth="3" strokeDasharray="8 5" />
                    <line x1="-95" y1="-4" x2="95" y2="-4" stroke="#0284C7" strokeWidth="3" strokeDasharray="8 5" />
                    <text x="0" y="42" textAnchor="middle" fill="#0F172A" fontSize="22" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                      থমসনের ধারণা: সোজা বেরোবে!
                    </text>
                  </g>
                </svg>
              );
            })()}
          </>
        ) : (
          /* Stylized Vintage Ink-Engraving Analogy: 15-inch Naval Cannon vs Delicate Tissue Paper */
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            {/* Fine Engraving Cross-Hatch Sky Lines */}
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={i} x1="80" y1={140 + i * 24} x2="1840" y2={140 + i * 24} stroke="#5C4930" strokeWidth="1" opacity="0.14" />
            ))}
            {/* Deck Floor with Engraving Hatching */}
            <rect x="-100" y="700" width="2120" height="440" fill="#CBB591" stroke="#3D2E1E" strokeWidth="4" />

            {/* 15-inch Naval Cannon (Ink Engraving Style) */}
            <g transform={`translate(${370 - cannonRecoil}, 570)`}>
              <path d="M -125,45 L 90,45 L 110,125 L -135,125 Z" fill="#5C4028" stroke="#1E1B18" strokeWidth="3.5" />
              <circle cx="-75" cy="128" r="34" fill="#3D2E1E" stroke="#1E1B18" strokeWidth="5" />
              <circle cx="50" cy="128" r="34" fill="#3D2E1E" stroke="#1E1B18" strokeWidth="5" />
              <path d="M -95,-38 L 145,-22 L 145,12 L -95,30 Z" fill="#292524" stroke="#1E1B18" strokeWidth="4" />
              {/* Engraving highlight lines on barrel */}
              <line x1="-80" y1="-22" x2="130" y2="-12" stroke="#A8A29E" strokeWidth="2.5" opacity="0.55" />
            </g>

            {/* Delicate Hanging Tissue Paper Sheet with Impact Ripple */}
            <g transform="translate(1335, 490)">
              <line x1="0" y1="-210" x2="0" y2="-135" stroke="#3D2E1E" strokeWidth="3" />
              <path
                d={`M 0,-135 Q ${paperRipple},0 0,135`}
                fill="none"
                stroke="#FAF5EB"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path d={`M 0,-135 Q ${paperRipple},0 0,135`} fill="none" stroke="#3D2E1E" strokeWidth="2.5" />
              <text x="0" y="180" textAnchor="middle" fill="#1E1B18" fontSize="28" fontWeight="700" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                পাতলা টিস্যু পেপার
              </text>
            </g>

            {/* Iron Naval Shell Rebounding Backward! */}
            <g transform={`translate(${shellX}, ${shellY})`}>
              <circle cx="0" cy="0" r="24" fill="#1E1B18" stroke="#57534E" strokeWidth="3" />
              <circle cx="-7" cy="-7" r="7" fill="#A8A29E" opacity="0.55" />
            </g>
            {reboundBack > 0.05 && (
              <path d="M 1310,510 Q 860,415 470,510" fill="none" stroke="#B91C1C" strokeWidth="4.5" strokeDasharray="12 10" />
            )}
          </svg>
        )}

        {!isCannonCut && <DustMotes frame={frame} cx={960} cy={520} radius={440} count={26} opacity={0.4} seed={21} />}
      </div>
    </div>
  );
};
