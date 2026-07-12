const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function getProjectImage(slug: string): string {
  return assetPath(`projects/${slug}.webp`);
}
