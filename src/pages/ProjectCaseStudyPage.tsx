import type { CSSProperties } from "react";
import { Link, Navigate, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Check, Link2, Share2 } from "lucide-react";
import { getProjectBySlug, projects } from "../data/projects";
import { uiCopy } from "../data/content";
import { getAccent } from "../data/accents";
import { getProjectImage } from "../data/projectImages";
import { ExternalLink } from "../components/ExternalLink";
import { ReadingProgress } from "../components/ReadingProgress";
import { StatChip } from "../components/StatChip";
import { CaseStudyToc } from "../components/CaseStudyToc";
import type { TocEntry } from "../components/CaseStudyToc";
import { estimateReadingMinutes } from "../lib/readingTime";
import { usePageMeta, injectJsonLd, removeJsonLd, siteOrigin } from "../hooks/usePageMeta";
import { useSwipeNavigation } from "../hooks/useSwipeNavigation";
import { useViewTransitionName } from "../hooks/useViewTransitionName";
import { withViewTransition } from "../lib/viewTransition";
import type { OutletContext } from "../layouts/RootLayout";

function CaseStudyList({ id, title, items }: { id: string; title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="case-detail__block" id={id}>
      <h3>{title}</h3>
      <ul className="clean-list clean-list--single">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function CopyLinkButton({ label, copiedLabel, shareLabel }: { label: string; copiedLabel: string; shareLabel: string }) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable: silently no-op rather than fake a success state.
    }
  }

  async function share() {
    try {
      await navigator.share({ url: window.location.href, title: document.title });
    } catch {
      // User cancelled the share sheet or it failed: no action needed.
    }
  }

  return (
    <div className="case-detail__link-actions">
      <button type="button" className="case-detail__link-action" onClick={copyLink}>
        {copied ? <Check aria-hidden="true" size={15} /> : <Link2 aria-hidden="true" size={15} />}
        <span>{copied ? copiedLabel : label}</span>
      </button>
      {canShare ? (
        <button type="button" className="case-detail__link-action" onClick={share}>
          <Share2 aria-hidden="true" size={15} />
          <span>{shareLabel}</span>
        </button>
      ) : null}
    </div>
  );
}

export function ProjectCaseStudyPage() {
  const { locale } = useOutletContext<OutletContext>();
  const copy = uiCopy[locale];
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const navigate = useNavigate();

  const title = project ? `${project.name} | Ahmed Darhous` : "Not found";
  const description = project ? project.description[locale] : "";
  usePageMeta({ title, description, path: `/projects/${slug ?? ""}` });

  const currentIndex = project ? projects.findIndex((item) => item.id === project.id) : -1;
  const nextProject = currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : undefined;
  const prevProject = currentIndex >= 0 ? projects[(currentIndex - 1 + projects.length) % projects.length] : undefined;

  const goNext = useCallback(() => {
    if (nextProject) navigate(`/projects/${nextProject.slug}`);
  }, [navigate, nextProject]);
  const goPrev = useCallback(() => {
    if (prevProject) navigate(`/projects/${prevProject.slug}`);
  }, [navigate, prevProject]);
  useSwipeNavigation(goNext, goPrev);
  const bannerRef = useViewTransitionName<HTMLImageElement>(
    project ? `project-visual-${project.slug}` : "project-visual-none",
  );

  useEffect(() => {
    if (!project) return;
    const id = "project-json-ld";
    injectJsonLd(id, {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.description[locale],
      url: `${siteOrigin}/projects/${project.slug}`,
      creator: {
        "@type": "Person",
        name: "Ahmed Darhous",
      },
      dateCreated: project.year,
      keywords: project.tech.join(", "),
      ...(project.repo ? { codeRepository: project.repo } : {}),
    });
    return () => removeJsonLd(id);
  }, [project, locale]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const cs = project.caseStudy;
  const related = projects
    .filter((item) => item.id !== project.id && item.category === project.category)
    .slice(0, 3);
  // Guaranteed defined here: currentIndex >= 0 whenever `project` resolved.
  const nextProjectSafe = nextProject!;

  const readingMinutes = estimateReadingMinutes(
    project.description[locale],
    project.impact[locale],
    project.role[locale],
    cs?.context?.[locale],
    cs?.problem?.[locale],
    cs?.constraints?.[locale],
    cs?.approach?.[locale],
    cs?.features?.[locale],
    cs?.challenges?.[locale],
    cs?.solutions?.[locale],
    cs?.results?.[locale],
    cs?.result?.[locale],
    cs?.currentStatus?.[locale],
    cs?.lessons?.[locale],
  );

  const tocEntries: TocEntry[] = cs
    ? [
        cs.context ? { id: "case-context", label: copy.context } : null,
        { id: "case-problem", label: copy.problem },
        cs.constraints ? { id: "case-constraints", label: copy.constraints } : null,
        { id: "case-approach", label: copy.approach },
        cs.features ? { id: "case-features", label: copy.features } : null,
        cs.challenges ? { id: "case-challenges", label: copy.challenges } : null,
        cs.solutions ? { id: "case-solutions", label: copy.solutions } : null,
        cs.results || cs.result ? { id: "case-results", label: copy.results } : null,
        cs.currentStatus ? { id: "case-current-status", label: copy.currentStatus } : null,
        cs.lessons ? { id: "case-lessons", label: copy.lessons } : null,
      ].filter((entry): entry is TocEntry => entry !== null)
    : [];

  return (
    <article
      className="page-section case-detail"
      style={{ "--accent": getAccent(project.category) } as CSSProperties}
    >
      <ReadingProgress />
      <div className="case-detail__topline">
        <Link className="case-detail__back" to="/projects">
          &larr; {copy.backToArchive}
        </Link>
        <CopyLinkButton label={copy.copyLink} copiedLabel={copy.linkCopied} shareLabel={copy.shareLabel} />
      </div>

      <div className="case-detail__banner">
        <img ref={bannerRef} src={getProjectImage(project.slug)} alt="" loading="eager" width="1200" height="1500" />
      </div>

      <header className="case-detail__header">
        <div className="project-card__meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
          <span>{project.year}</span>
          <span>{copy.readingTime.replace("{minutes}", String(readingMinutes))}</span>
        </div>
        <h1>{project.name}</h1>
        <p className="hero-lede">{project.description[locale]}</p>
        <p className="project-impact">{project.impact[locale]}</p>

        {project.stats && project.stats.length > 0 ? (
          <div className="stat-chips">
            {project.stats.map((stat) => (
              <StatChip key={stat.label[locale]} value={stat.value} label={stat.label[locale]} />
            ))}
          </div>
        ) : null}

        <div className="case-detail__meta-row">
          <div>
            <span className="section-kicker">{copy.role}</span>
            <p>{project.role[locale]}</p>
          </div>
          <div>
            <span className="section-kicker">{copy.source}</span>
            <p>{project.source}</p>
          </div>
        </div>

        {project.tech.length > 0 ? (
          <div className="tag-cloud">
            {project.tech.map((tech) => (
              <Link key={tech} to={`/projects?q=${encodeURIComponent(tech)}`}>
                {tech}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="project-actions">
          {project.repo ? <ExternalLink href={project.repo}>{copy.repository}</ExternalLink> : null}
          {project.live ? <ExternalLink href={project.live}>{copy.liveProject}</ExternalLink> : null}
          {!project.repo && !project.live ? <span>{copy.privateProject}</span> : null}
        </div>
      </header>

      {cs ? (
        <div className="case-detail__layout">
          <CaseStudyToc entries={tocEntries} title={copy.tocTitle} />
          <div className="case-detail__body">
            {cs.context ? (
              <div className="case-detail__block" id="case-context">
                <h3>{copy.context}</h3>
                <p>{cs.context[locale]}</p>
              </div>
            ) : null}
            <div className="case-detail__block" id="case-problem">
              <h3>{copy.problem}</h3>
              <p>{cs.problem[locale]}</p>
            </div>
            {cs.constraints ? (
              <div className="case-detail__block" id="case-constraints">
                <h3>{copy.constraints}</h3>
                <p>{cs.constraints[locale]}</p>
              </div>
            ) : null}
            <div className="case-detail__block" id="case-approach">
              <h3>{copy.approach}</h3>
              <p>{cs.approach[locale]}</p>
            </div>
            <CaseStudyList id="case-features" title={copy.features} items={cs.features?.[locale]} />
            <div className="case-detail__grid">
              <CaseStudyList id="case-challenges" title={copy.challenges} items={cs.challenges?.[locale]} />
              <CaseStudyList id="case-solutions" title={copy.solutions} items={cs.solutions?.[locale]} />
            </div>
            <CaseStudyList
              id="case-results"
              title={copy.results}
              items={cs.results?.[locale] ?? (cs.result ? [cs.result[locale]] : undefined)}
            />
            {cs.currentStatus ? (
              <div className="case-detail__block" id="case-current-status">
                <h3>{copy.currentStatus}</h3>
                <p>{cs.currentStatus[locale]}</p>
              </div>
            ) : null}
            {cs.lessons ? (
              <div className="case-detail__block" id="case-lessons">
                <h3>{copy.lessons}</h3>
                <p>{cs.lessons[locale]}</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {related.length > 0 ? (
        <div className="case-detail__related">
          <h2>{copy.relatedProjects}</h2>
          <ul className="clean-list">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/projects/${item.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    withViewTransition(() => navigate(`/projects/${item.slug}`));
                  }}
                >
                  <strong>{item.name}</strong>
                </Link>
                <span>{item.description[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Link
        className="case-detail__next"
        to={`/projects/${nextProjectSafe.slug}`}
        onClick={(event) => {
          event.preventDefault();
          withViewTransition(goNext);
        }}
      >
        <span className="section-kicker">{copy.nextProject}</span>
        <span className="case-detail__next-name">
          {nextProjectSafe.name}
          <ArrowRight aria-hidden="true" size={20} />
        </span>
      </Link>
    </article>
  );
}
