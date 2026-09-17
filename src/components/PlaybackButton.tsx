type PlaybackButtonProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

/** Starts/stops the avatar's state machine animation. */
export function PlaybackButton({ isPlaying, onToggle }: PlaybackButtonProps) {
  return (
    <button type="button" className="playback-button" onClick={onToggle}>
      {isPlaying ? 'Stop animation' : 'Start animation'}
    </button>
  );
}
