import React, { memo } from 'react';
import {
    Dimensions, StyleSheet, View
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useSelector } from 'react-redux';
import { htmlConfig } from './htmlConfig';
const { height, width } = Dimensions.get('window')

const TranslationContentComponent = (props) => {
    const fontSize = useSelector((state) => state.SettingVisual.fontSize)

    const { customHTMLElementModels, systemFonts } = htmlConfig(fontSize);
    return (<View style={styles.touchableStyle}>
        <RenderHTML
            contentWidth={width}
            source={{
                html: `<p>${props.item?.translations[0]?.text}<p>`
            }}
            customHTMLElementModels={customHTMLElementModels}
            systemFonts={systemFonts}
        />
    </View>);
}


const styles = StyleSheet.create({
    touchableStyle: {
        overflow: 'hidden',
        marginHorizontal: 5,
        paddingBottom: 10,
        paddingTop: 20,
    },

});

const TranslationContent = memo(TranslationContentComponent)
export default TranslationContent 

