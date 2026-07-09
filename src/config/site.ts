import { Facebook, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SocialKey = "instagram" | "linkedin" | "facebook" | "whatsapp" | "github";

export type SocialLink = {
  key: SocialKey;
  label: string;
  href: string;
  icon: LucideIcon;
};

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const siteConfig = {
  owner: "Ahmed Darhous",
  signature: "Designed & Developed by Ahmed Darhous",
  repository: "https://github.com/Darhous/portofolio",
  assets: {
    cv: assetPath("Profile.pdf"),
    portrait: assetPath("ahmed-darhous.png"),
  },
  contact: {
    email: "mailto:ahmeddarhous@gmail.com",
    phone: "tel:+201030002331",
    whatsapp: "https://wa.me/201030002331",
    github: "https://github.com/Darhous",
    portfolioRepository: "https://github.com/Darhous/portofolio",
    linkedin: "https://www.linkedin.com/in/darhous/",
    facebook: "https://www.facebook.com/ahmed.darhous",
    instagram: "https://www.instagram.com/darhous/",
  },
  socialOrder: ["instagram", "linkedin", "facebook", "whatsapp", "github"] as const,
} as const;

const socialByKey: Record<SocialKey, SocialLink> = {
  instagram: {
    key: "instagram",
    label: "Instagram",
    href: siteConfig.contact.instagram,
    icon: Instagram,
  },
  linkedin: {
    key: "linkedin",
    label: "LinkedIn",
    href: siteConfig.contact.linkedin,
    icon: Linkedin,
  },
  facebook: {
    key: "facebook",
    label: "Facebook",
    href: siteConfig.contact.facebook,
    icon: Facebook,
  },
  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    href: siteConfig.contact.whatsapp,
    icon: MessageCircle,
  },
  github: {
    key: "github",
    label: "GitHub",
    href: siteConfig.contact.github,
    icon: Github,
  },
};

export const socialLinks = siteConfig.socialOrder.map((key) => socialByKey[key]);
