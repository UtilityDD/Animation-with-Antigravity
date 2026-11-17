import json
import os
import re
import subprocess
import sys

ROOT = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity"
WB = os.path.join(ROOT, "electricity-safety-wb")
HIST = os.path.join(WB, "src", "vidyuter-pathshala", "historical")
AUDIO_DIR = os.path.join(WB, "public", "vidyuter-pathshala", "audio", "ep01_doc")

failures = []

def check(cond, msg):
    if cond:
        print(f"  [PASS] {msg}")
    else:
        print(f"  [FAIL] {msg}")
        failures.append(msg)

print("=== 1. Remotion Config & Font Hygiene ===")
with open(os.path.join(WB, "remotion.config.ts"), encoding="utf-8") as f:
    cfg = f.read()
check("'./public'" in cfg and "__dirname" not in cfg, "remotion.config.ts uses './public' without __dirname")

with open(os.path.join(HIST, "HistoricalFrame.tsx"), encoding="utf-8") as f:
    hf = f.read()
check("FontInjector" in hf, "HistoricalFrame.tsx uses local FontInjector")
check("fonts.googleapis.com" not in hf and "Galada" not in hf, "No external Google Fonts CDN or Galada in HistoricalFrame.tsx")
check("headerOpacity" in hf, "HistoricalFrame.tsx fades out header after opening")

with open(os.path.join(HIST, "VidyuterBanglaKinetic.tsx"), encoding="utf-8") as f:
    vk = f.read()
check("fontSize," in vk and "columnGap: '0.28em'" in vk, "VidyuterBanglaKinetic.tsx sets fontSize on flex word row for crisp spacing")
check("underlineScale" in vk, "VidyuterBanglaKinetic.tsx includes hero-word energy underline sweep")

print("\n=== 2. All Scenes (1..9) Film-Grade & Anti-Clutter Checks ===")
scene_files = [
    ("Scene 1", "AmberFeatherVignette.tsx"),
    ("Scene 2", "BrokenAxisTimeline.tsx"),
    ("Scene 3", "MorphTransition.tsx"),
    ("Scene 4", "CoreDefinition.tsx"),
    ("Scene 5", "ElectronCloudAtom.tsx"),
    ("Scene 6", "StaticElectricityComb.tsx"),
    ("Scene 7", "PrecisionCircuit.tsx"),
    ("Scene 8", "EnergyConversionGrid.tsx"),
    ("Scene 9", "QuizReflectionTeaser.tsx"),
]
for label, fname in scene_files:
    with open(os.path.join(HIST, fname), encoding="utf-8") as f:
        src = f.read()
    check("FilmGrade" in src, f"{label} ({fname}) applies unified FilmGrade")
    check("VidyuterKineticTitle" in src, f"{label} ({fname}) uses VidyuterKineticTitle")
    check("badge=" not in src and "subline=" not in src, f"{label} ({fname}) has zero badge/subline clutter")
    if label == "Scene 2":
        check("textAlign: 'center'" in src and "textX: 1040" in src and "textX: 100" in src, "Scene 2 alternates centered question hook + left/right framing (Anti-PPT)")

print("\n=== 3. Audio Integrity (48 kHz Stereo MP3 via ffprobe) ===")
expected_audio = [f"scene{i}.mp3" for i in range(1, 10)] + [
    os.path.join("sfx", "ep01_ambient_bed.mp3"),
    os.path.join("sfx", "sfx_page_flip.mp3"),
    os.path.join("sfx", "sfx_whoosh_dive.mp3"),
    os.path.join("sfx", "sfx_spark_crackle.mp3"),
    os.path.join("sfx", "sfx_feather_snap.mp3"),
]
for rel in expected_audio:
    p = os.path.join(AUDIO_DIR, rel)
    if not os.path.exists(p):
        check(False, f"Missing audio: {rel}")
        continue
    res = subprocess.run(
        ["ffprobe", "-v", "error", "-show_streams", "-of", "json", p],
        capture_output=True, text=True
    )
    if res.returncode != 0:
        check(False, f"ffprobe error on {rel}: {res.stderr}")
        continue
    info = json.loads(res.stdout)
    st = info["streams"][0]
    check(st.get("sample_rate") == "48000" and st.get("channels") == 2, f"{rel}: 48kHz stereo ({st.get('duration', '?')}s)")

print("\n=== 4. TypeScript Compilation (npx tsc --noEmit) ===")
tsc = subprocess.run(["npx.cmd", "tsc", "--noEmit"], cwd=WB, capture_output=True, text=True)
check(tsc.returncode == 0, "TypeScript compiles cleanly with 0 errors")
if tsc.returncode != 0:
    print(tsc.stdout, tsc.stderr)

print(f"\nSUMMARY: {len(failures)} failure(s)")
sys.exit(1 if failures else 0)
