import { useEffect, useState } from "react";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";

type IntroProps = {
  locale: Locale;
};

export function Intro({ locale }: IntroProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? false : true;
  });
  const copy = uiCopy[locale];

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 4200);
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
    <div className="intro" role="dialog" aria-label="Portfolio intro">
      <button className="intro-skip" type="button" onClick={() => setVisible(false)}>
        {copy.introSkip}
      </button>
      <div className="intro-lines" aria-hidden="true">
        <span>{copy.introLineOne}</span>
        <span>{copy.introLineTwo}</span>
        <span>{copy.introLineThree}</span>
      </div>
    </div>
  );
}
