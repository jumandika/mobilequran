import React from 'react';
import {
    Modal, Pressable, Text,
    View, Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import Touchable from '../molecules/Touchable';
import Slider from '@react-native-community/slider';
import metrics from '../../theme/metrics';
import { styles } from "./styles";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window')


const ModalChild = gestureHandlerRootHOC((props) =>{
    return (<View style={styles.modalView}>
        <View style={styles.childModalView}>
            <Text style={[styles.latinStyle, {
                fontSize: fonts.size.font16
            }]}>Settings</Text>
            <Touchable onPress={() => {
                props.setShowLatin(true);
                props.setModalAyatVisible(false); // setAyatSelected([]);
                // setIndexAyatSelected(null);

                setTimeout(() => {
                    props.setModalVisible(!props.modalVisible);
                }, 500);
            }} style={{
                overflow: 'hidden',
                paddingVertical: 6
            }} children={<View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Ionicons name={'checkmark'} style={{
                    fontSize: fonts.size.font16,
                    color: props.showLatin ? colors.green : colors.darkGrey
                }} />
                <Text style={[styles.numberStyle, {
                    color: props.showLatin ? colors.green : colors.grey
                }]}>{'   Tampilkan Latin & Terjemah'}</Text>
            </View>} />
            <Touchable onPress={() => {
                props.setShowLatin(false);
                setTimeout(() => {
                    props.setModalVisible(!props.modalVisible);
                }, 500);
            }} style={{
                overflow: 'hidden',
                paddingVertical: 6,
                marginBottom: 10
            }} children={<View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Ionicons name={'checkmark'} style={{
                    fontSize: fonts.size.font16,
                    color: !props.showLatin ? colors.green : colors.darkGrey
                }} />
                <Text style={[styles.numberStyle, {
                    color: !props.showLatin ? colors.green : colors.grey
                }]}>{'   Tampilkan Tanpa Terjemah'}</Text>
            </View>} />
            <Text style={[styles.translationStyle, {
                fontSize: fonts.size.font14,
                color: colors.grey
            }]}>{'Font Arab'}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10
            }}>
                <Touchable onPress={() => props.setFontFamilyArabic(fonts.type.alQalamQuran)} style={{
                    overflow: 'hidden',
                    paddingVertical: 3,
                    width: width / 3.5,
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: fonts.type.alQalamQuran == props.fontFamilyArabic ? 1 : 0
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.alQalamQuran,
                            fontSize: fonts.size.font18,
                            color: colors.darkGreen
                        }}>{'بِسۡمِ اللهِ'}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.poppinsRegular,
                            fontSize: fonts.size.font10,
                            color: colors.darkGrey
                        }}>{fonts.type.alQalamQuran}</Text>
                    </View>
                </Touchable>
                <Touchable onPress={() => props.setFontFamilyArabic(fonts.type.saleemQuran)} style={{
                    overflow: 'hidden',
                    paddingVertical: 3,
                    width: width / 3.5,
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: fonts.type.saleemQuran == props.fontFamilyArabic ? 1 : 0
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.saleemQuran,
                            fontSize: fonts.size.font18,
                            color: colors.darkGreen
                        }}>{'بِسۡمِ اللهِ'}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.poppinsRegular,
                            fontSize: fonts.size.font10,
                            color: colors.darkGrey
                        }}>{fonts.type.saleemQuran}</Text>
                    </View>
                </Touchable>
                <Touchable onPress={() => props.setFontFamilyArabic(fonts.type.nooreHidayat)} style={{
                    overflow: 'hidden',
                    paddingVertical: 3,
                    width: width / 3.5,
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: fonts.type.nooreHidayat == props.fontFamilyArabic ? 1 : 0
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.nooreHidayat,
                            fontSize: fonts.size.font18,
                            color: colors.darkGreen
                        }}>{'بِسۡمِ اللهِ'}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.poppinsRegular,
                            fontSize: fonts.size.font10,
                            color: colors.darkGrey
                        }}>{fonts.type.nooreHidayat}</Text>
                    </View>
                </Touchable>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 10
            }}>
                <Touchable onPress={() => props.setFontFamilyArabic(fonts.type.amiriRegular)} style={{
                    overflow: 'hidden',
                    paddingVertical: 3,
                    width: width / 3.5,
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: fonts.type.amiriRegular == props.fontFamilyArabic ? 1 : 0
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.amiriRegular,
                            fontSize: fonts.size.font18,
                            color: colors.darkGreen
                        }}>{'بِسۡمِ اللهِ'}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.poppinsRegular,
                            fontSize: fonts.size.font10,
                            color: colors.darkGrey
                        }}>{fonts.type.amiriRegular}</Text>
                    </View>
                </Touchable>
                <Touchable onPress={() => props.setFontFamilyArabic(fonts.type.almushafQuran)} style={{
                    overflow: 'hidden',
                    paddingVertical: 3,
                    width: width / 3.5,
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: fonts.type.almushafQuran == props.fontFamilyArabic ? 1 : 0
                }}>
                    <View>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.almushafQuran,
                            fontSize: fonts.size.font18,
                            color: colors.darkGreen
                        }}>{'بِسۡمِ اللهِ'}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.poppinsRegular,
                            fontSize: fonts.size.font10,
                            color: colors.darkGrey
                        }}>{fonts.type.almushafQuran}</Text>
                    </View>
                </Touchable>
                <Touchable onPress={() => props.setFontFamilyArabic(fonts.type.nooreHira)} style={{
                    overflow: 'hidden',
                    paddingVertical: 3,
                    width: width / 3.5,
                    borderRadius: 8,
                    borderColor: colors.green,
                    borderWidth: fonts.type.nooreHira == props.fontFamilyArabic ? 1 : 0
                }}>
                    <View>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.nooreHira,
                            fontSize: fonts.size.font18,
                            color: colors.darkGreen
                        }}>{'بِسۡمِ اللهِ'}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.type.poppinsRegular,
                            fontSize: fonts.size.font10,
                            color: colors.darkGrey
                        }}>{fonts.type.nooreHira}</Text>
                    </View>
                </Touchable>
            </View>
            <Text style={[styles.translationStyle, {
                paddingTop: 10,
                fontSize: fonts.size.font14,
                color: colors.grey
            }]}>{'Font Size (' + Math.round(props.fontSize - 1) + 'pt)'}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingRight: 20
            }}>
                <Text style={[styles.translationStyle, {
                    fontSize: fonts.size.font11,
                    color: colors.grey
                }]}>11pt</Text>
                <Text style={[styles.translationStyle, {
                    fontSize: fonts.size.font18,
                    color: colors.grey
                }]}>19pt</Text>
            </View>
            <Slider style={{
                alignSelf: 'center',
                width: metrics.screenWidth - 10,
                height: 20
            }} minimumValue={fonts.size.font11} maximumValue={fonts.size.font18} // value={fontSize}
                onValueChange={value => {
                    // console.log(value)
                    props.setFontSize(value, value + 12);
                }} thumbTintColor={colors.darkGreen} minimumTrackTintColor={colors.darkGreen} maximumTrackTintColor={colors.grey} step={1} />
        </View>
    </View>);
})


export function ModalSettings(props) {
    return (
        <Modal animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={() => {
            props.setModalVisible(!props.modalVisible);
        }}>
            <ModalChild setModalVisible={props.setModalVisible} modalVisible={props.modalVisible} setShowLatin={props.setShowLatin} setModalAyatVisible={props.setModalAyatVisible} showLatin={props.showLatin} setFontFamilyArabic={props.setFontFamilyArabic} fontFamilyArabic={props.fontFamilyArabic} fontSize={props.fontSize} setFontSize={props.setFontSize}></ModalChild>
        </Modal>);
}
