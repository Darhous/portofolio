import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { navHref, navItems, uiCopy } from "../data/content";
import type { Locale } from "../data/profile";

const DRAWER_TRANSITION_MS = 320;

type HeaderProps = {
  locale: Locale;
  onToggleLocale: () => void;
  onOpenPalette: () => void;
};

export function Header({ locale, onToggleLocale, onOpenPalette }: HeaderProps) {
  const copy = uiCopy[locale];
  const location = useLocation();
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const drawerRef = useFocusTrap<HTMLDivElement>(drawerOpen, () => closeDrawer());

  function openDrawer() {
    window.clearTimeout(closeTimeoutRef.current);
    setDrawerMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawerOpen(true)));
  }

  function closeDrawer() {
    setDrawerOpen(false);
    closeTimeoutRef.current = window.setTimeout(() => setDrawerMounted(false), DRAWER_TRANSITION_MS);
  }

  useEffect(() => {
    setDrawerOpen(false);
    setDrawerMounted(false);
    window.clearTimeout(closeTimeoutRef.current);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = drawerMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerMounted]);

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  return (
    <>
      <header className="topbar" id="top">
        <Link className="brand" to="/" aria-label="Ahmed Darhous home">
          AD
        </Link>

        <nav className="main-nav main-nav--desktop" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={navHref(item)} to={navHref(item)}>
              {item.label[locale]}
            </Link>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            className="icon-button"
            type="button"
            onClick={onOpenPalette}
            aria-label={copy.commandPaletteOpen}
            title={copy.commandPaletteOpen}
          >
            <Search aria-hidden="true" size={17} />
            <kbd>⌘K</kbd>
          </button>
          <button className="language-toggle" type="button" onClick={onToggleLocale}>
            {copy.switchLanguage}
          </button>
          <button
            className="hamburger"
            type="button"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            onClick={() => (drawerOpen ? closeDrawer() : openDrawer())}
            aria-label={drawerOpen ? copy.menuClose : copy.menuOpen}
          >
            {drawerOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {drawerMounted
        ? createPortal(
            <div
              className={`mobile-nav-overlay${drawerOpen ? " is-open" : ""}`}
              dir={locale === "ar" ? "rtl" : "ltr"}
              onMouseDown={closeDrawer}
              inert={!drawerOpen}
            >
              <div
                id="mobile-nav"
                className="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label={copy.menuOpen}
                ref={drawerRef}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <button type="button" className="mobile-nav__close" onClick={closeDrawer} aria-label={copy.menuClose}>
                  <X aria-hidden="true" />
                </button>
                <nav aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <Link key={navHref(item)} to={navHref(item)} onClick={closeDrawer}>
                      {item.label[locale]}
                    </Link>
                  ))}
                </nav>
                <button
                  type="button"
                  className="mobile-nav__palette"
                  onClick={() => {
                    closeDrawer();
                    onOpenPalette();
                  }}
                >
                  <Search aria-hidden="true" size={17} />
                  <span>{copy.commandPaletteOpen}</span>
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
