import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "../config/site";
import { uiCopy } from "../data/content";
import type { Locale } from "../data/profile";

type ContactFormProps = {
  locale: Locale;
};

const PROJECT_TYPES = ["General", "Security", "Legal", "Ai", "Product"] as const;
const BUDGETS = ["Small", "Medium", "Large", "Unsure"] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];
type Budget = (typeof BUDGETS)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ locale }: ContactFormProps) {
  const copy = uiCopy[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("General");
  const [budget, setBudget] = useState<Budget>("Unsure");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function isValid() {
    return name.trim().length > 1 && EMAIL_PATTERN.test(email) && message.trim().length > 3;
  }

  function buildBody() {
    return [
      `${copy.contactFormName}: ${name}`,
      `${copy.contactFormEmail}: ${email}`,
      `${copy.contactFormType}: ${copy[`contactFormType${projectType}`]}`,
      `${copy.contactFormBudget}: ${copy[`contactFormBudget${budget}`]}`,
      "",
      message,
    ].join("\n");
  }

  function submit(channel: "email" | "whatsapp") {
    if (honeypot) return;
    if (!isValid()) {
      setStatus("error");
      return;
    }
    const body = buildBody();
    if (channel === "email") {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      window.location.href = `${siteConfig.contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
    }
    setStatus("success");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit("email");
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-name">{copy.contactFormName}</label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">{copy.contactFormEmail}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="contact-type">{copy.contactFormType}</label>
          <select
            id="contact-type"
            value={projectType}
            onChange={(event) => setProjectType(event.target.value as ProjectType)}
          >
            {PROJECT_TYPES.map((value) => (
              <option key={value} value={value}>
                {copy[`contactFormType${value}`]}
              </option>
            ))}
          </select>
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-budget">{copy.contactFormBudget}</label>
          <select id="contact-budget" value={budget} onChange={(event) => setBudget(event.target.value as Budget)}>
            {BUDGETS.map((value) => (
              <option key={value} value={value}>
                {copy[`contactFormBudget${value}`]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">{copy.contactFormMessage}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      {status === "error" ? (
        <p className="contact-form__status contact-form__status--error" role="alert">
          {copy.contactFormError}
        </p>
      ) : null}
      {status === "success" ? (
        <p className="contact-form__status contact-form__status--success" role="status">
          {copy.contactFormSuccess}
        </p>
      ) : null}

      <div className="hero-actions">
        <button type="submit" className="primary-action">
          <Mail aria-hidden="true" size={18} />
          <span>{copy.contactFormSubmit}</span>
        </button>
        <button type="button" className="secondary-action" onClick={() => submit("whatsapp")}>
          <MessageCircle aria-hidden="true" size={18} />
          <span>{copy.contactFormWhatsapp}</span>
        </button>
      </div>
    </form>
  );
}
