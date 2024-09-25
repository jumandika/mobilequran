import React, { useCallback } from 'react';
import { getAyat } from '../../config/ApiService';
import { getData, storeData } from '../../utils/asyncStorage';
import { checkConnection } from '../../utils/connectionChecker';
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event,
    State, useTrackPlayerEvents
} from 'react-native-track-player';
import { setPlayAudio } from '../../utils/setPlayAudio';

const updateOptions = {
    android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
    },
    capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
    ],
    compactCapabilities: [
        Capability.Play,
        Capability.Pause,
    ],
};
export function callFunction(setAyatList, setIsLoading, playbackState, id, page, selectedQori, name_simple, flatlistRef, trackTitle, setVerseNumber, trackId, setTrackAlbum, setTrackArtist, setInitTrack, ayatList, showLatin, setPutarModal, setLatinModal, setTranslateModal, ayatSelected, setModalAyatVisible, setAyatSelected, setIndexAyatSelected, AyatNumber, repeatCode, isLoading, fontSize, setVerseKey, setItemLastSeen) {
    const connectionCheck = async () => {
        const x = await checkConnection;
        if (x.isConnected) {
            console.log('ONLINE');
            getAyatList();
        } else {
            console.log('OFFLiNE');
            getAyatListLocally();
        }
    };

    const getAyatListLocally = async () => {
        const ayat_list = await getData('json', '@ayat_list');
        setAyatList(ayat_list);
        setIsLoading(false);
        ToastAndroid.show("You're in offline Mode", ToastAndroid.BOTTOM);
    };

    const getAyatList = async () => {
        try {
            const response = await getAyat(id, page, selectedQori.id);
            response.verses.forEach(function (item, index) {
                item.title = name_simple + " \u2022 Ayat " + response.verses[index].verse_number,
                    item.artwork = selectedQori.url,
                    item.album = "Al-Qur'an",
                    item.artist = selectedQori.reciter_name + (selectedQori.style ? ` (${selectedQori.style})` : ''),
                    item.url = "https://verses.quran.com/" + response.verses[index].audio.url;
            });
            setAyatList(response.verses);
            // console.log('GET AYAT', JSON.stringify(ayatList))
            storeData('json', '@ayat_list', response.verses);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };
    const getState = async () => {
        const currentTrack = await TrackPlayer.getActiveTrack();
        console.log('currentTrack :>> ', JSON.stringify(currentTrack) )
        setPlayAudio(currentTrack, flatlistRef, name_simple, trackTitle, setVerseNumber, trackId, setTrackAlbum, setTrackArtist);
    };

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        // console.log('Event', event.type)
        // console.log('event.nextTrack', JSON.stringify( event))
        const logic = event.type === Event.PlaybackActiveTrackChanged && event.track !== undefined;
        if (logic) {
            const track = event.track;
            setPlayAudio(track, flatlistRef, name_simple, trackTitle, setVerseNumber, trackId, setTrackAlbum, setTrackArtist);
            // setTrackArtwork(artwork);
        }
    });

    const togglePlayback = async () => {
        console.log("PLAY PAUSE");
        const currentTrack = await TrackPlayer.getActiveTrackIndex();
        if (currentTrack == null) {
        } else {
            if (playbackState.state === State.Playing) {
                await TrackPlayer.pause();
            } else {
                await TrackPlayer.play();
            }
        }
    };

    const playAyat = async (item, index) => {
        console.log('index PLAYYY', index);
        setInitTrack(item);
        await TrackPlayer.reset();
        await TrackPlayer.removeUpcomingTracks();
        await TrackPlayer.updateOptions(updateOptions);
        await TrackPlayer.add(ayatList);
        await TrackPlayer.skip(index);
        await TrackPlayer.play();

    };

    const onPressPlay = async (item, index) => {
        if (item.id !== trackId.current || playbackState == 1) {
            playAyat(item, index);
        }
        else if (item.title === trackTitle.current && item.id !== trackId.current) {
            await TrackPlayer.skip(index);
            await TrackPlayer.play();
        }
        else {
            togglePlayback();
        }
    };

    const selectAyat = (item, index) => {
        if (showLatin) {
            setPutarModal(true);
            setLatinModal(false);
            setTranslateModal(false);
        } else {
            setPutarModal(false);
            setLatinModal(false);
            setTranslateModal(true);

        }
        if (item.verse_key == ayatSelected.verse_key) {
            setModalAyatVisible(false);
            setAyatSelected([]);
            setIndexAyatSelected(null);

        } else {
            setAyatSelected(item);
            setIndexAyatSelected(index);
            setModalAyatVisible(true);
        }

    };

    const markAyat = async (item, index) => {
    };

    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {

        setVerseKey(viewableItems[0]?.item?.verse_key);
        setItemLastSeen(viewableItems[0]?.item);
        // console.log("Changed in this iteration", viewableItems[0]?.item.id);
        // console.log("Visible items are", viewableItems);
        // console.log("Changed in this iteration", changed);
    }, []);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    return { getState, connectionCheck, selectAyat, playAyat, _onViewableItemsChanged, _viewabilityConfig, onPressPlay, markAyat };
}
