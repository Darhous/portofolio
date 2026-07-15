import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

type StatChipProps = {
  value: string;
  label: string;
};

type ParsedStat = { isNumeric: boolean; number: number; prefix: string; suffix: string; decimals: number };

function parseNumeric(value: string): ParsedStat {
  const match = value.match(/^([^\d.]*)([\d.]+)(.*)$/);
  if (!match) return { isNumeric: false, number: 0, prefix: "", suffix: value, decimals: 0 };
  const [, prefix, numeric, suffix] = match;
  const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
  return { isNumeric: true, number: parseFloat(numeric), prefix, suffix, decimals };
}

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StatChip({ value, label }: StatChipProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const { isNumeric, number, prefix, suffix, decimals } = parseNumeric(value);
  const [display, setDisplay] = useState(reducedMotion || !isNumeric ? value : `${prefix}0${suffix}`);
  const [ringProgress, setRingProgress] = useState(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      setRingProgress(1);
      return;
    }
    if (!inView) return;

    if (!isNumeric) {
      setDisplay(value);
      setRingProgress(1);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = number * eased;
      setDisplay(`${prefix}${decimals > 0 ? current.toFixed(decimals) : Math.round(current)}${suffix}`);
      setRingProgress(eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, isNumeric, number, prefix, suffix, decimals, value]);

  return (
    <div className="stat-chip" ref={ref}>
      <svg className="stat-chip__ring" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="var(--line-strong)" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - ringProgress)}
          transform="rotate(-90 24 24)"
        />
      </svg>
      <div className="stat-chip__text">
        <strong>{display}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
