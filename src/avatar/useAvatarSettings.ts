import { useCallback, useState } from 'react';

const STORAGE_KEY = 'playerAvatarSettings';

export const DEFAULT_BODY_COLOR = '#af3131';
export const DEFAULT_HAIR_COLOR = '#3a2317';
export const DEFAULT_HAIR_STYLE = 'none';
export const DEFAULT_COSTUME = 'none';
export const DEFAULT_HEAD_WEAR = 'none';
export const DEFAULT_EYE_WEAR = 'none';

/**
 * The scene backdrop behind the character. Not user-configurable in this
 * design (the Colour tab only controls `bodyColor`), so it's a fixed
 * constant pushed straight to Rive rather than part of the persisted
 * settings — keeping it out of localStorage means there's no stale old
 * value to accidentally override this later.
 */
export const AVATAR_BACKGROUND_COLOR = '#0C6EC5';

export type AvatarSettings = {
  bodyColor: string;
  hairColor: string;
  hairStyle: string;
  costume: string;
  headWear: string;
  eyeWear: string;
};

const DEFAULT_SETTINGS: AvatarSettings = {
  bodyColor: DEFAULT_BODY_COLOR,
  hairColor: DEFAULT_HAIR_COLOR,
  hairStyle: DEFAULT_HAIR_STYLE,
  costume: DEFAULT_COSTUME,
  headWear: DEFAULT_HEAD_WEAR,
  eyeWear: DEFAULT_EYE_WEAR,
};

function readStoredSettings(): AvatarSettings | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    // Read each field independently, falling back to its default — so
    // settings saved before a field existed still restore cleanly instead
    // of being discarded outright.
    return {
      bodyColor: typeof parsed.bodyColor === 'string' ? parsed.bodyColor : DEFAULT_BODY_COLOR,
      hairColor: typeof parsed.hairColor === 'string' ? parsed.hairColor : DEFAULT_HAIR_COLOR,
      hairStyle: typeof parsed.hairStyle === 'string' ? parsed.hairStyle : DEFAULT_HAIR_STYLE,
      costume: typeof parsed.costume === 'string' ? parsed.costume : DEFAULT_COSTUME,
      headWear: typeof parsed.headWear === 'string' ? parsed.headWear : DEFAULT_HEAD_WEAR,
      eyeWear: typeof parsed.eyeWear === 'string' ? parsed.eyeWear : DEFAULT_EYE_WEAR,
    };
  } catch {
    // Missing, malformed, or inaccessible (e.g. private browsing) — treat as
    // "nothing saved" rather than failing the whole app.
    return null;
  }
}

function writeStoredSettings(settings: AvatarSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Persistence is a nice-to-have for this prototype; fail silently.
  }
}

type HistoryState = {
  history: AvatarSettings[];
  index: number;
};

/**
 * Owns the avatar's full configuration, with undo/redo history and
 * localStorage persistence under `playerAvatarSettings`.
 *
 * This is the single source of truth: the UI reads from it, and
 * useColorBinding/useEnumBinding just push whatever it holds into Rive.
 * Nothing here talks to Rive directly.
 *
 * Every commit (a single field change, or a batch like randomise) becomes
 * one undo step. localStorage always mirrors whatever is currently being
 * shown/bound — including after an undo/redo — so a reload continues from
 * wherever the user left off, without needing to persist the history stack
 * itself.
 */
export function useAvatarSettings() {
  const [{ history, index }, setHistoryState] = useState<HistoryState>(() => {
    const initial = readStoredSettings() ?? DEFAULT_SETTINGS;
    return { history: [initial], index: 0 };
  });
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(() => readStoredSettings() !== null);

  const current = history[index];

  const commit = useCallback((updates: Partial<AvatarSettings>) => {
    setHistoryState((state) => {
      const next = { ...state.history[state.index], ...updates };
      writeStoredSettings(next);
      return { history: [...state.history.slice(0, state.index + 1), next], index: state.index + 1 };
    });
    setIsSavedLocally(true);
  }, []);

  const undo = useCallback(() => {
    setHistoryState((state) => {
      if (state.index === 0) return state;
      writeStoredSettings(state.history[state.index - 1]);
      return { ...state, index: state.index - 1 };
    });
  }, []);

  const redo = useCallback(() => {
    setHistoryState((state) => {
      if (state.index >= state.history.length - 1) return state;
      writeStoredSettings(state.history[state.index + 1]);
      return { ...state, index: state.index + 1 };
    });
  }, []);

  const setBodyColor = useCallback((hex: string) => commit({ bodyColor: hex }), [commit]);
  const setHairColor = useCallback((hex: string) => commit({ hairColor: hex }), [commit]);
  const setHairStyle = useCallback((style: string) => commit({ hairStyle: style }), [commit]);
  const setCostume = useCallback((costume: string) => commit({ costume }), [commit]);
  const setHeadWear = useCallback((headWear: string) => commit({ headWear }), [commit]);
  const setEyeWear = useCallback((eyeWear: string) => commit({ eyeWear }), [commit]);

  /** Applies several fields at once (e.g. randomise) as a single undo step. */
  const setMany = useCallback((updates: Partial<AvatarSettings>) => commit(updates), [commit]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore — see writeStoredSettings
    }
    setHistoryState({ history: [DEFAULT_SETTINGS], index: 0 });
    setIsSavedLocally(false);
  }, []);

  return {
    bodyColor: current.bodyColor,
    hairColor: current.hairColor,
    hairStyle: current.hairStyle,
    costume: current.costume,
    headWear: current.headWear,
    eyeWear: current.eyeWear,
    setBodyColor,
    setHairColor,
    setHairStyle,
    setCostume,
    setHeadWear,
    setEyeWear,
    setMany,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
    isSavedLocally,
    reset,
  };
}
