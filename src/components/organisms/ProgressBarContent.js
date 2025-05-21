import React, { useCallback, useEffect, useMemo, memo } from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    UIManager,
    View
} from 'react-native';
import { useProgress } from 'react-native-track-player';
import colors from '../../theme/colors';

UIManager.setLayoutAnimationEnabledExperimental?.(true);

function ProgressBarContent() {
    const progress = useProgress();

    const { position, remaining } = useMemo(() => {
        if (progress.duration === 0) return { position: 0, remaining: 0 };
        return {
            position: progress.position,
            remaining: progress.duration - progress.position,
        };
    }, [progress.position, progress.duration]);

    // Avoid LayoutAnimation on every render
    useEffect(() => {
        if (remaining > 0) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        }
    }, [remaining]);

    const renderProgressBar = useCallback(() => {
        const positionFlex = Math.max(position, 0.0001); // avoid flex: 0
        const remainingFlex = Math.max(remaining, 0.1);
        return (
            <View style={styles.progressContainer}>
                <View
                    style={[
                        styles.progressBarStyle,
                        { flex: positionFlex }
                    ]}
                />
                <View
                    style={[
                        styles.progressBarRemainingStyle,
                        { flex: remainingFlex }
                    ]}
                />
            </View>
        );
    }, [position, remaining]);

    return renderProgressBar();
}

export default memo(ProgressBarContent);

const styles = StyleSheet.create({
    progressContainer: {
        width: '85%',
        height: 4.5,
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 20,
        overflow: 'hidden', // ensures child views are clipped
    },
    progressBarStyle: {
        backgroundColor: colors.white,
        height: 4,
        borderRadius:4,
    },
    progressBarRemainingStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        height: 4,
        borderRadius:4,
    },
});