/** Frames at 60fps taken from pauses in the rendered bn-IN voice tracks. */
const f = (seconds: number) => Math.round(seconds * 60);

/** act1_hook.mp3 — 20.00s */
export const ACT1 = {
  nightEnd: f(1.56),
  lampOutEnd: f(2.66),
  blanketStart: f(3.17),
  blanketEnd: f(5.18),
  spark: f(5.57),
  sparkEnd: f(7.91),
  fiberIn: f(6.52),
  fiberOut: f(7.95),
  fingerIn: f(8.5),
  click: f(9.55),
  bulbIn: f(10.49),
  bulbFull: f(12.3),
  sameThing: f(12.85),
  sameThingEnd: f(14.06),
  blanketEcho: f(14.46),
  switchEnergy: f(15.42),
  question: f(18.88),
  questionEnd: f(19.77),
};

/** act2a_miletus.mp3 — 22.56s */
export const ACT2A = {
  enterRoom: f(4.67),
  rubStart: f(8.69),
  rubEnd: f(12.31),
  feather: f(12.76),
  featherLand: f(16.5),
  caveat: f(17.58),
};

/** act2b_timeline.mp3 — 36.24s. Each card starts when that name is spoken. */
export const ACT2B = {
  leapEnd: f(3.11),
  gilbert: f(3.11),
  leyden: f(6.56),
  franklin: f(10.23),
  volta: f(18.79),
  oersted: f(23.56),
  faraday: f(26.35),
  maxwell: f(29.76),
  thomson: f(32.24),
  end: f(36.24),
};

/** act3_physics.mp3 — 27.44s */
export const ACT3 = {
  intoAtom: f(11.72),
  nucleus: f(14.55),
  cloud: f(16.82),
  friction: f(20.04),
  paper: f(25.39),
};

/** act3e_switch_bulb.mp3 — 30.32s */
export const ACT3E = {
  jitter: f(4.31),
  click: f(12.05),
  flow: f(12.34),
  conserve: f(14.16),
  notEaten: f(19.74),
  fan: f(24.95),
  iron: f(26.7),
  bell: f(28.13),
  pump: f(29.2),
};

/** act4_confusion.mp3 — 34.80s */
export const ACT4 = {
  question: f(4.94),
  bill: f(9.59),
  battery: f(14.31),
  push: f(17.87),
  reassure: f(26.12),
  teaser: f(30.96),
};
