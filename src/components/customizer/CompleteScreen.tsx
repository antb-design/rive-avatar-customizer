import type { ComponentType } from 'react';

type CompleteScreenProps = {
  RiveComponent: ComponentType;
  onBack: () => void;
};

/**
 * Placeholder "done" screen: a bigger, uninterrupted view of the avatar
 * with an edit button back to the customiser. Just a stand-in for now —
 * the eventual success/celebration animation isn't built yet.
 */
export function CompleteScreen({ RiveComponent, onBack }: CompleteScreenProps) {
  return (
    <div className="complete-screen">
      <div className="complete-screen__stage">
        <RiveComponent />
      </div>
      <button type="button" className="complete-screen__edit" onClick={onBack} aria-label="Edit avatar">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 20h4L18.5 9.5a2.121 2.121 0 0 0-3-3L5 17v3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
