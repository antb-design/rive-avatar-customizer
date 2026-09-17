import { useState } from 'react';

type ColourPickerSheetProps = {
  value: string;
  onChange: (hex: string) => void;
  onClose: () => void;
};

/**
 * A small overlay sheet for picking any custom colour. Delegates the
 * actual colour selection to the native `<input type="color">`, which
 * opens the OS/browser's own full colour picker (hue/saturation area +
 * hex entry) — reliable everywhere without reinventing that UI.
 */
export function ColourPickerSheet({ value, onChange, onClose }: ColourPickerSheetProps) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="colour-sheet-backdrop" onClick={onClose}>
      <div className="colour-sheet" onClick={(event) => event.stopPropagation()}>
        <p className="colour-sheet__title">Custom colour</p>
        <label className="colour-sheet__swatch" style={{ backgroundColor: draft }}>
          <input
            type="color"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              onChange(event.target.value);
            }}
          />
        </label>
        <input
          type="text"
          className="colour-sheet__hex"
          value={draft.toUpperCase()}
          onChange={(event) => {
            const hex = event.target.value;
            setDraft(hex);
            if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
              onChange(hex);
            }
          }}
        />
        <button type="button" className="colour-sheet__done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
