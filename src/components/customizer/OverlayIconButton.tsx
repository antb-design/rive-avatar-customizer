import { useState } from 'react';
import { iconUrl } from '../../avatar/iconRegistry';

export type OverlayIcon = 'close' | 'done' | 'undo' | 'redo' | 'randomise';

type OverlayIconButtonProps = {
  icon: OverlayIcon;
  onClick: () => void;
  disabled?: boolean;
  label: string;
};

/**
 * An overlay button from the "Overlay Icon Button" Figma component set —
 * real vector art (no raster edges) with genuine Default/Hover/Active/
 * Disabled states, swapped by changing the <img> `src`.
 *
 * Deliberately an <img>, not a CSS `background-image`: these exported
 * SVGs are data URIs that contain the SVG's own `filter="url(#...)"`
 * reference, i.e. literal parentheses. An unquoted CSS `url(...)` breaks
 * on the first `)` it meets, so the browser treats that inner paren as
 * closing the outer url() and rejects the whole declaration. `<img src>`
 * has no such parsing ambiguity, since it's a plain attribute, not CSS.
 */
export function OverlayIconButton({ icon, onClick, disabled, label }: OverlayIconButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const state = disabled ? 'disabled' : pressed ? 'active' : hovered ? 'hover' : 'default';

  return (
    <button
      type="button"
      className="overlay-icon-btn"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      disabled={disabled}
      aria-label={label}
    >
      <img src={iconUrl(`${icon}-${state}.svg`)} alt="" />
    </button>
  );
}
