import PropTypes from 'prop-types';
import React, { memo } from 'react';
import {
    Text,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import Touchable from '../../molecules/Touchable';
import { repeatFunction } from './repeatFunction';
import { styles } from './styles';

const HeaderPerList = ({
    item,
    index,
    onPressMark,
    logic,
    playPauseLogic,
    onPressPlay,
}) => {
    const repeatCode = useSelector((state) => state.StatePlayer.repeatCode)
    const repeatComponent = repeatFunction(logic, repeatCode)

    return (
        <View style={styles.rowStyle} >
            <View style={styles.numberContainer}>
                <Text style={styles.numberStyle} >{item.verse_number.toLocaleString('ar-AE')}</Text>
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
                    onPress={() => onPressPlay(item, index)}
                    style={styles.touchableStyle}
                    children={
                        <View style={styles.rowContainer} >
                            <Text style={[styles.subNameStyle, { width: 50 }]} >{playPauseLogic ? 'Pause' : 'Play'}</Text>
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


