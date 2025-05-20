import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import TrackPlayer, {
    Event,
    useTrackPlayerEvents
} from 'react-native-track-player';
import { useSelector } from 'react-redux';

export function callFunctionPlayerBar() {
    const navigation = useNavigation()
    const chapterId = useSelector((state) => state.StatePlayer.chapterId)
    const [trackId, setTrackId] = useState();
    const [trackTitle, setTrackTitle] = useState('');
    const [trackAyat, setTrackAyat] = useState('');
    const [trackAlbum, setTrackAlbum] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [verseNumber, setVerseNumber] = useState(null);

    useEffect(() => {
        if (trackTitle) {
            getState()
            return
        }
    }, [trackTitle])

    const getState = async () => {

        const currentTrack = await TrackPlayer.getActiveTrack();
        const track = currentTrack;
        const { id, title, ayat, album, artist, verse_number, chapter_id } = track || {};
        setVerseNumber(verse_number);
        setTrackId(id);
        setTrackTitle(title);
        setTrackAyat(ayat);
        setTrackAlbum(album);
        setTrackArtist(artist);
        // setTrack(id, title, album, verse_number, (await TrackPlayer.getQueue()).length, chapter_id);
    };

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        if (event.type === Event.PlaybackActiveTrackChanged &&
            event.track !== undefined) {
            const track = event.track;
            setPlayingAudio(track, setVerseNumber, setTrackId, setTrackTitle, setTrackAyat, setTrackAlbum, setTrackArtist);
        }
    });

    const toAyatScreen = () => {
        navigation.navigate('AyatScreen', {
            id: chapterId,
            name_simple: trackTitle?.split(" ")[0],
        });
    };
    return { trackTitle, trackId, trackAyat, trackAlbum, trackArtist, verseNumber, chapterId, getState, toAyatScreen };
}

function setPlayingAudio(track, setVerseNumber, setTrackId, setTrackTitle, setTrackAyat, setTrackAlbum, setTrackArtist) {
    const { id, title, ayat, album, artist, verse_number, chapter_id } = track || {};
    // console.log('track', title)
    setVerseNumber(verse_number);
    setTrackId(id);
    setTrackAyat(ayat);
    setTrackTitle(title);
    // setTrack(id, title, album, verse_number, (await TrackPlayer.getQueue()).length, chapter_id);
    setTrackAlbum(album);
    setTrackArtist(artist);
}
