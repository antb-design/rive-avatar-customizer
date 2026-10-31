/**
 * Resolves a filename anywhere under src/icons/ (including subfolders, e.g.
 * src/icons/buttons/) to its built asset URL via Vite's asset pipeline,
 * rather than importing every file by hand one at a time.
 */
const modules = import.meta.glob('../icons/**/*.svg', { eager: true }) as Record<string, { default: string }>;

export function iconUrl(filename: string): string {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${filename}`));
  if (!entry) {
    throw new Error(`Missing icon: src/icons/${filename} (searched src/icons and its subfolders)`);
  }
  return entry[1].default;
}
