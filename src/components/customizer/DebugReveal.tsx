import { useState } from 'react';
import { DebugPanel } from '../DebugPanel';
import { PlaybackButton } from '../PlaybackButton';

type DebugRevealProps = {
  bodyColorHex: string;
  backgroundColorHex: string;
  hairColorHex: string;
  hairStyle: string;
  costume: string;
  headWear: string;
  eyeWear: string;
  isSavedLocally: boolean;
  onReset: () => void;
  isPlaying: boolean;
  onTogglePlayback: () => void;
};

/**
 * A near-invisible "ghost" button at the bottom of the page that reveals
 * the raw property debug panel on click — kept around for testing without
 * cluttering the real UI.
 */
export function DebugReveal({ isPlaying, onTogglePlayback, ...debugPanelProps }: DebugRevealProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="debug-reveal">
      <button
        type="button"
        className="debug-reveal__ghost"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {open ? 'Hide debug' : '·'}
      </button>
      {open && (
        <>
          <PlaybackButton isPlaying={isPlaying} onToggle={onTogglePlayback} />
          <DebugPanel {...debugPanelProps} />
        </>
      )}
    </div>
  );
}
