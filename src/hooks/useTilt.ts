import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "./useReducedMotion";

/**
 * 3D pointer-tilt with a moving highlight. Writes the tilt transform and
 * --tilt-x/--tilt-y directly to the element (imperative, no re-renders).
 * Inert on touch devices and under prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement>(strength = 8) {
  const ref = useRef<T>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const active = finePointer && !reducedMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    function handleMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * strength;
      const rotateX = (0.5 - py) * strength;
      el!.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      el!.style.setProperty("--tilt-x", `${px * 100}%`);
      el!.style.setProperty("--tilt-y", `${py * 100}%`);
    }

    function handleLeave() {
      el!.style.transform = "";
    }

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [active, strength]);

  return ref;
}
