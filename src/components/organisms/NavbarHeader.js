import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Animated,
    Pressable,
    Platform,
    FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../molecules/Touchable';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';


const NavbarHeader = ({
    title,
    navigation,
    onPress,
    children,
    style,
    key,
}) => {


    return (
        <View style={styles.rowStyle} >
            <Touchable
                onPress={onPress}
                style={styles.touchableStyle}
                children={
                    <MaterialCommunityIcons
                        name='arrow-left'
                        style={{ fontSize: fonts.size.font20, color: colors.darkGrey }}
                    />
                }
            />
            <Text style={styles.nameStyle} >{title}</Text>
            <View style={{ flex: 1, marginTop:-10,  justifyContent: 'center', alignItems: 'flex-end' }}>
                {children}
            </View>
        </View>
    );

}


NavbarHeader.propTypes = {
    key: PropTypes.any,
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.any,
    children: PropTypes.element,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchableStyle: {
        overflow: 'hidden',
        height: 30,
        width: 30,
        borderRadius: 30,
    },
    rowStyle: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 10,
        borderColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameStyle: {
        paddingLeft: 10,
        height: 30,
        fontFamily: fonts.type.poppinsSemiBold,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
    },
    numberStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font12,
        color: '#000',
    },
    subNameStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font12,
        color: colors.grey,
    },
    arabicStyle: {
        fontFamily: fonts.type.amiriRegular,
        fontSize: fonts.size.font20,
        color: colors.darkGreen,

    }

});



export default memo(NavbarHeader);