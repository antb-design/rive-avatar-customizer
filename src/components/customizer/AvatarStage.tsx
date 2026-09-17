import { motion, type MotionValue } from 'framer-motion';
import type { ComponentType } from 'react';
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
 * The square avatar block: the Rive canvas filling it edge-to-edge, with
 * close/done overlaid top corners and undo/redo/randomise overlaid the
 * bottom corners, matching the Figma design. `scale` (optional) drives the
 * overscroll-pulse effect from useOverscrollPulse.
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
  return (
    <motion.div className="avatar-stage" style={scale ? { scale } : undefined}>
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
