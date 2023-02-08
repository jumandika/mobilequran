import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Touchable from '../molecules/Touchable';
import TrackPlayer from 'react-native-track-player';
import { styles } from './styles';



export const toPrev = () => {
    TrackPlayer.skipToPrevious();
};
export const toNext = () => {
    TrackPlayer.skipToNext();
};
export function RepeatController(props) {
    return (<View style={[styles.container, {
        alignItems: 'flex-end'
    }]}>
        <Touchable onPress={props.onPressRepeat} // style={{ overflow:'hidden'}}
            children={<View>
                <Ionicons style={styles.repeatActionButton} name="repeat" />
                {props.repeatComponent()}
            </View>} />
    </View>);
}
