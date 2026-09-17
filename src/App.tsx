import { useAvatarSettings } from './avatar/useAvatarSettings';
import { ColorField } from './components/ColorField';
import { DebugPanel } from './components/DebugPanel';
import { PlaybackButton } from './components/PlaybackButton';
import { ResizableStage } from './components/ResizableStage';
import { SelectField } from './components/SelectField';
import { AVATAR_STATE_MACHINE_NAME, useAvatarRive } from './rive/useAvatarRive';
import { useColorBinding } from './rive/useColorBinding';
import { useEnumBinding } from './rive/useEnumBinding';
import { usePlaybackControl } from './rive/usePlaybackControl';

// Note: the .riv file's actual View Model property names are US-spelled
// ("Color", not "Colour") even though the artboard/UI language elsewhere
// uses UK spelling. Confirmed by inspecting the loaded ViewModel at runtime.
const BODY_COLOUR_PROPERTY = 'bodyColor';
const BACKGROUND_COLOUR_PROPERTY = 'backgroundColor';
const HAIR_COLOUR_PROPERTY = 'hairColor';
const HAIR_STYLES_PROPERTY = 'hairStyles';
const COSTUME_PROPERTY = 'costume';
const HEAD_WEAR_PROPERTY = 'headWear';
const EYE_WEAR_PROPERTY = 'eyeWear';

function App() {
  const { rive, RiveComponent, viewModelInstance } = useAvatarRive();
  const avatar = useAvatarSettings();

  // Avatar state (persisted to localStorage) is the source of truth; these
  // just keep Rive's properties following it.
  useColorBinding(BODY_COLOUR_PROPERTY, viewModelInstance, avatar.bodyColor);
  useColorBinding(BACKGROUND_COLOUR_PROPERTY, viewModelInstance, avatar.backgroundColor);
  useColorBinding(HAIR_COLOUR_PROPERTY, viewModelInstance, avatar.hairColor);
  const hairStyles = useEnumBinding(HAIR_STYLES_PROPERTY, viewModelInstance, avatar.hairStyle);
  const costumes = useEnumBinding(COSTUME_PROPERTY, viewModelInstance, avatar.costume);
  const headWears = useEnumBinding(HEAD_WEAR_PROPERTY, viewModelInstance, avatar.headWear);
  const eyeWears = useEnumBinding(EYE_WEAR_PROPERTY, viewModelInstance, avatar.eyeWear);

  const playback = usePlaybackControl(rive, AVATAR_STATE_MACHINE_NAME);

  return (
    <main className="page">
      <h1 className="page__title">Rive ↔ React Data Binding</h1>
      <p className="page__subtitle">Colour data binding + persisted avatar settings</p>

      <ResizableStage>
        <RiveComponent />
      </ResizableStage>

      <section className="controls">
        <ColorField label="Body colour" hex={avatar.bodyColor} onChange={avatar.setBodyColor} />
        <ColorField
          label="Background colour"
          hex={avatar.backgroundColor}
          onChange={avatar.setBackgroundColor}
        />
        <ColorField label="Hair colour" hex={avatar.hairColor} onChange={avatar.setHairColor} />
        <SelectField
          label="Hair style"
          value={avatar.hairStyle}
          options={hairStyles.values}
          onChange={avatar.setHairStyle}
        />
        <SelectField
          label="Costume"
          value={avatar.costume}
          options={costumes.values}
          onChange={avatar.setCostume}
        />
        <SelectField
          label="Head wear"
          value={avatar.headWear}
          options={headWears.values}
          onChange={avatar.setHeadWear}
        />
        <SelectField
          label="Eye wear"
          value={avatar.eyeWear}
          options={eyeWears.values}
          onChange={avatar.setEyeWear}
        />
      </section>

      <PlaybackButton isPlaying={playback.isPlaying} onToggle={playback.toggle} />

      <DebugPanel
        bodyColorHex={avatar.bodyColor}
        backgroundColorHex={avatar.backgroundColor}
        hairColorHex={avatar.hairColor}
        hairStyle={avatar.hairStyle}
        costume={avatar.costume}
        headWear={avatar.headWear}
        eyeWear={avatar.eyeWear}
        isSavedLocally={avatar.isSavedLocally}
        onReset={avatar.reset}
      />
    </main>
  );
}

export default App;
