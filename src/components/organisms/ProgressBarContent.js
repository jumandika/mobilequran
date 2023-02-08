import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import { styles } from './styles';

const start = {
    x: 1,
    y: 1
};
const end = {
    x: 0,
    y: 0
};
const colors1 = [colors.blue, colors.green];
export function ProgressBarContent({ progress }) {
    const { position, remaining } = logic(progress);
    return (<View style={styles.progressContainer}>
        <LinearGradient
            start={start}
            end={end}
            colors={colors1}
            style={[styles.progressBarStyle, {
                flex: position
            }]} />
        <View style={[styles.progressBar1Style, {
            flex: remaining
        }]} />
    </View>);
}
function logic(progress) {
    const remaining = progress.duration - progress.position;
    const position = progress.position;
    return { position, remaining };
}

