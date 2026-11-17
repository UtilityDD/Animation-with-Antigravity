# -*- coding: utf-8 -*-
"""
Generate comprehensive docs for VIDYUTER PATHSHALA
"""

import os

base_docs_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA\docs"
os.makedirs(base_docs_dir, exist_ok=True)

docs = {}

# 1. PROJECT_OVERVIEW.md
docs["PROJECT_OVERVIEW.md"] = """# ⚡ বিদ্যুতের পাঠশালা (Electricity Explained)
## Master Project Overview & Vision Statement

### 1.1 Project Identity
- **Bengali Title:** বিদ্যুতের পাঠশালা
- **English Title:** Electricity Explained — From Zero to the Power Grid
- **Tagline:** *শূন্য থেকে বিদ্যুতের জগৎকে বোঝা।*
- **Format:** High-definition 1080p 60fps / 30fps scientific animated explainer series.
- **Language:** Standard formal conversational Bengali narration with international standard English technical terminology displayed on screen.

### 1.2 Target Audience
- **School Students:** Class 8–12 (West Bengal Board WBCHSE, WBBSE, CBSE, ICSE).
- **Competitive Aspirants:** JEE Main/Advanced, NEET (Physics), WBJEE.
- **Vocational & Technical:** ITI (Electrician, Wireman) and Polytechnic Diploma in Electrical Engineering.
- **Undergraduate Engineers:** B.Tech / B.E. 1st & 2nd year Electrical & Electronics Engineering foundation.
- **General Public:** Curious Bengali-speaking learners seeking intuitive understanding of daily electricity and power systems.

### 1.3 Pedagogical Philosophy
1. **Concept Before Formula:** Physical intuition and visual models are established before introducing equations.
2. **Visualization Before Memorization:** No static diagrams; charges flow, fields bend, and magnetic flux rotates dynamically.
3. **Mechanism Before Definition:** Rather than reciting definitions, we demonstrate *how* microscopic interactions yield macroscopic electrical laws.
4. **Meaningful Analogies:** Physical analogies (gravitational height, crowds, narrow corridors) illustrate relationships, immediately accompanied by explicit boundary conditions where the analogy fails.
5. **Rigorous Scientific Integrity:** Adherence to Maxwell's equations, semiconductor physics, and electrical engineering standards (IS/IEC).
"""

# 2. MASTER_CURRICULUM.md
docs["MASTER_CURRICULUM.md"] = """# 📚 MASTER CURRICULUM (50 EPISODES)
## Electricity Explained — From Zero to the Power Grid

### LEVEL 1 — UNDERSTANDING ELECTRICITY (Beginner | 9 Episodes)
*Foundational physics of charge, voltage, current, resistance and simple circuits.*

| No. | Bengali Title | English Title | Duration | Key Concepts |
|---|---|---|---|---|
| **01** | বিদ্যুৎ আসলে কী? | What Exactly Is Electricity? | 6m 15s | Nature of charge, protons/electrons, static vs current, basic circuit |
| **02** | পরমাণু ও বৈদ্যুতিক চার্জ | Atoms and Electric Charge | 8 min | Atomic structure, valence electrons, Coulomb's Law, free electron sea |
| **03** | স্থির তড়িৎ | Static Electricity | 7 min | Triboelectric effect, induction, electroscope, lightning mechanism |
| **04** | বৈদ্যুতিক বল ও ক্ষেত্র | Electric Force and Electric Field | 8 min | Electric field lines, vector fields, permittivity, dipole fields |
| **05** | বিভব ও বিভব পার্থক্য | Electric Potential and Voltage | 8 min | Potential energy, work done in field, Volts (J/C), height analogy |
| **06** | তড়িৎ প্রবাহ | Electric Current | 7 min | Drift velocity vs signal speed, Ampere (C/s), conventional vs electron flow |
| **07** | রোধ ও পরিবাহিতা | Resistance and Conductivity | 8 min | Resistivity, factors affecting R ($R = \\rho L/A$), conductors, insulators, semiconductors |
| **08** | ওহমের সূত্র | Ohm's Law | 9 min | $V=IR$ physical intuition, linear vs non-linear loads, IV curves |
| **09** | বৈদ্যুতিক বর্তনী | Electric Circuits | 7 min | Closed loops, schematic symbols, load, source, switches, continuity |

### LEVEL 2 — CIRCUITS AND ELECTRICAL COMPONENTS (Beginner to Intermediate | 9 Episodes)
| No. | Bengali Title | English Title | Duration | Key Concepts |
|---|---|---|---|---|
| **10** | সেল ও ব্যাটারি | Cells and Batteries | 8 min | Chemical reactions, cathode/anode, internal resistance, battery types |
| **11** | সার্কিট ডায়াগ্রাম ও প্রতীক | Circuit Diagrams and Symbols | 7 min | Standard IEEE/IEC symbols, reading schematics, breadboard mapping |
| **12** | শ্রেণি সংযোগ | Series Circuits | 8 min | Current conservation, voltage division ($V = V_1 + V_2$), equivalent $R_{eq}$ |
| **13** | সমান্তরাল সংযোগ | Parallel Circuits | 8 min | Voltage equality, current branching ($I = I_1 + I_2$), household parallel wiring |
| **14** | বৈদ্যুতিক পরিমাপ | Measuring Voltage, Current & Resistance | 9 min | Multimeter internal mechanism, shunt resistors, voltmeter loading |
| **15** | বৈদ্যুতিক ক্ষমতা | Electrical Power | 8 min | Watts, $P = VI = I^2R = V^2/R$, Joule heating, thermal management |
| **16** | বৈদ্যুতিক শক্তি ও ইউনিট | Energy and kWh | 8 min | Joule vs kWh, electric meter reading, electricity bill calculation |
| **17** | বিদ্যুৎ নিরাপত্তা | Electrical Safety | 8 min | Body resistance, lethal current thresholds, shock pathways, water hazard |
| **18** | ধারক ও ক্যাপাসিট্যান্স | Capacitors | 9 min | Dielectric polarization, capacitance $C=Q/V$, energy storage, RC charging |

### LEVEL 3 — MAGNETISM AND ELECTRICAL MACHINES (Intermediate | 7 Episodes)
| No. | Bengali Title | English Title | Duration | Key Concepts |
|---|---|---|---|---|
| **19** | চৌম্বকত্ব | Magnetism | 8 min | Magnetic poles, dipole field lines, domain theory, Earth's magnetism |
| **20** | বিদ্যুৎ থেকে চৌম্বক ক্ষেত্র | Magnetic Effect of Current | 8 min | Oersted's discovery, Right-Hand Grip Rule, Biot-Savart intuition |
| **21** | তড়িৎচুম্বক ও রিলে | Electromagnets and Relays | 8 min | Solenoids, ferromagnetic core saturation, electromechanical relays |
| **22** | চৌম্বক ক্ষেত্রে তারের উপর বল | Magnetic Force on Conductor | 8 min | Lorentz force, Fleming's Left-Hand Rule, torque on a current loop |
| **23** | DC মোটর | DC Motors | 9 min | Split-ring commutator, brush assembly, back EMF, speed control |
| **24** | তড়িৎচৌম্বকীয় আবেশ | Electromagnetic Induction | 9 min | Faraday's experiments, Lenz's law, magnetic flux change, induced EMF |
| **25** | জেনারেটর কীভাবে কাজ করে? | Electric Generators | 9 min | AC slip rings vs DC commutator, mechanical to electrical conversion |

### LEVEL 4 — AC ELECTRICITY AND ADVANCED CONCEPTS (Intermediate to Advanced | 7 Episodes)
| No. | Bengali Title | English Title | Duration | Key Concepts |
|---|---|---|---|---|
| **26** | AC ও DC বিদ্যুৎ | Alternating and Direct Current | 8 min | Historical War of Currents, sinusoidal reversal, transmission advantage |
| **27** | AC তরঙ্গ, সময়কাল ও কম্পাঙ্ক | Waveforms, Period & Frequency | 9 min | Sine wave anatomy, period $T$, frequency $f$ (50 Hz), angular velocity $\\omega$ |
| **28** | Peak ও RMS Voltage | Peak and RMS Values | 8 min | Effective heating value, $V_{rms} = V_{peak}/\\sqrt{2}$, 230V vs 325V peak |
| **29** | ট্রান্সফরমার | Transformers | 9 min | Mutual induction, turns ratio $V_p/V_s = N_p/N_s$, core losses, step-up/down |
| **30** | Resistance, Reactance & Impedance | R, X & Z | 10 min | Inductive reactance $X_L$, capacitive reactance $X_C$, phasor diagrams |
| **31** | থ্রি-ফেজ বিদ্যুৎ | Three-Phase Electricity | 10 min | $120^\\circ$ phase offset, star (wye) vs delta, line vs phase voltages, neutral |
| **32** | Power Factor ও Reactive Power | Power Factor & Reactive Power | 10 min | Apparent (kVA), active (kW), reactive (kVAR), power triangle, capacitor banks |

### LEVEL 5 — FROM POWER STATION TO YOUR HOME (Advanced Practical EE | 8 Episodes)
| No. | Bengali Title | English Title | Duration | Key Concepts |
|---|---|---|---|---|
| **33** | বিদ্যুৎ উৎপাদন | Electricity Generation | 8 min | Thermal, hydro, nuclear, renewable generation, turbine alternator |
| **34** | বিদ্যুৎ সঞ্চালন | High-Voltage Transmission | 8 min | 400 kV/220 kV/132 kV towers, corona effect, bundled conductors, insulators |
| **35** | সাবস্টেশন কীভাবে কাজ করে? | Substations | 10 min | Busbars, power transformers, isolators, lightning arresters, control room |
| **36** | Distribution Network | Electricity Distribution | 9 min | 33 kV primary & 11 kV secondary feeders, radial vs ring main topologies |
| **37** | Distribution Transformer | Distribution Transformers | 8 min | 11 kV to 433 V step-down, DP structure, horn gap fuse, neutral grounding |
| **38** | বাড়ির Wiring, Earthing & Protection | Home Wiring & Earthing | 10 min | Phase, neutral, earth layout, pipe/plate earthing, soil resistivity |
| **39** | Breakers: Fuse, MCB, RCCB | Protective Switching | 10 min | Rewirable fuse, bimetallic MCB trip, magnetic coil, RCCB residual sensing |
| **40** | Electrical Faults | Fault Analysis | 9 min | Short circuits, sustained overload, earth leakage, arcing dangers |

### LEVEL 6 — MODERN ELECTRICAL POWER SYSTEMS (Advanced | 5 Episodes)
| No. | Bengali Title | English Title | Duration | Key Concepts |
|---|---|---|---|---|
| **41** | বিদ্যুৎ ক্ষয় ও দক্ষতা | Power Losses & Efficiency | 8 min | $I^2R$ copper loss, iron hysteresis/eddy losses, grid efficiency factors |
| **42** | বিদ্যুৎ গ্রিড ও Frequency Control | Grid Sync & Frequency | 9 min | 50.0 Hz load-generation balancing, spinning reserve, grid collapse & black start |
| **43** | Solar, Inverter ও Battery | Solar, Inverters & Storage | 9 min | PV cells, MPPT charge controllers, pure sine wave inverters, LiFePO4 storage |
| **44** | Power Quality ও Harmonics | Power Quality & Harmonics | 9 min | Total Harmonic Distortion (THD), non-linear loads, active filters |
| **45** | Smart Grid ও ভবিষ্যতের বিদ্যুৎ | Smart Grids & Future Power | 9 min | Smart meters, bidirectional energy flow, microgrids, EV charging impact |

### ADVANCED ENGINEERING EXTENSION (Advanced EE | 5 Episodes)
| No. | Bengali Title | English Title | Duration | Key Concepts |
|---|---|---|---|---|
| **46** | Three-Phase Induction & Sync Machines | Industrial Motors | 10 min | Rotating magnetic field (RMF), slip, squirrel cage rotor, synchronous pull-in |
| **47** | Rectifiers, Inverters, PWM & VFDs | Power Electronics Drives | 10 min | Diode bridges, IGBT switching, Sinusoidal PWM, variable frequency speed control |
| **48** | RLC Circuits, Resonance & Transients | Transient Response | 10 min | Second-order differential response, quality factor $Q$, switching overvoltages |
| **49** | CT, PT, Protective Relays & Coordination | Protection Coordination | 12 min | Instrument transformers, IDMT relays, time-current grading, zone selectivity |
| **50** | Power System Analysis & Grid Stability | Grid Stability Analysis | 12 min | Swing equation, load flow equations, transient stability, HVDC links |
"""

# 3. EPISODE_DEPENDENCY_MAP.md
docs["EPISODE_DEPENDENCY_MAP.md"] = """# 🗺️ EPISODE DEPENDENCY MAP & LEARNING PREREQUISITES

```mermaid
flowchart TD
    EP01["EP01: What is Electricity?"] --> EP02["EP02: Atoms & Charge"]
    EP02 --> EP03["EP03: Static Electricity"]
    EP02 --> EP04["EP04: Electric Field & Force"]
    EP04 --> EP05["EP05: Potential & Voltage"]
    EP05 --> EP06["EP06: Current"]
    EP06 --> EP07["EP07: Resistance"]
    EP07 --> EP08["EP08: Ohm's Law"]
    EP08 --> EP09["EP09: Circuits"]

    EP09 --> EP10["EP10: Cells & Batteries"]
    EP09 --> EP11["EP11: Schematics"]
    EP11 --> EP12["EP12: Series Circuits"]
    EP11 --> EP13["EP13: Parallel Circuits"]
    EP12 & EP13 --> EP14["EP14: Measurements"]
    EP14 --> EP15["EP15: Power (Watts)"]
    EP15 --> EP16["EP16: Energy (kWh)"]
    EP16 --> EP17["EP17: Safety"]
    EP05 & EP07 --> EP18["EP18: Capacitors"]

    EP06 --> EP19["EP19: Magnetism"]
    EP19 & EP06 --> EP20["EP20: Magnetic Effect"]
    EP20 --> EP21["EP21: Electromagnets & Relays"]
    EP20 --> EP22["EP22: Force on Conductor"]
    EP22 --> EP23["EP23: DC Motors"]
    EP20 --> EP24["EP24: EM Induction"]
    EP24 --> EP25["EP25: Generators"]

    EP25 --> EP26["EP26: AC vs DC"]
    EP26 --> EP27["EP27: Waveforms & Freq"]
    EP27 --> EP28["EP28: RMS Voltage"]
    EP24 & EP26 --> EP29["EP29: Transformers"]
    EP27 & EP18 --> EP30["EP30: Reactance & Z"]
    EP27 & EP29 --> EP31["EP31: Three-Phase"]
    EP30 & EP31 --> EP32["EP32: Power Factor"]

    EP25 & EP31 --> EP33["EP33: Generation"]
    EP29 & EP33 --> EP34["EP34: Transmission"]
    EP34 --> EP35["EP35: Substations"]
    EP35 --> EP36["EP36: Distribution"]
    EP36 --> EP37["EP37: Dist. Transformer"]
    EP37 & EP17 --> EP38["EP38: Home Wiring & Earth"]
    EP38 --> EP39["EP39: Fuse & Breakers"]
    EP39 --> EP40["EP40: Faults"]

    EP34 & EP40 --> EP41["EP41: Power Losses"]
    EP33 & EP31 --> EP42["EP42: Grid Frequency"]
    EP26 & EP10 --> EP43["EP43: Solar & Inverter"]
    EP32 & EP43 --> EP44["EP44: Harmonics"]
    EP42 & EP44 --> EP45["EP45: Smart Grids"]
```
"""

# 4. VISUAL_STYLE_GUIDE.md
docs["VISUAL_STYLE_GUIDE.md"] = """# 🎨 VISUAL STYLE GUIDE — বিদ্যুতের পাঠশালা

## 1. Palette Specifications
Our series utilizes an intentional scientific dark-mode aesthetic with vibrant semantic indicators:

| Token | Hex | Role | Semantic Meaning |
|---|---|---|---|
| `bg-primary` | `#0B0F19` | Master Stage Background | Cosmic void, microscopic canvas |
| `bg-card` | `#161F30` | Info Panels & Component Bases | Grounded structural context |
| `brand-cyan` | `#00F0FF` | Primary Signal / Lightning / E-Field | High-voltage energy, electric activity |
| `electron-blue`| `#38BDF8` | Negative Charge / Electron ($e^-$) | Moving charge carrier, cool polarity |
| `proton-gold` | `#F59E0B` | Positive Charge / Proton ($p^+$) | Nucleus binding, warm polarity |
| `neutron-slate`| `#64748B` | Neutral / Neutron ($n^0$) | Charge-neutral subatomic mass |
| `current-amber`| `#FBBF24` | Conventional Current ($I$) | Macro circuit flow (+ to -) |
| `danger-red` | `#EF4444` | High Voltage / Short Circuit / Fault | Warning, thermal overload, danger |
| `success-green`| `#10B981` | Safety / Ground Earth / Correct Path | Safe return, balanced operation |
| `text-pure` | `#FFFFFF` | Primary Bengali & English Headings | High contrast readability |
| `text-muted` | `#94A3B8` | Explanatory subtext & annotations | Secondary technical data |

## 2. Typography Rules
- **Bengali Primary Font:** `Hind Siliguri` (SemiBold for Body, Bold for Headings) with fallback to `Noto Sans Bengali`.
- **English / Numerical Font:** `Inter`, `Roboto`, or `Segoe UI` for mathematical formulas, constants, and IEEE symbols.
- **Hierarchy:**
  - Episode Master Title: `44px - 56px`, Bold, Center.
  - Scene Subhead: `32px - 38px`, SemiBold.
  - Component Callout: `22px - 26px`, Medium with subtle glowing pill badge.
  - Subtitle Box: `26px - 30px`, SemiBold, White on frosted translucent backdrop (`rgba(11, 15, 25, 0.85)`).

## 3. Motion & Transition Vocabulary
- **Charge Drift:** Electron drift is animated with slow steady progression (never blinding or sonic speed) with subtle jitter indicating thermal agitation.
- **Signal Wavefront:** When a switch closes, a radiant impulse wavefront propagates at near light speed down the wire, instantly establishing the electric field before steady drift proceeds.
- **Field Lines:** Always emerge outward from positive (+) charges and terminate on negative (-) charges. Never cross each other.
- **Circuit State Indicators:**
  - Open Switch: Visible air gap, glowing disconnected terminals.
  - Closed Switch: Crisp mechanical snap, instant completion of cyan wire glow.
"""

# 5. SCIENCE_ACCURACY_GUIDE.md
docs["SCIENCE_ACCURACY_GUIDE.md"] = """# 🔬 SCIENCE ACCURACY GUIDE — বিদ্যুতের পাঠশালা
*Non-negotiable scientific rules for all 50 episodes.*

### 1. Charges Are Conserved, Never Consumed
- **Rule:** A lightbulb or resistor converts electrical potential energy into thermal radiation and photons. It does **NOT** consume or destroy electrons.
- **Check:** Every electron entering a lightbulb filament at terminal A exits terminal B. The rate of charge entry ($I_{in}$) equals the rate of charge exit ($I_{out}$).

### 2. Signal Propagation Speed vs. Electron Drift Velocity
- **Misconception:** Electrons do not sprint through copper wires at 300,000 km/s.
- **Fact:** The individual electron drift velocity ($v_d$) in typical household copper wiring is microscopic—roughly 0.1 mm/s to 1 mm/s!
- **Fact:** What propagates at nearly the speed of light ($c \\approx 0.7 - 0.95c$) is the **Poynting vector / electromagnetic energy wavefront** along the conductors.

### 3. Conventional Current vs. Electron Flow
- **Engineering Reality:** By historical convention (Benjamin Franklin), conventional current is designated as flowing from positive (+) to negative (-).
- **Physical Reality:** In metallic conductors, conduction electrons (negative charge) drift from negative (-) to positive (+).
- **Visual Mandate:** When displaying circuit loops, always visually distinguish between:
  - Yellow/Amber arrow labeled: **তড়িৎ প্রবাহ (Conventional Current: $+$ to $-$)**
  - Cyan dotted line labeled: **ইলেকট্রন প্রবাহ (Electron Drift: $-$ to $+$)**

### 4. Static Electricity is Charge Transfer, Not Creation
- **Fact:** Rubbing amber, plastic combs, or glass does not create new electrons. It transfers outer-shell valence electrons across the contact interface due to differences in electron affinity (Triboelectric series).

### 5. Batteries Provide Potential Energy, Not Charge Creation
- **Fact:** A battery is an electrochemical pump. It does not contain an infinite well of created charge; it performs work on existing charges, separating them to create an electrostatic potential difference (EMF) across terminals.

### 6. Ground / Earthing is a Safety Pathway
- **Fact:** An earth conductor is designed to carry low-impedance fault current to blow a fuse or trip an RCCB in the event of an insulation breakdown. It is not intended as a regular neutral return conductor for household appliances.
"""

# 6. BENGALI_TERMINOLOGY.md
docs["BENGALI_TERMINOLOGY.md"] = """# 📖 BENGALI TERMINOLOGY DATABASE (বিজ্ঞান ও প্রকৌশল শব্দকোষ)

| English Term | Standard Bengali Term | Phonetic Spoken Guide | Visual Label Context |
|---|---|---|---|
| Electricity | বিদ্যুৎ / তড়িৎ | Bidyut / Torit | Series & Episode Header |
| Electric Charge | বৈদ্যুতিক আধান / চার্জ | Baidyutik Adhan / Charge | Atom & Static scenes |
| Positive Charge | ধনাত্মক চার্জ | Dhonatmak Charge | Proton ($p^+$) |
| Negative Charge | ঋণাত্মক চার্জ | Rinatmak Charge | Electron ($e^-$) |
| Static Electricity | স্থির তড়িৎ | Sthir Torit | Comb, hair, balloon |
| Current Electricity | চল তড়িৎ / তড়িৎ প্রবাহ | Cholo Torit / Torit Probaho | Circuits & flow |
| Electric Potential | বৈদ্যুতিক বিভব | Baidyutik Bibhob | Field energy level |
| Potential Difference | বিভব পার্থক্য (ভোল্টেজ) | Bibhob Parthokko (Voltage) | Across battery terminals |
| Voltage | ভোল্টেজ | Voltage | Voltmeter readings |
| Resistance | রোধ | Rodh | Resistor symbol, friction |
| Conductor | সুপরিবাহী | Suporibahi | Copper, aluminium |
| Insulator | কুপরিবাহী / অন্তরক | Kuporibahi / Ontorok | Plastic, rubber, glass |
| Semiconductor | অর্ধপরিবাহী | Ordho-poribahi | Silicon, germanium |
| Circuit | বৈদ্যুতিক বর্তনী / সার্কিট | Baidyutik Bortoni / Circuit | Battery-switch-load loop |
| Closed Circuit | বদ্ধ বর্তনী | Boddho Bortoni | Switch closed, bulb ON |
| Open Circuit | মুক্ত বর্তনী | Mukto Bortoni | Switch open, bulb OFF |
| Short Circuit | শর্ট সার্কিট / প্রত্যক্ষ সংযোগ | Short Circuit | Zero-resistance fault |
| Transformer | ট্রান্সফরমার / রূপান্তরক | Transformer | Substation & poles |
| Electromagnetic Induction | তড়িৎচৌম্বকীয় আবেশ | Toritchoumbokiyo Abesh | Faraday's coil |
| Earthing / Grounding | আর্থিং / ভূ-সংযোজন | Earthing / Bhu-songjojon | Safety earthing rod |
"""

# 7. ANALOGY_LIBRARY.md
docs["ANALOGY_LIBRARY.md"] = """# ⚖️ ANALOGY LIBRARY & BOUNDARY CONDITIONS

Every educational analogy in *বিদ্যুতের পাঠশালা* is paired with its scientific boundaries:

### 1. Voltage as Gravitational Height Difference
- **Analogy:** Water pumped to a high water tank gains potential energy; when released, it flows downwards through pipes.
- **Match:** Just as greater height difference causes water to flow with greater pressure, a higher potential difference ($V$) exerts stronger electromotive force on charges.
- **Breakdown Point:** Water requires a physical container (pipe) and gravity acts downward; electrical potential is created by electromagnetic field distributions and functions in zero gravity or any spatial orientation.

### 2. Electric Current as People Moving Through a Corridor
- **Analogy:** The number of people passing through a turnstile gate per second.
- **Match:** $I = Q/t$. More people passing per second corresponds to higher amperes (Coulombs per second).
- **Breakdown Point:** People have individual free will and stop; electrons in a conductor move as an ensemble whose macroscopic drift is determined by the applied electric field.

### 3. Electrical Resistance as a Narrowed, Obstacle-Filled Passage
- **Analogy:** A crowded room with pillars where people bump into obstacles and lose momentum.
- **Match:** Conduction electrons collide with vibrating lattice ions of the conductor, converting kinetic energy into thermal vibration (Joule heating).
- **Breakdown Point:** People slow down overall; in a steady-state conductor, the constant electric field immediately re-accelerates electrons between collisions, maintaining a steady average drift velocity.

### 4. Capacitor as an Elastic Diaphragm / Spring
- **Analogy:** A flexible rubber membrane stretched across a water pipe that blocks steady flow but deflects, storing elastic energy.
- **Match:** Direct current (DC) cannot cross the dielectric gap; instead, charge accumulates on the plates, storing energy electrostatically.
"""

# 8. AUDIO_GUIDELINES.md
docs["AUDIO_GUIDELINES.md"] = """# 🎙️ AUDIO GUIDELINES & SOUND DESIGN STANDARDS

### 1. Voiceover Synthesis
- **Voice Engine:** Microsoft Edge TTS Neural.
- **Selected Voice:** `bn-IN-BashkarNeural` (Warm, authoritative, natural Indian Bengali male educator) / `bn-IN-TanishaaNeural`.
- **Speech Rate:** Normal (`+0%`) to `-2%` for scientific explanations to guarantee crystal clear diction of technical terms.
- **Pitch:** Neutral (`+0Hz`).
- **Processing:** Converted to 48 kHz stereo WAV/MP3, normalized to -16 LUFS integrated loudness with peak limiting at -1.0 dBFS.

### 2. Ambient Soundtrack
- **Style:** Minimalist, warm scientific ambient pad (subtle analog synth, Rhodes piano chords, gentle arpeggios).
- **Mixing Level:** Ducked dynamically behind narration:
  - Dialogue passages: `-24 dB` to `-28 dB`.
  - Scene transitions / pauses: swells smoothly to `-16 dB`.

### 3. Synchronized Foley & Sound Effects (SFX)
- `switch_click`: Tactile mechanical click on switch toggle.
- `light_hum`: Warm 50 Hz sub-bass hum when current initiates in the filament.
- `charge_spark`: Subtle high-frequency crackle on static comb attraction.
- `atom_chime`: Soft ethereal resonance when zooming into the atomic nucleus.
"""

# 9. PRODUCTION_GUIDELINES.md
docs["PRODUCTION_GUIDELINES.md"] = """# 🎬 PRODUCTION GUIDELINES — 12-STEP LIFECYCLE

Every episode of *বিদ্যুতের পাঠশালা* executes this formal 12-step pipeline:

1. **Prerequisites & Objectives:** State what the student must already know and what 3-5 concepts they will master.
2. **Scientific Verification:** Verify formulas and laws against standard textbooks (NCERT, Halliday-Resnick, Theraja).
3. **Misconception Audit:** Enumerate errors students bring into the lesson and plan explicit visual debunks.
4. **Analogy Construction:** Formulate the physical metaphor and document its limitations.
5. **Bengali Narration Script:** Draft spoken dialogue ensuring natural cadence and Bengali phonetics.
6. **Scene-by-Scene Storyboard:** Map exact second-by-second timestamps and camera visual framing.
7. **Vector Scientific Diagrams:** Build clean, scalable SVG components for every circuit, charge, and machine.
8. **Remotion Composition:** Code the timeline animation in React with dynamic springs and interpolations.
9. **Audio Integration:** Synthesize Bengali TTS, layer ambient background music, and sync tactile sound effects.
10. **Scientific Quality Review:** Check frame-by-frame for direction arrows, polarity symbols, and units.
11. **Render & Video Inspection:** Execute multi-thread Remotion render to 1080p MP4 and verify playback.
12. **Accompanying Learning Package:** Generate SRT subtitles, student comprehension quiz, and bilingual glossary.
"""

for fname, content in docs.items():
    fpath = os.path.join(base_docs_dir, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print(f"All 9 comprehensive docs successfully generated in {base_docs_dir}")
