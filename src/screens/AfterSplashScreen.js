import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image, StyleSheet,
    Text,
    ToastAndroid, View
} from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../components/molecules/Touchable';
import {Endpoint } from'../config/ApiService';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import metrics from '../theme/metrics';
import { getData, storeData } from '../utils/asyncStorage';
import { checkConnection } from '../utils/connectionChecker';



class AfterSplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            isLoading: true,

        }
    }

    componentDidMount() {
        this.connectionCheck()
    }

    getUserID = async () => {
        const user_id = await getData('string', '@user_id');
        this.setState({ user_id: user_id, isLoading: false })
        ToastAndroid.show("You're in offline Mode", ToastAndroid.BOTTOM)
    }

    connectionCheck = async () => {
        const x = await checkConnection;
        if (x.isConnected) {
            console.log('ONLINE');
            this.registerUser()
        } else {
            console.log('OFFLiNE');
            this.getUserID();
        }
    }

    registerUser = async () => {
        // console.log(Endpoint.urlApi + Endpoint.user)
        // console.log(JSON.stringify({
        //     User_ID: '',
        //     Device_ID: getUniqueId(),
        // }))
        try {
            const request1 = await fetch(Endpoint.urlApi +
                Endpoint.user +
                '?device_id=' +
                getUniqueId(), {
                method: 'GET',
            });
            const response1 = await request1.json();
            // console.log(response1);
            if (response1.status == true) {
                storeData('string', '@user_id', response1.data[0].User_ID)
                this.setState({ user_id: response1.data[0].User_ID, isLoading: false }, () => {

                })

            } else {
                const request = await fetch(Endpoint.urlApi +
                    Endpoint.user, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "User_ID": '',
                        "Device_ID": getUniqueId(),
                    })
                });
                const response = await request.json();
                this.setState({ isLoading: false })
                console.log(response);
            }
        } catch (err) {
            console.error(err)
            this.setState({ isLoading: false })
        }
    }

    toHome = async () => {
        this.props.navigation.navigate('HomeScreen', { user_id: this.state.user_id });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container, {}]}>
                    <Text style={styles.titleStyle}>{"Mobile\nQur'an"}</Text>
                    <Text style={styles.subtitleStyle}>{'Jumandika\'s Portofolio'}</Text>
                </View >
                <View
                    style={styles.linearGradientStyle}
                >
                    <LinearGradient
                        start={{ x: 1, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.blue, colors.green,]}
                        style={styles.linearGradientStyle}
                    >
                        <Image
                            source={require('../assets/mosque.png')}
                            style={{ resizeMode: 'contain', height: '90%', width: '100%' }}
                        />
                    </LinearGradient>
                    <Touchable
                        style={styles.touchableStyle}
                        onPress={this.toHome}
                        children={
                            <View>
                                {this.state.isLoading ?
                                    <ActivityIndicator size="small" color={colors.green} style={{ padding: 20 }} />
                                    :
                                    <Text style={styles.textButtonStyle} >
                                        {'Mulai'}
                                    </Text>
                                }
                            </View>
                        }
                    />
                </View >
            </View >
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    titleStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font20,
        color: colors.darkBlue,
        textAlign: 'center',
    },

    subtitleStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font12,
        color: colors.darkGrey,
        textAlign: 'center',
        paddingTop: 20,
    },
    linearGradientStyle: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 40,
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

})

export default AfterSplashScreen;