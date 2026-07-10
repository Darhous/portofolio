import { useOutletContext } from "react-router-dom";
import { Mail, Phone, Download } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { ContactForm } from "../components/ContactForm";
import { ExternalLink } from "../components/ExternalLink";
import { SocialLinks } from "../components/SocialLinks";
import { siteConfig } from "../config/site";
import { uiCopy } from "../data/content";
import { usePageMeta } from "../hooks/usePageMeta";
import type { OutletContext } from "../layouts/RootLayout";

const META = {
  en: {
    title: "Contact | Ahmed Darhous",
    description:
      "Reach Ahmed Darhous for corporate security, legal-tech research, AI operations, automation, or software product collaboration.",
  },
  ar: {
    title: "تواصل | أحمد درهوس",
    description: "تواصل مع أحمد درهوس للأمن المؤسسي، البحث القانوني التقني، عمليات الذكاء الاصطناعي، الأتمتة، أو تعاون المنتجات البرمجية.",
  },
};

export function ContactPage() {
  const { locale } = useOutletContext<OutletContext>();
  const copy = uiCopy[locale];
  usePageMeta({ ...META[locale], path: "/contact" });

  return (
    <section className="page-section contact-page" aria-labelledby="contact-page-title">
      <SectionHeader kicker={copy.contactKicker} title={copy.contactTitle} body={copy.contactBody} />

      <div className="contact-page__grid">
        <ContactForm locale={locale} />

        <aside className="contact-panel contact-panel--page">
          <h3>{copy.quickContactTitle}</h3>
          <ExternalLink className="contact-method" href={siteConfig.contact.email}>
            <Mail aria-hidden="true" />
            <span>Email</span>
          </ExternalLink>
          <ExternalLink className="contact-method" href={siteConfig.contact.phone}>
            <Phone aria-hidden="true" />
            <span>Phone</span>
          </ExternalLink>
          <a className="contact-method" href={siteConfig.assets.cv} download>
            <Download aria-hidden="true" />
            <span>{copy.downloadCv}</span>
          </a>
          <SocialLinks variant="labels" />
        </aside>
      </div>
    </section>
  );
}
