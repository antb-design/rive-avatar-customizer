export type LayoutId = 'studio' | 'pocket' | 'deck' | 'journey';

type LayoutSwitcherProps = {
  value: LayoutId;
  onChange: (layout: LayoutId) => void;
};

const LAYOUTS: Array<{ id: LayoutId; number: string; name: string; description: string }> = [
  { id: 'studio', number: '01', name: 'Studio', description: 'Split workspace' },
  { id: 'pocket', number: '02', name: 'Pocket', description: 'Bottom drawer' },
  { id: 'deck', number: '03', name: 'Deck', description: 'Command centre' },
  { id: 'journey', number: '04', name: 'Journey', description: 'Guided steps' },
];

export function LayoutSwitcher({ value, onChange }: LayoutSwitcherProps) {
  return (
    <nav className="layout-switcher" aria-label="Choose a layout concept">
      <div className="layout-switcher__brand">
        <span className="layout-switcher__mark" aria-hidden="true">A</span>
        <span>
          <strong>Avatar Lab</strong>
          <small>Four layout studies</small>
        </span>
      </div>
      <div className="layout-switcher__options">
        {LAYOUTS.map((layout) => {
          const selected = layout.id === value;
          return (
            <button
              key={layout.id}
              type="button"
              className={`layout-switcher__option${selected ? ' layout-switcher__option--selected' : ''}`}
              onClick={() => onChange(layout.id)}
              aria-pressed={selected}
            >
              <span className="layout-switcher__number">{layout.number}</span>
              <span>
                <strong>{layout.name}</strong>
                <small>{layout.description}</small>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
