# -*- coding: utf-8 -*-
"""
Synthesize 8-beat Bengali narration for Episode 02: «পরমাণু ও বৈদ্যুতিক চার্জ»
using Cartesia sonic-3.6 (Arindam), converting to 48 kHz Stereo MP3,
plus synthesized SFX (scintillation tick, cannon thud, electron whoosh, timer chime).
"""
import json
import os
import subprocess
import urllib.request
import numpy as np
import wave

ROOT = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity"
KEY_PATH = os.path.join(ROOT, "electricity-safety-wb", "cartesia_API.txt")
OUT_DIR = os.path.join(ROOT, "electricity-safety-wb", "public", "vidyuter-pathshala", "audio", "ep02")
TMP_DIR = r"C:\Users\rouma\.gemini\antigravity\brain\13fcc41d-b1bc-445a-a2d5-a4a5bc0ea1f1\scratch\ep02_tmp"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TMP_DIR, exist_ok=True)

with open(KEY_PATH, "r", encoding="utf-8") as f:
    cartesia_key = f.read().strip()

VOICE_ID = "cd983593-81f5-4b9d-abad-21791ee86363"  # Arindam

SCENES = [
    (
        "stage1_manchester",
        "১৯০৯ সাল। ইংল্যান্ডের ম্যানচেস্টার বিশ্ববিদ্যালয়ের একটি অন্ধকার ভূগর্ভস্থ ঘর। ২০ বছর বয়সী এক ছাত্র—আর্নেস্ট মার্সডেন—একটি ক্ষুদ্র অণুবীক্ষণ যন্ত্রে চোখ রেখে বসে আছেন। তাঁর কাজ ছিল খুব সাধারণ—অতি পাতলা সোনার পাতের ওপর অদৃশ্য কণার রশ্মি ছোড়া। থমসনের মডেল অনুযায়ী সবার ধারণা ছিল, কণাগুলো সোজা পাত ভেদ করে চলে যাবে। কিন্তু হঠাৎ—পেছনের অন্ধকার পর্দায় জ্বলে উঠল আলোর ঝলক! আট হাজারের মধ্যে একটি কণা সোজা পেছনে ফিরে এসেছে! বিজ্ঞানী রাদারফোর্ড পরে বলেছিলেন—এ যেন পাতলা টিস্যু পেপারের দিকে কামানের গোলা ছোড়ার পর সেই গোলা ফিরে এসে আপনাকেই আঘাত করার মতো ঘটনা!"
    ),
    (
        "stage2_timeline",
        "এই অদ্ভুত আবিষ্কারের পেছনে ছিল দীর্ঘ ইতিহাস। খ্রিস্টপূর্ব চারশো অব্দে গ্রিক দার্শনিক ডেমোক্রিটাস কেবল ধারণার ওপর ভিত্তি করে বলেছিলেন পরমাণু অবিভাজ্য। ১৮০৩ সালে জন ডাল্টন রাসায়নিক প্রমাণ দিলেন, আর ১৮৩৩-এ ফ্যারাডে ইঙ্গিত দিলেন পরমাণু ও বিদ্যুতের গভীর সম্পর্কের। ১৮৯৭ সালে জে. জে. থমসন আবিষ্কার করলেন ঋণাত্মক ইলেকট্রন, যা হাইড্রোজেনের চেয়ে প্রায় আঠারোশো ছত্রিশ গুণ হালকা। ১৯০৯-এ মিলিকান ও ফ্লেচারের তেলবিন্দু পরীক্ষা প্রমাণ করল চার্জ নির্দিষ্ট ক্ষুদ্র এককে থাকে। এরপর গাইগার, মার্সডেন ও রাদারফোর্ড আবিষ্কার করলেন ধনাত্মক নিউক্লিয়াস, আর ১৯৩২-এ চ্যাডউইক পেলেন চার্জহীন নিউট্রন।"
    ),
    (
        "stage3_bridge",
        "১৯০৯-এর সেই অণুবীক্ষণ যন্ত্র থেকে এবার চলে আসি আমাদের আজকের পরিচিত জগতে—টেবিলের ওপর রাখা একটি সাধারণ প্লাস্টিকের চিরুনির ভেতরে। পলিমারের দীর্ঘ শৃঙ্খল পেরিয়ে যদি আমরা একটি মাত্র কার্বন পরমাণুর গভীরে ডুব দিই, তবেই খুঁজে পাব প্রথম পর্বের সেই রহস্যের উত্তর!"
    ),
    (
        "stage4a_stadium",
        "পরমাণু দেখতে আসলে কেমন? কল্পনা করুন একটি বিশাল ক্রিকেট স্টেডিয়াম। সেই স্টেডিয়ামের মাঝখানের পিচে রাখা একটি মাত্র ক্ষুদ্র সরিষার দানা হলো পরমাণুর নিউক্লিয়াস—যেখানে থাকে ধনাত্মক প্রোটন আর চার্জহীন নিউট্রন। আর স্টেডিয়ামের বহু দূরের গ্যালারিতে জোনাকির মতো মেঘের আকারে ঘুরে বেড়ায় ঋণাত্মক ইলেকট্রন। মনে রাখবেন, এটি কেবলই আকারের তুলনা—ইলেকট্রন কোনো নির্দিষ্ট কক্ষপথে নয়, মেঘের মতো বিস্তৃত অঞ্চলে থাকে। পরমাণুর ভেতরটা প্রায় পুরোটাই ফাঁকা, তবু টেবিল শক্ত মনে হয় কারণ পাশের পরমাণুর ইলেকট্রন মেঘ একে অপরকে তীব্রভাবে বিকর্ষণ করে!"
    ),
    (
        "stage4b_ledger",
        "এবার দেখা যাক প্রকৃতির নিখুঁত চার্জের হিসাবখাতা। প্রতিটি প্রোটনের চার্জ প্লাস এক, আর প্রতিটি ইলেকট্রনের চার্জ মাইনাস এক। নিউট্রনের কোনো চার্জ নেই—তবু নিউক্লিয়াসের ধনাত্মক প্রোটনগুলোকে একসাথে ধরে রাখতে এটি অপরিহার্য। একটি কার্বন পরমাণুতে ছয়টি প্রোটন ও ছয়টি ইলেকট্রন থাকায় মোট চার্জ শূন্য—অর্থাৎ এটি নিরপেক্ষ। একটি ইলেকট্রন বাড়লে তা হয় ঋণাত্মক আয়ন, আর কমলে হয় ধনাত্মক আয়ন। প্রকৃতির নিয়ম অনুযায়ী সমধর্মী চার্জ পরস্পরকে বিকর্ষণ করে এবং বিপরীত চার্জ আকর্ষণ করে—ঠিক এই কারণেই ধনাত্মক সোনার নিউক্লিয়াস ধনাত্মক আলফা কণাকে পেছনে ঠেলে দিয়েছিল!"
    ),
    (
        "stage4c_comb_solved",
        "তাহলে শুকনো চুলে চিরুনি ঘষলে কেন শুধু ইলেকট্রনই লাফ দেয়? কারণ প্রোটনগুলো বিশাল ভারী নিউক্লিয়াসের ভেতরে শক্ত বন্ধনে আটকা—যা ইলেকট্রনের চেয়ে প্রায় আঠারোশো ছত্রিশ গুণ ভারী! ঘর্ষণে কেবল বাইরের হালকা ইলেকট্রন চুল থেকে চিরুনিতে চলে আসে। ফলে চুল হয় ধনাত্মক, আর চিরুনি হয় ঋণাত্মক—মোট চার্জ থাকে সম্পূর্ণ সংরক্ষিত। কিন্তু ঋণাত্মক চিরুনি চার্জহীন কাগজের টুকরোকে কেন টানে? কারণ চিরুনির মাইনাস চার্জ কাগজের অণুর ইলেকট্রনগুলোকে একটু দূরে ঠেলে দেয়, ফলে কাগজের কাছের প্রান্তে তৈরি হয় ধনাত্মক আবেশ—আর সেই আকর্ষণেই কাগজ লাফিয়ে ওঠে!"
    ),
    (
        "stage4d_teaser",
        "তবে সব পদার্থ একইভাবে ইলেকট্রন ধরে রাখে না। তামার তারের পরমাণুর বাইরের ইলেকট্রনগুলো আলগা থাকে—যেন সবার জন্য খোলা পুকুরের মতো। অন্যদিকে প্লাস্টিক বা রাবারের ইলেকট্রন শক্তভাবে বাঁধা থাকে। এবার একটু ভেবে বলো তো—একটি চিরুনি ঋণাত্মক চার্জ পেলে, তবে চুলে ঠিক কী ধরনের চার্জ তৈরি হবে—এবং কেন চিরুনি ও চুল একে অপরকে টানবে? পরের পর্বে আমরা দেখব, তামার তারের এই মুক্ত ইলেকট্রনগুলো কীভাবে ছুটে চলে তৈরি করে বিদ্যুতের প্রবাহ!"
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

# Synthesize clean procedural SFX
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

# 1. Scintillation flash ping (crisp emerald chime)
t = np.linspace(0, 0.45, int(sr * 0.45), endpoint=False)
scint = (np.sin(2 * np.pi * 1760 * t) * 0.4 + np.sin(2 * np.pi * 2640 * t) * 0.25) * np.exp(-t * 14)
write_wav_and_mp3("sfx_scint_flash", scint)

# 2. Naval cannon boom (deep low thud)
t2 = np.linspace(0, 1.4, int(sr * 1.4), endpoint=False)
rng = np.random.default_rng(42)
boom = (np.sin(2 * np.pi * (68 * np.exp(-t2 * 3.5)) * t2) * 0.65 + rng.normal(0, 0.15, len(t2)) * np.exp(-t2 * 4.5)) * np.exp(-t2 * 2.2)
write_wav_and_mp3("sfx_cannon_boom", boom)

# 3. Quantum zoom / charge whoosh
t3 = np.linspace(0, 1.2, int(sr * 1.2), endpoint=False)
whoosh = np.sin(2 * np.pi * (180 + 420 * (t3 / 1.2)) * t3) * np.sin(np.pi * t3 / 1.2) ** 2 * 0.35
write_wav_and_mp3("sfx_charge_whoosh", whoosh)

# 4. Timer tick chime
t4 = np.linspace(0, 0.25, int(sr * 0.25), endpoint=False)
tick = np.sin(2 * np.pi * 1046.5 * t4) * np.exp(-t4 * 18) * 0.45
write_wav_and_mp3("sfx_timer_tick", tick)

with open(os.path.join(OUT_DIR, "timing.json"), "w", encoding="utf-8") as tf:
    json.dump(timings, tf, indent=2)

print("\nAll EP02 audio & SFX synthesized! Timing summary:")
print(json.dumps(timings, indent=2))
