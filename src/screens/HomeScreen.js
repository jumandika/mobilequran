import React, { memo, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    Platform,
    StyleSheet,
    Text, ToastAndroid, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import AnimatedHeader from '../components/organisms/AnimatedHeader';
import FassalList from '../components/organisms/FassalList';
import { Endpoint, getSurah } from '../config/ApiService';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';
import { getData, storeData } from '../utils/asyncStorage';
import { checkConnection } from '../utils/connectionChecker';
import { ReciterList } from './ReciterList';

const HomeScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userId, setUserId] = useState(props.route.params.user_id)
    const [fassalList, setFassalList] = useState([])
    const [fassalListShow, setFassalListShow] = useState([])
    const [selectedQori, setSelectedQori] = useState(null)
    const [marginTop, setMarginTop] = useState(0)
    const [snapToInterval, setSnapToInterval] = useState(null)
    const [searchSurah, setSearchSurah] = useState('')
    const yOffset = useRef(new Animated.Value(0)).current
    const flatlistRef = useRef(null)

    const zIndex = yOffset.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });
    const opacity = yOffset.interpolate({
        inputRange: [0, 90],
        outputRange: [0, 90],
        extrapolate: "clamp",
    });
    const zIndexBg = yOffset.interpolate({
        inputRange: [0, 1],
        outputRange: [-1, 1],
        extrapolate: "clamp",
    });
    const opacityBg = yOffset.interpolate({
        inputRange: [0, 90],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    useEffect(() => {
        connectionCheck()
    }, [])

    // useEffect(() => {
    //     // const initialIndex = 10 //random number
    //     // if (flatlistRef.current) {
    //     //     setTimeout(() => {
    //     //         console.log("SCROLL TO INDEX")
    //     //         flatlistRef.current.scrollToIndex({ index: initialIndex })
    //     //     }, 1000)
    //     // }
    //     flatlistRef.current?.scrollToIndex({ index: 10,animated: true});
    // }, [flatlistRef])

    const connectionCheck = async () => {
        const x = await checkConnection;
        if (x.isConnected) {
            console.log('ONLINE');

            // getSurahList()
            getAllSurah()
            // this.getLastSeen()
            // _unsubscribe = props.navigation.addListener('focus', () => {
            //     setTimeout(() => {
            //         getLastSeen()
            //     }, 1000)
            // });

            // return _unsubscribe;
        } else {
            console.log('OFFLiNE');
            getSurahListLocally()
        }

    }

    const getSurahListLocally = async () => {
        const fassal_list = await getData('json', '@surah_list');
        console.log("Fassal_LIST", fassal_list);
        setFassalList(fassal_list)
        setFassalListShow(fassal_list)
        setIsLoading(false)
        ToastAndroid.show("You're in offline Mode", ToastAndroid.BOTTOM)
    }

    const gotoIndex = () => {
        setTimeout(() => {
            // flatlistRef.current?.gotoIndex(10);
            if (flatlistRef.current) flatlistRef.current.scrollToIndex({ index: 20, animated: true });


        }, 1000)
    }

    const getAllSurah = async () => {
        try {
            const response = await getSurah()
            // console.log('response', JSON.stringify(response))
            setFassalList(response.chapters)
            setFassalListShow(response.chapters)
            setIsLoading(false)
            storeData('json', '@surah_list', response.chapters)
        } catch (err) {
            console.error(err)
            setIsLoading(false)
        }
    }


    const getLastSeen = async () => {
        // console.log('getLastseen')
        try {
            const request = await fetch(Endpoint.urlApi + Endpoint.lastseen + '?user_id=' + userId)
            const response = await request.json()
            // console.log('getLastseen', response)
            if (response.status) {
                props.setLastSeen(response?.data[0])
                setIsLoading(false)

            }

        } catch (err) {
            console.error('getLastSeen', err)
            setIsLoading(false)

        }
    }


    // const renderItemQori = ({ item, index }) => {
    //     return (
    //         <Touchable
    //             style={{ overflow: 'hidden', paddingHorizontal: 10, justifyContent: 'center', }}
    //             onPress={() => selectQori(item)}
    //             children={
    //                 <View >
    //                     <ImageBackground source={{ uri: item.url }} style={{ borderRadius: 60, borderWidth: selectedQori?.id === item.id ? 0 : 5, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: selectedQori?.id === item.id ? colors.green : colors.white, overflow: 'hidden', height: selectedQori?.id === item.id ? 55 : 50, width: selectedQori?.id === item.id ? 55 : 50, resizeMode: 'cover' }} >
    //                         {selectedQori?.id === item.id ? null
    //                             :
    //                             <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.55)' }} />
    //                         }
    //                     </ImageBackground>
    //                     {selectedQori?.id === item.id ?
    //                         <View style={{ position: 'absolute', top: 0, right: 0, padding: 1.5, borderRadius: 30, backgroundColor: colors.lightGrey }}>
    //                             <MaterialCommunityIcons name='check-circle' style={{ fontSize: fonts.size.font16, color: colors.green, }} />
    //                         </View>
    //                         : null}
    //                 </View>
    //             }
    //         />
    //     )
    // }




    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y
        if (y >= (marginTop - 90)) return setSnapToInterval(null);
        return setSnapToInterval(marginTop - 90)
    }

    const onChangeText = (value) => {
        setSearchSurah(value)
    }
    const removeSearch = (value) => {
        setSearchSurah(null)
        setFassalListShow(fassalList)
    }
    const onSubmitEditing = () => {
        if (searchSurah) {
            let x = fassalList.filter(item => {
                let plain = item.name_simple.replace(/[^a-zA-Z0-9-_]+/g, '');
                let plain1 = plain.replace(/-/g, "").toLowerCase();
                return plain1.includes(searchSurah)
            });
            setFassalListShow(x)
            return
        } else {
            setFassalListShow(fassalList)

        }
    }

    return (
        <View style={styles.container}>
            <Animated.View
                onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    setMarginTop(height)
                    setSnapToInterval(height - 90)
                }}
                style={{ backgroundColor: '#FFF', position: 'absolute', top: 0, zIndex: searchSurah ? 0 : zIndex }}>
                <LinearGradient
                    start={{ x: 1.5, y: 1.5 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={[colors.blue, colors.green,]}
                    style={styles.linearGradientStyle}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            borderRadius={12}
                            source={require('../assets/quran.jpg')}
                            style={{ height: 80, width: 80, resizeMode: 'cover', opacity: 0.85 }}
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

                <ReciterList></ReciterList>

                <Animated.View style={{ height: '100%', width: '100%', flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', top: 0, opacity: searchSurah ? 1 : opacityBg, zIndex: searchSurah ? 0 : zIndexBg }} />
            </Animated.View >

            {
                isLoading ?
                    <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.green} />
                    :
                    <FassalList
                        user_id={userId}
                        data={fassalListShow}
                        navigation={props.navigation}
                        contentContainerStyle={{ paddingTop: marginTop, paddingBottom: 100 }}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: yOffset,
                                        },
                                    },
                                },
                            ],
                            {
                                useNativeDriver: Platform.OS === 'android' ? true : false,
                                listener: event => handleScroll(event)
                            }
                        )}
                        snapToInterval={snapToInterval}
                        ref={flatlistRef}
                    // listHeaderComponent={ListReciter()}
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    containerQori: {
        overflow: 'hidden', 
        justifyContent: 'center',
    },
    titleStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
    },
    textStyle: {
        fontFamily: fonts.type.poppinsLight,
        fontSize: fonts.size.font14,
        color: colors.darkGreen,
    },

    markTextStyle: {
        fontFamily: fonts.type.poppinsSemiBold,
        fontSize: fonts.size.font16,
        color: colors.white,
    },
    subMarkTextStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font10,
        color: colors.white,
    },
    linearGradientStyle: {
        alignSelf: 'center',
        marginTop: 40,
        padding: 10,
        margin: 10,
        marginBottom: 10,
        width: metrics.screenWidth - 20,
        borderRadius: 22,
    },
    linearGradientStyle1: {
        elevation: 20,
        height: 90,
        alignSelf: 'center',
        padding: 20,
        paddingTop: 35,
        width: metrics.screenWidth,
    },
    touchableStyle: {
        position: 'absolute',
        bottom: 10,
        width: '60%',
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: colors.darkBlue,
    },
    textButtonStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font14,
        color: colors.white,
        textAlign: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        // marginTop: 10,
    }

})



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