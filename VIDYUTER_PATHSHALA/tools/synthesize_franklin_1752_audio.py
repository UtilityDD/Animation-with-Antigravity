# -*- coding: utf-8 -*-
"""
Synthesize 5-beat Bengali narration for 1752 Franklin Kite Documentary
using Cartesia sonic-3.6 (Arindam), converting to 48 kHz Stereo MP3,
plus subtle period SFX (distant thunder rumble, gentle rain, key tick).
"""
import json
import os
import subprocess
import urllib.request
import numpy as np
import wave

ROOT = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity"
KEY_PATH = os.path.join(ROOT, "electricity-safety-wb", "cartesia_API.txt")
OUT_DIR = os.path.join(ROOT, "electricity-safety-wb", "public", "vidyuter-pathshala", "audio", "franklin_1752")
TMP_DIR = r"C:\Users\rouma\.gemini\antigravity\brain\13fcc41d-b1bc-445a-a2d5-a4a5bc0ea1f1\scratch\franklin_tmp"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TMP_DIR, exist_ok=True)

with open(KEY_PATH, "r", encoding="utf-8") as f:
    cartesia_key = f.read().strip()

VOICE_ID = "cd983593-81f5-4b9d-abad-21791ee86363"  # Arindam

BEATS = [
    (
        "beat1",
        "১৭৫২ সাল। ফিলাডেলফিয়া। ততদিনে বিজ্ঞানীরা কাচের পাত্র আর ঘর্ষণ যন্ত্রের সাহায্যে পরীক্ষাগারে ছোট ছোট বৈদ্যুতিক স্ফুলিঙ্গ তৈরি করতে শিখে গেছেন। কিন্তু বেঞ্জামিন ফ্র্যাঙ্কলিনের মনে ঘুরছিল এক বিরাট প্রশ্ন—আকাশের মেঘের বজ্রপাত আর গবেষণাগারের এই ক্ষুদ্র স্ফুলিঙ্গ কি আসলে একই জিনিস?"
    ),
    (
        "beat2",
        "এই প্রশ্নের উত্তর খুঁজতে ফ্র্যাঙ্কলিন একটি সূক্ষ্ম পরিকল্পনা করলেন। কাগজের বদলে নিলেন সিল্কের রুমাল দিয়ে তৈরি ঘুড়ি, তার মাথায় বসালেন একটি সূচালো ধাতব তার। ঘুড়ির শণের সুতোর নিচে বাঁধলেন একটি ধাতব চাবি, আর হাতে ধরার জন্য রাখলেন শুকনো সিল্কের ফিতে—যাতে বিদ্যুৎ তাঁর শরীরে না পৌঁছায়।"
    ),
    (
        "beat3",
        "পরবর্তী ঐতিহাসিক বিবরণ অনুযায়ী, ১৭৫২ সালের ঝড়ো এক দিনে তিনি ঘরের ছাউনির নিচে নিরাপদ আশ্রয়ে দাঁড়িয়ে ঘুড়ি ওড়ালেন—যাতে হাতের সিল্কের ফিতেটি শুকনো থাকে। আকাশে বজ্রপাত ঘুড়িতে আঘাত হানেনি; তিনি অপেক্ষা করছিলেন মেঘের অদৃশ্য চার্জের জন্য।"
    ),
    (
        "beat4",
        "হঠাৎ ফ্র্যাঙ্কলিন লক্ষ্য করলেন এক অদ্ভুত দৃশ্য—শণের সুতোর আলগা আঁশগুলো সোজা হয়ে দাঁড়িয়ে পড়ছে! আর বৃষ্টিতে সুতো ভিজে যেতেই মেঘের অদৃশ্য বৈদ্যুতিক চার্জ ভেজা সুতো বেয়ে নেমে এল চাবিতে। আঙুল কাছে আনতেই চাবি থেকে ঠিকরে বেরোল ছোট্ট স্ফুলিঙ্গ—আর সেই চার্জ জমাও করা গেল লেইডেন জারে!"
    ),
    (
        "beat5",
        "এতে ফ্র্যাঙ্কলিন নতুন করে বিদ্যুৎ আবিষ্কার করেননি—বিদ্যুৎ সম্পর্কে মানুষ আগে থেকেই জানত। বরং তিনি প্রমাণ করেছিলেন, আকাশের ভয়ংকর বজ্রপাত আর গবেষণাগারের বিদ্যুৎ মূলত একই প্রাকৃতিক শক্তির দুই রূপ। আর এই আবিষ্কারই জন্ম দিয়েছিল আধুনিক বজ্রনিরোধক দণ্ডের।"
    ),
]

timings = {}
for bid, text in BEATS:
    raw_wav = os.path.join(TMP_DIR, f"{bid}.wav")
    mp3_path = os.path.join(OUT_DIR, f"{bid}.mp3")
    print(f"Synthesizing {bid}...")
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
    )
    with urllib.request.urlopen(req) as resp:
        with open(raw_wav, "wb") as f:
            f.write(resp.read())

    # Convert to browser-safe 48kHz 320kbps stereo MP3
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", raw_wav, "-ar", "48000", "-ac", "2", "-b:a", "320k", mp3_path],
        check=True,
    )
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", mp3_path],
        stdout=subprocess.PIPE, text=True, check=True,
    )
    dur = float(probe.stdout.strip())
    frames = int((dur + 1.2) * 60)
    timings[bid] = {"duration_sec": dur, "frames_60fps": frames}
    print(f"  -> {bid}: {dur:.2f}s ({frames} frames)")

with open(os.path.join(OUT_DIR, "timings.json"), "w", encoding="utf-8") as f:
    json.dump(timings, f, indent=2, ensure_ascii=False)

# Synthesize subtle period SFX (48 kHz Stereo MP3)
SR = 48000
rng = np.random.default_rng(1752)

def save_sfx(name, stereo, peak=0.75):
    m = np.max(np.abs(stereo))
    if m > 0:
        stereo = stereo / m * peak
    pcm = (np.clip(stereo, -1.0, 1.0) * 32767.0).astype(np.int16)
    wav_p = os.path.join(TMP_DIR, f"{name}.wav")
    mp3_p = os.path.join(OUT_DIR, f"{name}.mp3")
    with wave.open(wav_p, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.T.reshape(-1).tobytes())
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", wav_p, "-ar", "48000", "-ac", "2", "-b:a", "192k", mp3_p],
        check=True,
    )
    print("Generated SFX:", mp3_p)

# Gentle rain tapping (16s loopable)
dur_r = 16.0
nr = int(SR * dur_r)
rain = np.convolve(rng.normal(0, 1, nr), np.hanning(18) / 9.0, mode="same") * 0.22
for _ in range(180):
    pos = int(rng.uniform(0.1, dur_r - 0.1) * SR)
    dlen = int(0.015 * SR)
    dt = np.linspace(0, 0.015, dlen, endpoint=False)
    drop = np.sin(2 * np.pi * rng.uniform(900, 2200) * dt) * np.exp(-dt * 240) * 0.18
    rain[pos:pos + dlen] += drop
save_sfx("sfx_rain_gentle", np.vstack([rain, np.roll(rain, 120)]), peak=0.45)

# Distant low thunder rumble (4.0s, off-screen soft rumble)
dur_t = 4.0
t_th = np.linspace(0, dur_t, int(SR * dur_t), endpoint=False)
th_noise = np.convolve(rng.normal(0, 1, len(t_th)), np.hanning(260) / 130.0, mode="same")
th_env = (t_th / 0.6).clip(0, 1) * np.exp(-np.maximum(0, t_th - 0.5) * 1.1)
thunder = th_noise * th_env * 1.8 + np.sin(2 * np.pi * 46 * t_th) * th_env * 0.25
save_sfx("sfx_thunder_distant", np.vstack([thunder, np.roll(thunder, 300)]), peak=0.65)

# Crisp tiny knuckle key-spark tick + subtle Leyden glass chime (1.2s)
dur_k = 1.2
t_k = np.linspace(0, dur_k, int(SR * dur_k), endpoint=False)
tick_len = int(0.02 * SR)
tt = np.linspace(0, 0.02, tick_len, endpoint=False)
tick = (rng.normal(0, 1, tick_len) * 0.7 + np.sin(2 * np.pi * 3400 * tt) * 0.3) * np.exp(-tt * 280)
k_sig = np.zeros_like(t_k)
k_sig[int(0.05 * SR):int(0.05 * SR) + tick_len] += tick
ct = np.maximum(0, t_k - 0.45)
chime = (t_k >= 0.45) * (np.sin(2 * np.pi * 1046.5 * ct) * np.exp(-ct * 4.5) * 0.35)
k_sig += chime
save_sfx("sfx_key_tick_jar", np.vstack([k_sig, k_sig * 0.92]), peak=0.75)
