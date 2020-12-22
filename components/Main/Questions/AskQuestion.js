import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';
import { types, addQuestion } from './QuestionsData';
import { getCurrentUser } from '../../AuthenticationPages/Users';

const AskQuestion = props => {
    const [type, setType] = useState(1);
    const [question, setQuestion] = useState('');

    const submit = () => {
        if(!question) {
            ToastAndroid.show('Question cannot be empty!', 4000);
            return;
        }

        const user = getCurrentUser();
        
        const data = {
            userId: user.id,
            type: type,
            question: question,
        };

        if(addQuestion(data)) {
            clean();
            ToastAndroid.show('Question submitted successfully!', 4000);
            if(props.changeMainPage)
                props.changeMainPage('answered-questions');
        } else
            ToastAndroid.show('Something went wrong!', 4000);

    };

    const cancel = () => {
        clean();
        ToastAndroid.show('Question cancelled', 4000);
    };

    const clean = () => {
        setType(1);
        setQuestion('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageLabel}>Ask question</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={type}
                    style={styles.picker}
                    onValueChange={(value, id) => setType(value)}>
                    {types.map((v, i) => {
                        return (
                            <Picker.Item
                                key={i}
                                label={v.label}
                                value={v.value}
                            />
                        );
                    })}
                </Picker>
            </View>
            <TextInput 
                placeholder='Question...'
                onChangeText={text => setQuestion(text)}
                value={question}
                numberOfLines={5}
                width={240}
                borderRadius={25}
                multiline
            />
            <Button 
                text='Submit'
                width={240}
                onPress={submit}
                success
            />
            <Button
                text='Cancel'
                onPress={cancel}
                width={240}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 500,
        marginStart: 50,
        marginEnd: 50,
        textAlign: 'center',
        color: 'black'
    },
    pickerContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        backgroundColor: '#db807b',
        borderRadius: 50,
        margin: 10
    },
    picker: {
        height: 40,
        width: 240,
        marginStart: 5
    },
    pageLabel: {
        fontSize: 27,
        paddingBottom: 10,
        textAlign: 'center',
        color: 'black'
    }
});

export default AskQuestion;