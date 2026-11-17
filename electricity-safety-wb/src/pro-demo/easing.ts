// High-performance cubic bezier evaluator with zero dependencies
export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    // Newton-Raphson approximation for parameter u corresponding to t (x-axis)
    let u = t;
    for (let i = 0; i < 5; i++) {
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

    // Evaluate y at parameter u
    return (
      3 * (1 - u) * (1 - u) * u * p1y +
      3 * (1 - u) * u * u * p2y +
      u * u * u
    );
  };
}

// Studio Standard Curves:
// Snappy exponential deceleration (Kurzgesagt fast-in, slow-out)
export const snappyEase = cubicBezier(0.16, 1, 0.3, 1);
// Anticipation ease (pulls back slightly before springing forward)
export const anticipateEase = cubicBezier(0.68, -0.4, 0.27, 1.35);
// Smooth organic ease
export const smoothEase = cubicBezier(0.4, 0, 0.2, 1);

// Damped harmonic oscillator for natural organic follow-through
export function dampedOscillation(
  frame: number,
  triggerFrame: number,
  amplitude: number = 10,
  decay: number = 0.12,
  frequency: number = 0.4
): number {
  const t = frame - triggerFrame;
  if (t < 0) return 0;
  return amplitude * Math.exp(-decay * t) * Math.sin(frequency * t);
}

