import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';

import {
    ActivityIndicator, StyleSheet, Text, View
} from 'react-native';
import FassalList from '../components/organisms/FassalList/FassalList';
import NavbarHeader from '../components/organisms/NavbarHeader';
import {Endpoint } from'../config/ApiService';


class BookmarkScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fassal_id: props.route.params?.fassal_id,
            fassal_name: props.route.params?.fassal_name,
            user_id: props.route.params?.user_id,
            isLoading: true,
            bookmarkList: [],
        }
    }

    componentDidMount() {
        this.getBookmarkList()
    }

    getBookmarkList = async () => {
        try {
            const request = await fetch(Endpoint.urlApi + Endpoint.mark +
                '?bookmark_list=1' +
                '&user_id=' + this.state.user_id,
                {
                    method: 'GET',
                });
            const response = await request.json();
            console.log(response);
            if (response.status == true) {
                this.setState({
                    bookmarkList: response.data,
                    isLoading: false
                })
            } else {
                this.setState({
                    bookmarkList: [],
                    isLoading: false
                })

            }
        } catch (err) {
            console.error(err)
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <NavbarHeader
                    title={'Bookmark'}
                    onPress={() => this.props.navigation.goBack()}
                />

                {
                    this.state.isLoading ?
                        <ActivityIndicator style={{ flex: 0.5 }} size={'large'} color={colors.green} />
                        :
                        this.state.bookmarkList?.length > 0 ?
                            <View style={{ flex: 1, }}>
                                <FassalList
                                    user_id={this.state.user_id}
                                    data={this.state.bookmarkList}
                                    navigation={this.props.navigation}
                                />
                            </View >
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: fonts.size.font18 }}>🤷🏼‍♂️</Text>
                                <Text style={styles.titleEmptyStyle}>Data Kosong</Text>
                            </View >
                }

            </View >
        )
    };
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


export default connect(mapStateToProps, mapDispatchToProps)(BookmarkScreen);