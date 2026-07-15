import { Link } from "react-router-dom";
import { techStack, techStackProjectCount } from "../data/techStack";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { SectionHeader } from "./SectionHeader";

const DISPLAY_COUNT = 18;

type TechStackSectionProps = {
  locale: Locale;
};

export function TechStackSection({ locale }: TechStackSectionProps) {
  const copy = uiCopy[locale];
  const top = techStack.slice(0, DISPLAY_COUNT);
  const maxCount = top[0]?.count ?? 1;
  const body = copy.stackBody.replace("{count}", String(techStackProjectCount));

  return (
    <section className="page-section" id="stack" aria-labelledby="stack-title">
      <SectionHeader kicker={copy.stackKicker} title={copy.stackTitle} body={body} />
      <ul className="tech-stack-list">
        {top.map((entry) => (
          <li className="tech-stack-item" key={entry.name}>
            <Link className="tech-stack-item__link" to={`/projects?q=${encodeURIComponent(entry.name)}`}>
              <span className="tech-stack-item__name">{entry.name}</span>
              <span className="tech-stack-item__bar-track" aria-hidden="true">
                <span
                  className="tech-stack-item__bar-fill"
                  style={{ width: `${Math.max(6, (entry.count / maxCount) * 100)}%` }}
                />
              </span>
              <span className="tech-stack-item__count">{entry.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
