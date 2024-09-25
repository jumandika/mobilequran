import React, { useCallback } from 'react';
import {
    Image, Text,
    View
} from 'react-native';
import AyatContent from '../molecules/AyatContent';
import Touchable from '../molecules/Touchable';
import { styles } from './styles';

export function renderAyatList(trackId, trackTitle, ayatSelected, playbackState, AyatNumber, markAyat, onPressPlay, selectAyat, repeatCode, isLoading, fontSize) {

    const renderItem = useCallback(({ item, index }) => {
        return (
            <AyatContent 
            trackId={trackId}
            trackTitle={trackTitle}
            verse_key={ayatSelected.verse_key}
            AyatNumber={AyatNumber}
            onPressPlay={onPressPlay}
            markAyat={markAyat}
            selectAyat={selectAyat}
            item={item}
            index={index}
            repeatCode={repeatCode}
             />
        );
    }, [isLoading, trackId, ayatSelected, repeatCode, fontSize]);

    const renderItemArab = useCallback(({ item, index }) => {
        return (
            <View style={styles.listContainer(trackId.current, trackTitle.current, item, AyatNumber)}>
                <Touchable
                    style={styles.touchableArabStyle}
                    onPress={() => selectAyat(item, index)}
                    children={<View style={[styles.childrenStyle, { alignItems: 'flex-end', }]}>
                        <Text style={[styles.arabicStyle, { fontSize: fontSizeArabic, backgroundColor: item.verse_key == ayatSelected.verse_key ? '#04D78E33' : "rgba(255,255,255,0.0)" }]}>{item?.text_madani}
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image source={require('../../assets/arab_bracket_flip.png')} style={{ resizeMode: 'contain', height: fontSizeArabic, width: fontSizeArabic, }} />
                                <Text style={[styles.latinStyle, { fontSize: fontSize, }]}>
                                    {item?.verse_number}
                                </Text>
                                <Image source={require('../../assets/arab_bracket.png')} style={{ resizeMode: 'contain', marginLeft: 2, height: fontSizeArabic, width: fontSizeArabic }} />
                            </View>
                        </Text>
                    </View>} />
            </View>
        );

    }, [isLoading, trackTitle, trackId, repeatCode, playbackState, AyatNumber, ayatSelected, fontSize]);
    return { renderItem, renderItemArab };
}