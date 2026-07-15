import type { CSSProperties } from "react";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import { profile } from "../data/profile";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { MagneticElement } from "./motion/MagneticElement";
import { RoleMorph } from "./RoleMorph";
import { SocialLinks } from "./SocialLinks";
import { useSpotlight } from "../hooks/useSpotlight";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const copy = uiCopy[locale];
  const spotlightRef = useSpotlight<HTMLElement>();
  const nameWords = profile.name.split(" ");

  return (
    <section className="hero" aria-labelledby="hero-title" ref={spotlightRef}>
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-kicker">
          <RoleMorph words={profile.identityDimensions} locale={locale} />
        </p>
        <h1 id="hero-title">
          {nameWords.map((word, index) => (
            <span key={word} className="kinetic-word" style={{ "--word-index": index } as CSSProperties}>
              {word}
              {index < nameWords.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="hero-positioning">{profile.positioning[locale]}</p>
        <p className="hero-core">{profile.coreStatement[locale]}</p>
        <p className="hero-lede">{profile.systemsStatement[locale]}</p>

        <ul className="hero-dimensions">
          {profile.identityDimensions.map((dimension) => (
            <li key={dimension.en}>
              <a href="#system">{dimension[locale]}</a>
            </li>
          ))}
        </ul>

        <div className="hero-actions">
          <MagneticElement padding={30} strength={22}>
            <a className="primary-action" href="#flagship">
              <span>{profile.cta.primary[locale]}</span>
            </a>
          </MagneticElement>
          <MagneticElement padding={30} strength={22}>
            <a className="secondary-action" href={siteConfig.assets.cv} download>
              <Download aria-hidden="true" size={16} />
              <span>{profile.cta.secondary[locale]}</span>
            </a>
          </MagneticElement>
          <MagneticElement padding={30} strength={22}>
            <Link className="text-link hero-contact-link" to="/contact">
              <span>{profile.cta.contact[locale]}</span>
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </MagneticElement>
        </div>

        <SocialLinks />
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
