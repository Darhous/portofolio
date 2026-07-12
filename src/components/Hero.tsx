import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import { profile } from "../data/profile";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { MagneticElement } from "./motion/MagneticElement";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const copy = uiCopy[locale];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-subtitle">{profile.headline[locale]}</p>
        <p className="hero-lede">{profile.tagline[locale]}</p>
        <div className="hero-actions">
          <a className="primary-action" href={siteConfig.assets.cv} download>
            <Download aria-hidden="true" size={17} />
            <span>{profile.cta.primary[locale]}</span>
          </a>
          <Link className="secondary-action" to="/contact">
            <span>{profile.cta.secondary[locale]}</span>
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <MagneticElement className="portrait-lockup" padding={70} strength={14}>
          <picture>
            <source
              type="image/webp"
              srcSet={`${siteConfig.assets.portraitWebp.small} 420w, ${siteConfig.assets.portraitWebp.medium} 640w, ${siteConfig.assets.portraitWebp.large} 900w, ${siteConfig.assets.portraitWebp.xlarge} 1200w`}
              sizes="(max-width: 820px) min(100vw, 440px), 42vw"
            />
            <img
              src={siteConfig.assets.portrait}
              alt="Ahmed Darhous"
              width="820"
              height="1025"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </picture>
        </MagneticElement>
        <div className="portrait-caption">
          <span>{profile.name}</span>
          <small>{profile.location[locale]}</small>
        </div>
      </div>
    </section>
  );
}
