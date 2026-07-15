import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Locale, Localized } from "../data/profile";

type RoleMorphProps = {
  words: readonly Localized<string>[];
  locale: Locale;
  interval?: number;
};

/**
 * Cycles through a short list of words with a crossfade/slide. Freezes on
 * the first word under prefers-reduced-motion instead of animating forever.
 */
export function RoleMorph({ words, locale, interval = 2200 }: RoleMorphProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || words.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [reducedMotion, words.length, interval]);

  return (
    <span className="role-morph">
      <span key={index} className="role-morph__word">
        {words[index][locale]}
      </span>
    </span>
  );
}
