import React from 'react';
import {
    Text,
    View
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import Touchable from '../molecules/Touchable';
import { styles } from './styles';

export function ModalDetailAyat(props) {
    return (<View style={{
        paddingVertical: 20
    }}>
        <View style={[styles.rowContainer, {
            alignItems: 'center',
            justifyContent: 'space-between'
        }]}>
            <View style={[styles.rowContainer, {
                alignItems: 'center'
            }]}>
                <Text style={[styles.latinStyle, {
                    marginRight: 6
                }]}>Mulai ayat : </Text>
                <SelectDropdown buttonStyle={{
                    borderRadius: 30,
                    width: 65,
                    height: 25,
                    backgroundColor: '#f0f0f0'
                }} buttonTextStyle={[styles.latinStyle, {}]} data={props.ayatNumberList} defaultValue={1} onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }} renderDropdownIcon={() => <MaterialCommunityIcons name='chevron-down' style={{
                    color: '#000',
                    fontSize: fonts.size.font16
                }} />} dropdownStyle={{
                    borderRadius: 6,
                    width: 50
                }} buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                }} rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                }} />
            </View>
            <View style={[styles.rowContainer, {
                alignItems: 'center'
            }]}>

                <Text style={[styles.latinStyle, {
                    marginRight: 6,
                    marginLeft: 20
                }]}>Sampai ayat : </Text>
                <SelectDropdown buttonStyle={{
                    borderRadius: 30,
                    width: 65,
                    height: 25,
                    backgroundColor: '#f0f0f0'
                }} buttonTextStyle={[styles.latinStyle, {}]} data={props.ayatNumberList} defaultValue={1} onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }} dropdownStyle={{
                    borderRadius: 6,
                    width: 50
                }} renderDropdownIcon={() => <MaterialCommunityIcons name='chevron-down' style={{
                    color: '#000',
                    fontSize: fonts.size.font16
                }} />} buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                }} rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                }} />
            </View>
        </View>
        <View style={[styles.rowContainer, {
            alignItems: 'center',
            paddingVertical: 10
        }]}>
            <Text style={[styles.latinStyle, {
                marginRight: 6
            }]}>Putar semua ayat : </Text>
            <SelectDropdown buttonStyle={{
                borderRadius: 30,
                width: 65,
                height: 25,
                backgroundColor: '#f0f0f0'
            }} buttonTextStyle={[styles.latinStyle, {}]} data={['1', '2', '3']} defaultValue={1} onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
            }} renderDropdownIcon={() => <MaterialCommunityIcons name='chevron-down' style={{
                color: '#000',
                fontSize: fonts.size.font16
            }} />} dropdownStyle={{
                borderRadius: 6,
                width: 50
            }} buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
            }} rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
            }} />

        </View>
        <View style={[styles.rowContainer, {
            alignItems: 'center',
            paddingBottom: 10
        }]}>

            <Text style={[styles.latinStyle, {
                marginRight: 6
            }]}>Putar setiap ayat : </Text>
            <SelectDropdown buttonStyle={{
                borderRadius: 30,
                width: 65,
                height: 25,
                backgroundColor: '#f0f0f0'
            }} buttonTextStyle={[styles.latinStyle, {}]} data={['1', '2', '3']} defaultValue={1} onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
            }} renderDropdownIcon={() => <MaterialCommunityIcons name='chevron-down' style={{
                color: '#000',
                fontSize: fonts.size.font16
            }} />} dropdownStyle={{
                borderRadius: 6,
                width: 50
            }} buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
            }} rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
            }} />

        </View>
        <View style={[styles.rowContainer, {
            alignItems: 'center',
            paddingVertical: 10
        }]}>
            <Touchable style={{
                backgroundColor: colors.green,
                borderRadius: 4,
                height: 19,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }} children={<MaterialCommunityIcons name='check' style={{
                fontSize: fonts.size.font12,
                color: '#FFF'
            }} />} />
            <Text style={[styles.latinStyle, {
                marginLeft: 10
            }]}>Putar hanya ayat-ayat ini</Text>
        </View>
    </View>);
}
