import React from 'react';
import { staticFile } from 'remotion';

/**
 * Injects bundled local Bengali fonts via @font-face.
 * Guarantees pixel-perfect native complex conjunct rendering across all headless Chromium renderers.
 */
export const FontInjector: React.FC = () => {
  return (
    <style>{`
      @font-face {
        font-family: 'Noto Sans Bengali';
        src: url('${staticFile('fonts/NotoSansBengali-Variable.ttf')}') format('truetype');
        font-weight: 100 900;
        font-style: normal;
        font-display: block;
      }
      @font-face {
        font-family: 'Hind Siliguri';
        src: url('${staticFile('fonts/HindSiliguri-Bold.ttf')}') format('truetype');
        font-weight: 700;
        font-style: normal;
        font-display: block;
      }
      @font-face {
        font-family: 'Hind Siliguri';
        src: url('${staticFile('fonts/HindSiliguri-SemiBold.ttf')}') format('truetype');
        font-weight: 600;
        font-style: normal;
        font-display: block;
      }

      .bengali-heading {
        font-family: 'Hind Siliguri', 'Noto Sans Bengali', sans-serif;
        font-weight: 700;
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
      }

      .bengali-body {
        font-family: 'Noto Sans Bengali', 'Hind Siliguri', sans-serif;
        font-weight: 600;
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
      }
    `}</style>
  );
};
