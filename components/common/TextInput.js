import React from 'react';
import { StyleSheet, TextInput as ReactTextInput } from 'react-native';

const TextInput = props => {
    return (
        <ReactTextInput 
            style={{
                ...styles.textInput, 
                height: (props.numberOfLines ? props.numberOfLines : 1) * 40,
                width: props.width ? props.width : 200,
                borderRadius: props.borderRadius ? props.borderRadius : 50,
            }}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            multiline = {props.multiline}
            numberOfLines = {props.numberOfLines ? props.numberOfLines : 1}
            value={props.value}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        backgroundColor: '#db807b',
        textAlignVertical: 'top'
    }
});

export default TextInput;