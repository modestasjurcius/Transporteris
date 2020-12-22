import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

const Button = props => {
    return (
        <Pressable
            onPress={props.onPress}
            android_ripple={styles.btnRiple}
            style={{
                ...styles.btn,
                backgroundColor: props.success ? '#2c5930' : props.info ? '#00678a' : '#9e251f',
                width: props.width ? props.width : 200,
                height: props.height ? props.height : 40
            }}
        >
            <Text style={styles.btnText}>{props.text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        margin: 10,
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: 'center',
        textAlignVertical: 'center'
    },
    btnText: {
        margin: 10,
        color: '#fff'
    },
    btnRiple: {
        color: '#e66464'
    }
});

export default Button;