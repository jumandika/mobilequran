import React from 'react';
import {
    Dimensions, StyleSheet, View
} from 'react-native';
import RenderHTML from 'react-native-render-html';
const { height, width } = Dimensions.get('window')

const AyatTajweed = (props) => {
    let x = `<html>
    <head>
      <base href="https://quran.com/"></base>
    </head>
    <body style="margin: 10px;">
    ${props.item?.text_uthmani_tajweed}
    </body>
  </html>`
    return (<View style={styles.touchableStyle}>
        <RenderHTML

            contentWidth={width}
            source={{
                html: x
            }}
            // customHTMLElementModels={props.customHTMLElementModels}
            // systemFonts={props.systemFonts}
        />
    </View>);
}


const styles = StyleSheet.create({

    rowContainer: {
        flexDirection: 'row',
        paddingVertical: 1,
    },
    touchableStyle: {
        overflow: 'hidden',
        marginHorizontal: 10,
        paddingVertical: 15,
    },

});


export { AyatTajweed };
