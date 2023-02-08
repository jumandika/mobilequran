import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Touchable from '../molecules/Touchable';
import HeaderPerList from '../organisms/HeaderPerList/HeaderPerList';
import { TranslationContent } from './TranslationContent';
import { styles } from './styles';

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
    fontFamilyArabic,
    fontSizeArabic
}) => {
    const { a, b, c } = logic(trackId, trackTitle, AyatNumber, item);
    return (<View
        key={item.id.toString()}
        style={styles.listContainer(a, b, c)}>
        <HeaderPerList item={item} index={index} trackId={trackId?.current} trackTitle={trackTitle.current} repeatCode={repeatCode} onPressMark={() => markAyat(item, index)} onPressPlay={() => onPressPlay(item, index)} />
        <Touchable style={styles.touchableStyle} onLongPress={() => selectAyat(item, index)} children={<View>
            <View style={styles.childrenStyle}>
                <Text style={styles.arabicStyle(fontFamilyArabic, fontSizeArabic)}>{item?.text_madani}</Text>
            </View>
            <TranslationContent item={item}></TranslationContent>
        </View>}
        />
    </View>);
}

export default AyatContent;

function logic(trackId, trackTitle, AyatNumber, item) {
    const a = trackId.current === item.id;
    const b = trackTitle?.current === item.title;
    const c = AyatNumber === item.id;
    return { a, b, c };
}

