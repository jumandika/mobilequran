import colors from "../../../theme/colors";
import fonts from "../../../theme/fonts";

const { View, Text, StyleSheet } = require("react-native");
const { default: LinearGradient } = require("react-native-linear-gradient");

function ProgressContent({ verseNumber, trackLength }) {
    return <View style={styles.progressContainer}>
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[colors.darkGreen, colors.grey,]}
            style={[styles.progressBarStyle, {
                flex: verseNumber,
            }]} />
        <View style={styles.badgeProgress}>
            <Text style={styles.nameStyle}>{verseNumber}</Text>
        </View>
        <View style={[styles.progressBar1Style, {
            flex: trackLength - verseNumber,
        }]} />
    </View>;
}

export { ProgressContent }


const styles = StyleSheet.create({
    progressContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingVertical: 3,
        paddingTop: 6,
    },
    nameStyle: {
        fontFamily: fonts.type.poppinsSemiBold,
        fontSize: fonts.size.font12,
        color: colors.darkGreen,
    },
    progressBarStyle: {
        height: 3.5,
        borderRadius: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    progressBar1Style: {
        height: 2.25,
        backgroundColor: "rgba(187, 196, 206, 0.35)",
        borderRadius: 2,
    },
    badgeProgress: {
        paddingHorizontal: 4,
        elevation: 4,
        borderRadius: 20,
        backgroundColor: '#FFF',
    }

});