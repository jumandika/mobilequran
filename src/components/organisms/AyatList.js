import PropTypes from 'prop-types';
import React, { memo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    View
} from 'react-native';
import {
    FlatList, ScrollView,
} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import Touchable from '../molecules/Touchable';
import {
    usePlaybackState,
    useProgress
} from 'react-native-track-player';
import { ModalDetailAyat } from './ModalDetailAyat';
import { ModalSettings } from './ModalSettings';
import NavbarHeader from './NavbarHeader';
import { callFunction } from './callFunction';
import { renderAyatList } from './renderAyatList';
import { styles } from './styles';
import { useEffectAction } from './useEffectAction';


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
    const fontFamilyArabic = useSelector((state) => state.SettingVisual.fontFamilyArabic)
    const selectedQori = useSelector((state) => state.SelectedQori.selectedQori)
    const repeatCode = useSelector((state) => state.StatePlayer.repeatCode)
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const trackId = useRef()
    const trackTitle = useRef('')
    const [trackAlbum, setTrackAlbum] = useState();
    const [initTrack, setInitTrack] = useState();
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


    const { getState, connectionCheck, selectAyat, playAyat, _onViewableItemsChanged, _viewabilityConfig, onPressPlay, markAyat } = callFunction(setAyatList, setIsLoading, playbackState, id, page, selectedQori, name_simple, flatlistRef, trackTitle, setVerseNumber, trackId, setTrackAlbum, setTrackArtist, setInitTrack, ayatList, showLatin, setPutarModal, setLatinModal, setTranslateModal, ayatSelected, setModalAyatVisible, setAyatSelected, setIndexAyatSelected, AyatNumber, fontFamilyArabic, fontSizeArabic, repeatCode, isLoading, fontSize, setVerseKey, setItemLastSeen);

    useEffectAction(getState, setIsLoading, connectionCheck, ayatList, setAyatNumberList, AyatNumber, flatlistRef, setAyatNumber, isLoading);

    const keyExtractor = (item) => item.id.toString()
    const { renderItem, renderItemArab } = renderAyatList(trackId, trackTitle, ayatSelected, playbackState, AyatNumber, markAyat, onPressPlay, selectAyat, fontFamilyArabic, fontSizeArabic, repeatCode, isLoading, fontSize, playbackState);
    const initialNumToRender = (name_simple === trackTitle.current?.split(" ")[0] && verseNumber) ? verseNumber : 3;

    const renderItemAyat = (i, index) => showLatin ? renderItem(i, index) : renderItemArab(i, index);
    const onScrollToIndexFailed = (info) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
            flatlistRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
    };
    return (
        <View style={[styles.container, { backgroundColor: playbackState == 2 || name_simple === trackTitle.current?.split(" ")[0] ? '#EEEEEE' : '#FFF' }]}>
            <ModalSettings modalVisible={modalVisible} setModalVisible={setModalVisible} setModalAyatVisible={setModalAyatVisible} showLatin={showLatin} setShowLatin={setShowLatin} setFontSize={setFontSize} setFontFamilyArabic={setFontFamilyArabic} fontFamilyArabic={fontFamilyArabic} fontSize={fontSize}></ModalSettings>

            <NavbarHeader
                title={name_simple}
                onPress={() => navigation.goBack()}
                children={
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Touchable
                            onPress={() => playAyat(ayatList[0], 0)}
                            style={{ overflow: 'hidden' }}
                            children={
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.numberStyle}>{'Putar Semua  '}</Text>
                                    <Ionicons name={'play'} style={{ fontSize: fonts.size.font20, color: colors.green }} />
                                </View>
                            }
                        />
                        <Touchable
                            style={{ overflow: 'hidden' }}
                            onPress={() => setModalVisible(!modalVisible)}
                            children={
                                <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center', }}>
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
                        decelerationRate='normal'
                        keyExtractor={keyExtractor}
                        data={ayatList}
                        ref={flatlistRef}
                        onScrollToIndexFailed={onScrollToIndexFailed}
                        renderItem={renderItemAyat}
                        contentContainerStyle={styles.contentContainerStyle}
                        removeClippedSubviews={true}
                        scrollEventThrottle={16}
                        windowSize={5}
                        maxToRenderPerBatch={5}
                        updateCellsBatchingPeriod={100}
                        initialNumToRender={initialNumToRender}
                        legacyImplementation={true}
                        disableVirtualization={true}
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

                                    }]}>{playbackState == 2 || trackId != ayatSelected.id ? 'Putar' : 'Pause'}</Text>
                                    <Ionicons name={playbackState == 2 || trackId != ayatSelected.id ? 'play' : 'pause'} style={{ marginLeft: 6, fontSize: fonts.size.font20, color: playbackState == 2 || trackId != ayatSelected.id ? colors.green : colors.darkGreen }} />
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
                        <ModalDetailAyat ayatNumberList={ayatNumberList}></ModalDetailAyat>
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



