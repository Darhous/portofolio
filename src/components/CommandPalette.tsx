import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { navHref, navItems, uiCopy } from "../data/content";
import { projects } from "../data/projects";
import { siteConfig } from "../config/site";
import type { Locale } from "../data/profile";
import type { Theme } from "../hooks/useTheme";

type CommandPaletteProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  onToggleLocale: () => void;
  theme: Theme;
  onToggleTheme: () => void;
};

type PaletteItem = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  action: () => void;
};

export function CommandPalette({ locale, open, onClose, onToggleLocale, theme, onToggleTheme }: CommandPaletteProps) {
  const copy = uiCopy[locale];
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useFocusTrap<HTMLDivElement>(open, onClose);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const items = useMemo<PaletteItem[]>(() => {
    const navigation: PaletteItem[] = navItems.map((item) => ({
      id: `nav-${navHref(item)}`,
      group: copy.commandPaletteSectionNav,
      label: item.label[locale],
      action: () => navigate(navHref(item)),
    }));

    const projectItems: PaletteItem[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      group: copy.commandPaletteSectionProjects,
      label: project.name,
      hint: project.category,
      action: () => navigate(`/projects/${project.slug}`),
    }));

    const actions: PaletteItem[] = [
      {
        id: "action-cv",
        group: copy.commandPaletteSectionActions,
        label: copy.actionDownloadCv,
        action: () => {
          const link = document.createElement("a");
          link.href = siteConfig.assets.cv;
          link.download = "Ahmed-Darhous-CV.pdf";
          link.click();
        },
      },
      {
        id: "action-email",
        group: copy.commandPaletteSectionActions,
        label: copy.actionEmail,
        action: () => window.open(siteConfig.contact.email, "_blank"),
      },
      {
        id: "action-whatsapp",
        group: copy.commandPaletteSectionActions,
        label: copy.actionWhatsapp,
        action: () => window.open(siteConfig.contact.whatsapp, "_blank", "noopener,noreferrer"),
      },
      {
        id: "action-language",
        group: copy.commandPaletteSectionActions,
        label: copy.actionToggleLanguage,
        action: onToggleLocale,
      },
      {
        id: "action-theme",
        group: copy.commandPaletteSectionActions,
        label: theme === "dark" ? copy.themeToggleToLight : copy.themeToggleToDark,
        action: onToggleTheme,
      },
      {
        id: "action-top",
        group: copy.commandPaletteSectionActions,
        label: copy.actionBackToTop,
        action: () => {
          navigate("/");
          window.scrollTo({ top: 0, behavior: "auto" });
        },
      },
    ];

    return [...navigation, ...projectItems, ...actions];
  }, [locale, copy, navigate, onToggleLocale, theme, onToggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.hint?.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  function activate(item: PaletteItem) {
    item.action();
    onClose();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) activate(item);
    }
  }

  let lastGroup = "";

  return (
    <div className="command-palette-overlay" onMouseDown={onClose}>
      <div
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label={copy.commandPaletteOpen}
        ref={containerRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="command-palette__search">
          <Search aria-hidden="true" size={18} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={copy.commandPalettePlaceholder}
            aria-label={copy.commandPalettePlaceholder}
          />
          <span className="command-palette__hint">{copy.commandPaletteHintKeys}</span>
        </div>
        <div className="command-palette__results" role="listbox">
          {filtered.length === 0 ? <p className="command-palette__empty">{copy.commandPaletteEmpty}</p> : null}
          {filtered.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={item.id}>
                {showGroup ? <p className="command-palette__group">{item.group}</p> : null}
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`command-palette__item ${index === activeIndex ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => activate(item)}
                >
                  <span>{item.label}</span>
                  {item.hint ? <small>{item.hint}</small> : null}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
