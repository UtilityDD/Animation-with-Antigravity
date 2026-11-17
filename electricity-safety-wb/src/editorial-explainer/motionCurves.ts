/**
 * Deterministic Motion Curves & Kinematic Interpolators
 * Zero external dependencies. Uses Newton-Raphson approximation.
 */

export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    let u = t;
    for (let i = 0; i < 6; i++) {
      const currentX =
        3 * (1 - u) * (1 - u) * u * p1x +
        3 * (1 - u) * u * u * p2x +
        u * u * u;
      const dx =
        3 * (1 - u) * (1 - u) * p1x +
        6 * (1 - u) * u * (p2x - p1x) +
        3 * u * u * (1 - p2x);
      if (Math.abs(dx) < 1e-6) break;
      u -= (currentX - t) / dx;
      u = Math.max(0, Math.min(1, u));
    }

    return (
      3 * (1 - u) * (1 - u) * u * p1y +
      3 * (1 - u) * u * u * p2y +
      u * u * u
    );
  };
}

// 1. Editorial Snappy: Quick entrance, long organic deceleration (documentary style)
export const editorialSnappy = cubicBezier(0.12, 1, 0.22, 1);

// 2. Anticipation: Pulls slightly backward before moving forward
export const anticipationEase = cubicBezier(0.6, -0.28, 0.735, 0.045);

// 3. Smooth Camera Reframing: Gentle acceleration and deceleration
export const cameraSmooth = cubicBezier(0.4, 0, 0.2, 1);

// 4. Overshoot & Settle: Travels slightly past target then settles smoothly
export const overshootSettle = cubicBezier(0.34, 1.45, 0.64, 1);

/**
 * Physical Damped Harmonic Oscillator
 * Simulates real secondary motion: hair recoil, cloth inertia, landing dampening
 */
export function dampedOscillation(
  frame: number,
  startFrame: number,
  amplitude: number = 10,
  decay: number = 0.12,
  frequency: number = 0.35
): number {
  const t = frame - startFrame;
  if (t < 0) return 0;
  return amplitude * Math.exp(-decay * t) * Math.sin(frequency * t);
}

/**
 * Continuous Smooth Noise / Wobble
 * Produces deterministic, continuous camera shake or hand-held inertia
 */
export function pseudoNoise(seed: number, frame: number, frequency = 0.05): number {
  return (
    Math.sin(frame * frequency + seed * 1.7) * 0.5 +
    Math.sin(frame * frequency * 2.3 + seed * 3.1) * 0.3 +
    Math.sin(frame * frequency * 4.1 + seed * 5.7) * 0.2
  );
}
