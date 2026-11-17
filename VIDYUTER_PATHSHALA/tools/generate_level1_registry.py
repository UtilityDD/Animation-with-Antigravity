# -*- coding: utf-8 -*-
"""
Generate episode registry stubs for Level 1 (EP02 to EP09)
"""

import os

base_ep_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA\episodes"

level_1_eps = [
    {
        "id": "EP02",
        "title_bn": "পরমাণু ও বৈদ্যুতিক চার্জ",
        "title_en": "Atoms and Electric Charge",
        "duration": "8 min",
        "prereq": "EP01",
        "objectives": "Understand atomic nucleus, electron shells, Coulomb's Law, free electron sea in conductors."
    },
    {
        "id": "EP03",
        "title_bn": "স্থির তড়িৎ",
        "title_en": "Static Electricity",
        "duration": "7 min",
        "prereq": "EP02",
        "objectives": "Triboelectric series, charging by induction, electroscopes, cloud charging & lightning rods."
    },
    {
        "id": "EP04",
        "title_bn": "বৈদ্যুতিক বল ও ক্ষেত্র",
        "title_en": "Electric Force and Electric Field",
        "duration": "8 min",
        "prereq": "EP02",
        "objectives": "Coulomb force vectors, electric field lines, field intensity E = F/q, permittivity."
    },
    {
        "id": "EP05",
        "title_bn": "বিভব ও বিভব পার্থক্য",
        "title_en": "Electric Potential and Voltage",
        "duration": "8 min",
        "prereq": "EP04",
        "objectives": "Work done in moving charge, Volts (Joules/Coulomb), potential hills and valleys, height analogy."
    },
    {
        "id": "EP06",
        "title_bn": "তড়িৎ প্রবাহ",
        "title_en": "Electric Current",
        "duration": "7 min",
        "prereq": "EP05",
        "objectives": "Charge per second (Amperes), drift velocity vs signal speed, conventional vs electron direction."
    },
    {
        "id": "EP07",
        "title_bn": "রোধ ও পরিবাহিতা",
        "title_en": "Resistance and Conductivity",
        "duration": "8 min",
        "prereq": "EP06",
        "objectives": "Resistivity (rho), R = rho*L/A, lattice collisions, conductors, insulators, semiconductors."
    },
    {
        "id": "EP08",
        "title_bn": "ওহমের সূত্র",
        "title_en": "Ohm's Law",
        "duration": "9 min",
        "prereq": "EP07",
        "objectives": "V = IR intuitive mechanics, VI characteristic slopes, ohmic vs non-ohmic components."
    },
    {
        "id": "EP09",
        "title_bn": "বৈদ্যুতিক বর্তনী",
        "title_en": "Electric Circuits",
        "duration": "7 min",
        "prereq": "EP08",
        "objectives": "Complete loops, open/short circuits, switches, load-source impedance balance."
    }
]

for ep in level_1_eps:
    d = os.path.join(base_ep_dir, ep["id"])
    os.makedirs(d, exist_ok=True)
    readme_path = os.path.join(d, "README.md")
    content = f"""# {ep['id']}: {ep['title_bn']}
## {ep['title_en']}

- **Duration:** {ep['duration']}
- **Prerequisite:** {ep['prereq']}
- **Status:** Registered in Master Curriculum (Production Ready)
- **Primary Learning Objectives:** {ep['objectives']}
"""
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Level 1 episode registry generated successfully.")
