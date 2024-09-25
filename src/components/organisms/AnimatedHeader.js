import React from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';
import Touchable from '../molecules/Touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';


function AnimatedHeader(props) {
    return (<Animated.View // onLayout={(event) => {
        //     var { x, y, width, height } = event.nativeEvent.layout;
        //     height = height + 10
        //     setMarginTop(height)
        //     setSnapToInterval(height - 90)
        // }}
        style={styles.container(props.opacity)}>
        <LinearGradient start={{
            x: 1.5,
            y: 1.5
        }} end={{
            x: 0.5,
            y: 0
        }} colors={[colors.blue, colors.green]}
            style={styles.linearGradientStyle1}
        >

            <View style={styles.container2} >

                <TextInput style={styles.textInputStyle}
                    onChangeText={props.onChangeText}
                    placeholder={'Cari Surat...'}
                    value={props.searchSurah}
                    placeholderTextColor={"#AAA"}
                    onSubmitEditing={props.onSubmitEditing}
                    onBlur={props.onSubmitEditing}
                    autoCapitalize={'none'}
                    keyboardType={'default'}
                />
                {props.searchSurah ?
                    <Touchable
                        onPress={props.removeSearch}
                        style={{ overflow: 'hidden' }}
                    >
                        <View style={styles.container1}>

                            <Ionicons name='close-outline' style={styles.iconStyle} />
                        </View>
                    </Touchable>
                    : <Touchable
                        onPress={props.onSubmitEditing}
                        style={{ overflow: 'hidden' }}
                    >
                        <View style={styles.container1}>
                            <Ionicons name='search-outline' style={styles.iconStyle} />
                        </View>
                    </Touchable>
                }
            </View>

        </LinearGradient>
    </Animated.View>);
}

export default AnimatedHeader;

const styles = StyleSheet.create({
    container: (opacity) => ({
        borderRadius: 1,
        elevation: 10,
        position: 'absolute',
        top: 0,
        marginTop: -90,
        transform: [{
            translateY: opacity || 0
        }]
    }),
    container1: {
        justifyContent: 'center',
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.95)',
        height: 40
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center'
    },
    titleStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
    },
    textStyle: {
        fontFamily: fonts.type.poppinsLight,
        fontSize: fonts.size.font14,
        color: colors.darkGreen,
    },
    linearGradientStyle: {
        alignSelf: 'center',
        marginTop: 40,
        padding: 20,
        margin: 20,
        marginBottom: 10,
        width: metrics.screenWidth - 40,
        borderRadius: 30,
    },
    linearGradientStyle1: {
        elevation: 20,
        height: 90,
        alignSelf: 'center',
        padding: 10,
        paddingTop: 40,
        width: metrics.screenWidth,
    },
    touchableStyle: {
        position: 'absolute',
        bottom: 10,
        width: '60%',
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: colors.darkBlue,
    },
    row: {
        flexDirection: 'row',
        // marginTop: 10,
    },
    textInputStyle: {
        flex: 1,
        height: 40,
        paddingVertical: 0,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255,255,255,0.95)',
        color: colors.black,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        fontSize: 16,
        fontFamily: fonts.type.poppinsRegular
    },
    iconStyle: {
        fontSize: fonts.size.font18, color: colors.black
    }

})