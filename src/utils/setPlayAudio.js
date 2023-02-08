export async function setPlayAudio(track, flatlistRef, name_simple, trackTitle, setVerseNumber, trackId, setTrackAlbum, setTrackArtist) {
    const { id, title, album, artist, verse_number, chapter_id } = track || {};
    const sameChapter = name_simple === trackTitle.current?.split(" ")[0];
    if (flatlistRef.current && sameChapter) {
        const index = verse_number ? verse_number - 1 : 0;
        flatlistRef.current?.scrollToIndex({ animated: true, index: index });
    }
    trackId.current = id;
    trackTitle.current = title;
    setVerseNumber(verse_number);
    // setTrack(id, title, album, verse_number, (await TrackPlayer.getQueue()).length, chapter_id);
    // setTrackAlbum(album);
    // setTrackArtist(artist);
}
