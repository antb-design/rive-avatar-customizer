import { Fit, Layout, useRive } from '@rive-app/react-canvas';

// Pointed at the updated responsive-layout export while it's being tried out.
export const AVATAR_RIVE_SRC = '/rive/avatar2.riv';
export const AVATAR_ARTBOARD_NAME = 'playerAvatar';
export const AVATAR_STATE_MACHINE_NAME = 'State Machine 1';

/**
 * Loads the avatar .riv file and plays the playerAvatar artboard's
 * "State Machine 1" (the yoyo bob animation) as normal.
 *
 * The state machine name is passed explicitly rather than left to autoplay
 * defaults: the artboard also has a linear "Timeline 1" animation, and
 * Rive's default (no `stateMachine` given) plays that first linear
 * animation instead of the state machine, which was silently skipping the
 * bob.
 *
 * `autoBind: true` tells Rive to find and bind the artboard's default View
 * Model instance automatically, so `rive.viewModelInstance` becomes
 * available once the file has loaded — no manual view model lookup needed
 * for this experiment.
 *
 * `layout: new Layout({ fit: Fit.Layout })` opts into Rive's responsive
 * layout system: instead of scaling the artboard's fixed frame to fit the
 * canvas (which just letterboxes it), the runtime resizes the artboard
 * itself to match the canvas size, so the artboard's own Fill / Fit height
 * constraints on its children can actually respond to that size.
 */
export function useAvatarRive() {
  const { rive, RiveComponent } = useRive({
    src: AVATAR_RIVE_SRC,
    artboard: AVATAR_ARTBOARD_NAME,
    stateMachine: AVATAR_STATE_MACHINE_NAME,
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Layout }),
  });

  return {
    rive,
    RiveComponent,
    viewModelInstance: rive?.viewModelInstance ?? null,
  };
}
