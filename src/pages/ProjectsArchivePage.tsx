import { useMemo, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { ProjectCard } from "../components/ProjectCard";
import { projects, projectCategories } from "../data/projects";
import { uiCopy } from "../data/content";
import { usePageMeta } from "../hooks/usePageMeta";
import type { OutletContext } from "../layouts/RootLayout";

const META = {
  en: {
    title: "Project Archive | Ahmed Darhous",
    description:
      "The full, searchable archive of Ahmed Darhous's public GitHub projects and CV-referenced systems across legal-tech, AI, security, commerce, and education.",
  },
  ar: {
    title: "أرشيف المشاريع | أحمد درهوس",
    description:
      "الأرشيف الكامل والقابل للبحث لمشاريع أحمد درهوس العامة على GitHub والأنظمة المذكورة في سيرته الذاتية عبر التقنية القانونية والذكاء الاصطناعي والأمن والتجارة والتعليم.",
  },
};

export function ProjectsArchivePage() {
  const { locale } = useOutletContext<OutletContext>();
  const copy = uiCopy[locale];
  usePageMeta({ ...META[locale], path: "/projects" });

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string>("all");

  function handleQueryChange(value: string) {
    setQuery(value);
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "all" || project.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        project.name,
        project.description[locale],
        project.category,
        ...project.tech,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category, locale]);

  return (
    <section className="page-section archive-section" aria-labelledby="archive-title">
      <SectionHeader kicker={copy.archiveKicker} title={copy.archiveTitle} body={copy.archiveBody} />

      <div className="archive-controls">
        <div className="archive-search">
          <Search aria-hidden="true" size={18} />
          <input
            type="search"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
          />
        </div>
        <div className="archive-filters" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={category === "all" ? "is-active" : ""}
            onClick={() => setCategory("all")}
          >
            {copy.filterAll}
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={category === cat ? "is-active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="archive-empty">{copy.noProjectsFound}</p>
      ) : (
        <div className="projects-grid projects-grid--archive">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
