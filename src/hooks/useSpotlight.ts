import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "./useReducedMotion";

/**
 * Tracks the pointer over an element and writes --spotlight-x/--spotlight-y
 * (percentages) as CSS custom properties, for a cursor-following glow.
 * Inert on touch devices and under prefers-reduced-motion.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const active = finePointer && !reducedMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    function handleMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el!.style.setProperty("--spotlight-x", `${x}%`);
      el!.style.setProperty("--spotlight-y", `${y}%`);
    }

    el.addEventListener("pointermove", handleMove);
    return () => el.removeEventListener("pointermove", handleMove);
  }, [active]);

  return ref;
}
