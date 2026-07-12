import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";

type IntroProps = {
  locale: Locale;
  isHome: boolean;
};

const SEEN_KEY = "introSeen";

export function Intro({ locale, isHome }: IntroProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!isHome) return false;
    if (window.sessionStorage.getItem(SEEN_KEY)) return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const copy = uiCopy[locale];

  function dismiss() {
    setVisible(false);
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private browsing / storage disabled: replay just won't be remembered.
    }
  }

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(dismiss, 3200);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) {
    return (
      <button className="intro-replay" type="button" onClick={() => setVisible(true)}>
        {copy.introReplay}
      </button>
    );
  }

  return (
    <div className="intro" role="dialog" aria-label="Ahmed Darhous - Portfolio intro">
      <button className="intro-skip" type="button" onClick={dismiss}>
        {copy.introSkip}
      </button>
      <div className="intro-wordmark">
        <strong>{profile.name}</strong>
        <span dir="ltr">Security. Strategy. Discipline.</span>
      </div>
    </div>
  );
}
