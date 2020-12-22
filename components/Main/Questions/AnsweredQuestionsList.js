import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AnsweredQuestionItem from './AnsweredQuestionItem';
import { getQuestionsByUserId } from './QuestionsData';
import { getCurrentUser } from '../../AuthenticationPages/Users';

const AnsweredQuestionsList = props => {
    const user = getCurrentUser();
    const questions = getQuestionsByUserId(user.id);

    return (
        <ScrollView style={styles.container}>
            {questions && questions.length > 0 && questions.map((q, i) => {
                return (
                    <AnsweredQuestionItem 
                        key={i}
                        questionId={q.id}
                        onCheckAnswer={props.onCheckAnswer}
                    />
                );
            })}
            {questions && questions.length === 0 &&
                <Text style={styles.text}>No questions asked</Text>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 450,
        textAlign: 'center',
        color: 'black',
        marginStart: 20,
        marginEnd: 20
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    }
});

export default AnsweredQuestionsList;