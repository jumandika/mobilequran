import React, { lazy, memo } from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    Text,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

export default memo(HomeScreen)