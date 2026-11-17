# Sound Design & Audio Engineering Map (`shuktara-bidyut-suraksha-animation`)

## 1. Master Audio Specifications
- **Total Duration**: `180.00 seconds` (`03:00.00` / `5400 frames @ 30.00 fps`)
- **Sample Rate / Bit Depth**: `44,100 Hz`, `16-bit PCM Stereo` (`.wav`) & `192 kbps CBR Stereo` (`.mp3`)
- **Integrated Loudness Target**: `-14.0 LUFS` (Broadcast / Web Educational Standard), True Peak `-1.0 dBTP`
- **Voiceover Language & Dialect**: Standard Colloquial Bengali (চলিত বাংলা - `bn-IN-TanishaaNeural` & `bn-IN-BashkarNeural` / `gTTS` fallback)
- **Sidechain Ducking**: Background score and ambient weather beds automatically duck by `-8.5 dB` (`attack: 80ms`, `release: 350ms`) during active voiceover segments to maintain `+10 dB` vocal intelligibility margin.

---

## 2. Frequency Allocation & Mixing Architecture

| Stem Category | Primary Frequency Band | Dynamic Level (dBFS) | Stereo Imaging | DSP / Filtering Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Bengali Voiceover (VO)** | `180 Hz – 6,500 Hz` | `-3.0 dB` to `-1.5 dB` | Center (`0.0 Pan`) | High-pass @ `90 Hz`, presence boost `+2.5 dB @ 3.2 kHz` |
| **Bengal Folk Score (Ektara/Flute/Dhaak)** | `110 Hz – 4,200 Hz` | `-18.0 dB` (ducked `-26 dB`) | Wide (`-0.45` to `+0.45`) | C-Major / Bilawal Pentatonic (`C4, D4, E4, G4, A4, C5`) |
| **Kalbaishakhi Wind & Monsoon Rain** | `250 Hz – 12,000 Hz` | `-16.0 dB` to `-11.0 dB` | Full Stereo (`-0.8` to `+0.8`) | Pink/white noise shaped with slow LFO (`0.18 Hz`) bandpass |
| **50Hz Transformer Hum & 11kV Arc** | `50 Hz / 100 Hz + 2.5–9 kHz` | `-9.0 dB` to `-4.0 dB` | Scene-specific (`-0.3` to `+0.6`) | Fundamental `50 Hz` + odd harmonics (`150 Hz, 250 Hz, 350 Hz`) + impulse crackle |
| **Thunder / Bunny-Hop / Switch Foley** | `40 Hz – 1,800 Hz` | `-6.0 dB` to `-2.0 dB` | Localized Spot Pan | Low-end transient punch + exponential decay envelope |

---

## 3. Frame-Accurate Timeline & Cue Sheet (00:00.00 – 03:00.00 | 5,400 Frames)

| Act / Scene | Timecode (`MM:SS.ms`) | Frame Range (`@30fps`) | Audio Stem / Event Type | Cue Description & Bengali Voiceover / Foley Synthesis | Peak Level | Stereo Pan | Frequency Focus |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Act 1 / Sc 1** | `00:00.00 – 00:06.00` | `0000 – 0180` | **Foley + Folk Score** | Village school bell (`880 Hz + 1320 Hz` metallic strike @ `t=1.5s`), koel/sparrow FM chirps (`2.2–3.8 kHz`), soft Ektara pluck (`C3=130.81 Hz`). | `-10.0 dB` | `-0.25 L` | `130 Hz – 4.5 kHz` |
| **Act 1 / Sc 1** | `00:02.00 – 00:14.00` | `0060 – 0420` | **Voiceover (`act1_vo_1`)** | *"বর্ষার মেঘ ডাকলেই বদলে যায় আমাদের চেনা গাঁয়ের পথঘাট। কালবৈশাখী আর প্রবল বৃষ্টির পর স্কুল থেকে ফেরার পথে লুকিয়ে থাকতে পারে অজানা বিপদ।"* | `-2.0 dB` | `0.0 C` | `180 Hz – 6.0 kHz` |
| **Act 1 / Sc 1–2** | `00:06.00 – 01:05.00` | `0180 – 1950` | **Ambient Weather Bed** | Rising Kalbaishakhi gale wind (swept bandpass noise `300–1400 Hz`) + heavy monsoon rain patter on mud & leaves. | `-13.5 dB` | `Wide L/R` | `250 Hz – 10 kHz` |
| **Act 1 / Sc 2** | `00:15.00 – 00:28.00` | `0450 – 0840` | **Voiceover (`act1_vo_2`)** | *"কিন্তু ঝড়ের পর মাটির রাস্তায় লুকিয়ে থাকে এক মারাত্মক বিপদ—ছেঁড়া বিদ্যুতের তার! জমা জলে এই তার পড়লে পুরো জলেই ছড়িয়ে পড়ে মারণ বিদ্যুৎ।"* | `-2.0 dB` | `0.0 C` | `180 Hz – 6.0 kHz` |
| **Act 1 / Sc 2** | `00:15.50 – 00:19.00` | `0465 – 0570` | **SFX: Thunder & Snap** | Kalbaishakhi rolling thunderclap (`40–180 Hz` sub-rumble @ `t=15.5s`) + metallic wire snap whip (`t=17.5s`). | `-2.5 dB` | `+0.35 R` | `40 Hz – 3.5 kHz` |
| **Act 1–2 / Sc 2–3**| `00:18.00 – 00:45.00` | `0540 – 1350` | **SFX: Live 11kV Wire** | Continuous `50 Hz` grid hum + `100/150/250 Hz` harmonics + erratic high-voltage arc sputtering in puddle (`t=18s–45s`). | `-7.5 dB` | `+0.40 R` | `50 Hz – 8.5 kHz` |
| **Act 2 / Sc 3** | `00:31.00 – 00:44.00` | `0930 – 1320` | **Voiceover (`act2_vo_1`)** | *"সাবধান বিশু, ওদিকে যেও না! খেলার বলের চেয়ে জীবনের দাম অনেক বেশি। জমা জলে বিদ্যুতের তার থেকে চারপাশের মাটিতে তৈরি হয় ধাপ বিভব বা স্টেপ পটেনশিয়াল।"* | `-1.8 dB` | `0.0 C` | `180 Hz – 6.2 kHz` |
| **Act 2 / Sc 4** | `00:45.00 – 01:03.00` | `1350 – 1890` | **Voiceover (`act2_vo_2`)** | *"থামো! ভেজা মাটিতে বা জমা জলে ছেঁড়া তার দেখলে ভুলেও এগোবে না। দুই পা একসাথে জোড়া রেখে খরগোশের মতো লাফিয়ে অন্তত ত্রিশ ফুট দূরে যাও, নয়তো পা না তুলে ঘষে ঘষে পিছাও!"* | `-1.8 dB` | `0.0 C` | `180 Hz – 6.2 kHz` |
| **Act 2 / Sc 4** | `00:46.00 – 00:56.00` | `1380 – 1680` | **Foley: Diagram & Hops** | Step-potential concentric ring chime (`523.25 Hz -> 659.25 Hz` @ `t=46s`), followed by 4 synchronized two-foot bunny-hop mud thuds (`t=52s, 53s, 54s, 55s`). | `-6.0 dB` | `-0.15 L` | `65 Hz – 2.4 kHz` |
| **Act 3 / Sc 5** | `01:06.00 – 01:19.00` | `1980 – 2370` | **Voiceover (`act3_vo_1`)** | *"বৃষ্টির দিনে ঘরের বারান্দা বা রান্নাঘরেও চাই বাড়তি সতর্কতা। বৃষ্টির জলে ভেজা হাতে কখনও সুইচবোর্ডে হাত দেবে না।"* | `-2.0 dB` | `0.0 C` | `180 Hz – 6.0 kHz` |
| **Act 3 / Sc 5–6** | `01:06.00 – 01:25.00` | `1980 – 2550` | **Foley: Verandah Drips** | Resonant water droplets hitting tin roof & brass bucket (`sine pitch-drop 900->1200 Hz` pulses @ `t=66s–85s`) + wall switch spark warning buzz. | `-11.0 dB` | `-0.40 L` | `600 Hz – 3.2 kHz` |
| **Act 3 / Sc 6** | `01:20.00 – 01:38.00` | `2400 – 2940` | **Voiceover (`act3_vo_2`)** | *"ভেজা হাতে বা খালি পায়ে কখনও সুইচবোর্ড, প্লাগ বা মোটর স্পর্শ করবে না। পায়ে শুকনো রাবারের জুতো পরো। আর জমা জলে দাঁড়িয়ে বিদ্যুতের খুঁটি বা টানা তার হাত দিয়ে ধরা অত্যন্ত বিপজ্জনক!"* | `-2.0 dB` | `0.0 C` | `180 Hz – 6.0 kHz` |
| **Act 3 / Sc 6** | `01:20.00 – 01:24.00` | `2400 – 2520` | **SFX: Bidyut Bondhu** | Magical lantern harmonic shimmer (`C5-E5-G5-B5` bell arpeggio @ `t=80s`) + warm protective barrier hum (`220 Hz`). | `-8.0 dB` | `+0.20 R` | `220 Hz – 5.0 kHz` |
| **Act 4 / Sc 7** | `01:41.00 – 01:54.00` | `3030 – 3420` | **Voiceover (`act4_vo_1`)** | *"শরৎ বা বর্ষার বিকেলে খোলা মাঠে ঘুড়ি ওড়াতে সবারই ভালো লাগে। কিন্তু মাঞ্জা বা ভেজা সুতোয় তড়িৎ পরিবাহী হতে পারে।"* | `-2.0 dB` | `0.0 C` | `180 Hz – 6.0 kHz` |
| **Act 4 / Sc 7–8** | `01:40.00 – 02:15.00` | `3000 – 4050` | **Foley: Kite & 11kV Line**| Open paddy-field breeze, paper kite flutter (`t=102s–115s`), menacing 11kV overhead feeder corona buzz (`t=110s`), red ❌ hazard buzzer (`t=118s`). | `-7.0 dB` | `-0.35 to +0.35`| `100 Hz – 6.5 kHz` |
| **Act 4 / Sc 8** | `01:55.00 – 02:13.00` | `3450 – 3990` | **Voiceover (`act4_vo_2`)** | *"বিদ্যুতের লাইনের কাছে বা ট্রান্সফরমারের পাশে ভুলেও ঘুড়ি ওড়াবে না। তারে ঘুড়ি আটকে গেলে কখনও কাঁচা বাঁশ বা লাঠি দিয়ে নামানোর চেষ্টা করবে না, বা ট্রান্সফরমারের বেড়ায় উঠবে না!"* | `-1.8 dB` | `0.0 C` | `180 Hz – 6.2 kHz` |
| **Act 5 / Sc 9** | `02:16.00 – 02:29.00` | `4080 – 4470` | **Voiceover (`act5_vo_1`)** | *"দুর্ঘটনাবশত কাউকে কারেন্ট স্পর্শ করলে আতঙ্কিত হয়ে খালি হাতে তাকে ধরতে যাবে না—তাতে তুমিও বিদ্যুৎস্পৃষ্ট হতে পারো!"* | `-1.8 dB` | `0.0 C` | `180 Hz – 6.2 kHz` |
| **Act 5 / Sc 9–10**| `02:16.00 – 02:35.00` | `4080 – 4650` | **SFX: Emergency Pulse** | Urgent double heartbeat pulse (`60 Hz` thump @ `t=136s–145s`), decisive heavy iron Main Switch Lever CLUNK OFF (`t=146.0s`), warm C-major relief pad (`t=152s`). | `-5.0 dB` | `0.0 C` | `55 Hz – 2.8 kHz` |
| **Act 5 / Sc 10** | `02:30.00 – 02:43.00` | `4500 – 4890` | **Voiceover (`act5_vo_2`)** | *"কাউকে কারেন্ট স্পর্শ করলে খালি গায়ে স্পর্শ করবে না! দ্রুত মেন সুইচ বন্ধ করো এবং শুকনো কাঠ বা শুকনো বাঁশ দিয়ে তাকে তার থেকে আলাদা করো, ও বড়দের ডেকে আনো।"* | `-1.8 dB` | `0.0 C` | `180 Hz – 6.2 kHz` |
| **Act 6 / Sc 11** | `02:46.00 – 02:59.00` | `4980 – 5370` | **Voiceover (`act6_vo_1`)** | *"ছেঁড়া তার বা বিপদ দেখলেই বড়দের জানাও এবং ফোন করো পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বন্টন নিগমের টোল-ফ্রি নম্বর ১৯১২১-এ, অথবা অ্যাম্বুলেন্সের জন্য ১০২ নম্বরে। সতর্কতাতেই লুকিয়ে আছে জীবন সুরক্ষা!"* | `-1.5 dB` | `0.0 C` | `180 Hz – 6.5 kHz` |
| **Act 6 / Sc 11** | `02:46.00 – 03:00.00` | `4980 – 5400` | **SFX + Finale Score** | Dual-tone telephone ring (`440 Hz + 480 Hz` modulated @ `20 Hz`, `t=166s`), uplifting Bengal Dhaak & Flute celebratory cadence (`t=170s–180s`), clean fade-out to `180.00s`. | `-6.5 dB` | `Full Stereo` | `90 Hz – 7.5 kHz` |

---

## 4. Exported Audio Deliverables
1. `electricity-safety-wb/public/audio/master_soundtrack.wav` — Uncompressed 44.1 kHz 16-bit Stereo Master (`180.00s` exact)
2. `electricity-safety-wb/public/audio/master_soundtrack.mp3` — 192 kbps CBR Stereo MP3 Master (`180.00s` exact, Remotion ready)
3. `electricity-safety-wb/public/audio/act1_vo.mp3` through `act6_vo.mp3` — Individual Act Bengali Voiceover Stems
4. `electricity-safety-wb/subtitles/electricity_safety_wb_bn.srt` — Frame-accurate Bengali SubRip Subtitle File
