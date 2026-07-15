import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { uiCopy } from "../data/content";
import { projects, featuredProjects } from "../data/projects";
import { FLAGSHIP_COUNT } from "../data/flagship";
import { usePageMeta } from "../hooks/usePageMeta";
import type { OutletContext } from "../layouts/RootLayout";

const META = {
  en: { title: "404 — Page Not Found | Ahmed Darhous", description: "This page does not exist on Ahmed Darhous's portfolio." },
  ar: { title: "404 — الصفحة غير موجودة | أحمد درهوس", description: "هذه الصفحة غير موجودة في بورتفوليو أحمد درهوس." },
};

export function NotFoundPage() {
  const { locale } = useOutletContext<OutletContext>();
  const copy = uiCopy[locale];
  usePageMeta({ ...META[locale], path: "/404" });

  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return projects
      .filter((project) => {
        const haystack = [project.name, project.description[locale], project.category, ...project.tech].join(" ").toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [query, locale]);

  const suggestions = featuredProjects.slice(0, FLAGSHIP_COUNT);

  return (
    <section className="page-section not-found-section" aria-labelledby="not-found-title">
      <p className="section-kicker">{copy.notFoundKicker}</p>
      <h1 id="not-found-title">{copy.notFoundTitle}</h1>
      <p className="hero-lede">{copy.notFoundBody}</p>

      <div className="archive-search not-found-search">
        <Search aria-hidden="true" size={18} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.notFoundSearchPlaceholder}
          aria-label={copy.notFoundSearchPlaceholder}
          autoFocus
        />
      </div>

      {query.trim() ? (
        results.length > 0 ? (
          <ul className="clean-list not-found-results">
            {results.map((project) => (
              <li key={project.id}>
                <Link to={`/projects/${project.slug}`}>
                  <strong>{project.name}</strong>
                </Link>
                <span>{project.description[locale]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="archive-empty">{copy.noProjectsFound}</p>
        )
      ) : (
        <div className="not-found-suggestions">
          <p className="section-kicker">{copy.notFoundSuggestions}</p>
          <ul className="clean-list not-found-results">
            {suggestions.map((project) => (
              <li key={project.id}>
                <Link to={`/projects/${project.slug}`}>
                  <strong>{project.name}</strong>
                </Link>
                <span>{project.description[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="hero-actions">
        <Link className="primary-action" to="/">
          <Home aria-hidden="true" size={18} />
          <span>{copy.notFoundHome}</span>
        </Link>
        <Link className="secondary-action" to="/projects">
          <Search aria-hidden="true" size={18} />
          <span>{copy.notFoundProjects}</span>
        </Link>
      </div>
    </section>
  );
}
