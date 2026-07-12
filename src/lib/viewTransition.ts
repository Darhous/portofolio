import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

/**
 * Runs `callback` (a state update that changes the route) inside the
 * native View Transitions API when the browser supports it, so the
 * clicked project's cover image morphs into the case-study banner instead
 * of hard-cutting. Falls back to a plain synchronous call everywhere else
 * (older Safari/Firefox, reduced-motion) — never blocks navigation.
 */
export function withViewTransition(callback: () => void) {
  const doc = document as ViewTransitionDocument;
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reducedMotion) {
    callback();
    return;
  }

  doc.startViewTransition(() => flushSync(callback));
}
