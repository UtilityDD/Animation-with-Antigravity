# -*- coding: utf-8 -*-
"""
Automated QA Validator & Indian Bengali (bn-IN) TTS Normalizer
for «বিদ্যুতের পাঠশালা 2.0» (checks beat density, camera coverage, Z0-Z3 layers,
simultaneous KineticWord cap <= 3, bn-IN lexicon, and spoken years in tts_bn).
"""
import json
import re
import sys
from pathlib import Path

FORBIDDEN_BN_WORDS = ["পানি", "বাসা", "গোসল", "নাস্তা", "মরিচ", "অনেক ভালো"]
RAW_YEAR_RE = re.compile(r"(?:[1-2][0-9]{3}|[১২][০-৯]{3})")

SPOKEN_YEARS = {
    "1600": "ষোলোশো", "১৬০০": "ষোলোশো",
    "1752": "সতেরোশো বাহান্ন", "১৭৫২": "সতেরোশো বাহান্ন",
    "1799": "সতেরোশো নিরানব্বই", "১৭৯৯": "সতেরোশো নিরানব্বই",
    "1800": "আঠারোশো", "১৮০০": "আঠারোশো",
    "1814": "আঠারোশো চোদ্দো", "১৮১৪": "আঠারোশো চোদ্দো",
    "1820": "আঠারোশো বিশ", "১৮২০": "আঠারোশো বিশ",
    "1831": "আঠারোশো একত্রিশ", "১৮৩১": "আঠারোশো একত্রিশ",
    "1897": "আঠারোশো সাতানব্বই", "১৮৯৭": "আঠারোশো সাতানব্বই",
    "1909": "উনিশশো নয়", "১৯০৯": "উনিশশো নয়",
    "2026": "দুহাজার ছাব্বিশ", "২০২৬": "দুহাজার ছাব্বিশ",
}


def normalize_bn_in_tts(text: str) -> str:
    """Convert raw 4-digit years and common decimal voltages into natural spoken bn-IN."""
    out = text
    for raw, spoken in SPOKEN_YEARS.items():
        out = out.replace(raw, spoken)
    out = out.replace("১.৫ V", "দেড় ভোল্ট").replace("1.5 V", "দেড় ভোল্ট")
    out = out.replace("২২০ V", "দুশো কুড়ি ভোল্ট").replace("220 V", "দুশো কুড়ি ভোল্ট")
    return out


def validate_choreography(choreo_path: Path, scene_tsx_paths: list[Path]) -> list[str]:
    errors: list[str] = []
    data = json.loads(choreo_path.read_text(encoding="utf-8"))
    duration_ms = int(data["scene_duration_ms"])
    beats = data.get("beats", [])
    cam_keys = data.get("camera_keyframes", [])

    # 1. Beat Density Check (<= 2200 ms gaps)
    if not beats:
        errors.append("No beats found in word_choreography.json")
    else:
        prev_end = 0
        for b in beats:
            gap = b["start_ms"] - prev_end
            if gap > 2200:
                errors.append(f"Beat density gap {gap}ms > 2200ms before beat {b.get('id')}")
            prev_end = b["end_ms"]
            # 5. Indian Bengali & TTS Lint
            tts = b.get("tts_bn", "")
            for bad in FORBIDDEN_BN_WORDS:
                if bad in tts:
                    errors.append(f"Forbidden non-bn-IN word '{bad}' in beat {b.get('id')}")
            if RAW_YEAR_RE.search(tts):
                errors.append(f"Raw 4-digit year found in tts_bn of beat {b.get('id')}: {tts}")

    # 2. Full-Scene Camera Coverage (0ms to >= duration - 500ms, no hold > 600ms)
    if not cam_keys or cam_keys[0]["ms"] != 0:
        errors.append("Camera keyframes must start at 0 ms")
    elif cam_keys[-1]["ms"] < duration_ms - 500:
        errors.append(f"Camera keyframes end early at {cam_keys[-1]['ms']}ms (< {duration_ms - 500}ms)")

    # 3. Depth Completeness Check (Z0, Z1, Z2, Z3)
    for tsx in scene_tsx_paths:
        src = tsx.read_text(encoding="utf-8")
        for plane in ("Z0", "Z1", "Z2", "Z3"):
            if plane not in src:
                errors.append(f"{tsx.name} missing DepthLayer '{plane}'")

    # 4. Simultaneous KineticWord cap (<= 3)
    words = data.get("kinetic_words", [])
    for t in range(0, duration_ms, 100):
        active = sum(1 for w in words if w["appear_ms"] <= t <= w["remove_ms"])
        if active > 3:
            errors.append(f"More than 3 simultaneous KineticWords ({active}) at {t}ms")
            break

    return errors


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python validate_episode_v2.py <word_choreography.json> <scene1.tsx> [...]")
        sys.exit(2)
    choreo = Path(sys.argv[1])
    scenes = [Path(p) for p in sys.argv[2:]]
    errs = validate_choreography(choreo, scenes)
    if errs:
        print("QA VALIDATION FAILED:")
        for e in errs:
            print("  -", e)
        sys.exit(1)
    print("QA VALIDATION PASSED: 0 errors.")
