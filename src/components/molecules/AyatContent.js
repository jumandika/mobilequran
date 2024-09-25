import React, { memo, useCallback, useMemo } from 'react';
import {
    Text,
    View
} from 'react-native';
import Touchable from '../molecules/Touchable';
import HeaderPerList from '../organisms/HeaderPerList/HeaderPerList';
import { TranslationContent } from './TranslationContent';
import { styles } from './styles';
import { useSelector } from 'react-redux';

const AyatContent = ({
    item,
    index,
    AyatNumber,
    trackId,
    trackTitle,
    repeatCode,
    onPressPlay,
    markAyat,
    selectAyat,
}) => {
    const fontFamilyArabic = useSelector((state) => state.SettingVisual.fontFamilyArabic)
    const fontSizeArabic = useSelector((state) => state.SettingVisual.fontSizeArabic)
    const logic = trackId.current === item.id && trackTitle.current === item.title;

    const renderView = useCallback(() =>
        <View
            key={item.id.toString()}
            style={styles.listContainer(logic)}>
            <HeaderPerList item={item} index={index} trackId={trackId?.current} trackTitle={trackTitle.current} repeatCode={repeatCode} onPressMark={() => markAyat(item, index)} onPressPlay={() => onPressPlay(item, index)} />
            <Touchable style={styles.touchableStyle} onLongPress={() => selectAyat(item, index)} children={<View>
                <View style={styles.childrenStyle}>
                    <Text style={styles.arabicStyle(fontFamilyArabic, fontSizeArabic)}>{item?.text_madani}</Text>
                </View>
                <TranslationContent item={item}></TranslationContent>
            </View>}
            />
        </View>
        , [trackId.current])

    return (renderView());
}

export default (AyatContent);


