import React, { memo, useCallback ,useMemo} from 'react';
import {
    Image, Text,
    View
} from 'react-native';
import {
    State, usePlaybackState
} from 'react-native-track-player';
import { useSelector } from 'react-redux';
import AyatContent from '../../molecules/AyatContent';
import Touchable from '../../molecules/Touchable';
import { styles } from '../styles';
import { playAyat } from '../HeaderPerList/helpers';

export function renderAyatList(ayatSelected, AyatNumber, markAyat, selectAyat, trackId, trackTitle, isLoading) {
    const ayatList = useSelector((state) => state.AyatList.ayatList)
    const fontSizeArabic = useSelector((state) => state.SettingVisual.fontSizeArabic)
    const fontSize = useSelector((state) => state.SettingVisual.fontSize)
    const playbackState = usePlaybackState()
    const onPressPlay = async (item, index) => {
        if (item.id !== trackId.current || playbackState == 1) {
            playAyat(ayatList, index);
        } else if (item.title === trackTitle.current && item.id !== trackId.current) {
            await TrackPlayer.skip(index);
            await TrackPlayer.play();
        } else {
            togglePlayback();
        }
    };

    const togglePlayback = async () => {
        console.log("PLAY PAUSE");
        const currentTrack = await TrackPlayer.getActiveTrackIndex();
        if (currentTrack == null) {
        } else if (playbackState.state === State.Playing) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    };

    const renderItem = useCallback(({ item, index }) => {
        const logic = trackId.current === item.id && trackTitle.current === item.title;
        const playPauseLogic = logic && (playbackState.state === State.Playing || playbackState.state == State.Loading || playbackState.state == State.Buffering);
        return (
            <AyatContent
                markAyat={markAyat}
                selectAyat={selectAyat}
                item={item}
                index={index}
                playPauseLogic={playPauseLogic}
                logic={logic}
                playbackState={playbackState}
                onPressPlay={onPressPlay}
                trackId={trackId.current}
            />
        );
    },[isLoading]);

    const renderItemArab = useCallback(({ item, index }) => {
        return (
            <View style={styles.listContainer(trackId.current, trackTitle.current, item, AyatNumber)}>
                <Touchable
                    style={styles.touchableArabStyle}
                    onPress={() => selectAyat(item, index)}
                    children={<View style={[styles.childrenStyle, { alignItems: 'flex-end', }]}>
                        <Text style={[styles.arabicStyle, { fontSize: fontSizeArabic, backgroundColor: item.verse_key == ayatSelected.verse_key ? '#04D78E33' : "rgba(255,255,255,0.0)" }]}>{item?.text_madani}
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image source={require('../../../assets/arab_bracket_flip.png')} style={{ resizeMode: 'contain', height: fontSizeArabic, width: fontSizeArabic, }} />
                                <Text style={[styles.latinStyle, { fontSize: fontSize, }]}>
                                    {item?.verse_number}
                                </Text>
                                <Image source={require('../../../assets/arab_bracket.png')} style={{ resizeMode: 'contain', marginLeft: 2, height: fontSizeArabic, width: fontSizeArabic }} />
                            </View>
                        </Text>
                    </View>} />
            </View>
        );

    }, [isLoading, AyatNumber, ayatSelected, fontSize]);
    return { renderItem, renderItemArab };
}