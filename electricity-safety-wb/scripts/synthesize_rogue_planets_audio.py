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

# 7 Story Scenes & Dialogue
SCENES = [
    {
        "id": 1,
        "name": "Scene 1: Dark Eclipse",
        "start_sec": 0.5,
        "max_end_sec": 3.8,
        "text": "Deep in the pitch-black void between stars, something massive is moving.",
        "srt_start": "00:00:00,500",
        "srt_end": "00:00:03,800"
    },
    {
        "id": 2,
        "name": "Scene 2: Cosmic Question",
        "start_sec": 4.5,
        "max_end_sec": 10.5,
        "text": "We grow up learning that planets orbit stars. But what if trillions of worlds are completely alone?",
        "srt_start": "00:00:04,500",
        "srt_end": "00:00:10,500"
    },
    {
        "id": 3,
        "name": "Scene 3: Gravitational Billiards",
        "start_sec": 11.5,
        "max_end_sec": 19.5,
        "text": "Billions of years ago, chaotic planetary nurseries played gravitational billiards, hurling newborn worlds forever out into the icy interstellar dark.",
        "srt_start": "00:00:11,500",
        "srt_end": "00:00:19,500"
    },
    {
        "id": 4,
        "name": "Scene 4: The Frozen Ocean",
        "start_sec": 20.5,
        "max_end_sec": 34.5,
        "text": "Without a sun, their skies freeze to minus two hundred degrees. But peel back miles of nitrogen ice, and radioactive cores keep colossal liquid oceans churning in total darkness.",
        "srt_start": "00:00:20,500",
        "srt_end": "00:00:34,500"
    },
    {
        "id": 5,
        "name": "Scene 5: Bioluminescent Ark",
        "start_sec": 35.5,
        "max_end_sec": 46.5,
        "text": "Powered by geothermal vents, warm abyssal seas could harbor bizarre bioluminescent ecosystems, drifting through the galaxy as self-contained cosmic arks.",
        "srt_start": "00:00:35,500",
        "srt_end": "00:00:46,500"
    },
    {
        "id": 6,
        "name": "Scene 6: Trillions of Wanderers",
        "start_sec": 47.5,
        "max_end_sec": 56.5,
        "text": "In fact, rogue planets may outnumber all stars in the Milky Way. Dark, invisible wanderers, quietly filling the void.",
        "srt_start": "00:00:47,500",
        "srt_end": "00:00:56,500"
    },
    {
        "id": 7,
        "name": "Scene 7: Cosmic Callback",
        "start_sec": 57.2,
        "max_end_sec": 59.5,
        "text": "The universe isn't empty. It's waiting.",
        "srt_start": "00:00:57,200",
        "srt_end": "00:00:59,600"
    }
]

async def synthesize_vo_stems():
    voice = "en-US-ChristopherNeural"
    temp_dir = os.path.join(AUDIO_DIR, "rp_temp")
    os.makedirs(temp_dir, exist_ok=True)
    stems = []
    
    for sc in SCENES:
        mp3_path = os.path.join(temp_dir, f"scene_{sc['id']}.mp3")
        wav_path = os.path.join(temp_dir, f"scene_{sc['id']}.wav")
        communicate = edge_tts.Communicate(sc["text"], voice, rate="+2%", pitch="-1Hz")
        await communicate.save(mp3_path)
        
        # Convert to WAV 44.1kHz stereo
        cmd = ["ffmpeg", "-y", "-i", mp3_path, "-ar", str(SR), "-ac", "2", wav_path]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        stems.append((sc, wav_path))
    return stems

def generate_procedural_cosmic_score_and_sfx():
    t = np.linspace(0, DURATION_SEC, TOTAL_SAMPLES, endpoint=False)
    left = np.zeros(TOTAL_SAMPLES, dtype=np.float32)
    right = np.zeros(TOTAL_SAMPLES, dtype=np.float32)

    # 1. Atmospheric Deep Cosmic Drones (D-Minor: D2=73.4Hz, A2=110Hz, F2=87.3Hz)
    drone_d = np.sin(2 * np.pi * 73.4 * t) * 0.12
    drone_a = np.sin(2 * np.pi * 110.0 * t) * 0.08
    drone_f = np.sin(2 * np.pi * 87.3 * t) * 0.06
    # Shimmering harmonic overtone (D4=293.6Hz with slow LFO pulse)
    lfo_shimmer = (np.sin(2 * np.pi * 0.18 * t) + 1.2) * 0.5
    drone_high = np.sin(2 * np.pi * 293.6 * t) * 0.035 * lfo_shimmer
    
    ambient_bed = (drone_d + drone_a + drone_f + drone_high).astype(np.float32)
    left += ambient_bed * 0.95
    right += ambient_bed * 1.05

    # 2. Scene 1 (t=1.2s): Satellite Radar / Telemetry Beeps
    idx_sat = int(1.2 * SR)
    sat_len = int(0.6 * SR)
    tsat = np.linspace(0, 0.6, sat_len, endpoint=False)
    sat_beep = np.sin(2 * np.pi * 1850 * tsat) * np.exp(-tsat * 9) * 0.09
    left[idx_sat:idx_sat+sat_len] += sat_beep * 0.7
    right[idx_sat:idx_sat+sat_len] += sat_beep * 1.1

    # 3. Scene 2 (t=4.6s): Celestial Glass Chime (G5 = 783.9Hz, D6 = 1174Hz)
    idx_chime = int(4.6 * SR)
    chime_len = int(1.8 * SR)
    tchime = np.linspace(0, 1.8, chime_len, endpoint=False)
    chime = (np.sin(2 * np.pi * 783.9 * tchime) + np.sin(2 * np.pi * 1174.6 * tchime)) * np.exp(-tchime * 3.5) * 0.12
    left[idx_chime:idx_chime+chime_len] += chime * 1.0
    right[idx_chime:idx_chime+chime_len] += chime * 0.85

    # 4. Scene 3 (t=12.2s - 14.5s): Gravitational Slingshot Warp & Elastic Slingshot
    idx_grav = int(12.2 * SR)
    grav_len = int(2.4 * SR)
    tgrav = np.linspace(0, 2.4, grav_len, endpoint=False)
    # Frequency sweep from 180Hz down to 45Hz then whipping up to 520Hz
    freq_warp = 160 * np.exp(-tgrav * 2.5) + (tgrav > 1.2) * (tgrav - 1.2) * 350
    grav_warp = np.sin(2 * np.pi * freq_warp * tgrav) * (1 - np.exp(-tgrav * 4)) * np.exp(-tgrav * 1.2) * 0.22
    left[idx_grav:idx_grav+grav_len] += grav_warp * 1.1
    right[idx_grav:idx_grav+grav_len] += grav_warp * 0.9

    # 5. Scene 4 (t=21.2s): Glacial Ice Fracture Crack & Deep Thermal Rumble
    idx_ice = int(21.2 * SR)
    ice_len = int(1.2 * SR)
    tice = np.linspace(0, 1.2, ice_len, endpoint=False)
    noise_ice = (np.random.rand(ice_len) * 2 - 1) * np.exp(-tice * 8) * 0.16
    left[idx_ice:idx_ice+ice_len] += noise_ice
    right[idx_ice:idx_ice+ice_len] += noise_ice * 0.85

    # Hydrothermal sub-bass rumble throughout Scene 4 & 5 (t=22s to 46s)
    idx_hydro = int(22.0 * SR)
    hydro_len = int(24.0 * SR)
    thydro = np.linspace(0, 24.0, hydro_len, endpoint=False)
    hydro_rumble = np.sin(2 * np.pi * 48.0 * thydro) * 0.08 * (0.8 + 0.2 * np.sin(2 * np.pi * 0.4 * thydro))
    left[idx_hydro:idx_hydro+hydro_len] += hydro_rumble
    right[idx_hydro:idx_hydro+hydro_len] += hydro_rumble

    # 6. Scene 5 (t=36.0s): Bioluminescent Sparkle & Bubble Plucks
    idx_bio = int(36.0 * SR)
    bio_len = int(4.0 * SR)
    tbio = np.linspace(0, 4.0, bio_len, endpoint=False)
    bio_arpeggio = (
        np.sin(2 * np.pi * 1046.5 * tbio) * np.exp(-((tbio % 0.5) * 12)) +
        np.sin(2 * np.pi * 1318.5 * tbio) * np.exp(-(((tbio + 0.25) % 0.5) * 12))
    ) * 0.07
    left[idx_bio:idx_bio+bio_len] += bio_arpeggio * 0.9
    right[idx_bio:idx_bio+bio_len] += bio_arpeggio * 1.1

    # 7. Scene 6 (t=47.5s - 55s): Galactic Scale Swelling Pad & Impact
    idx_gal = int(47.5 * SR)
    gal_len = int(8.0 * SR)
    tgal = np.linspace(0, 8.0, gal_len, endpoint=False)
    swell = (np.sin(2 * np.pi * 146.8 * tgal) + np.sin(2 * np.pi * 220.0 * tgal)) * (1 - np.exp(-tgal * 0.8)) * 0.16
    left[idx_gal:idx_gal+gal_len] += swell
    right[idx_gal:idx_gal+gal_len] += swell * 1.05

    # 8. Scene 7 (t=57.0s): Resonant Zen Singing Bowl / Deep Bell Final Ring (decay to end)
    idx_bell = int(57.0 * SR)
    bell_len = TOTAL_SAMPLES - idx_bell
    tbell = np.linspace(0, bell_len / SR, bell_len, endpoint=False)
    bell = (np.sin(2 * np.pi * 261.6 * tbell) * 0.6 + np.sin(2 * np.pi * 523.2 * tbell) * 0.3) * np.exp(-tbell * 0.95) * 0.24
    left[idx_bell:] += bell
    right[idx_bell:] += bell

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
    bg_left, bg_right = generate_procedural_cosmic_score_and_sfx()
    
    master_left = bg_left.copy()
    master_right = bg_right.copy()

    # Place voiceover stems with sidechain ducking of background music
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
            fade_in = np.linspace(1.0, 0.45, fade_len)
            fade_out = np.linspace(0.45, 1.0, fade_len)
            duck_window[:fade_len] = fade_in
            duck_window[fade_len:-fade_len] = 0.45
            duck_window[-fade_len:] = fade_out
            
            master_left[start_idx:end_idx] *= duck_window
            master_right[start_idx:end_idx] *= duck_window

        # Add voiceover track at optimal presence (+2 dB, centered)
        master_left[start_idx:end_idx] += vo_left[:clip_len] * 1.15
        master_right[start_idx:end_idx] += vo_right[:clip_len] * 1.15

    # Master soft limiting & normalization (-1.0 dBFS true peak)
    max_val = max(np.max(np.abs(master_left)), np.max(np.abs(master_right)))
    if max_val > 0.90:
        norm_factor = 0.90 / max_val
        master_left *= norm_factor
        master_right *= norm_factor

    # Export WAV
    master_wav = os.path.join(AUDIO_DIR, "rogue_planets_soundtrack.wav")
    master_mp3 = os.path.join(AUDIO_DIR, "rogue_planets_soundtrack.mp3")

    interleaved = np.empty((TOTAL_SAMPLES * 2,), dtype=np.int16)
    interleaved[0::2] = np.clip(master_left * 32767, -32768, 32767).astype(np.int16)
    interleaved[1::2] = np.clip(master_right * 32767, -32768, 32767).astype(np.int16)

    with wave.open(master_wav, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(interleaved.tobytes())

    # Encode high-fidelity 192k MP3 with FFmpeg
    cmd = ["ffmpeg", "-y", "-i", master_wav, "-b:a", "192k", master_mp3]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print("Master audio stems created successfully:")
    print("  ->", master_wav)
    print("  ->", master_mp3)

def export_srt_subtitles():
    srt_path = os.path.join(SUBTITLE_DIR, "rogue_planets_en.srt")
    with open(srt_path, "w", encoding="utf-8") as f:
        for idx, sc in enumerate(SCENES, 1):
            f.write(f"{idx}\n")
            f.write(f"{sc['srt_start']} --> {sc['srt_end']}\n")
            f.write(f"{sc['text']}\n\n")
    print("Exported SRT subtitles to:", srt_path)

if __name__ == "__main__":
    stems = asyncio.run(synthesize_vo_stems())
    mix_master_soundtrack(stems)
    export_srt_subtitles()

