import { useRef, useState } from 'react';
import { AVATAR_BACKGROUND_COLOR, useAvatarSettings } from './avatar/useAvatarSettings';
import { COLOUR_PRESETS, HAIR_COLOUR_PRESETS } from './avatar/colours';
import { COSTUME_ITEMS, EYE_WEAR_ITEMS, HAIR_ITEMS, HEAD_WEAR_ITEMS } from './avatar/items';
import type { TabId } from './avatar/tabs';
import { useOverscrollPulse } from './avatar/useOverscrollPulse';
import { AvatarStage } from './components/customizer/AvatarStage';
import { ColourGrid } from './components/customizer/ColourGrid';
import { CompleteScreen } from './components/customizer/CompleteScreen';
import { DebugReveal } from './components/customizer/DebugReveal';
import { ItemGrid } from './components/customizer/ItemGrid';
import { TabBar } from './components/customizer/TabBar';
import { AVATAR_STATE_MACHINE_NAME, useAvatarRive, useWinRive } from './rive/useAvatarRive';
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

function randomOf<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

type View = 'customizing' | 'complete';

function App() {
  const { rive, RiveComponent, viewModelInstance } = useAvatarRive();
  const { RiveComponent: WinRiveComponent, viewModelInstance: winViewModelInstance } = useWinRive();
  const avatar = useAvatarSettings();
  const [view, setView] = useState<View>('customizing');
  const [activeTab, setActiveTab] = useState<TabId>('colour');
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageScale = useOverscrollPulse(scrollRef);

  // Avatar state (persisted + undo/redo) is the source of truth; these just
  // keep Rive's properties following it.
  useColorBinding(BODY_COLOUR_PROPERTY, viewModelInstance, avatar.bodyColor);
  useColorBinding(BACKGROUND_COLOUR_PROPERTY, viewModelInstance, AVATAR_BACKGROUND_COLOR);
  useColorBinding(HAIR_COLOUR_PROPERTY, viewModelInstance, avatar.hairColor);
  useEnumBinding(HAIR_STYLES_PROPERTY, viewModelInstance, avatar.hairStyle);
  useEnumBinding(COSTUME_PROPERTY, viewModelInstance, avatar.costume);
  useEnumBinding(HEAD_WEAR_PROPERTY, viewModelInstance, avatar.headWear);
  useEnumBinding(EYE_WEAR_PROPERTY, viewModelInstance, avatar.eyeWear);

  // The win artboard is a separate Rive instance with its own copy of the
  // CharacterViewModel data, so it needs the same settings re-applied to
  // stay visually in sync with the customiser.
  useColorBinding(BODY_COLOUR_PROPERTY, winViewModelInstance, avatar.bodyColor);
  useColorBinding(BACKGROUND_COLOUR_PROPERTY, winViewModelInstance, AVATAR_BACKGROUND_COLOR);
  useColorBinding(HAIR_COLOUR_PROPERTY, winViewModelInstance, avatar.hairColor);
  useEnumBinding(HAIR_STYLES_PROPERTY, winViewModelInstance, avatar.hairStyle);
  useEnumBinding(COSTUME_PROPERTY, winViewModelInstance, avatar.costume);
  useEnumBinding(HEAD_WEAR_PROPERTY, winViewModelInstance, avatar.headWear);
  useEnumBinding(EYE_WEAR_PROPERTY, winViewModelInstance, avatar.eyeWear);

  const playback = usePlaybackControl(rive, AVATAR_STATE_MACHINE_NAME);

  const handleRandomise = () => {
    avatar.setMany({
      bodyColor: randomOf(COLOUR_PRESETS).hex,
      hairColor: randomOf(COLOUR_PRESETS).hex,
      hairStyle: randomOf(HAIR_ITEMS).value,
      costume: randomOf(COSTUME_ITEMS).value,
      headWear: randomOf(HEAD_WEAR_ITEMS).value,
      eyeWear: randomOf(EYE_WEAR_ITEMS).value,
    });
  };

  if (view === 'complete') {
    return <CompleteScreen RiveComponent={WinRiveComponent} onBack={() => setView('customizing')} />;
  }

  return (
    <div className="customizer">
      <div className="customizer__header">
        <AvatarStage
          RiveComponent={RiveComponent}
          onClose={() => {}}
          onDone={() => setView('complete')}
          onUndo={avatar.undo}
          onRedo={avatar.redo}
          canUndo={avatar.canUndo}
          canRedo={avatar.canRedo}
          onRandomise={handleRandomise}
          scale={stageScale}
        />
        <TabBar activeTab={activeTab} onSelect={setActiveTab} />
      </div>

      <div className="customizer__scroll" ref={scrollRef}>
        {activeTab === 'colour' && (
          <ColourGrid swatches={COLOUR_PRESETS} value={avatar.bodyColor} onChange={avatar.setBodyColor} />
        )}
        {activeTab === 'hair' && (
          <>
            <ItemGrid items={HAIR_ITEMS} value={avatar.hairStyle} onChange={avatar.setHairStyle} />
            <p className="section-label">Hair colour</p>
            <ColourGrid swatches={HAIR_COLOUR_PRESETS} value={avatar.hairColor} onChange={avatar.setHairColor} />
          </>
        )}
        {activeTab === 'costume' && (
          <ItemGrid items={COSTUME_ITEMS} value={avatar.costume} onChange={avatar.setCostume} />
        )}
        {activeTab === 'headWear' && (
          <ItemGrid items={HEAD_WEAR_ITEMS} value={avatar.headWear} onChange={avatar.setHeadWear} />
        )}
        {activeTab === 'eyeWear' && (
          <ItemGrid items={EYE_WEAR_ITEMS} value={avatar.eyeWear} onChange={avatar.setEyeWear} />
        )}

        <DebugReveal
          bodyColorHex={avatar.bodyColor}
          backgroundColorHex={AVATAR_BACKGROUND_COLOR}
          hairColorHex={avatar.hairColor}
          hairStyle={avatar.hairStyle}
          costume={avatar.costume}
          headWear={avatar.headWear}
          eyeWear={avatar.eyeWear}
          isSavedLocally={avatar.isSavedLocally}
          onReset={avatar.reset}
          isPlaying={playback.isPlaying}
          onTogglePlayback={playback.toggle}
        />
      </div>
    </div>
  );
}

export default App;
