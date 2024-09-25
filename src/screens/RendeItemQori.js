import React from 'react';
import { ImageBackground, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from '../components/molecules/Touchable';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

const styleImage = {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.25)',
};
const styleIcon = {
    fontSize: fonts.size.font24,
    color: colors.green
};
export function RendeItemQori(props) {
    return (
        <Touchable style={containerQori()} onPress={() => props.selectQori(props.item)} children={<View>
            <ImageBackground source={{
                uri: props.item.url
            }} style={styleParent(props)}>
                {props.selectedQori?.id === props.item.id ? null : <View style={styleImage} />}
            </ImageBackground>
            {props.selectedQori?.id === props.item.id ? <View style={styleChild()}>
                <MaterialCommunityIcons name='check-circle' style={styleIcon} />
            </View> : null}
        </View>} />
    );
}

function styleChild() {
    return {
        position: 'absolute',
        top: 12,
        right: 12,
        // padding: 1.5,
        borderRadius: 30,
        backgroundColor: colors.lightGrey
    };
}
function containerQori() {
    return {
        overflow: 'hidden',
        justifyContent: 'center',
        paddingRight: 10
    }
}

function styleParent(props) {
    return {
        overflow: 'hidden',
        borderRadius: 20,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: props.selectedQori?.id === props.item.id ? colors.green : "#FFF",
        height: props.selectedQori?.id === props.item.id ? 85 : 45,
        width: props.selectedQori?.id === props.item.id ? 85 : 45,
        margin: props.selectedQori?.id === props.item.id ? 10 : 0,
        elevation: props.selectedQori?.id === props.item.id ? 10 : 0,
        opacity: props.selectedQori?.id === props.item.id ? 1 : 0.8,

        resizeMode: 'cover'
    };
}

