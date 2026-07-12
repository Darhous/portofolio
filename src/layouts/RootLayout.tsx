import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Intro } from "../components/Intro";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CommandPalette } from "../components/CommandPalette";
import { useHashScroll } from "../hooks/useHashScroll";
import { useCommandPaletteShortcut } from "../hooks/useCommandPaletteShortcut";
import type { Locale } from "../data/profile";
import type { Theme } from "../hooks/useTheme";

export type OutletContext = {
  locale: Locale;
};

type RootLayoutProps = {
  locale: Locale;
  onToggleLocale: () => void;
  theme: Theme;
  onToggleTheme: () => void;
};

export function RootLayout({ locale, onToggleLocale, theme, onToggleTheme }: RootLayoutProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  useHashScroll();
  useCommandPaletteShortcut(() => setPaletteOpen((current) => !current));

  return (
    <div className="app-shell" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Intro locale={locale} />
      <Header
        locale={locale}
        onToggleLocale={onToggleLocale}
        onOpenPalette={() => setPaletteOpen(true)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main id="main-content">
        <Outlet context={{ locale } satisfies OutletContext} />
      </main>

      <Footer />

      <CommandPalette
        locale={locale}
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleLocale={onToggleLocale}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    </div>
  );
}
