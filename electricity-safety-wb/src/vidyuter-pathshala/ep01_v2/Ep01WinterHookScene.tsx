import React from 'react';
import { DustMotes, EASE_INOUT, EASE_OUT, ci } from '../historical/scene1/Scene1Shared';
import { DepthLayer, KineticWord, MultiplaneCameraRig } from '../core/MultiplaneCameraRig';
import { VidyuterKineticTitle } from '../historical/VidyuterBanglaKinetic';
import { BoyRig } from './BoyRig';
import {
  BedWithBlanket,
  BedroomFarWall,
  BedroomForeground,
  BedroomMidground,
  BED,
  BulbLightWash,
  PopWord,
  WallCircuit,
} from './Ep01BedroomSet';
import { ScreenFlash, ShockRing, SparkBurst, ignitionFlicker, pulseAt } from './Ep01Fx';
import { EASE_POP } from './Ep01SharedGraphics';

/**
 * Act 1 cue sheet (local frames @60fps), measured from pauses in act1_hook.mp3 (ffmpeg silencedetect):
 *  "শীতের রাত। ঘরের আলো নেভানো।" 0–2.72s · "গা থেকে … কম্বলটা সরাতেই..." 3.27–5.47s
 *  "চটপট!" 6.07s · "ছোট্ট নীলচে স্ফুলিঙ্গ!" 7.01–8.46s · VO gap 8.46–9.14s (whip-pan)
 *  "আবার পাশের সুইচটা টিপতেই..." 9.14–10.79s · "মাথার ওপরের বাল্বটা জ্বলে উঠল!" 11.24–13.04s
 *  "দুটো কি একই জিনিস?" 13.57s · "কম্বলের ওই ছোট্ট চমক, আর … শক্তি..." 15.25–19.58s · "আসলে বিদ্যুৎ কী?" 20.23s
 * Keep in sync with scripts/synthesize_ep01v2_sound.py (A1).
 */
export const ACT1_CUES = {
  snap: 364,
  sparkBursts: [364, 381, 402, 428, 456],
  whip: 512,
  switchPress: 640,
  thought: 814,
  hook: 1205,
};

/** Sum of exponentially decaying crackle bursts, 0..1 */
export function crackleIntensity(local: number, bursts: number[]) {
  let v = 0;
  bursts.forEach((b, i) => {
    const t = local - b;
    if (t >= 0 && t < 40) v = Math.max(v, Math.exp(-t / 9) * (i === 0 ? 1 : 0.75));
  });
  return v;
}

/**
 * ACT 1: Everyday Sensory Hook (0..1300f / 21.36s VO)
 * Lived-in Indian winter bedroom across Z0–Z4. No slide headings: the only on-screen words are a
 * comic sound word on the spark and the closing hook question.
 */
export const Ep01WinterHookScene: React.FC<{ frame: number; local: number; duration: number }> = ({
  frame,
  local,
  duration,
}) => {
  const localMs = (local / 60) * 1000;
  const C = ACT1_CUES;
  const fadeIn = ci(local, [0, 20], [0, 1], EASE_OUT);
  const fadeOut = ci(local, [duration - 28, duration], [1, 0], EASE_INOUT);

  const armLift = ci(local, [215, 352], [0, 1], EASE_OUT);
  const blanketLift = armLift * 105;
  const crackle = crackleIntensity(local, C.sparkBursts);
  const arcSeed = Math.floor(local / 2);
  const fiberMacroAlpha = ci(local, [380, 410, 498, 524], [0, 1, 1, 0], EASE_OUT);

  const switchClosed = local >= C.switchPress;
  const conduitFront = ci(local, [C.switchPress, C.switchPress + 36], [0, 1], EASE_OUT);
  // filament catches with a couple of stutters before it settles (matches the ignite SFX)
  const bulbGlow = ci(local, [C.switchPress + 36, C.switchPress + 70], [0, 1], EASE_OUT) * ignitionFlicker(local, C.switchPress + 36, 18, 4);
  const isSurprised = local >= C.snap + 6;
  const eyeX = local >= 780 ? ci(local, [780, 870, 1030], [-0.4, 0.75, -0.2]) : 0.35;
  const eyeY = local >= 780 ? ci(local, [780, 870, 1030], [0.2, -0.75, 0.1]) : 0.45;
  const thoughtAlpha = ci(local, [C.thought, C.thought + 34, C.hook - 25, C.hook + 10], [0, 1, 1, 0], EASE_OUT);
  const lightFlood = bulbGlow * ci(local, [C.switchPress + 36, 800, 1060], [0, 1, 0.75]);
  // blue static flash that lights the dark room on each crackle
  const staticFlash = pulseAt(local, [C.sparkBursts[0]], 7, 0.55) + pulseAt(local, C.sparkBursts.slice(1), 5, 0.22);
  const sparkY = BED.y - 6 - blanketLift * 0.2;
  const thoughtPop = ci(local, [C.thought, C.thought + 12, C.thought + 24], [0.4, 1.12, 1], EASE_POP);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: switchClosed
          ? 'radial-gradient(ellipse at 65% 28%, #3A2A14 0%, #090B10 78%)'
          : 'radial-gradient(ellipse at 42% 45%, #121A2B 0%, #05070D 84%)',
        opacity: fadeIn * fadeOut,
        overflow: 'hidden',
      }}
    >
      <MultiplaneCameraRig
        local={local}
        frame={frame}
        keys={[
          { f: 0, x: 0, y: 0, z: 0.96, rotateY: -1.4 },
          { f: 220, x: -120, y: 20, z: 1.14, rotateY: 0 },
          { f: C.snap, x: -180, y: 40, z: 1.3, rotateY: 1.2 },
          { f: C.snap + 28, x: -236, y: 45, z: 1.78, rotateY: 1.6 },
          { f: C.whip, x: -244, y: 46, z: 1.84, rotateY: 1.8, stop: true },
          { f: C.whip + 45, x: 310, y: 20, z: 1.35, rotateY: -1.8, stop: true },
          { f: C.switchPress, x: 300, y: 10, z: 1.44, rotateY: -1.4 },
          { f: C.switchPress + 50, x: 300, y: -110, z: 1.38, rotateY: -1.0 },
          { f: 770, x: 240, y: -210, z: 1.25, rotateY: 0, stop: true },
          { f: 840, x: -210, y: -35, z: 1.35, rotateY: 1.4 },
          { f: 1080, x: -160, y: -25, z: 1.26, rotateY: 0.6 },
          { f: duration, x: -40, y: 0, z: 1.06, rotateY: 0 },
        ]}
        shakes={[
          { f: C.snap, amp: 7, dur: 16 },
          { f: C.sparkBursts[2], amp: 3.5, dur: 12 },
          { f: C.switchPress, amp: 4, dur: 12 },
        ]}
      >
        <DepthLayer plane="Z0">
          <BedroomFarWall frame={frame} />
        </DepthLayer>

        <DepthLayer plane="Z1">
          <BedroomMidground frame={frame} />
        </DepthLayer>

        <DepthLayer plane="Z2">
          <BoyRig
            pose={{
              worldX: 350,
              worldY: 165,
              chestLeanDeg: isSurprised ? -4 : 6,
              breathY: Math.sin(frame * 0.05) * 2,
              headRollDeg: isSurprised ? -5 : 4,
              eyeLookX: eyeX,
              eyeLookY: eyeY,
              blinkAmount: frame % 165 > 158 ? 1 : 0,
              expression: isSurprised ? 'surprised' : 'curious',
              armLift,
            }}
            scale={0.76}
          />

          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
            <rect x="380" y="758" width="540" height="80" fill="#14100D" />
            <BedWithBlanket blanketLift={blanketLift} crackle={crackle} arcSeed={arcSeed} />

            {/* Macro fibre lens inside the blanket (5.7..7.6s) */}
            {fiberMacroAlpha > 0.01 && (
              <g transform="translate(700, 565)" opacity={fiberMacroAlpha}>
                <circle cx="0" cy="0" r="108" fill="#0B1324" stroke="#38BDF8" strokeWidth="4" />
                <line x1="-80" y1="-35" x2="80" y2="35" stroke="#818CF8" strokeWidth="8" strokeLinecap="round" />
                <line x1="-80" y1="35" x2="80" y2="-35" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                <circle cx="-18" cy="-12" r="6" fill="#38BDF8" />
                <circle cx="22" cy="14" r="6" fill="#38BDF8" />
                <path d="M -12,-8 L 0,-22 L 10,8 L 24,-6" fill="none" stroke="#E0F2FE" strokeWidth="3.5" filter="drop-shadow(0 0 8px #38BDF8)" />
              </g>
            )}

            <WallCircuit
              frame={frame}
              closed={switchClosed}
              front={conduitFront}
              frontAlpha={ci(local, [C.switchPress, C.switchPress + 36, C.switchPress + 60], [1, 1, 0.25])}
              flow={conduitFront >= 1 ? 1 : 0}
              bulbGlow={bulbGlow}
              sparkAtSwitch={local >= C.switchPress && local < C.switchPress + 22}
            />

            {/* comic sound word on the spark — the only text in the first 12 seconds */}
            {/* static sparks leaping off the blanket fibres */}
            {C.sparkBursts.map((b, i) => (
              <SparkBurst key={b} local={local} at={b} x={BED.x + 40 + (i % 3) * 30 - 30} y={sparkY - (i % 2) * 18} count={i === 0 ? 22 : 9} speed={i === 0 ? 11 : 7} life={i === 0 ? 36 : 24} gravity={0.12} color="#38BDF8" seed={i + 2} size={i === 0 ? 1.4 : 1} />
            ))}
            <ShockRing local={local} at={C.snap} x={BED.x + 40} y={sparkY} r={130} color="#7DD3FC" life={26} width={3} />
            {/* contact spark inside the 6A switch as it closes */}
            <SparkBurst local={local} at={C.switchPress} x={1242} y={534} count={10} speed={6} life={20} gravity={0.2} color="#FDE68A" core="#FFFBEB" seed={8} />

            <PopWord local={local} at={C.snap} until={C.whip - 4} text="চটপট!" x={790} y={455} color="#7DD3FC" size={78} tilt={-10} />
            <PopWord local={local} at={C.switchPress + 2} until={C.switchPress + 70} text="খট্!" x={1140} y={410} color="#FDE68A" size={58} tilt={8} />

            {/* Thought bubble: spark =? bulb */}
            {thoughtAlpha > 0.01 && (
              <g opacity={thoughtAlpha} transform={`translate(760, 300) scale(${thoughtPop.toFixed(3)}) translate(-760, -300)`}>
                <circle cx="665" cy="365" r="7" fill="#F8F1E3" />
                <circle cx="695" cy="335" r="11" fill="#F8F1E3" />
                <g transform="translate(795, 255)">
                  <ellipse cx="0" cy="0" rx="110" ry="58" fill="#F8F1E3" stroke="#CBD5E1" strokeWidth="2.5" />
                  <path d="M -62,0 L -49,-12 L -41,4 L -29,-8" fill="none" stroke="#0284C7" strokeWidth="4" filter="drop-shadow(0 0 4px #38BDF8)" />
                  <text x="0" y="12" textAnchor="middle" fill="#0F172A" fontSize="38" fontWeight="800">=?</text>
                  <circle cx="54" cy="0" r="17" fill="#FBBF24" />
                </g>
              </g>
            )}
          </svg>
        </DepthLayer>

        <DepthLayer plane="Z3">
          <BedroomForeground />
        </DepthLayer>

        <DepthLayer plane="Z4">
          <DustMotes frame={frame} cx={960} cy={520} radius={620} count={26} opacity={0.85} seed={11} />
        </DepthLayer>
      </MultiplaneCameraRig>

      <BulbLightWash amount={lightFlood} />
      <ScreenFlash amount={staticFlash} color="125, 211, 252" at={[42, 56]} />

      {/* The one question the whole episode answers */}
      <VidyuterKineticTitle frame={local} startFrame={C.hook} endFrame={duration - 3} lines={[{ text: 'আসলে বিদ্যুৎ কী?', highlight: 'কী?', sizePx: 72 }]} align="center" x={960} y={880} accentColor="#FBBF24" variant="spring" />
      <KineticWord localMs={localMs} appearMs={9300} emphasizeStartMs={9500} emphasizeEndMs={11800} removeMs={12400} text="6A সুইচ" x={1280} y={820} accentColor="#FBBF24" />
    </div>
  );
};
