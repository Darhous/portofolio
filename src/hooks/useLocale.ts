import { useEffect, useState } from "react";
import type { Locale } from "../data/profile";

const STORAGE_KEY = "locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "ar") return stored;
  return window.navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  function toggleLocale() {
    setLocale((current) => (current === "en" ? "ar" : "en"));
  }

  return { locale, toggleLocale };
}
