import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../common/Button';
import { getTypeByValue, getQuestionById } from './QuestionsData';

const AnsweredQuestion = props => {
    const question = getQuestionById(props.questionId);
    const type = getTypeByValue(question.type);

    const onBack = () => {
        if(props.onBackToAnswersList)
            props.onBackToAnswersList();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageLabel}>Aswered question</Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{'Type:\n' + type.label}</Text>
                <Text style={styles.text}>{'Question:\n' + question.question}</Text>
                <Text style={styles.text}>{'Answer:\n' + question.answer}</Text>
            </View>
            <Button
                text='Back to list'
                onPress={onBack}
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
    textContainer: {
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: '#db807b',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1
    },
    text: {
        color: 'black',
        margin: 10
    },
    pageLabel: {
        fontSize: 27,
        paddingBottom: 10,
        textAlign: 'center',
        color: 'black'
    }
});

export default AnsweredQuestion;