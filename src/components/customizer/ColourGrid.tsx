import { useState } from 'react';
import type { ColourPreset } from '../../avatar/colours';
import { ColourPickerSheet } from './ColourPickerSheet';

type ColourGridProps = {
  swatches: ColourPreset[];
  value: string;
  onChange: (hex: string) => void;
};

/**
 * A grid of preset colour swatches, plus a colour-wheel swatch that opens
 * a full picker for any custom colour. Since a custom colour won't match
 * any preset, the wheel itself shows as "selected" whenever the current
 * value isn't one of the presets. Reused for both body colour (the full
 * palette) and hair colour (a smaller, more natural palette).
 */
export function ColourGrid({ swatches, value, onChange }: ColourGridProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const normalizedValue = value.toLowerCase();
  const matchesPreset = swatches.some((preset) => preset.hex.toLowerCase() === normalizedValue);

  return (
    <div className="colour-grid">
      {swatches.map((preset) => {
        const selected = preset.hex.toLowerCase() === normalizedValue;
        return (
          <button
            key={preset.name}
            type="button"
            className={`colour-swatch${selected ? ' colour-swatch--selected' : ''}`}
            style={{ backgroundColor: preset.hex }}
            onClick={() => onChange(preset.hex)}
            aria-pressed={selected}
            aria-label={preset.name}
          >
            {selected && (
              <svg className="colour-swatch__check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="white" />
                <path
                  d="M6 10.5l2.5 2.5L14 7.5"
                  stroke="#18181b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        );
      })}

      <button
        type="button"
        className={`colour-swatch colour-swatch--wheel${!matchesPreset ? ' colour-swatch--selected' : ''}`}
        onClick={() => setPickerOpen(true)}
        aria-pressed={!matchesPreset}
        aria-label="Custom colour"
      />

      {pickerOpen && (
        <ColourPickerSheet
          value={matchesPreset ? '#ffffff' : value}
          onChange={onChange}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
