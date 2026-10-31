import { useEffect, useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';

/**
 * Returns a Framer Motion value that pulses briefly whenever the given
 * scroll container is pushed past its top or bottom edge, then springs
 * back to 1 — meant to drive a `scale` transform on the avatar stage.
 *
 * Browsers don't expose the native rubber-band displacement to JS, so this
 * approximates "overscrolling" by watching for wheel/touch input that
 * keeps pushing in the same direction once already at a scroll boundary,
 * which is what actually triggers the native bounce in the first place.
 */
export function useOverscrollPulse(scrollRef: React.RefObject<HTMLElement | null>) {
  const scale = useMotionValue(1);
  const settleTimeout = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const pulse = () => {
      animate(scale, 1.05, { type: 'spring', stiffness: 320, damping: 18 });
      if (settleTimeout.current) window.clearTimeout(settleTimeout.current);
      settleTimeout.current = window.setTimeout(() => {
        animate(scale, 1, { type: 'spring', stiffness: 260, damping: 20 });
      }, 120);
    };

    let touchStartY = 0;

    const handleWheel = (event: WheelEvent) => {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
        pulse();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = currentY - touchStartY;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        pulse();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      if (settleTimeout.current) window.clearTimeout(settleTimeout.current);
    };
  }, [scrollRef, scale]);

  return scale;
}
