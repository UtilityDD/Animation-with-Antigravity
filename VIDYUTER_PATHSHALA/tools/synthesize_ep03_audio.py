# -*- coding: utf-8 -*-
"""
Synthesize 6-beat Bengali narration for Episode 03: «চার্জের গতি ও তড়িৎ প্রবাহ»
using Cartesia sonic-3.6 (Arindam), converting to 48 kHz Stereo MP3,
plus crisp period/lab SFX (leyden crack, disc clink, bell ding, crash-zoom whoosh).
"""
import json
import os
import subprocess
import urllib.request
import numpy as np
import wave

ROOT = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity"
KEY_PATH = os.path.join(ROOT, "electricity-safety-wb", "cartesia_API.txt")
OUT_DIR = os.path.join(ROOT, "electricity-safety-wb", "public", "vidyuter-pathshala", "audio", "ep03")
TMP_DIR = r"C:\Users\rouma\.gemini\antigravity\brain\13fcc41d-b1bc-445a-a2d5-a4a5bc0ea1f1\scratch\ep03_tmp"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TMP_DIR, exist_ok=True)

with open(KEY_PATH, "r", encoding="utf-8") as f:
    cartesia_key = f.read().strip()

VOICE_ID = "cd983593-81f5-4b9d-abad-21791ee86363"  # Arindam

SCENES = [
    (
        "stage1_volta",
        "আঠারোশো সাল, উত্তর ইতালি। পুরো অষ্টাদশ শতাব্দী জুড়ে বিজ্ঞানীদের বড় হতাশা ছিল—লেইডেন জারের স্ফুলিঙ্গ মাত্র এক মুহূর্তের জন্য ঝলকে উঠেই অন্ধকারে মিলিয়ে যেত, কখনো স্থায়ী নদী হয়ে বইত না। সেই অসাধ্য সাধন করলেন আলেসান্দ্রো ভোল্টা। তামার চাকতি, নুন-জলে ভেজানো কার্ডবোর্ড আর দস্তার চাকতি একের পর এক সাজিয়ে তৈরি করলেন পৃথিবীর প্রথম ব্যাটারি—ভোল্টায়িক পাইল! তার দুটি জলের পাত্রে ছোঁয়াতেই চমক—একটানা অবিচ্ছিন্ন গ্যাসের বুদবুদ উঠতে শুরু করল, প্রমাণ হলো প্রথম স্থায়ী তড়িৎ প্রবাহ!"
    ),
    (
        "stage2_timeline",
        "এই স্থায়ী প্রবাহের যাত্রাপথ বদলে দিল বিজ্ঞান। ১৭৯১ সালে লুইজি গ্যালভানি ধাতব হুকে ব্যাঙের পেশির কম্পন দেখে এই রহস্যের বীজ বুনলেন। ১৮০০ সালে ভোল্টা দিলেন নিরবচ্ছিন্ন উৎস। ১৮২০ সালে ওরস্টেড ও অ্যাম্পিয়ার দেখালেন জীবন্ত তারের নিচে কম্পাসের কাঁটা ঘুরে যায়—আর অ্যাম্পিয়ার এই প্রবাহের নাম দিলেন তড়িৎ প্রবাহ। ১৮২৭-এ জর্জ ওহম দেখালেন সরু তারে বাধার প্রভাব, যা আজকের আধুনিক মাইক্রোচিপ ও পাওয়ার গ্রিডের ভিত্তি!"
    ),
    (
        "stage3_crashzoom",
        "ভোল্টার সেই উনিশ শতকের তামার তার থেকে চলুন সোজা ডুব দিই আজকের আধুনিক ল্যাবের একটি সাধারণ বৈদ্যুতিক কেবলের ভেতরে! কমলা রঙের আবরণ সরিয়ে যদি একটি মাত্র সূক্ষ্ম তামার আঁশের গভীরে ঢুকে পড়ি, তবে দেখতে পাব আসল জাদু!"
    ),
    (
        "stage4a_copper",
        "বদ্ধ পুকুরের স্থির জলের মতো স্থির তড়িতে চার্জ একই জায়গায় আটকে থাকে। কিন্তু তড়িৎ প্রবাহ হলো বয়ে চলা নদীর মতো। তামার কেলাসের ভেতর ধনাত্মক আয়নগুলো নিজেদের জায়গায় কাঁপতে থাকে, আর সুইচ বন্ধ থাকলে মুক্ত ইলেকট্রনগুলো এলোমেলো ছোটাছুটি করে—কোনো দিকেই এগোয় না। কিন্তু ব্যাটারি জুড়তেই এক অদৃশ্য বৈদ্যুতিক চাপে সব ইলেকট্রন ধীরে ধীরে একই দিকে বইতে শুরু করে!"
    ),
    (
        "stage4b_marble_ammeter",
        "কিন্তু ইলেকট্রন তো সেকেন্ডে মাত্র কয়েক মিলিমিটার এগোয়—তাহলে সুইচ টিপতেই ঘর আলোকিত হয় কীভাবে? মার্বেল-ভর্তি এই কাচের নলের দিকে তাকান! বাঁ দিক থেকে একটি মার্বেল সামান্য ঠেলতেই ডান প্রান্তের মার্বেলটি মুহূর্তেই ছিটকে ঘণ্টি বাজিয়ে দেয়—কারণ তার আগে থেকেই ইলেকট্রনে ঠাসা! আর এই প্রবাহ মাপার জন্য বসানো চেকপয়েন্ট গেট গুনতে থাকে প্রতি সেকেন্ডে কত চার্জ যাচ্ছে—কম প্রবাহে এক অ্যাম্পিয়ার, আর ব্যাটারি বাড়ালে তিন অ্যাম্পিয়ার! মনে রাখবেন, ইলেকট্রন যায় মাইনাস থেকে প্লাসে, কিন্তু ১৮২০-এর প্রচলিত প্রবাহ দেখানো হয় প্লাস থেকে মাইনাসে।"
    ),
    (
        "stage4c_recap_teaser",
        "আজ আমরা দেখলাম স্থায়ী তড়িৎ প্রবাহ, তাৎক্ষণিক সংকেত আর অ্যাম্পিয়ারের মাপ। কিন্তু একটি ছোট দেড় ভোল্টের ব্যাটারিতে বাল্ব ম্লান জ্বলে, আর নয় ভোল্টে কেন ঝলমল করে জ্বলে ওঠে? পরের পর্বে আমরা জানব সেই ধাক্কার আসল নাম—ভোল্টেজ ও বিভব প্রভেদ!"
    ),
]

def to_mp3(wav_path: str, mp3_path: str) -> float:
    subprocess.run(
        ["ffmpeg", "-y", "-i", wav_path, "-ar", "48000", "-ac", "2", "-b:a", "192k", mp3_path],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", mp3_path],
        text=True,
    ).strip()
    return float(out)

timings = {}
for sid, text in SCENES:
    raw_wav = os.path.join(TMP_DIR, f"{sid}.wav")
    mp3_path = os.path.join(OUT_DIR, f"{sid}.mp3")
    print(f"Synthesizing {sid}...")
    payload = {
        "model_id": "sonic-3.6",
        "transcript": text,
        "voice": {"mode": "id", "id": VOICE_ID},
        "output_format": {"container": "wav", "encoding": "pcm_s16le", "sample_rate": 44100},
        "language": "bn",
    }
    req = urllib.request.Request(
        "https://api.cartesia.ai/tts/bytes",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "X-API-Key": cartesia_key,
            "Cartesia-Version": "2024-06-10",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        with open(raw_wav, "wb") as wf:
            wf.write(resp.read())
    dur = to_mp3(raw_wav, mp3_path)
    frames = round(dur * 60)
    timings[sid] = {"duration_s": round(dur, 3), "frames_60fps": frames, "recommended_beat_frames": frames + 18}
    print(f"  -> {sid}.mp3: {dur:.3f}s ({frames}f @ 60fps)")

sr = 48000

def write_wav_and_mp3(name: str, samples: np.ndarray):
    wpath = os.path.join(TMP_DIR, f"{name}.wav")
    mpath = os.path.join(OUT_DIR, f"{name}.mp3")
    pcm = np.clip(samples * 32767, -32768, 32767).astype(np.int16)
    with wave.open(wpath, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())
    to_mp3(wpath, mpath)

rng = np.random.default_rng(1800)

# 1. Leyden jar 1ms crack spark
t1 = np.linspace(0, 0.35, int(sr * 0.35), endpoint=False)
crack = (rng.normal(0, 0.7, len(t1)) * np.exp(-t1 * 48) + np.sin(2 * np.pi * 2400 * t1) * np.exp(-t1 * 32) * 0.4)
write_wav_and_mp3("sfx_leyden_crack", crack)

# 2. Brass bell ding (marble pipe instant ring)
t2 = np.linspace(0, 0.85, int(sr * 0.85), endpoint=False)
bell = (np.sin(2 * np.pi * 1568 * t2) * 0.45 + np.sin(2 * np.pi * 3136 * t2) * 0.25) * np.exp(-t2 * 6.5)
write_wav_and_mp3("sfx_bell_ding", bell)

# 3. Macro crash-zoom whoosh
t3 = np.linspace(0, 1.3, int(sr * 1.3), endpoint=False)
whoosh = np.sin(2 * np.pi * (140 + 520 * (t3 / 1.3)) * t3) * np.sin(np.pi * t3 / 1.3) ** 2 * 0.38
write_wav_and_mp3("sfx_whoosh_zoom", whoosh)

with open(os.path.join(OUT_DIR, "timing.json"), "w", encoding="utf-8") as tf:
    json.dump(timings, tf, indent=2)

print("\nAll EP03 audio & SFX synthesized! Timing summary:")
print(json.dumps(timings, indent=2))
