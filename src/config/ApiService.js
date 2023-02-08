import axios from "axios";


const Endpoint = {
    urlApi: 'https://maulidapi.jumantya.my.id/index.php/api',
    baseUrlQuran: 'https://api.quran.com/api/',
    user: '/User',
    fassal: '/Fassal',
    ayat: '/Ayat',
    mark: '/Mark',
    lastseen: '/LastSeen',
}



const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const requestData = axios.create({ baseURL: Endpoint.baseUrlQuran });

const getSurah = async (language = 'en') => {
    try {
        const response = await requestData.get(`v4/chapters?language=${language}`);
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getAyat = async (chapters, page, recitation = 1, per_page = 1000, language = 'en', translations = 33, text_type = 'image') => {
    try {
        const response = await requestData.get(`v3/chapters/${chapters}/verses?recitation=${recitation}&translations=${translations}&language=${language}&text_type=${text_type}&page=${page}&per_page=${per_page}`);
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getAyatTajweed = async (chapterNumber) => {
    try {
        const response = await requestData.get(`v4/quran/verses/uthmani_tajweed?chapter_number=${chapterNumber}`);
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getRecitation = async () => {
    try {
        const response = await requestData.get(`v3/options/recitations`);
        // const response = await requestData.get(`v4/resources/chapter_reciters?language=en`);
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getTranslations = async () => {
    try {
        const response = await requestData.get(`v3/options/translations`);
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


export {
    Endpoint,
    headers,
    getSurah,
    getAyat,
    getAyatTajweed,
    getRecitation,
    getTranslations,
};