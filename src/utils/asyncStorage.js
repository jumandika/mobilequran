
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (dataType, storageKey, value) => {
    if (dataType === 'json') {
        value = JSON.stringify(value)
    }
    try {
        await AsyncStorage.setItem(storageKey, value)
    } catch (e) {
        console.error(e)
    }
}

const getData = async (dataType, storageKey) => {
    try {
        if (dataType === 'json') {
            const jsonValue = await AsyncStorage.getItem(storageKey)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }
        const value = await AsyncStorage.getItem(storageKey)
        if (value !== null) {
            return value
        }
    } catch (e) {
        console.error(e)
    }

}


export { storeData, getData }