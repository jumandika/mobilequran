export const mapStateToProps = (state) => {
    return {
        ayatList: state.AyatList.ayatList,
        showLatin: state.SettingVisual.showLatin,
        fontSize: state.SettingVisual.fontSize,
        fontSizeArabic: state.SettingVisual.fontSizeArabic,
        fontFamilyArabic: state.SettingVisual.fontFamilyArabic,
        trackId: state.StatePlayer.trackId,
        trackTitle: state.StatePlayer.trackTitle,
        repeatCode: state.StatePlayer.repeatCode,
        selectedQori: state.SelectedQori.selectedQori,
    };
};
export const mapDispatchToProps = (dispatch) => {
    return {
        setTrack: (
            trackId,
            trackTitle,
            trackAlbum,
            verseNumber,
            trackLength,
            chapterId
        ) => dispatch({
            type: 'SET_TRACK',
            trackId: trackId,
            trackTitle: trackTitle,
            trackAlbum: trackAlbum,
            verseNumber: verseNumber,
            trackLength: trackLength,
            chapterId: chapterId,
        }),
        setLastSeen: (
            lastSeen
        ) => dispatch({
            type: 'SET_LAST_SEEN',
            lastSeen: lastSeen,
        }),
        setAyatList: (
            ayatList
        ) => dispatch({
            type: 'SET_AYAT_LIST',
            ayatList: ayatList,
        }),
    };
};
