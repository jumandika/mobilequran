import PropTypes from 'prop-types';
import React, { memo } from 'react';
import {
    Text,
    View
} from 'react-native';
import {
    State,
    usePlaybackState
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import Touchable from '../../molecules/Touchable';
import { styles } from './styles';
import { repeatFunction } from './repeatFunction';

const HeaderPerList = ({
    item,
    index,
    trackId,
    trackTitle,
    onPressMark,
    onPressPlay,
    repeatCode,
    style,
    key,
}) => {
    const playbackState = usePlaybackState();
    let logic = trackId === item.id && trackTitle === item.title;
    let playPauseLogic = logic && !(playbackState !== State.Playing);

    const repeatComponent = repeatFunction(logic, repeatCode)

    return (
        <View style={[styles.rowStyle, { backgroundColor: logic ? '#E7FFF7' : colors.lightGrey, }]} >

            <View style={styles.numberContainer}>
                <Text style={styles.numberStyle} >{item.verse_number}</Text>
            </View>
            <View style={[styles.rowContainer, { flex: 1, justifyContent: 'flex-end', }]}>
                <Touchable
                    onPress={onPressMark}
                    style={styles.touchableStyle}
                    children={
                        <View style={styles.rowContainer} >
                            <Text style={styles.subNameStyle} >{'Tandai'}</Text>
                            <Ionicons name='bookmark' style={{ fontSize: fonts.size.font18, color: item.Is_Marked ? "#D70450" : colors.darkGreen }} />
                        </View>
                    }
                />
                <Touchable
                    onPress={onPressPlay}
                    style={styles.touchableStyle}
                    children={
                        <View style={styles.rowContainer} >
                            <Text style={styles.subNameStyle} >{playPauseLogic ? 'Pause' : 'Play'}</Text>
                            <Ionicons name={playPauseLogic ? 'pause' : 'play'} style={{ fontSize: fonts.size.font20, color: playPauseLogic ? colors.darkGrey : colors.green }} />
                        </View>
                    }
                />

                {repeatComponent()}

            </View>

        </View >
    );

}


HeaderPerList.propTypes = {
    key: PropTypes.any,
    item: PropTypes.object,
    index: PropTypes.number,
    onPress: PropTypes.func,
    style: PropTypes.any,
    // children: PropTypes.element.isRequired,
};

export default memo(HeaderPerList);


