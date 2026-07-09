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

console.log("Content identity verification passed.");
