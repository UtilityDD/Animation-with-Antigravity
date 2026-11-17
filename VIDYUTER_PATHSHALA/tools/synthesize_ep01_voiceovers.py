# -*- coding: utf-8 -*-
"""
Synthesize Bengali voiceovers for Episode 01 using Edge-TTS
"""

import subprocess
import os
import json
import shutil

ep01_audio_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA\episodes\EP01\audio"
remotion_audio_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\electricity-safety-wb\public\vidyuter-pathshala\audio"

os.makedirs(ep01_audio_dir, exist_ok=True)
os.makedirs(remotion_audio_dir, exist_ok=True)

scenes_narration = {
    "scene_1": "সুইচটা চাপলেই ঘর আলোয় ভরে যায়। চিরুনি চুলে ঘষলে ছোট ছোট কাগজের টুকরো লাফিয়ে ওঠে। আর আকাশে মেঘ ডাকলে আমরা দেখি বিশাল আলোর ঝলক—বজ্রপাত। কিন্তু কখনো কি ভেবে দেখেছেন, এই ঘটনাগুলোর মধ্যে আসল মিলটা কোথায়? এই সবকিছুর পেছনের মূল কারণ হলো এক অসাধারণ বৈজ্ঞানিক বিষয়—বিদ্যুৎ।",
    "scene_2": "বিদ্যুৎ কিন্তু কোনো বাতাস বা তরল নয় যাকে আমরা সরাসরি চোখে দেখতে পাই। আমরা বিদ্যুৎকে অনুভব করি তার বিভিন্ন কাজের মাধ্যমে। ঠিক যেমন বাতাসে গাছের পাতা নড়লে আমরা বুঝি বাতাস বইছে, তেমনই বাল্বের আলো জ্বলা, পাখার ঘোরা কিংবা হিটারের তাপে আমরা বুঝি বিদ্যুতের উপস্থিতি। বিদ্যুৎ হলো বৈদ্যুতিক চার্জ বা আধানের উপস্থিতি এবং তাদের চলাচলের সামগ্রিক রূপ।",
    "scene_3": "তাহলে এই বৈদ্যুতিক চার্জ বা আধান আসলে কী? আসুন পদার্থের গভীরে তাকাই। আমাদের চারপাশের সবকিছুই অতি ক্ষুদ্র কণা—পরমাণু বা অ্যাটম দিয়ে গঠিত। একটি পরমাণুর কেন্দ্রে বা নিউক্লিয়াসে থাকে ধনাত্মক চার্জযুক্ত প্রোটন এবং চার্জহীন নিউট্রন। আর নিউক্লিয়াসের চারপাশের কক্ষপথে ঘুরপাক খাচ্ছে অত্যন্ত হালকা, ঋণাত্মক চার্জযুক্ত কণা—ইলেকট্রন। প্রোটন ও ইলেকট্রনের বিপরীত চার্জ একে অপরকে আকর্ষণ করে। স্বাভাবিক অবস্থায় পরমাণুতে প্রোটন ও ইলেকট্রনের সংখ্যা সমান থাকে, ফলে সামগ্রিকভাবে পরমাণুটি নিস্তড়িৎ বা চার্জহীন।",
    "scene_4": "কিন্তু যদি কোনোভাবে এই ভারসাম্যে পরিবর্তন আনা যায়? ধরুন, আপনি একটি প্লাস্টিকের চিরুনি দিয়ে শুকনো চুল ঘষলেন। এখানে কোনো নতুন চার্জ সৃষ্টি হচ্ছে না। ঘর্ষণের ফলে চুল থেকে কিছু ইলেকট্রন লাফিয়ে চিরুনির গায়ে চলে আসে। ইলেকট্রন ঋণাত্মক চার্জযুক্ত হওয়ায়, চিরুনিতে অতিরিক্ত ইলেকট্রন জমা হয়ে তৈরি হয় ঋণাত্মক চার্জ। এটিই হলো স্থির তড়িৎ বা Static Electricity। এখন এই চার্জিত চিরুনিটি ছোট ছোট কাগজের টুকরোর কাছে ধরলে, চিরুনির চার্জ কাগজের বিপরীত চার্জকে টেনে তোলে!",
    "scene_5": "স্থির তড়িৎ দিয়ে তো আর আমাদের ঘরের যন্ত্রপাতি চালানো সম্ভব নয়! তার জন্য চাই চার্জের অবিরাম প্রবাহ—যার নাম চল তড়িৎ বা Electric Current। আসুন একটি সহজ সার্কিট তৈরি করি। আমাদের কাছে রয়েছে একটি ব্যাটারি, একটি সুইচ, তামার তার এবং একটি বাল্ব। যখন সুইচটি খোলা থাকে, তারের ভেতরের মুক্ত ইলেকট্রনগুলো যেকোনো দিকে এলোমেলো ঘুরে বেড়ায়। কোনো নির্দিষ্ট প্রবাহ নেই, তাই বাল্বটি নিভে থাকে। কিন্তু সুইচ বন্ধ করলেই ব্যাটারির ভোল্টেজ তারের মুক্ত ইলেকট্রনগুলোকে ঋণাত্মক প্রান্ত থেকে ধনাত্মক প্রান্তের দিকে নির্দিষ্ট দিকে চালিত করে। প্রচলিত তড়িৎ প্রবাহের দিক ধরা হয় পজিটিভ থেকে নেগেটিভ, যা ইলেকট্রন প্রবাহের উল্টো। আর মনে রাখবেন, বাল্ব কিন্তু কোনো ইলেকট্রন খেয়ে ফেলে না! এটি কেবল চলমান চার্জের শক্তিকে আলো ও তাপে রূপান্তর করে।",
    "scene_6": "বৈদ্যুতিক শক্তির সবচেয়ে বড় জাদু হলো এর রূপান্তরের ক্ষমতা। একটি ইস্ত্রিতে বিদ্যুৎ রূপান্তরিত হয় তাপে। বৈদ্যুতিক পাখায় মোটর ঘুরিয়ে বিদ্যুৎ সৃষ্টি করে যান্ত্রিক গতি। টিউবলাইটে বিদ্যুৎ তৈরি করে আলো। আর ডোরবেলে এটি রূপান্তরিত হয় শব্দে। আমাদের আধুনিক সভ্যতা আজ দাঁড়িয়ে আছে এই শক্তির রূপান্তরের উপর।",
    "scene_7": "তাহলে আজ আমরা বিদ্যুতের দুটি মূল রূপ চিনলাম: এক, স্থির তড়িৎ বা Static Electricity—যেখানে চার্জ কোনো বস্তুর পৃষ্ঠে জমা হয়ে অবস্থান করে, যেমন চিরুনির আকর্ষণ কিংবা আকাশের বজ্রপাত। দুই, চল তড়িৎ বা Electric Current—যেখানে একটি সার্কিটে পরিবাহীর ভেতর দিয়ে চার্জ নিয়মিত প্রবাহিত হয়, যেমন ব্যাটারি ও ঘরের তারের বিদ্যুৎ।",
    "scene_8": "আজকের পর্ব থেকে আপনার জন্য একটি প্রশ্ন: শীতকালে উলের পোশাকে হাত দিলে অনেক সময় হালকা ঝিলিক বা চটচট শব্দ হয় কেন? এটি কি স্থির তড়িৎ, নাকি চল তড়িৎ? কমেন্টে আপনার উত্তর জানান। কিন্তু এই চার্জগুলো কীভাবে কাজ করে? পরের পর্বে আমরা জানব: 'পরমাণু ও বৈদ্যুতিক চার্জ — Atoms and Electric Charge'। চোখ রাখুন 'বিদ্যুতের পাঠশালা'-য়। শূন্য থেকে বিদ্যুতের জগৎকে বোঝা。"
}

timings = {}

for sc_id, text in scenes_narration.items():
    mp3_path = os.path.join(ep01_audio_dir, f"{sc_id}.mp3")
    print(f"Generating TTS for {sc_id}...")
    cmd = [
        "edge-tts",
        "--voice", "bn-IN-BashkarNeural",
        "--rate=-2%",
        "--text", text,
        "--write-media", mp3_path
    ]
    subprocess.run(cmd, check=True)
    
    # Measure duration with ffprobe
    probe_cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        mp3_path
    ]
    res = subprocess.run(probe_cmd, stdout=subprocess.PIPE, text=True, check=True)
    dur = float(res.stdout.strip())
    timings[sc_id] = {
        "duration_sec": dur,
        "frames_60fps": int(dur * 60) + 120 # adding 2.0s buffer for pedagogical pause/transitions
    }
    print(f"{sc_id}: {dur:.2f} seconds ({timings[sc_id]['frames_60fps']} frames @ 60fps)")

    # Copy to Remotion public audio folder
    remotion_path = os.path.join(remotion_audio_dir, f"{sc_id}.mp3")
    shutil.copyfile(mp3_path, remotion_path)

timing_file = os.path.join(ep01_audio_dir, "timing.json")
with open(timing_file, "w", encoding="utf-8") as f:
    json.dump(timings, f, indent=2)

shutil.copyfile(timing_file, os.path.join(remotion_audio_dir, "timing.json"))
print("All 8 scene voiceovers generated and synchronized successfully!")
