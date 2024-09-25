import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 100,
        paddingLeft: 10,
        // marginHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchableStyle: {
        overflow: 'hidden',
        padding: 10,
    },
    numberContainer: {
        backgroundColor: colors.green,
        borderRadius: 100,
        height: 27,
        width: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberStyle: {
        fontFamily: fonts.type.poppinsMedium,
        fontSize: fonts.size.font10,
        color: colors.white,
        textAlignVertical:'center',
        textAlign:'center'
    },
    subNameStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font11,
        color: colors.darkGrey,
        marginRight: 8,
        textAlign:'right'
    },
    arabicStyle: {
        fontFamily: fonts.type.amiriRegular,
        fontSize: fonts.size.font20,
        color: colors.darkGreen,
    },
    repeatActionButton: {
        fontSize: fonts.size.font18,
        color: colors.green,
    },
    badgeStyle: {
        position: 'absolute',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 30,
        left: 0,
        top: 0,
        height: 13,
        width: 13,
        backgroundColor: '#D70450',
    },
    titleText: {
        fontSize: fonts.size.font10,
        fontFamily: fonts.type.poppinsMedium,
        color: colors.darkGreen,
    },
});
