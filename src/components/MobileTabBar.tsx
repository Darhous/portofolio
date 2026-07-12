import { FileText, FolderKanban, Home, Mail, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";
import { uiCopy } from "../data/content";
import type { Locale } from "../data/profile";

type MobileTabBarProps = {
  locale: Locale;
};

export function MobileTabBar({ locale }: MobileTabBarProps) {
  const copy = uiCopy[locale];
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="mobile-tabbar" aria-label="Quick navigation">
      <Link to="/" className={`mobile-tabbar__item${isHome ? " is-active" : ""}`}>
        <Home aria-hidden="true" size={19} />
        <span>{copy.tabHome}</span>
      </Link>
      <Link
        to="/projects"
        className={`mobile-tabbar__item${location.pathname.startsWith("/projects") ? " is-active" : ""}`}
      >
        <FolderKanban aria-hidden="true" size={19} />
        <span>{copy.tabProjects}</span>
      </Link>
      <Link to="/#cv" className="mobile-tabbar__item">
        <FileText aria-hidden="true" size={19} />
        <span>{copy.tabCv}</span>
      </Link>
      <Link
        to="/contact"
        className={`mobile-tabbar__item${location.pathname === "/contact" ? " is-active" : ""}`}
      >
        <Mail aria-hidden="true" size={19} />
        <span>{copy.tabContact}</span>
      </Link>
      <a
        className="mobile-tabbar__whatsapp"
        href={siteConfig.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.tabWhatsapp}
        title={copy.tabWhatsapp}
      >
        <MessageCircle aria-hidden="true" size={22} />
      </a>
    </nav>
  );
}
