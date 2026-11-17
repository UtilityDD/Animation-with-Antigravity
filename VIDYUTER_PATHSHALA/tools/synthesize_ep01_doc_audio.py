# -*- coding: utf-8 -*-
"""
Synthesize complete 9-scene narration for Episode 01 using Cartesia API (sonic-3.6)
with fallback to Edge-TTS.
"""

import urllib.request
import json
import subprocess
import os
import shutil

key_path = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\electricity-safety-wb\cartesia_API.txt"
with open(key_path, "r", encoding="utf-8") as f:
    cartesia_key = f.read().strip()

out_dir_public = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\electricity-safety-wb\public\vidyuter-pathshala\audio\ep01_doc"
out_dir_local = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA\episodes\EP01\audio\doc"
os.makedirs(out_dir_public, exist_ok=True)
os.makedirs(out_dir_local, exist_ok=True)

# 9 Scenes Narration Texts
scenes = [
    (
        "scene1",
        "আজ থেকে প্রায় আড়াই হাজার বছর আগে। প্রাচীন গ্রিসের মিলেটাস নগরী। তখন পৃথিবী আজকের মতো আলোয় ভরা ছিল না। সেই সময় মানুষের নজরে আসে এক অদ্ভুত ঘটনা। একটি বিশেষ প্রাকৃতিক পাথর—অ্যাম্বার—পশমের সঙ্গে ঘষলে তা ছোট ছোট পালক নিজের দিকে টেনে নেয়! কীভাবে সম্ভব? পাথরটি না ছুঁয়েও অদৃশ্য এক বলে আকর্ষণ করছে। বিজ্ঞানের ইতিহাসে এটিই বৈদ্যুতিক আকর্ষণের অন্যতম প্রাচীন লিখিত পর্যবেক্ষণ।"
    ),
    (
        "scene2",
        "কিন্তু এই টান আসলে কী ছিল? ১৬০০ সালে উইলিয়াম গিলবার্ট অ্যাম্বারের গ্রিক নাম থেকে শব্দ তৈরি করলেন 'ইলেকট্রিকাস'। ১৭৪৫ সালে লেইডেন জারে প্রথম চার্জ জমিয়ে রাখা সম্ভব হলো। ১৭৫২ সালে বেঞ্জামিন ফ্র্যাঙ্কলিন প্রমাণ করলেন মেঘের বজ্রপাতও এক বিশাল বিদ্যুৎ স্ফুলিঙ্গ। ১৮০০ সালে ভোল্টার ব্যাটারি দিল একটানা বিদ্যুৎ প্রবাহ। ১৮২০ সালে ওরস্টেড বিদ্যুৎ ও চুম্বকের সম্পর্ক দেখলেন, ১৮৩১ সালে ফ্যারাডে আবিষ্কার করলেন তড়িচ্চৌম্বকীয় আবেশ, আর ১৮৯৭ সালে জে জে থমসন আবিষ্কার করলেন ইলেকট্রন।"
    ),
    (
        "scene3",
        "আজ আমরা প্রতিদিন যে সুইচ টিপে আলো জ্বালাই কিংবা ফোন চার্জ করি—তার পেছনে রয়েছে আড়াই হাজার বছরের নিরলস বিজ্ঞান। কিন্তু আসলে এই বিদ্যুৎ কী?"
    ),
    (
        "scene4",
        "সহজ ও নিখুঁত ভাষায়: বিদ্যুৎ হলো বৈদ্যুতিক চার্জের উপস্থিতি, তাদের মধ্যকার বল এবং তাদের চলাচলের সামগ্রিক রূপ। প্রকৃতিতে এর তিনটি প্রধান প্রকাশ: স্থির তড়িৎ, চল তড়িৎ এবং বৈদ্যুতিক ক্ষেত্র।"
    ),
    (
        "scene5",
        "সবকিছুই তৈরি কোটি কোটি পরমাণু দিয়ে। পরমাণুর কেন্দ্রে থাকে ধনাত্মক প্রোটন ও চার্জহীন নিউট্রন। আর তাকে ঘিরে এক রহস্যময় মেঘের মতো অবিরাম ঘোরে ঋণাত্মক ইলেকট্রন। বিপরীত চার্জ একে অপরকে আকর্ষণ করে, আর একই চার্জ পরস্পরকে দূরে ঠেলে দেয়।"
    ),
    (
        "scene6",
        "শুকনো চুলে প্লাস্টিকের চিরুনি ঘষলে চুল থেকে কিছু ইলেকট্রন চিরুনিতে চলে আসে। ফলে চিরুনিতে তৈরি হয় ঋণাত্মক চার্জের ভারসাম্যহীনতা। এটিই হলো স্থির তড়িৎ। কোনো নতুন চার্জ তৈরি হয় না, কেবল ইলেকট্রন স্থানান্তরিত হয়!"
    ),
    (
        "scene7",
        "আর যখন একটি বদ্ধ তারের মধ্য দিয়ে ইলেকট্রনগুলো নির্দিষ্ট দিকে নিয়মিত প্রবাহিত হয়, তাকে বলে চল তড়িৎ। ব্যাটারি চাপ বা ভোল্টেজ সৃষ্টি করে, আর চার্জের গতি বাল্বে আলো ও তাপে রূপান্তরিত হয়। মনে রাখবেন: বাল্ব কখনো ইলেকট্রন খায় না, কেবল শক্তির রূপান্তর ঘটায়।"
    ),
    (
        "scene8",
        "পাখায় গতি, ইস্ত্রিতে তাপ, বাল্বে আলো, কলিং বেলে শব্দ আর কারখানায় মোটরের ঘূর্ণন—বিদ্যুতের সবচেয়ে বড় শক্তি হলো তার রূপান্তরের ক্ষমতা।"
    ),
    (
        "scene9",
        "আজকের চিন্তার প্রশ্ন: চিরুনি দিয়ে চুল ঘষলে কোন কণা স্থানান্তরিত হওয়ার কারণে কাগজের টুকরো আকৃষ্ট হয়? কমেন্টে জানান। পরের পর্বে আমরা পরমাণুর গভীর জগতে প্রবেশ করব: 'পরমাণু ও বৈদ্যুতিক চার্জ'। চোখ রাখুন বিদ্যুতের পাঠশালায়।"
    )
]

timings = {}
voice_id = "cd983593-81f5-4b9d-abad-21791ee86363" # Arindam (Punchy, authoritative, natural Bengali)

for sc_id, text in scenes:
    wav_path = os.path.join(out_dir_public, f"{sc_id}.wav")
    print(f"Synthesizing {sc_id} with Cartesia sonic-3.6...")
    try:
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
                "X-API-Key": cartesia_key,
                "Cartesia-Version": "2024-06-10",
                "Content-Type": "application/json"
            }
        )
        with urllib.request.urlopen(req) as resp:
            with open(wav_path, "wb") as f:
                f.write(resp.read())
    except Exception as e:
        print(f"Cartesia error on {sc_id}: {e}. Falling back to Edge-TTS...")
        mp3_temp = wav_path.replace(".wav", ".mp3")
        subprocess.run([
            "edge-tts", "--voice", "bn-IN-BashkarNeural", "--rate=-2%",
            "--text", text, "--write-media", mp3_temp
        ], check=True)
        # Convert mp3 to wav
        subprocess.run(["ffmpeg", "-y", "-i", mp3_temp, wav_path], check=True)

    # Measure exact duration
    probe = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", wav_path
    ], stdout=subprocess.PIPE, text=True, check=True)
    dur = float(probe.stdout.strip())
    # Add buffer for pauses/transitions
    frames = int((dur + 2.5) * 60)
    timings[sc_id] = {
        "duration_sec": dur,
        "frames_60fps": frames,
        "text": text
    }
    print(f"  -> {sc_id}: {dur:.2f}s ({frames} frames @ 60fps)")

    # Copy to local docs directory too
    shutil.copyfile(wav_path, os.path.join(out_dir_local, f"{sc_id}.wav"))

# Save timings.json
with open(os.path.join(out_dir_public, "timings.json"), "w", encoding="utf-8") as f:
    json.dump(timings, f, indent=2, ensure_ascii=False)
shutil.copyfile(os.path.join(out_dir_public, "timings.json"), os.path.join(out_dir_local, "timings.json"))

print("All 9 scenes synthesized and synchronized successfully!")
