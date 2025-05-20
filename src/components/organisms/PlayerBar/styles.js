import {
    StyleSheet,
} from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    squircleViewStyle: {
        cornerSmoothing: 1,
        topLeftCornerRadius: 22,
        topRightCornerRadius: 22,
        fillColor: colors.green,
        strokeColor: colors.lightGrey,
        strokeWidth: 1,
    },
    barContainer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderCurve: "continuous",
        width: '100%',
        overflow: 'hidden',
        backgroundColor: colors.green,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    linearGradientStyle: {
        position: 'absolute',
        height: '100%', bottom: 0,
        width: '100%'
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    progressContainer: {
        width: '100%',
        height: 4.5,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 5,
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
    titleText: {
        fontSize: fonts.size.font12,
        fontFamily: fonts.type.poppinsSemiBold,
        color: colors.white,
    },
    verseText: {
        fontSize: fonts.size.font8,
        fontFamily: fonts.type.poppinsSemiBold,
        color: colors.lightGrey,
        marginTop: 4,
    },
    numberText: {
        fontSize: fonts.size.font10,
        fontFamily: fonts.type.poppinsRegular,
        color: colors.white,
        marginTop: 5
    },
    artistText: {
        fontSize: fonts.size.font6,
        fontFamily: fonts.type.poppinsRegular,
        color: colors.lightGrey,
        marginTop: -5
    },
})
