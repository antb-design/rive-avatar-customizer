import { motion, type MotionValue } from 'framer-motion';
import { useRef, type ComponentType } from 'react';
import { useResponsiveStageHeight } from '../../avatar/useResponsiveStageHeight';
import { OverlayIconButton } from './OverlayIconButton';

type AvatarStageProps = {
  RiveComponent: ComponentType;
  onClose: () => void;
  onDone: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onRandomise: () => void;
  scale?: MotionValue<number>;
};

/**
 * The avatar block: the Rive canvas filling it edge-to-edge, with
 * close/done overlaid top corners and undo/redo/randomise overlaid the
 * bottom corners, matching the Figma design. `scale` (optional) drives the
 * overscroll-pulse effect from useOverscrollPulse.
 *
 * Height is set explicitly via useResponsiveStageHeight (JS + ResizeObserver)
 * rather than left to CSS `aspect-ratio` + `max-height` alone — see that
 * hook for why (a Safari `aspect-ratio`/ResizeObserver quirk could leave
 * the Rive canvas's render buffer stuck at a stale, narrower size).
 */
export function AvatarStage({
  RiveComponent,
  onClose,
  onDone,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onRandomise,
  scale,
}: AvatarStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const height = useResponsiveStageHeight(stageRef);

  return (
    <motion.div
      ref={stageRef}
      className="avatar-stage"
      style={{ ...(height ? { height } : {}), ...(scale ? { scale } : {}) }}
    >
      <div className="avatar-stage__canvas">
        <RiveComponent />
      </div>
      <div className="avatar-stage__vignette" aria-hidden="true" />

      <div className="avatar-stage__header">
        <OverlayIconButton icon="close" onClick={onClose} label="Close" />
        <OverlayIconButton icon="done" onClick={onDone} label="Done" />
      </div>

      <div className="avatar-stage__footer">
        <div className="avatar-stage__history">
          <OverlayIconButton icon="undo" onClick={onUndo} disabled={!canUndo} label="Undo" />
          <OverlayIconButton icon="redo" onClick={onRedo} disabled={!canRedo} label="Redo" />
        </div>
        <OverlayIconButton icon="randomise" onClick={onRandomise} label="Randomise" />
      </div>
    </motion.div>
  );
}
