import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { navHref, navItems, uiCopy } from "../data/content";
import type { Locale } from "../data/profile";

type HeaderProps = {
  locale: Locale;
  onToggleLocale: () => void;
  onOpenPalette: () => void;
};

export function Header({ locale, onToggleLocale, onOpenPalette }: HeaderProps) {
  const copy = uiCopy[locale];
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useFocusTrap<HTMLDivElement>(drawerOpen, () => setDrawerOpen(false));

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

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
            onClick={() => setDrawerOpen((current) => !current)}
            aria-label={drawerOpen ? copy.menuClose : copy.menuOpen}
          >
            {drawerOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {drawerOpen
        ? createPortal(
            <div className="mobile-nav-overlay" onMouseDown={() => setDrawerOpen(false)}>
              <div
                id="mobile-nav"
                className="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label={copy.menuOpen}
                ref={drawerRef}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <nav aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <Link key={navHref(item)} to={navHref(item)} onClick={() => setDrawerOpen(false)}>
                      {item.label[locale]}
                    </Link>
                  ))}
                </nav>
                <button
                  type="button"
                  className="mobile-nav__palette"
                  onClick={() => {
                    setDrawerOpen(false);
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
