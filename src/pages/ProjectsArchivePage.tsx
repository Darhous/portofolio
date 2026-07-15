import { useMemo, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { ProjectCard } from "../components/ProjectCard";
import { projects, projectCategories } from "../data/projects";
import type { Project } from "../data/projects";
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

type SortKey = "featured" | "newest" | "alphabetical";

function projectStartYear(project: Project): number {
  const match = project.year.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

export function ProjectsArchivePage() {
  const { locale } = useOutletContext<OutletContext>();
  const copy = uiCopy[locale];
  usePageMeta({ ...META[locale], path: "/projects" });

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string>(() => searchParams.get("category") ?? "all");
  const [sort, setSort] = useState<SortKey>(() => {
    const value = searchParams.get("sort");
    return value === "newest" || value === "alphabetical" ? value : "featured";
  });
  const [liveOnly, setLiveOnly] = useState(() => searchParams.get("live") === "1");
  const [repoOnly, setRepoOnly] = useState(() => searchParams.get("repo") === "1");
  const [caseStudyOnly, setCaseStudyOnly] = useState(() => searchParams.get("case") === "1");

  function syncParams(next: Partial<{ q: string; category: string; sort: SortKey; live: boolean; repo: boolean; case: boolean }>) {
    const merged = {
      q: next.q ?? query,
      category: next.category ?? category,
      sort: next.sort ?? sort,
      live: next.live ?? liveOnly,
      repo: next.repo ?? repoOnly,
      case: next.case ?? caseStudyOnly,
    };
    const params: Record<string, string> = {};
    if (merged.q) params.q = merged.q;
    if (merged.category !== "all") params.category = merged.category;
    if (merged.sort !== "featured") params.sort = merged.sort;
    if (merged.live) params.live = "1";
    if (merged.repo) params.repo = "1";
    if (merged.case) params.case = "1";
    setSearchParams(params, { replace: true });
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    syncParams({ q: value });
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    syncParams({ category: value });
  }

  function handleSortChange(value: SortKey) {
    setSort(value);
    syncParams({ sort: value });
  }

  function toggleLive() {
    const next = !liveOnly;
    setLiveOnly(next);
    syncParams({ live: next });
  }

  function toggleRepo() {
    const next = !repoOnly;
    setRepoOnly(next);
    syncParams({ repo: next });
  }

  function toggleCaseStudy() {
    const next = !caseStudyOnly;
    setCaseStudyOnly(next);
    syncParams({ case: next });
  }

  function clearAll() {
    setQuery("");
    setCategory("all");
    setSort("featured");
    setLiveOnly(false);
    setRepoOnly(false);
    setCaseStudyOnly(false);
    setSearchParams({}, { replace: true });
  }

  const hasActiveFilters = Boolean(query) || category !== "all" || sort !== "featured" || liveOnly || repoOnly || caseStudyOnly;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = projects.filter((project) => {
      if (category !== "all" && project.category !== category) return false;
      if (liveOnly && project.status !== "Live" && !project.live) return false;
      if (repoOnly && !project.repo) return false;
      if (caseStudyOnly && !project.caseStudy) return false;
      if (!q) return true;
      const haystack = [project.name, project.description[locale], project.category, ...project.tech]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    const sorted = [...matches];
    if (sort === "newest") {
      sorted.sort((a, b) => projectStartYear(b) - projectStartYear(a));
    } else if (sort === "alphabetical") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [query, category, sort, liveOnly, repoOnly, caseStudyOnly, locale]);

  const resultCountLabel =
    filtered.length === 1 ? copy.archiveResultCountSingular : copy.archiveResultCount.replace("{count}", String(filtered.length));

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
          <button type="button" className={category === "all" ? "is-active" : ""} onClick={() => handleCategoryChange("all")}>
            {copy.filterAll}
          </button>
          {projectCategories.map((cat) => (
            <button key={cat} type="button" className={category === cat ? "is-active" : ""} onClick={() => handleCategoryChange(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="archive-toolbar">
          <label className="archive-sort">
            <span>{copy.archiveSortLabel}</span>
            <select value={sort} onChange={(event) => handleSortChange(event.target.value as SortKey)}>
              <option value="featured">{copy.archiveSortFeatured}</option>
              <option value="newest">{copy.archiveSortNewest}</option>
              <option value="alphabetical">{copy.archiveSortAlphabetical}</option>
            </select>
          </label>

          <div className="archive-toggles" role="group" aria-label={copy.archiveSortLabel}>
            <button type="button" className={liveOnly ? "is-active" : ""} aria-pressed={liveOnly} onClick={toggleLive}>
              {copy.archiveFilterLive}
            </button>
            <button type="button" className={repoOnly ? "is-active" : ""} aria-pressed={repoOnly} onClick={toggleRepo}>
              {copy.archiveFilterRepo}
            </button>
            <button
              type="button"
              className={caseStudyOnly ? "is-active" : ""}
              aria-pressed={caseStudyOnly}
              onClick={toggleCaseStudy}
            >
              {copy.archiveFilterCaseStudy}
            </button>
          </div>

          {hasActiveFilters ? (
            <button type="button" className="archive-clear" onClick={clearAll}>
              {copy.archiveClearAll}
            </button>
          ) : null}
        </div>

        <p className="archive-result-count" role="status">
          {resultCountLabel}
        </p>
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
