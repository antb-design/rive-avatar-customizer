import { useCallback, useEffect, useState } from 'react';
import { EventType, type Rive } from '@rive-app/react-canvas';

/**
 * Tracks whether a named state machine is currently playing and exposes a
 * toggle to start/stop it directly on the Rive instance — independent of
 * the colour data bindings.
 */
export function usePlaybackControl(rive: Rive | null, stateMachineName: string) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!rive) return;

    setIsPlaying(rive.isPlaying);

    const handlePlay = () => setIsPlaying(true);
    const handlePauseOrStop = () => setIsPlaying(false);

    rive.on(EventType.Play, handlePlay);
    rive.on(EventType.Pause, handlePauseOrStop);
    rive.on(EventType.Stop, handlePauseOrStop);

    return () => {
      rive.off(EventType.Play, handlePlay);
      rive.off(EventType.Pause, handlePauseOrStop);
      rive.off(EventType.Stop, handlePauseOrStop);
    };
  }, [rive]);

  const toggle = useCallback(() => {
    if (!rive) return;
    if (rive.isPlaying) {
      rive.pause(stateMachineName);
    } else {
      rive.play(stateMachineName);
    }
  }, [rive, stateMachineName]);

  return { isPlaying, toggle };
}
