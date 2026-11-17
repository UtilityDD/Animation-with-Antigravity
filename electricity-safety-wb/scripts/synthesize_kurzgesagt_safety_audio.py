import asyncio
import os
import wave
import numpy as np
import edge_tts
import subprocess

AUDIO_DIR = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\electricity-safety-wb\public\audio"
SUBTITLE_DIR = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\electricity-safety-wb\subtitles"
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(SUBTITLE_DIR, exist_ok=True)

SR = 44100
DURATION_SEC = 60.0
TOTAL_SAMPLES = int(SR * DURATION_SEC)

SCENES = [
    {
        "id": 1,
        "name": "Scene 1: The Snapped Wire Trap",
        "start_sec": 0.5,
        "max_end_sec": 3.8,
        "text": "বর্ষার ঝড়ে ছেঁড়া বিদ্যুতের তারে লুকিয়ে থাকে এক অদৃশ্য মারণফাঁদ।",
        "srt_start": "00:00:00,500",
        "srt_end": "00:00:03,800",
        "en": "In a monsoon storm, a snapped live wire hides an invisible, deadly trap."
    },
    {
        "id": 2,
        "name": "Scene 2: The Question - Why Walking Kills",
        "start_sec": 4.2,
        "max_end_sec": 11.5,
        "text": "ভেজা মাটিতে পা ফেলা মাত্রই তৈরি হতে পারে মারাত্মক বিপদ। কেন সাধারণ হাঁটা এখানে প্রাণঘাতী?",
        "srt_start": "00:00:04,200",
        "srt_end": "00:00:11,500",
        "en": "Stepping onto wet ground near a wire can be fatal. Why is walking normally so dangerous?"
    },
    {
        "id": 3,
        "name": "Scene 3: The Science - Step Potential",
        "start_sec": 12.0,
        "max_end_sec": 24.5,
        "text": "এর বৈজ্ঞানিক কারণ—ধাপ বিভব বা স্টেপ পটেনশিয়াল। তারের চারপাশের মাটিতে ভোল্টেজের বলয় ছড়িয়ে পড়ে। দুই পা ফাঁক করে হাঁটলে দুই পায়ের বিভব পার্থক্যে শরীরের ভেতর দিয়ে বিদ্যুৎ প্রবাহিত হয়।",
        "srt_start": "00:00:12,000",
        "srt_end": "00:00:24,500",
        "en": "The science behind this is Step Potential. Voltage spreads in concentric rings across wet ground. Walking wide creates a voltage difference that forces current through your body."
    },
    {
        "id": 4,
        "name": "Scene 4: The Solution - Bunny Hop Protocol",
        "start_sec": 25.0,
        "max_end_sec": 37.5,
        "text": "বাঁচার একমাত্র উপায়—খরগোশ লাফ বা পা ঘষে চলা! দুই পা একসাথে জোড়া রাখলে বিভব পার্থক্য থাকে শূন্য। পা জোড়া রেখে লাফিয়ে অন্তত ত্রিশ ফুট বা দশ মিটার দূরে যাও।",
        "srt_start": "00:00:25,000",
        "srt_end": "00:00:37,500",
        "en": "The only escape is the Bunny Hop or shuffle! Keeping both feet tightly joined keeps the voltage difference at zero. Hop at least 30 feet or 10 meters away."
    },
    {
        "id": 5,
        "name": "Scene 5: Wet Switches & Stay-Wires",
        "start_sec": 38.0,
        "max_end_sec": 47.5,
        "text": "ভেজা হাতে কখনও সুইচ স্পর্শ করবে না। আর জমা জলে দাঁড়িয়ে বিদ্যুতের খুঁটি বা টানা তার হাত দিয়ে ধরা চরম বিপজ্জনক।",
        "srt_start": "00:00:38,000",
        "srt_end": "00:00:47,500",
        "en": "Never touch switches with wet hands. And never touch electric poles or stay-wires in waterlogged conditions."
    },
    {
        "id": 6,
        "name": "Scene 6: Shock Rescue & First Aid",
        "start_sec": 48.0,
        "max_end_sec": 55.0,
        "text": "কাউকে কারেন্ট স্পর্শ করলে খালি হাতে ধরবে না! দ্রুত মেন সুইচ বন্ধ করো এবং শুকনো বাঁশ দিয়ে তাকে আলাদা করো।",
        "srt_start": "00:00:48,000",
        "srt_end": "00:00:55,000",
        "en": "Never touch a shock victim bare-handed! Turn off the Main Switch instantly and separate with dry bamboo."
    },
    {
        "id": 7,
        "name": "Scene 7: Emergency 19121 & Sign-off",
        "start_sec": 55.5,
        "max_end_sec": 59.5,
        "text": "বিপদ দেখলেই ফোন করো পশ্চিমবঙ্গ বিদ্যুৎ বন্টন নিগমের টোল-ফ্রি নম্বর ১৯১২১-এ। সতর্কতাই জীবন রক্ষা!",
        "srt_start": "00:00:55,500",
        "srt_end": "00:00:59,600",
        "en": "Report dangers immediately to WBSEDCL Helpline 19121. Safety saves lives!"
    }
]

async def synthesize_vo_stems():
    voice = "bn-IN-TanishaaNeural"
    temp_dir = os.path.join(AUDIO_DIR, "ks_temp")
    os.makedirs(temp_dir, exist_ok=True)
    stems = []
    
    for sc in SCENES:
        mp3_path = os.path.join(temp_dir, f"scene_{sc['id']}.mp3")
        wav_path = os.path.join(temp_dir, f"scene_{sc['id']}.wav")
        communicate = edge_tts.Communicate(sc["text"], voice, rate="+4%", pitch="+1Hz")
        await communicate.save(mp3_path)
        
        # Convert to WAV 44.1kHz stereo
        cmd = ["ffmpeg", "-y", "-i", mp3_path, "-ar", str(SR), "-ac", "2", wav_path]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        stems.append((sc, wav_path))
    return stems

def generate_procedural_kurzgesagt_score_and_sfx():
    t = np.linspace(0, DURATION_SEC, TOTAL_SAMPLES, endpoint=False)
    left = np.zeros(TOTAL_SAMPLES, dtype=np.float32)
    right = np.zeros(TOTAL_SAMPLES, dtype=np.float32)

    # 1. Modern Punchy Kurzgesagt Synth Bed (D-minor / Modern Science Explainer)
    # Bass root D2=73.4Hz + F2=87.3Hz + A2=110Hz + high arpeggio
    bass_pulse = np.sin(2 * np.pi * 73.4 * t) * (0.8 + 0.2 * np.sin(2 * np.pi * 2.0 * t)) * 0.12
    fifth_pulse = np.sin(2 * np.pi * 110.0 * t) * 0.08
    
    # 16th-note analog synth plucks (4Hz tempo)
    plucks = (
        np.sin(2 * np.pi * 293.6 * t) * np.exp(-((t % 0.25) * 16)) * 0.06 +
        np.sin(2 * np.pi * 349.2 * t) * np.exp(-(((t + 0.125) % 0.25) * 16)) * 0.05
    )
    
    music_bed = (bass_pulse + fifth_pulse + plucks).astype(np.float32)
    left += music_bed * 0.95
    right += music_bed * 1.05

    # 2. Scene 1 (t=1.0s): High-Voltage Lightning Crack & 11kV Spark Arc (t=1.5s to 3.5s)
    idx_light = int(1.0 * SR)
    light_len = int(0.5 * SR)
    tlight = np.linspace(0, 0.5, light_len, endpoint=False)
    lightning_hit = (np.random.rand(light_len) * 2 - 1) * np.exp(-tlight * 12) * 0.25
    left[idx_light:idx_light+light_len] += lightning_hit
    right[idx_light:idx_light+light_len] += lightning_hit

    # 50Hz hum + arc crackles during snapped wire (t=1.5s - 5.0s)
    idx_arc = int(1.5 * SR)
    arc_len = int(3.5 * SR)
    tarc = np.linspace(0, 3.5, arc_len, endpoint=False)
    hum_50hz = np.sin(2 * np.pi * 50.0 * tarc) * 0.09
    spark_buzz = (np.random.rand(arc_len) * 2 - 1) * (np.sin(2 * np.pi * 100 * tarc) > 0.7) * 0.07
    left[idx_arc:idx_arc+arc_len] += hum_50hz + spark_buzz
    right[idx_arc:idx_arc+arc_len] += hum_50hz + spark_buzz

    # 3. Scene 2 (t=4.2s): Heartbeat Warning Thud (70Hz pitch drop)
    for hb_time in [4.2, 5.0, 5.8]:
        idx_hb = int(hb_time * SR)
        hb_len = int(0.3 * SR)
        thb = np.linspace(0, 0.3, hb_len, endpoint=False)
        hb = np.sin(2 * np.pi * (65 - thb * 120) * thb) * np.exp(-thb * 14) * 0.16
        left[idx_hb:idx_hb+hb_len] += hb
        right[idx_hb:idx_hb+hb_len] += hb

    # 4. Scene 3 (t=12.5s): Infographic Step Potential Pop-In Chimes (C6=1046Hz, G6=1568Hz)
    idx_info = int(12.5 * SR)
    info_len = int(1.2 * SR)
    tinfo = np.linspace(0, 1.2, info_len, endpoint=False)
    chime = (np.sin(2 * np.pi * 1046.5 * tinfo) + np.sin(2 * np.pi * 1567.9 * tinfo)) * np.exp(-tinfo * 5) * 0.14
    left[idx_info:idx_info+info_len] += chime * 1.1
    right[idx_info:idx_info+info_len] += chime * 0.9

    # 5. Scene 4 (t=26s, 27.5s, 29s, 30.5s): Rhythmic Bunny Hop Cartoon Bounce Thuds
    for hop_t in [26.0, 27.5, 29.0, 30.5]:
        idx_hop = int(hop_t * SR)
        hop_len = int(0.4 * SR)
        thop = np.linspace(0, 0.4, hop_len, endpoint=False)
        hop_sound = np.sin(2 * np.pi * (140 - thop * 180) * thop) * np.exp(-thop * 10) * 0.15
        left[idx_hop:idx_hop+hop_len] += hop_sound
        right[idx_hop:idx_hop+hop_len] += hop_sound

    # 6. Scene 5 (t=38.5s): Water Drop Pluck & Warning Buzzer (t=40s)
    idx_drop = int(38.5 * SR)
    drop_len = int(0.3 * SR)
    tdrop = np.linspace(0, 0.3, drop_len, endpoint=False)
    drop = np.sin(2 * np.pi * (1200 + tdrop * 1800) * tdrop) * np.exp(-tdrop * 16) * 0.12
    left[idx_drop:idx_drop+drop_len] += drop
    right[idx_drop:idx_drop+drop_len] += drop

    # 7. Scene 6 (t=49.0s): Main Switch Heavy Mechanical Clunk OFF
    idx_sw = int(49.0 * SR)
    sw_len = int(0.4 * SR)
    tsw = np.linspace(0, 0.4, sw_len, endpoint=False)
    clunk = (np.sin(2 * np.pi * 90 * tsw) * np.exp(-tsw * 18) + (np.random.rand(sw_len) * 2 - 1) * np.exp(-tsw * 24)) * 0.22
    left[idx_sw:idx_sw+sw_len] += clunk
    right[idx_sw:idx_sw+sw_len] += clunk

    # 8. Scene 7 (t=55.5s): Emergency Telephone Ring & Uplifting Resolution Bell
    idx_phone = int(55.5 * SR)
    phone_len = int(1.2 * SR)
    tphone = np.linspace(0, 1.2, phone_len, endpoint=False)
    ring = (np.sin(2 * np.pi * 1050 * tphone) + np.sin(2 * np.pi * 1400 * tphone)) * (np.sin(2 * np.pi * 20 * tphone) > 0) * 0.12
    left[idx_phone:idx_phone+phone_len] += ring
    right[idx_phone:idx_phone+phone_len] += ring

    # Final Resolution Bell (t=57.0s to end)
    idx_res = int(57.0 * SR)
    res_len = TOTAL_SAMPLES - idx_res
    tres = np.linspace(0, res_len / SR, res_len, endpoint=False)
    res_bell = (np.sin(2 * np.pi * 523.25 * tres) + np.sin(2 * np.pi * 659.25 * tres) * 0.5) * np.exp(-tres * 1.1) * 0.20
    left[idx_res:] += res_bell
    right[idx_res:] += res_bell

    return left, right

def read_wav_samples(wav_path):
    with wave.open(wav_path, 'rb') as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        n_frames = wf.getnframes()
        data = wf.readframes(n_frames)
        if sampwidth == 2:
            arr = np.frombuffer(data, dtype=np.int16).astype(np.float32) / 32768.0
        else:
            raise ValueError("Unsupported sample width")
        if n_channels == 2:
            left = arr[0::2]
            right = arr[1::2]
        else:
            left = arr
            right = arr
        return left, right

def mix_master_soundtrack(stems):
    bg_left, bg_right = generate_procedural_kurzgesagt_score_and_sfx()
    
    master_left = bg_left.copy()
    master_right = bg_right.copy()

    for sc, wav_path in stems:
        vo_left, vo_right = read_wav_samples(wav_path)
        start_idx = int(sc["start_sec"] * SR)
        n_vo = len(vo_left)
        end_idx = min(TOTAL_SAMPLES, start_idx + n_vo)
        clip_len = end_idx - start_idx
        
        # Duck background under voiceover (-4.5 dB)
        duck_window = np.ones(clip_len, dtype=np.float32)
        fade_len = min(int(0.12 * SR), clip_len // 4)
        if fade_len > 0:
            fade_in = np.linspace(1.0, 0.42, fade_len)
            fade_out = np.linspace(0.42, 1.0, fade_len)
            duck_window[:fade_len] = fade_in
            duck_window[fade_len:-fade_len] = 0.42
            duck_window[-fade_len:] = fade_out
            
            master_left[start_idx:end_idx] *= duck_window
            master_right[start_idx:end_idx] *= duck_window

        # Add voiceover track at optimal presence (+2.5 dB)
        master_left[start_idx:end_idx] += vo_left[:clip_len] * 1.20
        master_right[start_idx:end_idx] += vo_right[:clip_len] * 1.20

    # Master soft limiting & normalization (-1.0 dBFS true peak)
    max_val = max(np.max(np.abs(master_left)), np.max(np.abs(master_right)))
    if max_val > 0.90:
        norm_factor = 0.90 / max_val
        master_left *= norm_factor
        master_right *= norm_factor

    master_wav = os.path.join(AUDIO_DIR, "kurzgesagt_safety_soundtrack.wav")
    master_mp3 = os.path.join(AUDIO_DIR, "kurzgesagt_safety_soundtrack.mp3")

    interleaved = np.empty((TOTAL_SAMPLES * 2,), dtype=np.int16)
    interleaved[0::2] = np.clip(master_left * 32767, -32768, 32767).astype(np.int16)
    interleaved[1::2] = np.clip(master_right * 32767, -32768, 32767).astype(np.int16)

    with wave.open(master_wav, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(interleaved.tobytes())

    cmd = ["ffmpeg", "-y", "-i", master_wav, "-b:a", "192k", master_mp3]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print("Master Kurzgesagt Safety soundtrack created:")
    print("  ->", master_wav)
    print("  ->", master_mp3)

def export_srt_subtitles():
    srt_path = os.path.join(SUBTITLE_DIR, "kurzgesagt_safety_60fps.srt")
    with open(srt_path, "w", encoding="utf-8") as f:
        for idx, sc in enumerate(SCENES, 1):
            f.write(f"{idx}\n")
            f.write(f"{sc['srt_start']} --> {sc['srt_end']}\n")
            f.write(f"{sc['text']}\n")
            f.write(f"({sc['en']})\n\n")
    print("Exported dual-language SRT subtitles to:", srt_path)

if __name__ == "__main__":
    stems = asyncio.run(synthesize_vo_stems())
    mix_master_soundtrack(stems)
    export_srt_subtitles()
