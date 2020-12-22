import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';
import { types, getQuestionById, answerQuestionById} from './QuestionsData';
import { getUserFullNameById } from '../../AuthenticationPages/Users';

const AnswerQuestion = props => {
    const [answer, setAnswer] = useState('');

    const question = getQuestionById(props.id);

    const submit = () => {
        if(!answer) {
            ToastAndroid.show('Answer cannot be empty!', 4000);
            return;
        }

        if(answerQuestionById(props.id, answer)) {
            ToastAndroid.show('Answer saved', 4000);
            if(props.changeMainPage)
                props.changeMainPage('unanswered-questions');
        }
    };

    const cancel = () => {
        ToastAndroid.show('Answer cancelled', 4000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageLabel}>Aswer question</Text>
            <Text style={styles.text}>Type: {types.find(t => t.value === question.type).label}</Text>
            <Text style={styles.text}>User: {getUserFullNameById(question.userId)}</Text>
            <Text style={styles.text}>Question: {question.question}</Text>
            <TextInput 
                placeholder='Answer...'
                onChangeText={text => setAnswer(text)}
                value={answer}
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
    text: {
        color: 'black'
    },
    pageLabel: {
        fontSize: 27,
        paddingBottom: 10,
        textAlign: 'center',
        color: 'black'
    }
});

export default AnswerQuestion;