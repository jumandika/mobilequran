import { useCallback, useMemo } from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { ToastAndroid } from 'react-native';
import { getAyat } from '../../../config/ApiService';
import { getData, storeData } from '../../../utils/asyncStorage';
import { checkConnection } from '../../../utils/connectionChecker';
import { setPlayAudio } from '../../../utils/setPlayAudio';

export function useAyatLogic({
  setAyatList,
  setIsLoading,
  id,
  page,
  selectedQori,
  name_simple,
  flatlistRef,
  trackTitle,
  setVerseNumber,
  trackId,
  showLatin,
  setPutarModal,
  setLatinModal,
  setTranslateModal,
  ayatSelected,
  setModalAyatVisible,
  setAyatSelected,
  setIndexAyatSelected,
  setVerseKey,
  setItemLastSeen,
}) {
  // === Load Ayat Data from API or Local Storage ===
  const getAyatList = async () => {
    try {
      const response = await getAyat(id, page, selectedQori.id);

      const enrichedVerses = response.verses.map((item, index) => ({
        ...item,
        title: name_simple,
        ayat: `Ayat ${item.verse_number}`,
        artwork: selectedQori.url,
        album: "Al-Qur'an",
        artist: `${selectedQori.reciter_name}${selectedQori.style ? ` (${selectedQori.style})` : ''}`,
        url: `https://verses.quran.com/${item.audio.url}`,
      }));

      setAyatList(enrichedVerses);
      storeData('json', '@ayat_list', enrichedVerses);
    } catch (err) {
      console.error('[getAyatList] Failed to fetch Ayat:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAyatListLocally = async () => {
    try {
      const cached = await getData('json', '@ayat_list');
      if (cached) {
        setAyatList(cached);
        ToastAndroid.show("You're in offline mode", ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show("No offline data available", ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.error('[getAyatListLocally] Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const connectionCheck = useCallback(async () => {
    try {
      const connection = await checkConnection;
      connection?.isConnected ? getAyatList() : getAyatListLocally();
    } catch (err) {
      console.error('[connectionCheck] Error:', err);
    }
  }, []);

  // === Player State Logic ===
  const getState = useCallback(async () => {
    try {
      const currentTrack = await TrackPlayer.getActiveTrack();
      if (currentTrack) {
        setPlayAudio({ currentTrack, flatlistRef, name_simple, trackTitle, setVerseNumber, trackId });
      }
    } catch (err) {
      console.error('[getState] Error:', err);
    }
  }, [flatlistRef, name_simple, trackTitle, setVerseNumber, trackId]);

  // === TrackPlayer Events ===
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.track) {
      setPlayAudio({ track: event.track, flatlistRef, name_simple, trackTitle, setVerseNumber, trackId });
    }
  });

  // === UI Actions ===
  const selectAyat = useCallback((item, index) => {
    if (showLatin) {
      setPutarModal(true);
      setLatinModal(false);
      setTranslateModal(false);
    } else {
      setPutarModal(false);
      setLatinModal(false);
      setTranslateModal(true);
    }

    if (item.verse_key === ayatSelected?.verse_key) {
      setModalAyatVisible(false);
      setAyatSelected([]);
      setIndexAyatSelected(null);
    } else {
      setAyatSelected(item);
      setIndexAyatSelected(index);
      setModalAyatVisible(true);
    }
  }, [showLatin, ayatSelected, setPutarModal, setLatinModal, setTranslateModal, setModalAyatVisible, setAyatSelected, setIndexAyatSelected]);

  const markAyat = useCallback(async (item, index) => {
    // Implement marking logic here
  }, []);

  // === Viewability Tracking ===
  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      const ayat = viewableItems[0]?.item;
      setVerseKey(ayat?.verse_key);
      setItemLastSeen(ayat);
    }
  }, [setVerseKey, setItemLastSeen]);

  const _viewabilityConfig = useMemo(() => ({
    itemVisiblePercentThreshold: 50,
  }), []);

  return {
    getState,
    connectionCheck,
    selectAyat,
    markAyat,
    _onViewableItemsChanged,
    _viewabilityConfig,
  };
}