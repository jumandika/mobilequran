import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from '../molecules/Touchable';
import { State } from 'react-native-track-player';
import { styles } from './styles';
import { toPrev, toNext } from "./RepeatController";

export function ControllerContent(props) {
    return (
    <View style={styles.actionRowContainer}>
            <Touchable onPress={toPrev} style={{
                overflow: 'hidden'
            }} children={<View style={styles.iconPlayerBar}>
                <Ionicons style={styles.secondaryActionButton} name="md-play-skip-back-outline" />
            </View>} />
            <Touchable onPress={props.togglePlayback} style={{
                overflow: 'hidden'
            }} children={<View style={styles.iconPlayerBar}>
                <Ionicons style={styles.primaryActionButton} name={props.playbackState === State.Playing ? 'pause-circle-outline' : 'play-circle-outline'} />
            </View>} />
            <Touchable onPress={toNext} style={{
                overflow: 'hidden'
            }} children={<View style={styles.iconPlayerBar}>
                <Ionicons style={styles.secondaryActionButton} name="md-play-skip-forward-outline" />
            </View>} />
    </View>);
}
