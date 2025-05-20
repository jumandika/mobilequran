import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getRecitation } from '../config/ApiService';
import { getData, storeData } from '../utils/asyncStorage';
import { useDispatch } from 'react-redux';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import { RendeItemQori } from './RendeItemQori';
import { FlatList } from 'react-native-gesture-handler';

function ReciterList() {
    const [recitationList, setRecitationList] = useState([])
    const [selectedQori, setSelectedQori] = useState(null)
    const [isLoadingReciter, setIsLoadingReciter] = useState(true)
    const dispatch = useDispatch()
    const setSelectedQoriRedux = (selectedQori) => dispatch({ type: 'SET_SELECTED_QORI', selectedQori })

    const renderItemQori = ({ item, index }) => {
        return (
            <RendeItemQori selectedQori={selectedQori} selectQori={selectQori} item={item} />
        )
    }

    const selectQori = async (item) => {
        setSelectedQori(item)
        storeData('json', '@selected_qori', item)
        setSelectedQoriRedux(item)
    }

    useEffect(() => {
        getAllRecitation()
    }, [])

    const getAllRecitation = async () => {
        try {
            const response = await getRecitation()
            response.recitations.forEach(function (item, index) {
                let url = ''
                if (item.id === 1 || item.id === 2) url = "https://iqrabd.org/wp-content/uploads/2017/10/7-19.jpg";
                if (item.id === 3) url = "https://www.madaninews.id/wp-content/uploads/2018/07/Abdul-Rahman-Al-Sudais-at-digital-mode-by-syed-noman-zafar-855x1024.jpg";
                if (item.id === 4) url = "https://static.qurancdn.com/images/reciters/3/abu-bakr-al-shatri-pofile.jpeg?v=1";
                if (item.id === 5) url = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjg9iURmiv7gugs95hEr8XAq8czfCf1KfQ3Yqe1nzYx0S3eyJa8SvKENqpUPxE6dmI6In1zxrj40sO63vMV3ZoXUap2rb92OL6v9WWiO6GqX2l8TxnSQAGNPe2_CXJF06aJoVUYTtATEaKa/s1600/2.jpg";
                if (item.id === 6 || item.id === 12) url = "https://static.qurancdn.com/images/reciters/5/mahmoud-khalil-al-hussary-profile.png?v=1";
                if (item.id === 7) url = "https://lyricstranslate.com/files/styles/artist/public/5_6.jpg";
                if (item.id === 8 || item.id === 9) url = "https://i.scdn.co/image/ab67616d0000b273694d20b8141591b9c822de7c";
                if (item.id === 10) url = "https://islamicbulletin.org/wp-content/uploads/Saud-AlShuraim.jpg";
                if (item.id === 11) url = "https://cdns-images.dzcdn.net/images/artist/3c01b054075ec731185bab67feaf5133/500x500.jpg";
                item.url = url
            });
            setRecitationList(response.recitations)
            const selected_qori = await getData('json', '@selected_qori');
            if (!selected_qori) {
                storeData('json', '@selected_qori', response.recitations[0])
                setSelectedQori(response.recitations[0])
                setSelectedQoriRedux(response.recitations[0])
            } else {
                setSelectedQori(selected_qori)
                setSelectedQoriRedux(selected_qori)
            }
            setIsLoadingReciter(false)
        } catch (err) {
            console.error(err)
            setIsLoadingReciter(false)
        }
    }
    return (<View style={styles.container1}>
        {isLoadingReciter ? <ActivityIndicator style={styles.container} size={'large'} color={colors.green} /> : <View>
            <Text style={styles.titleStyle}>{selectedQori?.reciter_name} <Text style={styles.textStyle}>{selectedQori?.style ? `(${selectedQori?.style})` : ''}</Text>
            </Text>
            <FlatList
                style={{
                    flexGrow: 0,
                }}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={7}
                updateCellsBatchingPeriod={100}
                horizontal
                renderItem={renderItemQori}
                data={recitationList}
                contentContainerStyle={{
                    paddingLeft: 10
                }} />

        </View>
        }
    </View>);
}
export default memo(ReciterList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        backgroundColor: colors.lightGrey,
    },
    titleStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font14,
        color: colors.darkGreen,
        paddingLeft: 10,
    },
    textStyle: {
        fontFamily: fonts.type.poppinsLight,
        fontSize: fonts.size.font14,
        color: colors.darkGreen,
        paddingLeft: 10

    },
})