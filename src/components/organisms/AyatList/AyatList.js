import PropTypes from 'prop-types';
import React, { lazy, memo, useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';
import {
    FlatList, ScrollView,
} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import Touchable from '../../molecules/Touchable';
import {
    State,
    usePlaybackState,
    useProgress
} from 'react-native-track-player';
import { ModalDetailAyat } from '../ModalDetailAyat';
import { ModalSettings } from '../ModalSettings';
import { callFunction } from './callFunction';
import { renderAyatList } from './renderAyatList';
import { styles } from '../styles';
import { useEffectAction } from './useEffectAction';
import { playAyat } from '../HeaderPerList/helpers';
import AyatContent from '../../molecules/AyatContent';

const NavbarHeader = lazy(() => import('../NavbarHeader'))

const AyatList = ({
    navigation,
    name_simple,
    scrollTo = 1,
    id,
}) => {
    const dispatch = useDispatch()
    const setAyatList = (ayatList) => dispatch({ type: 'SET_AYAT_LIST', ayatList: ayatList })
    const setShowLatin = (showLatin) => dispatch({ type: 'SET_SHOW_LATIN', showLatin: showLatin })
    const setFontSize = (fontSize, fontSizeArabic) => dispatch({ type: 'SET_FONT_SIZE', fontSize: fontSize, fontSizeArabic: fontSizeArabic })
    const setFontFamilyArabic = (fontFamilyArabic) => dispatch({ type: 'SET_FONT_ARABIC', fontFamilyArabic: fontFamilyArabic })

    const ayatList = useSelector((state) => state.AyatList.ayatList)
    const showLatin = useSelector((state) => state.SettingVisual.showLatin)
    const fontSize = useSelector((state) => state.SettingVisual.fontSize)
    const fontSizeArabic = useSelector((state) => state.SettingVisual.fontSizeArabic)
    const selectedQori = useSelector((state) => state.SelectedQori.selectedQori)
    const playbackState = usePlaybackState();
    const trackId = useRef()
    const trackTitle = useRef('')
    const [trackAlbum, setTrackAlbum] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [verseNumber, setVerseNumber] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAyatVisible, setModalAyatVisible] = useState(false);
    const [ayatSelected, setAyatSelected] = useState([]);
    const [indexAyatSelected, setIndexAyatSelected] = useState([]);
    const [translateModal, setTranslateModal] = useState(!showLatin);
    const [latinModal, setLatinModal] = useState(false);
    const [putarModal, setPutarModal] = useState(showLatin);
    const [page, setPage] = useState(1)
    const [verseKey, setVerseKey] = useState(null)
    const [itemLastSeen, setItemLastSeen] = useState({})
    const [ayatNumberList, setAyatNumberList] = useState([])
    const [AyatNumber, setAyatNumber] = useState(scrollTo)

    const [isLoading, setIsLoading] = useState(true)

    const flatlistRef = useRef(null);

    const { getState, connectionCheck, selectAyat, _onViewableItemsChanged, _viewabilityConfig, markAyat } = callFunction(setAyatList, setIsLoading, id, page, selectedQori, name_simple, flatlistRef, trackTitle, setVerseNumber, trackId, setTrackAlbum, setTrackArtist, showLatin, setPutarModal, setLatinModal, setTranslateModal, ayatSelected, setModalAyatVisible, setAyatSelected, setIndexAyatSelected, setVerseKey, setItemLastSeen);

    useEffectAction(getState, setIsLoading, connectionCheck, ayatList, setAyatNumberList, AyatNumber, flatlistRef, setAyatNumber, isLoading);
    const keyExtractor = (item) => item.id.toString()
    const initialNumToRender = (name_simple === trackTitle.current?.split(" ")[0] && verseNumber) ? verseNumber : 3;

    // const { renderItem, renderItemArab } = renderAyatList(ayatSelected, AyatNumber, markAyat, selectAyat, trackId, trackTitle, isLoading);
    const renderItemAyat = useCallback(({ item, index }) => showLatin ? <RenderItemDefault item={item} index={index} /> : <RenderItemArab item={item} index={index} />,
        [showLatin]
    )


    const onScrollToIndexFailed = (info) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
            flatlistRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
    };
    const isPlayingFlag = playbackState.state == State.Playing || playbackState.state == State.Loading || playbackState.state == State.Buffering || playbackState.state == State.Ready || trackId.current != ayatSelected.id;
    const screenBcFlag = (playbackState.state == State.Playing || playbackState.state == State.Loading || playbackState.state == State.Buffering || playbackState.state == State.Ready) && name_simple === trackTitle.current?.split(" ")[0];


    const onPressPlay = async (item, index) => {
        if (item.id !== trackId.current || playbackState == 1) {
            playAyat(ayatList, index);
        } else if (item.title === trackTitle.current && item.id !== trackId.current) {
            await TrackPlayer.skip(index);
            await TrackPlayer.play();
        } else {
            togglePlayback();
        }
    };

    const togglePlayback = async () => {
        console.log("PLAY PAUSE");
        const currentTrack = await TrackPlayer.getActiveTrackIndex();
        if (currentTrack == null) {
        } else if (playbackState.state === State.Playing) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    };

    const RenderItemDefault = useCallback(({ item, index }) => {
        const logic = trackId.current === item.id && trackTitle.current === item.title;
        const playPauseLogic = logic && (playbackState.state === State.Playing || playbackState.state == State.Loading || playbackState.state == State.Buffering);
        return (
            <AyatContent
                markAyat={markAyat}
                selectAyat={selectAyat}
                onPressPlay={onPressPlay}
                item={item}
                index={index}
                playPauseLogic={playPauseLogic}
                logic={logic}
                playbackState={playbackState}
                trackId={trackId.current}
            />
        );
    }, []);

    const RenderItemArab = memo(({ item, index }) => {
        return (
            <View style={styles.listContainer(trackId.current, trackTitle.current, item, AyatNumber)}>
                <Touchable
                    style={styles.touchableArabStyle}
                    onPress={() => selectAyat(item, index)}
                    children={<View style={[styles.childrenStyle, { alignItems: 'flex-end', }]}>
                        <Text style={[styles.arabicStyle, { fontSize: fontSizeArabic, backgroundColor: item.verse_key == ayatSelected.verse_key ? '#04D78E33' : "rgba(255,255,255,0.0)" }]}>{item?.text_madani}
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image source={require('../../../assets/arab_bracket_flip.png')} style={{ resizeMode: 'contain', height: fontSizeArabic, width: fontSizeArabic, }} />
                                <Text style={[styles.latinStyle, { fontSize: fontSize, }]}>
                                    {item?.verse_number}
                                </Text>
                                <Image source={require('../../../assets/arab_bracket.png')} style={{ resizeMode: 'contain', marginLeft: 2, height: fontSizeArabic, width: fontSizeArabic }} />
                            </View>
                        </Text>
                    </View>} />
            </View>
        );

    });

    return (
        <View style={[styles.container, { backgroundColor: screenBcFlag ? '#CCC' : '#FFF' }]}>
            <ModalSettings modalVisible={modalVisible} setModalVisible={setModalVisible} setModalAyatVisible={setModalAyatVisible} showLatin={showLatin} setShowLatin={setShowLatin} setFontSize={setFontSize} setFontFamilyArabic={setFontFamilyArabic} fontSize={fontSize} />
            <NavbarHeader
                title={name_simple}
                onPress={() => navigation.goBack()}
                children={
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Touchable
                            onPress={() => playAyat(ayatList, 0)}
                            style={{ overflow: 'hidden' }}
                            children={
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.numberStyle}>{'Putar Semua  '}</Text>
                                    <Ionicons name={'play'} style={{ fontSize: fonts.size.font20, color: colors.green }} />
                                </View>
                            }
                        />
                        <Touchable
                            style={{ overflow: 'hidden', marginLeft: 15, }}
                            onPress={() => setModalVisible(!modalVisible)}
                            children={
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Octicons name={'gear'} style={{ fontSize: fonts.size.font16, color: colors.darkGrey }} />
                                </View>
                            }
                        />
                    </View>

                }
            />
            {isLoading ? <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.green} />
                :
                ayatList ?
                    <FlatList
                        style={styles.container}
                        bounces={false}
                        onViewableItemsChanged={_onViewableItemsChanged}
                        viewabilityConfig={_viewabilityConfig}
                        decelerationRate='fast'
                        keyExtractor={keyExtractor}
                        data={ayatList}
                        ref={flatlistRef}
                        onScrollToIndexFailed={onScrollToIndexFailed}
                        renderItem={renderItemAyat}
                        ItemSeparatorComponent={() => screenBcFlag ? <View style={styles.separatorStyle1} /> : <View style={styles.separatorStyle} />}
                        contentContainerStyle={styles.contentContainerStyle}
                        removeClippedSubviews={true}
                        scrollEventThrottle={16}
                        windowSize={5}
                        maxToRenderPerBatch={5}
                        updateCellsBatchingPeriod={100}
                        initialNumToRender={initialNumToRender}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: fonts.size.font18 }}>🤷🏼‍♂️</Text>
                        <Text style={styles.titleEmptyStyle}>Data Kosong</Text>
                    </View >
            }

            {modalAyatVisible == true ?
                <View style={[styles.childModalView, {
                    backgroundColor: '#FFF',
                    paddingBottom: 20
                }]}>
                    <ScrollView horizontal={true} removeClippedSubviews={true}>
                        {!showLatin &&
                            <Touchable
                                onPress={() => {
                                    setLatinModal(false)
                                    setTranslateModal(true)
                                    setPutarModal(false)
                                }}
                                style={{ overflow: 'hidden', }}
                                children={
                                    <View style={[styles.modalBarContainer, { borderBottomWidth: translateModal ? 2 : 0, borderColor: colors.green }]}>
                                        <Text style={[styles.numberStyle, { color: colors.darkGreen }]}>{'Terjemah'}</Text>
                                        <MaterialCommunityIcons name={'translate'} style={{ marginLeft: 6, fontSize: fonts.size.font14, color: colors.darkGrey }} />
                                    </View>
                                }
                            />
                        }
                        {!showLatin &&
                            <Touchable
                                onPress={() => {
                                    setTranslateModal(false)
                                    setLatinModal(true)
                                    setPutarModal(false)

                                }}
                                style={{ overflow: 'hidden', }}
                                children={
                                    <View style={[styles.modalBarContainer, { borderBottomWidth: latinModal ? 2 : 0, borderColor: colors.green }]}>
                                        <Text style={[styles.numberStyle, { color: colors.darkGreen }]}>{'Latin Arab'}</Text>
                                        <Ionicons name={'flash-outline'} style={{ marginLeft: 6, fontSize: fonts.size.font14, color: colors.darkGrey }} />
                                    </View>
                                }
                            />
                        }
                        <Touchable
                            onPress={() => {
                                if (!showLatin) {
                                    setTranslateModal(false)
                                    setLatinModal(false)
                                    setPutarModal(true)
                                } else {
                                    onPressPlay(ayatSelected, indexAyatSelected)

                                }
                            }}
                            style={{ overflow: 'hidden', }}
                            children={
                                <View style={[styles.modalBarContainer, { borderBottomWidth: putarModal ? 2 : 0, borderColor: colors.green }]}>

                                    <Text style={[styles.numberStyle, {
                                        color: colors.darkGreen,

                                    }]}>{isPlayingFlag ? 'Putar' : 'Pause'}</Text>
                                    <Ionicons name={isPlayingFlag ? 'play' : 'pause'} style={{ marginLeft: 6, fontSize: fonts.size.font20, color: isPlayingFlag ? colors.green : colors.darkGreen }} />
                                </View>
                            }
                        />
                        {!showLatin &&
                            <Touchable
                                onPress={() => markAyat(ayatSelected, indexAyatSelected)}
                                style={{ overflow: 'hidden', }}
                                children={
                                    <View style={[styles.modalBarContainer, {}]}>
                                        <Ionicons name={ayatList[indexAyatSelected].Is_Marked ? 'bookmark' : 'bookmark-outline'} style={{ fontSize: fonts.size.font16, color: ayatList[indexAyatSelected].Is_Marked ? "#D70450" : colors.darkGreen }} />
                                    </View>
                                }
                            />
                        }
                    </ScrollView>
                    {translateModal &&
                        <View style={{ paddingVertical: 20 }}>
                            <Text style={[styles.numberStyle, { paddingBottom: 5, fontSize: fonts.size.font10, color: colors.darkGreen, fontFamily: fonts.type.poppinsMedium }]}>
                                {ayatSelected.title + ' : ' + parseInt(indexAyatSelected + 1)}
                            </Text>
                            <Text style={[styles.translationStyle, {}]}>
                                {ayatSelected.Translation}
                            </Text>
                        </View>
                    }
                    {latinModal &&
                        <View style={{ paddingVertical: 20 }}>
                            <Text style={[styles.latinStyle, {}]}>
                                {ayatSelected.Latin}
                            </Text>
                        </View>
                    }
                    {putarModal &&
                        <ModalDetailAyat ayatNumberList={ayatNumberList} />
                    }
                </View>
                :
                null
            }

        </View>
    );

}

AyatList.propTypes = {
    key: PropTypes.any,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    style: PropTypes.any,
    // children: PropTypes.element.isRequired,
};

export default memo(AyatList);