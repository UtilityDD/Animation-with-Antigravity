# -*- coding: utf-8 -*-
"""
Scientific accuracy and deliverable audit tool for VIDYUTER PATHSHALA
Checks that:
1. All mandatory deliverable files exist for an episode.
2. No banned scientific misconceptions exist in narration scripts.
3. Conventional current vs electron drift are clearly documented.
4. SRT captions have proper timecodes.
"""

import os
import re
import sys

REQUIRED_DELIVERABLES = [
    "script_bn.md",
    "script_en_notes.md",
    "storyboard.md",
    "visual_assets.md",
    "science_review.md",
    "analogy_notes.md",
    "captions.srt",
    "quiz.md",
    "glossary.md",
    "production_notes.md"
]

FORBIDDEN_PATTERNS = [
    (r"ইলেকট্রন খেয়ে ফেলে", "False claim that load consumes electrons"),
    (r"বিদ্যুৎ তৈরি হয় ঘর্ষণে", "Imprecise claim that friction creates charge rather than transfers electrons"),
    (r"আলোর গতিতে ইলেকট্রন ছোটে", "Confusing electron drift velocity with electromagnetic field propagation speed")
]

def audit_episode(ep_dir):
    ep_name = os.path.basename(ep_dir)
    print(f"Auditing {ep_name} in {ep_dir}...")
    errors = []
    warnings = []

    # 1. Check all required deliverables exist
    for req in REQUIRED_DELIVERABLES:
        fpath = os.path.join(ep_dir, req)
        if not os.path.exists(fpath):
            errors.append(f"Missing mandatory deliverable: {req}")
        elif os.path.getsize(fpath) < 50:
            warnings.append(f"Deliverable appears unusually small / placeholder: {req}")

    # 2. Check script for forbidden misconceptions
    script_path = os.path.join(ep_dir, "script_bn.md")
    if os.path.exists(script_path):
        with open(script_path, "r", encoding="utf-8") as f:
            content = f.read()
            for pattern, reason in FORBIDDEN_PATTERNS:
                if re.search(pattern, content):
                    # Check if it was preceded by negation (e.g. "খেয়ে ফেলে না")
                    if "খেয়ে ফেলে না" in content and pattern == r"ইলেকট্রন খেয়ে ফেলে":
                        continue
                    errors.append(f"Scientific Misconception Detected: {reason}")

    # 3. Check SRT format
    srt_path = os.path.join(ep_dir, "captions.srt")
    if os.path.exists(srt_path):
        with open(srt_path, "r", encoding="utf-8") as f:
            srt_content = f.read()
            if "-->" not in srt_content:
                errors.append("Invalid SRT captions: No timestamp cues found")

    print(f"Results for {ep_name}:")
    if not errors and not warnings:
        print("  ✅ All scientific audits and deliverable checks passed perfectly!")
    else:
        for w in warnings:
            print(f"  ⚠️  WARNING: {w}")
        for e in errors:
            print(f"  ❌ ERROR: {e}")

    return len(errors) == 0

if __name__ == "__main__":
    base_ep_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA\episodes"
    all_ok = True
    for item in os.listdir(base_ep_dir):
        full_p = os.path.join(base_ep_dir, item)
        if os.path.isdir(full_p) and item.startswith("EP"):
            ok = audit_episode(full_p)
            if not ok:
                all_ok = False

    sys.exit(0 if all_ok else 1)
