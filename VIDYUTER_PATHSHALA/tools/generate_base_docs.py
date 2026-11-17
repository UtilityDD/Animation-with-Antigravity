# -*- coding: utf-8 -*-
"""
Generate foundational project documents for VIDYUTER PATHSHALA
(বিদ্যুতের পাঠশালা — Electricity Explained: From Zero to the Power Grid)
"""

import os

base_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA"

docs = {}

docs["README.md"] = """# বিদ্যুতের পাঠশালা
## Electricity Explained — From Zero to the Power Grid
**Tagline:** *শূন্য থেকে বিদ্যুতের জগৎকে বোঝা।*

---

## 📌 Project Identity
- **Bengali Title:** বিদ্যুতের পাঠশালা
- **English Title:** Electricity Explained — From Zero to the Power Grid
- **Scope:** 50-Episode Animated Scientific Educational Series
- **Target Audience:** Class 8–12, WBCHSE, CBSE, JEE Aspirants, ITI & Polytechnic, Undergraduate EE Students, and Curious Bengali Learners.
- **Production Standard:** Kurzgesagt-grade visual clarity & TED-Ed pacing built with Remotion (React + TypeScript), vector SVG animations, and Edge TTS Bengali voiceover.

## 🎯 Educational Philosophy
1. **Concept before formula:** Intuitive physical comprehension precedes mathematical definitions.
2. **Visualization before memorization:** Students see charges, fields, circuits, and waveforms in motion.
3. **Mechanism before definition:** We explain *why* phenomena happen at microscopic and system levels.
4. **Meaningful analogies before abstraction:** Real-world parallels ground concepts, with their limitations transparently mapped.
5. **Scientific rigor:** No confusing electron drift with signal propagation; no implying bulbs 'consume' electrons; distinct conventional current vs electron flow.

---

## 📂 Repository Architecture
```text
VIDYUTER_PATHSHALA/
├── README.md                     # Master project overview and manifest
├── PROJECT_STATUS.md             # Live production tracker across all 50 episodes
├── CHANGELOG.md                  # Detailed version logs and milestone achievements
│
├── docs/                         # Project standards and documentation
│   ├── PROJECT_OVERVIEW.md       # Comprehensive vision and delivery metrics
│   ├── MASTER_CURRICULUM.md      # Complete 50-episode detailed syllabus
│   ├── EPISODE_DEPENDENCY_MAP.md # Prerequisite graph and learning progression
│   ├── VISUAL_STYLE_GUIDE.md     # Color palettes, typography, UI cues, motion rules
│   ├── SCIENCE_ACCURACY_GUIDE.md # Canonical engineering laws and misconceptions
│   ├── BENGALI_TERMINOLOGY.md    # English-to-Bengali scientific glossary
│   ├── ANALOGY_LIBRARY.md        # Verified analogies with boundary conditions
│   ├── AUDIO_GUIDELINES.md       # Voiceover, ambient pads, SFX sync rules
│   └── PRODUCTION_GUIDELINES.md  # 12-step pipeline from research to final MP4
│
├── episodes/                     # Episode packages
│   ├── EP01/                     # Episode 1: বিদ্যুৎ আসলে কী? (What Is Electricity?)
│   │   ├── script_bn.md          # Full Bengali narration script
│   │   ├── script_en_notes.md    # Scene-by-scene English technical cues
│   │   ├── storyboard.md         # Visual timeline with frame cues
│   │   ├── visual_assets.md      # SVG/asset specifications
│   │   ├── science_review.md     # Rigorous scientific fact-check
│   │   ├── analogy_notes.md      # Analogy breakdown and breakdown points
│   │   ├── captions.srt          # Synchronized Bengali SRT subtitles
│   │   ├── quiz.md               # 5-question comprehension assessment
│   │   ├── glossary.md           # Episode specific vocabulary
│   │   └── production_notes.md   # Render stats and scene timestamps
│   └── ... EP02 to EP50 (Registry)
│
├── shared/                       # Shared design system components & styles
│   ├── components/               # Header, SubtitleBanner, ChargeIndicator, CircuitSymbols
│   ├── illustrations/            # AtomModel, BatteryCell, FilamentBulb, Switch
│   └── typography/               # Bengali typography & styles
│
├── src/                          # Remotion React production source code
│   ├── components/               # Modular SVG & React visual components
│   ├── scenes/                   # Scene 1 through Scene 8 timeline compositions
│   └── compositions/             # Master composition for Episode 1
│
├── public/                       # Assets, TTS narration mp3s, fonts
│   ├── fonts/                    # Hind Siliguri & Noto Sans Bengali TTFs
│   └── audio/                    # Rendered voiceover segments & SFX
│
└── renders/                      # Rendered video outputs
    ├── previews/                 # Low-latency test renders
    └── final/                    # Full HD 1080p final production MP4s
```

---

## 🚀 Quick Start
### Prerequisites
- Node.js 18+
- Python 3.10+ (with `edge-tts`)
- FFmpeg 6.0+

### Preview in Remotion Studio
```bash
cd electricity-safety-wb
npm start
```
Select `VidyuterPathshalaEP01` from the Remotion sidebar.

### Render Episode 1 to MP4
```bash
cd electricity-safety-wb
npx remotion render src/index.ts VidyuterPathshalaEP01 ../VIDYUTER_PATHSHALA/renders/final/EP01_What_Is_Electricity.mp4 --gl=angle
```
"""

docs["PROJECT_STATUS.md"] = """# 📊 PROJECT STATUS: বিদ্যুতের পাঠশালা
*Last Updated: 2026-11-16*

## Overall Progress
- **Total Episodes Planned:** 50
- **Master Curriculum:** Completed (Level 1 to Level 6 + Advanced Extension)
- **Foundation Standards:** Completed (Style Guide, Accuracy Guide, Terminology, Analogies)
- **Episode 01 Status:** **Phase B Complete — Master Remotion Composition & Render Engine Deployed**

---

## Episode Production Roadmap

| Level | Title | Episodes | Status |
|---|---|---|---|
| **Level 1** | Understanding Electricity (Beginner) | EP01 – EP09 | EP01 Ready; EP02–09 Registered |
| **Level 2** | Circuits & Components (Beginner–Interm.) | EP10 – EP18 | Syllabus Locked |
| **Level 3** | Magnetism & Electrical Machines (Interm.) | EP19 – EP25 | Syllabus Locked |
| **Level 4** | AC Electricity & Advanced Concepts | EP26 – EP32 | Syllabus Locked |
| **Level 5** | From Power Station to Your Home | EP33 – EP40 | Syllabus Locked |
| **Level 6** | Modern Electrical Power Systems | EP41 – EP45 | Syllabus Locked |
| **Extension**| Advanced Engineering Extension | EP46 – EP50 | Syllabus Locked |

---

## Episode 01 Deliverables Matrix
- [x] Bengali Narration Script (`episodes/EP01/script_bn.md`)
- [x] English Technical Notes (`episodes/EP01/script_en_notes.md`)
- [x] Scene-by-Scene Storyboard (`episodes/EP01/storyboard.md`)
- [x] Visual Asset Specifications (`episodes/EP01/visual_assets.md`)
- [x] Scientific Review & Misconception Check (`episodes/EP01/science_review.md`)
- [x] Analogy Notes (`episodes/EP01/analogy_notes.md`)
- [x] Bengali SRT Captions (`episodes/EP01/captions.srt`)
- [x] Student Quiz (`episodes/EP01/quiz.md`)
- [x] Technical Glossary (`episodes/EP01/glossary.md`)
- [x] Remotion Scene Compositions (Scene 1 to Scene 8)
- [x] High-Quality Edge-TTS Bengali Voiceover (`bn-IN-BashkarNeural`)
- [x] Synchronized Subtitles & Motion Graphics
- [x] Final 1080p Master Render Output
"""

docs["CHANGELOG.md"] = """# 📝 CHANGELOG — বিদ্যুতের পাঠশালা

## [1.0.0] - 2026-11-16
### Initial Release & Episode 1 Production
- **Foundational Architecture:**
  - Established canonical project folder structure and master roadmap.
  - Published master guides: `PROJECT_OVERVIEW.md`, `MASTER_CURRICULUM.md`, `EPISODE_DEPENDENCY_MAP.md`, `VISUAL_STYLE_GUIDE.md`, `SCIENCE_ACCURACY_GUIDE.md`, `BENGALI_TERMINOLOGY.md`, `ANALOGY_LIBRARY.md`, `AUDIO_GUIDELINES.md`, `PRODUCTION_GUIDELINES.md`.
- **Episode 01 ("বিদ্যুৎ আসলে কী? — What Exactly Is Electricity?"):**
  - Generated full Bengali narration script across 8 distinct scenes.
  - Formatted SRT subtitles with frame-accurate timing.
  - Synthesized natural Bengali voice tracks via Edge-TTS `bn-IN-BashkarNeural`.
  - Implemented 8 Remotion scenes in React/TypeScript:
    - Scene 1: The Hook (Lamp, Comb, Lightning, Ceiling Fan).
    - Scene 2: The Invisible Phenomenon (Wind analogy vs. Electric effects).
    - Scene 3: Electric Charge (Subatomic atom model: protons, neutrons, orbiting electron cloud).
    - Scene 4: Static Electricity (Hair friction, charge transfer, paper scrap attraction).
    - Scene 5: Current Electricity (Battery, switch, wires, bulb filament, electron drift vs conventional current).
    - Scene 6: Electricity Around Us (Multi-panel energy conversion: Heat, Motion, Light, Sound).
    - Scene 7: The Big Takeaway (Synthesis diagram connecting static charge and continuous current).
    - Scene 8: Recap & Next Episode Teaser (Atoms & Electric Charge preview).
  - Built comprehensive episode deliverables: Script, Storyboard, Quiz, Glossary, Scientific Verification notes.
"""

for fname, content in docs.items():
    fpath = os.path.join(base_dir, fname)
    os.makedirs(os.path.dirname(fpath), exist_ok=True)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print(f"Base documentation generated successfully in {base_dir}")
