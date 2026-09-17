import { useEffect, useState, type RefObject } from 'react';

/**
 * Computes the avatar stage's height in JS — min(own width, --avatar-max-height)
 * — rather than relying purely on CSS `aspect-ratio` + `max-height`.
 *
 * Safari has had inconsistent interaction between `aspect-ratio` and
 * `ResizeObserver`, which can leave the Rive canvas's render buffer stuck
 * at an earlier, narrower size once the box grows via aspect-ratio alone
 * (visible as the background failing to fill the new width). Setting an
 * explicit pixel height via JS — the same approach the old drag-resize
 * testing tool used, which worked reliably — sidesteps that ambiguity:
 * it's a real, unambiguous box-size change that both this hook's own
 * ResizeObserver and Rive's internal one pick up consistently everywhere.
 */
export function useResponsiveStageHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const maxHeight =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--avatar-max-height')) || 520;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      setHeight(Math.min(width, maxHeight));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return height;
}
