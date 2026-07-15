import { useEffect, useMemo, useRef, useState } from "react";
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

const RECENT_KEY = "commandPaletteRecent";
const MAX_RECENT = 3;
const CLOSE_TRANSITION_MS = 180;

function readRecent(): string[] {
  try {
    const raw = window.sessionStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeRecent(ids: string[]) {
  try {
    window.sessionStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, MAX_RECENT)));
  } catch {
    // Private browsing / storage disabled: recent items just won't persist.
  }
}

function HighlightedLabel({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <span>{text}</span>;
  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);
  return (
    <span>
      {before}
      <mark>{match}</mark>
      {after}
    </span>
  );
}

export function CommandPalette({ locale, open, onClose, onToggleLocale, theme, onToggleTheme }: CommandPaletteProps) {
  const copy = uiCopy[locale];
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>(() => readRecent());
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const containerRef = useFocusTrap<HTMLDivElement>(open, onClose);

  // Mount synchronously within the same render that `open` flips true (rather
  // than one render later via the effect below) so the container ref already
  // exists in the DOM by the time useFocusTrap's own effect runs and looks
  // for it — otherwise its Escape/Tab listeners silently never attach.
  if (open && !mounted) {
    setMounted(true);
  }

  useEffect(() => {
    if (open) {
      window.clearTimeout(closeTimeoutRef.current);
      setRecentIds(readRecent());
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      setQuery("");
      setActiveIndex(0);
      closeTimeoutRef.current = window.setTimeout(() => setMounted(false), CLOSE_TRANSITION_MS);
    }
    return () => window.clearTimeout(closeTimeoutRef.current);
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

  const itemsById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

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

  const recentItems = useMemo(() => {
    if (query.trim()) return [];
    return recentIds.map((id) => itemsById.get(id)).filter((item): item is PaletteItem => Boolean(item));
  }, [recentIds, itemsById, query]);

  const displayList = useMemo(() => {
    if (recentItems.length === 0) return filtered;
    const recentSet = new Set(recentItems.map((item) => item.id));
    return [
      ...recentItems.map((item) => ({ ...item, group: copy.commandPaletteSectionRecent })),
      ...filtered.filter((item) => !recentSet.has(item.id)),
    ];
  }, [recentItems, filtered, copy.commandPaletteSectionRecent]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!mounted) return null;

  function activate(item: PaletteItem) {
    const next = [item.id, ...recentIds.filter((id) => id !== item.id)].slice(0, MAX_RECENT);
    writeRecent(next);
    setRecentIds(next);
    item.action();
    onClose();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, displayList.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = displayList[activeIndex];
      if (item) activate(item);
    }
  }

  let lastGroup = "";

  return (
    <div
      className={`command-palette-overlay${visible ? " is-visible" : ""}`}
      onMouseDown={onClose}
    >
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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={copy.commandPalettePlaceholder}
            aria-label={copy.commandPalettePlaceholder}
          />
          <span className="command-palette__hint">{copy.commandPaletteHintKeys}</span>
        </div>
        <div className="command-palette__results" role="listbox">
          {displayList.length === 0 ? <p className="command-palette__empty">{copy.commandPaletteEmpty}</p> : null}
          {displayList.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={`${item.group}-${item.id}`}>
                {showGroup ? <p className="command-palette__group">{item.group}</p> : null}
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`command-palette__item ${index === activeIndex ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => activate(item)}
                >
                  <span>
                    <HighlightedLabel text={item.label} query={query.trim()} />
                  </span>
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
