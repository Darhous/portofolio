import { projects } from "./projects";

const frequency = new Map<string, number>();
for (const project of projects) {
  for (const tech of project.tech) {
    frequency.set(tech, (frequency.get(tech) ?? 0) + 1);
  }
}

export const techStack = [...frequency.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([name, count]) => ({ name, count }));

export const techStackProjectCount = projects.length;
