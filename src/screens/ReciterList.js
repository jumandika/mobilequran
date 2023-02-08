import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import fonts from '../theme/fonts';

export function ReciterList(props) {
    return (<View style={styles.container1}>
        {props.isLoadingReciter ? <ActivityIndicator style={styles.container} size={'large'} color={colors.green} /> : <View>
            {
                /* <Text style={[styles.titleStyle, { color: colors.darkGreen, paddingLeft: 20, paddingBottom: 5 }]}>{selectedQori?.name} <Text style={[styles.textStyle, { paddingLeft: 20, }]}>{selectedQori?.style?.name ? `(${selectedQori?.style?.name})` : ''}</Text>
                </Text> */
            }
            <Text style={styles.titleStyle}>{props.selectedQori?.reciter_name} <Text style={styles.textStyle}>{props.selectedQori?.style ? `(${props.selectedQori?.style})` : ''}</Text>
            </Text>
            <FlatList
                style={{
                    flexGrow: 0,
                }}
                showsHorizontalScrollIndicator={false} removeClippedSubviews={true} initialNumToRender={10} maxToRenderPerBatch={10} windowSize={7} updateCellsBatchingPeriod={100} horizontal renderItem={props.renderItemQori} data={props.recitationList} contentContainerStyle={{
                    paddingLeft: 0
                }} />
        </View>}
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        backgroundColor: colors.lightGrey,
        paddingVertical: 10,
    },
    titleStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font14,
        color: colors.darkGreen,
        paddingLeft: 10,
        paddingBottom: 5
    },
    textStyle: {
        fontFamily: fonts.type.poppinsLight,
        fontSize: fonts.size.font14,
        color: colors.darkGreen,
        paddingLeft: 10

    },
})