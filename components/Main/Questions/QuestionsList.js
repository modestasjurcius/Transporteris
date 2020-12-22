import React from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';
import QuestionItem from './QuestionItem';
import { 
    getUnansweredQuestions,
    types
 } from './QuestionsData';
 import { getUserFullNameById } from '../../AuthenticationPages/Users';

const QuestionsList = props => {
    const questions = getUnansweredQuestions();

    return (
        <ScrollView style={styles.container}>
            {questions.map((v, i) => {
                return (
                    <QuestionItem
                        key={i}
                        typeLabel={types.find(t => t.value === v.type).label}
                        user={getUserFullNameById(v.userId)}
                        question={v.question}
                        id={v.id}
                        setAnswerQuestionId={props.setAnswerQuestionId}
                        changeMainPage={props.changeMainPage}
                    />
                );
            })}
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
    }
});

export default QuestionsList;