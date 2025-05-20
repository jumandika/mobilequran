import PropTypes from 'prop-types';
import React, { forwardRef, memo, useCallback } from 'react';
import {
    Animated, ImageBackground,
    StyleSheet,
    Text, View,
} from 'react-native';
import {
    FlatList
} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import Touchable from '../../molecules/Touchable';
import TrackPlayer, {
    Event,
    State,
    usePlaybackState, useTrackPlayerEvents
} from 'react-native-track-player';
import { ProgressContent } from './ProgressContent';
const AnimatedTouchable = Animated.createAnimatedComponent(Touchable)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const FassalList = forwardRef(({
    data,
    navigation,
    onScroll,
    snapToInterval,
    listHeaderComponent = null,
    trackTitle,
    verseNumber,
    setTrack,
    trackLength,
    contentContainerStyle,
}, ref) => {

    const playbackState = usePlaybackState();
    const togglePlayback = async () => {
        console.log("PLAY PAUSE");
        const currentTrack = await TrackPlayer.getActiveTrackIndex();
        if (currentTrack == null) {
            // TODO: Perhaps present an error or restart the playlist?
        } else {
            if (playbackState.state !== State.Playing) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged,], async event => {
        if (
            event.type === Event.PlaybackActiveTrackChanged &&
            event.track !== undefined
        ) {
            const track = event.track
            const { id, title, album, artist, verse_number, chapter_id } = track || {};
            setTrack(id, title, album, verse_number, (await TrackPlayer.getQueue()).length, chapter_id);
        }
    });

    const toAyatScreen = (item) => {
        navigation.navigate('AyatScreen', {
            id: item.id,
            name_simple: item.name_simple,
        });
    }


    function SurahContent(props) {
        return (<View style={styles.childrenStyle}>
            <View style={styles.childrenStyle}>
                <ImageBackground source={require('../../../assets/number-wrapper.png')} style={{
                    height: 32,
                    width: 32,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={styles.numberStyle}>{props.item?.id.toLocaleString('ar-AE')}</Text>
                </ImageBackground>
                <View style={styles.columnStyle}>
                    <Text style={styles.nameStyle}>{props.item?.name_simple}</Text>
                    <Text style={styles.subNameStyle}>{props.item?.revelation_place + ' \u2022 ' + props.item?.verses_count}</Text>
                </View>

            </View>
            <Text style={styles.arabicStyle}>{props.item?.name_arabic}</Text>

        </View>);
    }


    const playPauseIcon = <Touchable
        onPress={togglePlayback}
        style={{
            overflow: 'hidden',
            backgroundColor: colors.lightGrey,
            justifyContent: 'center',
        }}>
        <View style={{ paddingHorizontal: 12, }}>
            <Ionicons name={playbackState.state === State.Playing ? 'pause' : 'play'}
                style={{
                    fontSize: fonts.size.font18,
                    color: playbackState.state === State.Playing ? colors.darkGreen : colors.green
                }} />
        </View>
    </Touchable>;


    const renderItem = useCallback(({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', }}>
                <AnimatedTouchable
                    style={styles.touchableStyle(index)}
                    onPress={() => toAyatScreen(item)}
                    children={
                        <View >
                            <SurahContent item={item} index={index} trackTitle={trackTitle} />
                            {trackTitle?.split(" ")[0] === item.name_simple ?
                                <ProgressContent verseNumber={verseNumber} trackLength={trackLength} />
                                :
                                <View style={{
                                    paddingBottom: 10, borderBottomWidth: 1,
                                    borderColor: 'rgba(187, 196, 206, 0.35)',
                                }} />
                            }
                        </View>

                    }
                />
                {trackTitle?.split(" ")[0] === item.name_simple &&
                    playPauseIcon
                }
            </View>
        );
    }, [data, trackLength, verseNumber, playbackState])

    return (
        <View style={styles.container}>
            <AnimatedFlatList
                keyboardShouldPersistTaps={"never"}
                keyboardDismissMode={'none'}
                style={styles.container}
                bounces={false}
                decelerationRate='normal'
                keyExtractor={(item, index) => item.id.toString()}
                data={data}
                onScroll={onScroll}
                renderItem={renderItem}
                ListHeaderComponent={listHeaderComponent}
                contentContainerStyle={contentContainerStyle}
                ref={ref}
                snapToInterval={snapToInterval}
                snapToAlignment={'start'}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                windowSize={10}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={100}
            />
        </View>
    );
})


FassalList.propTypes = {
    key: PropTypes.any,
    user_id: PropTypes.string,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    style: PropTypes.any,
    // children: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    touchableStyle: (index) => ({
        // borderTopLeftRadius: index === 0 ? 20 : 0, borderTopRightRadius: index === 0 ? 20 : 0,
        // elevation: 10,
        flex: 1,
        overflow: 'hidden',
        paddingHorizontal: 12,
        paddingTop: 4,
        backgroundColor: colors.white,

    }),
    childrenStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    columnStyle: {
        paddingHorizontal: 10

    },
    nameStyle: {
        fontFamily: fonts.type.poppinsSemiBold,
        fontSize: fonts.size.font12,
        color: colors.darkGreen,
    },
    numberStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font11,
        color: '#000',
    },
    subNameStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font10,
        color: colors.grey,
    },
    arabicStyle: {
        fontFamily: fonts.type.amiriRegular,
        fontSize: fonts.size.font20,
        color: colors.darkGreen,

    },
    progressContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingVertical: 3,
        paddingTop: 6,
    },
    progressBarStyle: {
        height: 3.5,
        borderRadius: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    progressBar1Style: {
        height: 2.25,
        backgroundColor: "rgba(187, 196, 206, 0.35)",
        borderRadius: 2,
    },
    badgeProgress: {
        paddingHorizontal: 4,
        elevation: 4,
        borderRadius: 20,
        backgroundColor: '#FFF',
    }

});



const mapStateToProps = (state) => {
    return {
        ayatList: state.AyatList.ayatList,
        showLatin: state.SettingVisual.showLatin,
        fontSize: state.SettingVisual.fontSize,
        fontSizeArabic: state.SettingVisual.fontSizeArabic,
        trackId: state.StatePlayer.trackId,
        verseNumber: state.StatePlayer.verseNumber,
        trackTitle: state.StatePlayer.trackTitle,
        repeatCode: state.StatePlayer.repeatCode,
        trackLength: state.StatePlayer.trackLength,
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
        setShowLatin:
            (
                showLatin
            ) => dispatch({
                type: 'SET_SHOW_LATIN',
                showLatin: showLatin,
            }),
        setFontSize:
            (
                fontSize,
                fontSizeArabic,
            ) => dispatch({
                type: 'SET_FONT_SIZE',
                fontSize: fontSize,
                fontSizeArabic: fontSizeArabic,
            }),
        setTrack:
            (
                trackId,
                trackTitle,
                trackAlbum,
                verseNumber,
                trackLength,
                chapterId,
            ) => dispatch({
                type: 'SET_TRACK',
                trackId: trackId,
                trackTitle: trackTitle,
                trackAlbum: trackAlbum,
                verseNumber: verseNumber,
                trackLength: trackLength,
                chapterId: chapterId,
            }),
        setRepeatCode:
            (
                repeatCode,
            ) => dispatch({
                type: 'SET_REPEAT_CODE',
                repeatCode: repeatCode,
            }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(FassalList));


