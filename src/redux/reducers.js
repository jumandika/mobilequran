
import { combineReducers, } from "redux";
import fonts from "../theme/fonts";


const InitialAyatList = {
    ayatList: [],
};

const AyatList = (state = InitialAyatList, action) => {
    if (action.type === "SET_AYAT_LIST") {
        return {
            ...state,
            ayatList: action.ayatList,
        }
    }
    if (action.type === "PUSH_AYAT_LIST") {
        return {
            ...state,
            ayatList: [...state.ayatList, action.ayatList]
        }
    }
    if (action.type === "UPDATE_AYAT_LIST") {
        // let updateList = [...state.ayatList];
        // updateList[action.index] = { ...updateList[action.index], Is_Marked: action.Is_Marked };
        return {
            ...state,
            // ayatList: updateList,
            ayatList: [
                ...state.ayatList.slice(0, action.index),
                {
                    ...state.ayatList[action.index],
                    Is_Marked: action.Is_Marked,
                },
                ...state.ayatList.slice(action.index + 1)
            ],
        }
    }

    return state;
}

const InitialSettingVisual = {
    showLatin: true,
    fontSize: fonts.size.font12,
    fontSizeArabic: fonts.size.font24,
    fontFamilyArabic: fonts.type.isepMisbah,
};

const SettingVisual = (state = InitialSettingVisual, action) => {
    if (action.type === "SET_SHOW_LATIN") {
        return {
            ...state,
            showLatin: action.showLatin,
        }
    }
    if (action.type === "SET_FONT_ARABIC") {
        return {
            ...state,
            fontFamilyArabic: action.fontFamilyArabic,
        }
    }
    if (action.type === "SET_FONT_SIZE") {
        return {
            ...state,
            fontSize: action.fontSize,
            fontSizeArabic: action.fontSizeArabic,
        }
    }


    return state;
}


const InitialStatePlayer = {
    trackId: null,
    trackTitle: null,
    trackAlbum: null,
    trackLength: 0,
    verseNumber: 0,
    repeatCode: 0,
    chapterId: null,
};

const StatePlayer = (state = InitialStatePlayer, action) => {
    if (action.type === "SET_TRACK") {
        return {
            ...state,
            trackId: action.trackId,
            trackTitle: action.trackTitle,
            trackAlbum: action.trackAlbum,
            verseNumber: action.verseNumber,
            trackLength: action.trackLength,
            chapterId: action.chapterId,
        }
    }
    if (action.type === "SET_REPEAT_CODE") {
        return {
            ...state,
            repeatCode: action.repeatCode,
        }
    }
    return state;
}


const InitialLastSeen = {
    lastSeen: {},
};

const LastSeen = (state = InitialLastSeen, action) => {
    if (action.type === "SET_LAST_SEEN") {
        return {
            ...state,
            lastSeen: action.lastSeen,
        }
    }
    return state;
}
const InitialSelectedQori = {
    selectedQori: {},
};

const SelectedQori = (state = InitialSelectedQori, action) => {
    if (action.type === "SET_SELECTED_QORI") {
        return {
            ...state,
            selectedQori: action.selectedQori,
        }
    }
    return state;
}


const reducer = combineReducers({
    AyatList,
    SettingVisual,
    StatePlayer,
    LastSeen,
    SelectedQori,

})

export default reducer;