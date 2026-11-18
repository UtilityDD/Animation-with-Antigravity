// Render EP01 v2 still frames for visual QA.
// Usage: node scripts/render_ep01v2_stills.mjs <outDir> <frame> [frame...]
// Remotion's bundled headless shell is broken on this machine, so system Chrome is used.
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';

const [outDir, ...frames] = process.argv.slice(2);
const browserExecutable = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: 'VidyuterPathshalaEP01V2', browserExecutable });
for (const f of frames.map(Number)) {
  const output = path.join(outDir, `f${String(f).padStart(5, '0')}.png`);
  await renderStill({ serveUrl, composition, frame: f, output, browserExecutable, scale: 0.5 });
  console.log('wrote', output);
}
