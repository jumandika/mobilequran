import { View, Text, Image } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import { RepeatController } from "../RepeatController";
import { ControllerContent } from "../ControllerContent";

const PlayerBarView = ({ onPressRepeat, repeatComponent, trackArtist, trackAyat, trackTitle, verseNumber }) => {
    const selectedQoriUrl = useSelector((state) => state.SelectedQori.selectedQori.url)
    const trackLength = useSelector((state) => state.StatePlayer.trackLength)
    const squircleParams = {
        cornerSmoothing: 1,
        cornerRadius: 14,
        fillColor: 'rgba(0,0,0,0)',
    }
    return (
        <View style={styles.contentContainer}>
            <SquircleView
                squircleParams={squircleParams}
                style={{ marginRight: 10 }}
            >
                <Image source={{ uri: selectedQoriUrl }} style={{ borderRadius: 14, overflow: 'hidden', height: 50, width: 50 }} />
            </SquircleView>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titleText}>{trackTitle}
                    </Text>
                    <Text style={styles.verseText}>{` - ${trackAyat}`}</Text>
                </View>
                <Text style={styles.artistText}>{`${trackArtist}`}</Text>
                <Text style={styles.numberText}>{`${verseNumber}/${trackLength}`}</Text>
            </View>
            <RepeatController repeatComponent={repeatComponent} onPressRepeat={onPressRepeat} />
            <ControllerContent />
        </View>)
};

export default PlayerBarView