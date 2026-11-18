"""
EP01 v2 («বিদ্যুতের পাঠশালা» অধ্যায় 01) — procedural score + ambience/foley stems.

Renders, for every beat of VidyuterPathshalaEP01V2 (exact act length @60fps, 48 kHz stereo, 320k MP3):
    public/vidyuter-pathshala/audio/ep01_v2/music/music_<act>.mp3   original score, ducked under the VO
    public/vidyuter-pathshala/audio/ep01_v2/fx/fx_<act>.mp3         ambience bed + frame-accurate foley
    public/vidyuter-pathshala/audio/ep01_v2/music/intro_sting.mp3   3 s series sting

Levels are baked (use volume={1} in Remotion). Music is side-chain ducked from the act's VO envelope.
A full programme mixdown (VO + stems) is written for QA and measured with ffmpeg ebur128.

Cue frames mirror the scene files — keep them in sync:
    ACT1_CUES (Ep01WinterHookScene.tsx) · MILETUS_CUES / TIMELINE_CUES (Ep01MiletusAndTimelineScene.tsx)
    A3 / ACT3E_CUES (Ep01MicroPhysicsScene.tsx) · A4 (Ep01ConfusionOutroScene.tsx)

Usage:  python scripts/synthesize_ep01v2_sound.py [--mix <preview.wav>]
"""
from __future__ import annotations

import argparse
import math
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import scipy.signal as sg
from scipy.ndimage import minimum_filter1d
from scipy.io import wavfile

SR = 48000
FPS = 60
SPF = SR // FPS  # 800 samples per video frame
ROOT = Path(__file__).resolve().parents[1]
AUD = ROOT / "public" / "vidyuter-pathshala" / "audio"
OUT_MUSIC = AUD / "ep01_v2" / "music"
OUT_FX = AUD / "ep01_v2" / "fx"

# EP01_V2_DURATIONS (VidyuterPathshalaEP01V2.tsx)
DUR = dict(intro=180, act1=1300, act2a=1540, act2b=2528, act3=1664, act3e=1837, act4=3061)
ORDER = ["intro", "act1", "act2a", "act2b", "act3", "act3e", "act4"]
VO = dict(
    act1="ep01_v2/act1_hook.mp3",
    act2a="ep01_v2/act2a_miletus.mp3",
    act2b="ep01_v2/act2b_timeline.mp3",
    act3="ep01_v2/act3_physics.mp3",
    act3e="ep01_v2/act3e_switch_bulb.mp3",
    act4="ep01_v2/act4_confusion.mp3",
)

MUSIC_LUFS = -31.0  # pre-duck; VO sits at ≈ -15.5 LUFS
INTRO_LUFS = -17.0  # the sting plays alone
DUCK_DB = 8.0
BED_DUCK_DB = 3.0
FX_CEIL_DB = -7.0  # VO peaks at -4 dBFS; keep foley transients under it


# ============================================================================ core DSP
def T(f: float) -> float:
    """video frame -> seconds"""
    return f / FPS


def ns(sec: float) -> int:
    return max(0, int(round(sec * SR)))


def tt(n: int) -> np.ndarray:
    return np.arange(n) / SR


def rng(seed: int):
    return np.random.default_rng(seed)


def white(n: int, seed: int = 0) -> np.ndarray:
    return rng(seed).standard_normal(n)


def pink(n: int, seed: int = 0) -> np.ndarray:
    X = np.fft.rfft(white(n, seed))
    f = np.arange(len(X))
    f[0] = 1
    y = np.fft.irfft(X / np.sqrt(f), n)
    return y / (np.std(y) + 1e-12)


def brown(n: int, seed: int = 0) -> np.ndarray:
    y = np.cumsum(white(n, seed))
    y = filt(y, "highpass", 25)
    return y / (np.std(y) + 1e-12)


def filt(x: np.ndarray, kind: str, f, order: int = 2) -> np.ndarray:
    sos = sg.butter(order, f, btype=kind, fs=SR, output="sos")
    return sg.sosfilt(sos, x, axis=0)


def sweep_bp(x: np.ndarray, fc: np.ndarray, bw_oct: float = 1.0, chunk: int = 256) -> np.ndarray:
    """Band-pass with a time-varying centre (fc sampled per output sample)."""
    y = np.zeros_like(x)
    zi = None
    for i in range(0, len(x), chunk):
        c = float(fc[min(i, len(fc) - 1)])
        lo = max(20.0, c / 2 ** (bw_oct / 2))
        hi = min(c * 2 ** (bw_oct / 2), SR * 0.45)
        sos = sg.butter(2, [lo, hi], btype="bandpass", fs=SR, output="sos")
        if zi is None:
            zi = np.zeros((sos.shape[0], 2))
        y[i : i + chunk], zi = sg.sosfilt(sos, x[i : i + chunk], zi=zi)
    return y


def sweep_lp(x: np.ndarray, fc: np.ndarray, chunk: int = 256) -> np.ndarray:
    y = np.zeros_like(x)
    zi = None
    for i in range(0, len(x), chunk):
        c = float(np.clip(fc[min(i, len(fc) - 1)], 30, SR * 0.45))
        sos = sg.butter(2, c, btype="lowpass", fs=SR, output="sos")
        if zi is None:
            zi = np.zeros((sos.shape[0], 2))
        y[i : i + chunk], zi = sg.sosfilt(sos, x[i : i + chunk], zi=zi)
    return y


def norm(x: np.ndarray) -> np.ndarray:
    p = np.max(np.abs(x)) if len(x) else 0
    return x / p if p > 0 else x


def db(g: float) -> float:
    return 10 ** (g / 20)


def edge(n: int, a: float = 0.005, r: float = 0.01) -> np.ndarray:
    e = np.ones(n)
    na, nr = min(n, ns(a)), min(n, ns(r))
    if na:
        e[:na] = np.linspace(0, 1, na)
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr)
    return e


def expdec(n: int, tau: float, attack: float = 0.002) -> np.ndarray:
    t = tt(n)
    return np.exp(-t / tau) * (1 - np.exp(-t / max(attack, 1e-4)))


def hump(n: int, peak: float = 0.5, shape: float = 2.0) -> np.ndarray:
    """0 -> 1 at `peak` (fraction) -> 0, smooth"""
    u = np.linspace(0, 1, n)
    up = np.clip(u / max(peak, 1e-6), 0, 1)
    dn = np.clip((1 - u) / max(1 - peak, 1e-6), 0, 1)
    return np.sin(np.minimum(up, dn) * np.pi / 2) ** shape


def osc(freq, n: int, phase: float = 0.0) -> np.ndarray:
    f = np.broadcast_to(np.asarray(freq, dtype=float), (n,))
    return np.sin(2 * np.pi * np.cumsum(f) / SR + phase)


def smooth_noise(n: int, rate: float, seed: int) -> np.ndarray:
    """slow random control signal, ~0..1"""
    k = max(4, int(n / SR * rate) + 4)
    pts = rng(seed).random(k)
    x = np.interp(np.linspace(0, k - 3, n), np.arange(k), pts)
    return x


def midi(m: float) -> float:
    return 440.0 * 2 ** ((m - 69) / 12)


def pan2(x: np.ndarray, pan: float = 0.0) -> np.ndarray:
    if x.ndim == 2:
        return x
    a = (pan + 1) * np.pi / 4
    return np.stack([x * np.cos(a) * math.sqrt(2), x * np.sin(a) * math.sqrt(2)], axis=1)


class Bus:
    def __init__(self, frames: int):
        self.x = np.zeros((frames * SPF, 2))

    def add(self, sig: np.ndarray, frame: float, gain_db: float = 0.0, pan: float = 0.0):
        s = pan2(np.asarray(sig, dtype=float), pan) * db(gain_db)
        i0 = int(round(frame * SPF))
        if i0 < 0:
            s = s[-i0:]
            i0 = 0
        i1 = min(len(self.x), i0 + len(s))
        if i1 > i0:
            self.x[i0:i1] += s[: i1 - i0]

    def at(self, sec: float, sig, gain_db=0.0, pan=0.0):
        self.add(sig, sec * FPS, gain_db, pan)


def decode(rel: str) -> np.ndarray:
    out = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(AUD / rel), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"],
        capture_output=True,
        check=True,
    ).stdout
    return np.frombuffer(out, np.float32).reshape(-1, 2).astype(float)


# ---------------------------------------------------------------- loudness (BS.1770-4)
def k_weight(x: np.ndarray) -> np.ndarray:
    b1, a1 = [1.53512485958697, -2.69169618940638, 1.19839281085285], [1.0, -1.69065929318241, 0.73248077421585]
    b2, a2 = [1.0, -2.0, 1.0], [1.0, -1.99004745483398, 0.99007225036621]
    return sg.lfilter(b2, a2, sg.lfilter(b1, a1, x, axis=0), axis=0)


def lufs(x: np.ndarray) -> float:
    y = k_weight(pan2(x))
    blk, hop = ns(0.4), ns(0.1)
    if len(y) < blk:
        return -70.0
    ms = np.array([np.mean(y[i : i + blk] ** 2, axis=0).sum() for i in range(0, len(y) - blk, hop)])
    L = -0.691 + 10 * np.log10(ms + 1e-20)
    ms = ms[L > -70]
    if not len(ms):
        return -70.0
    rel = -0.691 + 10 * np.log10(ms.mean()) - 10
    ms2 = ms[(-0.691 + 10 * np.log10(ms)) > rel]
    return float(-0.691 + 10 * np.log10(ms2.mean() if len(ms2) else ms.mean()))


def to_lufs(x: np.ndarray, target: float) -> np.ndarray:
    return x * db(target - lufs(x))


def set_rms(x: np.ndarray, dbfs: float) -> np.ndarray:
    r = np.sqrt(np.mean(x**2)) + 1e-12
    return x * db(dbfs) / r


# ---------------------------------------------------------------- reverb / ducking
def make_ir(t60: float = 2.2, seed: int = 9, bright: float = 6000) -> np.ndarray:
    n = ns(t60)
    t = tt(n)
    env = np.exp(-6.9 * t / t60)
    L = filt(white(n, seed), "lowpass", bright) * env
    R = filt(white(n, seed + 1), "lowpass", bright) * env
    pre = np.zeros(ns(0.018))
    ir = np.stack([np.concatenate([pre, L]), np.concatenate([pre, R])], axis=1)
    return ir / np.sqrt(np.sum(ir**2) / 2)


def reverb(x: np.ndarray, wet: float = 0.3, t60: float = 2.2, bright: float = 6000) -> np.ndarray:
    ir = make_ir(t60, bright=bright)
    w = np.stack([sg.fftconvolve(x[:, 0], ir[:, 0])[: len(x)], sg.fftconvolve(x[:, 1], ir[:, 1])[: len(x)]], axis=1)
    return x * (1 - wet * 0.5) + w * wet


def limit(x: np.ndarray, ceil_db: float = -6.0, release: float = 0.08) -> np.ndarray:
    """Look-ahead peak limiter (2 ms look-ahead, smooth release) so foley transients never clip the programme."""
    thr = db(ceil_db)
    pk = np.max(np.abs(x), axis=1)
    need = np.minimum(1.0, thr / np.maximum(pk, 1e-9))
    la = ns(0.002)
    need = minimum_filter1d(need, size=2 * la + 1)
    g = np.empty_like(need)
    c = math.exp(-1 / (release * SR))
    v = 1.0
    for i in range(len(need)):
        v = need[i] if need[i] < v else c * v + (1 - c) * need[i]
        g[i] = v
    return x * g[:, None]


def duck_gain(vo: np.ndarray, n: int, depth_db: float) -> np.ndarray:
    """Side-chain gain curve from the VO envelope (attack 80 ms, release 350 ms)."""
    hop = ns(0.01)
    m = np.mean(vo, axis=1)
    m = np.concatenate([m, np.zeros(max(0, n - len(m)))])[:n]
    k = len(m) // hop
    rms = np.sqrt(np.mean(m[: k * hop].reshape(k, hop) ** 2, axis=1) + 1e-12)
    lev = 20 * np.log10(rms)
    amt = np.clip((lev + 48) / 18, 0, 1)
    sm = np.zeros_like(amt)
    ca, cr = math.exp(-0.01 / 0.08), math.exp(-0.01 / 0.35)
    v = 0.0
    for i, a in enumerate(amt):
        c = ca if a > v else cr
        v = c * v + (1 - c) * a
        sm[i] = v
    g = db(-depth_db) ** sm
    return np.interp(np.arange(n), np.arange(k) * hop + hop / 2, g)


# ============================================================================ instruments
def ks_pluck(m: float, dur: float = 1.5, bright: float = 0.6, decay: float = 0.996, seed: int = 0) -> np.ndarray:
    f = midi(m)
    N = max(2, int(round(SR / f)))
    n = ns(dur)
    exc = white(N, seed)
    exc = filt(exc, "lowpass", 800 + bright * 9000)
    x = np.zeros(n)
    x[: min(N, n)] = exc[: min(N, n)]
    a = np.zeros(N + 2)
    a[0] = 1.0
    a[N] = -decay * 0.5
    a[N + 1] = -decay * 0.5
    y = sg.lfilter([1.0], a, x)
    return norm(y * edge(n, 0.001, min(0.25, dur * 0.3)))


def pizz(m: float, dur: float = 0.35, seed: int = 0) -> np.ndarray:
    return ks_pluck(m, dur, bright=0.45, decay=0.985, seed=seed)


def mallet(m: float, dur: float = 1.6, ratio: float = 4.0, index: float = 1.4, tau: float = 0.6, seed: int = 0) -> np.ndarray:
    f = midi(m)
    n = ns(dur)
    t = tt(n)
    ie = np.exp(-t / 0.08)
    y = np.sin(2 * np.pi * f * t + index * ie * np.sin(2 * np.pi * f * ratio * t))
    y += 0.25 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t / (tau * 0.4))
    return norm(y * expdec(n, tau, 0.0015) * edge(n, 0.0, 0.05))


def bell(m: float, dur: float = 2.5, seed: int = 0) -> np.ndarray:
    f = midi(m)
    n = ns(dur)
    t = tt(n)
    y = np.zeros(n)
    for r, a, d in [(1, 1, 1.2), (2.0, 0.5, 0.8), (2.76, 0.35, 0.5), (5.4, 0.2, 0.25), (8.9, 0.1, 0.12)]:
        y += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / d)
    return norm(y * edge(n, 0.001, 0.05))


def pad(ms, dur: float, att: float = 1.2, rel: float = 1.5, bright: float = 0.5, seed: int = 0, stereo=True) -> np.ndarray:
    n = ns(dur + rel)
    t = tt(n)
    r = rng(seed)
    out = np.zeros((n, 2))
    for j, m in enumerate(ms):
        f = midi(m)
        for c, det in enumerate((-6.0, 0.0, 6.0)):
            ff = f * 2 ** (det / 1200)
            v = np.zeros(n)
            for k in range(1, 7):
                if ff * k > 9000:
                    break
                v += (1 / k) ** (1.9 - bright * 1.1) * np.sin(2 * np.pi * ff * k * t + r.random() * 6.28)
            lfo = 1 + 0.12 * np.sin(2 * np.pi * (0.13 + 0.05 * r.random()) * t + r.random() * 6)
            p = (c - 1) * 0.5 + (j / max(1, len(ms) - 1) - 0.5) * 0.4
            out += pan2(v * lfo, float(np.clip(p, -0.9, 0.9)))
    env = np.ones(n)
    na = ns(att)
    if na:
        env[:na] = np.sin(np.linspace(0, np.pi / 2, na)) ** 2
    nd = ns(dur)
    env[nd:] = np.linspace(1, 0, n - nd) ** 2
    out *= env[:, None]
    out = filt(out, "lowpass", 1200 + bright * 5000)
    return out / (np.max(np.abs(out)) + 1e-9)


def drone(ms, dur: float, att: float = 2.0, rel: float = 2.0, seed: int = 4) -> np.ndarray:
    """Tanpura-ish drone: rich harmonics with slow independent swells (jawari shimmer)."""
    n = ns(dur + rel)
    t = tt(n)
    out = np.zeros((n, 2))
    r = rng(seed)
    for j, m in enumerate(ms):
        f = midi(m)
        v = np.zeros(n)
        for k in range(1, 16):
            if f * k > 7000:
                break
            sw = 0.5 + 0.5 * np.sin(2 * np.pi * (0.07 + r.random() * 0.2) * t + r.random() * 6)
            v += (1 / k**1.1) * sw * np.sin(2 * np.pi * f * k * t * (1 + (r.random() - 0.5) * 0.0006))
        out += pan2(v, (j - (len(ms) - 1) / 2) * 0.5)
    env = np.ones(n)
    env[: ns(att)] = np.linspace(0, 1, ns(att))
    env[ns(dur) :] = np.linspace(1, 0, n - ns(dur))
    out *= env[:, None]
    return out / (np.max(np.abs(out)) + 1e-9)


def riser(dur: float, f0: float = 300, f1: float = 4000, seed: int = 3) -> np.ndarray:
    n = ns(dur)
    u = np.linspace(0, 1, n)
    fc = f0 * (f1 / f0) ** (u**1.6)
    x = sweep_bp(pink(n, seed), fc, 1.2)
    x += 0.25 * osc(fc * 0.25, n)
    return norm(x * u**2.2 * edge(n, 0.01, 0.03))


def boom(f0: float = 62, f1: float = 30, dur: float = 1.6, seed: int = 2) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    f = f1 + (f0 - f1) * np.exp(-t / 0.18)
    y = osc(f, n) * expdec(n, 0.45, 0.004)
    y += 0.5 * filt(white(n, seed), "lowpass", 180) * expdec(n, 0.08)
    return norm(y)


def shimmer(dur: float, notes, density: float = 10, seed: int = 5, tau: float = 0.5) -> np.ndarray:
    n = ns(dur)
    out = np.zeros((n, 2))
    r = rng(seed)
    k = int(dur * density)
    for i in range(k):
        st = r.random() * dur * 0.92
        m = notes[r.integers(len(notes))] + 12 * r.integers(0, 2)
        s = mallet(m, 0.9, ratio=3.5, index=0.6, tau=tau * (0.6 + r.random() * 0.6)) * (0.4 + 0.6 * r.random())
        i0 = ns(st)
        i1 = min(n, i0 + len(s))
        out[i0:i1] += pan2(s[: i1 - i0], r.random() * 1.6 - 0.8)
    return out / (np.max(np.abs(out)) + 1e-9)


def kick(dur: float = 0.35) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    f = 45 + 70 * np.exp(-t / 0.03)
    return norm(osc(f, n) * expdec(n, 0.12, 0.002))


def tremolo_cluster(ms, dur: float, rate: float = 11.0, rise: float = 2.0) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    v = np.zeros((n, 2))
    for j, m in enumerate(ms):
        v += pan2(np.sin(2 * np.pi * midi(m) * t) * (1 + 0.04 * np.sin(2 * np.pi * 5.3 * t)), (j - 1) * 0.6)
    trem = 0.55 + 0.45 * np.sin(2 * np.pi * rate * t)
    env = np.clip(t / dur, 0, 1) ** rise
    return v * (trem * env * edge(n, 0.05, 0.05))[:, None] / len(ms)


# ============================================================================ foley
def click(f: float = 3000, dur: float = 0.02, seed: int = 0) -> np.ndarray:
    n = ns(dur)
    y = filt(white(n, seed), "bandpass", [f / 1.6, min(f * 1.6, 20000)]) * expdec(n, 0.003, 0.0002)
    y += 0.5 * np.sin(2 * np.pi * f * tt(n)) * expdec(n, 0.004, 0.0002)
    return norm(y)


def tick_tock(tock: bool) -> np.ndarray:
    f = 1750 if tock else 2350
    n = ns(0.06)
    y = click(f, 0.06, seed=7 if tock else 8) + 0.6 * np.sin(2 * np.pi * f * 0.5 * tt(n)) * expdec(n, 0.01)
    return norm(y)


def zap(dur: float = 0.3, seed: int = 0, density: float = 140) -> np.ndarray:
    """static crackle: impulse bursts + a brief electric buzz"""
    n = ns(dur)
    r = rng(seed)
    y = np.zeros(n)
    k = max(3, int(dur * density))
    for i in range(k):
        p = int(n * (r.random() ** 1.8))
        L = ns(0.002 + r.random() * 0.004)
        b = white(L, seed * 100 + i) * expdec(L, 0.0012, 0.0001) * (0.3 + r.random())
        y[p : p + L] += b[: max(0, min(L, n - p))]
    y = filt(y, "highpass", 1800)
    t = tt(n)
    buzz = sg.sawtooth(2 * np.pi * 120 * t) * 0.25 * np.exp(-t / (dur * 0.35))
    y += filt(buzz, "bandpass", [300, 3000])
    return norm(y * edge(n, 0.0005, 0.02))


def crackle_bed(n: int, rate: np.ndarray, seed: int = 0, hp: float = 2000) -> np.ndarray:
    """sparse crackle whose rate (clicks/s) follows `rate` (per sample)"""
    r = rng(seed)
    y = np.zeros(n)
    p = r.random(n) < (rate / SR)
    idx = np.nonzero(p)[0]
    for i in idx:
        L = ns(0.0015 + r.random() * 0.003)
        b = white(L, int(i) % 100000) * expdec(L, 0.001, 0.0001) * (0.3 + r.random())
        y[i : i + L] += b[: max(0, min(L, n - i))]
    return filt(y, "highpass", hp)


def whoosh(dur: float, f0: float = 300, f1: float = 2500, peak: float = 0.6, seed: int = 1, bw: float = 1.3, pan_sweep=(-0.6, 0.6)) -> np.ndarray:
    n = ns(dur)
    u = np.linspace(0, 1, n)
    fc = f0 * (f1 / f0) ** u
    x = sweep_bp(pink(n, seed), fc, bw) * hump(n, peak, 1.6)
    x = norm(x)
    a = (pan_sweep[0] + (pan_sweep[1] - pan_sweep[0]) * u + 1) * np.pi / 4
    return np.stack([x * np.cos(a), x * np.sin(a)], axis=1) * math.sqrt(2)


def sparkle(dur: float = 0.8, n_p: int = 9, lo: float = 2400, hi: float = 7000, seed: int = 4) -> np.ndarray:
    n = ns(dur)
    out = np.zeros((n, 2))
    r = rng(seed)
    for i in range(n_p):
        st = ns(r.random() * dur * 0.7)
        f = lo * (hi / lo) ** r.random()
        L = ns(0.25)
        s = np.sin(2 * np.pi * f * tt(L)) * expdec(L, 0.05 + r.random() * 0.08, 0.001) * (0.4 + 0.6 * r.random())
        e = min(n, st + L)
        out[st:e] += pan2(s[: e - st], r.random() * 1.4 - 0.7)
    return out / (np.max(np.abs(out)) + 1e-9)


def rustle(dur: float, seed: int = 3, lo: float = 600, hi: float = 5000, rate: float = 14) -> np.ndarray:
    n = ns(dur)
    x = filt(white(n, seed), "bandpass", [lo, hi])
    am = smooth_noise(n, rate, seed + 1) ** 2.5
    return norm(x * am * hump(n, 0.5, 0.7))


def rub_stroke(dur: float, bright: float = 0.5, seed: int = 0) -> np.ndarray:
    n = ns(dur)
    x = filt(white(n, seed), "bandpass", [700 + 500 * bright, 2600 + 2400 * bright])
    grit = 0.7 + 0.3 * filt(np.abs(white(n, seed + 1)), "lowpass", 60) / 0.8
    return norm(x * grit * np.sin(np.linspace(0, np.pi, n)) ** 1.5)


def pop(f0: float = 380, f1: float = 950, dur: float = 0.09) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    f = f0 + (f1 - f0) * (1 - np.exp(-t / 0.015))
    y = osc(f, n) * expdec(n, 0.025, 0.001)
    y += 0.3 * click(2500, dur)[:n]
    return norm(y)


def tink(f: float = 3400, dur: float = 0.35) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.07) + 0.5 * np.sin(2 * np.pi * f * 1.51 * t) * np.exp(-t / 0.04)
    return norm(y * edge(n, 0.0005, 0.02))


def hum(n: int, base: float = 100, seed: int = 0, buzz: float = 0.2) -> np.ndarray:
    t = tt(n)
    y = np.sin(2 * np.pi * base * t) + 0.5 * np.sin(2 * np.pi * base * 2 * t) + 0.25 * np.sin(2 * np.pi * base * 3 * t)
    y += buzz * filt(sg.square(2 * np.pi * base * t), "bandpass", [800, 4000])
    return y / (np.max(np.abs(y)) + 1e-9)


def ignition_gate(at: int, length: int, seed: float, total_frames: int) -> np.ndarray:
    """Per-frame copy of Ep01Fx.ignitionFlicker (seeded() from Ep01BedroomSet)."""

    def seeded(v):
        x = math.sin(v * 127.1 + 311.7) * 43758.5453
        return x - math.floor(x)

    g = np.zeros(total_frames)
    for f in range(total_frames):
        if f < at:
            continue
        t = f - at
        if t >= length:
            g[f] = 1
            continue
        step = t // 2
        on = seeded(step * 7.3 + seed) > 0.42 - (t / length) * 0.4
        g[f] = 0.55 + 0.45 * (t / length) if on else 0.08
    return g


def swish(dur: float = 0.6, f0: float = 500, f1: float = 1400, seed: int = 2) -> np.ndarray:
    n = ns(dur)
    u = np.linspace(0, 1, n)
    f = f0 + (f1 - f0) * np.sin(u * np.pi)
    y = 0.4 * osc(f, n) + sweep_bp(white(n, seed), f * 2, 1.0)
    return norm(y * hump(n, 0.4, 1.2))


def fizz(dur: float = 1.4, seed: int = 6) -> np.ndarray:
    n = ns(dur)
    x = filt(white(n, seed), "highpass", 3500) * (0.4 + 0.6 * smooth_noise(n, 30, seed))
    r = rng(seed)
    for i in range(int(dur * 22)):
        p = ns(r.random() * dur * 0.9)
        b = pop(500 + r.random() * 1200, 1400 + r.random() * 2000, 0.05)
        x[p : p + len(b)] += 0.5 * b[: max(0, min(len(b), n - p))]
    return norm(x * hump(n, 0.2, 0.6))


def wobble(dur: float = 1.6, f: float = 110) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    vib = f * (1 + 0.08 * np.sin(2 * np.pi * 4.5 * t))
    y = osc(vib, n) + 0.4 * osc(vib * 2, n) + 0.2 * osc(vib * 3, n)
    y *= 0.6 + 0.4 * np.sin(2 * np.pi * 2.2 * t)
    return norm(y * hump(n, 0.3, 1.0))


def wave_sweep(dur: float = 1.6, seed: int = 8) -> np.ndarray:
    n = ns(dur)
    u = np.linspace(0, 1, n)
    fc = 900 * 2 ** (1.6 * np.sin(2 * np.pi * u * 1.5))
    y = sweep_bp(pink(n, seed), fc, 0.8) + 0.3 * osc(fc * 0.5, n)
    return norm(y * hump(n, 0.5, 1.0))


def hv_buzz(dur: float = 1.4, seed: int = 9) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    y = filt(sg.sawtooth(2 * np.pi * 100 * t), "bandpass", [150, 5000])
    y *= 0.6 + 0.4 * smooth_noise(n, 25, seed)
    y += 0.8 * crackle_bed(n, np.full(n, 90.0), seed)
    out = norm(y * hump(n, 0.15, 0.5))
    z = zap(0.35, seed)
    i0 = n - len(z) - ns(0.1)
    out[i0 : i0 + len(z)] += z
    return norm(out)


def fan_loop(n: int, spinup: float = 1.2, seed: int = 11) -> np.ndarray:
    t = tt(n)
    sp = np.clip(t / spinup, 0, 1) ** 0.7
    blade = 0.65 + 0.35 * np.sin(2 * np.pi * np.cumsum(9.0 * sp) / SR)
    air = filt(pink(n, seed), "bandpass", [250, 1800]) * blade
    motor = hum(n, 100, buzz=0.05) * 0.25
    return (air * 0.9 + motor) * sp


def steam(dur: float = 1.0, seed: int = 12) -> np.ndarray:
    n = ns(dur)
    x = filt(white(n, seed), "highpass", 2800)
    return norm(x * hump(n, 0.12, 0.8) * (0.7 + 0.3 * smooth_noise(n, 18, seed)))


def ding_dong() -> np.ndarray:
    a = bell(76, 1.6)
    b = bell(72, 2.0)
    out = np.zeros(ns(2.6))
    out[: len(a)] += a
    i = ns(0.48)
    out[i : i + len(b)] += b[: len(out) - i]
    return norm(out)


def pump_loop(n: int, seed: int = 13) -> np.ndarray:
    t = tt(n)
    su = np.clip(t / 0.8, 0, 1)
    motor = filt(sg.sawtooth(2 * np.pi * 48 * t), "lowpass", 600) * (0.75 + 0.25 * np.sin(2 * np.pi * 24 * t))
    water = filt(brown(n, seed), "lowpass", 900) * 0.6
    r = rng(seed)
    bub = np.zeros(n)
    for i in range(int(n / SR * 9)):
        p = int(r.random() * (n - ns(0.06)))
        b = pop(150 + r.random() * 250, 300 + r.random() * 400, 0.06)
        bub[p : p + len(b)] += b * 0.35
    return (motor * 0.6 + water + bub) * su


def crickets(n: int, seed: int = 14) -> np.ndarray:
    r = rng(seed)
    y = np.zeros((n, 2))
    t0 = 0.3
    while t0 < n / SR - 0.4:
        f = 4300 + r.random() * 600
        L = ns(0.18)
        tl = tt(L)
        c = np.sin(2 * np.pi * f * tl) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 32 * tl))) * edge(L, 0.01, 0.03)
        i = ns(t0)
        y[i : i + L] += pan2(c * (0.4 + 0.6 * r.random()), r.random() * 1.6 - 0.8)[: max(0, min(L, n - i))]
        t0 += 0.35 + r.random() * 0.9
    return y


def tube_on(seed: int = 15) -> np.ndarray:
    n = ns(0.45)
    t = tt(n)
    y = np.zeros(n)
    tk = tink(5200, 0.12)
    y[: len(tk)] += 0.7 * tk
    gate = (np.sin(2 * np.pi * 9 * t) > 0.2).astype(float) * np.exp(-t / 0.18)
    y += 0.5 * hum(n, 100, buzz=0.8) * gate
    return norm(y)


def paper_flutter(dur: float, seed: int = 16) -> np.ndarray:
    n = ns(dur)
    x = filt(white(n, seed), "bandpass", [900, 6000])
    am = (0.5 + 0.5 * np.sin(2 * np.pi * np.cumsum(14 + 6 * smooth_noise(n, 5, seed)) / SR)) ** 2
    return norm(x * am * hump(n, 0.55, 0.8))


def thud(dur: float = 0.35, f: float = 90, seed: int = 17) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    y = np.sin(2 * np.pi * (f + 40 * np.exp(-t / 0.02)) * t) * expdec(n, 0.07, 0.001)
    y += filt(white(n, seed), "lowpass", 500) * expdec(n, 0.03, 0.0005)
    return norm(y)


def blip(f: float, dur: float = 0.07) -> np.ndarray:
    n = ns(dur)
    y = np.sin(2 * np.pi * f * tt(n)) + 0.2 * np.sin(2 * np.pi * f * 3 * tt(n))
    return norm(y * edge(n, 0.003, 0.02))


def power_down(dur: float = 0.8) -> np.ndarray:
    n = ns(dur)
    t = tt(n)
    f = 60 + 840 * np.exp(-t / 0.18)
    y = osc(f, n) + 0.3 * osc(f * 2, n)
    y = sweep_lp(y, 4000 * np.exp(-t / 0.25) + 80)
    y *= np.exp(-t / 0.35)
    y[: ns(0.03)] += click(1800, 0.03)[: ns(0.03)] * 0.6
    return norm(y * edge(n, 0.002, 0.05))


def scratch(dur: float = 0.25, seed: int = 18) -> np.ndarray:
    n = ns(dur)
    x = filt(white(n, seed), "bandpass", [2000, 7000]) * (0.4 + 0.6 * smooth_noise(n, 60, seed))
    x += 0.25 * osc(1600 + 300 * np.sin(2 * np.pi * 7 * tt(n)), n)
    return norm(x * hump(n, 0.3, 0.5))


def knock(seed: int = 19) -> np.ndarray:
    n = ns(0.2)
    t = tt(n)
    y = np.sin(2 * np.pi * (95 + 60 * np.exp(-t / 0.015)) * t) * expdec(n, 0.05, 0.0005)
    y += 0.6 * filt(white(n, seed), "bandpass", [250, 1400]) * expdec(n, 0.015, 0.0003)
    return norm(y)


def stamp(seed: int = 20) -> np.ndarray:
    n = ns(0.3)
    y = thud(0.3, 70, seed) * 0.8
    y += 0.6 * filt(white(n, seed + 1), "bandpass", [900, 3500]) * expdec(n, 0.02, 0.0005)
    return norm(y)


def pip(f: float = 1500) -> np.ndarray:
    n = ns(0.07)
    t = tt(n)
    return norm(osc(f * (1 + 0.5 * np.exp(-t / 0.01)), n) * expdec(n, 0.02, 0.001))


def comb_stroke(dur: float = 0.24, seed: int = 21, intensity: float = 0.5) -> np.ndarray:
    n = ns(dur)
    y = np.zeros(n)
    rate = 320
    k = int(dur * rate)
    r = rng(seed)
    for i in range(k):
        p = int(i / rate * SR + r.random() * 30)
        L = ns(0.0015)
        if p + L < n:
            y[p : p + L] += white(L, seed * 7 + i) * (0.5 + 0.5 * r.random())
    y = filt(y, "bandpass", [2000, 8000])
    y += 0.6 * filt(white(n, seed + 3), "bandpass", [1500, 6000]) * smooth_noise(n, 40, seed)
    y = y * np.sin(np.linspace(0, np.pi, n)) ** 0.8
    y += intensity * 0.6 * crackle_bed(n, np.full(n, 160 * intensity), seed + 9)
    return norm(y)


def static_upsweep(dur: float = 0.9, seed: int = 22) -> np.ndarray:
    n = ns(dur)
    u = np.linspace(0, 1, n)
    y = crackle_bed(n, 30 + 600 * u**1.5, seed) * 1.2
    y += 0.3 * osc(300 * (8 ** u), n) * u
    y += 0.4 * sweep_bp(white(n, seed + 1), 800 * (6 ** u), 1.0) * u
    return norm(y * edge(n, 0.02, 0.12))


def current_rush(dur: float = 0.9, seed: int = 23) -> np.ndarray:
    n = ns(dur)
    u = np.linspace(0, 1, n)
    y = sweep_bp(pink(n, seed), 300 * (10 ** u), 1.0) * hump(n, 0.7, 1.2)
    y += 0.35 * hum(n, 100, buzz=0.6) * u * hump(n, 0.8, 1.0)
    y += 0.3 * crackle_bed(n, 40 + 200 * u, seed)
    return norm(y)


def lever_clunk() -> np.ndarray:
    a = thud(0.25, 120, 30)
    b = click(2600, 0.03, 31)
    a[: len(b)] += 0.8 * b
    return norm(a)


def air_thump() -> np.ndarray:
    n = ns(0.7)
    t = tt(n)
    y = osc(42 + 30 * np.exp(-t / 0.05), n) * expdec(n, 0.18, 0.003)
    y += 0.7 * filt(pink(n, 40), "lowpass", 260) * expdec(n, 0.1, 0.002)
    return norm(y)


def fwip(dur: float = 0.22, seed: int = 41) -> np.ndarray:
    return whoosh(dur, 900, 6000, 0.35, seed, bw=1.0, pan_sweep=(-0.2, 0.2))


def sea(n: int, seed: int = 42) -> np.ndarray:
    t = tt(n)
    x = filt(pink(n, seed), "lowpass", 700)
    swell = (0.35 + 0.65 * (0.5 + 0.5 * np.sin(2 * np.pi * 0.11 * t + 1)) ** 2) * (0.8 + 0.2 * smooth_noise(n, 0.5, seed))
    y = x * swell
    return np.stack([y, filt(pink(n, seed + 1), "lowpass", 700) * swell], axis=1)


def flame(n: int, seed: int = 43) -> np.ndarray:
    x = filt(pink(n, seed), "bandpass", [80, 900]) * (0.55 + 0.45 * smooth_noise(n, 7, seed))
    x += 0.5 * crackle_bed(n, np.full(n, 3.0), seed, hp=700)
    return x


def room_tone(n: int, seed: int = 44, lp: float = 260) -> np.ndarray:
    return np.stack([filt(brown(n, seed), "lowpass", lp), filt(brown(n, seed + 1), "lowpass", lp)], axis=1)


def wind(n: int, seed: int = 45) -> np.ndarray:
    gust = smooth_noise(n, 0.35, seed) ** 2.2
    fc = 320 + 520 * smooth_noise(n, 0.3, seed + 3)
    L = sweep_bp(pink(n, seed + 1), fc, 1.2, chunk=1024) * gust
    R = sweep_bp(pink(n, seed + 2), fc * 1.1, 1.2, chunk=1024) * gust
    return np.stack([L, R], axis=1)


def night_air(n: int, seed: int = 46) -> np.ndarray:
    return np.stack([filt(pink(n, seed), "lowpass", 1400), filt(pink(n, seed + 1), "lowpass", 1400)], axis=1)


def atom_drone(n: int, seed: int = 47) -> np.ndarray:
    t = tt(n)
    y = np.sin(2 * np.pi * 55 * t) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.25 * t))
    y += 0.5 * np.sin(2 * np.pi * 82.5 * t + 0.4 * np.sin(2 * np.pi * 0.31 * t))
    air = filt(pink(n, seed), "bandpass", [1500, 6000]) * 0.4 * smooth_noise(n, 0.6, seed)
    return pan2(y * 0.8) + np.stack([air, filt(pink(n, seed + 1), "bandpass", [1500, 6000]) * 0.4 * smooth_noise(n, 0.6, seed + 2)], axis=1)


def seg_env(n: int, ranges) -> np.ndarray:
    """piecewise-linear gain curve from [(frame, gain), ...] (act frames)"""
    fr = np.array([r[0] for r in ranges], dtype=float) * SPF
    g = np.array([r[1] for r in ranges], dtype=float)
    return np.interp(np.arange(n), fr, g)


# ============================================================================ shared beds
def bedroom_bed(frames: int, lit_from: int | None, seed: int, clock_offset: float = 0.35) -> np.ndarray:
    n = frames * SPF
    bed = set_rms(room_tone(n, seed), -54)
    bed += set_rms(wind(n, seed + 1), -47)
    if lit_from is not None:
        h = pan2(hum(n, 100, seed, buzz=0.1), 0.35)
        bed += set_rms(h, -58) * seg_env(n, [(0, 0), (lit_from, 0), (lit_from + 30, 1), (frames, 1)])[:, None]
    # far-wall clock, 1 Hz tick-tock, slightly left
    tk = Bus(frames)
    s = clock_offset
    k = 0
    while s < frames / FPS:
        tk.at(s, tick_tock(k % 2 == 1), -31, -0.45)
        s += 1.0
        k += 1
    return bed + tk.x


# ============================================================================ INTRO
def build_intro():
    fr = DUR["intro"]
    b = Bus(fr)
    b.add(riser(0.5, 400, 5000, 1), 0, -6)
    b.add(boom(70, 32, 2.2), 20, 0)
    b.add(zap(0.4, 3), 18, -8, 0.1)
    # buzz gated exactly like the intro spark glyph: sin(frame*0.45) > 0.25
    n = fr * SPF
    g = np.array([1.0 if math.sin(f * 0.45) > 0.25 else 0.0 for f in range(fr)])
    gate = np.repeat(g, SPF)
    gate = filt(gate, "lowpass", 120)
    buzz = hum(n, 100, 3, buzz=0.9) * gate * seg_env(n, [(0, 0), (10, 1), (140, 0.8), (175, 0)])
    buzz += 0.5 * crackle_bed(n, 140 * gate, 4)
    b.add(norm(buzz), 0, -20, 0.05)
    # rule wipe 38–78f: high shimmer sweep L->R; episode line at 52f: chime
    b.add(whoosh(T(40), 2000, 9000, 0.6, 5, bw=0.8, pan_sweep=(-0.7, 0.7)), 38, -18)
    for i, m in enumerate([74, 78, 81, 86]):
        b.add(mallet(m, 2.0, tau=0.8), 52 + i * 5, -7 - i, -0.3 + i * 0.2)
    b.add(pad([50, 57, 62, 66, 69], T(150), att=0.4, rel=0.4, bright=0.6), 20, -12)
    x = reverb(b.x, 0.35, 2.0)
    x *= seg_env(len(x), [(0, 1), (150, 1), (fr, 0)])[:, None]
    return to_lufs(x, INTRO_LUFS)


# ============================================================================ ACT 1 — winter bedroom hook
A1 = dict(rustle=(215, 352), snap=364, bursts=[381, 402, 428, 456], whip=512, press=640, bulb=676, bubble=814, hook=1205)


def music_act1():
    fr = DUR["act1"]
    b = Bus(fr)
    b.add(pad([38, 50, 53, 57, 60, 64], T(A1["press"]) - 0.2, att=2.5, rel=1.2, bright=0.35), 0, -4)
    motif = [(0.9, 74), (1.6, 77), (2.3, 81), (3.0, 79), (3.9, 77), (4.6, 74), (9.2, 72), (9.8, 74)]
    for s, m in motif:
        b.at(s, mallet(m, 1.8, ratio=4.0, index=1.0, tau=0.7), -10, 0.3)
    # switch -> bulb: warm swell
    b.add(pad([46, 50, 53, 57, 62], 4.0, att=0.6, rel=1.0, bright=0.55, seed=2), A1["bulb"] - 6, -3)
    b.add(pad([45, 53, 57, 60, 65], 4.2, att=1.0, rel=1.2, bright=0.5, seed=3), A1["bubble"] + 40, -4)
    for i, m in enumerate([62, 65, 69, 72, 74]):
        b.add(mallet(m, 2.0, tau=0.9), A1["bulb"] + i * 7, -9, -0.4 + i * 0.2)
    for i in range(14):
        m = [53, 57, 60, 57][i % 4] if i < 7 else [53, 57, 60, 65][i % 4]
        b.at(T(A1["bulb"]) + 0.6 + i * 0.5, ks_pluck(m, 1.2, 0.4, seed=i), -16, 0.25)
    # hook question: suspended, rising, unresolved
    b.add(riser(0.7, 500, 6000, 4), A1["hook"] - 42, -18)
    b.add(pad([43, 55, 57, 62, 69], 0.9, att=0.2, rel=0.6, bright=0.6, seed=4), A1["hook"], -5)
    b.add(pad([45, 57, 62, 64, 69, 76], 1.0, att=0.25, rel=0.8, bright=0.65, seed=5), A1["hook"] + 45, -5)
    for i, m in enumerate([74, 76, 79, 81, 83]):
        b.add(mallet(m, 1.6, tau=0.7), A1["hook"] + i * 13, -8, -0.2 + i * 0.1)
    x = reverb(b.x, 0.35, 2.4)
    x *= seg_env(len(x), [(0, 1), (fr - 30, 1), (fr, 0)])[:, None]
    return x


def fx_act1():
    fr = DUR["act1"]
    bed = bedroom_bed(fr, A1["bulb"], 100)
    b = Bus(fr)
    r0, r1 = A1["rustle"]
    b.add(rustle(T(r1 - r0 + 20), 5), r0, -16, -0.2)
    b.add(decode("ep01_v2/sfx_blanket_snap.mp3"), A1["snap"], -4, -0.15)
    b.add(decode("ep01_doc/sfx/sfx_spark_crackle.mp3"), A1["snap"], -9, -0.15)
    b.add(zap(0.35, 1), A1["snap"], -7, -0.2)
    for i, f in enumerate(A1["bursts"]):
        b.add(zap(0.18, 10 + i, 120), f, -12 - i * 1.5, -0.25 + 0.1 * i)
    b.add(decode("ep01_doc/sfx/sfx_whoosh_dive.mp3"), A1["whip"] - 6, -14)
    b.add(whoosh(0.75, 400, 3500, 0.45, 7, pan_sweep=(-0.8, 0.8)), A1["whip"] - 6, -16)
    b.add(decode("ep01_v2/sfx_switch_click.mp3"), A1["press"], -3, 0.4)
    b.add(lever_clunk(), A1["press"], -14, 0.4)
    b.add(current_rush(T(36)), A1["press"], -15, 0.5)
    # bulb ignition: tink + flicker buzz gated with the visual flicker, then steady
    b.add(tink(3600), A1["bulb"], -16, 0.35)
    n = fr * SPF
    g = np.repeat(ignition_gate(A1["bulb"], 18, 4, fr), SPF)
    fl = hum(n, 100, 9, buzz=0.9) * filt(g, "lowpass", 200) * seg_env(n, [(0, 0), (A1["bulb"], 1), (A1["bulb"] + 18, 1), (A1["bulb"] + 40, 0.0), (fr, 0)])
    b.add(norm(fl), 0, -22, 0.35)
    b.add(pop(420, 1000), A1["bubble"], -15, -0.3)
    b.add(pop(520, 1250), A1["bubble"] + 8, -18, -0.3)
    b.add(sparkle(0.9, 6, 3000, 7000, 3), A1["hook"], -20)
    return bed, b.x


# ============================================================================ ACT 2A — globe dive → Miletus
M = dict(lock=85, dive=(65, 195), cloud=(170, 210), reveal=270, rubFast=420, rubStop=590, reachEnd=662, quiver=640, macroIn=664, macroOut=775, launch=[712, 740, 786, 804], fly=20, woolDrop=795, thales=812, settle=950, ponder=1242, glimpse=1400)


def rub_unwrapped(l: float) -> float:
    """MILETUS rubProgressAt() without the % 1"""
    l = min(l, M["rubStop"])
    slow, fast, ramp = 0.03, 0.058, 120
    if l < M["rubFast"]:
        return slow * l
    if l < M["rubFast"] + ramp:
        u = l - M["rubFast"]
        return slow * l + (fast - slow) * u * u / (2 * ramp)
    return slow * (M["rubFast"] + ramp) + (fast - slow) * ramp / 2 + fast * (l - M["rubFast"] - ramp)


def rub_strokes():
    out = []
    prev = rub_unwrapped(270)
    for f10 in range(2700, M["rubStop"] * 10):
        f = f10 / 10
        cur = rub_unwrapped(f)
        if math.floor(cur * 2) > math.floor(prev * 2):
            out.append((f, math.floor(cur * 2) % 2))
        prev = cur
    return out


def music_act2a():
    fr = DUR["act2a"]
    b = Bus(fr)
    b.add(pad([38, 45, 57, 64, 69], T(M["reveal"]) + 0.3, att=1.2, rel=1.0, bright=0.6, seed=7), 0, -6)
    b.add(shimmer(1.4, [74, 76, 81, 86], 9, 7), M["cloud"][0], -12)
    b.add(drone([38, 45, 50], T(fr - M["reveal"]) - 0.6, att=1.5, rel=0.6), M["reveal"] - 10, -6)
    phryg = [62, 63, 65, 67, 69, 70, 72, 74]
    pat = [0, 2, 3, 4, 3, 2, 1, 0]
    t = T(M["reveal"]) + 0.4
    i = 0
    while t < T(M["rubStop"]):
        f = t * FPS
        step = 0.5 if f < M["rubFast"] else 0.25 if f < M["rubFast"] + 120 else 0.125
        m = phryg[pat[i % 8] + (i // 8 % 2) * (1 if f > M["rubFast"] else 0)]
        b.at(t, ks_pluck(m, 1.4 if step > 0.2 else 0.6, 0.55, seed=i), -9 - (3 if step < 0.2 else 0), 0.3 * math.sin(i))
        t += step
        i += 1
    # suspense: tremolo cluster + heartbeat from the reach to the cut back
    b.add(tremolo_cluster([74, 75, 81], T(M["macroOut"] - M["rubStop"]), 11, 1.6), M["rubStop"], -10)
    for k in range(int(T(M["macroOut"] - M["rubStop"]) / 0.8)):
        b.at(T(M["rubStop"]) + k * 0.8, kick(0.4), -14 + k * 0.5)
    b.add(boom(55, 30, 1.0), M["macroIn"], -16)
    for i, c in enumerate(M["launch"]):
        b.add(mallet([86, 89, 91, 93][i], 1.8, tau=0.9), c + M["fly"], -8, [-0.3, 0.3, -0.1, 0.2][i])
    # gasp: D major blooms (Picardy) with a cascading shimmer
    b.add(pad([38, 50, 54, 57, 62, 66, 69], T(M["settle"] - M["macroOut"]) + 1.0, att=0.25, rel=2.5, bright=0.7, seed=8), M["macroOut"], -2)
    for i, m in enumerate([74, 78, 81, 86, 90, 93]):
        b.add(mallet(m, 2.0, tau=0.9), M["macroOut"] + 2 + i * 6, -9, -0.5 + i * 0.2)
    b.add(shimmer(2.5, [78, 81, 86, 90], 12, 8), M["macroOut"] + 10, -14)
    for k, m in enumerate([62, 66, 69, 74, 69, 66, 62, 66, 69, 74, 69, 66]):
        b.at(T(M["settle"]) + 0.2 + k * 0.42, ks_pluck(m, 1.6, 0.45, seed=40 + k), -12, 0.2)
    # "তখন কেউ জানত না…" — open, unresolved fifths while he studies the amber
    b.add(pad([38, 45, 52, 57], T(M["glimpse"] - M["ponder"]) + 0.6, att=0.8, rel=1.0, bright=0.35, seed=9), M["ponder"] - 10, -6)
    # "স্থির তড়িতের প্রথম ঝলক" — a bright chime and a held glow to the end
    for i, m in enumerate([74, 81, 86, 90]):
        b.add(mallet(m, 2.4, tau=1.1), M["glimpse"] + i * 4, -7, -0.3 + i * 0.2)
    b.add(pad([38, 50, 57, 62, 66, 69], T(fr - M["glimpse"]), att=0.3, rel=0.6, bright=0.6, seed=10), M["glimpse"], -4)
    b.add(shimmer(T(fr - M["glimpse"]) - 0.2, [78, 81, 86, 90], 8, 11), M["glimpse"], -15)
    x = reverb(b.x, 0.38, 2.8, 5000)
    x *= seg_env(len(x), [(0, 1), (fr - 28, 1), (fr, 0)])[:, None]
    return x


def fx_act2a():
    fr = DUR["act2a"]
    n = fr * SPF
    # globe: air rush through the dive, then the chamber
    globe = whoosh(T(M["dive"][1] - M["dive"][0] + 60), 150, 1800, 0.75, 50, bw=1.5, pan_sweep=(-0.3, 0.3))
    b = Bus(fr)
    b.add(globe, M["dive"][0], -15)
    b.add(blip(1760, 0.05), M["lock"] - 6, -22, 0.3)
    b.add(blip(2350, 0.08), M["lock"], -20, 0.3)
    b.add(whoosh(T(M["cloud"][1] - M["cloud"][0] + 30), 300, 5000, 0.55, 51, bw=1.6), M["cloud"][0], -15)
    chamber = set_rms(room_tone(n, 200, 300), -53) + set_rms(sea(n, 201), -50) + set_rms(pan2(flame(n, 202), 0.55), -49)
    chamber *= seg_env(n, [(0, 0), (M["reveal"] - 20, 0), (M["reveal"] + 40, 1), (M["macroIn"], 1), (M["macroIn"], 0.45), (M["macroOut"], 0.45), (M["macroOut"], 1), (fr, 1)])[:, None]
    # wool on amber
    for f, half in rub_strokes():
        inten = min(1.0, max(0.0, (f - 300) / 400))
        dur = 0.28 if f < M["rubFast"] else 0.18 if f < M["rubFast"] + 120 else 0.14
        b.add(rub_stroke(dur, 0.3 + 0.4 * half, int(f)), f, -24 + inten * 5 - half * 2, -0.05 + 0.1 * half)
    crack_rate = seg_env(n, [(0, 0), (400, 0), (M["rubStop"], 26), (M["reachEnd"], 34), (M["macroOut"], 34), (M["macroOut"] + 60, 8), (fr, 4)])
    b.add(crackle_bed(n, crack_rate, 60), 0, -23, 0.0)
    b.add(rustle(T(M["reachEnd"] - M["rubStop"]), 61, 300, 3000, 6), M["rubStop"], -19, 0.2)
    b.add(whoosh(T(M["reachEnd"] - M["rubStop"]), 200, 900, 0.7, 62, bw=1.2, pan_sweep=(-0.1, 0.4)), M["rubStop"], -20)
    # feathers quiver: high tremolo shimmer rising until the cut back
    q = tremolo_cluster([96, 98, 101], T(M["macroOut"] - M["quiver"]), 17, 2.2)
    b.add(q, M["quiver"], -19)
    b.add(air_thump(), M["macroIn"], -11)
    b.add(air_thump(), M["macroOut"], -16)
    for i, l in enumerate(M["launch"]):
        b.add(fwip(0.3, 70 + i), l, -14, [-0.4, 0.4, -0.2, 0.25][i])
        c = l + M["fly"]
        b.add(zap(0.25, 80 + i, 160), c, -12, [-0.2, 0.2, -0.1, 0.15][i])
        b.add(tink(4200 + 300 * i, 0.3), c, -15)
    b.add(rustle(0.4, 90, 400, 3000, 20), M["woolDrop"], -18, -0.4)
    b.add(thud(0.3, 80, 91), M["woolDrop"] + 22, -14, -0.4)
    # first glimpse: the amber crackles and flashes
    b.add(zap(0.5, 92, 200), M["glimpse"], -10, 0.1)
    b.add(sparkle(1.2, 12, 3000, 8000, 93), M["glimpse"] + 2, -14, 0.1)
    return chamber, b.x


# ============================================================================ ACT 2B — timeline along a copper wire
TL = [0, 115, 364, 733, 1401, 1570, 1645, 1882, 2120]
FRANKLIN_SKY = 1190  # "আকাশের বিদ্যুৎ আর গবেষণাগারের বিদ্যুৎ একই!" — second strike
ELECTRON_CUE = 2467  # "ইলেকট্রন!"
TL_CHORDS = [
    (38, [50, 53, 57, 62]),
    (46, [50, 53, 58, 62]),
    (48, [52, 55, 60, 64]),
    (45, [52, 57, 60, 64]),
    (41, [53, 57, 60, 65]),
    (43, [55, 59, 62, 67]),
    (46, [53, 58, 62, 65]),
    (48, [55, 60, 64, 67]),
    (38, [54, 57, 62, 66, 69]),
]


def music_act2b():
    fr = DUR["act2b"]
    b = Bus(fr)
    beat = 0.6
    end_pulse = T(TL[-1]) + 2.2
    for i, c in enumerate(TL):
        nxt = TL[i + 1] if i + 1 < len(TL) else fr
        root, ch = TL_CHORDS[i]
        seg = T(nxt - c)
        b.add(pad([root] + ch, seg + 0.3, att=0.5, rel=1.0 if i < 8 else 1.5, bright=0.4 + i * 0.04, seed=20 + i), c - 6, -7)
        top = ch[-1] + 12
        b.add(mallet(top, 2.2, tau=1.0), c, -6, 0.0)
        b.add(mallet(top + 7, 2.0, tau=0.8), c + 4, -12, 0.3)
        # ostinato in this chord
        t = T(c) + (0.3 if i else 0.0)
        k = 0
        while t < T(nxt) - 0.1 and t < end_pulse:
            if i >= 1:
                m = ch[[0, 1, 2, 3, 2, 1][k % 6]] + 12
                b.at(t, ks_pluck(m, 0.8, 0.5, seed=k + i * 50), -15, 0.4 * math.sin(k * 0.7))
            if k % 2 == 0:
                b.at(t, ks_pluck(root, 1.0, 0.3, seed=k + 900), -13, -0.1)
                if i >= 2 and (k // 2) % 2 == 0:
                    b.at(t, kick(), -12)
            t += beat / 2
            k += 1
    b.add(shimmer(T(TL[-1] - TL[5]), [74, 79, 81, 86], 4, 21), TL[5], -18)
    b.add(shimmer(3.5, [74, 78, 81, 86, 90], 10, 22), TL[-1], -11)
    for i, m in enumerate([74, 78, 81, 86, 90]):
        b.add(mallet(m, 2.2, tau=1.0), ELECTRON_CUE + i * 3, -7, -0.4 + i * 0.2)
    x = reverb(b.x, 0.3, 2.2)
    x *= seg_env(len(x), [(0, 1), (fr - 28, 1), (fr, 0)])[:, None]
    return x


def fx_act2b():
    fr = DUR["act2b"]
    n = fr * SPF
    bed = set_rms(pan2(hum(n, 50, 300, buzz=0.05), 0), -52) + set_rms(room_tone(n, 301, 200), -56)
    bed += set_rms(pan2(crackle_bed(n, np.full(n, 6.0), 302), 0), -58)
    b = Bus(fr)
    for i, c in enumerate(TL):
        if i > 0:
            b.add(whoosh(0.9, 250, 2200, 0.55, 310 + i, pan_sweep=(-0.7, 0.7)), c - 35, -15)
            # odometer ratchet: decelerating ticks over the 40-frame roll
            for k in range(14):
                u = k / 13
                f = c - 40 + 40 * (1 - (1 - u) ** 2)
                b.add(click(3200 + 400 * (k % 2), 0.015, 320 + k), f, -21 - u * 4, 0.1)
    b.add(sparkle(1.2, 9, 2500, 6500, 330), TL[0] + 6, -16)
    b.add(swish(0.7, 400, 900, 331), TL[1], -15, -0.2)
    b.add(click(1800, 0.03, 332), TL[1] + 30, -18)
    b.add(decode("ep03/sfx_leyden_crack.mp3"), TL[2], -9, 0.2)
    b.add(decode("franklin_1752/sfx_thunder_distant.mp3"), TL[3], -9)
    rain = set_rms(filt(pink(ns(8.0), 333), "bandpass", [1500, 9000]), -40) * hump(ns(8.0), 0.3, 0.7)
    b.add(pan2(rain, 0.0), TL[3], 0)
    b.add(fizz(1.6), TL[4], -14, 0.15)
    b.add(swish(0.8, 700, 1600, 334), TL[5], -14, -0.15)
    b.add(click(2400, 0.03, 335), TL[5] + 40, -18)
    b.add(wobble(2.0, 110), TL[6], -16)
    b.add(wave_sweep(1.8), TL[7], -15)
    b.add(hv_buzz(1.6), TL[8], -12, 0.1)
    b.add(zap(0.4, 336, 180), FRANKLIN_SKY, -9)
    b.add(decode("franklin_1752/sfx_thunder_distant.mp3"), FRANKLIN_SKY + 6, -12)
    b.add(zap(0.45, 337, 220), ELECTRON_CUE, -9, 0.1)
    b.add(sparkle(1.0, 12, 3500, 9000, 338), ELECTRON_CUE + 2, -13, 0.1)
    return bed, b.x


# ============================================================================ ACT 3 — more than wires → atom → comb & paper
A3 = dict(cards=[300, 372, 470], dive=703, boom=767, nucleus=872, cloud=1009, desk=1172, rub=1202, rubEnd=1500, transfer=1336, polar=1500, paper=1562)


def music_act3():
    fr = DUR["act3"]
    b = Bus(fr)
    b.add(pad([41, 53, 57, 60, 64], 6.0, att=1.5, rel=1.5, bright=0.4, seed=30), 0, -5)
    b.add(pad([40, 52, 55, 60, 67], T(A3["dive"]) - 6.0, att=1.5, rel=0.8, bright=0.45, seed=31), 360, -5)
    for s, m in [(0.8, 72), (1.5, 76), (2.2, 79), (3.1, 77), (3.8, 76)]:
        b.at(s, mallet(m, 1.6, tau=0.7), -12, 0.2)
    for c, m in zip(A3["cards"], [72, 76, 79]):
        b.add(mallet(m, 1.6, tau=0.7), c, -9)
    b.add(riser(T(A3["boom"] - A3["dive"] + 25), 200, 7000, 32), A3["dive"] - 25, -6)
    b.add(boom(58, 28, 2.5), A3["boom"], -5)
    b.add(pad([39, 51, 55, 58, 62, 69], T(A3["desk"] - A3["boom"]), att=0.8, rel=1.2, bright=0.3, seed=33), A3["boom"], -5)
    k = 0
    t = T(A3["boom"]) + 0.6
    while t < T(A3["desk"]) - 0.4:
        b.at(t, mallet([75, 79, 82, 86, 81, 79][k % 6], 2.0, ratio=3.5, index=0.7, tau=1.0), -14, 0.5 * math.sin(k))
        t += 0.45
        k += 1
    b.add(bell(39, 3.0), A3["nucleus"], -8)
    b.add(shimmer(2.5, [75, 79, 82, 86, 87], 12, 34), A3["cloud"], -12)
    # desk: playful pizzicato in F
    beat = 0.5
    mel = [65, 69, 72, 69, 67, 70, 74, 70, 69, 72, 77, 72, 70, 67, 65, 67]
    t = T(A3["desk"]) + 0.2
    k = 0
    while t < T(A3["paper"]) - 0.1:
        b.at(t, pizz(mel[k % len(mel)], 0.4, seed=k), -10, 0.3)
        if k % 2 == 0:
            b.at(t, pizz([41, 48][(k // 2) % 2], 0.5, seed=k + 70), -9, -0.3)
        t += beat / 2
        k += 1
    for i, m in enumerate([72, 74, 76, 77, 79, 81, 84]):
        b.add(mallet(m, 1.4, tau=0.6), A3["paper"] + i * 3, -9, -0.4 + i * 0.12)
    b.add(pad([41, 53, 57, 60, 67], T(fr - A3["paper"]), att=0.2, rel=0.4, bright=0.6, seed=35), A3["paper"] + 12, -5)
    x = reverb(b.x, 0.33, 2.4)
    x *= seg_env(len(x), [(0, 1), (fr - 28, 1), (fr, 0)])[:, None]
    return x


def fx_act3():
    fr = DUR["act3"]
    n = fr * SPF
    room = bedroom_bed(fr, 0, 400, 0.6)
    room *= seg_env(n, [(0, 1), (A3["dive"] + 40, 1), (A3["dive"] + 64, 0), (fr, 0)])[:, None]
    atom = set_rms(atom_drone(n, 401), -42) * seg_env(n, [(0, 0), (A3["boom"] - 10, 0), (A3["boom"] + 20, 1), (A3["desk"] - 20, 1), (A3["desk"] + 10, 0), (fr, 0)])[:, None]
    desk = set_rms(room_tone(n, 402, 300), -53) * seg_env(n, [(0, 0), (A3["desk"] - 10, 0), (A3["desk"] + 20, 1), (fr, 1)])[:, None]
    # wire interior at the start: the electrons drifting in the copper
    wire = set_rms(pan2(hum(n, 100, 403, 0.3), 0.3), -50) * seg_env(n, [(0, 1), (200, 1), (300, 0), (fr, 0)])[:, None]
    bed = room + atom + desk + wire
    b = Bus(fr)
    b.add(sparkle(1.0, 10, 2500, 7000, 410), A3["cards"][0], -15, -0.2)
    b.add(static_upsweep(0.9), A3["cards"][1] - 6, -14, -0.3)
    b.add(current_rush(1.0), A3["cards"][2] - 6, -14, 0.5)
    b.add(whoosh(T(A3["boom"] - A3["dive"] + 10), 200, 3000, 0.85, 411, bw=1.4, pan_sweep=(0.3, -0.3)), A3["dive"], -12)
    b.add(air_thump(), A3["boom"], -11)
    b.add(wobble(1.2, 55), A3["nucleus"], -16)
    b.add(sparkle(1.8, 20, 3000, 9000, 412), A3["cloud"], -17)
    b.add(whoosh(0.6, 2500, 500, 0.4, 413), A3["desk"] - 10, -17)
    # comb strokes: one per zero-crossing of sin((l-1202)*0.21)
    k = 0
    f = float(A3["rub"])
    while f < A3["rubEnd"]:
        inten = min(1.0, (f - A3["rub"]) / 250)
        b.add(comb_stroke(0.2, 420 + k, inten), f, -20 + inten * 2, 0.15 * (1 if k % 2 else -1))
        f += math.pi / 0.21
        k += 1
    for j in range(6):
        b.add(pip(1300 + j * 140), A3["transfer"] + j * 24 + 11, -15, -0.2 + j * 0.08)
    b.add(static_upsweep(0.6, 430), A3["polar"], -19, 0.2)
    for i in range(5):
        b.add(pop(500 + i * 80, 1300 + i * 120, 0.08), A3["paper"] + i * 7, -10, -0.3 + i * 0.15)
        b.add(paper_flutter(0.25, 440 + i), A3["paper"] + i * 7, -22, -0.3 + i * 0.15)
    return bed, b.x


# ============================================================================ ACT 3E — switch & bulb kit → the house wakes up
E = dict(press=650, click=658, glow=660, flow=740, flowEnd=1480, inCount=850, outCount=1051, noEat=1184, energy=1304, grid=1497, iron=1602, bell=1688, pump=1760)


def kit_counter_frames():
    """Frames where the X-ray counters increment (mirrors SwitchBulbKit crossings())."""

    def bez(p0, c1, c2, p1, k=24):
        out = []
        for j in range(1, k + 1):
            t = j / k
            u = 1 - t
            out.append(
                (
                    u**3 * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t**3 * p1[0],
                    u**3 * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t**3 * p1[1],
                )
            )
        return out

    LI, LO = (1422, 640), (1458, 640)
    neg = [(470, 688)] + bez((470, 688), (600, 716), (740, 716), (850, 690)) + [(970, 690)] + bez((970, 690), (1110, 718), (1300, 718), (1400, 692)) + [(LI[0], 668)]
    bulb = [LI, (1422, 580)] + bez((1422, 580), (1426, 538), (1454, 538), (1458, 580), 12) + [LO]
    pos = [(LO[0], 668), (1482, 692)] + bez((1482, 692), (1620, 700), (1660, 520), (1620, 400)) + bez((1620, 400), (1500, 160), (700, 150), (470, 330), 40) + bez((470, 330), (420, 380), (400, 420), (400, 452))
    pts = neg + bulb + pos
    seg = [math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
    total = sum(seg)

    def length_to(tg):
        best, bd, acc = 0.0, 1e18, 0.0
        for i, p in enumerate(pts):
            d = math.dist(p, tg)
            if d < bd:
                bd, best = d, acc
            if i < len(seg):
                acc += seg[i]
        return best

    spacing = total / 52
    s_in, s_out = length_to(LI), length_to(LO)

    def crossings(drift, point):
        ph = point % spacing
        return math.floor((drift - ph) / spacing) + 1 if drift >= ph else 0

    ins, outs = [], []
    pi, po = 0, 0
    for f in range(E["press"], DUR["act3e"]):
        t = max(0, f - E["press"] - 10)
        drift = 3.0 * t * t / 80 if t < 40 else 3.0 * 20 + 3.0 * (t - 40)
        ci_, co = crossings(drift, s_in), crossings(drift, s_out)
        if ci_ > pi:
            ins.append(f)
        if co > po:
            outs.append(f)
        pi, po = ci_, co
    return ins, outs


def music_act3e():
    fr = DUR["act3e"]
    b = Bus(fr)
    b.add(pad([45, 52, 57, 60], T(E["press"]) + 0.2, att=2.0, rel=0.8, bright=0.3, seed=50), 0, -6)
    e8 = 60 / 110 / 2
    t, k = 1.0, 0
    while t < T(E["press"]):
        b.at(t, mallet([69, 72, 76, 72][k % 4], 0.5, ratio=1.0, index=0.3, tau=0.18), -17, 0.3 * math.sin(k))
        t += e8
        k += 1
    b.add(pad([45, 52, 57, 61, 64], T(E["grid"] - E["press"]), att=0.4, rel=1.2, bright=0.5, seed=51), E["press"] + 8, -5)
    t, k = T(E["flow"]), 0
    while t < T(E["grid"]) - 0.3:
        b.at(t, mallet([69, 73, 76, 81][k % 4], 0.5, ratio=1.0, index=0.4, tau=0.2), -14, 0.3 * math.sin(k))
        if k % 4 == 0:
            b.at(t, kick(), -15)
        t += e8
        k += 1
    b.add(mallet(81, 1.5), E["inCount"], -10, -0.2)
    b.add(mallet(88, 1.5), E["outCount"], -10, 0.2)
    b.add(mallet(76, 1.2), E["noEat"], -13)
    b.add(mallet(73, 1.2), E["noEat"] + 12, -13)
    b.add(pad([50, 57, 62, 66, 69], T(E["grid"] - E["energy"]) + 0.5, att=0.6, rel=0.8, bright=0.65, seed=52), E["energy"], -4)
    b.add(shimmer(2.0, [78, 81, 86], 8, 53), E["energy"], -15)
    # the house: cheerful D major, one layer per appliance
    beat = 0.5
    mel = [74, 76, 78, 81, 78, 76, 74, 69]
    t, k = T(E["grid"]), 0
    while t < T(fr) - 0.6:
        f = t * FPS
        b.at(t, ks_pluck(mel[k % 8], 0.9, 0.55, seed=k), -11, 0.3)
        if f >= E["iron"] and k % 2 == 0:
            b.at(t, pizz([38, 45][(k // 2) % 2], 0.5, seed=k + 60), -9, -0.3)
        if f >= E["bell"] and k % 4 == 2:
            b.at(t, mallet([86, 85, 83, 81][(k // 4) % 4], 1.0, tau=0.5), -13, 0.4)
        if f >= E["pump"]:
            b.at(t, filt(white(ns(0.04), k), "highpass", 6000) * expdec(ns(0.04), 0.01), -24, -0.4)
            b.at(t + beat / 4, filt(white(ns(0.04), k + 1), "highpass", 6000) * expdec(ns(0.04), 0.01), -28, -0.4)
        t += beat / 2
        k += 1
    b.add(pad([38, 50, 54, 57, 62, 66], T(fr - E["grid"]), att=0.5, rel=0.4, bright=0.55, seed=54), E["grid"], -9)
    x = reverb(b.x, 0.3, 2.0)
    x *= seg_env(len(x), [(0, 1), (fr - 28, 1), (fr, 0)])[:, None]
    return x


def fx_act3e():
    fr = DUR["act3e"]
    n = fr * SPF
    desk = set_rms(room_tone(n, 500, 300), -53) * seg_env(n, [(0, 1), (E["grid"] - 20, 1), (E["grid"] + 10, 0), (fr, 0)])[:, None]
    house = (set_rms(night_air(n, 501), -52) + set_rms(crickets(n, 502), -56)) * seg_env(n, [(0, 0), (E["grid"] - 20, 0), (E["grid"] + 20, 1), (fr, 1)])[:, None]
    jit = crackle_bed(n, seg_env(n, [(0, 0), (240, 0), (300, 22), (E["press"], 30), (E["press"] + 10, 0), (fr, 0)]), 503, 2500)
    flow = hum(n, 100, 504, buzz=0.35) * seg_env(n, [(0, 0), (E["flow"], 0), (E["flow"] + 30, 1), (E["flowEnd"], 1), (E["flowEnd"] + 30, 0), (fr, 0)])
    bed = desk + house + set_rms(pan2(jit, 0), -44) + set_rms(pan2(flow, 0.2), -50)
    b = Bus(fr)
    b.add(lever_clunk(), E["press"], -12, 0.0)
    b.add(decode("ep01_v2/sfx_switch_click.mp3"), E["click"], -3)
    b.add(tink(3600), E["glow"], -15, 0.5)
    g = np.repeat(ignition_gate(E["glow"], 18, 2, fr), SPF)
    fl = hum(n, 100, 505, buzz=0.9) * filt(g, "lowpass", 200) * seg_env(n, [(0, 0), (E["glow"], 1), (E["glow"] + 20, 1), (E["glow"] + 40, 0), (fr, 0)])
    b.add(norm(fl), 0, -22, 0.5)
    ins, outs = kit_counter_frames()
    for f in ins:
        if E["inCount"] - 10 <= f <= E["outCount"] - 20:
            b.add(click(2600, 0.02, f), f, -20, -0.3)
    for f in outs:
        if E["outCount"] - 10 <= f <= E["noEat"]:
            b.add(click(3100, 0.02, f + 1), f, -20, 0.3)
    b.add(whoosh(2.0, 120, 600, 0.4, 507, bw=1.2), E["energy"], -18)
    for f in (E["grid"], E["iron"], E["bell"]):
        b.add(tube_on(int(f)), f, -15, {E["grid"]: -0.5, E["iron"]: -0.5, E["bell"]: 0.3}[f])
    fan = fan_loop(n - E["grid"] * SPF, 1.4, 510)
    b.add(set_rms(fan, -41), E["grid"], 0, -0.5)
    for k in range(3):
        b.add(steam(0.9, 511 + k), E["iron"] + 10 + k * 60, -20, -0.4)
    b.add(ding_dong(), E["bell"], -9, 0.3)
    pump = pump_loop(n - E["pump"] * SPF, 512)
    b.add(set_rms(pump, -39), E["pump"], 0, 0.55)
    return bed, b.x


# ============================================================================ ACT 4 — paradoxes → teaser
A4 = dict(charges=103, recap=[259, 335, 407], crackle=[259, 275, 297], wait=493, khotka=651, think=830, p1=899, bill=1270,
          p2=1430, p3=1651, push=1790, jot=1939, ok=2051, scientist=2103, answer=2331, clear=2559, teaser=2717, title=2814, signoff=2943)
A4_CHIPS = [A4["answer"] + 10, A4["answer"] + 45, A4["answer"] + 80]


def music_act4():
    fr = DUR["act4"]
    b = Bus(fr)
    # "দারুণ, তাই না?" warm recap — stops dead on "কিন্তু দাঁড়ান..."
    b.add(pad([50, 54, 57, 62, 66], T(A4["wait"]) + 0.1, att=0.8, rel=0.25, bright=0.45, seed=60), 0, -5)
    for s, m in [(0.2, 74), (0.9, 78), (1.8, 81), (4.3, 79), (5.6, 78), (6.8, 74)]:
        b.at(s, mallet(m, 1.6, tau=0.7), -11, 0.3)
    # khotka → paradoxes: puzzled pizzicato in D minor with a raised-4 question
    b.add(pad([38, 50, 53, 58], T(A4["jot"] - A4["khotka"]), att=0.8, rel=1.0, bright=0.25, seed=61), A4["khotka"], -8)
    q = [(0.0, 62), (0.25, 65), (0.5, 68), (1.0, 67)]
    for start in (A4["khotka"], A4["think"]):
        for s, m in q:
            b.add(pizz(m, 0.4, seed=int(s * 10)), start + s * FPS, -8, 0.2)
    for f, (m1, m2) in [(A4["bill"], (73, 74)), (A4["p2"], (75, 76)), (A4["p3"], (70, 71))]:
        b.add(mallet(m1, 1.2, tau=0.5), f, -11, -0.2)
        b.add(mallet(m2, 1.2, tau=0.5), f + 2, -11, 0.2)
        b.add(pizz(38, 0.6), f, -9)
    t = T(A4["push"])
    k = 0
    while t < T(A4["jot"]) - 0.1:
        b.at(t, pizz([38, 38, 39, 38][k % 4], 0.5, seed=k + 80), -8 + k * 0.3, -0.2)
        t += 0.5
        k += 1
    # "মাথায় জট পাকিয়ে গেল তো?" — a tangled, wobbling cluster
    b.add(tremolo_cluster([62, 63, 68], T(A4["ok"] - A4["jot"]), 7, 1.2), A4["jot"], -12)
    # "ঠিক আছে!" → resolve in D major and climb to "বিজ্ঞানীর মতো"
    b.add(pad([38, 50, 54, 57, 62, 66], T(A4["teaser"] - A4["ok"]) + 0.4, att=0.5, rel=1.0, bright=0.5, seed=62), A4["ok"], -4)
    for i, m in enumerate([69, 74, 76, 78, 81, 78, 81, 86]):
        b.at(T(A4["ok"]) + 0.6 + i * 0.42, mallet(m, 1.6, tau=0.8), -10, 0.2 * math.sin(i))
    # one rising note per episode stamp ("একে একে")
    for i, f in enumerate(A4_CHIPS):
        b.add(mallet([86, 90, 93][i], 1.4, tau=0.6), f, -12, [-0.4, -0.1, 0.4][i])
    # "জলের মতো পরিষ্কার" — clear, bright shimmer
    b.add(shimmer(T(A4["teaser"] - A4["clear"]), [81, 86, 90, 93], 10, 67), A4["clear"], -14)
    # teaser shimmer + final sting + sign-off
    b.add(pad([47, 59, 62, 66, 71], T(A4["title"] - A4["teaser"]) + 0.2, att=0.5, rel=0.5, bright=0.5, seed=63), A4["teaser"], -5)
    b.add(shimmer(T(fr - A4["teaser"]), [74, 78, 81, 86, 90], 6, 64), A4["teaser"], -15)
    b.add(riser(0.9, 400, 7000, 65), A4["title"] - 54, -14)
    b.add(boom(66, 30, 2.4), A4["title"], -3)
    for i, m in enumerate([62, 66, 69, 74, 76, 81]):
        b.add(mallet(m, 2.4, tau=1.1), A4["title"] + i * 3, -6, -0.5 + i * 0.2)
    b.add(pad([38, 50, 57, 62, 64, 66, 69], T(fr - A4["title"]), att=0.15, rel=0.3, bright=0.6, seed=66), A4["title"], -3)
    for i, m in enumerate([74, 78, 81, 86]):
        b.add(mallet(m, 2.6, tau=1.3), A4["signoff"] + i * 9, -9, -0.3 + i * 0.2)
    x = reverb(b.x, 0.35, 2.6)
    x *= seg_env(len(x), [(0, 1), (fr - 48, 1), (fr, 0)])[:, None]
    return x


def fx_act4():
    fr = DUR["act4"]
    n = fr * SPF
    bed = bedroom_bed(fr, 0, 600, 0.15) * seg_env(n, [(0, 1), (A4["teaser"] - 30, 1), (A4["teaser"] + 6, 0), (fr, 0)])[:, None]
    bed += set_rms(atom_drone(n, 601), -50) * seg_env(n, [(0, 0), (A4["teaser"] - 10, 0), (A4["teaser"] + 40, 1), (fr - 40, 1), (fr, 0)])[:, None]
    b = Bus(fr)
    # recap: charges glint, static crackles, current rushes, the field hums outward
    b.add(sparkle(1.0, 10, 2500, 7000, 610), A4["charges"], -16, -0.1)
    for i, f in enumerate(A4["crackle"]):
        b.add(zap(0.2, 611 + i, 120), f, -12 - i, -0.15)
    b.add(current_rush(0.9, 614), A4["recap"][1] - 4, -15, 0.5)
    b.add(wobble(1.4, 140), A4["recap"][2], -17, -0.15)
    b.add(pop(400, 950), A4["khotka"], -13, -0.3)
    b.add(pop(500, 1200), A4["khotka"] + 7, -16, -0.3)
    b.add(whoosh(0.9, 500, 1600, 0.5, 615, pan_sweep=(0.6, 0.2)), A4["p1"], -19)
    b.add(paper_flutter(T(40), 616), A4["bill"] - 14, -13, 0.0)
    b.add(thud(0.3, 85, 617), A4["bill"] + 22, -10)
    b.add(whoosh(T(40), 400, 2200, 0.7, 618, pan_sweep=(-0.6, -0.3)), A4["p2"] - 10, -15)
    for k in range(10):
        b.add(blip(1400 * 2 ** (-k / 9), 0.06), A4["p2"] + 30 + k * 11, -18 - k * 0.3, -0.4)
    b.add(power_down(), A4["p2"] + 150, -11, -0.4)
    b.add(pop(600, 1400), A4["p3"] + 10, -15, 0.5)
    b.add(scratch(T(14)), A4["p3"] + 50, -14, 0.5)
    for k in range(5):
        b.add(knock(620 + k), A4["push"] + 8.7 + k * 34.9, -9 - k * 3, 0.45)
    # the knot in his head, then the idea
    b.add(pop(380, 900), A4["jot"], -14, -0.3)
    b.add(wobble(1.6, 90), A4["jot"] + 10, -16, -0.3)
    b.add(swish(0.5, 600, 1500, 643), A4["ok"], -17, -0.3)
    b.add(tink(3800, 0.5), A4["ok"] + 40, -12, -0.3)
    b.add(sparkle(1.0, 12, 3000, 8000, 644), A4["ok"] + 40, -15, -0.3)
    for i, f in enumerate(A4_CHIPS):
        b.add(stamp(630 + i), f, -12, [-0.4, -0.2, 0.45][i])
    b.add(whoosh(T(36), 1800, 300, 0.4, 640), A4["teaser"] - 30, -13)
    b.add(click(2600, 0.02, 641), A4["teaser"] + 42, -21)
    b.add(sparkle(1.4, 14, 3000, 9000, 642), A4["title"], -16)
    return bed, b.x


# ============================================================================ mix + export
def write_mp3(path: Path, x: np.ndarray):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        w = Path(td) / "x.wav"
        wavfile.write(str(w), SR, np.clip(x, -1, 1).astype(np.float32))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(w), "-c:a", "libmp3lame", "-b:a", "320k", "-ar", str(SR), "-ac", "2", str(path)], check=True)


def finish_fx(bed: np.ndarray, oneshots: np.ndarray, vo: np.ndarray | None, frames: int) -> np.ndarray:
    n = frames * SPF
    bed = bed[:n]
    if vo is not None:
        bed = bed * duck_gain(vo, n, BED_DUCK_DB)[:, None]
    x = bed + oneshots[:n]
    x *= edge(n, 0.01, 0.02)[:, None]
    return limit(x, FX_CEIL_DB)


def finish_music(x: np.ndarray, vo: np.ndarray | None, frames: int) -> np.ndarray:
    n = frames * SPF
    x = x[:n]
    if len(x) < n:
        x = np.concatenate([x, np.zeros((n - len(x), 2))])
    x = limit(to_lufs(x, MUSIC_LUFS), -12.0)
    if vo is not None:
        x = x * duck_gain(vo, n, DUCK_DB)[:, None]
    return x * edge(n, 0.005, 0.02)[:, None]


BUILDERS = {
    "act1": (music_act1, fx_act1),
    "act2a": (music_act2a, fx_act2a),
    "act2b": (music_act2b, fx_act2b),
    "act3": (music_act3, fx_act3),
    "act3e": (music_act3e, fx_act3e),
    "act4": (music_act4, fx_act4),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mix", type=Path, default=None, help="write a full VO+music+fx programme wav for QA")
    ap.add_argument("--only", nargs="*", default=None)
    args = ap.parse_args()

    total = sum(DUR.values())
    mix = np.zeros((total * SPF, 2)) if args.mix else None
    off = 0
    for act in ORDER:
        fr = DUR[act]
        if args.only and act not in args.only:
            off += fr
            continue
        print(f"[{act}] {fr} frames")
        if act == "intro":
            x = build_intro()
            write_mp3(OUT_MUSIC / "intro_sting.mp3", x)
            if mix is not None:
                mix[off * SPF : (off + fr) * SPF] += x
        else:
            vo = decode(VO[act])
            mfn, ffn = BUILDERS[act]
            m = finish_music(mfn(), vo, fr)
            bed, shots = ffn()
            fx = finish_fx(bed, shots, vo, fr)
            print(f"   music {lufs(m):6.1f} LUFS   fx {lufs(fx):6.1f} LUFS   fx peak {20*np.log10(np.max(np.abs(fx))+1e-9):5.1f} dBFS")
            write_mp3(OUT_MUSIC / f"music_{act}.mp3", m)
            write_mp3(OUT_FX / f"fx_{act}.mp3", fx)
            if mix is not None:
                seg = mix[off * SPF : (off + fr) * SPF]
                v = vo[: len(seg)]
                seg[: len(v)] += v
                seg += m + fx
        off += fr
    if mix is not None:
        args.mix.parent.mkdir(parents=True, exist_ok=True)
        wavfile.write(str(args.mix), SR, mix.astype(np.float32))
        print("mix written:", args.mix, f"sample peak {20*np.log10(np.max(np.abs(mix))):.2f} dBFS")


if __name__ == "__main__":
    main()
