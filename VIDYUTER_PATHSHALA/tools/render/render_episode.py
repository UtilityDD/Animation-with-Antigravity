# -*- coding: utf-8 -*-
"""
Render automation tool for VIDYUTER PATHSHALA
Usage:
    python tools/render/render_episode.py --ep 1 --preview
    python tools/render/render_episode.py --ep 1 --full
"""

import argparse
import subprocess
import os
import sys

def main():
    parser = argparse.ArgumentParser(description="Render Vidyuter Pathshala Episodes")
    parser.add_argument("--ep", type=int, default=1, help="Episode number (1-50)")
    parser.add_argument("--preview", action="store_true", help="Render fast preview")
    parser.add_argument("--concurrency", type=int, default=4, help="Render concurrency threads")
    parser.add_argument("--gl", type=str, default="angle", help="OpenGL renderer (angle, swiftshader)")
    args = parser.parse_args()

    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    remotion_dir = os.path.join(project_root, "electricity-safety-wb")
    
    if args.ep == 1:
        comp_id = "VidyuterPathshalaEP01-Preview" if args.preview else "VidyuterPathshalaEP01"
        out_folder = "previews" if args.preview else "final"
        out_name = f"EP{args.ep:02d}_Preview.mp4" if args.preview else f"EP{args.ep:02d}_What_Is_Electricity.mp4"
    else:
        comp_id = f"VidyuterPathshalaEP{args.ep:02d}"
        out_folder = "final"
        out_name = f"EP{args.ep:02d}.mp4"

    out_path = os.path.join(project_root, "VIDYUTER_PATHSHALA", "renders", out_folder, out_name)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    print(f"==================================================")
    print(f"🎬 RENDERING VIDYUTER PATHSHALA — EPISODE {args.ep:02d}")
    print(f"Composition ID: {comp_id}")
    print(f"Output File:    {out_path}")
    print(f"Concurrency:    {args.concurrency} threads")
    print(f"GL Backend:     {args.gl}")
    print(f"==================================================")

    cmd = [
        "npx", "remotion", "render",
        "src/index.ts",
        comp_id,
        out_path,
        f"--concurrency={args.concurrency}",
        f"--gl={args.gl}"
    ]

    subprocess.run(cmd, cwd=remotion_dir, check=True)
    print(f"\n✅ Render complete! Output saved to: {out_path}")

if __name__ == "__main__":
    main()
