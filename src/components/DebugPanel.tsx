type DebugPanelProps = {
  bodyColorHex: string;
  backgroundColorHex: string;
  hairColorHex: string;
  hairStyle: string;
  costume: string;
  headWear: string;
  eyeWear: string;
  isSavedLocally: boolean;
  onReset: () => void;
};

/** Shows the current avatar configuration and whether it's saved locally. */
export function DebugPanel({
  bodyColorHex,
  backgroundColorHex,
  hairColorHex,
  hairStyle,
  costume,
  headWear,
  eyeWear,
  isSavedLocally,
  onReset,
}: DebugPanelProps) {
  return (
    <section className="debug-panel">
      <h2 className="debug-panel__title">Avatar debug</h2>
      <dl className="debug-panel__list">
        <div className="debug-panel__row">
          <dt>bodyColor</dt>
          <dd>
            <span className="debug-panel__swatch" style={{ backgroundColor: bodyColorHex }} />
            {bodyColorHex.toUpperCase()}
          </dd>
        </div>
        <div className="debug-panel__row">
          <dt>backgroundColor</dt>
          <dd>
            <span className="debug-panel__swatch" style={{ backgroundColor: backgroundColorHex }} />
            {backgroundColorHex.toUpperCase()}
          </dd>
        </div>
        <div className="debug-panel__row">
          <dt>hairColor</dt>
          <dd>
            <span className="debug-panel__swatch" style={{ backgroundColor: hairColorHex }} />
            {hairColorHex.toUpperCase()}
          </dd>
        </div>
        <div className="debug-panel__row">
          <dt>hairStyles</dt>
          <dd>{hairStyle}</dd>
        </div>
        <div className="debug-panel__row">
          <dt>costume</dt>
          <dd>{costume}</dd>
        </div>
        <div className="debug-panel__row">
          <dt>headWear</dt>
          <dd>{headWear}</dd>
        </div>
        <div className="debug-panel__row">
          <dt>eyeWear</dt>
          <dd>{eyeWear}</dd>
        </div>
      </dl>

      <p className="debug-panel__saved">
        Saved locally: <strong>{isSavedLocally ? 'Yes' : 'No'}</strong>
      </p>

      <button type="button" className="debug-panel__reset" onClick={onReset}>
        Reset Avatar
      </button>
    </section>
  );
}
