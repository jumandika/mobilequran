import PropTypes from 'prop-types';
import React, { lazy, memo } from 'react';
import {
    View
} from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../../molecules/Touchable';
import { ProgressBarContent } from '../ProgressBarContent';
import { callFunctionPlayerBar } from './callFunctionPlayerBar';
import PlayerBarView from './PlayerBarView';
import { styles } from './styles';
// const PlayerBarView = lazy(()=> import('./PlayerBarView'))

const start = {
    x: 0,
    y: 1
};
const end = {
    x: 0,
    y: 0
};
const locations = [0.1, 0.9];
const colors1 = ['rgba(0,0,0,0.45)', 'rgba(0,0,0,0)'];


const PlayerBar = () => {
    const { trackTitle, trackAyat, trackArtist, verseNumber, toAyatScreen } = callFunctionPlayerBar();
    if (trackTitle) {
        return (
            <SquircleView
                squircleParams={styles.squircleViewStyle}
                style={styles.barContainer}
            >
                <Touchable
                    onPress={toAyatScreen}
                >
                    <View >
                        <LinearGradient
                            start={start}
                            end={end}
                            locations={locations}
                            colors={colors1}
                            style={styles.linearGradientStyle}
                        />
                        <PlayerBarView trackArtist={trackArtist} trackAyat={trackAyat} trackTitle={trackTitle} verseNumber={verseNumber} />
                        <ProgressBarContent />
                    </View>
                </Touchable>
            </SquircleView>
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


export default memo(PlayerBar);


