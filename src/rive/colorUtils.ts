/**
 * Small, dependency-free helpers for moving between the hex strings HTML
 * colour inputs use (e.g. "#af3131") and the values Rive's colour data
 * bindings work with.
 */

export type Rgb = { r: number; g: number; b: number };

/** "#af3131" or "af3131" -> { r, g, b } (0-255 each). */
export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Rive reports colour property values back as a single 32-bit ARGB
 * integer. Convert that to a "#rrggbb" string for display/inputs.
 */
export function argbIntToHex(value: number): string {
  const r = (value >> 16) & 0xff;
  const g = (value >> 8) & 0xff;
  const b = value & 0xff;
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}
