import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';

const MIN_WIDTH = 240;
const MAX_WIDTH = 900;
const DEFAULT_WIDTH = 390;
const VIEWPORT_MARGIN = 32;

type Side = 'left' | 'right';

type DragState = {
  side: Side;
  startX: number;
  startWidth: number;
};

type ResizableStageProps = {
  children: ReactNode;
};

/**
 * Wraps the Rive canvas in a box whose width can be dragged from either
 * side — a quick way to see how the artboard's responsive layout (Fill /
 * Fit height) behaves at different container widths. Height stays fixed;
 * only width is adjustable, per the brief.
 *
 * The box stays horizontally centred, so growing it by dragging one edge
 * moves both edges outward — the delta is doubled so the dragged edge
 * still tracks the cursor 1:1.
 */
export function ResizableStage({ children }: ResizableStageProps) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const dragState = useRef<DragState | null>(null);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const drag = dragState.current;
    if (!drag) return;
    const deltaX = event.clientX - drag.startX;
    const signedDelta = drag.side === 'right' ? deltaX : -deltaX;
    const nextWidth = drag.startWidth + signedDelta * 2;
    const maxWidth = Math.min(MAX_WIDTH, window.innerWidth - VIEWPORT_MARGIN);
    setWidth(Math.min(maxWidth, Math.max(MIN_WIDTH, nextWidth)));
  }, []);

  const stopDragging = useCallback(() => {
    dragState.current = null;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', stopDragging);
  }, [handlePointerMove]);

  const startDragging = useCallback(
    (side: Side) => (event: ReactPointerEvent) => {
      event.preventDefault();
      dragState.current = { side, startX: event.clientX, startWidth: width };
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', stopDragging);
    },
    [width, handlePointerMove, stopDragging],
  );

  return (
    <div className="resizable-stage">
      <div className="resizable-stage__row">
        <div
          className="resizable-stage__handle"
          onPointerDown={startDragging('left')}
          aria-hidden="true"
        />
        <div className="stage" style={{ width }}>
          {children}
        </div>
        <div
          className="resizable-stage__handle"
          onPointerDown={startDragging('right')}
          aria-hidden="true"
        />
      </div>
      <p className="resizable-stage__width">{Math.round(width)}px wide</p>
    </div>
  );
}
