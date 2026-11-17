#!/usr/bin/env python3
"""
Audio Synthesis & Voiceover Generator for `shuktara-bidyut-suraksha-animation`
Synthesizes authentic Bengali narration (edge-tts bn-IN-TanishaaNeural / bn-IN-BashkarNeural)
and mixes it with procedurally generated regional Bengal foley, SFX, and folk score
to produce an exact 180.00-second (5400 frames @ 30fps) stereo master soundtrack.
"""

import asyncio
import math
import os
import subprocess
import wave
from pathlib import Path

import edge_tts
import numpy as np
from scipy import signal

SR = 44100
DURATION_SEC = 180.0
TOTAL_SAMPLES = int(SR * DURATION_SEC)  # 7,938,000 samples exact

BASE_DIR = Path(__file__).resolve().parent.parent
AUDIO_DIR = BASE_DIR / "public" / "audio"
TEMP_DIR = AUDIO_DIR / "_temp_vo"


# 11 Voiceover segments across the 6 Acts
VO_SEGMENTS = [
    {
        "id": "sc01",
        "act": 1,
        "start": 2.0,
        "max_end": 14.2,
        "voice": "bn-IN-TanishaaNeural",
        "rate": "+5%",
        "text": "বর্ষার মেঘ ডাকলেই বদলে যায় আমাদের চেনা গাঁয়ের পথঘাট। কালবৈশাখী আর প্রবল বৃষ্টির পর স্কুল থেকে ফেরার পথে লুকিয়ে থাকতে পারে অজানা বিপদ।",
    },
    {
        "id": "sc02",
        "act": 1,
        "start": 15.0,
        "max_end": 28.5,
        "voice": "bn-IN-TanishaaNeural",
        "rate": "+5%",
        "text": "কিন্তু ঝড়ের পর মাটির রাস্তায় লুকিয়ে থাকে এক মারাত্মক বিপদ—ছেঁড়া বিদ্যুতের তার! জমা জলে এই তার পড়লে পুরো জলেই ছড়িয়ে পড়ে মারণ বিদ্যুৎ।",
    },
    {
        "id": "sc03",
        "act": 2,
        "start": 31.0,
        "max_end": 44.2,
        "voice": "bn-IN-TanishaaNeural",
        "rate": "+8%",
        "text": "সাবধান বিশু, ওদিকে যেও না! খেলার বলের চেয়ে জীবনের দাম অনেক বেশি। জমা জলে বিদ্যুতের তার থেকে চারপাশের মাটিতে তৈরি হয় ধাপ বিভব বা স্টেপ পটেনশিয়াল।",
    },
    {
        "id": "sc04",
        "act": 2,
        "start": 45.0,
        "max_end": 63.8,
        "voice": "bn-IN-BashkarNeural",
        "rate": "+8%",
        "text": "থামো! ভেজা মাটিতে বা জমা জলে ছেঁড়া তার দেখলে ভুলেও এগোবে না। দুই পা একসাথে জোড়া রেখে খরগোশের মতো লাফিয়ে অন্তত ত্রিশ ফুট দূরে যাও, নয়তো পা না তুলে ঘষে ঘষে পিছাও!",
    },
    {
        "id": "sc05",
        "act": 3,
        "start": 66.0,
        "max_end": 79.0,
        "voice": "bn-IN-TanishaaNeural",
        "rate": "+5%",
        "text": "বৃষ্টির দিনে ঘরের বারান্দা বা রান্নাঘরেও চাই বাড়তি সতর্কতা। বৃষ্টির জলে ভেজা হাতে কখনও সুইচবোর্ডে হাত দেবে না।",
    },
    {
        "id": "sc06",
        "act": 3,
        "start": 80.0,
        "max_end": 98.8,
        "voice": "bn-IN-BashkarNeural",
        "rate": "+8%",
        "text": "ভেজা হাতে বা খালি পায়ে কখনও সুইচবোর্ড, প্লাগ বা মোটর স্পর্শ করবে না। পায়ে শুকনো রাবারের জুতো পরো। আর জমা জলে দাঁড়িয়ে বিদ্যুতের খুঁটি বা টানা তার হাত দিয়ে ধরা অত্যন্ত বিপজ্জনক!",
    },
    {
        "id": "sc07",
        "act": 4,
        "start": 101.0,
        "max_end": 114.0,
        "voice": "bn-IN-TanishaaNeural",
        "rate": "+5%",
        "text": "শরৎ বা বর্ষার বিকেলে খোলা মাঠে ঘুড়ি ওড়াতে সবারই ভালো লাগে। কিন্তু মাঞ্জা বা ভেজা সুতোয় তড়িৎ পরিবাহী হতে পারে।",
    },
    {
        "id": "sc08",
        "act": 4,
        "start": 115.0,
        "max_end": 133.8,
        "voice": "bn-IN-BashkarNeural",
        "rate": "+8%",
        "text": "বিদ্যুতের লাইনের কাছে বা ট্রান্সফরমারের পাশে ভুলেও ঘুড়ি ওড়াবে না। তারে ঘুড়ি আটকে গেলে কখনও কাঁচা বাঁশ বা লাঠি দিয়ে নামানোর চেষ্টা করবে না, বা ট্রান্সফরমারের বেড়ায় উঠবে না!",
    },
    {
        "id": "sc09",
        "act": 5,
        "start": 136.0,
        "max_end": 149.0,
        "voice": "bn-IN-TanishaaNeural",
        "rate": "+6%",
        "text": "দুর্ঘটনাবশত কাউকে কারেন্ট স্পর্শ করলে আতঙ্কিত হয়ে খালি হাতে তাকে ধরতে যাবে না—তাতে তুমিও বিদ্যুৎস্পৃষ্ট হতে পারো!",
    },
    {
        "id": "sc10",
        "act": 5,
        "start": 150.0,
        "max_end": 164.0,
        "voice": "bn-IN-BashkarNeural",
        "rate": "+8%",
        "text": "কাউকে কারেন্ট স্পর্শ করলে খালি গায়ে স্পর্শ করবে না! দ্রুত মেন সুইচ বন্ধ করো এবং শুকনো কাঠ বা শুকনো বাঁশ দিয়ে তাকে তার থেকে আলাদা করো, ও বড়দের ডেকে আনো।",
    },
    {
        "id": "sc11",
        "act": 6,
        "start": 166.0,
        "max_end": 179.4,
        "voice": "bn-IN-TanishaaNeural",
        "rate": "+8%",
        "text": "ছেঁড়া তার বা বিপদ দেখলেই বড়দের জানাও এবং ফোন করো পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বন্টন নিগমের টোল-ফ্রি নম্বর ১৯১২১-এ, অথবা অ্যাম্বুলেন্সের জন্য ১০২ নম্বরে। সতর্কতাতেই লুকিয়ে আছে জীবন সুরক্ষা!",
    },
]


async def synthesize_tts_segments():
    """Synthesize all Bengali VO segments with edge-tts."""
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    for seg in VO_SEGMENTS:
        out_mp3 = TEMP_DIR / f"{seg['id']}_raw.mp3"
        communicate = edge_tts.Communicate(
            text=seg["text"],
            voice=seg["voice"],
            rate=seg["rate"],
        )
        await communicate.save(str(out_mp3))
        print(f"[TTS] Synthesized {seg['id']} ({seg['voice']}) -> {out_mp3.name}")


def load_and_fit_vo_segment(seg: dict) -> np.ndarray:
    """
    Decode TTS mp3 to 44.1kHz mono float32, trim leading/trailing silence,
    and time-stretch if needed so it fits strictly inside [start, max_end].
    """
    raw_mp3 = TEMP_DIR / f"{seg['id']}_raw.mp3"
    wav_path = TEMP_DIR / f"{seg['id']}.wav"

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(raw_mp3),
            "-af",
            "silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,"
            "areverse,silenceremove=start_periods=1:start_duration=0.05:start_threshold=-45dB,areverse",
            "-ar",
            str(SR),
            "-ac",
            "1",
            "-c:a",
            "pcm_s16le",
            str(wav_path),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    with wave.open(str(wav_path), "rb") as wf:
        frames = wf.readframes(wf.getnframes())
        audio = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0

    max_len_sec = seg["max_end"] - seg["start"]
    cur_len_sec = len(audio) / SR

    if cur_len_sec > max_len_sec and cur_len_sec > 0.1:
        speed_factor = min(1.38, (cur_len_sec / max_len_sec) * 1.02)
        stretched_wav = TEMP_DIR / f"{seg['id']}_fit.wav"
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(wav_path),
                "-af",
                f"atempo={speed_factor:.4f}",
                "-ar",
                str(SR),
                "-ac",
                "1",
                "-c:a",
                "pcm_s16le",
                str(stretched_wav),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        with wave.open(str(stretched_wav), "rb") as wf:
            frames = wf.readframes(wf.getnframes())
            audio = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0

    max_samples = int(max_len_sec * SR)
    if len(audio) > max_samples:
        audio = audio[:max_samples]

    # Gentle fade in/out (15ms) and peak normalization to -1.8 dBFS
    fade = min(int(0.015 * SR), len(audio) // 4)
    if fade > 0:
        audio[:fade] *= np.linspace(0.0, 1.0, fade)
        audio[-fade:] *= np.linspace(1.0, 0.0, fade)

    peak = np.max(np.abs(audio))
    if peak > 1e-4:
        audio = audio / peak * 0.82

    return audio


def add_stereo(buf: np.ndarray, mono_sig: np.ndarray, start_sec: float, pan: float = 0.0, gain: float = 1.0):
    """Add a mono signal into stereo buffer `buf` at `start_sec` with constant-power panning (-1.0 L to +1.0 R)."""
    start_idx = max(0, int(round(start_sec * SR)))
    if start_idx >= TOTAL_SAMPLES or len(mono_sig) == 0:
        return
    end_idx = min(TOTAL_SAMPLES, start_idx + len(mono_sig))
    seg = mono_sig[: end_idx - start_idx] * gain
    angle = (pan + 1.0) * (math.pi / 4.0)
    left_gain = math.cos(angle)
    right_gain = math.sin(angle)
    buf[start_idx:end_idx, 0] += seg * left_gain
    buf[start_idx:end_idx, 1] += seg * right_gain


def butter_filter(sig: np.ndarray, cutoff, btype="low", order=3) -> np.ndarray:
    nyq = 0.5 * SR
    if isinstance(cutoff, (list, tuple)):
        norm_cutoff = [c / nyq for c in cutoff]
    else:
        norm_cutoff = cutoff / nyq
    sos = signal.butter(order, norm_cutoff, btype=btype, output="sos")
    filtered = signal.sosfilt(sos, sig.astype(np.float64))
    return np.nan_to_num(filtered, nan=0.0, posinf=0.0, neginf=0.0).astype(np.float32)


def synthesize_folk_score(rng: np.random.Generator) -> np.ndarray:
    """
    Synthesize a warm Bengal rural folk instrumental bed across 180s:
    - Ektara / Khamak rhythmic pluck drone in C3 (130.81 Hz) & G3 (196.00 Hz)
    - Bamboo flute (Bansuri) pentatonic phrases in C Major / Bilawal (C4, D4, E4, G4, A4, C5)
    - Celebratory Dhaak percussion cadence in Act 6 (170s - 180s)
    """
    score = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)

    # 1. Subtle Ektara / Tanpura harmonic drone (continuous low-level warmth, quieter during danger peak)
    t_full = np.arange(TOTAL_SAMPLES, dtype=np.float32) / SR
    drone_c2 = np.sin(2 * np.pi * 65.41 * t_full) * 0.25
    drone_g2 = np.sin(2 * np.pi * 98.00 * t_full) * 0.18
    drone_c3 = np.sin(2 * np.pi * 130.81 * t_full + 0.3 * np.sin(2 * np.pi * 0.25 * t_full)) * 0.20
    drone = (drone_c2 + drone_g2 + drone_c3) * 0.045
    # Modulate drone intensity by narrative arc
    arc_env = np.ones(TOTAL_SAMPLES, dtype=np.float32)
    arc_env[int(15 * SR) : int(46 * SR)] = 0.45  # tense storm
    arc_env[int(166 * SR) :] = 1.35  # uplifting resolution
    score[:, 0] += drone * arc_env * 0.9
    score[:, 1] += drone * arc_env * 1.1

    # 2. Ektara rhythmic plucks during peaceful/educational moments
    pluck_times = (
        list(np.arange(0.5, 14.0, 1.5))
        + list(np.arange(46.5, 64.0, 2.0))
        + list(np.arange(66.0, 98.0, 2.0))
        + list(np.arange(100.5, 114.0, 1.5))
        + list(np.arange(152.0, 179.0, 1.0))
    )
    for idx, pt in enumerate(pluck_times):
        dur = 0.85
        n = int(dur * SR)
        t = np.arange(n, dtype=np.float32) / SR
        freq = 130.81 if idx % 3 != 2 else 196.00
        # Slight upward pitch bend characteristic of Ektara gourd squeeze
        f_inst = freq * (1.0 + 0.035 * np.exp(-t * 6.0))
        phase = 2 * np.pi * np.cumsum(f_inst) / SR
        sig = (
            np.sin(phase)
            + 0.55 * np.sin(2 * phase)
            + 0.30 * np.sin(3 * phase)
            + 0.15 * np.sin(4 * phase)
        )
        env = (1.0 - np.exp(-t * 80.0)) * np.exp(-t * 4.2)
        add_stereo(score, sig * env, pt, pan=-0.35 if idx % 2 == 0 else 0.35, gain=0.065)

    # 3. Bansuri (Bamboo Flute) gentle folk motifs at Act transitions
    flute_phrases = [
        (0.4, [(261.63, 0.7), (293.66, 0.7), (329.63, 0.9), (392.00, 1.2), (329.63, 1.0)]),
        (64.2, [(329.63, 0.6), (392.00, 0.6), (440.00, 0.8), (392.00, 1.1)]),
        (99.2, [(261.63, 0.6), (329.63, 0.6), (392.00, 0.8), (523.25, 1.1)]),
        (151.5, [(261.63, 0.7), (329.63, 0.7), (392.00, 0.9), (523.25, 1.4)]),
        (169.5, [(392.00, 0.5), (440.00, 0.5), (523.25, 0.8), (587.33, 0.6), (523.25, 1.2), (659.25, 1.5), (523.25, 2.0)]),
    ]
    for start_t, notes in flute_phrases:
        cursor = start_t
        for freq, dur in notes:
            n = int(dur * SR)
            t = np.arange(n, dtype=np.float32) / SR
            vib = 1.0 + 0.006 * np.sin(2 * np.pi * 5.5 * t)
            f_t = freq * vib
            ph = 2 * np.pi * np.cumsum(f_t) / SR
            breath = butter_filter(rng.standard_normal(n).astype(np.float32), [600, 2200], btype="band") * 0.08
            flute = np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.06 * np.sin(3 * ph) + breath
            attack = min(int(0.08 * SR), n // 3)
            release = min(int(0.15 * SR), n // 3)
            env = np.ones(n, dtype=np.float32)
            env[:attack] = np.linspace(0.0, 1.0, attack)
            env[-release:] = np.linspace(1.0, 0.0, release)
            add_stereo(score, flute * env, cursor, pan=0.25, gain=0.07)
            cursor += dur * 0.92

    # 4. Uplifting Bengal Dhaak & Kanshor cadence (t = 170.0s to 179.5s)
    dhaak_pattern = [
        (0.0, "dha", 0.9),
        (0.35, "dhin", 0.7),
        (0.70, "dhin", 0.75),
        (1.05, "dha", 0.95),
        (1.40, "ta", 0.65),
        (1.65, "dhin", 0.80),
    ]
    for bar in range(5):
        bar_start = 170.0 + bar * 1.9
        for offset, stroke, vel in dhaak_pattern:
            hit_t = bar_start + offset
            if hit_t >= 179.4:
                break
            dur = 0.32
            n = int(dur * SR)
            t = np.arange(n, dtype=np.float32) / SR
            if stroke in ("dha", "dhin"):
                f_sweep = 115.0 * np.exp(-t * 8.0) + 62.0
                ph = 2 * np.pi * np.cumsum(f_sweep) / SR
                body = np.sin(ph) * np.exp(-t * 11.0)
                slap = butter_filter(rng.standard_normal(n).astype(np.float32), [300, 2400], btype="band") * np.exp(-t * 35.0) * 0.4
                hit = body + slap
            else:
                # High wooden stick rim ("ta")
                hit = np.sin(2 * np.pi * 420.0 * t) * np.exp(-t * 28.0) + butter_filter(
                    rng.standard_normal(n).astype(np.float32), [800, 4500], btype="band"
                ) * np.exp(-t * 45.0) * 0.5
            add_stereo(score, hit * vel, hit_t, pan=-0.2 if stroke == "dha" else 0.25, gain=0.14)

    return score


def synthesize_foley_and_sfx(rng: np.random.Generator) -> np.ndarray:
    """
    Synthesize all scene-specific procedural Foley and SFX across the 180s timeline.
    """
    sfx = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)

    # --- SCENE 1 (0 - 15s): School bell (t=1.5s), Bird chirps (0.3-6s), Rising Kalbaishakhi wind & rain (6s-65s) ---
    # School bell ringing at t=1.5s (3 strikes)
    for strike in range(3):
        bt = 1.5 + strike * 0.65
        dur = 1.4
        n = int(dur * SR)
        t = np.arange(n, dtype=np.float32) / SR
        bell = (
            np.sin(2 * np.pi * 880.0 * t) * np.exp(-t * 3.5)
            + 0.65 * np.sin(2 * np.pi * 1320.0 * t) * np.exp(-t * 5.0)
            + 0.40 * np.sin(2 * np.pi * 2112.0 * t) * np.exp(-t * 8.0)
            + 0.25 * np.sin(2 * np.pi * 2990.0 * t) * np.exp(-t * 12.0)
        )
        add_stereo(sfx, bell, bt, pan=-0.3, gain=0.18)

    # Village bird chirps (0.4s to 6.0s)
    chirp_times = [0.4, 0.9, 1.2, 3.6, 4.1, 4.8, 5.4]
    for idx, ct in enumerate(chirp_times):
        dur = 0.22
        n = int(dur * SR)
        t = np.arange(n, dtype=np.float32) / SR
        f0 = 2400.0 + (idx % 3) * 350.0
        f_inst = f0 + 900.0 * np.sin(2 * np.pi * 14.0 * t)
        ph = 2 * np.pi * np.cumsum(f_inst) / SR
        env = np.sin(np.pi * t / dur) ** 2
        add_stereo(sfx, np.sin(ph) * env, ct, pan=0.45 if idx % 2 == 0 else -0.4, gain=0.09)

    # Rising Kalbaishakhi Wind & Heavy Monsoon Rain (t=6.0s to 65.0s)
    rain_start = int(6.0 * SR)
    rain_end = int(65.0 * SR)
    rain_len = rain_end - rain_start
    t_rain = np.arange(rain_len, dtype=np.float32) / SR

    # Stereo rain patter (bandpass filtered noise + micro droplet impulses)
    noise_l = butter_filter(rng.standard_normal(rain_len).astype(np.float32), [450, 7500], btype="band")
    noise_r = butter_filter(rng.standard_normal(rain_len).astype(np.float32), [450, 7500], btype="band")
    # Howling Kalbaishakhi wind (low-mid bandpass modulated by slow LFO)
    wind_raw = butter_filter(rng.standard_normal(rain_len).astype(np.float32), [180, 950], btype="band")
    wind_lfo = 0.65 + 0.35 * np.sin(2 * np.pi * 0.16 * t_rain)

    # Envelope: fade in 6s->14s, peak 14s->45s, taper 45s->65s
    rain_env = np.ones(rain_len, dtype=np.float32)
    fi = int(8.0 * SR)
    fo = int(12.0 * SR)
    rain_env[:fi] = np.linspace(0.05, 1.0, fi)
    rain_env[-fo:] = np.linspace(1.0, 0.25, fo)

    sfx[rain_start:rain_end, 0] += (noise_l * 0.075 + wind_raw * wind_lfo * 0.09) * rain_env
    sfx[rain_start:rain_end, 1] += (noise_r * 0.075 + wind_raw * wind_lfo * 0.09) * rain_env

    # --- SCENE 2 (15 - 30s): Thunderclap (t=15.5s), Wire snap (t=17.5s), 50Hz hum + HV arcs (t=18s-45s) ---
    # Dramatic Kalbaishakhi Thunderclap at t=15.5s
    th_dur = 4.2
    th_n = int(th_dur * SR)
    t_th = np.arange(th_n, dtype=np.float32) / SR
    crack = butter_filter(rng.standard_normal(th_n).astype(np.float32), [120, 3200], btype="band") * np.exp(-t_th * 6.5)
    rumble = butter_filter(rng.standard_normal(th_n).astype(np.float32), [35, 190], btype="band") * (
        np.exp(-t_th * 1.1) * (0.7 + 0.3 * np.sin(2 * np.pi * 2.8 * t_th))
    )
    thunder = crack * 0.6 + rumble * 1.4
    peak_th = np.max(np.abs(thunder))
    if peak_th > 0:
        thunder = thunder / peak_th
    add_stereo(sfx, thunder, 15.5, pan=0.25, gain=0.42)

    # Concrete Pole Wire Snap Whip at t=17.5s
    snap_dur = 0.65
    snap_n = int(snap_dur * SR)
    t_sn = np.arange(snap_n, dtype=np.float32) / SR
    f_whip = 2800.0 * np.exp(-t_sn * 9.0) + 180.0
    ph_whip = 2 * np.pi * np.cumsum(f_whip) / SR
    metallic_twang = np.sin(ph_whip) * np.exp(-t_sn * 7.5) + 0.5 * np.sin(2.4 * ph_whip) * np.exp(-t_sn * 12.0)
    add_stereo(sfx, metallic_twang, 17.5, pan=0.45, gain=0.36)

    # 50Hz Transformer Hum + High-Voltage Electrical Arc Crackles (t=18.0s to 45.0s)
    arc_start = 18.0
    arc_dur = 27.0
    arc_n = int(arc_dur * SR)
    t_arc = np.arange(arc_n, dtype=np.float32) / SR
    hum_50 = (
        np.sin(2 * np.pi * 50.0 * t_arc) * 0.35
        + np.sin(2 * np.pi * 100.0 * t_arc) * 0.25
        + np.sin(2 * np.pi * 150.0 * t_arc) * 0.45
        + np.sin(2 * np.pi * 250.0 * t_arc) * 0.30
        + np.sin(2 * np.pi * 350.0 * t_arc) * 0.18
    )
    # Intermittent violent sputtering electric arcs
    crackle_env = (np.sin(2 * np.pi * 1.7 * t_arc) > 0.35).astype(np.float32) * (
        0.5 + 0.5 * np.sin(2 * np.pi * 13.0 * t_arc)
    )
    sparks = butter_filter(rng.standard_normal(arc_n).astype(np.float32), [1800, 8500], btype="band") * crackle_env
    hv_bed = hum_50 * 0.16 + sparks * 0.22
    # Fade out smoothly between 42s and 45s
    hv_fade = int(3.0 * SR)
    hv_bed[-hv_fade:] *= np.linspace(1.0, 0.0, hv_fade)
    add_stereo(sfx, hv_bed, arc_start, pan=0.35, gain=0.45)

    # --- SCENE 4 (45 - 65s): Diagram pop-in chime (t=46s), Bunny-hop thuds (t=52s, 53s, 54s, 55s) ---
    # Diagram Pop-in Chime at t=46.0s
    for idx, freq in enumerate([523.25, 659.25, 783.99, 1046.50]):
        ct = 46.0 + idx * 0.12
        n = int(0.6 * SR)
        t = np.arange(n, dtype=np.float32) / SR
        chime = (np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(2 * np.pi * freq * 2 * t)) * np.exp(-t * 6.5)
        add_stereo(sfx, chime, ct, pan=0.0, gain=0.18)

    # Rhythmic two-foot Bunny-Hop Thuds on wet earth (t=52s, 53s, 54s, 55s)
    for hop_t in [52.0, 53.0, 54.0, 55.0]:
        n = int(0.35 * SR)
        t = np.arange(n, dtype=np.float32) / SR
        f_thud = 110.0 * np.exp(-t * 18.0) + 48.0
        ph = 2 * np.pi * np.cumsum(f_thud) / SR
        thud = np.sin(ph) * np.exp(-t * 14.0)
        mud_splash = butter_filter(rng.standard_normal(n).astype(np.float32), [400, 3200], btype="band") * np.exp(-t * 22.0) * 0.35
        add_stereo(sfx, thud + mud_splash, hop_t, pan=-0.15, gain=0.34)

    # --- SCENE 5-6 (65 - 100s): Tin roof water drips (t=66s-85s), Bidyut Bondhu chime (t=80s), safety shield hum ---
    for dt in np.arange(66.2, 85.0, 0.85):
        n = int(0.14 * SR)
        t = np.arange(n, dtype=np.float32) / SR
        f0 = 780.0 + (int(dt * 10) % 4) * 110.0
        f_drip = f0 + 420.0 * (t / 0.14)
        ph = 2 * np.pi * np.cumsum(f_drip) / SR
        drip = np.sin(ph) * np.exp(-t * 28.0)
        add_stereo(sfx, drip, float(dt), pan=-0.4 if int(dt) % 2 == 0 else 0.35, gain=0.14)

    # Bidyut Bondhu Magical Lantern Chime (t=80.0s) + Safety Shield Hum (t=80.0s - 92.0s)
    lantern_notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]
    for idx, freq in enumerate(lantern_notes):
        lt = 80.0 + idx * 0.11
        n = int(0.9 * SR)
        t = np.arange(n, dtype=np.float32) / SR
        shimmer = (np.sin(2 * np.pi * freq * t) + 0.4 * np.sin(2 * np.pi * freq * 1.5 * t)) * np.exp(-t * 4.5)
        add_stereo(sfx, shimmer, lt, pan=-0.2 + idx * 0.08, gain=0.16)

    sh_n = int(10.0 * SR)
    t_sh = np.arange(sh_n, dtype=np.float32) / SR
    shield_hum = (
        np.sin(2 * np.pi * 220.0 * t_sh) + 0.5 * np.sin(2 * np.pi * 330.0 * t_sh)
    ) * np.sin(np.pi * t_sh / 10.0)
    add_stereo(sfx, shield_hum, 80.5, pan=0.15, gain=0.055)

    # --- SCENE 7-8 (100 - 135s): Afternoon breeze & kite flutter (100-118s), 11kV buzz (110s), Warning buzzer (118s) ---
    breeze_n = int(18.0 * SR)
    t_br = np.arange(breeze_n, dtype=np.float32) / SR
    breeze = butter_filter(rng.standard_normal(breeze_n).astype(np.float32), [250, 1600], btype="band") * (
        0.5 + 0.5 * np.sin(2 * np.pi * 0.25 * t_br)
    )
    add_stereo(sfx, breeze, 100.5, pan=-0.25, gain=0.07)

    # Paper kite flutter bursts
    for kt in [102.5, 105.0, 107.8, 109.2]:
        n = int(0.45 * SR)
        t = np.arange(n, dtype=np.float32) / SR
        flutter = butter_filter(rng.standard_normal(n).astype(np.float32), [600, 3500], btype="band") * (
            0.5 + 0.5 * np.sin(2 * np.pi * 24.0 * t)
        ) * np.sin(np.pi * t / 0.45)
        add_stereo(sfx, flutter, kt, pan=0.3, gain=0.18)

    # 11kV Line Corona Buzz at t=110.0s to 124.0s
    buzz_n = int(14.0 * SR)
    t_bz = np.arange(buzz_n, dtype=np.float32) / SR
    buzz = (
        np.sin(2 * np.pi * 100.0 * t_bz) * 0.4
        + signal.sawtooth(2 * np.pi * 100.0 * t_bz) * 0.35
        + butter_filter(rng.standard_normal(buzz_n).astype(np.float32), [2500, 7000], btype="band") * 0.25
    ) * np.sin(np.pi * t_bz / 14.0)
    add_stereo(sfx, buzz, 110.0, pan=0.35, gain=0.12)

    # Warning Buzzer ❌ at t=118.0s (two sharp double-beeps)
    for b_idx in range(2):
        bt = 118.0 + b_idx * 0.42
        n = int(0.28 * SR)
        t = np.arange(n, dtype=np.float32) / SR
        buzzer = (
            signal.square(2 * np.pi * 185.0 * t) * 0.5
            + signal.sawtooth(2 * np.pi * 370.0 * t) * 0.5
        ) * np.exp(-t * 4.0)
        buzzer = butter_filter(buzzer, 1400, btype="low")
        add_stereo(sfx, buzzer, bt, pan=0.0, gain=0.22)

    # --- SCENE 9-10 (135 - 165s): Urgent heartbeat pulse (t=136s-145s), Main switch CLUNK OFF (t=146s), Relief chord (t=152s) ---
    for hb in range(10):
        hbt = 136.0 + hb * 0.9
        for pulse_offset, amp in [(0.0, 1.0), (0.22, 0.65)]:
            n = int(0.18 * SR)
            t = np.arange(n, dtype=np.float32) / SR
            thump = np.sin(2 * np.pi * 58.0 * t) * np.exp(-t * 20.0) * amp
            add_stereo(sfx, thump, hbt + pulse_offset, pan=0.0, gain=0.30)

    # Heavy Iron Main Switch Lever CLUNK OFF at t=146.0s
    clunk_n = int(0.45 * SR)
    t_cl = np.arange(clunk_n, dtype=np.float32) / SR
    mech_latch = (
        np.sin(2 * np.pi * 95.0 * t_cl) * np.exp(-t_cl * 25.0)
        + np.sin(2 * np.pi * 420.0 * t_cl) * np.exp(-t_cl * 45.0) * 0.7
        + butter_filter(rng.standard_normal(clunk_n).astype(np.float32), [500, 4000], btype="band") * np.exp(-t_cl * 55.0) * 0.8
    )
    add_stereo(sfx, mech_latch, 146.0, pan=-0.2, gain=0.42)

    # Warm Relief Chord at t=152.0s (C4 - E4 - G4 - C5 warm pad)
    rel_n = int(6.5 * SR)
    t_rel = np.arange(rel_n, dtype=np.float32) / SR
    rel_chord = (
        np.sin(2 * np.pi * 261.63 * t_rel)
        + 0.8 * np.sin(2 * np.pi * 329.63 * t_rel)
        + 0.8 * np.sin(2 * np.pi * 392.00 * t_rel)
        + 0.6 * np.sin(2 * np.pi * 523.25 * t_rel)
    ) * 0.25
    rel_env = np.sin(np.pi * t_rel / 6.5) ** 1.5
    add_stereo(sfx, rel_chord * rel_env, 152.0, pan=0.0, gain=0.18)

    # --- SCENE 11 (165 - 180s): Telephone Ring (t=166s) ---
    for ring_idx in range(2):
        rt = 166.0 + ring_idx * 1.4
        n = int(0.8 * SR)
        t = np.arange(n, dtype=np.float32) / SR
        mod = 0.5 + 0.5 * np.sin(2 * np.pi * 20.0 * t)
        ring = (np.sin(2 * np.pi * 440.0 * t) + np.sin(2 * np.pi * 480.0 * t)) * 0.5 * mod
        add_stereo(sfx, ring, rt, pan=-0.25, gain=0.20)

    return sfx


def export_act_vo_files(vo_Audio_map: dict):
    """Export per-act VO MP3 files (`act1_vo.mp3` .. `act6_vo.mp3`) for modular inspection."""
    acts = {}
    for seg in VO_SEGMENTS:
        act_num = seg["act"]
        acts.setdefault(act_num, []).append((seg, vo_Audio_map[seg["id"]]))

    act_ranges = {
        1: (0.0, 30.0),
        2: (30.0, 65.0),
        3: (65.0, 100.0),
        4: (100.0, 135.0),
        5: (135.0, 165.0),
        6: (165.0, 180.0),
    }

    for act_num, (a_start, a_end) in act_ranges.items():
        act_samples = int((a_end - a_start) * SR)
        act_buf = np.zeros(act_samples, dtype=np.float32)
        for seg, audio in acts.get(act_num, []):
            rel_start = int((seg["start"] - a_start) * SR)
            rel_end = min(act_samples, rel_start + len(audio))
            if rel_start >= 0 and rel_end > rel_start:
                act_buf[rel_start:rel_end] += audio[: rel_end - rel_start]

        act_wav = TEMP_DIR / f"act{act_num}_vo.wav"
        act_mp3 = AUDIO_DIR / f"act{act_num}_vo.mp3"
        pcm = np.clip(act_buf * 32767.0, -32768, 32767).astype(np.int16)
        with wave.open(str(act_wav), "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(SR)
            wf.writeframes(pcm.tobytes())

        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(act_wav),
                "-c:a",
                "libmp3lame",
                "-b:a",
                "192k",
                str(act_mp3),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        print(f"[Act VO] Exported {act_mp3.name} ({a_end - a_start:.1f}s)")


def main():
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)

    print("=== Step 1: Synthesizing Bengali Voiceover via edge-tts ===")
    asyncio.run(synthesize_tts_segments())

    print("=== Step 2: Fitting VO segments & building 180.00s VO stem ===")
    vo_stem = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    vo_envelope = np.zeros(TOTAL_SAMPLES, dtype=np.float32)
    vo_audio_map = {}

    for seg in VO_SEGMENTS:
        audio = load_and_fit_vo_segment(seg)
        vo_audio_map[seg["id"]] = audio
        start_idx = int(round(seg["start"] * SR))
        end_idx = min(TOTAL_SAMPLES, start_idx + len(audio))
        clip = audio[: end_idx - start_idx]
        vo_stem[start_idx:end_idx, 0] += clip
        vo_stem[start_idx:end_idx, 1] += clip
        vo_envelope[start_idx:end_idx] = 1.0
        print(
            f"  Placed {seg['id']} [{seg['start']:.2f}s -> {seg['start'] + len(clip)/SR:.2f}s] "
            f"(window max {seg['max_end']:.2f}s)"
        )

    export_act_vo_files(vo_audio_map)

    print("=== Step 3: Synthesizing Bengal Folk Score & Procedural Foley/SFX ===")
    rng = np.random.default_rng(19121)
    score_stem = synthesize_folk_score(rng)
    sfx_stem = synthesize_foley_and_sfx(rng)

    print("=== Step 4: Applying Sidechain Ducking & Final Mastering ===")
    # Smooth envelope follower for sidechain ducking (250ms smoothing window)
    win_len = int(0.25 * SR)
    kernel = np.ones(win_len, dtype=np.float32) / win_len
    smooth_vo_env = np.convolve(vo_envelope, kernel, mode="same")
    smooth_vo_env = np.clip(smooth_vo_env, 0.0, 1.0)

    # Score ducks to 35% during VO; SFX ducks to 52% during VO so transient cues remain audible
    score_duck = (1.0 - 0.65 * smooth_vo_env)[:, None]
    sfx_duck = (1.0 - 0.48 * smooth_vo_env)[:, None]

    master = vo_stem * 0.92 + score_stem * score_duck + sfx_stem * sfx_duck

    # Gentle master fade-in (0.2s) and fade-out (0.8s) to guarantee zero clicks at boundaries
    fi = int(0.2 * SR)
    fo = int(0.8 * SR)
    master[:fi, :] *= np.linspace(0.0, 1.0, fi)[:, None]
    master[-fo:, :] *= np.linspace(1.0, 0.0, fo)[:, None]

    # Soft limiter (tanh saturation above 0.85) + normalize to -1.0 dBTP (0.891)
    master = np.tanh(master * 1.15)
    peak = np.max(np.abs(master))
    if peak > 1e-5:
        master = master / peak * 0.891

    assert master.shape == (TOTAL_SAMPLES, 2), f"Expected {(TOTAL_SAMPLES, 2)}, got {master.shape}"

    master_wav = AUDIO_DIR / "master_soundtrack.wav"
    master_mp3 = AUDIO_DIR / "master_soundtrack.mp3"

    pcm_stereo = np.clip(master * 32767.0, -32768, 32767).astype(np.int16)
    with wave.open(str(master_wav), "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm_stereo.tobytes())

    print(f"[Master WAV] Written {master_wav} ({TOTAL_SAMPLES / SR:.2f}s exact)")

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(master_wav),
            "-c:a",
            "libmp3lame",
            "-b:a",
            "192k",
            "-ar",
            str(SR),
            "-ac",
            "2",
            "-t",
            "180.00",
            str(master_mp3),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    print(f"[Master MP3] Written {master_mp3}")

    # Clean up temporary raw files
    for f in TEMP_DIR.glob("*"):
        try:
            f.unlink()
        except OSError:
            pass
    try:
        TEMP_DIR.rmdir()
    except OSError:
        pass

    print("=== Audio Synthesis Complete! ===")


if __name__ == "__main__":
    main()
