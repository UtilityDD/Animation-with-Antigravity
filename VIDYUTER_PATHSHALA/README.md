# বিদ্যুতের পাঠশালা
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
