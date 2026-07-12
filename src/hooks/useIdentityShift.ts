import { useEffect } from "react";

/**
 * Watches [data-identity="officer"|"builder"] sections and eases the page's
 * --identity-hue custom property between the two brand colors as the
 * dominant section changes, so the ambient background tint tracks which
 * half of the "officer who builds" duality the reader is currently in.
 */
export function useIdentityShift() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-identity]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const identity = mostVisible.target.getAttribute("data-identity");
        document.documentElement.style.setProperty(
          "--identity-hue",
          identity === "builder" ? "var(--identity-builder)" : "var(--identity-officer)",
        );
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--identity-hue");
    };
  }, []);
}
