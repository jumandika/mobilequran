import PropTypes from 'prop-types';
import React, { memo } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    TouchableNativeFeedback
} from 'react-native';


const Touchable = ({
    onPress,
    onLongPress,
    style,
    disabled,
    children,
    key,
}) => {
    return (
        <View
            key={key}
            style={{ ...style }}
        >

            <TouchableNativeFeedback
                onPress={onPress}
                key={key}
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                useForeground={true}
                background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.080)', true)}
                disabled={disabled}
            >
                {children}
            </TouchableNativeFeedback>

        </View>

    );

}

Touchable.propTypes = {
    key: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    style: PropTypes.any,
    children: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



export default memo(Touchable);