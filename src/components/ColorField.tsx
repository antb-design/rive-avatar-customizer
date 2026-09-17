type ColorFieldProps = {
  label: string;
  hex: string;
  onChange: (hex: string) => void;
};

/** A labelled native colour picker plus its current hex value. */
export function ColorField({ label, hex, onChange }: ColorFieldProps) {
  return (
    <label className="color-field">
      <span className="color-field__label">{label}</span>
      <span className="color-field__control">
        <input
          type="color"
          value={hex}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="color-field__hex">{hex.toUpperCase()}</span>
      </span>
    </label>
  );
}
