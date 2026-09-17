import { useCallback, useState } from 'react';

const STORAGE_KEY = 'playerAvatarSettings';

export const DEFAULT_BODY_COLOR = '#af3131';
export const DEFAULT_BACKGROUND_COLOR = '#ffffff';
export const DEFAULT_HAIR_COLOR = '#3a2317';
export const DEFAULT_HAIR_STYLE = 'hair_1';
export const DEFAULT_COSTUME = 'none';
export const DEFAULT_HEAD_WEAR = 'none';
export const DEFAULT_EYE_WEAR = 'none';

type AvatarSettings = {
  bodyColor: string;
  backgroundColor: string;
  hairColor: string;
  hairStyle: string;
  costume: string;
  headWear: string;
  eyeWear: string;
};

const DEFAULT_SETTINGS: AvatarSettings = {
  bodyColor: DEFAULT_BODY_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
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
    // settings saved before hairColor/hairStyle existed still restore
    // cleanly instead of being discarded outright.
    return {
      bodyColor: typeof parsed.bodyColor === 'string' ? parsed.bodyColor : DEFAULT_BODY_COLOR,
      backgroundColor:
        typeof parsed.backgroundColor === 'string' ? parsed.backgroundColor : DEFAULT_BACKGROUND_COLOR,
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

/**
 * Owns the avatar's colour/hair selections and mirrors them to localStorage
 * under `playerAvatarSettings`, so they survive a reload.
 *
 * This is the single source of truth: the controls read from it, and
 * useColorBinding/useEnumBinding just push whatever it holds into Rive.
 * Nothing here talks to Rive directly.
 */
export function useAvatarSettings() {
  const [settings, setSettings] = useState<AvatarSettings>(() => readStoredSettings() ?? DEFAULT_SETTINGS);
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(() => readStoredSettings() !== null);

  const updateSetting = useCallback(<K extends keyof AvatarSettings>(key: K, value: AvatarSettings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      writeStoredSettings(next);
      return next;
    });
    setIsSavedLocally(true);
  }, []);

  const setBodyColor = useCallback((hex: string) => updateSetting('bodyColor', hex), [updateSetting]);
  const setBackgroundColor = useCallback(
    (hex: string) => updateSetting('backgroundColor', hex),
    [updateSetting],
  );
  const setHairColor = useCallback((hex: string) => updateSetting('hairColor', hex), [updateSetting]);
  const setHairStyle = useCallback((style: string) => updateSetting('hairStyle', style), [updateSetting]);
  const setCostume = useCallback((costume: string) => updateSetting('costume', costume), [updateSetting]);
  const setHeadWear = useCallback((headWear: string) => updateSetting('headWear', headWear), [updateSetting]);
  const setEyeWear = useCallback((eyeWear: string) => updateSetting('eyeWear', eyeWear), [updateSetting]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore — see writeStoredSettings
    }
    setSettings(DEFAULT_SETTINGS);
    setIsSavedLocally(false);
  }, []);

  return {
    bodyColor: settings.bodyColor,
    backgroundColor: settings.backgroundColor,
    hairColor: settings.hairColor,
    hairStyle: settings.hairStyle,
    costume: settings.costume,
    headWear: settings.headWear,
    eyeWear: settings.eyeWear,
    setBodyColor,
    setBackgroundColor,
    setHairColor,
    setHairStyle,
    setCostume,
    setHeadWear,
    setEyeWear,
    isSavedLocally,
    reset,
  };
}
