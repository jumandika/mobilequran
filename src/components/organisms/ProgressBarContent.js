import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import { useProgress } from 'react-native-track-player';

function ProgressBarContent() {
    const progress = useProgress();
    const start = {
        x: 1,
        y: 1
    };
    const end = {
        x: 0,
        y: 0
    };
    const colors1 = [colors.white, colors.lightGrey];
    const { position, remaining } = logic(progress);
    const renderProgressBar = useCallback(() => <View style={styles.progressContainer}>
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
    </View>, [position, remaining]);
    return (renderProgressBar());
}

export { ProgressBarContent }

const styles = StyleSheet.create({
    progressContainer: {
        width: '85%',
        height: 4.5,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignSelf: 'center',
        borderRadius: 20,
        marginHorizontal: 40,
    },
    progressBarStyle: {
        height: 4.0,
        borderRadius: 20,
    },
    progressBar1Style: {
        height: 4.5,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        borderRadius: 20,
    },
})

function logic(progress) {
    if (progress.duration === 0) {
        return { position: 0, remaining: 0 };
    }
    const remaining = progress.duration - progress.position;
    const position = progress.position;
    return { position, remaining };
}

