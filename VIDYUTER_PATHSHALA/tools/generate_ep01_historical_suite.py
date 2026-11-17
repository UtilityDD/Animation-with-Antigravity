# -*- coding: utf-8 -*-
"""
Generate complete Phase 2 pre-production suite for Episode 01:
বিদ্যুৎ আসলে কী? — বিদ্যুতের রহস্য থেকে আধুনিক বিজ্ঞানের যাত্রা
"""

import os

ep01_dir = r"c:\Users\rouma\Desktop\Dipankar\Animation with Antigravity\VIDYUTER_PATHSHALA\episodes\EP01"
os.makedirs(ep01_dir, exist_ok=True)

files = {}

# 1. history_research.md
files["history_research.md"] = """# 📜 EPISODE 01: HISTORICAL RESEARCH & SOURCING DOSSIER
**Topic:** বিদ্যুৎ আসলে কী? (What Exactly Is Electricity? — From Mystery to Modern Science)

---

## 1. Primary & Secondary Academic Citations

### 1.1 Ancient Observations (c. 600 BCE)
- **Primary Source Attributions:** Aristotle (*De Anima* 405a19) notes Thales attributed a "soul" (*psyche*) to magnetic and amber stones because they produce physical movement. Diogenes Laertius (*Lives of Eminent Philosophers*, Book 1, 24) corroborates Thales' demonstration of rubbed amber (*elektron*) attracting straw and dry feathers.
- **Materiality:** Baltic amber (fossilized tree resin from *Pinus succinifera*) traded along ancient amber routes across the Mediterranean. Its high surface resistivity ($>10^{16}\\,\\Omega\\cdot\\text{m}$) and work function disparity with sheep wool facilitate triboelectric valence electron accumulation.
- **Historical Calibrated Framing:** Thales observed empirical static attraction. He did **NOT** formulate a concept of "electricity"; he identified an anomalous motive property in rubbed resin.

### 1.2 Renaissance & Enlightenment Codification (1600–1752)
- **William Gilbert (1600):** *De Magnete, Magneticisque Corporibus, et de Magno Magnete Tellure* (London). Coined the Neo-Latin adjective *electricus* ("like amber", from Greek *ēlektron*). Invented the *versorium* (a pivoting metallic needle electroscope), proving amber-like attraction is not unique to amber but shared by glass, sulfur, sealing wax, and gems (*electrics* vs *non-electrics*).
- **The Leyden Jar (1745–1746):** Independently invented by Ewald Georg von Kleist (Kammin, Pomerania, October 1745) and Pieter van Musschenbroek (Leiden, Netherlands, January 1746). Proved electric charge could be accumulated, stored electrostatically inside a glass dielectric, and discharged in powerful explosive shocks.
- **Benjamin Franklin (1752):** *Experiments and Observations on Electricity* (London, 1751–1754). The Philadelphia June 1752 Kite Experiment.
  - *Critical Myth Clarification:* Lightning did **NOT** strike Franklin's kite. Had a direct bolt struck the silk kite, Franklin would have suffered immediate lethal cardiac arrest. The kite drew ambient atmospheric charge from rain clouds down wet hemp twine, charging a Leyden jar through a brass key, proving lightning is an electrostatic discharge identical in physical nature to laboratory sparks.

### 1.3 Electrodynamics & Field Unification (1800–1897)
- **Alessandro Volta (1800):** Letter to Sir Joseph Banks (*Philosophical Transactions of the Royal Society*). Proved Galvani's "animal electricity" was an electrochemical contact potential difference between dissimilar metals (copper and zinc discs separated by brine-moistened cloth), providing the world's first continuous direct current (DC) source.
- **Hans Christian Ørsted (1820):** *Experimenta circa effectum conflictus electrici in acum magneticam* (Copenhagen). Demonstrated that a metallic wire carrying current deflects a nearby magnetic compass needle perpendicularly.
- **Michael Faraday (1831):** *Experimental Researches in Electricity* (Royal Institution). Thrusting a permanent magnet into a wire coil induced a transient electric current in the galvanometer—establishing the principle of electromagnetic induction.
- **James Clerk Maxwell (1861–1865):** *A Dynamical Theory of the Electromagnetic Field*. Mathematically unified electricity and magnetism into 4 coupled differential equations, demonstrating that propagating electromagnetic waves travel at the speed of light ($c = 1/\\sqrt{\\mu_0 \\varepsilon_0}$).
- **J. J. Thomson (1897):** Cavendish Laboratory, Cambridge (*Philosophical Magazine*). Cathode-ray deflection experiments in crossed electrostatic and magnetic fields proved cathode rays consist of subatomic negatively charged corpuscles (*electrons*) with a mass-to-charge ratio ($m/e$) approximately 1,000 times smaller than a hydrogen ion.

---

## 2. Chronological Milestones Matrix (Scene 2 Design Input)

| No. | Epoch / Year | Discoverer / Milestone | Physical Apparatus | Modern Legacy |
|---|---|---|---|---|
| 1 | `c. 600 BCE` | Thales of Miletus | Baltic Amber + Woolen Cloth + Feathers | First recorded electrostatic tribo-charging |
| 2 | `1600` | William Gilbert | *Versorium* pivoting needle | Coined *electricus*; systematic study of insulators |
| 3 | `1745–1746` | von Kleist & Musschenbroek | Foil-coated glass bottle with water/brass rod | First capacitor (electrostatic energy storage) |
| 4 | `1752` | Benjamin Franklin | Silk kite, hemp twine, brass key, storm cloud | Proved lightning is atmospheric electricity |
| 5 | `1800` | Alessandro Volta | Zinc & Copper discs + brine-soaked cloth pads | First continuous DC chemical battery |
| 6 | `1820` | Hans Christian Ørsted | Direct current wire + magnetic compass needle | First proof that moving charges produce magnetic fields |
| 7 | `1831` | Michael Faraday | Cylindrical wire coil + bar magnet + galvanometer | Principle of electromagnetic induction & generators |
| 8 | `1865` | James Clerk Maxwell | Mathematical vector field equations | Electromagnetic wave theory & light unification |
| 9 | `1897` | J. J. Thomson | Evacuated glass cathode-ray tube with deflection plates | Discovery of the electron ($e^-$ charge carrier) |
"""

# 2. script_bn.md
files["script_bn.md"] = """# 🎙️ পর্ব ০১: পূর্ণাঙ্গ বাংলা ধারাবর্ণনা চিত্রনাট্য
**শিরোনাম:** বিদ্যুৎ আসলে কী? (What Exactly Is Electricity?)
**উপশিরোনাম:** বিদ্যুতের রহস্য থেকে আধুনিক বিজ্ঞানের যাত্রা
**মোট সময়কাল:** ০৮:১৫ মিনিট (৪৯৫ সেকেন্ড)
**কণ্ঠস্বর:** গম্ভীর, উষ্ণ, তথ্যবহুল তথ্যচিত্রের ভঙ্গি (Cartesia Bengali / Neural Bengali Master Voice)

---

### দৃশ্য ১: প্রাচীন রহস্য — অ্যাম্বার পাথরের আকর্ষণ (00:00 – 00:55 | ৫৫ সেকেন্ড)
*[সঙ্গীত: হালকা প্রাচীন ভূমধ্যসাগরীয় তারের সুর ও দূর সমুদ্রের ঢেউ]*  
*[দৃশ্য: প্রদীপালোকে পাথরের টেবিল, পশমি কাপড় দিয়ে হলুদ অ্যাম্বার পাথর ঘষা হচ্ছে। পালক ভেসে উঠছে]*

"আজ থেকে প্রায় আড়াই হাজার বছর আগে। প্রাচীন গ্রিসের মিলেটাস নগরী। তখন পৃথিবী আজকের মতো বিদ্যুতের আলোয় উজ্জ্বল ছিল না। বিজ্ঞানও তখন ছিল মূলত প্রকৃতিকে দূর থেকে দেখে বিস্মিত হওয়ার এক যুগ।

সেই সময় মানুষের চোখে পড়ে এক অদ্ভুত ঘটনা। একটি বিশেষ প্রাকৃতিক পাথর—অ্যাম্বার—পশম বা কাপড়ের সঙ্গে ঘষলে তা নিজের দিকে ছোট ছোট পাখির পালক কিংবা শুকনো খড়কুটো টেনে নেয়!

পাথরটি কিন্তু কোনো দড়ি বা কাঠি দিয়ে বস্তুগুলোকে ছুঁয়েও দেখছে না। তবুও অদৃশ্য এক বলের টানে হালকা পালকগুলো বাতাসের বুক চিড়ে লাফিয়ে উঠছে পাথরের গায়ে!

বিজ্ঞানের ইতিহাসে এই ঘটনাটিকেই ধরা হয় মানুষের দ্বারা বৈদ্যুতিক আকর্ষণের অন্যতম প্রাচীন লিখিত পর্যবেক্ষণ।"

*[বিরতি: ১.৫ সেকেন্ড]*

---

### দৃশ্য ২: কীভাবে বিদ্যুৎ বিজ্ঞান হয়ে উঠল — সময়ের রেখায় আবিষ্কার (00:55 – 02:10 | ৭৫ সেকেন্ড)
*[সঙ্গীত: ধীরে ধীরে প্রাচীন সুর রূপ নিচ্ছে অষ্টাদশ শতাব্দীর চেম্বার ও হার্পসিকর্ডের সুরে]*  
*[দৃশ্য: অ্যাম্বার পাথর থেকে ক্যামেরা জুম আউট হয়ে একটি অনুভূমিক টাইমলাইন স্ক্রলে প্রবেশ করে। যিশুখ্রিস্টপূর্ব ৬০০ থেকে ১৬০০ খ্রিস্টাব্দের মাঝে স্পষ্ট অ্যানিমেটেড অক্ষ-ভঙ্গুর রেখা (//) ফুটে ওঠে]*

"কিন্তু এই রহস্যময় টান আসলে কী ছিল? প্রাচীন গ্রিক দার্শনিক থেলিস একে প্রকৃতির বিস্ময় হিসেবে দেখেছিলেন। কিন্তু এর পেছনের বিজ্ঞান বুঝতে মানবজাতিকে অপেক্ষা করতে হয়েছে শতাব্দীর পর শতাব্দী।

ষোলোশো খ্রিস্টাব্দে ইংরেজ বিজ্ঞানী উইলিয়াম গিলবার্ট এই গ্রিক শব্দ 'ইলেকট্রন'—যার অর্থ অ্যাম্বার—তা থেকেই প্রথম প্রবর্তন করলেন লাতিন শব্দ 'ইলেকট্রিকাস'। তিনি দেখালেন, কেবল অ্যাম্বার নয়, কাচ কিংবা গন্ধকও ঘর্ষণে এমন আকর্ষণ সৃষ্টি করতে পারে।

এরপর আঠারো শতকে লেইডেন জার আবিষ্কারের মাধ্যমে মানুষ প্রথমবারের মতো কাচের জারে বৈদ্যুতিক চার্জ জমিয়ে রাখতে শিখল।

১৭৫২ সালে বেঞ্জামিন ফ্র্যাঙ্কলিন মেঘলা আকাশে রেশমি ঘুড়ি উড়িয়ে প্রমাণ করলেন—আকাশের ভয়ংকর বজ্রপাত আর ল্যাবরেটরির ছোট্ট বৈদ্যুতিক স্ফুলিঙ্গ আসলে একই প্রাকৃতিক ঘটনা।

১৮০০ সালে আলেসান্দ্রো ভোল্টা তামা আর দস্তার পাত দিয়ে বানালেন পৃথিবীর প্রথম ব্যাটারি—আর প্রথমবারের মতো মানুষ পেল একটানা বয়ে চলা বিদ্যুৎ প্রবাহ।

১৮২০ সালে ওরস্টেড দেখলেন, তারের মধ্য দিয়ে বিদ্যুৎ গেলে পাশের কম্পাস কাঁটা কেঁপে ওঠে।

১৮৩১ সালে মাইকেল ফ্যারাডে তারের কয়েলের ভেতর চুম্বক নাড়িয়ে আবিষ্কার করলেন তড়িচ্চৌম্বকীয় আবেশ—যা আজকের বিদ্যুৎ জেনারেটরের মূল ভিত্তি।

১৮৬৫ সালে জেমস ক্লার্ক ম্যাক্সওয়েল গণিতের মাধ্যমে বিদ্যুৎ ও চুম্বকত্বকে একসূত্রে বেঁধে দিলেন।

আর অবশেষে ১৮৯৭ সালে জে. জে. থমসন আবিষ্কার করলেন পরমাণুর গভীরে থাকা অতি ক্ষুদ্র চার্জবাহী কণা—ইলেকট্রন।

এভাবেই হাজার বছরের কৌতূহল পেরিয়ে বিদ্যুৎ পরিণত হলো আধুনিক বিজ্ঞানের সবচেয়ে শক্তিশালী ভিত্তিতে।"

*[বিরতি: ২ সেকেন্ড]*

---

### দৃশ্য ৩: ইতিহাস থেকে আমাদের বর্তমান বিশ্বে (02:10 – 02:25 | ১৫ সেকেন্ড)
*[সঙ্গীত: ঐতিহাসিক সুর মসৃণভাবে আধুনিক লুমিনাস অ্যাম্বিয়েন্ট পালে রূপান্তরিত হয়]*  
*[দৃশ্য: ভোল্টার ব্যাটারি রূপান্তরিত হয়ে আধুনিক লিথিয়াম সেলে রূপ নেয়, তামার তার পরিণত হয় আধুনিক হোম সার্কিটে, ফ্যারাডের কয়েল বদলে যায় ট্রান্সফরমারে, আর অন্ধকার ঘর আলোয় ভরে ওঠে]*

"আজ আমরা প্রতিদিন যে সুইচ টিপে ঘরের আলো জ্বালাই, যে পাখার বাতাসে ক্লান্তি দূর করি, কিংবা যে স্মার্টফোনের পর্দায় বিশ্বকে দেখি—তার পেছনে দাঁড়িয়ে আছে বিজ্ঞানের এই আড়াই হাজার বছরের নিরলস অভিযাত্রা।

কিন্তু এক মুহূর্তের জন্য ভাবুন তো: এই যে বিদ্যুৎ, যা আমাদের পুরো আধুনিক জীবনকে চালায়—তা আসলে কী?"

*[বিরতি: ২ সেকেন্ড]*

---

### দৃশ্য ৪: বিদ্যুৎ আসলে কী? — সংজ্ঞার গভীর উপলব্ধি (02:25 – 03:15 | ৫০ সেকেন্ড)
*[দৃশ্য: সেন্ট্রাল ডিপ নেভি ক্যানভাসে বড় টাইপোগ্রাফিক হরফে উজ্জ্বল সংজ্ঞা প্রকাশ পায়]*

"অনেকেই মনে করেন, বিদ্যুৎ মানেই কেবল তারের ভেতর দিয়ে কোনো কিছুর বয়ে চলা। কিন্তু পদার্থবিজ্ঞানের দৃষ্টিতে বিদ্যুতের পরিধি আরও অনেক গভীর ও বিশাল।

সহজ ও নিখুঁত ভাষায় বলতে গেলে:  
**বিদ্যুৎ হলো বৈদ্যুতিক চার্জের উপস্থিতি, তাদের মধ্যকার বল এবং তাদের চলাচলের সামগ্রিক রূপ।**

প্রকৃতিতে বিদ্যুতের এই প্রকাশকে আমরা প্রধানত তিনটি ভাগে দেখতে পাই:  
এক: স্থির তড়িৎ—যেখানে বস্তুর পৃষ্ঠে বৈদ্যুতিক চার্জ জমা হয়ে স্থির থাকে।  
দুই: চল তড়িৎ—যেখানে কোনো পরিবাহীর মধ্য দিয়ে চার্জের নিয়মিত ও অবিরাম প্রবাহ ঘটে।  
এবং তিন: বৈদ্যুতিক ক্ষেত্র—যার মাধ্যমে চার্জিত কণাগুলো স্পর্শ ছাড়াই দূর থেকে একে অপরের ওপর আকর্ষণ বা বিকর্ষণ বল প্রয়োগ করে।"

*[বিরতি: ২ সেকেন্ড]*

---

### দৃশ্য ৫: পদার্থের অতিক্ষুদ্র জগত ও বৈদ্যুতিক চার্জ (03:15 – 04:10 | ৫৫ সেকেন্ড)
*[দৃশ্য: একটি তামার পাতের গভীর থেকে গভীরতম অংশে মসৃণ ক্যামেরা জুম। পরমাণুর কেন্দ্রে প্রোটন-নিউট্রনের ঘন নিউক্লিয়াস, আর তাকে ঘিরে ঘূর্ণায়মান নীল ইলেকট্রন মেঘ]*

"তাহলে এই পুরো বিষয়ের মূল কারিগর যে 'বৈদ্যুতিক চার্জ' বা আধান—সেটি আসলে কী?

আসুন পদার্থের গভীরে দৃষ্টি দেওয়া যাক। আমাদের চোখের সামনের সবকিছুই তৈরি হয়েছে কোটি কোটি ক্ষুদ্রাতিক্ষুদ্র পরমাণু বা অ্যাটম দিয়ে।

একটি পরমাণুর কেন্দ্র বা নিউক্লিয়াসে শক্তভাবে বাঁধা থাকে ধনাত্মক চার্জযুক্ত প্রোটন এবং চার্জবিহীন নিউট্রন। আর নিউক্লিয়াসের চারপাশের মহাশূন্যে এক রহস্যময় মেঘের মতো অবিরাম গতিতে ঘূর্ণায়মান থাকে অত্যন্ত হালকা, ঋণাত্মক চার্জযুক্ত কণা—ইলেকট্রন।

বিজ্ঞানের এক চমৎকার নিয়ম হলো: বিপরীত চার্জ একে অপরকে আকর্ষণ করে—যেমন পজিটিভ প্রোটন টেনে ধরে নেগেটিভ ইলেকট্রনকে। আবার দুটি একই ধরনের চার্জ পরস্পরকে দূরে ঠেলে দেয়।

স্বাভাবিক অবস্থায় যেকোনো পরমাণুতে যতগুলো প্রোটন থাকে, ঠিক ততগুলোই ইলেকট্রন থাকে। ফলে সামগ্রিকভাবে পরমাণু থাকে নিস্তড়িৎ বা ভারসাম্যপূর্ণ।"

*[বিরতি: ১.৫ সেকেন্ড]*

---

### দৃশ্য ৬: স্থির তড়িৎ — ভারসাম্যের ক্ষণিক পরিবর্তন (04:10 – 05:05 | ৫৫ সেকেন্ড)
*[দৃশ্য: প্রাচীন অ্যাম্বারের পাশাপাশি একটি আধুনিক প্লাস্টিকের চিরুনি দিয়ে চুলে ঘষার দৃশ্য। ইলেকট্রন কণাগুলো চুল থেকে চিরুনিতে লাফিয়ে আসছে]*

"কিন্তু যদি কোনো কারণে এই স্বাভাবিক ভারসাম্যে পরিবর্তন আনা যায়?

ধরুন, আপনি একটি শুকনো চুলে প্লাস্টিকের চিরুনি ঘষলেন।  
এখানে কিন্তু নতুন কোনো চার্জের জন্ম হচ্ছে না। ঘর্ষণের ফলে চুল থেকে কিছু ইলেকট্রন লাফিয়ে চিরুনির দাঁতে স্থানান্তরিত হয়।

ইলেকট্রন ঋণাত্মক চার্জযুক্ত হওয়ায় চিরুনিতে জমা হয় অতিরিক্ত ইলেকট্রন—ফলে চিরুনিটি সামগ্রিকভাবে হয়ে ওঠে নেগেটিভ চার্জিত। আর চুল ইলেকট্রন হারিয়ে হয়ে পড়ে পজিটিভ চার্জিত।

চার্জগুলো কিন্তু চিরুনির ভেতরে তারের মতো বয়ে যেতে পারছে না—তারা পৃষ্ঠেই স্থির হয়ে জমে আছে। এটিই হলো স্থির তড়িৎ বা Static Electricity।

এখন এই চার্জিত চিরুনিটি ছোট ছোট কাগজের টুকরোর কাছে আনলে, চিরুনির নেগেটিভ চার্জ কাগজের পরমাণুগুলোর পজিটিভ দিককে টেনে ধরে—আর মাধ্যাকর্ষণকে হারিয়ে কাগজের টুকরোগুলো বাতাসে লাফিয়ে ওঠে!"

*[বিরতি: ২ সেকেন্ড]*

---

### দৃশ্য ৭: চল তড়িৎ — একটি সহজ সার্কিটের ভেতরে স্রোত (05:05 – 06:35 | ৯০ সেকেন্ড)
*[দৃশ্য: একটি পূর্ণাঙ্গ সার্কিট বোর্ড তৈরি হচ্ছে: ব্যাটারি -> সুইচ -> তামার তার -> ফিলামেন্ট বাল্ব]*

"কিন্তু স্থির তড়িৎ দিয়ে তো আর আমাদের ঘরের পাখা বা টেলিভিশন চালানো সম্ভব নয়! তার জন্য আমাদের চাই তারের মধ্য দিয়ে চার্জের এক অবিরাম ও নিয়ন্ত্রিত স্রোত—যার নাম চল তড়িৎ বা Electric Current।

আসুন একটি খুব সহজ সার্কিট পর্যবেক্ষণ করি। আমাদের কাছে রয়েছে একটি ব্যাটারি, পরিবাহী তামার তার, একটি সুইচ এবং একটি ছোট বাল্ব।

লক্ষ্য করুন: যখন সুইচটি খোলা থাকে, সার্কিটটি থাকে অসম্পূর্ণ। তারের মধ্যকার মুক্ত ইলেকট্রনগুলো ঘরের মাছিদের মতো যে যার ইচ্ছে মতো এলোমেলো নড়াচড়া করে। কোনো নির্দিষ্ট দিকে প্রবাহ নেই, তাই বাল্বটি নিভে থাকে।

কিন্তু যেইমাত্র আমরা সুইচটি বন্ধ করি, ব্যাটারি তার দুই প্রান্তের রাসায়নিক শক্তির সাহায্যে তৈরি করে এক বৈদ্যুতিক ধাক্কা বা ভোল্টেজ। আর অমনি পুরো পরিবাহী তার জুড়ে এক অবিশ্বাস্য পরিবর্তন ঘটে!

মুক্ত ইলেকট্রনগুলো ব্যাটারির নেগেটিভ প্রান্ত থেকে পজিটিভ প্রান্তের দিকে নির্দিষ্ট দিকে এগোতে শুরু করে। আর এই চার্জের গতিশীল স্রোতের কারণে বাল্বের ফিলামেন্টে ঘটে শক্তির রূপান্তর—ফিলামেন্ট উত্তপ্ত হয়ে চারপাশ আলোয় ভরিয়ে তোলে!

মনে রাখবেন: প্রচলিত তড়িৎ প্রবাহের ঐতিহাসিক দিক ধরা হয় পজিটিভ থেকে নেগেটিভের দিকে—যা ইলেকট্রন চলাচলের ঠিক বিপরীত।

আর সবচেয়ে জরুরি বৈজ্ঞানিক সত্যটি হলো: বাল্ব কিন্তু কখনোই ইলেকট্রন খেয়ে বা ধ্বংস করে ফেলে না! যতগুলো ইলেকট্রন বাল্বে ঢোকে, ঠিক ততগুলো ইলেকট্রন অপর প্রান্ত দিয়ে বেরিয়ে ব্যাটারিতে ফিরে আসে। বাল্ব কেবল চার্জের গতিশক্তিকে আলো ও তাপে রূপান্তর করে।"

*[বিরতি: ২ সেকেন্ড]*

---

### দৃশ্য ৮: আমাদের চারপাশের বিদ্যুৎ — শক্তির রূপান্তর (06:35 – 07:10 | ৩৫ সেকেন্ড)
*[দৃশ্য: ৫টি স্পষ্ট কার্ডে শক্তির রূপান্তর: পাখা, ইস্ত্রি, বাল্ব, ঘণ্টা, মোটর]*

"বিদ্যুতের সবচেয়ে বড় শক্তি হলো তার রূপান্তরের ক্ষমতা।

একটি সাধারণ ইস্ত্রিতে বিদ্যুৎ রূপান্তরিত হয় তাপে।  
বৈদ্যুতিক পাখায় মোটর ঘুরিয়ে বিদ্যুৎ সৃষ্টি করে যান্ত্রিক গতি।  
টিউবলাইটে বিদ্যুৎ তৈরি করে আলো।  
কলিং বেলে এটি রূপান্তরিত হয় শব্দে।  
আর কারখানার বিশাল মোটরে বিদ্যুৎ তৈরি করে ঘূর্ণন শক্তি।

আমাদের আধুনিক পুরো সভ্যতা আজ দাঁড়িয়ে আছে এই এক অদৃশ্য চার্জের শক্তির রূপান্তরের উপর।"

*[বিরতি: ১.৫ সেকেন্ড]*

---

### দৃশ্য ৯: সারসংক্ষেপ, চিন্তার প্রশ্ন ও পরবর্তী পর্ব (07:10 – 08:15 | ৬৫ সেকেন্ড)
*[দৃশ্য: ৩টি স্তম্ভের সারসংক্ষেপ বোর্ড: ১. বৈদ্যুতিক চার্জ, ২. স্থির তড়িৎ, ৩. চল তড়িৎ]*

"তাহলে আজকের পর্ব থেকে আমরা কী শিখলাম?  
এক: বিদ্যুৎ হলো চার্জের উপস্থিতি ও গতির সমন্বিত রূপ।  
দুই: স্থির তড়িতে চার্জ কোনো বস্তুর পৃষ্ঠে জমে থাকে।  
আর তিন: চল তড়িতে বদ্ধ সার্কিটে চার্জের অবিরাম প্রবাহ ঘটে—যেখানে চার্জ সংরক্ষিত থাকে, কেবল শক্তির রূপান্তর ঘটে।

*[৪ সেকেন্ড চিন্তার টাইমার বার]*  
আজকের পর্ব থেকে আপনার জন্য একটি কৌতূহলী প্রশ্ন:  
চিরুনি দিয়ে চুল ঘষার পর কাগজের টুকরোগুলো কেন আকৃষ্ট হয়? চুল থেকে চিরুনিতে কোন কণা স্থানান্তরিত হওয়ার কারণে এটি ঘটে?  
কমেন্টে আপনার উত্তর জানান।

কিন্তু এই ইলেকট্রন ও প্রোটনের ভেতরে লুকিয়ে থাকা বৈদ্যুতিক বল কতটা শক্তিশালী? আর পরমাণুর চার্জ কীভাবে কাজ করে?  
পরের পর্বে আমরা গভীরে প্রবেশ করব:  
**'পরমাণু ও বৈদ্যুতিক চার্জ — Atoms and Electric Charge'।**

চোখ রাখুন 'বিদ্যুতের পাঠশালা'-য়। শূন্য থেকে বিদ্যুতের জগৎকে বোঝা।"
"""

# 3. script_en_notes.md
files["script_en_notes.md"] = """# 📋 Episode 01: English Technical Notes & Directorial Commentary

### General Directorial Approach:
Episode 01 establishes the foundational DNA of the entire 50-episode series. It rejects textbook dry definitions and replaces them with a human, historical journey. It demonstrates that our modern power grid is the direct culmination of human inquiry starting from a mystery on an ancient Greek shoreline.

---

### Scene-by-Scene Breakdown:

#### Scene 1: The Ancient Mystery (00:00–00:55)
- **Setting:** 600 BCE Miletus. Natural oil lamp lighting, chiaroscuro atmosphere.
- **Historical Anchor:** Thales of Miletus. Amber (*elektron*) attracting feathers.
- **Directorial Note:** Do not rush. Let the viewer hear the tactile texture of wool rubbing against amber before the feather defies gravity.

#### Scene 2: How Electricity Became Science (00:55–02:10)
- **Visual Device:** Horizontal timeline with explicit animated broken-axis marker (`//`) across the 2,200-year gap between 600 BCE and 1600 CE.
- **9 Sequential Breakthroughs:**
  1. Thales (Amber attraction)
  2. Gilbert (Versorium, *electricus* coined)
  3. von Kleist & Musschenbroek (Leyden Jar electrostatic storage)
  4. Franklin (Kite & Key atmospheric charge identification — NO lightning strike on kite!)
  5. Volta (Zinc/copper brine pile — first continuous DC EMF)
  6. Ørsted (Electromagnetism — magnetic compass deflection)
  7. Faraday (Electromagnetic induction — moving magnet in coil)
  8. Maxwell (Electromagnetic vector field wave unification)
  9. Thomson (Cathode ray tube — discovery of the subatomic electron)

#### Scene 3: The Bridge to Modern Day (02:10–02:25)
- **Visual Device:** Rhythmic match-cut morph transitions shifting color palette from historical parchment sepia to deep observatory navy (`#0B1120`).

#### Scene 4: What is Electricity? (02:25–03:15)
- **Pedagogical Core:** Reframing electricity as a three-pillar phenomenon:
  1. Static Electricity ($Q$ stationary on surfaces)
  2. Current Electricity ($dQ/dt$ closed loop flow)
  3. Electric Fields (action-at-a-distance force vectors)

#### Scene 5: Atoms & Electric Charge (03:15–04:10)
- **Scientific Mandate:** Central nucleus with protons ($+$, Coral `#F43F5E`) and neutrons ($n^0$, Slate `#94A3B8`), enveloped in a soft quantum probabilistic electron cloud ($-$, Cyan `#38BDF8`). No rigid planetary Bohr orbits.

#### Scene 6: Static Electricity (04:10–05:05)
- **Physical Mechanism:** Mechanical rubbing transfers outer valence electrons. Total charge is conserved. Net charge imbalance creates electrostatic induction in neutral paper.

#### Scene 7: Current Electricity (05:05–06:35)
- **Circuit Simulator:** Battery $\rightarrow$ Switch $\rightarrow$ Copper Wire $\rightarrow$ Filament Bulb.
- **Conservation Law:** $I_{\text{in}} = I_{\text{out}}$. The bulb converts potential energy to radiation; it never destroys electrons.
- **Directional Clarity:** Cyan arrows for electron drift ($-$ to $+$); Amber arrows for conventional current ($+$ to $-$).

#### Scene 8: Electricity in Daily Life (06:35–07:10)
- **Energy Conversion Showcase:** Fan (Kinetic), Iron (Thermal), Bulb (Optical), Bell (Acoustic), Motor (Mechanical).

#### Scene 9: Recap & Next Teaser (07:10–08:15)
- **Engagement Device:** 4-second reflection timer bar.
- **Next Episode Bridge:** Atoms & Electric Charge teaser.
"""

# 4. storyboard.md
files["storyboard.md"] = """# 🎬 Episode 01: Shot-by-Shot Storyboard & Choreography

```text
+====================================================================================================+
| SCENE 1: THE ANCIENT MYSTERY (00:00 - 00:55 | Frames 0000 - 3300 @ 60fps)                           |
| Shot 1.1 (00:00 - 00:20): Macro 2.5D chiaroscuro shot of an amber stone and oil lamp on stone table. |
| Shot 1.2 (00:20 - 00:40): Extreme close-up of rough wool cloth rubbing amber. Dust particles swirl. |
| Shot 1.3 (00:40 - 00:55): Amber hovers 3cm above dry feathers; feather quivers, leaps up & snaps.   |
| Palette: #161311 (Charcoal), #F2E5CE (Parchment), #D9822B (Amber Glow). SFX: Soft lyre, rustle, snap|
+====================================================================================================+
| SCENE 2: HISTORICAL EVOLUTION TIMELINE (00:55 - 02:10 | Frames 3300 - 7800 @ 60fps)                 |
| Shot 2.1 (00:55 - 01:10): Zoom out from amber to horizontal timeline scroll. Animated // break.     |
| Shot 2.2 (01:10 - 01:25): Milestone cards: Gilbert's Versorium (1600) -> Leyden Jar shock (1745).  |
| Shot 2.3 (01:25 - 01:45): Franklin's silk kite in storm -> Volta's metal pile battery (1800).       |
| Shot 2.4 (01:45 - 02:10): Ørsted's compass -> Faraday's coil -> Maxwell waves -> Thomson CRT tube.  |
| Visual: Axis break //, custom animated vector vignettes per milestone, glowing causal arrows.       |
+====================================================================================================+
| SCENE 3: BRIDGE FROM HISTORY TO PRESENT (02:10 - 02:25 | Frames 7800 - 8700 @ 60fps)                |
| Shot 3.1 (02:10 - 02:25): Rapid match-cut morphing:                                                 |
| - Voltaic Pile -> Modern 18650 Li-ion battery                                                      |
| - Faraday coil -> Substation transformer                                                            |
| - Darkness -> Modern warm LED lightbulb in dark living room                                         |
| Palette shift: Sepia Parchment -> Deep Observatory Navy (#0B1120).                                  |
+====================================================================================================+
| SCENE 4: WHAT IS ELECTRICITY? (02:25 - 03:15 | Frames 8700 - 11700 @ 60fps)                         |
| Shot 4.1 (02:25 - 02:50): Grand Bengali definition drops in centered bold HarfBuzz typography.      |
| Shot 4.2 (02:50 - 03:15): 3-panel split reveal:                                                     |
| Left: Static (stuck charge) | Center: Current (flowing wire) | Right: Field (action-at-distance).   |
+====================================================================================================+
| SCENE 5: ATOMS & ELECTRIC CHARGE (03:15 - 04:10 | Frames 11700 - 15000 @ 60fps)                     |
| Shot 5.1 (03:15 - 03:40): Seamless micro zoom through copper lattice into a single atom.            |
| Shot 5.2 (03:40 - 04:10): Central nucleus (Protons #F43F5E, Neutrons #94A3B8) with glowing soft      |
| electron cloud (#38BDF8). Oscillating quantum density waves. Charge balance callout: p+ = e-.       |
+====================================================================================================+
| SCENE 6: STATIC ELECTRICITY (04:10 - 05:05 | Frames 15000 - 18300 @ 60fps)                          |
| Shot 6.1 (04:10 - 04:30): Plastic comb rubbing hair. Valence electrons migrate (hair -> comb).      |
| Shot 6.2 (04:30 - 05:05): Comb hovers over paper bits. Induced dipole polarization lifts scraps.    |
| Annotation: "Friction transfers electrons, it never creates new charge." Total count conserved.     |
+====================================================================================================+
| SCENE 7: CURRENT ELECTRICITY (05:05 - 06:35 | Frames 18300 - 23700 @ 60fps)                         |
| Shot 7.1 (05:05 - 05:25): Circuit build on schematic board: 1.5V Cell, Knife switch, Bulb, Wire.  |
| Shot 7.2 (05:25 - 05:50): Open Switch: Thermal jitter, zero net flow, bulb dark.                    |
| Shot 7.3 (05:50 - 06:15): Close Switch: Field propagates; slow electron drift (- to +);            |
| Conventional current arrows (+ to -); Tungsten filament heats to golden incandescence.              |
| Shot 7.4 (06:15 - 06:35): Charge conservation callout: I_in = I_out. Energy transformed, not matter|
+====================================================================================================+
| SCENE 8: ELECTRICITY IN DAILY LIFE (06:35 - 07:10 | Frames 23700 - 25800 @ 60fps)                   |
| Shot 8.1 (06:35 - 07:10): 5-card kinetic radial showcase with energy conversion badges:             |
| Fan (Motion), Iron (Heat), Bulb (Light), Bell (Sound), Motor (Work).                                |
+====================================================================================================+
| SCENE 9: RECAP & NEXT TEASER (07:10 - 08:15 | Frames 25800 - 29700 @ 60fps)                         |
| Shot 9.1 (07:10 - 07:35): 3-pillar recap board (Charge, Static, Current).                           |
| Shot 9.2 (07:35 - 07:55): Reflection pause prompt with 4-second animated countdown timer bar.       |
| Shot 9.3 (07:55 - 08:15): Episode 02 teaser (Atoms & Electric Charge) & Series logo signature.      |
+====================================================================================================+
```
"""

# 5. timeline_design.md
files["timeline_design.md"] = """# 📐 Scene 2 Timeline Geometry & Axis-Break Math

### Coordinate & Canvas Specifications:
- **Canvas Resolution:** `1920 × 1080` (16:9)
- **Timeline Baseline Y:** `Y = 540`
- **Total Scroll Distance:** `4,800 px` horizontal panning over 75 seconds (Frames 3300 to 7800 at 60 FPS).
- **Camera Pan Velocity:** Smooth cubic deceleration `[0.22, 1, 0.36, 1]` pausing for 6.5s over each major milestone card.

### Axis-Break Geometry (Between Milestone 1 and 2):
Because `600 BCE` to `1600 CE` is a 2,200-year gap compared to decades between later milestones:
- Milestone 1 ($X_1 = 300\\text{ px}$): `c. 600 BCE`
- Axis Break ($X = 650\\text{ px}$ to $X = 750\\text{ px}$):
  - Visual: Dual parallel diagonal slashes (`//`) with jagged zig-zag break in baseline wire.
  - Floating Label: `// ২,২০০ বছরের ব্যবধান (2,200 Years Gap) //` in `#D9822B` amber pill badge.
- Milestone 2 ($X_2 = 1,100\\text{ px}$): `1600 CE`

### Milestone Placement Registry:
1. $X = 300$: `c. 600 BCE` — Thales of Miletus (Amber & Feather)
2. $X = 650 - 750$: `// Axis Break //`
3. $X = 1100$: `1600` — William Gilbert (*Versorium* & *Electricus*)
4. $X = 1600$: `1745–1746` — Ewald von Kleist & Pieter van Musschenbroek (Leyden Jar)
5. $X = 2100$: `1752` — Benjamin Franklin (Atmospheric Kite & Key)
6. $X = 2600$: `1800` — Alessandro Volta (Voltaic Chemical Pile)
7. $X = 3100$: `1820` — Hans Christian Ørsted (Electromagnetism Compass Deflection)
8. $X = 3600$: `1831` — Michael Faraday (Induction Coil & Moving Magnet)
9. $X = 4100$: `1865` — James Clerk Maxwell (Electromagnetic Field Wave Equations)
10. $X = 4600$: `1897` — J. J. Thomson (Cathode Ray Tube Electron Discovery)
"""

# 6. visual_assets.md
files["visual_assets.md"] = """# 🎨 Visual Assets Inventory & SVG Manifest (Episode 01)

| Asset ID | Component Name | Style / Era | Description |
|---|---|---|---|
| `VA-H01` | `AmberFeatherVignette` | Historical Parchment | Amber cabochon with layered wool weave and floating down feather |
| `VA-H02` | `BrokenAxisTimeline` | Technical Blueprint | Horizontal copper trace with animated `//` zig-zag break badge |
| `VA-H03` | `VersoriumNeedle` | Historical Brass | Pivoting metallic arrow on stand with amber rod induction |
| `VA-H04` | `LeydenJarVignette` | Classical Glass & Brass | Foil-lined jar with chain and discharge spark gap |
| `VA-H05` | `FranklinKiteVignette`| Period Illustration | Silk kite with wet hemp twine, brass key, raincloud backdrop |
| `VA-H06` | `VoltaicPileStack` | Antique Copper/Zinc | Alternating metal discs with brine pads and output spark |
| `VA-H07` | `OerstedCompassLoop` | Scientific Apparatus | Straight wire segment over pivoting magnetic compass |
| `VA-H08` | `FaradayInductionCoil`| Scientific Apparatus | Cylindrical coil with bar magnet entering and galvanometer |
| `VA-H09` | `MaxwellWaveVector` | Vector Graphic | Orthogonal E-field (`#38BDF8`) and B-field (`#34D399`) waves |
| `VA-H10` | `ThomsonCRTTube` | Technical Cutaway | Glass vacuum tube with electron beam deflecting between plates |
| `VA-S01` | `MorphBattery` | Morphing Vector | Voltaic pile smooth bezier morphing into modern 18650 cell |
| `VA-S02` | `AtomElectronCloud` | Quantum Scientific | Nucleus ($p^+$ Coral, $n^0$ Slate) with radiant electron cloud |
| `VA-S03` | `InteractiveCircuit` | Precision Schematic | 1.5V Cell, knife switch, copper traces, glowing incandescent bulb |
| `VA-S04` | `EnergyConversionRing`| Motion Graphic | 5 radial cards: Fan, Iron, Bulb, Bell, Motor |
| `VA-S05` | `ReflectionTimerBar` | UI Component | 4-second smooth countdown bar with question card |
"""

# 7. science_review.md
files["science_review.md"] = """# 🔬 Scientific Review & Verification (Episode 01)

### 1. Quantum Electron Cloud vs. Planetary Bohr Model
- **Scientific Audit:** The Bohr planetary model with tiny point-like electrons tracing circular railroad tracks is pedagogically misleading for modern physics.
- **Verification Rule in Ep 01:** The atomic model depicts a compact central nucleus surrounded by a probabilistic **electron cloud** with soft radial gradients.

### 2. Charge Conservation in Electrical Loads
- **Scientific Audit:** An incandescent lightbulb does not consume charge. Kirchhoff's Current Law ($I_{\\text{in}} = I_{\\text{out}}$) holds strictly.
- **Verification Rule in Ep 01:** The number of electron particles entering the bulb terminal per second exactly equals the number exiting. Electrical potential energy ($qV$) is converted to thermal lattice vibration and emitted electromagnetic radiation (photons).

### 3. Conventional Current vs. Electron Drift
- **Scientific Audit:** Benjamin Franklin assigned positive and negative arbitrarily before the electron was discovered.
- **Verification Rule in Ep 01:** Electron drift is displayed from negative ($-$) to positive ($+$) in cyan; conventional current is displayed from positive ($+$) to negative ($-$) in amber. Both are explicitly distinguished with a legend.

### 4. Triboelectric Charging vs. Charge Creation
- **Scientific Audit:** Friction does not create electrons. It provides intimate mechanical contact facilitating electron transfer across differing Fermi energy levels / work functions.
- **Verification Rule in Ep 01:** The narration explicitly asserts: "ঘর্ষণে নতুন চার্জ তৈরি হয় না, কেবল এক বস্তু থেকে অন্য বস্তুতে ইলেকট্রন স্থানান্তরিত হয়।"
"""

# 8. analogy_notes.md
files["analogy_notes.md"] = """# ⚖️ Analogy Notes & Boundary Limits (Episode 01)

### Analogy: Gravitational Potential Height for Voltage
- **Concept Grounded:** Voltage (Potential Difference) as height difference.
- **Pedagogical Strength:** Explains why current only flows between points of differing potential, just as water flows downhill.
- **Breakdown Limit:** Gravitational force is unidirectional (downward). Electrical potential operates in any 3D spatial orientation governed by field gradients $\\mathbf{E} = -\\nabla V$.

### Analogy: Corridor Crowds for Electric Current
- **Concept Grounded:** Rate of people crossing a gate per second equals Coulombs per second (Amperes).
- **Pedagogical Strength:** Intuitive separation of charge quantity ($Q$) from rate of flow ($I = Q/t$).
- **Breakdown Limit:** People have independent locomotion and erratic speeds; conduction electrons move as a degenerate Fermi gas where energy propagates near the speed of light while individual drift velocity is less than 1 mm/s.
"""

# 9. captions.srt
files["captions.srt"] = """1
00:00:01,000 --> 00:00:06,500
আজ থেকে প্রায় আড়াই হাজার বছর আগে। প্রাচীন গ্রিস।

2
00:00:07,000 --> 00:00:13,000
তখন পৃথিবী আজকের মতো বিদ্যুতের আলোয় ভরা ছিল না।

3
00:00:13,500 --> 00:00:20,500
সেই সময় মানুষের নজরে আসে এক অদ্ভুত পাথর—অ্যাম্বার।

4
00:00:21,000 --> 00:00:28,000
পশমে ঘষলে তা ছোট ছোট পালক নিজের দিকে টেনে নেয়!

5
00:00:28,500 --> 00:00:35,000
পাথরটি না ছুঁয়েও কীভাবে অদৃশ্য বলে আকর্ষণ করছে?

6
00:00:36,000 --> 00:00:44,000
এটিই বিদ্যুতের ইতিহাসে অন্যতম প্রাচীন লিখিত পর্যবেক্ষণ।

7
00:00:45,000 --> 00:00:54,000
১৬০০ সালে উইলিয়াম গিলবার্ট এই অ্যাম্বারের নামানুসারে বললেন 'ইলেকট্রিকাস'।

8
00:00:55,000 --> 00:01:06,000
১৭৪৫ সালে লেইডেন জারে প্রথম বৈদ্যুতিক চার্জ জমিয়ে রাখা সম্ভব হলো।

9
00:01:07,000 --> 00:01:18,000
১৭৫২ সালে বেঞ্জামিন ফ্র্যাঙ্কলিন প্রমাণ করলেন বজ্রপাতও এক বিশাল বিদ্যুৎ স্ফুলিঙ্গ।

10
00:01:19,000 --> 00:01:29,000
১৮০০ সালে ভোল্টার রাসায়নিক ব্যাটারি দিল একটানা বিদ্যুৎ প্রবাহ।

11
00:01:30,000 --> 00:01:40,000
১৮২০ সালে ওরস্টেড ও অ্যাম্পিয়ার বিদ্যুৎ ও চুম্বকের সম্পর্ক খুঁজে পেলেন।

12
00:01:41,000 --> 00:01:52,000
১৮৩১ সালে ফ্যারাডে আবিষ্কার করলেন তড়িচ্চৌম্বকীয় আবেশ—জেনারেটরের মূল শক্তি।

13
00:01:53,000 --> 00:02:04,000
আর ১৮৯৭ সালে জে. জে. থমসন আবিষ্কার করলেন পরমাণুর ইলেকট্রন।

14
00:02:05,000 --> 00:02:18,000
এভাবেই হাজার বছরের আবিষ্কারের পথ ধরে বিদ্যুৎ আমাদের দৈনন্দিন জীবনে প্রবেশ করেছে।

15
00:02:19,000 --> 00:02:30,000
বিদ্যুৎ হলো বৈদ্যুতিক চার্জের উপস্থিতি, তাদের বল এবং তাদের চলাচলের সামগ্রিক রূপ।

16
00:02:31,000 --> 00:02:42,000
পরমাণুর কেন্দ্রে থাকে প্রোটন ও নিউট্রন, আর চারপাশে ঘোরে ঋণাত্মক ইলেকট্রন মেঘ।

17
00:02:43,000 --> 00:02:56,000
ঘর্ষণের ফলে চুল থেকে ইলেকট্রন চিরুনিতে স্থানান্তর ঘটে—সৃষ্টি হয় স্থির তড়িৎ।

18
00:02:57,000 --> 00:03:10,000
আর বদ্ধ বর্তনীতে চার্জের নিয়মিত প্রবাহই হলো চল তড়িৎ।

19
00:03:11,000 --> 00:03:25,000
মনে রাখবেন: বাল্ব কখনো ইলেকট্রন খায় না, এটি কেবল বিদ্যুৎ শক্তিকে আলো ও তাপে রূপান্তর করে।

20
00:03:26,000 --> 00:03:38,000
পরের পর্বে আমরা জানব: পরমাণু ও বৈদ্যুতিক চার্জ (Atoms and Electric Charge)।
"""

# 10. quiz.md
files["quiz.md"] = """# 📝 Episode 01 Comprehension Quiz (মূল্যায়ন ও কুইজ)

**প্রশ্ন ১:** প্রাচীন গ্রিসে অ্যাম্বার পাথরকে কাপড়ে ঘষলে পালক আকৃষ্ট হওয়ার ঘটনাটি প্রথম কার সাথে ঐতিহাসিকভাবে সম্পর্কিত?
- A) উইলিয়াম গিলবার্ট
- B) থেলিস অব মিলেটাস *(সঠিক উত্তর)*
- C) আলেসান্দ্রো ভোল্টা
- D) বেঞ্জামিন ফ্র্যাঙ্কলিন
*ব্যাখ্যা: খ্রিস্টপূর্ব ষষ্ঠ শতকে থেলিস অব মিলেটাস অ্যাম্বার পাথরের এই স্থির তড়িৎ আকর্ষণের ঘটনাটি প্রথম লিপিবদ্ধ করেন।*

**প্রশ্ন ২:** বেঞ্জামিন ফ্র্যাঙ্কলিনের ১৭৫২ সালের ঘুড়ি পরীক্ষার আসল বৈজ্ঞানিক তাৎপর্য কী ছিল?
- A) তিনি বিদ্যুৎ আবিষ্কার করেছিলেন
- B) ঘুড়িতে সরাসরি বজ্রপাত ঘটিয়ে তিনি বিদ্যুতের গতি মাপেন
- C) তিনি প্রমাণ করেন যে আকাশের বজ্রপাত ও ল্যাবরেটরির বৈদ্যুতিক স্ফুলিঙ্গ একই প্রাকৃতিক ঘটনা *(সঠিক উত্তর)*
- D) তিনি প্রথম ব্যাটারি তৈরি করেন
*ব্যাখ্যা: ফ্র্যাঙ্কলিন আকাশে ঘুড়ি উড়িয়ে মেঘের ভেজা সুতো দিয়ে বায়ুমণ্ডলীয় চার্জ সংগ্রহ করে প্রমাণ করেন যে বজ্রপাত আসলে ল্যাবরেটরির স্থির তড়িতের মতোই একটি বৈদ্যুতিক স্রাব।*

**প্রশ্ন ৩:** একটি সাধারণ বর্তনীতে বাল্ব জ্বালানোর সময় চার্জ সংরক্ষণের নীতি অনুযায়ী কী ঘটে?
- A) বাল্বের ফিলামেন্টে ইলেকট্রনগুলো ধ্বংস হয়ে আলোয় পরিণত হয়
- B) বাল্ব সমস্ত ইলেকট্রন শোষণ করে শেষ করে দেয়
- C) বাল্বে যতগুলো ইলেকট্রন প্রবেশ করে, ঠিক ততগুলোই অপর প্রান্ত দিয়ে বেরিয়ে আসে *(সঠিক উত্তর)*
- D) ইলেকট্রনগুলো প্রোটনে রূপান্তরিত হয়
*ব্যাখ্যা: বৈদ্যুতিক চার্জ সংরক্ষিত থাকে ($I_{in} = I_{out}$)। বাল্ব কেবল ইলেকট্রনের বিভব শক্তিকে আলো ও তাপ শক্তিতে রূপান্তরিত করে, চার্জের কোনো ক্ষয় হয় না।*

**প্রশ্ন ৪:** পরমাণুর কোন কণাটির স্থানান্তর স্থির তড়িৎ সৃষ্টির জন্য দায়ী?
- A) নিউক্লিয়াসের প্রোটন
- B) নিউক্লিয়াসের নিউট্রন
- C) বাইরের ইলেকট্রন মেঘের ইলেকট্রন *(সঠিক উত্তর)*
- D) ফোটন কণা
*ব্যাখ্যা: প্রোটন নিউক্লিয়াসে দৃঢ়ভাবে আবদ্ধ থাকে। ঘর্ষণের ফলে কেবল পরমাণুর বাইরের ইলেকট্রন এক বস্তু থেকে অন্য বস্তুতে স্থানান্তরিত হতে পারে।*

**প্রশ্ন ৫:** ১৮০০ সালে আলেসান্দ্রো ভোল্টার 'ভোল্টাইক পাইল' আবিষ্কার বিজ্ঞানের জন্য এত গুরুত্বপূর্ণ ছিল কেন?
- A) এটি প্রথম স্থির তড়িৎ তৈরি করেছিল
- B) এটি প্রথমবারের মতো একটানা রাসায়নিক বিদ্যুৎ প্রবাহ সরবরাহ করতে পেরেছিল *(সঠিক উত্তর)*
- C) এটি পরমাণুর নিউক্লিয়াস আবিষ্কার করেছিল
- D) এটি ট্রান্সফরমার আবিষ্কার করেছিল
*ব্যাখ্যা: ভোল্টার ব্যাটারির আগে মানুষ কেবল স্থির তড়িতের ক্ষণিক স্রাব পেত। ভোল্টাইক পাইল প্রথম টেকসই ডিসি বিদ্যুৎ প্রবাহের পথ খুলে দেয়।*
"""

# 11. glossary.md
files["glossary.md"] = """# 📚 Episode 01 Scientific & Historical Glossary (শব্দকোষ)

- **Amber (অ্যাম্বার):** প্রাচীন পাইন গাছের জীবাশ্মীভূত সুগন্ধি রজন (গ্রিক: *elektron*), যা পশমে ঘষলে স্থির তড়িতে চার্জিত হয়।
- **Versorium (ভারসোরিয়াম):** ১৬০০ সালে উইলিয়াম গিলবার্ট দ্বারা উদ্ভাবিত বিশ্বের প্রথম ধাতব সুই আকৃতির স্থির তড়িৎ সনাক্তকারী যন্ত্র।
- **Leyden Jar (লেইডেন জার):** ১৭৪৫–১৭৪৬ সালে আবিষ্কৃত কাচের জার ও ধাতব পাতের সমন্বয়ে গঠিত বিশ্বের প্রথম বৈদ্যুতিক ধারক (ক্যাপাসিটর)।
- **Voltaic Pile (ভোল্টাইক পাইল):** ১৮০০ সালে আলেসান্দ্রো ভোল্টা দ্বারা উদ্ভাবিত তামা, দস্তা ও লবণে ভেজা কাপড়ের স্তূপীকৃত ব্যাটারি।
- **Electromagnetic Induction (তড়িচ্চৌম্বকীয় আবেশ):** পরিবর্তনশীল চৌম্বক ক্ষেত্রের দ্বারা পরিবাহীতে ভোল্টেজ বা তড়িৎচালক বল সৃষ্টির বৈজ্ঞানিক প্রক্রিয়া।
- **Electron Cloud (ইলেকট্রন মেঘ):** পরমাণুর নিউক্লিয়াসের চারপাশে কোয়ান্টাম বলবিদ্যা অনুযায়ী ইলেকট্রন পাওয়ার সম্ভাবনাময় মেঘ সদৃশ অঞ্চল।
- **Electric Current (তড়িৎ প্রবাহ):** কোনো পরিবাহীর প্রস্থচ্ছেদের মধ্য দিয়ে প্রতি সেকেন্ডে প্রবাহিত মোট চার্জের পরিমাণ ($I = dQ/dt$, একক: অ্যাম্পিয়ার)।
- **Conventional Current (প্রচলিত তড়িৎ প্রবাহ):** ঐতিহাসিক রীতি অনুযায়ী ধনাত্মক ($+$) থেকে ঋণাত্মক ($-$) প্রান্তের দিকে নির্দেশিত কাল্পনিক তড়িৎ প্রবাহের দিক।
- **Electron Drift (ইলেকট্রন সঞ্চরণ):** বৈদ্যুতিক ক্ষেত্রের প্রভাবে পরিবাহীর ভেতর ঋণাত্মক ($-$) থেকে ধনাত্মক ($+$) প্রান্তের দিকে মুক্ত ইলেকট্রনগুলোর গড় মন্থর গতিবেগ।
"""

for fname, content in files.items():
    fpath = os.path.join(ep01_dir, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print(f"All 11 Episode 01 pre-production deliverables successfully generated in {ep01_dir}")
