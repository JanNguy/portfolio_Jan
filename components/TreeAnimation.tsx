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

/* ── Configuration ───────────────────────────────────────────────────────── */

// Minimal black & white rings
const RINGS = [
  { r: 80, baseOpacity: 0.06, width: 1 },
  { r: 140, baseOpacity: 0.05, width: 1 },
  { r: 200, baseOpacity: 0.04, width: 1 },
  { r: 270, baseOpacity: 0.03, width: 0.8 },
  { r: 350, baseOpacity: 0.025, width: 0.6 },
  { r: 440, baseOpacity: 0.02, width: 0.5 },
] as const;

/* ── Component ────────────────────────────────────────────────────────────── */

type Props = { onStageChange?: (stage: number) => void };

export default function AmbientVisual({ onStageChange }: Props) {
  const [progress, setProgress] = useState(0);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef<number | null>(null);
  const stage = useRef(0);

  useEffect(() => {
    const tick = () => {
      // Faster lerp for immediate response
      const next = lerp(current.current, target.current, 0.15);
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

    /* Initial sync - immediate */
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

  // Visibility starts immediately
  const visibility = smoothstep(mapRange(progress, 0, 0.08));
  const breathe = progress * 0.1;

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <div className="ambient" aria-hidden>
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" role="presentation">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric circles - black & white */}
        {RINGS.map((ring, i) => (
          <circle
            key={i}
            cx={300}
            cy={300}
            r={ring.r * (1 + breathe * (0.5 + i * 0.1))}
            fill="none"
            stroke="#000000"
            strokeWidth={ring.width}
            strokeOpacity={ring.baseOpacity * (1 + visibility * 0.5)}
            filter="url(#glow)"
          />
        ))}

        {/* Subtle central dot */}
        <circle
          cx={300}
          cy={300}
          r={4 + breathe * 2}
          fill="#000000"
          opacity={0.08 * visibility}
        />
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
