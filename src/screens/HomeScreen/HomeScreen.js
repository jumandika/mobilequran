import React, { lazy, memo } from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    Text,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import colors from '../../theme/colors';
import { styles } from './styles';
import { useHomeScreenLogic } from './useHomeScreenLogic';
const AnimatedHeader = lazy(() => import('../../components/organisms/AnimatedHeader'));
const FassalList = lazy(() => import('../../components/organisms/FassalList/FassalList'));
const ReciterList = lazy(() => import('../ReciterList'));

const HomeScreen = (props) => {
    const {
        onScroll,
        onLayout,
        onSubmitEditing,
        removeSearch,
        onChangeText,
        isLoading,
        userId,
        fassalListShow,
        flatlistRef,
        snapToInterval,
        zIndex,
        opacity,
        zIndexBg,
        opacityBg,
        marginTop,
        searchSurah
    } = useHomeScreenLogic(props)

    return (
        <View style={styles.container}>
            <Animated.View
                onLayout={onLayout}
                style={styles.containerAnimated(searchSurah, zIndex)}>
                <LinearGradient
                    start={{ x: 1.5, y: 1.5 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={[colors.blue, colors.green,]}
                    style={styles.linearGradientStyle}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            borderRadius={12}
                            source={require('../../assets/quran.jpg')}
                            style={styles.imageStyle}
                        />
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={styles.markTextStyle}>Al-Qur'an</Text>
                            <Text style={styles.subMarkTextStyle}>Jumandika's Portofolio</Text>
                        </View>
                    </View>
                    {/* <Touchable
                    style={{ overflow: 'hidden', paddingVertical: 10, borderRadius: 8 }}
                    // onPress={() => props.navigation.navigate('AyatScreen', {
                        //     fassal_id: props.lastSeen.Fassal_ID,
                        //     fassal_name: props.lastSeen.Fassal_Name,
                        //     user_id: userId,
                        //     scrollTo: props.lastSeen?.Ayat_Number,
                        // })}
                        children={
                            <View style={styles.row}>
                            <Ionicons name='bookmark' style={{ fontSize: fonts.size.font15, color: '#FFFFFF', marginRight: 8 }} />
                            {Object.keys(props.lastSeen).length > 0 ?
                                <Text style={[styles.markTextStyle, { fontSize: fonts.size.font13, fontFamily: fonts.type.poppinsRegular }]}>{'Terakhir dibaca \u2022 ' + props.lastSeen?.Fassal_Name + ' \u2022 ' + props.lastSeen?.Ayat_Number}</Text>
                                :
                                <Text style={[styles.markTextStyle, { fontSize: fonts.size.font13, fontFamily: fonts.type.poppinsRegular }]}>{'Terakhir dibaca'}</Text>
                            }
                            </View>
                        }
                    /> */}
                </LinearGradient>
                <ReciterList />
                <Animated.View style={styles.containerAnimated2(searchSurah, opacityBg, zIndexBg)} />
            </Animated.View >

            {
                isLoading ?
                    <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.green} />
                    :
                    <FassalList
                        user_id={userId}
                        data={fassalListShow}
                        navigation={props.navigation}
                        contentContainerStyle={styles.contentContainerStyle(marginTop)}
                        onScroll={onScroll}
                        snapToInterval={snapToInterval}
                        ref={flatlistRef}
                    />
            }
            <AnimatedHeader
                opacity={searchSurah ? 90 : opacity}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                searchSurah={searchSurah}
                removeSearch={removeSearch}
            />
        </View >
    )
}


const mapStateToProps = (state) => {
    return {
        lastSeen: state.LastSeen.lastSeen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAyatList:
            (
                index,
                Is_Marked
            ) => dispatch({
                type: 'UPDATE_AYAT_LIST',
                index: index,
                Is_Marked: Is_Marked,
            }),
        setLastSeen:
            (
                lastSeen,
            ) => dispatch({
                type: 'SET_LAST_SEEN',
                lastSeen: lastSeen,
            }),
        setSelectedQori:
            (
                selectedQori,
            ) => dispatch({
                type: 'SET_SELECTED_QORI',
                selectedQori: selectedQori,
            }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(HomeScreen));