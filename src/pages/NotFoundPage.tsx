import { Link, useOutletContext } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { uiCopy } from "../data/content";
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

  return (
    <section className="page-section not-found-section" aria-labelledby="not-found-title">
      <p className="section-kicker">{copy.notFoundKicker}</p>
      <h1 id="not-found-title">{copy.notFoundTitle}</h1>
      <p className="hero-lede">{copy.notFoundBody}</p>
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
