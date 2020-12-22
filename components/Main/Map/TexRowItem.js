import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TextRowItem = props => {
    return (
        <View style={{
            ...styles.row,
            marginTop: props.marginTop ? props.marginTop : 0,
            marginStart: props.marginStart ? props.marginStart : 0,
            width: props.width ? props.width : 160,
        }}>
            <Text style={styles.label}>{props.labelText}</Text>
            <Text style={{
                ...styles.text,
                color: props.textRed ? 'red' : 'black'
            }}>{props.text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40
    },
    label: {
        color: 'black',
        fontSize: 11,
    },
    text: {
        fontWeight: '700',
        fontSize: 11,
    }
});

export default TextRowItem;