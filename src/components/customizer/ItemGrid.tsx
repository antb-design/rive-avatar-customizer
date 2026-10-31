import type { AvatarItem } from '../../avatar/items';

type ItemGridProps = {
  items: AvatarItem[];
  value: string;
  onChange: (value: string) => void;
};

/** A reflowing grid of illustrated item cards (hair/costume/headwear/eyewear), each with a Default/Selected visual state driven purely by whether it matches `value`. */
export function ItemGrid({ items, value, onChange }: ItemGridProps) {
  return (
    <div className="item-grid">
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            className={`item-card${selected ? ' item-card--selected' : ''}`}
            onClick={() => onChange(item.value)}
            aria-pressed={selected}
            aria-label={item.label}
          >
            <img src={item.icon} alt="" className="item-card__icon" />
          </button>
        );
      })}
    </div>
  );
}
