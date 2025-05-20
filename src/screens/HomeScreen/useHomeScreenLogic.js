import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Platform,
    ToastAndroid
} from 'react-native';
import { Endpoint, getSurah } from '../../config/ApiService';
import { getData, storeData } from '../../utils/asyncStorage';
import { checkConnection } from '../../utils/connectionChecker';

export const useHomeScreenLogic = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userId, setUserId] = useState(props.route.params.user_id)
    const [fassalList, setFassalList] = useState([])
    const [fassalListShow, setFassalListShow] = useState([])
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

    const connectionCheck = async () => {
        const x = await checkConnection;
        if (x.isConnected) {
            console.log('ONLINE');
            getAllSurah()
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

    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y
        if (y >= (marginTop - 90)) return setSnapToInterval(null);
        return setSnapToInterval(marginTop - 90)
    }

    const onChangeText = (value) => {
        setSearchSurah(value)
    }
    const removeSearch = () => {
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

    const onScroll = Animated.event(
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
            useNativeDriver: Platform.OS === 'android',
            listener: event => handleScroll(event)
        }
    );

    const onLayout = (event) => {
        let { height } = event.nativeEvent.layout;
        setMarginTop(height)
        setSnapToInterval(height - 90)
    };

    return {
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
        marginTop,
        zIndexBg,
        opacityBg,
        searchSurah
    }
}