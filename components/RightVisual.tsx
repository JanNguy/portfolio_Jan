"use client";

import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";

/* ── Math Utilities ─────────────────────────────────────────────────────── */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function getScrollProgress(): number {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max <= 0 ? 0 : clamp(window.scrollY / max, 0, 1);
}

/* ── Orbital System Configuration ───────────────────────────────────────── */

interface Orbital {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  phase: number;
}

// Create orbital elements
const createOrbitals = (count: number, baseRadius: number, speed: number, sizeRange: [number, number]): Orbital[] => {
  return Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * Math.PI * 2,
    radius: baseRadius + (Math.random() - 0.5) * 20,
    speed: speed * (0.8 + Math.random() * 0.4),
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    phase: Math.random() * Math.PI * 2,
  }));
};

// Pre-generate stable orbitals
const INNER_ORBITALS = createOrbitals(12, 80, 0.4, [4, 7]);
const MIDDLE_ORBITALS = createOrbitals(18, 140, 0.25, [3, 5]);
const OUTER_ORBITALS = createOrbitals(24, 210, 0.15, [2, 4]);

/* ── Component ───────────────────────────────────────────────────────────── */

type Props = { onStageChange?: (stage: number) => void };

export default function RightVisual({ onStageChange }: Props) {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const timeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const onStageChangeRef = useRef(onStageChange);

  // Keep callback ref updated
  useEffect(() => {
    onStageChangeRef.current = onStageChange;
  }, [onStageChange]);

  useLayoutEffect(() => {
    setMounted(true);

    let lastStage = -1;

    const animate = () => {
      timeRef.current += 0.016; // ~60fps time increment

      // Smooth scroll interpolation
      progressRef.current = lerp(progressRef.current, targetRef.current, 0.06);
      const p = progressRef.current;

      // Stage detection
      const stage = p < 0.15 ? 0 : p < 0.45 ? 1 : p < 0.72 ? 2 : 3;
      if (stage !== lastStage) {
        lastStage = stage;
        onStageChangeRef.current?.(stage);
      }

      setTick(t => t + 1);
      setScrollProgress(p);

      rafRef.current = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      targetRef.current = getScrollProgress();
    };

    onScroll();
    progressRef.current = targetRef.current;

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Time-based animation values
  const time = mounted ? timeRef.current : 0;
  const p = scrollProgress;

  // === STAGE-BASED TRANSFORMATIONS ===

  // Stage 0 (0-15%): Dormant - particles scattered, invisible core
  // Stage 1 (15-45%): Forming - particles converge, core emerges
  // Stage 2 (45-72%): Active - full orbital system, connections visible
  // Stage 3 (72-100%): Transcending - expansion, dissolution

  const stage0 = 1 - clamp(p / 0.15, 0, 1);
  const stage1 = clamp((p - 0.15) / 0.30, 0, 1);
  const stage2 = clamp((p - 0.45) / 0.27, 0, 1);
  const stage3 = clamp((p - 0.72) / 0.28, 0, 1);

  // Core properties
  const coreRadius = lerp(0, 35, stage1) + lerp(0, 15, stage2);
  const coreOpacity = lerp(0, 0.9, stage1) * (1 - stage3 * 0.3);
  const corePulse = 1 + Math.sin(time * 2) * 0.08;

  // Glow properties
  const glowRadius = coreRadius * 3;
  const glowOpacity = stage1 * 0.25 * (1 - stage3 * 0.5);

  // Orbital properties
  const orbitalScale = lerp(0.3, 1, stage1);
  const orbitalOpacity = stage1 * (1 - stage3 * 0.4);
  const connectionOpacity = stage2 * 0.15;

  // Generate orbital positions
  const getOrbitalPosition = (orb: Orbital, t: number, scale: number) => {
    const angle = orb.angle + t * orb.speed;
    const breathe = 1 + Math.sin(t * 0.5 + orb.phase) * 0.05;
    const radius = orb.radius * scale * breathe;
    return {
      x: 250 + Math.cos(angle) * radius,
      y: 250 + Math.sin(angle) * radius,
      size: orb.size * scale,
    };
  };

  return (
    <div className="right-visual" aria-hidden>
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          {/* Core gradient */}
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="1" />
            <stop offset="60%" stopColor="#000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* Glow gradient */}
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#000" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* Outer aura */}
          <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="50%" stopColor="#000" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          <filter id="coreBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>

          <filter id="glowBlur">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <filter id="auraBlur">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>

        {/* Outer aura - appears during stage 2 */}
        {stage2 > 0 && (
          <circle
            cx={250}
            cy={250}
            r={230 + stage2 * 40}
            fill="url(#auraGrad)"
            opacity={stage2 * (1 - stage3 * 0.5)}
            filter="url(#auraBlur)"
          />
        )}

        {/* Connection lines between orbitals - stage 2 */}
        {stage2 > 0 && mounted && (
          <g opacity={connectionOpacity}>
            {/* Inner to middle connections */}
            {INNER_ORBITALS.slice(0, 6).map((inner, i) => {
              const middle = MIDDLE_ORBITALS[i * 2];
              if (!middle) return null;
              const p1 = getOrbitalPosition(inner, time, orbitalScale);
              const p2 = getOrbitalPosition(middle, time, orbitalScale);
              return (
                <line
                  key={`conn-${i}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#000"
                  strokeWidth="0.5"
                  opacity={0.1}
                />
              );
            })}
          </g>
        )}

        {/* Orbital trails - subtle arcs */}
        {stage1 > 0 && (
          <g opacity={orbitalOpacity * 0.3}>
            <circle
              cx={250}
              cy={250}
              r={80 * orbitalScale}
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
              strokeDasharray="3 6"
            />
            <circle
              cx={250}
              cy={250}
              r={140 * orbitalScale}
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            />
            <circle
              cx={250}
              cy={250}
              r={210 * orbitalScale}
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
              strokeDasharray="5 10"
            />
          </g>
        )}

        {/* Outer orbitals */}
        {mounted && stage1 > 0 && OUTER_ORBITALS.map((orb, i) => {
          const pos = getOrbitalPosition(orb, time, orbitalScale);
          return (
            <circle
              key={`outer-${i}`}
              cx={pos.x}
              cy={pos.y}
              r={pos.size * orbitalOpacity}
              fill="#000"
              opacity={orbitalOpacity * 0.25}
            />
          );
        })}

        {/* Middle orbitals */}
        {mounted && stage1 > 0 && MIDDLE_ORBITALS.map((orb, i) => {
          const pos = getOrbitalPosition(orb, time, orbitalScale);
          return (
            <circle
              key={`middle-${i}`}
              cx={pos.x}
              cy={pos.y}
              r={pos.size * orbitalOpacity}
              fill="#000"
              opacity={orbitalOpacity * 0.4}
            />
          );
        })}

        {/* Inner orbitals */}
        {mounted && stage1 > 0 && INNER_ORBITALS.map((orb, i) => {
          const pos = getOrbitalPosition(orb, time, orbitalScale);
          return (
            <circle
              key={`inner-${i}`}
              cx={pos.x}
              cy={pos.y}
              r={pos.size * orbitalOpacity * 1.2}
              fill="#000"
              opacity={orbitalOpacity * 0.6}
            />
          );
        })}

        {/* Main glow */}
        {stage1 > 0 && (
          <circle
            cx={250}
            cy={250}
            r={glowRadius * corePulse}
            fill="url(#glowGrad)"
            opacity={glowOpacity}
            filter="url(#glowBlur)"
          />
        )}

        {/* Core */}
        {stage1 > 0 && (
          <circle
            cx={250}
            cy={250}
            r={coreRadius * corePulse}
            fill="url(#coreGrad)"
            opacity={coreOpacity}
            filter="url(#coreBlur)"
          />
        )}

        {/* Bright center */}
        {stage1 > 0 && (
          <circle
            cx={250}
            cy={250}
            r={lerp(0, 12, stage1)}
            fill="#000"
            opacity={coreOpacity * 0.8}
          />
        )}

        {/* Stage 3 expansion rings */}
        {stage3 > 0 && (
          <g>
            {[0, 1, 2].map((i) => (
              <circle
                key={`expansion-${i}`}
                cx={250}
                cy={250}
                r={80 + stage3 * 150 + i * 40}
                fill="none"
                stroke="#000"
                strokeWidth="1"
                strokeOpacity={stage3 * 0.05 * (1 - i * 0.3)}
              />
            ))}
          </g>
        )}
      </svg>

      <style jsx>{`
        .right-visual {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 50vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
        }

        .right-visual svg {
          width: 100%;
          max-width: 700px;
          height: auto;
        }

        @media (max-width: 900px) {
          .right-visual {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}