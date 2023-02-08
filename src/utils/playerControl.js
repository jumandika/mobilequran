import React from 'react'
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents
} from 'react-native-track-player';

const playbackState = usePlaybackState();

const togglePlayback = async () => {
    console.log("PLAY PAUSE");
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
        // TODO: Perhaps present an error or restart the playlist?
    } else {
        if (playbackState !== State.Playing) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
};

export { togglePlayback }