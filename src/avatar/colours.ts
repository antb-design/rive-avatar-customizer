export type ColourPreset = {
  name: string;
  hex: string;
};

/** The 20 preset body colours from the Figma design, exact hex values pulled from the swatch components. */
const FIGMA_COLOUR_PRESETS: ColourPreset[] = [
  { name: 'Red', hex: '#EF5350' },
  { name: 'Orange', hex: '#FF8A3D' },
  { name: 'Yellow', hex: '#F5D547' },
  { name: 'Lime', hex: '#A8D83E' },
  { name: 'Green', hex: '#48B978' },
  { name: 'Turquoise', hex: '#3FC7C3' },
  { name: 'Cyan', hex: '#42BCE8' },
  { name: 'Blue', hex: '#4384E0' },
  { name: 'Purple', hex: '#8058D9' },
  { name: 'Pink', hex: '#ED6EAD' },
  { name: 'Coral', hex: '#F87867' },
  { name: 'Peach', hex: '#F2A47F' },
  { name: 'Brown', hex: '#A4775B' },
  { name: 'Cream', hex: '#E8DFC8' },
  { name: 'Grey', hex: '#8994A3' },
  { name: 'Charcoal', hex: '#454653' },
  { name: 'Cherry', hex: '#F2385A' },
  { name: 'Satsuma', hex: '#FF6B35' },
  { name: 'Lemon', hex: '#F4EB32' },
  { name: 'Kiwi', hex: '#7ED957' },
];

/**
 * 20 additional complementary swatches, doubling the set: a realistic
 * skin-tone range (since this palette is also literally "skin colour" for
 * the character) plus a few more vibrant hues to keep the same variety as
 * the original fun-monster set.
 */
const EXTENDED_COLOUR_PRESETS: ColourPreset[] = [
  { name: 'Porcelain', hex: '#FBE3D0' },
  { name: 'Ivory', hex: '#F5D7B8' },
  { name: 'Honey', hex: '#E8B589' },
  { name: 'Amber', hex: '#D99A52' },
  { name: 'Sienna', hex: '#B06B3A' },
  { name: 'Umber', hex: '#7A4B32' },
  { name: 'Espresso', hex: '#4A2E23' },
  { name: 'Ebony', hex: '#2E1F1A' },
  { name: 'Mint', hex: '#5FE0B0' },
  { name: 'Sky', hex: '#7EC8F2' },
  { name: 'Indigo', hex: '#5B52D6' },
  { name: 'Lavender', hex: '#B79CF0' },
  { name: 'Magenta', hex: '#DB4FA8' },
  { name: 'Rose', hex: '#F4A0C0' },
  { name: 'Rust', hex: '#C1552C' },
  { name: 'Gold', hex: '#E8B923' },
  { name: 'Olive', hex: '#8C9245' },
  { name: 'Slate', hex: '#5C7080' },
  { name: 'Plum', hex: '#7A3B5E' },
  { name: 'Teal', hex: '#2A8C82' },
];

export const COLOUR_PRESETS: ColourPreset[] = [...FIGMA_COLOUR_PRESETS, ...EXTENDED_COLOUR_PRESETS];

/**
 * A smaller, more natural palette for hair colour specifically — separate
 * from the body colour set so the hair tab's colour row stays compact.
 * Covers common natural tones plus a handful of fun creative ones.
 */
export const HAIR_COLOUR_PRESETS: ColourPreset[] = [
  { name: 'Black', hex: '#1C1C1E' },
  { name: 'Espresso', hex: '#3A2317' },
  { name: 'Brown', hex: '#6B4226' },
  { name: 'Light Brown', hex: '#9C6B43' },
  { name: 'Blonde', hex: '#E8C27A' },
  { name: 'Platinum', hex: '#EDE4D3' },
  { name: 'Ginger', hex: '#C1552C' },
  { name: 'Silver', hex: '#A8A8A8' },
  { name: 'White', hex: '#F5F5F5' },
  { name: 'Pink', hex: '#ED6EAD' },
  { name: 'Blue', hex: '#4384E0' },
  { name: 'Green', hex: '#48B978' },
  { name: 'Purple', hex: '#8058D9' },
];
