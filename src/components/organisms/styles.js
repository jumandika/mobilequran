import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
const { height, width } = Dimensions.get('window')


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: (trackId, trackTitle, item, AyatNumber) => ({
        flex: 1,
        borderRadius: 22,
        marginHorizontal: 15,
        // borderWidth: 0.8,
        // borderColor: trackId === item.id && trackTitle === item.title || item.id === AyatNumber ? colors.green : "#FFF",
        backgroundColor: trackId === item.id && trackTitle === item.title || item.id === AyatNumber ? "#F7FFFB" : "#FFF",
    }),
    separatorStyle: {
        width: '90%', height: 1.5,
        borderRadius: 10, backgroundColor: '#F7F7F7',
        alignSelf: 'center'
    },
    separatorStyle1: {
        width: '90%', height: 1.5,
        borderRadius: 10, backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        paddingVertical: 1,
    },
    touchableStyle: {
        overflow: 'hidden',
        marginHorizontal: 10,
        paddingVertical: 15,
    },
    touchableArabStyle: {
        overflow: 'hidden',
        margin: 10,
    },
    childrenStyle: {
        flex: 1,
    },
    columnStyle: {
        paddingHorizontal: 20
    },
    numberStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font11,
        color: '#000',
    },
    translationStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font11,
        color: colors.darkGreen,
        width: '96%',
    },
    latinStyle: {
        fontFamily: fonts.type.poppinsMedium,
        fontSize: fonts.size.font11,
        color: colors.darkGreen,
    },
    arabicStyle: {
        fontFamily: fonts.type.amiriRegular,
        fontSize: fonts.size.font20,
        color: colors.darkGreen,
    },

    modalView: {
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.4)",
        alignItems: "center",
    },
    childModalView: {
        width: '100%',
        marginTop: 'auto',
        backgroundColor: "#F1F1F1",
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        padding: 20,
        paddingBottom: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        paddingHorizontal: 15
    },
    contentContainerStyle: {
        paddingVertical: 10,
        paddingBottom: 80
    },
    barContainer: {
        position: 'absolute',
        bottom: 0,
        // padding: 10,
        alignSelf: 'center',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        width: '100%',
        overflow: 'hidden',
        // backgroundColor: '#FBFFFE',
        // borderBottomWidth: 4,
        // borderColor: colors.lightGrey,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 2,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 2,
        paddingVertical: 0,
    },
    titleText: {
        fontSize: fonts.size.font10,
        fontFamily: fonts.type.poppinsRegular,
        color: colors.white,
    },
    numberText: {
        fontSize: fonts.size.font10,
        fontFamily: fonts.type.poppinsRegular,
        color: colors.white,
    },
    progressLabelContainer: {
        width: 370,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        color: colors.darkGreen,
        fontVariant: ['tabular-nums'],
    },
    actionRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    primaryActionButton: {
        fontSize: 50,
        color: colors.white,
    },
    secondaryActionButton: {
        fontSize: fonts.size.font16,
        color: colors.white,
    },
    containerRepeatButton: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    repeatActionButton: {
        fontSize: fonts.size.font18,
        color: colors.white,
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
    infiniteStyle: {
        color: colors.white,
        fontSize: fonts.size.font10,
    },
    iconPlayerBar: {
        minHeight: 50,
        minWidth: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
