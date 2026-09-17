type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

/** A labelled dropdown for choosing between a Rive enum property's options. */
export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  // Rive may not have reported its option list yet (e.g. before the file
  // has loaded) — keep the currently selected value choosable either way.
  const selectableOptions = options.includes(value) ? options : [value, ...options];

  return (
    <label className="select-field">
      <span className="select-field__label">{label}</span>
      <select
        className="select-field__control"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {selectableOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
