import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useEffectAction(getState, setIsLoading, connectionCheck, ayatList, setAyatNumberList, AyatNumber, flatlistRef, setAyatNumber, isLoading) {
    useEffect(() => {
        getState();
        setIsLoading(true);
        connectionCheck();
    }, []);

    useEffect(() => {
        let x = [];
        for (let i = 1; i <= ayatList.length; i++) {
            x.push(i.toString());
        }
        // console.log('setAyatNumberList', x)
        setAyatNumberList(x);

        const backAction = () => {
            // postLastSeen()
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        let x = 0;
        x = ayatList.findIndex(x => x.id === AyatNumber);
        if (flatlistRef.current && x > 0) {
            flatlistRef.current?.scrollToIndex({ animated: true, index: x });
            setTimeout(() => {
                setAyatNumber(null);
            }, 1500);
        } else {

            setTimeout(() => {
                setAyatNumber(null);
            }, 1500);
        }
    }, [isLoading]);
}
