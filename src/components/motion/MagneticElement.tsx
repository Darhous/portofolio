import { useRef, type PointerEvent, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "../../hooks/useReducedMotion";

type MagneticElementProps = {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
};

/**
 * Wraps its children in a pointer-following "magnetic" hover effect.
 * Inert on touch devices and under prefers-reduced-motion.
 */
export function MagneticElement({ children, className, padding = 60, strength = 10 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const active = finePointer && !reducedMotion;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    const reach = Math.max(rect.width, rect.height) / 2 + padding;

    if (distance > reach) {
      resetPosition();
      return;
    }

    ref.current.style.transition = "transform 0.3s ease-out";
    ref.current.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
  }

  function resetPosition() {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.6s ease-in-out";
    ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      style={{ willChange: active ? "transform" : undefined }}
    >
      {children}
    </div>
  );
}
