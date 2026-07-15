import { useEffect, useState } from "react";

export type TocEntry = { id: string; label: string };

type CaseStudyTocProps = {
  entries: TocEntry[];
  title: string;
};

export function CaseStudyToc({ entries, title }: CaseStudyTocProps) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    if (entries.length === 0) return;
    const elements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav className="case-toc" aria-label={title}>
      <p className="case-toc__title">{title}</p>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className={activeId === entry.id ? "is-active" : ""} aria-current={activeId === entry.id ? "true" : undefined}>
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
