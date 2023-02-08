import React from 'react';
import { ImageBackground, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from '../components/molecules/Touchable';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import { styles } from './HomeScreen';

const styleImage = {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.55)'
};
const styleIcon = {
    fontSize: fonts.size.font16,
    color: colors.green
};
export function RendeItemQori(props) {
    return (<Touchable style={styles.containerQori} onPress={() => props.selectQori(props.item)} children={<View>
        <ImageBackground source={{
            uri: props.item.url
        }} style={styleParent(props)}>
            {props.selectedQori?.id === props.item.id ? null : <View style={styleImage} />}
        </ImageBackground>
        {props.selectedQori?.id === props.item.id ? <View style={styleChild()}>
            <MaterialCommunityIcons name='check-circle' style={styleIcon} />
        </View> : null}
    </View>} />);
}
function styleChild() {
    return {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 1.5,
        borderRadius: 30,
        backgroundColor: colors.white
    };
}

function styleParent(props) {
    return {
        overflow: 'hidden',
        borderRadius: 60,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: props.selectedQori?.id === props.item.id ? colors.green : "#FFF",
        height: props.selectedQori?.id === props.item.id ? 55 : 45,
        width: props.selectedQori?.id === props.item.id ? 55 : 45,
        resizeMode: 'cover'
    };
}

