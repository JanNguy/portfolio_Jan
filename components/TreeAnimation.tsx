"use client";

import { useEffect, useRef, useState } from "react";

/* ── Utility functions ────────────────────────────────────────────────────── */

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const mapRange = (v: number, lo: number, hi: number) => clamp((v - lo) / (hi - lo));

function getScrollProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max <= 0 ? 0 : clamp(window.scrollY / max);
}

/* ── Ring configuration ───────────────────────────────────────────────────── */

const RINGS = [
  { r: 60,  opacity: 0.12, width: 1.2, color: "#6C8EEF" },
  { r: 110, opacity: 0.10, width: 1.0, color: "#A78BFA" },
  { r: 165, opacity: 0.09, width: 0.8, color: "#6CB4EF" },
  { r: 225, opacity: 0.07, width: 0.7, color: "#8B8BFA" },
  { r: 290, opacity: 0.06, width: 0.6, color: "#6CAEDC" },
  { r: 360, opacity: 0.05, width: 0.5, color: "#A78BFA" },
  { r: 440, opacity: 0.04, width: 0.5, color: "#6C8EEF" },
] as const;

/* ── Component ────────────────────────────────────────────────────────────── */

type Props = { onStageChange?: (stage: number) => void };

export default function TreeAnimation({ onStageChange }: Props) {
  const [progress, setProgress] = useState(0);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef<number | null>(null);
  const stage = useRef(0);

  useEffect(() => {
    const tick = () => {
      const next = lerp(current.current, target.current, 0.09);
      current.current = next;
      setProgress(next);

      const s = next < 0.1 ? 0 : next < 0.45 ? 1 : next < 0.76 ? 2 : 3;
      if (s !== stage.current) {
        stage.current = s;
        onStageChange?.(s);
      }

      raf.current = Math.abs(target.current - next) > 0.001
        ? requestAnimationFrame(tick)
        : null;
    };

    const sync = () => {
      target.current = getScrollProgress();
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    /* Initial sync */
    target.current = getScrollProgress();
    current.current = target.current;
    setProgress(target.current);

    const s = target.current < 0.1 ? 0 : target.current < 0.45 ? 1 : target.current < 0.76 ? 2 : 3;
    stage.current = s;
    onStageChange?.(s);

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onStageChange]);

  /* ── Derived animation values ──────────────────────────────────────────── */

  const visibility =
    smoothstep(mapRange(progress, 0.02, 0.12)) *
    (1 - smoothstep(mapRange(progress, 0.88, 1.0)));

  const breathe = progress * 0.08;

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <div className="ambient" aria-hidden>
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" role="presentation">
        {RINGS.map((ring, i) => (
          <circle
            key={i}
            cx={300}
            cy={300}
            r={ring.r * (1 + breathe * (1 + i * 0.08))}
            fill="none"
            stroke={ring.color}
            strokeWidth={ring.width}
            strokeOpacity={ring.opacity * visibility}
          />
        ))}
      </svg>

      <style jsx>{`
        .ambient {
          position: fixed;
          right: 5vw;
          top: 50%;
          transform: translateY(-50%);
          width: 45vw;
          height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .ambient svg {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 900px) {
          .ambient {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
