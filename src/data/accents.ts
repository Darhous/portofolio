import type { ProjectCategory } from "./projects";

/**
 * One restrained accent per project category. The site itself stays
 * monochrome (matte black / graphite / titanium hairlines); these colors
 * only ever appear in small details — a category label, a hairline on a
 * card, a tag border — never as a background or a dominant fill.
 */
export const categoryAccents: Record<ProjectCategory, string> = {
  Automotive: "#8a3341", // deep burgundy
  "Legal Tech": "#6b5498", // royal purple
  Security: "#1f7a5c", // emerald
  "AI Tools": "#b9925a", // champagne gold
  Mobile: "#5f92b3", // ice blue
  Hospitality: "#a8623f", // copper
  Portfolio: "#b8b2a3", // titanium silver
  Learning: "#3c5f82", // deep sapphire
  Commerce: "#8a3d4a", // burgundy (warm)
  Automation: "#a97a42", // bronze
  Career: "#6b6f42", // moss / olive
  IoT: "#5f92b3", // ice blue
  Consulting: "#5a6470", // slate
  Marketing: "#b05a41", // terracotta
  Assessment: "#4b4a80", // indigo
  Web: "#8a7a5c", // warm bronze-gray
  Data: "#3f7a78", // steel teal
};

export function getAccent(category: ProjectCategory): string {
  return categoryAccents[category] ?? "#b8b2a3";
}
