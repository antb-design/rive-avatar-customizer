/**
 * The customisation tabs shown under the avatar. `enabled: false` tabs
 * (Bottoms, Footwear) exist in the design and are ready to wire up, but
 * have no Rive art/data binding yet — they're built but hidden per product
 * decision, not deleted.
 */
export type TabId = 'colour' | 'hair' | 'costume' | 'bottoms' | 'headWear' | 'eyeWear' | 'footwear';

export type TabConfig = {
  id: TabId;
  label: string;
  iconDefault: string;
  iconSelected: string;
  enabled: boolean;
};

const TAB_BASE = '/design/tabs';

export const TABS: TabConfig[] = [
  {
    id: 'colour',
    label: 'Colour',
    iconDefault: `${TAB_BASE}/colour-default.svg`,
    iconSelected: `${TAB_BASE}/colour-selected.svg`,
    enabled: true,
  },
  {
    id: 'hair',
    label: 'Hair',
    iconDefault: `${TAB_BASE}/hair.svg`,
    iconSelected: `${TAB_BASE}/hair.svg`,
    enabled: true,
  },
  {
    id: 'costume',
    label: 'Costume',
    iconDefault: `${TAB_BASE}/tops-default.svg`,
    iconSelected: `${TAB_BASE}/tops-selected.svg`,
    enabled: true,
  },
  {
    id: 'bottoms',
    label: 'Bottoms',
    iconDefault: `${TAB_BASE}/tops-default.svg`,
    iconSelected: `${TAB_BASE}/tops-default.svg`,
    enabled: false,
  },
  {
    id: 'headWear',
    label: 'Head wear',
    iconDefault: `${TAB_BASE}/headwear.svg`,
    iconSelected: `${TAB_BASE}/headwear.svg`,
    enabled: true,
  },
  {
    id: 'eyeWear',
    label: 'Eye wear',
    iconDefault: `${TAB_BASE}/eyewear.svg`,
    iconSelected: `${TAB_BASE}/eyewear.svg`,
    enabled: true,
  },
  {
    id: 'footwear',
    label: 'Footwear',
    iconDefault: `${TAB_BASE}/tops-default.svg`,
    iconSelected: `${TAB_BASE}/tops-default.svg`,
    enabled: false,
  },
];
