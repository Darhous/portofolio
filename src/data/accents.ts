import type { ProjectCategory } from "./projects";

/**
 * Two curated color families instead of one hue per category — magenta/
 * violet (the site's own CTA-gradient identity, "the officer") for formal /
 * process-driven categories, and teal/cyan ("the builder") for hands-on
 * technical categories. Keeps per-category distinction while reading as one
 * coordinated palette across the archive grid instead of a random rainbow.
 */
const OFFICER = ["#b600a8", "#9b2fae", "#7621b0", "#8a3d84", "#5d3f8f"];
const BUILDER = ["#2dd4bf", "#14b8a6", "#0ea5b7", "#3fc1c9", "#0d9488"];

const OFFICER_CATEGORIES: ProjectCategory[] = [
  "Legal Tech",
  "Security",
  "Consulting",
  "Assessment",
  "Career",
  "Marketing",
  "Automotive",
  "Hospitality",
  "Portfolio",
];

const BUILDER_CATEGORIES: ProjectCategory[] = [
  "AI Tools",
  "Mobile",
  "Learning",
  "Commerce",
  "Automation",
  "IoT",
  "Web",
  "Data",
];

export const categoryAccents: Record<ProjectCategory, string> = {} as Record<ProjectCategory, string>;
OFFICER_CATEGORIES.forEach((category, index) => {
  categoryAccents[category] = OFFICER[index % OFFICER.length];
});
BUILDER_CATEGORIES.forEach((category, index) => {
  categoryAccents[category] = BUILDER[index % BUILDER.length];
});

export function getAccent(category: ProjectCategory): string {
  return categoryAccents[category] ?? "#b8b2a3";
}
