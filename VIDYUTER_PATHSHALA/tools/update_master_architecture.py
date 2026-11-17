# -*- coding: utf-8 -*-
"""
Update Master Project Architecture (Phase 1) for VIDYUTER PATHSHALA
Implements 4-Stage Historical Storytelling, history_research.md gate,
revised runtime allocations (~7-11 min per episode), Dual-Register color palettes,
and Indic HarfBuzz typography standards.
"""

import os

base_docs_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA\docs"
os.makedirs(base_docs_dir, exist_ok=True)

docs = {}

# 1. PROJECT_OVERVIEW.md
docs["PROJECT_OVERVIEW.md"] = """# ⚡ বিদ্যুতের পাঠশালা (Electricity Explained)
## Master Project Overview & Vision Statement
**English Working Title:** *Electricity Explained — From Zero to the Power Grid*  
**Tagline:** *শূন্য থেকে বিদ্যুতের জগৎকে বোঝা।*

---

### 1.1 Creative Mandate & Dual Aesthetic Standard
Every episode in this 50-episode flagship Bengali science animation series adheres to a strict dual aesthetic standard:
1. **Opening Documentary Act (Stages 1–3):** Atmospheric, museum-grade historical storytelling comparable to *Cosmos* or *Connections* (cinematic chiaroscuro lighting, authentic period instruments, layered 2.5D parallax illustration).
2. **Core Explainer Act (Stage 4):** Precision-engineered conceptual vector animation comparable to *3Blue1Brown* and *Kurzgesagt* (rigorous physics visualizations, mathematically clean motion curves, zero visual clutter).

> [!IMPORTANT]
> **Hard Rule:** NEVER open any episode with a textbook definition, formula, bulleted list, or generic modern-day hook. Every episode MUST guide the learner through the human story of discovery before encountering formal science.

---

### 1.2 Target Audience & Pedagogical Scope
- **Secondary & Higher Secondary Students:** Class 8–12 (WBCHSE, WBBSE, CBSE, ICSE).
- **Competitive Science Aspirants:** JEE Main/Advanced, WBJEE, NEET (Physics).
- **Technical & Vocational Learners:** ITI (Electrician, Wireman) and Polytechnic Diploma in Electrical Engineering.
- **Undergraduate Foundation:** B.Tech / B.E. 1st & 2nd Year Electrical & Electronics Engineering.
- **Curious Bengali Public:** Lifelong learners seeking genuine, intuitive conceptual mastery.

---

### 1.3 The 4-Stage Universal Episode Framework
Every episode across the entire 50-episode roadmap follows this mandatory four-stage progression:
1. **Stage 1: The Historical Story (45–90s):** Reconstructs a genuine historical experiment or anomaly with authentic period instruments and settings.
2. **Stage 2: Topic-Specific Evolution Timeline (30–60s):** An animated chronological timeline highlighting key historical breakthroughs with an explicit animated broken-axis marker (`//`) across large temporal leaps.
3. **Stage 3: Visual Bridge to the Present (10–20s):** Seamless match-cut morph transitions transforming historical apparatus directly into modern electrical devices.
4. **Stage 4: Core Scientific Explanation & Applications (4:00–7:30m):** Precision vector physics, microscopic electron-cloud mechanics, grounded analogies with explicit boundary limits, circuit simulations, daily energy conversions, and pause-and-think reflection prompts.

---

### 1.4 Technical Runtime & Quality Standards
- **Episode Duration Policy:** Target runtime for Episode 01 is `~08:15` (495 seconds). All subsequent episodes are calibrated between `7:00` and `11:30` based on curriculum depth.
- **Resolution:** `1920 × 1080` (16:9 Full HD progressive; resolution-independent vector SVGs scalable to 4K).
- **Frame Rate:** `60 FPS` CFR (Constant Frame Rate) for silky-smooth physics, electron cloud drift, and kinetic typography.
- **Audio Delivery:** 3-bus balanced mix (Voiceover at `-14 LUFS` integrated, period acoustic music bed ducked to `-20 dB`, tactile non-fatiguing SFX bus).
"""

# 2. MASTER_CURRICULUM.md
docs["MASTER_CURRICULUM.md"] = """# 📚 MASTER CURRICULUM (50 EPISODES)
## Electricity Explained — From Zero to the Power Grid
*Updated with 4-Stage Historical Storytelling Hooks and Revised Runtimes (~7–11 min)*

### LEVEL 1 — UNDERSTANDING ELECTRICITY (Beginner | 9 Episodes)
*Foundational physics of charge, voltage, current, resistance and simple circuits.*

| No. | Bengali Title | English Title | Target Duration | Stage 1 Historical Story Hook | Key Concepts |
|---|---|---|---|---|---|
| **01** | বিদ্যুৎ আসলে কী? | What Exactly Is Electricity? | 08:15 | 600 BCE Miletus: Amber stone rubbing wool attracting feathers | Nature of charge, electron cloud vs nucleus, static vs current, closed loops |
| **02** | পরমাণু ও বৈদ্যুতিক চার্জ | Atoms and Electric Charge | 08:30 | 1897 Cambridge: J.J. Thomson's cathode ray tube deflection | Subatomic particles, Coulomb's inverse-square law, free electron sea |
| **03** | স্থির তড়িৎ | Static Electricity | 08:00 | 1745 Leyden: Ewald von Kleist & Musschenbroek's shock jar | Triboelectric series, induction, electroscopes, lightning rods |
| **04** | বৈদ্যুতিক বল ও ক্ষেত্র | Electric Force & Field | 08:45 | 1785 Paris: Charles-Augustin de Coulomb's torsion balance | Vector fields, electric field lines, permittivity, dipole geometry |
| **05** | বিভব ও বিভব পার্থক্য | Potential & Voltage | 08:30 | 1800 Pavia: Alessandro Volta's zinc-copper brine pile | Electrostatic work, Volts (J/C), gravitational hill analogy, EMF |
| **06** | তড়িৎ প্রবাহ | Electric Current | 08:15 | 1820 Copenhagen: Hans Christian Ørsted's compass deflection | Drift velocity vs EM wave speed, Amperes (C/s), conventional current |
| **07** | রোধ ও পরিবাহিতা | Resistance & Conductivity | 08:45 | 1826 Cologne: Georg Simon Ohm's temperature-regulated wire tests | Lattice collisions, resistivity ($R = \\rho L/A$), conductors vs insulators |
| **08** | ওহমের সূত্র | Ohm's Law | 09:15 | 1827 Berlin: Ohm's thermocouple circuit measurements | Linear $V=IR$ intuition, slope interpretation, non-ohmic components |
| **09** | বৈদ্যুতিক বর্তনী | Electric Circuits | 08:00 | 1845 Königsberg: Gustav Kirchhoff's junction law discovery | Complete loops, schematic symbols, load-source balance, continuity |

### LEVEL 2 — CIRCUITS AND ELECTRICAL COMPONENTS (9 Episodes)
| No. | Bengali Title | English Title | Duration | Historical Hook | Key Concepts |
|---|---|---|---|---|---|
| **10** | সেল ও ব্যাটারি | Cells and Batteries | 08:30 | 1836 London: John Frederic Daniell's constant-voltage cell | Electrochemical oxidation-reduction, internal resistance |
| **11** | সার্কিট ডায়াগ্রাম ও প্রতীক | Schematics & Symbols | 07:45 | Early telegraph wiring schematics by Samuel Morse | Standard IEC/IEEE symbols, node analysis, schematic tracing |
| **12** | শ্রেণি সংযোগ | Series Circuits | 08:30 | Early arc-lamp string lighting failures in city streets | Current conservation, voltage division ($V = \\sum V_k$), equivalent $R_{eq}$ |
| **13** | সমান্তরাল সংযোগ | Parallel Circuits | 08:45 | 1882 Pearl Street: Edison's parallel home lighting distribution | Voltage constancy, branch currents, domestic wiring resilience |
| **14** | বৈদ্যুতিক পরিমাপ | Measuring V, I and R | 09:30 | 1881 Paris: Deprez-d'Arsonval moving-coil galvanometer | Galvanometer shunts, multiplier resistors, voltmeter loading |
| **15** | বৈদ্যুতিক ক্ষমতা | Electrical Power | 08:45 | 1841 Manchester: James Prescott Joule's water immersion heater | Joule heating ($P = I^2R = VI$), thermal dissipation |
| **16** | বৈদ্যুতিক শক্তি ও ইউনিট | Energy and kWh | 08:30 | 1888 Ferranti's rotating-disc electricity billing meter | Joules vs kWh, billing formulas, energy conservation |
| **17** | বিদ্যুৎ নিরাপত্তা | Electrical Safety | 09:00 | 1880s: First industrial shock reports & rescue protocols | Human body impedance, ventricular fibrillation, touch potentials |
| **18** | ধারক ও ক্যাপাসিট্যান্স | Capacitors | 09:15 | 1746 Paris: Abbé Nollet's 200-monk electrostatic discharge circuit | Dielectric polarization, $C=Q/V$, electrostatic energy density |

### LEVEL 3 — MAGNETISM AND ELECTRICAL MACHINES (7 Episodes)
| No. | Bengali Title | English Title | Duration | Historical Hook | Key Concepts |
|---|---|---|---|---|---|
| **19** | চৌম্বকত্ব | Magnetism | 08:30 | 1269 France: Petrus Peregrinus mapping magnetic poles | Magnetic domains, dipole lines, Earth's geomagnetic core |
| **20** | বিদ্যুৎ থেকে চৌম্বক ক্ষেত্র | Magnetic Effect of Current | 08:45 | 1820 Paris: André-Marie Ampère formulating electrodynamics | Right-Hand Rule, Biot-Savart law intuition, solenoids |
| **21** | তড়িৎচুম্বক ও রিলে | Electromagnets & Relays | 08:45 | 1824 London: William Sturgeon's varnished iron horseshoe | Soft-iron core saturation, relay switching, telegraph repeater |
| **22** | চৌম্বক ক্ষেত্রে তারের উপর বল | Magnetic Force on Conductor | 08:45 | 1821 London: Faraday's mercury motor rotating wire | Lorentz force ($\\mathbf{F} = I\\mathbf{L}\\times\\mathbf{B}$), Fleming's Left-Hand Rule |
| **23** | DC মোটর | DC Motors | 09:30 | 1834 Vermont: Thomas Davenport's commutator DC motor | Split-ring commutator, brush assembly, counter-EMF |
| **24** | তড়িৎচৌম্বকীয় আবেশ | Electromagnetic Induction | 09:30 | 1831 Royal Institution: Faraday thrusting magnet into coil | Flux rate of change, Lenz's law, induced EMF |
| **25** | জেনারেটর কীভাবে কাজ করে? | Electric Generators | 09:15 | 1832 Paris: Hippolyte Pixii's rotating horseshoe alternator | Slip rings vs commutator, mechanical-to-electrical conversion |

### LEVEL 4 — AC ELECTRICITY AND ADVANCED CONCEPTS (7 Episodes)
| No. | Bengali Title | English Title | Duration | Historical Hook | Key Concepts |
|---|---|---|---|---|---|
| **26** | AC ও DC বিদ্যুৎ | AC vs DC Electricity | 08:45 | 1893 Chicago: Tesla/Westinghouse vs Edison War of the Currents | Sinusoidal alternating polarity, transmission loss advantage |
| **27** | AC তরঙ্গ ও কম্পাঙ্ক | Waveforms, Period & Frequency | 09:15 | Early rotating-alternator waveform tracing by Joubert | Sine wave anatomy, period $T$, frequency $f$ (50 Hz), angular $\\omega$ |
| **28** | Peak ও RMS Voltage | Peak and RMS Values | 08:45 | Lord Kelvin's hot-wire ammeter calibration | Equivalent thermal heating, $V_{rms} = V_{peak}/\\sqrt{2}$, 230V vs 325V |
| **29** | ট্রান্সফরমার | Transformers | 09:30 | 1885 Budapest: ZBD closed-core transformer invention | Mutual induction, turns ratio $V_p/V_s = N_p/N_s$, core losses |
| **30** | Resistance, Reactance & Z | Impedance Fundamentals | 10:15 | Oliver Heaviside's operational calculus and telegraph line lags | Inductive $X_L$, capacitive $X_C$, phasor diagrams |
| **31** | থ্রি-ফেজ বিদ্যুৎ | Three-Phase Electricity | 10:30 | 1891 Lauffen-to-Frankfurt: Dobrovolsky's 3-phase demonstration | $120^\\circ$ phase offset, star/delta connections, line vs phase voltages |
| **32** | Power Factor ও Reactive Power | Power Factor & kVAR | 10:00 | Industrial motor factory load lags and Ferranti's observations | Apparent/Active/Reactive power triangle, capacitor bank correction |

### LEVEL 5 — FROM POWER STATION TO YOUR HOME (8 Episodes)
| No. | Bengali Title | English Title | Duration | Historical Hook | Key Concepts |
|---|---|---|---|---|---|
| **33** | বিদ্যুৎ উৎপাদন | Electricity Generation | 08:45 | 1884 Newcastle: Charles Parsons' multi-stage steam turbine | Alternator physics, hydro/thermal/nuclear prime movers |
| **34** | বিদ্যুৎ সঞ্চালন | High-Voltage Transmission | 09:00 | 1896 Niagara Falls to Buffalo transmission line | Step-up transformation, $I^2R$ reduction, corona effect, bundled conductors |
| **35** | সাবস্টেশন কীভাবে কাজ করে? | Substations Explained | 10:30 | Early outdoor switching yards in early 20th-century grids | Busbar topologies, power transformers, isolators, lightning arresters |
| **36** | Distribution Network | Distribution Networks | 09:15 | Urban electrification transition from 33 kV down to 11 kV feeders | Radial vs ring-main topologies, reliability metrics |
| **37** | Distribution Transformer | Distribution Transformers | 09:00 | Evolution of pole-mounted utility equipment in rural grids | 11 kV to 433 V step-down, DP structures, horn gap fuses, earthing |
| **38** | বাড়ির Wiring, Earthing & Protection | Home Wiring & Earthing | 10:30 | Early domestic fires leading to National Electrical Code | Phase-neutral-earth wiring, plate/pipe earthing, soil resistance |
| **39** | Fuse, MCB, MCCB, RCCB | Protective Switchgear | 10:15 | 1880 Edison lead-wire fuse patent $\\rightarrow$ modern bimetal breakers | Inverse-time thermal trip, magnetic coil, residual current balance |
| **40** | Electrical Faults | Fault Analysis | 09:30 | High-speed photographic analysis of electrical arc faults | Short circuits, sustained overload, earth leakage, arc flash hazards |

### LEVEL 6 — MODERN ELECTRICAL POWER SYSTEMS (5 Episodes)
| No. | Bengali Title | English Title | Duration | Historical Hook | Key Concepts |
|---|---|---|---|---|---|
| **41** | বিদ্যুৎ ক্ষয় ও দক্ষতা | Power Losses & Efficiency | 08:45 | 1880s: Lord Kelvin's Economic Conductor Law | Copper losses, hysteresis/eddy losses, transmission efficiency |
| **42** | বিদ্যুৎ গ্রিড ও Frequency Control | Grid Sync & Frequency | 09:30 | 1965 Great Northeast Blackout: Grid cascading failure | 50.0 Hz governor control, spinning reserve, blackout recovery |
| **43** | Solar, Inverter ও Battery | Solar, Inverters & Storage | 09:45 | 1954 Bell Labs: Chapin, Fuller & Pearson silicon PV cell | PV p-n junction, MPPT algorithm, pure sine PWM, LiFePO4 storage |
| **44** | Power Quality ও Harmonics | Power Quality & Harmonics | 09:30 | 1980s: Proliferation of switching power supplies & rectifier distortion | Total Harmonic Distortion (THD), neutral conductor overheating |
| **45** | Smart Grid ও ভবিষ্যতের বিদ্যুৎ | Smart Grids & Microgrids | 09:45 | The 21st-century distributed energy transformation | Bidirectional metering, virtual power plants, EV grid integration |

### ADVANCED ENGINEERING EXTENSION (5 Episodes)
| No. | Bengali Title | English Title | Duration | Advanced Concepts |
|---|---|---|---|---|
| **46** | Three-Phase Induction & Synchronous Machines | 10:45 | Rotating magnetic field (RMF) mathematical proof, slip, torque-speed curves |
| **47** | Rectifiers, Inverters, PWM & Variable Frequency Drives | 11:00 | 3-phase diode bridges, IGBT gate switching, Sinusoidal PWM, VFD field control |
| **48** | RLC Circuits, Resonance & Transient Response | 10:30 | Second-order differential equations, under/overdamping, quality factor $Q$ |
| **49** | CT, PT, Protective Relays & Coordination | 12:00 | Instrument transformer saturation, IDMT curves, protective relay grading |
| **50** | Power System Analysis: Load Flow & Grid Stability | 12:15 | Swing equation, power angle $\\delta$, transient stability limits, HVDC links |
"""

# 3. EPISODE_DEPENDENCY_MAP.md
docs["EPISODE_DEPENDENCY_MAP.md"] = """# 🗺️ EPISODE DEPENDENCY MAP & HISTORICAL BRIDGES

```mermaid
flowchart TD
    subgraph L1["LEVEL 1: UNDERSTANDING ELECTRICITY"]
        EP01["EP01: What is Electricity?<br/>(600 BCE Amber to Modern Grid)"] --> EP02["EP02: Atoms & Electric Charge<br/>(1897 Thomson Cathode Ray)"]
        EP02 --> EP03["EP03: Static Electricity<br/>(1745 Leyden Jar Shock)"]
        EP02 --> EP04["EP04: Electric Field & Force<br/>(1785 Coulomb Torsion Balance)"]
        EP04 --> EP05["EP05: Potential & Voltage<br/>(1800 Volta Chemical Pile)"]
        EP05 --> EP06["EP06: Electric Current<br/>(1820 Ørsted Compass Deflection)"]
        EP06 --> EP07["EP07: Resistance & Conductivity<br/>(1826 Ohm Wire Experiments)"]
        EP07 --> EP08["EP08: Ohm's Law<br/>(1827 V=IR Formulations)"]
        EP08 --> EP09["EP09: Electric Circuits<br/>(1845 Kirchhoff Loop Laws)"]
    end

    subgraph L2["LEVEL 2: CIRCUITS & COMPONENTS"]
        EP09 --> EP10["EP10: Cells & Batteries<br/>(1836 Daniell Constant Cell)"]
        EP09 --> EP11["EP11: Circuit Diagrams & Symbols"]
        EP11 --> EP12["EP12: Series Circuits"]
        EP11 --> EP13["EP13: Parallel Circuits"]
        EP12 & EP13 --> EP14["EP14: Electrical Measurements"]
        EP14 --> EP15["EP15: Electrical Power (Watts)"]
        EP15 --> EP16["EP16: Energy and kWh"]
        EP16 --> EP17["EP17: Electrical Safety"]
        EP05 & EP07 --> EP18["EP18: Capacitors"]
    end

    subgraph L3["LEVEL 3: MAGNETISM & MACHINES"]
        EP06 --> EP19["EP19: Magnetism"]
        EP19 & EP06 --> EP20["EP20: Magnetic Effect of Current"]
        EP20 --> EP21["EP21: Electromagnets & Relays"]
        EP20 --> EP22["EP22: Magnetic Force on Conductor"]
        EP22 --> EP23["EP23: DC Motors"]
        EP20 --> EP24["EP24: Electromagnetic Induction"]
        EP24 --> EP25["EP25: Electric Generators"]
    end

    subgraph L4["LEVEL 4: AC ELECTRICITY"]
        EP25 --> EP26["EP26: AC vs DC Electricity"]
        EP26 --> EP27["EP27: Waveforms & Frequency"]
        EP27 --> EP28["EP28: Peak & RMS Values"]
        EP24 & EP26 --> EP29["EP29: Transformers"]
        EP27 & EP18 --> EP30["EP30: Impedance & Reactance"]
        EP27 & EP29 --> EP31["EP31: Three-Phase Electricity"]
        EP30 & EP31 --> EP32["EP32: Power Factor & kVAR"]
    end

    subgraph L5["LEVEL 5: POWER GRID TO HOME"]
        EP25 & EP31 --> EP33["EP33: Electricity Generation"]
        EP29 & EP33 --> EP34["EP34: High-Voltage Transmission"]
        EP34 --> EP35["EP35: Substations Explained"]
        EP35 --> EP36["EP36: Distribution Network"]
        EP36 --> EP37["EP37: Distribution Transformer"]
        EP37 & EP17 --> EP38["EP38: Home Wiring & Earthing"]
        EP38 --> EP39["EP39: Fuses & Circuit Breakers"]
        EP39 --> EP40["EP40: Electrical Fault Analysis"]
    end

    subgraph L6["LEVEL 6: MODERN POWER SYSTEMS"]
        EP34 & EP40 --> EP41["EP41: Power Losses & Efficiency"]
        EP33 & EP31 --> EP42["EP42: Grid Sync & Frequency Control"]
        EP26 & EP10 --> EP43["EP43: Solar, Inverters & Storage"]
        EP32 & EP43 --> EP44["EP44: Power Quality & Harmonics"]
        EP42 & EP44 --> EP45["EP45: Smart Grids & Microgrids"]
    end

    subgraph EXT["ADVANCED ENGINEERING EXTENSION"]
        EP31 & EP23 --> EP46["EP46: Induction & Synchronous Machines"]
        EP43 & EP26 --> EP47["EP47: Power Electronics & VFDs"]
        EP30 --> EP48["EP48: RLC Circuits & Transients"]
        EP35 & EP39 --> EP49["EP49: CT, PT & Protection Coordination"]
        EP42 & EP45 --> EP50["EP50: Power System Analysis & Stability"]
    end
```
"""

# 4. VISUAL_STYLE_GUIDE.md
docs["VISUAL_STYLE_GUIDE.md"] = """# 🎨 VISUAL STYLE GUIDE — বিদ্যুতের পাঠশালা
*Dual-Register Historical Parchment/Chiaroscuro & Modern Scientific Lab*

---

## 1. Dual-Register Color Palettes

### 1.1 Historical Era Register (Stages 1–2)
Used during ancient discoveries, classical experiments, and chronological timelines:

| Token | Hex | Semantic Meaning |
|---|---|---|
| `hist-charcoal` | `#161311` | Deep aged ink canvas / nighttime chamber shadow |
| `hist-parchment`| `#F2E5CE` | Aged parchment paper, manuscript background |
| `hist-amber` | `#D9822B` | Warm oil lamp glow, Baltic amber stone (*elektron*) |
| `hist-brass` | `#B8860B` | Antique scientific instruments, Leyden jar rods, compass rings |
| `hist-sepia` | `#2C1E16` | Vignette shading, hand-drawn vector hatching |

### 1.2 Scientific Era Register (Stages 3–4)
Used for microscopic mechanisms, quantum electron clouds, circuits, and technical explainers:

| Token | Hex | Semantic Meaning |
|---|---|---|
| `sci-navy` | `#0B1120` | Deep observatory void, low-reflection background |
| `sci-card` | `#1E293B` | Structural component backing, info badges |
| `electron-cyan` | `#38BDF8` | Negative charge carrier / Electrons ($e^-$), high-voltage field lines |
| `proton-coral` | `#F43F5E` | Positive charge carrier / Protons ($p^+$), atomic nucleus |
| `neutron-slate`| `#94A3B8` | Neutral subatomic mass / Neutrons ($n^0$) |
| `energy-gold` | `#FBBF24` | Thermal radiation, luminous bulb filament, mechanical work |
| `field-violet` | `#A78BFA` | Electric field lines (emerging from $+$ to $-$) |
| `field-emerald`| `#34D399` | Magnetic flux lines (emerging from N to S) |

---

## 2. Indic Bengali Typography & Text-Shaping Layer
Bengali script requires complex Indic shaping (যুক্তাক্ষর, হসন্ত, ফলা, কার-চিহ্ন, চন্দ্রবিন্দু).
- **Mandatory Compositor:** Chromium headless DOM with HarfBuzz/Skia text shaping.
- **Font Hierarchy:**
  - **Headings & Chapters:** `Noto Serif Bengali` or `Hind Siliguri` (weights 700, 800).
  - **Scientific Labels & Body:** `Noto Sans Bengali` (weights 500, 600).
  - **Numerals & Formulas:** `Inter` / `JetBrains Mono` at matched optical scale.
- **Automated QA Check:** Verify zero broken conjuncts (`ক্ষ`, `জ্ঞ`, `ত্র`, `স্ত`, `ন্দ`, `বৈদ্যুতিক`, `চুম্বকত্ব`).

---

## 3. Timeline Scale & Discontinuity Rule
Where large chronological gaps occur (e.g., `c. 600 BCE` $\rightarrow$ `1600 CE`):
- NEVER plot them linearly across the screen.
- Render an explicit **animated broken-axis symbol (`//` zig-zag)** with a compressed-time indicator:
  ```text
  [ c. 600 BCE: Thales ] ------// (2200 Years Gap) //------> [ 1600 CE: Gilbert ]
  ```

---

## 4. Atomic Electron-Cloud Visualization Standard
- **Prohibited:** Never depict electrons as tiny hard spheres orbiting on rigid concentric circular tracks (naive planetary Bohr model).
- **Mandatory:** Render a central nucleus of tightly bound protons (`#F43F5E`) and neutrons (`#94A3B8`), enveloped in a soft, radiant, probabilistic **electron cloud** (`#38BDF8`) with subtle quantum density wave oscillations.
"""

# 5. PRODUCTION_GUIDELINES.md
docs["PRODUCTION_GUIDELINES.md"] = """# 🎬 PRODUCTION GUIDELINES — 12-STEP PIPELINE
*Flagship Standard for "বিদ্যুতের পাঠশালা"*

Every episode strictly proceeds through these 12 gates:

### Phase A: Research & Scripting
1. **Historical Research Gate (`history_research.md`):** Sourcing primary and secondary classical/academic papers. No invented quotes or lone-genius myths.
2. **Scientific Accuracy Review (`science_review.md`):** Mathematical validation, conservation checks, and common student misconception audits.
3. **Analogy Construction (`analogy_notes.md`):** Formulate grounding metaphor and map its explicit boundaries.
4. **Bilingual Scripting (`script_bn.md` & `script_en_notes.md`):** Evocative Bengali narration (`~125–140 WPM`) with measured pauses.

### Phase B: Visual & Motion Choreography
5. **Timeline & Geometry Specification (`timeline_design.md`):** Mathematical coordinate maps for the broken-axis historical timeline.
6. **Scene-by-Scene Storyboard (`storyboard.md`):** Shot framing, 2.5D parallax depth, camera zooms, and transition morphs.
7. **Vector Assets Inventory (`visual_assets.md`):** Creation of resolution-independent SVGs with dual-register palettes.

### Phase C: Implementation, Audio & Mastering
8. **Programmatic Remotion Implementation:** Modular React components for historical vignettes, broken-axis timelines, and circuit simulators.
9. **3-Bus Audio Mastering:**
   - Voiceover: Centered mono, `-14 LUFS` integrated, de-essed, high-pass at 80 Hz.
   - Music Bed: Period acoustic $\rightarrow$ modern synth, ducked `-18 dB` to `-22 dB` during speech.
   - Foley/SFX: Tactile, synchronized non-fatiguing sound effects.
10. **Automated QA Verification:** Checking zero broken Indic ligatures, safe-zone compliance (title safe 90%), and audio ceiling (`-1.0 dBTP`).
11. **Video Encoding:** High Profile H.264, CRF 16–18, AAC 320 kbps stereo, faststart enabled.
12. **Student Learning Package:** Bengali SRT subtitles, 5-question assessment quiz (`quiz.md`), and bilingual glossary (`glossary.md`).
"""

for fname, content in docs.items():
    fpath = os.path.join(base_docs_dir, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print(f"All 5 master architecture docs successfully updated in {base_docs_dir}")
