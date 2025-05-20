import React, { lazy, useCallback } from 'react';
import {
    Text,
    View
} from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import { useSelector } from 'react-redux';
import Touchable from '../molecules/Touchable';
import { styles } from './styles';
const HeaderPerList = lazy(() => import('../organisms/HeaderPerList/HeaderPerList'));
const TranslationContent = lazy(() => import('./TranslationContent'));

const AyatContent = ({
    item,
    index,
    markAyat,
    onPressPlay,
    selectAyat,
    playPauseLogic,
    logic,
    playbackState,
    trackId
}) => {
    const fontFamilyArabic = useSelector((state) => state.SettingVisual.fontFamilyArabic)
    const fontSizeArabic = useSelector((state) => state.SettingVisual.fontSizeArabic)

    const renderView = useCallback(() => {
        return <SquircleView
            squircleParams={styles.squircleParamsStyle(logic)}
            key={item.id.toString()}
            style={styles.listContainer(logic)}
        >
            <HeaderPerList
                logic={logic}
                playPauseLogic={playPauseLogic}
                playbackState={playbackState}
                item={item}
                index={index}
                onPressPlay={onPressPlay}
                onPressMark={() => markAyat(item, index)}
            />
            <Touchable style={styles.touchableStyle} onLongPress={() => selectAyat(item, index)}
                children={
                    <View>
                        <View style={styles.childrenStyle}>
                            <Text style={styles.arabicStyle(fontFamilyArabic, fontSizeArabic)}>{item?.text_madani}</Text>
                        </View>
                        <TranslationContent item={item} />
                    </View>}
            />
        </SquircleView>
    }, [trackId])

    return (renderView());
}

export default AyatContent;


