import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import TrackPlayer, {
    State, RepeatMode,
    useTrackPlayerEvents,
    Event
} from 'react-native-track-player';
import { styles } from './styles';

export function callFunctionPlayerBar(repeatMode, setRepeatCode, setRepeatCodeRedux, initTrack, setVerseNumber, setTrackId, setTrackTitle, setTrackAlbum, setTrackArtist, playbackState, setRepeatMode, repeatCode, navigation, chapterId, trackTitle) {
    const getState = async () => {
        TrackPlayer.setRepeatMode(repeatMode);
        setRepeatCode(await TrackPlayer.getRepeatMode());
        setRepeatCodeRedux(await TrackPlayer.getRepeatMode());
        const currentTrack = await TrackPlayer.getCurrentTrack();
        const track = await TrackPlayer.getTrack(currentTrack);
        const { id, title, album, artist, verse_number, chapter_id } = track || initTrack || {};
        setVerseNumber(verse_number);
        setTrackId(id);
        setTrackTitle(title);
        setTrackAlbum(album);
        setTrackArtist(artist);
        // setTrack(id, title, album, verse_number, (await TrackPlayer.getQueue()).length, chapter_id);
    };

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (event.type === Event.PlaybackTrackChanged &&
            event.nextTrack !== undefined) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            setPlayingAudio(track, setVerseNumber, setTrackId, setTrackTitle, setTrackAlbum, setTrackArtist);
            // setTrackArtwork(artwork);
        }
    });


    const togglePlayback = async () => {
        console.log("PLAY PAUSE");
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {
            // TODO: Perhaps present an error or restart the playlist?
        } else {
            if (playbackState !== State.Playing) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };

    const onPressRepeat = async () => {
        const repeatStatus = await TrackPlayer.getRepeatMode();
        // console.log('TrackPlayer.getRepeatMode', repeatStatus);
        if (repeatStatus === 0) {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode(RepeatMode.Track);
            setRepeatCode(1);
            setRepeatCodeRedux(1);
        }
        else if (repeatStatus === 1) {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode(RepeatMode.Queue);
            setRepeatCode(2);
            setRepeatCodeRedux(2);
        }
        else if (repeatStatus === 2) {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode(RepeatMode.Off);
            setRepeatCode(0);
            setRepeatCodeRedux(0);
        }

    };

    const repeatComponent = () => {
        if (repeatCode === 0) {
            return (
                <View></View>

            );
        }
        if (repeatCode === 1) {
            return (
                <View style={styles.badgeStyle}>
                    <Text style={[styles.titleText, { color: colors.white, fontSize: fonts.size.font10 }]}>1</Text>

                </View>
            );
        }
        if (repeatCode === 2) {
            return (
                <View style={styles.badgeStyle}>
                    <Ionicons style={styles.infiniteStyle} name="infinite" />

                </View>

            );
        }

    };

    const toAyatScreen = () => {
        navigation.navigate('AyatScreen', {
            id: chapterId,
            name_simple: trackTitle?.split(" ")[0],
        });
    };
    return { getState, toAyatScreen, togglePlayback, repeatComponent, onPressRepeat };
}
function setPlayingAudio(track, setVerseNumber, setTrackId, setTrackTitle, setTrackAlbum, setTrackArtist) {
    const { id, title, album, artist, verse_number, chapter_id } = track || {};
    // console.log('track', title)
    setVerseNumber(verse_number);
    setTrackId(id);
    setTrackTitle(title);
    // setTrack(id, title, album, verse_number, (await TrackPlayer.getQueue()).length, chapter_id);
    setTrackAlbum(album);
    setTrackArtist(artist);
}
