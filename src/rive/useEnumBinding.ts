import { useEffect } from 'react';
import { useViewModelInstanceEnum } from '@rive-app/react-canvas';
import type { ViewModelInstance } from '@rive-app/canvas';

/**
 * Pushes a string value into a named enum property on a Rive View Model
 * instance whenever it changes — the enum equivalent of useColorBinding.
 *
 * Also returns the enum's valid options straight from the Rive file, so a
 * dropdown built from `values` picks up new options automatically if
 * they're added to the .riv file later, with no code change needed here.
 */
export function useEnumBinding(
  propertyName: string,
  viewModelInstance: ViewModelInstance | null,
  value: string,
) {
  const { values, setValue } = useViewModelInstanceEnum(propertyName, viewModelInstance);

  useEffect(() => {
    if (!viewModelInstance) return;
    setValue(value);
  }, [viewModelInstance, value, setValue]);

  return { values };
}
