# -*- coding: utf-8 -*-
"""
Synthesize 6-act Indian Bengali (bn-IN) narration for Episode 01 v2 («বিদ্যুতের পাঠশালা 2.0»)
using Cartesia sonic-3.6 (Arindam) with normalized spoken years/decimals (tts_bn),
converting to 48 kHz Stereo MP3, plus crisp micro-foley (blanket static snap, 6A switch click).
"""
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
import numpy as np
import wave

ROOT = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity"
KEY_PATH = os.path.join(ROOT, "electricity-safety-wb", "cartesia_API.txt")
OUT_DIR = os.path.join(ROOT, "electricity-safety-wb", "public", "vidyuter-pathshala", "audio", "ep01_v2")
TMP_DIR = os.path.join(tempfile.gettempdir(), "ep01_v2_tts_tmp")
# usage: python synthesize_ep01_v2_audio.py [act_id ...]  (no args = all acts; every act synthesised costs Cartesia credits)
ONLY = set(sys.argv[1:])
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TMP_DIR, exist_ok=True)

with open(KEY_PATH, "r", encoding="utf-8") as f:
    cartesia_key = f.read().strip()

VOICE_ID = "cd983593-81f5-4b9d-abad-21791ee86363"  # Arindam

ACTS = [
    (
        "act1_hook",
        """শীতের রাত। ঘরের আলো নেভানো।
গা থেকে সিন্থেটিক কম্বলটা সরাতেই... চটপট! ছোট্ট নীলচে স্ফুলিঙ্গ!
আবার পাশের সুইচটা টিপতেই... মাথার ওপরের বাল্বটা জ্বলে উঠল!
দুটো কি একই জিনিস? কম্বলের ওই ছোট্ট চমক, আর দেয়ালের সুইচের পেছনে লুকানো শক্তি... আসলে বিদ্যুৎ কী?"""
    ),
    (
        "act2a_miletus",
        """এই প্রশ্নের শুরু আজ থেকে প্রায় আড়াই হাজার বছর আগে... প্রাচীন গ্রিসে।
মানুষ দেখল, অ্যাম্বার নামে এক বিশেষ হলুদ পাথর পশমে ঘষলে... না ছুঁয়েই ছোট্ট পালক নিজের দিকে টেনে নিচ্ছে!
খ্রিস্টপূর্ব প্রায় ছশো অব্দে দার্শনিক থেলিস অব মিলেটাসের নামের সাথে এই প্রাচীন পর্যবেক্ষণ জড়িয়ে আছে। তখন কেউ জানত না এর কারণ কী... এটা ছিল কেবল স্থির তড়িতের প্রথম ঝলক।"""
    ),
    (
        "act2b_timeline",
        """তারপর শতাব্দী পেরিয়ে, ষোলোশো সালে উইলিয়াম গিলবার্ট শুরু করলেন আসল পরীক্ষা।
সতেরোশো পঁয়তাল্লিশ থেকে ছেচল্লিশে তৈরি হলো চার্জ ধরে রাখার যন্ত্র... লেইডেন জার।
সতেরোশো বাহান্ন সালে বেঞ্জামিন ফ্র্যাঙ্কলিন ঘুড়ির ভেজা শণের সুতোয় মেঘের চার্জ লেইডেন জারে নামিয়ে প্রমাণ করলেন... আকাশের বিদ্যুৎ আর গবেষণাগারের বিদ্যুৎ একই!
আঠারোশো সালে ভোল্টা বানালেন প্রথম ব্যাটারি। আঠারোশো বিশ থেকে আঠারোশো একত্রিশে ধরা পড়ল চুম্বকের সাথে গভীর সম্পর্ক। আঠারোশো ষাটের দশকে ম্যাক্সওয়েল গাঁথলেন তড়িৎ-চুম্বকীয় তত্ত্ব। আর আঠারোশো সাতানব্বই সালে জে জে থমসন খুঁজে পেলেন পরমাণুর ভেতরের ক্ষুদ্র কণা... ইলেকট্রন!"""
    ),
    (
        "act3_physics",
        "সুতরাং বিদ্যুৎ মানেই শুধু তারের ভেতর প্রবাহ নয়। বিদ্যুৎ হলো বৈদ্যুতিক চার্জের উপস্থিতি, পারস্পরিক ক্রিয়া এবং গতির সঙ্গে সম্পর্কিত বিভিন্ন ঘটনা ও প্রক্রিয়ার সমষ্টি। কম্বলের সুতো থেকে ডুব দিই পরমাণুর ভেতরে—কেন্দ্রে থাকে প্রোটন ও নিউট্রন, আর চারপাশে মেঘের মতো বিস্তৃত থাকে ইলেকট্রন। ঘর্ষণে নতুন চার্জ তৈরি হয় না—শুধু ইলেকট্রন এক বস্তু থেকে অন্য বস্তুতে চলে যায়, আর আবেশের টানেই কাগজ লাফিয়ে ওঠে!"
    ),
    (
        "act3e_switch_bulb",
        "এবার তাকান আমাদের ঘরের ছয় অ্যাম্পিয়ার মডুলার সুইচের ভেতরে। সুইচ খোলা থাকলে তামার তারের মুক্ত ইলেকট্রনগুলো জায়গায় কাঁপতে থাকে, বাল্ব নিভে থাকে। সুইচ চাপতেই তামার পাত জুড়ে যায়, শুরু হয় একমুখী প্রবাহ—আর বাল্বের ভেতর দিয়ে ঠিক যতগুলো ইলেকট্রন ঢোকে, সমান সংখ্যক ইলেকট্রন বেরিয়ে যায়! বাল্ব একটাও ইলেকট্রন খায় না—শুধু বৈদ্যুতিক শক্তিকে আলো ও তাপে বদলে দেয়। এভাবেই ঘরে ঘোরে পাখা, গরম হয় ইস্ত্রি, বাজে কলিং বেল ও জলের পাম্প!"
    ),
    (
        "act4_confusion",
        """দারুণ, তাই না? আজ আমরা দেখলাম চার্জের তিনটি রূপ... স্থির তড়িৎ, তড়িৎ প্রবাহ, আর বলক্ষেত্র।
কিন্তু দাঁড়ান... এতক্ষণ যা জানলেন, তাতে আপনার মনে কি এখন একটা অদ্ভুত খটকা লাগছে?
ভাবুন তো... যদি বাল্ব একটাও ইলেকট্রন খরচ না করে, যতগুলো ঢোকে সবটাই ফিরে যায়... তাহলে প্রতি মাসে বাড়িতে এত টাকার ইলেকট্রিক বিল আসে কেন?!
আর ফোনের ব্যাটারিই বা শেষ হয়ে শূন্য শতাংশে নেমে যায় কী করে?!
আর চিরুনি না ঘষেই তারের ভেতরের কোটি কোটি ইলেকট্রনকে ধাক্কাটা দিচ্ছে কে?!

মাথায় জট পাকিয়ে গেল তো? ঠিক আছে! এর মানে আপনার মস্তিষ্ক সত্যিই বিজ্ঞানীর মতো ভাবতে শুরু করেছে।
এই প্রতিটি জট একে একে খুলে যাবে আমাদের পরের কোর্সগুলোতে... একেবারে জলের মতো পরিষ্কার হয়ে যাবে!
শুরু করছি পরের পর্বে... পরমাণু ও বৈদ্যুতিক চার্জ। বিদ্যুতের পাঠশালার সাথেই থাকুন।"""
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

TIMING_PATH = os.path.join(OUT_DIR, "timing.json")
timings = json.load(open(TIMING_PATH, encoding="utf-8")) if os.path.exists(TIMING_PATH) else {}
for aid, text in ACTS:
    if ONLY and aid not in ONLY:
        continue
    raw_wav = os.path.join(TMP_DIR, f"{aid}.wav")
    mp3_path = os.path.join(OUT_DIR, f"{aid}.mp3")
    print(f"Synthesizing {aid}...")
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
    timings[aid] = {"duration_s": round(dur, 3), "frames_60fps": frames, "recommended_beat_frames": frames + 18}
    print(f"  -> {aid}.mp3: {dur:.3f}s ({frames}f @ 60fps)")

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

rng = np.random.default_rng(2026)
t1 = np.linspace(0, 0.25, int(sr * 0.25), endpoint=False)
snap = rng.normal(0, 0.6, len(t1)) * np.exp(-t1 * 45)
write_wav_and_mp3("sfx_blanket_snap", snap)

t2 = np.linspace(0, 0.18, int(sr * 0.18), endpoint=False)
click = np.sin(2 * np.pi * 1200 * t2) * np.exp(-t2 * 55) * 0.65
write_wav_and_mp3("sfx_switch_click", click)

with open(TIMING_PATH, "w", encoding="utf-8") as tf:
    json.dump(timings, tf, indent=2)

print("\nAll EP01 v2 audio synthesized! Timing summary:")
print(json.dumps(timings, indent=2))
