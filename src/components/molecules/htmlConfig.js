import fonts from '../../theme/fonts';
import { HTMLContentModel, HTMLElementModel, defaultSystemFonts } from 'react-native-render-html';
import colors from '../../theme/colors';

export function htmlConfig(fontSize) {
    const customHTMLElementModels = {
        'p': HTMLElementModel.fromCustomModel({
            tagName: 'p',
            mixedUAStyles: {
                fontFamily: fonts.type.poppinsRegular,
                color: colors.darkGreen,
                opacity: 0.7,
                width: '100%',
                fontSize: fontSize,
                textAlign: 'justify'
            },
            contentModel: HTMLContentModel.block
        }),
        'div': HTMLElementModel.fromCustomModel({
            tagName: 'div',
            mixedUAStyles: {
                fontFamily: fonts.type.amiriRegular,
                color: colors.darkGreen,
                opacity: 0.7,
                fontSize: fontSize,
                textAlign: 'justify'
            },
            contentModel: HTMLContentModel.block
        }),
        'tajweed': HTMLElementModel.fromCustomModel({
            tagName: 'tajweed',
            mixedUAStyles: {
                fontFamily: fonts.type.amiriRegular,
                color: colors.darkGreen,
                opacity: 0.7,
                fontSize: fontSize,
                textAlign: 'justify'
            },
            contentModel: HTMLContentModel.block
        })
    };
    const systemFonts = [fonts.type.poppinsRegular, fonts.type.amiriRegular, ...defaultSystemFonts];
    return { customHTMLElementModels, systemFonts };
}
