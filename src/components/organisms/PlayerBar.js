import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View
} from 'react-native';
import {
    RepeatMode,
    usePlaybackState,
    useProgress,
} from 'react-native-track-player';
import Touchable from '../molecules/Touchable';
import { ControllerContent } from './ControllerContent';
import { ProgressBarContent } from './ProgressBarContent';
import { RepeatController } from './RepeatController';
import { callFunctionPlayerBar } from './callFunctionPlayerBar';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';


const start = {
    x: 0,
    y: 1
};
const end = {
    x: 0,
    y: 0
};
const locations = [0.9, 1];
const colors1 = [colors.white, 'rgba(0,0,0,0.065)'];
const PlayerBar = ({
    initTrack,
    skipToNext,
    skipToPrevious,
    setRepeatCodeRedux,
    trackLength,
    chapterId,
}) => {
    const navigation = useNavigation()
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [repeatMode, setRepeatMode] = useState(RepeatMode.Off)
    const [repeatCode, setRepeatCode] = useState(0)
    const [trackId, setTrackId] = useState();
    const [trackTitle, setTrackTitle] = useState('');
    const [trackAlbum, setTrackAlbum] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [verseNumber, setVerseNumber] = useState(null);

    useEffect(() => {
        getState()
    }, [initTrack])

    const { getState, toAyatScreen, togglePlayback, repeatComponent, onPressRepeat } = callFunctionPlayerBar(repeatMode, setRepeatCode, setRepeatCodeRedux, initTrack, setVerseNumber, setTrackId, setTrackTitle, setTrackAlbum, setTrackArtist, playbackState, setRepeatMode, repeatCode, navigation, chapterId, trackTitle);

    if (trackTitle) {
        return (
            <LinearGradient
                start={start}
                end={end}
                locations={locations}
                colors={colors1}
                style={styles.barContainer}
            >
                <Touchable
                    onPress={toAyatScreen}
                >
                    <View >
                        <ProgressBarContent progress={progress} />
                        <View style={styles.contentContainer}>
                            <View style={styles.container}>
                                <Text style={styles.titleText}>{trackTitle}</Text>
                                <Text style={styles.numberText}>{verseNumber + '/' + trackLength}</Text>
                            </View>
                            <ControllerContent playbackState={playbackState} togglePlayback={togglePlayback} skipToNext={skipToNext} skipToPrevious={skipToPrevious} />
                            <RepeatController repeatComponent={repeatComponent} onPressRepeat={onPressRepeat} />
                        </View>
                    </View>
                </Touchable>
            </LinearGradient>
        );
    }
    return null;


}


PlayerBar.propTypes = {
    key: PropTypes.any,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    style: PropTypes.any,
    // children: PropTypes.element.isRequired,
};



const mapStateToProps = (state) => {
    return {
        ayatList: state.AyatList.ayatList,
        trackLength: state.StatePlayer.trackLength,
        chapterId: state.StatePlayer.chapterId,
        repeatCode: state.StatePlayer.repeatCode,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        setRepeatCodeRedux:
            (
                repeatCode,
            ) => dispatch({
                type: 'SET_REPEAT_CODE',
                repeatCode: repeatCode,
            }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayerBar);


