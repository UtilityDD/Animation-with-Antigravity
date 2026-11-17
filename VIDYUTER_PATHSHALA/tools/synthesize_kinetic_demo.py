# -*- coding: utf-8 -*-
"""
Synthesize punchy Bengali voiceover for Kinetic Motion Graphics Demo using Cartesia API
"""

import urllib.request
import json
import subprocess
import os

key_path = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\electricity-safety-wb\cartesia_API.txt"
with open(key_path, "r", encoding="utf-8") as f:
    key = f.read().strip()

out_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\electricity-safety-wb\public\vidyuter-pathshala\audio\kinetic_demo"
os.makedirs(out_dir, exist_ok=True)

# Using Arindam (cd983593-81f5-4b9d-abad-21791ee86363)
voice_id = "cd983593-81f5-4b9d-abad-21791ee86363"

beats = [
    ("beat1", "বিদ্যুৎ আসলে কী?"),
    ("beat2", "এটা কোনো জাদু নয়!"),
    ("beat3", "পদার্থের গভীরে ইলেকট্রনের তাণ্ডব!"),
    ("beat4", "সুইচ অন! আলোর বিস্ফোরণ!"),
    ("beat5", "বিদ্যুতের পাঠশালা! শূন্য থেকে শিখুন।")
]

timings = {}
total_dur = 0.0

for bid, text in beats:
    payload = {
        "model_id": "sonic-3.6",
        "transcript": text,
        "voice": {"mode": "id", "id": voice_id},
        "output_format": {"container": "wav", "encoding": "pcm_s16le", "sample_rate": 44100},
        "language": "bn"
    }
    req = urllib.request.Request(
        "https://api.cartesia.ai/tts/bytes",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "X-API-Key": key,
            "Cartesia-Version": "2024-06-10",
            "Content-Type": "application/json"
        }
    )
    wav_path = os.path.join(out_dir, f"{bid}.wav")
    with urllib.request.urlopen(req) as resp:
        with open(wav_path, "wb") as f:
            f.write(resp.read())
            
    probe = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", wav_path
    ], stdout=subprocess.PIPE, text=True, check=True)
    dur = float(probe.stdout.strip())
    frames = int(dur * 60)
    timings[bid] = {"text": text, "duration": dur, "frames_60fps": frames}
    total_dur += dur
    print(f"{bid}: '{text}' -> {dur:.2f}s ({frames} frames)")

print(f"Total voice duration: {total_dur:.2f}s")
with open(os.path.join(out_dir, "timings.json"), "w", encoding="utf-8") as f:
    json.dump(timings, f, indent=2, ensure_ascii=False)
print("Saved kinetic demo voice assets successfully!")
