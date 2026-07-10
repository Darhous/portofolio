import { readFileSync } from "node:fs";

const site = readFileSync("src/config/site.ts", "utf8");
const footer = readFileSync("src/components/Footer.tsx", "utf8");
const social = readFileSync("src/components/SocialLinks.tsx", "utf8");
const docs = `${readFileSync("AGENTS.md", "utf8")}\n${readFileSync("CODEX_MEMORY.md", "utf8")}`;

const requiredLinks = [
  "mailto:ahmeddarhous@gmail.com",
  "tel:+201030002331",
  "https://wa.me/201030002331",
  "https://github.com/Darhous",
  "https://github.com/Darhous/portofolio",
  "https://www.linkedin.com/in/darhous/",
  "https://www.facebook.com/ahmed.darhous",
  "https://www.instagram.com/darhous/",
];

const requiredOrder = '"instagram", "linkedin", "facebook", "whatsapp", "github"';

for (const link of requiredLinks) {
  if (!site.includes(link)) {
    throw new Error(`Missing official link in site config: ${link}`);
  }
  if (!docs.includes(link)) {
    throw new Error(`Missing official link in docs: ${link}`);
  }
}

if (!site.includes(requiredOrder)) {
  throw new Error("Mandatory social order is not preserved in site config.");
}

if (!site.includes("Designed & Developed by Ahmed Darhous")) {
  throw new Error("Missing exact footer signature in site config.");
}

if (!footer.includes("siteConfig.signature") || !footer.includes("siteConfig.contact.email")) {
  throw new Error("Footer must render signature and email from centralized config.");
}

if (!social.includes("socialLinks.map")) {
  throw new Error("SocialLinks must render centralized ordered social links.");
}

const projectsSource = readFileSync("src/data/projects.ts", "utf8");
const sitemap = readFileSync("public/sitemap.xml", "utf8");

const slugMatches = [...projectsSource.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);

if (slugMatches.length === 0) {
  throw new Error("No project slugs found in src/data/projects.ts.");
}

for (const slug of slugMatches) {
  const path = `/projects/${slug}`;
  if (!sitemap.includes(path)) {
    throw new Error(`Project slug missing from sitemap.xml: ${path}`);
  }
}

console.log(`Verified ${slugMatches.length} project slugs are present in sitemap.xml.`);
console.log("Content identity verification passed.");
