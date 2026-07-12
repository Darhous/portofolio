import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAX_WAIT_MS = 2000;

export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function scrollToTarget(target: HTMLElement) {
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    }

    const existing = document.getElementById(id);
    if (existing) {
      scrollToTarget(existing);
      return;
    }

    // The target may belong to a lazy-loaded section that hasn't mounted
    // yet (React.lazy chunk still fetching) — wait briefly for it to appear
    // instead of silently failing to scroll.
    const observer = new MutationObserver(() => {
      const target = document.getElementById(id);
      if (target) {
        observer.disconnect();
        window.clearTimeout(timeout);
        scrollToTarget(target);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => observer.disconnect(), MAX_WAIT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [location.pathname, location.hash]);
}
