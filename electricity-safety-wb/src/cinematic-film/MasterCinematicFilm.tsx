import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { ParallaxWorld } from './ParallaxWorld';
import { CinematicBishu } from './CinematicActors';
import { ExpressiveMitu } from '../kinetic-master/components/ExpressiveActors';
import { KineticTitle, punchyEase, anticipatory } from '../kinetic-master/KineticTypography';
import { FontInjector } from '../kinetic-master/FontInjector';
import { EditorialDefs } from '../editorial-explainer/components/EditorialDefs';

/**
 * MASTER 60.00-SECOND CINEMATIC 2.5D FILM
 * 3,600 Consecutive Frames @ 60 FPS, 1920x1080 Full HD
 *
 * Continuous 7-Act Storyboard:
 * - Act 1 (0:00 - 0:04 | Frames 0 - 240): The Severed Conductor & Ground Strike.
 * - Act 2 (0:04 - 0:12 | Frames 240 - 720): Bishu discovers the danger; macro camera isolates the stride gap.
 * - Act 3 (0:12 - 0:25 | Frames 720 - 1500): Electrodynamic transition into equipotential voltage field & anatomical circuit.
 * - Act 4 (0:25 - 0:38 | Frames 1500 - 2280): Dynamic tracking camera following the consecutive bunny hop escape.
 * - Act 5 (0:38 - 0:48 | Frames 2280 - 2880): In-world insulation rules: droplet conduction vs flooded stay-wire leakage.
 * - Act 6 (0:48 - 0:55 | Frames 2880 - 3300): Main Switch mechanical disconnect & Mitu's non-conductive bamboo separation.
 * - Act 7 (0:55 - 1:00 | Frames 3300 - 3600): WBSEDCL 19121 Hotline Command Center pulling back into wide dawn landscape.
 */
export const MasterCinematicFilm: React.FC = () => {
  const frame = useCurrentFrame();

  // Unified continuous virtual camera choreography
  let camX = 0;
  let camY = 0;
  let camScale = 1.0;
  let camRotation = 0;

  if (frame < 240) {
    // Act 1: Storm wide -> crash zoom on spark impact
    const t = Math.min(1, Math.max(0, (frame - 60) / 80));
    const eased = punchyEase(t);
    camScale = interpolate(eased, [0, 1], [1.0, 1.4]);
    camX = interpolate(eased, [0, 1], [0, -180]);
    camY = interpolate(eased, [0, 1], [0, -80]);
    camRotation = interpolate(eased, [0, 1], [0, -1.5]);
  } else if (frame >= 240 && frame < 720) {
    // Act 2: Whip pan over to Bishu -> macro push-in on stride gap
    const t = Math.min(1, Math.max(0, (frame - 240) / 100));
    const eased = punchyEase(t);
    camScale = interpolate(eased, [0, 1], [1.4, 1.55]);
    camX = interpolate(eased, [0, 1], [-180, 240]);
    camY = interpolate(eased, [0, 1], [-80, -130]);
    camRotation = interpolate(eased, [0, 1], [-1.5, 0.8]);
  } else if (frame >= 720 && frame < 1500) {
    // Act 3: Scientific electrodynamics -> pans between ground field and anatomical loop
    const t = (frame - 720) / 780;
    camScale = interpolate(t, [0, 0.5, 1], [1.55, 1.25, 1.1]);
    camX = interpolate(t, [0, 0.5, 1], [240, 100, -280]);
    camY = interpolate(t, [0, 1], [-130, -30]);
    camRotation = 0;
  } else if (frame >= 1500 && frame < 2280) {
    // Act 4: Dynamic tracking camera following bunny hops
    const t = (frame - 1500) / 780;
    camScale = interpolate(t, [0, 0.5, 1], [1.1, 1.05, 0.98]);
    camX = interpolate(t, [0, 1], [-100, 160]);
    camY = 0;
  } else if (frame >= 2280 && frame < 2880) {
    // Act 5: Reframes between switchboard droplet conduction and flooded stay-wire
    const t = (frame - 2280) / 600;
    camScale = 1.08;
    camX = interpolate(t, [0, 0.5, 1], [160, 0, -220]);
    camY = -15;
  } else if (frame >= 2880 && frame < 3300) {
    // Act 6: Main switch trip -> bamboo rescue separation
    const t = (frame - 2880) / 420;
    camScale = 1.12;
    camX = interpolate(t, [0, 0.5, 1], [180, 0, -240]);
    camY = -20;
  } else {
    // Act 7: Macro focus on giant 19121 pulling out into wide dawn panorama
    const t = (frame - 3300) / 300;
    camScale = interpolate(t, [0, 0.4, 1], [1.32, 1.15, 1.0]);
    camX = 0;
    camY = interpolate(t, [0, 1], [-40, 0]);
  }

  // Act 1 Wire Snap Physics
  const snapT = Math.min(1, Math.max(0, (frame - 35) / 45));
  const easedSnap = punchyEase(snapT);
  const wireGroundX = interpolate(easedSnap, [0, 1], [680, 1180]);
  const wireGroundY = interpolate(easedSnap, [0, 1], [220, 800]);
  const whipShake = (frame > 80 && frame < 240) ? Math.exp(-0.09 * (frame - 80)) * Math.sin(0.45 * (frame - 80)) * 28 : 0;

  // Act 4 Bunny Hop Mechanics
  const hopCycleFrame = (frame - 1500) % 130;
  let hopElevation = 0;
  let hopSquashY = 1;
  let hopSquashX = 1;
  let kneeBend = 0;
  let bodyLean = 0;

  if (frame >= 1500 && frame < 2280) {
    if (hopCycleFrame < 28) {
      const t = hopCycleFrame / 28;
      const eased = anticipatory(t);
      hopElevation = 0;
      hopSquashY = interpolate(eased, [0, 1], [1, 0.72]);
      hopSquashX = 1 / hopSquashY;
      kneeBend = interpolate(eased, [0, 1], [0, 26]);
      bodyLean = -8;
    } else if (hopCycleFrame >= 28 && hopCycleFrame < 88) {
      const t = (hopCycleFrame - 28) / 60;
      const arc = Math.sin(t * Math.PI);
      hopElevation = arc * 230;
      hopSquashY = 1 + arc * 0.32;
      hopSquashX = 1 / hopSquashY;
      kneeBend = 4;
      bodyLean = interpolate(t, [0, 1], [-12, 8]);
    } else {
      const impact = Math.exp(-0.15 * (hopCycleFrame - 88)) * Math.cos(0.42 * (hopCycleFrame - 88));
      hopElevation = 0;
      hopSquashY = 1 - impact * 0.36;
      hopSquashX = 1 / hopSquashY;
      kneeBend = Math.max(0, impact * 16);
      bodyLean = 0;
    }
  }

  // Bishu Position across narrative
  let bishuX = 460;
  if (frame < 240) {
    bishuX = interpolate(frame, [0, 240], [160, 480]);
  } else if (frame >= 240 && frame < 1500) {
    bishuX = 480;
  } else if (frame >= 1500 && frame < 2280) {
    bishuX = interpolate(frame, [1500, 2280], [1280, 440]);
  }

  return (
    <>
      <FontInjector />
      <ParallaxWorld
        currentFrame={frame}
        camState={{ x: camX, y: camY, scale: camScale, rotation: camRotation }}

        /* 1. Background Plane (0.15x Parallax): Atmospheric Skies & Distant Lightning */
        background={
          <svg width="2500" height="1400" viewBox="0 0 2500 1400">
            <EditorialDefs />
            <rect x="0" y="0" width="2500" height="1400" fill={frame >= 3300 ? "url(#sky-warm-sunset)" : "url(#sky-storm)"} />
            {/* Lightning flash */}
            {frame >= 75 && frame <= 85 && (
              <polygon points="1200,0 1140,240 1180,280 1110,540 1250,260 1200,220" fill="#FFFFFF" opacity={0.85} filter="url(#editorial-soft-glow)" />
            )}
            <g opacity="0.3">
              <ellipse cx="500" cy="300" rx="600" ry="160" fill="#0B0E38" />
              <ellipse cx="1400" cy="240" rx="720" ry="180" fill="#0E1248" />
              <ellipse cx="2100" cy="320" rx="620" ry="160" fill="#0B0E38" />
            </g>
          </svg>
        }

        /* 2. Far-Midground Plane (0.40x Parallax): Rolling Rural Hills & Wind-Whipped Palms */
        farMidground={
          <svg width="2400" height="1350" viewBox="0 0 2400 1350">
            <path d="M 0 680 Q 480 620 960 650 T 1920 630 T 2400 660 L 2400 1350 L 0 1350 Z" fill="#0B1033" />
            {[-60, 320, 940, 1680, 2180].map((tx, idx) => {
              const sway = Math.sin(frame * 0.12 + idx * 1.5) * 10;
              return (
                <g key={idx} transform={`translate(${tx}, 560) rotate(${sway})`}>
                  <path d="M 0 140 Q -12 70 -18 0" stroke="#080C26" strokeWidth="14" fill="none" strokeLinecap="round" />
                  <path d="M -18 0 Q -70 -20 -110 -10 M -18 0 Q -50 -60 -60 -95 M -18 0 Q 30 -70 55 -95 M -18 0 Q 60 -35 100 -25" stroke="#080C26" strokeWidth="7" fill="none" />
                </g>
              );
            })}
          </svg>
        }

        /* 3. Main Focal Midground Plane (1.00x Parallax): Full In-World Narrative */
        midground={
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            {/* Ground Terrain */}
            <path d="M -200 740 Q 480 710 1100 735 T 2120 720 L 2120 1080 L -200 1080 Z" fill="url(#wet-ground)" />
            <path d="M -200 740 Q 480 710 1100 735 T 2120 720" fill="none" stroke="#3858E9" strokeWidth="2.5" opacity="0.45" />

            {/* Utility Transmission Pole */}
            <g transform="translate(320, 200)">
              <polygon points="-24,0 24,0 30,640 -30,640" fill="#1A224D" />
              <rect x="-180" y="40" width="360" height="26" rx="4" fill="#2E3870" />
              {[-140, 0, 140].map((ix, idx) => (
                <circle key={idx} cx={ix} cy={53} r="10" fill="#6B7280" />
              ))}
            </g>

            {/* Live Conductor & Ground Arcs (Acts 1-4) */}
            {frame < 2280 && (
              <>
                <path
                  d={`M 460 253 Q ${680 + whipShake * 1.5} ${420 + whipShake} ${wireGroundX} ${wireGroundY + whipShake}`}
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {frame >= 80 && (
                  <g transform={`translate(${wireGroundX}, ${wireGroundY})`} filter="url(#editorial-soft-glow)">
                    <ellipse cx="0" cy="0" rx="90" ry="24" fill="#FFD152" opacity={0.4} />
                    <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
                    <circle cx="0" cy="0" r="36" fill="none" stroke="#FF5E57" strokeWidth="3" />
                    <circle cx="0" cy="0" r={60 + (frame * 2.5) % 120} fill="none" stroke="#FF5E57" strokeWidth="2.5" opacity={Math.max(0, 1 - ((frame * 2.5) % 120) / 120)} />
                    <circle cx="0" cy="0" r={60 + (frame * 2.5 + 60) % 120} fill="none" stroke="#FFD152" strokeWidth="2" opacity={Math.max(0, 1 - ((frame * 2.5 + 60) % 120) / 120)} />
                  </g>
                )}
              </>
            )}

            {/* Act 3: Step Potential Electrodynamics In-World Overlay */}
            {frame >= 720 && frame < 1500 && (
              <g transform="translate(680, 560)">
                <circle cx="0" cy="0" r="400" fill="url(#potential-field)" opacity={0.6} />
                <circle cx="0" cy="0" r="140" fill="none" stroke="#FF5E57" strokeWidth="3" strokeDasharray="14 8" strokeDashoffset={-frame * 2.5} />
                <circle cx="0" cy="0" r="260" fill="none" stroke="#FFD152" strokeWidth="3" strokeDasharray="16 10" strokeDashoffset={-frame * 2} />
                <circle cx="0" cy="0" r="380" fill="none" stroke="#1DD1A1" strokeWidth="2.5" strokeDasharray="18 12" strokeDashoffset={-frame * 1.5} />
              </g>
            )}

            {/* 10m Safe Perimeter Line (Act 4) */}
            {frame >= 1500 && frame < 2280 && (
              <g transform="translate(700, 0)">
                <line x1="0" y1="180" x2="0" y2="720" stroke="#1DD1A1" strokeWidth="3" strokeDasharray="12 8" opacity="0.75" />
                <rect x="-95" y="220" width="190" height="38" rx="8" fill="#0D1333" stroke="#1DD1A1" strokeWidth="2" />
                <text x="0" y="245" textAnchor="middle" fill="#1DD1A1" fontSize="14" fontWeight="900" fontFamily="monospace">
                  SAFE PERIMETER (10m)
                </text>
              </g>
            )}

            {/* Bishu Protagonist Acting */}
            {frame < 2280 && (
              <CinematicBishu
                x={bishuX}
                y={690 - hopElevation}
                scale={1.38}
                frame={frame}
                squashX={hopSquashX}
                squashY={hopSquashY}
                bodyLean={bodyLean}
                kneeBend={kneeBend}
                leftArmAngle={hopElevation > 0 ? -45 : 15}
                rightArmAngle={hopElevation > 0 ? 45 : -20}
                expression={frame < 240 ? 'curious' : (frame < 1500 ? 'fear' : 'cautious')}
                lookAtX={frame < 240 ? 0.8 : 0.95}
                lookAtY={0.15}
              />
            )}

            {/* Act 5: Insulation Rules Dual Panels */}
            {frame >= 2280 && frame < 2880 && (
              <g transform="translate(560, 560)">
                <rect x="-260" y="-280" width="520" height="560" rx="20" fill="rgba(13, 19, 51, 0.95)" stroke="#FF5E57" strokeWidth="3" />
                <text x="0" y="-180" textAnchor="middle" className="bengali-heading" fill="#FFFFFF" fontSize="24" fontWeight="800">
                  ভেজা হাতে সুইচ ছোঁবেন না
                </text>
              </g>
            )}

            {/* Act 6: Shock Rescue Protocol */}
            {frame >= 2880 && frame < 3300 && (
              <g transform="translate(1360, 570)">
                <rect x="-260" y="-280" width="520" height="560" rx="20" fill="rgba(13, 19, 51, 0.95)" stroke="#1DD1A1" strokeWidth="3" />
                <ExpressiveMitu x={-80} y={40} scale={1.22} frame={frame} holdingBamboo={true} />
              </g>
            )}

            {/* Act 7: WBSEDCL 19121 Command Center */}
            {frame >= 3300 && (
              <g transform="translate(960, 420)">
                <rect x="-380" y="-200" width="760" height="390" rx="24" fill="rgba(8, 13, 38, 0.94)" stroke="#FFD152" strokeWidth="3.5" />
                <text x="0" y="42" textAnchor="middle" className="bengali-heading" fill="#FFD152" fontSize="78" fontWeight="900">
                  ১৯১২১ / 19121
                </text>
                <ExpressiveMitu x={480} y={320} scale={1.3} frame={frame} expression="happy" />
              </g>
            )}

            {/* Kinetic Typography In-World Reveals */}
            {frame >= 85 && frame < 240 && (
              <KineticTitle
                x={1240}
                y={460}
                startFrame={85}
                currentFrame={frame}
                badgeText="FATAL CABLE STRIKE // তার বিভ্রাট"
                words={[{ text: 'ছেঁড়া তার' }, { text: 'এক অদৃশ্য' }, { text: 'মারণফাঁদ!', highlight: true, scale: 1.15 }]}
              />
            )}
            {frame >= 240 && frame < 720 && (
              <KineticTitle
                x={960}
                y={320}
                startFrame={240}
                currentFrame={frame}
                badgeText="STEP POTENTIAL // মারাত্মক ভুল"
                words={[{ text: 'দুই পায়ের দূরত্বে' }, { text: 'বিভব পার্থক্য', highlight: true }, { text: '৩,৮০০ ভোল্ট!', color: '#FFD152', scale: 1.2 }]}
              />
            )}
            {frame >= 720 && frame < 1500 && (
              <KineticTitle
                x={960}
                y={150}
                startFrame={730}
                currentFrame={frame}
                badgeText="ELECTRODYNAMICS // বৈজ্ঞানিক কারণ"
                words={[{ text: 'ধাপ বিভব' }, { text: '(STEP POTENTIAL)', color: '#FFD152' }]}
              />
            )}
            {frame >= 1500 && frame < 2280 && (
              <KineticTitle
                x={880}
                y={280}
                startFrame={1510}
                currentFrame={frame}
                badgeText="EQUIPOTENTIAL ESCAPE // মুক্তির উপায়"
                words={[{ text: 'খরগোশ লাফ' }, { text: 'বা পা ঘষে চলা', color: '#1DD1A1', highlight: true, scale: 1.18 }]}
              />
            )}
          </svg>
        }

        /* 4. Cinematic Foreground Plane (1.65x Parallax): Near-Camera Blurred Foliage & Passing Rain */
        foreground={
          <svg width="2600" height="1460" viewBox="0 0 2600 1460">
            <g transform="translate(140, 920)" opacity="0.85" filter="url(#ambient-ground-shadow)">
              <path d="M 0 0 C 80 -120 220 -160 380 -120 C 260 20 120 60 0 0 Z" fill="#040717" />
              <path d="M 120 -40 C 240 -180 420 -220 580 -160 C 420 40 280 80 120 -40 Z" fill="#070C26" />
            </g>
            <g opacity="0.6">
              {Array.from({ length: 45 }).map((_, i) => {
                const fx = (i * 58 + frame * 24) % 2600;
                const fy = (i * 34 + frame * 38) % 1460;
                return (
                  <line key={i} x1={fx} y1={fy} x2={fx - 36} y2={fy + 72} stroke="#8EA3E8" strokeWidth={i % 3 === 0 ? 3.2 : 1.8} opacity={0.35} />
                );
              })}
            </g>
          </svg>
        }
      />
    </>
  );
};

