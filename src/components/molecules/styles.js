import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
    listContainer: (logic) => ({
        flex: 1,
        // borderRadius: a && b || c ? 3 : 22,
        marginHorizontal: 10,
        borderRadius: 22,
        backgroundColor: logic ? "#FFF" : "rgba(0,0,0,0)",
        // borderWidth: 0.8,
        // borderRightColor: a && b || c ? colors.lightGrey : "#FFF",
        // borderLeftColor: a && b || c ? colors.lightGrey : "#FFF",
        // borderTopColor: a && b || c ? colors.lightGrey : "#FFF",
        // borderBottomColor: a && b || c ? colors.green : "#FFF",
        // backgroundColor: a && b || c ? "#F7FFFB" : "rgba(0,0,0,0)",
        // backgroundColor: a && b || c ? "#FFF" : "rgba(0,0,0,0)",
    }),
    touchableStyle: {
        overflow: 'hidden',
        marginHorizontal: 5,
        paddingVertical: 10,
    },
    arabicStyle: (fontFamilyArabic, fontSizeArabic) => ({
        fontFamily: fonts.type.amiriRegular,
        fontSize: fonts.size.font20,
        color: colors.darkGreen,
        fontFamily: fontFamilyArabic,
        fontSize: fontSizeArabic,
        lineHeight:70
    }),
    childrenStyle: {
        flex: 1,
        alignItems: 'flex-end'
    },
});
