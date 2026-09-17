import { TABS, type TabId } from '../../avatar/tabs';

type TabBarProps = {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
};

/**
 * The horizontal icon tab row. Scrolls sideways if it overflows the
 * viewport (small screens) rather than wrapping. Disabled tabs (Bottoms,
 * Footwear — no Rive art/binding yet) render dimmed and inert.
 */
export function TabBar({ activeTab, onSelect }: TabBarProps) {
  return (
    <div className="tab-bar">
      {TABS.filter((tab) => tab.enabled).map((tab) => {
        const selected = tab.id === activeTab;
        // Colour/Costume have genuinely distinct default vs selected art;
        // the rest share one glyph and are dimmed via opacity when inactive.
        const sharesGlyph = tab.iconDefault === tab.iconSelected;
        return (
          <button
            key={tab.id}
            type="button"
            className="tab-bar__item"
            onClick={() => onSelect(tab.id)}
            aria-pressed={selected}
            aria-label={tab.label}
          >
            <img
              src={selected ? tab.iconSelected : tab.iconDefault}
              alt=""
              className={`tab-bar__icon${sharesGlyph && !selected ? ' tab-bar__icon--dimmed' : ''}`}
            />
          </button>
        );
      })}
    </div>
  );
}
