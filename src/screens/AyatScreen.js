import React, { Component, useEffect, useState } from 'react';
import {
    ActivityIndicator, ScrollView, StyleSheet, Text, ToastAndroid, View
} from 'react-native';
import { connect } from 'react-redux';
import AyatList from '../components/organisms/AyatList';
import NavbarHeader from '../components/organisms/NavbarHeader';
import { Endpoint, getAyat } from '../config/ApiService';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';
import { getData, storeData } from '../utils/asyncStorage';
import { checkConnection } from '../utils/connectionChecker';



const AyatScreen = (props) => {

    // const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState(props.route.params?.id)
    const [nameSimple, setnameSimple] = useState(props.route.params?.name_simple)
    const [userId, setUserId] = useState(props.route.params?.user_id)
    const [scrollTo, setScrollTo] = useState(props.route.params?.scrollTo)
    // const [modalVisible, setModalVisible] = useState(props.route.params?.modalVisible)

    // useEffect(() => {
    //     connectionCheck()
    // }, [])

    // const connectionCheck = async () => {
    //     const x = await checkConnection;
    //     if (x.isConnected) {
    //         console.log('ONLINE');
    //         getAyatList()
    //     } else {
    //         console.log('OFFLiNE');
    //         getAyatListLocally()
    //     }
    // }


    // const getAyatListLocally = async () => {
    //     const ayat_list = await getData('json', '@ayat_list');
    //     props.setAyatList(ayat_list)
    //     setIsLoading(false)
    //     ToastAndroid.show("You're in offline Mode", ToastAndroid.BOTTOM)
    // }

    // const getAyatList = async () => {
    //     try {
    //         const response = await getAyat(id)
    //         console.log('GET AYAT', JSON.stringify(response))
    //         props.setAyatList(response.verses)
    //         storeData('json', '@ayat_list', response.verses)
    //         setIsLoading(false)
    //     } catch (err) {
    //         console.error(err)
    //         setIsLoading(false)
    //     }
    // }



    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 0 }}>
                <NavbarHeader
                    title={nameSimple}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            {/* <LinearGradient
                    start={{ x: 1.5, y: 1.5 }}
                    end={{ x: 0.5, y: 0 }}
                    colors={[colors.blue, colors.green,]}
                    style={styles.linearGradientStyle}
                >
                    <Text style={styles.markTextStyle}>Maulid mquran</Text>
                    <Text style={styles.subMarkTextStyle}>Al-Habib Ali Bin Muhammad Al-Habsyi</Text>
                    <View style={styles.row}>
                        <Text style={[styles.markTextStyle, { fontSize: fonts.size.font14, fontFamily: fonts.type.poppinsRegular }]}>Terakhir dibaca</Text>
                    </View>
                </LinearGradient> */}

            <AyatList
                name_simple={nameSimple}
                user_id={userId}
                navigation={props.navigation}
                scrollTo={scrollTo}
                id={id}
            />
            


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    titleStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
    },
    titleEmptyStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font12,
        color: colors.darkGrey,
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
        padding: 20,
        margin: 20,
        width: metrics.screenWidth - 40,
        borderRadius: 30,
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
        paddingTop: 10,
    },




})




const mapStateToProps = (state) => {
    return {
        ayatList: state.AyatList.ayatList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAyatList: (
            ayatList
        ) => dispatch({
            type: 'SET_AYAT_LIST',
            ayatList: ayatList,
        }),
        updateAyatList:
            (
                index,
                Is_Marked
            ) => dispatch({
                type: 'UPDATE_AYAT_LIST',
                index: index,
                Is_Marked: Is_Marked,
            }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AyatScreen);