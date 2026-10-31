import { Fit, Layout, useRive } from '@rive-app/react-canvas';

// Pointed at the updated responsive-layout export while it's being tried out.
export const AVATAR_RIVE_SRC = '/rive/avatar2.riv';
export const AVATAR_ARTBOARD_NAME = 'playerAvatar';
export const WIN_ARTBOARD_NAME = 'win';
export const AVATAR_STATE_MACHINE_NAME = 'State Machine 1';

/**
 * Loads one artboard from the avatar .riv file and plays its
 * "State Machine 1". Both playerAvatar and win have their own linear
 * "Timeline 1" alongside that state machine, and Rive's default (no
 * `stateMachine` given) plays the timeline instead — so the name is always
 * passed explicitly.
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
function useArtboardRive(artboard: string) {
  const { rive, RiveComponent } = useRive({
    src: AVATAR_RIVE_SRC,
    artboard,
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

export function useAvatarRive() {
  return useArtboardRive(AVATAR_ARTBOARD_NAME);
}

/**
 * Loads the "win" artboard — the full-screen celebration shown after
 * "Done" — as a separate Rive instance from the customiser's playerAvatar.
 * It has its own copy of the CharacterViewModel data, so App.tsx re-applies
 * the same avatar settings to it via the usual useColorBinding/useEnumBinding
 * hooks to keep it visually in sync.
 */
export function useWinRive() {
  return useArtboardRive(WIN_ARTBOARD_NAME);
}
