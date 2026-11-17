# 🎨 VISUAL STYLE GUIDE — বিদ্যুতের পাঠশালা
*Film-Grade Dynamic Standard (Established in Episode 01, Scenes 1 & 2)*

---

## 1. Dual-Register Color Palettes

### 1.1 Historical Era Register (Stages 1–2)
Used during ancient discoveries, classical experiments, and chronological journeys:

| Token | Hex | Semantic Meaning |
|---|---|---|
| `hist-void` | `#050811` | Deep chiaroscuro chamber shadow / night sky |
| `hist-amber` | `#FBBF24` | Warm oil lamp glow, Baltic amber stone (*elektron*) |
| `hist-brass` | `#D97706` | Antique scientific instruments, Leyden jar rods, compass rings |
| `hist-storm` | `#0B1222` | Atmospheric storm sky & rain backdrop |

### 1.2 Scientific Era Register (Stages 3–4)
Used for microscopic mechanisms, quantum electron clouds, circuits, and technical explainers:

| Token | Hex | Semantic Meaning |
|---|---|---|
| `sci-navy` | `#0B1120` | Deep observatory void, low-reflection background |
| `electron-cyan` | `#38BDF8` | Negative charge carrier / Electrons ($e^-$), field lines |
| `proton-coral` | `#F43F5E` | Positive charge carrier / Protons ($p^+$), atomic nucleus |
| `energy-emerald`| `#34D399` | Continuous current flow, kinetic motion |
| `field-violet` | `#A78BFA` | Electromagnetic induction & dipole field lines |

---

## 2. Indic Bengali Typography & Motion Graphics (`VidyuterKineticTitle`)
- **Mandatory Font Loader:** Local `@font-face` injection via `FontInjector.tsx` (`Hind Siliguri` Bold 700 / SemiBold 600 + `Noto Sans Bengali`).
- **Prohibited:** External Google Fonts CDN `@import` (blocks/flickers in headless Chromium) and cursive novelty fonts (e.g. `Galada`).
- **Pure Bengali Numerals:** Always convert display years and numbers using `toBn()` (`খ্রিস্টপূর্ব ৬০০`, `১৭৫২`, `২,৫০০`). Never mix English digits (`117`) into Bengali UI text.
- **Minimalist Keyword Rule (Zero Clutter):**
  - Display **1 punchy keyword/phrase per beat** (`64px–102px`).
  - No extra badges, sub-topics, or explanatory sentences on screen—let the voiceover explain.
  - **Word-by-Word Stagger:** Words enter sequentially (`5` frames apart) with blur-to-sharp focus (`blur(3.5px -> 0)`), two-tone hero highlight (`#F8FAFC` + glowing `accentColor`), and an animated underline energy sweep on the hero word.
  - **Flex Spacing Rule:** Always set `fontSize` on the word-row flex container so `columnGap: '0.28em'` scales proportionally to the heading size.
  - **Meaning-Matched Motion Variants:** `slide` (editorial glide), `shadow` (darkness emergence), `spring` (overshoot bounce), `spark` (2-frame electric flash).

---

## 3. Anti-PPT Monotony & Film Choreography Rules
Every scene must feel like a continuous animated film, never a PowerPoint slide deck:
1. **Alternating Composition:** Never place text and visuals in the same spot for two consecutive beats. Alternate Left/Right split-stage, Full-Bleed environment (e.g., rain/lightning across the whole 1920x1080 frame), Top-Left + Wide Finale, and Centered Full-Screen Question Hooks (`কী ছিল এই আকর্ষণ?`) at scene transitions.
2. **Whip-Pan & Push-In Camera:** Use `camAt` / `whipX` easing (`EASE_OUT`, `EASE_INOUT`) with organic handheld breathing and smooth scale drift.
3. **2.5D Parallax & Atmosphere:** Layer background/midground/foreground planes, add `DustMotes` inside warm light pools, and apply unified `FilmGrade` (vignette + subtle animated grain) across every scene.
4. **Short-Lived Headers:** Fade `HistoricalFrame` chapter header out after the opening 3 seconds (`frames 150..190`) so the canvas stays 100% clean.

---

## 4. Cause-and-Effect Conceptual SVGs & Character Acting
- **Conceptual Physics:** Every apparatus must visually demonstrate *why* the phenomenon happens (e.g., amber approaching -> field lines pulling needle; grounding probe swinging in -> spark discharging; current switching ON -> magnetic rings expanding -> compass deflecting; voltage plates turning ON -> electron ray bending toward `+`).
- **Grounded Character Rigs (`ThalesRig`):**
  - Characters sit behind tables/props (never floating cutouts above empty space).
  - Use 3/4 posture with asymmetric natural gestures (`ExpressiveHand` with staggered fingers + thumb), eye-tracking saccades, blinking lids, and progressive facial reactions (`amazeBlend`).

  - Ground every character rig solidly on floors/tables (never leave coat hems or shoes floating above floor lines) and use staggered-dot animated **thought bubbles** when visualizing internal scientific hypotheses.
- **Series & Experiment Intro (`180f` / `3.0s`):** Start standalone historical documentaries with a dedicated animated intro card (`বিদ্যুতের পাঠশালা` + popular experiment title + glowing minimal emblem draw-in) before Beat 1 voiceover begins.
- **Snappy Focus Camera (`24–28f` = `0.35s–0.45s`):** Use crisp 24–28 frame `camAt` focus zooms/pans synced to spoken phrases (avoid slow 8–10s drifts) and inspect rendered stills across zoom states to prevent prop/title overlaps (keep centered titles above tall props like lightning rods).
- **Historical Apparatus Accuracy:** Verify physical setups against primary sources (e.g., Franklin's Oct 19, 1752 letter: silk kite + 1-ft pointed wire + bridle/tail + wet hemp clear of shed frame + Y-junction knot with hanging brass key & dry silk ribbon held indoors; zero direct lightning strikes).
- **Cinema-Grade Dramatization & Indian Bengali (`bn-IN`) Directive:**
  - **Spatial Geography Entry (Globe-to-Lab Dive):** Open named historical city/country scenes with a continuous 2.5D/3D rotating globe zoom -> clouds/rooftops -> gliding through a window/doorway into the period room.
  - **Expressive Character Acting:** Always use articulated rigs (`ThalesRig`, `FranklinRig`, `MarsdenRig`, `VoltaRig`) with animated eyebrows, blinking/widening eyes, head tilts, and posture shifts (`curiosity -> frustration -> awe`).
  - **3-Layer Depth-of-Field (`LivingLabBackdrop`) & `CameraRig`:** Wrap scenes in `CameraRig` (dolly-push, lateral pan, rack-focus, macro crash-zoom, micro-drift) with `Z-Layer 0` (`7px` blur), `Z-Layer 1` (`3px` blur), `Z-Layer 2` (sharp hero), and `Z-Layer 3` (`10px` foreground bokeh).
  - **90/10 Visual-to-Text Ratio:** Keep 85%+ of frames free of explanatory text; use only 1–2 word diegetic stamps (`১৮০০`, `1 A`, `নুন-জল`).
  - **Indian Bengali Linguistic Lock (`bn-IN`):** Strictly use West Bengal Standard Bengali — **জল** (never পানি), **নুন-জল / লবণজল** (never লবণ পানি), **বাড়ি** (never বাসা), **স্নান** (never গোসল), **জলখাবার** (never নাস্তা), **খুব ভালো / দারুণ** (never অনেক ভালো), **লঙ্কা** (never মরিচ); WBBSE/WBCHSE terms (`তড়িৎকোষ`, `বর্তনী`, `বিভব প্রভেদ`, `পরিবাহী`, `অপরিবাহী/অন্তরক`, `রোধ`, `তড়িৎ প্রবাহ`).
- **On-Screen Numerals Rule:** ALL numbers displayed on screen (dates, episode numbers, amperes, volts, percentages, counts) MUST use **English/Arabic numerals (`0–9`)** (e.g., `6A সুইচ`, `1752`, `1800`, `2,500`, `0%`, `5 IN = 5 OUT`), while `tts_bn` continues using spoken Bengali.
