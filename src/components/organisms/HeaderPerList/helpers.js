
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability
} from 'react-native-track-player';

export const updateOptions = {
    android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
    },
    capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
    ],
    compactCapabilities: [
        Capability.Play,
        Capability.Pause,
    ],
};

export const playAyat = async (ayatList, index) => {
    console.log('index PLAYYY', index);
    await TrackPlayer.reset();
    await TrackPlayer.removeUpcomingTracks();
    await TrackPlayer.updateOptions(updateOptions);
    await TrackPlayer.add(ayatList);
    await TrackPlayer.skip(index);
    await TrackPlayer.play();

};