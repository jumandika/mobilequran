import React from 'react';
import { View } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Touchable from '../molecules/Touchable';
import { toNext, toPrev } from "./RepeatController";
import { styles } from './styles';

export function ControllerContent() {
    const playbackState = usePlaybackState();
    const togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex();
        if (currentTrack == null) {
            // TODO: Perhaps present an error or restart the playlist?
        } else if (playbackState.state === State.Playing) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    };
    return (
        <View style={styles.actionRowContainer}>
            <Touchable onPress={toPrev}
                style={{
                    overflow: 'hidden'
                }}
                children={<View style={styles.iconPlayerBar}>
                    <Ionicons style={styles.secondaryActionButton} name="md-play-skip-back" />
                </View>}
            />
            <Touchable
                onPress={togglePlayback} style={{
                    overflow: 'hidden'
                }}
                children={<View style={styles.iconPlayerBar}>
                    <Ionicons style={styles.primaryActionButton} name={playbackState.state == State.Playing ? 'pause-circle' : 'play-circle'} />
                </View>}
            />
            <Touchable
                onPress={toNext} style={{
                    overflow: 'hidden'
                }}
                children={<View style={styles.iconPlayerBar}>
                    <Ionicons style={styles.secondaryActionButton} name="md-play-skip-forward" />
                </View>
                }
            />
        </View>);
}
