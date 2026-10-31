import { iconUrl } from './iconRegistry';

/**
 * Item grid contents for each customisation tab.
 *
 * Each entry's `value` is the exact Rive enum value it drives — these lists
 * are the intersection of "has art supplied" and "exists in the live Rive
 * file's enum", so every visible item is guaranteed to work.
 *
 * Known gaps between the two (not included below, flagged for follow-up):
 * - hairStyles: art exists for a 12th style ("hairstyle_12.svg") with no
 *   matching Rive enum value yet (Rive only goes up to hair_11).
 * - costume: art exists for "Aviator" (costume_aviator.svg) with no Rive
 *   enum value, and the Rive `costume` enum has four older values
 *   (`skullTshirt`, `superHero`, `greenJacket`, `frog`) with no matching
 *   art — these predate the current costume set.
 */

export type AvatarItem = {
  value: string;
  label: string;
  icon: string;
};

const NONE_ICON = iconUrl('none.svg');

export const HAIR_ITEMS: AvatarItem[] = [
  { value: 'none', label: 'None', icon: NONE_ICON },
  { value: 'hair_1', label: 'Style 1', icon: iconUrl('hairstyle_1.svg') },
  { value: 'hair_2', label: 'Style 2', icon: iconUrl('hairstyle_2.svg') },
  { value: 'hair_3', label: 'Style 3', icon: iconUrl('hairstyle_3.svg') },
  { value: 'hair_4', label: 'Style 4', icon: iconUrl('hairstyle_4.svg') },
  { value: 'hair_5', label: 'Style 5', icon: iconUrl('hairstyle_5.svg') },
  { value: 'hair_6', label: 'Style 6', icon: iconUrl('hairstyle_6.svg') },
  { value: 'hair_7', label: 'Style 7', icon: iconUrl('hairstyle_7.svg') },
  { value: 'hair_8', label: 'Style 8', icon: iconUrl('hairstyle_8.svg') },
  { value: 'hair_9', label: 'Style 9', icon: iconUrl('hairstyle_9.svg') },
  { value: 'hair_10', label: 'Style 10', icon: iconUrl('hairstyle_10.svg') },
  { value: 'hair_11', label: 'Style 11', icon: iconUrl('hairstyle_11.svg') },
];

export const COSTUME_ITEMS: AvatarItem[] = [
  { value: 'none', label: 'None', icon: NONE_ICON },
  { value: 'bolt', label: 'Bolt', icon: iconUrl('costume_bolt.svg') },
  { value: 'puffer', label: 'Puffer', icon: iconUrl('costume_puffer.svg') },
  { value: 'skate', label: 'Skate', icon: iconUrl('costume_skate.svg') },
  { value: 'retro', label: 'Retro', icon: iconUrl('costume_retro1.svg') },
  { value: 'retro2', label: 'Retro 2', icon: iconUrl('costume_retro2.svg') },
  { value: 'aprin', label: 'Apron', icon: iconUrl('costume_aprin.svg') },
  { value: 'gamer', label: 'Gamer', icon: iconUrl('costume_gamer.svg') },
  { value: 'music', label: 'Music', icon: iconUrl('costume_music.svg') },
  { value: 'art', label: 'Art', icon: iconUrl('costume_art.svg') },
  { value: 'tieDye', label: 'Tie-dye', icon: iconUrl('costume_tiedye.svg') },
  { value: 'bricks', label: 'Bricks', icon: iconUrl('costume_bricks.svg') },
  { value: 'retro3', label: 'Retro 3', icon: iconUrl('costume_retro3.svg') },
];

export const HEAD_WEAR_ITEMS: AvatarItem[] = [
  { value: 'none', label: 'None', icon: NONE_ICON },
  { value: 'party', label: 'Party', icon: iconUrl('headware_party.svg') },
  { value: 'crown', label: 'Crown', icon: iconUrl('headware_crown.svg') },
  { value: 'cat', label: 'Cat', icon: iconUrl('headware_cat.svg') },
  { value: 'alien', label: 'Alien', icon: iconUrl('headware_alien.svg') },
  { value: 'frog', label: 'Frog', icon: iconUrl('headware_frog.svg') },
  { value: 'slime', label: 'Slime', icon: iconUrl('headware_slime.svg') },
  { value: 'pirate', label: 'Pirate', icon: iconUrl('headware_pirate.svg') },
  { value: 'cap', label: 'Cap', icon: iconUrl('headware_cap.svg') },
  { value: 'bucket', label: 'Bucket hat', icon: iconUrl('headware_bucket.svg') },
  { value: 'bear', label: 'Bear', icon: iconUrl('headware_bear.svg') },
  { value: 'headphonesCat', label: 'Headphones cat', icon: iconUrl('headware_headphones_cat.svg') },
  { value: 'helmet', label: 'Helmet', icon: iconUrl('headware_helmet.svg') },
];

export const EYE_WEAR_ITEMS: AvatarItem[] = [
  { value: 'none', label: 'None', icon: NONE_ICON },
  { value: 'superHero', label: 'Superhero', icon: iconUrl('eyeware_superhero.svg') },
  { value: 'cinema', label: 'Cinema', icon: iconUrl('eyeware_cinema.svg') },
  { value: 'fire', label: 'Fire', icon: iconUrl('eyeware_fire.svg') },
  { value: 'ice', label: 'Ice', icon: iconUrl('eyeware_ice.svg') },
  { value: 'rainbow', label: 'Rainbow', icon: iconUrl('eyeware_rainbow.svg') },
  { value: 'cheese', label: 'Cheese', icon: iconUrl('eyeware_cheese.svg') },
  { value: 'octopus', label: 'Octopus', icon: iconUrl('eyeware_octopus.svg') },
  { value: 'wizard', label: 'Wizard', icon: iconUrl('eyeware_wizard.svg') },
  { value: 'elton', label: 'Elton', icon: iconUrl('eyeware_elton.svg') },
  { value: 'green', label: 'Green', icon: iconUrl('eyeware_green.svg') },
  { value: 'pink', label: 'Pink', icon: iconUrl('eyeware_pink.svg') },
  { value: 'purple', label: 'Purple', icon: iconUrl('eyeware_purple.svg') },
  { value: 'pirate', label: 'Pirate', icon: iconUrl('eyeware_pirate.svg') },
];
