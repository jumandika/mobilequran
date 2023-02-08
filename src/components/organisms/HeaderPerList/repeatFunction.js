import React from 'react';
import {
    Text,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import { styles } from './styles';

export function repeatFunction(logic, repeatCode) {
    return () => {
        if (logic && repeatCode === 1) {
            return (
                <View style={[styles.rowContainer, { paddingRight: 10 }]}>
                    <Text style={styles.subNameStyle}>{'Hafalan'}</Text>
                    <View>
                        <Ionicons style={styles.repeatActionButton} name="repeat" />
                        <View style={styles.badgeStyle}>
                            <Text style={[styles.titleText, { color: colors.white, fontSize: fonts.size.font10 }]}>1</Text>
                        </View>
                    </View>
                </View>
            );
        }
    };
}
