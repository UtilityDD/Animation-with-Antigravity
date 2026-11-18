# MASTER PRODUCTION CONCEPT — «বিদ্যুতের পাঠশালা 2.0»
## Everyday Sensory Mystery × Hard-Rock Microscopic Physics × Constructive Confusion

**Series:** বিদ্যুতের পাঠশালা (50-Episode Flagship Indian Bengali Science Series)  
**Master Spec:** `1920 × 1080` (4K-scalable SVG) | `60 fps CFR` | `Rec.709` | `H.264 High (CRF 16–18)` | `AAC 48kHz 320kbps` | `-14 LUFS`  
**Target Runtime:** `3:30` (±15s) per episode — sized to ~3:00 of narration + ~30s of visual-only "breathing" shots.

---

## 1. UNIVERSAL 4-ACT EPISODE STRUCTURE (ALL 50 EPISODES)
Runtime budget = narration (VO) + visual-only time (no VO: holds, hero shots, transitions, end card). Visual-only time is **planned per shot**, never padded onto the end of a scene as dead air.

| Segment | Window | Total | VO | Visual-only (planned) |
|---|---|---|---|---|
| Series intro | `00:00 – 00:05` | 5s | — | 5s মাত্রা-reveal title card |
| Act 1 Hook | `00:05 – 00:28` | 23s | ~20s | 3s hold on the bulb-on light flood |
| Act 2 Flashback + Timeline | `00:28 – 01:32` | 64s | ~59s | 4s globe-dive / timeline transitions |
| Act 3 Micro-physics | `01:32 – 02:44` | 72s | ~58s | 10s drift-vs-push hero shot + 4s match-cut transitions |
| Act 4 Confusion + Hook | `02:44 – 03:30` | 46s | ~35s | 6s thinking pause + 5s end card |

1. **ACT 1: THE EVERYDAY SENSORY HOOK (`00:05 – 00:28`)**
   - Atmospheric everyday Indian setting (`Z0–Z4` depth) zooming immediately into a minute physical anomaly (winter blanket sparks, modular 6A wall switch, kettle boiling জল). Zero textbook terms.
2. **ACT 2: THE HUMAN DETECTIVE FLASHBACK & TOPIC TIMELINE (`00:28 – 01:32`)**
   - Continuous 2.5D **Rotating Globe → Country → Rooftop → Window Crash-Dive** into genuine historical experiment.
   - Expressive rigged character acting (`curiosity → frustration → awe`, OTS POVs, zero invented dialogue) + broken-axis (`//`) topic timeline.
   - Timeline: max `8–9` milestones, `~4s` per milestone; every milestone named in VO must be on screen while it is spoken.
3. **ACT 3: MINUTE-DETAIL MICROSCOPIC PHYSICS (`01:32 – 02:44`)**
   - Macro crash-zoom into hardware cutaways & microscopic realism (no Bohr rings, no "bulbs eat electrons", distinguish slow drift vs near-light-speed field push).
   - **Max 3 concepts** at this length, each with one hero shot (~20–25s each), linked by match-cuts (never fades through black).
   - **90/10 visual-to-text ratio**: zero full sentences or bullet lists on screen.
4. **ACT 4: CONSTRUCTIVE CONFUSION & NEXT-COURSE HOOK (`02:44 – 03:30`)**
   - 3-icon visual anchor (`6–8s`), followed by **"এতক্ষণ যা জানলেন, তাতে আপনার মনে কি এখন একটা খটকা লাগছে?"**
   - Present `2–3` razor-sharp unresolved paradoxes triggered by the lesson — **one visual per paradox spoken** — and reassure learners that every puzzle unlocks in upcoming courses.
   - Close on a `5s` end card: next-episode title + series mark.

---

## 2. MULTIPLANE 2.5D PARALLAX (`Z0–Z4`)
Every scene mounts inside `<MultiplaneCameraRig>` (`perspective: 1100`, `transformStyle: 'preserve-3d'`):
- **`Z0` Far Backdrop (`-620 px`, `7–9 px` blur, `0.28–0.35` opacity):** Room walls, moonlit windows, shelving.
- **`Z1` Midground Context (`-210 px`, `2.5–4 px` blur, `0.48–0.58` opacity):** Unfocused neighboring props.
- **`Z2` Hero Stage (`0 px`, `0 px` blur, `1.0` opacity):** Articulated cutaway SVGs + rigged characters + grounded contact shadows.
- **`Z3` Near Foreground (`+260 px`, `9–12 px` blur, `0.22–0.28` opacity):** Out-of-focus foreground flask rim / doorway / OTS shoulder.
- **`Z4` Lens Dust / Bokeh (`+420 px`, `14 px` blur, `0.18–0.25` opacity):** Floating dust motes / candle embers.
- **Tilt Guardrail:** `rotateX` / `rotateY` kept within `±1.5° to ±3.5°` (never exceeding `±5°`).

---

## 3. 4-TRACK PHRASE-BY-PHRASE CHOREOGRAPHY (`1.0 – 2.2s` MAX PER BEAT)
Compiled from `word_choreography.json`:
1. **Track 1 — `tts_bn`:** Spoken phrase timestamps (`start_ms`, `end_ms`) + acting tag (`[WHISPERED]`, `[CURIOUS]`, `[SKEPTIC]`, `[FOCUS]`, `[CONFUSION]`).
2. **Track 2 — `CameraRig` (`x, y, z, rotateY, rotateX`):** Must span `0 ms` to `scene_end_ms` with zero static gaps `> 600 ms` and no interval `> 2,200 ms` without active motion.
3. **Track 3 — Object Lifecycle (`+ADD / ⚙ACT / -REMOVE`):** Every prop has a mandatory `remove_ms`.
4. **Track 4 — Kinetic Words (`+APPEAR → ★EMPHASIZE → -REMOVE`):** Max `3` simultaneous active words on screen; zero prose sentences.

---

## 4. INDIAN BENGALI (`bn-IN`) & SPOKEN YEAR TTS NORMALIZER
- Strictly use: **জল** (never পানি), **নুন-জল / লবণজল** (never লবণ পানি), **বাড়ি / ঘর** (never বাসা), **স্নান** (never গোসল), **জলখাবার** (never নাস্তা), **খুব ভালো / দারুণ** (never অনেক ভালো), **লঙ্কা** (never মরিচ), plus WBBSE/WBCHSE terms (`তড়িৎকোষ`, `বর্তনী`, `বিভব প্রভেদ`, `পরিবাহী`, `অন্তরক/অপরিবাহী`, `রোধ`, `তড়িৎ প্রবাহমাত্রা`).
- `tts_bn` MUST convert 4-digit years & decimals to spoken Bengali (`1752 → সতেরোশো বাহান্ন`, `1800 → আঠারোশো`, `1.5 V → দেড় ভোল্ট`).

---

## 5. MANDATORY AUTOMATED QA GATE (`tools/validation/validate_episode_v2.py`)
Blocks export if any of the 5 checks fail:
1. Beat density (`<= 2,200 ms` gaps)
2. Full-scene camera coverage (`0 ms` to `>= duration - 500 ms`, no flat hold `> 600 ms`)
3. `Z0–Z3` depth layer presence in every scene component
4. Simultaneous `<KineticWord>` cap (`<= 3`)
5. `bn-IN` lexicon & zero raw 4-digit years in `tts_bn`
- **On-Screen Numerals:** All on-screen numbers (`display_bn`, kinetic triggers, timeline dates, meter dials) MUST use English/Arabic numerals (`0–9`).
