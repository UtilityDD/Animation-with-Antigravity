import asyncio
import json
import os
import subprocess
import edge_tts

OUT_DIR = os.path.join("public", "audio", "dp_full_temp")
os.makedirs(OUT_DIR, exist_ok=True)
MASTER_OUT = os.path.join("public", "audio", "dp_full_98s.mp3")

VOICE = "bn-IN-BashkarNeural"
RATE = "+4%"

# 6 sections matching exact 98.0s (5880 frames @ 60fps) timeline
SEGMENTS = [
    {
        "id": "sec1_intro",
        "start_sec": 0.4,
        "text": "ডিপি স্ট্রাকচার ড্রেসিং শুধু সৌন্দর্যের কাজ নয়; এটি বিদ্যুৎ ব্যবস্থার নিরাপত্তা ও নির্ভরযোগ্যতার অংশ। অগোছালো তার ভবিষ্যতে ত্রুটি ও রক্ষণাবেক্ষণের ঝুঁকি বাড়াতে পারে।",
    },
    {
        "id": "sec2_principles",
        "start_sec": 13.4,
        "text": "ড্রেসিংয়ের পরিকল্পনা করুন উপর থেকে নিচে—প্রথমে উচ্চচাপ, তারপর নিম্নচাপ। ক্রস-আর্ম ও ইনসুলেটর নকশা অনুযায়ী সাজান, জাম্পার রাখুন মসৃণ ইউ বা সি বাঁকে, আর এলটি কেবল নির্দিষ্ট পথে সাপোর্টসহ গুছিয়ে রাখুন।",
    },
    {
        "id": "sec3_clearance",
        "start_sec": 34.5,
        "text": "ফেজ-টু-ফেজ এবং ফেজ-টু-বডি ক্লিয়ারেন্স অনুমোদিত ড্রয়িং ও প্রযোজ্য বিধি অনুযায়ী বজায় রাখুন। অতিরিক্ত বাইন্ডিং অংশ নির্ধারিত পদ্ধতিতে ফিনিশ করুন; বোল্ট-নাট নির্মাতার নির্ধারিত টর্কে টাইট করুন।",
    },
    {
        "id": "sec4_myth_reality",
        "start_sec": 54.6,
        "text": "ড্রেসিং শুধু দেখতে সুন্দর করার জন্য নয়। পরিচ্ছন্ন বিন্যাসে পরিদর্শন ও ফল্ট শনাক্ত করা সহজ হয়। ধারালো প্রান্তে ঘষা, অপর্যাপ্ত সাপোর্ট বা ভুল রুটিং ইনসুলেশন ক্ষতিগ্রস্ত করতে পারে।",
    },
    {
        "id": "sec5_tips",
        "start_sec": 72.5,
        "text": "শেষে তিনটি অভ্যাস মনে রাখুন—সুশৃঙ্খল ও সামঞ্জস্যপূর্ণ বিন্যাস, অনুমোদিত নকশায় ভবিষ্যৎ সংযোগের জন্য জায়গা রাখা, এবং কাজ শেষে ছবি ও রেকর্ড সংরক্ষণ।",
    },
    {
        "id": "sec6_badge",
        "start_sec": 88.5,
        "text": "নিরাপত্তা মেনে পরিচ্ছন্ন ড্রেসিং—দক্ষ কর্মীর পরিচয়। এই দক্ষতাই কাজের কারিগরের গর্ব।",
    },
]


def probe_duration(path: str) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            path,
        ],
        text=True,
    )
    return float(out.strip())


async def synth_all():
    meta = []
    for seg in SEGMENTS:
        out_mp3 = os.path.join(OUT_DIR, f"{seg['id']}.mp3")
        comm = edge_tts.Communicate(seg["text"], VOICE, rate=RATE)
        await comm.save(out_mp3)
        dur = probe_duration(out_mp3)
        meta.append({"id": seg["id"], "start_sec": seg["start_sec"], "duration": dur, "file": out_mp3})
        print(f"Synthesized {seg['id']}: start={seg['start_sec']}s, dur={dur:.2f}s, end={seg['start_sec']+dur:.2f}s")
    with open(os.path.join(OUT_DIR, "timing.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2)
    return meta


def build_master_mix(meta):
    # 1. Generate subtle 98s instrumental bed (warm D-minor / D-sus2 industrial documentary pad + gentle pulse)
    bed_wav = os.path.join(OUT_DIR, "bed_98s.wav")
    bed_expr = (
        "aevalsrc='"
        "0.045*sin(2*PI*73.42*t)*(0.75+0.25*sin(2*PI*0.18*t))"
        "+0.032*sin(2*PI*146.83*t)*(0.7+0.3*sin(2*PI*0.25*t))"
        "+0.022*sin(2*PI*220.0*t)*(0.6+0.4*sin(2*PI*0.33*t))"
        "+0.015*sin(2*PI*329.63*t)*exp(-2.5*mod(t,2.0))"
        "+0.012*sin(2*PI*293.66*t)*exp(-3.0*mod(t+1.0,2.0))"
        ":s=48000:d=98.0'"
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            bed_expr,
            "-af",
            "lowpass=f=1400,afade=t=in:st=0:d=1.8,afade=t=out:st=95.5:d=2.5,volume=0.55",
            bed_wav,
        ],
        check=True,
    )

    # 2. Restrained confirmation chimes & soft transition whooshes
    # Placed at key visual confirmations: 12.0s, 34.0s, 47.0s (binding green), 64.0s (reality green), 71.0s (abrasion green), 93.0s (final checks)
    sfx_wav = os.path.join(OUT_DIR, "sfx_98s.wav")
    chime_times = [12.0, 34.0, 47.2, 64.0, 71.0, 92.8, 94.5]
    chime_terms = "+".join(
        [
            f"(gte(t,{ct})*lt(t,{ct+0.5})*0.04*sin(2*PI*880*(t-{ct}))*exp(-8*(t-{ct})))"
            + f"+(gte(t,{ct+0.07})*lt(t,{ct+0.55})*0.035*sin(2*PI*1318.5*(t-{ct+0.07}))*exp(-8*(t-{ct+0.07})))"
            for ct in chime_times
        ]
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"aevalsrc='{chime_terms}':s=48000:d=98.0",
            sfx_wav,
        ],
        check=True,
    )

    # 3. Mix bed + sfx + all 6 delayed narration tracks
    inputs = ["-i", bed_wav, "-i", sfx_wav]
    filter_parts = ["[0:a]pan=stereo|c0=c0|c1=c0[bed]", "[1:a]pan=stereo|c0=c0|c1=c0[sfx]"]
    mix_labels = ["[bed]", "[sfx]"]
    for idx, seg in enumerate(meta):
        inputs.extend(["-i", seg["file"]])
        in_idx = idx + 2
        delay_ms = int(round(seg["start_sec"] * 1000))
        lbl = f"[vo{idx}]"
        filter_parts.append(
            f"[{in_idx}:a]aresample=48000,pan=stereo|c0=c0|c1=c0,adelay={delay_ms}|{delay_ms},volume=1.35{lbl}"
        )
        mix_labels.append(lbl)

    filter_complex = ";".join(filter_parts) + f";{''.join(mix_labels)}amix=inputs={len(mix_labels)}:duration=first:normalize=0,alimiter=limit=0.95[out]"
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            *inputs,
            "-filter_complex",
            filter_complex,
            "-map",
            "[out]",
            "-t",
            "98.0",
            "-c:a",
            "libmp3lame",
            "-b:a",
            "192k",
            MASTER_OUT,
        ],
        check=True,
    )
    print(f"Master soundtrack written to {MASTER_OUT}")


if __name__ == "__main__":
    meta = asyncio.run(synth_all())
    build_master_mix(meta)
