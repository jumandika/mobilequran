import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TrackPlayer, {
    RepeatMode
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Touchable from '../molecules/Touchable';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

export const toPrev = () => {
    TrackPlayer.skipToPrevious();
};
export const toNext = () => {
    TrackPlayer.skipToNext();
};

export function RepeatController() {
    const [repeatMode, setRepeatMode] = useState(RepeatMode.Off)
    const [repeatCode, setRepeatCode] = useState(0)
    const dispatch = useDispatch()

    const onPressRepeat = async () => {
        const repeatStatus = await TrackPlayer.getRepeatMode();
        console.log('TrackPlayer.getRepeatMode', repeatStatus);
        if (repeatStatus === 0) {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode(RepeatMode.Track);
            setRepeatCode(1);
            return;
        }
        if (repeatStatus === 1) {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode(RepeatMode.Queue);
            setRepeatCode(2);
            return;
        }
        if (repeatStatus === 2) {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode(RepeatMode.Off);
            setRepeatCode(0);
            return
        }

    };

    useEffect(() => {
        getState()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'SET_REPEAT_CODE',
                repeatCode,
            })
        }, 500);
    }, [repeatCode])

    const getState = async () => {
        TrackPlayer.setRepeatMode(repeatMode);
        setRepeatCode(await TrackPlayer.getRepeatMode());

    }

    const repeatComponent = () => {
        if (repeatCode === 0) {
            return (
                <View></View>

            );
        }
        if (repeatCode === 1) {
            return (
                <View style={styles.badgeStyle}>
                    <Text style={[styles.titleText, { color: colors.white, fontSize: fonts.size.font10 }]}>1</Text>

                </View>
            );
        }
        if (repeatCode === 2) {
            return (
                <View style={styles.badgeStyle}>
                    <Ionicons style={styles.infiniteStyle} name="infinite" />

                </View>
            );
        }

    };

    return (
        <View style={[{
            alignItems: 'flex-end'
        }]}>
            <Touchable onPress={onPressRepeat} // style={{ overflow:'hidden'}}
                children={<View style={styles.containerRepeatButton}>
                    <Ionicons style={styles.repeatActionButton} name="repeat" />
                    {repeatComponent()}
                </View>} />
        </View>);
}
