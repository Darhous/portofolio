import { Download, Github, Mail } from "lucide-react";
import { siteConfig } from "../config/site";
import { profile } from "../data/profile";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { ExternalLink } from "./ExternalLink";
import { SocialLinks } from "./SocialLinks";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const copy = uiCopy[locale];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{copy.heroKicker}</p>
        <h1 id="hero-title">{copy.heroTitle}</h1>
        <p className="hero-lede">{copy.heroBody}</p>
        <p className="hero-principle">{profile.principle[locale]}</p>
        <div className="hero-actions">
          <a className="primary-action" href={siteConfig.assets.cv} download>
            <Download aria-hidden="true" size={18} />
            <span>{profile.cta.primary[locale]}</span>
          </a>
          <ExternalLink className="secondary-action" href={siteConfig.contact.email}>
            <Mail aria-hidden="true" size={18} />
            <span>{copy.contactCta}</span>
          </ExternalLink>
          <ExternalLink className="secondary-action" href={siteConfig.repository}>
            <Github aria-hidden="true" size={18} />
            <span>{copy.repoCta}</span>
          </ExternalLink>
        </div>
        <dl className="hero-stats">
          <div>
            <dt>{copy.heroStat1Value}</dt>
            <dd>{copy.heroStat1Label}</dd>
          </div>
          <div>
            <dt>{copy.heroStat2Value}</dt>
            <dd>{copy.heroStat2Label}</dd>
          </div>
          <div>
            <dt>{copy.heroStat3Value}</dt>
            <dd>{copy.heroStat3Label}</dd>
          </div>
        </dl>
        <SocialLinks variant="labels" />
      </div>
      <div className="portrait-lockup" aria-label="Ahmed Darhous portrait">
        <picture>
          <source
            type="image/webp"
            srcSet={`${siteConfig.assets.portraitWebp.small} 384w, ${siteConfig.assets.portraitWebp.medium} 640w, ${siteConfig.assets.portraitWebp.large} 960w`}
            sizes="(max-width: 820px) min(100vw, 430px), 36vw"
          />
          <img
            src={siteConfig.assets.portrait}
            alt="Ahmed Darhous"
            width="1024"
            height="1536"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </picture>
        <div className="portrait-caption">
          <span>{profile.name}</span>
          <small>{profile.location[locale]}</small>
        </div>
      </div>
    </section>
  );
}
