import { useEffect } from 'react';
import { useViewModelInstanceColor } from '@rive-app/react-canvas';
import type { ViewModelInstance } from '@rive-app/canvas';
import { hexToRgb } from './colorUtils';

/**
 * Pushes a hex colour into a named colour property on a Rive View Model
 * instance whenever it changes.
 *
 * The hex value is owned by the caller (see useAvatarSettings) rather than
 * by this hook — it may come from a user edit, a value restored from
 * localStorage, or a reset. This hook's only job is keeping Rive in sync
 * with whatever that value currently is.
 *
 * Returns the raw ARGB int Rive reports back, useful for debugging.
 */
export function useColorBinding(
  propertyName: string,
  viewModelInstance: ViewModelInstance | null,
  hex: string,
) {
  const { value: rawValue, setRgb } = useViewModelInstanceColor(propertyName, viewModelInstance);

  useEffect(() => {
    if (!viewModelInstance) return;
    const { r, g, b } = hexToRgb(hex);
    setRgb(r, g, b);
  }, [viewModelInstance, hex, setRgb]);

  return { rawValue };
}
