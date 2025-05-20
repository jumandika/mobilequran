import { StyleSheet } from "react-native";
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainerStyle: (marginTop) => ({
        paddingTop: marginTop,
        paddingBottom: 100
    }),
    markTextStyle: {
        fontFamily: fonts.type.poppinsSemiBold,
        fontSize: fonts.size.font16,
        color: colors.white,
    },
    subMarkTextStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font10,
        color: colors.white,
    },
    linearGradientStyle: {
        alignSelf: 'center',
        marginTop: 40,
        padding: 10,
        margin: 10,
        marginBottom: 10,
        width: metrics.screenWidth - 20,
        borderRadius: 22,
    },
    row: {
        flexDirection: 'row',
    },
    containerAnimated: (searchSurah, zIndex) => ({
        zIndex: searchSurah ? 0 : zIndex,
        backgroundColor: '#FFF',
        position: 'absolute',
        top: 0,
    }),
    containerAnimated2: (searchSurah, opacityBg, zIndexBg) => ({
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '100%', width: '100%',
        position: 'absolute', top: 0,
        opacity: searchSurah ? 1 : opacityBg, zIndex: searchSurah ? 0 : zIndexBg
    }),
    imageStyle: {
        height: 80, width: 80,
        resizeMode: 'cover', opacity: 0.85
    }

})