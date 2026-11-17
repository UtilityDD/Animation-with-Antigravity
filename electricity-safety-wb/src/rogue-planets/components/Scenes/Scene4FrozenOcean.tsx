import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CosmicParallaxStage } from '../CosmicParallaxStage';
import { PlanetCrossSection } from '../CosmicProps';

/**
 * SCENE 4: The Frozen Ocean (0:20 – 0:35 | Frames 1200 – 2100, local 0 – 900 @ 60 FPS)
 * Vertical descent: outer nitrogen frost (-230°C) down through miles of ice crust
 * into a massive churning liquid ocean kept warm by radioactive core decay.
 */
export const Scene4FrozenOcean: React.FC = () => {
  const frame = useCurrentFrame();

  // Vertical descent camera gliding from top nitrogen crust down toward the core
  const camY = interpolate(frame, [0, 450, 900], [-120, 20, 160], { extrapolateRight: 'clamp' });
  const camScale = interpolate(frame, [0, 450, 900], [1.0, 1.14, 1.22]);

  return (
    <CosmicParallaxStage
      camX={0}
      camY={camY}
      camScale={camScale}
      particleCount={70}
      bgGradient="radial-gradient(ellipse at 50% 60%, #180A59 0%, #09134B 65%, #05071A 100%)"
      layer0={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Cold Void Sky with Faint Stars */}
          <rect width="2200" height="1360" fill="#09134B" />
          <circle cx="1100" cy="780" r="620" fill="#05071A" />
        </svg>
      }
      layer1={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Depth Callout Grids & Distance Markers */}
          <line x1="280" y1="280" x2="1920" y2="280" stroke="#8CAAF7" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
          <text x="320" y="270" fill="#8CAAF7" fontSize="16" fontFamily="monospace">
            DEPTH: 0 KM // NITROGEN FROST SURFACE (-230°C / 43K)
          </text>

          <line x1="280" y1="580" x2="1920" y2="580" stroke="#22D7DA" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
          <text x="320" y="570" fill="#22D7DA" fontSize="16" fontFamily="monospace">
            DEPTH: 35 KM // SUB-GLACIAL LIQUID OCEAN (+4°C)
          </text>

          <line x1="280" y1="920" x2="1920" y2="920" stroke="#FF851D" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
          <text x="320" y="910" fill="#FF851D" fontSize="16" fontFamily="monospace">
            DEPTH: 1800 KM // RADIOACTIVE GEOTHERMAL CORE (+2800°C)
          </text>
        </svg>
      }
      layer2={
        <svg width="2200" height="1360" viewBox="0 0 2200 1360">
          {/* Massive Planet Cross-Section Cutaway */}
          <PlanetCrossSection
            x={1100}
            y={760}
            scale={1.35}
            corePulse={frame * 0.08}
          />

          {/* Temperature & Phase Cards */}
          {frame >= 200 && (
            <g transform="translate(480, 480)">
              <rect x="-140" y="-35" width="280" height="70" rx="14" fill="#09134B" stroke="#22D7DA" strokeWidth="3" />
              <text x="0" y="-6" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="bold">
                ICE-LOCKED LIQUID OCEAN
              </text>
              <text x="0" y="18" textAnchor="middle" fill="#22D7DA" fontSize="13" fontWeight="bold">
                PRESSURIZED HYDRO-SHELL
              </text>
            </g>
          )}

          {frame >= 480 && (
            <g transform="translate(1680, 780)">
              <rect x="-140" y="-35" width="280" height="70" rx="14" fill="#09134B" stroke="#FF851D" strokeWidth="3" />
              <text x="0" y="-6" textAnchor="middle" fill="#FFD244" fontSize="17" fontWeight="bold">
                RADIOACTIVE CORE HEAT
              </text>
              <text x="0" y="18" textAnchor="middle" fill="#FF851D" fontSize="13" fontWeight="bold">
                TIDAL & ISOTOPIC DECAY
              </text>
            </g>
          )}
        </svg>
      }
      hudOverlay={
        <div style={{ position: 'absolute', top: 38, left: 44, color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#22D7DA', letterSpacing: '0.12em' }}>
            SEISMIC SOUNDING // INTERNAL HYDROSPHERE CONFIRMED
          </span>
        </div>
      }
    />
  );
};

