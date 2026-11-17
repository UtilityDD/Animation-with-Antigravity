# 🎙️ AUDIO GUIDELINES & VOICE DIRECTION — «বিদ্যুতের পাঠশালা 2.0»

### 1. Voice Engine, Mastering & Loudness
- **Voice Engine:** Cartesia AI (`sonic-3.6`, Bengali storyteller *Arindam*, ID `cd983593-81f5-4b9d-abad-21791ee86363`).
- **Delivery Pace:** `115–135 WPM` — warm, expressive, dynamic Indian Bengali storyteller varying speed, pitch, and deliberate `350–600 ms` pre-reveal silences.
- **Browser-Compliant Format:** Convert raw API WAV outputs via FFmpeg to **48 kHz / 320 kbps Stereo MP3** (`<beat>.mp3`) to avoid Chrome HTML5 `<audio>` WAV chunk-header decode failures.
- **Broadcast Mix Targets:** Master loudness **`-14 LUFS`**, true peak **`-1.0 dBTP`**, ambient music ducked **`-18 dB`** (`volume={0.11–0.14}`) behind `volume={1.0}` voiceover.
- **Tight Beat Padding (`audioFrames + 18f`):** Measure every synthesized MP3 with `ffprobe` and pad beats by at most `+18f` (`0.30s`), never `+70f+`, to avoid dead air and voice/visual drift. Align mid-beat SFX and visual transitions to actual spoken phrase timestamps.

### 2. Emotional Acting Tags & Pre-Reveal Silences (`word_choreography.json` Track 1)
Every spoken phrase (`1.0–2.2s`) carries a vocal acting tag and timestamp (`start_ms`, `end_ms`):
- `[WHISPERED]` — Intimate opening sensory hook (Act 1).
- `[CURIOUS]` — Questioning everyday anomalies or historical puzzles.
- `[FOCUS]` — Step-by-step microscopic mechanism & apparatus reveals.
- `[SKEPTIC]` — Act 4 Constructive Confusion pivot (*"এতক্ষণ যা জানলেন, তাতে আপনার মনে কি এখন একটা খটকা লাগছে?"*).
- `[CONFUSION]` — Voicing unresolved physics paradoxes before promising clarity in upcoming courses.

### 3. Indian Bengali Linguistic Lock (`bn-IN`)
All narration, labels, and captions MUST use natural **West Bengal Standard Bengali**:
- **Mandatory Vocabulary:** **জল** (never *পানি*), **নুন-জল / লবণজল** (never *লবণ পানি*), **বাড়ি / ঘর** (never *বাসা* for home), **স্নান** (never *গোসল*), **জলখাবার** (never *নাস্তা*), **খুব ভালো / দারুণ** (never *অনেক ভালো*), **লঙ্কা** (never *মরিচ*), **জুতো / কাচ**.
- **WBBSE / WBCHSE Physics Terms:** `তড়িৎকোষ`, `বর্তনী`, `বিভব প্রভেদ`, `পরিবাহী`, `অপরিবাহী / অন্তরক`, `রোধ`, `তড়িৎ প্রবাহমাত্রা`.

### 4. Dual-Track Script & Spoken-Year TTS Normalizer (`display_bn` vs. `tts_bn`)
- **Captions / On-Screen (`display_bn`):** Keep clean Bengali numerals (`১৭৫২`, `১৮১৪`, `১.৫ V`, `২২০ V`).
- **Voice Input (`tts_bn`):** MUST pass through `normalize_bn_in_tts()` (verified by `tools/validation/validate_episode_v2.py`) so **zero raw 4-digit years** enter TTS:
  - `1600` → **ষোলোশো** | `1752` → **সতেরোশো বাহান্ন** | `1799` → **সতেরোশো নিরানব্বই** | `1800` → **আঠারোশো** | `1814` → **আঠারোশো চোদ্দো** | `1820` → **আঠারোশো বিশ** | `1831` → **আঠারোশো একত্রিশ** | `1897` → **আঠারোশো সাতানব্বই** | `1909` → **উনিশশো নয়** | `2026` → **দুহাজার ছাব্বিশ**.
  - `খ্রি.পূ. ~৬০০` → **খ্রিস্টপূর্ব প্রায় ছশো অব্দ** | `১.৫ V` → **দেড় ভোল্ট** | `২২০ V` → **দুশো কুড়ি ভোল্ট** | `জে. জে. থমসন` → **জে জে থমসন**.
  - Comma-separated counts (`৮,০০০`, `১,৮৩৬`) → **আট হাজার**, **এক হাজার আটশো ছত্রিশ**.

### 5. Synchronized Foley & Sound Effects (SFX)
All SFX are synthesized at **48 kHz Stereo MP3** and placed on exact visual-impact frames:
- **EP01 / General:** `sfx_page_flip.mp3`, `sfx_whoosh_dive.mp3`, `sfx_spark_crackle.mp3`, `sfx_feather_snap.mp3`
- **Franklin 1752:** `sfx_rain_gentle.mp3`, `sfx_thunder_distant.mp3`, `sfx_key_tick_jar.mp3`
- **EP02:** `sfx_scint_flash.mp3`, `sfx_cannon_boom.mp3`, `sfx_charge_whoosh.mp3`, `sfx_timer_tick.mp3`
- **EP03:** `sfx_leyden_crack.mp3`, `sfx_bell_ding.mp3`, `sfx_whoosh_zoom.mp3`
