# Shuktara Bidyut Suraksha Animation (শুকতারা বিদ্যুৎ সুরক্ষা)

A complete 3-minute (180.00s, 5400 frames @ 30 FPS, 1080p Full HD) 2.5D animated motion graphic film on electrical safety and monsoon precautions designed for rural West Bengal primary and middle school students.

## Project Structure

```
electricity-safety-wb/
├── dist/
│   ├── electricity_safety_wb_rural.mp4  # Master rendered 1080p animation video
│   ├── preview_frame_500.png            # Act 1 snapped wire preview
│   ├── preview_frame_1500.png           # Act 2 Step Potential diagram preview
│   ├── preview_frame_2500.png           # Act 3 wet hands & mascot preview
│   └── preview_frame_5200.png           # Act 6 emergency card 19121 preview
├── public/
│   └── audio/
│       ├── master_soundtrack.mp3        # Master 180s Bengali VO + Foley + Folk score
│       ├── master_soundtrack.wav        # Master uncompressed WAV
│       └── act[1-6]_vo.mp3              # Individual Act dialogue stems
├── scripts/
│   └── synthesize_audio.py              # Procedural audio & voiceover synthesizer
├── src/
│   ├── components/
│   │   ├── Acts/
│   │   │   ├── Act1MonsoonDanger.tsx    # 0:00 - 0:30 (Frames 0–900)
│   │   │   ├── Act2StepPotential.tsx    # 0:30 - 1:05 (Frames 900–1950)
│   │   │   ├── Act3WetHands.tsx         # 1:05 - 1:40 (Frames 1950–3000)
│   │   │   ├── Act4KiteDanger.tsx       # 1:40 - 2:15 (Frames 3000–4050)
│   │   │   ├── Act5FirstAid.tsx         # 2:15 - 2:45 (Frames 4050–4950)
│   │   │   └── Act6EmergencyCard.tsx    # 2:45 - 3:00 (Frames 4950–5400)
│   │   ├── Characters.tsx               # Mitu, Bishu & Bidyut Bondhu puppet rigs
│   │   ├── EnvironmentProps.tsx         # School, mud huts, electric poles, groves
│   │   ├── ParallaxStage.tsx            # 4-layer 2.5D depth plane parallax engine
│   │   └── SubtitleHUD.tsx              # Synchronized Bengali/English subtitles
│   ├── Root.tsx                         # Remotion Root composition
│   ├── SceneManager.tsx                 # Master timeline orchestrator
│   └── index.ts                         # Remotion entrypoint
├── subtitles/
│   └── electricity_safety_wb_bn.srt     # Frame-accurate timed SRT subtitles
├── SOUND_DESIGN_MAP.md                  # Comprehensive sound design engineering map
├── remotion.config.ts                   # Renderer configuration
└── package.json
```

## Quick Commands

- **Preview interactively in Remotion Studio:**
  ```bash
  npm run start
  ```
- **Re-render video:**
  ```bash
  npm run build
  ```
- **Run TypeScript check:**
  ```bash
  npm run typecheck
  ```

