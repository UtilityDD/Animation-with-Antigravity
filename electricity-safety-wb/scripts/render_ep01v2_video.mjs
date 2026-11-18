// Render the full EP01 v2 episode to MP4.
// Usage: node scripts/render_ep01v2_video.mjs [out.mp4] [concurrency]
// Remotion's bundled headless shell is broken on this machine, so system Chrome is used.
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

const out = path.resolve(process.argv[2] ?? 'dist/vidyuter_pathshala_ep01_v2_60fps.mp4');
const concurrency = Number(process.argv[3] ?? 12);
const browserExecutable = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const t0 = Date.now();
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: 'VidyuterPathshalaEP01V2', browserExecutable });
console.log(`rendering ${composition.durationInFrames} frames @ ${composition.fps}fps → ${out} (concurrency ${concurrency})`);

let lastPct = -1;
await renderMedia({
  serveUrl,
  composition,
  codec: 'h264',
  crf: 18,
  audioBitrate: '320k',
  outputLocation: out,
  browserExecutable,
  concurrency,
  chromiumOptions: { gl: 'angle' },
  onProgress: ({ progress, renderedFrames, encodedFrames }) => {
    const pct = Math.floor(progress * 100);
    if (pct !== lastPct && pct % 5 === 0) {
      lastPct = pct;
      const min = ((Date.now() - t0) / 60000).toFixed(1);
      console.log(`${pct}%  rendered ${renderedFrames}  encoded ${encodedFrames}  (${min} min)`);
    }
  },
});
console.log(`done in ${((Date.now() - t0) / 60000).toFixed(1)} min → ${out}`);
